# Codet

Codet is a coding playground for web developers. The users can write HTML,
CSS and JavaScript code, preview, save and share the code with other users.

![Logo](https://nikhilprojects.s3.us-west-1.amazonaws.com/codet/Codet.png)

## Live Demo

The web application is hosted on: https://codet-jade.vercel.app/

Highly recommend to view the hosted project as the use of framer motion
for animations cannot be justified through screenshots.

## Features

- Code editor for HTML, CSS and JavaScript with syntax highlighting.
- Preview of the code written by user.
- Users can save the code and retrieve it later.
- Share the code with other users.
- Search for the publicly shared codets.
- User login and registration.

## Tech Stack

**Frontend:** React, Next.js, TailwindCSS, Framer motion

**Backend:** Next.js for Server-side rendering and API, MongoDB

## Screenshots

![App Screenshot](https://nikhilprojects.s3.us-west-1.amazonaws.com/codet/screenshots/codet_landingpage.png)

![App Screenshot](https://nikhilprojects.s3.us-west-1.amazonaws.com/codet/screenshots/codet_viewcode.png)

![App Screenshot](https://nikhilprojects.s3.us-west-1.amazonaws.com/codet/screenshots/codet_dashboard1.png)

![App Screenshot](https://nikhilprojects.s3.us-west-1.amazonaws.com/codet/screenshots/codet_usercode.png)

![App Screenshot](https://nikhilprojects.s3.us-west-1.amazonaws.com/codet/screenshots/codet_savecode.png)

![App Screenshot](https://nikhilprojects.s3.us-west-1.amazonaws.com/codet/screenshots/codet_min.png)

![App Screenshot](https://nikhilprojects.s3.us-west-1.amazonaws.com/codet/screenshots/codet_login.png)

![App Screenshot](https://nikhilprojects.s3.us-west-1.amazonaws.com/codet/screenshots/codet_register.png)

## Run Locally

Clone the project

```bash
  git clone https://github.com/nikhiilll/Codet.git
```

Go to the project directory and install dependencies

```bash
  npm install
```

Add the following local environment variables to the local
environment file: MONGODB_URI, JWT_SECRET

Run the code locally using following command,

```bash
  npm run dev
```
