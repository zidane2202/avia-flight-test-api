const FLIGHT_CATALOG = {
  "DLA-AIRPORT|CDG-AIRPORT": [
    { airline: "Air France", direct: true, durationMinutes: 435, basePrice: 285000, title: "Air France AF900", departureTime: "08:30", arrivalTime: "16:45" },
    { airline: "Ethiopian Airlines", direct: false, durationMinutes: 520, basePrice: 245000, title: "Ethiopian Airlines ET571", departureTime: "10:15", arrivalTime: "19:55" },
    { airline: "Turkish Airlines", direct: false, durationMinutes: 610, basePrice: 220000, title: "Turkish Airlines TK543", departureTime: "14:00", arrivalTime: "01:10+1" },
    { airline: "Brussels Airlines", direct: false, durationMinutes: 580, basePrice: 235000, title: "Brussels Airlines SN271", departureTime: "11:45", arrivalTime: "22:25" },
    { airline: "Royal Air Maroc", direct: false, durationMinutes: 545, basePrice: 210000, title: "Royal Air Maroc AT556", departureTime: "09:20", arrivalTime: "18:45" },
    { airline: "Air France", direct: true, durationMinutes: 440, basePrice: 310000, title: "Air France AF902", departureTime: "22:10", arrivalTime: "06:30+1" },
  ],
  "DLA-AIRPORT|ORY-AIRPORT": [
    { airline: "Air France", direct: true, durationMinutes: 430, basePrice: 275000, title: "Air France AF904", departureTime: "07:50", arrivalTime: "16:00" },
    { airline: "Transavia", direct: true, durationMinutes: 435, basePrice: 195000, title: "Transavia TO340", departureTime: "13:30", arrivalTime: "21:45" },
    { airline: "Royal Air Maroc", direct: false, durationMinutes: 560, basePrice: 205000, title: "Royal Air Maroc AT558", departureTime: "08:00", arrivalTime: "18:20" },
  ],
  "NSI-AIRPORT|CDG-AIRPORT": [
    { airline: "Air France", direct: false, durationMinutes: 560, basePrice: 295000, title: "Air France AF910", departureTime: "09:00", arrivalTime: "19:20" },
    { airline: "Ethiopian Airlines", direct: false, durationMinutes: 590, basePrice: 255000, title: "Ethiopian Airlines ET573", departureTime: "11:30", arrivalTime: "22:20" },
    { airline: "Turkish Airlines", direct: false, durationMinutes: 640, basePrice: 230000, title: "Turkish Airlines TK545", departureTime: "15:45", arrivalTime: "03:25+1" },
  ],
  "DLA-AIRPORT|LHR-AIRPORT": [
    { airline: "British Airways", direct: false, durationMinutes: 680, basePrice: 320000, title: "British Airways BA202", departureTime: "10:00", arrivalTime: "22:20" },
    { airline: "Brussels Airlines", direct: false, durationMinutes: 720, basePrice: 298000, title: "Brussels Airlines SN273", departureTime: "12:15", arrivalTime: "01:15+1" },
    { airline: "Air France", direct: false, durationMinutes: 700, basePrice: 305000, title: "Air France AF920", departureTime: "08:45", arrivalTime: "21:25" },
  ],
  "DLA-AIRPORT|JFK-AIRPORT": [
    { airline: "Delta", direct: false, durationMinutes: 1200, basePrice: 450000, title: "Delta DL401", departureTime: "18:30", arrivalTime: "06:30+1" },
    { airline: "Air France", direct: false, durationMinutes: 1180, basePrice: 480000, title: "Air France AF030", departureTime: "20:00", arrivalTime: "07:40+1" },
    { airline: "Ethiopian Airlines", direct: false, durationMinutes: 1250, basePrice: 420000, title: "Ethiopian Airlines ET501", departureTime: "14:20", arrivalTime: "03:10+1" },
  ],
  "DLA-AIRPORT|DXB-AIRPORT": [
    { airline: "Emirates", direct: true, durationMinutes: 420, basePrice: 380000, title: "Emirates EK788", departureTime: "23:45", arrivalTime: "08:45+1" },
    { airline: "Ethiopian Airlines", direct: false, durationMinutes: 510, basePrice: 310000, title: "Ethiopian Airlines ET807", departureTime: "09:30", arrivalTime: "18:00" },
  ],
  "CDG-AIRPORT|DLA-AIRPORT": [
    { airline: "Air France", direct: true, durationMinutes: 440, basePrice: 290000, title: "Air France AF901", departureTime: "10:30", arrivalTime: "17:50" },
    { airline: "Ethiopian Airlines", direct: false, durationMinutes: 530, basePrice: 250000, title: "Ethiopian Airlines ET572", departureTime: "13:00", arrivalTime: "23:50" },
  ],
  "NSI-AIRPORT|DLA-AIRPORT": [
    { airline: "Camair-Co", direct: true, durationMinutes: 55, basePrice: 45000, title: "Camair-Co QC401", departureTime: "07:00", arrivalTime: "07:55" },
    { airline: "Camair-Co", direct: true, durationMinutes: 55, basePrice: 52000, title: "Camair-Co QC403", departureTime: "17:30", arrivalTime: "18:25" },
  ],
};

