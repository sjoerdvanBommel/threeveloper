# 🖼️ Gallery App

Welcome to the Gallery App, created by Threeveloper! This project is a gallery web application built with SvelteKit. It allows users to search for images and fetches them from the Unsplash API. The main objective of this project is to provide a hands-on learning experience through the "_Mastering SvelteKit: Elevate Your Web Projects_" YouTube tutorial series.

I honestly believe that, at the end of this tutorial series, you **don't want to go back to React or Angular anymore**.

### Tech & tools used in this project

- **SvelteKit** serves as the front-end framework.
- **TypeScript** was utilized as the typing system.
- **Tailwind CSS** was used to style the components and pages.
- **Vitest** for unit and component testing, in conjunction with `@testing-library/svelte` for the component tests.
- **Playwright** and `playwright-msw` for end-to-end tests with mocked requests.
- **MSW** to mock outgoing requests for local development and testing purposes
- **ESLint** served as the linter to detect potential bugs and inconsistencies
- **Prettier** was used to maintain consistent code formatting

Go check out the **[YouTube tutorial series](https://www.youtube.com/watch?v=6Vrc1VO8pgs&list=PL1YJW01TGCGlUij-TXDIwgoLTpamTsjUJ)**!

### Demo

Check out the GIFs below to see what you will build during this tutorial series! The Gallery App also offers the following features:

- 🌓 dark mode
- 📱 Responsive design
- 😴 Lazy and progressive image loading for optimized performance

The app has been thoroughly tested with Unit, Component and end-to-end tests. You can explore a live demo of the Gallery App at [https://threeveloper.vercel.app](https://threeveloper-git-sveltekit-tutorial-fina-de2b95-sjoerdvanbommel.vercel.app/).

<div>
  <img src="static/videos/readme/preview.gif" alt="Gallery App Preview" width="600px">
  <img src="static/videos/readme/mobile.gif" alt="Mobile and dark mode support" width="200px">
</div>

## 🚀 Getting Started

Follow the steps below to set up and run the project on your local machine:

### 1. Clone the repository 🔍

Clone the `sveltekit-tutorial-final-result` branch of the `threeveloper` repository:

```shell
git clone -b sveltekit-tutorial-final-result https://github.com/sjoerdvanBommel/threeveloper.git gallery-app
```

### 2. Install the dependencies 📦

Navigate to the directory where you cloned the repository and install the dependencies:

```shell
cd gallery-app
npm install
```

### 3. Configure the API credentials 🔑

- [Create an Unsplash account](https://unsplash.com/join), register a new application, and obtain an API key for that application.
  > **Note**
  > While developing locally, we will use MSW to mock data as Unsplash demo apps have a limit of 50 requests per hour. However, if you plan to deploy your gallery or product to production, make sure to upgrade your Unsplash plan.
- Make a copy of the `.env.example` file and rename it to `.env.local`.
- Replace the `UNSPLASH_ACCESS_KEY` and `UNSPLASH_SECRET_KEY` placeholders in the `.env.local` file with your actual API keys.

### 4. Start the development server ▶️

Launch the development server:

```shell
npm run dev
```

The application will be accessible at http://localhost:5173. Enjoy coding from here on! Any updates to the code will be reflected almost instantaneously.

### 5. Developing locally 💻

If you want to run the entire project locally, even without an internet connection or when the Unsplash API is down, simply set the `PUBLIC_MSW_ENABLED` variable in your `.env.local` file to `true`. This uses the same MSW handlers as for testing.

## 🧪 Testing

1. If this is your first time you are using playwright, make sure you install it locally:

```shell
npx playwright install
```

2. Run the tests. This command will execute all unit, component, and end-to-end tests:

```shell
npm test
```

There are also some other test scripts available:

```shell
npm test:unit # Runs unit and component tests only
npm test:coverage # Generates a test coverage report based on unit and component tests
npm test:e2e # Runs end-to-end tests only
```

## 🏗️ Building and Deployment

An easy way to deploy your application is using hosting solutions like [Vercel](https://vercel.com/) and [Netlify](https://www.netlify.com/), which both offer free tiers.

To build the application for production and deploy it manually, follow these steps:

1. Build the optimized version of the application

```
npm run build
```

2. The build output will be available in the `build` directory. To preview the result, run `npm run preview`.
3. You can deploy the contents of the build directory to any static hosting provider or server of your choice.

## 📂 Folder Structure

The project follows a folder structure that separates different concerns for better organization and maintainability:

- 📁 `src/clients`: Manages API calls to the backend.
- 📁 `src/components`: Contains re-usable UI components used in multiple routes or other components.
- 📁 `src/e2e`: Holds all end-to-end tests. These tests are saved in a separate directory as they are not directly tied to a specific file.
- 📁 `src/routes`: Contains the routes used by the application. API routes are located in the `src/routes/api` directory.
- 📁 `src/services`: Contains reusable functions and logic used in the backend.
- 📁 `src/stores`: Stores global reactive state used throughout the application.
- 📁 `src/test`: Contains files used for testing purposes, such as the MSW configuration. This folder does not contain actual tests.
- 📁 `src/utils`: Stores additional utility functions and types used in both the front-end and back-end.

## 📋 Prerequisites

To run this project locally, you need to have the following prerequisites installed:

- 📦 Node.js (version 16.14+)
- 📦 npm (version 8.3.1+)

## 🤝 Contributing

Contributions to this project are welcome. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## 📄 License

This project is licensed under the [MIT License](./LICENSE.md).
