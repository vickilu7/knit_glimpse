# knit_glimpse
 
## Getting Started

You need **Node**, **Express**, and **Postgres** if you don't have them already.
```
npm install node -g
npm install express -g
brew install postgresql
```

First time set up for database:
```
brew services start postgres 
psql postgres
```
If you get an error `Is the server running locally and accepting
    connections on Unix domain socket "/tmp/.s.PGSQL.5432"?`, it might be an issue with homebrew installing postgres on the Mac. Follow the instructions in the first/second answers from this [post](https://stackoverflow.com/questions/27700596/homebrew-postgres-broken).

If you get an `error: role postgres does not exist`, try running `/usr/local/opt/postgres/bin/createuser -s postgres`

```
CREATE DATABASE knit2;
\c knit2;
```
Your terminal should now say `You are now connected to database "knit2" as user "..."` Take note of what user you're connected with, and inside the **db.js** file, change the lines with `user: "postgres"` to the user you connected to knit2 with. So if you connected with user `firstlast`, change the line in db.js to `user: "firstlast"`.

Copy and past all the content from **database.sql** file into your psql shell.


If there are any package-lock.json files in your folders (main and client), delete them. **Do not delete the package.json files.** 


## Installing dependencies and Running
First time set up for project. In the knit_glimpse repo:
```
npm install 
cd client
npm install
cd ..
npm run dev
```
The `npm run dev` should concurrently start the backend and client side server.
