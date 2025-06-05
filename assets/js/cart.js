// Modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("cart");
var close = document.getElementsByClassName("close")[0];
var close_footer = document.getElementsByClassName("close-footer")[0];
var order = document.getElementsByClassName("order")[0];

// Hiển thị modal khi nhấn vào giỏ hàng
btn.onclick = function () {
  modal.style.display = "block";
  displayCartItems(); // Hiển thị sản phẩm trong giỏ hàng khi mở modal
}

// Đóng modal khi nhấn vào nút đóng
close.onclick = function () {
  modal.style.display = "none";
}

// Đóng modal khi nhấn vào nút đóng ở footer
close_footer.onclick = function () {
  modal.style.display = "none";
}

// Thông báo khi thanh toán
order.onclick = function () {
  // Lấy danh sách sản phẩm trong giỏ hàng
  var cartItems = document.getElementsByClassName('cart-items')[0];
  var cartRows = cartItems.getElementsByClassName('cart-row');
  var products = [];

  // Lặp qua từng sản phẩm trong giỏ hàng
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var title = cartRow.getElementsByClassName('cart-item-title')[0].innerText;
    var price = cartRow.getElementsByClassName('cart-price')[0].innerText;
    var quantity = cartRow.getElementsByClassName('cart-quantity-input')[0].value;
    var img = cartRow.getElementsByClassName('cart-item-image')[0].src;

    // Thêm thông tin sản phẩm vào mảng
    products.push({
      title: title,
      price: price,
      quantity: quantity,
      img: img
    });
  }

  // Lưu thông tin sản phẩm vào localStorage
  localStorage.setItem('cartProducts', JSON.stringify(products));

  // Chuyển hướng đến trang thanh toán
  window.location.href = 'checkout.html'; // Đảm bảo rằng đường dẫn này đúng với trang thanh toán của bạn
}

// Đóng modal khi nhấn ra ngoài modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Cập nhật giỏ hàng
function updatecart() {
  var cart_item = document.getElementsByClassName("cart-items")[0];
  var cart_rows = cart_item.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cart_rows.length; i++) {
    var cart_row = cart_rows[i];
    var price_item = cart_row.getElementsByClassName("cart-price")[0];
    var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0];
    var price = parseFloat(price_item.innerText.replace('đ', '').replace('.', '').trim()); // Chuyển đổi chuỗi sang số
    var quantity = quantity_item.value; // Lấy giá trị trong thẻ input
    total += (price * quantity);
  }
  document.getElementsByClassName("cart-total-price")[0].innerText = total.toLocaleString('vi-VN') + 'đ'; // Cập nhật tổng tiền
}



// Hiển thị sản phẩm trong giỏ hàng
function displayCartItems() {
  var cartItems = JSON.parse(localStorage.getItem('cartProducts')) || [];
  var cartItemsContainer = document.getElementsByClassName('cart-items')[0];
  clearCart(); // Xóa giỏ hàng hiện tại

  cartItems.forEach(function(product) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    cartRow.innerHTML = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${product.img}" width="100" height="100">
          <span class="cart-item-title">${product.title}</span>
      </div>
      <span class="cart-price cart-column">${product.price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="${product.quantity}">
          <button class="btn btn-danger" type="button">Xóa</button>
      </div>`;
    
    cartItemsContainer.appendChild(cartRow);

    // Cập nhật giỏ hàng khi thay đổi số lượng
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
      var input = event.target;
      if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
      }
      updatecart(); // Cập nhật giỏ hàng
    });

    // Thêm sự kiện cho nút xóa
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function () {
      var button_remove = event.target;
      button_remove.parentElement.parentElement.remove();
      updatecart(); // Cập nhật giỏ hàng sau khi xóa
    });
  });

  updatecart(); // Cập nhật tổng tiền sau khi thêm sản phẩm
}

// Thay đổi số lượng sản phẩm
var quantity_input = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quantity_input.length; i++) {
  var input = quantity_input[i];
  input.addEventListener("change", function (event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updatecart(); // Cập nhật giỏ hàng khi thay đổi số lượng
  });
}

// Thêm sản phẩm vào giỏ hàng từ popup
document.querySelector('.add-to-cart-popup').addEventListener('click', function() {
    var title = document.getElementById('popupTitle').innerText;
    var price = document.getElementById('totalPrice').innerText;
    var img = document.getElementById('popupImg').src;
    addItemToCart(title, price, img);
    modal.style.display = "none"; // Đóng popup sau khi thêm vào giỏ hàng
});

// Thêm sản phẩm vào giỏ hàng
function addItemToCart(title, price, img) {
  var cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  var cartItems = document.getElementsByClassName('cart-items')[0];
  var cart_title = cartItems.getElementsByClassName('cart-item-title');

  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  for (var i = 0; i < cart_title.length; i++) {
    if (cart_title[i].innerText === title) {
      alert('Sản Phẩm Đã Có Trong Giỏ Hàng');
      return;
    }
  }

  var cartRowContents = `
  <div class="cart-item cart-column">
      <img class="cart-item-image" src="${img}" width="100" height="100">
      <span class="cart-item-title">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">
      <button class="btn btn-danger" type="button">Xóa</button>
  </div>`;
  
  cartRow.innerHTML = cartRowContents;

  // Thêm sản phẩm vào giỏ hàng
  var totalRow = document.getElementsByClassName('cart-total')[0];
  cartItems.insertBefore(cartRow, totalRow); // Thêm sản phẩm mới trước phần tử tổng cộng

  // Thêm sự kiện cho nút xóa
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function () {
    var button_remove = event.target;
    button_remove.parentElement.parentElement.remove();
    updatecart(); // Cập nhật giỏ hàng sau khi xóa
  });

  // Cập nhật giỏ hàng khi thay đổi số lượng
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updatecart(); // Cập nhật giỏ hàng
  });
}

// Thêm sản phẩm vào giỏ hàng từ danh sách sản phẩm
var add_cart = document.getElementsByClassName("btn-add-cart");
for (var i = 0; i < add_cart.length; i++) {
  var add = add_cart[i];
  add.addEventListener("click", function (event) {
    var button = event.target;
    var product = button.parentElement.parentElement;
    var img = product.parentElement.getElementsByClassName("card-img-top")[0].src; // Lấy hình ảnh sản phẩm
    var title = product.getElementsByClassName("fw-semibold")[0].innerText; // Lấy tên sản phẩm
    var price = product.getElementsByClassName("fw-bold text-danger")[0].innerText; // Lấy giá sản phẩm
    addItemToCart(title, price, img);
    modal.style.display = "block"; // Hiển thị modal giỏ hàng
    updatecart(); // Cập nhật giỏ hàng
  });
}
