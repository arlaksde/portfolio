// VARIABEL GLOBAL UNTUK KATEGORI
// Anda bisa menambah/mengubah kategori di sini kapan saja
const PROJECT_CATEGORIES = [
    { id: 'all', label: 'All Projects' },
    { id: 'iot', label: 'IoT & Hardware' },
    { id: 'automation', label: 'Industrial Automation' },
    { id: 'web', label: 'Web App' }
];

document.addEventListener("DOMContentLoaded", () => {
    // 1. Preloader Logic
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 500);
    }, 1000);

    // Initialize AOS Animation
    AOS.init({ once: true, offset: 50, duration: 800 });
    document.getElementById("current-year").textContent = new Date().getFullYear();

    // 2. DATA PROFILE
    const profileData = {
        "name": "Arya Laksmana Dewanata",
        "description": "Dedicated to the world of electronics for approximately 7 years, has completed several projects, from industrial automation to smart home integrations.",
        "profileImage": "images/AryaLaksmanaDewanata_JasAlmet1.png",
        "email": "arlaksde@gmail.com",
        "phone": "+62 857-0153-1222",
        "socialMedia": [
            { "platform": "LinkedIn", "url": "https://www.linkedin.com/in/arya-laksmana-dewanata-530934251", "icon": "fab fa-linkedin-in" },
            { "platform": "GitHub", "url": "https://github.com/arlaksde", "icon": "fab fa-github" }
        ],
        "cv": { "file": "" }, // Dikosongkan sementara sesuai permintaan
        "skills": [
            {"name": "Internet of Things", "icon": "fas fa-wifi"},
            {"name": "Hardware Programming", "icon": "fas fa-microchip"},
            {"name": "Web Programming", "icon": "fab fa-js"},
            {"name": "Project Management", "icon": "fas fa-list-check"},
            {"name": "Foreign Languages", "icon": "fas fa-language"}
        ]
    };

    // Render Profile
    document.getElementById("profile-name").textContent = profileData.name;
    document.getElementById("profile-description").textContent = profileData.description;
    
    const profilePic = document.getElementById("profile-pic");
    profilePic.src = profileData.profileImage;
    profilePic.onerror = () => { profilePic.src = 'https://ui-avatars.com/api/?name=Arya+Dewanata&background=0f172a&color=4facfe&size=300'; };

    document.getElementById("profile-email").textContent = profileData.email;
    document.getElementById("profile-phone").textContent = profileData.phone;

    // Render Social Links
    const socialLinksContainer = document.getElementById("social-links");
    profileData.socialMedia.forEach(social => {
        const a = document.createElement("a");
        a.href = social.url;
        a.target = "_blank";
        a.innerHTML = `<i class="${social.icon}"></i>`;
        socialLinksContainer.insertBefore(a, document.getElementById("cv-download"));
    });

    // Handle CV Click
    const cvBtn = document.getElementById("cv-download");
    cvBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("My CV is currently being updated. Please check back later!");
    });

    // Render Skills
    const skillsGrid = document.getElementById("skills-grid");
    profileData.skills.forEach(skill => {
        const skillDiv = document.createElement("div");
        skillDiv.className = "skill-item";
        skillDiv.innerHTML = `<i class="${skill.icon} skill-icon"></i><span class="skill-name">${skill.name}</span>`;
        skillsGrid.appendChild(skillDiv);
    });

    // 3. DATA EDUCATION
    const educationData = [
        { "university": "Polytechnic State of Semarang", "logo": "images/polines-logo.png", "major": "Bachelor of Electronic Engineering Technology", "year": "2022 - Now", "description": "GPA 3.6 of 4.0" },
        { "university": "SMK Negeri 1 Semarang", "logo": "images/smk-logo.jpg", "major": "Industrial Electronics Engineering", "year": "2019 - 2022", "description": "Point Average 85 of 100" }
    ];

    const eduList = document.getElementById("education-list");
    educationData.forEach((edu, idx) => {
        const eduCard = document.createElement("div");
        eduCard.className = "education-item glass-card";
        eduCard.setAttribute("data-aos", "fade-up");
        eduCard.setAttribute("data-aos-delay", idx * 100);
        eduCard.innerHTML = `
            <div class="edu-header">
                <img src="${edu.logo}" alt="${edu.university}" class="edu-logo" onerror="this.src='https://ui-avatars.com/api/?name=${edu.university[0]}&background=ffffff&color=0f172a'">
                <div class="header-text">
                    <h3>${edu.university}</h3>
                    <p class="subtitle">${edu.major}</p>
                    <p class="year"><i class="far fa-calendar-alt"></i> ${edu.year}</p>
                </div>
            </div>
            <p class="desc-text">${edu.description}</p>
        `;
        eduList.appendChild(eduCard);
    });

    // 4. DATA EXPERIENCE
    const experienceData = [
        { "company": "Ruang Industri Indonesia", "logo": "images/image.png", "position": "Engineering Intern", "year": "02 March 2026 - 30 June 2026", "description": "Designed and implemented an end-to-end Overall Equipment Effectiveness (OEE) monitoring system utilizing an Orange Pi as the central on-premise." },
        { "company": "Panasonic Manufacturing Indonesia-Internship", "logo": "images/pmi.jpg", "position": "interns", "year": "20 May 2021 - 01 September 2021", "description": "Production Line Optimization: Responsible for overseeing and implementing the aluminum coating process on technical components in the refrigeration department in accordance with global manufacturing quality standards." },
        { "company": "Bandung Institute of Technology", "logo": "images/itb.png", "position": "interns", "year": "02 January 2021 - 29 March 2021", "description": "Precision Agriculture Systems Research and Development: Designing and implementing a smart irrigation system based on soil moisture sensors to optimize the efficiency of water resource use. Monitoring System Integration: Calibrating sensors and programming automated control systems to ensure data accuracy in real-time soil moisture management. Personnel Management Digitalization: Developing an RFID-based attendance system architecture to improve data validity and efficiency of attendance management within the organization." }
    ];

    const expList = document.getElementById("experience-list");
    experienceData.forEach((exp, idx) => {
        const expCard = document.createElement("div");
        expCard.className = "experience-item glass-card";
        expCard.setAttribute("data-aos", "fade-up");
        expCard.setAttribute("data-aos-delay", idx * 100);
        expCard.innerHTML = `
            <div class="exp-header">
                <img src="${exp.logo}" alt="${exp.company}" class="exp-logo" onerror="this.src='https://ui-avatars.com/api/?name=${exp.company[0]}&background=ffffff&color=0f172a'">
                <div class="header-text">
                    <h3>${exp.company}</h3>
                    <p class="subtitle">${exp.position}</p>
                    <p class="year"><i class="far fa-calendar-alt"></i> ${exp.year}</p>
                </div>
            </div>
            <p class="desc-text">${exp.description}</p>
        `;
        expList.appendChild(expCard);
    });

    // 5. DATA PROJECTS (Dengan properti category ditambahkan ke masing-masing item)
    const projectsData = [
        { "title": "Sistem Janji Temu Dosen dan Mahasiswa", "category": ["web", "iot"], "year": "2025", "partner": "Riffatunnisa Fauziah Hanum", "description": "Mengembangkan sistem informasi ketersediaan dosen dan manajemen janji temu berbasis face recognition, aplikasi web, dan perangkat IoT guna meningkatkan efisiensi komunikasi akademik.", "image": "images/janji.jpeg", "video": "https://canva.link/n6txybiqv1ozvpk", "techStack": ["Face Recognition", "Web App", "IoT", "Flask","Whatsapp-Web.js"] },
        { "title": "Smart Aquaculture System", "category": ["iot", "web"], "year": "2025", "description": "Membangun sistem berbasis Internet of Things (IoT) untuk otomatisasi pemeliharaan akuarium koi, memantau kualitas air via berbagai sensor, serta menciptakan ekosistem air yang stabil dan optimal secara otomatis.", "image": "images/aquac.jpeg", "video": "https://youtu.be/HuyZNeZBn3c?si=QDu2RkxMFjkwFu96", "techStack": ["ESP32", "IoT", "Sensors", "Automation"] },
        { "title": "Smart Home Security with Arduino Uno", "category": ["iot"], "year": "2022", "role": "Team Lead", "description": "Membuat purwarupa sistem keamanan rumah berbasis IoT menggunakan NodeMCU dan Arduino Uno untuk monitoring keamanan lingkungan rumah secara nirkabel.", "image": "", "video": "", "techStack": ["Arduino Uno", "NodeMCU", "IoT", "Security Sensors"] },
        { "title": "Cigarette Rolling Machine", "category": ["automation"], "year": "2022", "partner": "Freelance", "role": "Assistant Technician", "description": "Melakukan otomatisasi mesin pelinting sigaret berbasis kendali PLC serta merakit sistem pengasutan motor star-delta untuk kebutuhan industri.", "image": "", "video": "", "techStack": ["PLC", "Automation", "Electrical Wiring", "Star-Delta Motor"] },
        { "title": "Conveyor Automation with PLC", "category": ["automation"], "year": "2022", "partner": "Freelance", "role": "Freelance Control Systems Programmer", "description": "Merancang dan mengimplementasikan logika kontrol otomatisasi pada mesin konveyor industri menggunakan Programmable Logic Controller (PLC).", "image": "", "video": "", "techStack": ["PLC Programming", "Industrial Automation", "Conveyor Systems"] },
        { "title": "Soil Moisture Monitoring System", "category": ["iot"], "year": "2022", "partner": "Bandung Institute of Technology", "role": "Intern Team Lead", "description": "Merakit rangkaian analog dan mengonfigurasi jaringan sensor kelembaban tanah untuk meningkatkan akurasi data manajemen air secara real-time pada sistem pertanian presisi.", "image": "images/itb.png", "video": "", "techStack": ["Analog Circuits", "Sensor Networks", "Precision Agriculture"] },
        { "title": "Online Attendance Using RFID", "category": ["iot", "web"], "year": "2022", "partner": "Bandung Institute of Technology", "role": "Intern Team Lead", "description": "Mengembangkan arsitektur sistem absensi online berbasis teknologi RFID untuk meningkatkan validitas data dan efisiensi manajemen kehadiran personel dalam organisasi.", "image": "images/itb.png", "video": "", "techStack": ["RFID Technology", "Embedded Systems", "Digitalization"] },
        { "title": "Stamping Machine with Pneumatic Integrated with PLC", "category": ["automation"], "year": "2022", "description": "Membuat purwarupa mesin stamping otomatis yang mengintegrasikan aktuator pneumatik dengan logika kontrol berbasis PLC.", "image": "images/project-pneumatic.jpg", "video": "", "techStack": ["Pneumatics", "PLC Integration", "Prototype Development"] },
        { "title": "Smart Door Lock System for Bank Security System", "category": ["iot"], "year": "2022", "partner": "Freelance", "role": "Assistant Technician", "description": "Membangun sistem keamanan berlapis untuk brankas bank memanfaatkan integrasi sensor inframerah (infrared) dan sensor sentuh (touch sensor).", "image": "", "video": "", "techStack": ["Infrared Sensors", "Touch Sensors", "Hardware Security"] }
    ];

    const filterContainer = document.getElementById("filter-container");
    const projectsGrid = document.getElementById("projects-grid");
    
    // GENERATE BUTTON FILTER SECARA DINAMIS
    PROJECT_CATEGORIES.forEach(category => {
        const btn = document.createElement("button");
        btn.className = `filter-btn ${category.id === 'all' ? 'active' : ''}`;
        btn.setAttribute("data-filter", category.id);
        btn.textContent = category.label;
        filterContainer.appendChild(btn);
    });

    // FUNGSI RENDER PROJECT
    function renderProjects(filterCategory) {
        projectsGrid.innerHTML = '';
        
        // Membaca array category di dalam JSON
        const filteredProjects = filterCategory === 'all' 
            ? projectsData 
            : projectsData.filter(p => p.category && p.category.includes(filterCategory));

        filteredProjects.forEach((project, index) => {
            const imageElement = project.image && project.image !== "" 
                ? `<img src="${project.image}" alt="${project.title}" onerror="this.outerHTML='<div class=\\'project-placeholder\\'><i class=\\'fas fa-microchip\\'></i></div>'">` 
                : `<div class="project-placeholder"><i class="fas fa-microchip"></i></div>`;

            let techStackHTML = project.techStack ? `<div class="tech-stack-container">${project.techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}</div>` : '';
            let roleHTML = project.role ? `<span><i class="fas fa-user-tag"></i> ${project.role}</span>` : '';
            let partnerHTML = project.partner ? `<span><i class="fas fa-building"></i> ${project.partner}</span>` : '';
            let videoHTML = project.video && project.video !== "" ? `<a href="${project.video}" target="_blank" class="demo-btn"><i class="fas fa-play-circle"></i> Watch Demo</a>` : '';

            const projectCard = document.createElement("div");
            projectCard.className = "project-card glass-card";
            projectCard.setAttribute("data-aos", "zoom-in-up");
            projectCard.setAttribute("data-aos-delay", (index % 3) * 100);
            projectCard.innerHTML = `
                <div class="project-image">${imageElement}</div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <div class="project-meta">
                        <span><i class="far fa-calendar-alt"></i> ${project.year}</span>
                        ${roleHTML}
                        ${partnerHTML}
                    </div>
                    <p class="project-desc">${project.description}</p>
                    ${videoHTML}
                    ${techStackHTML}
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });
        AOS.refresh(); // Segarkan animasi setelah merender ulang elemen
    }

    renderProjects('all'); // Tampilkan semua di awal

    // LOGIKA EVENT LISTENER UNTUK FILTER (Ditempel ke tombol yang baru di-generate)
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.getAttribute('data-filter'));
        });
    });

    // 6. DATA CERTIFICATES
    const certificatesData = [
        { "title": "Certification: Scaling Digitalization with Edge-as-a-Service", "issuer": "Advantech IoT Academy", "logo": "images/advantech.png", "year": "21 December 2025", "description": "Certified Basic credential for successfully completing the course on scaling digitalization frameworks utilizing Edge-as-a-Service (EaaS) solutions.", "link": "https://drive.google.com/drive/folders/12_A8RtBY9SdBq8furuJCre6m8eg6_A6k?usp=sharing" },
        { "title": "WISE-4000 LAN Wireless I/O Module Series - Basic", "issuer": "Advantech IoT Academy", "logo": "images/advantech.png", "year": "21 December 2025", "description": "Certified training program focusing on configuration, data acquisition, and implementation of WISE-4000LAN Wireless I/O Module networks.", "link": "https://drive.google.com/drive/folders/12_A8RtBY9SdBq8furuJCre6m8eg6_A6k?usp=sharing" },
        { "title": "Sertifikat Praktek Kerja Lapangan (PKL)", "issuer": "PT Panasonic Manufacturing Indonesia", "logo": "images/pmi.jpg", "year": "01 September 2021", "description": "Diberikan atas penyelesaian Praktek Kerja Lapangan di Business Unit Group Refrigerator dengan predikat Sangat Baik (A) pada kompetensi Kemampuan Teknik, Kualitas Kerja, dan Kedisiplinan.", "link": "https://drive.google.com/drive/folders/12_A8RtBY9SdBq8furuJCre6m8eg6_A6k?usp=sharing" },
        { "title": "Sertifikat PKL/Prakerin & Magang Online Batch-1", "issuer": "PPTIK Institut Teknologi Bandung (ITB)", "logo": "images/itb.png", "year": "Maret 2021", "description": "Diberikan atas partisipasi sebagai peserta program magang di Laboratorium Internet of Things (IoT) PPTIK-ITB periode Januari - Maret 2021 dengan hasil penilaian Baik.", "link": "https://drive.google.com/drive/folders/12_A8RtBY9SdBq8furuJCre6m8eg6_A6k?usp=sharing" }
    ];

    const certList = document.getElementById("certificates-list");
    certificatesData.forEach((cert, idx) => {
        const certCard = document.createElement("div");
        certCard.className = "experience-item glass-card";
        certCard.setAttribute("data-aos", "fade-right");
        certCard.setAttribute("data-aos-delay", idx * 100);
        certCard.innerHTML = `
            <div class="exp-header">
                <img src="${cert.logo}" alt="${cert.issuer}" class="exp-logo" onerror="this.src='https://ui-avatars.com/api/?name=${cert.issuer[0]}&background=ffffff&color=0f172a'">
                <div class="header-text">
                    <h3>${cert.title}</h3>
                    <p class="subtitle">${cert.issuer}</p>
                    <p class="year"><i class="far fa-calendar-alt"></i> ${cert.year}</p>
                </div>
            </div>
            <p class="desc-text" style="margin-bottom: 1rem;">${cert.description}</p>
            <a href="${cert.link}" target="_blank" style="color: var(--primary-color); text-decoration: none; font-size: 0.9rem;"><i class="fas fa-external-link-alt"></i> View Certificate</a>
        `;
        certList.appendChild(certCard);
    });

    // 7. Scroll to Top Logic
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
