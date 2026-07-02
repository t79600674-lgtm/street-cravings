// ================= LOGIN =================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const contact = document.getElementById("contact").value;

    localStorage.setItem("username", username);
    localStorage.setItem("contact", contact);

    window.location.href = "menu.html";
  });
}
// ================= FOOD DATA =================
const foods = [
  { 
    name: "Pani Puri", 
    rate: 30, 
    recipe: "Stuff puri with potato, add spicy pani & tamarind chutney.", 
    image: "images/panipuri.jpg" 
  },
  { 
    name: "Vada Pav", 
    rate: 20, 
    recipe: "Fry potato vada, place in pav with chutney.", 
    image: "images/vadapav.jpg" 
  },
  { 
    name: "Pav Bhaji", 
    rate: 50, 
    recipe: "Cook mashed veggies with spices, serve with butter pav.", 
    image: "images/pavbhaji.jpg" 
  },
  { 
    name: "Chole Bhature", 
    rate: 80, 
    recipe: "Cook chickpeas curry, serve with deep fried bhature.", 
    image: "images/chole.jpg" 
  },
  { 
    name: "Masala Dosa", 
    rate: 60, 
    recipe: "Spread dosa batter, add potato masala, fold & serve.", 
    image: "images/dosa.jpg" 
  },
  { 
    name: "Samosa", 
    rate: 15, 
    recipe: "Fill pastry with potato mix, deep fry till crispy.", 
    image: "images/samosa.jpg" 
  },
  { 
    name: "Bhel Puri", 
    rate: 25, 
    recipe: "Mix puffed rice, chutneys, onions & sev.", 
    image: "images/bhel.jpg" 
  },
  { 
    name: "Aloo Tikki", 
    rate: 30, 
    recipe: "Shape potato patties, shallow fry till golden.", 
    image: "images/alootikki.jpg" 
  },
  { 
    name: "Kathi Roll", 
    rate: 70, 
    recipe: "Wrap roti with spicy filling and sauces.", 
    image: "images/kathi.jpg" 
  },
  { 
    name: "Momos", 
    rate: 50, 
    recipe: "Fill dough with veggies/meat, steam & serve hot.", 
    image: "images/momos.jpg" 
  },
  { 
    name: "Jalebi", 
    rate: 40, 
    recipe: "Fry batter in spiral, soak in sugar syrup.", 
    image: "images/jalebi.jpg" 
  },
  { 
    name: "Dahi Puri", 
    rate: 35, 
    recipe: "Fill puri with curd, chutney & spices.", 
    image: "images/dahipuri.jpg" 
  },
  { 
    name: "Chicken Kebab", 
    rate: 120, 
    recipe: "Marinate chicken, grill till smoky & juicy.", 
    image: "images/kebab.jpg" 
  },
  { 
    name: "Egg Roll", 
    rate: 50, 
    recipe: "Cook egg on roti, add fillings & roll.", 
    image: "images/eggroll.jpg" 
  },
  { 
    name: "Chicken Shawarma", 
    rate: 100, 
    recipe: "Wrap grilled chicken with sauces in flatbread.", 
    image: "images/shawarma.jpg" 
  },
  { 
    name: "Fish Fry", 
    rate: 120, 
    recipe: "Marinate fish, coat & deep fry till crispy.", 
    image: "images/fish.jpg" 
  },
  { 
    name: "Keema Pav", 
    rate: 90, 
    recipe: "Cook minced meat masala, serve with pav.", 
    image: "images/keema.jpg" 
  },
  { 
    name: "Paneer Tikka", 
    rate: 110, 
    recipe: "Marinate paneer, grill till charred.", 
    image: "images/paneer.jpg" 
  },
  { 
    name: "Pakora", 
    rate: 30, 
    recipe: "Dip veggies in batter, deep fry till crisp.", 
    image: "images/pakora.jpg" 
  },
  { 
    name: "Falooda", 
    rate: 60, 
    recipe: "Layer milk, sev, jelly & ice cream.", 
    image: "images/falooda.jpg" 
  }
];

// ================= CART =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= LOAD MENU =================
function loadMenu() {
  const menuDiv = document.getElementById("menu");
  if (!menuDiv) return;

  menuDiv.innerHTML = "";

  foods.forEach((food, index) => {
    menuDiv.innerHTML += `
      <div class="food-card">
        <img src="${food.image}" alt="${food.name}">
        <h3>${food.name}</h3>
        <p>${food.recipe}</p>
        <p>₹${food.rate}</p>
        <button onclick="addToCart(${index})">Add</button>
      </div>
    `;
  });
}

// ================= ADD TO CART =================
function addToCart(index) {
  const item = foods[index];

  const existing = cart.find(i => i.name === item.name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name: item.name, rate: item.rate, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// ================= DISPLAY CART =================
function displayCart() {
  const cartDiv = document.getElementById("cart");
  if (!cartDiv) return;

  cartDiv.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Cart is empty</p>";
    return;
  }

  cart.forEach((item,index) => {
    const itemTotal = item.rate * item.qty;
    total += itemTotal;

    cartDiv.innerHTML += `
      <div class="cart-item">
        <p><strong>${item.name}</strong></p>
        <p>Qty: ${item.qty}</p>
        <p>₹${itemTotal}</p>

        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });

  cartDiv.innerHTML += `<h3>Total: ₹${total}</h3>`;
}
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}


// ================= PLACE ORDER =================
function placeOrder() {
  const username = localStorage.getItem("username");
  const contact = localStorage.getItem("contact");

  const items = cart.map(item => item.name);
  const total = cart.reduce((sum, item) => sum + item.rate, 0);

  fetch("https://street-cravings-n3uy.onrender.com/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      contact,
      items,
      total
    })
  })
  .then(res => res.text())
  .then(data => {
    alert("✅ Order Placed Successfully!");
    cart = [];
    localStorage.removeItem("cart");
    location.reload();
    console.log(data);
  })
  .catch(err => {
    console.error(err);
    alert("❌ Error placing order");
  });
}

// ================= AUTO LOAD =================
window.onload = function () {
  if (document.getElementById("menu")) {
    loadMenu();
  }
  displayCart();
};
