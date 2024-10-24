document.addEventListener('DOMContentLoaded', () => {
    const year = document.getElementById('year');
    const lastModified = document.getElementById('last-modified');
    year.textContent = new Date().getFullYear();
    lastModified.textContent = document.lastModified;

    getMembers();
});


document.addEventListener('DOMContentLoaded', function() {
  const visitorMessage = document.getElementById('visitorMessage');
  const lastVisit = localStorage.getItem('lastVisit');
  const currentDate = Date.now();

  // Determine the message based on the last visit date
  if (!lastVisit) {
      visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
      const daysSinceLastVisit = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));
      if (daysSinceLastVisit < 1) {
          visitorMessage.textContent = "Back so soon! Awesome!";
      } else {
          visitorMessage.textContent = `You last visited ${daysSinceLastVisit} day${daysSinceLastVisit > 1 ? 's' : ''} ago.`;
      }
  }

  // Update last visit date in localStorage
  localStorage.setItem('lastVisit', currentDate);

  // Lazy loading images
  const images = [
      { src: 'images/godchamber.jpeg', alt: 'Gold Marketing' },
      { src: 'images/golddis.jpeg', alt: 'Silver Tech Innovation' },
      { src: 'images/goldmar.jpeg', alt: 'Marketing' },
      { src: 'images/gpld.jpeg', alt: 'Gold Wings' },
      { src: 'images/people.jpeg', alt: 'people marketing' },
      { src: 'images/sil.jpeg', alt: 'Silver Innovation' },
  ];

  const photoContainer = document.querySelector('.photo-container');

  images.forEach(img => {
      const imageElement = document.createElement('img');
      imageElement.dataset.src = img.src; 
      imageElement.alt = img.alt;
      imageElement.loading = "lazy"; 

      imageElement.addEventListener('load', () => {
          imageElement.src = img.src; // Set src on load
      });

      photoContainer.appendChild(imageElement);
  });
});



// Display membership benefits modal
document.addEventListener('DOMContentLoaded', () => {
  const modals = document.querySelectorAll('.modal');
  const openButtons = document.querySelectorAll('.open-modal');
  const closeButtons = document.querySelectorAll('.close');

  // Open modal
  openButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      modals[index].style.display = 'flex';
    });
  });

  // Close modal
  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      modals.forEach((modal) => {
        modal.style.display = 'none';
      });
    });
  });

  // Close modal when clicking outside of modal content
  window.addEventListener('click', (e) => {
    modals.forEach((modal) => {
      if (e.target == modal) {
        modal.style.display = 'none';
      }
    });
  });
});

// Auto-populate hidden timestamp field with current date and time
document.addEventListener('DOMContentLoaded', () => {
  const timestampField = document.getElementById('timestamp');
  const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  timestampField.value = currentDateTime;
});

// Validate form fields
document.getElementById('joinForm').addEventListener('submit', (event) => {
  const firstName = document.querySelector('input[name="firstName"]').value;
  const lastName = document.querySelector('input[name="lastName"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const phone = document.querySelector('input[name="phone"]').value;
  const organization = document.querySelector('input[name="organization"]').value;

  // Simple validation
  if (!firstName || !lastName || !email || !phone || !organization) {
    event.preventDefault();
    alert('Please fill out all required fields.');
  }
});

// Display submitted data on thankyou.html page
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('thankyou.html')) {
    const urlParams = new URLSearchParams(window.location.search);

    // Get form values from URL parameters
    const firstName = urlParams.get('firstName');
    const lastName = urlParams.get('lastName');
    const email = urlParams.get('email');
    const phone = urlParams.get('phone');
    const organization = urlParams.get('organization');
    const timestamp = urlParams.get('timestamp');

    // Display the data
    document.getElementById('submittedName').textContent = `${firstName} ${lastName}`;
    document.getElementById('submittedEmail').textContent = email;
    document.getElementById('submittedPhone').textContent = phone;
    document.getElementById('submittedOrganization').textContent = organization;
    document.getElementById('submittedTimestamp').textContent = timestamp;
  }
});




document.addEventListener('DOMContentLoaded', () => {
    fetchMembers();
    displayDate();
  });
  
  async function fetchMembers() {
    const response = await fetch('data/members.json');
    const members = await response.json();
    const container = document.getElementById('directory-view');
    
    let memberHTML = '';
    members.forEach(member => {
      memberHTML += `
        <div class="member-card">
          <img src="${member.image}" alt="${member.name}">
          <h2>${member.name}</h2>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
        </div>`;
    });
    container.innerHTML = memberHTML;
  }
  
  function displayDate() {
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;
  }
  

async function getMembers() {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members);
}

function displayMembers(members) {
    const memberContainer = document.querySelector('.member-container');
    memberContainer.innerHTML = ''; // Clear previous content

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');
        memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>Address: ${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p>Membership Level: ${getMembershipLevel(member.membershipLevel)}</p>
        `;
        memberContainer.appendChild(memberCard);
    });
}




function getMembershipLevel(level) {
    switch (level) {
        case 1: return 'Member';
        case 2: return 'Silver Member';
        case 3: return 'Gold Member';
        default: return 'Member';
    }
}

function toggleView(view) {
    const container = document.querySelector('.member-container');
    container.classList.toggle('grid', view === 'grid');
    container.classList.toggle('list', view === 'list');
}


