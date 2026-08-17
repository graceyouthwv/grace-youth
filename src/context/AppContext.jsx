import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TUTORS } from '../data/tutors';
import { INITIAL_REQUESTS } from '../data/tutorialRequests';
import { INITIAL_BIBLE_STUDIES } from '../data/bibleStudies';
import { INITIAL_PRAYERS } from '../data/prayers';
import { INITIAL_EVENTS } from '../data/events';
import { DAILY_DEVOTIONALS } from '../data/devotionals';
import { INITIAL_REVIEWERS } from '../data/reviewers';
import { INITIAL_CAMPAIGNS } from '../data/campaigns';
import { triggerConfetti } from '../utils/helpers';

const AppContext = createContext();

const STORAGE_VERSION = 'gy_clean_v5_strict_approval';

const GUEST_USER = {
  id: 'guest',
  isGuest: true,
  name: 'Visitor',
  role: 'guest',
  roleLabel: 'Guest Visitor',
  campusId: 'all',
  campusName: 'All Iloilo Campuses',
  email: '',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  bio: 'Exploring Grace Youth campus tutorials and community.'
};

export const DEMO_ACCOUNTS = [
  {
    id: 'usr-student-1',
    name: 'Bea Claridad',
    email: 'bea@upv.edu.ph',
    password: 'password123',
    role: 'student',
    roleLabel: 'Student (BS Biology, 2nd Year)',
    campusId: 'upv',
    campusName: 'UP Visayas (Miagao)',
    yearLevel: '2nd Year',
    isApproved: true,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    bio: 'UPV Bio sophomore. Seeking God in the midst of lab practicals and organic chemistry!'
  },
  {
    id: 'usr-tutor-1',
    name: 'Joshua Alcantara',
    email: 'joshua@graceyouth.ph',
    password: 'password123',
    role: 'tutor',
    roleLabel: 'Volunteer Peer Tutor (BS Math, 4th Year)',
    campusId: 'upv',
    campusName: 'UP Visayas (Miagao)',
    yearLevel: '4th Year',
    subjects: ['Calculus 1 & 2', 'Algebra', 'Trigonometry', 'General Physics'],
    preferredMode: 'Hybrid',
    isApproved: true,
    status: 'Active',
    verificationSteps: { applicationReview: true, backgroundCheck: true, certified: true },
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    bio: 'Calculus and physics peer tutor. Ready to help students ace their exams!'
  },
  {
    id: 'usr-worker-1',
    name: 'Hannah Grace Dela Cruz',
    email: 'worker@graceyouth.ph',
    password: 'password123',
    role: 'worker',
    roleLabel: 'Campus Youth Worker / Missionary',
    campusId: 'isufst',
    campusName: 'ISUFST & Iloilo Campuses',
    yearLevel: 'Staff',
    isApproved: true,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Full-time campus youth missionary leading discipleship and pastoral care across Iloilo schools.'
  },
  {
    id: 'usr-admin-1',
    name: 'Pastor Tim',
    email: 'graceyouth.wv@proton.me',
    password: 'password123',
    role: 'leader',
    roleLabel: 'Ministry Admin / Coordinator',
    campusId: 'wvsu',
    campusName: 'WVSU & Regional Network',
    yearLevel: 'Staff',
    isApproved: true,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Regional coordinator supervising peer tutorials, discipleship staff, and campus outreach in Iloilo.'
  }
];

