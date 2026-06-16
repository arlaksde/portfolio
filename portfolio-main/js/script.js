document.addEventListener("DOMContentLoaded", () => {
    // Inisialisasi AOS Animation
    AOS.init({
        once: true,
        offset: 50,
        duration: 800
    });

    document.getElementById("current-year").textContent = new Date().getFullYear();

    // -- DATA DUMMY (Silakan ganti dengan fetch() jika menggunakan file eksternal) --
    
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
        "cv": { "file": "docs/cv2.pdf" },
        "skills": [
            {"name": "Internet of Things", "icon": "fas fa-wifi"},
            {"name": "Hardware Programming", "icon": "fas fa-microchip"},
            {"name": "Web Programming", "icon": "fab fa-js"},
            {"name": "Project Management", "icon": "fas fa-list-check"},
            {"name": "Foreign Languages", "icon": "fas fa-language"}
        ]
    };

    const projectsData = [
        {
            "title": "Sistem Janji Temu Dosen dan Mahasiswa",
            "year": "2025",
            "description": "Mengembangkan sistem informasi berbasis face recognition, aplikasi web, dan perangkat IoT guna meningkatkan efisiensi komunikasi akademik.",
            "image": "images/janji.jpeg",
            "techStack": ["Face Recognition", "Web App", "IoT", "Flask", "Whatsapp-Web.js"]
        },
        {
            "title": "Smart Aquaculture System",
            "year": "2025",
            "description": "Membangun sistem berbasis Internet of Things (IoT) untuk otomatisasi pemeliharaan akuarium, memantau kualitas air via berbagai sensor.",
            "image": "", // Gambar Kosong: Akan digantikan oleh UI Placeholder
            "techStack": ["ESP32", "IoT", "Sensors", "Automation"]
        },
        {
            "title": "Smart Home Security",
            "year": "2022",
            "description": "Membuat purwarupa sistem keamanan rumah berbasis IoT menggunakan NodeMCU dan Arduino Uno.",
            "image": "", // Gambar Kosong
            "techStack": ["Arduino Uno", "NodeMCU", "IoT"]
        }
    ];

    // Load Profile
    document.getElementById("profile-name").textContent = profileData.name;
    document.getElementById("profile-description").textContent = profileData.description;
    
    // Fallback profile pic if doesn't exist to avoid broken link visually
    const profilePic = document.getElementById("profile-pic");
    profilePic.src = profileData.profileImage;
    profilePic.onerror = () => { profilePic.src = 'https://ui-avatars.com/api/?name=Arya+Dewanata&background=0f172a&color=4facfe&size=300'; };

    document.getElementById("profile-email").textContent = profileData.email;
    document.getElementById("profile-phone").textContent = profileData.phone;
    document.getElementById("cv-download").href = profileData.cv.file;

    const socialLinksContainer = document.getElementById("social-links");
    profileData.socialMedia.forEach(social => {
        const a = document.createElement("a");
        a.href = social.url;
        a.target = "_blank";
        a.innerHTML = `<i class="${social.icon || 'fas fa-link'}"></i>`;
        socialLinksContainer.appendChild(a);
    });

    const skillsGrid = document.getElementById("skills-grid");
    profileData.skills.forEach(skill => {
        const skillDiv = document.createElement("div");
        skillDiv.className = "skill-item";
        skillDiv.innerHTML = `<i class="${skill.icon} skill-icon"></i><span class="skill-name">${skill.name}</span>`;
        skillsGrid.appendChild(skillDiv);
    });

    // Load Projects dengan penanganan gambar kosong (Fallback Placeholder)
    const projectsGrid = document.getElementById("projects-grid");
    projectsData.forEach((project, index) => {
        const delay = (index % 3) * 100; // Efek muncul bergantian
        
        // Cek jika gambar ada atau kosong
        const imageElement = project.image && project.image !== "" 
            ? `<img src="${project.image}" alt="${project.title}" onerror="this.outerHTML='<div class=\\'project-placeholder\\'><i class=\\'fas fa-robot\\'></i></div>'">` 
            : `<div class="project-placeholder"><i class="fas fa-microchip"></i></div>`;

        let techStackHTML = '';
        if(project.techStack) {
            techStackHTML = `<div class="tech-stack-container">
                ${project.techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>`;
        }

        const projectCard = document.createElement("div");
        projectCard.className = "project-card glass-card";
        projectCard.setAttribute("data-aos", "zoom-in-up");
        projectCard.setAttribute("data-aos-delay", delay);
        
        projectCard.innerHTML = `
            <div class="project-image">
                ${imageElement}
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <div class="project-meta">
                    <span><i class="far fa-calendar-alt"></i> ${project.year}</span>
                </div>
                <p style="font-size: 0.9rem; margin-bottom: 1rem;">${project.description}</p>
                ${techStackHTML}
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });

    // Gunakan logika perulangan yang sama untuk Education, Experience, dan Certificate dengan style 'glass-card'
});
