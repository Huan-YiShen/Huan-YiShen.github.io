/**
 * Content loader for dynamic page population
 * Load content from JSON files and populate page templates
 */

async function loadPageContent(pageType) {
  try {
    // Fetch the appropriate data file
    const response = await fetch(`json/${pageType}.json`);
    if (!response.ok) throw new Error(`Failed to load ${pageType}.json`);
    const content = await response.json();

    // Route to appropriate loader based on page type
    switch (pageType) {
      case 'intro':
        loadIntroContent(content);
        break;
      case 'projects':
        loadProjectsContent(content);
        break;
      case 'cv':
        loadCVContent(content);
        break;
    }
  } catch (error) {
    console.error('Error loading page content:', error);
  }
}

function loadIntroContent(data) {
  const about = data.about;

  // Headline
  const headline = document.querySelector('.intro-hero h1');
  if (headline) {
    headline.textContent = about.headline;
  } else {
    console.warn('Could not find headline element');
  }

  // Eyebrow
  const eyebrow = document.querySelector('.intro-hero .eyebrow');
  if (eyebrow) {
    eyebrow.textContent = about.eyebrow;
  } else {
    console.warn('Could not find eyebrow element');
  }

  // Bio paragraph
  const bio = document.querySelector('.intro-hero .lead');
  if (bio) {
    bio.textContent = about.bio;
  } else {
    console.warn('Could not find bio element');
  }

  // CTA buttons
  const ctaRow = document.querySelector('.cta-row');
  if (ctaRow) {
    ctaRow.innerHTML = about.cta
      .map(
        (btn) =>
          `<a class="button ${btn.style === 'primary' ? 'primary' : ''}" href="${btn.href}">${btn.label}</a>`
      )
      .join('');
  } else {
    console.warn('Could not find cta-row element');
  }

}

function loadProjectsContent(data) {
  const heading = document.querySelector('.section-heading');
  if (heading) heading.textContent = data.heading;

  const grid = document.querySelector('.grid');
  if (grid) {
    grid.innerHTML = data.projects
      .map(
        (project) => `
      <article class="project-card">
        <div class="eyebrow">${project.eyebrow}</div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tag-row">
          ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </article>
    `
      )
      .join('');
  }
}

function loadCVContent(data) {
  const heading = document.querySelector('.section-heading');
  if (heading) heading.textContent = data.heading;

  // Skills section
  const skillsContainer = document.querySelector('.skills');
  if (skillsContainer) {
    skillsContainer.innerHTML = data.skills.list
      .map((skill) => `<span>${skill}</span>`)
      .join('');
  }

  // Experience timeline - education
  const education = document.querySelector('.education');
  if (education) {
    education.innerHTML = data.education
      .map(
        (ed) => `
      <article class="cv-card timeline-item">
        <div class="meta">
          <span>${ed.dateRange}</span>
          <span>${ed.institution}</span>
        </div>
        <h3>${ed.program}</h3>
        <p>${ed.description}</p>
      </article>
    `
      )
      .join('');
  }

  // Experience timeline - research
  const research = document.querySelector('.research-experience');
  if (research) {
    research.innerHTML = data.research_experience
      .map(
        (re) => `
      <article class="cv-card timeline-item">
        <div class="meta">
          <span>${re.dateRange} | </span>
          <span>${re.institution}</span>
        </div>
        <h3>${re.role}</h3>
        <p>${re.description}</p>
      </article>
    `
      )
      .join('');
  }

  // Experience timeline - work
  const workExperience = document.querySelector('.work-experience');
  if (workExperience) {
    workExperience.innerHTML = data.work_experience
      .map(
        (we) => `
      <article class="cv-card timeline-item">
        <div class="meta">
          <span>${we.dateRange}</span>
          <span>${we.company}</span>
        </div>
        <h3>${we.role}</h3>
        <p>${we.description}</p>
      </article>
    `
      )
      .join('');
  }

  // const timeline = document.querySelector('.timeline');
  // if (workExperience) {
  //   workExperience.innerHTML = '<h3>Experience</h3>';
  //   workExperience.innerHTML += data.workExperience
  //     .map(
  //       (we) => `
  //     <article class="cv-card timeline-item">
  //       <div class="meta">
  //         <span>${we.dateRange}</span>
  //         <span>${we.institution}</span>
  //       </div>
  //       <h3>${we.program}</h3>
  //       <p>${we.description}</p>
  //     </article>
  //   `
  //     )
  //     .join('');
  // }


}

// Determine current page and load content
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeContent);
} else {
  initializeContent();
}

function initializeContent() {
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
  const pageType = currentPage.replace('page_', '');
  console.log(`Loading content for page type: ${pageType}`);
  loadPageContent(pageType);
}
