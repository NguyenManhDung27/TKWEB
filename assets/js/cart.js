// cart.js

// Lấy phần tử modal và các nút
const modal = document.getElementById('myModal');
const cartBtn = document.getElementById('cart');
const closeBtn = modal.querySelector('.close');
const closeFooterBtn = modal.querySelector('.close-footer');
const orderBtn = modal.querySelector('.order');
const cartItemsContainer = modal.querySelector('.cart-items');
const cartTotalPriceEl = modal.querySelector('.cart-total-price');

// Hàm lấy giỏ hàng từ localStorage
function getCart() {
  const cart = localStorage.getItem('cartProducts');
  return cart ? JSON.parse(cart) : [];
}

// Hàm lưu giỏ hàng vào localStorage
function saveCart(cart) {
  localStorage.setItem('cartProducts', JSON.stringify(cart));
}

// Cập nhật tổng tiền và hiển thị giỏ hàng
function displayCartItems() {
  cartItemsContainer.innerHTML = '';
  const cartItems = getCart();

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<p class="text-center p-4 text-gray-500">Giỏ hàng của bạn đang trống</p>';
    cartTotalPriceEl.textContent = '0đ';
    updateCartBadge(); // Cập nhật badge
    return;
  }

  let total = 0;

  cartItems.forEach(product => {
    const priceNumber = parseInt(product.price.replace(/[^\d]/g, '')) || 0;
    const itemTotal = priceNumber * product.quantity;
    total += itemTotal;

    const cartRow = document.createElement('div');
    cartRow.className = 'cart-row';
    cartRow.innerHTML = `
      <div class="cart-item cart-column flex items-center gap-4 p-3 rounded border bg-white shadow-sm">
        <img class="cart-item-image rounded" src="${product.img}" alt="${product.title}" width="100" height="100"/>
        <span class="cart-item-title font-semibold text-gray-900">${product.title}</span>
      </div>
      <span class="cart-price cart-column font-semibold text-gray-900">${product.price}</span>
      <div class="cart-quantity cart-column flex items-center gap-2">
        <input class="cart-quantity-input border rounded text-center text-gray-800" type="number" min="1" value="${product.quantity}" style="width:60px"/>
        <button class="btn btn-danger bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Xóa</button>
      </div>
    `;

    cartItemsContainer.appendChild(cartRow);

    // Sự kiện thay đổi số lượng
    const quantityInput = cartRow.querySelector('.cart-quantity-input');
    quantityInput.addEventListener('change', e => {
      let val = parseInt(e.target.value);
      if (isNaN(val) || val < 1) val = 1;
      e.target.value = val;
      updateQuantity(product.title, val);
    });

    // Sự kiện xóa sản phẩm
    const removeBtn = cartRow.querySelector('.btn-danger');
    removeBtn.addEventListener('click', () => {
      removeItem(product.title);
    });
  });

  cartTotalPriceEl.textContent = total.toLocaleString('vi-VN') + 'đ';
  updateCartBadge(); // Cập nhật badge
}

// Cập nhật số lượng 1 sản phẩm trong giỏ hàng
function updateQuantity(title, quantity) {
  let cart = getCart();
  let product = cart.find(item => item.title === title);
  if (product) {
    product.quantity = quantity;
    saveCart(cart);
    displayCartItems(); // Cập nhật lại giỏ hàng
  }
}

// Xóa 1 sản phẩm khỏi giỏ hàng
function removeItem(title) {
  let cart = getCart();
  cart = cart.filter(item => item.title !== title);
  saveCart(cart);
  displayCartItems(); // Cập nhật lại giỏ hàng
}

// Mở Modal giỏ hàng khi bấm nút giỏ
cartBtn.addEventListener('click', () => {
  displayCartItems();
  modal.style.display = 'block';
});

// Đóng Modal khi bấm nút đóng hoặc background
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});
closeFooterBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});
window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Xử lý nút thanh toán chuyển sang checkout
orderBtn.addEventListener('click', () => {
  window.location.href = 'checkout.html';
});

// Thêm sản phẩm vào giỏ hàng từ popup hoặc danh sách
function addProductToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.title === product.title);

  if (existing) {
    existing.quantity += product.quantity;
  } else {
    cart.push(product);
  }
  saveCart(cart);
  displayCartItems();
}

// Bắt sự kiện cho các nút 'Thêm vào giỏ hàng' trong danh sách sản phẩm
document.querySelectorAll('.btn-add-cart').forEach(btn => {
  btn.addEventListener('click', e => {
    const card = e.target.closest('.col-6, .col-md-3');
    const title = card.querySelector('.fw-semibold').innerText.trim();
    const price = card.querySelector('.fw-bold.text-danger').innerText.trim();
    const img = card.querySelector('img.card-img-top').src;

    addProductToCart({ title, price, img, quantity: 1 });

    // Mở modal giỏ hàng khi mới thêm sản phẩm
    displayCartItems();
    modal.style.display = 'block';
  });
});

// Bắt sự kiện thêm sản phẩm từ pop-up
document.querySelectorAll('.add-to-cart-popup').forEach(btn => {
  btn.addEventListener('click', () => {
    const title = document.getElementById('popupTitle').textContent.trim();
    const price = document.getElementById('totalPrice').textContent.trim();
    const img = document.getElementById('popupImg').src;
    let quantity = parseInt(document.getElementById('quantityInput').value, 10);
    if (isNaN(quantity) || quantity < 1) quantity = 1;

    addProductToCart({ title, price, img, quantity });
    modal.style.display = 'none'; // đóng modal pop-up
  });
});

// Cập nhật badge số lượng sản phẩm trên nút giỏ hàng
function updateCartBadge() {
  const cartItems = getCart(); // lấy giỏ hàng từ localStorage
  const totalQuantity = cartItems.reduce((sum, item) => sum + Number(item.quantity), 0);
  const cartButton = document.getElementById('cart');

  if (!cartButton) return;

  let badge = cartButton.querySelector('.badge');

  // Nếu badge chưa tồn tại thì tạo
  if (!badge) {
    badge = document.createElement('span');
    badge.classList.add('badge');
    cartButton.appendChild(badge);
  }

  if (totalQuantity > 0) {
    badge.textContent = totalQuantity;
    badge.style.display = 'inline-block';
  } else {
    badge.style.display = 'none';
  }
}

// Khi load trang, cập nhật biểu tượng và hiển thị giỏ hàng
window.addEventListener('DOMContentLoaded', () => {
  displayCartItems();
  updateCartBadge();
});
