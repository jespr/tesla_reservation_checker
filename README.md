## Tesla VIN Checker

I wrote this little node script using Node and Puppeteer - mostly as an exercise in using Puppeteer as I hadn't really had a chance to play with that yet.

I decided to write this little script that logs in to your Tesla account and checks if your Model 3 reservation has gotten a VIN number. It can of course be altered to check if you're ready to configure as well.


### Getting started

Clone the repo `git clone git@github.com:jespr/tesla_reservation_checker.git` and install the required packages by running `npm install` (or `yarn` if you're using yarn).


#### Credentials

Make sure to change `credentials.js` with your credentials. It'll need your email/password to be able to log in on tesla.com as well as your reservation number in order to perform the VIN check.


#### Running it periodically

You can either run it locally when your computer is on, using crontab:

```
crontab -e
```

This brings up your crontab and my entry looks like:

```
10 * * * * node index.js
```

Which runs my script every hour on the 10th minute (so 10:10, 11:10, 12:10 and so on). You can use `https://crontab.guru` to change it to your liking and to get a better understanding of the cron syntax.

You can also take it a step further and run it on [DigitalOcean](https://m.do.co/c/8c96914d9a9a) (<-- that is a referral link, so if you don't like that just go to digitalocean.com). But that'll cost you $5 a month or so...


#### Notifications

Right now it's just set up to use [Pushover](https://pushover.net) which sends a push notification to my phone. But we should be able to add email support as well, Pushover seemed the simplest though - but it will cost a one time price of $5 after the 7 day trial.

If you have any questions, suggestions, feel free to create an issue :)
