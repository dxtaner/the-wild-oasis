# 🌴 Wild Oasis Admin Panel

Modern hotel management dashboard built with React, Vite, Supabase, and React Query.

This template provides a production-ready, full-stack setup to get a modern hotel management dashboard working in Vite with HMR, advanced state management, and optimized database integrations.

Currently, key architectural modules are fully operational:

- **State Management:** Fully handled by **React Query (TanStack Query)** for seamless asynchronous data fetching, caching, and synchronization.
- **Backend Infrastructure:** Integrated directly with **Supabase**, leveraging its powerful relational database and built-in secure authentication system.

---

## 🚀 Features

### 🔐 Authentication

- **Login system:** Secure login workflow for administration staff.
- **Protected routes:** Strict route guarding to prevent unauthorized access to the application data.
- **Persistent auth session:** Automatically restores the user session on page reloads or returns.

### 📊 Dashboard

- **Revenue statistics:** Real-time calculation and visualization of hotel income.
- **Cabin analytics:** Visual analytics representing occupancy, popular cabin configurations, and availability metrics.
- **Booking overview:** Deep dive insights into past, current, and upcoming guest reservations.
- **Live data cards:** High-level metrics blocks highlighting active data changes instantly.

### 🏨 Cabins Management

- **Create, Update & Delete:** Comprehensive CRUD operations to manage hotel room/cabin inventory.
- **Cabin pricing system:** Granular configuration for regular pricing and distinct promotional discounts.
- **Modern responsive UI:** Perfectly scaled presentation of cabin details across screens.

### 📅 Bookings Management

- **View reservations:** Centralized list containing all processed guest records.
- **Booking filters:** Multi-criteria tabular filters tailored to instantly isolate specific booking states.
- **Status management:** Smooth operational flow to check-in, check-out, or update reservation statuses.
- **Booking actions & deletion:** Administrative commands to modify or securely purge incorrect entries.

### 👤 Users Management

- **Account creation & editing:** Seamless onboarding forms for newly hired hotel personnel.
- **Role management:** Role-based access control (RBAC) implementation determining feature visibility.
- **Status system:** Quick toggle tools to activate, suspend, or decommission internal user accounts.

### ⚙️ Settings Panel

- **Booking settings:** Global rules enforcing parameters like minimum/maximum booking length constraints.
- **Pricing settings:** Standard baseline metrics including extra add-ons (e.g., breakfast price adjustments).
- **App preferences:** General operational settings, including a unified dark mode configuration and persistent Supabase database sync tokens.

---

## 🛠️ Tech Stack

### Frontend

- **React & Vite:** Ultra-fast bundling, lightweight dev engine, and hot module replacement (HMR).
- **React Router DOM:** Declarative, dynamic client-side routing with nested layout structures.
- **React Query:** Powerful server-state synchronization tool eliminating boilerplate `useEffect` fetching.
- **React Hot Toast:** Light, beautiful, and customizable pop-up notifications for user action feedback.

### Backend & Infrastructure

- **Supabase:** Postgres database tier, real-time sync listeners, and integrated identity provider.

### Styling

- **Pure CSS:** Clean, performant custom stylesheets designed from the ground up without heavy external UI dependencies.
- **Modern Dark UI:** Tailored native dark-mode aesthetics ensuring high structural contrast and eye comfort during long shifts.

---

## 📁 Project Structure

`image_af6640.png` dosyasındaki ağaç yapısına göre projenin güncel dizin mimarisi şu şekildedir:

```text
THE-wild-oasis/
│
├── src/
│   ├── assets/             # Static media assets (images, icons, etc.)
│   │
│   ├── components/
│   │   ├── layout/         # Layout wrapper components (Sidebar, Navigation, etc.)
│   │   └── ProtectedRoute.jsx # Authentication guard wrapper component
│   │
│   ├── context/
│   │   └── AuthContext.jsx # Global React Context for security and user sessions
│   │
│   ├── features/           # Domain-driven feature sets with unique hooks and sub-components
│   │   ├── auth/
│   │   ├── bookings/
│   │   ├── cabins/
│   │   ├── settings/
│   │   └── users/
│   │
│   ├── pages/              # Primary routing views mapped to system dashboards
│   │   ├── bookings/
│   │   ├── cabins/
│   │   ├── settings/
│   │   └── users/
│   │
│   ├── dashboard.css       # Scoped layout styling for core application metrics
│   ├── Dashboard.jsx       # Integrated analytics dashboard root page
│   ├── login.css           # Styling rules for clean authentication layouts
│   ├── Login.jsx           # Core authentication landing page component
│   ├── PageNotFound.jsx    # Fallback view for 404 client-side address errors
│   │
│   ├── services/
│   │   └── supabase.js     # Single-point client connectivity config for Supabase API
│   │
│   ├── App.jsx             # Main routing hub and QueryClient initialization component
│   └── main.jsx            # React root application bootstrap entry point
│
├── .env                    # System variables and credential tokens configuration
├── .gitignore              # Ignored track patterns list for Git operations
└── eslint.config.js        # Static validation tool rules for production-ready code lines
```

## 🔑 Routes

| Route           | Description                                                                             |
| :-------------- | :-------------------------------------------------------------------------------------- |
| `/login`        | Secure administrative authentication screen                                             |
| `/dashboard`    | Main data hub featuring statistics cards, revenue metrics, and recent activity          |
| `/cabins`       | Detailed interactive data grid to manage available cabin rooms and pricing structures   |
| `/bookings`     | Comprehensive table containing all historic and active guest reservations               |
| `/bookings/:id` | Dynamic detail layout showcasing explicit booking metrics and quick contextual actions  |
| `/users`        | HR administration portal to register, modify, and assign access levels to new employees |
| `/settings`     | Operational controls modifying internal application limitations and database variables  |

---

## ⚡ Installation

Follow these steps to spin up the local development ecosystem:

1. **Clone Repository**

   ```bash
   git clone https://github.com/dxtaner/the-wild-oasis
   cd the-wild-oasis

   ```

2. Install Dependencies

```bash
npm install
```

3. Start Development Server

```bash
npm run dev
```

---

## 🔥 Environment Variables

To allow the application to communicate with your database backend, create a custom `.env` file in the root directory of the project:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_public_key
```

---

## 👨‍💻 Developer

**Taner Özer**

- Node.js / Fullstack Developer
- GitHub Profile: [https://github.com/dxtaner](https://github.com/dxtaner)

---

### ⭐ Support the Project

If this dashboard template helped you build or optimize your management workflow, please feel free to drop a star on the [GitHub repository](https://github.com/dxtaner)! ⭐
