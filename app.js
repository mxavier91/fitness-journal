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
    meals: [],
    currentMeal: null,
    totalCalories: 0
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
    getMealInput: function() {
      return {
        name: document.querySelector(Selectors.mealNameInput).value,
        calories: document.querySelector(Selectors.mealCaloriesInput).value
      }
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
    }

    e.preventDefault()
  }


  return {
    init: function() {

      loadEventListeners()
    }
  }

})(UICtrl, ExerciseCtrl, MealCtrl);

AppCtrl.init()