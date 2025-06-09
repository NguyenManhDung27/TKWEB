
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

    loginMessage.style.display = "none";
    regMessage.style.display = "none";
}

tabs.forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
});
switchLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        switchTab(link.dataset.switch);
    });
});

// Hiển thị thông báo
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
    localStorage.setItem("currentUser", JSON.stringify(user));
    updateHeaderUI(user);

    setTimeout(() => {
        window.location.href = "../index.html";
    }, 1500);
});

// Xử lý đăng ký
registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.regEmail.value.trim();
    const fullname = this.regFullname.value.trim();
    const username = this.regUsername.value.trim();
    const password = this.regPassword.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage(regMessage, "Email không hợp lệ!");
        return;
    }

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

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.username === username)) {
        showMessage(regMessage, "Tên đăng nhập đã tồn tại!");
        return;
    }

    users.push({ email, fullname, username, password });
    localStorage.setItem("users", JSON.stringify(users));

    showMessage(regMessage, "Đăng ký thành công! Vui lòng đăng nhập.", true);
    this.reset();

    setTimeout(() => switchTab("login"), 1500);
});

// Cập nhật giao diện khi đã đăng nhập
function updateHeaderUI(user) {
    if (usernameDisplay) {
        usernameDisplay.textContent = user.username;
        usernameDisplay.style.display = "inline";
    }
    if (logoutBtn) {
        logoutBtn.style.display = "inline-block";
    }
    if (loginLink) {
        loginLink.style.display = "none";
    }
}

