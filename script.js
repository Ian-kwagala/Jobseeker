document.addEventListener('DOMContentLoaded', () => {

    // --- Selectors ---
    const loader = document.getElementById('loader');
    const jobGrid = document.getElementById('jobGrid');
    const searchForm = document.getElementById('searchForm');
    const keywordSearch = document.getElementById('keywordSearch');
    const locationSearch = document.getElementById('locationSearch');
    const registrationForm = document.getElementById('registrationForm');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    // --- Sample Job Data (Expanded) ---
    const allJobs = [
        {
            title: 'Senior Software Engineer',
            company: 'TechNova Solutions',
            location: 'Kampala',
            salary: 'UGX 2,500,000 - 3,500,000',
            type: 'Full-time',
            workHours: 'Full-time (Monday - Friday, 9:00 AM - 5:00 PM)',
            deadline: 'March 15, 2024',
            description: 'We\'re seeking an experienced Software Engineer to join our growing tech team. You\'ll be responsible for developing cutting-edge web applications and mobile solutions for our clients.',
            duties: ['Design and develop scalable web applications', 'Collaborate with cross-functional teams', 'Write clean, maintainable, and efficient code'],
            qualifications: ['Bachelor\'s in Computer Science or related field', '3+ years experience in web development', 'React, Node.js, Python expertise'],
            postedDate: 'Feb 20, 2024'
        },
        {
            title: 'Marketing Manager',
            company: 'Uganda Beverages Ltd',
            location: 'Jinja',
            salary: 'UGX 1,800,000 - 2,500,000',
            type: 'Full-time',
            workHours: 'Full-time (Monday - Friday, 8:30 AM - 5:30 PM)',
            deadline: 'March 20, 2024',
            description: 'Join our dynamic marketing team to drive brand awareness and market penetration across Uganda. You’ll lead strategic marketing initiatives and manage a team of marketing professionals.',
            duties: ['Develop and execute comprehensive marketing strategies', 'Manage marketing budget and ROI analysis', 'Oversee digital marketing campaigns'],
            qualifications: ['Bachelor\'s in Marketing, Business Administration', '5+ years marketing experience', 'Team leadership experience'],
            postedDate: 'Feb 18, 2024'
        },
        {
            title: 'Registered Nurse',
            company: 'Mulago National Referral Hospital',
            location: 'Kampala',
            salary: 'UGX 800,000 - 1,200,000',
            type: 'Full-time',
            workHours: 'Shift work (Day/Night shifts, including weekends)',
            deadline: 'March 25, 2024',
            description: 'We are looking for compassionate and skilled Registered Nurses to provide excellent patient care in our medical and surgical units. Join Uganda’s premier healthcare institution.',
            duties: ['Provide direct patient care and nursing interventions', 'Administer medications and monitor patient responses', 'Collaborate with healthcare team members'],
            qualifications: ['Bachelor’s in Nursing (BSN) or Diploma in Nursing', 'Valid nursing license from Uganda Nurses and Midwives Council', '2+ years clinical experience preferred'],
            postedDate: 'Feb 23, 2024'
        },
        {
            title: 'Data Analyst',
            company: 'SafeBoda',
            location: 'Kampala',
            salary: 'Competitive',
            type: 'Full-time',
            workHours: 'Full-time (Flexible hours)',
            deadline: 'April 01, 2024',
            description: 'Analyze large datasets to provide actionable insights that will drive product and business decisions for one of Africa\'s leading ride-hailing platforms.',
            duties: ['Interpret data, analyze results using statistical techniques', 'Develop and implement databases, data collection systems', 'Identify, analyze, and interpret trends in complex data sets'],
            qualifications: ['Proven working experience as a Data Analyst', 'Strong knowledge of SQL and Python/R', 'Experience with data visualization tools (Tableau, Power BI)'],
            postedDate: 'Feb 25, 2024'
        },
    ];

    // --- Utility Functions ---
    const showLoader = () => loader.style.display = 'flex';
    const hideLoader = () => loader.style.display = 'none';
    
    // --- Function to Display Jobs ---
    const displayJobs = (jobs) => {
        jobGrid.innerHTML = '';
        if (jobs.length === 0) {
            jobGrid.innerHTML = '<p class="no-jobs-found">No jobs found matching your criteria. Please try a different search.</p>';
            return;
        }

        jobs.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.classList.add('job-card');

            // Using template literals for cleaner HTML generation
            jobCard.innerHTML = `
                <div class="card-header">
                    <span class="job-type">${job.type}</span>
                    <h3>${job.title}</h3>
                    <p class="company">${job.company}</p>
                    <div class="job-meta">
                        <span><i class="fa-solid fa-location-dot"></i> ${job.location}</span>
                        <span><i class="fa-solid fa-wallet"></i> ${job.salary}</span>
                        <span><i class="fa-solid fa-clock"></i> ${job.workHours}</span>
                        <span><i class="fa-solid fa-calendar-times"></i> Deadline: ${job.deadline}</span>
                    </div>
                </div>
                <div class="card-body">
                    <h4>Job Description</h4>
                    <p>${job.description}</p>
                    <h4>Key Duties</h4>
                    <ul>${job.duties.map(duty => `<li>${duty}</li>`).join('')}</ul>
                    <h4>Required Qualifications</h4>
                    <ul>${job.qualifications.map(q => `<li>${q}</li>`).join('')}</ul>
                </div>
                <div class="card-footer">
                    <span class="posted-date">Posted: ${job.postedDate}</span>
                    <a href="#" class="btn btn-primary">Apply Now</a>
                </div>
            `;
            jobGrid.appendChild(jobCard);
        });
    };

    // --- Event Listeners ---
    // Mobile Menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Search Functionality with Loader
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showLoader();

        // Simulate network delay for a better user experience
        setTimeout(() => {
            const keyword = keywordSearch.value.toLowerCase();
            const location = locationSearch.value.toLowerCase();

            const filteredJobs = allJobs.filter(job => {
                const searchCorpus = `${job.title} ${job.company} ${job.description}`.toLowerCase();
                const locationMatch = job.location.toLowerCase().includes(location);
                const keywordMatch = searchCorpus.includes(keyword);
                
                return keywordMatch && locationMatch;
            });

            displayJobs(filteredJobs);
            hideLoader();
        }, 800); // 0.8 second delay
    });

    // Registration Form Submission with Loader
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showLoader();

        // Simulate network delay for form submission
        setTimeout(() => {
            const formData = new FormData(registrationForm);
            const name = formData.get('fullName');
            
            alert(`Thank you for registering, ${name}! Our team will review your profile and contact you with suitable opportunities.`);
            
            registrationForm.reset();
            hideLoader();
        }, 1200); // 1.2 second delay
    });

    // --- Initial Display of All Jobs on Page Load ---
    displayJobs(allJobs);
});

