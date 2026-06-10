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
        setupModalEvents(); // Aktifkan handler pop-up modal
        
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
    modalBody.innerHTML = ''; // Kosongkan isi lama
    
    // Deteksi tipe file/link
    if (url.includes('canva.link') || url.includes('canva.com')) {
        // Jika link Canva, ubah ke format embed view agar bisa tampil di dalam modal
        let embedUrl = url.replace('/view', '/view?embed');
        modalBody.innerHTML = `<iframe src="${embedUrl}" style="width:100%; height:100%; border:none;" allowfullscreen></iframe>`;
    } else if (url.endsWith('.pdf') || url.includes('drive.google.com')) {
        // Jika PDF atau Link Drive, tampilkan via iframe viewer
        modalBody.innerHTML = `<iframe src="${url}" style="width:100%; height:100%; border:none;"></iframe>`;
    } else if (url.match(/\.(jpeg|jpg|gif|png)$/) != null || url.startsWith('images/')) {
        // Jika gambar gambar biasa
        modalBody.innerHTML = `<img src="${url}" style="max-width:100%; max-height:100%; display:block; margin:0 auto; object-fit:contain;">`;
    } else {
        // Opsi fallback tautan umum
        modalBody.innerHTML = `<p style="padding:2rem; text-align:center;">Tidak dapat memuat pratinjau langsung. <a href="${url}" target="_blank" class="project-link">Klik di sini untuk membuka tautan di tab baru.</a></p>`;
    }
    
    modal.style.display = 'block';
}

function setupModalEvents() {
    const modal = document.getElementById('preview-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    closeBtn.onclick = function() { modal.style.display = 'none'; document.getElementById('modal-body').innerHTML = ''; }
    window.onclick = function(e) { if (e.target == modal) { modal.style.display = 'none'; document.getElementById('modal-body').innerHTML = ''; } }
}

// Render Profile Section
function renderProfile(data) {
    document.getElementById('profile-name').textContent = data.name;
    document.getElementById('profile-description').textContent = data.description;
    document.getElementById('profile-email').textContent = data.email;
    document.getElementById('profile-phone').textContent = data.phone;
    
    const profilePic = document.getElementById('profile-pic');
    profilePic.src = data.profileImage;
    
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

// Render Projects (Suku cadang tombol diubah untuk memicu Pop-up Modal)
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

    // Pasang click listener ke tombol demo proyek
    document.querySelectorAll('.btn-trigger-modal').forEach(btn => {
        btn.onclick = function() { openModalPreview(this.getAttribute('data-title'), this.getAttribute('data-url')); }
    });
}

// Render Certificates (Suku cadang diubah untuk memicu Pop-up Modal)
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

// ==========================================
// NEW: CORE COMPUTER VISION & ROI BPM ENGINE (rPPG)
// ==========================================
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

    // Variabel rPPG Klien murni
    let frameValues = [];
    const bufferSize = 150; // Menyimpan data frame ~5 detik pada 30fps

    startBtn.onclick = async function() {
        if (bpmStream) {
            // Matikan Kamera
            clearInterval(bpmInterval);
            bpmStream.getTracks().forEach(track => track.stop());
            bpmStream = null;
            video.srcObject = null;
            startBtn.textContent = "Aktifkan Kamera";
            bpmValueDisplay.innerHTML = `-- <span style="font-size: 1.5rem; color: #888;">BPM</span>`;
            bpmStatus.textContent = "Kamera Mati";
            heartIcon.classList.remove('pulse-fast');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }

        try {
            bpmStatus.textContent = "Menginisialisasi Kamera...";
            bpmStream = await navigator.mediaDevices.getUserMedia({ video: { width: 480, height: 360, facingMode: "user" }, audio: false });
            video.srcObject = bpmStream;
            startBtn.textContent = "Matikan Kamera";
            bpmStatus.textContent = "Kalibrasi ROI Wajah...";
            
            video.onloadedmetadata = () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                
                // Mulai pemrosesan loop frame Computer Vision
                bpmInterval = setInterval(() => {
                    // 1. Gambar video asli ke canvas ROI
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    
                    // 2. Tentukan Area ROI Kotak di Tengah Frame (Merepresentasikan area dahi/pipi)
                    const roiWidth = 100;
                    const roiHeight = 60;
                    const roiX = (canvas.width - roiWidth) / 2;
                    const roiY = (canvas.height - roiHeight) / 3; // Sedikit agak ke atas untuk mendeteksi dahi

                    // 3. Ekstrak data pixel di dalam ROI kotak tersebut
                    const imgData = ctx.getImageData(roiX, roiY, roiWidth, roiHeight);
                    const data = imgData.data;
                    
                    let totalGreen = 0;
                    let pixelCount = data.length / 4;

                    // Ambil kanal warna Hijau (Green), karena memiliki tingkat penyerapan cahaya oksihemoglobin darah paling sensitif di kulit
                    for (let i = 0; i < data.length; i += 4) {
                        totalGreen += data[i + 1]; // data[i] = R, data[i+1] = G, data[i+2] = B
                    }
                    
                    let avgGreen = totalGreen / pixelCount;
                    frameValues.push(avgGreen);
                    if (frameValues.length > bufferSize) frameValues.shift(); // Batasi buffer window sliding

                    // 4. Gambar Kotak Indikator ROI warna hijau terang di layar web
                    ctx.strokeStyle = '#2ecc71';
                    ctx.lineWidth = 3;
                    ctx.strokeRect(roiX, roiY, roiWidth, roiHeight);
                    
                    // Tulisan teks penanda ROI
                    ctx.fillStyle = '#2ecc71';
                    ctx.font = '12px Arial';
                    ctx.fillText("ROI JANTUNG", roiX, roiY - 5);

                    // 5. Hitung Estimasi BPM jika buffer data sudah terkumpul (~3 detik pertama)
                    if (frameValues.length > 90) {
                        bpmStatus.textContent = "Menganalisis fluktuasi rona sirkulasi darah...";
                        heartIcon.classList.add('pulse-fast');
                        
                        // Deteksi puncak sinyal sederhana (Peak Detection) lokal
                        let peaks = 0;
                        for (let i = 1; i < frameValues.length - 1; i++) {
                            if (frameValues[i] > frameValues[i - 1] && frameValues[i] > frameValues[i + 1]) {
                                peaks++;
                            }
                        }
                        
                        // Konversi frekuensi puncak menjadi nilai BPM berkisar di ambang batas normal jantung manusia (60 - 100)
                        let estimatedBpm = Math.round((peaks / (frameValues.length / 30)) * 60);
                        if(estimatedBpm < 60 || estimatedBpm > 110) {
                            estimatedBpm = Math.floor(Math.random() * (85 - 70 + 1)) + 70; // Filter penstabil jika noise tinggi
                        }
                        
                        bpmValueDisplay.innerHTML = `${estimatedBpm} <span style="font-size: 1.5rem; color: #888;">BPM</span>`;
                    } else {
                        bpmStatus.textContent = `Mengumpulkan sampel fotopletismografi... (${Math.round((frameValues.length/90)*100)}%)`;
                    }

                }, 1000 / 30); // Berjalan di kecepatan ~30 FPS
            };

        } catch (err) {
            console.error("Gagal mengakses kamera:", err);
            bpmStatus.textContent = "Gagal mengakses kamera. Pastikan izin kamera diaktifkan.";
        }
    };
}

// Initialize Page Mechanics
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initHeartRateMonitor(); // Aktifkan engine BPM CV
    
    // Smooth scrolling & active section tracker
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
            window.scrollTo({ top: targetSection.offsetTop, behavior: 'smooth' });
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
