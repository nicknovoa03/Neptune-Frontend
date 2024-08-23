# Neptune 

Application created with NextJs, TailwindCSS, Typescript, Firebase for Google-Authentication & Realtime Database, Vercel SWR for Data Fetching and ChatGPT API.

## Key Features
* <b>Google Login/Signup:</b> Seamlessly sign in or sign up using your Google account for a hassle-free user experience.

* <b>Firebase Firestore:</b> A flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud Platform. It provides real-time data synchronization and offline support, making it ideal for building responsive and collaborative applications.

* <b>Active Side Navigation:</b> Easily switch between previous chats and create new ones with the user-friendly sidebar.

* <b>Log Out Button:</b> Conveniently located at the bottom of the sidebar, the log-out button allows you to sign out with a single click.

* <b>Interactive Input Bar:</b> Experience an input bar that mimics the original ChatGPT, ensuring an engaging and familiar chat interface.

* <b>Real-time Updates:</b> Stay informed with real-time data fetching using React-hot-toast notifications, keeping you up-to-date with the latest information.

* <b>ChatGPT API Integration:</b> Engage in real-time interactions with the ChatGPT API, enabling dynamic and responsive conversations.

## Technologies Used
This project was uses the following technologies -

* NextJs
* TypeScript 
* Open AI
* TailwindCSS & heroicons (for user interface)
* React-hot-toast (for notifications)
* FirebaseAuth & NextAuth (for authentication)
* SWR (for response fetching)
* Firebase (cloud firestore)
* vercel (for hosting)

## Installation

```bash
  cd NeptuneGPT
```
Install packages: 
```bash 
yarn install
```
To run this project, you will need to add the following environment variables to your .env file

`CHAT_GPT_KEY`

`NEXTAUTH_URL`

`NEXT_PUBLIC_BASE_URL`

`GOOGLE_CLIENT_ID`

`GOOGLE_CLIENT_SECRET`

`FIREBASE_SERVICE_ACCOUNT_KEY`

`NEXT_PUBLIC_FIREBASE_APP_ID`

`NEXT_PUBLIC_FIREBASE_API_KEY`

`NEXT_PUBLIC_FIREBASE_PROJECT_ID`

`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`

`NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`

`NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`


Build project:
```bash
npm run dev
```
Open your browser at: 
```bash
http://localhost:3000
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
# or
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

