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

// 2. Загрузите при помощи fetch данные из API и получите их в виде JSON

fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=salad')
    .then(response => {
        if (!response.ok) {
            throw new Error('Сетевой ответ не был успешным');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log('Возникла проблема с вашим запросом fetch' , error);
       
    });
  //3.   Выведите в одну из колонок на странице три блока, в каждом из которых должна отображаться картинка и текст, соответствующие данным для трёх первых элементов массива из ответа JSON. Оформление блоков - на ваше усмотрение.
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=salad')
    .then(response => {
        if (!response.ok) {
            throw new Error('Сетевой ответ не был успешным');
        }
        return response.json();
    })
    .then(data => {
        const blocksContainer = document.getElementById('blocks');
        const detailsContainer = document.getElementById('details');
        
        
        for (let i = 0; i < 3; i++) {
            const block = document.createElement('div');
            block.classList.add('block');
            const meal = data.meals[i];
            block.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <p>${meal.strMeal}</p>
            `;
           
            block.addEventListener('click', () => {
                detailsContainer.innerHTML = `
                    <h2>${meal.strMeal}</h2>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <p>${meal.strInstructions}</p>
                `;
            });
            blocksContainer.appendChild(block);
        }
    })
    .catch(error => {
        console.log('Возникла проблема с вашим запросом fetch', error);
    });
// 4. При клику на каждый из блоков вторая колонка должна отображать расширенную информацию о соответствующем элементе (например, крупную картинку, заголовок и описание). При клике на другой элемент вместо уже отображённой информации должна отобразиться новая. 

fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=salad')
    .then(response => {
        if (!response.ok) {
            throw new Error('Сетевой ответ не был успешным');
        }
        return response.json();
    })
    .then(data => {
        const blocksContainer = document.getElementById('blocks');
        const detailsContainer = document.getElementById('details');
        
        
        for (let i = 0; i < 3; i++) {
            const block = document.createElement('div');
            block.classList.add('block');
            const meal = data.meals[i];
            block.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <p>${meal.strMeal}</p>
            `;
            
            block.addEventListener('click', () => {
               
                detailsContainer.innerHTML = '';
               
                const details = document.createElement('div');
                details.innerHTML = `
                    <h2>${meal.strMeal}</h2>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <p>${meal.strInstructions}</p>
                `;
                
                detailsContainer.appendChild(details);
            });
            blocksContainer.appendChild(block);
        }
    })
    .catch(error => {
        console.log('Возникла проблема с вашим запросом fetch', error);
    });
//5. Добавьте на страницу кнопку, по нажатию на которую в колонку с блоками добавляется ещё один аналогичный блок (для 4-го элемента из JSON-ответа, затем для 5-го и т.д.). Если в ответе кончились элементы, кнопка должна перестать нажиматься. Для новых добавленных блоков должно так же работать клик, отображающий в другой колонке подробную информацию о них. 

const blocksContainer1 = document.getElementById('blocks');
const detailsContainer1 = document.getElementById('details');
const addBlockBtn = document.getElementById('addBlockBtn');

let currentBlockIndex1 = 0;
let mealsData1 = [];


function addBlock(meal) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>${meal.strMeal}</p>
    `;
    block.addEventListener('click', () => {
        detailsContainer.innerHTML = '';
        const details = document.createElement('div');
        details.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p>${meal.strInstructions}</p>
        `;
        detailsContainer.appendChild(details);
    });
    blocksContainer.appendChild(block);
}

function loadAndCreateBlocks() {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=salad')
        .then(response => {
            if (!response.ok) {
                throw new Error('Сетевой ответ не был успешным');
            }
            return response.json();
        })
        .then(data => {
            mealsData = data.meals;
            
            for (let i = 0; i < 3; i++) {
                addBlock(mealsData[i]);
            }
        })
        .catch(error => {
            console.log('Возникла проблема с вашим запросом fetch', error);
        });
}


loadAndCreateBlocks();


addBlockBtn.addEventListener('click', () => {
    currentBlockIndex++;
    if (currentBlockIndex < mealsData.length) {
        addBlock(mealsData[currentBlockIndex]);
    } else {
        addBlockBtn.disabled = true;
    }
});
/*Задание на дополнительные 30 баллов:
Добавьте на страницу инпут, при изменении значения в котором производится поиск в соответствии с новым введённым значением (например, если пользователь ввёл "table", вместо https://dummyjson.com/products/search?q=bag должно запроситься https://dummyjson.com/products/search?q=table).

Текущее значение в инпуте должно соответствовать текущему запросу (т.е. в нашем примере он изначально не пустой, а содержит слово "bag").

После перезапроса новых данных список блоков на странице должен очищаться и должны отрисовываться три новых элемента (так же открывающих по клику дополнительную информацию), а кнопка должна так же дорисовывать новые элементы (4, 5 и т.д. из нового ответа) */

const blocksContainer = document.getElementById('blocks');
const detailsContainer = document.getElementById('details');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

let currentBlockIndex = 0;
let mealsData = [];


function addBlock(meal) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>${meal.strMeal}</p>
    `;
    block.addEventListener('click', () => {
        detailsContainer.innerHTML = '';
        const details = document.createElement('div');
        details.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p>${meal.strInstructions}</p>
        `;
        detailsContainer.appendChild(details);
    });
    blocksContainer.appendChild(block);
}


function loadAndCreateBlocks(searchQuery) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Сетевой ответ не был успешным');
            }
            return response.json();
        })
        .then(data => {
            mealsData = data.meals;
            
            blocksContainer.innerHTML = '';
          
            for (let i = 0; i < 3; i++) {
                addBlock(mealsData[i]);
            }
         
            currentBlockIndex = 0;
           
            addBlockBtn.disabled = false;
        })
        .catch(error => {
            console.error('Возникла проблема с вашим запросом fetch', error);
        });
}


loadAndCreateBlocks('salad');


searchBtn.addEventListener('click', () => {
    const searchQuery = searchInput.value.trim();
    if (searchQuery !== '') {
        loadAndCreateBlocks(searchQuery);
    }
});


addBlockBtn.addEventListener('click', () => {
    currentBlockIndex++;
    if (currentBlockIndex < mealsData.length) {
        addBlock(mealsData[currentBlockIndex]);
    } else {
        addBlockBtn.disabled = true;
    }
});
