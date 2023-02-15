const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
app.use(express.json());

const dbpath = path.join(__dirname, "moviesData.db");
const db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Databse,
    });
    app.listen(3000, () => {
      console.log("server running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`dberror:${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

app.get("/movies/", async (request, response) => {
  const getListOfMoviesQuery = `SELECT * FROM movie;`;
  const getListOfMovies = await db.all(getListOfMoviesQuery);
  response.send(getListOfMovies);
});
