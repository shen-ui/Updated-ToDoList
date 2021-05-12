# Intoduction
This is an updated version of a previous react todo list application with a node.js backend.
mySQL was used to develope the database.
Finished on 5/11/2021.

## Menu
All done!
Will try to get the MySQL database hosted on AmazonRDS or firebase.
May update css to improve mobile look and feel.

## Bugs
No Bugs!!! ( LETS GOOOOO! )

# How to run start front end
NOTE:
I have split the project to a `backend` and `master` branch
Master is the front end developed in React
Backend is a node.js with MySQL
See Backend before setting up the front.

1. Required Tools: 
Node.js
https://nodejs.org/en/download/
IDE (I prefer VSCode)
https://dev.mysql.com/downloads/workbench/
MySQL Workbench 8.0 CE
https://code.visualstudio.com/download
gitBash
https://git-scm.com/downloads

2. Go to the directory in your IDE and open a new console (or use gitbash) and type these commands:
`npm install`
`npm start`
the front end is now operational

3. See backend branch for details on the backend! 

## Git Steps
1. `git init`
2. `git remote add https://github.com/shen-ui/Updated-ToDoList.git master
2. `git add .`
3. `git commit -m `enter message`
4. `git push`

## Gh-pages Steps
1. npm i gh-pages
2. `edit package.json`
3. add`"homepage": "gh-pages URL Here", ...`
    to the top of the package.json before `"name": "name here"...`
4. include deployment script into the package.json for gh-pages.
```scripts {...
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
    }
    ```
5. `npm run deploy`