let cartItem = JSON.parse(localStorage.getItem('cart')) || [];
let cartDetails = document.getElementById('cart-details');
let symbol = `₦`;

function updateCartCount() {
  const cartCount = document.querySelector('.cart-no');
  cartCount.textContent = cartItem.length;
}

function displayCartItems() {
  cartDetails.innerHTML = '';
  if (cartItem.length > 0) {
    let totalPrice = 0;
    cartItem.forEach(item => {
      totalPrice += item.price * item.quantity;
      cartDetails.innerHTML += `
        <div class="cart-item">
          <div class="dish-name">Dish Name: ${item.title}</div>
          <div class="price">Price: ${symbol}${item.price}</div>
          <div class="quantity">Quantity: ${item.quantity}</div>
          <button class="remove-btn" onclick="removeFromCart('${item.title}')">Remove</button>
          <hr>
        </div>`;
    });
    cartDetails.innerHTML += `<h4>Total Price: ${symbol}${totalPrice}</h4>`;
  } else {
    cartDetails.innerHTML = `<p>No meals ordered</p>`;
  }

  updateOrderSummary();
}

function removeFromCart(title) {
  const index = cartItem.findIndex(item => item.title === title);
  if (index !== -1) {
    cartItem.splice(index, 1);
    alert(`${title} has been removed from your order.`);
    localStorage.setItem('cart', JSON.stringify(cartItem));
    updateCartCount();
    displayCartItems(); 
  }
}

function updateOrderSummary() {
  let grandTotal = document.getElementById('grand-total');
  let totalPrice = cartItem.reduce((total, item) => total + (item.price * item.quantity), 0);
  grandTotal.innerHTML = `Grand Total: ${symbol}${totalPrice}`;
}

let checkOutBtn = document.querySelector('.checkout-btn');
if (checkOutBtn) {
  checkOutBtn.addEventListener('click', () => {
    let address = document.querySelector('#address-input').value;
    
    if (address === '') {
      alert('Please enter your delivery address.');
    } else {
      let confirmationMessage = 'You have ordered the following items:\n';
      cartItem.forEach(item => {
        confirmationMessage += `${item.title} x ${item.quantity} = ${symbol}${(item.price * item.quantity)}\n`;
      });
      
      const total = cartItem.reduce((total, item) => total + (item.price * item.quantity), 0);
      confirmationMessage += `Total: ${symbol}${total}\nDelivery address: ${address}`;
      
      if (confirm(confirmationMessage)) {
        localStorage.removeItem('cart');
        cartItem = [];
        updateCartCount();
        displayCartItems();
        alert('Order placed successfully! It will arrive in 20 minutes.');
      }
      document.querySelector('#address-input').value = ''; // Clear address input
    }
  });
}

displayCartItems();
