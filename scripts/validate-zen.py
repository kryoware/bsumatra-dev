"""Validate the static export in installed Zen with an isolated Selenium profile.
Requires: python -m pip install selenium
Run a static server for out/, then pass --driver /path/to/geckodriver.
"""
import argparse
import json
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
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
    check('ELMO Software' in body and 'GRUPBAI' in body and 'Hero Teams' not in body, 'Updated employer and freelance content render')
    check('Holy Child College' not in body and 'I speak English and Filipino' not in body, 'Education and spoken-language copy removed')
    check([el.text for el in driver.find_elements(By.CSS_SELECTOR, '.route .location-tag')] == ['Sydney · Remote', 'Taguig · Remote', 'Davao'], 'Company location tags render')
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
    check(driver.execute_script("const order=[...document.querySelectorAll('[data-track]')].map(el=>el.dataset.track); return order.indexOf('H')>order.indexOf('S') && order.indexOf('D')>order.indexOf('M')"), 'Red renders above brown and green above orange')
    connector = driver.execute_script("""
        const link = document.querySelector('.map__connector');
        const point = id => {
            const b = document.querySelector(`[data-station="${id}"] circle, [data-station="${id}"] rect`).getBBox();
            return { x: b.x+b.width/2, y: b.y+b.height/2 };
        };
        const start = point(link.dataset.from), end = point(link.dataset.to);
        const a = link.getPointAtLength(0), b = link.getPointAtLength(link.getTotalLength());
        const others = [...document.querySelectorAll('.map__station')].filter(el=>!['kotlin','compose','classifier','room'].includes(el.dataset.station));
        const nearest = Math.min(...others.map(el=>{const p=point(el.dataset.station); return Math.hypot(p.x-start.x,p.y-start.y)}));
        return Math.hypot(a.x-start.x,a.y-start.y)<0.1 && Math.hypot(b.x-end.x,b.y-end.y)<0.1 &&
            Math.abs(Math.hypot(end.x-start.x,end.y-start.y)-nearest)<0.1 &&
            getComputedStyle(link).strokeDasharray !== 'none';
    """)
    check(connector, 'Purple dotted connector joins Room to the nearest other station')
    connections = driver.execute_script("""
        const broken = [];
        for (const pulse of document.querySelectorAll('[data-pulse]')) {
            const [line, id] = pulse.dataset.pulse.split(/-(.*)/s);
            const station = document.querySelector(`[data-station="${id}"] circle, [data-station="${id}"] rect`);
            const track = document.querySelector(`[data-track="${line}"]`);
            const x = +pulse.dataset.stopX, y = +pulse.dataset.stopY;
            const bounds = station.getBBox();
            if (x < bounds.x || x > bounds.x+bounds.width || y < bounds.y || y > bounds.y+bounds.height)
                broken.push(`${line}/${id}: platform outside station`);
            let distance = Infinity;
            for (let at = 0; at <= track.getTotalLength(); at += 0.5) {
                const p = track.getPointAtLength(at);
                distance = Math.min(distance, Math.hypot(p.x - x, p.y - y));
            }
            if (distance > 1.5) broken.push(`${line}/${id}: ${distance.toFixed(1)}`);
            if (Math.hypot(pulse.cx.baseVal.value-x, pulse.cy.baseVal.value-y) > 1.5)
                broken.push(`${line}/${id}: pulse detached`);
        }
        return broken;
    """)
    check(not connections, f'All skill stops and arrival pulses lie on their routes: {connections}')
    overlaps = driver.execute_script("""
        const labels = [...document.querySelectorAll('.map__label')];
        const overlaps = [];
        labels.forEach((el, i) => labels.slice(i + 1).forEach(other => {
            const a = el.getBBox(), b = other.getBBox();
            if (a.x < b.x+b.width+2 && a.x+a.width+2 > b.x &&
                a.y < b.y+b.height+2 && a.y+a.height+2 > b.y)
                overlaps.push(`${el.textContent}/${other.textContent}`);
        }));
        labels.forEach(el => document.querySelectorAll('.map__station').forEach(station => {
            if (station === el.parentElement) return;
            const a = el.getBBox(), b = station.querySelector('circle, rect').getBBox();
            if (a.x < b.x+b.width+2 && a.x+a.width+2 > b.x &&
                a.y < b.y+b.height+2 && a.y+a.height+2 > b.y)
                overlaps.push(`${el.textContent}/${station.dataset.station} marker`);
        }));
        return overlaps;
    """)
    check(not overlaps, f'Skill labels do not overlap: {overlaps}')
    first_line = driver.find_element(By.CSS_SELECTOR, '.legend__row')
    driver.execute_script('arguments[0].focus()', first_line)
    wait.until(lambda d: d.execute_script("return +getComputedStyle(document.querySelector('[data-station=bootstrapvue]')).opacity < 0.3"))
    check(driver.execute_script("return !document.querySelector('[data-station=php]').hasAttribute('data-dim')"), 'Keyboard focus connects ELMO Software to PHP')
    check('Symfony' in first_line.accessible_name and 'Jenkins' in first_line.accessible_name, 'Accessible line name includes its skills')
    driver.execute_script('arguments[0].blur()', first_line)
    ActionChains(driver).move_to_element(driver.find_element(By.CSS_SELECTOR, '[data-station=php] circle')).perform()
    wait.until(lambda d: len(d.find_elements(By.CSS_SELECTOR, '.map__line[data-active]')) == 2)
    check(driver.execute_script("return [...document.querySelectorAll('.map__line[data-active] [data-track]')].map(p=>p.dataset.track).sort().join() === 'M,P'"), 'Shared PHP station highlights both employers')
    ActionChains(driver).move_to_element(driver.find_element(By.CSS_SELECTOR, '.hero__name')).perform()
    driver.find_element(By.CSS_SELECTOR, '.theme-toggle').click()
    settled()
    driver.save_screenshot(str(evidence / 'zen-desktop-dark.png'))
    check(driver.execute_script("return [...document.querySelectorAll('.map__label')].every(el=>getComputedStyle(el).fill===getComputedStyle(document.body).color)"), 'Skill labels use the theme ink token')
    driver.find_element(By.CSS_SELECTOR, '.theme-toggle').click()
    for slug, company, location in [('elmo-software', 'ELMO Software', 'Sydney · Remote'), ('yondu', 'Yondu', 'Taguig · Remote'), ('futuristech', 'Futuristech Inc.', 'Davao')]:
        driver.find_element(By.CSS_SELECTOR, f'.route__title a[href="/work/{slug}/"]').click()
        wait.until(lambda d: company in d.title)
        check(company in driver.find_element(By.TAG_NAME, 'main').text, f'{slug} client navigation and content')
        check(driver.find_element(By.CSS_SELECTOR, '.spec .location-tag').text == location, f'{slug} location tag on detail page')
        check(driver.execute_script('return document.documentElement.scrollWidth <= innerWidth'), f'{slug} stack fits desktop viewport')
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
            driver.find_element(By.CSS_SELECTOR, '.route__title a').click()
            wait.until(lambda d: 'ELMO Software' in d.title)
            check(driver.execute_script('return document.documentElement.scrollWidth <= innerWidth'), 'Expanded ELMO stack fits mobile viewport')
            driver.save_screenshot(str(evidence / 'zen-mobile-elmo.png'))
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