const AGENCIES = [
  {
    id: "lysa",
    name: "Lysa Travel",
    subdomain: "lysa.stg.ease.travel",
    status: "active",
    description:
      "Agence camerounaise spécialisée dans les vols Europe et Afrique de l'Ouest. Réservation en ligne, paiement Mobile Money et accompagnement WhatsApp.",
    slogan: "Voyager simple, partir loin",
    founded: 2012,
    rating: 4.6,
    reviewCount: 1240,
    contact: {
      phone: "+237 699 11 22 33",
      whatsapp: "+237 699 11 22 33",
      email: "contact@lysa.stg.ease.travel",
      address: "Akwa, Douala — Cameroun",
    },
    openingHours: { weekdays: "08:00-19:00", saturday: "09:00-15:00", sunday: "Fermé" },
    paymentMethods: ["Mobile Money", "Carte bancaire", "Espèces"],
    supportedClasses: ["economy", "business"],
    languages: ["fr", "en"],
    routes: [
      { departure: "DLA-AIRPORT", arrival: "CDG-AIRPORT", available: true },
      { departure: "DLA-AIRPORT", arrival: "ORY-AIRPORT", available: true },
      { departure: "DLA-AIRPORT", arrival: "LHR-AIRPORT", available: true },
      { departure: "DLA-AIRPORT", arrival: "JFK-AIRPORT", available: true },
      { departure: "CDG-AIRPORT", arrival: "DLA-AIRPORT", available: true },
      { departure: "NSI-AIRPORT", arrival: "CDG-AIRPORT", available: true },
    ],
    priceMarkup: 1.0,
  },
  {
    id: "camtour",
    name: "CamTour Voyages",
    subdomain: "camtour.stg.ease.travel",
    status: "active",
    description:
      "Leader des voyages depuis le Cameroun vers l'Europe. Forte présence à Yaoundé et Douala, offres famille et groupes.",
    slogan: "Le Cameroun vers le monde",
    founded: 2008,
    rating: 4.4,
    reviewCount: 2180,
    contact: {
      phone: "+237 677 44 55 66",
      whatsapp: "+237 677 44 55 66",
      email: "info@camtour.stg.ease.travel",
      address: "Bastos, Yaoundé — Cameroun",
    },
    openingHours: { weekdays: "07:30-20:00", saturday: "08:00-17:00", sunday: "10:00-14:00" },
    paymentMethods: ["Mobile Money", "Virement", "Carte bancaire"],
    supportedClasses: ["economy", "business", "first"],
    languages: ["fr"],
    routes: [
      { departure: "DLA-AIRPORT", arrival: "CDG-AIRPORT", available: true },
      { departure: "DLA-AIRPORT", arrival: "ORY-AIRPORT", available: true },
      { departure: "DLA-AIRPORT", arrival: "LHR-AIRPORT", available: true },
      { departure: "DLA-AIRPORT", arrival: "DXB-AIRPORT", available: true },
      { departure: "NSI-AIRPORT", arrival: "CDG-AIRPORT", available: true },
      { departure: "NSI-AIRPORT", arrival: "DLA-AIRPORT", available: true },
      { departure: "CDG-AIRPORT", arrival: "DLA-AIRPORT", available: true },
    ],
    priceMarkup: 1.03,
  },
  {
    id: "globalvoyages",
    name: "Global Voyages",
    subdomain: "globalvoyages.stg.ease.travel",
    status: "active",
    description:
      "Agence premium pour destinations long-courrier (Amériques, Moyen-Orient). Service conciergerie et assistance visa.",
    slogan: "L'horizon sans limites",
    founded: 2015,
    rating: 4.8,
    reviewCount: 890,
    contact: {
      phone: "+237 650 77 88 99",
      whatsapp: "+237 650 77 88 99",
      email: "hello@globalvoyages.stg.ease.travel",
      address: "Bonapriso, Douala — Cameroun",
    },
    openingHours: { weekdays: "09:00-18:30", saturday: "10:00-16:00", sunday: "Fermé" },
    paymentMethods: ["Carte bancaire", "Virement", "Mobile Money"],
    supportedClasses: ["economy", "business", "first"],
    languages: ["fr", "en"],
    routes: [
      { departure: "DLA-AIRPORT", arrival: "CDG-AIRPORT", available: true },
      { departure: "DLA-AIRPORT", arrival: "JFK-AIRPORT", available: true },
      { departure: "DLA-AIRPORT", arrival: "DXB-AIRPORT", available: true },
      { departure: "DLA-AIRPORT", arrival: "LHR-AIRPORT", available: true },
      { departure: "CDG-AIRPORT", arrival: "DLA-AIRPORT", available: true },
    ],
    priceMarkup: 1.06,
  },
  {
    id: "afriquexpress",
    name: "Afrique Express",
    subdomain: "afriquexpress.stg.ease.travel",
    status: "active",
    description:
      "Spécialiste des liaisons intra-africaines et vols régionaux Cameroun. Idéal pour les trajets Yaoundé-Douala et hub Addis.",
    slogan: "Connecter l'Afrique",
    founded: 2018,
    rating: 4.2,
    reviewCount: 560,
    contact: {
      phone: "+237 691 00 11 22",
      whatsapp: "+237 691 00 11 22",
      email: "support@afriquexpress.stg.ease.travel",
      address: "Nlongkak, Yaoundé — Cameroun",
    },
    openingHours: { weekdays: "08:00-18:00", saturday: "09:00-13:00", sunday: "Fermé" },
    paymentMethods: ["Mobile Money", "Espèces"],
    supportedClasses: ["economy"],
    languages: ["fr", "en"],
    routes: [
      { departure: "NSI-AIRPORT", arrival: "DLA-AIRPORT", available: true },
      { departure: "DLA-AIRPORT", arrival: "ADD-AIRPORT", available: false, unavailabilityReason: "Maintenance système — reprise prévue sous 48h." },
      { departure: "DLA-AIRPORT", arrival: "CDG-AIRPORT", available: false, unavailabilityReason: "Capacité épuisée sur cette route pour la saison." },
    ],
    priceMarkup: 0.95,
  },
  {
    id: "voyageplus",
    name: "VoyagePlus",
    subdomain: "voyageplus.stg.ease.travel",
    status: "degraded",
    description:
      "Agence généraliste avec large catalogue Europe. Actuellement en maintenance partielle sur certaines routes internationales.",
    slogan: "Plus de choix, plus de liberté",
    founded: 2010,
    rating: 4.0,
    reviewCount: 1540,
    contact: {
      phone: "+237 678 33 44 55",
      whatsapp: "+237 678 33 44 55",
      email: "service@voyageplus.stg.ease.travel",
      address: "Deido, Douala — Cameroun",
    },
    openingHours: { weekdays: "08:00-19:00", saturday: "08:00-14:00", sunday: "Fermé" },
    paymentMethods: ["Mobile Money", "Carte bancaire"],
    supportedClasses: ["economy", "business"],
    languages: ["fr"],
    routes: [
      { departure: "DLA-AIRPORT", arrival: "CDG-AIRPORT", available: false, unavailabilityReason: "Service temporairement indisponible pour cette route." },
      { departure: "DLA-AIRPORT", arrival: "ORY-AIRPORT", available: false, unavailabilityReason: "Service temporairement indisponible pour cette route." },
      { departure: "DLA-AIRPORT", arrival: "LHR-AIRPORT", available: true },
      { departure: "NSI-AIRPORT", arrival: "CDG-AIRPORT", available: true },
    ],
    priceMarkup: 1.02,
  },
];

