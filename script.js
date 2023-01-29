const searchBtn = document.getElementById("search-btn")
const mealList = document.getElementById("meal")
const mealDetailsContent = document.querySelector(".meal-details-content")
const recipeCloseBtn = document.getElementById("recipe-close-btn")



const getMealList = () => {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        //if meal exist from the api call
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                <div class="meal-item" data-id="${meal.idMeal}">
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="foods">
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Get recipe</a>
                    </div>
                </div>`;
               
            }); 
            mealList.classList.remove("notFound")
        }else{
            html = "Sorry we do not have the meal!"
            mealList.classList.add("notFound")
        }
        //insert the meal from api call into the html template
        mealList.innerHTML = html
    })

}

const getMealRecipe = (e) => {
    e.preventDefault()
    if(e.target.classList.contains("recipe-btn")){
        let mealList = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealList.dataset.id}`)
        .then(response => response.json())
        .then(data => {
            mealRecipeModal(data.meals);
        })
    }
}

//create a modal window
const mealRecipeModal = (meal) => {
    console.log(meal);
    meal = meal[0]
    let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-intruct">
        <h3>Instrcutions:</h3>
        <p>${meal.strInstructions}</p>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="recipe food">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch video</a>
        </div>
    `;

    mealDetailsContent.innerHTML = html
    mealDetailsContent.parentElement.classList.add("showRecipe");
}

recipeCloseBtn.addEventListener("click", () => {
    mealDetailsContent.parentElement.classList.remove("showRecipe")
})
mealList.addEventListener("click", getMealRecipe);
searchBtn.addEventListener("click", getMealList);
