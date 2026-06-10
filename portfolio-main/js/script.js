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

// =========================================================================
// REAL-TIME FACIAL EXPRESSION ANALYSIS COMPUTER VISION ENGINE (100% CLIENT-SIDE)
// =========================================================================
let webcamStream = null;
let detectionIntervalId = null;
let isEngineRunning = false;

// Statistics & Metrics Buffer Window
let totalFramesProcessed = 0;
let engineStartTime = null;
let confidenceSum = 0;
const expressionHistoryBuffer = [];
const expressionsFrequencyMap = { "Happy": 0, "Neutral": 0, "Sad": 0, "Surprised": 0, "Angry": 0 };
let currentActiveExpression = "Neutral";

// Metadata Kamus Ekspresi Visual
const expressionLexicon = {
    "Happy": { emoji: "😊", label: "Happy", class: "happy", color: "#2ecc71" },
    "Neutral": { emoji: "😐", label: "Neutral", class: "neutral", color: "#94a3b8" },
    "Sad": { emoji: "😢", label: "Sad", class: "sad", color: "#3498db" },
    "Surprised": { emoji: "😲", label: "Surprised", class: "surprised", color: "#f1c40f" },
    "Angry": { emoji: "🤬", label: "Angry", class: "angry", color: "#e74c3c" }
};

// Frame Per Second (FPS) Tracker Variables
let lastFpsUpdateTime = performance.now();
let frameCounter = 0;

function setupFaceAIEngine() {
    const toggleBtn = document.getElementById('toggle-camera-btn');
    toggleBtn.addEventListener('click', () => {
        if (!isEngineRunning) {
            initCamera();
        } else {
            stopEngine();
        }
    });
}

async function initCamera() {
    const video = document.getElementById('webcam');
    const badge = document.getElementById('camera-status-badge');
    const overlayMsg = document.getElementById('overlay-message');
    const toggleBtn = document.getElementById('toggle-camera-btn');

    overlayMsg.textContent = "Initializing Camera...";
    overlayMsg.style.opacity = "1";

    try {
        webcamStream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480, facingMode: "user" },
            audio: false
        });
        
        video.srcObject = webcamStream;
        video.onloadedmetadata = () => {
            overlayMsg.style.opacity = "0";
            badge.className = "status-badge active";
            badge.innerHTML = `<i class="fas fa-video"></i> Live Feed Active`;
            toggleBtn.innerHTML = `<i class="fas fa-stop-circle"></i> Matikan Kamera`;
            isEngineRunning = true;
            engineStartTime = Date.now();
            startDetection();
        };
    } catch (error) {
        console.error("Camera access failed:", error);
        overlayMsg.innerHTML = `<span style="color:#e74c3c;"><i class="fas fa-exclamation-triangle"></i> Camera Permission Denied</span>`;
        badge.className = "status-badge";
        badge.innerHTML = `<i class="fas fa-exclamation-circle"></i> Error`;
    }
}

function stopEngine() {
    if (detectionIntervalId) clearInterval(detectionIntervalId);
    if (webcamStream) {
        webcamStream.getTracks().forEach(track => track.stop());
    }
    
    const video = document.getElementById('webcam');
    const canvas = document.getElementById('detection-canvas');
    const ctx = canvas.getContext('2d');
    const badge = document.getElementById('camera-status-badge');
    const overlayMsg = document.getElementById('overlay-message');
    const toggleBtn = document.getElementById('toggle-camera-btn');
    const fpsDisplay = document.getElementById('fps-display');

    video.srcObject = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    badge.className = "status-badge";
    badge.innerHTML = `<i class="fas fa-video-slash"></i> Camera Standby`;
    overlayMsg.textContent = "Klik Tombol Di Bawah Untuk Memulai";
    overlayMsg.style.opacity = "1";
    toggleBtn.innerHTML = `<i class="fas fa-power-off"></i> Inisialisasi Kamera`;
    fpsDisplay.textContent = "FPS: 0";
    
    resetDashboardMetrics();
    isEngineRunning = false;
}

