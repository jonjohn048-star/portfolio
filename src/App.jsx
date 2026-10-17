import { useEffect, useRef, useState } from 'react';
import profilePhoto from './assets/john-nguyen.jpg';
import aboutFanPhoto from './assets/about-fan-photo.jpg';
import aboutWorkstationPhoto from './assets/about-workstation-photo.jpg';
import './App.css';

const skills = [
  'C',
  'Java',
  'SQL',
  'Assembly Language',
  'Git',
  'Linux / WSL',
  'VS Code',
  'Data Structures',
  'Algorithms',
];

const navigationItems = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m3.5 10 8.5-7 8.5 7v10.5h-6v-6h-5v6h-6V10Z" />
      </svg>
    ),
  },
  {
    id: 'about',
    label: 'About Me',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact Me',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
];

export default function App() {
  const [portraitUrl, setPortraitUrl] = useState(profilePhoto);
  const [photoError, setPhotoError] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [sectionVisible, setSectionVisible] = useState(true);
  const sectionTransitionRef = useRef(null);

  useEffect(() => {
    return () => {
      if (sectionTransitionRef.current) {
        window.clearTimeout(sectionTransitionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!portraitUrl) return undefined;

    if (!portraitUrl.startsWith('blob:')) return undefined;

    return () => URL.revokeObjectURL(portraitUrl);
  }, [portraitUrl]);

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPhotoError('Please choose an image file.');
      event.target.value = '';
      return;
    }

    setPhotoError('');
    setPortraitUrl(URL.createObjectURL(file));
    event.target.value = '';
  }

  function navigateToSection(sectionId) {
    if (sectionId === activeSection && sectionVisible) return;

    if (sectionTransitionRef.current) {
      window.clearTimeout(sectionTransitionRef.current);
      sectionTransitionRef.current = null;
    }

    if (sectionId === activeSection) {
      setSectionVisible(true);
      return;
    }

    setSectionVisible(false);
    sectionTransitionRef.current = window.setTimeout(() => {
      window.scrollTo(0, 0);
      setActiveSection(sectionId);
      setSectionVisible(true);
      sectionTransitionRef.current = null;
    }, 260);
  }

  function renderActiveSection() {
    if (activeSection === 'home') {
      return (
        <header className="profile" aria-labelledby="home-heading">
          <div className="profile__portrait">
            {portraitUrl ? (
              <img
                className="profile__portrait-image"
                src={portraitUrl}
                alt="John Nguyen"
              />
            ) : (
              <>
                <svg
                  className="profile__portrait-icon"
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect x="5" y="11" width="38" height="28" rx="5" />
                  <circle cx="24" cy="25" r="8" />
                  <path d="M15 11l2-4h14l2 4" />
                </svg>
                <span>Profile photo</span>
              </>
            )}
            <label className="profile__upload" aria-label="Choose or change profile photo">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m14.5 5.5 4 4M4 20l4.2-.9L19 8.3a2.12 2.12 0 0 0-3-3L5.2 16.1 4 20Z" />
              </svg>
              <input
                className="profile__upload-input"
                type="file"
                accept="image/*"
                aria-label="Choose or change profile photo"
                onChange={handlePhotoChange}
              />
            </label>
            {photoError && (
              <span className="profile__photo-error" role="alert">
                {photoError}
              </span>
            )}
          </div>
          <div className="profile__details">
            <p className="profile__eyebrow">Software Engineer</p>
            <h1 id="home-heading">John</h1>
            <p className="profile__bio">
              I’m a Software Engineering major pursuing a bachelor’s degree at
              the University of Texas at Arlington. I enjoy turning challenging
              problems into thoughtful software, and I’m always learning,
              building, and pushing myself toward what’s next. I want to be more
              than who I am today, and I look forward to sharing more of the
              projects I build here in the future.
            </p>
          </div>
        </header>
      );
    }

    if (activeSection === 'about') {
      return (
        <section className="section toolkit" aria-labelledby="about-heading">
          <div className="about-layout">
            <div className="about-content">
              <div className="section__heading">
                <p className="section__eyebrow">A little about me</p>
                <h1 id="about-heading">About Me</h1>
                <div className="about-copy">
                  <p className="section__description">
                    My fascination with technology started early. Growing up
                    playing video games made me curious about what was happening
                    behind the screen, and that curiosity grew as I learned to
                    troubleshoot and fix my own technology. I also enjoy helping
                    others with their tech, which has given me opportunities to
                    meet new people, build connections, and grow my professional
                    network.
                  </p>
                  <p className="section__description">
                    Over five years as a camp counselor, I’ve developed a strong
                    sense of leadership through managing teams and supporting
                    others. I’ve learned to keep going even when it isn’t
                    personally advantageous, and to take accountability and show
                    who I am when things get difficult.
                  </p>
                  <p className="section__description">
                    I’m pursuing a bachelor’s degree in Software Engineering at
                    the University of Texas at Arlington (UTA), where I hope to
                    bring together my leadership experience and passion for
                    technology. I look forward to contributing to the Society
                    of Asian Scientists and Engineers (SASE) and the Association
                    for Computing Machinery (ACM).
                  </p>
                </div>
                <h2 className="toolkit__heading">Technical Toolkit</h2>
              </div>
              <ul className="toolkit__skills">
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
            <aside className="about-gallery" aria-label="Photos of John">
              <img
                src={aboutFanPhoto}
                alt="John holding a colorful fan"
                loading="lazy"
              />
              <img
                src={aboutWorkstationPhoto}
                alt="John working at a computer"
                loading="lazy"
              />
            </aside>
          </div>
        </section>
      );
    }

    if (activeSection === 'projects') {
      return (
        <section className="section projects-section" aria-labelledby="projects-heading">
          <div className="section__heading">
            <p className="section__eyebrow">Coming soon</p>
            <h1 id="projects-heading">Projects</h1>
          </div>
          <div className="projects-note">
            <span className="projects-note__mark" aria-hidden="true">✳</span>
            <p>
              I’m working on projects I’m excited to share. Check back soon to
              see what I’ve been building.
            </p>
          </div>
        </section>
      );
    }

    return (
      <section className="section contact" aria-labelledby="contact-heading">
        <div className="section__heading">
          <p className="section__eyebrow">Get in touch</p>
          <h1 id="contact-heading">Contact Me</h1>
        </div>
        <div className="contact__links">
          <a href="mailto:jonjohn048@gmail.com">
            <span className="contact__label">Email</span>
            <span>jonjohn048@gmail.com</span>
            <span className="contact__arrow" aria-hidden="true">↗</span>
          </a>
          <a
            href="https://www.linkedin.com/in/john-nguyen-0b02a9387/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="contact__label">LinkedIn</span>
            <span>Connect with me</span>
            <span className="contact__arrow" aria-hidden="true">↗</span>
          </a>
          <a
            href="https://github.com/jonjohn048-star"
            target="_blank"
            rel="noreferrer"
          >
            <span className="contact__label">GitHub</span>
            <span>jonjohn048-star</span>
            <span className="contact__arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    );
  }

  return (
    <main className="portfolio">
      <nav className="site-nav" aria-label="Main navigation">
        <a
          className="site-nav__resume"
          href={`${import.meta.env.BASE_URL}resume.html`}
          aria-label="View John's Resume"
          title="John's Resume"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 3.75h7l4 4v12.5H7a2 2 0 0 1-2-2v-12.5a2 2 0 0 1 2-2Z" />
            <path d="M14 4v4h4M8.5 12h7M8.5 15.5h7" />
          </svg>
        </a>
        <div
          className="site-nav__sections"
          role="group"
          aria-label="Portfolio sections"
        >
          <span
            className="site-nav__indicator"
            aria-hidden="true"
            style={{
              '--active-index': navigationItems.findIndex(
                (item) => item.id === activeSection,
              ),
            }}
          />
          {navigationItems.map((item) => (
            <button
              className="site-nav__section"
              type="button"
              key={item.id}
              aria-label={item.label}
              aria-current={activeSection === item.id ? 'page' : undefined}
              title={item.label}
              onClick={() => navigateToSection(item.id)}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </nav>
      <div
        className={`portfolio__content section-panel${sectionVisible ? '' : ' section-panel--hidden'}`}
        aria-live="polite"
      >
        {renderActiveSection()}
      </div>
    </main>
  );
}
