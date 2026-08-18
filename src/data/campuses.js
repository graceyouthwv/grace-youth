// src/data/campuses.js
// Comprehensive Philippine Colleges & Universities — Public (SUCs) & Private HEIs
// Organized by Region (regionId matches src/data/regions.js)

export const CAMPUSES = [
  {
    id: 'all',
    name: 'All Campuses (Nationwide)',
    shortName: 'All Campuses',
    regionId: 'all',
    location: 'Philippines (Nationwide / Online)',
    province: 'All Provinces',
    type: 'all',
    color: 'from-violet-500 to-indigo-500',
    stats: { students: '45,000+', tutors: '180+', groups: '95+' }
  },

  // ═══════════════════════════════════════════════════════════════════
  // NCR — NATIONAL CAPITAL REGION (Metro Manila)
  // ═══════════════════════════════════════════════════════════════════

  // --- Public ---
  { id: 'upd', name: 'University of the Philippines Diliman', shortName: 'UP Diliman', regionId: 'ncr', location: 'Diliman, Quezon City', province: 'Metro Manila', type: 'public', color: 'from-red-800 to-rose-900', popularMajors: ['BS Computer Science', 'BS Molecular Biology', 'BS Civil Engineering', 'BA Political Science'], stats: { students: '6200+', tutors: '24', groups: '12' } },
  { id: 'upm', name: 'University of the Philippines Manila', shortName: 'UP Manila', regionId: 'ncr', location: 'Ermita, Manila', province: 'Metro Manila', type: 'public', color: 'from-red-700 to-rose-800', popularMajors: ['Doctor of Medicine', 'BS Nursing', 'BS Pharmacy', 'BS Physical Therapy'], stats: { students: '3400+', tutors: '12', groups: '6' } },
  { id: 'pup', name: 'Polytechnic University of the Philippines', shortName: 'PUP Sta. Mesa', regionId: 'ncr', location: 'Sta. Mesa, Manila', province: 'Metro Manila', type: 'public', color: 'from-rose-700 to-red-800', popularMajors: ['BS Accountancy', 'BS Civil Engineering', 'BS Computer Engineering', 'BS Education'], stats: { students: '7500+', tutors: '28', groups: '14' } },
  { id: 'plm', name: 'Pamantasan ng Lungsod ng Maynila', shortName: 'PLM Intramuros', regionId: 'ncr', location: 'Intramuros, Manila', province: 'Metro Manila', type: 'public', color: 'from-yellow-600 to-amber-700', popularMajors: ['BS Nursing', 'BS Physical Therapy', 'BS Accountancy', 'Doctor of Medicine'], stats: { students: '3000+', tutors: '10', groups: '5' } },
  { id: 'tup', name: 'Technological University of the Philippines', shortName: 'TUP Manila', regionId: 'ncr', location: 'Ayala Blvd, Ermita, Manila', province: 'Metro Manila', type: 'public', color: 'from-blue-700 to-indigo-800', popularMajors: ['BS Mechanical Engineering', 'BS Electrical Engineering', 'BS Civil Engineering'], stats: { students: '4000+', tutors: '14', groups: '7' } },
  { id: 'pntc', name: 'Philippine Normal University', shortName: 'PNU Taft', regionId: 'ncr', location: 'Taft Ave, Manila', province: 'Metro Manila', type: 'public', color: 'from-green-700 to-emerald-800', popularMajors: ['Bachelor of Elementary Education', 'Bachelor of Secondary Education', 'BS Special Education'], stats: { students: '2800+', tutors: '10', groups: '5' } },
  { id: 'earist', name: 'Eulogio "Amang" Rodriguez Institute of Science and Technology', shortName: 'EARIST Manila', regionId: 'ncr', location: 'Nagtahan, Sampaloc, Manila', province: 'Metro Manila', type: 'public', color: 'from-teal-600 to-cyan-700', popularMajors: ['BS Information Technology', 'BS Industrial Engineering', 'BS Electronics Engineering'], stats: { students: '2200+', tutors: '6', groups: '3' } },
  { id: 'rtu', name: 'Rizal Technological University', shortName: 'RTU Mandaluyong', regionId: 'ncr', location: 'Mandaluyong City', province: 'Metro Manila', type: 'public', color: 'from-orange-600 to-amber-700', popularMajors: ['BS Civil Engineering', 'BS Computer Science', 'BS Accountancy'], stats: { students: '2600+', tutors: '8', groups: '4' } },
  { id: 'plsp', name: 'Pamantasan ng Lungsod ng San Pablo', shortName: 'PLSP', regionId: 'ncr', location: 'San Pablo City, Laguna', province: 'Metro Manila', type: 'public', color: 'from-sky-600 to-blue-700', popularMajors: ['BS Education', 'BS Information Technology', 'BS Criminology'], stats: { students: '1500+', tutors: '4', groups: '2' } },

  // --- Private ---
  { id: 'ust', name: 'University of Santo Tomas', shortName: 'UST Manila', regionId: 'ncr', location: 'España Blvd, Sampaloc, Manila', province: 'Metro Manila', type: 'private', color: 'from-yellow-500 to-amber-600', popularMajors: ['BS Medical Technology', 'BS Nursing', 'BS Accountancy', 'BS Architecture'], stats: { students: '5800+', tutors: '20', groups: '10' } },
  { id: 'dlsu', name: 'De La Salle University', shortName: 'DLSU Taft', regionId: 'ncr', location: 'Taft Ave, Malate, Manila', province: 'Metro Manila', type: 'private', color: 'from-emerald-700 to-green-800', popularMajors: ['BS Applied Economics', 'BS Computer Science', 'BS Accountancy'], stats: { students: '4500+', tutors: '18', groups: '9' } },
  { id: 'admu', name: 'Ateneo de Manila University', shortName: 'Ateneo Katipunan', regionId: 'ncr', location: 'Loyola Heights, Quezon City', province: 'Metro Manila', type: 'private', color: 'from-blue-700 to-indigo-800', popularMajors: ['BS Management Engineering', 'BS Psychology', 'BS Computer Science'], stats: { students: '3900+', tutors: '15', groups: '8' } },
  { id: 'feu', name: 'Far Eastern University', shortName: 'FEU Manila', regionId: 'ncr', location: 'Nicanor Reyes St, Sampaloc, Manila', province: 'Metro Manila', type: 'private', color: 'from-green-600 to-emerald-700', popularMajors: ['BS Accountancy', 'BS Nursing', 'BS Medical Technology', 'BS Psychology'], stats: { students: '3600+', tutors: '12', groups: '6' } },
  { id: 'nu', name: 'National University', shortName: 'NU Manila', regionId: 'ncr', location: 'Jhocson St, Sampaloc, Manila', province: 'Metro Manila', type: 'private', color: 'from-yellow-600 to-amber-700', popularMajors: ['BS Dentistry', 'BS Architecture', 'BS Accountancy', 'BS Computer Science'], stats: { students: '3000+', tutors: '10', groups: '5' } },
  { id: 'ue', name: 'University of the East', shortName: 'UE Manila/Caloocan', regionId: 'ncr', location: 'Claro M. Recto Ave, Manila', province: 'Metro Manila', type: 'private', color: 'from-red-600 to-rose-700', popularMajors: ['BS Accountancy', 'BS Dentistry', 'BS Medical Technology'], stats: { students: '3200+', tutors: '10', groups: '5' } },
  { id: 'smu', name: 'San Beda University', shortName: 'San Beda Mendiola', regionId: 'ncr', location: 'Mendiola, San Miguel, Manila', province: 'Metro Manila', type: 'private', color: 'from-red-700 to-rose-800', popularMajors: ['BS Accountancy', 'Juris Doctor / Law', 'BS Business Administration'], stats: { students: '2200+', tutors: '6', groups: '3' } },
  { id: 'map', name: 'Mapúa University', shortName: 'Mapúa Intramuros', regionId: 'ncr', location: 'Intramuros, Manila', province: 'Metro Manila', type: 'private', color: 'from-red-800 to-rose-900', popularMajors: ['BS Civil Engineering', 'BS Computer Engineering', 'BS Architecture', 'BS Information Technology'], stats: { students: '3500+', tutors: '12', groups: '6' } },
  { id: 'apc', name: 'Asia Pacific College', shortName: 'APC Makati', regionId: 'ncr', location: 'Magallanes, Makati City', province: 'Metro Manila', type: 'private', color: 'from-sky-600 to-blue-700', popularMajors: ['BS Computer Science', 'BS Information Technology', 'BS Multimedia Arts'], stats: { students: '1800+', tutors: '6', groups: '3' } },
  { id: 'miriam', name: 'Miriam College', shortName: 'Miriam QC', regionId: 'ncr', location: 'Loyola Heights, Quezon City', province: 'Metro Manila', type: 'private', color: 'from-green-600 to-teal-700', popularMajors: ['BS Psychology', 'BS Environmental Science', 'BS Communication'], stats: { students: '1600+', tutors: '5', groups: '3' } },
  { id: 'assumption', name: 'Assumption College', shortName: 'Assumption Makati', regionId: 'ncr', location: 'San Lorenzo Village, Makati', province: 'Metro Manila', type: 'private', color: 'from-blue-600 to-indigo-700', popularMajors: ['BS Psychology', 'BS Accountancy', 'AB Communication'], stats: { students: '1200+', tutors: '4', groups: '2' } },
  { id: 'letran', name: 'Colegio de San Juan de Letran', shortName: 'Letran Intramuros', regionId: 'ncr', location: 'Intramuros, Manila', province: 'Metro Manila', type: 'private', color: 'from-amber-600 to-yellow-700', popularMajors: ['Juris Doctor / Law', 'BS Accountancy', 'BS Business Administration'], stats: { students: '2000+', tutors: '6', groups: '3' } },
  { id: 'adamson', name: 'Adamson University', shortName: 'Adamson Manila', regionId: 'ncr', location: 'Ermita, Manila', province: 'Metro Manila', type: 'private', color: 'from-indigo-600 to-blue-700', popularMajors: ['BS Chemical Engineering', 'BS Pharmacy', 'BS Civil Engineering'], stats: { students: '2500+', tutors: '8', groups: '4' } },
  { id: 'arellano', name: 'Arellano University', shortName: 'Arellano Manila', regionId: 'ncr', location: 'Legarda, Manila', province: 'Metro Manila', type: 'private', color: 'from-amber-500 to-orange-600', popularMajors: ['Juris Doctor / Law', 'BS Criminology', 'BS Education'], stats: { students: '2000+', tutors: '6', groups: '3' } },

  // ═══════════════════════════════════════════════════════════════════
  // CAR — CORDILLERA ADMINISTRATIVE REGION
  // ═══════════════════════════════════════════════════════════════════

  // --- Public ---
  { id: 'upb', name: 'University of the Philippines Baguio', shortName: 'UP Baguio', regionId: 'car', location: 'Gov. Pack Rd, Baguio City', province: 'Benguet', type: 'public', color: 'from-red-700 to-rose-800', popularMajors: ['BS Biology', 'BS Mathematics', 'BS Physics', 'BA Social Sciences'], stats: { students: '2100+', tutors: '9', groups: '5' } },
  { id: 'bsu', name: 'Benguet State University', shortName: 'BSU La Trinidad', regionId: 'car', location: 'La Trinidad, Benguet', province: 'Benguet', type: 'public', color: 'from-green-700 to-emerald-800', popularMajors: ['BS Agriculture', 'BS Forestry', 'BS Nursing', 'BS Education'], stats: { students: '3500+', tutors: '12', groups: '6' } },
  { id: 'mpc', name: 'Mountain Province State Polytechnic College', shortName: 'MPSPC Bontoc', regionId: 'car', location: 'Bontoc, Mountain Province', province: 'Mountain Province', type: 'public', color: 'from-emerald-600 to-green-700', popularMajors: ['BS Education', 'BS Agriculture', 'BS Information Technology'], stats: { students: '1200+', tutors: '4', groups: '2' } },
  { id: 'ifsu', name: 'Ifugao State University', shortName: 'IFSU Lamut', regionId: 'car', location: 'Lamut, Ifugao', province: 'Ifugao', type: 'public', color: 'from-teal-600 to-cyan-700', popularMajors: ['BS Agriculture', 'BS Forestry', 'BS Education'], stats: { students: '1400+', tutors: '5', groups: '2' } },
  { id: 'ksu', name: 'Kalinga State University', shortName: 'KSU Tabuk', regionId: 'car', location: 'Tabuk City, Kalinga', province: 'Kalinga', type: 'public', color: 'from-amber-600 to-orange-700', popularMajors: ['BS Agriculture', 'BS Education', 'BS Criminology'], stats: { students: '1100+', tutors: '3', groups: '2' } },
  { id: 'apsu', name: 'Apayao State University', shortName: 'ApSU Luna', regionId: 'car', location: 'Luna, Apayao', province: 'Apayao', type: 'public', color: 'from-yellow-600 to-amber-700', popularMajors: ['BS Education', 'BS Agriculture'], stats: { students: '800+', tutors: '2', groups: '1' } },

  // --- Private ---
  { id: 'slu', name: 'Saint Louis University', shortName: 'SLU Baguio', regionId: 'car', location: 'Bonifacio St, Baguio City', province: 'Benguet', type: 'private', color: 'from-blue-700 to-sky-800', popularMajors: ['BS Medical Technology', 'BS Nursing', 'BS Civil Engineering', 'BS Architecture'], stats: { students: '4200+', tutors: '16', groups: '8' } },
  { id: 'uc_baguio', name: 'University of the Cordilleras', shortName: 'UC Baguio', regionId: 'car', location: 'Gov. Pack Rd, Baguio City', province: 'Benguet', type: 'private', color: 'from-indigo-600 to-blue-700', popularMajors: ['BS Nursing', 'BS Criminology', 'BS Information Technology', 'Juris Doctor / Law'], stats: { students: '3200+', tutors: '10', groups: '5' } },
  { id: 'pines', name: 'University of Baguio', shortName: 'UB Baguio', regionId: 'car', location: 'Gen. Luna Rd, Baguio City', province: 'Benguet', type: 'private', color: 'from-green-600 to-emerald-700', popularMajors: ['BS Nursing', 'BS Dentistry', 'BS Criminology', 'BS Education'], stats: { students: '2800+', tutors: '8', groups: '4' } },

  // ═══════════════════════════════════════════════════════════════════
  // REGION I — ILOCOS REGION
  // ═══════════════════════════════════════════════════════════════════

  // --- Public ---
  { id: 'mmsu', name: 'Mariano Marcos State University', shortName: 'MMSU Batac', regionId: 'r1', location: 'Batac, Ilocos Norte', province: 'Ilocos Norte', type: 'public', color: 'from-green-700 to-emerald-800', popularMajors: ['BS Agriculture', 'BS Engineering', 'BS Education', 'BS Nursing'], stats: { students: '3000+', tutors: '10', groups: '5' } },
  { id: 'unp', name: 'University of Northern Philippines', shortName: 'UNP Vigan', regionId: 'r1', location: 'Tamag, Vigan City, Ilocos Sur', province: 'Ilocos Sur', type: 'public', color: 'from-blue-600 to-indigo-700', popularMajors: ['BS Education', 'BS Agriculture', 'BS Nursing', 'BS Criminology'], stats: { students: '2800+', tutors: '8', groups: '4' } },
  { id: 'dmmmsu', name: 'Don Mariano Marcos Memorial State University', shortName: 'DMMMSU Bacnotan', regionId: 'r1', location: 'Bacnotan, La Union', province: 'La Union', type: 'public', color: 'from-teal-600 to-emerald-700', popularMajors: ['BS Agriculture', 'BS Fisheries', 'BS Forestry', 'BS Information Technology'], stats: { students: '2600+', tutors: '8', groups: '4' } },
  { id: 'psu', name: 'Pangasinan State University', shortName: 'PSU Lingayen', regionId: 'r1', location: 'Lingayen, Pangasinan', province: 'Pangasinan', type: 'public', color: 'from-sky-600 to-blue-700', popularMajors: ['BS Education', 'BS Nursing', 'BS Engineering', 'BS Accountancy'], stats: { students: '4500+', tutors: '14', groups: '7' } },

  // --- Private ---
  { id: 'uludag', name: 'University of La Union', shortName: 'ULU San Fernando', regionId: 'r1', location: 'San Fernando City, La Union', province: 'La Union', type: 'private', color: 'from-red-600 to-rose-700', popularMajors: ['BS Nursing', 'BS Medical Technology', 'BS Education'], stats: { students: '1600+', tutors: '5', groups: '2' } },
  { id: 'lorma', name: 'Lorma Colleges', shortName: 'Lorma San Fernando', regionId: 'r1', location: 'San Fernando City, La Union', province: 'La Union', type: 'private', color: 'from-orange-500 to-amber-600', popularMajors: ['BS Nursing', 'Doctor of Medicine', 'BS Medical Technology'], stats: { students: '2000+', tutors: '6', groups: '3' } },

  // ═══════════════════════════════════════════════════════════════════
  // REGION II — CAGAYAN VALLEY
  // ═══════════════════════════════════════════════════════════════════

  // --- Public ---
  { id: 'csu', name: 'Cagayan State University', shortName: 'CSU Tuguegarao', regionId: 'r2', location: 'Carig Sur, Tuguegarao City', province: 'Cagayan', type: 'public', color: 'from-green-700 to-emerald-800', popularMajors: ['BS Agriculture', 'BS Education', 'BS Nursing', 'BS Information Technology'], stats: { students: '4000+', tutors: '12', groups: '6' } },
  { id: 'isu', name: 'Isabela State University', shortName: 'ISU Echague', regionId: 'r2', location: 'Echague, Isabela', province: 'Isabela', type: 'public', color: 'from-teal-600 to-green-700', popularMajors: ['BS Agriculture', 'BS Veterinary Medicine', 'BS Engineering', 'BS Education'], stats: { students: '3800+', tutors: '12', groups: '6' } },
  { id: 'nvsu', name: 'Nueva Vizcaya State University', shortName: 'NVSU Bayombong', regionId: 'r2', location: 'Bayombong, Nueva Vizcaya', province: 'Nueva Vizcaya', type: 'public', color: 'from-emerald-600 to-teal-700', popularMajors: ['BS Agriculture', 'BS Forestry', 'BS Education'], stats: { students: '2200+', tutors: '6', groups: '3' } },
  { id: 'qsu', name: 'Quirino State University', shortName: 'QSU Diffun', regionId: 'r2', location: 'Diffun, Quirino', province: 'Quirino', type: 'public', color: 'from-amber-600 to-yellow-700', popularMajors: ['BS Education', 'BS Agriculture', 'BS Criminology'], stats: { students: '1200+', tutors: '4', groups: '2' } },

  // --- Private ---
  { id: 'sjc_cag', name: 'St. Paul University Philippines', shortName: 'SPUP Tuguegarao', regionId: 'r2', location: 'Mabini St, Tuguegarao City', province: 'Cagayan', type: 'private', color: 'from-blue-600 to-indigo-700', popularMajors: ['BS Nursing', 'BS Information Technology', 'BS Education'], stats: { students: '2000+', tutors: '6', groups: '3' } },
  { id: 'ufv', name: 'University of La Salette', shortName: 'ULS Santiago', regionId: 'r2', location: 'Santiago City, Isabela', province: 'Isabela', type: 'private', color: 'from-green-600 to-emerald-700', popularMajors: ['BS Nursing', 'Doctor of Medicine', 'BS Education'], stats: { students: '1800+', tutors: '5', groups: '3' } },

  // ═══════════════════════════════════════════════════════════════════
  // REGION III — CENTRAL LUZON
  // ═══════════════════════════════════════════════════════════════════

  // --- Public ---
  { id: 'clsu', name: 'Central Luzon State University', shortName: 'CLSU Muñoz', regionId: 'r3', location: 'Science City of Muñoz, Nueva Ecija', province: 'Nueva Ecija', type: 'public', color: 'from-green-700 to-emerald-800', popularMajors: ['BS Agriculture', 'BS Veterinary Medicine', 'BS Biology', 'BS Fisheries'], stats: { students: '4200+', tutors: '14', groups: '7' } },
  { id: 'tsu', name: 'Tarlac State University', shortName: 'TSU Tarlac', regionId: 'r3', location: 'Lucinda, Tarlac City', province: 'Tarlac', type: 'public', color: 'from-blue-600 to-indigo-700', popularMajors: ['BS Engineering', 'BS Education', 'BS Accountancy', 'BS Nursing'], stats: { students: '3500+', tutors: '10', groups: '5' } },
  { id: 'bsu3', name: 'Bulacan State University', shortName: 'BulSU Malolos', regionId: 'r3', location: 'Malolos, Bulacan', province: 'Bulacan', type: 'public', color: 'from-sky-600 to-blue-700', popularMajors: ['BS Industrial Engineering', 'BS Architecture', 'BS Education', 'BS Nursing'], stats: { students: '4800+', tutors: '16', groups: '8' } },
  { id: 'aub', name: 'Aurora State College of Technology', shortName: 'ASCOT Baler', regionId: 'r3', location: 'Baler, Aurora', province: 'Aurora', type: 'public', color: 'from-teal-600 to-cyan-700', popularMajors: ['BS Fisheries', 'BS Agriculture', 'BS Education'], stats: { students: '1500+', tutors: '4', groups: '2' } },
  { id: 'dhvsu', name: 'Don Honorio Ventura State University', shortName: 'DHVSU Bacolor', regionId: 'r3', location: 'Bacolor, Pampanga', province: 'Pampanga', type: 'public', color: 'from-orange-600 to-amber-700', popularMajors: ['BS Civil Engineering', 'BS Electrical Engineering', 'BS Education'], stats: { students: '3200+', tutors: '10', groups: '5' } },
  { id: 'neust', name: 'Nueva Ecija University of Science and Technology', shortName: 'NEUST Cabanatuan', regionId: 'r3', location: 'Gen. Tinio St, Cabanatuan City', province: 'Nueva Ecija', type: 'public', color: 'from-amber-600 to-yellow-700', popularMajors: ['BS Engineering', 'BS Education', 'BS Information Technology'], stats: { students: '3800+', tutors: '12', groups: '6' } },
  { id: 'bpsu', name: 'Bataan Peninsula State University', shortName: 'BPSU Balanga', regionId: 'r3', location: 'Balanga, Bataan', province: 'Bataan', type: 'public', color: 'from-emerald-600 to-green-700', popularMajors: ['BS Computer Engineering', 'BS Nursing', 'BS Education'], stats: { students: '2600+', tutors: '8', groups: '4' } },
  { id: 'prac', name: 'Pampanga State Agricultural University', shortName: 'PSAU Magalang', regionId: 'r3', location: 'Magalang, Pampanga', province: 'Pampanga', type: 'public', color: 'from-green-600 to-teal-700', popularMajors: ['BS Agriculture', 'BS Veterinary Medicine', 'BS Education'], stats: { students: '1800+', tutors: '5', groups: '3' } },

  // --- Private ---
  { id: 'au', name: 'Angeles University Foundation', shortName: 'AUF Angeles', regionId: 'r3', location: 'Angeles City, Pampanga', province: 'Pampanga', type: 'private', color: 'from-red-600 to-rose-700', popularMajors: ['Doctor of Medicine', 'BS Nursing', 'BS Medical Technology', 'BS Physical Therapy'], stats: { students: '3200+', tutors: '10', groups: '5' } },
  { id: 'hau', name: 'Holy Angel University', shortName: 'HAU Angeles', regionId: 'r3', location: 'Angeles City, Pampanga', province: 'Pampanga', type: 'private', color: 'from-blue-700 to-indigo-800', popularMajors: ['BS Accountancy', 'BS Nursing', 'BS Information Technology', 'BS Architecture'], stats: { students: '3600+', tutors: '12', groups: '6' } },
  { id: 'wes', name: 'Wesleyan University Philippines', shortName: 'WU Cabanatuan', regionId: 'r3', location: 'Cabanatuan City, Nueva Ecija', province: 'Nueva Ecija', type: 'private', color: 'from-purple-600 to-violet-700', popularMajors: ['Doctor of Medicine', 'BS Nursing', 'BS Dentistry'], stats: { students: '1800+', tutors: '6', groups: '3' } },

  // ═══════════════════════════════════════════════════════════════════
  // REGION IV-A — CALABARZON
  // ═══════════════════════════════════════════════════════════════════

  // --- Public ---
  { id: 'uplb', name: 'University of the Philippines Los Baños', shortName: 'UP Los Baños', regionId: 'r4a', location: 'Los Baños, Laguna', province: 'Laguna', type: 'public', color: 'from-red-700 to-rose-800', popularMajors: ['BS Agriculture', 'BS Forestry', 'BS Biology', 'BS Computer Science'], stats: { students: '4100+', tutors: '16', groups: '8' } },
  { id: 'bsuc', name: 'Batangas State University', shortName: 'BatStateU Batangas', regionId: 'r4a', location: 'Batangas City, Batangas', province: 'Batangas', type: 'public', color: 'from-red-600 to-rose-700', popularMajors: ['BS Electrical Engineering', 'BS Mechanical Engineering', 'BS Information Technology'], stats: { students: '5000+', tutors: '16', groups: '8' } },
  { id: 'cvsu', name: 'Cavite State University', shortName: 'CvSU Indang', regionId: 'r4a', location: 'Indang, Cavite', province: 'Cavite', type: 'public', color: 'from-green-700 to-emerald-800', popularMajors: ['BS Agriculture', 'BS Education', 'BS Computer Science', 'BS Nursing'], stats: { students: '5500+', tutors: '18', groups: '9' } },
  { id: 'lspu', name: 'Laguna State Polytechnic University', shortName: 'LSPU Siniloan', regionId: 'r4a', location: 'Siniloan, Laguna', province: 'Laguna', type: 'public', color: 'from-blue-600 to-indigo-700', popularMajors: ['BS Education', 'BS Information Technology', 'BS Hospitality Management'], stats: { students: '3200+', tutors: '10', groups: '5' } },
  { id: 'slsu', name: 'Southern Luzon State University', shortName: 'SLSU Lucban', regionId: 'r4a', location: 'Lucban, Quezon', province: 'Quezon', type: 'public', color: 'from-emerald-600 to-green-700', popularMajors: ['BS Agricultural Engineering', 'BS Education', 'BS Information Technology'], stats: { students: '3000+', tutors: '10', groups: '5' } },
  { id: 'rizal_tech', name: 'University of Rizal System', shortName: 'URS Morong', regionId: 'r4a', location: 'Morong, Rizal', province: 'Rizal', type: 'public', color: 'from-amber-600 to-yellow-700', popularMajors: ['BS Education', 'BS Engineering', 'BS Criminology'], stats: { students: '3500+', tutors: '10', groups: '5' } },

  // --- Private ---
  { id: 'dlsud', name: 'De La Salle University - Dasmariñas', shortName: 'DLSU-D', regionId: 'r4a', location: 'Dasmariñas, Cavite', province: 'Cavite', type: 'private', color: 'from-emerald-700 to-green-800', popularMajors: ['BS Nursing', 'BS Computer Science', 'BS Accountancy'], stats: { students: '4000+', tutors: '14', groups: '7' } },
  { id: 'lyc', name: 'Lyceum of the Philippines University - Batangas', shortName: 'LPU Batangas', regionId: 'r4a', location: 'Batangas City, Batangas', province: 'Batangas', type: 'private', color: 'from-red-600 to-rose-700', popularMajors: ['BS Tourism', 'BS Hospitality Management', 'BS Nursing', 'BS Accountancy'], stats: { students: '3800+', tutors: '12', groups: '6' } },
  { id: 'stn', name: 'STI College - Calamba', shortName: 'STI Calamba', regionId: 'r4a', location: 'Calamba, Laguna', province: 'Laguna', type: 'private', color: 'from-blue-600 to-sky-700', popularMajors: ['BS Computer Science', 'BS Information Technology', 'BS Multimedia Arts'], stats: { students: '1500+', tutors: '4', groups: '2' } },

  // ═══════════════════════════════════════════════════════════════════
  // MIMAROPA — SOUTHWESTERN TAGALOG
  // ═══════════════════════════════════════════════════════════════════

  // --- Public ---
  { id: 'mopc', name: 'Mindoro State University', shortName: 'MinSU Calapan', regionId: 'mimaropa', location: 'Calapan City, Oriental Mindoro', province: 'Oriental Mindoro', type: 'public', color: 'from-green-600 to-emerald-700', popularMajors: ['BS Education', 'BS Agriculture', 'BS Fisheries'], stats: { students: '2200+', tutors: '6', groups: '3' } },
  { id: 'psu_pal', name: 'Palawan State University', shortName: 'PSU Puerto Princesa', regionId: 'mimaropa', location: 'Puerto Princesa City, Palawan', province: 'Palawan', type: 'public', color: 'from-teal-600 to-cyan-700', popularMajors: ['BS Fisheries', 'BS Agriculture', 'BS Forestry', 'BS Education'], stats: { students: '3000+', tutors: '10', groups: '5' } },
  { id: 'wpu', name: 'Western Philippines University', shortName: 'WPU Aborlan', regionId: 'mimaropa', location: 'Aborlan, Palawan', province: 'Palawan', type: 'public', color: 'from-emerald-600 to-green-700', popularMajors: ['BS Forestry', 'BS Fisheries', 'BS Agriculture'], stats: { students: '1200+', tutors: '3', groups: '2' } },
  { id: 'rsu', name: 'Romblon State University', shortName: 'RSU Odiongan', regionId: 'mimaropa', location: 'Odiongan, Romblon', province: 'Romblon', type: 'public', color: 'from-blue-600 to-sky-700', popularMajors: ['BS Education', 'BS Fisheries', 'BS Criminology'], stats: { students: '1000+', tutors: '3', groups: '1' } },
  { id: 'msc', name: 'Marinduque State College', shortName: 'MSC Boac', regionId: 'mimaropa', location: 'Boac, Marinduque', province: 'Marinduque', type: 'public', color: 'from-amber-600 to-yellow-700', popularMajors: ['BS Education', 'BS Agriculture', 'BS Information Technology'], stats: { students: '1000+', tutors: '3', groups: '1' } },

  // ═══════════════════════════════════════════════════════════════════
  // REGION V — BICOL REGION
  // ═══════════════════════════════════════════════════════════════════

  // --- Public ---
  { id: 'bicu', name: 'Bicol University', shortName: 'BU Legazpi', regionId: 'r5', location: 'Legazpi City, Albay', province: 'Albay', type: 'public', color: 'from-green-700 to-emerald-800', popularMajors: ['BS Agriculture', 'BS Nursing', 'BS Engineering', 'BS Education'], stats: { students: '4000+', tutors: '12', groups: '6' } },
  { id: 'cbsua', name: 'Central Bicol State University of Agriculture', shortName: 'CBSUA Pili', regionId: 'r5', location: 'Pili, Camarines Sur', province: 'Camarines Sur', type: 'public', color: 'from-teal-600 to-green-700', popularMajors: ['BS Agriculture', 'BS Veterinary Medicine', 'BS Education'], stats: { students: '2800+', tutors: '8', groups: '4' } },
  { id: 'cnsc', name: 'Camarines Norte State College', shortName: 'CNSC Daet', regionId: 'r5', location: 'Daet, Camarines Norte', province: 'Camarines Norte', type: 'public', color: 'from-blue-600 to-indigo-700', popularMajors: ['BS Education', 'BS Criminology', 'BS Information Technology'], stats: { students: '2000+', tutors: '6', groups: '3' } },
  { id: 'ssu', name: 'Sorsogon State University', shortName: 'SorSU Sorsogon', regionId: 'r5', location: 'Sorsogon City, Sorsogon', province: 'Sorsogon', type: 'public', color: 'from-emerald-600 to-teal-700', popularMajors: ['BS Education', 'BS Engineering', 'BS Agriculture'], stats: { students: '2200+', tutors: '6', groups: '3' } },
  { id: 'csc', name: 'Catanduanes State University', shortName: 'CatSU Virac', regionId: 'r5', location: 'Virac, Catanduanes', province: 'Catanduanes', type: 'public', color: 'from-sky-600 to-blue-700', popularMajors: ['BS Education', 'BS Fisheries', 'BS Agriculture'], stats: { students: '1200+', tutors: '4', groups: '2' } },
  { id: 'psc', name: 'Partido State University', shortName: 'PSU Goa', regionId: 'r5', location: 'Goa, Camarines Sur', province: 'Camarines Sur', type: 'public', color: 'from-orange-600 to-amber-700', popularMajors: ['BS Agriculture', 'BS Education', 'BS Information Technology'], stats: { students: '1600+', tutors: '5', groups: '2' } },

  // --- Private ---
  { id: 'adnu', name: 'Ateneo de Naga University', shortName: 'Ateneo de Naga', regionId: 'r5', location: 'Naga City, Camarines Sur', province: 'Camarines Sur', type: 'private', color: 'from-blue-700 to-indigo-800', popularMajors: ['BS Accountancy', 'BS Computer Science', 'BS Nursing', 'BS Psychology'], stats: { students: '3000+', tutors: '10', groups: '5' } },
  { id: 'unp_naga', name: 'University of Nueva Caceres', shortName: 'UNC Naga', regionId: 'r5', location: 'Naga City, Camarines Sur', province: 'Camarines Sur', type: 'private', color: 'from-red-600 to-rose-700', popularMajors: ['Juris Doctor / Law', 'BS Nursing', 'BS Accountancy', 'BS Education'], stats: { students: '2200+', tutors: '6', groups: '3' } },

  // ═══════════════════════════════════════════════════════════════════
  // REGION VI — WESTERN VISAYAS
  // ═══════════════════════════════════════════════════════════════════

  // --- Public ---
  { id: 'upv', name: 'University of the Philippines Visayas', shortName: 'UP Visayas', regionId: 'r6', location: 'Miagao & Iloilo City Campus', province: 'Iloilo', type: 'public', color: 'from-rose-600 to-red-700', popularMajors: ['BS Biology', 'BS Fisheries', 'BS Applied Math', 'BA Communication'], stats: { students: '2800+', tutors: '14', groups: '7' } },
  { id: 'wvsu', name: 'West Visayas State University', shortName: 'WVSU La Paz', regionId: 'r6', location: 'La Paz, Iloilo City', province: 'Iloilo', type: 'public', color: 'from-blue-600 to-indigo-700', popularMajors: ['BS Nursing', 'BS Education', 'BS Information Technology', 'BS Biology'], stats: { students: '3100+', tutors: '10', groups: '6' } },
  { id: 'isufst', name: 'Iloilo State University of Fisheries Science and Technology', shortName: 'ISUFST', regionId: 'r6', location: 'Barotac Nuevo, Dumangas, Dingle, Iloilo', province: 'Iloilo', type: 'public', color: 'from-teal-600 to-cyan-700', popularMajors: ['BS Fisheries', 'BS Marine Biology', 'BS Agriculture', 'BS Information Technology', 'BS Education'], stats: { students: '2200+', tutors: '8', groups: '4' } },
  { id: 'isatu', name: 'Iloilo Science and Technology University', shortName: 'ISAT-U', regionId: 'r6', location: 'Burgos St, La Paz, Iloilo City', province: 'Iloilo', type: 'public', color: 'from-orange-600 to-amber-700', popularMajors: ['BS Mechanical Engineering', 'BS Electrical Engineering', 'BS Computer Science', 'BS Architecture'], stats: { students: '2500+', tutors: '9', groups: '5' } },
  { id: 'csu_capiz', name: 'Capiz State University', shortName: 'CapSU Roxas', regionId: 'r6', location: 'Fuentes Drive, Roxas City, Capiz', province: 'Capiz', type: 'public', color: 'from-green-600 to-emerald-700', popularMajors: ['BS Fisheries', 'BS Agriculture', 'BS Education'], stats: { students: '2600+', tutors: '8', groups: '4' } },
  { id: 'asu', name: 'Aklan State University', shortName: 'AkSU Banga', regionId: 'r6', location: 'Banga, Aklan', province: 'Aklan', type: 'public', color: 'from-sky-600 to-blue-700', popularMajors: ['BS Education', 'BS Agriculture', 'BS Fisheries', 'BS Hospitality Management'], stats: { students: '2000+', tutors: '6', groups: '3' } },
  { id: 'gspc', name: 'Guimaras State University', shortName: 'GSU Jordan', regionId: 'r6', location: 'Jordan, Guimaras', province: 'Guimaras', type: 'public', color: 'from-amber-600 to-yellow-700', popularMajors: ['BS Fisheries', 'BS Education', 'BS Agriculture'], stats: { students: '1000+', tutors: '3', groups: '1' } },

  // --- Private ---
  { id: 'cpu', name: 'Central Philippine University', shortName: 'CPU Jaro', regionId: 'r6', location: 'Jaro, Iloilo City', province: 'Iloilo', type: 'private', color: 'from-amber-500 to-yellow-600', popularMajors: ['BS Nursing', 'BS Civil Engineering', 'BS Accountancy', 'BS Psychology'], stats: { students: '3400+', tutors: '12', groups: '8' } },
  { id: 'usa', name: 'University of San Agustin', shortName: 'San Agustin', regionId: 'r6', location: 'General Luna St, Iloilo City', province: 'Iloilo', type: 'private', color: 'from-red-600 to-rose-700', popularMajors: ['BS Medical Technology', 'BS Pharmacy', 'BS Accountancy', 'BS Chemical Engineering'], stats: { students: '2400+', tutors: '7', groups: '4' } },
  { id: 'wit', name: 'Western Institute of Technology', shortName: 'WIT Iloilo', regionId: 'r6', location: 'Luna St, La Paz, Iloilo City', province: 'Iloilo', type: 'private', color: 'from-emerald-600 to-green-700', popularMajors: ['BS Marine Engineering', 'BS Civil Engineering', 'BS Criminology'], stats: { students: '1500+', tutors: '5', groups: '3' } },
  { id: 'phinma_ui', name: 'PHINMA University of Iloilo', shortName: 'PHINMA UI', regionId: 'r6', location: 'Rizal St, Iloilo City', province: 'Iloilo', type: 'private', color: 'from-green-600 to-emerald-700', popularMajors: ['BS Criminology', 'BS Nursing', 'BS Education', 'BS Business Administration'], stats: { students: '1900+', tutors: '6', groups: '3' } },
  { id: 'spui', name: 'St. Paul University Iloilo', shortName: 'St. Paul Iloilo', regionId: 'r6', location: 'General Luna St, Iloilo City', province: 'Iloilo', type: 'private', color: 'from-purple-600 to-violet-700', popularMajors: ['BS Nursing', 'BS Physical Therapy', 'BS Tourism Management'], stats: { students: '1100+', tutors: '4', groups: '2' } },
  { id: 'jblfmu', name: 'John B. Lacson Foundation Maritime University', shortName: 'JBLFMU Molo', regionId: 'r6', location: 'Molo & Arevalo, Iloilo City', province: 'Iloilo', type: 'private', color: 'from-sky-600 to-blue-700', popularMajors: ['BS Marine Transportation', 'BS Marine Engineering', 'BS Customs Administration'], stats: { students: '2300+', tutors: '6', groups: '4' } },
  { id: 'usls', name: 'University of St. La Salle', shortName: 'USLS Bacolod', regionId: 'r6', location: 'Bacolod City, Negros Occidental', province: 'Negros Occidental', type: 'private', color: 'from-green-700 to-emerald-800', popularMajors: ['BS Accountancy', 'BS Nursing', 'BS Business Administration'], stats: { students: '3000+', tutors: '8', groups: '5' } },
  { id: 'sti_bacolod', name: 'STI West Negros University', shortName: 'STI-WNU Bacolod', regionId: 'r6', location: 'Bacolod City, Negros Occidental', province: 'Negros Occidental', type: 'private', color: 'from-blue-600 to-sky-700', popularMajors: ['BS Information Technology', 'BS Computer Science', 'BS Hospitality Management'], stats: { students: '1800+', tutors: '5', groups: '3' } },
  { id: 'ucsba', name: 'University of Negros Occidental - Recoletos', shortName: 'UNO-R Bacolod', regionId: 'r6', location: 'Bacolod City, Negros Occidental', province: 'Negros Occidental', type: 'private', color: 'from-amber-600 to-orange-700', popularMajors: ['BS Accountancy', 'BS Nursing', 'BS Education', 'Juris Doctor / Law'], stats: { students: '2500+', tutors: '8', groups: '4' } },

  // ═══════════════════════════════════════════════════════════════════
  // REGION VII — CENTRAL VISAYAS
  // ═══════════════════════════════════════════════════════════════════

  // --- Public ---
  { id: 'upcebu', name: 'University of the Philippines Cebu', shortName: 'UP Cebu', regionId: 'r7', location: 'Lahug, Cebu City', province: 'Cebu', type: 'public', color: 'from-red-800 to-rose-900', popularMajors: ['BS Computer Science', 'BS Mathematics', 'BA Communication'], stats: { students: '1800+', tutors: '9', groups: '5' } },
  { id: 'ctu', name: 'Cebu Technological University', shortName: 'CTU Main', regionId: 'r7', location: 'R. Palma St, Cebu City', province: 'Cebu', type: 'public', color: 'from-blue-600 to-indigo-700', popularMajors: ['BS Engineering', 'BS Information Technology', 'BS Education'], stats: { students: '4500+', tutors: '14', groups: '7' } },
  { id: 'bohol_isu', name: 'Bohol Island State University', shortName: 'BISU Tagbilaran', regionId: 'r7', location: 'Tagbilaran City, Bohol', province: 'Bohol', type: 'public', color: 'from-teal-600 to-emerald-700', popularMajors: ['BS Education', 'BS Fisheries', 'BS Agriculture', 'BS Information Technology'], stats: { students: '2600+', tutors: '8', groups: '4' } },
  { id: 'norsu', name: 'Negros Oriental State University', shortName: 'NORSU Dumaguete', regionId: 'r7', location: 'Dumaguete City, Negros Oriental', province: 'Negros Oriental', type: 'public', color: 'from-green-600 to-teal-700', popularMajors: ['BS Education', 'BS Agriculture', 'BS Fisheries', 'BS Engineering'], stats: { students: '3000+', tutors: '10', groups: '5' } },

  // --- Private ---
  { id: 'usc', name: 'University of San Carlos', shortName: 'USC Cebu', regionId: 'r7', location: 'Talamban & Downtown, Cebu City', province: 'Cebu', type: 'private', color: 'from-green-600 to-teal-700', popularMajors: ['BS Civil Engineering', 'BS Architecture', 'BS Accountancy', 'BS Chemistry'], stats: { students: '4800+', tutors: '18', groups: '9' } },
  { id: 'usjr', name: 'University of San Jose - Recoletos', shortName: 'USJ-R Cebu', regionId: 'r7', location: 'Basak, Cebu City', province: 'Cebu', type: 'private', color: 'from-amber-600 to-yellow-700', popularMajors: ['BS Education', 'BS Accountancy', 'BS Computer Engineering', 'BS Mechanical Engineering'], stats: { students: '3200+', tutors: '10', groups: '5' } },
  { id: 'uv', name: 'University of the Visayas', shortName: 'UV Cebu', regionId: 'r7', location: 'Colon St, Cebu City', province: 'Cebu', type: 'private', color: 'from-blue-600 to-sky-700', popularMajors: ['BS Nursing', 'BS Pharmacy', 'BS Education', 'Juris Doctor / Law'], stats: { students: '4000+', tutors: '12', groups: '6' } },
  { id: 'swu', name: 'Southwestern University', shortName: 'SWU Cebu', regionId: 'r7', location: 'Villa Aznar, Urgello, Cebu City', province: 'Cebu', type: 'private', color: 'from-red-600 to-rose-700', popularMajors: ['Doctor of Medicine', 'BS Nursing', 'BS Pharmacy', 'BS Medical Technology'], stats: { students: '2400+', tutors: '8', groups: '4' } },
  { id: 'cdu', name: 'Cebu Doctors University', shortName: 'CDU Mandaue', regionId: 'r7', location: 'Mandaue City, Cebu', province: 'Cebu', type: 'private', color: 'from-emerald-600 to-green-700', popularMajors: ['Doctor of Medicine', 'BS Nursing', 'BS Physical Therapy', 'BS Medical Technology'], stats: { students: '2200+', tutors: '6', groups: '3' } },
  { id: 'silliman', name: 'Silliman University', shortName: 'Silliman Dumaguete', regionId: 'r7', location: 'Dumaguete City, Negros Oriental', province: 'Negros Oriental', type: 'private', color: 'from-red-600 to-amber-700', popularMajors: ['BS Nursing', 'BS Medical Technology', 'BS Marine Biology', 'BS Psychology'], stats: { students: '2900+', tutors: '11', groups: '6' } },
  { id: 'hsc', name: 'Holy Name University', shortName: 'HNU Tagbilaran', regionId: 'r7', location: 'Tagbilaran City, Bohol', province: 'Bohol', type: 'private', color: 'from-indigo-600 to-blue-700', popularMajors: ['BS Nursing', 'BS Education', 'BS Information Technology', 'BS Accountancy'], stats: { students: '2000+', tutors: '6', groups: '3' } },

  // ═══════════════════════════════════════════════════════════════════
  // REGION VIII — EASTERN VISAYAS
  // ═══════════════════════════════════════════════════════════════════

  // --- Public ---
  { id: 'evsu', name: 'Eastern Visayas State University', shortName: 'EVSU Tacloban', regionId: 'r8', location: 'Tacloban City, Leyte', province: 'Leyte', type: 'public', color: 'from-green-700 to-emerald-800', popularMajors: ['BS Engineering', 'BS Education', 'BS Agriculture', 'BS Information Technology'], stats: { students: '3500+', tutors: '10', groups: '5' } },
  { id: 'vsu', name: 'Visayas State University', shortName: 'VSU Baybay', regionId: 'r8', location: 'Baybay City, Leyte', province: 'Leyte', type: 'public', color: 'from-emerald-600 to-green-700', popularMajors: ['BS Agriculture', 'BS Veterinary Medicine', 'BS Biotechnology', 'BS Food Technology'], stats: { students: '2600+', tutors: '10', groups: '5' } },
  { id: 'nwssu', name: 'Northwest Samar State University', shortName: 'NwSSU Calbayog', regionId: 'r8', location: 'Calbayog City, Samar', province: 'Samar', type: 'public', color: 'from-blue-600 to-indigo-700', popularMajors: ['BS Education', 'BS Fisheries', 'BS Agriculture'], stats: { students: '1600+', tutors: '5', groups: '2' } },
  { id: 'ssct', name: 'Samar State University', shortName: 'SSU Catbalogan', regionId: 'r8', location: 'Catbalogan City, Samar', province: 'Samar', type: 'public', color: 'from-teal-600 to-cyan-700', popularMajors: ['BS Education', 'BS Agriculture', 'BS Engineering'], stats: { students: '2200+', tutors: '6', groups: '3' } },
  { id: 'essup', name: 'Eastern Samar State University', shortName: 'ESSU Borongan', regionId: 'r8', location: 'Borongan City, Eastern Samar', province: 'Eastern Samar', type: 'public', color: 'from-sky-600 to-blue-700', popularMajors: ['BS Agriculture', 'BS Education', 'BS Information Technology'], stats: { students: '1400+', tutors: '4', groups: '2' } },
  { id: 'slsu_so', name: 'Southern Leyte State University', shortName: 'SLSU Sogod', regionId: 'r8', location: 'Sogod, Southern Leyte', province: 'Southern Leyte', type: 'public', color: 'from-amber-600 to-yellow-700', popularMajors: ['BS Education', 'BS Agriculture', 'BS Information Technology'], stats: { students: '1500+', tutors: '4', groups: '2' } },

  // --- Private ---
  { id: 'ldcu', name: 'Leyte Normal University', shortName: 'LNU Tacloban', regionId: 'r8', location: 'Tacloban City, Leyte', province: 'Leyte', type: 'public', color: 'from-orange-600 to-amber-700', popularMajors: ['Bachelor of Elementary Education', 'Bachelor of Secondary Education', 'BS Education'], stats: { students: '2000+', tutors: '6', groups: '3' } },

  // ═══════════════════════════════════════════════════════════════════
  // REGION IX — ZAMBOANGA PENINSULA
  // ═══════════════════════════════════════════════════════════════════

  // --- Public ---
  { id: 'wmsu', name: 'Western Mindanao State University', shortName: 'WMSU Zamboanga', regionId: 'r9', location: 'Normal Rd, Zamboanga City', province: 'Zamboanga del Sur', type: 'public', color: 'from-green-700 to-emerald-800', popularMajors: ['BS Education', 'BS Agriculture', 'BS Engineering', 'BS Nursing'], stats: { students: '4000+', tutors: '12', groups: '6' } },
  { id: 'jrmsu', name: 'J.H. Cerilles State College', shortName: 'JHCSC Dumingag', regionId: 'r9', location: 'Dumingag, Zamboanga del Sur', province: 'Zamboanga del Sur', type: 'public', color: 'from-teal-600 to-green-700', popularMajors: ['BS Education', 'BS Agriculture', 'BS Forestry'], stats: { students: '1800+', tutors: '5', groups: '2' } },
  { id: 'josema', name: 'Jose Rizal Memorial State University', shortName: 'JRMSU Dapitan', regionId: 'r9', location: 'Dapitan City, Zamboanga del Norte', province: 'Zamboanga del Norte', type: 'public', color: 'from-blue-600 to-indigo-700', popularMajors: ['BS Education', 'BS Fisheries', 'BS Information Technology'], stats: { students: '2400+', tutors: '6', groups: '3' } },

  // --- Private ---
  { id: 'adzu', name: 'Ateneo de Zamboanga University', shortName: 'AdZU', regionId: 'r9', location: 'La Purisima St, Zamboanga City', province: 'Zamboanga del Sur', type: 'private', color: 'from-blue-700 to-indigo-800', popularMajors: ['BS Nursing', 'BS Accountancy', 'BS Computer Science', 'Doctor of Medicine'], stats: { students: '2800+', tutors: '10', groups: '5' } },

  // ═══════════════════════════════════════════════════════════════════
  // REGION X — NORTHERN MINDANAO
  // ═══════════════════════════════════════════════════════════════════

  // --- Public ---
  { id: 'msuiit', name: 'Mindanao State University - Iligan Institute of Technology', shortName: 'MSU-IIT Iligan', regionId: 'r10', location: 'Tibanga, Iligan City', province: 'Lanao del Norte', type: 'public', color: 'from-amber-600 to-red-700', popularMajors: ['BS Mechanical Engineering', 'BS Chemical Engineering', 'BS Physics', 'BS Computer Science'], stats: { students: '3800+', tutors: '15', groups: '7' } },
  { id: 'ustp', name: 'University of Science and Technology of Southern Philippines', shortName: 'USTP CDO', regionId: 'r10', location: 'Lapasan, Cagayan de Oro City', province: 'Misamis Oriental', type: 'public', color: 'from-blue-600 to-indigo-700', popularMajors: ['BS Electrical Technology', 'BS Mechanical Engineering', 'BS Information Technology'], stats: { students: '3200+', tutors: '10', groups: '5' } },
  { id: 'buksu', name: 'Bukidnon State University', shortName: 'BukSU Malaybalay', regionId: 'r10', location: 'Malaybalay, Bukidnon', province: 'Bukidnon', type: 'public', color: 'from-green-600 to-emerald-700', popularMajors: ['BS Education', 'BS Agriculture', 'BS Environmental Science'], stats: { students: '2800+', tutors: '8', groups: '4' } },
  { id: 'moms', name: 'Misamis Oriental State College of Agriculture and Technology', shortName: 'MOSCAT Claveria', regionId: 'r10', location: 'Claveria, Misamis Oriental', province: 'Misamis Oriental', type: 'public', color: 'from-emerald-600 to-green-700', popularMajors: ['BS Agriculture', 'BS Education', 'BS Information Technology'], stats: { students: '1600+', tutors: '4', groups: '2' } },
  { id: 'mou', name: 'Misamis University', shortName: 'MU Ozamiz', regionId: 'r10', location: 'Ozamiz City, Misamis Occidental', province: 'Misamis Occidental', type: 'private', color: 'from-sky-600 to-blue-700', popularMajors: ['BS Nursing', 'BS Medical Technology', 'BS Engineering'], stats: { students: '2000+', tutors: '6', groups: '3' } },

  // --- Private ---
  { id: 'xu', name: 'Xavier University - Ateneo de Cagayan', shortName: 'Xavier Ateneo CDO', regionId: 'r10', location: 'Corrales Ave, Cagayan de Oro City', province: 'Misamis Oriental', type: 'private', color: 'from-blue-700 to-indigo-800', popularMajors: ['BS Nursing', 'BS Accountancy', 'BS Agriculture', 'BS Civil Engineering'], stats: { students: '3200+', tutors: '12', groups: '6' } },
  { id: 'lmu', name: 'Lourdes College', shortName: 'LC CDO', regionId: 'r10', location: 'Capistrano St, Cagayan de Oro', province: 'Misamis Oriental', type: 'private', color: 'from-rose-600 to-red-700', popularMajors: ['BS Nursing', 'BS Education', 'BS Hospitality Management'], stats: { students: '1600+', tutors: '5', groups: '2' } },
  { id: 'lcc_iligan', name: 'Liceo de Cagayan University', shortName: 'Liceo CDO', regionId: 'r10', location: 'Rodolfo N. Pelaez Blvd, CDO', province: 'Misamis Oriental', type: 'private', color: 'from-green-600 to-teal-700', popularMajors: ['BS Nursing', 'Doctor of Medicine', 'BS Education', 'BS Criminology'], stats: { students: '2600+', tutors: '8', groups: '4' } },

  // ═══════════════════════════════════════════════════════════════════
  // REGION XI — DAVAO REGION
  // ═══════════════════════════════════════════════════════════════════

  // --- Public ---
  { id: 'upmin', name: 'University of the Philippines Mindanao', shortName: 'UP Mindanao', regionId: 'r11', location: 'Mintal, Tugbok District, Davao City', province: 'Davao del Sur', type: 'public', color: 'from-rose-800 to-red-900', popularMajors: ['BS Applied Mathematics', 'BS Food Technology', 'BS Biology', 'BS Computer Science'], stats: { students: '1600+', tutors: '8', groups: '4' } },
  { id: 'usep', name: 'University of Southeastern Philippines', shortName: 'USeP Davao', regionId: 'r11', location: 'Iñigo St, Obrero, Davao City', province: 'Davao del Sur', type: 'public', color: 'from-green-700 to-emerald-800', popularMajors: ['BS Education', 'BS Engineering', 'BS Agriculture', 'BS Information Technology'], stats: { students: '4500+', tutors: '14', groups: '7' } },
  { id: 'dpsu', name: 'Davao del Norte State College', shortName: 'DNSC Panabo', regionId: 'r11', location: 'Panabo City, Davao del Norte', province: 'Davao del Norte', type: 'public', color: 'from-teal-600 to-green-700', popularMajors: ['BS Education', 'BS Agriculture', 'BS Criminology'], stats: { students: '1800+', tutors: '5', groups: '2' } },
  { id: 'dorsu', name: 'Davao Oriental State University', shortName: 'DOrSU Mati', regionId: 'r11', location: 'Mati, Davao Oriental', province: 'Davao Oriental', type: 'public', color: 'from-blue-600 to-indigo-700', popularMajors: ['BS Agriculture', 'BS Education', 'BS Fisheries'], stats: { students: '1600+', tutors: '4', groups: '2' } },
  { id: 'spsc', name: 'Southern Philippines Agri-Business and Marine and Aquatic School of Technology', shortName: 'SPAMAST Malita', regionId: 'r11', location: 'Malita, Davao Occidental', province: 'Davao Occidental', type: 'public', color: 'from-emerald-600 to-teal-700', popularMajors: ['BS Agriculture', 'BS Fisheries', 'BS Education'], stats: { students: '1200+', tutors: '3', groups: '2' } },

  // --- Private ---
  { id: 'addu', name: 'Ateneo de Davao University', shortName: 'Ateneo de Davao', regionId: 'r11', location: 'Jacinto St, Davao City', province: 'Davao del Sur', type: 'private', color: 'from-blue-600 to-sky-700', popularMajors: ['BS Computer Science', 'BS Accountancy', 'BS Nursing', 'BS Psychology'], stats: { students: '3500+', tutors: '14', groups: '7' } },
  { id: 'um', name: 'University of Mindanao', shortName: 'UM Davao', regionId: 'r11', location: 'Bolton St, Davao City', province: 'Davao del Sur', type: 'private', color: 'from-red-600 to-rose-700', popularMajors: ['BS Accountancy', 'BS Criminology', 'BS Education', 'Juris Doctor / Law'], stats: { students: '4200+', tutors: '14', groups: '7' } },
  { id: 'hk', name: 'Holy Cross of Davao College', shortName: 'HCDC Davao', regionId: 'r11', location: 'Sta. Ana Ave, Davao City', province: 'Davao del Sur', type: 'private', color: 'from-amber-600 to-orange-700', popularMajors: ['BS Nursing', 'BS Education', 'BS Accountancy'], stats: { students: '2200+', tutors: '6', groups: '3' } },
  { id: 'phinma_dcc', name: 'PHINMA - Davao Doctors College', shortName: 'PHINMA DDC', regionId: 'r11', location: 'Gen. Malvar St, Davao City', province: 'Davao del Sur', type: 'private', color: 'from-green-600 to-emerald-700', popularMajors: ['BS Nursing', 'BS Physical Therapy', 'BS Medical Technology'], stats: { students: '1800+', tutors: '6', groups: '3' } },
  { id: 'smu_davao', name: 'San Pedro College', shortName: 'SPC Davao', regionId: 'r11', location: 'A. Mabini St, Davao City', province: 'Davao del Sur', type: 'private', color: 'from-purple-600 to-violet-700', popularMajors: ['BS Nursing', 'BS Physical Therapy', 'BS Pharmacy'], stats: { students: '1600+', tutors: '5', groups: '2' } },

  // ═══════════════════════════════════════════════════════════════════
  // REGION XII — SOCCSKSARGEN
  // ═══════════════════════════════════════════════════════════════════

  // --- Public ---
  { id: 'msu_gensan', name: 'Mindanao State University - General Santos City', shortName: 'MSU GenSan', regionId: 'r12', location: 'Fatima, General Santos City', province: 'South Cotabato', type: 'public', color: 'from-green-700 to-emerald-800', popularMajors: ['BS Fisheries', 'BS Education', 'BS Agriculture', 'BS Information Technology'], stats: { students: '2800+', tutors: '8', groups: '4' } },
  { id: 'usm', name: 'University of Southern Mindanao', shortName: 'USM Kabacan', regionId: 'r12', location: 'Kabacan, Cotabato', province: 'Cotabato', type: 'public', color: 'from-teal-600 to-green-700', popularMajors: ['BS Agriculture', 'BS Veterinary Medicine', 'BS Education', 'BS Engineering'], stats: { students: '3500+', tutors: '10', groups: '5' } },
  { id: 'sksu', name: 'Sultan Kudarat State University', shortName: 'SKSU Tacurong', regionId: 'r12', location: 'Tacurong City, Sultan Kudarat', province: 'Sultan Kudarat', type: 'public', color: 'from-blue-600 to-indigo-700', popularMajors: ['BS Agriculture', 'BS Education', 'BS Fisheries'], stats: { students: '2200+', tutors: '6', groups: '3' } },
  { id: 'cpsu', name: 'Cotabato Foundation College of Science and Technology', shortName: 'CFCST Kidapawan', regionId: 'r12', location: 'Kidapawan City, Cotabato', province: 'Cotabato', type: 'public', color: 'from-amber-600 to-yellow-700', popularMajors: ['BS Education', 'BS Agriculture', 'BS Engineering'], stats: { students: '2000+', tutors: '6', groups: '3' } },
  { id: 'sssc', name: 'Sarangani State College', shortName: 'SSC Alabel', regionId: 'r12', location: 'Alabel, Sarangani', province: 'Sarangani', type: 'public', color: 'from-sky-600 to-blue-700', popularMajors: ['BS Education', 'BS Information Technology', 'BS Agriculture'], stats: { students: '1200+', tutors: '3', groups: '2' } },

  // --- Private ---
  { id: 'nd_gensan', name: 'Notre Dame of Dadiangas University', shortName: 'NDDU GenSan', regionId: 'r12', location: 'Marist Ave, General Santos City', province: 'South Cotabato', type: 'private', color: 'from-blue-700 to-indigo-800', popularMajors: ['BS Nursing', 'BS Accountancy', 'BS Education', 'BS Information Technology'], stats: { students: '3000+', tutors: '10', groups: '5' } },
  { id: 'nd_cotabato', name: 'Notre Dame University - Cotabato', shortName: 'NDU Cotabato', regionId: 'r12', location: 'Cotabato City', province: 'Cotabato', type: 'private', color: 'from-green-600 to-emerald-700', popularMajors: ['BS Nursing', 'BS Education', 'BS Engineering'], stats: { students: '2200+', tutors: '6', groups: '3' } },

  // ═══════════════════════════════════════════════════════════════════
  // REGION XIII — CARAGA
  // ═══════════════════════════════════════════════════════════════════

  // --- Public ---
  { id: 'csu_car', name: 'Caraga State University', shortName: 'CSU Butuan', regionId: 'r13', location: 'Ampayon, Butuan City', province: 'Agusan del Norte', type: 'public', color: 'from-green-700 to-emerald-800', popularMajors: ['BS Agriculture', 'BS Engineering', 'BS Education', 'BS Information Technology'], stats: { students: '3200+', tutors: '10', groups: '5' } },
  { id: 'ssct_sur', name: 'Surigao del Sur State University', shortName: 'SDSSU Tandag', regionId: 'r13', location: 'Tandag City, Surigao del Sur', province: 'Surigao del Sur', type: 'public', color: 'from-teal-600 to-green-700', popularMajors: ['BS Education', 'BS Agriculture', 'BS Information Technology'], stats: { students: '2000+', tutors: '6', groups: '3' } },
  { id: 'snsu', name: 'Surigao State College of Technology', shortName: 'SSCT Surigao', regionId: 'r13', location: 'Surigao City, Surigao del Norte', province: 'Surigao del Norte', type: 'public', color: 'from-blue-600 to-indigo-700', popularMajors: ['BS Mining Engineering', 'BS Education', 'BS Information Technology'], stats: { students: '2400+', tutors: '6', groups: '3' } },
  { id: 'asc', name: 'Agusan del Sur State College of Agriculture and Technology', shortName: 'ASSCAT San Francisco', regionId: 'r13', location: 'San Francisco, Agusan del Sur', province: 'Agusan del Sur', type: 'public', color: 'from-amber-600 to-yellow-700', popularMajors: ['BS Agriculture', 'BS Education', 'BS Criminology'], stats: { students: '1400+', tutors: '4', groups: '2' } },

  // --- Private ---
  { id: 'fc', name: 'Father Saturnino Urios University', shortName: 'FSUU Butuan', regionId: 'r13', location: 'San Francisco St, Butuan City', province: 'Agusan del Norte', type: 'private', color: 'from-blue-700 to-indigo-800', popularMajors: ['BS Accountancy', 'BS Education', 'BS Nursing', 'BS Psychology'], stats: { students: '2400+', tutors: '8', groups: '4' } },
  { id: 'sjit', name: 'Saint Joseph Institute of Technology', shortName: 'SJIT Butuan', regionId: 'r13', location: 'Montilla Blvd, Butuan City', province: 'Agusan del Norte', type: 'private', color: 'from-red-600 to-rose-700', popularMajors: ['BS Engineering', 'BS Computer Science', 'BS Information Technology'], stats: { students: '1600+', tutors: '5', groups: '2' } },

  // ═══════════════════════════════════════════════════════════════════
  // BARMM — BANGSAMORO AUTONOMOUS REGION IN MUSLIM MINDANAO
  // ═══════════════════════════════════════════════════════════════════

  // --- Public ---
  { id: 'msu_marawi', name: 'Mindanao State University - Main Campus', shortName: 'MSU Marawi', regionId: 'barmm', location: 'Marawi City, Lanao del Sur', province: 'Lanao del Sur', type: 'public', color: 'from-green-700 to-emerald-800', popularMajors: ['BS Agriculture', 'BS Education', 'BS Engineering', 'BS Public Administration'], stats: { students: '5000+', tutors: '14', groups: '7' } },
  { id: 'msu_tcto', name: 'Mindanao State University - Tawi-Tawi College of Technology and Oceanography', shortName: 'MSU-TCTO', regionId: 'barmm', location: 'Sanga-Sanga, Bongao, Tawi-Tawi', province: 'Tawi-Tawi', type: 'public', color: 'from-teal-600 to-cyan-700', popularMajors: ['BS Marine Biology', 'BS Fisheries', 'BS Education'], stats: { students: '1200+', tutors: '3', groups: '2' } },
  { id: 'msu_sulu', name: 'Mindanao State University - Sulu', shortName: 'MSU Sulu', regionId: 'barmm', location: 'Jolo, Sulu', province: 'Sulu', type: 'public', color: 'from-blue-600 to-indigo-700', popularMajors: ['BS Education', 'BS Agriculture', 'BS Public Administration'], stats: { students: '1500+', tutors: '4', groups: '2' } },
  { id: 'msu_maguindanao', name: 'Mindanao State University - Maguindanao', shortName: 'MSU Maguindanao', regionId: 'barmm', location: 'Dalican, Datu Odin Sinsuat, Maguindanao', province: 'Maguindanao', type: 'public', color: 'from-emerald-600 to-green-700', popularMajors: ['BS Agriculture', 'BS Education', 'BS Information Technology'], stats: { students: '1800+', tutors: '5', groups: '2' } },
  { id: 'cpmc', name: 'Cotabato City State Polytechnic College', shortName: 'CCSPC Cotabato', regionId: 'barmm', location: 'Cotabato City', province: 'Maguindanao', type: 'public', color: 'from-amber-600 to-yellow-700', popularMajors: ['BS Education', 'BS Engineering', 'BS Information Technology'], stats: { students: '2200+', tutors: '6', groups: '3' } },
  { id: 'apc_basilan', name: 'Basilan State College', shortName: 'BasSC Isabela', regionId: 'barmm', location: 'Isabela City, Basilan', province: 'Basilan', type: 'public', color: 'from-sky-600 to-blue-700', popularMajors: ['BS Education', 'BS Fisheries', 'BS Agriculture'], stats: { students: '1000+', tutors: '3', groups: '1' } },

  // --- Private ---
  { id: 'ndmc', name: 'Notre Dame of Marbel University', shortName: 'NDMU Koronadal', regionId: 'barmm', location: 'Koronadal, South Cotabato', province: 'South Cotabato', type: 'private', color: 'from-blue-700 to-indigo-800', popularMajors: ['BS Nursing', 'BS Education', 'BS Information Technology'], stats: { students: '2000+', tutors: '6', groups: '3' } },
  { id: 'ndj', name: 'Notre Dame of Jolo College', shortName: 'NDJ Jolo', regionId: 'barmm', location: 'Jolo, Sulu', province: 'Sulu', type: 'private', color: 'from-green-600 to-emerald-700', popularMajors: ['BS Education', 'BS Nursing', 'BS Information Technology'], stats: { students: '800+', tutors: '2', groups: '1' } }
];

export const SUBJECT_CATEGORIES = [
  'All Subjects',
  'STEM & Mathematics',
  'Science & Life Sciences',
  'Health Sciences & Nursing',
  'Engineering & Architecture',
  'IT & Computing',
  'Business & Accountancy',
  'Education & Teacher Training',
  'Social Sciences & Languages',
  'Agriculture & Fisheries',
  'Law & Public Administration',
  'Arts, Humanities & Communication'
];
