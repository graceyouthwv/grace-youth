export const INITIAL_BIBLE_STUDIES = [
  {
    id: 'bs-grace-youth',
    title: 'Grace Youth',
    campusId: 'all',
    campusName: 'All Iloilo Campuses (ISUFST, UPV, CPU, WVSU, ISAT-U, USA)',
    facilitator: 'Kuya Daniel Chavez',
    schedule: 'Every Friday, 5:00 PM - 6:30 PM',
    location: 'Campus Hub & Online (Hybrid)',
    topicCategory: 'Campus Faith, Purpose & Discipleship',
    currentMembers: 3,
    maxCapacity: 50,
    description: 'The official campus life group and discipleship family of Grace Youth. We meet weekly for heartfelt prayer, Bible reflections, authentic friendship, and encouragement throughout the semester.',
    tags: ['Grace Youth', 'Discipleship', 'Campus Life', 'All Welcome'],
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
        request: 'Praise report! Our midterm coffee giveaway at UPV Miagao and CPU reached over 120 students with free reviewers and gospel tracts!',
        category: 'Praise & Thanksgiving',
        createdAt: '2 days ago',
        prayedCount: 14,
        isAnswered: true,
        encouragements: ['Praise God for the fruit in Western Visayas!']
      }
    ]
  }
];

export const DISCIPLESHIP_STAGES = [
  {
    step: 1,
    title: 'Connect & Community',
    desc: 'Join a weekly campus life group circle in your university.'
  },
  {
    step: 2,
    title: 'Foundations of Grace',
    desc: '4-week study on the Gospel, identity in Christ, and spiritual growth.'
  },
  {
    step: 3,
    title: 'Equipping & Leadership',
    desc: 'Learn to co-facilitate small groups, share the Gospel, and pray for peers.'
  },
  {
    step: 4,
    title: 'Campus Multiplication',
    desc: 'Launch new peer circles and disciple the next generation of freshmen.'
  }
];
