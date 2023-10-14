import axios from "axios";

const BASE_URL = "https://api.spoonacular.com/recipes/";

const API_URLS = {
  getMealPlan: (calories) =>
    `${BASE_URL}findByNutrients?apiKey=4ac6ba08a94740a6b14d6784d424cec3&maxCalories=${
      calories / 2.5
    }&minCalories=${calories / 6}&minProtein=40&number=20`,
  getMealInfo: (id) =>
    `${BASE_URL}${id}/information?apiKey=4ac6ba08a94740a6b14d6784d424cec3`,
};

const calculateBestMealCombination = (
  mealsToCalculate,
  maxCalorieCountTillNow,
  requestedCalories
) => {
  const calorieSum = mealsToCalculate.reduce((acc, meal) => {
    acc += meal.calories;
    return acc;
  }, 0);

  if (
    (calorieSum > maxCalorieCountTillNow ||
      calorieSum >= requestedCalories - 100) &&
    calorieSum <= requestedCalories + 100
  ) {
    if (calorieSum > maxCalorieCountTillNow)
      maxCalorieCountTillNow = calorieSum;

    return { mealsToCalculate, maxCalorieCountTillNow };
  }

  return null;
};

const findMeals = (meals, requestedCalories, numOfMeals) => {
  let maxCalorieCountTillNow = 0;
  let bestMealPlan = [];

  for (let i = 0; i < meals.length - 2; i++) {
    for (let j = i + 1; j < meals.length - 1; j++) {
      if (numOfMeals > 2) {
        for (let k = j + 1; k < meals.length; k++) {
          if (numOfMeals > 3) {
            for (let l = k + 1; l < meals.length; l++) {
              if (numOfMeals > 4) {
                for (let m = l + 1; m < meals.length; m++) {
                  const mealPlanSuggestions = calculateBestMealCombination(
                    [meals[i], meals[j], meals[k], meals[l], meals[m]],
                    maxCalorieCountTillNow,
                    requestedCalories
                  );

                  if (mealPlanSuggestions) {
                    bestMealPlan = mealPlanSuggestions.mealsToCalculate;
                    maxCalorieCountTillNow =
                      mealPlanSuggestions.maxCalorieCountTillNow;
                  }
                }
              } else {
                const mealPlanSuggestions = calculateBestMealCombination(
                  [meals[i], meals[j], meals[k], meals[l]],
                  maxCalorieCountTillNow,
                  requestedCalories
                );

                if (mealPlanSuggestions) {
                  bestMealPlan = mealPlanSuggestions.mealsToCalculate;
                  maxCalorieCountTillNow =
                    mealPlanSuggestions.maxCalorieCountTillNow;
                }
              }
            }
          } else {
            const mealPlanSuggestions = calculateBestMealCombination(
              [meals[i], meals[j], meals[k]],
              maxCalorieCountTillNow,
              requestedCalories
            );

            if (mealPlanSuggestions) {
              bestMealPlan = mealPlanSuggestions.mealsToCalculate;
              maxCalorieCountTillNow =
                mealPlanSuggestions.maxCalorieCountTillNow;
            }
          }
        }
      } else {
        const mealPlanSuggestions = calculateBestMealCombination(
          [meals[i], meals[j]],
          maxCalorieCountTillNow,
          requestedCalories
        );

        if (mealPlanSuggestions) {
          bestMealPlan = mealPlanSuggestions.mealsToCalculate;
          maxCalorieCountTillNow = mealPlanSuggestions.maxCalorieCountTillNow;
        }
      }
    }
  }
  return bestMealPlan;
};

export const getMealPlan = async () => {
  try {
    const calories = sessionStorage.getItem("calories");
    const mealAmount = sessionStorage.getItem("mealAmount");

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

    // const mealInfo = {
    //   id: meal.id,
    //   title: meal.title,
    //   image: meal.image,
    //   calories: meal.nutrition.nutrients[0].amount,
    //   protein: meal.nutrition.nutrients[8].amount,
    //   carbs: meal.nutrition.nutrients[3].amount,
    //   fat: meal.nutrition.nutrients[1].amount,
    //   ingredients: meal.extendedIngredients.map((ingredient) => ({
    //     id: ingredient.id,
    //     name: ingredient.name,
    //     image: ingredient.image,
    //     amount: ingredient.amount,
    //     unit: ingredient.unit,
    //   })),
    //   instructions: meal.instructions,
    // };

    return meal;
  } catch (error) {
    console.error(error);
  }
};

export default API_URLS;
