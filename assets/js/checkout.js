// Lấy thông tin sản phẩm từ localStorage
var products = JSON.parse(localStorage.getItem('cartProducts'));

// Kiểm tra xem có sản phẩm nào không
if (products && products.length > 0) {
    var listContainer = document.querySelector('.list');

    // Lặp qua từng sản phẩm và thêm vào danh sách
    products.forEach(function(product) {
        var item = document.createElement('div');
        item.classList.add('item');
        item.innerHTML = `
            <img src="${product.img}" alt="${product.title}"> 
            <div class="info">
                <div class="name">${product.title}</div>
                <div class="price">${product.price}/1 product</div>
            </div>
            <div class="quantity">${product.quantity}</div>
            <div class="returnPrice">$${(parseFloat(product.price.replace('$', '')) * product.quantity).toFixed(2)}</div>
        `;
        listContainer.appendChild(item);
    });
}
