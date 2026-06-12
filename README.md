# 🎨 Gemogi Blueprint Commerce Frontend

A premium, high-performance digital voucher & top-up marketplace catalog dashboard built with Next.js 16. This interface focuses on providing a modern, smooth, and highly responsive UI/UX for buying and managing digital vouchers.

---

## ✨ Features

- 💎 **Premium UI/UX** – Styled with a custom dark/light theme, modern typography (Inter), glassmorphism components, and custom CSS layout animations.
- ⚡ **Dynamic Pagination** – Seamless "Load More" ("Muat Lebih Banyak") and "Show Less" ("Tampilkan Lebih Sedikit") pagination mechanics.
- 🔍 **Debounced Search** – Custom debounce search hooks preventing unnecessary API requests while typing in the catalog search bar.
- 🛍️ **Modal Checkouts & Centered Forms** – Vertically centered modals for checkout inputs, and clean styled forms for user registration and logins.
- 💼 **Administrator Control** – In-card toggle switches to activate/deactivate products instantly, and custom CRUD dialog modals for creating or editing products.
- 📞 **Dedicated Contact Page** – Fully validated "Hubungi Kami" page featuring automated message dispatching to the mock backend.
- 🛡️ **End-to-End Type Safety** – Full TypeScript support combined with React Hook Form and Zod client validation.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Ant Design](https://ant.design/) & [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Zustand](https://zustand.demo.pmnd.rs/) (Auth, UI store) & [TanStack Query](https://tanstack.com/query) (React Query)
- **Forms & Validation:** React Hook Form + Zod
- **Icons:** Ant Design Icons

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

1. **Clone & Install**

   ```bash
   git clone https://github.com/SalmanDMA/gemogi-frontend.git
   cd gemogi-frontend
   npm install
   ```

2. **Environment Setup**
   _Create `.env` for local development or `.env.prod` for Railway production:_

   ```bash
   cp .env.example .env
   # Set your NEXT_PUBLIC_API_URL to point to the backend API
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   _Open `http://localhost:3000` to view the catalog._

---

## 👨‍💻 About Me

**Salman Dwi Maulana Akbar**  
_Fullstack Developer_

- 🌐 **Portfolio:** [bit.ly/my-portofolio-salmandma](https://bit.ly/my-portofolio-salmandma)
- 💼 **LinkedIn:** [linkedin.com/in/salmandma](https://www.linkedin.com/in/salmandma/)
- 🐙 **GitHub:** [github.com/SalmanDMA](https://github.com/SalmanDMA)
