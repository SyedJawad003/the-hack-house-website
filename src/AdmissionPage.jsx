import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const programs = [
  'Play & Connect',
  'Montessori Moments',
  'Creative Workshops',
  'Community Meetups',
  'Not sure yet',
];

function AdmissionPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    document.title = 'Admissions | The Hack House';
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return <div className="admission-page">
    <header className={`admission-header${isScrolled ? ' scrolled' : ''}`}>
      <a className="admission-brand" href="/" aria-label="The Hack House home">
        <img src="/hack-house-logo-transparent.png" alt=""/>
        <span>The Hack House</span>
      </a>
      <a className="admission-home-link" href="/"><ArrowLeft size={16}/> Back to home</a>
    </header>

    <main>
      <section className="admission-hero">
        <div className="admission-hero-shape admission-hero-shape-one"/>
        <div className="admission-hero-shape admission-hero-shape-two"/>
        <motion.div className="admission-hero-content" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, ease: [.22, 1, .36, 1] }}>
          <div className="admission-eyebrow"><span/> A LITTLE PLACE FOR BIG BEGINNINGS</div>
          <h1>Every big beginning<br/>starts <em>somewhere.</em></h1>
          <p>Tell us a little about your family and we’ll help you find the right next step at The Hack House.</p>
          <div className="admission-perks">
            <span><Heart size={16}/> A warm welcome</span>
            <span><Sparkles size={16}/> Room to grow</span>
          </div>
        </motion.div>
        <div className="admission-hero-mark" aria-hidden="true">HH<span>✳</span></div>
      </section>

      <section className="admission-content">
        <motion.div className="admission-form-card" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .12 }}>
          <div className="admission-form-heading">
            <div className="admission-step">ADMISSION ENQUIRY <span>01 / 01</span></div>
            <h2>Let’s get to know <em>your little one.</em></h2>
            <p>Share a few details below. Fields marked with * are required.</p>
          </div>

          <form className="admission-form" onSubmit={handleSubmit}>
            <div className="form-section-label">PARENT OR GUARDIAN</div>
            <div className="admission-field-grid">
              <label className="admission-field">
                <span>Parent / guardian name <b>*</b></span>
                <input autoComplete="name" name="guardianName" placeholder="Your full name" required/>
              </label>
              <label className="admission-field">
                <span>Email address <b>*</b></span>
                <input autoComplete="email" name="email" type="email" placeholder="you@example.com" required/>
              </label>
              <label className="admission-field">
                <span>Phone number <b>*</b></span>
                <input autoComplete="tel" name="phone" type="tel" placeholder="Your phone number" required/>
              </label>
            </div>

            <div className="form-section-label child-section-label">ABOUT YOUR CHILD</div>
            <div className="admission-field-grid">
              <label className="admission-field">
                <span>Child’s name <b>*</b></span>
                <input autoComplete="off" name="childName" placeholder="Your child’s first and last name" required/>
              </label>
              <label className="admission-field">
                <span>Date of birth <b>*</b></span>
                <input autoComplete="bday" name="dateOfBirth" type="date" max={new Date().toISOString().slice(0, 10)} required/>
              </label>
              <label className="admission-field">
                <span>Program you’re interested in <b>*</b></span>
                <select name="program" defaultValue="" required>
                  <option value="" disabled>Select a program</option>
                  {programs.map((program) => <option key={program} value={program}>{program}</option>)}
                </select>
              </label>
              <label className="admission-field">
                <span>When would you like to start?</span>
                <select name="startTime" defaultValue="">
                  <option value="">Not decided yet</option>
                  <option value="soon">As soon as possible</option>
                  <option value="month">Within the next month</option>
                  <option value="later">Later this year</option>
                </select>
              </label>
              <label className="admission-field admission-field-wide">
                <span>Anything else you’d like us to know?</span>
                <textarea name="message" rows="4" placeholder="Questions, interests, or anything that would help us welcome your family."/>
              </label>
            </div>

            <p className="admission-privacy">Please avoid sharing sensitive medical or personal details in this enquiry form.</p>
            <button className="admission-submit" type="submit">Submit admission enquiry <ArrowRight size={17}/></button>
            {submitted && <div className="admission-preview-message" role="status">
              <CheckCircle2 size={19}/>
              <p><b>Your form is complete.</b> This preview doesn’t send or save applications yet, so your details have not been delivered to The Hack House.</p>
            </div>}
          </form>
        </motion.div>

        <aside className="admission-aside">
          <div className="aside-topline">THE HACK HOUSE WAY</div>
          <h2>A good place<br/>to <em>begin.</em></h2>
          <p>We’ll learn what matters to your family, answer your questions and help you discover which experiences feel right for your child.</p>
          <div className="aside-note"><span>01</span><p><b>We’ll listen</b><small>Every child and family is different.</small></p></div>
          <div className="aside-note"><span>02</span><p><b>We’ll guide you</b><small>We’ll help you explore the options.</small></p></div>
          <div className="aside-contact">Want to ask us something first? <a href="https://www.instagram.com/the_hackhouse/" target="_blank" rel="noreferrer">Say hello on Instagram <ArrowRight size={14}/></a></div>
        </aside>
      </section>
    </main>

    <footer className="admission-footer"><a href="/">The Hack House</a><span>Little minds. Big possibilities.</span></footer>
  </div>;
}

export default AdmissionPage;
