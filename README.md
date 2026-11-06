# HomeServeHub (Repari) - Frontend

The official frontend repository for **HomeServeHub** (also known as **Repari**), a full-stack web platform connecting clients with certified home service professionals. Built with **React**, featuring an intuitive UI, client-provider workflows, and an AI-powered diagnostic and recommendation assistant.

---

## 🚀 Key Features

* **User & Provider Authentication:** Secure login, registration, and role-based access control (Client vs. Service Provider).
* **Service Marketplace:** Browse, filter, and search home service categories (plumbing, electrical, cleaning, carpentry, etc.).
* **Smart AI Diagnostic Assistant:** Interactive chat powered by backend Groq integration to help clients diagnose home repair issues and recommend the right professional.
* **Booking & Scheduling:** Real-time appointment scheduling, tracking, and status management.
* **Responsive UI:** Clean, modern, minimalist design optimized for seamless desktop and mobile use.

---

## 🛠️ Tech Stack

* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS / Modern CSS
* **State Management & Routing:** React Router, Context API
* **HTTP Client:** Axios

---

## 📁 Project Structure

```text
homeservehub-frontend/
├── public/               # Static assets & favicons
├── src/
│   ├── assets/           # Images and icons
│   ├── components/       # Reusable UI components (Navbar, Footer, Modals)
│   ├── context/          # React Context (Auth, Theme)
│   ├── pages/            # View components (Home, Dashboard, Booking, AIChat)
│   ├── services/         # API service integration modules (Axios)
│   ├── App.jsx           # Root component with routing setup
│   └── main.jsx          # Application entry point
├── .env.example          # Sample environment variables
├── package.json          # Dependencies and scripts
└── README.md             # Frontend documentation
⚙️ Getting Started & How to Run
Prerequisites
Make sure you have Node.js (v18+ recommended) and npm installed on your machine.

1. Clone the Repository
Bash
git clone [https://github.com/your-username/homeservehub-frontend.git](https://github.com/your-username/homeservehub-frontend.git)
cd homeservehub-frontend
2. Install Dependencies
Bash
npm install
3. Configure Environment Variables
Create a .env file in the root directory based on .env.example:

Extrait de code
VITE_API_BASE_URL=http://localhost:5000/api
4. Run the Development Server
Bash
npm run dev
The application will be accessible at http://localhost:5173.

📦 Build for Production
To build the optimized production bundle:

Bash
npm run build
