

# PhosoftWeb Personal Homepage

## Project Introduction

This is a personal website project built with pure HTML, CSS, and JavaScript, featuring a homepage, About modal, and more. The site is fully responsive and adapts to different device screens.

## Localization and Multilingual Support

The project supports automatic language switching and includes the following built-in languages:
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
- You can force a language via the URL parameter `?lang=xx`, e.g., `?lang=en`.
- Use `setLang('xx')` in the console to switch languages dynamically.

### Related Files
- `public/js/lang.js`: Main homepage multilingual script, responsible for language detection and content switching.
- `public/css/lang-responsive.css`: Responsive style optimization for multiple languages.
- `public/js/about-lang.js`: About modal multilingual content and switching logic (auto-generated).
- `set/public/lang.js`: Multilingual package for the admin system.

## Exam Countdown Feature

The website integrates an exam countdown feature that displays different countdown information based on the user's geographic location:

### Feature Highlights
- Displays countdowns for high school/college entrance exams
- Different display positions and animation effects for mobile and desktop
- Automatically disappears after a short display to avoid distracting users

### Technical Implementation
- Detects user region via IP address API
- Calculates remaining days accurate to 5 decimal places
- Responsive design, positioned at the bottom of the page on mobile devices

### Debug Commands
- `setRegion('region name')` - Set user region
- `setJilin()` - Quickly set to Jilin Province
- `setNonJilin()` - Quickly set to non-Jilin area
- `testZhongkaoOver()` - Test post-exam scenario
- `testBeforeZhongkao()` - Test pre-exam scenario
- `resetTestDate()` - Reset to real time
- `resetRegion()` - Reset to automatic detection
- `showRegionStatus()` - Display current status

### Related Files
- `public/js/countdown.js`: Countdown core logic
- `public/css/countdown.css`: Countdown stylesheet

## Memorial Day Grayscale Feature

The site automatically switches to grayscale mode on specific memorial days, and displays a message in the page title and browser console to commemorate major historical events and figures.

### Supported Memorial Days
- Qingming Festival (April 3-6)
- COVID-19 Memorial Day (April 4)
- Yushu Earthquake Memorial (April 14)
- Wenchuan Earthquake Memorial (May 12)
- Lidice Massacre Memorial (June 10)
- July 7 Incident Memorial (July 7)
- World Comfort Women Memorial (August 14)
- Mao Zedong Memorial (September 9)
- September 18 Incident Memorial (September 18)
- Martyrs' Memorial Day (September 30)
- Korean War Memorial (October 25)
- Nanjing Massacre National Memorial (December 13)

### Feature Highlights
- Automatically detects the current date and compares with memorial days
- Applies grayscale filter to the entire site on memorial days
- Adds the memorial day info to the page title
- Displays a memorial message in the browser console with black background and white text

### Related Files
- `public/js/grayscale.js`: Memorial day detection and grayscale filter

## Directory Structure

```
phosoftweb-home/
├── public/              # Main website files
│   ├── css/             # Stylesheets
│   │   ├── 404.css      # 404 error page style
│   │   ├── countdown.css # Countdown feature style
│   │   ├── lang-responsive.css # Multilingual responsive style
│   │   ├── modal.css    # About modal style
│   │   └── wu.css       # Common styles
│   ├── js/              # JavaScript files
│   │   ├── about.js     # About modal script
│   │   ├── countdown.js # Exam countdown script
│   │   ├── grayscale.js # Grayscale filter script
│   │   ├── lang.js      # Multilingual switching script
│   │   └── about-lang.js # About modal multilingual script
│   ├── img/             # Image resources
│   │   ├── A-logo.svg   # Phosoft icon
│   │   ├── ISC.svg      # ISC icon
│   │   └── bilibili.svg # Bilibili icon
│   ├── fonts/           # Font files
│   │   └── HarmonyOS_Sans_Medium.ttf
│   ├── video/           # Video resources
│   │   └── video.mp4    # Video
│   ├── index.html       # Website homepage
│   ├── IE303.html       # Legacy browser warning page
│   ├── 404.html         # 404 error page
│   ├── robots.txt       # Crawler protocol
│   ├── sitemap.xml      # Site map
│   └── config.yaml      # Site config
├── set/                 # Content management system
│   ├── public/          # Admin system frontend
│   │   ├── index.html   # Admin homepage
│   │   ├── styles.css   # Admin styles
│   │   ├── script.js    # Admin script
│   │   └── lang.js      # Admin multilingual package
│   ├── package.json     # Admin dependencies
│   ├── update-about.js  # Content update tool
│   └── server.js        # Admin backend
└── README.md            # Project documentation (Chinese)
```

## Technology Stack

- Frontend: HTML5, CSS3, JavaScript
- Font: HarmonyOS Sans
- Admin System: Node.js

## Features

- Responsive design for desktop and mobile
- Animation transitions for enhanced user experience
- Automatic grayscale filter on specific memorial days
- Touch screen swipe support
- Exam countdown with region-specific display
- Built-in content management system for easy About modal maintenance

## Deployment

1. Static deployment: Upload the `public` directory to any static website hosting service
2. Use GitLab Pages or Vercel for automatic deployment

## Content Update Guide

The About modal content is stored in `set/about-content.md`. To update the content, follow these steps:
1. **Export from JS (optional):** If you manually modified `public/js/about-lang.js`, you can sync it back to Markdown with:
	```bash
	node set/update-about.js extract
	```
2. **Edit Content:** Directly edit the `set/about-content.md` file.
3. **Sync to JS:** In the project root, run:
	```bash
	node set/update-about.js update
	```

## Development & Extension

- Add new pages: Create HTML files in the `public` directory
- Modify styles: Edit files in the `css` directory
- Add features: Add scripts to the `js` directory

## Compatibility

The site supports modern browsers and will show a special prompt page for incompatible browsers (such as IE).

## Copyright & Disclaimer

This website was developed by YuanZui_ChaoFan and optimized with GitHub Copilot. Some content may have been used for model training without the author's knowledge. For learning and communication only, not for commercial use.

AI-generated code may contain useless or incomprehensible code for humans.

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
