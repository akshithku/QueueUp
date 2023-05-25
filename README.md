# QueueUp

# Description:

## Problem Statement
Managing queues and booking appointments with doctors can often be a time-consuming and cumbersome process for patients. Long waiting times, lack of real-time updates on token numbers, and manual appointment booking systems can lead to frustration and inefficiency. To address these challenges, QueueUp is a comprehensive queue management website that simplifies the process of accessing medical services and enhances the overall experience for patients.

## Solution:
QueueUp provides a user-friendly platform for patients to view the current token number of doctors in real-time. By offering this feature, patients can estimate waiting times and plan their visit accordingly, reducing unnecessary waiting periods. The website also incorporates an appointment booking system that allows users to schedule appointments with doctors at their convenience. This eliminates the need for patients to physically visit the clinic to book an appointment, saving time and effort.

One of the key features of QueueUp is the integration of a secure payment gateway. Patients can make payments for their appointments using various payment methods, ensuring a seamless and secure transaction process. This eliminates the need for patients to carry cash or rely on manual payment methods, enhancing convenience and reducing the risk of errors.

After making a successful payment, patients are required to submit the transaction ID through a dedicated form. This allows for easy verification and record-keeping of transactions, ensuring transparency and accountability in the payment process. It also enables both patients and healthcare providers to keep track of the payment status for each appointment.

QueueUp aims to streamline the queue management and appointment booking process for both patients and doctors. By providing real-time updates on token numbers, a user-friendly appointment booking system, and a secure payment gateway, QueueUp simplifies the overall healthcare experience. It brings efficiency, convenience, and transparency to the process, enhancing patient satisfaction and optimizing the utilization of healthcare resources.

# Project Url:

 👉[Frontend](https://queueup.netlify.app/)
 👉[API Doc](https://documenter.getpostman.com/view/25535337/2s93m61hUk)

Figma Link : (https://www.figma.com/file/F0emiOyrEfONTLPo5TdDIw/Untitled?type=design&node-id=0%3A1&t=otQ5KKMmUPVudWVb-1)

#  Key Features:
Real-time Token Tracking: 
Patients can easily check the current token number of doctors, enabling them to estimate waiting times and plan their visit accordingly.

Appointment Booking:
QueueUp offers a user-friendly interface to book appointments with doctors. Users can select preferred time slots and complete the booking process seamlessly.

Secure Payment Gateway: 
To ensure a secure and hassle-free payment experience, QueueUp integrates a reliable payment gateway. Users can make payments using various methods and receive instant confirmation.

Transaction Submission: 
After making a successful payment, patients are required to submit the transaction ID in a dedicated form. This allows for easy verification and record-keeping of transactions.

# Installation Steps
Download the repository.

Install the dependencies for the frontend and backend by running the following command in the project root directory:

npm install

Create a .env file in the Client directory of front-end and add the following variables:

REACT_APP_AUTH0_DOMAIN="Your Auth0 Domain"
REACT_APP_AUTH0_CLIENT_ID="Your Auth0 Client ID"
REACT_APP_FETCH_URL=http://localhost:8000/apkinfo
REACT_APP_SERVER_SOCKET_URL=http://localhost:3000/


Create a .env file in the server directory of Back-end and add the following variables:
Add your MongoDB URL in enum.js present inside Server folder.
process.env.MONGO_URI="MongoDB Atlas Url"
process.env.PORT="Sever port number"

Start the Front-End server by running the following command in your frontend and Front-End directory:

npm start

Start the Back-End server by running the following command in your frontend and Back-End directory:

nodemon app.js

Open your web browser and go to http://localhost:3000 to view the app.

# Progress Tracker
Content
Back-end
NodeJs - setting up a project with package.json
NodeJS Modules
fs Module
Streams and Buffers
NPM
Nodemon
Events in Nodejs
Express JS - first route
ExpressJS - additional routes
Template Engines
Partials
Middlewares
Databases
MongoDB - Installations and Basics
Mongoose
CRUD Operations
Simple API - CRUD Operations using NodeJs
Schemas and Models
Indexes
Aggregations
Front-end and Full Stack
Low-fid design for your application
High-fid design for your application
ReactJS app initialization
Application components created
Application deployed
IDE Setup
NodeJs REPL
Using the public folder to serve files
Postman Use for Testing
Authentication
Deployment
Extra Topics
dotenv
React Router