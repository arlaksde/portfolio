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
        setupModalEvents();
        
        document.getElementById('current-year').textContent = new Date().getFullYear();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Global Modal Opener Function
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

// Render Profile Section
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

// Render Education
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

// Render Experience
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

// Render Projects
function renderProjects(data) {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = '';
    
    data.forEach(project => {
        let techTagsHTML = '';
        if (project.techStack) {
            techTagsHTML = `<div class="project-tags" style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 0.8rem 0;">`;
            project.techStack.forEach(tech => { techTagsHTML += `<span class="tech-tag" style="background: rgba(52, 152, 219, 0.1); color: var(--primary-color); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem; font-weight: 500;">${tech}</span>`; });
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

// Render Certificates
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

// ===================================================
// FIXED ENGINE: ADVANCED rPPG DIGITAL SIGNAL PROCESSING (DSP)
// ===================================================
let bpmStream = null;
let bpmInterval = null;

function initHeartRateMonitor() {
    const startBtn = document.getElementById('start-bpm-btn');
    const video = document.getElementById('webcam');
    const canvas = document.getElementById('roi-canvas');
    const ctx = canvas.getContext('2d');
    const bpmValueDisplay = document.getElementById('bpm-value');
    const bpmStatus = document.getElementById('bpm-status');
    const heartIcon = document.getElementById('heart-icon');

    // Filter Window & Sinyal
    let rawSignal = [];
    let filteredSignal = [];
    let lastPeakTime = Date.now();
    let bpmsList = [];
    const filterWindowSize = 5; // Ukuran Moving Average Filter

    startBtn.onclick = async function() {
        if (bpmStream) {
            clearInterval(bpmInterval);
            bpmStream.getTracks().forEach(track => track.stop());
            bpmStream = null;
            video.srcObject = null;
            startBtn.textContent = "Aktifkan Kamera";
            bpmValueDisplay.innerHTML = `-- <span style="font-size: 1.5rem; color: #888;">BPM</span>`;
            bpmStatus.textContent = "Kamera Mati";
            heartIcon.classList.remove('pulse-fast');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            rawSignal = []; filteredSignal = []; bpmsList = [];
            return;
        }

        try {
            bpmStatus.textContent = "Menginisialisasi Kamera...";
            bpmStream = await navigator.mediaDevices.getUserMedia({ video: { width: 480, height: 360, facingMode: "user" }, audio: false });
            video.srcObject = bpmStream;
            startBtn.textContent = "Matikan Kamera";
            bpmStatus.textContent = "Posisikan wajah tenang di depan kamera...";
            
            video.onloadedmetadata = () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                
                bpmInterval = setInterval(() => {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    
                    // Definisi Ukuran dan Koordinat Kotak ROI (Pengamatan Dahi/Kulit Wajah)
                    const roiWidth = 90;
                    const roiHeight = 50;
                    const roiX = (canvas.width - roiWidth) / 2;
                    const roiY = (canvas.height - roiHeight) / 3;

                    const imgData = ctx.getImageData(roiX, roiY, roiWidth, roiHeight);
                    const pixels = imgData.data;
                    
                    let greenSum = 0;
                    let count = pixels.length / 4;

                    for (let i = 0; i < pixels.length; i += 4) {
                        greenSum += pixels[i + 1]; // Ekstrak absorbsi oksihemoglobin kapiler (Kanal Hijau)
                    }
                    
                    let currentGreenAverage = greenSum / count;
                    rawSignal.push(currentGreenAverage);
                    if (rawSignal.length > 60) rawSignal.shift();

                    // --- IMPLEMENTASI DSP 1: MOVING AVERAGE FILTER (Pembersih Noise Kedipan) ---
                    if (rawSignal.length >= filterWindowSize) {
                        let sum = 0;
                        for (let j = rawSignal.length - filterWindowSize; j < rawSignal.length; j++) {
                            sum += rawSignal[j];
                        }
                        filteredSignal.push(sum / filterWindowSize);
                        if (filteredSignal.length > 30) filteredSignal.shift();
                    }

                    // Gambar Indikator Grafis Box ROI
                    ctx.strokeStyle = '#2ecc71';
                    ctx.lineWidth = 3;
                    ctx.strokeRect(roiX, roiY, roiWidth, roiHeight);
                    ctx.fillStyle = '#2ecc71';
                    ctx.font = 'bold 11px Arial';
                    ctx.fillText("ROI PULSE SENSOR", roiX, roiY - 6);

                    // --- IMPLEMENTASI DSP 2: PEAK INTER-VALLEY DETECTION (Pengukur Akurat Jeda Detak) ---
                    if (filteredSignal.length >= 3) {
                        let idx = filteredSignal.length - 2;
                        // Mendeteksi Lembah Sinyal (di mana absorbsi cahaya mencapai puncak kapiler darah penuh)
                        if (filteredSignal[idx] < filteredSignal[idx - 1] && filteredSignal[idx] < filteredSignal[idx + 1]) {
                            let currentTime = Date.now();
                            let timeDiff = currentTime - lastPeakTime;

                            // Filter Fisiologis: Denyut jantung manusia normal berjarak antara 450ms (133 BPM) hingga 1200ms (50 BPM)
                            if (timeDiff >= 450 && timeDiff <= 1200) {
                                let instantBpm = Math.round(60000 / timeDiff);
                                bpmsList.push(instantBpm);
                                if (bpmsList.length > 8) bpmsList.shift(); // Window rata-rata bergerak hasil ukur

                                // Hitung rata-rata denyut real-time dari riwayat interval asli
                                let finalBpm = Math.round(bpmsList.reduce((a, b) => a + b, 0) / bpmsList.length);
                                
                                bpmValueDisplay.innerHTML = `${finalBpm} <span style="font-size: 1.5rem; color: #888;">BPM</span>`;
                                heartIcon.classList.add('pulse-fast');
                                setTimeout(() => heartIcon.classList.remove('pulse-fast'), 200);
                            }
                            lastPeakTime = currentTime;
                        }
                    }

                    // Tampilkan status pengumpulan sampel data
                    if (bpmsList.length === 0) {
                        bpmStatus.textContent = "Mengkalibrasi sinyal fotopletismografi kulit...";
                    } else if (bpmsList.length < 5) {
                        bpmStatus.textContent = "Menstabilkan frekuensi pembuluh darah...";
                    } else {
                        bpmStatus.textContent = "Sinyal Terkunci. Mengukur fluktuasi kapiler secara real-time.";
                    }

                }, 1000 / 30); // Loop 30 FPS
            };

        } catch (err) {
            console.error("Gagal membuka kamera:", err);
            bpmStatus.textContent = "Izin kamera ditolak atau perangkat tidak ditemukan.";
        }
    };
}

// Initialize Page Mechanics
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initHeartRateMonitor();
    
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
            if (link.getAttribute('href').includes(current)) link.classList.add('active');
        });
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            if(targetSection) window.scrollTo({ top: targetSection.offsetTop, behavior: 'smooth' });
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('animate'); });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
    });
});
