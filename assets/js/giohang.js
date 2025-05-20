
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

