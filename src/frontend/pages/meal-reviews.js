function renderReview(meal) {
  document.body.innerHTML = `
  <header>
    <a href="./" class="a-logo"><img class="logo" src="../images/logo2.png" alt="meal sharing logo"></a>
    <nav>
      <a href="./meals"><p>Create Meal</p></a>
      <a href="#"><p>Create Review</p></a>
    </nav>
  </header>
  <form class="review-container" method="POST">    
    <input type="text" class="review-title" placeholder="Enter review title">
    <textarea rows="4" cols="50" class="review-area" placeholder="Enter review"></textarea>
    
    <button type="button" class="btn btn-primary">Send Review</button>
  </form>
  `;
  const reviewTitle = document.querySelector(".review-title").value;
  const reviewArea = document.querySelector(".review-area").value;  
 document.querySelector(".btn-primary").addEventListener("click", () => {
   const today = new Date();
   const todayDate =
     today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
   const createReview = {
     title: reviewTitle,
     description: reviewArea,
     meal_id: meal.id,
     created_date: todayDate
   };
   fetch("/api/reviews", {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify(createReview)
   }).then(res => {
     console.log(res);
     if (res.status != 200) {
       alert("Your review is not submitted, please try again");
     } else {
       alert("review submitted");
     }
   });
 });  
 allReviews()
}

function allReviews(){
  fetch("/api/reviews")
    .then(res => res.json())
    .then(reviews => {
      console.log(reviews);      
      reviews.forEach(review => {
        const div = document.createElement("div");
        div.classList.add("div-review");
        document.body.appendChild(div);
        div.innerHTML = `
        <div class="content-review">        
        <h4>${review.title}</h4>
        <p>${review.description}</p>
        <div>${`&#11088;`.repeat(review.stars)}</div>
        </div>
        <a href="./meals/${review.meal_id}" class="review-meal"><button>Go to Meal</button></a>
        `;
      });
    });

}
export default renderReview;