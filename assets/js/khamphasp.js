(function () {
    const images = [
   
        './assets/img/tranhsen2.png',
        './assets/img/tranhsen3.png',
        './assets/img/tranhsen4.png',
        './assets/img/tranhsen5.png',
        './assets/img/tranhsen6.png',
        './assets/img/tranhsen8.png',
        './assets/img/tranhsen1.png',
        './assets/img/tranhsen7.png',
    ];
    const gallery = document.getElementById('gallery'); 

    images.forEach((src, index) => {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Image ' + (index + 1);

        card.appendChild(img);
        gallery.appendChild(card);
    });

    // Hiệu ứng nghiêng khi di chuyển chuột
    const cards = gallery.querySelectorAll('.card'); 

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const centerX = rect.left + width / 2;
            const centerY = rect.top + height / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            const rotateX = Math.max(Math.min((mouseY / height) * 75, 75), -75);
            const rotateY = Math.max(Math.min((mouseX / width) * -75, 75), -75);

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.2s ease';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
})();

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
      cart.push({ name, price, image });
      console.log('Đã thêm vào giỏ hàng:', cart);

      // Thông báo đơn giản
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
    if (!selectedSize) {
        alert('Vui lòng chọn kích thước trước khi mua!');
        return;
    }
    alert(`Bạn đã chọn mua ngay sản phẩm: ${popupTitle.textContent} - Kích thước: ${selectedSize} - Số lượng: ${quantity} - Thành tiền: ${totalPriceElement.textContent}. Chuyển đến trang thanh toán!`);
    closePopup();
});

document.querySelector('.add-to-cart-popup').addEventListener('click', () => {
    if (!selectedSize) {
        alert('Vui lòng chọn kích thước trước khi thêm vào giỏ hàng!');
        return;
    }
    alert(`Sản phẩm: ${popupTitle.textContent} - Kích thước: ${selectedSize} - Số lượng: ${quantity} - Thành tiền: ${totalPriceElement.textContent} đã được thêm vào giỏ hàng!`);
    closePopup();
});

popup.addEventListener('click', e => {
    if (e.target === popup) closePopup();
});



