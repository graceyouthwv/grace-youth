export const INITIAL_TUTORS = [
  {
    id: 'tut-1',
    name: 'Joshua Alcantara',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    role: 'Peer Tutor (4th Year Applied Math)',
    campusId: 'upv',
    campusName: 'UP Visayas (Miagao)',
    subjects: ['Calculus 1', 'Calculus 2', 'Linear Algebra', 'Math 17'],
    category: 'STEM & Math',
    rating: 5.0,
    sessionsGiven: 28,
    badge: 'Senior Peer Mentor',
    bio: 'UPV Math major. Love breaking down complex derivatives and praying with tutees before exam week.',
    preferredMode: 'Hybrid (In-Person CAS / Google Meet)',
    slots: [
      { day: 'Tuesday', time: '4:00 PM - 5:30 PM', mode: 'In-Person (CAS Gazebo)' },
      { day: 'Thursday', time: '5:00 PM - 6:30 PM', mode: 'Online (Google Meet)' },
      { day: 'Saturday', time: '10:00 AM - 11:30 AM', mode: 'Online (Google Meet)' }
    ]
  },
  {
    id: 'tut-2',
    name: 'Janelle Marie Tan',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    role: 'Peer Tutor (3rd Year Fisheries & Aquatic Sciences)',
    campusId: 'isufst',
    campusName: 'ISUFST (Tiwi / Barotac Nuevo)',
    subjects: ['Marine Ecology', 'General Chemistry', 'Fisheries Oceanography', 'Biostatistics'],
    category: 'Science & Fisheries',
    rating: 4.9,
    sessionsGiven: 19,
    badge: 'ISUFST Life Group Leader',
    bio: 'ISUFST Fisheries scholar passionate about marine conservation, faith in science, and encouraging freshmen.',
    preferredMode: 'Hybrid (ISUFST Library / Online)',
    slots: [
      { day: 'Monday', time: '3:30 PM - 5:00 PM', mode: 'In-Person (ISUFST Campus)' },
      { day: 'Wednesday', time: '4:00 PM - 5:30 PM', mode: 'Online (Google Meet)' }
    ]
  },
  {
    id: 'tut-3',
    name: 'Keziah Hope Bedia',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    role: 'Peer Tutor (3rd Year Nursing)',
    campusId: 'wvsu',
    campusName: 'WVSU (La Paz)',
    subjects: ['Anatomy & Physiology', 'Pharmacology', 'Microbiology', 'Nursing Care Plans'],
    category: 'Health Sciences',
    rating: 5.0,
    sessionsGiven: 32,
    badge: 'Dean\'s Lister & Mentor',
    bio: 'WVSU Nursing student. Let\'s conquer Anaphy mnemonics and pray over hospital duty stress together!',
    preferredMode: 'In-Person (WVSU College of Nursing / Library)',
    slots: [
      { day: 'Wednesday', time: '5:00 PM - 6:30 PM', mode: 'In-Person (WVSU Library)' },
      { day: 'Friday', time: '4:00 PM - 5:30 PM', mode: 'In-Person (CON Study Hub)' }
    ]
  },
  {
    id: 'tut-4',
    name: 'Ezekiel Bryan Diaz',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Peer Tutor (4th Year Civil Engineering)',
    campusId: 'cpu',
    campusName: 'CPU (Jaro)',
    subjects: ['Statics of Rigid Bodies', 'Differential Equations', 'Structural Theory', 'Physics for Eng'],
    category: 'Engineering',
    rating: 4.8,
    sessionsGiven: 22,
    badge: 'CPU Campus Youth Leader',
    bio: 'Civil Eng senior at CPU. Passionate about structures, stress analysis, and building faith foundations.',
    preferredMode: 'Hybrid (CPU Halfmoon Drive / Discord)',
    slots: [
      { day: 'Tuesday', time: '5:30 PM - 7:00 PM', mode: 'In-Person (CPU Gazebo)' },
      { day: 'Thursday', time: '6:00 PM - 7:30 PM', mode: 'Online (Discord / Meet)' }
    ]
  },
  {
    id: 'tut-5',
    name: 'Alyssa Mae Cordero',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Peer Tutor (3rd Year Computer Science)',
    campusId: 'isatu',
    campusName: 'ISAT-U (La Paz)',
    subjects: ['Data Structures & Algorithms', 'Python Programming', 'Web Dev (React)', 'Discrete Math'],
    category: 'IT & Computing',
    rating: 5.0,
    sessionsGiven: 16,
    badge: 'Code & Christ Facilitator',
    bio: 'ISAT-U CompSci junior. Let\'s debug your code and find God\'s peace during tech project crunches!',
    preferredMode: 'Online (Google Meet / Screen Share)',
    slots: [
      { day: 'Monday', time: '6:00 PM - 7:30 PM', mode: 'Online (Google Meet)' },
      { day: 'Friday', time: '5:00 PM - 6:30 PM', mode: 'Online (Google Meet)' }
    ]
  }
];
