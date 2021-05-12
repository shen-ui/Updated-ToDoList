# Updated-ToDoList

An updated ToDo List application built off react. Contains persistent data via a text.json and saved on backend with SQL.

Decided to start small and develope with MySQL database. Database itself is currently being locally hosted on port 3001. Will eventually be migrated once the model has been tested. Code will update accordingly as well as the client side code to push data into the database.

## Steps to run database

1. Download MySQL Workbench 8.0 CE. IMPORTANT!!: Make sure you are using legacy password mode during MySQL Server Configurator.
2. Connect to the `SQL server with MySQL Connections` in the UI.
    If you used port `3306` for the configurator, connect to the MySQL server via that port. You do not need to connect to port 3333, thats only for the front end to listen to. 
    (I may have wasted a lot of time figuring this out..)

edit the code in index.js to configure this to your own MySQL server. This will connect node.js to your locally hosted database.

```
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306, // edit the port here
    database: 'database_name',
    user: 'name',
    password: 'password'
});
```

3. Create the table. I have included a example json file for you to create the table. 
Once you have connected to the SQL server, on the left side of the `Navigator` tab, click, on `Schemas` tab at the bottom of the box.
4. Click on the drop down menu for the database you made and right click on `Tables`
5. Click on `Table Data Import Wizard` and go to the directory of the `data.json` (make sure that your file explorer is set to .json files, by default it is on .csv).
6. Finish the setup and right click on Tables and refresh the menu and you should see the table with the name you declared it as.
7. Left click on the table itself in the tables menu and select `Select Rows - Limit 1000` and you should have a view of the table.

Your database is now established and should be ready for the front end to use!