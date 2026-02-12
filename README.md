Slack – Online Chat Application
================================

This project is a simple Slack‑style chat application with a **React** frontend and a **Node.js/Express** backend. It supports real‑time messaging using **Socket.IO**, user authentication, and a modern UI built with **Tailwind CSS**, **Bootstrap**, and **DaisyUI**.

The goal of this app is to provide a basic, self‑hosted team chat where users can sign up, log in and talk to each other in channels, similar to Slack but much smaller in scope.

---

Getting started
---------------

### 1. Prerequisites

Make sure you have the following installed:

- Node.js (LTS recommended)
- npm (comes with Node)
- MongoDB instance (local or remote – e.g. MongoDB Atlas)

You will also need a Cloudinary account if you want to store user avatars or other uploaded images.

---

### 2. Install dependencies

From the project root:

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

---

### 3. Backend configuration

Create a `.env` file inside the `backend` folder and add the required values. The exact keys may differ slightly depending on how you wire things up, but a typical setup looks like this:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=some_long_random_string
PORT=5000

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=http://localhost:3000
```

- **MONGO_URI**: your MongoDB connection string.
- **JWT_SECRET**: any long random string used for signing JWTs.
- **PORT**: port for the backend server.
- **CLOUDINARY\_***: credentials from your Cloudinary dashboard.
- **CLIENT_URL**: where the React app runs in development.

---

### 4. Running the app in development

Start the backend (from the project root):

```bash
npm run start --prefix backend
```

By default this will run the API and Socket.IO server (usually on port `5000`, depending on your `.env`).

Start the frontend (in a second terminal, from the project root):

```bash
npm run start --prefix frontend
```

This should start the React dev server on `http://localhost:3000`.

---

Project structure
-----------------

At a high level the project is split into two parts:

- **`frontend/`** – React application, routing, pages and UI components.
- **`backend/`** – Express server, authentication, database models and Socket.IO setup.

The root `package.json` mainly exists to make it easier to run install/build scripts across both `frontend` and `backend`.

---

Main features
-------------

- **User authentication**
  - Sign up and log in with email and password.
  - Passwords stored as bcrypt hashes.
  - JWT‑based auth handled on the backend.

- **Real‑time chat**
  - Live messaging using Socket.IO.
  - Messages broadcast to all users in the same room/channel.
  - Timestamps handled with `date-fns`.

- **Channels / rooms**
  - Users can chat in different channels (depending on how you configure the models and routes).

- **Modern UI**
  - React 18+ with React Router.
  - Tailwind CSS + DaisyUI + Bootstrap for layout and components.
  - Toast notifications via `react-hot-toast`.

---

Available scripts
-----------------

From the **root**:

- `npm run build` – installs dependencies and builds the frontend.
- `npm run start` – starts the backend server defined in `backend/server.js`.

From the **frontend** directory:

- `npm start` – start the React dev server.
- `npm run build` – create a production build of the frontend.
- `npm test` – run tests with React Testing Library.

From the **backend** directory:

- `npm start` – start the backend with Node.
- `npm run dev` – start the backend with Nodemon for auto‑reload during development.

---

Notes and caveats
-----------------

- This is a learning/project boilerplate and not a drop‑in replacement for Slack.
- For production use, you should:
  - Review security settings (CORS, cookies, JWT expiration, HTTPS, etc.).
  - Add proper rate‑limiting and validation.
  - Set strong, secret environment variables.

---

License
-------

This project is open for personal or educational use. Check the `license` fields in the `package.json` files if you need stricter details or plan to use it in production.

