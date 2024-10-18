document.addEventListener('DOMContentLoaded', () => {
  const catList = document.getElementById('cat-list');
  const searchInput = document.getElementById('search');
  const searchBtn = document.getElementById('searchBtn');
  const adoptionMessage = document.getElementById('adoption-message');

  const fetchCats = (breed = '') => {
    fetch('http://localhost:3000/cats')
      .then(response => response.json()) // Convert response to JSON
      .then(cats => {
        // Filter based on search
        if (breed) {
          cats = cats.filter(cat => cat.breed.toLowerCase().includes(breed.toLowerCase()));
        }
  
        // Display cats
        displayCats(cats);
      })
  };
  

  // Display list of cats
  const displayCats = (cats) => {
    catList.innerHTML = ''; // Clear previous list
    cats.forEach(cat => {
      const catCard = document.createElement('div');
      catCard.classList.add('cat-card');

      catCard.innerHTML = `
        <h3>${cat.name}</h3>
        <img src="" alt="">
        <p>Breed: ${cat.breed}</p>
        <p>Age: ${cat.age} years old</p>
        <button class="adoptBtn" data-id="${cat.id}">Adopt</button>
      `;

      catList.appendChild(catCard);
    });

    // Add event listener to adopt buttons (event listener 1: click)
    document.querySelectorAll('.adoptBtn').forEach(btn => {
      btn.addEventListener('click', adoptCat);
    });
  };

  // Handle adoption (adopt button click)
  const adoptCat = (e) => {
    const catId = e.target.getAttribute('data-id');
    adoptionMessage.innerHTML = `Cat with ID ${catId} has been adopted!`;
  };

  // Search event (event listener 2: search button click)
  searchBtn.addEventListener('click', () => {
    const breed = searchInput.value;
    fetchCats(breed);
  });

  // Event listener for search input (event listener 3: input change)
  searchInput.addEventListener('input', () => {
    if (!searchInput.value) fetchCats(); // If search input is cleared, fetch all cats
  });

  // Initial fetch of cats on page load
  fetchCats();
});
