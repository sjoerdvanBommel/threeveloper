# 🖼️ Gallery App

Welcome to the Gallery App made by Threeveloper! This project is a gallery web application built with SvelteKit. It allows users to search for images and fetches them from the Unsplash API. The primary purpose of this project is to rebuilt it during the "Mastering SvelteKit: Elevate Your Web Projects".

I believe that, at the end of this tutorial series, you **don't want to go back to React or Angular anymore**.

Go [check it out](https://TODO:)!

### Demo

Check out these short videos about what you will build during this tutorial series!

It also supports:

- 🌓 dark mode
- 📱 Responsive design
- 😴 Lazy ánd progressive image loading for optimized performance

Also check out the live demo of the Gallery App at [https://threeveloper.vercel.app](https://threeveloper-git-sveltekit-tutorial-fina-de2b95-sjoerdvanbommel.vercel.app/).

<div>
  <img src="static/videos/readme/preview.gif" alt="Gallery App Preview" width="600px">
  <img src="static/videos/readme/mobile.gif" alt="Mobile and dark mode support" width="200px">
</div>

## 🚀 Getting Started

To get the project up and running on your local machine, follow these steps:

### 1. Clone the repository 🔍

Clone the branch `sveltekit-tutorial-final-result` of my `threeveloper` repository:

```shell
git clone -b sveltekit-tutorial-final-result https://github.com/sjoerdvanBommel/threeveloper.git gallery-app
```

### 2. Install the dependencies 📦

Open the folder in which you cloned the repository and install the dependencies:

```shell
cd gallery-app
npm install
```

### 3. Configure the API credentials 🔑

- [Create an account on Unsplash](https://unsplash.com/join), register a new application and obtain an API key for that application.
  > **Note**
  > Demo apps are limited to 50 requests per hour, but we will use mock data while developing locally. If there are any plans to ship your gallery or product to production, make sure to upgrade your Unsplash plan.
- Copy the `.env.example` file and rename it to `.env.local`.
- Replace the UNSPLASH_ACCESS_KEY and UNSPLASH_SECRET_KEY placeholders in the `.env.local` file with your actual API keys.

### 4. Start the development server ▶️

Run the development server:

```shell
npm run dev
```

The application will be accessible at http://localhost:5173. Enjoy coding from here on! Updates to the code will be reflected near real-time.

## 🏗️ Building and Deployment

An easy way to deploy your application is using hosting solutions like [Vercel](https://vercel.com/) and [Netlify](https://www.netlify.com/) which both offer free tiers.

To build the application for production and deploy it manually, follow these steps:

1. Build the optimized version of the application

```
npm run build
```

2. The build output will be available in the `build` directory.
3. You can deploy the contents of the build directory to any static hosting provider or server of your choice.

## 📂 Folder Structure

The project follows a folder structure that separates different concerns for better organization and maintainability:

- 📁 `src/routes`: Contains the routes used by the application. API routes are in the `src/routes/api` directory.
- 📁 `src/components`: Contains all re-usable UI components which are used in multiple routes or other components.
- 📁 `src/clients`: Manages the API calls to the backend (or, in some cases, external services).
- 📁 `src/services`: Contains reusable functions and logic used in the backend.
- 📁 `src/stores`: Stores global reactive state used throughout the application.
- 📁 `src/utils`: Stores additional utility functions used in both front-end and back-end.

## 📋 Prerequisites

To run this project locally, you need to have the following prerequisites installed:

- 📦 Node.js (version 16.14+)
- 📦 npm (version 8.3.1+)

## 🤝 Contributing

Contributions to this project are welcome. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## 📄 License

This project is licensed under the [MIT License](./LICENSE.md).
