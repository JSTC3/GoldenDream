const pageMap = {
  'home':'p-home','bakery':'p-bakery','bakery-hours':'p-bakery-hours',
  'bakery-reservations':'p-bakery-reservations','bakery-menu':'p-bakery-menu',
  'bakery-signature':'p-bakery-signature','bakery-fine-dining':'p-bakery-fine-dining',
  'bakery-artisan':'p-bakery-artisan','events':'p-events',
  'events-weddings':'p-events-weddings','events-parties':'p-events-parties',
  'events-conferences':'p-events-conferences','offices':'p-offices',
  'offices-coworking':'p-offices-coworking','offices-coworking-spaces':'p-offices-coworking-spaces',
  'offices-private':'p-offices-private','offices-private-suite':'p-offices-private-suite',
  'offices-meeting':'p-offices-meeting','offices-meeting-room':'p-offices-meeting-room',
  'rooftop':'p-rooftop','contact':'p-contact','404':'p-404','cookies':'p-cookies'
};

function go(key){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const target = document.getElementById(pageMap[key]||'p-404');
  target.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

// Translation functionality
const translations = {
  'en': {
    'nav_home': 'Home',
    'nav_bakery': 'Bakery & Restaurant',
    'nav_events': 'Event Hall',
    'nav_offices': 'Offices',
    'nav_rooftop': 'Rooftop',
    'nav_contact': 'Contact',
    'nav_reserve': 'Reserve',
    'lang_btn': 'FR',
    'home_tagline': 'Est. 2023 · A world apart',
    'home_title': 'Where every<br>moment turns golden',
    'home_desc': 'Fine dining, artisan bakery, rooftop terrace, premium offices & unforgettable events — all under one gilded roof.',
    'home_reserve': 'Make a reservation',
    'home_event': 'Plan an event',
    'our_world': 'Our world',
    'five_destinations': 'Five exceptional<br><em>destinations</em>',
    'five_desc': 'Every corner of Golden Dream is designed to transport you — whether you\'re here to eat, work, celebrate, or simply breathe.',
    'bakery_title': 'Bakery & Restaurant',
    'bakery_desc': 'From dawn pastries to candlelit fine dining, our kitchen crafts each plate with obsessive care and seasonal precision.',
    'explore': 'Explore',
    'events_title': 'Events',
    'events_desc': 'Weddings, conferences, private parties — our spaces and team turn every occasion into a chapter worth remembering.',
    'offices_title': 'Offices',
    'offices_desc': 'Coworking spaces, private offices and meeting rooms where ambition meets luxury. Work elevated.',
    'rooftop_title': 'Rooftop',
    'rooftop_desc': 'The city\'s most coveted open-air terrace. Sunset cocktails, private dinners, and skyline views that take your breath away.',
    'contact_title': 'Contact Us',
    'contact_desc': 'Our concierge team is ready to help you plan the extraordinary. Reach out and let\'s begin.',
    'get_in_touch': 'Get in touch',
    'golden_standard': 'The golden<br><em>standard</em>',
    'philosophy': 'Philosophy',
    'intention': 'Crafted with<br><em>intention</em>',
    'philosophy_desc': 'Golden Dream was born from a belief that hospitality is an art form. Every detail — from the crumb of our sourdough to the angle of a rooftop lamp — is deliberate. We don\'t just serve spaces. We curate experiences.'
  },
  'fr': {
    'nav_home': 'Accueil',
    'nav_bakery': 'Boulangerie & Restaurant',
    'nav_events': 'Salle d\'Événements',
    'nav_offices': 'Bureaux',
    'nav_rooftop': 'Terrasse',
    'nav_contact': 'Contact',
    'nav_reserve': 'Réserver',
    'lang_btn': 'EN',
    'home_tagline': 'Fond. 2023 · Un monde à part',
    'home_title': 'Où chaque<br>moment devient doré',
    'home_desc': 'Restaurant gastronomique, boulangerie artisanale, terrasse sur le toit, bureaux premium et événements inoubliables — le tout sous un même toit doré.',
    'home_reserve': 'Faire une réservation',
    'home_event': 'Planifier un événement',
    'our_world': 'Notre monde',
    'five_destinations': 'Cinq destinations<br><em>exceptionnelles</em>',
    'five_desc': 'Chaque coin de Golden Dream est conçu pour vous transporter — que vous soyez ici pour manger, travailler, célébrer, ou simplement respirer.',
    'bakery_title': 'Boulangerie & Restaurant',
    'bakery_desc': 'Des viennoiseries de l\'aube au dîner aux chandelles gastronomiques, notre cuisine prépare chaque assiette avec un soin obsessionnel et une précision saisonnière.',
    'explore': 'Explorer',
    'events_title': 'Événements',
    'events_desc': 'Mariages, conférences, fêtes privées — nos espaces et notre équipe transforment chaque occasion en un chapitre mémorable.',
    'offices_title': 'Bureaux',
    'offices_desc': 'Espaces de coworking, bureaux privés et salles de réunion où l\'ambition rencontre le luxe. Travaillez élevé.',
    'rooftop_title': 'Terrasse',
    'rooftop_desc': 'La terrasse extérieure la plus convoitée de la ville. Cocktails au coucher du soleil, dîners privés et vues imprenables qui vous couperont le souffle.',
    'contact_title': 'Contactez-nous',
    'contact_desc': 'Notre équipe de conciergerie est prête à vous aider à planifier l\'extraordinaire. Contactez-nous et commençons.',
    'get_in_touch': 'Contactez-nous',
    'golden_standard': 'L\'étalon<br><em>doré</em>',
    'philosophy': 'Philosophie',
    'intention': 'Conçu avec<br><em>intention</em>',
    'philosophy_desc': 'Golden Dream est né de la conviction que l\'hospitalité est une forme d\'art. Chaque détail — de la miette de notre pain au levain à l\'angle d\'une lampe de terrasse — est délibéré. Nous ne servons pas seulement des espaces. Nous curons des expériences.'
  }
};

let currentLang = 'en';

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'fr' : 'en';
  const langBtn = document.getElementById('langBtn');
  const langText = document.getElementById('langText');
  
  // Update button state
  langText.textContent = translations[currentLang]['lang_btn'];
  if (currentLang === 'fr') {
    langBtn.classList.add('active');
  } else {
    langBtn.classList.remove('active');
  }
  
  // Update navigation
  updateNavigation();
  
  // Update home page content
  updateHomePage();
  
  // Update other elements as needed
  updateCommonElements();
}

