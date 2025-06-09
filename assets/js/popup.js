
  // Mô phỏng giỏ hàng
  const cart = [];

  // Xử lý thêm vào giỏ
  document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', function () {
      // Lấy phần tử cha để truy cập thông tin sản phẩm
      const productCard = this.closest('.col-6');

      const name = productCard.querySelector('p.fw-semibold').innerText;
      const price = productCard.querySelector('.text-danger').innerText;
      const image = productCard.querySelector('img').getAttribute('src');

      // Thêm vào giỏ (ở đây chỉ log ra console)
      const currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  alert("Chuyển trang để đăng nhập!");
  window.location.href = "login.html"; // hoặc link đúng của bạn
  return;
}

cart.push({ name, price, image });
console.log('Đã thêm vào giỏ hàng:', cart);
alert(`${name} đã được thêm vào giỏ hàng!`);
    });
  });
  // pop-up//

const popup = document.getElementById('popupDetail');
const popupContent = popup.querySelector('.popup-content');
const popupImg = document.getElementById('popupImg');
const popupTitle = document.getElementById('popupTitle');
const popupDesc = document.getElementById('popupDesc');
const popupRating = document.getElementById('popupRating');
const popupPurchases = document.getElementById('popupPurchases');
const sizeButtons = document.querySelectorAll('.size-btn');
const quantityInput = document.getElementById('quantityInput');
const totalPriceElement = document.getElementById('totalPrice');

let selectedSize = null;
let priceValue = 0;
let quantity = 1;

document.querySelectorAll('.buy-now').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.col-6, .col-md-3');
        const imgSrc = card.querySelector('img').src;
        const title = card.querySelector('.fw-semibold').innerText;
        const price = card.querySelector('.text-danger').innerText;
        const description = card.querySelector('.product-data .description').textContent;
        const rating = card.querySelector('.product-data .rating').textContent;
        const purchases = card.querySelector('.product-data .purchases').textContent;

        popupImg.src = imgSrc;
        popupTitle.textContent = title;
        popupDesc.textContent = description;
        popupRating.innerHTML = `<i class="fas fa-star"></i> ${rating}`;
        popupPurchases.textContent = purchases;

        priceValue = parseInt(price.replace(/[^0-9]/g, ''));
        quantity = 1;
        quantityInput.value = quantity; // Cập nhật giá trị số lượng
        updateTotalPrice();

        sizeButtons.forEach(btn => btn.classList.remove('active'));
        selectedSize = null;

        popup.style.display = 'flex';
        setTimeout(() => popup.classList.add('show'), 10);
    });
});

sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        sizeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedSize = button.getAttribute('data-size');
    });
});

function updateQuantity(change) {
    quantity += change;
    if (quantity < 1) quantity = 1;
    quantityInput.value = quantity; // Cập nhật giá trị trong ô input
    updateTotalPrice();
}

function updateTotalPrice() {
    const total = priceValue * quantity;
    totalPriceElement.textContent = total.toLocaleString('vi-VN') + '₫';
}

function closePopup() {
    popup.classList.remove('show');
    setTimeout(() => {
        popup.style.display = 'none';
    }, 300);
}

document.querySelector('.buy-now-popup').addEventListener('click', () => {
     const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert("Chuyển trang để đăng nhập!");
        window.location.href = "login.html";
        return;
    }

    if (!selectedSize) {
        alert('Vui lòng chọn kích thước trước khi thêm vào giỏ hàng!');
        return;
    }
    alert(`Bạn đã chọn mua ngay sản phẩm: ${popupTitle.textContent} - Kích thước: ${selectedSize} - Số lượng: ${quantity} - Đơn giá: ${priceValue.toLocaleString('vi-VN')}₫ - Thành tiền: ${totalPriceElement.textContent}. Chuyển đến trang thanh toán!`);
    closePopup();
});

document.querySelector('.add-to-cart-popup').addEventListener('click', () => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert("Chuyển trang để đăng nhập!");
        window.location.href = "login.html";
        return;
    }

    if (!selectedSize) {
        alert('Vui lòng chọn kích thước trước khi thêm vào giỏ hàng!');
        return;
    }

    alert(`Sản phẩm: ${popupTitle.textContent} - Kích thước: ${selectedSize} - Số lượng: ${quantity} - Đơn giá: ${priceValue.toLocaleString('vi-VN')}₫ - Thành tiền: ${totalPriceElement.textContent} đã được thêm vào giỏ hàng!`);
    closePopup();
});

/*   NÚT KHÁM PHÁ NGAY CHO TRANG DANH MỤC */
document.querySelector('.scroll-to').onclick = e => {
  e.preventDefault();
  const targetY = document.getElementById('products').offsetTop;
  window.scrollTo({ top: targetY, behavior: 'smooth' });
};