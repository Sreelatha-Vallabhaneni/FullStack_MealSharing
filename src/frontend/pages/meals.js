import {renderAllMeals} from "./home";
// create form for meal with post method
function createMeal(req, router){
    document.body.innerHTML = `
    <header>
    <a href="./"><img class="logo" src="../images/logo2.png" alt="meal sharing logo"></a>
    <nav>
      <a href="./meals"><p>Create Meal</p></a>
      <a href="./reviews"><p>Create Review</p></a>
    </nav>
  </header>
    <form method="POST>
    <div class="create-meal-form">
        <div class="c-meal-flex">
            <label for="title">Title</label>
        <input type="text" placeholder="title" class="c-title c-meal">
        </div>
        <div class="c-meal-flex">
            <label for="description">description</label>
        <input type="text" placeholder="description" class="c-description c-meal">
        </div>
        <div class="c-meal-flex">
            <label for="location">Location</label>
        <input type="text" placeholder="location" class="c-location c-meal">
        </div>
        <div class="c-meal-flex">
            <label for="date">When</label>
            <input type="date" placeholder="YYYY-MM-DD" class="c-when c-meal" pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])">
        </div>
        <div class="c-meal-flex">
            <label for="reservation">Max-Reservations</label>
        <input type="text" placeholder="max-reservations" class="c-max-reservation c-meal">
        </div>
        <div class="c-meal-flex">
            <label for="price">Price</label>
        <input type="text" placeholder="price" class= "c-price c-meal">        
        </div>           
        <button id="submit-meal" class=" btn btn-danger">Create Meal</button>
    </div>     
    </form>
    <ul class="ul-flex"></ul>
    `;
    document.getElementById("submit-meal").addEventListener("click", (e) => {        
        e.preventDefault();
        if(document.querySelector(".c-meal").value !== ""){
            const cTitle = document.querySelector(".c-title").value;
            const cdescription = document.querySelector(".c-description").value;
            const cLocation = document.querySelector(".c-location").value;
            const cWhen = document.querySelector(".c-when").value;
            const cMaxReservation = document.querySelector(".c-max-reservation").value;
            const cPrice = document.querySelector(".c-price").value;
            const today = new Date();
            const todayDate =today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
            const allCreateMeals = {
              "title": cTitle,
              "description": cdescription,
              "location": cLocation,
              "when": cWhen,
              "max_reservations": cMaxReservation,
              "price": cPrice,
              "image": `https://source.unsplash.com/200x200?${cTitle}`,
              "created_date" : todayDate
            };                    
            fetch("/api/meals", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(allCreateMeals)})
            .then(res => {
              console.log(res);
              if (res.status != 200) {
                  alert("Your meal is not submitted, please try again");
                } else{
                   alert("meal created successfully!"); 
                }
            });
        } else {
            alert("please enter meal details");
        }
    });
    //render all meals
    renderAllMeals();    
}

export default createMeal;