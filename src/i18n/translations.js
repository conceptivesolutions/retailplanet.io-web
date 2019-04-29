/* eslint-disable global-require */
export default {
  en: {
    imprint: require('./_imprint_de.html'),
    privacy: require('./_privacy_en.html'),
    availability: {
      AVAILABLE: 'Available',
      ORDERABLE: 'Orderable',
      UNAVAILABLE: 'Not Available',
      NOTSET: 'No Info',
    },
    results: 'Displaying results for "{query}" ({total})',
    orderby: 'Order by',
    sort: {
      relevance: 'Relevance',
      price_asc: 'Price (ascending)',
      price_desc: 'Price (descending)',
    },
    langs: {
      en: 'English',
      de: 'German',
    },
  },
  de: {
    imprint: require('./_imprint_de.html'),
    privacy: require('./_privacy_de.html'),
    availability: {
      AVAILABLE: 'Auf Lager',
      ORDERABLE: 'Bestellbar',
      UNAVAILABLE: 'Nicht Verfügbar',
      NOTSET: 'Keine Info',
    },
    results: 'Suchergebnisse für "{query}" ({total})',
    orderby: 'Sortieren nach',
    sort: {
      relevance: 'Relevanz',
      price_asc: 'Preis (aufsteigend)',
      price_desc: 'Preis (absteigend)',
    },
    langs: {
      en: 'Englisch',
      de: 'Deutsch',
    },
  },
};