document.addEventListener('DOMContentLoaded', () => {

    // --- Selectors ---
    const loader = document.getElementById('loader');
    const jobGrid = document.getElementById('jobGrid');
    const searchForm = document.getElementById('searchForm');
    const keywordSearch = document.getElementById('keywordSearch');
    const locationSearch = document.getElementById('locationSearch');
    const registrationForm = document.getElementById('registrationForm');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    // --- Sample Job Data (Expanded) ---
    const allJobs = [
        {
            title: 'Senior Software Engineer', company: 'TechNova Solutions', location: 'Kampala',
            salary: 'UGX 2,500,000 - 3,500,000', type: 'Full-time',
            workHours: 'Full-time (Monday - Friday, 9:00 AM - 5:00 PM)', deadline: 'March 15, 2024',
            description: 'We\'re seeking an experienced Software Engineer to join our growing tech team. You\'ll be responsible for developing cutting-edge web applications and mobile solutions for our clients.',
            duties: ['Design and develop scalable web applications', 'Collaborate with cross-functional teams', 'Write clean, maintainable, and efficient code'],
            qualifications: ['Bachelor\'s in Computer Science or related field', '3+ years experience in web development', 'React, Node.js, Python expertise'],
            postedDate: 'Feb 20, 2024'
        },
        {
            title: 'Marketing Manager', company: 'Uganda Beverages Ltd', location: 'Jinja',
            salary: 'UGX 1,800,000 - 2,500,000', type: 'Full-time',
            workHours: 'Full-time (Monday - Friday, 8:30 AM - 5:30 PM)', deadline: 'March 20, 2024',
            description: 'Join our dynamic marketing team to drive brand awareness and market penetration across Uganda. You’ll lead strategic marketing initiatives and manage a team of marketing professionals.',
            duties: ['Develop and execute comprehensive marketing strategies', 'Manage marketing budget and ROI analysis', 'Oversee digital marketing campaigns'],
            qualifications: ['Bachelor\'s in Marketing, Business Administration', '5+ years marketing experience', 'Team leadership experience'],
            postedDate: 'Feb 18, 2024'
        },
        {
            title: 'Registered Nurse', company: 'Mulago National Referral Hospital', location: 'Kampala',
            salary: 'UGX 800,000 - 1,200,000', type: 'Full-time',
            workHours: 'Shift work (Day/Night shifts, including weekends)', deadline: 'March 25, 2024',
            description: 'We are looking for compassionate and skilled Registered Nurses to provide excellent patient care in our medical and surgical units. Join Uganda’s premier healthcare institution.',
            duties: ['Provide direct patient care and nursing interventions', 'Administer medications and monitor patient responses', 'Collaborate with healthcare team members'],
            qualifications: ['Bachelor’s in Nursing (BSN) or Diploma in Nursing', 'Valid nursing license from Uganda Nurses and Midwives Council', '2+ years clinical experience preferred'],
            postedDate: 'Feb 23, 2024'
        },
        {
            title: 'Data Analyst', company: 'SafeBoda', location: 'Kampala',
            salary: 'Competitive', type: 'Full-time',
            workHours: 'Full-time (Flexible hours)', deadline: 'April 01, 2024',
            description: 'Analyze large datasets to provide actionable insights that will drive product and business decisions for one of Africa\'s leading ride-hailing platforms.',
            duties: ['Interpret data, analyze results using statistical techniques', 'Develop and implement databases, data collection systems', 'Identify, analyze, and interpret trends in complex data sets'],
            qualifications: ['Proven working experience as a Data Analyst', 'Strong knowledge of SQL and Python/R', 'Experience with data visualization tools (Tableau, Power BI)'],
            postedDate: 'Feb 25, 2024'
        },
    ];

    // --- Utility Functions ---
    const showLoader = () => loader.style.display = 'flex';
    const hideLoader = () => loader.style.display = 'none';
    
    // --- Function to Display Jobs ---
    const displayJobs = (jobs) => {
        jobGrid.innerHTML = '';
        if (jobs.length === 0) {
            jobGrid.innerHTML = '<p class="no-jobs-found" style="text-align:center; grid-column: 1 / -1;">No jobs found matching your criteria. Please try a different search.</p>';
            return;
        }
        jobs.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.classList.add('job-card');
            jobCard.innerHTML = `
                <div class="card-header">
                    <span class="job-type">${job.type}</span>
                    <h3>${job.title}</h3>
                    <p class="company">${job.company}</p>
                    <div class="job-meta">
                        <span><i class="fa-solid fa-location-dot"></i> ${job.location}</span>
                        <span><i class="fa-solid fa-wallet"></i> ${job.salary}</span>
                        <span><i class="fa-solid fa-clock"></i> ${job.workHours}</span>
                        <span><i class="fa-solid fa-calendar-times"></i> Deadline: ${job.deadline}</span>
                    </div>
                </div>
                <div class="card-body">
                    <h4>Job Description</h4>
                    <p>${job.description}</p>
                    <h4>Key Duties</h4>
                    <ul>${job.duties.map(duty => `<li>${duty}</li>`).join('')}</ul>
                    <h4>Required Qualifications</h4>
                    <ul>${job.qualifications.map(q => `<li>${q}</li>`).join('')}</ul>
                </div>
                <div class="card-footer">
                    <span class="posted-date">Posted: ${job.postedDate}</span>
                    <a href="#" class="btn btn-primary">Apply Now</a>
                </div>
            `;
            jobGrid.appendChild(jobCard);
        });
    };

    // --- Event Listeners ---
    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // **IMPROVEMENT:** Close mobile menu if window is resized to desktop width
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
        }
    });

    // Search Functionality with Loader
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showLoader();
        setTimeout(() => {
            const keyword = keywordSearch.value.toLowerCase();
            const location = locationSearch.value.toLowerCase();
            const filteredJobs = allJobs.filter(job => {
                const searchCorpus = `${job.title} ${job.company} ${job.description}`.toLowerCase();
                const locationMatch = job.location.toLowerCase().includes(location);
                const keywordMatch = searchCorpus.includes(keyword);
                return keywordMatch && locationMatch;
            });
            displayJobs(filteredJobs);
            hideLoader();
        }, 800);
    });

    // Registration Form Submission with Loader
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!registrationForm.checkValidity()) {
            registrationForm.reportValidity();
            return;
        }
        showLoader();
        setTimeout(() => {
            const formData = new FormData(registrationForm);
            const name = formData.get('fullName');
            alert(`Thank you for registering, ${name}! Our team will review your profile and contact you with suitable opportunities.`);
            registrationForm.reset();
            hideLoader();
        }, 1200);
    });

    // --- Initial Display of All Jobs ---
    displayJobs(allJobs);
});