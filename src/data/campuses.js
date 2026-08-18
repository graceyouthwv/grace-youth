// src/data/campuses.js
// Nationwide Philippine Campuses & Universities categorized by Region

export const CAMPUSES = [
  {
    id: 'all',
    name: 'All Campuses (Nationwide)',
    shortName: 'All Campuses',
    regionId: 'all',
    location: 'Philippines (Nationwide / Online)',
    province: 'All Provinces',
    color: 'from-violet-500 to-indigo-500',
    stats: { students: '45,000+', tutors: '180+', groups: '95+' }
  },

  // --- REGION VI: WESTERN VISAYAS ---
  {
    id: 'upv',
    name: 'University of the Philippines Visayas (UPV)',
    shortName: 'UP Visayas',
    regionId: 'r6',
    location: 'Miagao & Iloilo City Campus',
    province: 'Iloilo',
    color: 'from-rose-600 to-red-700',
    popularMajors: ['BS Biology', 'BS Fisheries', 'BS Applied Math', 'BA Communication'],
    stats: { students: '2,800+', tutors: '14', groups: '7' }
  },
  {
    id: 'cpu',
    name: 'Central Philippine University (CPU)',
    shortName: 'CPU Jaro',
    regionId: 'r6',
    location: 'Jaro, Iloilo City',
    province: 'Iloilo',
    color: 'from-amber-500 to-yellow-600',
    popularMajors: ['BS Nursing', 'BS Civil Engineering', 'BS Accountancy', 'BS Psychology'],
    stats: { students: '3,400+', tutors: '12', groups: '8' }
  },
  {
    id: 'wvsu',
    name: 'West Visayas State University (WVSU)',
    shortName: 'WVSU La Paz',
    regionId: 'r6',
    location: 'La Paz, Iloilo City',
    province: 'Iloilo',
    color: 'from-blue-600 to-indigo-700',
    popularMajors: ['BS Nursing', 'BS Education', 'BS Information Tech', 'BS Biology'],
    stats: { students: '3,100+', tutors: '10', groups: '6' }
  },
  {
    id: 'isufst',
    name: 'Iloilo State University of Fisheries Science and Technology (ISUFST)',
    shortName: 'ISUFST',
    regionId: 'r6',
    location: 'Barotac Nuevo, Dumangas, San Enrique, Dingle, Tiwi',
    province: 'Iloilo',
    color: 'from-teal-600 to-cyan-700',
    popularMajors: ['BS Fisheries', 'BS Marine Biology', 'BS Agriculture', 'BS Information Tech', 'BS Education'],
    stats: { students: '2,200+', tutors: '8', groups: '4' }
  },
  {
    id: 'isatu',
    name: 'Iloilo Science and Technology University (ISAT-U)',
    shortName: 'ISAT-U',
    regionId: 'r6',
    location: 'Burgos St, La Paz, Iloilo City',
    province: 'Iloilo',
    color: 'from-orange-600 to-amber-700',
    popularMajors: ['BS Mechanical Eng', 'BS Electrical Eng', 'BS Computer Science', 'BS Architecture'],
    stats: { students: '2,500+', tutors: '9', groups: '5' }
  },
  {
    id: 'usa',
    name: 'University of San Agustin (USA)',
    shortName: 'San Agustin',
    regionId: 'r6',
    location: 'General Luna St, Iloilo City',
    province: 'Iloilo',
    color: 'from-red-600 to-rose-700',
    popularMajors: ['BS Medical Technology', 'BS Pharmacy', 'BS Accountancy', 'BS Chemical Eng'],
    stats: { students: '2,400+', tutors: '7', groups: '4' }
  },
  {
    id: 'wit',
    name: 'Western Institute of Technology (WIT)',
    shortName: 'WIT Iloilo',
    regionId: 'r6',
    location: 'La Paz, Iloilo City',
    province: 'Iloilo',
    color: 'from-emerald-600 to-green-700',
    popularMajors: ['BS Marine Engineering', 'BS Civil Eng', 'BS Criminology'],
    stats: { students: '1,500+', tutors: '5', groups: '3' }
  },
  {
    id: 'phinma_ui',
    name: 'PHINMA University of Iloilo (UI)',
    shortName: 'PHINMA UI',
    regionId: 'r6',
    location: 'Rizal St, Iloilo City',
    province: 'Iloilo',
    color: 'from-green-600 to-emerald-700',
    popularMajors: ['BS Criminology', 'BS Nursing', 'BS Education', 'BS Business Admin'],
    stats: { students: '1,900+', tutors: '6', groups: '3' }
  },
  {
    id: 'spui',
    name: 'St. Paul University Iloilo (SPUI)',
    shortName: 'St. Paul Iloilo',
    regionId: 'r6',
    location: 'General Luna St, Iloilo City',
    province: 'Iloilo',
    color: 'from-purple-600 to-violet-700',
    popularMajors: ['BS Nursing', 'BS Physical Therapy', 'BS Tourism Management'],
    stats: { students: '1,100+', tutors: '4', groups: '2' }
  },
  {
    id: 'jblfmu',
    name: 'John B. Lacson Foundation Maritime University (JBLFMU)',
    shortName: 'John B. Lacson',
    regionId: 'r6',
    location: 'Molo & Arevalo, Iloilo City',
    province: 'Iloilo',
    color: 'from-sky-600 to-blue-700',
    popularMajors: ['BS Marine Transportation', 'BS Marine Engineering', 'BS Customs Admin'],
    stats: { students: '2,300+', tutors: '6', groups: '4' }
  },
  {
    id: 'usls',
    name: 'University of St. La Salle (USLS Bacolod)',
    shortName: 'USLS Bacolod',
    regionId: 'r6',
    location: 'Bacolod City, Negros Occidental',
    province: 'Negros Occidental',
    color: 'from-green-700 to-emerald-800',
    popularMajors: ['BS Accountancy', 'BS Nursing', 'BS Business Admin'],
    stats: { students: '3,000+', tutors: '8', groups: '5' }
  },

  // --- NCR: NATIONAL CAPITAL REGION ---
  {
    id: 'upd',
    name: 'University of the Philippines Diliman (UPD)',
    shortName: 'UP Diliman',
    regionId: 'ncr',
    location: 'Diliman, Quezon City',
    province: 'Metro Manila',
    color: 'from-red-800 to-rose-900',
    popularMajors: ['BS Computer Science', 'BS Molecular Bio', 'BS Civil Eng', 'BA Political Science'],
    stats: { students: '6,200+', tutors: '24', groups: '12' }
  },
  {
    id: 'ust',
    name: 'University of Santo Tomas (UST)',
    shortName: 'UST Manila',
    regionId: 'ncr',
    location: 'España Blvd, Sampaloc, Manila',
    province: 'Metro Manila',
    color: 'from-yellow-500 to-amber-600',
    popularMajors: ['BS Medical Technology', 'BS Nursing', 'BS Accountancy', 'BS Architecture'],
    stats: { students: '5,800+', tutors: '20', groups: '10' }
  },
  {
    id: 'dlsu',
    name: 'De La Salle University (DLSU Manila)',
    shortName: 'DLSU Taft',
    regionId: 'ncr',
    location: 'Taft Ave, Malate, Manila',
    province: 'Metro Manila',
    color: 'from-emerald-700 to-green-800',
    popularMajors: ['BS Applied Economics', 'BS Computer Science', 'BS Accountancy'],
    stats: { students: '4,500+', tutors: '18', groups: '9' }
  },
  {
    id: 'admu',
    name: 'Ateneo de Manila University (ADMU)',
    shortName: 'Ateneo Katipunan',
    regionId: 'ncr',
    location: 'Loyola Heights, Quezon City',
    province: 'Metro Manila',
    color: 'from-blue-700 to-indigo-800',
    popularMajors: ['BS Management Engineering', 'BS Psychology', 'BS Computer Science'],
    stats: { students: '3,900+', tutors: '15', groups: '8' }
  },
  {
    id: 'pup',
    name: 'Polytechnic University of the Philippines (PUP Main)',
    shortName: 'PUP Sta. Mesa',
    regionId: 'ncr',
    location: 'Sta. Mesa, Manila',
    province: 'Metro Manila',
    color: 'from-rose-700 to-red-800',
    popularMajors: ['BS Accountancy', 'BS Civil Eng', 'BS Computer Engineering', 'BS Education'],
    stats: { students: '7,500+', tutors: '28', groups: '14' }
  },

  // --- REGION IV-A: CALABARZON ---
  {
    id: 'uplb',
    name: 'University of the Philippines Los Baños (UPLB)',
    shortName: 'UP Los Baños',
    regionId: 'r4a',
    location: 'Los Baños, Laguna',
    province: 'Laguna',
    color: 'from-red-700 to-rose-800',
    popularMajors: ['BS Agriculture', 'BS Forestry', 'BS Biology', 'BS Computer Science'],
    stats: { students: '4,100+', tutors: '16', groups: '8' }
  },

  // --- REGION VII: CENTRAL VISAYAS ---
  {
    id: 'usc',
    name: 'University of San Carlos (USC Cebu)',
    shortName: 'San Carlos Cebu',
    regionId: 'r7',
    location: 'Talamban & Downtown, Cebu City',
    province: 'Cebu',
    color: 'from-green-600 to-teal-700',
    popularMajors: ['BS Civil Eng', 'BS Architecture', 'BS Accountancy', 'BS Chemistry'],
    stats: { students: '4,800+', tutors: '18', groups: '9' }
  },
  {
    id: 'upcebu',
    name: 'University of the Philippines Cebu (UP Cebu)',
    shortName: 'UP Cebu',
    regionId: 'r7',
    location: 'Lahug, Cebu City',
    province: 'Cebu',
    color: 'from-red-800 to-rose-900',
    popularMajors: ['BS Computer Science', 'BS Math', 'BA Communication'],
    stats: { students: '1,800+', tutors: '9', groups: '5' }
  },
  {
    id: 'silliman',
    name: 'Silliman University',
    shortName: 'Silliman Dumaguete',
    regionId: 'r7',
    location: 'Dumaguete City, Negros Oriental',
    province: 'Negros Oriental',
    color: 'from-red-600 to-amber-700',
    popularMajors: ['BS Nursing', 'BS Medical Tech', 'BS Marine Biology'],
    stats: { students: '2,900+', tutors: '11', groups: '6' }
  },

  // --- REGION VIII: EASTERN VISAYAS ---
  {
    id: 'vsu',
    name: 'Visayas State University (VSU Main)',
    shortName: 'VSU Baybay',
    regionId: 'r8',
    location: 'Baybay City, Leyte',
    province: 'Leyte',
    color: 'from-emerald-600 to-green-700',
    popularMajors: ['BS Agriculture', 'BS Veterinary Med', 'BS Biotechnology'],
    stats: { students: '2,600+', tutors: '10', groups: '5' }
  },

  // --- REGION X: NORTHERN MINDANAO ---
  {
    id: 'msuiit',
    name: 'Mindanao State University - Iligan Institute of Technology (MSU-IIT)',
    shortName: 'MSU-IIT Iligan',
    regionId: 'r10',
    location: 'Tibanga, Iligan City',
    province: 'Lanao del Norte',
    color: 'from-amber-600 to-red-700',
    popularMajors: ['BS Mechanical Eng', 'BS Chemical Eng', 'BS Physics', 'BS Computer Science'],
    stats: { students: '3,800+', tutors: '15', groups: '7' }
  },
  {
    id: 'xu',
    name: 'Xavier University - Ateneo de Cagayan',
    shortName: 'Xavier Ateneo CDO',
    regionId: 'r10',
    location: 'Corrales Ave, Cagayan de Oro City',
    province: 'Misamis Oriental',
    color: 'from-blue-700 to-indigo-800',
    popularMajors: ['BS Nursing', 'BS Accountancy', 'BS Agriculture', 'BS Civil Eng'],
    stats: { students: '3,200+', tutors: '12', groups: '6' }
  },

  // --- REGION XI: DAVAO REGION ---
  {
    id: 'addu',
    name: 'Ateneo de Davao University (ADDU)',
    shortName: 'Ateneo de Davao',
    regionId: 'r11',
    location: 'Jacinto St, Davao City',
    province: 'Davao del Sur',
    color: 'from-blue-600 to-sky-700',
    popularMajors: ['BS Computer Science', 'BS Accountancy', 'BS Nursing', 'BS Psychology'],
    stats: { students: '3,500+', tutors: '14', groups: '7' }
  },
  {
    id: 'upmin',
    name: 'University of the Philippines Mindanao (UPMin)',
    shortName: 'UP Mindanao',
    regionId: 'r11',
    location: 'Mintal, Tugbok District, Davao City',
    province: 'Davao del Sur',
    color: 'from-rose-800 to-red-900',
    popularMajors: ['BS Applied Math', 'BS Food Technology', 'BS Biology', 'BS Computer Science'],
    stats: { students: '1,600+', tutors: '8', groups: '4' }
  },

  // --- CAR: CORDILLERA ---
  {
    id: 'upb',
    name: 'University of the Philippines Baguio (UPB)',
    shortName: 'UP Baguio',
    regionId: 'car',
    location: 'Gov. Pack Rd, Baguio City',
    province: 'Benguet',
    color: 'from-red-700 to-rose-800',
    popularMajors: ['BS Biology', 'BS Math', 'BS Physics', 'BA Social Sciences'],
    stats: { students: '2,100+', tutors: '9', groups: '5' }
  },
  {
    id: 'slu',
    name: 'Saint Louis University (SLU Baguio)',
    shortName: 'SLU Baguio',
    regionId: 'car',
    location: 'Bonifacio St, Baguio City',
    province: 'Benguet',
    color: 'from-blue-700 to-sky-800',
    popularMajors: ['BS Medical Technology', 'BS Nursing', 'BS Civil Engineering', 'BS Architecture'],
    stats: { students: '4,200+', tutors: '16', groups: '8' }
  }
];

export const SUBJECT_CATEGORIES = [
  'All Subjects',
  'STEM & Math',
  'Science & Fisheries',
  'Health Sciences & Nursing',
  'Engineering & Architecture',
  'IT & Computing',
  'Business & Accountancy',
  'Social Sciences & Languages'
];
