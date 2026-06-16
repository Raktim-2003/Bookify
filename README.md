# 🚀 Bookify

Bookify is a modern event management and discovery platform built with Next.js, Convex, Clerk Authentication, and Tailwind CSS. Users can create, discover, and manage events while enjoying a clean and responsive user experience.

---

## ✨ Features

### 🔐 Authentication

* Secure user authentication with Clerk
* Sign Up / Sign In
* Protected routes
* User onboarding flow

### 🎉 Event Management

* Create events
* Free and Pro event restrictions
* Event categories
* Event capacity management
* Ticket types (Free / Paid)
* Event location support
* Event cover images
* Custom event themes

### 🤖 AI Event Creator

* Generate event details using Gemini AI
* AI-generated:

  * Event title
  * Description
  * Category
  * Capacity suggestions
  * Ticket type suggestions

### 🔍 Event Discovery

* Browse events
* Search events
* Explore event details
* Category filtering

### 👤 User Dashboard

* View created events
* Manage event details
* Registration tracking

### 🎨 Modern UI

* Responsive design
* Dark-themed interface
* Shadcn UI components
* Tailwind CSS styling
* Mobile-friendly layout

---

## 🛠 Tech Stack

### Frontend

* Next.js 15
* React
* Tailwind CSS
* Shadcn UI
* Lucide Icons

### Backend

* Convex Database
* Convex Functions

### Authentication

* Clerk

### AI

* Google Gemini API

### Image Management

* Unsplash API

---

## 📂 Project Structure

```bash
bookify/
├── app/
│   ├── (auth)/
│   ├── (main)/
│   ├── (public)/
│   └── api/
│
├── components/
│   ├── ui/
│   └── custom-components/
│
├── convex/
│   ├── schema.js
│   ├── events.js
│   ├── users.js
│   └── search.js
│
├── hooks/
├── lib/
├── public/
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CONVEX_URL=your_convex_url

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

---

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/Raktim-2003/Bookify.git
```

Navigate to the project:

```bash
cd Bookify
```

Install dependencies:

```bash
npm install
```

Run Convex:

```bash
npx convex dev
```

Run Next.js:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 📸 Screenshots

Add project screenshots here.

### Home Page

![Home Page](./public/hero.png)

---

## 🔮 Future Improvements

* Event registration system
* Payment gateway integration
* Event analytics dashboard
* QR-based ticket verification
* Email notifications
* Organizer dashboard
* Real-time chat for events
* Event recommendations using AI

---

## 👨‍💻 Developer

**Raktim Mondal**

GitHub:
https://github.com/Raktim-2003

---

## 📄 License

This project is licensed under the MIT License.

---

⭐ If you found this project useful, please consider giving it a star.
