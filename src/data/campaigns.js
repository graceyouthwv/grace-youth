export const INITIAL_CAMPAIGNS = [
  {
    id: 'camp-1',
    title: 'Grace Youth Camp 2026: Student Sponsorship Fund',
    category: 'Youth Camp',
    campusId: 'all',
    campusName: 'All Iloilo Campuses',
    targetAmount: 60000,
    raisedAmount: 43500,
    donorsCount: 38,
    deadline: 'Oct 30, 2026',
    image: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=600&auto=format&fit=crop&q=80',
    description: 'Help sponsor 50 deserving freshmen and peer tutees from ISUFST, UPV, CPU, and WVSU for a transformative 3-day spiritual retreat in Guimaras.',
    tiers: [
      { amount: 500, label: 'Camp Kit & Bible Study Guide' },
      { amount: 1200, label: 'Full Student Camp Sponsorship (Meals + Lodging)' },
      { amount: 3600, label: 'Sponsor a 3-Person Campus Dorm Group' }
    ],
    recentDonors: [
      { name: 'Ate Joy (Alumna)', amount: 2400, message: 'Praying for hearts to be touched by God!', time: '2 hours ago' },
      { name: 'Anonymous Centralian', amount: 1200, message: 'For the next generation of campus leaders!', time: '5 hours ago' },
      { name: 'Kuya Mark', amount: 500, message: 'God bless Grace Youth!', time: '1 day ago' }
    ]
  },
  {
    id: 'camp-2',
    title: 'Midterm Exam Packs & Free Coffee Pop-Up Outreach',
    category: 'Campus Outreach',
    campusId: 'isufst',
    campusName: 'ISUFST (Barotac Nuevo & Tiwi)',
    targetAmount: 15000,
    raisedAmount: 11200,
    donorsCount: 22,
    deadline: 'Sept 25, 2026',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80',
    description: 'Providing 300 free brewed coffees, high-yield formula cheatsheets, snacks, and personalized prayer notes for ISUFST students during exam week.',
    tiers: [
      { amount: 250, label: '5 Exam Packs + Prayer Cards' },
      { amount: 500, label: '10 Cold Brew Coffees & Reviewers' },
      { amount: 1500, label: 'Full Day Outreach Station Supplies' }
    ],
    recentDonors: [
      { name: 'ISUFST Faculty Partner', amount: 2000, message: 'Proud to support our hardworking students.', time: '1 day ago' },
      { name: 'UPV Life Group', amount: 1000, message: 'Cheering for our ISUFST brothers and sisters!', time: '2 days ago' }
    ]
  },
  {
    id: 'camp-3',
    title: 'Iloilo Citywide Campus Welcoming Night & Worship Jam',
    category: 'Youth Fellowship',
    campusId: 'cpu',
    campusName: 'CPU, WVSU, ISAT-U & USA',
    targetAmount: 35000,
    raisedAmount: 22800,
    donorsCount: 29,
    deadline: 'Nov 15, 2026',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80',
    description: 'An acoustic worship night and fellowship dinner welcoming over 200 college freshmen into local campus life groups and Christian community.',
    tiers: [
      { amount: 350, label: 'Welcoming Dinner for 2 Freshmen' },
      { amount: 1000, label: 'Worship Jam Audio & Venue Aid' },
      { amount: 2500, label: 'Life Group Welcome Gift Packs' }
    ],
    recentDonors: [
      { name: 'Grace Youth Alumni Network', amount: 5000, message: 'Excited for the harvest this semester!', time: '3 hours ago' },
      { name: 'Anonymous Student', amount: 350, message: 'Paid it forward!', time: '1 day ago' }
    ]
  }
];
