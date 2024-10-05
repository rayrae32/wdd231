// Set current year and last modified date
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
document.getElementById('hamburger').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
});
  

// Course list array
const courses = [
    { id: 1, code: "CSE 110", name: "Introduction to programming", credits: 2, completed: true, category: 'CSE' },
    { id: 2, code: "WDD 130", name: "Web fundamentals", credits: 2, completed: true, category: 'WDD' },
    { id: 3, code: "CSE 111", name: "Programming with functions", credits: 2, completed: true, category: 'CSE' },
    { id: 4, code: "CSE 210", name: "Programming with Classes", credits: 2, completed: true, category: 'CSE' },
    { id: 5, code: "WDD 131", name: "Dynamics web fundamentals ", credits: 2, completed: true, category: 'WDD' },
    { id: 6, code: "WDD 231", name: "Web frontend development I", credits: 2, completed: false, category: 'WDD'}
];


// Function to dynamically generate the course cards
function displayCourses(filter = 'All') {
    const coursesContainer = document.getElementById('courses-container');
    coursesContainer.innerHTML = ''; // Clear existing courses
    
    const filteredCourses = courses.filter(course => filter === 'All' || course.category === filter);
  
    filteredCourses.forEach(course => {
      const courseCard = document.createElement('div');
      courseCard.classList.add('course-card');
  
      // Apply different styling if the course is completed
      if (course.completed) {
        courseCard.classList.add('completed');
      }
  
      courseCard.innerHTML = `
        <div class="course-code">${course.code}</div>
        <div class="course-title">${course.title}</div>
        <div class="course-credits">${course.credits} credits</div>
      `;
  
      coursesContainer.appendChild(courseCard);
    });
  
    // Update the total credits displayed
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('total-credits').textContent = `Total Credits: ${totalCredits}`;
  }
  
  // Event listeners for the filter buttons
  document.getElementById('all-btn').addEventListener('click', () => displayCourses('All'));
  document.getElementById('cse-btn').addEventListener('click', () => displayCourses('CSE'));
  document.getElementById('wdd-btn').addEventListener('click', () => displayCourses('WDD'));
  
  // Initial display of all courses
  displayCourses();

