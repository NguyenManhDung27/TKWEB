// Lấy các phần tử cần thao tác
const tabs = document.querySelectorAll(".tab");
const forms = document.querySelectorAll(".form");
const switchLinks = document.querySelectorAll("[data-switch]");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const loginMessage = document.getElementById("loginMessage");
const regMessage = document.getElementById("regMessage");
const usernameDisplay = document.getElementById("usernameDisplay");
const logoutBtn = document.getElementById("logoutBtn");
const loginLink = document.getElementById("login-link");

// Chuyển đổi tab đăng nhập - đăng ký
function switchTab(tabName) {
    tabs.forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.tab === tabName);
    });
    forms.forEach((form) => {
        form.classList.toggle("active", form.id === `${tabName}Form`);
    });

    // Ẩn/hiện thông báo lỗi khi đổi tab
    loginMessage.style.display = "none";
    regMessage.style.display = "none";
}

// Sự kiện cho các tab
tabs.forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
});
switchLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        switchTab(link.dataset.switch);
    });
});

// Hàm set thông báo và hiển thị
function showMessage(element, message, isSuccess = false) {
    element.textContent = message;
    element.className = "message " + (isSuccess ? "success" : "error");
    element.style.display = "block";
}

// Xử lý đăng nhập
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = this.loginUsername.value.trim();
    const password = this.loginPassword.value.trim();

    if (!username || !password) {
        showMessage(loginMessage, "Vui lòng điền đầy đủ thông tin!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
        showMessage(loginMessage, "Tài khoản hoặc mật khẩu không chính xác!");
        return;
    }

    showMessage(loginMessage, "Đăng nhập thành công! Đang chuyển hướng...", true);
    localStorage.setItem("currentUser", JSON.stringify(user)); // Lưu thông tin người dùng

    // Cập nhật giao diện header
    updateHeaderUI(user);

    // Chuyển hướng đến trang chính sau 1.5 giây
    setTimeout(() => {
        window.location.href = "../index.html"; // Đảm bảo đường dẫn đúng
    }, 1500);
});

// Xử lý đăng ký
registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.regEmail.value.trim();
    const fullname = this.regFullname.value.trim();
    const username = this.regUsername.value.trim();
    const password = this.regPassword.value.trim();

    // Kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage(regMessage, "Email không hợp lệ!");
        return;
    }

    // Các điều kiện mật khẩu
    if (password.length < 8) {
        showMessage(regMessage, "Mật khẩu phải có ít nhất 8 ký tự!");
        return;
    }
    if (!/[A-Z]/.test(password)) {
        showMessage(regMessage, "Mật khẩu phải có ít nhất 1 chữ cái in hoa!");
        return;
    }
    if (!/[a-z]/.test(password)) {
        showMessage(regMessage, "Mật khẩu phải có ít nhất 1 chữ cái in thường!");
        return;
    }
    if (!/[0-9]/.test(password)) {
        showMessage(regMessage, "Mật khẩu phải có ít nhất 1 chữ số!");
        return;
    }

    // Kiểm tra tên đăng nhập tồn tại chưa
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.username === username)) {
        showMessage(regMessage, "Tên đăng nhập đã tồn tại!");
        return;
    }

    // Thêm user mới vào danh sách và lưu
    users.push({ email, fullname, username, password });
    localStorage.setItem("users", JSON.stringify(users));

    showMessage(regMessage, "Đăng ký thành công! Vui lòng đăng nhập.", true);
    this.reset();

    // Chuyển tab về đăng nhập sau 1.5s
    setTimeout(() => switchTab("login"), 1500);
});

// Cập nhật giao diện header
function updateHeaderUI(user) {
    if (usernameDisplay) {
        usernameDisplay.textContent = user.fullname || user.username || "User  "; // Hiển thị tên người dùng
        usernameDisplay.style.display = "inline"; // Hiển thị tên người dùng
    }
    if (logoutBtn) {
        logoutBtn.style.display = "inline-block"; // Hiển thị nút đăng xuất
    }
    if (loginLink) {
        loginLink.style.display = "none"; // Ẩn link đăng nhập
    }
}

// Hiển thị tên người dùng và nút đăng xuất nếu đã đăng nhập
window.addEventListener("DOMContentLoaded", () => {
    const userStr = localStorage.getItem("currentUser");
    const user = userStr ? JSON.parse(userStr) : null;

    if (user) {
        updateHeaderUI(user); // Cập nhật giao diện nếu đã đăng nhập
    } else {
        // Nếu chưa đăng nhập, hiển thị giao diện mặc định
        const loginLink = document.getElementById("login-link");
        const usernameDisplay = document.getElementById("usernameDisplay");
        const logoutBtn = document.getElementById("logoutBtn");

        loginLink.style.display = "inline"; // Hiển thị link đăng nhập
        usernameDisplay.style.display = "none"; // Ẩn tên người dùng
        logoutBtn.style.display = "none"; // Ẩn nút đăng xuất
    }
});

// Xử lý đăng xuất
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.reload(); // Tải lại trang để cập nhật giao diện
});
