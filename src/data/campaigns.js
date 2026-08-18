// src/data/campaigns.js
// Registration Events & Campus Gatherings Data Model

export const INITIAL_CAMPAIGNS = [
  {
    id: 'event-meet-greet-dec2026',
    title: 'December Citywide Meet & Greet and Youth Fellowship',
    campusId: 'all',
    campusName: 'All Iloilo Campuses (ISUFST, UPV, CPU, WVSU, ISAT-U, USA)',
    category: 'Youth Fellowship',
    date: 'Dec 18, 2026',
    time: '4:00 PM - 8:30 PM',
    venue: 'Iloilo City Youth Pavilion & Fellowship Grounds',
    registrationFee: 250, // ₱250 Admin set fee
    maxCapacity: 250,
    registeredCount: 38,
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80',
    description: 'Join over 200+ students from across Iloilo universities for a heart-warming year-end gathering featuring acoustic worship, dinner buffet, inspiring testimonies, and college peer connections.',
    highlights: [
      'Full Dinner Buffet & Freshmen Welcoming Pack included in registration',
      'Live Acoustic Worship & Campus Testimony Night',
      'College Life Group breakout sessions & spiritual mentor matching',
      'Exclusive Grace Youth 2026 Year-End Keepsake & Devotional Booklet'
    ],
    organizer: 'Grace Youth Campus Council',
    status: 'Open',
    paymentDetails: {
      gcashName: 'Grace Youth Ministry Inc.',
      gcashNumber: '0917-829-4501',
      mayaNumber: '0917-829-4501',
      cashOption: 'Cash on Arrival or to assigned Campus Youth Worker'
    },
    registrants: [
      {
        id: 'reg-001',
        name: 'Hannah Grace Villaruel',
        email: 'hannah.villaruel@upv.edu.ph',
        phone: '0918-234-5678',
        campus: 'UP Visayas (UPV Miagao)',
        yearProgram: 'BS Applied Mathematics (3rd Year)',
        dietaryOrNotes: 'None',
        paymentMethod: 'GCash',
        referenceNumber: 'GCASH-982347102',
        status: 'Confirmed',
        amountPaid: 250,
        registeredAt: 'Aug 14, 2026'
      },
      {
        id: 'reg-002',
        name: 'Joshua Caleb Ramos',
        email: 'joshua.ramos@cpu.edu.ph',
        phone: '0927-456-7890',
        campus: 'Central Philippine University (CPU)',
        yearProgram: 'BS Civil Engineering (2nd Year)',
        dietaryOrNotes: 'No seafood',
        paymentMethod: 'GCash',
        referenceNumber: 'GCASH-110293847',
        status: 'Confirmed',
        amountPaid: 250,
        registeredAt: 'Aug 15, 2026'
      },
      {
        id: 'reg-003',
        name: 'Ezekiel James Tan',
        email: 'ezekiel.tan@wvsu.edu.ph',
        phone: '0919-876-5432',
        campus: 'West Visayas State University (WVSU)',
        yearProgram: 'BS Nursing (4th Year)',
        dietaryOrNotes: 'None',
        paymentMethod: 'Cash on Arrival',
        referenceNumber: 'CASH-PENDING',
        status: 'Pending Verification',
        amountPaid: 250,
        registeredAt: 'Aug 16, 2026'
      },
      {
        id: 'reg-004',
        name: 'Faith Danielle Morales',
        email: 'faith.morales@isufst.edu.ph',
        phone: '0935-123-9988',
        campus: 'ISUFST (Dingle / Barotac)',
        yearProgram: 'BS Information Technology (1st Year)',
        dietaryOrNotes: 'Vegetarian option if available',
        paymentMethod: 'Maya',
        referenceNumber: 'MAYA-55421098',
        status: 'Confirmed',
        amountPaid: 250,
        registeredAt: 'Aug 17, 2026'
      }
    ]
  },
  {
    id: 'event-leadership-camp-2027',
    title: 'Western Visayas Campus Discipleship & Leadership Retreat',
    campusId: 'all',
    campusName: 'Guimaras / Iloilo Campgrounds',
    category: 'Leadership Retreat',
    date: 'Jan 22-24, 2027',
    time: '3 Days / 2 Nights',
    venue: 'Camp Sinai Mountain & Nature Sanctuary',
    registrationFee: 450,
    maxCapacity: 120,
    registeredCount: 22,
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800&auto=format&fit=crop&q=80',
    description: 'An intensive 3-day weekend retreat designed to equip student leaders and peer tutors with spiritual depth, Christ-centered leadership habits, and prayer rhythms for the new school term.',
    highlights: [
      'Cabin Lodging & 6 Full Meals included',
      'Leadership Workshop Modules & Mentorship Labs',
      'Campfire Prayer & Worship Under the Stars'
    ],
    organizer: 'Grace Youth Leadership Development',
    status: 'Open',
    paymentDetails: {
      gcashName: 'Grace Youth Ministry Inc.',
      gcashNumber: '0917-829-4501',
      mayaNumber: '0917-829-4501',
      cashOption: 'Cash to Campus Worker'
    },
    registrants: [
      {
        id: 'reg-101',
        name: 'Hannah Grace Villaruel',
        email: 'hannah.villaruel@upv.edu.ph',
        phone: '0918-234-5678',
        campus: 'UP Visayas (UPV Miagao)',
        yearProgram: 'BS Applied Mathematics',
        dietaryOrNotes: 'None',
        paymentMethod: 'GCash',
        referenceNumber: 'GCASH-77112233',
        status: 'Confirmed',
        amountPaid: 450,
        registeredAt: 'Aug 16, 2026'
      }
    ]
  }
];
