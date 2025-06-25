# PhosoftWeb Personal Homepage

## Project Introduction

This is a personal website project built with pure HTML, CSS, and JavaScript, including a homepage, about page, and other content. The project supports responsive layout, adapting to different device screen sizes.

## Localization and Multilingual Support

This project supports automatic language switching with the following languages built in:
- Simplified Chinese (zh-cn)
- Traditional Chinese (zh-tw, zh-hk)
- English (en, en-sg)
- Japanese (ja)
- Classical Chinese (wenyan)
- Pinyin (pinyin)
- Zhuyin (zhuyin)

### Language Switching Methods
- Automatically switches based on browser language by default.
- Some regions will automatically switch to the corresponding language based on IP.
- Languages can be forced via URL parameter `?lang=xx`, e.g., `?lang=en`.
- Use `setLang('xx')` in the console to dynamically switch languages.

### Related Files
- `public/js/lang.js`: Main site homepage multilingual script, responsible for language detection and content switching.
- `public/css/lang-responsive.css`: Responsive style optimization for multiple languages.
- `set/public/lang.js`: Multilingual package for the admin system.

## Exam Countdown Feature

The website integrates an exam countdown feature that displays different countdown information based on the user's geographic location:

### Feature Highlights
- Users in Jilin Province see middle school/high school entrance exam countdowns
- Automatically displays countdown to 2025 middle school or 2028 high school entrance exams based on time
- Different display positions and animation effects for mobile and desktop
- Automatically disappears after brief display to avoid distracting users

### Technical Implementation
- Detects user's region through IP address API
- Calculates remaining days accurate to 5 decimal places
- Responsive design, positioned at the bottom of the page on mobile devices

### Debug Commands
- `setRegion('region name')` - Set user region
- `setJilin()` - Quickly set to Jilin Province
- `setNonJilin()` - Quickly set to non-Jilin area
- `testZhongkaoOver()` - Test post-middle school exam time scenario
- `testBeforeZhongkao()` - Test pre-middle school exam time scenario
- `resetTestDate()` - Reset to real time
- `resetRegion()` - Reset to automatic detection
- `showRegionStatus()` - Display current status

### Related Files
- `public/js/countdown.js`: Countdown core logic
- `public/css/countdown.css`: Countdown stylesheet

## Directory Structure

```
phosoftweb-home/
├── public/              # Main website files
│   ├── css/             # Stylesheets
│   │   ├── 404.css      # 404 error page style
│   │   ├── about.css    # About page style
│   │   ├── countdown.css # Countdown feature style
│   │   ├── lang-responsive.css # Multilingual responsive style
│   │   └── wu.css       # Common styles
│   ├── js/              # JavaScript files
│   │   ├── about.js     # About page script
│   │   ├── countdown.js # Exam countdown script
│   │   ├── grayscale.js # Grayscale filter script
│   │   ├── lang.js      # Multilingual switching script
│   │   └── watermark.js # Watermark effect script
│   ├── img/             # Image resources
│   │   ├── A-logo.svg   # Phosoft icon
│   │   └── bilibili.svg # Bilibili icon
│   ├── fonts/           # Font files
│   │   └── HarmonyOS_Sans_Medium.ttf
│   ├── video/           # Video resources
│   │   └── video.mp4    # Video
│   ├── index.html       # Website homepage
│   ├── about.html       # About page
│   ├── IE303.html       # IE browser incompatibility notice page
│   ├── 404.html         # 404 error page
│   ├── robots.txt       # Crawler protocol
│   ├── sitemap.xml      # Site map
│   └── config.yaml      # Site configuration
├── set/                 # Content Management System
│   ├── public/          # Admin system frontend
│   │   ├── index.html   # Admin system homepage
│   │   ├── styles.css   # Admin system styles
│   │   ├── script.js    # Admin system script
│   │   └── lang.js      # Admin system language package
│   ├── package.json     # Admin system dependencies
│   └── server.js        # Admin system backend
├── README.md            # Project documentation (Chinese)
├── README.en.md         # Project documentation (English)
```

## Technology Stack

- Frontend: HTML5, CSS3, JavaScript
- Font: HarmonyOS Sans
- Admin System: Express.js, Cheerio

## Features

- Responsive design, adapting to desktop and mobile devices
- Animation transition effects enhance user experience
- Automatic grayscale filter application on specific memorial days
- Touch screen swipe operation support
- Exam countdown feature with region-specific personalized display
- Built-in content management system for easy maintenance of about page content

## Deployment Methods

1. Static deployment: Deploy the `public` directory to any static website hosting service
2. Use GitLab Pages or Vercel platforms for automatic deployment

## Using the Content Management System

1. Install dependencies: `npm install`
2. Start management service: `node set/server.js`
3. Access: `http://localhost:3000`
4. Edit the about page content through the interface, click save to update the website

## Development and Extension

- Add new pages: Create HTML files in the `public` directory
- Modify styles: Edit style files in the `css` directory
- Add functionality: Add script files to the `js` directory

## Compatibility

The website supports modern browsers and displays special prompt pages for incompatible browsers (such as IE).

## Copyright and Disclaimer

This website was developed by 原罪_超凡 (YuanZui_ChaoFan), optimized with GitHub Copilot. Some content may contain code unknowingly used for model training. For learning and communication purposes only, not for commercial use.
