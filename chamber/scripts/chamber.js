document.addEventListener('DOMContentLoaded', () => {
    const year = document.getElementById('year');
    const lastModified = document.getElementById('last-modified');
    year.textContent = new Date().getFullYear();
    lastModified.textContent = document.lastModified;

    getMembers();
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
