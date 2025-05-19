
const products = [
  { name: "Tranh Tráng Gương Sơn Vân", img: "./assets/img/kpt.tranhtrangguong4.webp", price: "980.000đ", category: "tranh-trang-guong" },
  { name: "Tranh Đèn Led Hoa", img: "./assets/img/kpt.tranhdenled5.webp", price: "710.000đ", category: "tranh-den-led" },
  { name: "Tranh Tam Cốc Mùa Lúa", img: "./assets/img/kpt.tranhphongcanhr5.jpeg", price: "700.000đ", category: "tranh-chu-de" },
  { name: "Tranh Bộ Huyền Dạ", img: "./assets/img/kpt.tranhbo1.jpg", price: "750.000đ", category: "tranh-trang-guong" },
  { name: "Tranh Đồng Hồ Đôi Hươu Tài Lộc", img: "./assets/img/kpt.tranhdongho4.webp", price: "650.000đ", category: "tranh-dong-ho" },
  { name: "Tranh Ngư Thuỷ", img: "./assets/img/kpt.tranhbannguyet5.jpeg", price: "600.000đ", category: "tranh-trang-guong" },
  { name: "Tranh Canvas Hoa", img: "./assets/img/kpt.tranhcanvas4.jpg", price: "600.000đ", category: "tranh-canvas" },
  { name: "Tranh Bán Nguyệt Hươu Lộc", img: "./assets/img/kpt.tranhbannguyet4.webp", price: "750.000đ", category: "tranh-trang-guong" },
  { name: "Tranh Đồng Hồ Lộc Nguyệt", img: "./assets/img/kpt.tranhdongho3.webp", price: "620.000đ", category: "tranh-dong-ho" },
  { name: "Tranh Canvas Thanh Hoa", img: "./assets/img/kpt.tranhcanvas3.jpg", price: "430.000đ", category: "tranh-canvas" },
  { name: "Tranh Tráng Gương Cá Và Sen", img: "./assets/img/kpt.tranhtrangguong3.jpg", price: "880.000đ", category: "tranh-trang-guong" },
  { name: "Tranh Lụa Sơn Thuỷ", img: "./assets/img/kpt.tranhlua3.jpg", price: "655.000đ", category: "tranh-lua" },
  { name: "Tranh Sơn Dầu Xanh Trong Trẻo", img: "./assets/img/kpt.tranhsondau3.jpg", price: "255.000đ", category: "tranh-son-dau" },
  { name: "Tranh Canvas Hoa Trắng", img: "./assets/img/kpt.tranhcanvas1.jpg", price: "399.000đ", category: "tranh-canvas" },
  { name: "Tranh Dải Ngân Sơn", img: "./assets/img/kpt.tranhphongcanh6.jpeg", price: "770.000đ", category: "tranh-chu-de" },
  { name: "Tranh Đèn Led Cá Và Sen", img: "./assets/img/kpt.tranhdenled4.webp", price: "865.000đ", category: "tranh-den-led" },
];


let currentPage = 1;
const itemsPerPage = 12;
let currentCategory = "all";

function renderProducts() {
  const container = document.getElementById("explore-products");
  if (!container) return;

  const filtered = currentCategory === "all"
    ? products
    : products.filter(p => p.category === currentCategory);

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  container.innerHTML = paginated.map(p => `
    <div class="col-md-3 mb-4">
      <div class="card text-white">
        <img src="${p.img}" class="card-img" alt="${p.name}" style="height: 250px; object-fit: cover;">
        <div class="card-img-overlay d-flex flex-column justify-content-end bg-dark bg-opacity-50 p-3 rounded">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text fw-bold">${p.price}</p>
          <a href="#" class="btn btn-sm btn-light">Mua ngay</a>
        </div>
      </div>
    </div>
  `).join("");

  renderPagination(filtered.length);
}

function renderPagination(totalItems) {
  const pagination = document.getElementById("pagination");
  if (!pagination) return;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <button class="page-link" onclick="goToPage(${i})">${i}</button>
      </li>
    `;
  }
}

function goToPage(page) {
  currentPage = page;
  renderProducts();
}

document.addEventListener("DOMContentLoaded", function () {
  renderProducts();

  const categoryFilter = document.getElementById("category-filter");
  if (categoryFilter) {
    categoryFilter.addEventListener("click", (e) => {
      if (e.target.dataset.category) {
        document.querySelectorAll("#category-filter .btn").forEach(btn =>
          btn.classList.remove("active")
        );
        e.target.classList.add("active");
        currentCategory = e.target.dataset.category;
        currentPage = 1;
        renderProducts();
      }
    });
  }
});


