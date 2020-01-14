const express = require("express");
const app = express();
const router = express.Router();
const pool = require("./../database");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Returns all meals       GET api/meals/
router.get("/allmeals", (request, response) => {
  pool.query("SELECT * from meal", function(error, results, fields) {
    if (error) {
      return response.send(error);
    }
    response.json(results);
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
  });
});
//Adds a new meal       POST api/meals
router.post("/", (req, res) => {
    const meal = req.body;
    pool.query("INSERT into meal SET ?", meal, (error, results, fields) => {
        if(error){
            return res.send(error);
        }
        res.json(results);
    });
});
//Returns meal by id    GET api/meals/2
router.get("/:id", (req, res) => {
  const { id } = req.params;
  pool.query(`SELECT * FROM meal WHERE id = ${id}`, (error, results, fields) => {
    if (error) {
      return res.send(error);
    }
    res.json(results);
  });
});
//Updates the meal by id       PUT api/meals/2
router.put("/:id", (req, res) => {
 // const { id } = req.query;
  pool.query(
    "UPDATE meal SET `title` = ?, `description` = ?, `location` = ?, `when` = ?, `max_reservations` = ?, `price` = ?, `created_date` = ? WHERE `id`= ?",
    [
      req.body.title,
      req.body.description,
      req.body.location,
      req.body.when,
      req.body.max_reservations,
      req.body.price,
      req.body.created_date,
      req.body.id
    ],
    (error, results, fields) => {
      if (error) {
        return res.send(error);
      }
      res.send('Meal has been updated');
    });
});
// Deletes the meal by id      DELETE meals/2
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    pool.query(`DELETE FROM meal WHERE id = ${id}`, (error,results, fields) => {
        if (error) {
          return res.send(error);
        }
        res.send(`Meal with ID No.${id} is deleted succesfully`);
    });
});


router.get("/", (req, res) => {
  console.log(req.query);
  const { maxPrice } = req.query;
  const { availableReservations } = req.query;
  const { title } = req.query;
  const { createdAfter } = req.query;
  const { limit } = req.query;
  //Get meals that has a price smaller than maxPrice     /meals?maxPrice=90
  if (maxPrice) {
    pool.query(
      `SELECT * FROM meal WHERE price <= ${maxPrice}`,
      (error, results, fields) => {
        if (error) {
          return res.send(error);
        }
        res.json(results);
      });
    //Get meals that still has available reservations    api/meals?availableReservations=true
  } else if (availableReservations) {
    pool.query(
      `SELECT meal.id, meal.title, (meal.max_reservations-reservation.number_of_guests) AS available_reservations, reservation.number_of_guests FROM Meal
    JOIN reservation
    ON meal.id = reservation.meal_id
    WHERE number_of_guests < max_reservations;`,
      (error, results, fields) => {
        if (error) {
          return res.send(error);
        }
        res.json(results);
      }
    );
    //Get meals that partially match a title. Rød grød med will match the meal with the title Rød grød med fløde     api/meals?title="Indian platter"
  } else if (title) {
    const titleQueryModified = title
      .toLowerCase()
      .replace(/"/g, "")
      .trim();
    pool.query(
      `SELECT * FROM meal WHERE title LIKE '%${titleQueryModified}%'`,
      (error, results, fields) => {
        if (error) {
          return res.send(error);
        }
        res.json(results);
      }
    );
    // Get meals that has been created after the date     api/meals?createdAfter=2019-04-05
  } else if (createdAfter) {
    pool.query(
      `SELECT * FROM meal WHERE created_date >= '${createdAfter}'`,
      (error, results, fields) => {
        if (error) {
          return res.send(error);
        }
        res.json(results);
      }
    );
    //Only specific number of meals         api/meals?limit=4
  } else if (limit) {
    const limitNumber = parseInt(limit.trim());
    pool.query(
      `SELECT * FROM meal LIMIT ${limitNumber}`,
      (error, results, fields) => {
        if (error) {
          return res.send(error);
        }
        res.json(results);
      });
    }
});

module.exports = router;
