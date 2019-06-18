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

      // console.log(data.meals.length)

      return newMealItem
    },

    updateMealItem: function(name, calories) {
      calories = parseInt(calories);

      let found = null

      data.meals.forEach((meal) => {
        if(meal.id === data.currentMeal.id) {
          meal.name = name;
          meal.calories = calories;
          found = meal;
        }
      })

      return found;
    },

    getItembyId: function(id) {
      let found = null;

      data.meals.forEach((meal) => {
        if(meal.id === id) {
          found = meal
        }
      })

      return found;
    },

    getTotalCalories: function() {
      let total = 0;

      data.meals.forEach((meal) => {
        total += meal.calories;
      });

      data.totalCalories = total

      return data.totalCalories;
    },

    setCurrentItem: function(item) {
      data.currentMeal = item;
    },

    getCurrentItem: function() {
      return data.currentMeal;
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

      // console.log(data.exercises.length)

      return newExerciseItem
    },

    updatedExerciseItem: function(name, calories) {
      calories = parseInt(calories);

      let found = null

      data.exercises.forEach(exercise => {
        if(exercise.id === data.currentExercise.id) {
          exercise.name = name;
          exercise.calories = calories;
          found = exercise;
        }
      })

      return found;
    },

    getItembyId: function(id) {
      let found = null;

      data.exercises.forEach(function(exercise) {
        if(exercise.id === id) {
          found = exercise
        }
      })

      return found
    },

    setCurrentItem: function(item) {
      data.currentExercise = item
    },

    getCurrentItem: function() {
      return data.currentExercise
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
    mealListItems: '#meal-item-list li',
    exerciseListItems: '#exercise-item-list li',
    addDateBtn: '.add-btn.date',
    addMealBtn: '.add-btn-meal',
    addExerciseBtn: '.add-btn-exercise',
    updateDateBtn: '.update-btn-date',
    updateMealBtn: '.update-btn-meal',
    updateExerciseBtn: '.update-btn-exercise',
    backDateBtn: '.back-btn-date',
    backMealBtn: '.back-btn-meal',
    backExerciseBtn: '.back-btn-exercise',
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
        html += `<li class="collection-item meal" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fas fa-pencil-alt"></i>
        </a>
      </li>`;

      document.querySelector(Selectors.mealItemsList).innerHTML = html
      })
    },

    populateExerciseItemsList: function(items) {
      let html = '';

      items.forEach((item) => {
        html += `<li class="collection-item exercise" id="item-${item.id}">
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
      document.querySelector(Selectors.mealItemsList).style.display = 'block';

      const li = document.createElement('li');

      li.className = 'collection-item';

      li.id = `meal-item-${item.id}`;

      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fas fa-pencil-alt"></i>
      </a>`

      document.querySelector(Selectors.mealItemsList).insertAdjacentElement('beforeend', li)
    },

    addListExercise: function(item) {
      document.querySelector(Selectors.exerciseItemsList).style.display = 'block';

      const li = document.createElement('li');

      li.className = 'collection-item';

      li.id = `exercise-item-${item.id}`;

      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fas fa-pencil-alt"></i>
      </a>`

      document.querySelector(Selectors.exerciseItemsList).insertAdjacentElement('beforeend', li)
    },

    updateMealListItem: function(updatedItem) {
      let listItems = document.querySelectorAll(Selectors.mealListItems);

      listItems = Array.from(listItems);

      listItems.forEach((listItem) => {
        const itemId = listItem.getAttribute('id');

        if(itemId === `meal-item-${updatedItem.id}`) {
          document.querySelector(`#${itemId}`).innerHTML = `<strong>${updatedItem.name}: </strong> <em>${updatedItem.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fas fa-pencil-alt"></i>
          </a>`;

          console.log(listItems)
          console.log(itemId)
        }
      })
    },

    updateExerciseListItem: function(updatedItem) {
      let listItems = document.querySelectorAll(Selectors.exerciseListItems);

      listItems = Array.from(listItems);

      listItems.forEach((listItem) => {
        const itemId = listItem.getAttribute('id');

        if(itemId === `exercise-item-${updatedItem.id}`) {
          document.querySelector(`#${itemId}`).innerHTML = `<strong>${updatedItem.name}: </strong> <em>${updatedItem.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fas fa-pencil-alt"></i>
          </a>`;

          console.log(listItems)
          console.log(itemId)
        }
      })
    },

    showTotalCalories: function() {

      const totalExerciseCalories = ExerciseCtrl.getTotalCalories();
      const totalMealCaloires = MealCtrl.getTotalCalories();

      document.querySelector(Selectors.totalCalories).textContent = totalMealCaloires - totalExerciseCalories;
    },

    hideList: function() {
      document.querySelector(Selectors.mealItemsList).style.display = 'none'
      document.querySelector(Selectors.exerciseItemsList).style.display = 'none'
    },

    clearInput: function() {
      document.querySelector(Selectors.mealNameInput).value = '';
      document.querySelector(Selectors.mealCaloriesInput).value = '';
      document.querySelector(Selectors.exerciseNameInput).value = '';
      document.querySelector(Selectors.exerciseCaloriesInput).value = '';
    },

    addMealItemToForm: function() {
      document.querySelector(Selectors.mealNameInput).value = MealCtrl.getCurrentItem().name;
      document.querySelector(Selectors.mealCaloriesInput).value = MealCtrl.getCurrentItem().calories;
      UICtrl.showEditState()
    },

    addExerciseItemToForm: function() {
      document.querySelector(Selectors.exerciseNameInput).value = ExerciseCtrl.getCurrentItem().name;
      document.querySelector(Selectors.exerciseCaloriesInput).value = ExerciseCtrl.getCurrentItem().calories;
      UICtrl.showEditState()
    },

    clearEditState: function() {
      UICtrl.clearInput();
      // Meal Buttons
      document.querySelector(Selectors.addMealBtn).style.display = 'inline';
      document.querySelector(Selectors.updateMealBtn).style.display = 'none';
      document.querySelector(Selectors.deleteMealBtn).style.display = 'none';
      document.querySelector(Selectors.backMealBtn).style.display = 'none';

      // Exercise Buttons
      document.querySelector(Selectors.addExerciseBtn).style.display = 'inline';
      document.querySelector(Selectors.updateExerciseBtn).style.display = 'none';
      document.querySelector(Selectors.deleteExerciseBtn).style.display = 'none';
      document.querySelector(Selectors.backExerciseBtn).style.display = 'none';

    },

    showEditState: function() {
      // Meal Buttons
      document.querySelector(Selectors.addMealBtn).style.display = 'none';
      document.querySelector(Selectors.updateMealBtn).style.display = 'inline';
      document.querySelector(Selectors.deleteMealBtn).style.display = 'inline';
      document.querySelector(Selectors.backMealBtn).style.display = 'inline';

      // Exercise Buttons
      document.querySelector(Selectors.addExerciseBtn).style.display = 'none';
      document.querySelector(Selectors.updateExerciseBtn).style.display = 'inline';
      document.querySelector(Selectors.deleteExerciseBtn).style.display = 'inline';
      document.querySelector(Selectors.backExerciseBtn).style.display = 'inline';
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
    // Add Meal/Exercise Event
    document.querySelector(Selectors.addMealBtn).addEventListener('click', addMealSubmit)
    document.querySelector(Selectors.addExerciseBtn).addEventListener('click', addExerciseSubmit)

    // Icon Click Event
    document.querySelector(Selectors.mealItemsList).addEventListener('click', mealEditClick)
    document.querySelector(Selectors.exerciseItemsList).addEventListener('click', exerciseEditClick)

    // Update Meal/Exercise Event
    document.querySelector(Selectors.updateMealBtn).addEventListener('click', updateMealSubmit)
    document.querySelector(Selectors.updateExerciseBtn).addEventListener('click', updateExerciseSubmit)
  }

  const addMealSubmit = function(e) {
    const input = UICtrl.getMealInput()

    if(input.name !== '' && input.calories !== '') {
      const newMeal = MealCtrl.addMeal(input.name, input.calories)

      UICtrl.addListMeal(newMeal)

      UICtrl.showTotalCalories()

      UICtrl.clearInput()
    }

    e.preventDefault()
  }

  const addExerciseSubmit = function(e) {
    const input = UICtrl.getExerciseInput()

    if(input.name !== '' && input.calories !== '') {
      const newExercise = ExerciseCtrl.addExercise(input.name, input.calories)

      UICtrl.addListExercise(newExercise)

      UICtrl.showTotalCalories()

      UICtrl.clearInput()
    }

    e.preventDefault()
  }

  const mealEditClick = function(e) {
    if(e.target.classList.contains('edit-item')) {
      const listid = e.target.parentNode.parentNode.id;

      const listidArr = listid.split('-')

      const id = parseInt(listidArr[2])

      const itemToEdit = MealCtrl.getItembyId(id)

      MealCtrl.setCurrentItem(itemToEdit)

      UICtrl.addMealItemToForm();
    }
    e.preventDefault()
  }

  const exerciseEditClick = function(e) {
    if(e.target.classList.contains('edit-item')) {
      const listid = e.target.parentNode.parentNode.id;

      const listidArr = listid.split('-')

      const id = parseInt(listidArr[2])

      const itemToEdit = ExerciseCtrl.getItembyId(id)

      ExerciseCtrl.setCurrentItem(itemToEdit)

      UICtrl.addExerciseItemToForm();
    }
    e.preventDefault()
  }

  const updateMealSubmit = function(e) {
    const input = UICtrl.getMealInput()

    const updatedItem = MealCtrl.updateMealItem(input.name, input.calories)

    UICtrl.updateMealListItem(updatedItem)

    UICtrl.showTotalCalories()

    UICtrl.clearEditState()

    e.preventDefault()
  }

  const updateExerciseSubmit = function(e) {
    const input = UICtrl.getExerciseInput()

    const updatedItem = ExerciseCtrl.updatedExerciseItem(input.name, input.calories)

    UICtrl.updateExerciseListItem(updatedItem)

    UICtrl.showTotalCalories()

    UICtrl.clearEditState()

    e.preventDefault()
  }


  return {
    init: function() {
      UICtrl.clearEditState();

      const meals = MealCtrl.getMeals()
      const exercise = ExerciseCtrl.getExercises()

      UICtrl.populateMealItemsList(meals);
      UICtrl.populateExerciseItemsList(exercise);

      loadEventListeners()
    }
  }

})(UICtrl, ExerciseCtrl, MealCtrl);

AppCtrl.init()