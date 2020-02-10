function mealsId(req, router) {
  console.log(req.param.id);  
  // Render single meal with id
  fetch(`api/meals/${req.param.id}`)
  .then(res => res.json())
  .then(meal => {
    console.log(meal);   
    renderSingleMeal(meal);    
  })  
}

function renderSingleMeal(meal){
    document.body.innerHTML = `
    <header>
    <a href="./"><img class="logo" src="../images/logo2.png" alt="meal sharing logo"></a>
    <nav>
      <a href="./meals"><p>Create Meal</p></a>
      <a href="./reviews"><p>Create Review</p></a>
    </nav>
  </header>
    <section id="single-meal">
    <div class="single-meal">
      <img class="single-meal-image" src=${meal[0].image}>
      <div class="single-meal-info">
       <b><h3 class="single-meal-title">${meal[0].title}</h3></b>
       <b><ul>
         <li>Description:   ${meal[0].description}</li>
         <li>Location:   ${meal[0].location}</li>
         <li>Price:   ${meal[0].price}</li>
         <li>ID:   ${meal[0].id}</li>
         <li>When:   ${meal[0].when}</li>
         <li>Max-Reservations:   ${meal[0].max_reservations}</li>
         <li>Created Date:   ${meal[0].created_date}</li>
       </ul></b>
       <button type="button" class="btn btn-warning book-seat">Book Seat</button>
      </div>  
    </div>  
    <form method="POST" action="api/meals/${meal.id}">
  <div class="form-row">
    <div class="col">
      <label for="exampleFormControlInput1">Phone Number:</label>
      <input type="text" class="form-control phn" placeholder="Phone Number">
    </div>
    <div class="col">
      <label for="exampleFormControlInput1">Name:</label>
      <input type="text" class="form-control name" placeholder="Name">
    </div>
    <div class="col">
    <label for="exampleFormControlInput1">Email address:</label>
    <input type="email" class="form-control email" id="exampleFormControlInput1" placeholder="name@example.com">
  </div>
  <div class="col">
      <label for="exampleFormControlInput1">No.Of Guests:</label>
      <input type="number" class="form-control guests" placeholder="Enter Number">
    </div>
    <button type="button" class="btn btn-success resrvation-btn">Send</button>
  </div>   
  </form>    
  </section>
  `;
   
//event listener to book a seat
  const button = document.querySelector(".book-seat");
  button.addEventListener("click", () => {
    if (meal[0].max_reservations > 0) {
      document.querySelector(".form-row").style.visibility  = "visible";
    } else{
      document.body.innerHTML = `<p>Sorry! No more reservations for this meal.</p>`
    }
  });
//create reservation using post method
document.querySelector(".btn-success").addEventListener('click', () => {
  const phn = document.querySelector(".phn").value;
  const name = document.querySelector(".name").value;
  const email = document.querySelector(".email").value;
  const guests = document.querySelector(".guests").value;
  const createReservation = {
    "phone_number": phn,
    "name": name,
    "email": email,
    "number_of_guests": guests,
    "meal_id" : meal.id
    //"created_date": "2020-01-15"
  };
  fetch("/api/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(createReservation)
  })
    //.then(res => res.json())
    .then(res => {
      console.log(res);
      const formCntrl = document.querySelector('.form-control').value;
      if (res.status != 200) {
        alert("Your reservation is not submitted, please try again");
      } else if(formCntrl === ""){
        alert("Please enter your details!");
      }else {
        alert("Successfully Your reservation has been submitted! 👍");
      }
    });
  });  
 }; 

export default mealsId;
//export default ;