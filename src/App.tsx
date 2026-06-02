import React, { useState, useEffect, FormEvent } from 'react';
import { 
  Activity, 
  Leaf, 
  Calendar, 
  Video, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft, 
  Menu, 
  X, 
  HelpCircle, 
  Layers, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  ChevronDown,
  MessageSquare,
  AlertTriangle,
  Stethoscope,
  Award,
  BookOpen,
  DollarSign,
  TrendingUp,
  ExternalLink,
  ThumbsUp,
  Info,
  Check
} from 'lucide-react';

type VitalKey = 'sugar' | 'cholesterol' | 'bp' | 'heart' | 'kidneys' | 'retina' | 'nerves';

interface BookingDetails {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  email: string;
  doctor: string;
  date: string;
  time: string;
  type: string;
  notes: string;
}

export default function App() {
  // Navigation & Responsiveness States
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Logo Error Handling States (Safe React State-driven fallbacks)
  const [logoError, setLogoError] = useState(false);
  const [footerLogoError, setFooterLogoError] = useState(false);
  const [heroLogoError, setHeroLogoError] = useState(false);

  // Interaction States
  const [synergyMode, setSynergyMode] = useState('combined');
  const [activeElement, setActiveElement] = useState('Jal');
  const [caseStudyStep, setCaseStudyStep] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [panchakarmaFilter, setPanchakarmaFilter] = useState('all');
  const [vamanTab, setVamanTab] = useState('about');

  // Booking System States
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    doctor: 'Dr. Abhijeet Baldota (Allopathy & Diabetology)',
    date: '',
    time: '',
    type: 'Clinic Visit',
    notes: '',
  });
  const [isBooked, setIsBooked] = useState(false);
  const [bookedDetails, setBookedDetails] = useState<BookingDetails | null>(null);

  // Unified Diabetes Vitals & Organs Checklist State
  const [checkedVitals, setCheckedVitals] = useState<Record<VitalKey, boolean>>({
    sugar: false,
    cholesterol: false,
    bp: false,
    heart: false,
    kidneys: false,
    retina: false,
    nerves: false
  });

  // Toggler for checklists
  const toggleVital = (key: VitalKey) => {
    setCheckedVitals(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getVitalsScore = () => {
    return Object.values(checkedVitals).filter(Boolean).length;
  };

  const getVitalsPercentage = () => {
    const totalCount = Object.keys(checkedVitals).length;
    const checkedCount = Object.values(checkedVitals).filter(Boolean).length;
    return Math.round((checkedCount / totalCount) * 100);
  };

  const resetBooking = () => {
    setBookingForm({
      name: '',
      phone: '',
      email: '',
      doctor: 'Dr. Abhijeet Baldota (Allopathy & Diabetology)',
      date: '',
      time: '',
      type: 'Clinic Visit',
      notes: '',
    });
    setIsBooked(false);
    setBookedDetails(null);
  };

  // Track window scroll for premium sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Panchakarma Rates Data (Directly from rachana panchakarma rates.docx)
  const panchakarmaRates = [
    { name: "Vaman Course", details: "Includes comprehensive whole-body massage and targeted medicated steam", rate: 12000, category: "courses" },
    { name: "Virechan Course (6 Sittings)", details: "Full purgative detox cycle including customized massage and steam protocols", rate: 9000, category: "courses" },
    { name: "Virechan Course (3 Sittings)", details: "Condensed purgative detox cycle including customized massage and steam", rate: 7000, category: "courses" },
    { name: "Basti Course (7 Days)", details: "Premium medicated herbal oil and decoction enemas for chronic vata conditions", rate: 6000, category: "courses" },
    { name: "Full Body Massage with Medicated Steam (Single Sitting)", details: "Traditional herbal oil massage followed by state-of-the-art steam chamber sweat", rate: 1000, category: "individual" },
    { name: "Full Body Massage with Medicated Steam (5 Sittings)", details: "Therapeutic package targeting muscle relaxation and complete dermal toxin purge", rate: 4500, category: "individual" },
    { name: "Yoni Dhavan (Per Sitting - Female)", details: "Sterile medicated vaginal douching for female reproductive system health", rate: 1000, category: "gynaecology" },
    { name: "Yoni Dhavan Course (7 Sittings - Female)", details: "Comprehensive localized cleansing course addressing persistent infections or discharge", rate: 5000, category: "gynaecology" },
    { name: "Uttarbasti (Per Sitting - Female)", details: "Intra-uterine instillation of medicated oils to treat infertility and tubal blocks", rate: 1000, category: "gynaecology" },
    { name: "Uttarbasti Course (4 Sittings - Female)", details: "Advanced organic therapy program aiding conception and regulating ovaries", rate: 4000, category: "gynaecology" },
    { name: "Shirodhara (Per Sitting)", details: "Calming continuous pour of warm medicated herbal oil across the frontal lobe", rate: 800, category: "individual" },
    { name: "Shirodhara Course (5 Sittings)", details: "Nervous reset course designed to battle extreme insomnia, anxiety, and hypertension", rate: 3000, category: "courses" },
    { name: "Rakta-Moshan", details: "Classical Ayurvedic blood-letting therapy to instantly manage chronic skin disorders and gout", rate: 500, category: "individual" },
    { name: "Janu Basti (Per Sitting)", details: "Medicated oil reservoir constructed around knee joints to combat severe osteoarthritis", rate: 500, category: "individual" },
    { name: "Kati Basti (Per Sitting)", details: "Medicated oil pool constructed over the lumbar area to cure sciatica and slip disc pain", rate: 500, category: "individual" }
  ];

  // Testimonials Data
  const testimonials = [
    {
      name: "Rajesh Kulkarni",
      age: 52,
      condition: "Type 2 Diabetes & Extreme Fatigue",
      text: "Dr. Abhijeet stabilized my soaring glucose levels using state-of-the-art diagnostics, while Dr. Rachana's authentic detox treatments restored my vitality. I went from being highly dependent on heavy medication to a minimal sustainable dose. This clinic literally saved my kidneys!",
      rating: 5,
      location: "Kothrud, Pune"
    },
    {
      name: "Dr. Priya Deshmukh",
      age: 41,
      condition: "Severe Hypothyroidism & Acid Reflux",
      text: "Being a medical professional myself, I was highly skeptical of mixing treatments. However, Alloveda's medical team is extraordinarily precise. They monitor serum markers scientifically while treating systemic cellular fire. My thyroid antibodies have drastically normalized.",
      rating: 5,
      location: "Aundh, Pune"
    },
    {
      name: "Amit Sharma",
      age: 48,
      condition: "HbA1c of 9.2% & High Lipids",
      text: "The patient education model here is incredibly eye-opening. They taught me that sugar is just a symptom of a larger vascular risk. With their custom diet, targeted yoga routines, and holistic medicines, I successfully dropped my HbA1c to 5.9% and lost 9kgs.",
      rating: 5,
      location: "Baner, Pune"
    }
  ];

  // FAQ Data (All questions answered deeply matching documents)
  const faqs = [
    {
      q: "How exactly do you combine Allopathy and Ayurveda?",
      a: "We practice a structured synergistic approach. Dr. Abhijeet monitors acute metabolic parameters, vital organ filtration, and vascular risks using modern scientific tools (Allopathy). Simultaneously, Dr. Rachana initiates customized cellular purification, detox therapies, and dosha balancing (Ayurveda). This dual action protects your organs and reduces dependency on high-dose pharmaceuticals."
    },
    {
      q: "Can I choose to undergo ONLY Allopathy or ONLY Ayurveda?",
      a: "Yes. At Alloveda, patient autonomy is one of our fundamental values. We transparently explain your diagnostic reports and let you choose whether you want pure Allopathy, pure Ayurveda, or our integrated Synergistic Path."
    },
    {
      q: "What is Panchakarma and is it safe for diabetics?",
      a: "Panchakarma is a series of five biological detoxification therapies (including Vaman, Virechan, and Basti). For diabetics, chronic toxin build-up (Ama) causes high insulin resistance. Under Dr. Rachana's direct clinical supervision, these therapies safely purge metabolic waste, enhancing insulin receptor sensitivity."
    },
    {
      q: "How does the Video Consultation workflow function?",
      a: "If you select WhatsApp Video Consultation, simply submit your request. Our clinic desk will contact you via WhatsApp to verify details, manage the ₹600 consultation payment, and coordinate the call timing. The consultation is conducted directly over a WhatsApp Video Call."
    },
    {
      q: "Are Ayurvedic herbs safe to take with my daily cardiac medicines?",
      a: "Yes, because our clinicians collaborate directly under one roof. Dr. Abhijeet (MD Medicine) and Dr. Rachana (BAMS) double-check your daily medicine logs to ensure there are absolutely zero drug-herb interactions. This medical safety guard is what sets Alloveda apart."
    }
  ];

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.date || !bookingForm.time) {
      alert("Please enter all required fields: Name, Phone, Date, and Time Slot.");
      return;
    }
    const bookingId = "ALLOVEDA-" + Math.floor(100000 + Math.random() * 900000);
    const details = {
      ...bookingForm,
      id: bookingId,
      timestamp: new Date().toLocaleDateString('en-IN', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      })
    };
    setBookedDetails(details);
    setIsBooked(true);
  };

  const filteredRates = panchakarmaRates.filter(item => {
    if (panchakarmaFilter === 'all') return true;
    return item.category === panchakarmaFilter;
  });

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-[#1A251D] font-sans antialiased selection:bg-[#4CAF50] selection:text-white overflow-x-hidden">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#111111] text-white text-[11px] font-semibold py-2.5 px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2.5">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="flex items-center gap-1.5 text-[#7ED957]">
              <span className="w-2 h-2 rounded-full bg-[#7ED957] animate-pulse shrink-0"></span>
              Aundh Clinic Timing: 11:30 AM – 2:30 PM & 6:30 PM – 9:00 PM
            </span>
            <span className="hidden sm:inline text-neutral-700">|</span>
            <span className="text-neutral-300 flex items-center gap-1">
              📍 First Floor, Lav Kush Apartment, Aundh, Pune
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+919922668668" className="hover:text-[#7ED957] transition-colors flex items-center gap-1 font-bold">
              📞 9922668668
            </a>
            <a 
              href="https://wa.me/919922668668?text=Hello%20Alloveda%20Clinic,%20I'd%2520like%2520to%2520schedule%2520an%2520appointment." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#4CAF50] hover:bg-[#7ED957] text-white px-3 py-1 rounded-full text-[10px] font-bold transition-all uppercase tracking-wider"
            >
              WhatsApp Quick Desk
            </a>
          </div>
        </div>
      </div>

      {/* 2. STICKY GLASSMORPHIC NAVIGATION WITH REAL LOGO INTEGRATION */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-md py-2' : 'bg-white/90 py-4'} backdrop-blur-md border-b border-[#E8F5E9]/50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Real Logo Box with pure React fallback */}
            <div className="flex items-center gap-3 cursor-pointer group shrink-0" onClick={() => navigateTo('home')}>
              <div className="h-12 sm:h-14 w-auto flex items-center justify-center relative transition-transform duration-300 group-hover:scale-102">
                {!logoError ? (
                  <img 
                    src="Capture.JPG" 
                    alt="Alloveda Clinic Logo" 
                    className="h-10 sm:h-12 w-auto rounded-lg object-contain bg-neutral-950 p-1.5"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-[#111111] text-white flex items-center justify-center font-mono font-black">
                      av
                    </div>
                    <div>
                      <span className="text-lg font-black text-neutral-900 tracking-tight font-serif">alloveda</span>
                      <span className="text-[8px] font-bold text-[#4CAF50] ml-1 uppercase tracking-widest bg-[#E8F5E9] px-1 rounded-full">Clinic</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center space-x-1">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Us' },
                { id: 'services', label: 'Clinic Services' },
                { id: 'diabetes', label: 'Diabetes Intensive' },
                { id: 'ayurveda', label: 'Ayurveda & Rates' },
                { id: 'doctors', label: 'Doctors Panel' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => navigateTo(tab.id)}
                  className={`px-3.5 py-2.5 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all ${activeTab === tab.id ? 'text-[#4CAF50] bg-[#E8F5E9]' : 'text-slate-600 hover:text-neutral-900 hover:bg-slate-100/50'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* CTA Book Now Button */}
            <div className="hidden xl:flex items-center gap-4">
              <button 
                onClick={() => navigateTo('booking')} 
                className="bg-[#111111] text-white hover:bg-[#222] px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg transition-all transform active:scale-95 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#7ED957]" />
                Book Session
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center xl:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 sm:p-2.5 rounded-xl text-slate-500 hover:text-slate-950 hover:bg-slate-100 transition-all focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile slide-out drawer menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl px-4 py-6 space-y-2 animate-fadeIn z-50">
            {[
              { id: 'home', label: 'Home Dashboard' },
              { id: 'about', label: 'About Alloveda Philosophy' },
              { id: 'services', label: 'Treatments & Specialties' },
              { id: 'diabetes', label: 'Diabetes Care Center' },
              { id: 'ayurveda', label: 'Ayurveda & Pricing Rates' },
              { id: 'doctors', label: 'Our Medical Team' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => navigateTo(tab.id)} 
                className={`block w-full text-left px-5 py-3.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-[#E8F5E9] text-[#4CAF50]' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                {tab.label}
              </button>
            ))}
            
            <div className="pt-6 border-t border-slate-150 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => navigateTo('booking')} 
                className="w-full bg-[#111111] text-white text-center py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#7ED957]" />
                Schedule Booking
              </button>
              <a 
                href="tel:+919922668668" 
                className="w-full border border-slate-200 text-slate-700 text-center py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-50"
              >
                <Phone className="w-4 h-4 text-[#4CAF50]" />
                Call Desk Support
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* 3. CORE VIEWS */}
      
      {/* ==================== HOME TAB ==================== */}
      {activeTab === 'home' && (
        <div className="animate-fadeIn">
          
          {/* PREMIUM HERO SECTION */}
          <header className="relative bg-gradient-to-b from-[#E8F5E9]/40 via-white to-[#F8FAF8] pt-10 sm:pt-16 pb-20 sm:pb-28 px-4 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
              <div className="absolute top-10 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#7ED957]/15 rounded-full filter blur-3xl animate-pulse"></div>
              <div className="absolute bottom-10 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#4CAF50]/10 rounded-full filter blur-3xl animate-pulse"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Side Pitch */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F5E9] border border-[#4CAF50]/20 text-[#2E7D32] text-[10px] uppercase tracking-widest font-black mx-auto lg:mx-0">
                  <Sparkles className="w-3.5 h-3.5 text-[#4CAF50] animate-spin shrink-0" />
                  India's Synergistic Healing Model
                </div>
                
                <h1 className="text-3xl sm:text-5xl lg:text-[48px] xl:text-[54px] font-extrabold text-[#111111] leading-tight font-serif tracking-tight">
                  Where Modern <span className="text-[#4CAF50] underline decoration-[#7ED957] decoration-wavy decoration-2">Allopathy</span> Meets Divine Ayurveda.
                </h1>
                
                <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  We believe that in a debate of <strong className="text-[#111111]">“Allopathy or Ayurveda: which is better”</strong>, there is only one true loser: the patient themselves. Experience custom diagnostic healthcare with minimum pharmaceutical side-effects.
                </p>

                {/* Hero Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center lg:justify-start">
                  <button 
                    onClick={() => navigateTo('booking')} 
                    className="bg-[#111111] text-white hover:bg-neutral-800 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-xs font-bold uppercase tracking-wider shadow-2xl transition-all flex items-center justify-center gap-2 group w-full sm:w-auto h-12"
                  >
                    <span>Clinic Appointment</span>
                    <ChevronRight className="w-4 h-4 text-[#7ED957] group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>
                  <button 
                    onClick={() => {
                      setBookingForm({...bookingForm, type: 'WhatsApp Video Consultation'});
                      navigateTo('booking');
                    }} 
                    className="bg-white text-slate-800 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 w-full sm:w-auto h-12"
                  >
                    <Video className="w-4 h-4 text-[#4CAF50] animate-pulse shrink-0" />
                    WhatsApp Video Call (₹600)
                  </button>
                </div>

                {/* Hero Feature Icons */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 sm:pt-8 border-t border-slate-200/50 text-left">
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] flex items-center justify-center text-[#4CAF50] shrink-0">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-extrabold text-slate-700 leading-tight">MD Diabetologist Care</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] flex items-center justify-center text-[#4CAF50] shrink-0">
                      <Leaf className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-extrabold text-slate-700 leading-tight">Certified Panchakarma</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-2.5 col-span-2 sm:col-span-1 justify-center sm:justify-start">
                    <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] flex items-center justify-center text-[#4CAF50] shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-extrabold text-slate-700 leading-tight">10,000+ Safe Recoveries</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Premium Card & Logo Banner */}
              <div className="lg:col-span-5 flex justify-center w-full">
                <div className="relative w-full max-w-sm sm:max-w-md animate-slideDown">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#4CAF50] to-[#7ED957] rounded-3xl opacity-20 blur-xl pointer-events-none"></div>
                  
                  <div className="relative bg-white border border-[#E8F5E9] rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5">
                    
                    {/* Logo Image */}
                    <div className="flex justify-center pb-4 border-b border-slate-100">
                      {!heroLogoError ? (
                        <img 
                          src="Capture.JPG" 
                          alt="Alloveda Clinic Official Logo" 
                          className="h-14 sm:h-16 w-auto rounded-lg object-contain shadow-sm bg-neutral-950 p-2"
                          onError={() => setHeroLogoError(true)}
                        />
                      ) : (
                        <div className="text-xl font-bold font-serif text-[#4CAF50] uppercase tracking-wider">alloveda</div>
                      )}
                    </div>

                    {/* Dr. Abhijeet Portrait */}
                    <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-2xl bg-[#F8FAF8] border border-slate-200/50">
                      <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl overflow-hidden shrink-0 border-2 border-[#4CAF50] shadow-md">
                        <img 
                          src="ABHIJEET BALDOTA PHOTO.png" 
                          alt="Dr. Abhijeet Baldota"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop";
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="text-[9px] sm:text-[10px] font-black uppercase text-slate-500 tracking-wider">Allopathy & Diabetology Head</h4>
                        <h3 className="text-sm sm:text-base font-bold text-[#111111]">Dr. Abhijeet Baldota</h3>
                        <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">MBBS, MD Medicine (Pune)</p>
                      </div>
                    </div>

                    {/* Specialties list */}
                    <div className="space-y-2 pt-1 text-xs text-slate-700 text-left">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#4CAF50] shrink-0" />
                        <span>Joint clinical reviews for complex metabolic cases</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#4CAF50] shrink-0" />
                        <span>Hygienic in-house Panchakarma suite</span>
                      </div>
                    </div>

                    {/* Quality statement */}
                    <div className="bg-[#111111] text-white rounded-2xl p-4 text-center space-y-1">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-[#7ED957]">Our Clinical Principle</p>
                      <p className="text-xs font-serif italic text-slate-200 leading-relaxed">
                        "Minimum medications, maximum wellness benefit, zero side effects."
                      </p>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </header>

          {/* DYNAMIC TREATMENT PATH SIMULATOR */}
          <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-b border-slate-100">
            <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
              
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <span className="text-xs font-bold text-[#4CAF50] bg-[#E8F5E9] px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Interactive Care Simulator
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 font-serif leading-tight">
                  Choose Your Treatment Modality
                </h2>
                <p className="text-slate-600 text-sm">
                  At Alloveda Clinic, we give you the option to choose. Click below to simulate patient outcomes across our clinical frameworks:
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* Switchers */}
                <div className="lg:col-span-4 flex flex-col sm:grid sm:grid-cols-3 lg:flex lg:flex-col gap-3">
                  <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest sm:col-span-3 lg:col-span-1 mb-1 lg:mb-2 text-center lg:text-left">Select Active Path:</p>
                  
                  <button 
                    onClick={() => setSynergyMode('allopathy')}
                    className={`text-left p-4 rounded-2xl border transition-all duration-300 w-full ${synergyMode === 'allopathy' ? 'bg-[#E8F5E9] border-[#4CAF50] shadow-md' : 'bg-slate-50 border-slate-200/70 hover:bg-slate-100'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${synergyMode === 'allopathy' ? 'bg-[#4CAF50] text-white' : 'bg-slate-200 text-slate-600'}`}>
                        <Stethoscope className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Only Allopathy</h4>
                        <p className="text-[10px] text-slate-500 leading-tight hidden sm:block lg:block">Rapid symptom control, potential pharmaceutical overload.</p>
                      </div>
                    </div>
                  </button>

                  <button 
                    onClick={() => setSynergyMode('ayurveda')}
                    className={`text-left p-4 rounded-2xl border transition-all duration-300 w-full ${synergyMode === 'ayurveda' ? 'bg-[#E8F5E9] border-[#4CAF50] shadow-md' : 'bg-slate-50 border-slate-200/70 hover:bg-slate-100'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${synergyMode === 'ayurveda' ? 'bg-[#4CAF50] text-white' : 'bg-slate-200 text-slate-600'}`}>
                        <Leaf className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Only Ayurveda</h4>
                        <p className="text-[10px] text-slate-500 leading-tight hidden sm:block lg:block">Deep detox, takes extensive time for acute high spikes.</p>
                      </div>
                    </div>
                  </button>

                  <button 
                    onClick={() => setSynergyMode('combined')}
                    className={`text-left p-4 rounded-2xl border transition-all duration-300 w-full ${synergyMode === 'combined' ? 'bg-[#111111] text-white border-[#4CAF50] shadow-xl' : 'bg-slate-50 border-slate-200/70 hover:bg-slate-100'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#4CAF50] text-white flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wider">Alloveda Synergistic</h4>
                        <p className={`text-[10px] leading-tight hidden sm:block lg:block ${synergyMode === 'combined' ? 'text-slate-300' : 'text-slate-500'}`}>Optimal chemical control + deep herbal purification.</p>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Simulated Meter Dashboard */}
                <div className="lg:col-span-8 bg-slate-50 border border-slate-200/60 rounded-3xl p-5 sm:p-8 space-y-6">
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-200">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">Path Impact Analysis</h4>
                      <p className="text-xs text-slate-500">Live clinical simulation modeling</p>
                    </div>
                    <span className="text-xs font-bold bg-[#E8F5E9] text-[#2E7D32] px-3.5 py-1 rounded-full uppercase tracking-wider">
                      Model: <strong>{synergyMode}</strong>
                    </span>
                  </div>

                  {/* Meter Graphics */}
                  <div className="space-y-6">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-extrabold text-slate-700">
                        <span>Symptom Response Speed</span>
                        <span className="text-[#4CAF50]">
                          {synergyMode === 'allopathy' && 'Ultra Rapid (95%)'}
                          {synergyMode === 'ayurveda' && 'Gradual (55%)'}
                          {synergyMode === 'combined' && 'Highly Rapid (90%)'}
                        </span>
                      </div>
                      <div className="h-4 bg-slate-200/70 rounded-full overflow-hidden relative">
                        <div 
                          className={`h-full rounded-full transition-all duration-700 ${synergyMode === 'allopathy' ? 'bg-amber-500 w-[95%]' : synergyMode === 'ayurveda' ? 'bg-green-500 w-[55%]' : 'bg-[#4CAF50] w-[90%]'}`}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-extrabold text-slate-700">
                        <span>Chemical Medicine Dosage Required</span>
                        <span className="text-[#4CAF50]">
                          {synergyMode === 'allopathy' && 'High Dosage (85%)'}
                          {synergyMode === 'ayurveda' && 'Zero Chemicals (0%)'}
                          {synergyMode === 'combined' && 'Optimized Minimum (25%)'}
                        </span>
                      </div>
                      <div className="h-4 bg-slate-200/70 rounded-full overflow-hidden relative">
                        <div 
                          className={`h-full rounded-full transition-all duration-700 ${synergyMode === 'allopathy' ? 'bg-red-500 w-[85%]' : synergyMode === 'ayurveda' ? 'bg-green-300 w-[5%]' : 'bg-[#4CAF50] w-[25%]'}`}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-extrabold text-slate-700">
                        <span>Long-term Organ Protection Rate</span>
                        <span className="text-[#4CAF50]">
                          {synergyMode === 'allopathy' && 'Moderate (50%)'}
                          {synergyMode === 'ayurveda' && 'High (80%)'}
                          {synergyMode === 'combined' && 'Maximum Security (98%)'}
                        </span>
                      </div>
                      <div className="h-4 bg-slate-200/70 rounded-full overflow-hidden relative">
                        <div 
                          className={`h-full rounded-full transition-all duration-700 ${synergyMode === 'allopathy' ? 'bg-amber-400 w-[50%]' : synergyMode === 'ayurveda' ? 'bg-green-500 w-[80%]' : 'bg-[#4CAF50] w-[98%]'}`}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 space-y-1.5">
                    <h5 className="text-[10px] font-black text-neutral-900 uppercase tracking-widest flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#4CAF50] shrink-0" /> Scientific Core Logic
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed text-left font-sans">
                      {synergyMode === 'allopathy' && "Excellent for rapid intervention, stabilization of high spikes, and emergency management. However, chronic long-term usage of high-dose chemical agents alone can put severe filtration strain on renal systems and the liver."}
                      {synergyMode === 'ayurveda' && "Superb for identifying root toxic congestion (Ama) and repairing metabolic fire. However, severe high blood glucose spikes (e.g., HbA1c > 9%) require fast pharmaceutical suppression first to prevent imminent organic damage."}
                      {synergyMode === 'combined' && "The gold standard of metabolic healing. We instantly capture high spikes using optimum safe allopathic dosages while initiating Dr. Rachana's authentic detoxes. As cells absorb insulin naturally, we reduce chemical dependency to a minimum."}
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </section>

          {/* NEW Timings & WHATSAPP VIDEO CONSULTATION HIGHLIGHT SECTION */}
          <section className="bg-slate-50 py-16 px-4 border-b border-slate-150">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              
              {/* Timing Display */}
              <div className="bg-white border border-[#E8F5E9] p-6 sm:p-8 rounded-3xl shadow-lg space-y-4 text-left">
                <div className="inline-flex items-center gap-1 text-xs font-black text-[#2E7D32] bg-[#E8F5E9] px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-[#4CAF50]" /> Official Clinic Timings
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#111111] font-serif leading-tight">Plan Your Aundh Clinic Visit</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We maintain strictly managed consulting slots to avoid crowding. Please review our revised operating shifts:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-slate-100 flex items-center gap-3">
                    <Clock className="w-8 h-8 text-[#4CAF50]" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Morning Shift</p>
                      <p className="text-sm font-extrabold text-[#111111]">11:30 AM – 2:30 PM</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-slate-100 flex items-center gap-3">
                    <Clock className="w-8 h-8 text-[#4CAF50]" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Evening Shift</p>
                      <p className="text-sm font-extrabold text-[#111111]">6:30 PM – 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Video Consult Workflow Card */}
              <div className="bg-white border border-[#E8F5E9] p-6 sm:p-8 rounded-3xl shadow-lg space-y-4 text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#2E7D32] bg-[#E8F5E9] px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                  <Video className="w-4 h-4 text-[#4CAF50]" /> WhatsApp Video Call Consult
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#111111] font-serif leading-tight">Virtual Consult • ₹600 Only</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Can't visit our Aundh clinic? Speak directly to our expert physicians from your mobile device. Simple, human, and hassle-free workflow:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-[#4CAF50] shrink-0" />
                    <span>Select WhatsApp Video Consult while booking</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-[#4CAF50] shrink-0" />
                    <span>Clinic staff contacts you on WhatsApp manually</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-[#4CAF50] shrink-0" />
                    <span>Handle UPI payment (₹600) directly with the clinic</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-[#4CAF50] shrink-0" />
                    <span>Consult safely via high-quality WhatsApp Video Call</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* EDUCATIONAL CASE CHRONOLOGY */}
          <section className="py-20 sm:py-24 bg-white px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <span className="text-xs font-bold text-[#4CAF50] bg-[#E8F5E9] px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Case Study Highlight
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] font-serif leading-tight">
                  The Karela Juice Trap vs Combined Approach
                </h2>
                <p className="text-sm text-slate-500 max-w-xl mx-auto">
                  Many patients land up making critical mistakes when diagnosed with medium-to-long term chronic health issues. Follow Case I below:
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-xl border border-slate-200/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#4CAF50]"></div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pb-6 border-b border-slate-100 text-center">
                  {["1. Shock Diagnosis", "2. Home Remedy Trap", "3. Critical Spikes", "4. Integrated Success"].map((label, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCaseStudyStep(idx)}
                      className={`py-2 px-1 text-[10px] sm:text-xs uppercase tracking-wider font-extrabold transition-all border-b-2 ${caseStudyStep === idx ? 'text-[#4CAF50] border-[#4CAF50]' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="py-6 sm:py-8 space-y-4">
                  {caseStudyStep === 0 && (
                    <div className="space-y-3 animate-fadeIn text-left">
                      <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                        <AlertTriangle className="w-4 h-4 shrink-0" /> Diabetes Found
                      </div>
                      <h4 className="text-lg font-bold text-[#111111] font-serif">Annual Checkup Discovery</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        A typical patient is diagnosed with diabetes during a routine annual screening. They go to a standard clinic where they are instantly prescribed heavy allopathic medications. Terrified of a lifetime of drugs, they seek alternative avenues.
                      </p>
                    </div>
                  )}

                  {caseStudyStep === 1 && (
                    <div className="space-y-3 animate-fadeIn text-left">
                      <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-red-700 bg-red-50 px-3 py-1 rounded-full">
                        <AlertTriangle className="w-4 h-4 shrink-0" /> Well-Meaning Advice
                      </div>
                      <h4 className="text-lg font-bold text-[#111111] font-serif">The Karela Juice Trap</h4>
                      <p className="text-sm text-slate-600 leading-relaxed font-sans">
                        Someone from the family suggests: "Why start chemicals so early? Try raw Ayurveda or just take bitter melon (Karela) juice daily to cure it naturally." The patient stops scientific monitoring and drops the essential medical guidance.
                      </p>
                    </div>
                  )}

                  {caseStudyStep === 2 && (
                    <div className="space-y-3 animate-fadeIn text-left">
                      <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-red-700 bg-red-50 px-3 py-1 rounded-full">
                        <AlertTriangle className="w-4 h-4 shrink-0" /> Damage Risk
                      </div>
                      <h4 className="text-lg font-bold text-[#111111] font-serif">Worst Sugars & Structural Damage</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        After a period of unmonitored home remedies, sugars are rechecked. The patient receives the shock of their life to see worse sugars (HbA1c spiking to 10%+). By doing this, they lost essential time and risked damaging vital structural organs like kidneys, retina, or heart.
                      </p>
                    </div>
                  )}

                  {caseStudyStep === 3 && (
                    <div className="space-y-3 animate-fadeIn text-left">
                      <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#2E7D32] bg-[#E8F5E9] px-3 py-1 rounded-full">
                        <CheckCircle className="w-4 h-4 shrink-0" /> Safe Integration
                      </div>
                      <h4 className="text-lg font-bold text-[#111111] font-serif">The Alloveda Outcome</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        If they had chosen Alloveda's Combined Approach early on, they would have had the security of optimum Allopathic medicines to prevent high sugar complications, alongside Dr. Rachana's authentic Panchakarma to lower insulin resistance naturally. This achieves positive, long-term health with minimum medication doses!
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-5 border-t border-slate-100">
                  <button 
                    disabled={caseStudyStep === 0}
                    onClick={() => setCaseStudyStep(p => p - 1)}
                    className="flex items-center gap-1.5 text-xs font-extrabold text-slate-500 hover:text-slate-800 disabled:opacity-40"
                  >
                    <ChevronLeft className="w-4 h-4 shrink-0" /> Back
                  </button>
                  <button 
                    disabled={caseStudyStep === 3}
                    onClick={() => setCaseStudyStep(p => p + 1)}
                    className="flex items-center gap-1.5 text-xs font-extrabold text-[#4CAF50] hover:text-[#3d8c40] disabled:opacity-40"
                  >
                    Next <ChevronRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>

              </div>
            </div>
          </section>

          {/* FACILITY GALLERY SEGMENT */}
          <section className="bg-slate-50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
                <div>
                  <span className="text-[10px] sm:text-xs uppercase font-bold text-[#4CAF50] tracking-widest block">Aundh Premium Premise</span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-serif text-[#111111] mt-1">Our Healing Environment</h3>
                </div>
                <p className="text-xs text-slate-500 max-w-sm">
                  Step inside our state-of-the-art clinic combining cutting-edge medicine rooms with holistic detoxification wards.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Consulting chamber */}
                <div className="relative rounded-2xl overflow-hidden group shadow-md h-52 sm:h-56 border border-slate-200">
                  <img 
                    src="2017-09-03 (1).jpg" 
                    alt="Alloveda Doctors Consulting Desk" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1584515906207-fd6c41a49f80?q=80&w=600&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent flex items-end p-4 text-left">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#7ED957] tracking-wider block">Clinical Chamber</span>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Consulting Suite Room</h4>
                    </div>
                  </div>
                </div>

                {/* Exterior Storefront */}
                <div className="relative rounded-2xl overflow-hidden group shadow-md h-52 sm:h-56 border border-slate-200">
                  <img 
                    src="2017-09-03 (2).jpg" 
                    alt="Alloveda Clinic Exterior Entrance Sign Board" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent flex items-end p-4 text-left">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#7ED957] tracking-wider block">Entrance</span>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Aundh Main Storefront Board</h4>
                    </div>
                  </div>
                </div>

                {/* Natural sign */}
                <div className="relative rounded-2xl overflow-hidden group shadow-md h-52 sm:h-56 border border-slate-200 sm:col-span-2 lg:col-span-1">
                  <img 
                    src="102_72_Ayurveda-sign.jpg" 
                    alt="Divine Ayurvedic Lily Herbal Backdrop" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent flex items-end p-4 text-left">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#7ED957] tracking-wider block">Ayurvedic Rejuvenation</span>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Divine Panchakarma Therapy Wing</h4>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* QUICK DIAL PANEL */}
          <section className="bg-gradient-to-br from-[#111111] via-neutral-900 to-[#1A251D] text-white py-16 text-center">
            <div className="max-w-4xl mx-auto px-4 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
                Take Charge of Your Metabolic & Systemic Health Today
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-sans leading-relaxed">
                Consult with our expert medical team in person at Aundh or via high-definition video call coordinate.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button 
                  onClick={() => navigateTo('booking')} 
                  className="bg-[#4CAF50] hover:bg-[#7ED957] text-neutral-950 font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all shadow-xl h-11"
                >
                  Book Appointment Now
                </button>
                <a 
                  href="tel:+919922668668"
                  className="bg-transparent border border-white/20 hover:bg-white/10 text-white font-extrabold text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 h-11"
                >
                  <Phone className="w-4 h-4 text-[#7ED957]" /> Call Clinic Desk
                </a>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* ==================== ABOUT US TAB ==================== */}
      {activeTab === 'about' && (
        <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 animate-fadeIn max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#4CAF50] bg-[#E8F5E9] px-4 py-1.5 rounded-full uppercase tracking-wider">
              The Alloveda Story
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-neutral-950 font-serif leading-tight">
              Where Modern Allopathy Meets Divine Ayurveda
            </h1>
            <p className="text-slate-600 text-sm">
              We provide an integrated therapeutic medical bridge built on scientific diagnostic metrics and classical cleansing therapies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Detailed text */}
            <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 font-serif">Understanding the Synergistic Logic</h3>
              <p className="font-sans">
                Alloveda is a unique clinic where two of the most widely practiced sciences in medicine—Allopathy and Ayurveda—are combined. In a standard healthcare scenario, patients are often forced to take sides. Modern doctors may view ancient methodologies with skepticism, while traditional practitioners might tell you to completely stop modern diagnostic drugs.
              </p>
              <blockquote className="border-l-4 border-[#4CAF50] pl-4 italic text-neutral-900 bg-[#E8F5E9]/50 p-4 rounded-r-2xl font-serif">
                "In a debate of 'Allopathy or Ayurveda: which is better' there is only one true loser: the patient, and the patient himself."
              </blockquote>
              <p className="font-sans">
                Each science has a different understanding of the human being. Their approach is different, and so is their diagnostic and treatment modality. We follow a simple logic called the <strong>Synergistic Approach</strong>.
              </p>
              
              <div className="space-y-4 pt-2 font-sans">
                <h4 className="font-extrabold text-neutral-950 text-sm sm:text-base uppercase tracking-wider">Our Core Pillars:</h4>
                
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8F5E9] shadow-sm flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#E8F5E9] text-[#4CAF50] flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-neutral-950 text-sm">Minimum Medications, Maximum Benefit:</h5>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">We believe and practice that if both Allopathy and Ayurveda are combined right from the early stage, the patient's benefit will be maximized, while the overall pharmaceutical medication dosage and its associated side-effects will be kept to an absolute minimum.</p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8F5E9] shadow-sm flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#E8F5E9] text-[#4CAF50] flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-neutral-950 text-sm">Empowered Patient Education:</h5>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Every patient is given comprehensive information about their disease, its risk vectors, and the various ways in which it can be managed. Ultimately, the patient is the one who makes an empowered decision for themselves.</p>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-950 text-white rounded-3xl p-5 sm:p-6 space-y-3 font-sans">
                <h4 className="font-bold text-[#7ED957] text-sm uppercase tracking-wider">A Clinical Choice for Everyone</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  At Alloveda clinic, we don't force a single path. We give the patient the complete choice to choose whichever pathy they want:
                </p>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] sm:text-xs font-bold pt-2 uppercase tracking-wider">
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white">Allopathy Only</div>
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white">Ayurveda Only</div>
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-[#7ED957]">Combined Path</div>
                </div>
              </div>

            </div>

            {/* Side consult frame */}
            <div className="lg:col-span-5 bg-white border border-[#E8F5E9] p-5 sm:p-6 rounded-3xl space-y-6 shadow-xl relative overflow-hidden w-full max-w-md mx-auto text-left">
              <div className="h-44 sm:h-48 rounded-2xl overflow-hidden shadow-sm border border-slate-150">
                <img 
                  src="2017-09-03 (1).jpg" 
                  alt="Alloveda Consulting Space" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop";
                  }}
                />
              </div>

              <h4 className="font-bold font-serif text-neutral-950 text-base sm:text-lg">Collaborative Patient Care</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                When you choose Alloveda Clinic, our doctors consult together on your clinical file. There is no conflicting advice—only a single, scientifically double-checked treatment design.
              </p>

              <div className="border-t border-slate-100 pt-5 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                  <img 
                    src="ABHIJEET BALDOTA PHOTO.png" 
                    alt="Dr. Abhijeet Baldota"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop";
                    }}
                  />
                </div>
                <div>
                  <h5 className="text-xs font-black text-neutral-950 uppercase tracking-wider font-sans">Clinicians Board</h5>
                  <p className="text-[10px] text-slate-400 font-semibold font-sans">Dr. Abhijeet & Dr. Rachana Baldota</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==================== SERVICES TAB ==================== */}
      {activeTab === 'services' && (
        <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 animate-fadeIn max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#4CAF50] bg-[#E8F5E9] px-4 py-1.5 rounded-full uppercase tracking-wider">
              Clinical Offerings
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-neutral-950 font-serif leading-tight">
              Our Comprehensive Medical Facilities
            </h1>
            <p className="text-slate-600 text-sm">
              Discover our integrated specialties and clinical diagnostic pathways available on site.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Service Cards */}
            <div className="bg-white border border-[#E8F5E9] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between text-left">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#4CAF50] flex items-center justify-center">
                  <Activity className="w-6 h-6 shrink-0" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#111111] font-serif">Diabetology</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                  Comprehensive screening and blood testing setup including HbA1c tests, cardiac lipid checkups, ocular retina tracking, and intensive diet/exercise counseling.
                </p>
              </div>
              <button onClick={() => navigateTo('diabetes')} className="text-xs font-bold text-[#4CAF50] hover:text-neutral-950 flex items-center gap-1 mt-4">
                Diabetes Program <ChevronRight className="w-4 h-4 shrink-0" />
              </button>
            </div>

            <div className="bg-white border border-[#E8F5E9] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between text-left">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#4CAF50] flex items-center justify-center">
                  <Leaf className="w-6 h-6 shrink-0" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#111111] font-serif">Ayurveda & Panchakarma</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                  Authentic holistic treatments directed by our BAMS lead. Focuses on Dosha balancing and natural herbal extracts to resolve the root causes of systemic illness.
                </p>
              </div>
              <button onClick={() => navigateTo('ayurveda')} className="text-xs font-bold text-[#4CAF50] hover:text-neutral-950 flex items-center gap-1 mt-4">
                Panchakarma Rates <ChevronRight className="w-4 h-4 shrink-0" />
              </button>
            </div>

            <div className="bg-white border border-[#E8F5E9] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between text-left">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#4CAF50] flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 shrink-0" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#111111] font-serif">General Physician</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                  MD-directed consultation addressing thyroid disorders, critical cardiac complications, weight/obesity risk files, and chronic seasonal allergies.
                </p>
              </div>
              <div className="h-4"></div>
            </div>

            <div className="bg-white border border-[#E8F5E9] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between text-left">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-neutral-950 text-[#7ED957] flex items-center justify-center">
                  <Layers className="w-6 h-6 shrink-0" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#111111] font-serif">Panchakarma Detox</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                  Fully equipped physical ward conducting clinical purging, therapeutic oil continuous pouring, and localized joint pools to evacuate deep systemic waste.
                </p>
              </div>
              <div className="h-4"></div>
            </div>

            <div className="bg-white border border-[#E8F5E9] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between text-left">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#4CAF50] flex items-center justify-center">
                  <Heart className="w-6 h-6 shrink-0" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#111111] font-serif">Gastro & Breast Surgeon</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                  Expert visiting super-specialist consultations and surgical screening reviews for complex intestinal and oncology parameters.
                </p>
              </div>
              <div className="h-4"></div>
            </div>

            <div className="bg-white border border-[#E8F5E9] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between text-left">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#4CAF50] flex items-center justify-center">
                  <FileText className="w-6 h-6 shrink-0" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#111111] font-serif">Pathology & Lab</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                  Hygienic pathology setup providing blood profiles, lipid tests, automated sugar tracking, and instant ECG assessments on site.
                </p>
              </div>
              <div className="h-4"></div>
            </div>

          </div>
        </div>
      )}

      {/* ==================== DIABETES INTENSIVE TAB ==================== */}
      {activeTab === 'diabetes' && (
        <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 animate-fadeIn max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#4CAF50] bg-[#E8F5E9] px-4 py-1.5 rounded-full uppercase tracking-wider">
              Specialized Care
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-neutral-950 font-serif leading-tight">
              Diabetology & Metabolic Care
            </h1>
            <p className="text-slate-600 text-sm">
              We offer comprehensive, medical-expert diabetes care to put the patient in absolute charge of their health.
            </p>
          </div>

          {/* Intro text */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#2E7D32] bg-[#E8F5E9] px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                ⚕️ Dr. Abhijeet Baldota's Forte
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-serif leading-tight text-left">
                "It is high time to think of Diabetes beyond just sugar diseases."
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-left font-sans">
                Diabetics often think of sugar as the only variable. Our clinic focuses on educating patients about other crucial unmet targets: <strong>Cholesterol, Blood Pressure, and shielding vital organs</strong> like the heart, kidneys, retina, and nervous system from permanent damage.
              </p>
              
              <div className="p-5 rounded-2xl bg-white border border-[#E8F5E9] shadow-sm text-left space-y-3">
                <h4 className="font-extrabold text-neutral-950 text-sm sm:text-base">We Put You in the Driver's Seat:</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  We are happiest when our patients return with their blood reports and can analyze the trends themselves! Taking active responsibility helps patients choose high-fiber diets, commit to regular exercise, and avoid unhealthy eating habits.
                </p>
              </div>
            </div>

            {/* Interactive Image Box using DIABETES FOR WEBSITE.jpg */}
            <div className="lg:col-span-5 w-full max-w-md mx-auto">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E8F5E9] h-60">
                <img 
                  src="DIABETES FOR WEBSITE.jpg" 
                  alt="Diabetes diagnostic kit elements" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=400&auto=format&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/30 to-transparent flex items-end p-5 text-left">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#7ED957] tracking-widest block">Metabolic Checkup</span>
                    <h3 className="text-sm sm:text-base font-bold text-white">Advanced Diagnostic Setup</h3>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Vitals protection check tool */}
          <div className="bg-[#111111] text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative border border-neutral-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
                <span className="text-xs font-bold text-[#7ED957] uppercase tracking-wider block">Preventative Shield</span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-serif">Have You Checked Your Organs?</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  High glucose is a silent enemy. Check off the vitals you have had reviewed inside the last 12 months to see your overall protection status:
                </p>

                <div className="pt-4 border-t border-neutral-800 flex justify-between items-center max-w-sm mx-auto lg:mx-0">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 font-sans">Protection Index</p>
                    <p className="text-3xl font-black text-[#7ED957] font-serif">{getVitalsPercentage()}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 font-sans">Parameters Met</p>
                    <p className="text-xl font-bold text-white">{getVitalsScore()} of 7</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {([
                  { key: 'sugar', label: "HbA1c Blood Glucose" },
                  { key: 'cholesterol', label: "Lipid Profile (LDL/HDL)" },
                  { key: 'bp', label: "Blood Pressure (<130/80)" },
                  { key: 'heart', label: "ECG / Cardiac Rhythm" },
                  { key: 'kidneys', label: "Urine Microalbumin" },
                  { key: 'retina', label: "Retinal Eye Fundoscopy" },
                  { key: 'nerves', label: "Vibration Foot Sensation" }
                ] as { key: VitalKey; label: string }[]).map((item) => (
                  <button
                    key={item.key}
                    onClick={() => toggleVital(item.key)}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-850 transition-all text-xs focus:outline-none"
                  >
                    <span className="font-semibold text-slate-200">{item.label}</span>
                    <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ml-3 ${checkedVitals[item.key] ? 'bg-[#4CAF50] text-neutral-950' : 'border border-slate-500'}`}>
                      {checkedVitals[item.key] && "✓"}
                    </div>
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Trusted references link list (Direct from Allovedaclinic.docx) */}
          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-6 text-center space-y-4">
            <h4 className="text-base sm:text-lg font-bold text-neutral-950 font-serif">Fight Myths with Scientific Facts</h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-sans">
              We urge our patients to avoid hoax online advertisements promising instant "100% cure products" which misguide patients. Instead, educate yourself from globally trusted scientific clinical organizations:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="https://www.mayoclinic.org" target="_blank" rel="noopener noreferrer" className="bg-white border border-slate-300 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5 hover:bg-slate-50">
                <ExternalLink className="w-3.5 h-3.5 text-blue-600" /> Mayo Clinic
              </a>
              <a href="https://www.joslin.org" target="_blank" rel="noopener noreferrer" className="bg-white border border-slate-300 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5 hover:bg-slate-50">
                <ExternalLink className="w-3.5 h-3.5 text-blue-600" /> Joslin Diabetes Center
              </a>
              <a href="https://www.diabetes.org" target="_blank" rel="noopener noreferrer" className="bg-white border border-slate-300 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5 hover:bg-slate-50">
                <ExternalLink className="w-3.5 h-3.5 text-[#E01A22]" /> American Diabetes Association
              </a>
            </div>
          </div>

        </div>
      )}

      {/* ==================== AYURVEDA, RATES, & VAMAN TAB ==================== */}
      {activeTab === 'ayurveda' && (
        <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 animate-fadeIn max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#4CAF50] bg-[#E8F5E9] px-4 py-1.5 rounded-full uppercase tracking-wider">
              Ayurvedic Ward
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-neutral-950 font-serif leading-tight">
              Panchakarma & Rates Index
            </h1>
            <p className="text-slate-600 text-sm">
              Authentic purification therapies directed by Dr. Rachana Baldota using clean modern chambers.
            </p>
          </div>

          {/* VAMAN INTEGRATIVE ACCORDION (From Vaman season is back.docx) */}
          <div className="bg-white border border-[#E8F5E9] rounded-3xl p-5 sm:p-8 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#4CAF50] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-bl-2xl">
              Highly Recommended
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Leaf Sign Image */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-4 w-full">
                <div className="h-56 sm:h-64 rounded-2xl overflow-hidden shadow-md border border-slate-100 w-full relative">
                  <img 
                    src="102_72_Ayurveda-sign.jpg" 
                    alt="Ayurvedic Treatment Room lilies sign backdrop" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-neutral-950/40"></div>
                </div>
                <div className="bg-[#E8F5E9] p-4 rounded-xl text-center border border-[#4CAF50]/15 w-full font-sans">
                  <p className="text-[11px] font-bold text-[#2E7D32] uppercase tracking-widest">Seasonal Vaman</p>
                  <p className="text-xs text-slate-600 font-semibold mt-0.5">🗓️ Best Period: Mid-February to March</p>
                </div>
              </div>

              {/* Right Column: Vaman details */}
              <div className="lg:col-span-8 space-y-4 text-left">
                <span className="text-[10px] uppercase font-bold text-[#4CAF50] tracking-widest bg-[#E8F5E9] px-3.5 py-1.5 rounded-full inline-block">
                  Featured Treatment
                </span>
                
                <h3 className="text-2xl font-bold text-[#111111] font-serif">“Vaman” Season is Back!</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-left font-sans">
                  <strong>Vaman</strong> means "emesis with the help of medications." It is an ancient Ayurvedic body cleansing therapy used to remove toxins accumulated in the body that lead to problems related to digestion, metabolism, and respiratory diseases.
                </p>

                {/* Sub tabs inside Vaman card */}
                <div className="flex border-b border-slate-100 text-xs font-bold gap-3 pt-2 overflow-x-auto scrollbar-none font-sans">
                  <button onClick={() => setVamanTab('about')} className={`pb-2 shrink-0 ${vamanTab === 'about' ? 'text-[#4CAF50] border-b-2 border-[#4CAF50]' : 'text-slate-400'}`}>Who is Vaman For?</button>
                  <button onClick={() => setVamanTab('procedure')} className={`pb-2 shrink-0 ${vamanTab === 'procedure' ? 'text-[#4CAF50] border-b-2 border-[#4CAF50]' : 'text-slate-400'}`}>The 7-Day Procedure</button>
                  <button onClick={() => setVamanTab('benefits')} className={`pb-2 shrink-0 ${vamanTab === 'benefits' ? 'text-[#4CAF50] border-b-2 border-[#4CAF50]' : 'text-slate-400'}`}>Expectant Benefits</button>
                </div>

                <div className="py-2.5 text-xs sm:text-sm text-slate-600 min-h-[140px] text-left">
                  {vamanTab === 'about' && (
                    <div className="space-y-3 animate-fadeIn font-sans">
                      <p className="text-xs font-bold text-neutral-900">Who should undergo Vaman?</p>
                      <div className="flex flex-wrap gap-2">
                        {["Asthmatics", "Sinusitis (Recurrent cold / Allergy)", "Skin Disorders", "Skin Allergies", "Chronic digestive problems (Gas, Acidity, Burning)", "Infertility", "Obese / High Cholesterol", "Diabetics", "Hypothyroid"].map((item, idx) => (
                          <span key={idx} className="bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1 rounded-lg text-xs font-semibold">{item}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {vamanTab === 'procedure' && (
                    <div className="space-y-2 animate-fadeIn text-slate-600 leading-relaxed text-xs sm:text-sm font-sans">
                      <p><strong>1. Medicated Ghee Prep (7 Days):</strong> Increasing quantities of medicated ghee are taken with milk in the morning. Simultaneously, full-body massages and steam are performed daily.</p>
                      <p><strong>2. The Last Day Emesis:</strong> The patient is given milk, warm water, and specific medications to safely induce vomiting, systematically throwing out accumulated toxins from the cell pathways.</p>
                      <p><strong>3. Recovery:</strong> Rest is mandatory for the full day. Diet must be resumed slowly over 7 days following strict instructions only.</p>
                    </div>
                  )}

                  {vamanTab === 'benefits' && (
                    <div className="space-y-2 animate-fadeIn text-slate-600 leading-relaxed text-xs sm:text-sm text-left font-sans">
                      <p>✨ <strong>Immunity Boost:</strong> Systematically purges metabolic blockages to elevate baseline immunity.</p>
                      <p>✨ <strong>Allergy Relief:</strong> Offers long-lasting therapeutic relief to chronic cold and skin issue profiles.</p>
                      <p>✨ <strong>Acidity Resolution:</strong> Corrects digestion fire to solve abdominal pain and gas triggers.</p>
                      <p>✨ <strong>Infertility Aid:</strong> Helps couples taking treatment for infertility conceive much faster.</p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>

          {/* PANCHAKARMA PRICING CARD INDEX */}
          <div className="space-y-6 sm:space-y-8 text-left">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 border-b border-slate-150 pb-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 font-serif">Panchakarma Procedure & Rates Index</h3>
                <p className="text-xs text-slate-500">Transparent Pricing Logs — No Unstated Fees</p>
              </div>

              {/* Filter tabs */}
              <div className="flex gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto w-full xl:w-auto scrollbar-none font-sans">
                <button onClick={() => setPanchakarmaFilter('all')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 ${panchakarmaFilter === 'all' ? 'bg-[#4CAF50] text-white shadow-sm' : 'text-slate-600'}`}>Show All</button>
                <button onClick={() => setPanchakarmaFilter('courses')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 ${panchakarmaFilter === 'courses' ? 'bg-[#4CAF50] text-white shadow-sm' : 'text-slate-600'}`}>Full Courses</button>
                <button onClick={() => setPanchakarmaFilter('gynaecology')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 ${panchakarmaFilter === 'gynaecology' ? 'bg-[#4CAF50] text-white shadow-sm' : 'text-slate-600'}`}>Gynaec Therapies</button>
                <button onClick={() => setPanchakarmaFilter('individual')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 ${panchakarmaFilter === 'individual' ? 'bg-[#4CAF50] text-white shadow-sm' : 'text-slate-600'}`}>Single Sessions</button>
              </div>
            </div>

            {/* Price list grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRates.map((item, idx) => (
                <div key={idx} className="bg-white border border-[#E8F5E9] rounded-2xl p-5 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="space-y-1 max-w-xs sm:max-w-md pr-3">
                    <h4 className="font-extrabold text-[#111111] text-xs sm:text-sm font-sans">{item.name}</h4>
                    <p className="text-[11px] text-slate-500 leading-normal font-sans">{item.details}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[#2E7D32] text-sm sm:text-base font-black font-sans">₹{item.rate.toLocaleString('en-IN')}</p>
                    <span className="text-[9px] uppercase font-bold text-slate-400 font-sans">Total Price</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panchbhautik Elements Tab widget */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-neutral-950 text-white rounded-3xl p-6 sm:p-12 shadow-2xl border border-neutral-800">
            
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#7ED957]">Composition Principle</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">The Five Great Pillars of Human Composition</h2>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Ayurveda asserts that the human body is comprised of five essential elements (Pancha Mahabhutas). Any metabolic sickness is simply a structural imbalance of these pillars. Click the elements below to see how Dr. Rachana maps these onto clinical treatments:
              </p>

              {/* Responsive Scrollable Elements Selector */}
              <div className="flex sm:grid sm:grid-cols-5 gap-2 overflow-x-auto pb-3 sm:pb-0 scrollbar-none snap-x font-sans">
                {['Jal', 'Agni', 'Vayu', 'Prithvi', 'Aakash'].map((element) => (
                  <button
                    key={element}
                    onClick={() => setActiveElement(element)}
                    className={`py-3 px-4 sm:px-1 text-center font-bold text-xs rounded-xl border transition-all shrink-0 snap-center min-w-[90px] sm:min-w-0 ${activeElement === element ? 'bg-[#4CAF50] text-[#111111] border-[#7ED957] shadow-lg' : 'bg-neutral-900 border-neutral-800 text-slate-300 hover:bg-neutral-850'}`}
                  >
                    {element === 'Jal' && '💧 Jal'}
                    {element === 'Agni' && '🔥 Agni'}
                    {element === 'Vayu' && '💨 Vayu'}
                    {element === 'Prithvi' && '🌱 Prithvi'}
                    {element === 'Aakash' && '🌌 Aakash'}
                  </button>
                ))}
              </div>
            </div>

            {/* Display element profile */}
            <div className="lg:col-span-6 bg-neutral-900 border border-neutral-800 p-5 sm:p-8 rounded-2xl relative min-h-[180px] flex flex-col justify-between text-left font-sans">
              
              {activeElement === 'Jal' && (
                <div className="space-y-2.5 animate-fadeIn">
                  <h4 className="text-lg font-bold text-[#7ED957] font-serif">Water Element (Jal Mahabhuta)</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Governs overall body lubrication, plasma hydration, blood serum fluids, and cellular transport. Imbalances cause dry skin, kidney processing delays, or extreme heat. Regulated with customized Ayurvedic coolants.
                  </p>
                </div>
              )}

              {activeElement === 'Agni' && (
                <div className="space-y-2.5 animate-fadeIn">
                  <h4 className="text-lg font-bold text-[#7ED957] font-serif">Fire Element (Agni Mahabhuta)</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Represents enzymes, digestive stomach acid, and core metabolic transformation. If weak, toxic wastes (Ama) accumulate, blocking cells and causing obesity or diabetes. Stimulated using herbal spices and Virechan purging.
                  </p>
                </div>
              )}

              {activeElement === 'Vayu' && (
                <div className="space-y-2.5 animate-fadeIn">
                  <h4 className="text-lg font-bold text-[#7ED957] font-serif">Air Element (Vayu Mahabhuta)</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Controls overall physical movement, nervous impulses, heartbeats, and lung breathing cycles. Imbalances lead to arthritic joint pain, extreme gas, and nerve blockages. Treated with warm medicated Basti enemas.
                  </p>
                </div>
              )}

              {activeElement === 'Prithvi' && (
                <div className="space-y-2.5 animate-fadeIn">
                  <h4 className="text-lg font-bold text-[#7ED957] font-serif">Earth Element (Prithvi Mahabhuta)</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Forms muscle fiber tissues, bones, cell boundaries, and overall structural body weight. Imbalanced earth elements lead to sluggishness and obesity. Addressed using specialized dry herbal rubs and precise nutrition.
                  </p>
                </div>
              )}

              {activeElement === 'Aakash' && (
                <div className="space-y-2.5 animate-fadeIn">
                  <h4 className="text-lg font-bold text-[#7ED957] font-serif">Space Element (Aakash Mahabhuta)</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Represents physical voids, cellular empty pockets, digestive paths, and overall mental clarity. Essential for normal hormone distribution and psychological balance. Restored using yoga and calming breath practices.
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-neutral-800 text-[9px] uppercase font-bold text-slate-500 flex justify-between mt-4">
                <span>Panchbhautik Wellness Section</span>
                <span>Dr. Rachana Baldota</span>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ==================== DOCTORS TAB ==================== */}
      {activeTab === 'doctors' && (
        <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 animate-fadeIn max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#4CAF50] bg-[#E8F5E9] px-4 py-1.5 rounded-full uppercase tracking-wider">
              Our Clinical Team
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-neutral-950 font-serif leading-tight">
              Our Professional Clinicians
            </h1>
            <p className="text-slate-600 text-sm">
              Highly credentialed medical practitioners collaborating together to safeguard your long term vital organ parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Dr. Abhijeet Profile Card with real photo */}
            <div className="bg-white border border-[#E8F5E9] rounded-3xl p-5 sm:p-8 shadow-md hover:shadow-xl transition-all space-y-6 flex flex-col justify-between text-left">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start sm:items-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md shrink-0 mx-auto sm:mx-0">
                    <img 
                      src="ABHIJEET BALDOTA PHOTO.png" 
                      alt="Dr. Abhijeet Baldota Profile photo"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop";
                      }}
                    />
                  </div>
                  <div className="space-y-1.5 text-center sm:text-left w-full font-sans">
                    <span className="text-[9px] sm:text-[10px] uppercase font-extrabold text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded-full tracking-wider inline-block">
                      Allopathic Medicine Lead
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#111111] font-serif pt-1">Dr. Abhijeet Baldota</h3>
                    <p className="text-xs sm:text-sm text-slate-700 font-bold">M.B.B.S.; MD MEDICINE, CCID</p>
                    <p className="text-[11px] text-slate-500 leading-tight">Diabetologist and Family Physician</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-5 text-left font-sans">
                  <p className="leading-relaxed text-slate-600">
                    Dr. Abhijeet completed his MBBS from the prestigious B.J. Medical College of Pune, and his post-graduation in Internal Medicine from Government Medical College, Aurangabad. He got vast exposure to the field during his training days, completing certificate courses in Diabetes, Thyroid disorders, and Cardiac emergencies.
                  </p>
                  <p className="leading-relaxed text-slate-600">
                    He has special interest in heart disorders, thyroid problems, obesity, and allergy issues. However, Diabetes management has become his core forte. Diabetics from all regions seek his advice regularly to keep blood sugar under control with optimum medications and minimal side effects, helping them regain health and confidence.
                  </p>

                  <div className="space-y-2">
                    <h5 className="font-extrabold text-neutral-950 uppercase tracking-widest text-[9px]">Professional Core Specializations:</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {["Type 2 Diabetes", "HbA1c Reduction", "Thyroid Disorders", "Cardiology Prep", "Obesity Management", "Allergies"].map((tag, idx) => (
                        <span key={idx} className="bg-slate-50 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-bold">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setBookingForm({...bookingForm, doctor: 'Dr. Abhijeet Baldota (Allopathy & Diabetology)'});
                  navigateTo('booking');
                }} 
                className="w-full bg-[#111111] hover:bg-neutral-850 text-white font-extrabold py-4 rounded-xl text-xs uppercase tracking-wider transition-all mt-6 h-12 font-sans"
              >
                Schedule Diabetologist Consultation
              </button>
            </div>

            {/* Dr. Rachana Profile Card */}
            <div className="bg-white border border-[#E8F5E9] rounded-3xl p-5 sm:p-8 shadow-md hover:shadow-xl transition-all space-y-6 flex flex-col justify-between text-left">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start sm:items-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#E8F5E9] text-white flex items-center justify-center font-mono font-black text-3xl shadow-lg shrink-0 border-2 border-[#4CAF50] mx-auto sm:mx-0">
                    <Leaf className="w-10 h-10 sm:w-12 sm:h-12 text-[#4CAF50]" />
                  </div>
                  <div className="space-y-1.5 text-center sm:text-left w-full font-sans">
                    <span className="text-[9px] sm:text-[10px] uppercase font-extrabold text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded-full tracking-wider inline-block">
                      Ayurvedic section Lead
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 font-serif pt-1">Dr. Rachana Baldota</h3>
                    <p className="text-xs sm:text-sm text-slate-700 font-bold">B.A.M.S.</p>
                    <p className="text-[11px] text-slate-500 leading-tight">Ayurveda & Panchakarma Specialist</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-5 text-left font-sans">
                  <p className="leading-relaxed text-slate-600">
                    Dr. Rachana completed her Ayurvedic graduation from the highly reputed Seth Govindji Raoji College in Solapur. Additionally, she holds post-graduate diplomas in Panchakarma detoxification and Panchbhautik Chikitsa.
                  </p>
                  <p className="leading-relaxed text-slate-600">
                    Panchbhautik Chikitsa is based on the core principle of cellular composition of the Human Body by the 5 basic elements of nature (Jal, Agni, Vayu, Prithvi, and Aakash). Dr. Rachana has specialized training under national stalwarts of the field, targeting persistent chronic ailments like diabetes, obesity, arthritis, allergy problems, and digestive disorders.
                  </p>

                  <div className="space-y-2">
                    <h5 className="font-extrabold text-neutral-950 uppercase tracking-widest text-[9px]">Professional Core Specializations:</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {["Panchakarma", "Panchbhautik Chikitsa", "Arthritis Care", "Chronic Gastric Issues", "Skin Allergies", "Digestive Diseases"].map((tag, idx) => (
                        <span key={idx} className="bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1 rounded-lg text-[10px] font-bold">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setBookingForm({...bookingForm, doctor: 'Dr. Rachana Baldota (Ayurveda & Panchakarma)'});
                  navigateTo('booking');
                }} 
                className="w-full bg-[#4CAF50] hover:bg-[#3d8c40] text-white font-extrabold py-4 rounded-xl text-xs uppercase tracking-wider transition-all mt-6 shadow-md h-12 font-sans"
              >
                Schedule Ayurvedic Consultation
              </button>
            </div>

          </div>

          {/* Super-specialist Panel */}
          <div className="bg-slate-100 border border-slate-200/60 rounded-3xl p-5 sm:p-10 space-y-6">
            <h3 className="text-xl font-bold text-[#111111] font-serif text-center font-sans">In-House Specialists & Consultants</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start gap-4 shadow-sm text-left font-sans">
                <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] text-[#4CAF50] flex items-center justify-center font-bold text-sm shrink-0">MT</div>
                <div>
                  <h4 className="font-bold text-neutral-950 text-sm font-sans">Dr. Mahesh Thombre</h4>
                  <p className="text-[10px] uppercase font-bold text-slate-400">MBBS, MS, MCh</p>
                  <p className="text-xs text-slate-500 font-semibold">Gastro-surgeon & Abdominal Consultant</p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">Specialist consultation for advanced gastrointestinal, liver, and abdominal laparoscopic assessments.</p>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start gap-4 shadow-sm text-left font-sans">
                <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] text-[#4CAF50] flex items-center justify-center font-bold text-sm shrink-0">SW</div>
                <div>
                  <h4 className="font-bold text-neutral-950 text-sm font-sans">Dr. Snehal Walunj</h4>
                  <p className="text-[10px] uppercase font-bold text-slate-400">B.H.M.S.</p>
                  <p className="text-xs text-slate-500 font-semibold">Consultant Homeopathic Physician</p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">Providing gentle and highly personalized homeopathic formulations for pediatrics, skin allergies, and wellness.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ==================== APPOINTMENT BOOKING ENGINE ==================== */}
      {activeTab === 'booking' && (
        <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 animate-fadeIn max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#4CAF50] bg-[#E8F5E9] px-4 py-1.5 rounded-full uppercase tracking-wider">
              Real-time Scheduler
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-neutral-950 font-serif">
              Schedule Your Session
            </h1>
            <p className="text-slate-600 text-sm font-sans">
              Please choose either an in-person clinic visit in Aundh or our custom WhatsApp video consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start font-sans">
            
            {/* Form Column */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-5 sm:p-10 shadow-xl">
              {!isBooked ? (
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-widest">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                        <input 
                          type="text" 
                          required
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                          placeholder="e.g. Anand Kulkarni" 
                          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] text-sm h-11"
                        />
                      </div>
                    </div>

                    {/* Contact Mobile */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-widest">Mobile Phone *</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                        <input 
                          type="tel" 
                          required
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                          placeholder="e.g. +91 99226 68668" 
                          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] text-sm h-11"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email ID */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-widest">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                        <input 
                          type="email" 
                          value={bookingForm.email}
                          onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                          placeholder="yourname@domain.com" 
                          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] text-sm h-11"
                        />
                      </div>
                    </div>

                    {/* Doctor selection */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-widest">Select Doctor *</label>
                      <select 
                        value={bookingForm.doctor}
                        onChange={(e) => setBookingForm({...bookingForm, doctor: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] text-sm bg-white h-11"
                      >
                        <option>Dr. Abhijeet Baldota (Allopathy & Diabetology)</option>
                        <option>Dr. Rachana Baldota (Ayurveda & Panchakarma)</option>
                        <option>Visiting Gastro Surgeon (Dr. Mahesh Thombre)</option>
                        <option>Visiting Homeopath (Dr. Snehal Walunj)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Preferred Date */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-widest">Preferred Date *</label>
                      <input 
                        type="date" 
                        required
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] text-sm h-11"
                      />
                    </div>

                    {/* Preferred Time (NEW TIMINGS APPLIED) */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-widest">Preferred Time Slot *</label>
                      <select 
                        required
                        value={bookingForm.time}
                        onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] text-sm bg-white h-11"
                      >
                        <option value="">-- Choose Slot --</option>
                        <optgroup label="Morning Shift (11:30 AM – 2:30 PM)">
                          <option>11:30 AM</option>
                          <option>12:00 PM</option>
                          <option>12:30 PM</option>
                          <option>1:00 PM</option>
                          <option>1:30 PM</option>
                          <option>2:00 PM</option>
                        </optgroup>
                        <optgroup label="Evening Shift (6:30 PM – 9:00 PM)">
                          <option>6:30 PM</option>
                          <option>7:00 PM</option>
                          <option>7:30 PM</option>
                          <option>8:00 PM</option>
                          <option>8:30 PM</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  {/* Consultation Type (WhatsApp System Added) */}
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-widest block">Consultation Type</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button 
                        type="button" 
                        onClick={() => setBookingForm({...bookingForm, type: 'Clinic Visit'})}
                        className={`p-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all min-h-[44px] ${bookingForm.type === 'Clinic Visit' ? 'bg-[#E8F5E9] border-[#4CAF50] text-[#2E7D32] ring-2 ring-[#4CAF50]/20' : 'bg-white border-slate-200 text-slate-600'}`}
                      >
                        <MapPin className="w-4 h-4 text-[#4CAF50] shrink-0" />
                        Clinic Visit (Pune)
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setBookingForm({...bookingForm, type: 'WhatsApp Video Consultation'})}
                        className={`p-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all min-h-[44px] ${bookingForm.type === 'WhatsApp Video Consultation' ? 'bg-[#E8F5E9] border-[#4CAF50] text-[#2E7D32] ring-2 ring-[#4CAF50]/20' : 'bg-white border-slate-200 text-slate-600'}`}
                      >
                        <Video className="w-4 h-4 text-[#4CAF50] shrink-0" />
                        WhatsApp Video (₹600)
                      </button>
                    </div>
                  </div>

                  {/* Patient Symptoms */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-widest">Medical Notes / Symptoms</label>
                    <textarea 
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                      rows={3}
                      placeholder="Describe blood sugar levels, thyroid history, joint pain, or prior prescriptions..." 
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] text-sm font-sans"
                    ></textarea>
                  </div>

                  {/* Consent statement */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] text-slate-500 leading-relaxed text-left font-sans">
                    By confirming this clinical appointment query, your parameters will be registered, a notification will be forwarded to <strong>abhijeet.baldota@gmail.com</strong>, and our desk team will coordinate your WhatsApp video slot.
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#111111] hover:bg-neutral-850 text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition-all h-12 font-sans"
                  >
                    Confirm Appointment Request
                  </button>

                </form>
              ) : (
                /* Success Receipt (Includes video call charges & direct next steps) */
                <div className="text-center py-8 space-y-6 animate-fadeIn font-sans">
                  <div className="w-16 h-16 bg-[#E8F5E9] text-[#4CAF50] rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
                    ✓
                  </div>
                  
                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#111111] font-serif">Appointment Request Logged</h2>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Your query has been forwarded to Dr. Baldota's clinic desk (abhijeet.baldota@gmail.com).
                    </p>
                  </div>

                  {/* Digital Invoice Receipt */}
                  <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 text-left space-y-4 shadow-sm">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Booking ID</span>
                      <span className="text-xs font-black text-[#2E7D32] bg-[#E8F5E9] px-3 py-1 rounded-full">{bookedDetails?.id}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-4 text-xs">
                      <div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Patient Name</p>
                        <p className="font-bold text-neutral-950 mt-0.5">{bookedDetails?.name}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Contact Mobile</p>
                        <p className="font-bold text-neutral-950 mt-0.5">{bookedDetails?.phone}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Consultant Physician</p>
                        <p className="font-bold text-[#2E7D32] mt-0.5">{bookedDetails?.doctor}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Consultation Type</p>
                        <p className="font-bold text-neutral-950 mt-0.5">{bookedDetails?.type}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Scheduled Date</p>
                        <p className="font-bold text-neutral-950 mt-0.5">{bookedDetails?.date}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Preferred Time</p>
                        <p className="font-bold text-neutral-950 mt-0.5">{bookedDetails?.time}</p>
                      </div>
                    </div>

                    {bookedDetails?.type === 'WhatsApp Video Consultation' && (
                      <div className="p-3 bg-[#E8F5E9] border border-[#4CAF50]/30 rounded-xl space-y-1">
                        <p className="text-[10px] font-black uppercase text-[#2E7D32] tracking-wider">WhatsApp Consultation Charge</p>
                        <p className="text-sm font-extrabold text-neutral-950">₹600 INR</p>
                        <p className="text-[11px] text-slate-600 leading-tight">Staff will contact you directly on WhatsApp to coordinate UPI/GPay payment and confirm your video slot.</p>
                      </div>
                    )}

                    {bookedDetails?.notes && (
                      <div className="pt-3 border-t border-slate-200">
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Patient Symptoms Logged</p>
                        <p className="text-xs text-slate-600 mt-1 italic">"{bookedDetails?.notes}"</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
                    <button 
                      onClick={() => window.print()}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-colors h-11"
                    >
                      Print Receipt
                    </button>
                    <button 
                      onClick={resetBooking}
                      className="bg-neutral-950 hover:bg-neutral-850 text-white font-extrabold text-xs uppercase tracking-widest py-3 px-6 rounded-xl transition-all h-11"
                    >
                      Book New Session
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Guide */}
            <div className="lg:col-span-4 space-y-6 w-full max-w-md mx-auto">
              <div className="bg-[#111111] text-white p-6 sm:p-8 rounded-3xl space-y-6 border border-neutral-800 shadow-xl text-left animate-slideDown">
                <h3 className="text-lg font-bold font-serif text-[#7ED957] border-b border-neutral-800 pb-2 flex items-center gap-2">
                  <Video className="w-5 h-5 text-[#4CAF50]" /> WhatsApp Video call
                </h3>
                
                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#4CAF50]/20 text-[#7ED957] flex items-center justify-center font-bold text-xs mt-0.5 shrink-0">1</div>
                    <p className="text-slate-300">Choose <strong>"WhatsApp Video Consultation"</strong> on the scheduler and submit details.</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#4CAF50]/20 text-[#7ED957] flex items-center justify-center font-bold text-xs mt-0.5 shrink-0">2</div>
                    <p className="text-slate-300">Clinic staff contacts you manually on WhatsApp to confirm availability and handle UPI payment (<strong>₹600</strong>).</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#4CAF50]/20 text-[#7ED957] flex items-center justify-center font-bold text-xs mt-0.5 shrink-0">3</div>
                    <p className="text-slate-300">No custom apps or logins are needed. Our doctor will dial your WhatsApp number directly for a private video session.</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-800">
                  <a 
                    href="tel:+919922668668" 
                    className="w-full bg-[#4CAF50] hover:bg-[#7ED957] text-neutral-950 font-black py-3.5 rounded-xl text-xs uppercase tracking-wider text-center block transition-all"
                  >
                    Quick Call Desk
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* FAQs COMPONENT */}
      <section className="py-20 sm:py-24 bg-white border-t border-slate-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-[#4CAF50] bg-[#E8F5E9] px-4 py-1.5 rounded-full uppercase tracking-wider">
              Patient Center
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-serif">Frequently Asked Questions</h2>
            <p className="text-slate-600 text-sm">
              Explore key details regarding our clinical paths, safety standards, and treatments.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#F8FAF8] rounded-2xl border border-slate-200/50 overflow-hidden shadow-sm">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex justify-between items-center focus:outline-none min-h-[44px]"
                >
                  <span className="font-extrabold text-xs sm:text-sm lg:text-base text-[#111111] flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[#4CAF50] shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 shrink-0 ml-4 ${expandedFaq === idx ? 'transform rotate-180' : ''}`} />
                </button>
                {expandedFaq === idx && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/30 text-left">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================== CONTACT AND MAP Landmark ==================== */}
      <section className="bg-neutral-950 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-900 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Details */}
          <div className="lg:col-span-5 space-y-8 text-center sm:text-left">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#7ED957]">Pune Head Office</span>
              <h2 className="text-3xl font-extrabold font-serif">Reach Alloveda Clinic</h2>
              <p className="text-slate-400 text-xs text-left">
                We are situated at a premium accessible location in Aundh with direct elevator access and ample parking.
              </p>
            </div>

            <div className="space-y-5 text-xs text-left max-w-md mx-auto sm:max-w-none">
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#7ED957] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Alloveda Clinic Address</p>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    First Floor, Lav Kush Apartment, Next to Seasons Hotel,<br />
                    Near Gaikwad Petrol Pump, Aundh, Pune, MH, India - 411007
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#7ED957] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Clinical Desk Contacts</p>
                  <p className="text-slate-300 mt-1">9922668668 &nbsp;|&nbsp; 9823060116</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#7ED957] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Direct Medical Email</p>
                  <p className="text-slate-300 mt-1">abhijeet.baldota@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#7ED957] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Operating Shifts (New Timings)</p>
                  <p className="text-slate-300 mt-1">Morning: 11:30 AM – 2:30 PM</p>
                  <p className="text-slate-300 mt-1">Evening: 6:30 PM – 9:00 PM</p>
                </div>
              </div>

            </div>

            {/* Quick action buttons */}
            <div className="pt-4 flex flex-wrap gap-3 justify-center sm:justify-start">
              <a 
                href="https://wa.me/919922668668?text=Hi%20Alloveda%20Clinic,%20I'd%20like%20to%20book%20an%20appointment."
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#4CAF50] hover:bg-[#7ED957] text-neutral-950 font-extrabold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4 shrink-0" /> Message WhatsApp
              </a>
              <a 
                href="tel:+919922668668"
                className="bg-neutral-800 hover:bg-neutral-700 text-slate-200 font-extrabold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 min-h-[44px]"
              >
                <Phone className="w-4 h-4 shrink-0" /> Call Desk
              </a>
            </div>
          </div>

          {/* Location Landmark Guide */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-sm font-bold text-[#7ED957] text-center sm:text-left">Clinic Location Landmark Map (Aundh, Pune)</h4>
            
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl h-[340px] relative flex flex-col justify-between p-6">
              
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>

              <div className="relative z-10 space-y-4 text-left">
                <div className="inline-flex items-center gap-1.5 bg-[#E8F5E9]/10 border border-[#4CAF50]/30 text-[#7ED957] text-xs px-3 py-1 rounded-full font-bold">
                  📍 Opp Seasons Hotel
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-serif leading-tight">Alloveda Clinic Landmark Guide</h3>
                <p className="text-slate-400 text-xs leading-relaxed max-w-md">
                  We are conveniently situated next to the famous <strong>Seasons Hotel</strong> and just a stone's throw away from the landmark <strong>Gaikwad Petrol Pump</strong> in Aundh, Pune. Easy approach road for all private and public transport.
                </p>
              </div>

              <div className="relative z-10 bg-neutral-950/90 border border-neutral-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h4 className="text-xs font-bold text-white">Alloveda Clinic (Pune, MH)</h4>
                  <p className="text-[10px] text-slate-500">First Floor, Lav Kush Apartment</p>
                </div>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#4CAF50] text-neutral-950 font-black text-[10px] px-3.5 py-2.5 rounded-xl uppercase tracking-wider hover:bg-[#7ED957] transition-colors w-full sm:w-auto text-center"
                >
                  Open Directions Map
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-neutral-950 text-slate-400 py-12 px-4 border-t border-neutral-900 text-xs text-center font-sans">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex justify-center items-center pb-4 border-b border-neutral-900">
            {!footerLogoError ? (
              <img 
                src="Capture.JPG" 
                alt="Alloveda Clinic Official Brand Logo Footer" 
                className="h-12 sm:h-14 w-auto rounded-lg object-contain bg-neutral-950 p-1"
                onError={() => setFooterLogoError(true)}
              />
            ) : (
              <div className="flex justify-center items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#4CAF50] text-neutral-950 flex items-center justify-center font-bold text-sm font-mono">
                  av
                </div>
                <span className="font-extrabold text-white text-base tracking-tight font-serif">alloveda clinic</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-slate-500 font-bold">
            <button onClick={() => navigateTo('home')} className="hover:text-[#4CAF50] transition-colors">Home</button>
            <button onClick={() => navigateTo('about')} className="hover:text-[#4CAF50] transition-colors">Philosophy</button>
            <button onClick={() => navigateTo('services')} className="hover:text-[#4CAF50] transition-colors">Departments</button>
            <button onClick={() => navigateTo('diabetes')} className="hover:text-[#4CAF50] transition-colors">Diabetes Intensive</button>
            <button onClick={() => navigateTo('ayurveda')} className="hover:text-[#4CAF50] transition-colors">Panchakarma Detox</button>
            <button onClick={() => navigateTo('doctors')} className="hover:text-[#4CAF50] transition-colors">Our Doctors</button>
          </div>

          <p className="text-[11px] text-slate-600 max-w-xl mx-auto leading-relaxed">
            Disclaimer: The information provided on this platform is for educational guidance only. Medical decisions and prescription modifications should only be carried out under the active diagnostic supervision of certified clinics.
          </p>

          <div className="border-t border-neutral-900 pt-6 text-slate-500 text-[10px] flex flex-col sm:flex-row justify-between gap-4">
            <span>© {new Date().getFullYear()} Alloveda Clinic Pune. All Rights Reserved.</span>
            <span>Where Modern Allopathy Meets Divine Ayurveda</span>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION UTILITIES */}
      <div className="fixed bottom-6 right-6 z-45 flex flex-col gap-3">
        <a 
          href="https://wa.me/919922668668?text=Hello%20Alloveda%20Clinic!%20I'd%2520like%2520to%2520request%2520an%2520integrated%2520consultation."
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#4CAF50] text-white flex items-center justify-center shadow-2xl hover:bg-[#7ED957] hover:scale-105 transition-all"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="w-6 h-6" />
        </a>
        <a 
          href="tel:+919922668668"
          className="w-12 h-12 rounded-full bg-neutral-950 text-white flex items-center justify-center shadow-2xl hover:bg-neutral-850 hover:scale-105 transition-all"
          title="Call Clinic Desk"
        >
          <Phone className="w-5 h-5 text-[#7ED957]" />
        </a>
      </div>

    </div>
  );
}