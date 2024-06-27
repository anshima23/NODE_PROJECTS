document.addEventListener('DOMContentLoaded', function() {
    const allButtons = document.querySelectorAll('.searchBtn');
    const searchBar = document.getElementById('searchBar'); // Replace 'searchBar' with the actual ID of your search bar
    const searchInput = document.getElementById('searchInput'); // Replace 'searchInput' with the actual ID of your search input
    const searchClose = document.getElementById('searchClose'); // Replace 'searchClose' with the actual ID of your search close button

    for (var i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener('click', function() {
            searchBar.style.visibility = 'visible';
            searchBar.classList.add('open');
            this.setAttribute('aria-expanded', 'true');
            searchInput.focus();
        });
    }

    searchClose.addEventListener('click', function() {
        searchBar.style.visibility = 'hidden';
        searchBar.classList.remove('open');
        this.setAttribute('aria-expanded', 'false');
        searchInput.focus();
    });

    // Additional event listener to handle search input
    searchInput.addEventListener('input', function() {
        // Handle the input value, you can display it on the screen or perform other actions
        console.log('Search input:', this.value);
    });
});
