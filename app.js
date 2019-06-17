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
      // {id: 0, name: 'Steak Dinner', calories: 1200},
      // {id: 1, name: 'Cookie', calories: 400},
      // {id: 2, name: 'Eggs', calories: 300}
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

      newMealItem = new Meal(ID, name, calories)

      data.meals.push(newMealItem)

      return newMealItem
    },

    getTotalCalories: function() {
      let total = 0;

      data.meals.forEach((meal) => {
        total += meal.calories;
      });

      data.totalCalories = total

      return data.totalCalories;
    }
  }

})();

const ExerciseCtrl = (function() {
  const Exercise = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  const data = {
    exercises: [
      // {id: 0, name: 'Running', calories: 200},
      // {id: 1, name: 'Deadlifts', calories: 400},
      // {id: 2, name: 'Boxing', calories: 500}
    ],
    currentExercise: null,
    totalCalories: 0
  }

  return {
    getExercises: function() {
      return data.exercises
    },

    addExercise: function(name, calories) {
      let ID

      if(data.exercises.length > 0) {
        ID = data.exercises[data.exercises.length - 1].id + 1;
      } else {
        ID = 0;
      }

      calories = parseInt(calories)

      newExerciseItem = new Exercise(ID, name, calories)

      data.exercises.push(newExerciseItem)

      return newExerciseItem
    },

    getTotalCalories: function() {
      let total = 0;

      data.exercises.forEach((exercise) => {
        total += exercise.calories;
      });

      data.totalCalories = total

      return data.totalCalories;
    }
  }

})();

// UI Controller
const UICtrl = (function(ExerciseCtrl, MealCtrl) {
  const Selectors = {
    mealItemsList: '#meal-item-list',
    exerciseItemsList: '#exercise-item-list',
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
    fitnessDateInput: '#fitness-date',
    totalCalories: '.total-calories'
  }

  return {
    populateMealItemsList: function(items) {
      let html = '';

      items.forEach((item) => {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fas fa-pencil-alt"></i>
        </a>
      </li>`;

      document.querySelector(Selectors.mealItemsList).innerHTML = html
      document.querySelector(Selectors.exerciseItemsList).innerHTML = html
      })
    },

    populateExerciseItemsList: function(items) {
      let html = '';

      items.forEach((item) => {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fas fa-pencil-alt"></i>
        </a>
      </li>`;

      document.querySelector(Selectors.exerciseItemsList).innerHTML = html
      })
    },

    getMealInput: function() {
      return {
        name: document.querySelector(Selectors.mealNameInput).value,
        calories: document.querySelector(Selectors.mealCaloriesInput).value
      }
    },

    getExerciseInput: function() {
      return{
        name: document.querySelector(Selectors.exerciseNameInput).value,
        calories: document.querySelector(Selectors.exerciseCaloriesInput).value
      }
    },

    addListMeal: function(item) {
      document.querySelector(Selectors.mealItemsList).getElementsByClassName.display = 'block';

      const li = document.createElement('li');

      li.className = 'collection-item';

      li.id = `item-${item.id}`;

      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fas fa-pencil-alt"></i>
      </a>`

      document.querySelector(Selectors.mealItemsList).insertAdjacentElement('beforeend', li)
    },

    addListExercise: function(item) {
      document.querySelector(Selectors.exerciseItemsList).getElementsByClassName.display = 'block';

      const li = document.createElement('li');

      li.className = 'collection-item';

      li.id = `item-${item.id}`;

      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fas fa-pencil-alt"></i>
      </a>`

      document.querySelector(Selectors.exerciseItemsList).insertAdjacentElement('beforeend', li)
    },

    showTotalCalories: function(totalCal) {

      const totalExerciseCalories = ExerciseCtrl.getTotalCalories();
      const totalMealCaloires = MealCtrl.getTotalCalories();

      document.querySelector(Selectors.totalCalories).textContent = totalMealCaloires - totalExerciseCalories;
    },

    getSelectors: function() {
      return Selectors;
    }
  }

})(ExerciseCtrl, MealCtrl);

// App Controller
const AppCtrl = (function(UICtrl, ExerciseCtrl, MealCtrl) {
  const Selectors = UICtrl.getSelectors()

  const loadEventListeners = function() {
    document.querySelector('.add-btn-meal').addEventListener('click', addMealSubmit)
    document.querySelector('.add-btn-exercise').addEventListener('click', addExerciseSubmit)
  }

  const addMealSubmit = function(e) {
    const input = UICtrl.getMealInput()

    if(input.name !== '' && input.calories !== '') {
      const newMeal = MealCtrl.addMeal(input.name, input.calories)

      UICtrl.addListMeal(newMeal)

      const totalCalories = MealCtrl.getTotalCalories();

      UICtrl.showTotalCalories(totalCalories)

    }

    e.preventDefault()
  }

  const addExerciseSubmit = function(e) {
    const input = UICtrl.getExerciseInput()

    if(input.name !== '' && input.calories !== '') {
      const newExercise = ExerciseCtrl.addExercise(input.name, input.calories)

      UICtrl.addListExercise(newExercise)

      const totalCalories = ExerciseCtrl.getTotalCalories()

      UICtrl.showTotalCalories(totalCalories)


    }
  }


  return {
    init: function() {

      meals = MealCtrl.getMeals()
      exercise = ExerciseCtrl.getExercises()

      UICtrl.populateMealItemsList(meals)
      UICtrl.populateExerciseItemsList(exercise)

      loadEventListeners()
    }
  }

})(UICtrl, ExerciseCtrl, MealCtrl);

AppCtrl.init()