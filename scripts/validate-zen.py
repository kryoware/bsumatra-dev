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
    entries = driver.find_elements(By.CSS_SELECTOR, '.career__row[data-kind="card"]')
    check(len(entries) == 6 and not driver.find_elements(By.CSS_SELECTOR, '.career__entry[open]'), 'All six timeline entries start collapsed')
    check([el.find_element(By.CSS_SELECTOR, '.career__name').text for el in entries] == ['ELMO Software', 'Yondu', 'Umá · iFarms', 'Futuristech Inc.', 'BAI · GRUPBAI Logistics', 'Retail & queueing systems'], 'Company and freelance entries follow reverse chronology')
    check('Jan – Mar 2021' in entries[2].text and 'Freelance' in entries[2].text, 'Dated 2021 freelance engagement sits between Yondu and Futuristech')
    check(all('alongside Futuristech' in entry.text for entry in entries[4:]), 'Older freelance projects disclose concurrent employment while collapsed')
    check(all(el.find_element(By.CSS_SELECTOR, '.career__brief').is_displayed() for el in entries), 'Every collapsed entry shows a brief summary')
    check(not driver.find_elements(By.CSS_SELECTOR, '#work .strip, #work .board') and len(driver.find_elements(By.ID, 'freelance')) == 1, 'Homepage uses one timeline without duplicate project boards or stack strips')
    for entry in driver.find_elements(By.CSS_SELECTOR, '.career__row[data-kind="card"]:has(.work-location)'):
        entry.find_element(By.TAG_NAME, 'summary').click()
    check([el.text for el in driver.find_elements(By.CSS_SELECTOR, '.career .work-location')] == ['Sydney · Remote', 'Taguig · Remote', 'Davao'], 'Company location metadata render when expanded')
    check('Promoted from Mid to Senior in Sep 2023.' in entries[0].text, 'Expanded ELMO entry preserves promotion')
    for entry in driver.find_elements(By.CSS_SELECTOR, '.career__row[data-kind="card"]:has(.work-location)'):
        entry.find_element(By.TAG_NAME, 'summary').click()
    check(driver.execute_script("return [...document.querySelectorAll('.meta-separator')].filter(el=>el.getClientRects().length).every(el=>el.getBoundingClientRect().width>=parseFloat(getComputedStyle(el).fontSize)*1.3) && document.querySelectorAll('.career__name .meta-separator').length===2"), 'Visible metadata and project-name separators have clear spacing')
    for entry in driver.find_elements(By.CSS_SELECTOR, '.career__row[id^="freelance-"]'):
        target = entry.get_attribute('id')
        driver.get(args.url + '/#' + target)
        entry = driver.find_element(By.ID, target)
        summary = entry.find_element(By.TAG_NAME, 'summary')
        summary.click()
        check(entry.find_element(By.CSS_SELECTOR, '.career__body').is_displayed() and driver.current_url.endswith('#' + target), f'{target} anchor and disclosure reach project details')
        summary.click()
    summary = driver.find_element(By.CSS_SELECTOR, '.career__summary')
    driver.execute_script('arguments[0].focus()', summary)
    summary.send_keys(Keys.ENTER)
    check(driver.find_element(By.CSS_SELECTOR, '.career__entry').get_property('open'), 'Enter expands a timeline entry')
    summary.send_keys(Keys.SPACE)
    check(not driver.find_element(By.CSS_SELECTOR, '.career__entry').get_property('open'), 'Space collapses a timeline entry')
    driver.find_element(By.CSS_SELECTOR, '.career').screenshot(str(evidence / 'zen-desktop-timeline.png'))
    driver.execute_script('scrollTo(0,0)')
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
    check(not driver.find_elements(By.CSS_SELECTOR, '.map__connector'), 'Dotted Laravel connector removed')
    check(driver.execute_script("const a=document.querySelector('[data-station=aws] rect'), r=document.querySelector('[data-station=react] rect'); return a.width.baseVal.value===r.height.baseVal.value && a.height.baseVal.value===r.width.baseVal.value && +a.getAttribute('rx')===+r.getAttribute('rx') && +a.getAttribute('rx')===a.width.baseVal.value/2"), 'AWS is a vertical React capsule with equal corner radii')
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
    check(driver.execute_script("return [...document.querySelectorAll('.legend__row')].every(el=>getComputedStyle(el).opacity==='1')"), 'Keyboard map highlighting keeps every navigation label fully opaque')
    driver.execute_script('arguments[0].blur()', first_line)
    ActionChains(driver).move_to_element(driver.find_element(By.CSS_SELECTOR, '[data-station=php] circle')).perform()
    wait.until(lambda d: len(d.find_elements(By.CSS_SELECTOR, '.map__line[data-active]')) == 2)
    check(driver.execute_script("return [...document.querySelectorAll('.map__line[data-active] [data-track]')].map(p=>p.dataset.track).sort().join() === 'M,P'"), 'Shared PHP station highlights both employers')
    check(driver.execute_script("return [...document.querySelectorAll('.legend__row')].every(el=>getComputedStyle(el).opacity==='1')"), 'Pointer map highlighting keeps every navigation label fully opaque')
    ActionChains(driver).move_to_element(driver.find_element(By.CSS_SELECTOR, '.hero__name')).perform()
    driver.find_element(By.CSS_SELECTOR, '.theme-toggle').click()
    settled()
    driver.save_screenshot(str(evidence / 'zen-desktop-dark.png'))
    driver.find_element(By.CSS_SELECTOR, '.career').screenshot(str(evidence / 'zen-desktop-timeline-theme-2.png'))
    check(driver.execute_script("return [...document.querySelectorAll('.map__label')].every(el=>getComputedStyle(el).fill===getComputedStyle(document.body).color)"), 'Skill labels use the theme ink token')
    driver.find_element(By.CSS_SELECTOR, '.theme-toggle').click()
    for slug, company, location in [('elmo-software', 'ELMO Software', 'Sydney · Remote'), ('yondu', 'Yondu', 'Taguig · Remote'), ('futuristech', 'Futuristech Inc.', 'Davao')]:
        link = driver.find_element(By.CSS_SELECTOR, f'.career__body a[href="/work/{slug}/"]')
        disclosure = link.find_element(By.XPATH, 'ancestor::details')
        if not disclosure.get_property('open'):
            disclosure.find_element(By.TAG_NAME, 'summary').click()
        link.click()
        wait.until(lambda d: company in d.title)
        check(company in driver.find_element(By.TAG_NAME, 'main').text, f'{slug} client navigation and content')
        check(driver.find_element(By.CSS_SELECTOR, '.spec .work-location').text == location, f'{slug} location metadata on detail page')
        rows = driver.execute_script('''
            const strip=document.querySelector('main > .strip--h');
            const rows=new Map();
            for(const stop of strip.children){
                const top=Math.round(stop.getBoundingClientRect().top);
                rows.set(top,(rows.get(top)||0)+1);
            }
            return [...rows.values()];
        ''')
        check(rows == ([5] if slug == 'yondu' else [5, 5]), f'{slug} technology rows contain at most five items: {rows}')
        check(driver.execute_script("return [...document.querySelectorAll('main > .strip--h .strip__stop[data-row-end]')].every(el=>getComputedStyle(el,'::before').display==='none')"), f'{slug} tracks stop at row ends')
        if slug == 'elmo-software':
            stages = driver.find_elements(By.CSS_SELECTOR, '.role-history .strip__stop')
            check(len(stages) == 2 and 'Mid Full Stack' in stages[0].text and 'Jun 2022' in stages[0].text and 'Senior Full Stack' in stages[1].text and '2023' in stages[1].text, 'ELMO promotion has separate dated roles')
            driver.save_screenshot(str(evidence / 'zen-desktop-elmo.png'))
            driver.find_element(By.CSS_SELECTOR, '.role-history').screenshot(str(evidence / 'zen-desktop-career.png'))
        if slug == 'yondu':
            check('Mid Frontend Developer' in driver.find_element(By.TAG_NAME, 'main').text, 'Yondu role updated')
        check(driver.execute_script('return document.documentElement.scrollWidth <= innerWidth'), f'{slug} stack fits desktop viewport')
        driver.refresh()
        check('My contributions' in driver.find_element(By.TAG_NAME, 'main').text, f'{slug} direct static route')
        driver.find_element(By.CSS_SELECTOR, '.back').click()
        wait.until(lambda d: len(d.find_elements(By.ID, 'work')) == 1)
    for path in ['/notifly/', '/homelab/']:
        driver.get(args.url + path)
        check(len(driver.find_elements(By.TAG_NAME, 'h1')) == 1, f'{path} remains available')
        check(driver.execute_script("const strips=[...document.querySelectorAll('.strip--h')];return strips.every(strip=>{const rows=new Map();for(const el of strip.children){const top=Math.round(el.getBoundingClientRect().top);rows.set(top,(rows.get(top)||0)+1)}return Math.max(...rows.values())<=5})"), f'{path} horizontal strips keep at most five items per row')
    for width in [1440, 768, 390, 320]:
        viewport(width, 900)
        driver.get(args.url)
        wait.until(lambda d: len(d.find_elements(By.CSS_SELECTOR, '.career__entry')) == 6)
        check(driver.execute_script('return document.documentElement.scrollWidth <= innerWidth'), f'No page overflow at viewport width {width}')
        check(driver.find_element(By.CSS_SELECTOR, '.hero__actions .text-link').is_displayed(), f'Work shortcut visible at {width}')
        website = driver.find_element(By.CSS_SELECTOR, '.feature__copy a[href="https://notifly.bsumatra.dev/"]')
        check(website.is_displayed() and website.accessible_name == 'Visit the Notifly website', f'Notifly website link is accessible at {width}')
        freelance = driver.find_element(By.ID, 'freelance-bai-grupbai')
        freelance.find_element(By.TAG_NAME, 'summary').click()
        check(driver.execute_script('return document.documentElement.scrollWidth <= innerWidth'), f'Expanded timeline fits viewport width {width}')
        freelance.find_element(By.TAG_NAME, 'summary').click()
        settled()
        if width == 390:
            driver.save_screenshot(str(evidence / 'zen-mobile.png'))
            driver.find_element(By.CSS_SELECTOR, '.hero__actions .text-link').click()
            wait.until(lambda d: d.current_url.endswith('#work'))
            driver.save_screenshot(str(evidence / 'zen-mobile-work.png'))
            driver.find_element(By.CSS_SELECTOR, '.career').screenshot(str(evidence / 'zen-mobile-timeline.png'))
            freelance = driver.find_element(By.ID, 'freelance-uma-ifarms')
            freelance.find_element(By.TAG_NAME, 'summary').click()
            freelance.screenshot(str(evidence / 'zen-mobile-expanded-timeline.png'))
            freelance.find_element(By.TAG_NAME, 'summary').click()
            driver.find_element(By.CSS_SELECTOR, '.career__summary').click()
            driver.find_element(By.CSS_SELECTOR, '.career__body a').click()
            wait.until(lambda d: 'ELMO Software' in d.title)
            check(driver.execute_script('return document.documentElement.scrollWidth <= innerWidth'), 'Expanded ELMO stack fits mobile viewport')
            driver.save_screenshot(str(evidence / 'zen-mobile-elmo.png'))
            driver.find_element(By.CSS_SELECTOR, '.role-history').screenshot(str(evidence / 'zen-mobile-career.png'))
            check(driver.execute_script("return [...document.querySelectorAll('main > .strip--h .strip__stop')].every(el=>Math.abs(el.getBoundingClientRect().left-document.querySelector('main > .strip--h .strip__stop').getBoundingClientRect().left)<1)"), 'Mobile technology strips stay vertical')
            driver.get(args.url + '/#freelance')
            check(driver.find_element(By.ID, 'freelance').is_displayed(), 'Legacy freelance anchor reaches the unified timeline')
    for width in [1440, 768, 390, 320]:
        viewport(width, 900)
        driver.get(args.url + '/notifly/')
        website = driver.find_element(By.CSS_SELECTOR, '.page__close a[href="https://notifly.bsumatra.dev/"]')
        check(website.is_displayed() and website.accessible_name == 'Visit the Notifly website', f'Notifly detail website link is accessible at {width}')
        check(driver.execute_script('return document.documentElement.scrollWidth <= innerWidth'), f'Notifly detail fits viewport width {width}')
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
    check(all(not train.is_displayed() for train in driver.find_elements(By.CSS_SELECTOR, '.map__train-route')), 'Reduced motion hides train carriages and pulse graphics')
    # Theme interaction confirms the client has hydrated before checking the motion preference.
    driver.find_element(By.CSS_SELECTOR, '.theme-toggle').click()
    WebDriverWait(driver, 15).until(lambda d: d.execute_script('return !!document.documentElement.dataset.theme'))
    check(driver.execute_script("return matchMedia('(prefers-reduced-motion: reduce)').matches && !document.getAnimations().some(a=>a.effect.target.closest('.map__train-route'))"), 'Reduced motion disables train animations')
finally:
    driver.quit()

(evidence / 'results.json').write_text(json.dumps({'browser': info, 'passed': results}, indent=2))
print(json.dumps({'browser': info, 'checksPassed': len(results), 'evidence': str(evidence)}, indent=2))
