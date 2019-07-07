// Meal Controller
const MealCtrl = (function() {
  const Meal = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories
  }

  const getMealsFromStorage = function() {
    let meals;

    if(localStorage.getItem('meals') === null) {
      meals = [];
    } else {
      meals = JSON.parse(localStorage.getItem('meals'))
    }

    return meals
  }

  const data = {
    meals: [],
    meals: getMealsFromStorage(),
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

    deleteItem: function(id) {
      ids = data.meals.map((meal) => {
        return meal.id;
      });

      const index = ids.indexOf(id);

      data.meals.splice(index, 1);
    },

    storeMealItem: function(meal) {
      let meals;

      if(localStorage.getItem('meals') === null) {
        meals = [];

        meals.push(meal)

        localStorage.setItem('meals', JSON.stringify(meals))

      } else {
        meals = JSON.parse(localStorage.getItem('meals'))

        meals.push(meal)

        localStorage.setItem('meals', JSON.stringify(meals))
      }
    },

    updateMealStorage: function(updatedItem) {
      let meals = JSON.parse(localStorage.getItem('meals'));

      meals.forEach(function(meal, index) {
        if(updatedItem.id === meal.id) {
          meals.splice(index, 1, updatedItem)
        }
      });
      localStorage.setItem('meals', JSON.stringify(meals))
    },

    deleteMealFromStorage: function(id) {
      let meals = JSON.parse(localStorage.getItem('meals'));

      meals.forEach(function(meal, index) {
        if (id === meal.id) {
          meals.splice(index, 1)
        }
      });
      localStorage.setItem('meals', JSON.stringify(meals));
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

  const getExercisesFromStorage = function() {
    let exercises;

    if(localStorage.getItem('exercises') === null) {
      exercises = [];
    } else {
      exercises = JSON.parse(localStorage.getItem('exercises'))
    }

    return exercises
  }

  const data = {
    exercises: getExercisesFromStorage(),
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

    deleteItem: function(id) {
      ids = data.exercises.map((exercise) => {
        return exercise.id;
      });

      const index = ids.indexOf(id);

      data.exercises.splice(index, 1);
    },

    storeExerciseItem: function(exercise) {
      let exercises;

      if(localStorage.getItem('exercises') === null) {
        exercises = [];

        exercises.push(exercise)

        localStorage.setItem('exercises', JSON.stringify(exercises))

      } else {
        exercises = JSON.parse(localStorage.getItem('exercises'))

        exercises.push(exercise)

        localStorage.setItem('exercises', JSON.stringify(exercises))
      }
    },

    updateExerciseStorage: function(updatedItem) {
      let exercises = JSON.parse(localStorage.getItem('exercises'));

      exercises.forEach(function(exercise, index) {
        if(updatedItem.id === exercise.id) {
          exercises.splice(index, 1, updatedItem)
        }
      });
      localStorage.setItem('exercises', JSON.stringify(exercises))
    },

    deleteExerciseFromStorage: function(id) {
      let exercises = JSON.parse(localStorage.getItem('exercises'));

      exercises.forEach(function(exercise, index) {
        if (id === exercise.id) {
          exercises.splice(index, 1)
        }
      });
      localStorage.setItem('exercises', JSON.stringify(exercises));
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

const UICtrl = (function(ExerciseCtrl, MealCtrl) {
  const Selectors = {
    mealItemsList: '#meal-item-list',
    exerciseItemsList: '#exercise-item-list',
    mealListItems: '#meal-item-list li',
    exerciseListItems: '#exercise-item-list li',
    addMealBtn: '.add-btn-meal',
    addExerciseBtn: '.add-btn-exercise',
    updateMealBtn: '.update-btn-meal',
    updateExerciseBtn: '.update-btn-exercise',
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
        html += `<li class="collection-item meal" id="meal-item-${item.id}">
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
        html += `<li class="collection-item exercise" id="exercise-item-${item.id}">
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
      UICtrl.showMealEditState()
    },

    addExerciseItemToForm: function() {
      document.querySelector(Selectors.exerciseNameInput).value = ExerciseCtrl.getCurrentItem().name;
      document.querySelector(Selectors.exerciseCaloriesInput).value = ExerciseCtrl.getCurrentItem().calories;
      UICtrl.showExerciseEditState()
    },

    deleteMealListItem: function(id) {
      const itemId = `#meal-item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
    },

    deleteExerciseListItem: function(id) {
      const itemId = `#exercise-item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
    },

    showAlert: function(message, className) {
      this.clearAlert()

      const div = document.createElement('div');

      div.className = className;

      div.appendChild(document.createTextNode(message));

      const container = document.querySelector('.post-container');

      const calories = document.querySelector('#calories')

      container.insertBefore(div, calories)

      setTimeout(() => {
        this.clearAlert()
      }, 3000)
    },

    clearAlert: function() {
      const currentAlert = document.querySelector('.card-panel');

      if(currentAlert) {
        currentAlert.remove()
      }
    },

    clearEditState: function() {
      UICtrl.clearInput();
      document.querySelector(Selectors.addMealBtn).style.display = 'inline';
      document.querySelector(Selectors.updateMealBtn).style.display = 'none';
      document.querySelector(Selectors.deleteMealBtn).style.display = 'none';
      document.querySelector(Selectors.backMealBtn).style.display = 'none';

      document.querySelector(Selectors.addExerciseBtn).style.display = 'inline';
      document.querySelector(Selectors.updateExerciseBtn).style.display = 'none';
      document.querySelector(Selectors.deleteExerciseBtn).style.display = 'none';
      document.querySelector(Selectors.backExerciseBtn).style.display = 'none';

    },

    showMealEditState: function() {
      document.querySelector(Selectors.addMealBtn).style.display = 'none';
      document.querySelector(Selectors.updateMealBtn).style.display = 'inline';
      document.querySelector(Selectors.deleteMealBtn).style.display = 'inline';
      document.querySelector(Selectors.backMealBtn).style.display = 'inline';
    },

    showExerciseEditState: function() {
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

const AppCtrl = (function(UICtrl, ExerciseCtrl, MealCtrl) {
  const Selectors = UICtrl.getSelectors()

  const loadEventListeners = function() {
    document.querySelector(Selectors.addMealBtn).addEventListener('click', addMealSubmit)
    document.querySelector(Selectors.addExerciseBtn).addEventListener('click', addExerciseSubmit)

    
    document.querySelector(Selectors.mealItemsList).addEventListener('click', mealEditClick)
    document.querySelector(Selectors.exerciseItemsList).addEventListener('click', exerciseEditClick)

    
    document.querySelector(Selectors.updateMealBtn).addEventListener('click', updateMealSubmit)
    document.querySelector(Selectors.updateExerciseBtn).addEventListener('click', updateExerciseSubmit)

    
    document.querySelector(Selectors.deleteMealBtn).addEventListener('click', deleteMealSubmit)
    document.querySelector(Selectors.deleteExerciseBtn).addEventListener('click', deleteExerciseSubmit)

    
    document.querySelector(Selectors.backMealBtn).addEventListener('click', UICtrl.clearEditState)
    document.querySelector(Selectors.backExerciseBtn).addEventListener('click', UICtrl.clearEditState)
  }

  const addMealSubmit = function(e) {
    const input = UICtrl.getMealInput()

    if(input.name !== '' && input.calories !== '') {
      const newMeal = MealCtrl.addMeal(input.name, input.calories)

      UICtrl.addListMeal(newMeal)

      UICtrl.showTotalCalories()

      UICtrl.clearInput()

      MealCtrl.storeMealItem(newMeal)
    } else {
      UICtrl.showAlert('Please fill in all fields', 'white-text card-panel center red')
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

      ExerciseCtrl.storeExerciseItem(newExercise)
    } else {
      UICtrl.showAlert('Please fill in on the fields', 'white-text card-panel center red')
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

    if(input.name === '' || input.calories === '') {
      UICtrl.showAlert('Please fill in all fields', 'white-text card-panel center red')
    } else {
      const updatedItem = MealCtrl.updateMealItem(input.name, input.calories)

    UICtrl.updateMealListItem(updatedItem)

    UICtrl.showTotalCalories()

    UICtrl.clearEditState()

    MealCtrl.updateMealStorage(updatedItem)
    }

    e.preventDefault()
  }

  const updateExerciseSubmit = function(e) {
    const input = UICtrl.getExerciseInput()
    
    if(input.name === '' || input.calories === '') {

      UICtrl.showAlert('Please fill in all fields', 'white-text card-panel center red')

    } else {

    const updatedItem = ExerciseCtrl.updatedExerciseItem(input.name, input.calories)

    UICtrl.updateExerciseListItem(updatedItem)

    UICtrl.showTotalCalories()

    UICtrl.clearEditState()

    ExerciseCtrl.updateExerciseStorage(updatedItem)
    }

    e.preventDefault()
  }

  const deleteMealSubmit = function(e) {
    const currMealItem = MealCtrl.getCurrentItem();

    MealCtrl.deleteItem(currMealItem.id);

    UICtrl.deleteMealListItem(currMealItem.id);

    UICtrl.showTotalCalories()

    MealCtrl.deleteMealFromStorage(currMealItem.id)

    UICtrl.clearEditState()

    e.preventDefault()
  }

  const deleteExerciseSubmit = function(e) {
    const currExerciseItem = ExerciseCtrl.getCurrentItem();

    ExerciseCtrl.deleteItem(currExerciseItem.id);

    UICtrl.deleteExerciseListItem(currExerciseItem.id);

    UICtrl.showTotalCalories();
    
    ExerciseCtrl.deleteExerciseFromStorage(currExerciseItem.id)

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

      UICtrl.showTotalCalories()

      loadEventListeners()
    }
  }

})(UICtrl, ExerciseCtrl, MealCtrl);

AppCtrl.init()

