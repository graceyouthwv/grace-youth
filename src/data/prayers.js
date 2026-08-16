export const INITIAL_PRAYERS = [
  {
    id: 'pray-1',
    author: 'ISUFST Freshman',
    isAnonymous: true,
    campusId: 'isufst',
    campusName: 'ISUFST (Barotac Nuevo)',
    category: 'Midterm Exams',
    content: 'First time staying in a boarding house far from my family in Estancia. Praying for peace of mind, budget management, and understanding my Fisheries Organic Chem lectures.',
    prayedCount: 34,
    hasPrayed: false,
    createdAt: '35 mins ago',
    type: 'prayer',
    commentsCount: 6
  },
  {
    id: 'pray-2',
    author: 'Bea Claridad',
    isAnonymous: false,
    campusId: 'upv',
    campusName: 'UP Visayas (Miagao)',
    category: 'Academics & Peace',
    content: 'Long lab practical exam in Comparative Anatomy this Friday. Praying against brain fog, anxiety, and trusting that God holds my future regardless of my exam scores.',
    prayedCount: 47,
    hasPrayed: true,
    createdAt: '2 hours ago',
    type: 'prayer',
    commentsCount: 9
  },
  {
    id: 'pray-3',
    author: 'WVSU Nursing Sophomore',
    isAnonymous: true,
    campusId: 'wvsu',
    campusName: 'WVSU (La Paz)',
    category: 'Praise & Thanksgiving',
    content: 'Praise God! Passed our major RLE revalida yesterday after weeks of intense sleepless review with my tutorial mentor! Thank you Grace Youth prayer warriors for praying!',
    prayedCount: 62,
    hasPrayed: false,
    createdAt: '5 hours ago',
    type: 'praise',
    commentsCount: 14
  },
  {
    id: 'pray-4',
    author: 'Angelo James',
    isAnonymous: false,
    campusId: 'cpu',
    campusName: 'CPU (Jaro)',
    category: 'Family & Finances',
    content: 'Please pray for my mother who is undergoing surgery this weekend in Iloilo Mission Hospital, and for financial provision for our engineering tuition fees.',
    prayedCount: 51,
    hasPrayed: true,
    createdAt: '1 day ago',
    type: 'prayer',
    commentsCount: 11
  }
];

export const PRAYER_CATEGORIES = [
  'All Needs',
  'Academics & Peace',
  'Midterm Exams',
  'Family & Finances',
  'Health & Healing',
  'Spiritual Growth',
  'Mental Clarity',
  'Praise & Thanksgiving'
];
