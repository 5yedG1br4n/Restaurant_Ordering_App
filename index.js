import { menuArray } from "./data.js";

const modal = document.getElementById("modal");
const modalForm = document.getElementById("modal-form");

const checkoutItems = [];

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    handleAddBtnClick(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    handleRemoveBtnClick(e.target.dataset.remove);
  } else if (e.target.id) {
    handleOrderBtnClick();
  }
});

modalForm.addEventListener("submit", function (e) {
  e.preventDefault();
  modal.style.display = "none";

  const modalFormData = new FormData(modalForm);
  const fullName = modalFormData.get("fullName");

  document.getElementById("checkout-container").style.display = "none";

  let orderCompleteHtml = `
  <div class="thanks-div">
    <h1 class="thanks-label">
    Thanks, ${fullName}! Your order is on its way!
    </h1>
  </div>`;

  document.getElementById("body-section").innerHTML += orderCompleteHtml;
});

function handleAddBtnClick(AddBtnId) {
  menuArray.forEach(function (menuItem) {
    if (menuItem.id === Number(AddBtnId)) {
      checkoutItems.push(menuItem);
    }
  });

  render();
}

function handleRemoveBtnClick(removeBtnId) {
  const itemIndex = checkoutItems.findIndex(function (item) {
    return item.id === Number(removeBtnId);
  });
  checkoutItems.forEach(function (checkoutItem) {
    if (checkoutItem.id === Number(removeBtnId)) {
      checkoutItems.splice(itemIndex, 1);
    }
  });
  render();
}

function handleOrderBtnClick() {
  modal.style.display = "block";
}

function getTotalPrice() {
  let totalPrice = 0;

  checkoutItems.forEach(function (checkoutItem) {
    totalPrice += checkoutItem.price;
  });

  return totalPrice;
}

function getMenuHtml() {
  let menuHtml = "";
  let checkoutSectionHtml = "";
  let checkoutListHtml = "";

  checkoutItems.forEach(function (checkoutItem) {
    checkoutListHtml += `
    <div class="checkout-list">
      <h3 class="checkout-item-name">${checkoutItem.name}</h3>
      <button class="remove-btn" data-remove="${checkoutItem.id}">remove</button>
      <h3 class="checkout-price">$${checkoutItem.price}</h3>
    </div>`;
  });

  if (checkoutItems.length > 0) {
    checkoutSectionHtml = `
        <div class="checkout-container" id="checkout-container">
          <h2 class="checkout-heading">Your order</h2>
          ${checkoutListHtml}
          <div class="total-price-container">
          <div class="total-price-div">
            <h2 class="total-price-label">Total price:</h2>
            <h2 class="total-price">${getTotalPrice()}</h2>
          </div>
          <button class="complete-order" id="complete-order">Complete order</button>
          </div>
        </div>`;
  }

  menuArray.forEach(function (item) {
    menuHtml += `
      <div class="menu-item">
        <p class="item-icon">${item.emoji}</p>
        <div class="menu-item-details">
          <p class="name">${item.name}</p>
          <p class="ingredients">${item.ingredients}</p>
          <p class="price">$${item.price}</p>
        </div>
        <button class="add-btn" data-add="${item.id}">+</button>
      </div>`;
  });

  menuHtml += checkoutSectionHtml;

  return menuHtml;
}

function render() {
  document.getElementById("body-section").innerHTML = getMenuHtml();
}

render();
