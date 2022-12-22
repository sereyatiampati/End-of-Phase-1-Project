window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
  });

const resultsDiv = document.querySelector('.food-result')
const searchButton = document.getElementById('search-btn')

//event listeners
searchButton.addEventListener("click", (e)=> {
  e.preventDefault();
  showFoodResult()
})

//show results that match the (search) input from user
function showFoodResult(){
  let searchQuery = document.getElementById('search-input').value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)
  .then(response => response.json())
  .then(results => {
    console.log(results)
    let template="";
    if (results.meals){
      console.log(results.meals)
      results.meals.forEach(foodItem=> {
        //food items to be appended to the result section if the search query match 
        template+=`
        <div class="food-item" data-id="${foodItem.idMeal}">
          <img src="${foodItem.strMealThumb}" alt="">
          <div class="food-details">
            <h4 class = "food-origin">${foodItem.strArea} Food</h4>
            <h3 class="food-name">${foodItem.strMeal}</h3>
            <h4 class = "ingredient-category">${foodItem.strCategory}</h4>
            <div class = "recipe-instructions">
              <h3>Instructions:</h3>
              <p>${foodItem.strInstructions}</p>
            </div>
          </div>
        </div>
        `;
      });

       resultsDiv.classList.remove('noResult')

    } 
     else {
      template = "Sorry, No Results, try another ingredient!"
      resultsDiv.classList.add('noResult')

    }
    resultsDiv.innerHTML=template;
  })
}
