console.log("Menu JS loaded");

document.querySelectorAll(".menusection").forEach(section => {
  const container = section.querySelector(".menucontainer");
  const leftBtn = section.querySelector(".left");
  const rightBtn = section.querySelector(".right");

  leftBtn.addEventListener("click", () => {
    container.scrollBy({ left: -300, behavior: "smooth" });
  });

  rightBtn.addEventListener("click", () => {
    container.scrollBy({ left: 300, behavior: "smooth" });
  });
});

function addToOrder(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name: name, price: price });
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    showAlert(name + " added to order!");
}

function showAlert(message) {
    const popup = document.getElementById("popup");
    popup.innerText = message;
    popup.style.opacity = "1";

    setTimeout(() => {
        popup.style.opacity = "0";
    }, 2000);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const countElement = document.getElementById("cart-count");

    if (countElement) {
        countElement.innerText = cart.length;
    }
}

document.addEventListener("DOMContentLoaded", updateCartCount);
