fetch('data/members.json')
  .then(response => response.json())
  .then(data => {
    const goldAndSilverMembers = data.members.filter(member => member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver');
    const selectedMembers = getRandomMembers(goldAndSilverMembers, 3);
    displaySpotlights(selectedMembers);
  })
  .catch(error => console.error('Error fetching members:', error));

function getRandomMembers(members, count) {
  let shuffled = members.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function displaySpotlights(members) {
  const spotlights = document.getElementById('company-spotlights');
  members.forEach(member => {
    spotlights.innerHTML += `
      <div class="member">
        <img src="${member.logo}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>Phone: ${member.phone}</p>
        <p>Address: ${member.address}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p>Membership Level: ${member.membershipLevel}</p>
      </div>
    `;
  });
}
