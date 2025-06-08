document.addEventListener("DOMContentLoaded", function () {
    const userStr = localStorage.getItem("currentUser");
    const user = userStr ? JSON.parse(userStr) : null;

    const usernameDisplay = document.getElementById("usernameDisplay");
    const logoutBtn = document.getElementById("logoutBtn");
    const loginLink = document.getElementById("login-link");

    if (user) {
        if (usernameDisplay) {
            usernameDisplay.textContent = user.fullname || user.username;
            usernameDisplay.style.display = "inline";
        }
        if (logoutBtn) logoutBtn.style.display = "inline-block";
        if (loginLink) loginLink.style.display = "none";
    } else {
        if (usernameDisplay) usernameDisplay.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "none";
        if (loginLink) loginLink.style.display = "inline";
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            window.location.reload();
        });
    }
});