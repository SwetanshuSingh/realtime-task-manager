# Real-Time Task Management App Setup Documentation

## Key Technologies Used

- React.js, TailwindCSS, react-flowbite, Socket.io-client for the frontend.
- Node.js, Express, PostgresSQL, Prisma, Zod, Socket.io for the backend

## This documentation will provide you steps to set up this app locally.
Clone the Repository

`git clone <repository_url>` 
<br/>
<br/>
`cd <repository_name>`

## Install Dependencies
Run `npm install` in the root directory to add dependencies for the server.
<br/>
<br/>
Navigate into the client directory and run `npm install` to add dependencies for the frontend.

## Set up Database
This project uses a serverless Postgres database. Obtain one for free from neon.tech.

 - Navigate into the server directory.
    - Create a .env file and add the following environment variables:

        JWT_SECRET= "<your_random_string>"

        DATABASE_URL="<your_postgres_db_url>"


## Database Setup
Update the database with the current schema. `npx prisma db push`

Generate Prisma Client. `npx prisma generate`

## Run the Server

Run the server locally with `node index.js`

## Start the Client
Navigate into the client directory. `npm run dev` to start the client