document.querySelectorAll('.info-item .btn').forEach(function
  (button){
  button.addEventListener('click', function(){
    document.querySelector('.container').classList.toggle
    ('log-in');
  })
})

function register(event){
  event.preventDefault();
  let username = document.getElementById('regUsername').value.trim();
  let password = document.getElementById('regPassword').value.trim();
  let email = document.getElementById('regEmail').value.trim();
  let fullName = document.getElementById('regFullName').value.trim();
  let regMessage = document.getElementById('regMessage');

  let lowerCaseLeter = /[a-z]/g;
  let upperCaseLeter =/[A-Z]/g;
  let numbers = /[0-9]/g;

  regMessage.style.color='red';

  if (!username || !password || !email || !fullName){
    regMessage.innerText="Vui lòng điền đầy đủ thông tin!";
    return;
  }

  if(password.length <8){
    regMessage.innerText='Mật khẩu phải có ít nhất 8 ký tự!';
    return;
  }
  if(!lowerCaseLeter.test(password)){
    regMessage.innerText='Mật khẩu phải gồm ít nhất 1 chữ cái in thường!';
    return;
  }
  if(!upperCaseLeter.test(password)){
    regMessage.innerText='Mật khẩu phải gồm ít nhất 1 chữ cái in hoa!';
    return;
  }
  if(!numbers.test(password)){
    regMessage.innerText='Mật khẩu phải bao gồm ít nhất 1 chữ số!';
    return;
  }

  let user ={
    username: username,
    password: password,
    fullName: fullName,
    email: email,
  };

  let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {};

  if(users[username]){
    regMessage.innerText = 'Username đã tồn tại!';

  } else{
    users[username] = user;
    localStorage.setItem('users', JSON.stringify(users));
    regMessage.innerText ='Đăng ký thành công!';
    regMessage.style.color = 'green';
  }
}

function login(event){
  event.preventDefault();

  let username = document.getElementById('loginUsername').value.trim();
  let password = document.getElementById('loginPassword').value.trim();
  let regMessage = document.getElementById('loginMessage');

  let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')): {};

  let storeUser = users[username];

  if(storeUser && storeUser.password === password){
    localStorage.setItem('loggedInUser', JSON.stringify(storeUser));
    window.location.href = '../index.html';

  } else {
    regMessage.innerText = 'Tên đăng nhập hoặc mật khẩu không hợp lệ';
    regMessage.style.color = 'red';
  }
}

window.onload = function () {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        const loginLink = document.getElementById('login-link');
        const logoutBtn = document.getElementById('logoutBtn');
        const usernameDisplay = document.getElementById('usernameDisplay');

      if (user) {
      //  Hiển thị tên và nút đăng xuất
        loginLink.style.display = 'none';
        usernameDisplay.textContent = user.fullName || user.username;
        usernameDisplay.style.display = 'inline';
        logoutBtn.style.display = 'inline-block';
      }

        logoutBtn.addEventListener('click', function () {
      //  Đăng xuất: xoá user, reload
        localStorage.removeItem('loggedInUser');
        window.location.reload();
        });
      };
//function logout(){
// window.location.href = 'login.html';
//}