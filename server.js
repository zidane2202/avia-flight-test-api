const express = require("express");
const cors = require("cors");
const { findAirportsByText, getAirportByCode } = require("./data/airports");
const { generateFlights, getAgencyDetails, groupFlightsByAgency } = require("./data/flights");
const { listAgenciesWithAvailability } = require("./data/agencies");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

const staffNotifications = [];
const notifiedSessions = new Set();

function cleanOptional(value) {
  if (value === undefined || value === null) return null;
  const trimmed = String(value).trim();
  if (!trimmed || trimmed === "undefined" || trimmed === "null") return null;
  return trimmed;
}

function parseDateDDMMYYYY(value) {
  if (!value) return null;
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value);
  if (!match) return null;
  const [, day, month, year] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (date.getFullYear() !== Number(year) || date.getMonth() !== Number(month) - 1 || date.getDate() !== Number(day)) {
    return null;
  }
  return date;
}

function isPastDate(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

function normalizeTravelClass(value) {
  if (!value) return "economy";
  const normalized = value.toLowerCase().trim();
  if (["economy", "eco", "économique", "economique"].includes(normalized)) return "economy";
  if (["business", "affaires", "premium"].includes(normalized)) return "business";
  if (["first", "premiere", "première", "firstclass"].includes(normalized)) return "first";
  return normalized;
}

app.get("/", (_req, res) => {
  res.json({
    service: "Avia Flight Test API",
    version: "2.0.0",
    endpoints: {
      health: "GET /health",
      place: "GET /v2/bot/place?text={city}",
      search: "GET /v2/bot/search?departure=&arrival=&startDate=&returnDate=&adult=&children=&infant=&class=&locale=",
      agencies: "GET /v2/bot/agencies",
      agency: "GET /v2/bot/agency?subdomain= | ?name=",
      staffNotify: "GET /staff/notify?reason=&summary=",
    },
  });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "avia-flight-test-api", version: "2.0.0" });
});

app.get("/v2/bot/place", (req, res) => {
  const text = req.query.text || "";
  const airports = findAirportsByText(text);

  res.json({
    query: text,
    results: airports.map((a) => ({
      code: a.code,
      name: a.name,
      city: a.city,
      label: `${a.city} — ${a.name} (${a.code})`,
    })),
  });
});

app.get("/v2/bot/agencies", (_req, res) => {
  res.json({
    total: listAgenciesWithAvailability().length,
    agencies: listAgenciesWithAvailability(),
  });
});

app.get("/v2/bot/agency", (req, res) => {
  const query = req.query.subdomain || req.query.name || req.query.id || "";
  if (!query) {
    return res.status(400).json({ error: true, message: "Paramètre subdomain, name ou id requis." });
  }

  const agency = getAgencyDetails(query);
  if (!agency) {
    return res.status(404).json({ error: true, message: `Agence introuvable : ${query}` });
  }

  res.json(agency);
});

app.get("/v2/bot/search", (req, res) => {
  const {
    departure,
    arrival,
    startDate,
    returnDate: rawReturnDate,
    adult = "1",
    children = "0",
    infant = "0",
    class: rawTravelClass,
    locale = "fr-cm",
  } = req.query;

  const returnDate = cleanOptional(rawReturnDate);
  const travelClassParam = cleanOptional(rawTravelClass);

  const errors = [];

  if (!departure || !getAirportByCode(departure)) {
    errors.push(`Code de départ invalide : ${departure || "manquant"}`);
  }
  if (!arrival || !getAirportByCode(arrival)) {
    errors.push(`Code d'arrivée invalide : ${arrival || "manquant"}`);
  }

  const start = parseDateDDMMYYYY(startDate);
  if (!start) {
    errors.push(`Date de départ invalide : ${startDate || "manquante"} (format attendu DD-MM-YYYY)`);
  } else if (isPastDate(start)) {
    errors.push(`Date de départ dans le passé : ${startDate}`);
  }

  if (returnDate) {
    const returnDt = parseDateDDMMYYYY(returnDate);
    if (!returnDt) {
      errors.push(`Date de retour invalide : ${returnDate} (format attendu DD-MM-YYYY)`);
    } else if (start && returnDt <= start) {
      errors.push(`Date de retour doit être postérieure à la date de départ`);
    }
  }

  const adultCount = Math.max(0, Number(adult) || 0);
  const childrenCount = Math.max(0, Number(children) || 0);
  const infantCount = Math.max(0, Number(infant) || 0);

  if (adultCount < 1) errors.push("Au moins 1 adulte est requis");

  const travelClass = normalizeTravelClass(travelClassParam);
  if (!["economy", "business", "first"].includes(travelClass)) {
    errors.push(`Classe invalide : ${travelClassParam} (economy, business, first)`);
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: true, messages: errors });
  }

  const { flights, unavailableAgencies } = generateFlights({
    departure,
    arrival,
    startDate,
    returnDate: returnDate || null,
    adult: adultCount,
    children: childrenCount,
    infant: infantCount,
    travelClass,
  });

  const groupedByAgency = groupFlightsByAgency(flights, 5);

  const depCity = getAirportByCode(departure).city;
  const arrCity = getAirportByCode(arrival).city;

  res.json({
    query: {
      departure,
      arrival,
      departureCity: depCity,
      arrivalCity: arrCity,
      startDate,
      returnDate: returnDate || null,
      adult: adultCount,
      children: childrenCount,
      infant: infantCount,
      travelClass,
      locale,
      tripType: returnDate ? "round-trip" : "one-way",
    },
    flights,
    groupedByAgency,
    unavailableAgencies,
    meta: {
      totalResults: flights.length,
      agencies: groupedByAgency.map((g) => g.agency),
      unavailableCount: unavailableAgencies.length,
      maxFlightsPerAgency: 5,
      currency: "XAF",
    },
  });
});

app.get("/staff/notify", (req, res) => {
  const reason = cleanOptional(req.query.reason) || "non précisé";
  const summary = cleanOptional(req.query.summary) || "";
  const sessionId = cleanOptional(req.query.sessionId) || "unknown";

  const alreadyNotified = sessionId !== "unknown" && notifiedSessions.has(sessionId);

  if (!alreadyNotified) {
    if (sessionId !== "unknown") notifiedSessions.add(sessionId);
    const notification = {
      id: staffNotifications.length + 1,
      sessionId,
      reason,
      summary,
      receivedAt: new Date().toISOString(),
    };
    staffNotifications.push(notification);
    console.log("[NotifyStaff]", notification);
  }

  res.json({
    success: true,
    alreadyNotified,
    message: alreadyNotified
      ? "Escalade déjà enregistrée pour cette session"
      : "Équipe notifiée avec succès",
    sessionId,
  });
});

app.get("/staff/notifications", (_req, res) => {
  res.json({ count: staffNotifications.length, notifications: staffNotifications });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Avia test API v2 running on port ${PORT}`);
});
