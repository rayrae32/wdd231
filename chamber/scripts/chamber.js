document.addEventListener('DOMContentLoaded', () => {
    const year = document.getElementById('year');
    const lastModified = document.getElementById('last-modified');
    year.textContent = new Date().getFullYear();
    lastModified.textContent = document.lastModified;

    getMembers();
});

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
