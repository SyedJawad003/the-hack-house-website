import React from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Menu, X, Heart, Sparkles, Palette, Users, Instagram, MapPin, CalendarDays, Clock3, Phone, ShieldCheck, GraduationCap, Star } from 'lucide-react';
import AdmissionPage from './AdmissionPage.jsx';

const programs = [
  { icon: Heart, title: 'Play & Connect', age: 'A space to belong', text: 'Thoughtfully planned play sessions that help little ones build confidence, friendships and happy memories.', color: 'pink', tag: 'Social growth' },
  { icon: Sparkles, title: 'Montessori Moments', age: 'Learn at their own pace', text: 'Hands-on discovery that encourages curiosity, independence and a love of learning through everyday activities.', color: 'blue', tag: 'Curious minds' },
  { icon: Palette, title: 'Creative Workshops', age: 'Imagine. Make. Explore.', text: 'Art, sensory play and creative experiences where children can express themselves and try something new.', color: 'yellow', tag: 'Creative play' },
  { icon: Users, title: 'Community Meetups', age: 'Growing together', text: 'Welcoming gatherings and shared experiences for children, parents and caregivers to connect.', color: 'green', tag: 'For families' },
];

const heroBenefits = [
  { icon: Heart, title: 'Nurturing', detail: 'A caring place to belong', color: 'pink' },
  { icon: GraduationCap, title: 'Thoughtful educators', detail: 'Guidance at every step', color: 'yellow' },
  { icon: ShieldCheck, title: 'Safe & secure', detail: 'Care you can count on', color: 'green' },
  { icon: Star, title: 'Joyful learning', detail: 'Made for curious minds', color: 'blue' },
  { icon: Users, title: 'Family community', detail: 'Growing better together', color: 'purple' },
];

const updates = [
  {
    title: 'Mommy & Me Meetup',
    date: 'Saturday, 28 November 2026',
    time: '3pm – 5pm',
    location: 'Haven Montessori & Daycare, Phase 8, Bahria Town, Rawalpindi',
    fee: 'Rs. 2,500',
    phone: '0327 190 4991',
    image: '/mommy-and-me-meetup.png',
    description: 'A special day for mommies and their little ones. Join us for a lovely afternoon together.',
  },
];

const centres = [
  {
    id: 'montessori-centre',
    name: 'Haven Montessori & Daycare',
    description: 'Montessori-inspired learning that gives little learners room to explore, create and grow.',
    instagram: 'haven_montessori_daycare',
    location: 'Bahria Town, Rawalpindi',
    color: 'montessori',
  },
  {
    id: 'autism-centre',
    name: 'Haven Autism & Therapy Centre',
    description: 'Support for autism, ADHD, behavioural needs and child development, with care for every child’s individual journey.',
    instagram: 'haven_autismtherapycentre',
    location: 'Bahria Town, Rawalpindi',
    color: 'therapy',
  },
];

const rainbowChapters = [
  { title: 'A story of little beginnings', label: 'Our story', color: '#e49ac2', links: [{ label: 'Our story', id: 'story' }, { label: 'What we do', id: 'programs' }] },
  { title: 'Little moments, together', label: 'Updates', color: '#ffc72c', links: [{ label: 'Latest updates', id: 'updates' }] },
  { title: 'Room to learn and grow', label: 'Experience', color: '#83c3d0', links: [{ label: 'The experience', id: 'experience' }] },
  { title: 'Your next step starts here', label: 'Get started', color: '#a8bd67', links: [{ label: 'Get in touch', id: 'contact' }, { label: 'Admissions', id: 'admissions-step' }] },
];

