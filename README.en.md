<div align="center">

<img src="src/ui/assets/pokeidle-logo-smooth.png" width="320" alt="PokeIdle IO">
<br>
<img src="src/ui/assets/rebosteio-logo.png" width="240" alt="PIO Rebosteio">

# PIO Rebosteio — Multi-Account Launcher

**High-density multi-account trainer workspace for Poke Idle IO.**

![Platform](https://img.shields.io/badge/Windows%20%C2%B7%20macOS%20%C2%B7%20Linux-0078D6?style=flat-square)
![Electron](https://img.shields.io/badge/Electron-43-47848F?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-Auto--Setup%20%7C%20LTS-339933?style=flat-square)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

[Português](README.md) · [Manual](MANUAL.md) · [FAQ](FAQ.md) · [Tutorial](TUTORIAL.md) · [Changelog](CHANGELOG.md)

</div>

> This is the run-from-source version. There are no opaque or proprietary binaries: you have full access to inspect the code, verify what it does, and run it directly with complete security and transparency.

> 🔰 **New to this?** Don't worry! The `Abrir Poke Idle IO.bat` launcher automatically downloads everything you need. You can also read our step-by-step guide in **[TUTORIAL.md](TUTORIAL.md)**.

> ### 🔒 Your login data stays strictly on your computer
> Passwords and credentials are encrypted locally using your operating system's native cryptographic vault (`safeStorage` via DPAPI on Windows) and never leave your machine.

---

## What It Is

**PIO Rebosteio** is a modern operational workspace designed to operate and monitor from **1 to 4 simultaneous accounts** in **Poke Idle IO** inside a single responsive interface. Each account runs inside an isolated Electron sandbox partition (`persist:conta1` through `conta4`), keeping cookies, cache, local storage, and sessions completely separate.

The launcher dynamically adapts to your configuration: if you configure 1 account, it opens 1 full-screen window; if you have 2 accounts, it organizes 2 side-by-side windows; and for 3 or 4 accounts, it expands the grid smoothly. If a connection drops during a hunt or after game maintenance, the assistant automatically reconnects your accounts.

---

## Core Features

### 🎮 Dynamic Multi-Account & Operations
* **Dynamic Layout (1 to 4 accounts)**: Automatically opens the exact number of windows matching your configured accounts (1 account = 1 full window, 2 accounts = 2 windows side by side, up to 4 accounts).
* **Isolated Partitions**: Dedicated sandbox per account (`persist:conta1` through `conta4`) without cookie or session leakage.
* **▶ Log In Team**: Signs in all disconnected accounts in a single click, preserving accounts that are already actively farming.
* **🦊 Camoufox Authentication**: Seamless background solving for Cloudflare Turnstile challenges, ensuring smooth and uninterrupted logins.
* **Resilient Auto-Reconnect**: Automatically recovers from temporary network drops and post-maintenance reconnections.

### 🎯 Operational Tools
* **🎯 Hunt Dispatcher**: Select individual accounts or the entire team and dispatch them directly to any hunt with level and area filters.
* **📦 Auto Supply**: Continuous supply monitoring for Poké Balls and Potions with automated restocking and gold balance checking.
* **💰 Auto Sell Loot**: Automatically sells drops and accumulated hunt loot on the server to keep bags clean and maximize Gold/h.
* **◎ Hunt Analyzer**: Real-time telemetry displaying combat stats, EXP/h, Gold/h, kills/h, shiny counts (seen/caught), and farming time.
* **👤 Trainers Manager**: Streamlined account management with credential clearing, partition data wipes, and per-family proxy support.

### 🎨 Themes & Rebosteio Visual Identity
* **12 Style Palettes**: Absol Midnight, Vanilla Cream, Pure White, Ice Frost, Green Tea, Slate Steel, Twilight Amber, Deep Ocean, Lavender Mist, Crimson Ember, Emerald Forest, and Onyx Eclipse.
* **Pokémon Biomes & Artworks**: Exclusive artworks and panoramas for themed Pokémon including Gengar, Mewtwo, Meganium, Alakazam, Banette, Arcanine, Umbreon, Espeon, Corsola, Eevee, Charizard, and Rayquaza.

### 🍃 Performance & Eco Mode
* **Automatic Eco Mode**: Throttles redundant animation loops (`requestAnimationFrame`) to ensure thermal stability and low power draw during long sessions.
* **Clean HUD**: Hides non-essential overlay elements during combat, revealing controls only on hover.
* **System Tray Minimization**: Minimize to the taskbar or Windows system tray (Tray) keeping server-side farming active with minimal resource usage.
* **Awake (Sleep Prevention)**: Prevents Windows from going to sleep during overnight farming.

---

## How to Run

### On Windows (1-Click Auto Setup)
1. Download the code via the green **Code → Download ZIP** button (or clone via Git) and extract it.
2. Double-click **`Abrir Poke Idle IO.bat`**.
3. **Done!** The launcher checks for Node.js. If you do not have Node installed, **it automatically downloads the official portable LTS version**, installs Electron dependencies, and launches the app directly.
4. *(Optional)* Right-click `Abrir Poke Idle IO.bat` and pick **Send to → Desktop (create shortcut)**.

### On Linux or macOS
Open your terminal inside the project folder and execute:

```bash
bash iniciar.sh
```

Or directly via Node/NPM:

```bash
npm install
npm start
```

---

## Documentation

| Document | Content |
|---|---|
| **[Manual](MANUAL.md)** | Comprehensive explanation of interface buttons, sections, and controls |
| **[FAQ](FAQ.md)** | Frequently asked questions, performance optimization, proxies, and troubleshooting |
| **[Tutorial](TUTORIAL.md)** | Beginner-friendly step-by-step setup guide |
| **[Changelog](CHANGELOG.md)** | Detailed release history and updates |

---

## Security & Integrity

1. **Local Encryption**: Passwords saved in the Trainers form are protected by Windows native DPAPI via Electron's `safeStorage`.
2. **Strict Sandbox**: Webviews run isolated, restricting navigation strictly to official game domains (`pokeidle.io` and `poke.idleworld.online`).
3. **Privacy**: The launcher does not collect user data, has no telemetry trackers, and connects to no middleman servers.

---

## License

Distributed under the **MIT** license. See [LICENSE](LICENSE) for more details.  
*This is an independent open-source project developed by the community and is not officially affiliated with the Poke Idle IO team.*
