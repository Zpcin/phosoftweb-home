# PhosoftWeb Personal Homepage

## Project Introduction

This is a personal website project built with pure HTML, CSS, and JavaScript, including homepage, about page and other content. The project supports responsive layout, adapting to different device screen sizes.

## Localization and Multilingual Support

This project supports automatic language switching with the following built-in languages:
- Simplified Chinese (zh-cn)
- Traditional Chinese (zh-tw, zh-hk)
- English (en, en-sg)
- Japanese (ja)
- Classical Chinese (wenyan)
- Pinyin (pinyin)
- Zhuyin (zhuyin)

### Language Switching Methods
- Automatically switches based on browser language by default
- Some regions will auto-switch based on IP location
- Force language via URL parameter `?lang=xx` (e.g. `?lang=en`)
- Use `setLang('xx')` in console to dynamically switch languages

### Related Files
- `public/js/lang.js`: Main multilingual script for homepage
- `public/css/lang-responsive.css`: Responsive styles for multilingual support
- `public/js/about-lang.js`: About page multilingual content
- `set/public/lang.js`: Admin system language pack

## Exam Countdown Feature

The website integrates exam countdowns that display differently based on user location:

### Features
- Shows middle school/college entrance exam countdowns
- Different display positions and animations for mobile/desktop
- Automatically disappears after brief display

### Technical Implementation
- Detects user region via IP API
- Calculates remaining days with 5 decimal precision
- Responsive design (bottom position on mobile)

### Debug Commands
- `setRegion('region')` - Set user region
- `setJilin()` - Set to Jilin Province
- `setNonJilin()` - Set to non-Jilin region
- `testZhongkaoOver()` - Test post-exam scenario
- `testBeforeZhongkao()` - Test pre-exam scenario
- `resetTestDate()` - Reset to real time
- `resetRegion()` - Reset auto-detection
- `showRegionStatus()` - Show current status

### Related Files
- `public/js/countdown.js`: Countdown core logic
- `public/css/countdown.css`: Countdown styles

## Special Memorial Dates

The website automatically applies grayscale mode on memorial days and shows tribute messages.

### Supported Memorial Dates
- Qingming Festival (Apr 3-6)
- COVID-19 Memorial Day (Apr 4)
- Yushu Earthquake (Apr 14)
- Wenchuan Earthquake (May 12)
- Lidice Massacre (Jun 10)
- July 7 Incident (Jul 7)
- Comfort Women Day (Aug 14)
- Chairman Mao's Death (Sep 9)
- September 18 Incident (Sep 18)
- Martyrs' Day (Sep 30)
- Korean War (Oct 25)
- Nanjing Massacre (Dec 13)

### Features
- Auto-detects current date
- Applies site-wide grayscale filter
- Adds memorial info to page title
- Shows console tribute message

### Related Files
- `public/js/grayscale.js`: Date detection and grayscale filter

## Directory Structure
```
phosoftweb-home/
├── public/
│ ├── css/
│ │ ├── 404.css
│ │ ├── about.css
│ │ ├── countdown.css
│ │ ├── lang-responsive.css
│ │ ├── sponsor.css
│ │ └── wu.css
│ ├── js/
│ │ ├── about.js
│ │ ├── about-lang.js
│ │ ├── countdown.js
│ │ ├── grayscale.js
│ │ ├── lang.js
│ │ ├── sponsor.js
│ │ └── watermark.js
│ ├── img/
│ ├── fonts/
│ ├── video/
│ ├── index.html
│ ├── about.html
│ ├── IE303.html
│ ├── 404.html
│ ├── robots.txt
│ ├── sitemap.xml
│ └── config.yaml
├── set/
│ ├── public/
│ │ ├── index.html
│ │ ├── styles.css
│ │ ├── script.js
│ │ └── lang.js
│ ├── package.json
│ └── server.js
└── README.md
```

## Technology Stack

- Frontend: HTML5, CSS3, JavaScript
- Font: HarmonyOS Sans
- Admin System: Express.js, Cheerio

## Features

- Responsive design
- Animation transitions
- Automatic grayscale on memorial days
- Touchscreen support
- Regional exam countdowns
- Built-in CMS for content management

## Deployment

1. Static: Deploy `public` folder
2. Use GitLab Pages/Vercel

## CMS Usage

1. Install: `npm install`
2. Start: `node set/server.js`
3. Access: `http://localhost:3000`

## Development

- Add pages in `public`
- Modify styles in `css`
- Add scripts in `js`

## Compatibility

Supports modern browsers (shows special page for IE)

## Copyright

Developed by YuanZui_ChaoFan, optimized with GitHub Copilot. For learning only, not commercial use.
Code optimized by Lz's Studio.

May contain AI-generated code segments.