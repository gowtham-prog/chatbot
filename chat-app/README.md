# Chat App

A simple chat application built with **React**, **TypeScript**, and **Vite**, styled with **Tailwind CSS**.

## 📂 File Structure

```
chat-app/
│── dist/                   # Build output (generated after build)
│── node_modules/           # Installed dependencies
│── public/                 # Static assets (favicon, images, etc.)
│── src/                    # Source code (React components, pages, hooks, etc.)
│── .env                    # Environment variables
│── .gitignore              # Git ignore file
│── docker-compose.yml      # Docker Compose setup (optional)
│── Dockerfile              # Docker configuration for containerization
│── eslint.config.js        # ESLint configuration
│── index.html              # Main HTML file for Vite
│── LICENSE                 # License information
│── lint-staged.config.js   # Configuration for linting staged files
│── package.json            # Dependencies and scripts
│── postcss.config.js       # PostCSS configuration
│── README.md               # Project documentation (this file)
│── tailwind.config.js      # Tailwind CSS configuration
│── tsconfig.json           # TypeScript configuration
│── vite.config.ts          # Vite configuration
│── yarn.lock               # Dependency lock file (for Yarn users)
```

## 🚀 Getting Started

### **1️⃣ Install Dependencies**
Ensure you have **Node.js** installed, then run:

```sh
yarn install   # If using Yarn
# or
npm install    # If using NPM
```

### **2️⃣ Run the Development Server**
To start the app in development mode:
```sh
yarn dev   # Or use `npm run dev`
```
The app will be available at `http://localhost:5173`.

### **3️⃣ Build for Production**
To generate a production build:
```sh
yarn build   # Or use `npm run build`
```
The output will be in the `dist/` directory.

---

## 🐳 Running with Docker

You can containerize and run the application using Docker.

### **1️⃣ Build the Docker Image**
```sh
docker build -t chat-app .
```

### **2️⃣ Run the Container**
```sh
docker run -p 3000:3000 chat-app
```
The app will be available at `http://localhost:3000`.

### **3️⃣ Using Docker Compose (Optional)**
If you prefer **Docker Compose**, you can use:
```sh
docker-compose up --build
```
This will automatically build and start the container.

---

## 📜 License
This project is licensed under the **MIT License**.

