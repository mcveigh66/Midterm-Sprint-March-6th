// Load cart when page loads
document.addEventListener("DOMContentLoaded", loadCart);

function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cartItems");
    const totalDisplay = document.getElementById("totalDisplay");

    cartContainer.innerHTML = "";
    let subtotal = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty. Go back to the menu.</p>";
        totalDisplay.innerText = "Total: $0.00";
        return;
    }

   cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
        <span>${item.name}</span>
        <span>$${item.price.toFixed(2)}</span>
        <button class="remove-btn" data-index="${index}">Remove</button>
    `;

    cartContainer.appendChild(itemDiv);
    subtotal += item.price;
});

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1); // remove 1 item at position index

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart(); // refresh cart display
}

document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", function() {
        const index = this.getAttribute("data-index");
        removeFromCart(index);
    });
});

    // TAX CALCULATION
    const taxRate = 0.15;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    totalDisplay.innerHTML = `
        Subtotal: $${subtotal.toFixed(2)} <br>
        Tax (15%): $${tax.toFixed(2)} <br>
        <strong>Total: $${total.toFixed(2)}</strong>
    `;
}


// Form Validation
function validateForm() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const email = document.getElementById("email").value.trim();

    const phonePattern = /^[0-9]{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "" || phone === "" || address === "") {
        showAlert("Please fill in all fields.");
        return false;
    }

    if (!phonePattern.test(phone)) {
        showAlert("Phone number must be 10 digits.");
        return false;
    }

    if (address.length < 5) {
        showAlert("Please enter a valid address.");
        return false;
    }

    if (!emailPattern.test(email)) {
        showAlert("Please enter a valid email address.");
        return false;
    }

    return true;
}


// Place Order
document.getElementById("placeOrderBtn").addEventListener("click", function() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        showAlert("Your cart is empty!");
        return;
    }

    if (!validateForm()) return;

    showAlert("Thank you for your order!");

    // Clear everything
    localStorage.removeItem("cart");
    document.getElementById("orderForm").reset();
    loadCart();
});


// 2 Second Popup
function showAlert(message) {
    const popup = document.getElementById("popup");

    popup.innerText = message;
    popup.style.opacity = "1";

    setTimeout(() => {
        popup.style.opacity = "0";
    }, 2000);
}