function BrandScrollStory() {
  const storyRef = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ['start start', 'end end'] });
  const [chapterIndex, setChapterIndex] = React.useState(0);
  const chapter = rainbowChapters[chapterIndex];
  const logoScale = useTransform(scrollYProgress, [0, .16, .36, .56, .72, .84, .93, 1], [1, 1.08, 1.3, 2.2, 5, 11, 18, 24]);
  const logoOpacity = useTransform(scrollYProgress, [0, .58, .72, .84, .93, 1], [1, 1, .9, .55, .08, 0]);

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const nextChapter = Math.min(rainbowChapters.length - 1, Math.floor(progress * rainbowChapters.length));
    setChapterIndex((current) => current === nextChapter ? current : nextChapter);
  });

  return <section className="brand-scroll-story" ref={storyRef} aria-label="Discover The Hack House">
    <div className="brand-scroll-stage">
      <div className="brand-scroll-intro">
        <span>THE HACK HOUSE JOURNEY</span>
        <p>One little step at a time</p>
      </div>
      <motion.img
        className="brand-scroll-logo"
        src="/hack-house-logo-transparent.png"
        alt="The Hack House logo with four colorful arches"
        style={{ scale: logoScale, opacity: logoOpacity }}
      />
      <nav className="brand-scroll-milestones" aria-label="Journey chapters">
        {rainbowChapters.map((item, index) => <a
          className={`brand-scroll-milestone${index <= chapterIndex ? ' is-visible' : ''}${index === chapterIndex ? ' is-active' : ''}`}
          href={`#${item.links[0].id}`}
          key={item.label}
          style={{ '--milestone-color': item.color }}
          aria-current={index === chapterIndex ? 'step' : undefined}
        >
          <span className="brand-scroll-milestone-number">0{index + 1}</span>
          <span>{item.label}</span>
        </a>)}
      </nav>
      <div className="brand-scroll-chapter" aria-live="polite" style={{ '--chapter-color': chapter.color }}>
        <span>0{chapterIndex + 1} <i/> 0{rainbowChapters.length}</span>
        <h2>{chapter.title}</h2>
        <nav aria-label={`${chapter.title} sections`}>
          {chapter.links.map((link) => <a href={`#${link.id}`} key={link.id}>{link.label}<ArrowRight size={14}/></a>)}
        </nav>
      </div>
      <div className="brand-scroll-prompt"><span/> Scroll to explore</div>
    </div>
  </section>;
}

function Header() {
  const [open, setOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(() => window.scrollY > 24);
  const links = [['Our story','#story'],['What we do','#programs'],['Updates','#updates'],['The experience','#experience'],['Get in touch','#contact']];
  const closeMenu = () => setOpen(false);
  const closeCentresMenu = (event) => {
    event.currentTarget.closest('details').open = false;
    closeMenu();
  };

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <header className={`header${isScrolled ? ' scrolled' : ''}${open ? ' menu-open' : ''}`}><a href="#top" className="brand"><img src="/hack-house-logo-transparent.png" alt=""/><span>The Hack House</span></a><button className="menu-toggle" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button><nav className={open?'nav open':'nav'}>{links.map(([label,href])=><a key={href} href={href} onClick={closeMenu}>{label}</a>)}<details className="nav-centres"><summary>Our centres</summary><div className="nav-centres-menu"><a href="#centres" onClick={closeCentresMenu}>All centres</a><a href="#montessori-centre" onClick={closeCentresMenu}>Haven Montessori &amp; Daycare</a><a href="#autism-centre" onClick={closeCentresMenu}>Haven Autism &amp; Therapy Centre</a></div></details><a href="#admissions-step" onClick={closeMenu}>Admissions</a><a className="nav-cta" href="/admission" onClick={closeMenu}>Apply now <ArrowRight size={16}/></a></nav></header>
}
function LoadingScreen({ progress }) {
  return <motion.div className="loading-screen" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .45, ease: 'easeInOut' }} role="status" aria-live="polite" aria-label={`Loading The Hack House, ${progress}%`}>
    <motion.div className="loading-content" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, ease: [.22, 1, .36, 1] }}>
      <div className="loader-brand">
        <span>THE <b>HACK</b> HOUSE</span>
      </div>
      <p className="loader-kicker">A LITTLE PLACE FOR BIG BEGINNINGS</p>
      <h2>Making room for <em>wonder.</em></h2>
      <div className="loader-progress-track" aria-hidden="true"><motion.span animate={{ width: `${progress}%` }} transition={{ duration: .2, ease: 'easeOut' }}/></div>
      <div className="loader-progress-meta"><span>{progress === 100 ? 'Ready to explore' : 'Getting things ready'}</span><b>{String(progress).padStart(2, '0')}%</b></div>
    </motion.div>
    <span className="loader-footer">PLAY <i>·</i> LEARN <i>·</i> GROW</span>
  </motion.div>;
}

