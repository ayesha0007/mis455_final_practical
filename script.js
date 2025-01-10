const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        searchMeals(query);
    }
});

async function searchMeals(query) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    displayResults(data.meals);
}

function displayResults(meals) {
    resultsContainer.innerHTML = ''; // Clear previous results
    if (!meals) {
        resultsContainer.innerHTML = '<p>No meals found.</p>';
        return;
    }

    const mealsToShow = meals.slice(0, 5);
    mealsToShow.forEach(meal => {
        const mealCard = document.createElement('div');
        mealCard.classList.add('meal-card');
        mealCard.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p><strong>ID:</strong> ${meal.idMeal}</p>
            <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
        `;
        resultsContainer.appendChild(mealCard);
    });

    if (meals.length > 5) {
        const showAllButton = document.createElement('button');
        showAllButton.innerText = 'SHOW ALL';
        showAllButton.addEventListener('click', () => displayAllResults(meals));
        resultsContainer.appendChild(showAllButton);
    }
}

function displayAllResults(meals) {
    resultsContainer.innerHTML = ''; // Clear previous results
    meals.forEach(meal => {
        const mealCard = document.createElement('div');
        mealCard.classList.add('meal-card');
        mealCard.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p><strong>ID:</strong> ${meal.idMeal}</p>
            <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
        `;
        resultsContainer.appendChild(mealCard);
    });
}