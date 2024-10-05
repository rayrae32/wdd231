// Set current year and last modified date
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Course list array
const courses = [
    { code: "CSE 110", name: "Introduction to programming", credits: 2, completed: true },
    { code: "WDD 130", name: "Web fundamentals", credits: 2, completed: true },
    { code: "CSE 111", name: "Programming with functions", credits: 2, completed: true },
    {code: "CSE 210", name: "Programming with Classes", credits: 2, completed: true },
    { code: "WDD 131", name: "Dynamics web fundamentals ", credits: 2, completed: true },
    { code: "WDD 231", name: "Web frontend development I", credits: 2, completed: false }
];

// Display all courses
function displayCourses(courseArray) {
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = ""; // Clear existing courses
    courseArray.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");
        if (course.completed) {
            courseCard.classList.add("completed");
        }
        courseCard.innerHTML = `<h3>${course.code}</h3><p>${course.name}</p><p>Credits: ${course.credits}</p>`;
        courseList.appendChild(courseCard);
    });
}

// Filter functions
document.getElementById("show-all").addEventListener("click", () => displayCourses(courses));
document.getElementById("show-cse").addEventListener("click", () => displayCourses(courses.filter(course => course.code.startsWith("CSE"))));
document.getElementById("show-wdd").addEventListener("click", () => displayCourses(courses.filter(course => course.code.startsWith("WDD"))));

// Calculate total credits
function calculateTotalCredits(courseArray) {
    return courseArray.reduce((total, course) => total + course.credits, 0);
}

// Update total credits
function updateTotalCredits() {
    const displayedCourses = Array.from(document.getElementById("course-list").children);
    const credits = displayedCourses.reduce((total, courseCard) => {
        const creditsText = courseCard.querySelector('p:nth-child(3)').textContent;
        const credits = parseInt(creditsText.replace('Credits: ', ''));
        return total + credits;
    }, 0);
    document.getElementById("total-credits").textContent = credits;
}

// Initial display
displayCourses(courses);
updateTotalCredits();

// Toggle menu for small screens
document.getElementById("menu-toggle").addEventListener("click", () => {
    document.getElementById("nav-menu").classList.toggle("show");
});

