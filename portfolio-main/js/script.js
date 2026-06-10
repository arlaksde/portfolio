// Load data from JSON files
async function loadData() {
    try {
        const [profileData, educationData, experienceData, projectsData, certificatesData] = await Promise.all([
            fetch('data/profile.json').then(res => res.json()),
            fetch('data/education.json').then(res => res.json()),
            fetch('data/experience.json').then(res => res.json()),
            fetch('data/projects.json').then(res => res.json()),
            fetch('data/certificates.json').then(res => res.json())
        ]);
        
        renderProfile(profileData);
        renderEducation(educationData);
        renderExperience(experienceData);
        renderProjects(projectsData);
        renderCertificates(certificatesData);
        
        // Set current year in footer
        document.getElementById('current-year').textContent = new Date().getFullYear();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Render Profile Section
function renderProfile(data) {
    document.getElementById('profile-name').textContent = data.name;
    document.getElementById('profile-description').textContent = data.description;
    document.getElementById('profile-email').textContent = data.email;
    document.getElementById('profile-phone').textContent = data.phone;
    
    const profilePic = document.getElementById('profile-pic');
    if(profilePic) {
        profilePic.src = data.profileImage;
        profilePic.alt = `${data.name}'s profile picture`;
    }
    
    const socialLinks = document.getElementById('social-links');
    socialLinks.innerHTML = ''; 
    data.socialMedia.forEach(social => {
        const link = document.createElement('a');
        link.href = social.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.innerHTML = `<i class="fab fa-${social.platform.toLowerCase()}"></i>`;
        socialLinks.appendChild(link);
    });
	
    // Render skills
    if (data.skills) {
        const skillsGrid = document.getElementById('skills-grid');
        skillsGrid.innerHTML = ''; 
        data.skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <div class="skill-icon"><i class="${skill.icon}"></i></div>
                <div>
                    <div class="skill-name">${skill.name}</div>
                    ${skill.level ? `<div class="skill-level"><div class="skill-level-bar" style="width: ${skill.level}%"></div></div>` : ''}
                </div>
            `;
            skillsGrid.appendChild(skillItem);
        });
    }	
	
    // Render CV Download Button
    if (data.cv) {
        const cvLink = document.getElementById('cv-download');
        cvLink.href = data.cv.file;
        if(cvLink.querySelector('i')) cvLink.querySelector('i').className = data.cv.icon;
        cvLink.setAttribute('download', '');
        
        // Insert CV button inside social links container
        document.getElementById('social-links').appendChild(cvLink);
    }
}

// Render Education Section
function renderEducation(data) {
    const educationList = document.getElementById('education-list');
    educationList.innerHTML = ''; 
    
    data.forEach(edu => {
        const eduItem = document.createElement('div');
        eduItem.className = 'education-item';
        eduItem.innerHTML = `
            <div class="edu-header">
                ${edu.logo ? `<img src="${edu.logo}" alt="${edu.university} logo" class="edu-logo">` : ''}
                <div>
                    <h3>${edu.university}</h3>
                    <p class="degree">${edu.major}</p>
                </div>
            </div>
            <p class="year">${edu.year}</p>
            <p>${edu.description}</p>
        `;
        educationList.appendChild(eduItem);
    });
}

// Render Experience Section
function renderExperience(data) {
    const experienceList = document.getElementById('experience-list');
    experienceList.innerHTML = ''; 
    
    data.forEach(exp => {
        const expItem = document.createElement('div');
        expItem.className = 'experience-item';
        expItem.innerHTML = `
            <div class="exp-header">
                ${exp.logo ? `<img src="${exp.logo}" alt="${exp.company} logo" class="exp-logo">` : ''}
                <div>
                    <h3>${exp.company}</h3>
                    <p class="position">${exp.position}</p>
                </div>
            </div>
            <p class="duration">${exp.year}</p>
            <p>${exp.description}</p>
        `;
        experienceList.appendChild(expItem);
    });
}

// Render Projects Section
function renderProjects(data) {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = ''; 
    
    data.forEach(project => {
        // Render Project Tags (Tech Stack) if available
        let techTagsHTML = '';
        if (project.techStack) {
            techTagsHTML = `<div class="project-tags" style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 0.8rem 0;">`;
            project.techStack.forEach(tech => {
                techTagsHTML += `<span class="tech-tag" style="background: rgba(52, 152, 219, 0.1); color: var(--primary-color); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem; font-weight: 500;">${tech}</span>`;
            });
            techTagsHTML += `</div>`;
        }

        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image ? project.image : 'https://placehold.co/600x400?text=No+Image'}" alt="${project.title}" onerror="this.src='https://placehold.co/600x400?text=No+Image'">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <div class="project-meta">
                    <span><i class="fas fa-calendar-alt"></i> ${project.year}</span>
                    ${project.fund ? `<span><i class="fas fa-money-bill-wave"></i> ${project.fund}</span>` : ''}
                    ${project.partner ? `<span><i class="fas fa-users"></i> ${project.partner}</span>` : ''}
                    ${project.role ? `<span><i class="fas fa-user-tie"></i> ${project.role}</span>` : ''}
                </div>
                ${techTagsHTML}
                <p>${project.description}</p>
                <div class="project-links-container" style="display: flex; gap: 1rem; margin-top: 1rem;">
                    ${project.link ? `<a href="${project.link}" class="project-link" style="margin-top:0;" target="_blank" rel="noopener noreferrer">View Code <i class="fas fa-code"></i></a>` : ''}
                    ${project.video ? `<a href="${project.video}" class="project-link" style="margin-top:0; color: var(--accent-color);" target="_blank" rel="noopener noreferrer">Watch Demo <i class="fas fa-play-circle"></i></a>` : ''}
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// Render Certificates Section
function renderCertificates(data) {
    const certificatesList = document.getElementById('certificates-list');
    certificatesList.innerHTML = ''; 
    
    data.forEach(cert => {
        const certItem = document.createElement('div');
        certItem.className = 'experience-item'; 
        certItem.innerHTML = `
            <div class="exp-header">
                ${cert.logo ? `<img src="${cert.logo}" alt="${cert.issuer} logo" class="exp-logo">` : ''}
                <div>
                    <h3>${cert.title}</h3>
                    <p class="position">${cert.issuer}</p>
                </div>
            </div>
            <p class="duration">${cert.year}</p>
            <p>${cert.description}</p>
            ${cert.link ? `
                <a href="${cert.link}" class="project-link" style="margin-top: 10px; display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;" target="_blank" rel="noopener noreferrer">
                    View Certificate <i class="fas fa-external-link-alt"></i>
                </a>
            ` : ''}
        `;
        certificatesList.appendChild(certItem);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadData();

    // Navigation Highlighter & Smooth Scrolling
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if(targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer (Animate sections on scroll)
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
        // Gaya default dipasang ulang agar animasi reset bekerja
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
});
