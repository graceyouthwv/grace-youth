export const INITIAL_BIBLE_STUDIES = [
  {
    id: 'bs-1',
    title: 'Grace Under Pressure: UPV Miagao Life Group',
    campusId: 'upv',
    campusName: 'UP Visayas (Miagao)',
    facilitator: 'Joshua Alcantara & Hannah Grace',
    schedule: 'Every Thursday, 5:30 PM - 6:45 PM',
    location: 'CAS Gazebo / Miagao Church Youth Room',
    topicCategory: 'Identity & Peace',
    currentMembers: 9,
    maxCapacity: 12,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
    description: 'A welcoming space for UPV freshmen and upperclassmen navigating high academic standards while anchoring in God\'s grace.',
    tags: ['Freshmen Welcome', 'Coffee & Snacks', 'Peer Prayer']
  },
  {
    id: 'bs-2',
    title: 'ISUFST Fisherfolk & Science Life Group',
    campusId: 'isufst',
    campusName: 'ISUFST (Barotac Nuevo / Tiwi)',
    facilitator: 'Janelle Marie Tan',
    schedule: 'Every Monday, 4:30 PM - 5:45 PM',
    location: 'ISUFST Student Lounge / Online Discord',
    topicCategory: 'Faith in Science',
    currentMembers: 7,
    maxCapacity: 10,
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=80',
    description: 'Connecting ISUFST fisheries, agriculture, and IT students for faith conversations, life sharing, and mutual academic support.',
    tags: ['Barotac Nuevo', 'Coastal Fellowship', 'Free Snacks']
  },
  {
    id: 'bs-3',
    title: 'Nursing & Healthcare Rest: WVSU Life Group',
    campusId: 'wvsu',
    campusName: 'WVSU (La Paz)',
    facilitator: 'Keziah Hope & Pastor Tim',
    schedule: 'Every Wednesday, 6:00 PM - 7:15 PM',
    location: 'WVSU College of Nursing Grounds / La Paz Hub',
    topicCategory: 'Hospital Duty & Peace',
    currentMembers: 11,
    maxCapacity: 15,
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80',
    description: 'Spiritual rest, mutual encouragement, and prayer for nursing, med tech, and pre-med students facing hectic shifts.',
    tags: ['Healthcare Students', 'Stress Relief', 'Dinner Fellowship']
  },
  {
    id: 'bs-4',
    title: 'CPU Centralians of Faith',
    campusId: 'cpu',
    campusName: 'CPU (Jaro)',
    facilitator: 'Ezekiel Bryan Diaz',
    schedule: 'Every Tuesday, 6:00 PM - 7:15 PM',
    location: 'CPU Halfmoon Drive Coffee Hub',
    topicCategory: 'Purpose & Vocation',
    currentMembers: 8,
    maxCapacity: 12,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
    description: 'Weekly fellowship for CPU engineering, IT, and business majors focusing on integrity, purpose, and Christian friendship.',
    tags: ['CPU Centralians', 'Exam Week Prayer', 'Community']
  },
  {
    id: 'bs-5',
    title: 'ISAT-U Tech & Creators Life Group',
    campusId: 'isatu',
    campusName: 'ISAT-U (La Paz)',
    facilitator: 'Alyssa Mae Cordero',
    schedule: 'Every Friday, 5:00 PM - 6:15 PM',
    location: 'ISAT-U Innovation Center / Online Meet',
    topicCategory: 'Living for Jesus in Tech',
    currentMembers: 6,
    maxCapacity: 12,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
    description: 'Fellowship for Computer Science, Engineering, and Architecture students at ISAT-U talking about faith and purpose.',
    tags: ['ISAT-U', 'Tech & Faith', 'Weekly Devotion']
  },
  {
    id: 'bs-6',
    title: 'San Agustin & Citywide College Life Group',
    campusId: 'usa',
    campusName: 'University of San Agustin (Iloilo City)',
    facilitator: 'Hannah Grace Dela Cruz',
    schedule: 'Every Saturday, 4:00 PM - 5:30 PM',
    location: 'General Luna St. Café / Youth Hub',
    topicCategory: 'Overcoming Anxiety',
    currentMembers: 10,
    maxCapacity: 14,
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&auto=format&fit=crop&q=80',
    description: 'Open to all Iloilo City university students (USA, WIT, PHINMA UI, SPUI, JBLFMU) seeking Christian community.',
    tags: ['Citywide', 'Youth Hub', 'Fellowship & Games']
  }
];

export const DISCIPLESHIP_STAGES = [
  {
    stage: 1,
    name: 'Discover & Connect',
    badge: 'Foundation',
    description: 'Meeting a peer tutor, experiencing prayer before academics, and discovering God\'s grace.',
    topics: ['Who is Jesus?', 'Grace vs Performance', 'Prayer in College'],
    action: 'Book first peer tutorial session'
  },
  {
    stage: 2,
    name: 'Belong & Grow',
    badge: 'Fellowship',
    description: 'Joining a weekly campus life group with fellow students from your university.',
    topics: ['Christian Community', 'Overcoming Stress', 'Bible Study Basics'],
    action: 'Join weekly campus life group'
  },
  {
    stage: 3,
    name: 'Equip & Serve',
    badge: 'Mentorship',
    description: 'Trained to facilitate peer tutorials, share your testimony, and pray for incoming freshmen.',
    topics: ['Gospel-First Tutoring', 'Leading Discussions', 'Personal Testimony'],
    action: 'Volunteer as a Peer Tutor'
  },
  {
    stage: 4,
    name: 'Multiply & Lead',
    badge: 'Leadership',
    description: 'Leading your own campus life group and raising the next batch of student leaders.',
    topics: ['Multiplying Disciples', 'Campus Outreach Strategy', 'Spiritual Care'],
    action: 'Launch a new Life Group'
  }
];
