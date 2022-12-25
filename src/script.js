window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    showFoodResult()
  });

const resultsDiv = document.querySelector('.food-result')
const searchButton = document.getElementById('search-btn')

//event listeners
searchButton.addEventListener("click", (e)=> {
  e.preventDefault();
  showFoodResult()
})

//show results that match the (search-query) input from user
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
        //food items to be appended to the result section if the search query match any meals 
        template+=`
        <div class="food-item" data-id="${foodItem.idMeal}">
          <img src="${foodItem.strMealThumb}" alt="${foodItem.strMeal} Recipe">
          <div class="food-details">
            <h3 class="food-name">${foodItem.strMeal}</h3>
            <h4 class = "food-origin">${foodItem.strArea}</h4>
            <div class="ingredients">
              <h3>Ingredients</h3>
              <ul class= "ingredient-list">
              <li>${foodItem.strMeasure1} ${foodItem.strIngredient1}</li>
              <li>${foodItem.strMeasure2} ${foodItem.strIngredient2}</li>
              <li>${foodItem.strMeasure3} ${foodItem.strIngredient3}</li>
              <li>${foodItem.strMeasure4} ${foodItem.strIngredient4}</li>
              <li>${foodItem.strMeasure5} ${foodItem.strIngredient5}</li>
              <li>${foodItem.strMeasure6} ${foodItem.strIngredient6}</li>
              <li>${foodItem.strMeasure7} ${foodItem.strIngredient7}</li>
              <li>${foodItem.strMeasure8} ${foodItem.strIngredient8}</li>
              <li>${foodItem.strMeasure9} ${foodItem.strIngredient9}</li>
              <li>${foodItem.strMeasure10} ${foodItem.strIngredient10}</li>
              <li>${foodItem.strMeasure11} ${foodItem.strIngredient11}</li>
              <li>${foodItem.strMeasure12} ${foodItem.strIngredient12}</li>
              <li>${foodItem.strMeasure13} ${foodItem.strIngredient13}</li>
              <li>${foodItem.strMeasure14} ${foodItem.strMeasure14} ${foodItem.strIngredient14}</li>
              <li>${foodItem.strMeasure15} ${foodItem.strIngredient15}</li>
              <li>${foodItem.strMeasure16} ${foodItem.strIngredient16}</li>
              </ul>
            </div>
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
