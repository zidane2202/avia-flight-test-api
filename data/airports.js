const AIRPORTS = [
  { code: "DLA-AIRPORT", name: "Aéroport international de Douala", city: "Douala", aliases: ["douala", "dla"] },
  { code: "NSI-AIRPORT", name: "Aéroport international de Yaoundé-Nsimalen", city: "Yaoundé", aliases: ["yaounde", "yaoundé", "nsi"] },
  { code: "CDG-AIRPORT", name: "Paris Charles de Gaulle", city: "Paris", aliases: ["paris cdg", "charles de gaulle", "cdg"] },
  { code: "ORY-AIRPORT", name: "Paris Orly", city: "Paris", aliases: ["paris orly", "orly", "ory"] },
  { code: "BVA-AIRPORT", name: "Paris Beauvais", city: "Paris", aliases: ["beauvais", "bva"] },
  { code: "LHR-AIRPORT", name: "London Heathrow", city: "Londres", aliases: ["london", "londres", "heathrow", "lhr"] },
  { code: "LGW-AIRPORT", name: "London Gatwick", city: "Londres", aliases: ["gatwick", "lgw"] },
  { code: "JFK-AIRPORT", name: "New York JFK", city: "New York", aliases: ["new york", "nyc", "jfk"] },
  { code: "EWR-AIRPORT", name: "New York Newark", city: "New York", aliases: ["newark", "ewr"] },
  { code: "DXB-AIRPORT", name: "Dubai International", city: "Dubaï", aliases: ["dubai", "dubaï", "dxb"] },
  { code: "ADD-AIRPORT", name: "Addis Ababa Bole", city: "Addis-Abeba", aliases: ["addis", "addis-abeba", "addis ababa"] },
];

function normalize(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function findAirportsByText(text) {
  const query = normalize(text);
  if (!query) return [];

  const exactCity = AIRPORTS.filter((a) => normalize(a.city) === query);
  if (exactCity.length > 0) return exactCity;

  const byAlias = AIRPORTS.filter(
    (a) =>
      a.aliases.some((alias) => normalize(alias) === query) ||
      normalize(a.code).startsWith(query.replace("-airport", ""))
  );
  if (byAlias.length > 0) return byAlias;

  return AIRPORTS.filter(
    (a) =>
      normalize(a.city).includes(query) ||
      normalize(a.name).includes(query) ||
      a.aliases.some((alias) => alias.includes(query) || query.includes(alias))
  );
}

function getAirportByCode(code) {
  return AIRPORTS.find((a) => a.code === code);
}

module.exports = { AIRPORTS, findAirportsByText, getAirportByCode };
