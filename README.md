# Gemini Light Mode Enforcer

[中文版](README_CN.md)

A Tampermonkey userscript that forces Google Gemini (`https://gemini.google.com/`) to always use light mode theme.

## Description

Google Gemini normally follows your system theme preference or previous selection. This script overrides that behavior to enforce light theme consistently across:

- Main chat interface
- Sidebar and navigation
- All UI elements

## ✨ Features

### Core Functionality

- Forces light mode by managing body classes
- Injects custom CSS to override dark theme variables
- Persists through page navigation and reloads

### Technical Implementation

- Uses `MutationObserver` to monitor theme changes
- Runs at `document-start` to prevent theme flickering
- Applies `!important` CSS rules to ensure precedence
- Compatible with latest Gemini UI (as of April 2025)

### User Experience

- Zero configuration needed
- Works immediately after installation
- Lightweight (under 5KB)

## 🚀 Installation

1. **Install Tampermonkey**:

   - Chrome: [Tampermonkey Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - Firefox: [Tampermonkey Add-ons](https://addons.mozilla.org/firefox/addon/tampermonkey/)
   - Edge: [Tampermonkey Microsoft Store](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iinmkddhdlojikpfnpnppnbhicjjldce)

2. **Install the Script**:

   - Open Tampermonkey dashboard
   - Click "Create a new script"
   - Copy the entire content of `gemini_light_mode.user.js`
   - Paste into the editor (overwriting default content)
   - Save (Ctrl+S or File → Save)

3. **Verify Installation**:
   - Visit [Gemini](https://gemini.google.com/)
   - The page should now always load in light mode
   - Check Tampermonkey dashboard to confirm script is enabled

## ⚙️ Technical Details

### CSS Injection

The script uses `GM_addStyle` to inject critical CSS rules that:

- Override Gemini's dark theme variables
- Force light colors for backgrounds, text, and UI elements
- Ensure consistency across all components

### Class Management

The script maintains light theme by:

1. Removing any existing `dark-theme` class
2. Adding `light-theme` class if missing
3. Monitoring changes via `MutationObserver`

### Performance

- Minimal resource usage
- Only activates on gemini.google.com
- Efficient DOM observation

## ⚠️ Notes & Troubleshooting

### Compatibility

- Tested with Gemini UI version: April 2025
- May require updates if Google changes their frontend

### Common Issues

1. **Theme flickering**:

   - Ensure script runs at `document-start`
   - Check for conflicts with other userscripts

2. **Not working**:

   - Verify Tampermonkey is enabled
   - Check script is active on gemini.google.com
   - Clear cache and hard reload (Ctrl+F5)

3. **Partial styling**:
   - May indicate CSS variable changes by Google
   - Check console for errors

## 📄 License

MIT License - See [LICENSE](LICENSE) for details
