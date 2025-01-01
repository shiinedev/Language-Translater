// Initialize local storage
if (!localStorage.getItem('jobs')) {
    localStorage.setItem('jobs', JSON.stringify([]));
}

if (!localStorage.getItem('applications')) {
    localStorage.setItem('applications', JSON.stringify([]));
}

if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([
        
        { username: 'shine', password: '12', isAdmin: false }
    ]));
}

// DOM elements
const mainContent = document.getElementById('mainContent');
const sidebar = document.getElementById('sidebar');
const homeLink = document.getElementById('homeLink');
const jobListingsLink = document.getElementById('jobListingsLink');
const loginLink = document.getElementById('loginLink');
const postJobBtn = document.getElementById('postJobBtn');
const viewApplicationsBtn = document.getElementById('viewApplicationsBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Event listeners
homeLink.addEventListener('click', showHome);
jobListingsLink.addEventListener('click', showJobListings);
loginLink.addEventListener('click', showLoginForm);
postJobBtn.addEventListener('click', showPostJobForm);
viewApplicationsBtn.addEventListener('click', showApplications);
logoutBtn.addEventListener('click', logout);

// Functions to show different pages
function showHome() {
    mainContent.innerHTML = `
        <h2>Welcome to Job Portal</h2>
        <p>Find your dream job or post job openings.</p>
    `;
}

function showJobListings() {
    const jobs = JSON.parse(localStorage.getItem('jobs'));
    let jobListingsHTML = '<h2>Job Listings</h2>';

    if (jobs.length === 0) {
        jobListingsHTML += '<p>No jobs available at the moment.</p>';
    } else {
        jobs.forEach((job, index) => {
            jobListingsHTML += `
                <div class="job-listing">
                    <h3>${job.title}</h3>
                    <p>${job.description}</p>
                    <p><strong>Company:</strong> ${job.company}</p>
                    <button onclick="applyForJob(${index})">Apply</button>
                </div>
            `;
        });
    }

    mainContent.innerHTML = jobListingsHTML;
}

function showLoginForm() {
    mainContent.innerHTML = `
        <div class="login-form">
            <h2>Login</h2>
            <form id="loginForm">
                <input type="text" id="username" placeholder="Username" required>
                <input type="password" id="password" placeholder="Password" required>
                <button type="submit">Login</button>
            </form>
            <p id="loginError" class="error-message"></p>
        </div>
    `;
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.username === username && u.password === password);

    if (user && user.isAdmin) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        showAdminDashboard();
    }else if(user && !user.isAdmin){
        showPostJobForm();
    } else {
        document.getElementById('loginError').textContent = 'Invalid username or password';
    }
}

function showAdminDashboard() {
    sidebar.classList.remove('hidden');
    loginLink.classList.add('hidden');
    showPostJobForm();
}

function showPostJobForm() {
    mainContent.innerHTML = `
        <h2>Post a New Job</h2>
        <form id="jobForm">
            <input type="text" id="jobTitle" placeholder="Job Title" required>
            <input type="text" id="company" placeholder="Company" required>
            <textarea id="jobDescription" placeholder="Job Description" required></textarea>
            <button type="submit">Post Job</button>
        </form>
    `;
    document.getElementById('jobForm').addEventListener('submit', postJob);
}

function showApplications() {
    const applications = JSON.parse(localStorage.getItem('applications'));
    const jobs = JSON.parse(localStorage.getItem('jobs'));
    let applicationsHTML = '<h2>Job Applications</h2>';

    if (applications.length === 0) {
        applicationsHTML += '<p>No applications received yet.</p>';
    } else {
        applications.forEach((application, index) => {
            const job = jobs[application.jobIndex];
            applicationsHTML += `
                <div class="application">
                    <p><strong>Job:</strong> ${job.title}</p>
                    <p><strong>Applicant:</strong> ${application.name}</p>
                    <p><strong>Email:</strong> ${application.email}</p>
                </div>
            `;
        });
    }

    mainContent.innerHTML = applicationsHTML;
}

function postJob(e) {
    e.preventDefault();

    const jobTitle = document.getElementById('jobTitle').value;
    const company = document.getElementById('company').value;
    const jobDescription = document.getElementById('jobDescription').value;

    const jobs = JSON.parse(localStorage.getItem('jobs'));
    jobs.push({ title: jobTitle, company, description: jobDescription });
    localStorage.setItem('jobs', JSON.stringify(jobs));

    alert('Job posted successfully!');
    showJobListings();
}

function applyForJob(jobIndex) {
    const name = prompt('Enter your name:');
    const email = prompt('Enter your email:');

    if (name && email) {
        const applications = JSON.parse(localStorage.getItem('applications'));
        applications.push({ jobIndex, name, email });
        localStorage.setItem('applications', JSON.stringify(applications));
        alert('Application submitted successfully!');
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    sidebar.classList.add('hidden');
    loginLink.classList.remove('hidden');
    showHome();
}

// Check if user is logged in
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.isAdmin) {
        showAdminDashboard();
    } else {
        showHome();
    }
}

// Initial page load
checkAuth();