export const INITIAL_TUTORS = [
  {
    id: 'tutor-1',
    name: 'Joshua Alcantara',
    role: 'Volunteer Peer Tutor (BS Math, 4th Year)',
    email: 'joshua@graceyouth.ph',
    campusId: 'upv',
    campusName: 'UP Visayas (Miagao)',
    rating: 4.9,
    category: 'STEM & Math',
    badge: 'Calculus & Physics Specialist',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    bio: 'Dedicated to helping fellow UPV batchmates ace Math 17 and Physics with step-by-step problem sets and Christ-centered encouragement.',
    subjects: ['Calculus 1 & 2', 'Algebra', 'Trigonometry', 'General Physics'],
    preferredMode: 'Hybrid',
    slots: [
      { id: 'slot-1a', day: 'Tuesday', time: '4:00 PM - 5:30 PM', mode: 'In-Person (CAS Gazebo, UPV)' },
      { id: 'slot-1b', day: 'Thursday', time: '5:00 PM - 6:30 PM', mode: 'Online (Google Meet)' },
      { id: 'slot-1c', day: 'Saturday', time: '10:00 AM - 11:30 AM', mode: 'Hybrid' }
    ]
  },
  {
    id: 'tutor-2',
    name: 'Hannah Grace Villaruel',
    role: 'Peer Reviewer (BS Nursing, 3rd Year)',
    email: 'hannah@graceyouth.ph',
    campusId: 'wvsu',
    campusName: 'West Visayas State University (La Paz)',
    rating: 5.0,
    category: 'Health Sciences & Nursing',
    badge: 'Anatomy & Board Exam Prep',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    bio: 'WVSU Nursing honor student ready to help younger batchmates master AnaPhy concepts, pharmacology dosage calculations, and prayerful focus.',
    subjects: ['Anatomy & Physiology', 'Pharmacology', 'Health Assessment', 'Microbiology'],
    preferredMode: 'In-Person',
    slots: [
      { id: 'slot-2a', day: 'Wednesday', time: '3:30 PM - 5:00 PM', mode: 'In-Person (WVSU Library)' },
      { id: 'slot-2b', day: 'Friday', time: '4:00 PM - 5:30 PM', mode: 'In-Person (College of Nursing Lounge)' }
    ]
  },
  {
    id: 'tutor-3',
    name: 'Christian Mark Tan',
    role: 'Peer Tutor (BS Fisheries & Marine Bio, 4th Year)',
    email: 'christian@graceyouth.ph',
    campusId: 'isufst',
    campusName: 'ISUFST (Barotac Nuevo & Tiwi)',
    rating: 4.8,
    category: 'Science & Fisheries',
    badge: 'Chemistry & Biology Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Passionate about coastal science and chemistry! Guiding ISUFST students through lab reports, reaction equations, and spiritual growth.',
    subjects: ['General Chemistry', 'Organic Chemistry', 'Marine Biology', 'Biochemistry'],
    preferredMode: 'Hybrid',
    slots: [
      { id: 'slot-3a', day: 'Monday', time: '4:00 PM - 5:30 PM', mode: 'In-Person (ISUFST Tiwi Study Hub)' },
      { id: 'slot-3b', day: 'Wednesday', time: '5:00 PM - 6:30 PM', mode: 'Online (Google Meet)' }
    ]
  },
  {
    id: 'tutor-4',
    name: 'Patricia Marie Lopez',
    role: 'Peer Reviewer (BS Accountancy, 3rd Year)',
    email: 'patricia@graceyouth.ph',
    campusId: 'cpu',
    campusName: 'Central Philippine University (Jaro)',
    rating: 4.9,
    category: 'Business & Accountancy',
    badge: 'Financial Accounting Whiz',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Helping Centralians conquer Financial Accounting, debits/credits, and balance sheet reconciliation with peace and diligence.',
    subjects: ['Financial Accounting', 'Cost Accounting', 'Business Math', 'Economics'],
    preferredMode: 'Hybrid',
    slots: [
      { id: 'slot-4a', day: 'Tuesday', time: '3:00 PM - 4:30 PM', mode: 'In-Person (CPU Halfmoon Lounge)' },
      { id: 'slot-4b', day: 'Thursday', time: '4:30 PM - 6:00 PM', mode: 'Online (Google Meet)' }
    ]
  },
  {
    id: 'tutor-5',
    name: 'Elijah David Ramos',
    role: 'Peer Tutor (BS Information Tech, 3rd Year)',
    email: 'elijah@graceyouth.ph',
    campusId: 'isatu',
    campusName: 'ISAT-U (La Paz)',
    rating: 5.0,
    category: 'IT & Computing',
    badge: 'Code & Algorithms Mentor',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    bio: 'ISAT-U coder ready to debug code, explain data structures, and pray for your programming lab submissions.',
    subjects: ['Python Programming', 'Data Structures & Algorithms', 'Discrete Math', 'Web Dev'],
    preferredMode: 'Online',
    slots: [
      { id: 'slot-5a', day: 'Monday', time: '6:00 PM - 7:30 PM', mode: 'Online (Google Meet / Discord)' },
      { id: 'slot-5b', day: 'Friday', time: '6:00 PM - 7:30 PM', mode: 'Online (Google Meet)' }
    ]
  }
];
