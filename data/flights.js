const {
  AGENCIES,
  getAgenciesForRoute,
  getAgencyBySubdomain,
  getAgencyByName,
  getFlightTemplates,
} = require("./agencies");

const CLASS_MULTIPLIER = {
  economy: 1,
  business: 2.4,
  first: 4.2,
};

function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h${m.toString().padStart(2, "0")}`;
}

function buildDescription(template, travelClass, isRoundTrip, returnDate) {
  const stopLabel = template.direct ? "Vol direct" : "Vol avec escale";
  const classLabel = { economy: "Économique", business: "Affaires", first: "Première" }[travelClass] || travelClass;
  let desc = `${stopLabel}, ${template.airline}, départ ${template.departureTime}, arrivée ${template.arrivalTime}, durée ${formatDuration(template.durationMinutes)}, classe ${classLabel}`;
  if (isRoundTrip) {
    desc += `, aller-retour (retour ${returnDate})`;
  }
  return desc;
}

function generateFlights({ departure, arrival, startDate, returnDate, adult, children, infant, travelClass }) {
  const { available, unavailable, templates } = getAgenciesForRoute(departure, arrival);
  const multiplier = CLASS_MULTIPLIER[travelClass] || 1;
  const passengerFactor = adult + children * 0.75 + infant * 0.1;
  const isRoundTrip = Boolean(returnDate);
  const roundTripFactor = isRoundTrip ? 1.85 : 1;

  const flights = [];

  for (const entry of available) {
    const agency = AGENCIES.find((a) => a.id === entry.id);
    if (!agency.supportedClasses.includes(travelClass)) continue;

    templates.forEach((template, index) => {
      const priceVariation = 1 + (index % 3) * 0.04;
      const price = Math.round(
        template.basePrice * multiplier * passengerFactor * roundTripFactor * agency.priceMarkup * priceVariation
      );

      flights.push({
        title: template.title,
        description: buildDescription(template, travelClass, isRoundTrip, returnDate),
        price,
        currency: "XAF",
        searchUrl: `https://${agency.subdomain}/search?dep=${departure}&arr=${arrival}&date=${startDate}${returnDate ? `&return=${returnDate}` : ""}&class=${travelClass}&ref=${agency.id}-${index}`,
        airline: template.airline,
        direct: template.direct,
        durationMinutes: template.durationMinutes,
        departureTime: template.departureTime,
        arrivalTime: template.arrivalTime,
        agency: agency.name,
        agencyId: agency.id,
        agencySubdomain: agency.subdomain,
        agencyDescription: agency.description,
        agencyContact: agency.contact,
        travelClass,
        seatsAvailable: 3 + ((index + agency.id.length) % 8),
      });
    });
  }

  return {
    flights: flights.sort((a, b) => a.price - b.price),
    unavailableAgencies: unavailable.map((u) => ({
      name: u.name,
      subdomain: u.subdomain,
      message: u.message,
      status: u.status,
      contact: u.contact,
    })),
  };
}

function getAgencyDetails(query) {
  const agency = getAgencyBySubdomain(query) || getAgencyByName(query);
  if (!agency) return null;

  return {
    id: agency.id,
    name: agency.name,
    subdomain: agency.subdomain,
    status: agency.status,
    description: agency.description,
    slogan: agency.slogan,
    founded: agency.founded,
    rating: agency.rating,
    reviewCount: agency.reviewCount,
    contact: agency.contact,
    openingHours: agency.openingHours,
    paymentMethods: agency.paymentMethods,
    supportedClasses: agency.supportedClasses,
    languages: agency.languages,
    searchUrl: `https://${agency.subdomain}`,
    routes: agency.routes.map((r) => ({
      departure: r.departure,
      arrival: r.arrival,
      available: r.available,
      message: r.unavailabilityReason || (r.available ? "Disponible" : "Indisponible"),
      hasFlights: Boolean(getFlightTemplates(r.departure, r.arrival).length),
    })),
  };
}

module.exports = { generateFlights, getAgencyDetails, AGENCIES };
