const AGENCIES = require("./agency-seed.json");

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
  "ABJ-AIRPORT|CDG-AIRPORT": [
    { airline: "Air France", direct: false, durationMinutes: 520, basePrice: 265000, title: "Air France AF702", departureTime: "10:30", arrivalTime: "20:10" },
    { airline: "Royal Air Maroc", direct: false, durationMinutes: 545, basePrice: 228000, title: "Royal Air Maroc AT556", departureTime: "09:20", arrivalTime: "18:45" },
    { airline: "Turkish Airlines", direct: false, durationMinutes: 610, basePrice: 215000, title: "Turkish Airlines TK543", departureTime: "14:00", arrivalTime: "01:10+1" },
    { airline: "Brussels Airlines", direct: false, durationMinutes: 580, basePrice: 232000, title: "Brussels Airlines SN271", departureTime: "11:45", arrivalTime: "22:25" },
  ],
  "MIA-AIRPORT|CDG-AIRPORT": [
    { airline: "American Airlines", direct: true, durationMinutes: 510, basePrice: 520000, title: "American Airlines AA100", departureTime: "08:00", arrivalTime: "20:30" },
    { airline: "Air France", direct: true, durationMinutes: 510, basePrice: 545000, title: "Air France AF007", departureTime: "14:00", arrivalTime: "02:30+1" },
    { airline: "United Airlines", direct: false, durationMinutes: 690, basePrice: 480000, title: "United Airlines UA205", departureTime: "10:15", arrivalTime: "23:45" },
    { airline: "Delta", direct: false, durationMinutes: 765, basePrice: 495000, title: "Delta Airlines DL450", departureTime: "12:30", arrivalTime: "02:15+1" },
    { airline: "Air Canada", direct: false, durationMinutes: 635, basePrice: 505000, title: "Air Canada AC880", departureTime: "16:45", arrivalTime: "05:20+1" },
  ],
  "DLA-AIRPORT|ATH-AIRPORT": [
    { airline: "Lufthansa", direct: false, durationMinutes: 590, basePrice: 310000, title: "Lufthansa LH718", departureTime: "08:30", arrivalTime: "18:20" },
    { airline: "Turkish Airlines", direct: false, durationMinutes: 630, basePrice: 285000, title: "Turkish Airlines TK542", departureTime: "11:00", arrivalTime: "21:30" },
    { airline: "Brussels Airlines", direct: false, durationMinutes: 570, basePrice: 298000, title: "Brussels Airlines SN270", departureTime: "13:45", arrivalTime: "23:15" },
    { airline: "Air France", direct: false, durationMinutes: 615, basePrice: 320000, title: "Air France AF006", departureTime: "15:30", arrivalTime: "01:45+1" },
    { airline: "Swiss International", direct: false, durationMinutes: 615, basePrice: 315000, title: "Swiss International LX891", departureTime: "17:15", arrivalTime: "03:30+1" },
  ],
  "NSI-AIRPORT|ATH-AIRPORT": [
    { airline: "Lufthansa", direct: false, durationMinutes: 620, basePrice: 325000, title: "Lufthansa LH720", departureTime: "09:15", arrivalTime: "19:35" },
    { airline: "Turkish Airlines", direct: false, durationMinutes: 655, basePrice: 295000, title: "Turkish Airlines TK544", departureTime: "12:00", arrivalTime: "22:55" },
    { airline: "Ethiopian Airlines", direct: false, durationMinutes: 680, basePrice: 278000, title: "Ethiopian Airlines ET575", departureTime: "10:45", arrivalTime: "22:05" },
  ],
  "NSI-AIRPORT|LAX-AIRPORT": [
    { airline: "Turkish Airlines", direct: false, durationMinutes: 1380, basePrice: 680000, title: "Turkish Airlines TK547", departureTime: "11:00", arrivalTime: "06:30+1" },
    { airline: "Air France", direct: false, durationMinutes: 1320, basePrice: 720000, title: "Air France AF022", departureTime: "09:30", arrivalTime: "03:30+1" },
    { airline: "Ethiopian Airlines", direct: false, durationMinutes: 1410, basePrice: 650000, title: "Ethiopian Airlines ET503", departureTime: "14:20", arrivalTime: "08:50+1" },
  ],
  "NSI-AIRPORT|SFO-AIRPORT": [
    { airline: "United Airlines", direct: false, durationMinutes: 1365, basePrice: 695000, title: "United Airlines UA208", departureTime: "10:15", arrivalTime: "04:00+1" },
    { airline: "Lufthansa", direct: false, durationMinutes: 1395, basePrice: 710000, title: "Lufthansa LH724", departureTime: "08:45", arrivalTime: "02:30+1" },
    { airline: "Brussels Airlines", direct: false, durationMinutes: 1420, basePrice: 675000, title: "Brussels Airlines SN275", departureTime: "13:00", arrivalTime: "07:40+1" },
  ],
  "NSI-AIRPORT|SAN-AIRPORT": [
    { airline: "Delta", direct: false, durationMinutes: 1400, basePrice: 705000, title: "Delta DL408", departureTime: "12:30", arrivalTime: "06:50+1" },
    { airline: "Air France", direct: false, durationMinutes: 1375, basePrice: 730000, title: "Air France AF028", departureTime: "10:00", arrivalTime: "04:15+1" },
    { airline: "KLM", direct: false, durationMinutes: 1440, basePrice: 690000, title: "KLM KL592", departureTime: "15:45", arrivalTime: "10:45+1" },
  ],
};

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
  const templates = getFlightTemplates(departure, arrival);
  const available = AGENCIES.filter((agency) =>
    agency.routes.some((route) => route.departure === departure && route.arrival === arrival)
  ).map((agency) => ({
    id: agency.id,
    name: agency.name,
    subdomain: agency.subdomain,
    priceMarkup: agency.priceMarkup,
    supportedClasses: agency.supportedClasses,
  }));

  return { available, templates };
}

module.exports = {
  AGENCIES,
  FLIGHT_CATALOG,
  getAgencyBySubdomain,
  getAgencyByName,
  getFlightTemplates,
  getAgenciesForRoute,
};
