$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const index = parseInt(urlParams.get('index'));
  const product = window.products?.[index];

  if (!product) {
    $('#product-detail').html(`<h2>Không tìm thấy sản phẩm</h2>`);
    return;
  }

  const html = `
    <div class="col-md-6">
      <img src="${product.img}" alt="${product.name}" class="img-fluid rounded shadow">
    </div>
    <div class="col-md-6">
      <h1>${product.name}</h1>
      <p class="fs-4 text-danger fw-bold">${product.price}
        ${product.oldPrice ? `<s class="text-muted fs-5 ms-2">${product.oldPrice}</s>` : ''}
      </p>
      <p class="mt-4">🚚 <strong>FREE Shipping toàn quốc</strong></p>
      <button class="btn btn-primary mt-3">Liên hệ đặt mua</button>
    </div>
  `;

  $('#product-detail').html(html);
});



 // Hàm sửa đường dẫn ảnh, thay ./ thành ../ nếu cần
    function fixImagePath(path) {
      if (path.startsWith('./')) {
        return '../' + path.slice(2);
      }
      return path;
    }

    $(document).ready(function () {
      const urlParams = new URLSearchParams(window.location.search);
      const index = parseInt(urlParams.get('index'));
      const product = window.products?.[index];

      if (!product) {
        $('#product-detail').html('<h2>Không tìm thấy sản phẩm</h2>');
        return;
      }

      const images = product.images && product.images.length
        ? product.images.map(img => fixImagePath(img))
        : [fixImagePath(product.img)];

      const html = `
        <div class="col-md-6 product-images">
          <img src="${images[0]}" alt="${product.name}" id="main-image" class="main-image mb-3" />
          <div class="thumbnail-list">
            ${images.map((img, i) => `
              <img src="${img}" alt="Ảnh ${i+1}" class="${i === 0 ? 'active' : ''}" data-index="${i}">
            `).join('')}
          </div>
        </div>

        <div class="col-md-6">
          <h1>${product.name}</h1>
          <p>
            <span class="price">${product.price}</span>
            ${product.oldPrice ? `<span class="old-price">${product.oldPrice}</span>` : ''}
          </p>
          <p><strong>Vận chuyển:</strong> 🚚 FREE Shipping toàn quốc</p>

          <div class="mb-3">
            <label for="size-select" class="form-label">Chọn kích thước:</label>
            <select id="size-select" class="form-select size-select">
              ${product.sizes ? product.sizes.map(size => `<option value="${size}">${size}</option>`).join('') : '<option value="default">Mặc định</option>'}
            </select>
          </div>

          <div class="mb-3">
            <label for="quantity" class="form-label">Số lượng:</label>
            <input type="number" id="quantity" class="form-control quantity-select" value="1" min="1" />
          </div>

          <button class="btn btn-primary btn-lg">Thêm vào giỏ hàng</button>

          ${product.description ? `<div class="mt-4"><h5>Mô tả sản phẩm</h5><p>${product.description}</p></div>` : ''}
        </div>
      `;

      $('#product-detail').html(html);

      $('.thumbnail-list img').click(function () {
        const idx = $(this).data('index');
        $('#main-image').attr('src', images[idx]);
        $('.thumbnail-list img').removeClass('active');
        $(this).addClass('active');
      });
    });
