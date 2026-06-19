import { initCircuitBackground } from './background.js'
import {
  initReveal,
  observeReveal,
  attachSpotlight,
  attachTilt,
  initCountUps,
  setCountUpTargets,
  initDock,
  initSplitHero
} from './effects.js'

const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'iot', label: 'IoT & Hardware' },
  { id: 'automation', label: 'Industrial Automation' },
  { id: 'web', label: 'Web App' }
]

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('current-year').textContent = new Date().getFullYear()

  initCircuitBackground(document.getElementById('circuit-threads'))
  initDock()
  initReveal()
  document.querySelectorAll('[data-spotlight]').forEach(attachSpotlight)

  loadData()
})

function hidePreloader() {
  const preloader = document.getElementById('preloader')
  if (preloader) {
    preloader.classList.add('is-hidden')
    setTimeout(() => (preloader.style.display = 'none'), 500)
  }
}

async function fetchJson(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (e) {
    console.error(`Failed to load ${url}:`, e)
    return null
  }
}

async function loadData() {
  const [profile, education, experience, projects, certificates] = await Promise.all([
    fetchJson('data/profile.json'),
    fetchJson('data/education.json'),
    fetchJson('data/experience.json'),
    fetchJson('data/projects.json'),
    fetchJson('data/certificates.json')
  ])

  if (profile) renderProfile(profile)
  if (education) renderEducation(education)
  if (experience) renderExperience(experience)
  if (projects) renderProjects(projects)
  if (certificates) renderCertificates(certificates)

  applyStats({ education, experience, projects, certificates })

  hidePreloader()
  initCountUps()
}

/* ------------------------------- Stats ------------------------------- */
function extractYears(str = '') {
  return (str.match(/\d{4}/g) || []).map(Number)
}

function applyStats({ education, experience, projects, certificates }) {
  const years = [...(education || []).flatMap(e => extractYears(e.year)), ...(experience || []).flatMap(e => extractYears(e.year))]
  const earliest = years.length ? Math.min(...years) : null
  const currentYear = new Date().getFullYear()
  const yearsActive = earliest ? Math.max(currentYear - earliest, 1) : null

  setCountUpTargets([yearsActive ?? 0, projects?.length ?? 0, certificates?.length ?? 0])
}

/* ------------------------------- Profile ------------------------------- */
function renderProfile(data) {
  document.getElementById('profile-description').textContent = data.description

  const nameEl = document.getElementById('profile-name')
  nameEl.textContent = data.name
  initSplitHero(nameEl)

  const profilePic = document.getElementById('profile-pic')
  profilePic.src = data.profileImage
  profilePic.alt = data.name
  profilePic.onerror = () => {
    profilePic.onerror = null
    profilePic.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=050810&color=00f2fe&size=300`
  }
  attachTilt(document.getElementById('profile-tilt'))

  document.getElementById('profile-email').textContent = data.email
  document.getElementById('profile-phone').textContent = data.phone

  const actions = document.getElementById('hero-actions')
  actions.innerHTML = ''

  ;(data.socialMedia || []).forEach(social => {
    let iconClass = 'fas fa-link'
    if (social.platform.toLowerCase().includes('linkedin')) iconClass = 'fab fa-linkedin-in'
    if (social.platform.toLowerCase().includes('github')) iconClass = 'fab fa-github'
    const url = social.url.startsWith('http') ? social.url : `https://${social.url}`

    const a = document.createElement('a')
    a.href = url
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    a.className = 'icon-btn glare-hover'
    a.title = social.platform
    a.innerHTML = `<i class="${iconClass}"></i>`
    actions.appendChild(a)
  })

  const cvBtn = document.createElement('a')
  cvBtn.className = 'icon-btn glare-hover'
  cvBtn.innerHTML = `<i class="${data.cv?.icon || 'fas fa-file-pdf'}"></i>`
  if (data.cv?.file) {
    cvBtn.href = data.cv.file
    cvBtn.setAttribute('download', '')
    cvBtn.title = data.cv.text || 'Download CV'
  } else {
    cvBtn.href = '#'
    cvBtn.classList.add('is-disabled')
    cvBtn.title = 'CV is currently unavailable'
    cvBtn.addEventListener('click', e => {
      e.preventDefault()
      alert('My CV is currently being updated. Please check back later!')
    })
  }
  actions.appendChild(cvBtn)

  const skillsGrid = document.getElementById('skills-grid')
  skillsGrid.innerHTML = (data.skills || [])
    .map(skill => `<div class="skill-chip"><i class="${skill.icon}"></i><span>${skill.name}</span></div>`)
    .join('')
}