function updateNavigation() {
  const navElements = {
    'nav_home': document.querySelector('button[onclick="go(\'home\')"]'),
    'nav_bakery': document.querySelector('.nav-item:nth-child(2) .nav-link'),
    'nav_events': document.querySelector('.nav-item:nth-child(3) .nav-link'),
    'nav_offices': document.querySelector('.nav-item:nth-child(4) .nav-link'),
    'nav_rooftop': document.querySelector('button[onclick="go(\'rooftop\')"]'),
    'nav_contact': document.querySelector('button[onclick="go(\'contact\')"]'),
    'nav_reserve': document.querySelector('.nav-reserve')
  };
  
  Object.keys(navElements).forEach(key => {
    if (navElements[key] && translations[currentLang][key]) {
      navElements[key].textContent = translations[currentLang][key];
    }
  });
}

function updateHomePage() {
  const homeElements = {
    'home_tagline': document.querySelector('.home-tagline'),
    'home_title': document.querySelector('.home-hero h1'),
    'home_desc': document.querySelector('.home-hero p'),
    'our_world': document.querySelector('.section-label'),
    'five_destinations': document.querySelector('.section-title'),
    'five_desc': document.querySelector('.section-sub'),
    'philosophy': document.querySelectorAll('.section-label')[1],
    'intention': document.querySelectorAll('.section-title')[1],
    'philosophy_desc': document.querySelectorAll('.section-sub')[1]
  };
  
  Object.keys(homeElements).forEach(key => {
    if (homeElements[key] && translations[currentLang][key]) {
      homeElements[key].innerHTML = translations[currentLang][key];
    }
  });
  
  // Update card titles and descriptions
  updateCards();
  
  // Update buttons
  updateButtons();
}

function updateCards() {
  const cardData = [
    { title: 'bakery_title', desc: 'bakery_desc', index: 0 },
    { title: 'events_title', desc: 'events_desc', index: 1 },
    { title: 'offices_title', desc: 'offices_desc', index: 2 },
    { title: 'rooftop_title', desc: 'rooftop_desc', index: 3 },
    { title: 'contact_title', desc: 'contact_desc', index: 4 }
  ];
  
  cardData.forEach(card => {
    const cardElement = document.querySelectorAll('.card')[card.index];
    if (cardElement) {
      const titleElement = cardElement.querySelector('.card-title');
      const textElement = cardElement.querySelector('.card-text');
      const linkElement = cardElement.querySelector('.card-link');
      
      if (titleElement && translations[currentLang][card.title]) {
        titleElement.textContent = translations[currentLang][card.title];
      }
      if (textElement && translations[currentLang][card.desc]) {
        textElement.textContent = translations[currentLang][card.desc];
      }
      if (linkElement && translations[currentLang]['explore']) {
        linkElement.textContent = translations[currentLang]['explore'];
      }
    }
  });
  
  // Update golden standard card
  const goldenCard = document.querySelectorAll('.card')[5];
  if (goldenCard) {
    const goldenTitle = goldenCard.querySelector('div[style*="font-family"]');
    if (goldenTitle && translations[currentLang]['golden_standard']) {
      goldenTitle.innerHTML = translations[currentLang]['golden_standard'];
    }
  }
}

function updateButtons() {
  const buttonData = [
    { selector: '.home-btn.primary', text: 'home_reserve' },
    { selector: '.home-btn:not(.primary)', text: 'home_event' },
    { selector: '.btn-gold', text: 'get_in_touch' }
  ];
  
  buttonData.forEach(btn => {
    const element = document.querySelector(btn.selector);
    if (element && translations[currentLang][btn.text]) {
      element.textContent = translations[currentLang][btn.text];
    }
  });
}

function updateCommonElements() {
  // This can be expanded to handle other pages and elements
  // For now, it handles the main home page elements
}
