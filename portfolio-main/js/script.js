// VARIABEL GLOBAL UNTUK KATEGORI PROJECT
const PROJECT_CATEGORIES = [
    { id: 'all', label: 'All Projects' },
    { id: 'iot', label: 'IoT & Hardware' },
    { id: 'automation', label: 'Industrial Automation' },
    { id: 'web', label: 'Web App' }
];

document.addEventListener("DOMContentLoaded", () => {
    // Inisialisasi AOS Animation
    AOS.init({ once: true, offset: 50, duration: 800 });
    document.getElementById("current-year").textContent = new Date().getFullYear();

    // Fungsi Utama untuk memuat semua data JSON
    async function loadAllData() {
        try {
            // Fetch semua JSON secara bersamaan
            const [profileRes, eduRes, expRes, projRes, certRes] = await Promise.all([
                fetch('profile.json'),
                fetch('education.json'),
                fetch('experience.json'),
                fetch('projects.json'),
                fetch('certificates.json')
            ]);

            // Konversi response ke bentuk JSON
            const profileData = await profileRes.json();
            const educationData = await eduRes.json();
            const experienceData = await expRes.json();
            const projectsData = await projRes.json();
            const certificatesData = await certRes.json();

            // Render masing-masing bagian
            renderProfile(profileData);
            renderEducation(educationData);
            renderExperience(experienceData);
            renderProjects(projectsData);
            renderCertificates(certificatesData);

            // Matikan preloader setelah semua data berhasil dimuat
            const preloader = document.getElementById('preloader');
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 500);

            AOS.refresh(); // Segarkan animasi
        } catch (error) {
            console.error("Gagal memuat file JSON! Pastikan Anda membukanya menggunakan Live Server.", error);
            alert("Error loading data. Please open via Live Server/Localhost.");
        }
    }

    // Jalankan fungsi muat data
    loadAllData();

    // --- FUNGSI-FUNGSI RENDER DOM ---

    function renderProfile(data) {
        document.getElementById("profile-name").textContent = data.name;
        document.getElementById("profile-description").textContent = data.description;
        
        const profilePic = document.getElementById("profile-pic");
        profilePic.src = data.profileImage;
        profilePic.onerror = () => { profilePic.src = 'https://ui-avatars.com/api/?name=Arya+Dewanata&background=0f172a&color=4facfe&size=300'; };

        document.getElementById("profile-email").textContent = data.email;
        document.getElementById("profile-phone").textContent = data.phone;

        // Render Social Media
        const socialLinksContainer = document.getElementById("social-links");
        data.socialMedia.forEach(social => {
            // Karena di JSON Anda tidak ada "icon", kita tentukan otomatis dari nama platformnya
            let iconClass = 'fas fa-link';
            if(social.platform.toLowerCase().includes('linkedin')) iconClass = 'fab fa-linkedin-in';
            if(social.platform.toLowerCase().includes('github')) iconClass = 'fab fa-github';

            // Pastikan URL valid (tambah https jika belum ada)
            let finalUrl = social.url.startsWith('http') ? social.url : 'https://' + social.url;

            const a = document.createElement("a");
            a.href = finalUrl;
            a.target = "_blank";
            a.innerHTML = `<i class="${iconClass}"></i>`;
            socialLinksContainer.insertBefore(a, document.getElementById("cv-download"));
        });

        // Handle CV
        const cvBtn = document.getElementById("cv-download");
        if(data.cv && data.cv.file !== "") {
            cvBtn.href = data.cv.file;
            cvBtn.download = "";
        } else {
            cvBtn.addEventListener("click", (e) => {
                e.preventDefault();
                alert("My CV is currently being updated. Please check back later!");
            });
        }

        // Render Skills
        const skillsGrid = document.getElementById("skills-grid");
        data.skills.forEach(skill => {
            const skillDiv = document.createElement("div");
            skillDiv.className = "skill-item";
            skillDiv.innerHTML = `<i class="${skill.icon} skill-icon"></i><span class="skill-name">${skill.name}</span>`;
            skillsGrid.appendChild(skillDiv);
        });
    }

    function renderEducation(data) {
        const eduList = document.getElementById("education-list");
        data.forEach((edu, idx) => {
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
    }

    function renderExperience(data) {
        const expList = document.getElementById("experience-list");
        data.forEach((exp, idx) => {
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
    }

    function renderProjects(projectsData) {
        const filterContainer = document.getElementById("filter-container");
        const projectsGrid = document.getElementById("projects-grid");
        
        // Generate Buttons Filter
        filterContainer.innerHTML = ''; // Bersihkan dulu
        PROJECT_CATEGORIES.forEach(category => {
            const btn = document.createElement("button");
            btn.className = `filter-btn ${category.id === 'all' ? 'active' : ''}`;
            btn.setAttribute("data-filter", category.id);
            btn.textContent = category.label;
            filterContainer.appendChild(btn);
        });

        // Fungsi Filter Data
        function displayFilteredProjects(filterCategory) {
            projectsGrid.innerHTML = '';
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
            AOS.refresh();
        }

        // Tampilkan semua data saat pertama kali dimuat
        displayFilteredProjects('all');

        // Event Listener Tombol Filter
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                displayFilteredProjects(btn.getAttribute('data-filter'));
            });
        });
    }

    function renderCertificates(data) {
        const certList = document.getElementById("certificates-list");
        data.forEach((cert, idx) => {
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
    }

    // --- SCROLL TO TOP LOGIC ---
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
