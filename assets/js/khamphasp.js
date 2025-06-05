(function () {
    const images = [
   
        './assets/img/tranhsen2.png',
        './assets/img/tranhsen3.png',
        './assets/img/tranhsen4.png',
        './assets/img/tranhsen5.png',
        './assets/img/tranhsen6.png',
        './assets/img/tranhsen8.png',
        './assets/img/tranhsen1.png',
        './assets/img/tranhsen7.png',
    ];
    const gallery = document.getElementById('gallery'); 

    images.forEach((src, index) => {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Image ' + (index + 1);

        card.appendChild(img);
        gallery.appendChild(card);
    });

    // Hiệu ứng nghiêng khi di chuyển chuột
    const cards = gallery.querySelectorAll('.card'); 

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const centerX = rect.left + width / 2;
            const centerY = rect.top + height / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            const rotateX = Math.max(Math.min((mouseY / height) * 75, 75), -75);
            const rotateY = Math.max(Math.min((mouseX / width) * -75, 75), -75);

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.2s ease';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
})();

 
