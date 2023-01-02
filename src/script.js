//DOMContentloaded event listener
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    //showFoodResult()
  });

//Initial References
const resultsDiv = document.querySelector('.food-result')
const searchButton = document.getElementById('search-btn')
const submitComment = document.querySelector('#submit-btn')
const textArea = document.querySelector('#textAreaExample')
//Event listener
searchButton.addEventListener("click", (e)=> {
  e.preventDefault();
  showFoodResult()
})
//Event handlers
function showFoodResult(){
  let searchQuery = document.getElementById('search-input').value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)
  .then(response => response.json())
  .then(results => {
    let template = "";
    if (results.meals){
      results.meals.forEach( foodItem => {
        let list = showIngredientList(foodItem)
        console.log(list)
        //food items to be appended to the result section if the search query match any meals 
        template += `
        <div class="food-item" data-id="${foodItem.idMeal}">
          <img src="${foodItem.strMealThumb}" alt="${foodItem.strMeal} Recipe">
          <div class="food-details">
            <h2 class="food-name">${foodItem.strMeal}</h2>
            <h4 class = "food-origin">${foodItem.strArea}</h4>
            <h3>Ingredients</h3>
            <div class="ingredients">
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
            </ul>
            </div>
            <div class = "recipe-instructions">
              <h3>Instructions:</h3>
              <pre>${foodItem.strInstructions}</pre>
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
    resultsDiv.innerHTML = template; 
  })
}

//Display ingredient list
function showIngredientList(foodItem){
  let count=1;
    let ingredients=[];
    for (let i in foodItem){
      let ingredient="";
      let measure="";
      if (i.startsWith("strIngredient") && foodItem[i]){
        ingredient=foodItem[i];
        measure= foodItem[`strMeasure`+ count];
        count += 1;
        ingredients.push(`${measure} ${ingredient}`); 
      }
    }       
        let ingredientList= document.createElement("ul")
        ingredientList.className="ingredient-list"
        ingredients.forEach((i) => {
          let eachingredient= document.createElement("li");
          eachingredient.innerText=i;
          ingredientList.appendChild(eachingredient);
        })
       return ingredientList
}

//Comment submission Event listener
submitComment.addEventListener('click', handleCommentSubmission)

//Event handler
function handleCommentSubmission(e) {
  e.preventDefault()
  let commentObj= {
    comment:textArea.value
  }
  commentSubmission(commentObj)
}

//Comment submission
function commentSubmission() {
  fetch('http://localhost:3000/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentObj)
  })
  .then(res => res.json())
  .then(comment => console.log(comment))
 }
