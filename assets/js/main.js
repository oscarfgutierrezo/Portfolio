/**
* Template Name: iPortfolio - v3.8.1
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

import { skillsList, licencesList, portfolioList, experienceList, educationList } from "./data/index.js";

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        filter: '.filter-css'
      });
      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();


  // DOM Experience
  const experienceContainerDOM = document.querySelector('#experience-container');

  experienceList.forEach(experience => {
    const {rol, time, company, responsibilities, keyAccomplishments} = experience;
    console.log(keyAccomplishments === false);
    console.log(keyAccomplishments);
    const experienceContainer = document.createElement('div');
      experienceContainer.classList.add('resume-item');
    const experienceRol = document.createElement('h4');
      experienceRol.textContent = rol;
    const experienceTime = document.createElement('h5');
      experienceTime.textContent = time;
    const experienceCompany = document.createElement('p');
    const experienceCompanyEm = document.createElement('em');
      experienceCompanyEm.textContent = company
      experienceCompany.appendChild(experienceCompanyEm);
    const experienceResponsibilitiesTitle = document.createElement('strong')
      experienceResponsibilitiesTitle.textContent = 'Responsibilities'
    const experienceResponsibilitiesList = document.createElement('ul');
    responsibilities.forEach(responsibility => {
      const responsibilityItem = document.createElement('li');
        responsibilityItem.textContent = responsibility;
      experienceResponsibilitiesList.appendChild(responsibilityItem);
    })
    const experienceKeyAccomplishmentsTitle = document.createElement('strong');
      experienceKeyAccomplishmentsTitle.textContent = 'Key Accomplishments';
    const experienceKeyAccomplishmentsList = document.createElement('ul');
    keyAccomplishments.forEach(keyAccomplishment => {
      const keyAccomplishmentItem = document.createElement('li');
      keyAccomplishmentItem.textContent = keyAccomplishment;
      experienceKeyAccomplishmentsList.appendChild(keyAccomplishmentItem);
    })

    experienceContainer.appendChild(experienceRol);
    experienceContainer.appendChild(experienceTime);
    experienceContainer.appendChild(experienceCompany);
    experienceContainer.appendChild(experienceResponsibilitiesTitle);
    experienceContainer.appendChild(experienceResponsibilitiesList);

    if (keyAccomplishments.length > 0){
      experienceContainer.appendChild(experienceKeyAccomplishmentsTitle);
      experienceContainer.appendChild(experienceKeyAccomplishmentsList);
    }

    experienceContainerDOM.appendChild(experienceContainer);
  })


  // DOM Education
  const educationContainerDOM = document.querySelector('#education-container')
  educationList.forEach( education => {
    const { degree, time, institution, description } = education;
    const educationItemContainer = document.createElement('div');
      educationItemContainer.classList.add('resume-item');
    const educationDegree = document.createElement('h4');
      educationDegree.textContent = degree;
    const educationTime = document.createElement('h5');
      educationTime.textContent = time;
    const educationInstitution = document.createElement('p');
    const educationInstitutionEm = document.createElement('em');
      educationInstitutionEm.textContent = institution;
      educationInstitution.appendChild(educationInstitutionEm);
    const educationDescriptionList = document.createElement('ul');
    description.forEach( item => {
      const descriptionItem = document.createElement('li');
        descriptionItem.textContent = item;
      educationDescriptionList.appendChild(descriptionItem);
    })

    educationItemContainer.appendChild(educationDegree);
    educationItemContainer.appendChild(educationTime);
    educationItemContainer.appendChild(educationInstitution);
    educationItemContainer.appendChild(educationDescriptionList);

    educationContainerDOM.appendChild(educationItemContainer);
  })

  // DOM Skills
  const skillsContainerDOM = document.querySelector('#skills-container');

  skillsList.forEach( skill => {
    const {name, img} = skill;
    const skillItemContainer = document.createElement('div');
    const skillImage = document.createElement('img');
      skillImage.classList.add('img-fluid');
      skillImage.src = img;
      skillImage.alt = `${name} Logo`;
      skillImage.style.height = '75px';
    const skillName = document.createElement('p');
    skillName.textContent = name;
      skillName.classList.add('text-center', 'fw-bold');
    skillItemContainer.appendChild(skillImage);
    skillItemContainer.appendChild(skillName);
    skillsContainerDOM.appendChild(skillItemContainer)
  })
  
  // DOM Licences & Certifications
  const licencesContainerDOM = document.querySelector('#licences-container');
  
  licencesList.forEach(licence => {
    const {name, date, organization} = licence;
    const licenceItemContainer = document.createElement('div');
      licenceItemContainer.classList.add('resume-item');
    const licenceTitle = document.createElement('h4');
      licenceTitle.textContent = name;
    const licenceDate = document.createElement('h5');
      licenceDate.textContent = date;
    const licenceOrganization = document.createElement('em');
      licenceOrganization.classList.add('d-block');
      licenceOrganization.textContent = organization
    licenceItemContainer.appendChild(licenceTitle);
    licenceItemContainer.appendChild(licenceDate);
    licenceItemContainer.appendChild(licenceOrganization);
    licencesContainerDOM.appendChild(licenceItemContainer)
  })

  // DOM Portfolio
  const portfolioContainer = document.querySelector('#portfolio-container');
  portfolioList.forEach(project => {
    const { name, img, project_url, repository_url, category } = project;
    const projectContainer = document.createElement('div');
      projectContainer.classList.add('col-lg-4', 'col-sm-6', 'portfolio-item', `filter-${category}`);
    const shadowContainer = document.createElement('div');
      shadowContainer.classList.add('portfolio-wrap', 'shadow', 'rounded-1');
    const projectTitle = document.createElement('h5');
      projectTitle.classList.add('portafolio-item-title');
      projectTitle.textContent = name;
    const projectImg = document.createElement('img');
      projectImg.src = img;
      projectImg.classList.add('img-fluid');
      projectImg.alt = `${name} Project Screenshot`;
    const linksContainer = document.createElement('div');
      linksContainer.classList.add('portfolio-links');
    const projectLink = document.createElement('a');
      projectLink.href = project_url;
      projectLink.target = '_blank';
      projectLink.title = 'View';
    const projectLinkIcon = document.createElement('i');
      projectLinkIcon.classList.add('bi', 'bi-box-arrow-up-right');
    const repositoryLink = document.createElement('a');
      repositoryLink.href = repository_url;
      repositoryLink.target = '_blank';
      repositoryLink.title = 'Repository';
    const repositoryLinkIcon = document.createElement('i');
      repositoryLinkIcon.classList.add('bi', 'bi-github');

    projectLink.appendChild(projectLinkIcon);
    repositoryLink.appendChild(repositoryLinkIcon);
    linksContainer.appendChild(projectLink);
    linksContainer.appendChild(repositoryLink);
    shadowContainer.appendChild(projectTitle);
    shadowContainer.appendChild(projectImg);
    shadowContainer.appendChild(linksContainer);
    projectContainer.appendChild(shadowContainer);
    portfolioContainer.appendChild(projectContainer);
  })
})()