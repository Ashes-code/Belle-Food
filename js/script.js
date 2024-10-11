let dishes = [
  {image: 'img/rice.png', title: 'Rice', price: 1000},
  {image: 'img/riro-soup.jpeg', title: 'Ofe Riro', price: 1500},
  {image: 'img/chicken.jpeg', title: 'Chicken', price: 4000},
  {image: 'img/eba.jpeg', title: 'Garri', price: 500},
  {image: 'img/water.jpeg', title: 'Water', price: 300},
  {image: 'img/poundo yam.jpeg', title: 'Pounded Yam', price: 800},
  {image: 'img/fufu.jpeg', title: 'Fufu', price: 500},
  {image: 'img/okro.jpeg', title: 'Okra Soup', price: 1000},
  {image: 'img/semo.jpeg', title: 'Semovita', price: 800},
  {image: 'img/bread.png', title: 'Bread', price: 1300},
  {image: 'img/plantain.png', title: 'Plantain', price: 1000},
  {image: 'img/spaghetti.png', title: 'Spaghetti', price: 900},
  {image: 'img/eggs.png', title: 'Fried Eggs', price: 1000},
  {image: 'img/macaroni.png', title: 'Macaroni', price: 850},
  {image: 'img/drinks.png', title: 'Soft Drinks', price: 400},
  {image: 'img/stew.png', title: 'Stew', price: 800},
  {image: 'img/tea.png', title: 'Tea', price: 800},
  {image: 'img/moi.png', title: 'Moi Moi', price: 1100},
];

let regexp = /^[a-zA-Z ]*$/;
let searchDishes = document.getElementById('search');
let hamburgerButton = document.querySelector('.hamburger-button');
let hamburgerMenu = document.querySelector('.hamburger-menu');
let menu = document.querySelectorAll('.menu-item');
let searchResults = document.getElementById('search-results');
let addToCartBtn = document.getElementById('btn-add');
let addToCartBtn2 = document.getElementById('btn-add-b');
let searchButton = document.getElementById('search-button');
let localCart = localStorage.getItem('cart');
let cart = !localCart ? [] : JSON.parse(localCart);



hamburgerButton.addEventListener('click', () => {
  hamburgerButton.classList.toggle('active');
});

searchButton.addEventListener('click', () => {
  searchValue = searchDishes.value.trim().toLowerCase();
  if (searchValue == '') {
    alert('Please enter a search query');
  } else if (!regexp.test(searchValue)) {
    alert('Your search cannot be a number or a symbol');
  } else {
    let queryResult = dishes.filter((dish) => dish.title.toLowerCase().includes(searchValue));

    if (queryResult.length > 0) {
      let menuItems = document.querySelectorAll('.menu-item, .menu-item2');
      menuItems.forEach((menuItem) => {
        let dishTitle = menuItem.querySelector('h3').textContent.toLowerCase();
        if (queryResult.some((dish) => dish.title.toLowerCase() === dishTitle)) {
          menuItem.style.display = 'block';
        } else {
          menuItem.style.display = 'none';
        }
      });
    } else {
      let menuItems = document.querySelectorAll('.menu-item, .menu-item2');
      menuItems.forEach((menuItem) => {
        menuItem.style.display = 'none';
      });
      searchResults.innerHTML = 'No dishes found matching your search query.';
    }
  }
});

function addToCart(dish) {
  let existingDish = cart.find((item) => item.title === dish.title);
  if (existingDish) {
    existingDish.quantity++;
    alert(`${dish.title} added to your cart`);
  } else {
    cart.push({ ...dish, quantity: 1 });
    alert(`${dish.title} added to your cart`);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}


function updateCartCount() {
  const cartCount = document.querySelector('.cart-no');
  cartCount.textContent = cart.length;
}


document.querySelectorAll('.btn-add, .btn-add-b').forEach((button) => {
  button.addEventListener('click', (e) => {
    let dish = dishes.find((item) => item.title === e.target.parentNode.querySelector('h3').textContent);
    addToCart(dish);
  });
});


if (window.location.pathname === '/cart.html') {
  displayCartItems();
  updateCartCount();
}
