// src/data/tutors.js
// Peer Tutors with Regional Affiliation and Online/F2F Modality Settings

export const INITIAL_TUTORS = [
  {
    id: 'tutor-1',
    name: 'Joshua Alcantara',
    role: 'Volunteer Peer Tutor (BS Math, 4th Year)',
    email: 'joshua@graceyouth.ph',
    campusId: 'upv',
    campusName: 'UP Visayas (Miagao)',
    regionId: 'r6',
    regionName: 'Region VI (Western Visayas)',
    rating: 4.9,
    category: 'STEM & Math',
    badge: 'Calculus & Physics Specialist',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    bio: 'Dedicated to helping students ace Math & Physics with step-by-step problem sets and Christ-centered encouragement. Available online nationwide!',
    subjects: ['Calculus 1 & 2', 'Algebra', 'Trigonometry', 'General Physics'],
    preferredMode: 'Hybrid', // 'Online' | 'In-Person' | 'Hybrid'
    isOnlineNationwide: true,
    isApproved: true,
    status: 'Active',
    slots: [
      { id: 'slot-1a', day: 'Tuesday', time: '4:00 PM - 5:30 PM', mode: 'In-Person (CAS Gazebo, UPV)' },
      { id: 'slot-1b', day: 'Thursday', time: '5:00 PM - 6:30 PM', mode: 'Online (Open Nationwide via Google Meet)' },
      { id: 'slot-1c', day: 'Saturday', time: '10:00 AM - 11:30 AM', mode: 'Online (Zoom / Meet)' }
    ]
  },
  {
    id: 'tutor-2',
    name: 'Hannah Grace Villaruel',
    role: 'Peer Reviewer (BS Nursing, 3rd Year)',
    email: 'hannah@graceyouth.ph',
    campusId: 'wvsu',
    campusName: 'West Visayas State University (La Paz)',
    regionId: 'r6',
    regionName: 'Region VI (Western Visayas)',
    rating: 5.0,
    category: 'Health Sciences & Nursing',
    badge: 'Anatomy & Board Exam Prep',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    bio: 'Nursing honor student ready to help younger batchmates master AnaPhy concepts, pharmacology dosage calculations, and prayerful focus.',
    subjects: ['Anatomy & Physiology', 'Pharmacology', 'Health Assessment', 'Microbiology'],
    preferredMode: 'Hybrid',
    isOnlineNationwide: true,
    isApproved: true,
    status: 'Active',
    slots: [
      { id: 'slot-2a', day: 'Wednesday', time: '3:30 PM - 5:00 PM', mode: 'In-Person (WVSU Library)' },
      { id: 'slot-2b', day: 'Friday', time: '4:00 PM - 5:30 PM', mode: 'Online (Google Meet - Open Nationwide)' }
    ]
  },
  {
    id: 'tutor-3',
    name: 'Christian Mark Tan',
    role: 'Peer Tutor (BS Fisheries & Marine Bio, 4th Year)',
    email: 'christian@graceyouth.ph',
    campusId: 'isufst',
    campusName: 'ISUFST (Barotac Nuevo & Tiwi)',
    regionId: 'r6',
    regionName: 'Region VI (Western Visayas)',
    rating: 4.8,
    category: 'Science & Fisheries',
    badge: 'Chemistry & Biology Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Passionate about coastal science and chemistry! Guiding students through lab reports, reaction equations, and spiritual growth.',
    subjects: ['General Chemistry', 'Organic Chemistry', 'Marine Biology', 'Biochemistry'],
    preferredMode: 'Hybrid',
    isOnlineNationwide: true,
    isApproved: true,
    status: 'Active',
    slots: [
      { id: 'slot-3a', day: 'Monday', time: '4:00 PM - 5:30 PM', mode: 'In-Person (ISUFST Tiwi Study Hub)' },
      { id: 'slot-3b', day: 'Wednesday', time: '5:00 PM - 6:30 PM', mode: 'Online (Open Nationwide via Google Meet)' }
    ]
  },
  {
    id: 'tutor-4',
    name: 'Patricia Marie Lopez',
    role: 'Peer Reviewer (BS Accountancy, 3rd Year)',
    email: 'patricia@graceyouth.ph',
    campusId: 'cpu',
    campusName: 'Central Philippine University (Jaro)',
    regionId: 'r6',
    regionName: 'Region VI (Western Visayas)',
    rating: 4.9,
    category: 'Business & Accountancy',
    badge: 'Financial Accounting Whiz',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Helping students conquer Financial Accounting, debits/credits, and balance sheet reconciliation with peace and diligence.',
    subjects: ['Financial Accounting', 'Cost Accounting', 'Business Math', 'Economics'],
    preferredMode: 'Hybrid',
    isOnlineNationwide: true,
    isApproved: true,
    status: 'Active',
    slots: [
      { id: 'slot-4a', day: 'Tuesday', time: '3:00 PM - 4:30 PM', mode: 'In-Person (CPU Halfmoon Lounge)' },
      { id: 'slot-4b', day: 'Thursday', time: '4:30 PM - 6:00 PM', mode: 'Online (Google Meet - Nationwide)' }
    ]
  },
  {
    id: 'tutor-5',
    name: 'Elijah David Ramos',
    role: 'Peer Tutor (BS Information Tech, 3rd Year)',
    email: 'elijah@graceyouth.ph',
    campusId: 'isatu',
    campusName: 'ISAT-U (La Paz)',
    regionId: 'r6',
    regionName: 'Region VI (Western Visayas)',
    rating: 5.0,
    category: 'IT & Computing',
    badge: 'Code & Algorithms Mentor',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    bio: 'ISAT-U coder ready to debug code, explain data structures, and pray for your programming lab submissions. 100% Online Nationwide!',
    subjects: ['Python Programming', 'Data Structures & Algorithms', 'Discrete Math', 'Web Dev'],
    preferredMode: 'Online',
    isOnlineNationwide: true,
    isApproved: true,
    status: 'Active',
    slots: [
      { id: 'slot-5a', day: 'Monday', time: '6:00 PM - 7:30 PM', mode: 'Online (Discord / Google Meet - Open Nationwide)' },
      { id: 'slot-5b', day: 'Friday', time: '6:00 PM - 7:30 PM', mode: 'Online (Google Meet)' }
    ]
  },
  {
    id: 'tutor-6',
    name: 'Nathaniel Ray Santos',
    role: 'Peer Tutor (BS Computer Science, 4th Year)',
    email: 'nathaniel@graceyouth.ph',
    campusId: 'upd',
    campusName: 'UP Diliman',
    regionId: 'ncr',
    regionName: 'National Capital Region (NCR)',
    rating: 4.9,
    category: 'IT & Computing',
    badge: 'Algorithms & Full-Stack Mentor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bio: 'UP Diliman CS senior offering nationwide online tutoring in Algorithms, C++, Java, and Data Science, with a heart to mentor in faith.',
    subjects: ['Data Structures & C++', 'Algorithms', 'Java OOP', 'Discrete Math'],
    preferredMode: 'Online',
    isOnlineNationwide: true,
    isApproved: true,
    status: 'Active',
    slots: [
      { id: 'slot-6a', day: 'Wednesday', time: '7:00 PM - 8:30 PM', mode: 'Online (Discord & Google Meet)' },
      { id: 'slot-6b', day: 'Saturday', time: '2:00 PM - 3:30 PM', mode: 'Online (Google Meet)' }
    ]
  },
  {
    id: 'tutor-7',
    name: 'Keziah Hope Tan',
    role: 'Peer Reviewer (BS Medical Technology, 3rd Year)',
    email: 'keziah@graceyouth.ph',
    campusId: 'usc',
    campusName: 'University of San Carlos (Cebu)',
    regionId: 'r7',
    regionName: 'Region VII (Central Visayas)',
    rating: 5.0,
    category: 'Health Sciences & Nursing',
    badge: 'Clinical Chemistry & Hematology Lead',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    bio: 'USC Cebu MedTech student offering high-yield clinical chemistry and micro review for students nationwide online, plus in-person at USC Talamban.',
    subjects: ['Clinical Chemistry', 'Hematology', 'Immunology & Serology', 'Parasitology'],
    preferredMode: 'Hybrid',
    isOnlineNationwide: true,
    isApproved: true,
    status: 'Active',
    slots: [
      { id: 'slot-7a', day: 'Tuesday', time: '5:00 PM - 6:30 PM', mode: 'Online (Zoom / Meet Nationwide)' },
      { id: 'slot-7b', day: 'Thursday', time: '3:30 PM - 5:00 PM', mode: 'In-Person (USC Talamban Library)' }
    ]
  },
  {
    id: 'tutor-8',
    name: 'Caleb Joshua Dizon',
    role: 'Peer Tutor (BS Civil Engineering, 4th Year)',
    email: 'caleb@graceyouth.ph',
    campusId: 'msuiit',
    campusName: 'MSU-IIT (Iligan City)',
    regionId: 'r10',
    regionName: 'Region X (Northern Mindanao)',
    rating: 4.8,
    category: 'Engineering & Architecture',
    badge: 'Statics & Structural Theory Guide',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    bio: 'Passionate about engineering mechanics, beam deflection, and discipleship across Mindanao and all Philippine engineering students online.',
    subjects: ['Engineering Mechanics', 'Strength of Materials', 'Theory of Structures', 'Integral Calculus'],
    preferredMode: 'Hybrid',
    isOnlineNationwide: true,
    isApproved: true,
    status: 'Active',
    slots: [
      { id: 'slot-8a', day: 'Monday', time: '5:30 PM - 7:00 PM', mode: 'Online (Open Nationwide via Meet)' },
      { id: 'slot-8b', day: 'Saturday', time: '9:00 AM - 10:30 AM', mode: 'In-Person (MSU-IIT Study Center)' }
    ]
  }
];