/* ------------------------------ Education ------------------------------ */
function renderEducation(data) {
  const list = document.getElementById('education-list')
  data.forEach(edu => {
    const item = document.createElement('div')
    item.className = 'timeline-item panel'
    item.setAttribute('data-reveal', '')
    item.setAttribute('data-reveal-dir', 'horizontal')
    item.innerHTML = `
      <div class="item-header">
        <img src="${edu.logo}" alt="${edu.university}" class="item-logo" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(edu.university[0])}&background=ffffff&color=050810'">
        <div class="item-header-text">
          <h3>${edu.university}</h3>
          <p class="subtitle">${edu.major}</p>
          <p class="year"><i class="far fa-calendar-alt"></i> ${edu.year}</p>
        </div>
      </div>
      <p class="item-desc">${edu.description}</p>
    `
    list.appendChild(item)
    observeReveal(item)
  })
}

/* ------------------------------ Experience ------------------------------ */
function renderExperience(data) {
  const list = document.getElementById('experience-list')
  data.forEach(exp => {
    const item = document.createElement('div')
    item.className = 'timeline-item panel'
    item.setAttribute('data-reveal', '')
    item.setAttribute('data-reveal-dir', 'horizontal')
    item.innerHTML = `
      <div class="item-header">
        <img src="${exp.logo}" alt="${exp.company}" class="item-logo" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(exp.company[0])}&background=ffffff&color=050810'">
        <div class="item-header-text">
          <h3>${exp.company}</h3>
          <p class="subtitle">${exp.position}</p>
          <p class="year"><i class="far fa-calendar-alt"></i> ${exp.year}</p>
        </div>
      </div>
      <p class="item-desc">${exp.description}</p>
    `
    list.appendChild(item)
    observeReveal(item)
  })
}

/* ------------------------------ Certificates ----------------------------- */
function renderCertificates(data) {
  const list = document.getElementById('certificates-list')
  data.forEach(cert => {
    const item = document.createElement('div')
    item.className = 'timeline-item panel'
    item.setAttribute('data-reveal', '')
    item.setAttribute('data-reveal-dir', 'horizontal')
    item.innerHTML = `
      <div class="item-header">
        <img src="${cert.logo}" alt="${cert.issuer}" class="item-logo" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(cert.issuer[0])}&background=ffffff&color=050810'">
        <div class="item-header-text">
          <h3>${cert.title}</h3>
          <p class="subtitle">${cert.issuer}</p>
          <p class="year"><i class="far fa-calendar-alt"></i> ${cert.year}</p>
        </div>
      </div>
      <p class="item-desc">${cert.description}</p>
      <a href="${cert.link}" target="_blank" rel="noopener noreferrer" class="cert-link"><i class="fas fa-external-link-alt"></i> View Certificate</a>
    `
    list.appendChild(item)
    observeReveal(item)
  })
}

/* ------------------------------- Projects -------------------------------- */
function renderProjects(data) {
  const filterContainer = document.getElementById('filter-container')
  const projectsGrid = document.getElementById('projects-grid')

  filterContainer.innerHTML = PROJECT_CATEGORIES.map(
    cat => `<button class="filter-btn ${cat.id === 'all' ? 'is-active' : ''}" data-filter="${cat.id}">${cat.label}</button>`
  ).join('')

  function display(filter) {
    projectsGrid.innerHTML = ''
    const filtered = filter === 'all' ? data : data.filter(p => p.category?.includes(filter))

    filtered.forEach(project => {
      const card = document.createElement('div')
      card.className = 'project-card panel spotlight-card'
      card.setAttribute('data-spotlight', '')
      card.setAttribute('data-reveal', '')

      const imageHtml = project.image
        ? `<img src="${project.image}" alt="${project.title}" onerror="this.outerHTML='<div class=&quot;project-placeholder&quot;><i class=&quot;fas fa-microchip&quot;></i></div>'">`
        : `<div class="project-placeholder"><i class="fas fa-microchip"></i></div>`

      const techHtml = project.techStack
        ? `<div class="tech-stack">${project.techStack.map(t => `<span class="tech-badge">${t}</span>`).join('')}</div>`
        : ''
      const roleHtml = project.role ? `<span><i class="fas fa-user-tag"></i> ${project.role}</span>` : ''
      const partnerHtml = project.partner ? `<span><i class="fas fa-building"></i> ${project.partner}</span>` : ''
      const videoHtml = project.video
        ? `<a href="${project.video}" target="_blank" rel="noopener noreferrer" class="demo-btn glare-hover"><i class="fas fa-play-circle"></i> Watch Demo</a>`
        : ''

      card.innerHTML = `
        <div class="project-image">${imageHtml}</div>
        <div class="project-info">
          <h3>${project.title}</h3>
          <div class="project-meta">
            <span><i class="far fa-calendar-alt"></i> ${project.year}</span>
            ${roleHtml}
            ${partnerHtml}
          </div>
          <p class="project-desc">${project.description}</p>
          ${videoHtml}
          ${techHtml}
        </div>
      `
      projectsGrid.appendChild(card)
      attachSpotlight(card)
      observeReveal(card)
    })
  }

  display('all')

  filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('is-active'))
      btn.classList.add('is-active')
      display(btn.getAttribute('data-filter'))
    })
  })
}
