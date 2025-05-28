document.addEventListener('DOMContentLoaded', function () {
    const searchIcon = document.getElementById('searchIcon');
    const searchInput = document.getElementById('searchInput');
    const backButton = document.getElementById('backButton');
  
    const items = document.querySelectorAll('.row.g-4 > div');
  
    searchIcon.addEventListener('click', function () {
      const keyword = searchInput.value.toLowerCase().trim();
      let found = false;
  
      items.forEach(item => {
        const content = item.innerText.toLowerCase();
        if (content.includes(keyword)) {
          item.style.display = 'flex';
          found = true;
        } else {
          item.style.display = 'none';
        }
      });
  
      if (backButton) {
        backButton.style.display = found ? 'block' : 'none';
      }
    });
  
    window.showAllItems = function () {
      items.forEach(item => {
        item.style.display = 'flex';
      });
      if (backButton) {
        backButton.style.display = 'none';
      }
      searchInput.value = '';
    };
  });
  