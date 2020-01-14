const express = require("express");
const app = express();
const router = express.Router();
const pool = require("./../database");
const bodyParser = require("body-parser");
router.use(bodyParser.json());


//Returns all reservations           GET api/reservations/
router.get("/", (request, response) => {
  pool.query("SELECT * from reservation", function(error, results, fields) {
    if (error) {
      return response.send(error);
    }
    response.json(results);
  });
});
//Adds a new reservation	       POST api/reservations/
router.post("/", (req, res) => {
  const reservation = req.body;
  pool.query("INSERT INTO reservation SET ?", reservation, (error, results, fields) => {
      if (error) {
        return res.send(error);
      }
      res.json(results);
    });
});
//Returns reservation by id                   GET api/reservations/2
router.get("/:id", (req, res) => {
    const { id } = req.params;
    pool.query(`SELECT * FROM reservation WHERE id=${id}`,(error, results, fields) => {
      if (error) {
        return res.send(error);
      }
      res.json(results);
    });
});
//Updates the reservation by id                PUT api/reservations/2
router.put("/:id", (req, res) => {
  pool.query("UPDATE reservation SET `number_of_guests` = ?, `meal_id` = ?, `created_date` = ? WHERE `id`= ?",
    [
      req.body.number_of_guests,
      req.body.meal_id,
      req.body.created_date,
      req.body.id
    ],
    (error, results, fields) => {
      if (error) {
        return res.send(error);
      }
      res.send("Updated reservation successfully");
    });
});
//Deletes the reservation by id                DELETE api/reservations/2
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    pool.query(`DELETE FROM reservation WHERE id=${id}`, (error, results, fields) => {
      if (error) {
        return res.send(error);
      }
      res.end("Reservation deleted!");
    });
});

module.exports = router;