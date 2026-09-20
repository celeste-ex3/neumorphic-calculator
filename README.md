# Lumina Calculator
A premium neumorphic calculator with three distinct themes. Built with vanilla HTML, CSS, and JavaScript. No frameworks, no dependencies, just clean code.

## Features

- Three fully realized themes: Light, Dark, and Premium (glassmorphism)
- Theme preference saved to local Storage
- Full keyboard support for all operations
- Accessible: ARIA labels, focus states, reduced motion support
- Responsive design that adapts to any screen size
- Neumorphic soft UI with carefully tuned shadows and glows
- Smooth animations and micro-interactions
- No frameworks, no build step, just open and use

## Tech Stack

- HTML5
- CSS3 (custom properties, flex-box, grid, backdrop-filter)
- Vanilla JavaScript (ES6+)
- local Storage for theme persistence
- ARIA for accessibility

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| 0-9 | Input digits |
| . or , | Decimal point |
| + | Add |
| - | Subtract |
| * or x | Multiply |
| / | Divide |
| Enter or = | Equals |
| Backspace | Delete last digit |
| Escape or Delete | Clear all |
| % | Percent |

## Accessibility

- All buttons have descriptive `aria-label` attributes
- Focus states are clearly visible with high-contrast outlines
- `prefers-reduced-motion` is respected to disable animations for sensitive users
- Display uses `aria-live` for screen reader announcements
- Semantic HTML structure

## Themes

The calculator ships with three themes that completely change the look and feel:
### Premium Theme
Glassmorphism with animated gradients and a purple/pink palette
 
<img width="1920" height="905" alt="Screenshot 2026-09-20 at 13-18-40 Lumina Calculator - Premium Edition" src="https://github.com/user-attachments/assets/45d37828-454c-4797-a920-f8279b3fb217" />

### Light Theme
Soft neumorphic light grey with blue accents

<img width="1920" height="901" alt="Screenshot 2026-09-20 at 13-41-53 Lumina Calculator - Premium Edition" src="https://github.com/user-attachments/assets/23cd29ae-1466-4dab-a60e-3ffd7aa0f472" />

### Dark Theme
Deep charcoal with lighter neumorphic shadows

<img width="1920" height="901" alt="Screenshot 2026-09-20 at 13-41-58 Lumina Calculator - Premium Edition" src="https://github.com/user-attachments/assets/d97b040b-9394-4ac5-a7cc-bf6f2b23548e" />

**Click the theme toggle button in the top right corner to cycle through them. Your choice is saved and restored on your next visit.**


## Installation

No installation needed. Just clone the repo and open `index.html` in your browser.

```bash
git clone https://github.com/celeste-ex3/neumorphic-calculator.git
cd neumorphic-calculator
open index.html
```

## Contact

- GitHub: [@celeste-ex3](https://github.com/celeste-ex3)
- LinkedIn: [Safyan Khan](https://www.linkedin.com/in/safyankhan/)
