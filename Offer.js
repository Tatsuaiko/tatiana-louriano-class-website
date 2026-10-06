// AI-assisted code (from Exercise Six): recipes, ingredient picking, and cooking
const recipes = [
  {
    name: "Forest Hearty Apple Stew",
    image: "Forest Hearty Apple Stew.png",
    ingredients: ["Apple", "Carrot", "Potato", "Mushroom", "Salt"]
  },
  {
    name: "Memory Orchard Pie",
    image: "Memory Orchard Pie.png",
    ingredients: ["Apple", "Sugar Cane", "Wheat", "Egg"]
  },
  {
    name: "Frostleaf Noodles",
    image: "Cold Noodles.png",
    ingredients: ["Wheat", "Ice", "Cucumber", "Celery", "Longing Broth"]
  },
  {
    name: "Ember Curry",
    image: "Ember Curry.png",
    ingredients: ["Ember Rock", "Meat", "Potato", "Carrot", "Pepper"]
  },
  {
    name: "Spicy Amber Dumplings",
    image: "Spicy Dumplings.png",
    ingredients: ["Wheat", "Meat", "Pepper", "Ember Rock"]
  }
];

let currentRecipe = -1;
let selected = [];

const orderName = document.getElementById("order-name");
const orderList = document.getElementById("order-list");
const orderImage = document.getElementById("order-image");
const bowl = document.getElementById("bowl-contents");
const ingredientButtons = document.querySelectorAll(".ingredient");
const cookButton = document.getElementById("cook-button");
const result = document.getElementById("result");
const nextButton = document.getElementById("next-button");

// AI-assisted code: new elements for offering the dish to the spirit
const spirit = document.getElementById("spirit");
const spiritMessage = document.getElementById("spirit-message");
const offerButton = document.getElementById("offer-button");


function showOrder() {
  const recipe = recipes[currentRecipe];
  orderName.textContent = recipe.name;
  orderImage.src = recipe.image;
  orderImage.alt = recipe.name;
  orderList.textContent = "Needs: " + recipe.ingredients.join(", ");

  selected = [];
  ingredientButtons.forEach(function (button) {
    button.classList.remove("selected");
  });

  updateBowl();
  result.textContent = "";
  result.className = "result";
  nextButton.hidden = true;

  offerButton.hidden = true;
  spirit.classList.remove("vibrant");
  spiritMessage.textContent = "A hungry spirit is waiting... it looks so dull.";
}

function toggleIngredient(event) {
  const button = event.currentTarget;
  const name = button.dataset.name;

  if (selected.includes(name)) {
    selected = selected.filter(function (item) { return item !== name; });
    button.classList.remove("selected");
  } else {
    selected.push(name);
    button.classList.add("selected");
  }

  updateBowl();
}

function updateBowl() {
  bowl.innerHTML = "";
  bowl.classList.remove("cooked");

  ingredientButtons.forEach(function (button) {
    if (button.classList.contains("selected")) {
      const picture = document.createElement("img");
      picture.src = button.querySelector("img").src;
      picture.alt = button.dataset.name;
      bowl.appendChild(picture);
    }
  });

  if (selected.length === 0) {
    bowl.textContent = "Empty! Click some ingredients below.";
  }
}

function showDish(recipe) {
  bowl.innerHTML = "";
  bowl.classList.add("cooked");

  const dish = document.createElement("img");
  dish.src = recipe.image;
  dish.alt = recipe.name;

  dish.onerror = function () {
    bowl.textContent = "🍲 " + recipe.name;
  };

  bowl.appendChild(dish);
}

function cook() {
  const recipe = recipes[currentRecipe];

  if (selected.length === 0) {
    result.textContent = "Your bowl is empty. Pick some ingredients first!";
    result.className = "result fail";
    return;
  }

  const hasEverything = recipe.ingredients.every(function (item) {
    return selected.includes(item);
  });
  const noExtras = selected.length === recipe.ingredients.length;

  if (hasEverything && noExtras) {
    showDish(recipe);
    result.textContent = "Order up! Your " + recipe.name + " is ready. Offer it to the spirit!";
    result.className = "result success";
    offerButton.hidden = false;
  } else {
    result.textContent = "Not quite! Check the order and swap your ingredients.";
    result.className = "result fail";
  }
}

// AI-assisted code: offering the dish makes the spirit vibrant
function offerDish() {
  const recipe = recipes[currentRecipe];
  spirit.classList.add("vibrant");
  spiritMessage.textContent = "The spirit loved your " + recipe.name + "! Its color is back! ✨";
  offerButton.hidden = true;
  nextButton.hidden = false;
}

function pickRandomRecipe() {
  let newRecipe = currentRecipe;

  while (newRecipe === currentRecipe) {
    newRecipe = Math.floor(Math.random() * recipes.length);
  }

  currentRecipe = newRecipe;
}

function nextOrder() {
  pickRandomRecipe();
  showOrder();
}

ingredientButtons.forEach(function (button) {
  button.addEventListener("click", toggleIngredient);
});
cookButton.addEventListener("click", cook);
nextButton.addEventListener("click", nextOrder);

// AI-assisted code: event listener for the offer button
offerButton.addEventListener("click", offerDish);

pickRandomRecipe();
showOrder();