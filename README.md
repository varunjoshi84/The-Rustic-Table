# 🥘 The Rustic Table

**The Rustic Table** is a premium, vintage-themed recipe-sharing platform. It beautifully merges a classic, cozy cooking aesthetic with modern, high-performance web technologies. Users can discover, upload, like, and save family recipes from various cuisines including Italian Classic, Rustic Indian, French Country, and Vintage Desserts.

---

## ✨ Features

- **Robust Authentication:** Secure API authentication powered by Laravel Sanctum with Role-Based Access Control (RBAC) for standard users and administrators.
- **Full-Stack Recipe Management:** Complete CRUD functionality for recipes with local image uploading and secure media handling.
- **Interactive Community:** Users can like, save, and comment on their favorite recipes.
- **Advanced Filtering & Search:** Find the perfect meal by searching through titles, cuisines, and nested ingredient lists.
- **Automated Mail System:** Integrated newsletter subscriptions and a contact form that dispatches automated HTML email notifications to both admins and users.
- **Premium Vintage UI:** A stunning, responsive frontend built with React, styled with Tailwind CSS, and enriched with smooth micro-animations using Framer Motion.

---

## 🏗️ Technology Stack

- **Frontend:** React JS, Tailwind CSS, Framer Motion, React Router DOM, Axios
- **Backend:** Laravel 11, Laravel Sanctum, Eloquent ORM
- **Database:** MySQL
- **Tooling:** Vite, Composer, NPM

---

## 🚀 Installation & Setup

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed:
- PHP >= 8.2
- Composer
- Node.js & NPM
- MySQL

### Step-by-Step Guide

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd "The Rustic Table"
   ```

2. **Install PHP Dependencies**
   ```bash
   composer install
   ```

3. **Install NPM Dependencies**
   ```bash
   npm install
   ```

4. **Environment Configuration**
   Duplicate the `.env.example` file and rename it to `.env`.
   ```bash
   cp .env.example .env
   ```
   Generate the application key:
   ```bash
   php artisan key:generate
   ```
   Update your `.env` file with your local MySQL database credentials and your SMTP mail configuration (e.g., Gmail SMTP) to enable the contact form and newsletter.

5. **Database Migration & Seeding**
   Run the migrations and populate the database with our rich, pre-configured content seeder (which includes 20+ recipes and test users):
   ```bash
   php artisan migrate:fresh --seed
   ```

6. **Link Local Storage**
   To ensure recipe thumbnail images load correctly, create a symbolic link from `public/storage` to `storage/app/public`:
   ```bash
   php artisan storage:link
   ```

7. **Start the Development Servers**
   You will need to run two separate terminals to serve the backend and the frontend assets.

   Terminal 1 (Laravel Backend):
   ```bash
   php artisan serve
   ```

   Terminal 2 (Vite Frontend):
   ```bash
   npm run dev
   ```

8. **Access the Application**
   Open your browser and navigate to: `http://127.0.0.1:8000`

---

## 🔐 Test Accounts

The database seeder automatically generates the following test accounts:

**Admin User**
- **Email:** `admin@example.com`
- **Password:** `password`

**Standard User**
- **Email:** `user@example.com`
- **Password:** `password`

*(Additional test users with Indian names are also seeded automatically).*

---

## 📜 License

The Rustic Table is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
