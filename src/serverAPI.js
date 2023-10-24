import axios from "axios";

// API URLs
const BASE_URL = "https://api.spoonacular.com/recipes/";

const API_URLS = {
  getMealPlan: (calories) =>
    `${BASE_URL}findByNutrients?apiKey=4ac6ba08a94740a6b14d6784d424cec3&maxCalories=${
      calories / 2.5
    }&minCalories=${calories / 6}&minProtein=40&number=100`,

  getMealInfo: (id) =>
    `${BASE_URL}${id}/information?apiKey=4ac6ba08a94740a6b14d6784d424cec3`,

  getSubtituteMeal: (calories) =>
    `${BASE_URL}findByNutrients?apiKey=4ac6ba08a94740a6b14d6784d424cec3&maxCalories=${
      calories + 50
    }&minCalories=${calories - 50}&minProtein=40&number=100`,
};

// Functions & Algorithms
const findMeals = (meals, requestedCalories, numOfMeals) => {
  const generateCombinations = (start, combination, combinations) => {
    if (combination.length === numOfMeals) {
      combinations.push(combination);
      return;
    }

    for (let i = start; i < meals.length; i++) {
      generateCombinations(i + 1, [...combination, meals[i]], combinations);
    }

    return combinations;
  };

  const combinations2 = generateCombinations(0, [], []);

  let maxCalorieCountTillNow = 0;
  let bestMealPlan = [];

  combinations2.forEach((mealPlan) => {
    const calorieSum = mealPlan.reduce((acc, meal) => acc + meal.calories, 0);

    if (
      (calorieSum > maxCalorieCountTillNow ||
        calorieSum >= requestedCalories - 100) &&
      calorieSum <= requestedCalories + 100
    ) {
      if (calorieSum > maxCalorieCountTillNow) {
        maxCalorieCountTillNow = calorieSum;
        bestMealPlan = mealPlan;
      }
    }
  });

  return bestMealPlan;
};

// const findMeals = (meals, requestedCalories, numOfMeals) => {
//   const memo = {};

//   const generateCombinations = (start, combination) => {
//     const key = `${start}-${combination.join(",")}`;

//     if (key in memo) {
//       return memo[key];
//     }

//     if (combination.length === numOfMeals) {
//       memo[key] = combination;
//       return combination;
//     }

//     for (let i = start; i < meals.length; i++) {
//       const result = generateCombinations(i + 1, [...combination, meals[i]]);

//       if (result) {
//         memo[key] = result;
//         return result;
//       }
//     }

//     memo[key] = null;
//     return null;
//   };

//   generateCombinations(0, []);

//   let maxCalorieCountTillNow = 0;
//   let bestMealPlan = [];

//   Object.values(memo).forEach((mealPlan) => {
//     const calorieSum = mealPlan.reduce((acc, meal) => acc + meal.calories, 0);

//     if (
//       (calorieSum > maxCalorieCountTillNow ||
//         calorieSum >= requestedCalories - 100) &&
//       calorieSum <= requestedCalories + 100
//     ) {
//       if (calorieSum > maxCalorieCountTillNow) {
//         maxCalorieCountTillNow = calorieSum;
//         bestMealPlan = mealPlan;
//       }
//     }
//   });

//   return bestMealPlan;
// };

// API Calls
export const getMealPlan = async () => {
  try {
    const calories = parseInt(sessionStorage.getItem("calories") ?? "1500");
    const mealAmount = parseInt(sessionStorage.getItem("mealAmount") ?? "2");

    const response = await axios.get(API_URLS.getMealPlan(calories));
    const meals = response.data;

    const mealsArr = meals.map((meal) => ({
      id: meal.id,
      title: meal.title,
      image: meal.image,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
    }));
    return findMeals(mealsArr, calories, mealAmount);
  } catch (error) {
    console.error(error);
  }
};

export const getMealInfo = async (id) => {
  try {
    const response = await axios.get(API_URLS.getMealInfo(id));
    const meal = response.data;

    const mealInfo = {
      id: meal.id,
      ingredients: meal.extendedIngredients.map((ingredient) => ({
        id: ingredient.id,
        name: ingredient.name,
        image: ingredient.image,
        amount: ingredient.amount,
        unit: ingredient.unit,
      })),
      instructions: meal.instructions,
    };

    return mealInfo;
  } catch (error) {
    console.error(error);
  }
};

export const getSubtituteMeal = async (mealCalories, mealsIdsToExclude) => {
  try {
    const response = await axios.get(API_URLS.getSubtituteMeal(mealCalories));
    const meal = response.data.find(
      (meal) => !mealsIdsToExclude.includes(meal.id)
    );

    const newMeal = {
      id: meal.id,
      title: meal.title,
      image: meal.image,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
    };

    return newMeal;
  } catch (error) {
    console.error(error);
  }
};

export default API_URLS;
