# Intoduction
This is an updated version of a previous react todo list application with a backend of a persistant MySQL database. Currently working on functionality over form. Overall component developement has been fine.
Data is currently saved in a 'data.json' file in the main directory.

## Menu

1. Need to hook up the front end to the backend (Shouldn't be much more considering the hard part of making a backend is done.)
2. Fix the logic of previous bugs
3. Migrate the database to an Amazon RDS server for persistance online.

## Bugs

1. The 'id' for every todo in the todos state is does not order correctly and needs to be redesigned.
2. Upon updating a todo, the date is updated but the 'id' is not pushed to the front of the todo list.

Overall, many of the front end problems relate to mismanagement of this specific problem and needs to be
redesigned. Will be ironed our with further developement.

# How to run start front end
NOTE:
I have split the project to a 'backend' and 'master' branch
Master is the front end developed in React
Backend is a node.js with MySQL
See Backend before setting up the front.

1. Node.js, a IDE (I prefer VSCode) and MySQL Workbench
https://nodejs.org/en/download/
https://dev.mysql.com/downloads/workbench/
https://code.visualstudio.com/download

2. Enter the a console and go into the directory for the client side and run:
'npm install'
'npm start'

3. Use the App!

## Git Steps

1. 'git init'
2. 'git remote add https://github.com/shen-ui/Updated-ToDoList.git master
2. 'git add .'
3. 'git commit -m 'enter message'
4. 'git push'

## Gh-pages Steps

1. npm i gh-pages
2. 'edit package.json'
3. add'"homepage": "gh-pages URL Here", ...'
    to the top of the package.json before "name": "name here"...
4. scripts {...
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
    }
5. npm run deploy 