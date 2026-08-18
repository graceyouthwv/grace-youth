// src/data/bibleStudies.js
// Campus Life Groups & Discipleship Circles with Online Nationwide & Regional Scope

export const INITIAL_BIBLE_STUDIES = [
  {
    id: 'bs-grace-youth',
    title: 'Grace Youth Campus Circle',
    campusId: 'all',
    campusName: 'All Campuses (Online & Western Visayas)',
    regionId: 'r6',
    regionName: 'Region VI (Western Visayas & Nationwide)',
    meetingType: 'Hybrid', // 'Online' | 'In-Person' | 'Hybrid'
    isOpenNationwide: true,
    facilitator: 'Kuya Daniel Chavez',
    schedule: 'Every Friday, 5:00 PM - 6:30 PM',
    location: 'Campus Hub & Online (Google Meet - Nationwide)',
    topicCategory: 'Campus Faith, Purpose & Discipleship',
    currentMembers: 3,
    maxCapacity: 50,
    description: 'The official campus life group and discipleship family of Grace Youth. We meet weekly for heartfelt prayer, Bible reflections, authentic friendship, and encouragement throughout the semester. Open to all students nationwide via Online!',
    tags: ['Grace Youth', 'Discipleship', 'Online Nationwide', 'All Welcome'],
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80',
    members: [
      {
        id: 'mem-1',
        name: 'Kuya Daniel Chavez',
        email: 'worker@graceyouth.ph',
        campus: 'All Campuses',
        role: 'Facilitator / Youth Worker',
        yearLevel: 'Staff',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        joinedAt: 'Jan 2026'
      },
      {
        id: 'mem-2',
        name: 'Bea Claridad',
        email: 'bea@upv.edu.ph',
        campus: 'UP Visayas',
        role: 'Student Member',
        yearLevel: '2nd Year',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        joinedAt: 'Feb 2026'
      },
      {
        id: 'mem-3',
        name: 'Hannah Grace Villaruel',
        email: 'hannah@graceyouth.ph',
        campus: 'WVSU',
        role: 'Co-Facilitator',
        yearLevel: '3rd Year',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        joinedAt: 'Feb 2026'
      }
    ],
    chatMessages: [
      {
        id: 'msg-1',
        senderId: 'usr-worker-1',
        senderName: 'Kuya Daniel Chavez',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        senderRole: 'Youth Worker',
        message: 'Welcome everyone to the Grace Youth campus circle! We are starting our "Rooted in Faith" series this Friday. See you all at 5:00 PM! 🙏',
        timestamp: 'Yesterday at 4:30 PM',
        tag: 'Announcement'
      },
      {
        id: 'msg-2',
        senderId: 'usr-student-1',
        senderName: 'Bea Claridad',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        senderRole: 'Student Member',
        message: 'Excited for this! Looking forward to Friday fellowship and group prayer time!',
        timestamp: 'Yesterday at 5:15 PM',
        tag: 'Fellowship'
      }
    ],
    groupPrayers: [
      {
        id: 'g-pray-1',
        author: 'Bea Claridad',
        authorRole: 'Student Member',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        request: 'Please pray for peace and wisdom for my upcoming Biology practical exam on Thursday, and for balance with dorm chores.',
        category: 'Academics & Exams',
        createdAt: 'Yesterday',
        prayedCount: 6,
        isAnswered: false,
        encouragements: ['Praying for clarity and calm mind Bea!', 'You got this in Christ! Philippians 4:6-7']
      },
      {
        id: 'g-pray-2',
        author: 'Kuya Daniel Chavez',
        authorRole: 'Youth Worker',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        request: 'Praise report! Our nationwide campus initiative reached over 250 students across Luzon, Visayas, and Mindanao with free academic reviewers and prayer support!',
        category: 'Praise & Thanksgiving',
        createdAt: '2 days ago',
        prayedCount: 14,
        isAnswered: true,
        encouragements: ['Praise God for the fruit across the Philippines!']
      }
    ]
  },
  {
    id: 'bs-online-ph',
    title: 'PH Online Collegiate Fellowship',
    campusId: 'all',
    campusName: 'All Philippine Universities (Nationwide)',
    regionId: 'all',
    regionName: 'All Philippines (Nationwide)',
    meetingType: 'Online',
    isOpenNationwide: true,
    facilitator: 'Ate Keziah & Kuya Nathaniel',
    schedule: 'Every Saturday, 7:30 PM - 9:00 PM',
    location: 'Online via Discord & Google Meet',
    topicCategory: 'Navigating University Life & Christian Purpose',
    currentMembers: 18,
    maxCapacity: 60,
    description: 'A vibrant virtual discipleship hub connecting college & university students across NCR, Luzon, Visayas, and Mindanao. We share devotions, pray for academic breakthroughs, and grow together.',
    tags: ['Online Only', 'Nationwide', 'Discord Community', 'Prayer & Life'],
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80',
    members: [
      {
        id: 'mem-on-1',
        name: 'Nathaniel Ray Santos',
        email: 'nathaniel@graceyouth.ph',
        campus: 'UP Diliman',
        role: 'Facilitator',
        yearLevel: '4th Year',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        joinedAt: 'Jan 2026'
      },
      {
        id: 'mem-on-2',
        name: 'Keziah Hope Tan',
        email: 'keziah@graceyouth.ph',
        campus: 'USC Cebu',
        role: 'Co-Facilitator',
        yearLevel: '3rd Year',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        joinedAt: 'Jan 2026'
      }
    ],
    chatMessages: [
      {
        id: 'msg-on-1',
        senderId: 'usr-on-1',
        senderName: 'Nathaniel Ray Santos',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        senderRole: 'Facilitator',
        message: 'Welcome to our nationwide Saturday online circle! All college students from any region are warmly welcome. Drop a hi! 👋',
        timestamp: '2 days ago',
        tag: 'Announcement'
      }
    ],
    groupPrayers: [
      {
        id: 'g-pray-on-1',
        author: 'Keziah Hope Tan',
        authorRole: 'Student Member',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        request: 'Praying for students in midterms season nationwide, especially those juggling dorm finances and heavy thesis revisions.',
        category: 'Academics & Exams',
        createdAt: '1 day ago',
        prayedCount: 9,
        isAnswered: false,
        encouragements: ['Standing with you in prayer from Cebu!']
      }
    ]
  }
];

export const DISCIPLESHIP_STAGES = [
  {
    step: 1,
    title: 'Connect & Community',
    desc: 'Join a weekly campus or online life group circle anywhere in the Philippines.'
  },
  {
    step: 2,
    title: 'Foundations of Grace',
    desc: '4-week study on the Gospel, identity in Christ, and spiritual growth.'
  },
  {
    step: 3,
    title: 'Equipping & Leadership',
    desc: 'Learn to co-facilitate small groups, share the Gospel, and mentor peers.'
  },
  {
    step: 4,
    title: 'Campus & Online Multiplication',
    desc: 'Launch new peer circles and disciple the next generation of students.'
  }
];
