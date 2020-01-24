function homeRouter(req, router) {     
  document.body.innerHTML = `
  <main id="home-page">
  <img class="logo" src="../images/logo2.png" alt="meal sharing logo">
  <div class="title-subtitle">
  <h1>Let's Eat<h1>
  <p>Eat Well and Share Well</p>
  </div>  
  </main>
  <section>
  <h2 style="margin: 5% 0;">Featured Meals</h2>
  </section>
  <footer>
    <ul class="footer">
      <li>About</li>
      <li>Contact</li>
      <li><i class="fab fa-facebook-f"></i></li>
      <li><i class="fab fa-linkedin-in"></i></li>
    </ul>
  </footer>`; 
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
};

export default homeRouter;
