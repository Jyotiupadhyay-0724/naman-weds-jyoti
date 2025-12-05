// src/App.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { Heart, Images, MapPin, Clock, Mail, Briefcase, Menu, X } from 'lucide-react';

// Local images: ensure these exist in src/assets/images/
import together from './assets/images/together.jpeg';
import ganesha from './assets/images/ganesha.jpg';
import background from './assets/images/background.jpg';
import one from './assets/images/one.jpg';
import two from './assets/images/two.jpg';
import three from './assets/images/three.jpg';
import four from './assets/images/four.jpeg';
import five from './assets/images/five.jpeg';
import six from './assets/images/six.jpeg';
import brideImg from './assets/images/bride.jpeg';
import groom from './assets/images/groom.jpeg';

/* ---------------- CONFIG ----------------
  Set the deployed Google Apps Script Web App URL in a .env file:
  REACT_APP_GOOGLE_SCRIPT_ENDPOINT=https://script.google.com/macros/s/AKfycbx.../exec

  Restart dev server after creating/updating .env.
----------------------------------------- */
const GOOGLE_SCRIPT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbx2fGHQY8r4agQVxpHB7iQaC9HcFWJcMEdZmEWFRDOleHwR252cR6LEv0MZzxk1sP-D/exec';


function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date('2026-02-10T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = Date.now();
      const distance = weddingDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
        <div className="bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16 lg:h-20">
              <h1 className="text-3xl lg:text-4xl font-bold text-rose-900" style={{ fontFamily: 'cursive' }}>
                 Naman & Jyoti
              </h1>

              <nav className="hidden lg:block">
                <ul className="flex space-x-6 text-base">
                  {[
                    ['home', 'Home'],
                    ['wedding', 'Wedding'],
                    ['couple', 'Meet the Couple'],
                    ['events', 'Events'],
                    ['moments', 'Memories'],
                    ['rsvp', 'RSVP'],
                    ['venue', 'Venue'],
                  ].map(([id, label]) => (
                    <li key={id}>
                      <button onClick={() => scrollToSection(id as string)} className="text-gray-700 hover:text-rose-900 transition-colors font-medium">
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <button className="lg:hidden text-gray-700 focus:outline-none text-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-t border-gray-200">
              <ul className="flex flex-col space-y-4 p-4">
                {['home', 'wedding', 'couple', 'events', 'moments', 'rsvp', 'venue'].map((id) => (
                  <li key={id}>
                    <button onClick={() => scrollToSection(id)} className="text-gray-700 hover:text-rose-900 transition-colors font-medium w-full text-left">
                      {id.charAt(0).toUpperCase() + id.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative flex min-h-screen items-end justify-center bg-cover bg-center p-20 mt-16 lg:mt-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${together})`,
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/30" />

        <button className="fixed left-4 top-28 md:top-32 lg:top-36 transform -translate-y-1/2 bg-white text-rose-900 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg z-20">
          ▶
        </button>

        <div className="absolute top-10 md:top-18 lg:top-22 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20 space-y-4">
          <img src={ganesha} alt="Ganesha" className="w-16 h-16 rounded-full object-cover" />
          <p className="text-white text-center text-xs md:text-sm lg:text-base leading-relaxed drop-shadow-lg italic">
            वक्रतुण्ड महाकाय, सूर्यकोटि समप्रभाः । <br />
            निर्विघ्नं कुरु मे देव, सर्वकार्येषु सर्वदा॥
          </p>
        </div>
      </section>

      {/* Wedding hero */}
      <div id="wedding" className="flex items-center justify-center w-full">
        <div className="w-full text-center">
          <div className="relative w-full bg-center py-16 px-4 text-center overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center blur-sm scale-105" style={{ backgroundImage: `url(${background})` }} />
            <div className="absolute inset-0 bg-white/40" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl tracking-wider font-bold text-gray-800 mb-4" style={{ fontFamily: 'serif' }}>
                Wedding Celebration of
              </h1>
              <h2 className="text-5xl md:text-7xl text-rose-900 font-bold" style={{ fontFamily: 'cursive' }}>
                Naman & Jyoti
              </h2>
            </div>
          </div>

          <p className="text-lg text-gray-700 mt-8 mx-2 max-w-3xl mx-auto leading-relaxed">
            The Upadhyay and Pandey families cordially invite you to the wedding of
            <br />
            <strong className="text-rose-900">Jyoti</strong> and <strong className="text-rose-900">Naman</strong> on
            <br />
            <strong className="text-xl" style={{ fontFamily: 'cursive' }}>
              Tuesday, February 10, 2026
            </strong>
          </p>
        </div>
      </div>

      {/* Couple */}
      <div id="couple" className="flex flex-col md:flex-row justify-around items-center gap-8 mx-4 md:mx-20 lg:mx-40 my-16">
        <div className="text-center">
          <div className="h-64 w-64 md:h-72 md:w-72 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-rose-200 to-rose-300 flex items-center justify-center">
            <img src={brideImg} alt="Jyoti Upadhyay" className="w-full h-full object-cover" />
          </div>
          <div className="gap-2 flex flex-col text-center items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'cursive' }}>
              The Bride
            </h1>
            <Heart className="text-red-900" size={20} fill="currentColor" />
            <h1 className="text-xl font-bold text-rose-900">Software Engineer</h1>
            <h1 className="text-3xl font-bold text-rose-900">Jyoti Upadhyay</h1>
          </div>
        </div>

        <div className="text-center">
          <div className="h-64 w-64 md:h-72 md:w-72 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
            <img src={groom} alt="Naman Pandey" className="w-full h-full object-cover" />
          </div>
          <div className="gap-2 flex flex-col text-center items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'cursive' }}>
              The Groom
            </h1>
            <Heart className="text-red-900" size={20} fill="currentColor" />
            <h1 className="text-xl font-bold text-rose-900">Senior Business Analyst</h1>
            <h1 className="text-3xl font-bold text-rose-900">Naman Pandey</h1>
          </div>
        </div>
      </div>

      {/* Countdown */}
      <div className="my-16">
        <div className="text-6xl text-center mb-8">💍</div>
        <section className="container mx-auto py-0 px-4 lg:py-8 lg:px-10">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-8 md:p-12 text-center lg:text-left flex flex-col justify-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'serif' }}>
                  Countdown to the
                </h1>
                <h2 className="text-3xl font-semibold text-rose-900 mb-4" style={{ fontFamily: 'cursive' }}>
                  Wedding
                </h2>
                <p className="text-2xl text-gray-700" style={{ fontFamily: 'cursive' }}>
                  Tuesday, February 10, 2026
                </p>
              </div>
              <div className="lg:w-1/2 bg-rose-900 text-white p-8 md:p-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl md:text-5xl font-bold mb-2">{timeLeft.days}</span>
                    <span className="text-sm md:text-base uppercase tracking-wider">Days</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl md:text-5xl font-bold mb-2">{timeLeft.hours}</span>
                    <span className="text-sm md:text-base uppercase tracking-wider">Hours</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl md:text-5xl font-bold mb-2">{timeLeft.minutes}</span>
                    <span className="text-sm md:text-base uppercase tracking-wider">Minutes</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl md:text-5xl font-bold mb-2">{timeLeft.seconds}</span>
                    <span className="text-sm md:text-base uppercase tracking-wider">Seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Events */}
      <div id="events" className="my-16">
        <div className="flex items-center justify-center p-8 w-full">
          <div className="md:w-1/2 text-center">
            <h1 className="text-4xl md:text-5xl tracking-wider font-bold text-gray-800 mb-4" style={{ fontFamily: 'serif' }}>
              The Wedding Events
            </h1>
            <p className="text-md text-gray-700 font-semibold">🌸 Uniting hearts, families, and dreams in one beautiful moment.</p>
          </div>
        </div>
        <div className="border-b border-gray-200 w-full mb-8" />

        <div className="flex flex-col items-center justify-center space-y-8 max-w-5xl mx-auto px-4">
          <EventCard title="The Tilak Ceremony" date="Thursday, February 6, 2026" time="To be announced" venue="To be announced" dressCode="Traditional attire" emoji="🙏" />
          <EventCard title="Sangeet & Engagement" date="Saturday, February 8, 2026" time="07:00 PM onwards" venue="The Park Hotel" dressCode="Festive & Glamorous" emoji="💃" />
          <EventCard title="The Mehendi Affair" date="Sunday, February 9, 2026" time="03:00 PM onwards" venue="PC Chandra Garden" dressCode="Henna hues" emoji="🎨" />
          <EventCard title="Turmeric Tales (Haldi)" date="Sunday, February 9, 2026" time="11:00 AM onwards" venue="PC Chandra Garden" dressCode="Dipped in sunshine (Yellow)" emoji="🌼" />
          <EventCard title="The Wedding Ceremony" date="Tuesday, February 10, 2026" time="Evening onwards" venue="PC Chandra Garden" dressCode="Traditional / Indo-Western" emoji="💒" />
          <EventCard title="The Reception" date="Tuesday, February 10, 2026" time="Evening onwards" venue="PC Chandra Garden" dressCode="Formal & Elegant" emoji="🎊" />
        </div>

        <div className="text-6xl text-center my-16">💐</div>
      </div>

      {/* Memories & Gallery */}
      <div id="moments" className="flex justify-center my-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'serif' }}>
                Our lovely
              </h1>
              <h1 className="text-3xl font-semibold text-rose-900 mb-8" style={{ fontFamily: 'cursive' }}>
                Memories
              </h1>

              {/* VIEW GALLERY button triggers gallery modal via Gallery component later */}
              <GalleryTrigger images={[three, five, four, six]} />
            </div>

            <div className="md:w-1/2 flex justify-center">
              <div className="h-[400px] w-[300px] rounded-lg shadow-lg overflow-hidden bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center">
                <img src={one} alt="cover" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP */}
      <div id="rsvp" className="my-16">
        <div className="flex items-center justify-center p-8 w-full">
          <div className="md:w-1/2 text-center">
            <h1 className="text-4xl md:text-5xl tracking-wider font-bold text-rose-900 mb-4" style={{ fontFamily: 'serif' }}>
              Send us your Confirmation
            </h1>
            <p className="text-lg text-gray-700">
              <strong style={{ fontFamily: 'cursive' }}>We look forward to celebrating with you!</strong>
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 pb-16">
          <RSVPForm />
        </div>
      </div>

      {/* Venue */}
      <div id="venue">
        <div className="container mx-auto py-8 md:py-10 px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-rose-900 mb-4" style={{ fontFamily: 'serif' }}>
                Wedding Venue
              </h1>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">📌 PC Chandra Garden</h2>
              <a href="https://maps.google.com/?q=PC+Chandra+Garden" target="_blank" rel="noopener noreferrer" className="inline-block bg-rose-900 px-6 py-3 text-sm font-semibold text-white hover:bg-rose-700 transition-colors rounded">
                <div className="flex items-center gap-2">
                  <span>OPEN IN GOOGLE MAPS</span>
                  <MapPin size={20} />
                </div>
              </a>
            </div>
            <div className="md:w-1/2">
              <div className="w-full h-80 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin size={48} className="mx-auto mb-2" />
                  <p>Map will load here</p>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto py-16 px-4 bg-rose-50 rounded-lg shadow-md my-8">
            <div className="text-center md:text-left max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'serif' }}>
                Invitees
              </h1>
              <div className="space-y-6">
                <div className="font-semibold text-xl">
                  <p className="text-rose-800 mb-2" style={{ fontFamily: 'cursive' }}>The Upadhyay Family</p>
                  <a href="tel:+919269573129" className="text-lg text-gray-700 hover:underline flex items-center justify-center md:justify-start gap-2">
                    <span>📞</span>
                    <span>+91 9269573129</span>
                  </a>
                </div>
                <div className="font-semibold text-xl">
                  <p className="text-rose-800 mb-2" style={{ fontFamily: 'cursive' }}>The Pandey Family</p>
                  <a href="tel:+919831216414" className="text-lg text-gray-700 hover:underline flex items-center justify-center md:justify-start gap-2">
                    <span>📞</span>
                    <span>+91 9831216414</span>
                  </a>
                </div>
              </div>
              <button className="mt-8 bg-rose-900 px-6 py-3 text-sm font-semibold text-white hover:bg-rose-700 transition-colors rounded">
                <div className="flex items-center gap-2">
                  <span>SEND ME A REMINDER</span>
                  <Clock size={20} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10 px-4 text-center">
        <div className="mx-auto space-y-4">
          <h3 className="text-xl font-bold">Made by Jyoti Upadhyay</h3>
          <div className="flex justify-center space-x-4">
            <a href="mailto:jyoti@example.com" target="_blank" rel="noopener noreferrer">
              <Mail size={24} />
            </a>
            <a href="https://www.linkedin.com/in/jyoti-upadhyay" target="_blank" rel="noopener noreferrer">
              <Briefcase size={24} />
            </a>
          </div>
          <p className="text-sm text-gray-400">© namanwedsjyoti 2026</p>
        </div>
      </footer>
    </div>
  );
}

/* EventCard component */
interface EventCardProps {
  title: string;
  date: string;
  time: string;
  venue: string;
  dressCode: string;
  emoji: string;
}
function EventCard({ title, date, time, venue, dressCode, emoji }: EventCardProps) {
  return (
    <div className="border-b border-gray-200 pb-8 w-full">
      <div className="grid md:grid-cols-3 gap-6 items-center text-center md:text-left">
        <div className="md:col-span-2 flex flex-col justify-center space-y-3 px-4 md:px-0">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 capitalize" style={{ fontFamily: 'cursive' }}>
            {title}
          </h3>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-rose-900">🗓️</span>
            <span>{date}</span>
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-rose-900">⏰</span>
            <span>{time}</span>
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-rose-900">📍</span>
            <span>{venue}</span>
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-rose-900">🎨</span>
            <span>Dress Code: {dressCode}</span>
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-48 h-48 rounded-lg bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center text-7xl shadow-md">
            {emoji}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Gallery modal implementation ---------- */

function GalleryTrigger({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  return (
    <>
      <div className="flex items-start gap-4">
        <button
          onClick={() => {
            setStartIndex(0);
            setOpen(true);
          }}
          className="bg-rose-900 text-white px-6 py-3 rounded shadow-md inline-flex items-center gap-2"
        >
          <Images size={18} />
          VIEW GALLERY
        </button>
      </div>

      {open && <GalleryModal images={images} startIndex={startIndex} onClose={() => setOpen(false)} />}
    </>
  );
}

function GalleryModal({ images, startIndex = 0, onClose }: { images: string[]; startIndex?: number; onClose: () => void }) {
  const [index, setIndex] = useState(startIndex);

  // prevent background scroll while modal open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    },
    [onClose, prev, next]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onKey]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/80" />

      {/* modal content */}
      <div
        className="relative z-60 w-full max-w-4xl bg-white rounded shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* close */}
        <button onClick={onClose} className="absolute right-4 top-4 z-50 text-2xl text-gray-800">
          <X />
        </button>

        <div className="flex items-center justify-between">
          {/* left arrow */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="p-4 left-4 rounded-full m-6 bg-gray-200 hover:bg-gray-300 transition"
          >
            ‹
          </button>

          {/* image */}
          <div className="flex-1 py-10 px-6 flex items-center justify-center">
            <img src={images[index]} alt={`gallery-${index}`} className="max-h-[70vh] object-contain rounded-md shadow-md" />
          </div>

          {/* right arrow */}
          <button
            onClick={next}
            aria-label="Next"
            className="p-4 right-4 rounded-full m-6 bg-gray-200 hover:bg-gray-300 transition"
          >
            ›
          </button>
        </div>

        {/* small footer / index */}
        <div className="text-center text-sm text-gray-600 py-4 bg-white">
          {index + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}

/* ----------------- RSVPForm (controlled + sends to Google Script) ----------------- */
function RSVPForm() {
  const attendingOptions = ['I will Attend', 'I will Not Attend', 'I am Not Sure Yet!'];
  const sideOptions = [
    { value: 'Bride', label: 'Bride Side (Upadhyay Family)' },
    { value: 'Groom', label: 'Groom Side (Pandey Family)' },
  ];
  const arrivalOptions = ['6th Feb', '8th Feb', '9th Feb', '10th Feb'];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState('');
  const [guests, setGuests] = useState<number | ''>('');
  const [side, setSide] = useState('');
  const [arrival, setArrival] = useState('');
  const [wishes, setWishes] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // honeypot field to help reduce bots
  const [website, setWebsite] = useState('');

  const validate = () => {
    if (!name.trim()) return 'Please enter your name.';
    if (!phone.trim() || phone.trim().length < 10) return 'Enter a valid mobile number.';
    if (!attending) return 'Select attending status.';
    if (!guests || Number(guests) < 1) return 'Enter number of attendees (min 1).';
    if (!side) return 'Pick a side.';
    if (!arrival) return 'Select arrival date.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // If honeypot filled — likely bot
    if (website.trim()) {
      setMessage('Submission rejected.');
      return;
    }

    const err = validate();
    if (err) {
      setMessage(err);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        submittedAt: new Date().toISOString(),
        name: name.trim(),
        phone: phone.trim(),
        attending,
        guests: Number(guests),
        side,
        arrival,
        wishes: wishes.trim(),
      };

    // previously: fetch(GOOGLE_SCRIPT_ENDPOINT, { ... })
    const res = await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });


      if (!res.ok) {
        // Try to parse JSON error if available
        const text = await res.text();
        console.error('Submission error:', res.status, text);
        throw new Error('Submission failed');
      }

      // Success
      setMessage('Thank you! Your confirmation has been received.');
      // clear form
      setName('');
      setPhone('');
      setAttending('');
      setGuests('');
      setSide('');
      setArrival('');
      setWishes('');
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-md">
      {message && <div className="text-sm text-center text-rose-700">{message}</div>}

      {/* Honeypot - hidden from users */}
      <input
        aria-hidden
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="website"
        className="hidden"
      />

      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500" required />
      </div>
      <div>
        <input value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ''))} type="tel" maxLength={10} placeholder="Your Mobile No." className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500" required />
      </div>
      <div>
        <select value={attending} onChange={(e) => setAttending(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500" required>
          <option value="">Select your attending status...</option>
          {attendingOptions.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>
      <div>
        <input value={guests} onChange={(e) => setGuests(e.target.value ? Number(e.target.value) : '')} type="number" placeholder="How many of you will be attending" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500" required min={1} />
      </div>
      <div>
        <select value={side} onChange={(e) => setSide(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500" required>
          <option value="">Pick a side?</option>
          {sideOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>
      <div>
        <select value={arrival} onChange={(e) => setArrival(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500" required>
          <option value="">Date of arrival</option>
          {arrivalOptions.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div>
        <textarea rows={4} value={wishes} onChange={(e) => setWishes(e.target.value)} placeholder="Your Wishes for the Couple!" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500" required />
      </div>
      <button type="submit" disabled={loading} className="w-full bg-rose-900 px-6 py-3 text-lg font-semibold text-white hover:bg-rose-700 transition-colors rounded">
        {loading ? 'Submitting...' : 'Confirm Attendance'}
      </button>
    </form>
  );
}

export default App;
