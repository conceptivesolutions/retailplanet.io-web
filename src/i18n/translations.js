/* eslint-disable global-require */
export default {
  en: {
    privacy: require('./_privacy_en.html'),
    availability: {
      available: 'Available',
      orderable: 'Orderable',
      unavailable: 'Not Available',
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
      available: 'Auf Lager',
      orderable: 'Bestellbar',
      unavailable: 'Nicht Verfügbar',
    },
    langs: {
      en: 'Englisch',
      de: 'Deutsch',
    },
  },
};
