# 🏛️ Golden Dream

**Where every moment turns golden.**

A luxury multi-space hospitality website — fine dining, artisan bakery, event hall, premium offices, and a rooftop terrace, all presented as one elegant static site.

<p align="center">
  <img src="https://img.shields.io/badge/Live%20Demo-golden--dream--one.vercel.app-C9A227?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel"/>
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License"/>
  <img src="https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square" alt="Status"/>
</p>

---

## 📸 Preview

<p align="center">
  <img src="./assets/screenshots/home.png" alt="Golden Dream — Home page" width="90%"/>
</p>

> Replace the image above with an actual screenshot: save one to `assets/screenshots/home.png` (a full-page capture of `index.html` works well — 1440×900 or similar).

---

## 📖 Table of Contents

- [About](#-about)
- [Site Map](#-site-map)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Making It Functional](#-making-it-functional)
  - [Reservation & Booking Forms](#reservation--booking-forms)
  - [Contact Form](#contact-form)
  - [Analytics](#analytics)
- [Deployment](#-deployment)
- [Customization](#-customization)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## ✨ About

**Golden Dream** (est. 2023) is a fictional/showcase hospitality brand combining four spaces under one roof:

| Space | Description |
|---|---|
| 🥐 **Bakery & Restaurant** | Fine dining, artisan bakery, signature experiences, reservations |
| 🎉 **Event Hall** | Weddings, private parties, conferences |
| 🏢 **Offices** | Coworking hub, private offices/suites, meeting rooms |
| 🌇 **Rooftop** | Open-air terrace, sunset cocktails, private dinners |

The site is a fully static, multi-page marketing site — no build step, no framework, just HTML/CSS/JS.

---

## 🗺️ Site Map

```
/                              → Home
/bakery.html                   → Bakery & Restaurant — Overview
/bakery-menu.html              → Our Menu
/bakery-fine-dining.html       → Fine Dining
/bakery-artisan.html           → Artisan Bakery
/bakery-signature.html         → Signature Experiences
/bakery-reservations.html      → Reservations
/bakery-hours.html             → Opening Hours
/events.html                   → Events — Overview
/events-weddings.html          → Weddings
/events-parties.html           → Private Parties
/events-conferences.html       → Conferences
/offices.html                  → Offices — Overview
/offices-coworking.html        → Coworking Hub
/offices-coworking-spaces.html → Coworking Spaces
/offices-private.html          → Private Office
/offices-private-suite.html    → Private Suite
/offices-meeting.html          → Meeting Rooms
/offices-meeting-room.html     → Book a Room
/rooftop.html                  → Rooftop
/contact.html                  → Contact
/cookies.html                  → Cookie Policy
```

> Adjust this list to match your actual file names if they differ — this was reconstructed from the live site's navigation.

---

## 🛠️ Tech Stack

- **HTML5** — semantic markup, one file per page
- **CSS3** — custom styling (no framework detected; add Tailwind/Bootstrap here if you use one)
- **Vanilla JavaScript** — nav dropdowns, interactions
- **Vercel** — static hosting & deployment

---

## 📁 Project Structure

```
golden-dream/
├── index.html
├── bakery.html
├── bakery-menu.html
├── bakery-fine-dining.html
├── bakery-artisan.html
├── bakery-signature.html
├── bakery-reservations.html
├── bakery-hours.html
├── events.html
├── events-weddings.html
├── events-parties.html
├── events-conferences.html
├── offices.html
├── offices-coworking.html
├── offices-coworking-spaces.html
├── offices-private.html
├── offices-private-suite.html
├── offices-meeting.html
├── offices-meeting-room.html
├── rooftop.html
├── contact.html
├── cookies.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   └── screenshots/
├── vercel.json
└── README.md
```

> This mirrors a typical flat multi-page static layout. Rename folders to match your repo if it differs (e.g. if pages live in a `/pages` subfolder).

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- [Node.js](https://nodejs.org/) (optional, only needed for a local dev server)

### Run locally

Since this is a static site, you don't need a build step — just serve the folder:

```bash
# clone the repo
git clone https://github.com/<your-username>/golden-dream.git
cd golden-dream

# option 1 — Node's http-server
npx http-server . -p 3000

# option 2 — Python
python3 -m http.server 3000

# option 3 — VS Code
# install the "Live Server" extension and click "Go Live"
```

Then open **http://localhost:3000**.

---

## ⚙️ Making It Functional

Right now, forms on a static HTML site (reservations, room booking, contact) have nowhere to submit to. Here's what's needed to make each one actually work:

### Reservation & Booking Forms
Affects: `bakery-reservations.html`, `offices-meeting-room.html`

Pick one:

| Option | Effort | Notes |
|---|---|---|
| **Formspree / Getform / Basin** | Low | Add `action="https://formspree.io/f/yourFormID"` to the `<form>` tag. No backend code needed. |
| **Vercel Serverless Function** | Medium | Add `api/reserve.js`, parse the POST body, send an email (e.g. via Resend or Nodemailer) or write to a database (Supabase/Airtable). |
| **Full backend** | High | Node/Express or similar, with a real database for tracking availability, table/room capacity, and confirmation emails. |

Minimal serverless example (`api/reserve.js` on Vercel):
```js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { name, email, date, guests } = req.body;
  // TODO: send email / save to DB
  res.status(200).json({ success: true });
}
```

### Contact Form
Affects: `contact.html`

Same options as above — Formspree is the fastest path if you just want emails landing in your inbox with zero backend code.

### Analytics
Add [Vercel Analytics](https://vercel.com/docs/analytics) or Plausible/Google Analytics to track visits per page — useful since this is a marketing site with many distinct landing pages.

---

## ☁️ Deployment

Already deployed on Vercel at **[golden-dream-one.vercel.app](https://golden-dream-one.vercel.app/)**.

To deploy your own copy:

```bash
npm install -g vercel
vercel login
vercel --prod
```

Or connect the GitHub repo directly in the [Vercel dashboard](https://vercel.com/new) for automatic deploys on every push.

---

## 🎨 Customization

- **Colors & fonts** — edit `css/style.css` (the gold/black palette is the brand's signature look)
- **Copy** — each page's text lives directly in its HTML file
- **Images** — replace files in `assets/images/`
- **Navigation** — shared header/footer markup is duplicated per page; consider extracting to a JS include or moving to a framework (Next.js/Astro) if the page count keeps growing

---

## 🗺️ Roadmap

- [ ] Wire up reservation form to a real backend/service
- [ ] Wire up contact form
- [ ] Add real screenshots to this README
- [ ] Add sitemap.xml + robots.txt for SEO
- [ ] Add Open Graph / meta tags for social sharing previews
- [ ] Mobile responsiveness pass
- [ ] Accessibility audit (alt text, contrast, keyboard nav for dropdowns)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — update this if you intend to keep it private/proprietary.

---

<p align="center">Made with 🥐 and ✨ for Golden Dream</p>
