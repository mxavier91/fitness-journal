// Storage Controller
const StorageCtrl = (function() {

})();

// Meal Controller
const MealCtrl = (function() {
  const Meal = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories
  }

  const data = {
    meals: [
      {id: 0, name: 'Steak Dinner', calories: 1200},
      {id: 1, name: 'Cookie', calories: 400},
      {id: 2, name: 'Eggs', calories: 300}
    ],
    currentMeal: null,
    totalCalories: 0
  }

  return {
    getMeals: function() {
      return data.meals
    },

    addMeal: function(name, calories) {
      let ID 

      if(data.meals.length > 0) {
        ID = data.meals[data.meals.length -1].id + 1;
      } else {
        ID = 0;
      }

      calories = parseInt(calories)

      newItem = new Meal(ID, name, calories)

      data.meals.push(newItem)

      return newItem
    }
  }

})();

const ExerciseCtrl = (function() {
  const Exercise = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

})();

// UI Controller
const UICtrl = (function() {
  const Selectors = {
    itemsList: '#item-list',
    listItems: '#item-list li',
    addDateBtn: '.add-btn.date',
    addMealBtn: '.add-btn-meal',
    addExerciseBtn: '.add-btn-exercise',
    updateDateBtn: '.update-btn-date',
    updateMealBtn: '.update-btn-meal',
    updateExerciseBtn: '.update-btn-exercise',
    backDateBtn: '.back-btn-date',
    backMealBtn: '.back-btn-meal',
    backExercise: '.back-btn-exercise',
    deleteMealBtn: '.delete-btn-meal',
    deleteExerciseBtn: '.delete-btn-exercise',
    mealNameInput: '#meal-name',
    mealCaloriesInput: '#meal-calories',
    exerciseNameInput: '#exercise-name',
    exerciseCaloriesInput: '#exercise-calories',
    fitnessDateInput: '#fitness-date'
  }

  return {
    populateItemsList: function(items) {
      let html = '';

      items.forEach((item) => {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fas fa-pencil-alt"></i>
        </a>
      </li>`;

      document.querySelector(Selectors.itemsList).innerHTML = html
      })
    },

    getMealInput: function() {
      return {
        name: document.querySelector(Selectors.mealNameInput).value,
        calories: document.querySelector(Selectors.mealCaloriesInput).value
      }
    },

    addListItem: function(item) {
      document.querySelector(Selectors.itemsList).getElementsByClassName.display = 'block';

      const li = document.createElement('li');

      li.className = 'collection-item';

      li.id = `item-${item.id}`;

      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fas fa-pencil-alt"></i>
      </a>`

      document.querySelector(Selectors.itemsList).insertAdjacentElement('beforeend', li)
    }
  }

})();

// App Controller
const AppCtrl = (function(UICtrl, ExerciseCtrl, MealCtrl) {
  const loadEventListeners = function() {
    document.querySelector('.add-btn-meal').addEventListener('click', addMealSubmit)
  }

  const addMealSubmit = function(e) {
    const input = UICtrl.getMealInput()

    if(input.name !== '' && input.calories !== '') {
      const newMeal = MealCtrl.addMeal(input.name, input.calories)

      console.log(newMeal)

      UICtrl.addListItem(newMeal)

    }

    e.preventDefault()
  }


  return {
    init: function() {

      items = MealCtrl.getMeals()

      UICtrl.populateItemsList(items)

      loadEventListeners()
    }
  }

})(UICtrl, ExerciseCtrl, MealCtrl);

AppCtrl.init()