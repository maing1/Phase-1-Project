
document.addEventListener('DOMContentLoaded', () => {
  const catList = document.getElementById('cat-list');
  const searchInput = document.getElementById('search');
  const searchBtn = document.getElementById('searchBtn');
  const adoptionMessage = document.getElementById('adoption-message');
  const catFact = document.getElementById('cat-fact');
  const newFactBtn = document.getElementById('new-fact-btn');

  // Fetch cats from local API
  const fetchCats = (breed = '') => {
    fetch('http://localhost:3000/cats')
      .then(response => response.json())
      .then(cats => {
        if (breed) {
          cats = cats.filter(cat => cat.breed.toLowerCase().includes(breed.toLowerCase()));
        }
        displayCats(cats);
      });
  };

  // Display list of cats
  const displayCats = (cats) => {
    catList.innerHTML = '';
    cats.forEach(cat => {
      const catCard = document.createElement('div');
      catCard.classList.add('cat-card');
      catCard.innerHTML = `
        <h3>${cat.name}</h3>
        <img id="kitty-image" src="${cat.image}" alt="kitty" />
        <p>Breed: ${cat.breed}</p>
        <p>Age: ${cat.age} years old</p>
        <button class="adoptBtn" data-id="${cat.id}" ${cat.isAdopted ? 'disabled' : ''}>
          ${cat.isAdopted ? 'Adopted' : 'Adopt'}
        </button>
      `;
      catList.appendChild(catCard);
    });

    document.querySelectorAll('.adoptBtn').forEach(btn => {
      btn.addEventListener('click', adoptCat);
    });
  };

  // Handle adoption
  const adoptCat = (e) => {
    const catId = e.target.getAttribute('data-id');
    fetch(`http://localhost:3000/cats/${catId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isAdopted: true
      })
    })
    .then(response => response.json())
    .then(updatedCat => {
      adoptionMessage.innerHTML = `Kitty ${updatedCat.name} has been adopted!`;
      e.target.innerHTML = 'Adopted';
      e.target.disabled = true;
    })
    
  };

  // Fetch random cat fact from external API
  const fetchCatFact = () => {
    fetch('https://meowfacts.herokuapp.com/')
      .then(response => response.json())
      .then(data => {
        catFact.innerText = data.data[0]; // Show the first cat fact in the response
      })
    
  };

  // Search event
  searchBtn.addEventListener('click', () => {
    const breed = searchInput.value;
    fetchCats(breed);
  });

  // Event listener for search input
  searchInput.addEventListener('input', () => {
    if (!searchInput.value) fetchCats(); // If search input is cleared, fetch all cats
  });

  // Fetch a new cat fact on button click
  newFactBtn.addEventListener('click', fetchCatFact);

  // Initial fetch of cats and random cat fact on page load
  fetchCats();
  fetchCatFact();
});
