// src/data/demoAccounts.js
// Verified Core Accounts & Data Model

export const DEMO_ACCOUNTS = [
  {
    id: 'usr-student-demo',
    name: 'Jassy Ramos',
    email: 'jassy@school.edu.ph',
    password: 'password123',
    role: 'student',
    roleLabel: 'College Student (BS Biology)',
    status: 'Active',
    isApproved: true,
    campusId: 'upv',
    campusName: 'UP Visayas (Miagao / Iloilo)',
    program: 'BS Biology',
    yearLevel: '2nd Year',
    subjects: ['General Biology', 'Organic Chemistry'],
    preferredMode: 'Hybrid',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Jassy&backgroundColor=6366f1',
    bio: '2nd Year BS Bio student finding study buddies & Life Groups!'
  },
  {
    id: 'usr-tutor-perry',
    name: 'Perry Santos',
    email: 'perry@graceyouth.ph',
    password: 'password123',
    role: 'tutor',
    roleLabel: 'Peer Tutor (Math & STEM)',
    status: 'Active',
    isApproved: true,
    campusId: 'upv',
    campusName: 'UP Visayas (Miagao / Iloilo)',
    program: 'BS Computer Science',
    yearLevel: '3rd Year',
    subjects: ['Math 53 Calculus 1', 'Math 54 Calculus 2', 'CMSC 21 Programming'],
    preferredMode: 'Hybrid',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Perry&backgroundColor=10b981',
    bio: 'Passionate about tutoring freshman calculus and sharing Christ.'
  },
  {
    id: 'usr-leader-demo',
    name: 'Pastor Joshua Cruz',
    email: 'leader@graceyouth.ph',
    password: 'password123',
    role: 'leader',
    roleLabel: 'Campus Youth Pastor & Lead Coordinator',
    status: 'Active',
    isApproved: true,
    campusId: 'all',
    campusName: 'All Campuses (Nationwide)',
    program: 'Campus Ministry Leadership',
    yearLevel: 'Leadership',
    subjects: ['Pastoral Care', 'Discipleship Leadership'],
    preferredMode: 'Hybrid',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Joshua&backgroundColor=f59e0b',
    bio: 'Serving collegiate students with pastoral care and prayer.'
  }
];
