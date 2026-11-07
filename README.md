# SAARTHI Model United Nations 2026

> **Theme:** *"Diplomacy, Dialogue, and Dharma"*  
> **Official Website & Multi-Page Frontend Architecture**

---

## 🏛️ Architecture Overview

The repository is structured following a professional, modular, component-driven frontend architecture. Every component and class has its own dedicated folder containing its controller class and component stylesheet, organized cleanly under `src/components/`, while dedicated subpages live in `pages/`.

```
MUN-IC/
├── index.html                                 # Landing page entry point
├── styles.css                                 # Stylesheet entry point (imports main.css)
├── script.js                                  # Root App Orchestrator class
├── package.json                               # Development scripts & metadata
│
├── pages/                                     # Dedicated Multi-Page Views
│   ├── about/                                 # Vision, statement & 3 pillars
│   │   ├── index.html
│   │   ├── AboutPage.js
│   │   └── about.css
│   ├── leadership/                            # Secretariat & executive leadership
│   │   ├── index.html
│   │   ├── LeadershipPage.js
│   │   └── leadership.css
│   ├── committees/                            # 7 committees, filters & live matrix
│   │   ├── index.html
│   │   ├── CommitteesPage.js
│   │   └── committees.css
│   ├── resources/                             # Downloads, brochure modal & guides
│   │   ├── index.html
│   │   ├── ResourcesPage.js
│   │   └── resources.css
│   └── registration/                          # Application tracks & submission form
│       ├── index.html
│       ├── RegistrationPage.js
│       └── registration.css
│
├── src/
│   ├── core/                                  # Foundation, Configuration & Scrollers
│   │   ├── config/
│   │   │   ├── AppConfig.js                   # Application tokens & timeouts
│   │   │   └── ConferenceData.js              # Committees, leadership & resources dataset
│   │   ├── state/
│   │   │   └── EventBus.js                    # Decoupled Pub-Sub event mediator
│   │   ├── scroller/
│   │   │   ├── SmoothScroller.js              # Lenis smooth-scrolling wrapper class
│   │   │   └── scroller.css
│   │   └── animations/
│   │       ├── ScrollAnimator.js              # IntersectionObserver entry animation class
│   │       └── animations.css
│   │
│   ├── styles/                                # Global Design System
│   │   ├── tokens/
│   │   │   └── variables.css                  # Colors, dark surface, gold gradients & fonts
│   │   ├── base/
│   │   │   ├── reset.css                      # Modern CSS reset
│   │   │   └── typography.css                 # Cinzel & Inter heading scales
│   │   ├── layout/
│   │   │   ├── grid.css                       # Containers, buttons, cards & utilities
│   │   │   └── layout.css                     # Common section heights & pattern layouts
│   │   └── main.css                           # Central bundle aggregator
│   │
│   └── components/                            # Class-Based Component Modules
│       ├── navbar/                            # Navbar class (scroll & mobile drawer)
│       │   ├── Navbar.js
│       │   └── navbar.css
│       ├── hero/                              # Hero banner & statistics class
│       │   ├── Hero.js
│       │   └── hero.css
│       ├── footer/                            # Footer class & copyright update
│       │   ├── Footer.js
│       │   └── footer.css
│       ├── loader/                            # Video splash & scroller unlock
│       │   ├── Loader.js
│       │   └── loader.css
│       ├── committee-card/                    # Dynamic committee card class & badges
│       │   ├── CommitteeCard.js
│       │   └── committee-card.css
│       ├── profile-card/                      # Leadership profile card & spinning glow
│       │   ├── ProfileCard.js
│       │   └── profile-card.css
│       ├── resource-card/                     # Resource & track shortcut card
│       │   ├── ResourceCard.js
│       │   └── resource-card.css
│       ├── modal/                             # Modal base & specialized dialog subclasses
│       │   ├── Modal.js
│       │   ├── MatrixModal.js
│       │   ├── BrochureModal.js
│       │   └── modal.css
│       ├── toast/                             # Toast singleton notification class
│       │   ├── Toast.js
│       │   └── toast.css
│       └── registration-form/                 # Form validation & track selection class
│           ├── RegistrationForm.js
│           └── registration-form.css
│
└── assets/                                    # Media files (logo, video, photos)
    ├── logo.png
    ├── hero.jpg
    ├── profile.jpg
    └── loadingVID.mp4
```

---

## 🚀 Key Features

1. **Class-Based OOP Frontend:** Each component is encapsulated in its own class handling its lifecycle, DOM bindings, and state updates.
2. **Decoupled EventBus:** Components trigger modals, toasts, and application track changes across modules without tight coupling.
3. **Smooth Scroll & Viewport Animations:** Powered by `Lenis` and `IntersectionObserver`.
4. **Responsive Multi-Page Structure:** Dedicated subpages for deep linking with shared navigation and design tokens.
5. **Real-Time Country & Portfolio Matrix:** Interactive modal with status tags for all 7 committees.

---

## 📦 Development & Local Testing

You can run the application with any static web server:

```bash
# Using Node.js
npx serve .

# Or using Python 3
python3 -m http.server 3000
```

Open `http://localhost:3000` in your browser.