function getAgencyBySubdomain(subdomain) {
  return AGENCIES.find((a) => a.subdomain === subdomain || a.id === subdomain);
}

function getAgencyByName(name) {
  const q = name.toLowerCase();
  return AGENCIES.find(
    (a) => a.name.toLowerCase().includes(q) || a.id.includes(q) || a.subdomain.includes(q)
  );
}

function getRouteKey(departure, arrival) {
  return `${departure}|${arrival}`;
}

function getFlightTemplates(departure, arrival) {
  return FLIGHT_CATALOG[getRouteKey(departure, arrival)] || [];
}

function getAgenciesForRoute(departure, arrival) {
  const key = getRouteKey(departure, arrival);
  const templates = FLIGHT_CATALOG[key] || [];

  const available = [];
  const unavailable = [];

  for (const agency of AGENCIES) {
    const route = agency.routes.find((r) => r.departure === departure && r.arrival === arrival);

    if (!route) continue;

    const agencyInfo = {
      id: agency.id,
      name: agency.name,
      subdomain: agency.subdomain,
      status: agency.status,
      description: agency.description,
      contact: agency.contact,
      supportedClasses: agency.supportedClasses,
    };

    if (!route.available || templates.length === 0) {
      unavailable.push({
        ...agencyInfo,
        message: route.unavailabilityReason || "Route non disponible chez cette agence.",
      });
    } else {
      available.push({ ...agencyInfo, route });
    }
  }

  return { available, unavailable, templates };
}

function listAgenciesWithAvailability() {
  return AGENCIES.map((agency) => {
    const activeRoutes = agency.routes.filter((r) => r.available);
    const inactiveRoutes = agency.routes.filter((r) => !r.available);

    return {
      id: agency.id,
      name: agency.name,
      subdomain: agency.subdomain,
      status: agency.status,
      description: agency.description,
      slogan: agency.slogan,
      rating: agency.rating,
      reviewCount: agency.reviewCount,
      contact: agency.contact,
      openingHours: agency.openingHours,
      paymentMethods: agency.paymentMethods,
      supportedClasses: agency.supportedClasses,
      languages: agency.languages,
      availability: {
        totalRoutes: agency.routes.length,
        activeRoutes: activeRoutes.length,
        inactiveRoutes: inactiveRoutes.length,
        routes: agency.routes.map((r) => ({
          ...r,
          hasFlights: Boolean(FLIGHT_CATALOG[getRouteKey(r.departure, r.arrival)]),
        })),
      },
    };
  });
}

module.exports = {
  AGENCIES,
  FLIGHT_CATALOG,
  getAgencyBySubdomain,
  getAgencyByName,
  getFlightTemplates,
  getAgenciesForRoute,
  listAgenciesWithAvailability,
};
