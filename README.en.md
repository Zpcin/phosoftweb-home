
# PhosoftWeb Personal Homepage

## Project Introduction

PhosoftWeb is a personal website project built with pure HTML, CSS, and JavaScript. It features a homepage, a dynamic About modal, exam countdown, memorial grayscale mode, and more. The site is fully responsive and supports multiple languages.

## Features

- Responsive design for desktop and mobile
- Dynamic About modal (not a separate page), content managed via Markdown and multi-language
- Exam countdown with region-specific display
- Automatic grayscale filter and console message on memorial days
- Touch/swipe navigation for About modal on mobile
- Bilibili video block, friend links, and more
- Built-in content management system for About content (Markdown-driven)
- Modern browser compatibility with fallback for legacy browsers

## Localization and Multilingual Support

The site supports automatic language switching and the following built-in languages:
- Simplified Chinese (zh-cn)
- Traditional Chinese (zh-tw, zh-hk)
- English (en, en-sg)
- Japanese (ja)
- Literary Chinese (wenyan)
- Pinyin (pinyin)
- Zhuyin (zhuyin)

### Language Switching
- Auto-detects browser language
- Some regions auto-switch by IP
- Force language via `?lang=xx` URL parameter (e.g. `?lang=en`)
- Use `setLang('xx')` in the console to switch dynamically

### Key Files
- `public/js/lang.js`: Homepage multilingual logic
- `public/css/lang-responsive.css`: Responsive styles for multiple languages
- `public/js/about-lang.js`: About modal multilingual content (auto-generated)
- `set/about-content.md`: Markdown source for About modal content (edit here)
- `set/update-about.js`: Node.js tool to sync Markdown to JS

## Exam Countdown Feature

Displays personalized exam countdowns based on user region:
- Jilin users see middle/high school exam countdowns
- Automatically switches between 2025/2028 exams by date
- Responsive position and animation for mobile/desktop
- Auto-hides after a short time

### Debug Commands
- `setRegion('region name')` - Set user region
- `setJilin()` - Set to Jilin
- `setNonJilin()` - Set to non-Jilin
- `testZhongkaoOver()` - Simulate post-exam
- `testBeforeZhongkao()` - Simulate pre-exam
- `resetTestDate()` - Reset to real time
- `resetRegion()` - Reset region detection
- `showRegionStatus()` - Show current status

### Related Files
- `public/js/countdown.js`: Countdown logic
- `public/css/countdown.css`: Countdown styles

## Memorial Day Grayscale Feature

On specific memorial days, the site automatically applies a grayscale filter and displays a message in the browser console and page title to commemorate historical events.

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

### Related Files
- `public/js/grayscale.js`: Memorial day detection and grayscale logic

## Directory Structure

```
phosoftweb-home/
├── public/              # Main website files
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript files
│   ├── img/             # Image resources
│   ├── fonts/           # Font files
│   ├── video/           # Video resources
│   ├── index.html       # Website homepage
│   ├── IE303.html       # IE browser warning
│   ├── 404.html         # 404 error page
│   ├── robots.txt       # Crawler protocol
│   ├── sitemap.xml      # Site map
│   └── config.yaml      # Site config
├── set/                 # Content management system
│   ├── about-content.md # About modal content (Markdown, multi-language)
│   ├── update-about.js  # Markdown <-> JS sync tool
│   ├── gui/             # GUI for content management
│   ├── gui-editor/      # GUI editor
│   └── ...
├── README.md            # Project documentation (Chinese)
├── README.en.md         # Project documentation (English)
```

## Technology Stack

- Frontend: HTML5, CSS3, JavaScript
- Font: HarmonyOS Sans
- Content Management: Node.js, Express.js, Cheerio

## Deployment

1. Static deployment: Upload the `public` directory to any static hosting service
2. Use GitLab Pages, Vercel, or similar platforms for automatic deployment

## Using the Content Management System

1. Install dependencies: `npm install`
2. Start the management service: `node set/server.js`
3. Visit: `http://localhost:3000`
4. Edit About modal content via the web interface or directly in `set/about-content.md`, then run `node set/update-about.js update` to sync

## Development & Extension

- Add new pages: Create HTML files in `public/`
- Modify styles: Edit files in `public/css/`
- Add features: Add scripts to `public/js/`

## Compatibility

Supports all modern browsers. Shows a warning page for incompatible browsers (e.g., IE).

## Copyright & Disclaimer

Developed by YuanZui_ChaoFan, optimized with GitHub Copilot. Some content/code may have been used for model training without the author's knowledge. For learning and communication only, not for commercial use.

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
