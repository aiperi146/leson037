/*Ответ используемой API-команды должен список объектов, каждый из которых содержит какой-либо текст (например заголовок) и ссылку на картинку, а также какие-то дополнительные данные (например описание). Для выполнения дополнительного задания также потребуется, чтобы команда поддерживала поиск.

Можно использовать любые API, соответствующие этим требованиям, например одно из этих:

https://dummyjson.com/products/search?q=bag
https://www.themealdb.com/api/json/v1/1/search.php?s=salad
https://www.theaudiodb.com/api/v1/json/2/searchalbum.php?a=light (ограничение не более 2 запросов в секунду)
Результат нужно закоммитить в гит (желательно каждый пункт отдельным коммитом) и выгрузить на Github Pages (ссылку на репозиторий и github pages указать в решении домашки).

1. Сделайте страницу, состоящую из двух колонок: в одной будет отображаться список элементов, в другой - подробная информация. Пример того, как это может быть расположено на странице:*/

document.addEventListener('DOMContentLoaded', () => {
    const mealList = document.getElementById('mealList');
    const mealDetail = document.getElementById('mealDetail');

    async function fetchMealList() {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
            const data = await response.json();
            const meals = data.meals;

          
            meals.forEach(meal => {
                const li = document.createElement('li');
                li.textContent = meal.strMeal;
                li.addEventListener('click', () => displayMealDetails(meal.idMeal));
                mealList.appendChild(li);
            });
        } catch (error) {
            console.error('Ошибка загрузки списка блюд:', error);
        }
    }

    async function displayMealDetails(mealId) {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
            const data = await response.json();
            const meal = data.meals[0];

        
            const html = `
                <h3>${meal.strMeal}</h3>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <p>${meal.strInstructions}</p>
            `;
            mealDetail.innerHTML = html;
        } catch (error) {
            console.error('Ошибка загрузки подробной информации о блюде:', error);
        }
    }

    
    fetchMealList();
});
