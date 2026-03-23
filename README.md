# Travel Buddy - Your Ultimate Travel & Meetup Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-purple?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind--CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React Hook Form](https://img.shields.io/badge/React--Hook--Form-v7.71-EC5990?style=for-the-badge&logo=react-hook-form)](https://react-hook-form.com/)
[![Zod](https://img.shields.io/badge/Zod-v4.3-3E67B1?style=for-the-badge&logo=zod)](https://zod.dev/)
[![Sonner](https://img.shields.io/badge/Sonner-v2.0-000000?style=for-the-badge&logo=sonner)](https://sonner.emilkowal.ski/)

**Travel Buddy** is a modern web application designed to help travelers find companions, explore travel plans, and manage their trips effortlessly. Built with cutting-edge technologies, it offers a seamless and responsive experience for users to connect and plan their next adventure.

---

## Key Features

-   **Explore Travel Plans:** Discover a variety of travel plans created by other users. Filter by destination, date, or travel style.
-   **Create & Manage Trips:** Easily create your own travel itinerary and manage your trip details from a centralized dashboard.
-   **User Profiles & Connect:** Customize your traveler profile and connect with like-minded individuals for your next journey.
-   **Secure Authentication:** Integrated auth flows to ensure a safe and private platform for all users.
-   **Admin & User Dashboards:** Dedicated dashboards for both travelers and administrators to manage content and users.
-   **Payment Integration:** Secure payment flows for premium features or bookings.
-   **Fully Responsive:** Optimized for desktop, tablet, and mobile devices with a sleek, modern UI.

---

## Tech Stack

-   **Frontend Framework:** [Next.js 16.1.6](https://nextjs.org/) (App Router)
-   **UI Library:** [React 19.2.3](https://react.dev/)
-   **State Management:** [Redux Toolkit 2.11.2](https://redux-toolkit.js.org/) & [Redux Persist 6.0.0](https://github.com/rt2zz/redux-persist)
-   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
-   **Forms & Validation:** [React Hook Form 7.71.2](https://react-hook-form.com/) & [Zod 4.3.6](https://zod.dev/)
-   **Icons:** [Lucide React 0.577.0](https://lucide.dev/)
-   **Notifications:** [Sonner 2.0.7](https://sonner.emilkowal.ski/)
-   **API Handling:** [Axios 1.13.6](https://axios-http.com/)
-   **Carousel & Sliders:** [Swiper 12.1.2](https://swiperjs.com/)

---

## Project Structure

```text
├── app/                  # Next.js App Router (Pages, Layouts, API groups)
│   ├── (auth)/           # Authentication related routes
│   ├── (dashboard)/      # User & Admin dashboard views
│   ├── (user)/           # User profile and settings
│   └── travel-plans/     # Travel plan details and creation
├── src/
│   ├── components/       # Reusable UI & Business components
│   ├── redux/            # Global state management (slices, API, store)
│   ├── types/            # TypeScript interfaces and types
│   ├── validation/       # Zod schemas for form validation
│   └── data/             # Static data and constants
├── public/               # Static assets (images, icons)
└── ...configs            # Tailwind, ESLint, TypeScript configs
```

---

## Getting Started

### Prerequisites

-   Node.js (v20 or v22 LTS recommended)
-   npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/kader009/travel-frontend.git
    cd travel-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add the following:
    ```env
    NEXT_PUBLIC_BACKENDAPI=your_backend_api_url_here

    # Demo Credentials
    NEXT_PUBLIC_DEMO_USER_EMAIL=database admin email
    NEXT_PUBLIC_DEMO_USER_PASSWORD=database admin pass
    NEXT_PUBLIC_DEMO_ADMIN_EMAIL=database user email
    NEXT_PUBLIC_DEMO_ADMIN_PASSWORD=your database user pass
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application in action.

---

**Built with love by [Abdul Kader Molla](https://github.com/kader009)**
