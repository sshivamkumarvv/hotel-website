export const RESORT_CONFIG = {
  name: 'The Glenora River Resort',
  namePart1: 'The Glenora',
  namePart2: 'River Resort',
  tagline: 'Designed for comfort, crafted by nature. Your premium luxury gateway to the Himalayas.',
  phone: '+91 8198978095',
  phoneRaw: '8198978095',
  phoneInternational: '918198978095',
  email: 'info@glenorariverresort.com',
  address: 'Tapovan, Laxman Jhula Road, Rishikesh, Uttarakhand 249192',
  addressShort: 'Tapovan, Laxman Jhula Road, Rishikesh',
  area: 'Tapovan, Rishikesh',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13818.895318536125!2d78.3180496!3d30.1378354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909164287515d05%3A0xebeafb35bbca477!2sTapovan%2C%20Rishikesh%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  whatsappUrl: (msg: string) =>
    `https://wa.me/918198978095?text=${encodeURIComponent(msg)}`,
};