export const AppProvider = ({ children }) => {
  // Check and run storage clean migration if old version exists
  useEffect(() => {
    const currentVersion = localStorage.getItem('gy_version');
    if (currentVersion !== STORAGE_VERSION) {
      localStorage.removeItem('gy_tutors');
      localStorage.removeItem('gy_bible_studies');
      localStorage.removeItem('gy_requests');
      localStorage.removeItem('gy_my_bookings');
      localStorage.removeItem('gy_my_groups');
      localStorage.removeItem('gy_campaigns');
      localStorage.removeItem('gy_prayers');
      localStorage.removeItem('gy_lg_requests');
      localStorage.removeItem('gy_volunteer_apps');
      localStorage.setItem('gy_version', STORAGE_VERSION);
    }
  }, []);

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('gy_registered_users');
    return saved ? JSON.parse(saved) : DEMO_ACCOUNTS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('gy_active_session');
    return saved ? JSON.parse(saved) : GUEST_USER;
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('gy_theme');
    return saved || 'light';
  });

  const [selectedCampus, setSelectedCampus] = useState('all');
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('home');

  const [tutors, setTutors] = useState(() => {
    const saved = localStorage.getItem('gy_tutors');
    return saved && JSON.parse(saved)?.length ? JSON.parse(saved) : INITIAL_TUTORS;
  });

  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('gy_requests');
    return saved && JSON.parse(saved)?.length ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  const [bibleStudies, setBibleStudies] = useState(() => {
    const saved = localStorage.getItem('gy_bible_studies');
    return saved && JSON.parse(saved)?.length ? JSON.parse(saved) : INITIAL_BIBLE_STUDIES;
  });

  const [lifeGroupRequests, setLifeGroupRequests] = useState(() => {
    const saved = localStorage.getItem('gy_lg_requests');
    return saved ? JSON.parse(saved) : [];
  });

  const [prayers, setPrayers] = useState(() => {
    const saved = localStorage.getItem('gy_prayers');
    return saved && JSON.parse(saved)?.length ? JSON.parse(saved) : INITIAL_PRAYERS;
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('gy_events');
    return saved && JSON.parse(saved)?.length ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [reviewers, setReviewers] = useState(() => {
    const saved = localStorage.getItem('gy_reviewers');
    return saved && JSON.parse(saved)?.length ? JSON.parse(saved) : INITIAL_REVIEWERS;
  });

  const [campaigns, setCampaigns] = useState(() => {
    const saved = localStorage.getItem('gy_campaigns');
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  const [myBookings, setMyBookings] = useState(() => {
    const saved = localStorage.getItem('gy_my_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const [myGroups, setMyGroups] = useState(() => {
    const saved = localStorage.getItem('gy_my_groups');
    return saved ? JSON.parse(saved) : [];
  });

  const [toasts, setToasts] = useState([]);

  // Theme Sync
  useEffect(() => {
    localStorage.setItem('gy_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Real Authentication Operations
  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const user = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (user) {
      if (user.password && user.password !== password) {
        showToast('Incorrect password. Please try again.', 'error');
        return false;
      }

      // Check if Youth Worker requires approval
      if (user.role === 'worker' && (!user.isApproved || user.status === 'Pending Admin Approval')) {
        showToast('⏳ Your Youth Worker account is pending verification and approval in the Admin Portal.', 'error');
        return false;
      }

      // Check if Tutor requires approval
      if (user.role === 'tutor' && (!user.isApproved || user.status === 'Pending Admin Approval')) {
        showToast('⏳ Your Tutor application is pending verification & certification in the Admin Portal.', 'error');
        return false;
      }

      setCurrentUser(user);
      localStorage.setItem('gy_active_session', JSON.stringify(user));
      showToast(`Welcome back, ${user.name}! (${user.roleLabel})`, 'success');
      setActiveTab(user.role === 'leader' ? 'admin' : 'portal');
      triggerConfetti();
      return true;
    } else {
      showToast('Account not found with this email. Please apply or sign up.', 'error');
      return false;
    }
  };

  const register = async (userData) => {
    const cleanEmail = userData.email.trim().toLowerCase();
    const existing = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      showToast('An account with this email already exists. Please sign in.', 'error');
      return false;
    }

    const isWorkerApp = userData.role === 'worker';
    const isTutorApp = userData.role === 'tutor';

    const role = isWorkerApp ? 'worker' : isTutorApp ? 'tutor' : 'student';
    const status = (isWorkerApp || isTutorApp) ? 'Pending Admin Approval' : 'Active';
    const isApproved = !(isWorkerApp || isTutorApp);

    let roleLabel = 'Student Member';
    if (isWorkerApp) roleLabel = 'Campus Youth Worker (Pending Approval)';
    else if (isTutorApp) roleLabel = `Peer Tutor Applicant (${userData.program || 'Student'})`;
    else roleLabel = `Student (${userData.program || 'College Member'})`;

    const subjectsArray = userData.subjects
      ? userData.subjects.split(',').map((s) => s.trim()).filter(Boolean)
      : [userData.program ? `${userData.program} Core` : 'General Academics'];

    const newUser = {
      id: `usr-${Date.now()}`,
      name: userData.name.trim(),
      email: cleanEmail,
      password: userData.password,
      role,
      roleLabel,
      status,
      isApproved,
      campusId: userData.campusId || 'upv',
      campusName: userData.campusName || 'UP Visayas',
      program: userData.program || '',
      yearLevel: userData.yearLevel || '1st Year',
      subjects: subjectsArray,
      preferredMode: userData.preferredMode || 'Hybrid',
      bioNote: userData.bioNote || '',
      verificationSteps: {
        applicationReview: false,
        backgroundCheck: false,
        certified: false
      },
      avatar:
        role === 'worker'
          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
          : role === 'tutor'
          ? 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      bio: isWorkerApp ? 'Applying as campus youth missionary.' : isTutorApp ? 'Applying as volunteer peer tutor.' : 'College student.'
    };

    setRegisteredUsers((prev) => [...prev, newUser]);

    if (isWorkerApp) {
      showToast('🕊️ Youth Worker application submitted! An Administrator must review and activate your account.', 'info');
      return true;
    }

    if (isTutorApp) {
      showToast('📚 Tutor application submitted! An Administrator will review your credentials and certify your account.', 'info');
      return true;
    }

    // Normal student can sign in immediately
    setCurrentUser(newUser);
    localStorage.setItem('gy_active_session', JSON.stringify(newUser));
    showToast(`🎉 Welcome to Grace Youth, ${newUser.name}!`, 'success');
    setActiveTab('portal');
    triggerConfetti();
    return true;
  };

  const approveYouthWorker = (userId) => {
    setRegisteredUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const updated = {
            ...u,
            role: 'worker',
            roleLabel: 'Campus Youth Worker / Missionary',
            status: 'Active',
            isApproved: true
          };
          showToast(`✅ ${u.name} is now approved and activated as an official Youth Worker!`, 'success');
          return updated;
        }
        return u;
      })
    );
    triggerConfetti();
  };

  const approveTutor = (userId) => {
    let approvedUserObj = null;

    setRegisteredUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          approvedUserObj = u;
          return {
            ...u,
            role: 'tutor',
            roleLabel: `Volunteer Peer Tutor (${u.program || 'Academics'})`,
            status: 'Active',
            isApproved: true,
            verificationSteps: { applicationReview: true, backgroundCheck: true, certified: true }
          };
        }
        return u;
      })
    );

    if (approvedUserObj) {
      const existingListing = tutors.find((t) => t.name === approvedUserObj.name);
      if (!existingListing) {
        const newTutorListing = {
          id: `tut-${Date.now()}`,
          name: approvedUserObj.name,
          avatar: approvedUserObj.avatar,
          role: `Volunteer Peer Tutor (${approvedUserObj.program || 'Academics'})`,
          campusId: approvedUserObj.campusId,
          campusName: approvedUserObj.campusName,
          subjects: approvedUserObj.subjects?.length ? approvedUserObj.subjects : ['General Academics', approvedUserObj.program],
          category: 'Academics',
          rating: 5.0,
          sessionsGiven: 0,
          badge: 'Verified Peer Tutor',
          bio: approvedUserObj.bio || 'Verified volunteer peer tutor ready to help batchmates succeed.',
          preferredMode: approvedUserObj.preferredMode || 'Hybrid',
          slots: [
            { day: 'Tuesday', time: '4:00 PM - 5:30 PM', mode: 'In-Person' },
            { day: 'Thursday', time: '5:00 PM - 6:30 PM', mode: 'Online' }
          ]
        };
        setTutors((prev) => [newTutorListing, ...prev]);
      }
      showToast(`🎉 ${approvedUserObj.name} has been certified and activated as a Peer Tutor!`, 'success');
      triggerConfetti();
    }
  };

  const updateUserRole = async (userId, newRole) => {
    let updatedRoleLabel = 'Student';
    if (newRole === 'leader') updatedRoleLabel = 'Ministry Admin / Coordinator';
    else if (newRole === 'worker') updatedRoleLabel = 'Campus Youth Worker / Missionary';
    else if (newRole === 'tutor') updatedRoleLabel = 'Volunteer Peer Tutor';
    else updatedRoleLabel = 'Student Member';

    let targetUserName = '';

    setRegisteredUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          targetUserName = u.name;
          const updated = { ...u, role: newRole, roleLabel: updatedRoleLabel, isApproved: true, status: 'Active' };
          if (currentUser.id === userId) {
            setCurrentUser(updated);
            localStorage.setItem('gy_active_session', JSON.stringify(updated));
          }
          return updated;
        }
        return u;
      })
    );

    showToast(`🛡️ Role updated! ${targetUserName} is now a "${updatedRoleLabel}".`, 'success');
    triggerConfetti();
  };

  const logout = () => {
    setCurrentUser(GUEST_USER);
    localStorage.removeItem('gy_active_session');
    setActiveTab('home');
    showToast('Signed out. See you next time!', 'info');
  };

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('gy_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem('gy_tutors', JSON.stringify(tutors));
  }, [tutors]);

  useEffect(() => {
    localStorage.setItem('gy_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('gy_bible_studies', JSON.stringify(bibleStudies));
  }, [bibleStudies]);

  useEffect(() => {
    localStorage.setItem('gy_lg_requests', JSON.stringify(lifeGroupRequests));
  }, [lifeGroupRequests]);

  useEffect(() => {
    localStorage.setItem('gy_prayers', JSON.stringify(prayers));
  }, [prayers]);

  useEffect(() => {
    localStorage.setItem('gy_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('gy_reviewers', JSON.stringify(reviewers));
  }, [reviewers]);

  useEffect(() => {
    localStorage.setItem('gy_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('gy_my_bookings', JSON.stringify(myBookings));
  }, [myBookings]);

  useEffect(() => {
    localStorage.setItem('gy_my_groups', JSON.stringify(myGroups));
  }, [myGroups]);

  // Actions
  const bookSession = async (tutor, slot, note, subject) => {
    const newBooking = {
      id: `bk-${Date.now()}`,
      studentName: currentUser.name,
      tutorName: tutor.name,
      tutorAvatar: tutor.avatar,
      subject: subject || tutor.subjects[0],
      day: slot.day,
      time: slot.time,
      mode: slot.mode,
      bookedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Confirmed',
      meetingNote: note || 'Free peer tutorial session organized by Grace Youth.'
    };

    setMyBookings((prev) => [newBooking, ...prev]);
    showToast(`🎉 Session booked with ${tutor.name} for ${slot.day}!`, 'success');
    triggerConfetti();
  };

  const cancelBooking = (bookingId) => {
    setMyBookings((prev) => prev.filter((b) => b.id !== bookingId));
    showToast('Session booking cancelled.', 'info');
  };

  const addTutorialRequest = (newRequest) => {
    const created = {
      id: `req-${Date.now()}`,
      studentName: currentUser.name,
      campusId: newRequest.campusId || currentUser.campusId,
      campusName: newRequest.campusName || currentUser.campusName,
      program: currentUser.roleLabel || 'College Student',
      subject: newRequest.subject,
      category: newRequest.category,
      description: newRequest.description,
      preferredSchedule: newRequest.preferredSchedule,
      urgency: newRequest.urgency || 'Normal',
      status: 'Open',
      createdAt: 'Just now',
      offersCount: 0
    };

    setRequests((prev) => [created, ...prev]);
    showToast('🚀 Tutorial request posted to the matching queue!', 'success');
    triggerConfetti();
  };

  const claimRequest = (requestId) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? { ...r, status: `Claimed by ${currentUser.name}`, offersCount: r.offersCount + 1 }
          : r
      )
    );
    showToast(`Tutor matched for session.`, 'success');
  };

  const togglePrayerSupport = async (prayerId) => {
    setPrayers((prev) =>
      prev.map((p) => {
        if (p.id === prayerId) {
          const hasPrayed = !p.hasPrayed;
          const countChange = hasPrayed ? 1 : -1;
          const newCount = Math.max(0, p.prayedCount + countChange);
          if (hasPrayed) {
            showToast('🙏 Amen! You prayed for this student.', 'info');
          }
          return { ...p, hasPrayed, prayedCount: newCount };
        }
        return p;
      })
    );
  };

  const addPrayerRequest = async (prayerData) => {
    const created = {
      id: `pray-${Date.now()}`,
      author: prayerData.isAnonymous ? 'Anonymous Student' : currentUser.name,
      isAnonymous: prayerData.isAnonymous,
      campusId: prayerData.campusId || currentUser.campusId,
      campusName: prayerData.campusName || currentUser.campusName,
      category: prayerData.category,
      content: prayerData.content,
      prayedCount: 1,
      hasPrayed: true,
      createdAt: 'Just now',
      type: prayerData.type || 'prayer',
      commentsCount: 0
    };

    setPrayers((prev) => [created, ...prev]);
    showToast(prayerData.type === 'praise' ? '🙌 Praise report posted!' : '🙏 Prayer request posted to the wall!', 'success');
    triggerConfetti();
  };

  const joinLifeGroup = (groupId) => {
    if (myGroups.includes(groupId)) {
      setMyGroups((prev) => prev.filter((id) => id !== groupId));
      showToast('Left Life Group.', 'info');
    } else {
      setMyGroups((prev) => [...prev, groupId]);
      showToast('🎉 Joined Life Group! Facilitator notified.', 'success');
      triggerConfetti();
    }
  };

  const requestLifeGroup = (requestData) => {
    const created = {
      ...requestData,
      id: `lgr-${Date.now()}`,
      status: 'Pending Admin Approval',
      createdAt: 'Just now'
    };
    setLifeGroupRequests((prev) => [created, ...prev]);
    showToast('🚀 Life Group request submitted to Admin & Youth Workers for review!', 'success');
    triggerConfetti();
  };

  const approveLifeGroupRequest = (requestId, facilitatorName) => {
    const req = lifeGroupRequests.find((r) => r.id === requestId);
    if (!req) return;

    const newGroup = {
      id: `bs-${Date.now()}`,
      title: req.proposedTitle,
      campusId: req.campusId,
      campusName: req.campusName,
      facilitator: facilitatorName || currentUser.name || 'Pastor Tim',
      schedule: req.preferredSchedule || 'Weekly Fellowship',
      location: req.preferredLocation || 'Campus Lounge / Online',
      topicCategory: 'Campus Faith & Community',
      currentMembers: 1,
      maxCapacity: 12,
      description: `Official campus life group started for ${req.targetAudience}. ${req.note}`,
      tags: ['Student Initiative', 'Official Group', req.campusName.split(' ')[0]],
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80'
    };

    setBibleStudies((prev) => [newGroup, ...prev]);
    setLifeGroupRequests((prev) => prev.filter((r) => r.id !== requestId));
    showToast(`🎉 "${req.proposedTitle}" has been officially approved and published!`, 'success');
    triggerConfetti();
  };

  const toggleEventRsvp = (eventId) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === eventId) {
          const isRsvp = !ev.isRsvp;
          showToast(isRsvp ? '🎟️ RSVP Confirmed!' : 'RSVP removed.', isRsvp ? 'success' : 'info');
          if (isRsvp) triggerConfetti();
          return {
            ...ev,
            isRsvp,
            attendeesCount: ev.attendeesCount + (isRsvp ? 1 : -1)
          };
        }
        return ev;
      })
    );
  };

  const incrementReviewerDownload = (revId) => {
    setReviewers((prev) =>
      prev.map((r) => (r.id === revId ? { ...r, downloads: r.downloads + 1 } : r))
    );
    showToast('📥 Reviewer downloaded! God bless your studies.', 'success');
  };

  const donateToCampaign = (campaignId, donationData) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === campaignId) {
          const newRaised = c.raisedAmount + donationData.amount;
          const newDonorsCount = c.donorsCount + 1;
          const newDonorEntry = {
            name: donationData.name,
            amount: donationData.amount,
            message: donationData.message,
            refNumber: donationData.refNumber,
            time: 'Just now'
          };
          return {
            ...c,
            raisedAmount: newRaised,
            donorsCount: newDonorsCount,
            recentDonors: [newDonorEntry, ...(c.recentDonors || []).slice(0, 4)]
          };
        }
        return c;
      })
    );

    showToast(`💖 Faith seed of ₱${donationData.amount.toLocaleString()} received! God bless you abundantly!`, 'success');
    triggerConfetti();
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        registeredUsers,
        setRegisteredUsers,
        updateUserRole,
        approveYouthWorker,
        approveTutor,
        login,
        register,
        logout,
        theme,
        toggleTheme,
        selectedCampus,
        setSelectedCampus,
        language,
        setLanguage,
        activeTab,
        setActiveTab,
        tutors,
        setTutors,
        requests,
        bibleStudies,
        lifeGroupRequests,
        prayers,
        events,
        reviewers,
        setReviewers,
        campaigns,
        myBookings,
        myGroups,
        toasts,
        showToast,
        bookSession,
        cancelBooking,
        addTutorialRequest,
        claimRequest,
        togglePrayerSupport,
        addPrayerRequest,
        joinLifeGroup,
        requestLifeGroup,
        approveLifeGroupRequest,
        toggleEventRsvp,
        incrementReviewerDownload,
        donateToCampaign,
        dailyDevotionals: DAILY_DEVOTIONALS
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
