function renderAllMeals() {
  fetch("api/meals/allmeals")
    .then(res => res.json())
    .then(meals => {
      console.log(meals);
      const ul = document.createElement("ul");
      ul.classList.add("ul-flex");
      document.body.appendChild(ul);
      meals.forEach(meal => {
        const li = document.createElement("li");
        li.classList.add("li-flex");
        ul.appendChild(li);
        li.innerHTML = `        
        <a href="./meals/${meal.id}" class="meal-navigation"><img class="all-images" src=${meal.image} alt=${meal.title}>
        <h3>${meal.title}</h3>
        <p>${meal.description}</p>
        <p><i class="fas fa-map-marker-alt">${meal.location}</i></p>
        <p><i class="fas fa-dollar-sign">${meal.price}</i></p>
        <p><i class="far fa-calendar-alt">${meal.when}</i></p>
        <p><i class="far fa-calendar-alt">${meal.created_date}</i></p></a>`;
      });      
    });
}
function homeRouter(req, router) {    
  document.body.innerHTML = `
  <header>
    <a href="./" class="a-logo"><img class="logo" src="../images/logo2.png" alt="meal sharing logo"></a>
    <nav>
      <a href="./meals"><p>Create Meal</p></a>
      <a href="./reviews"><p>Create Review</p></a>
    </nav>
  </header>
  <main id="home-page"> 
  <div class="title-subtitle">
  <h1>Let's Eat<h1>
  <p>Eat Well and Share Well</p>
  </div>
  <div id="carouselExampleControls meals-banner" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="../images/mealimage1.jpg" class="d-block w-100 banner-one" alt="Mens Shoes">
                </div>
                <div class="carousel-item">
                    <img src="../images/mealimage2.jpg" class="d-block w-100 banner-two" alt="Sale-discount">
                </div>
                <div class="carousel-item">
                    <img src="../images/mealimage3.jpg" class="d-block w-100 banner-three" alt="Womens Shoes">
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>  
  </main>
  <section>
  <h2 style="margin: 5% 0;">Featured Meals</h2>
  </section>
  `; 
  renderAllMeals()        
}

/*document.body.innerHTML = `
  <footer>
    <ul class="footer">
      <li>About</li>
      <li>Contact</li>
      <li><i class="fab fa-facebook-f"></i></li>
      <li><i class="fab fa-linkedin-in"></i></li>
    </ul>
  </footer>
  `;*/
//mysql://b77a60f78267f6:9850551f@eu-cdbr-west-02.cleardb.net/heroku_6abc116f3e513ae?reconnect=true

export {homeRouter, renderAllMeals};
