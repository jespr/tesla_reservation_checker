const puppeteer = require('puppeteer');
// Read more about Pushover on https://pushover.net
var Push = require('pushover-notifications')

const http = require('http');

const CREDENTIALS = require('./credentials');

// These are all our CSS selcetors for the different elements of the page
// The easiest way is to inspect an element in Chrome (Option + CMD + j on a Mac), and right click on it
// in the HTML and Copy > Copy selector
const EMAIL_SELECTOR = '#login-form > div.login-body > div > div.control.email > input';
const PASSWORD_SELECTOR = '#login-form > div.login-body > div > div.control.password > input';
const BUTTON_SELECTOR = '#login-form > div.login-body > div > div.has-text-centered.signin > button';
const VIN_SECTION = '#page > div > div.pane-content-constrain > main > div > div > div > div > div:nth-child(2) > table > tbody > tr > td.model-name'

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://auth.tesla.com/login');

  await page.click(EMAIL_SELECTOR);
  await page.keyboard.type(CREDENTIALS.username);

  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDENTIALS.password);

  await page.click(BUTTON_SELECTOR);

  await page.waitForNavigation();

  await page.waitForSelector(VIN_SECTION);

  const vinSection = await page.$(VIN_SECTION);

  const html = await page.evaluate(body => body.innerHTML, vinSection);
  await vinSection.dispose();

  const regex = new RegExp(CREDENTIALS.reservationNumber, 'g');

  // if it doesn't match it means that our reservation number on the page
  // has been replaced with the VIN
  if (!html.match(regex)) {
    var p = new Push({
      user: CREDENTIALS.pushoverUser,
      token: CREDENTIALS.pushoverKey
    })

    var msg = {
      message: 'Tesla Model 3 has a VIN',	// required
      title: "boom!",
      sound: 'magic',
      priority: 1
    }

    p.send(msg, function (err, result) {
      if (err) { throw err }
    })
  }

  browser.close();
}

run();
