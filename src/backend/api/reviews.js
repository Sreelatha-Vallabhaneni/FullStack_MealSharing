const express = require("express");
const app = express();
const router = express.Router();
const pool = require("./../database");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

//Returns all reviews	GET api/reviews/
router.get("/", (request, response) => {
  pool.query("SELECT * from review", function(error, results, fields) {
    if (error) {
      return response.send(error);
    }
    response.json(results);
  });
});
// Adds a new review	POST api/reviews/
router.post("/", (req, res) => {
  const review = req.body;
  console.log("review:", review);
  pool.query("INSERT into review SET ?", review, (error, results, fields) => {
    if (error) {
      return res.send(error);
    }
    res.json(results);
  });
});
// Returns review by id	GET api/reviews/2
router.get("/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    `SELECT * FROM review WHERE id=${id}`, (error, results, fields) => {
      if (error) {
        return res.send(error);
      }
      res.json(results);
    });
});
//Updates the review by id	PUT api/reviews/2
router.put("/:id", (req, res) => {
  pool.query(
    "UPDATE review SET `title` = ?, `description` = ?, `meal_id` = ?, `stars` = ?, `created_date` = ? WHERE `id`= ?",
    [
      req.body.title,
      req.body.description,
      req.body.meal_id,
      req.body.stars,
      req.body.created_date,
      req.body.id
    ],
    (error, results, fields) => {
      if (error) {
        return res.send(error);
      }
      res.send("Updated review successfully");
    });
});
//Deletes the review by id	DELETE api/reviews/2
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    pool.query(
    `DELETE FROM review WHERE id=${id}`, (error, results, fields) => {
      if (error) {
        return res.send(error);
      }
      res.end("Review deleted");
    });
});
module.exports = router;