function HomePage() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadingProgress, setLoadingProgress] = React.useState(0);
  const [isUpdateOpen, setIsUpdateOpen] = React.useState(false);
  const shouldReduceMotion = useReducedMotion();
  const revealProps = (delay = 0, direction = 'up') => {
    const offset = direction === 'left'
      ? { x: -28, y: 0 }
      : direction === 'right'
        ? { x: 28, y: 0 }
        : { x: 0, y: 20 };
    return {
      initial: shouldReduceMotion ? false : { opacity: 0, ...offset },
      whileInView: shouldReduceMotion ? undefined : { opacity: 1, x: 0, y: 0 },
      viewport: { once: true, amount: .15 },
      transition: { duration: .55, delay, ease: [.22, 1, .36, 1] },
    };
  };

  React.useEffect(() => {
    if (isLoading) return undefined;
    const timeout = window.setTimeout(() => setIsUpdateOpen(true), 450);
    return () => window.clearTimeout(timeout);
  }, [isLoading]);

  React.useEffect(() => {
    const startedAt = performance.now();
    const minimumDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 450 : 1300;
    let frameId;
    let hideTimeout;

    const updateProgress = (now) => {
      const elapsed = now - startedAt;
      const assetsReady = document.readyState === 'complete' && Array.from(document.images).every((image) => image.complete);
      const shouldFinish = (assetsReady && elapsed >= minimumDuration) || elapsed >= 4500;

      if (shouldFinish) {
        setLoadingProgress(100);
        hideTimeout = window.setTimeout(() => {
          document.body.style.overflow = previousOverflow;
          setIsLoading(false);
        }, 420);
        return;
      }

      setLoadingProgress(Math.min(94, 8 + Math.round((elapsed / 1800) * 86)));
      frameId = window.requestAnimationFrame(updateProgress);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    frameId = window.requestAnimationFrame(updateProgress);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(hideTimeout);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  React.useEffect(() => {
    if (!isUpdateOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsUpdateOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isUpdateOpen]);

  return <>
    <AnimatePresence>{isLoading && <LoadingScreen key="loading" progress={loadingProgress}/>}</AnimatePresence>
    <div id="top"><Header/>
    <main>
      <section className="hero section-wrap">
        <div className="hero-scene" aria-hidden="true">
          <div className="hero-art-panel hero-art-panel-left">
            <span className="hero-art-sun">✹</span>
            <div className="hero-art-signs"><b>Learn <span>♥</span></b><b>Play <span>✦</span></b><b>Grow <span>♥</span></b></div>
            <div className="hero-art-blocks"><i/><i/><i/></div>
            <span className="hero-art-spark">✦</span>
          </div>
          <div className="hero-art-panel hero-art-panel-right">
            <span className="hero-art-rainbow">⌒</span>
            <div className="hero-art-cloud"/>
            <div className="hero-art-pencils"><i/><i/><i/><i/><i/></div>
            <span className="hero-art-star">★</span>
          </div>
        </div>
        <div className="hero-copy"><motion.div className="eyebrow" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{duration:.6}}>A LITTLE PLACE FOR BIG BEGINNINGS</motion.div>
          <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.75,delay:.1}}>A place to <em>learn,</em><br/><span className="hero-play-word">play</span> and <span className="hero-grow-word">grow.</span></motion.h1>
          <motion.p className="hero-text" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.2}}>A warm, welcoming space for children to learn, play, create and discover the joy of being themselves.</motion.p>
        </div>
        <motion.div className="hero-actions" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.3}}><a className="button primary" href="#programs">Explore what we do <ArrowRight size={17}/></a><a className="text-link" href="#story">Get to know us <span>↗</span></a></motion.div>
        <div className="hero-note"><span className="hero-note-mark"/><p>Thoughtful experiences for children and families.</p></div>
      </section>
      <div className="hero-benefits" aria-label="What families can expect">
        {heroBenefits.map(({ icon: Icon, title, detail, color }, index) => (
          <motion.div {...revealProps(index * .07, index % 2 === 0 ? 'left' : 'right')} className="hero-benefit" key={title}>
            <span className={`hero-benefit-icon ${color}`}><Icon size={20}/></span>
            <b>{title}</b>
            <small>{detail}</small>
          </motion.div>
        ))}
      </div>

      <BrandScrollStory/>
      <motion.section className="intro section-wrap" id="story" initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.65}}><div className="section-kicker">A HAPPY PLACE TO BE</div><div className="intro-grid"><motion.h2 {...revealProps(0, 'left')}>Childhood should be full of <span className="scribble">wonder.</span></motion.h2><motion.div className="intro-copy" {...revealProps(0, 'right')}><p className="lead">At The Hack House, we believe the best learning often begins with a little curiosity — and plenty of play.</p><p>We bring children and families together through thoughtful experiences designed to nurture creativity, confidence, connection and discovery. Every child gets room to explore in their own way.</p><a className="under-link" href="#experience">Discover our approach <ArrowRight size={16}/></a></motion.div></div><div className="values-row">{[
        { icon: '♡', color: 'pink-bg', title: 'Kindness first', detail: 'A caring space for everyone' },
        { icon: '✳', color: 'blue-bg', title: 'Curiosity encouraged', detail: 'Every question matters' },
        { icon: '✿', color: 'yellow-bg', title: 'Learning by doing', detail: 'Little hands, big discoveries' },
      ].map((value, index) => <motion.div {...revealProps(index * .08, index % 2 === 0 ? 'left' : 'right')} key={value.title}><span className={`value-icon ${value.color}`}>{value.icon}</span><b>{value.title}</b><small>{value.detail}</small></motion.div>)}</div></motion.section>

      <section className="program-section" id="programs"><div className="section-wrap"><motion.div className="program-heading" {...revealProps()}><div><div className="section-kicker">ROOM TO EXPLORE</div><h2>Something lovely<br/>for every <span>little learner.</span></h2></div><p>From playful meetups to creative workshops, there are lots of ways to make, move, connect and grow.</p></motion.div><div className="program-grid">{programs.map((p,i)=>{const Icon=p.icon;return <motion.article {...revealProps(i*.09, i%2===0?'left':'right')} className={`program-card ${p.color}`} key={p.title}><div className="card-top"><span className="program-icon"><Icon size={24}/></span><span className="card-number">0{i+1}</span></div><span className="tag">{p.tag}</span><h3>{p.title}</h3><h4>{p.age}</h4><p>{p.text}</p><a href="#contact" aria-label={`Ask about ${p.title}`}><ArrowRight size={19}/></a></motion.article>})}</div></div></section>

      <section className="updates-section" id="updates">
        <div className="section-wrap">
          <motion.div className="updates-heading" {...revealProps()}>
            <div>
              <div className="section-kicker">WHAT'S HAPPENING</div>
              <h2>Our latest <span>updates.</span></h2>
            </div>
            <p>Events, meetups and little moments coming up at The Hack House.</p>
          </motion.div>
          <div className="updates-grid">
            {updates.map((update, index) => (
              <motion.article {...revealProps(index * .08, index % 2 === 0 ? 'left' : 'right')} className="update-card" key={update.title}>
                <div className="update-copy">
                  <span className="update-badge">LATEST UPDATE</span>
                  <h3>{update.title}</h3>
                  <p>{update.description}</p>
                  <div className="update-details">
                    <span><CalendarDays size={17}/>{update.date}</span>
                    <span><Clock3 size={17}/>{update.time}</span>
                    <span><MapPin size={17}/>{update.location}</span>
                    <span className="update-fee">Participation fee <b>{update.fee}</b></span>
                  </div>
                  <a className="button primary update-contact" href={`tel:${update.phone.replace(/\s/g, '')}`}>
                    <Phone size={16}/> Register: {update.phone}
                  </a>
                </div>
                <button className="update-poster-button" type="button" onClick={() => setIsUpdateOpen(true)} aria-label={`View ${update.title} poster`}>
                  <img className="update-poster" src={update.image} alt={`${update.title} event poster with date, time, fee and registration details`}/>
                  <span>View update</span>
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <motion.section className="experience section-wrap" id="experience" initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.65}}><motion.div className="experience-art" {...revealProps(0, 'left')}><div className="photo-frame"><div className="photo-placeholder"><div className="sun-doodle">☼</div><div className="rainbow-doodle">◜<span>◜</span><b>◜</b></div><div className="photo-words">little hands,<br/><em>big possibilities.</em></div><div className="tiny-stars">✦　✳　✦</div></div></div><div className="sticker sticker-one">PLAY<br/>MORE!</div><div className="sticker sticker-two">♡</div></motion.div><motion.div className="experience-copy" {...revealProps(0, 'right')}><div className="section-kicker">THE HACK HOUSE FEELING</div><h2>More than an activity.<br/><span>A place to belong.</span></h2><p>We want every visit to feel like stepping into a space where children can be themselves. A place to try something new, make a friend, get a little messy and leave with a story to tell.</p><ul><li><span>01</span> Welcoming, child-friendly experiences</li><li><span>02</span> Space for creativity and self-expression</li><li><span>03</span> Meaningful moments for the whole family</li></ul><a className="button dark" href="#contact">Let's make memories <ArrowRight size={17}/></a></motion.div></motion.section>

      <motion.section className="quote-section" {...revealProps()}><div className="quote-mark">“</div><p>Big things begin with little moments<br/>of <em>curiosity, courage and connection.</em></p><span>THE HACK HOUSE WAY</span><div className="quote-spark">✳</div></motion.section>

      <section className="centres-section" id="centres">
        <div className="section-wrap">
          <motion.div className="centres-heading" {...revealProps()}>
            <div className="section-kicker">TWO CENTRES, ONE CARING COMMUNITY</div>
            <h2>Find the right place<br/>to <span>grow.</span></h2>
            <p>Explore our two welcoming centres in Bahria Town, Rawalpindi.</p>
          </motion.div>
          <div className="centres-grid">
            {centres.map((centre, index) => (
              <motion.article {...revealProps(index * .1, index % 2 === 0 ? 'left' : 'right')} className={`centre-card ${centre.color}`} id={centre.id} key={centre.id}>
                <div className="centre-card-top">
                  <span className="centre-number">0{index + 1}</span>
                  <span className="centre-icon"><MapPin size={20}/></span>
                </div>
                <h3>{centre.name}</h3>
                <p>{centre.description}</p>
                <div className="centre-location"><MapPin size={16}/>{centre.location}</div>
                <a className="centre-link" href={`https://www.instagram.com/${centre.instagram}/`} target="_blank" rel="noreferrer">
                  <Instagram size={16}/> Visit Instagram <ArrowRight size={16}/>
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <motion.section className="contact-section" id="contact" initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.65}}><div className="contact-card"><div className="contact-left"><div className="section-kicker">COME SAY HELLO</div><h2>Let's make room<br/>for <span>more wonder.</span></h2><p>Have a question, want to know what's coming up, or interested in a visit? We'd love to hear from you.</p><a className="button primary" href="https://www.instagram.com/the_hackhouse/" target="_blank" rel="noreferrer">Connect on Instagram <ArrowRight size={17}/></a></div><div className="contact-right"><div className="contact-orbit"><div className="orbit-inner"><img src="/hack-house-logo-transparent.png"/></div><span className="orbit-star star-a">✦</span><span className="orbit-star star-b">✳</span></div><div className="contact-detail"><Instagram size={18}/><span>@the_hackhouse</span></div><div className="contact-detail"><MapPin size={18}/><span>Get in touch for location & visit details</span></div></div></div></motion.section>
      <motion.section className="admissions-step" id="admissions-step" {...revealProps()}>
        <div><span className="section-kicker">THE NEXT LITTLE STEP</span><h2>Ready to grow with us?</h2><p>Tell us about your child and we’ll help you find the right next step.</p></div>
        <a className="button primary" href="/admission">Explore admissions <ArrowRight size={17}/></a>
      </motion.section>
    </main>
    <footer className="footer"><a href="#top" className="footer-brand"><img src="/hack-house-logo-transparent.png"/>The Hack House</a><p>Little minds. Big possibilities.</p><div className="footer-links"><a href="#story">Our story</a><a href="#programs">What we do</a><a href="https://www.instagram.com/the_hackhouse/" target="_blank" rel="noreferrer">Instagram <ArrowRight size={13}/></a></div><small>© {new Date().getFullYear()} The Hack House. Made with care.</small></footer>
  </div>
  <AnimatePresence>
    {isUpdateOpen && updates[0] && (
      <motion.div
        className="update-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: .2 }}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) setIsUpdateOpen(false);
        }}
      >
        <motion.div
          className="update-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="update-modal-title"
          initial={{ opacity: 0, y: -48, scale: .98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -24, scale: .98 }}
          transition={{ duration: .4, ease: [.22, 1, .36, 1] }}
        >
          <button className="update-modal-close" type="button" onClick={() => setIsUpdateOpen(false)} aria-label="Close update">
            <X size={20}/>
          </button>
          <img className="update-modal-poster" src={updates[0].image} alt={`${updates[0].title} event poster`}/>
          <div className="update-modal-copy">
            <span className="update-badge">LATEST UPDATE</span>
            <h2 id="update-modal-title">{updates[0].title}</h2>
            <p>{updates[0].description}</p>
            <div className="update-details">
              <span><CalendarDays size={17}/>{updates[0].date}</span>
              <span><Clock3 size={17}/>{updates[0].time}</span>
              <span><MapPin size={17}/>{updates[0].location}</span>
              <span className="update-fee">Participation fee <b>{updates[0].fee}</b></span>
            </div>
            <a className="button primary update-contact" href={`tel:${updates[0].phone.replace(/\s/g, '')}`}>
              <Phone size={16}/> Register: {updates[0].phone}
            </a>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
  </>;
}
function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  return path === '/admission' ? <AdmissionPage/> : <HomePage/>;
}

export default App;
