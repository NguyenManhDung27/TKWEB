const toggle = document.getElementById('toggle');
const menu = document.getElementById('menu');

toggle.addEventListener('click', () => {
  menu.classList.toggle('show');
});

const btns = menu.querySelectorAll('.btn');

btns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const href = btn.getAttribute('href');

    // Chỉ chặn hành vi mặc định nếu là menu cha (href="#")
    if (href === '#') {
      e.preventDefault();
    }

    // Active trạng thái menu
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Dropdown menu trên mobile
    if (window.innerWidth <= 640) {
      const drop = btn.nextElementSibling;
      if (drop?.classList.contains('drop')) {
        drop.classList.toggle('show');
      }
    }

    console.log('Danh mục:', btn.dataset.cat);
  });
});
