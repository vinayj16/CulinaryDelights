# 🍽️ CulinaryDelights

**An Immersive Web Experience for Fine Dining Enthusiasts**

*CulinaryDelights* is a full-featured, server-side rendered (SSR) web application built with **Vue 3 + Vite**. It delivers an interactive, luxurious, and user-centric experience for food lovers, featuring online ordering, chef showcases, immersive dining visuals, loyalty programs, reservations, and more.

---

## 🌟 Key Features

* 🧑‍🍳 **Chef Profiles** — Meet world-class chefs behind the cuisine
* 📸 **Food & Dining Galleries** — High-res imagery of dishes, events, and dining spaces
* 🍴 **Interactive Menu** — Dynamic menu explorer with categories & media
* 🗓️ **Reservation System** — Reserve tables with calendar UI
* 🧾 **Online Orders** — Smooth ordering system for delivery or pickup
* 🛍️ **Gift Cards & Loyalty Program** — Engage repeat diners
* 📰 **Newsletter & Blog** — Culinary stories, tips & latest news
* 🧑‍💻 **Live Chat & Contact Forms** — Instant customer support
* 🧠 **3D Scene (Scene3D.vue)** — Immersive dining simulation
* 💬 **Multilingual & Mobile Friendly UI**

---

## 🧩 Tech Stack

| Layer              | Technology                                                         |
| ------------------ | ------------------------------------------------------------------ |
| Frontend           | Vue 3 (`<script setup>` SFCs)                                      |
| Build Tool         | Vite                                                               |
| SSR                | Custom server with `entry-client.js` & `entry-server.js`           |
| Styling            | TailwindCSS / Custom CSS                                           |
| Assets             | Images organized by `chefs`, `menu`, `experiences`, `dishes`, etc. |
| Backend (Optional) | Node.js server (`server.js` / `server.cjs`)                        |

---

## 📁 Directory Structure

```
vinayj16-culinarydelights/
├── public/
│   └── images/
│       ├── chefs/
│       ├── dishes/
│       ├── experiences/
│       └── menu/
├── src/
│   ├── App.vue
│   ├── router.js
│   ├── entry-client.js
│   ├── entry-server.js
│   ├── components/
│   │   ├── Home.vue, Menu.vue, Reservation.vue, etc.
│   │   └── LiveChat.vue, Scene3D.vue (special features)
├── server.js / server.cjs
├── vite.config.js
├── index.html
├── style.css
└── README.md
```

---

## 🚀 Getting Started

### 📦 Prerequisites

* Node.js (v18+ recommended)
* npm (v9+)
* Optional: MongoDB / Firebase for live data

---

### 🛠 Installation

```bash
# Clone the repo
git clone https://github.com/vinayj16/culinarydelights.git
cd culinarydelights

# Install dependencies
npm install
```

---

### ▶️ Development

```bash
# Start the Vite dev server
npm run dev
```

Server runs at: [http://localhost:5173](http://localhost:5173)

> 🔁 With Hot Module Replacement (HMR) for instant preview

---

## 🌐 SSR Setup

If using SSR (`entry-client.js` + `entry-server.js`):

```bash
node server.js
# or
node server.cjs
```

Server will render components both server- and client-side for SEO and performance.

---

## 📷 UI Components Highlights

* **Hero.vue** – Animated hero section
* **InteractiveMenu.vue** – Dynamic food menu
* **Scene3D.vue** – Immersive 3D dining room (WebGL or Three.js style)
* **LiveChat.vue** – Real-time support via WebSocket or 3rd party
* **Newsletter.vue** – Subscription module
* **Blog.vue + BlogPreview\.vue** – Culinary blog system

---

## 🧪 Testing (Optional)

> If testing setup exists or is planned (e.g., Vitest, Cypress):

```bash
# Run unit or integration tests
npm test
```

---

## ✨ Future Enhancements

* [ ] Integrate payment gateway for gift cards & orders
* [ ] Admin dashboard for chefs & menu updates
* [ ] Review and rating system
* [ ] Push notifications
* [ ] AI chat assistant for menu suggestions

---

## 📄 License

Licensed under the [MIT License](LICENSE)

---

## 🙋 Contact

* GitHub: [@vinayj16](https://github.com/vinayj16)
* Website: https://culinary-delights-7ubq.vercel.app/
* Email: [your.email@example.com](mailto:vinays15201718@gmail.com)

---

