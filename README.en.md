<div align="center">

<img src="src/ui/assets/pokeidle-logo-smooth.png" width="320" alt="PokeIdle">
<br>
<img src="src/ui/assets/nailo-logo.png" width="210" alt="by Nailo">

# PIO Nailo — Absol Launcher

**High-density multi-account trainer workspace for Poke Idle World.**

![Platform](https://img.shields.io/badge/Windows%20%C2%B7%20macOS%20%C2%B7%20Linux-0078D6?style=flat-square)
![Electron](https://img.shields.io/badge/Electron-43-47848F?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-%E2%89%A522.12-339933?style=flat-square)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

[Português](README.md) · [Manual](MANUAL.md) · [FAQ](FAQ.md) · [Tutorial](TUTORIAL.md) · [Changelog](CHANGELOG.md)

</div>

> This is the run-from-source version. There are no opaque or proprietary binaries: you have full access to inspect the code, verify what it does, and run it directly with complete security and transparency.

> 🔰 **New to this?** Check our step-by-step tutorial: **[TUTORIAL.md](TUTORIAL.md)** (or open `COMO USAR.txt` in the root directory).

> ### 🔒 Your login data stays strictly on your computer
> Passwords and credentials are encrypted locally using your operating system's native cryptographic vault (`safeStorage` via DPAPI on Windows) and never leave your machine.

---

## What It Is

**PIO Nailo (Absol Launcher)** is a high-performance command center to operate and monitor up to **four accounts simultaneously** in Poke Idle World in a single window. Each account runs inside an isolated Electron partition (`persist:conta1` through `conta4`), keeping cookies, local storage, and sessions completely separate.

If a session drops or the game enters maintenance, the launcher automatically reconnects with your saved credentials without requiring manual input. The app strictly adheres to fair play: it does not automate game mechanics or solve captchas—it provides a consolidated companion interface, live metrics, and quality-of-life tooling.

---

## Core Features

### 🎮 Operation & Sessions
* **Isolated Multi-Account**: Run 1 to 4 clean, isolated account partitions side by side.
* **▶ Log In Team**: Signs in all disconnected accounts in a single click, without interrupting accounts that are already farming.
* **Auto-Reconnect**: Seamlessly recovers from connection drops or expired sessions.
* **System Tray & Headless Background**: Minimize to tray with near-zero background resource usage.
* **Ergonomic Shortcuts**: Quick keyboard shortcuts for every primary tool and panel.

### 🍃 Performance & Eco Mode
* **Simple Mode**: Pauses graphic rendering (dropping game canvas to 1 FPS for telemetry only) and presents numbers, drops, goals, and inventory, saving up to 80% CPU.
* **Automatic Eco Mode**: Throttles redundant animation loops (`requestAnimationFrame`) to prevent memory leaks and thermal throttling during marathon farming sessions.
* **Background Throttling**: Minimizing or sending the app to the system tray automatically triggers low-resource mode while server-side farming continues uninterrupted.

### 🎨 Absol Visual Identity & Dynamic Themes
* **Absol Midnight (Default)**: Deep nighttime aesthetic with deep blues, silvers, custom panorama backgrounds, and illustrated character cutouts.
* **12 Curated Style Palettes**: Absol Midnight, Vanilla Cream, Pure White, Ice Frost, Green Tea, Slate Steel, Twilight Amber, Deep Ocean, Lavender Mist, Crimson Ember, Emerald Forest, and Onyx Eclipse.
* **Integrated Exclusive Themes**: Built-in bespoke artworks and biomes for Pokémon such as Gengar, Mewtwo, Meganium, Alakazam, Banette, Arcanine, Umbreon, Espeon, Corsola, Eevee, Charizard, and Rayquaza.

### 📊 Analytics & Advanced Tools
* **🏆 Analytical Tierlist**: Real-time evaluation of all species scored by **XP/h** or **Gold/h** (expected loot calculated at NPC prices), with level gating, IV filters, and elemental/AoE TM support.
* **✨ Ditto Calculator**: Identifies optimal hunt targets and transformations for both regular Ditto and Shiny Ditto.
* **📐 IV Calculator**: Instant IV reading via JustPokédex integration upon hovering over Pokémon in-game.
* **🎒 Offline Auto-Supply**: Real-time supply tracking (Poké Balls and Potions) bundled with local offline item sprites.
* **🛡 Sell Guard**: Safety lock mechanism preventing accidental sale of shinies, legendaries, or valuable loot.
* **🔔 Smart Notifications**: Native Windows alerts and Discord webhooks when shinies appear, supplies run low, or sessions disconnect.

---

## How to Run

### Requirement
Install **Node.js** (LTS version 22.12 or higher recommended) from: **[nodejs.org](https://nodejs.org)**

### On Windows
1. Download the code via the green **Code → Download ZIP** button and extract it.
2. Double-click **`Abrir Poke Idle IO.bat`**.
3. On the first launch, it will verify dependencies, install necessary packages, and open the launcher.
4. *(Optional)* Right-click `Abrir Poke Idle IO.bat` and pick **Send to → Desktop (create shortcut)**.

### On Linux or macOS
Open your terminal inside the folder and execute:

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
| **[FAQ](FAQ.md)** | Frequently asked questions, performance optimization, and troubleshooting |
| **[Tutorial](TUTORIAL.md)** | Beginner-friendly step-by-step installation guide |
| **[Changelog](CHANGELOG.md)** | Detailed release history and updates |

---

## Security & Privacy

1. **Local Encryption**: Stored credentials are encrypted using the native Windows DPAPI through Electron's `safeStorage`.
2. **Strict Domain Sandbox**: Webviews are strictly jailed to official game domains (`pokeidle.io` and `poke.idleworld.online`). External links open in your default system browser.
3. **No External Telemetry**: The application collects zero personal data and connects to no middleman servers.

---

## License

Released under the **MIT License**. See [LICENSE](LICENSE) for details.  
*Independent community open-source project. Not officially affiliated with or endorsed by Poke Idle World.*
