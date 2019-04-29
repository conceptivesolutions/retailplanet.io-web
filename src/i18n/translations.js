/* eslint-disable global-require */
export default {
  en: {
    privacy: require('./_privacy_en.html'),
    availability: {
      AVAILABLE: 'Available',
      ORDERABLE: 'Orderable',
      UNAVAILABLE: 'Not Available',
      NOTSET: 'No Info',
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
    langs: {
      en: 'Englisch',
      de: 'Deutsch',
    },
  },
};
