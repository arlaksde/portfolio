// Global Data Loader for JSON components
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
        setupModalEvents();
        
        document.getElementById('current-year').textContent = new Date().getFullYear();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function openModalPreview(title, url) {
    const modal = document.getElementById('preview-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = title;
    modalBody.innerHTML = '';
    
    if (url.includes('canva.link') || url.includes('canva.com')) {
        let embedUrl = url.replace('/view', '/view?embed');
        modalBody.innerHTML = `<iframe src="${embedUrl}" style="width:100%; height:100%; border:none;" allowfullscreen></iframe>`;
    } else if (url.endsWith('.pdf') || url.includes('drive.google.com')) {
        modalBody.innerHTML = `<iframe src="${url}" style="width:100%; height:100%; border:none;"></iframe>`;
    } else if (url.match(/\.(jpeg|jpg|gif|png)$/) != null || url.startsWith('images/')) {
        modalBody.innerHTML = `<img src="${url}" style="max-width:100%; max-height:100%; display:block; margin:0 auto; object-fit:contain;">`;
    } else {
        modalBody.innerHTML = `<p style="padding:2rem; text-align:center;">Tidak dapat memuat pratinjau langsung. <a href="${url}" target="_blank" class="project-link">Klik di sini untuk membuka tautan di tab baru.</a></p>`;
    }
    modal.style.display = 'block';
}

function setupModalEvents() {
    const modal = document.getElementById('preview-modal');
    const closeBtn = document.querySelector('.close-modal');
    if(closeBtn) {
        closeBtn.onclick = function() { modal.style.display = 'none'; document.getElementById('modal-body').innerHTML = ''; }
    }
    window.onclick = function(e) { if (e.target == modal) { modal.style.display = 'none'; document.getElementById('modal-body').innerHTML = ''; } }
}

function renderProfile(data) {
    document.getElementById('profile-name').textContent = data.name;
    document.getElementById('profile-description').textContent = data.description;
    document.getElementById('profile-email').textContent = data.email;
    document.getElementById('profile-phone').textContent = data.phone;
    
    const profilePic = document.getElementById('profile-pic');
    if (profilePic) profilePic.src = data.profileImage;
    
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
	
    if (data.skills) {
        const skillsGrid = document.getElementById('skills-grid');
        skillsGrid.innerHTML = '';
        data.skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `<div class="skill-icon"><i class="${skill.icon}"></i></div><div class="skill-name">${skill.name}</div>`;
            skillsGrid.appendChild(skillItem);
        });
    }	
}

function renderEducation(data) {
    const educationList = document.getElementById('education-list');
    educationList.innerHTML = '';
    data.forEach(edu => {
        const eduItem = document.createElement('div');
        eduItem.className = 'education-item';
        eduItem.innerHTML = `<div class="edu-header">${edu.logo ? `<img src="${edu.logo}" class="edu-logo">` : ''}<div><h3>${edu.university}</h3><p class="degree">${edu.major}</p></div></div><p class="year">${edu.year}</p><p>${edu.description}</p>`;
        educationList.appendChild(eduItem);
    });
}

function renderExperience(data) {
    const experienceList = document.getElementById('experience-list');
    experienceList.innerHTML = '';
    data.forEach(exp => {
        const expItem = document.createElement('div');
        expItem.className = 'experience-item';
        expItem.innerHTML = `<div class="exp-header">${exp.logo ? `<img src="${exp.logo}" class="exp-logo">` : ''}<div><h3>${exp.company}</h3><p class="position">${exp.position}</p></div></div><p class="duration">${exp.year}</p><p>${exp.description}</p>`;
        experienceList.appendChild(expItem);
    });
}

function renderProjects(data) {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = '';
    data.forEach(project => {
        let techTagsHTML = '';
        if (project.techStack) {
            techTagsHTML = `<div class="project-tags" style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 0.8rem 0;">`;
            project.techStack.forEach(tech => { techTagsHTML += `<span class="tech-tag" style="background: rgba(255,255,255,0.05); color: var(--primary-color); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem; font-weight: 500;">${tech}</span>`; });
            techTagsHTML += `</div>`;
        }
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image"><img src="${project.image ? project.image : 'https://placehold.co/600x400?text=No+Image'}" alt="${project.title}"></div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <div class="project-meta"><span><i class="fas fa-calendar-alt"></i> ${project.year}</span></div>
                ${techTagsHTML}
                <p>${project.description}</p>
                <div style="display:flex; gap:1rem; margin-top:1rem;">
                    ${project.video ? `<a class="project-link btn-trigger-modal" style="color:var(--accent-color);" data-title="${project.title}" data-url="${project.video}">Watch Demo <i class="fas fa-play-circle"></i></a>` : ''}
                </div>
            </div>`;
        projectsGrid.appendChild(projectCard);
    });
    document.querySelectorAll('.btn-trigger-modal').forEach(btn => {
        btn.onclick = function() { openModalPreview(this.getAttribute('data-title'), this.getAttribute('data-url')); }
    });
}

function renderCertificates(data) {
    const certificatesList = document.getElementById('certificates-list');
    certificatesList.innerHTML = '';
    data.forEach(cert => {
        const certItem = document.createElement('div');
        certItem.className = 'experience-item'; 
        certItem.innerHTML = `
            <div class="exp-header">${cert.logo ? `<img src="${cert.logo}" class="exp-logo">` : ''}<div><h3>${cert.title}</h3><p class="position">${cert.issuer}</p></div></div>
            <p class="duration">${cert.year}</p>
            <p>${cert.description}</p>
            ${cert.link ? `<a class="project-link cert-modal-btn" style="margin-top:10px; display:inline-block;" data-title="${cert.title}" data-url="${cert.link}">View Certificate <i class="fas fa-external-link-alt"></i></a>` : ''}
        `;
        certificatesList.appendChild(certItem);
    });
    document.querySelectorAll('.cert-modal-btn').forEach(btn => {
        btn.onclick = function() { openModalPreview(this.getAttribute('data-title'), this.getAttribute('data-url')); }
    });
}


