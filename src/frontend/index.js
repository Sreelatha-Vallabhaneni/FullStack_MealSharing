import "./index.css";


import SPARouter from "@kodnificent/sparouter";

import mealRouter from "./pages/meal";
import {homeRouter} from "./pages/home";
import createMeal from "./pages/meals";
import renderReview from "./pages/meal-reviews";

const options = {
  historyMode: true // set this to true if you use the HTML5 history mode API
};
const router = new SPARouter(options);

router.get("/", homeRouter);
router.get("/meals/{id}", mealRouter);
router.get("/meals", createMeal);
router.get("/reviews", renderReview);
router.init();
