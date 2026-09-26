# AMBER-ROOM-GALLERY
AMBER ROOM: A cinematic, high-resolution secure vault. Built natively on Cloudflare to deliver a zero-reload browsing experience with fluid animations and rate-limiting protection.

# 💎 AMBER ROOM · Ultra-Premium Secure Gallery

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Cloudflare%20Pages%20%2F%20Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare" />
  <img src="https://img.shields.io/badge/Storage-Cloudflare%20R2-blue?style=for-the-badge&logo=icloud&logoColor=white" alt="R2" />
  <img src="https://img.shields.io/badge/Database-Workers%20KV-brightgreen?style=for-the-badge&logo=databricks&logoColor=white" alt="KV" />
  <img src="https://img.shields.io/badge/Security-SHA--256%20%2B%20Rate%20Limit-crimson?style=for-the-badge&logo=auth0&logoColor=white" alt="Security" />
</p>

A serverless, high-resolution visual vault engineered for luxury brand experiences. Built natively on Cloudflare's global edge infrastructure to deliver zero-reload browsing, 120fps fluid transitions, and hardened authentication.

---

## ✨ Features

- **Single Page Application (SPA):** Seamless transitions between collections without full browser reloads.
- **Magnetic UX & Custom Cursor:** Physics-driven cursor reaction and magnetic interactions for desktop pointers.
- **Cinematic Parallax & Blur-Up:** Asynchronous image decoding, skeleton place-holders, and depth-scrolling hero banners.
- **Touch Gestures & Lightbox:** Pinch-to-zoom, pan, swipe navigation, and keyboard shortcuts (`←`, `→`, `Esc`).
- **Cryptographic Protection:** SHA-256 hashed session validation with SameSite/Strict cookie scoping.
- **Brute-Force Rate Limiting:** IP-level attempt counting stored in edge KV with automated 15-minute cooldown.

---

## ⚙️ Cloudflare Bindings

The application requires specific bindings configured under **Cloudflare Pages / Workers Settings > Functions > Variables & Bindings**.

| Binding Type | Variable Name | Required | Description |
| :--- | :--- | :--- | :--- |
| **R2 Bucket** | `GALLERY_BUCKET` | Yes | Target R2 bucket storing all curated gallery photographs and hero assets. |
| **KV Namespace** | `CONFIG_KV` | Yes | Key-Value store managing passwords, branding configuration, and brute-force rate limits. |

---

## 🔑 KV Namespace Configuration (`CONFIG_KV`)

Configure the following keys inside your bound KV Namespace to control gallery credentials and titles:

| Key | Type | Default Value | Description |
| :--- | :--- | :--- | :--- |
| `PASSWORD` | String | `admin123` | Master passphrase required to unlock the gallery vault. |
| `SITE_TITLE` | String | `AMBER` | Primary branding display text on header and logo lockup. |
| `SITE_SUBTITLE` | String | `ROOM` | Secondary accent title shown below the brand mark. |
| `rl_<IP>` | Auto-Managed | Numeric counter | Managed automatically by the Worker for brute-force rate limiting (TTL: 900s). |

---

## 📁 R2 Bucket Structure

Maintain the directory taxonomy inside your Cloudflare R2 bucket as follows:

```text
GALLERY_BUCKET/
├── Header/
│   ├── 1.jpg              # Primary Hero Image
│   ├── 2.jpg              # Transition Slide 2
│   └── 3.jpg              # Transition Slide 3
├── Architecture/
│   ├── 001.jpg
│   └── 002.jpg
├── Portraits/
│   ├── portrait-1.jpg
│   └── portrait-2.jpg
└── Weddings/
    ├── ceremony-01.jpg
    └── reception-02.jpg
