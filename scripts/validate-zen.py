"""Validate the static export in installed Zen with an isolated Selenium profile.
Requires: python -m pip install selenium
Run a static server for out/, then pass --driver /path/to/geckodriver.
"""
import argparse
import json
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.support.ui import WebDriverWait

parser = argparse.ArgumentParser()
parser.add_argument('--driver', required=True)
parser.add_argument('--binary', default='C:/Program Files/Zen Browser/zen.exe')
parser.add_argument('--url', default='http://127.0.0.1:4173')
parser.add_argument('--evidence', required=True)
args = parser.parse_args()
evidence = Path(args.evidence)
evidence.mkdir(parents=True, exist_ok=True)
results = []


def browser(reduced=False):
    options = Options()
    options.binary_location = args.binary
    options.add_argument('-headless')
    options.set_preference('ui.prefersReducedMotion', int(reduced))
    return webdriver.Firefox(service=Service(args.driver), options=options)


def check(condition, label):
    assert condition, label
    results.append(label)


def viewport(width, height):
    driver.set_window_size(width, height)
    delta = driver.execute_script('return [outerWidth-innerWidth, outerHeight-innerHeight]')
    driver.set_window_size(width + delta[0], height + delta[1])
    assert driver.execute_script('return innerWidth') == width


def settled():
    WebDriverWait(driver, 15).until(lambda d: d.execute_script("return document.getAnimations().filter(a=>a.effect.getTiming().iterations !== Infinity).every(a=>a.playState==='finished')"))


driver = browser()
try:
    wait = WebDriverWait(driver, 15)
    viewport(1440, 1000)
    driver.get(args.url)
    wait.until(lambda d: d.execute_script('return document.getAnimations().length > 0'))
    info = {'binary': args.binary, 'version': driver.capabilities['browserVersion'],
            'userAgent': driver.execute_script('return navigator.userAgent')}
    body = driver.find_element(By.TAG_NAME, 'body').text
    check('\u00c2' not in body and '\ufffd' not in body, 'No text encoding artifacts')
    check('Hero Teams' in body and 'GRUPBAI' in body and 'April 2019' in body, 'Employment, freelance and education render')
    check('1.2M' not in body and 'These three are samples' not in body, 'Fictional sample copy removed')
    for link in driver.find_elements(By.CSS_SELECTOR, 'a[href^="mailto:"]'):
        check(link.get_attribute('href') == 'mailto:bsumatra.jbsa@gmail.com', 'Contact uses supplied address')
    driver.find_element(By.CSS_SELECTOR, '.theme-toggle').click()
    theme = driver.execute_script('return document.documentElement.dataset.theme')
    driver.refresh()
    check(driver.execute_script('return document.documentElement.dataset.theme') == theme, 'Theme persists after refresh')
    wait.until(lambda d: d.execute_script('return document.getAnimations().length > 0'))
    driver.find_element(By.CSS_SELECTOR, '.legend__motion').click()
    wait.until(lambda d: d.find_element(By.CSS_SELECTOR, '.legend__motion').text == 'Resume trains')
    check(driver.execute_script("return document.getAnimations().filter(a=>a.effect.target.closest('.map__train-route')).every(a=>a.playState==='paused')"), 'Train animations pause')
    driver.find_element(By.CSS_SELECTOR, '.legend__motion').click()
    wait.until(lambda d: d.find_element(By.CSS_SELECTOR, '.legend__motion').text == 'Pause trains')
    check(driver.execute_script("return document.getAnimations().some(a=>a.effect.target.closest('.map__train-route') && a.playState==='running')"), 'Train animations resume')
    driver.find_element(By.CSS_SELECTOR, '.theme-toggle').click()
    settled()
    driver.save_screenshot(str(evidence / 'zen-desktop.png'))
    for slug, company in [('hero-teams', 'Hero Teams'), ('yondu', 'Yondu'), ('futuristech', 'Futuristech Inc.')]:
        driver.find_element(By.CSS_SELECTOR, f'.route__title a[href="/work/{slug}/"]').click()
        wait.until(lambda d: company in d.title)
        check(company in driver.find_element(By.TAG_NAME, 'main').text, f'{slug} client navigation and content')
        driver.refresh()
        check('My contributions' in driver.find_element(By.TAG_NAME, 'main').text, f'{slug} direct static route')
        driver.find_element(By.CSS_SELECTOR, '.back').click()
        wait.until(lambda d: len(d.find_elements(By.ID, 'work')) == 1)
    for path in ['/notifly/', '/homelab/']:
        driver.get(args.url + path)
        check(len(driver.find_elements(By.TAG_NAME, 'h1')) == 1, f'{path} remains available')
    for width in [1440, 768, 390, 320]:
        viewport(width, 900)
        driver.get(args.url)
        wait.until(lambda d: len(d.find_elements(By.CSS_SELECTOR, '.route')) == 3)
        check(driver.execute_script('return document.documentElement.scrollWidth <= innerWidth'), f'No page overflow at viewport width {width}')
        check(driver.find_element(By.LINK_TEXT, 'View experience').is_displayed(), f'Work shortcut visible at {width}')
        settled()
        if width == 390:
            driver.save_screenshot(str(evidence / 'zen-mobile.png'))
            driver.find_element(By.LINK_TEXT, 'View experience').click()
            wait.until(lambda d: d.current_url.endswith('#work'))
            driver.save_screenshot(str(evidence / 'zen-mobile-work.png'))
    driver.get(args.url)
    driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.TAB)
    check(driver.switch_to.active_element.text == 'Skip to content', 'Keyboard starts at skip link')
    driver.switch_to.active_element.send_keys(Keys.ENTER)
    check(driver.current_url.endswith('#main'), 'Skip link reaches main')
finally:
    driver.quit()

driver = browser(reduced=True)
try:
    driver.get(args.url)
    check(not driver.find_element(By.CSS_SELECTOR, '.legend__motion').is_displayed(), 'Reduced motion hides pause control')
    # Theme interaction confirms the client has hydrated before checking the motion preference.
    driver.find_element(By.CSS_SELECTOR, '.theme-toggle').click()
    WebDriverWait(driver, 15).until(lambda d: d.execute_script('return !!document.documentElement.dataset.theme'))
    check(driver.execute_script("return matchMedia('(prefers-reduced-motion: reduce)').matches && !document.getAnimations().some(a=>a.effect.target.closest('.map__train-route'))"), 'Reduced motion disables train animations')
finally:
    driver.quit()

(evidence / 'results.json').write_text(json.dumps({'browser': info, 'passed': results}, indent=2))
print(json.dumps({'browser': info, 'checksPassed': len(results), 'evidence': str(evidence)}, indent=2))
