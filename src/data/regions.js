// src/data/regions.js
// Complete Philippines Regions & Universities Data Model

export const PH_REGIONS = [
  {
    id: 'all',
    code: 'PH',
    name: 'All Philippines (Nationwide)',
    shortName: 'All Philippines 🇵🇭',
    islandGroup: 'Nationwide',
    description: 'Open to students and peer mentors across all 17 regions of the Philippines via Online and Campus networks.'
  },
  {
    id: 'ncr',
    code: 'NCR',
    name: 'National Capital Region (Metro Manila)',
    shortName: 'NCR (Metro Manila)',
    islandGroup: 'Luzon',
    majorCities: ['Manila', 'Quezon City', 'Taguig', 'Makati', 'Pasig', 'Mandaluyong'],
    description: 'Metro Manila university belt & institutions.'
  },
  {
    id: 'car',
    code: 'CAR',
    name: 'Cordillera Administrative Region (CAR)',
    shortName: 'CAR (Baguio & Cordilleras)',
    islandGroup: 'Luzon',
    majorCities: ['Baguio City', 'La Trinidad', 'Benguet'],
    description: 'Pines city universities and mountain province campuses.'
  },
  {
    id: 'r1',
    code: 'Region I',
    name: 'Region I - Ilocos Region',
    shortName: 'Region I (Ilocos)',
    islandGroup: 'Luzon',
    majorCities: ['San Fernando', 'Laoag', 'Vigan', 'Dagupan'],
    description: 'Ilocos Norte, Ilocos Sur, La Union, and Pangasinan.'
  },
  {
    id: 'r2',
    code: 'Region II',
    name: 'Region II - Cagayan Valley',
    shortName: 'Region II (Cagayan Valley)',
    islandGroup: 'Luzon',
    majorCities: ['Tuguegarao', 'Santiago', 'Ilagan'],
    description: 'Cagayan, Isabela, Nueva Vizcaya, and Quirino.'
  },
  {
    id: 'r3',
    code: 'Region III',
    name: 'Region III - Central Luzon',
    shortName: 'Region III (Central Luzon)',
    islandGroup: 'Luzon',
    majorCities: ['Angeles', 'San Fernando', 'Malolos', 'Tarlac', 'Olongapo', 'Cabanatuan'],
    description: 'Pampanga, Bulacan, Bataan, Nueva Ecija, Tarlac, Zambales, and Aurora.'
  },
  {
    id: 'r4a',
    code: 'Region IV-A',
    name: 'Region IV-A - CALABARZON',
    shortName: 'Region IV-A (CALABARZON)',
    islandGroup: 'Luzon',
    majorCities: ['Calamba', 'Los Baños', 'Batangas City', 'Antipolo', 'Lucena', 'Dasmariñas'],
    description: 'Cavite, Laguna, Batangas, Rizal, and Quezon.'
  },
  {
    id: 'mimaropa',
    code: 'MIMAROPA',
    name: 'MIMAROPA - Southwestern Tagalog',
    shortName: 'MIMAROPA (Palawan & Islands)',
    islandGroup: 'Luzon',
    majorCities: ['Puerto Princesa', 'Calapan', 'San Jose'],
    description: 'Mindoro, Marinduque, Romblon, and Palawan.'
  },
  {
    id: 'r5',
    code: 'Region V',
    name: 'Region V - Bicol Region',
    shortName: 'Region V (Bicol)',
    islandGroup: 'Luzon',
    majorCities: ['Legazpi', 'Naga', 'Sorsogon', 'Iriga'],
    description: 'Albay, Camarines Sur, Camarines Norte, Sorsogon, Catanduanes, and Masbate.'
  },
  {
    id: 'r6',
    code: 'Region VI',
    name: 'Region VI - Western Visayas',
    shortName: 'Region VI (Western Visayas)',
    islandGroup: 'Visayas',
    majorCities: ['Iloilo City', 'Bacolod City', 'Roxas City', 'Kalibo', 'San Jose de Buenavista'],
    description: 'Iloilo, Negros Occidental, Capiz, Aklan, Antique, and Guimaras.'
  },
  {
    id: 'r7',
    code: 'Region VII',
    name: 'Region VII - Central Visayas',
    shortName: 'Region VII (Central Visayas)',
    islandGroup: 'Visayas',
    majorCities: ['Cebu City', 'Mandaue', 'Lapu-Lapu', 'Dumaguete', 'Tagbilaran'],
    description: 'Cebu, Bohol, Negros Oriental, and Siquijor.'
  },
  {
    id: 'r8',
    code: 'Region VIII',
    name: 'Region VIII - Eastern Visayas',
    shortName: 'Region VIII (Eastern Visayas)',
    islandGroup: 'Visayas',
    majorCities: ['Tacloban', 'Ormoc', 'Catbalogan', 'Baybay', 'Borongan'],
    description: 'Leyte, Samar, Eastern Samar, Northern Samar, Southern Leyte, and Biliran.'
  },
  {
    id: 'r9',
    code: 'Region IX',
    name: 'Region IX - Zamboanga Peninsula',
    shortName: 'Region IX (Zamboanga)',
    islandGroup: 'Mindanao',
    majorCities: ['Zamboanga City', 'Pagadian', 'Dipolog'],
    description: 'Zamboanga del Sur, Zamboanga del Norte, and Zamboanga Sibugay.'
  },
  {
    id: 'r10',
    code: 'Region X',
    name: 'Region X - Northern Mindanao',
    shortName: 'Region X (Northern Mindanao)',
    islandGroup: 'Mindanao',
    majorCities: ['Cagayan de Oro', 'Iligan', 'Malaybalay', 'Valencia', 'Ozamiz'],
    description: 'Misamis Oriental, Bukidnon, Lanao del Norte, Misamis Occidental, and Camiguin.'
  },
  {
    id: 'r11',
    code: 'Region XI',
    name: 'Region XI - Davao Region',
    shortName: 'Region XI (Davao)',
    islandGroup: 'Mindanao',
    majorCities: ['Davao City', 'Tagum', 'Panabo', 'Digos', 'Mati'],
    description: 'Davao del Sur, Davao del Norte, Davao de Oro, Davao Oriental, and Davao Occidental.'
  },
  {
    id: 'r12',
    code: 'Region XII',
    name: 'Region XII - SOCCSKSARGEN',
    shortName: 'Region XII (SOCCSKSARGEN)',
    islandGroup: 'Mindanao',
    majorCities: ['General Santos', 'Koronadal', 'Tacurong', 'Kidapawan'],
    description: 'South Cotabato, Cotabato, Sultan Kudarat, and Sarangani.'
  },
  {
    id: 'r13',
    code: 'Region XIII',
    name: 'Region XIII - Caraga',
    shortName: 'Region XIII (Caraga)',
    islandGroup: 'Mindanao',
    majorCities: ['Butuan', 'Surigao', 'Tandag', 'Bislig', 'Cabasan'],
    description: 'Agusan del Norte, Agusan del Sur, Surigao del Norte, Surigao del Sur, and Dinagat Islands.'
  },
  {
    id: 'barmm',
    code: 'BARMM',
    name: 'BARMM - Bangsamoro Autonomous Region',
    shortName: 'BARMM (Bangsamoro)',
    islandGroup: 'Mindanao',
    majorCities: ['Cotabato City', 'Marawi City', 'Jolo', 'Bongao'],
    description: 'Maguindanao, Lanao del Sur, Basilan, Sulu, and Tawi-Tawi.'
  }
];

export const getRegionById = (id) => {
  return PH_REGIONS.find((r) => r.id === id) || PH_REGIONS[0];
};
