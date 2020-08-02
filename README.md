# Marwan-Rizik-27-7-2020

## visit here https://herolo-test.netlify.app/

:warning: **Since the server and database are hosted on Heroku(free plan), you will have to wait about 10 seconds on the first run**:warning:

## Table Of Contents
- [About the project](#About-the-project)
- [About the app](#About-the-app)
- [Demo](#Demo)
- [Techstack](#Techstack)
    - [Server](#Server-TechStack)
    - [Client](#Client-TechStack)
    - [Deployment](#Deployment)
- [Special Gotchas](#Special-Gotchas)
- [Installation](#Installation)

## About the project

#### This project is part of a job assignment, where i had to build a messaging/email:e-mail: like app in 5-7 days.  
**Why Did i take this challenge** :question: 
I'm a passionate JS fullstack developer who is seeking an opportunity to work and utilize my passion to further growth of the company and be part of it. Challenges and problem solving were always the things i liked to do, As well i wanted to prove that i have the skills to do more in a short time and learn new technologies.

## About the app
- #### How to use it
    - Create user
    - Send a message(click compose)
        - in order to send a message you must know the recipient registered email.
    - ENJOY :smiley:
-  app requirements 
    - write message
    - get message/s
    - delete message
-  The message should include   
    -  sender
    -  receiver
    -  message
    -  subject
    -  creationDate.
- In the current app you can do all the above plus :heavy_plus_sign: 
    - register and login
    - get sent messages
    - mark message as read when opened
    - show new messages

## Demo

![](https://i.imgur.com/O8poBty.png)
![](https://i.imgur.com/dpzSNqv.png)

## Techstack
- ### Server TechStack
  - #### Server & database :sunglasses: 
      - Nodes.js
      - Express.js
      - JWT for authentication
      - Hapi/Joi for validations
      - PostgreSQL(database)
- ### Client TechStack 
  - #### ReactJS front end :yum: 
      - MaterialUI
      - React-router-dom
      - Recoil(for state management)
    
- ### Deployment
    - **[Heroku](https://www.heroku.com/home) for backend and datababse** 
    - **[Netlify](https://www.netlify.com/) for frontend**


## SpecialGotchas
- ### Challenges :muscle: 
    - #### Learning new tech
        - This was my first time working with React MaterialUI, but i wanted to use it, because i know how useful it can be to build websites in a faster phase, and as well to challenge my self and prove that i'm able to learn new tech's and adapt fast.
    - #### App design
        - At first i had a different design that i wanted to clone, but i realized i was short in time, so i ended up using a whole component from MaterialUI, and tweaking it a little bit to my likings.
- ### Things to improve :question: 
    - Add mobile support
    - Polish up the code(make it cleaner and easier to read)
    - Remove/change redundant code
    - Add Deleted messages tab
    - Option to mark as read without opening the message
    - Improve the design

## Installation

- ### Clone the repo
    ```
    git clone 
    ```
- ### Install packeges
    - cd to project root directory
    - Since there are 2 folders (client & server)
    ```
    cd client
    npm install
    cd ..
    cd server
    npm install
    ```
- ### Add enviroment files
    - /server
    ```
    DEV_DB = your local db(you have to create db first and include build.sql in it)
    PROD_DB = production database
    JWT_SECRET = (can be any string)
    ```
    - /client
    ```
    REACT_APP_API_HOST = (your server link) ex- http://localhost:4000'
    
    ```
- ### Run the app
    - cd to server directory and run
    ```
    npm run dev(for development)
    npm start(for production)
    ```
    - cd to client directory and run
    ```
    npm start
    ```
    
**WOLAAAA YOU GOT A MESSAGING APP:love_letter:**
