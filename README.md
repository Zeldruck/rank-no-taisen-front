# 🎮 Rank no Taisen ランクの対戦 - Frontend

Frontend for **Rank no Taisen**, an interactive voting platform for animes, characters, openings, or covers, featuring an **ELO-based ranking system**.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

---

## ✨ Features

* 🏟️ **Vote Arena**: Compare two items, vote quickly, and see **ELO updates**.
* 📊 **Rankings**: Sort and filter by type, year, or ELO; search for specific items.
* ⚡ **Performance**: Virtualized lists with infinite scroll for large collections.

---

## 🚀 Getting Started

### 🔧 Local Development

```bash
# Clone the repository
git clone https://github.com/zeldruck/rank-no-taisen-front.git
cd votearena-frontend

# Install dependencies
npm install

# Create a .env file with backend URL
echo "VITE_BACK_API_URL=http://localhost:4000/api" > .env

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 📦 Build for Production

```bash
npm run build
```

Production-ready files will be in the `dist/` folder. Deploy on **Vercel**, **Netlify**, or any static hosting.

---

## 🔗 Usage

* `/` → **Vote Arena**
* `/rankings` → **Item Rankings**
* Use filters, search bar, or sort buttons to navigate rankings

---

## 🔗 Useful Links

* Backend API: [Rank No Taisen Backend](https://github.com/zeldruck/rank-no-taisen-back)

---

## 📝 Notes

* Backend must support `/matches`, `/items`, `/votes`.
* ELO calculations are handled **server-side**.
* Images are loaded from the backend database.

---

## 📝 License

MIT License — free to fork, modify, and use.

---
\
[@Zeldruck](https://github.com/Zeldruck)