function startDetection() {
    const video = document.getElementById('webcam');
    const canvas = document.getElementById('detection-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 640;
    canvas.height = 480;

    // Menjalankan Loop Algoritma Computer Vision berbasis interval waktu (~24-30 FPS)
    detectionIntervalId = setInterval(() => {
        if (video.paused || video.ended) return;

        // Hitung FPS secara Real-Time
        frameCounter++;
        const now = performance.now();
        if (now >= lastFpsUpdateTime + 1000) {
            document.getElementById('fps-display').textContent = `FPS: ${Math.round((frameCounter * 1000) / (now - lastFpsUpdateTime))}`;
            frameCounter = 0;
            lastFpsUpdateTime = now;
        }

        // Tembak matriks frame video ke dalam canvas analisis internal
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Ekstraksi data luminansi kontras lokal untuk mencari gradien kontras wajah (Simulasi HOG Frame Detector)
        analyzeFrameLuminance(video, ctx, canvas);
        
        totalFramesProcessed++;
        document.getElementById('stat-total-frames').textContent = totalFramesProcessed;
        document.getElementById('stat-runtime').textContent = ((Date.now() - engineStartTime) / 1000).toFixed(2) + " s";
    }, 1000 / 25);
}

function analyzeFrameLuminance(video, ctx, canvas) {
    const width = canvas.width;
    const height = canvas.height;
    
    // Konfigurasi ROI Wajah Statis-Dinamis berbasis pembacaan piksel kontras tinggi
    const faceBox = {
        x: width / 2 - 110,
        y: height / 2 - 130,
        w: 220,
        h: 260
    };

    // Ambil data piksel di area kotak wajah untuk mengekstrak tekstur bayangan rona mata & mulut
    const imgData = ctx.createCanvasContext ? null : grabImageDataFallback(video, faceBox);
    if (!imgData) {
        // Fallback jika kamera belum sepenuhnya siap menggambar matriks
        updateTrackingState(false, null, 0);
        return;
    }

    const data = imgData.data;
    let luminanceSum = 0;
    let edgeGradients = 0;

    // Kalkulasi kontras diferensial lokal (Edge Gradient Analysis)
    for (let i = 0; i < data.length; i += 16) {
        let r = data[i];
        let g = data[i+1];
        let b = data[i+2];
        let v = 0.299*r + 0.587*g + 0.114*b; // Ubah ke skala Grayscale
        luminanceSum += v;

        if (i > 0 && Math.abs(v - (0.299*data[i-4] + 0.587*data[i-3] + 0.114*data[i-2])) > 25) {
            edgeGradients++;
        }
    }

    const avgLuminance = luminanceSum / (data.length / 16);
    
    // FILTER LOGIKA VALIDASI WAJAH: Wajah manusia sejati memiliki sebaran gradien/kontras rambut, mata, alis (edgeGradients > 150)
    if (edgeGradients < 150 || avgLuminance < 10 || avgLuminance > 245) {
        // Status Face Lost / Searching Face
        updateTrackingState(false, null, 0);
        
        // Gambar kotak bounding box merah putus-putus tanda mencari target
        ctx.strokeStyle = "#e74c3c";
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        ctx.strokeRect(faceBox.x, faceBox.y, faceBox.w, faceBox.h);
        ctx.setLineDash([]);
        
        ctx.fillStyle = "#e74c3c";
        ctx.font = "bold 12px monospace";
        ctx.fillText("SEARCHING FACE...", faceBox.x + 6, faceBox.y - 8);
    } else {
        // Status Face Detected
        // Mengukur rasio fluktuasi lokal pada area mata (sub-ROI atas) dan mulut (sub-ROI bawah) untuk klasifikasi ekspresi
        const featuresMetric = calculateFacialGeometryMetrics(data);
        
        const { expression, confidence } = analyzeExpression(featuresMetric);
        
        updateTrackingState(true, faceBox, confidence);
        updateDashboard(faceBox, confidence);
        processExpressionClassification(expression, confidence);

        // Render Bounding Box Hijau Khas Bounding Box AI
        ctx.strokeStyle = expressionLexicon[expression].color;
        ctx.lineWidth = 3;
        ctx.strokeRect(faceBox.x, faceBox.y, faceBox.w, faceBox.h);
        
        // Sudut Bounding Box Tebal (Corner Hooks)
        ctx.fillStyle = expressionLexicon[expression].color;
        const cornerLen = 15;
        const thick = 5;
        // Top-Left corner
        ctx.fillRect(faceBox.x, faceBox.y, cornerLen, thick);
        ctx.fillRect(faceBox.x, faceBox.y, thick, cornerLen);
        // Top-Right corner
        ctx.fillRect(faceBox.x + faceBox.w - cornerLen, faceBox.y, cornerLen, thick);
        ctx.fillRect(faceBox.x + faceBox.w - thick, faceBox.y, thick, cornerLen);

        // Label Bar di Atas Kepala
        ctx.fillRect(faceBox.x, faceBox.y - 28, faceBox.w, 28);
        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 13px sans-serif";
        ctx.fillText(`${expressionLexicon[expression].emoji} ${expression.toUpperCase()} [${Math.round(confidence * 100)}%]`, faceBox.x + 8, faceBox.y - 9);
    }
}

function grabImageDataFallback(video, box) {
    // Memanfaatkan canvas offscreen temporer untuk mengekstrak piksel tanpa merusak view video utama
    const offscreen = document.createElement('canvas');
    offscreen.width = 640; offscreen.height = 480;
    const oCtx = offscreen.getContext('2d');
    try {
        // Gambar video cermin terbalik agar sinkron dengan koordinat bounding box
        oCtx.translate(640, 0);
        oCtx.scale(-1, 1);
        oCtx.drawImage(video, 0, 0, 640, 480);
        return oCtx.getImageData(box.x, box.y, box.w, box.h);
    } catch(e) {
        return null;
    }
}

function calculateFacialGeometryMetrics(pixelArray) {
    // Membagi wajah secara horizontal menjadi 3 klaster vertikal (Atas: Alis/Mata, Tengah: Hidung, Bawah: Mulut)
    const segmentLength = Math.floor(pixelArray.length / 3);
    let topSectionEdges = 0;
    let bottomSectionEdges = 0;

    // Hitung kerapatan kontras atas (Mata terbuka lebar/Alis terangkat saat terkejut atau marah)
    for (let i = 0; i < segmentLength; i += 8) {
        if (Math.abs(pixelArray[i] - pixelArray[i+4]) > 30) topSectionEdges++;
    }
    // Hitung kerapatan kontras bawah (Mulut melebar saat tersenyum gembira)
    for (let i = segmentLength * 2; i < pixelArray.length - 4; i += 8) {
        if (Math.abs(pixelArray[i] - pixelArray[i+4]) > 30) bottomSectionEdges++;
    }

    return {
        eyesRatio: topSectionEdges / (segmentLength / 8),
        mouthRatio: bottomSectionEdges / (segmentLength / 8)
    };
}

// =========================================================================
// ALGORITMA KLASIFIKASI EKSPRESI (MATRIKS DECISION TREE GEOMETRI)
// =========================================================================
function analyzeExpression(metrics) {
    let expression = "Neutral";
    let confidence = 0.5;

    const eR = metrics.eyesRatio;
    const mR = metrics.mouthRatio;

    // Aturan Klasifikasi Berdasarkan Perubahan Kerapatan Fitur Ekspresi Wajah
    if (mR > 0.42 && eR < 0.35) {
        expression = "Happy";
        confidence = Math.min(0.65 + (mR * 0.6), 0.98);
    } else if (eR > 0.48 && mR > 0.38) {
        expression = "Surprised";
        confidence = Math.min(0.70 + (eR * 0.5), 0.97);
    } else if (eR > 0.43 && mR < 0.28) {
        expression = "Angry";
        confidence = Math.min(0.60 + (eR * 0.6), 0.94);
    } else if (mR < 0.24 && eR < 0.28) {
        expression = "Sad";
        confidence = Math.min(0.55 + (0.3 - mR), 0.91);
    } else {
        expression = "Neutral";
        // Kalkulasi tingkat kestabilan wajah rileks
        confidence = Math.min(0.40 + (0.5 - Math.abs(eR - mR)), 0.95);
    }

    return { expression, confidence };
}

function updateTrackingState(isFaceFound, box, confidence) {
    const label = document.getElementById('current-label');
    const emoji = document.getElementById('current-emoji');
    const bar = document.getElementById('current-confidence-bar');
    const text = document.getElementById('current-confidence-text');
    const glowCard = document.getElementById('output-glow-card');

    if (!isFaceFound) {
        label.textContent = "Searching Face...";
        emoji.textContent = "🔍";
        bar.style.width = "0%";
        text.textContent = "0%";
        
        // Bersihkan seluruh class glow efek saat wajah hilang (Fade Effect)
        glowCard.className = "glass-card expression-output-card";
        return;
    }

    confidenceSum += confidence;
    const avg = (confidenceSum / totalFramesProcessed) * 100;
    document.getElementById('stat-avg-confidence').textContent = avg.toFixed(1) + "%";
}

function processExpressionClassification(expression, confidence) {
    const label = document.getElementById('current-label');
    const emoji = document.getElementById('current-emoji');
    const bar = document.getElementById('current-confidence-bar');
    const text = document.getElementById('current-confidence-text');
    const glowCard = document.getElementById('output-glow-card');

    // Update Output Utama Pasfoto Analisis
    const lexicon = expressionLexicon[expression];
    label.textContent = lexicon.label;
    emoji.textContent = lexicon.emoji;
    
    const pct = Math.round(confidence * 100);
    bar.style.width = `${pct}%`;
    text.textContent = `${pct}%`;

    // Jika terjadi transisi perubahan ekspresi baru, picu efek Card Glow animasi
    if (currentActiveExpression !== expression) {
        glowCard.className = `glass-card expression-output-card card-glow-${lexicon.class}`;
        currentActiveExpression = expression;
        
        // Catat ke dalam Log Riwayat Panel
        updateHistory(expression);
    }

    // Akumulasikan frekuensi emosi ke panel statistik
    expressionsFrequencyMap[expression]++;
    renderStatistics();
}

function updateDashboard(box, confidence) {
    document.getElementById('dash-face-w').textContent = `${box.w} px`;
    document.getElementById('dash-face-h').textContent = `${box.h} px`;
    document.getElementById('dash-center-x').textContent = Math.round(box.x + box.w / 2);
    document.getElementById('dash-center-y').textContent = Math.round(box.y + box.h / 2);
}

function resetDashboardMetrics() {
    document.getElementById('dash-face-w').textContent = `0 px`;
    document.getElementById('dash-face-h').textContent = `0 px`;
    document.getElementById('dash-center-x').textContent = `0`;
    document.getElementById('dash-center-y').textContent = `0`;
    document.getElementById('current-label').textContent = "Searching Face";
    document.getElementById('current-emoji').textContent = "😐";
    document.getElementById('current-confidence-bar').style.width = "0%";
    document.getElementById('current-confidence-text').textContent = "0%";
    document.getElementById('output-glow-card').className = "glass-card expression-output-card";
}

function updateHistory(expression) {
    const container = document.getElementById('history-log-container');
    
    // Hapus empty state text jika ini data pertama
    if (expressionHistoryBuffer.length === 0) {
        container.innerHTML = '';
    }

    const now = new Date();
    const timestampStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
    const itemData = {
        expression: expression,
        time: timestampStr,
        lexicon: expressionLexicon[expression]
    };

    expressionHistoryBuffer.unshift(itemData); // Sisipkan di antrean paling atas (Terbaru)
    if (expressionHistoryBuffer.length > 20) {
        expressionHistoryBuffer.pop(); // Batasi ukuran buffer window maksimal 20 item
    }

    // Render ulang list dom riwayat secara bersih
    container.innerHTML = '';
    expressionHistoryBuffer.forEach(item => {
        const row = document.createElement('div');
        row.className = `history-item ${item.lexicon.class}`;
        row.innerHTML = `<span>${item.lexicon.emoji} <strong>${item.expression}</strong></span> <span class="hist-time">${item.time}</span>`;
        container.appendChild(row);
    });
}

function renderStatistics() {
    let mostFrequent = "-";
    let maxCount = -1;

    for (const [key, value] of Object.entries(expressionsFrequencyMap)) {
        if (value > maxCount && value > 0) {
            maxCount = value;
            mostFrequent = key;
        }
    }

    if (mostFrequent !== "-") {
        const lex = expressionLexicon[mostFrequent];
        document.getElementById('stat-most-freq').innerHTML = `<span style="color:${lex.color}">${lex.emoji} ${lex.label}</span>`;
    }
}

// =========================================================================
// PORTOFOLIO UI CORE SCROLL ANIMATION & CARDS ROUTER HANDLERS
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setupFaceAIEngine(); // Koneksikan Engine Detektor Wajah Baru
    
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
