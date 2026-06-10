/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: #3498db;
    --secondary-color: #2c3e50;
    --light-color: #ecf0f1;
    --dark-color: #2c3e50;
    --accent-color: #e74c3c;
    --spacing: 1rem;
    --border-radius: 4px;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f9f9f9;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing);
}

/* Header Styles */
header {
    background-color: var(--secondary-color);
    color: white;
    position: sticky;
    top: 0;
    z-index: 100;
}

/* Sidebar Minimalis (Hanya menyembunyikan diri di Mobile) */
.sidebar-nav {
    position: fixed;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(44, 62, 80, 0.95);
    padding: 1.5rem 0;
    border-radius: 0 1rem 1rem 0;
    z-index: 1000;
    box-shadow: 4px 0 25px rgba(0,0,0,0.15);
    transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    width: 60px; /* Mini mode default */
    overflow: hidden;
}

.sidebar-nav:hover {
    width: 220px; /* Melebar saat hover */
}

.sidebar-nav ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 0;
    margin: 0;
    width: 220px;
}

.sidebar-nav a {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 18px;
    transition: all 0.2s ease;
    white-space: nowrap;
}

.sidebar-nav a:hover, .sidebar-nav a.active {
    background: rgba(255,255,255,0.1);
    color: var(--primary-color);
}

.sidebar-nav i {
    font-size: 1.2rem;
    min-width: 24px;
    text-align: center;
    transition: transform 0.3s ease;
}

.sidebar-nav a.active i {
    transform: scale(1.1);
}

.nav-text {
    opacity: 0;
    margin-left: 1rem;
    transition: opacity 0.2s ease;
    display: inline-block;
}

.sidebar-nav:hover .nav-text {
    opacity: 1;
}

.sidebar-nav a::after {
    content: attr(data-tooltip);
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    background: var(--primary-color);
    color: white;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    font-size: 0.8rem;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: all 0.2s ease;
    margin-left: 1.5rem;
}

.sidebar-nav:not(:hover) a:hover::after {
    opacity: 1;
    margin-left: 0.8rem;
}

/* Section Styles */
.section {
    padding: 4rem 0;
    border-bottom: 1px solid #eee;
    position: relative;
}

.section h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: var(--secondary-color);
    font-size: 2rem;
}

/* Profile Section */
.profile-content {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: flex-start;
}

.profile-image-container {
    flex: 0 0 300px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    position: sticky;
    top: 2rem;
}

.profile-image {
    width: 100%;
    max-width: 300px;
    height: auto;
    aspect-ratio: 1/1;
    border-radius: 10%;
    object-fit: cover;
    border: 5px solid var(--primary-color);
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    align-self: center;
}

.profile-contact {
    background: white;
    padding: 1rem;
    border-radius: var(--border-radius);
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.profile-contact p {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    word-break: break-all;
}

.profile-info {
    flex: 1;
    min-width: 300px;
}

.profile-description {
    background: white;
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    line-height: 1.7;
}

.social-links {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.social-links a {
    color: var(--secondary-color);
    font-size: 1.5rem;
    transition: all 0.3s ease;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(52, 152, 219, 0.1);
}

.social-links a:hover {
    color: white;
    background: var(--primary-color);
    transform: translateY(-3px);
}

.cv-download-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(231, 76, 60, 0.1);
    color: var(--accent-color);
    border-radius: 50%;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 1rem;
    border: 1px solid rgba(231, 76, 60, 0.3);
}

.cv-download-btn:hover {
    background: var(--accent-color);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 3px 8px rgba(231, 76, 60, 0.3);
}

/* Skills Section */
.skills-container {
    margin-top: 2rem;
    background: white;
    padding: 1.5rem;
    border-radius: var(--border-radius);
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.skills-container h3 {
    color: var(--secondary-color);
    margin-bottom: 1rem;
    font-size: 1.2rem;
}

.skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
}

.skill-item {
    background: rgba(52, 152, 219, 0.1);
    padding: 0.5rem 0.8rem;
    border-radius: 20px;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

.skill-icon {
    color: var(--primary-color);
    font-size: 1.2rem;
    width: 1.5rem;
    text-align: center;
}

.skill-name {
    font-weight: 500;
}

/* Education & Experience Sections */
.education-list, .experience-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.education-item, .experience-item {
    background-color: white;
    padding: 1.5rem;
    border-radius: var(--border-radius);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 2;
}

.education-item h3, .experience-item h3 {
    color: var(--primary-color);
    margin-bottom: 0.2rem;
}

.education-item .degree, .experience-item .position {
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.education-item .year, .experience-item .duration {
    color: #666;
    font-style: italic;
    margin-bottom: 0.5rem;
}

.edu-header, .exp-header {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 0.5rem;
}

.edu-logo, .exp-logo {
    width: 60px;
    height: 60px;
    object-fit: contain;
    border-radius: 4px;
    background: white;
    padding: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

/* Projects Section */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

.project-card {
    background-color: white;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
    position: relative;
    z-index: 2;
}

.project-card:hover {
    transform: translateY(-5px);
}

.project-image {
    height: 200px;
    overflow: hidden;
}

.project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
}

.project-card:hover .project-image img {
    transform: scale(1.05);
}

.project-info {
    padding: 1.5rem;
}

.project-info h3 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.project-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #666;
}

.project-link {
    display: inline-block;
    margin-top: 1rem;
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
    cursor: pointer;
}

.project-link:hover {
    color: var(--accent-color);
}

/* Footer */
footer {
    text-align: center;
    padding: 1.5rem;
    background-color: var(--secondary-color);
    color: white;
    position: relative;
    z-index: 10;
}

/* Scroll Animation Hooks */
.section.animate {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

#profile.animate { transition-delay: 0.1s; }
#education.animate { transition-delay: 0.2s; }
#experience.animate { transition-delay: 0.3s; }
#projects.animate { transition-delay: 0.4s; }
#certificates.animate { transition-delay: 0.5s; }

.section::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path fill="none" stroke="%23e74c3c" stroke-width="0.5" d="M0,0 L100,100" /></svg>');
    opacity: 0;
    transition: opacity 0.5s;
    pointer-events: none;
    z-index: 1;
}

.section.animate::before {
    opacity: 0.03;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .profile-image-container {
        flex: 1 1 100%;
        position: static;
    }
    .profile-image {
        max-width: 200px;
    }
}

@media (max-width: 650px) {
    .sidebar-nav {
        display: none;
    }
}
