// ==UserScript==
// @name         Gemini Light Mode
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Forces light mode on gemini.google.com, including sidebar, top bar, model selector, and input area elements.
// @author       Eyozy
// @match        https://gemini.google.com/*
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzQyODVGNCIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+DQogIDxwYXRoIGQ9Ik0xMiAyIEwxNC41IDkuNSBMMjIgMTIgTDE0LjUgMTQuNSBMMTIgMjIgTDkuNSAxNC41IEwyIDEyIEw5LjUgOS41IFoiLz4NCjwvc3ZnPg==
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";

  // --- CSS Rules for Light Theme ---
  const lightModeCSS = `
        /* Force light theme on body */
        body {
            --gem-sys-color--surface: #fff !important;
            --gem-sys-color--on-surface: #1f1f1f !important;
            --gem-sys-color--surface-container-low: #f8fafd !important; /* Light background for containers */
            --gem-sys-color--surface-container: #f0f4f9 !important;
            --gem-sys-color--surface-container-high: #e9eef6 !important;
            --gem-sys-color--surface-container-highest: #dde3ea !important;
            --gem-sys-color--on-surface-variant: #444746 !important; /* Dark color for secondary text/icons */
            --gem-sys-color--primary: #0b57d0 !important;
            --gem-sys-color--on-primary-container: #0842a0 !important;
            --bard-color-new-conversation-button: var(--gem-sys-color--surface-container-high, #e9eef6) !important;
            --bard-color-on-new-conversation-button: var(--gem-sys-color--on-surface-variant, #444746) !important;
            --bard-color-onhover-conversation-metadata-button-v2: var(--gem-sys-color--surface-container-high, #e9eef6) !important;
            color-scheme: light !important; /* Force light color scheme */
        }

        /* Ensure html also uses light scheme */
        html {
            color-scheme: light !important;
        }

        /* Potential Sidebar Containers */
        .mat-drawer-inner-container,
        mat-sidenav,
        nav[aria-label*="Main"],
        div[class*="sidenav"],
        div[id*="sidenav"],
        div[class*="sidebar"],
        div[id*="sidebar"]
         {
            background-color: var(--bard-color-sidenav-background, #f8fafd) !important;
            color: var(--gem-sys-color--on-surface, #1f1f1f) !important;
        }

        /* Sidebar Text Elements */
        .mat-drawer-inner-container *,
        mat-sidenav *,
        nav[aria-label*="Main"] *,
        div[class*="sidenav"] *,
        div[id*="sidenav"] *,
        div[class*="sidebar"] *,
        div[id*="sidebar"] * {
           color: var(--gem-sys-color--on-surface, #1f1f1f) !important;
        }


        /* Sidebar Links/Buttons/List Items */
        .mat-drawer-inner-container a, .mat-drawer-inner-container button, .mat-drawer-inner-container .mat-mdc-list-item,
        mat-sidenav a, mat-sidenav button, mat-sidenav .mat-mdc-list-item,
        nav[aria-label*="Main"] a, nav[aria-label*="Main"] button, nav[aria-label*="Main"] .mat-mdc-list-item,
        div[class*="sidenav"] a, div[class*="sidenav"] button, div[class*="sidenav"] .mat-mdc-list-item,
        div[id*="sidenav"] a, div[id*="sidenav"] button, div[id*="sidenav"] .mat-mdc-list-item,
        div[class*="sidebar"] a, div[class*="sidebar"] button, div[class*="sidebar"] .mat-mdc-list-item {
            color: var(--gem-sys-color--on-surface-variant, #444746) !important;
        }
        .mat-drawer-inner-container .mat-mdc-list-item:hover,
        mat-sidenav .mat-mdc-list-item:hover,
        nav[aria-label*="Main"] .mat-mdc-list-item:hover,
        div[class*="sidenav"] .mat-mdc-list-item:hover,
        div[id*="sidenav"] .mat-mdc-list-item:hover,
        div[class*="sidebar"] .mat-mdc-list-item:hover {
             background-color: var(--gem-sys-color--surface-container-high, #e9eef6) !important;
        }


         /* Sidebar Icons (using mat-icon as an example) */
        .mat-drawer-inner-container mat-icon,
        mat-sidenav mat-icon,
        nav[aria-label*="Main"] mat-icon,
        div[class*="sidenav"] mat-icon,
        div[id*="sidenav"] mat-icon,
        div[class*="sidebar"] mat-icon,
        .mat-mdc-list-item .mat-icon /* Icons inside list items */
         {
             color: var(--gem-sys-color--on-surface-variant, #444746) !important;
         }

         /* Specific fix for the round icon backgrounds in sidebar */
         .mat-mdc-list-item .mat-icon-button { /* Adjust selector if needed */
             background-color: var(--gem-sys-color--surface-container-high, #e9eef6) !important;
             color: var(--gem-sys-color--on-surface-variant, #444746) !important;
         }
         .mat-mdc-list-item .mat-icon-button mat-icon {
              color: var(--gem-sys-color--on-surface-variant, #444746) !important;
         }

         /* New Chat button */
         button[aria-label*="New chat"], button[aria-label*="新建对话"] {
             background-color: var(--bard-color-new-conversation-button, #dde3ea) !important;
             color: var(--bard-color-on-new-conversation-button, #444746) !important;
         }
         button[aria-label*="New chat"] mat-icon, button[aria-label*="新建对话"] mat-icon {
             color: var(--bard-color-on-new-conversation-button, #444746) !important;
         }

         /* --- START: Fixes for Top Bar Buttons --- */

         /* Google Bar Buttons (General Default State - Keep as fallback) */
         #gb .gb_B {
             background-color: transparent !important;
             background: none !important; /* Ensure no background */
             color: var(--gem-sys-color--on-surface-variant, #444746) !important;
             fill: var(--gem-sys-color--on-surface-variant, #444746) !important;
         }
         /* Ensure SVGs within buttons inherit the correct color */
         #gb .gb_B svg {
             color: inherit !important;
             fill: currentColor !important;
             background: none !important; /* Ensure SVG has no background */
         }

         /* Google Bar Buttons Hover State (General Fallback) */
         #gb .gb_B:hover {
             background-color: var(--gem-sys-color--surface-container-high, #e9eef6) !important;
             background: var(--gem-sys-color--surface-container-high, #e9eef6) !important; /* Ensure hover background */
             color: var(--gem-sys-color--on-surface, #1f1f1f) !important;
             fill: var(--gem-sys-color--on-surface, #1f1f1f) !important;
         }
         /* Ensure SVGs within hovered buttons inherit the correct hover color */
         #gb .gb_B:hover svg {
             color: inherit !important;
             fill: currentColor !important;
             background: none !important;
         }

         /* --- START: Specific Fix for Google Apps Button (v0.5) --- */
         #gb .gb_J.gb_cd a.gb_B[aria-label*="Google 应用"], /* More specific parent */
         #gb .gb_J.gb_cd a.gb_B[aria-label*="Google Apps"] {
             background-color: transparent !important;
             background: none !important; /* Try 'background: none' as well */
             color: var(--gem-sys-color--on-surface-variant, #444746) !important;
             fill: var(--gem-sys-color--on-surface-variant, #444746) !important;
         }

         /* Ensure no background on pseudo-elements */
         #gb a.gb_B[aria-label*="Google 应用"]::before,
         #gb a.gb_B[aria-label*="Google 应用"]::after,
         #gb a.gb_B[aria-label*="Google Apps"]::before,
         #gb a.gb_B[aria-label*="Google Apps"]::after {
             background: none !important;
         }

         /* Ensure SVG itself doesn't have a background fill */
         #gb a.gb_B[aria-label*="Google 应用"] svg,
         #gb a.gb_B[aria-label*="Google Apps"] svg {
             background-color: transparent !important;
             background: none !important;
             fill: currentColor !important; /* Inherit fill from parent 'a' tag */
         }


         /* Hover state - ensure transparency is maintained if needed, or apply light hover */
         #gb .gb_J.gb_cd a.gb_B[aria-label*="Google 应用"]:hover,
         #gb .gb_J.gb_cd a.gb_B[aria-label*="Google Apps"]:hover {
             background-color: var(--gem-sys-color--surface-container-high, #e9eef6) !important; /* Consistent hover background */
             background: var(--gem-sys-color--surface-container-high, #e9eef6) !important; /* Ensure hover background applies */
             color: var(--gem-sys-color--on-surface, #1f1f1f) !important;
             fill: var(--gem-sys-color--on-surface, #1f1f1f) !important;
         }
         /* --- END: Specific Fix for Google Apps Button (v0.5) --- */


         /* Specific override for Account button's image (gb_P class on img) */
         #gb .gb_Za .gb_P {
             background-color: transparent !important; /* Ensure image background is transparent */
             background: none !important;
             /* border: 1px solid var(--gem-sys-color--outline-variant, #c4c7c5); */ /* Uncomment if border needed */
         }
         #gb .gb_Za:hover .gb_P {
            /* Optional: Style image container on hover if needed */
         }

         /* --- END: Fixes for Top Bar Buttons --- */

         /* --- START: Fix for Top Left "Gemini Advanced" Button Background (v0.6) --- */
         /* Target potential containers/links for the top-left button, excluding the Google Bar */
         .app-header .model-switcher button, /* Common pattern for model switchers */
         .app-header a[href*="/advanced"],
         button[aria-label*="Gemini Advanced"],
         a[aria-label*="Gemini Advanced"]
         {
             background-color: transparent !important;
             background: none !important;
             color: var(--gem-sys-color--on-surface-variant, #444746) !important; /* Adjust color if needed */
             fill: var(--gem-sys-color--on-surface-variant, #444746) !important;
         }

         .app-header .model-switcher button:hover,
         .app-header a[href*="/advanced"]:hover,
         button[aria-label*="Gemini Advanced"]:hover,
         a[aria-label*="Gemini Advanced"]:hover
         {
             background-color: var(--gem-sys-color--surface-container-high, #e9eef6) !important;
             background: var(--gem-sys-color--surface-container-high, #e9eef6) !important;
             color: var(--gem-sys-color--on-surface, #1f1f1f) !important; /* Adjust hover color if needed */
             fill: var(--gem-sys-color--on-surface, #1f1f1f) !important;
         }

         /* Ensure icons within the button are also styled correctly */
         .app-header .model-switcher button mat-icon,
         .app-header .model-switcher button svg,
         .app-header a[href*="/advanced"] mat-icon,
         .app-header a[href*="/advanced"] svg,
         button[aria-label*="Gemini Advanced"] mat-icon,
         button[aria-label*="Gemini Advanced"] svg,
         a[aria-label*="Gemini Advanced"] mat-icon,
         a[aria-label*="Gemini Advanced"] svg
         {
             color: inherit !important;
             fill: currentColor !important;
             background: none !important;
         }
         /* --- END: Fix for Top Left "Gemini Advanced" Button Background (v0.6) --- */


         /* --- START: Fix for Stop Generating Button --- */

         /* Stop Generating Button */
         .input-actions .mat-icon-button[aria-label*="Stop"],
         .input-actions .mat-icon-button[aria-label*="停止"] {
             color: var(--gem-sys-color--on-surface-variant, #444746) !important;
             background-color: transparent !important;
             background: none !important;
         }

         .input-actions .mat-icon-button[aria-label*="Stop"]:hover,
         .input-actions .mat-icon-button[aria-label*="停止"]:hover {
             background-color: var(--gem-sys-color--surface-container-high, #e9eef6) !important;
             background: var(--gem-sys-color--surface-container-high, #e9eef6) !important;
             color: var(--gem-sys-color--on-surface, #1f1f1f) !important;
         }

         /* Icon inside the stop button */
         .input-actions .mat-icon-button[aria-label*="Stop"] mat-icon,
         .input-actions .mat-icon-button[aria-label*="停止"] mat-icon,
         .input-actions .mat-icon-button[aria-label*="Stop"] svg,
         .input-actions .mat-icon-button[aria-label*="停止"] svg {
             color: inherit !important;
             fill: currentColor !important;
             background: none !important;
         }

         /* Ensure hover state icon color is inherited correctly */
         .input-actions .mat-icon-button[aria-label*="Stop"]:hover mat-icon,
         .input-actions .mat-icon-button[aria-label*="停止"]:hover mat-icon,
         .input-actions .mat-icon-button[aria-label*="Stop"]:hover svg,
         .input-actions .mat-icon-button[aria-label*="停止"]:hover svg {
             color: inherit !important;
             fill: currentColor !important;
         }

         /* --- END: Fix for Stop Generating Button --- */

         /* General Hover/Focus States (Adjust if needed) */
         /* Keep the specific sidebar hover rules */
        .mat-drawer-inner-container a:hover, .mat-drawer-inner-container button:hover,
        mat-sidenav a:hover, mat-sidenav button:hover {
             background-color: var(--gem-sys-color--surface-container-high, #e9eef6) !important;
        }

    `;

  // --- Script Logic ---

  // Inject the CSS as soon as possible
  GM_addStyle(lightModeCSS);
  console.log("Gemini Light Mode: Injected CSS overrides (v0.6).");

  // Function to apply the light theme class to body
  function forceLightModeClass() {
    const bodyElement = document.body;
    const htmlElement = document.documentElement; // Target html element too
    if (bodyElement && htmlElement) {
      // Remove dark theme class if present
      if (bodyElement.classList.contains("dark-theme")) {
        bodyElement.classList.remove("dark-theme");
        console.log("Gemini Light Mode: Removed dark-theme class from body.");
      }
      // Add light theme class if not present
      if (!bodyElement.classList.contains("light-theme")) {
        bodyElement.classList.add("light-theme");
        console.log("Gemini Light Mode: Added light-theme class to body.");
      }
      // Ensure html element also has light scheme
      htmlElement.style.colorScheme = "light";
      // Force background color on body just in case
      bodyElement.style.backgroundColor = "var(--gem-sys-color--surface, #fff)";
    } else {
      console.error(
        "Gemini Light Mode: Body or HTML element not found for class/style manipulation."
      );
    }
  }

  // Apply the theme class immediately when the body is available
  if (document.body && document.documentElement) {
    forceLightModeClass();
  } else {
    // Wait for the body element to be ready if script runs too early
    new MutationObserver((mutations, observer) => {
      if (document.body && document.documentElement) {
        forceLightModeClass();
        observer.disconnect(); // Stop observing once body is found
        // Start observing body class changes *after* initial setup
        startBodyClassObserver();
      }
    }).observe(document.documentElement, { childList: true });
  }

  // Observe changes to the body's class attribute to re-apply if needed
  let bodyClassObserver = null;
  function startBodyClassObserver() {
    if (!document.body || !document.documentElement || bodyClassObserver)
      return; // Don't start if no body/html or already started

    bodyClassObserver = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          (mutation.attributeName === "class" ||
            mutation.attributeName === "style") // Also watch style changes
        ) {
          const bodyElement = document.body;
          const htmlElement = document.documentElement;
          // Check if the classes/styles need correction again
          if (
            bodyElement &&
            htmlElement &&
            (bodyElement.classList.contains("dark-theme") ||
              !bodyElement.classList.contains("light-theme") ||
              htmlElement.style.colorScheme !== "light")
          ) {
            console.log(
              "Gemini Light Mode: Body class/style changed, re-applying light theme."
            );
            forceLightModeClass();
          }
        }
      }
    });

    // Observe body for class changes and html for style changes (like color-scheme)
    bodyClassObserver.observe(document.body, { attributes: true });
    bodyClassObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });
    console.log(
      "Gemini Light Mode: Started observing body class and html style changes."
    );
  }

  // If body exists initially, start the observer right away
  if (document.body && document.documentElement) {
    startBodyClassObserver();
  }

  // Clean up the observer when the window is unloaded
  window.addEventListener("unload", () => {
    if (bodyClassObserver) {
      bodyClassObserver.disconnect();
      console.log("Gemini Light Mode: Body/HTML observer disconnected.");
    }
  });
})();
