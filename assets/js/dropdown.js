 // Toggle menu mobile
 const toggle = document.getElementById('toggle');
 const menu = document.getElementById('menu');
 toggle.addEventListener('click', () => menu.classList.toggle('show'));

 // Xử lý nút và dropdown
 const btns = menu.querySelectorAll('.btn');
 btns.forEach(btn => {
     btn.addEventListener('click', () => {
         // Active
         btns.forEach(b => b.classList.remove('active'));
         btn.classList.add('active');
         // Dropdown mobile
         if (window.innerWidth <= 640) {
             const drop = btn.nextElementSibling;
             if (drop?.classList.contains('drop')) {
                 drop.classList.toggle('show');
             }
         }
         // Log danh mục
         console.log('Danh mục:', btn.dataset.cat);
     });
 });