document.addEventListener("DOMContentLoaded", function () {
  // Nút đăng nhập và đăng ký
  const loginBtn = document.querySelector(".card-front .btn");
  const registerBtn = document.querySelector(".card-back .btn");

  // Input Đăng nhập
  const loginEmail = document.getElementById("logemail");
  const loginPassword = document.getElementById("logpass");

  // Input Đăng ký
  const registerName = document.getElementById("logname");
  const registerEmail = document.querySelector(".card-back input[type='email']");
  const registerPassword = document.querySelector(".card-back input[type='password']");

  // Xử lý đăng nhập
  loginBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Ngăn chuyển trang

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    if (email === "" || password === "") {
      alert("Vui lòng nhập đầy đủ Email và Mật khẩu để đăng nhập.");
    } else {
      // Giả lập đăng nhập
      if (email === "admin@example.com" && password === "123456") {
        alert("Đăng nhập thành công!");
        // window.location.href = "home.html"; // nếu muốn chuyển trang
      } else {
        alert("Email hoặc mật khẩu không đúng.");
      }
    }
  });

  // Xử lý đăng ký
  registerBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Ngăn chuyển trang

    const name = registerName.value.trim();
    const email = registerEmail.value.trim();
    const password = registerPassword.value.trim();

    if (name === "" || email === "" || password === "") {
      alert("Vui lòng nhập đầy đủ thông tin để đăng ký.");
    } else {
      alert("Đăng ký thành công! Bạn có thể đăng nhập.");
      // Có thể lưu vào localStorage hoặc gửi đến server tại đây
    }
  });
});
