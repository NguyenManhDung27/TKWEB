// login.js - Dùng chung cho tất cả các trang có đăng nhập/đăng ký và hiển thị trạng thái user

// Hàm hiển thị thông báo
function showMessage(element, message, success = false) {
    if (!element) return;
    element.textContent = message;
    element.className = "message " + (success ? "success" : "error");
    element.style.display = "block";
}

// Cập nhật trạng thái đăng nhập
function updateAuthStatus() {
    const userJSON = localStorage.getItem('currentUser ');
    const user = userJSON ? JSON.parse(userJSON) : null;

    const loginLink = document.getElementById('login-link');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const logoutBtn = document.getElementById('logoutBtn');

    if (!loginLink || !usernameDisplay || !logoutBtn) {
        return; // Nếu không có các element này, không làm gì
    }

    if (user && user.username) {
        // Đã đăng nhập: ẩn link đăng nhập, hiện username và nút đăng xuất
        loginLink.style.display = 'none';
        usernameDisplay.textContent = user.username;
        usernameDisplay.style.display = 'inline';
        logoutBtn.style.display = 'inline-block';
    } else {
        // Chưa đăng nhập: hiện link đăng nhập, ẩn username và nút đăng xuất
        loginLink.style.display = 'inline';
        usernameDisplay.style.display = 'none';
        logoutBtn.style.display = 'none';
    }
}

// Đăng xuất
function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser '); // Xóa thông tin đăng nhập
            window.location.reload(); // Tải lại trang để cập nhật giao diện
        });
    }
}

// Xử lý sự kiện đăng nhập
function handleLoginForm() {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const username = this.loginUsername.value.trim();
            const password = this.loginPassword.value.trim();
            const loginMessage = document.getElementById("loginMessage");

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
            localStorage.setItem("currentUser ", JSON.stringify(user)); // Lưu trạng thái đăng nhập

            setTimeout(() => {
                window.location.href = "../index.html"; // Chuyển đến trang chính (thay đổi nếu cần)
            }, 1500);
        });
    }
}

// Xử lý sự kiện đăng ký
function handleRegisterForm() {
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = this.regEmail.value.trim();
            const fullname = this.regFullname.value.trim();
            const username = this.regUsername.value.trim();
            const password = this.regPassword.value.trim();
            const regMessage = document.getElementById("regMessage");

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
                showMessage(regMessage, "Mật khẩu phải có ít nhất 1 số!");
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

            setTimeout(() => {
                switchTab("login"); // Chuyển về tab đăng nhập
            }, 1500);
        });
    }
}

// Khởi tạo các sự kiện khi DOM đã tải xong
document.addEventListener("DOMContentLoaded", () => {
    updateAuthStatus(); // Cập nhật trạng thái đăng nhập
    setupLogout(); // Thiết lập sự kiện đăng xuất
    handleLoginForm(); // Xử lý form đăng nhập
    handleRegisterForm(); // Xử lý form đăng ký
});
