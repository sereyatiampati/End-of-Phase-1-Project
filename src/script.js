window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
  });

const container = document.querySelector('.container')
const resultsDiv = document.querySelector('.food-result')
const form = document.querySelector('form')
const searchButton = document.getElementById('search-btn')


//event listeners
searchButton.addEventListener("click", (e)=> {
  e.preventDefault();
  showFoodResult()
})

//show results that match the input from user
function showFoodResult(){
  let searchQuery = document.getElementById('search-input').value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQuery}`)
  .then(response => response.json())
  .then(results => {
    console.log(results)
    let template="";
    if (results.meals){
      console.log(results.meals)
      results.meals.forEach(foodItem=> {
        let category= searchQuery[0].toUpperCase()+searchQuery.substring(1)
        
        template+=`
        <div class="food-item" data-id="${foodItem.idMeal}">
          <img src="${foodItem.strMealThumb}" alt="">
          <div class="food-details">
            <h3 class="food-name">${foodItem.strMeal}</h3>
            <h4 class = "ingredient-category">${category}</h4>
            <div class = "recipe-instructions">
              <h3>Instructions:</h3>
              <p>Heat oven to 160C/fan 140C/gas 3. Heat some dripping or butter in a large shallow casserole dish, brown the lamb in batches, lift to a plate, then repeat with the kidneys.Fry the onions and carrots in the pan with a little more dripping until golden."</p>
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
