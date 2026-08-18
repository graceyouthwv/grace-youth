import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TUTORS } from '../data/tutors';
import { INITIAL_REQUESTS } from '../data/tutorialRequests';
import { INITIAL_BIBLE_STUDIES } from '../data/bibleStudies';
import { INITIAL_PRAYERS } from '../data/prayers';
import { INITIAL_EVENTS } from '../data/events';
import { DAILY_DEVOTIONALS } from '../data/devotionals';
import { INITIAL_REVIEWERS } from '../data/reviewers';
import { INITIAL_CAMPAIGNS } from '../data/campaigns';
import { INITIAL_CURRICULUM_SERIES, INITIAL_STUDENT_PROGRESS } from '../data/curriculum';
import { DEMO_ACCOUNTS } from '../data/demoAccounts';
import { PH_REGIONS, getRegionById } from '../data/regions';
import { CAMPUSES } from '../data/campuses';
import { triggerConfetti } from '../utils/helpers';

import { DEFAULT_CARTOON_AVATAR, getCartoonAvatar, getRoleCartoonAvatar } from '../data/avatars';

export { DEMO_ACCOUNTS, PH_REGIONS, getRegionById };

const AppContext = createContext();

const STORAGE_VERSION = 'gy_v18_unlimited_meet';

const GUEST_USER = {
  id: 'guest',
  isGuest: true,
  name: 'Visitor',
  role: 'guest',
  roleLabel: 'Guest Visitor',
  campusId: 'all',
  campusName: 'All Campuses (Nationwide)',
  regionId: 'all',
  regionName: 'All Philippines (Nationwide)',
  email: '',
  avatar: DEFAULT_CARTOON_AVATAR,
  bio: 'Exploring Grace Youth campus tutorials and community across the Philippines.'
};

const DEFAULT_BOOKINGS = [];

const getRegisteredUsersSafe = () => {
  try {
    const saved = localStorage.getItem('gy_registered_users');
    let localUsers = [];
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        localUsers = parsed;
      }
    }
    const userMap = new Map();
    // Base demo accounts
    DEMO_ACCOUNTS.forEach((u) => userMap.set(u.email.toLowerCase(), u));
    // User accounts
    localUsers.forEach((u) => userMap.set(u.email.toLowerCase(), u));
    return Array.from(userMap.values());
  } catch (e) {
    return DEMO_ACCOUNTS;
  }
};

const checkVersionAndGet = (key, fallback) => {
  try {
    const currentVersion = localStorage.getItem('gy_version');
    if (currentVersion !== STORAGE_VERSION) {
      return fallback;
    }
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    if (Array.isArray(fallback)) {
      return Array.isArray(parsed) ? parsed : fallback;
    }
    return parsed || fallback;
  } catch (e) {
    return fallback;
  }
};

export const AppProvider = ({ children }) => {
  // Sync storage version
  useEffect(() => {
    localStorage.setItem('gy_version', STORAGE_VERSION);
  }, []);

  const [registeredUsers, setRegisteredUsers] = useState(() => getRegisteredUsersSafe());

  // Automatically persist registered users whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('gy_registered_users', JSON.stringify(registeredUsers));
    } catch (e) {}
  }, [registeredUsers]);

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('gy_active_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed || GUEST_USER;
      } catch (e) {}
    }
    return GUEST_USER;
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('gy_theme');
    return saved || 'light';
  });

  // Philippines Region Selector State ('all' or 'r6', 'ncr', 'r7', etc.)
  const [selectedRegion, setSelectedRegionState] = useState(() => {
    const saved = localStorage.getItem('gy_selected_region');
    return saved || 'all';
  });

  const setSelectedRegion = (regionId) => {
    setSelectedRegionState(regionId);
    try {
      localStorage.setItem('gy_selected_region', regionId);
    } catch (e) {}

    // If active campus is not in this new region, reset campus to 'all'
    if (regionId !== 'all') {
      const campusObj = CAMPUSES.find((c) => c.id === selectedCampus);
      if (campusObj && campusObj.regionId !== regionId && campusObj.id !== 'all') {
        setSelectedCampus('all');
      }
    }
  };

  // Modality Filter State: 'all' | 'online' | 'f2f'
  const [deliveryModeFilter, setDeliveryModeFilter] = useState('all');

  const [selectedCampus, setSelectedCampus] = useState('all');
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('home');

  const [isAppInstalled, setIsAppInstalled] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true ||
        localStorage.getItem('gy_pwa_installed') === 'true'
      );
    }
    return false;
  });

  useEffect(() => {
    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      localStorage.setItem('gy_pwa_installed', 'true');
    };
    window.addEventListener('appinstalled', handleAppInstalled);
    return () => window.removeEventListener('appinstalled', handleAppInstalled);
  }, []);

  const [tutors, setTutors] = useState(() =>
    checkVersionAndGet('gy_tutors', INITIAL_TUTORS)
  );

  const [requests, setRequests] = useState(() =>
    checkVersionAndGet('gy_requests', INITIAL_REQUESTS)
  );

  const [bibleStudies, setBibleStudies] = useState(() =>
    checkVersionAndGet('gy_bible_studies', INITIAL_BIBLE_STUDIES)
  );

  const [volunteerApps, setVolunteerApps] = useState(() =>
    checkVersionAndGet('gy_volunteer_apps', [])
  );

  const [lifeGroupRequests, setLifeGroupRequests] = useState(() =>
    checkVersionAndGet('gy_lg_requests', [])
  );

  const [prayers, setPrayers] = useState(() =>
    checkVersionAndGet('gy_prayers', INITIAL_PRAYERS)
  );

  const [events, setEvents] = useState(() =>
    checkVersionAndGet('gy_events', INITIAL_EVENTS)
  );

  const [reviewers, setReviewers] = useState(() =>
    checkVersionAndGet('gy_reviewers', INITIAL_REVIEWERS)
  );

  const [campaigns, setCampaigns] = useState(() =>
    checkVersionAndGet('gy_campaigns', INITIAL_CAMPAIGNS)
  );

  const [pastoralRequests, setPastoralRequests] = useState(() =>
    checkVersionAndGet('gy_pastoral_requests', [])
  );

  const [myBookings, setMyBookings] = useState(() =>
    checkVersionAndGet('gy_my_bookings', DEFAULT_BOOKINGS)
  );

  const [myGroups, setMyGroups] = useState(() =>
    checkVersionAndGet('gy_my_groups', [])
  );

  const [curriculumSeries, setCurriculumSeries] = useState(() =>
    checkVersionAndGet('gy_curriculum_series', INITIAL_CURRICULUM_SERIES)
  );

  const [studentProgress, setStudentProgress] = useState(() =>
    checkVersionAndGet('gy_student_progress', INITIAL_STUDENT_PROGRESS)
  );

  const [volunteerApplications, setVolunteerApplications] = useState(() =>
    checkVersionAndGet('gy_volunteer_apps', [])
  );

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
      avatar: getRoleCartoonAvatar(role, userData.name || 'Student'),
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

  const approveTutor = (userIdOrTutorId) => {
    let approvedUserObj = null;

    setRegisteredUsers((prev) =>
      prev.map((u) => {
        if (
          u.id === userIdOrTutorId ||
          u.name === userIdOrTutorId ||
          (u.email && u.email.toLowerCase() === String(userIdOrTutorId).toLowerCase())
        ) {
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

    setTutors((prev) => {
      const matchIndex = prev.findIndex(
        (t) =>
          t.id === userIdOrTutorId ||
          t.name === userIdOrTutorId ||
          (approvedUserObj && (
            (t.email && approvedUserObj.email && t.email.toLowerCase() === approvedUserObj.email.toLowerCase()) ||
            (t.name && approvedUserObj.name && t.name.toLowerCase() === approvedUserObj.name.toLowerCase()) ||
            t.id === approvedUserObj.id
          ))
      );

      if (matchIndex !== -1) {
        return prev.map((t, idx) =>
          idx === matchIndex ? { ...t, isApproved: true, status: 'Active', badge: 'Verified Peer Tutor' } : t
        );
      } else if (approvedUserObj) {
        const newTutorListing = {
          id: `tut-${Date.now()}`,
          name: approvedUserObj.name,
          email: approvedUserObj.email,
          avatar: approvedUserObj.avatar || getRoleCartoonAvatar('tutor', approvedUserObj.name),
          role: `Volunteer Peer Tutor (${approvedUserObj.program || 'Academics'})`,
          campusId: approvedUserObj.campusId,
          campusName: approvedUserObj.campusName,
          subjects: approvedUserObj.subjects?.length ? approvedUserObj.subjects : ['General Academics', approvedUserObj.program || 'Calculus'],
          category: 'STEM & Math',
          rating: 5.0,
          sessionsGiven: 0,
          isApproved: true,
          status: 'Active',
          badge: 'Verified Peer Tutor',
          bio: approvedUserObj.bio || 'Verified volunteer peer tutor ready to help batchmates succeed.',
          preferredMode: approvedUserObj.preferredMode || 'Hybrid',
          slots: [
            { id: `slot-${Date.now()}-1`, day: 'Tuesday', time: '4:00 PM - 5:30 PM', mode: 'In-Person (Campus Gazebo)' },
            { id: `slot-${Date.now()}-2`, day: 'Thursday', time: '5:00 PM - 6:30 PM', mode: 'Online (Google Meet)' }
          ]
        };
        return [newTutorListing, ...prev];
      }
      return prev;
    });

    showToast(`🎉 Peer Tutor has been verified and activated in the public directory!`, 'success');
    triggerConfetti();
  };

  const addTutorListing = (tutorData) => {
    const newTutor = {
      id: `tut-${Date.now()}`,
      name: currentUser.name || 'Volunteer Peer Tutor',
      avatar: currentUser.avatar || getRoleCartoonAvatar('tutor', currentUser.name),
      role: `Volunteer Peer Tutor (${tutorData.category || 'Academics'})`,
      rating: 5.0,
      sessionsGiven: 0,
      badge: 'Pending Admin Certification',
      isApproved: false,
      status: 'Pending Admin Review',
      ...tutorData
    };
    setTutors((prev) => [newTutor, ...prev]);
    showToast('🌟 Peer Tutor profile submitted! It will appear in the directory once verified by Admin.', 'success');
    triggerConfetti();
  };

  const addVolunteerApplication = (appData) => {
    const newApp = {
      id: `vol-${Date.now()}`,
      appliedAt: 'Just now',
      status: 'Pending Admin Review',
      ...appData
    };
    setVolunteerApplications((prev) => [newApp, ...prev]);
    showToast(`🎉 Volunteer application submitted! Our ministry leadership will review your application.`, 'success');
    triggerConfetti();
  };

  const approveVolunteerApplication = (appId) => {
    setVolunteerApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: 'Approved & Active' } : app))
    );
    showToast('✅ Volunteer application approved and activated!', 'success');
    triggerConfetti();
  };

  const deleteVolunteerApplication = (appId) => {
    setVolunteerApplications((prev) => prev.filter((app) => app.id !== appId));
    showToast('Volunteer application removed.', 'info');
  };

  const updateUserRole = async (userId, newRole) => {
    let updatedRoleLabel = 'Student';
    if (newRole === 'leader') updatedRoleLabel = 'Ministry Admin / Coordinator';
    else if (newRole === 'council') updatedRoleLabel = 'Youth Council Trustee / Officer';
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

  const resetUserPassword = (email, newPassword) => {
    const cleanEmail = email.trim().toLowerCase();
    const userIndex = registeredUsers.findIndex((u) => u.email.toLowerCase() === cleanEmail);

    if (userIndex === -1) {
      showToast('Account with this email not found.', 'error');
      return false;
    }

    const updatedUser = {
      ...registeredUsers[userIndex],
      password: newPassword
    };

    setRegisteredUsers((prev) => {
      const updatedList = [...prev];
      updatedList[userIndex] = updatedUser;
      localStorage.setItem('gy_registered_users', JSON.stringify(updatedList));
      return updatedList;
    });

    // If currently logged in as this user, sync session
    if (currentUser && currentUser.email.toLowerCase() === cleanEmail) {
      setCurrentUser(updatedUser);
      localStorage.setItem('gy_active_session', JSON.stringify(updatedUser));
    }

    showToast(`🔐 Password reset successful for ${updatedUser.name}!`, 'success');
    return true;
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

  const addReviewer = (reviewerData) => {
    const newRev = {
      id: `rev-${Date.now()}`,
      downloads: 1,
      ...reviewerData
    };
    setReviewers((prev) => [newRev, ...prev]);
    showToast(`📚 "${newRev.title}" added to Reviewer Vault!`, 'success');
    triggerConfetti();
  };

  const updateReviewer = (revId, updatedData) => {
    setReviewers((prev) =>
      prev.map((r) => (r.id === revId ? { ...r, ...updatedData } : r))
    );
    showToast('✓ Reviewer details updated!', 'success');
  };

  const deleteReviewer = (revId) => {
    setReviewers((prev) => prev.filter((r) => r.id !== revId));
    showToast('Reviewer removed from vault.', 'info');
  };

  const addEvent = (eventData) => {
    const newEv = {
      id: `ev-${Date.now()}`,
      attendeesCount: 1,
      isRsvp: true,
      ...eventData
    };
    setEvents((prev) => [newEv, ...prev]);
    showToast(`🎉 Campus Event "${newEv.title}" published!`, 'success');
    triggerConfetti();
  };

  const updateEvent = (eventId, updatedData) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === eventId ? { ...ev, ...updatedData } : ev))
    );
    showToast('✓ Campus event updated successfully!', 'success');
  };

  const deleteEvent = (eventId) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== eventId));
    showToast('Event removed.', 'info');
  };

  const addCampaign = (campaignData) => {
    const newCamp = {
      id: `camp-${Date.now()}`,
      raisedAmount: 0,
      donorsCount: 0,
      recentDonors: [],
      ...campaignData
    };
    setCampaigns((prev) => [newCamp, ...prev]);
    showToast(`🌱 Seed Campaign "${newCamp.title}" launched!`, 'success');
    triggerConfetti();
  };

  const deleteCampaign = (campaignId) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== campaignId));
    showToast('Campaign removed.', 'info');
  };

  const addBibleStudy = (groupData) => {
    const newGroup = {
      id: `bs-${Date.now()}`,
      currentMembers: 1,
      ...groupData
    };
    setBibleStudies((prev) => [newGroup, ...prev]);
    showToast(`👥 Life Group "${newGroup.title}" created!`, 'success');
    triggerConfetti();
  };

  const updateBibleStudy = (groupId, updatedData) => {
    setBibleStudies((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, ...updatedData } : g))
    );
    showToast('✓ Life Group details updated!', 'success');
  };

  const deleteBibleStudy = (groupId) => {
    setBibleStudies((prev) => prev.filter((g) => g.id !== groupId));
    showToast('Life Group removed.', 'info');
  };

  const sendLifeGroupMessage = (groupId, messageText, tag = 'Fellowship') => {
    if (!messageText || !messageText.trim()) return;
    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id || 'guest',
      senderName: currentUser.name || 'Student Member',
      senderAvatar: currentUser.avatar || getCartoonAvatar(currentUser.name || 'Member'),
      senderRole: currentUser.role === 'worker' ? 'Youth Worker' : currentUser.role === 'leader' ? 'Pastor / Admin' : currentUser.roleLabel || 'Student Member',
      message: messageText.trim(),
      timestamp: 'Just now',
      tag
    };

    setBibleStudies((prev) =>
      prev.map((g) => {
        if (g.id === groupId) {
          const chatMessages = g.chatMessages ? [...g.chatMessages, newMessage] : [newMessage];
          return { ...g, chatMessages };
        }
        return g;
      })
    );
    showToast('💬 Message sent to Life Group!', 'success');
  };

  const deleteLifeGroupMessage = (groupId, messageId) => {
    setBibleStudies((prev) =>
      prev.map((g) => {
        if (g.id === groupId) {
          const chatMessages = (g.chatMessages || []).filter((m) => m.id !== messageId);
          return { ...g, chatMessages };
        }
        return g;
      })
    );
    showToast('Message deleted from group chat.', 'info');
  };

  const addLifeGroupMember = (groupId, memberData) => {
    const newMember = {
      id: `mem-${Date.now()}`,
      name: memberData.name.trim(),
      email: memberData.email?.trim() || '',
      campus: memberData.campus || currentUser.campusName || 'Iloilo Campus',
      role: memberData.role || 'Student Member',
      yearLevel: memberData.yearLevel || 'Student',
      avatar: memberData.avatar || getCartoonAvatar(memberData.name || 'Member'),
      joinedAt: 'Just now'
    };

    setBibleStudies((prev) =>
      prev.map((g) => {
        if (g.id === groupId) {
          const members = g.members ? [...g.members, newMember] : [newMember];
          return {
            ...g,
            members,
            currentMembers: members.length
          };
        }
        return g;
      })
    );
    showToast(`✓ Added ${newMember.name} to Life Group roster!`, 'success');
    triggerConfetti();
  };

  const removeLifeGroupMember = (groupId, memberId) => {
    setBibleStudies((prev) =>
      prev.map((g) => {
        if (g.id === groupId) {
          const members = (g.members || []).filter((m) => m.id !== memberId);
          return {
            ...g,
            members,
            currentMembers: Math.max(1, members.length)
          };
        }
        return g;
      })
    );
    showToast('Member removed from Life Group roster.', 'info');
  };

  const addLifeGroupPrayer = (groupId, prayerData) => {
    const newPrayer = {
      id: `g-pray-${Date.now()}`,
      author: prayerData.isAnonymous ? 'Anonymous Member' : (currentUser.name || prayerData.author || 'Student Member'),
      authorRole: currentUser.role === 'worker' ? 'Youth Worker' : currentUser.role === 'leader' ? 'Pastor / Admin' : currentUser.roleLabel || 'Student Member',
      authorAvatar: prayerData.isAnonymous ? getCartoonAvatar('Anonymous') : (currentUser.avatar || getCartoonAvatar(currentUser.name || 'Member')),
      request: prayerData.request.trim(),
      category: prayerData.category || 'General Prayer',
      createdAt: 'Just now',
      prayedCount: 1,
      isAnswered: prayerData.isAnswered || false,
      encouragements: []
    };

    setBibleStudies((prev) =>
      prev.map((g) => {
        if (g.id === groupId) {
          const groupPrayers = [newPrayer, ...(g.groupPrayers || [])];
          return { ...g, groupPrayers };
        }
        return g;
      })
    );
    showToast('🙏 Prayer request posted to Life Group family!', 'success');
    triggerConfetti();
  };

  const prayForLifeGroupPrayer = (groupId, prayerId) => {
    setBibleStudies((prev) =>
      prev.map((g) => {
        if (g.id === groupId && g.groupPrayers) {
          const groupPrayers = g.groupPrayers.map((p) =>
            p.id === prayerId ? { ...p, prayedCount: (p.prayedCount || 0) + 1 } : p
          );
          return { ...g, groupPrayers };
        }
        return g;
      })
    );
    showToast('❤️ You lifted up this prayer with your Life Group!', 'info');
  };

  const toggleLifeGroupPrayerAnswered = (groupId, prayerId) => {
    setBibleStudies((prev) =>
      prev.map((g) => {
        if (g.id === groupId && g.groupPrayers) {
          const groupPrayers = g.groupPrayers.map((p) =>
            p.id === prayerId ? { ...p, isAnswered: !p.isAnswered } : p
          );
          return { ...g, groupPrayers };
        }
        return g;
      })
    );
    showToast('✨ Prayer status updated (Praise Report)!', 'success');
    triggerConfetti();
  };

  const addLifeGroupPrayerEncouragement = (groupId, prayerId, text) => {
    if (!text.trim()) return;
    setBibleStudies((prev) =>
      prev.map((g) => {
        if (g.id === groupId && g.groupPrayers) {
          const groupPrayers = g.groupPrayers.map((p) =>
            p.id === prayerId ? { ...p, encouragements: [...(p.encouragements || []), text.trim()] } : p
          );
          return { ...g, groupPrayers };
        }
        return g;
      })
    );
    showToast('Encouragement added to prayer item!', 'success');
  };

  const deleteLifeGroupPrayer = (groupId, prayerId) => {
    setBibleStudies((prev) =>
      prev.map((g) => {
        if (g.id === groupId && g.groupPrayers) {
          const groupPrayers = g.groupPrayers.filter((p) => p.id !== prayerId);
          return { ...g, groupPrayers };
        }
        return g;
      })
    );
    showToast('Prayer request removed from Life Group.', 'info');
  };

  const deletePrayer = (prayerId) => {
    setPrayers((prev) => prev.filter((p) => p.id !== prayerId));
    showToast('Prayer request removed.', 'info');
  };

  useEffect(() => {
    localStorage.setItem('gy_pastoral_requests', JSON.stringify(pastoralRequests));
  }, [pastoralRequests]);

  const addPastoralRequest = (requestData) => {
    const created = {
      id: `pr-${Date.now()}`,
      studentName: currentUser.name || requestData.studentName || 'Student Member',
      studentContact: requestData.studentContact,
      workerId: requestData.workerId,
      workerName: requestData.workerName,
      connectType: requestData.connectType, // 'coffee' | 'chat' | 'call'
      notes: requestData.notes || 'Seeking prayer and spiritual encouragement.',
      campusName: currentUser.campusName || requestData.campusName || 'UP Visayas',
      createdAt: 'Just now',
      status: 'Pending Contact'
    };

    setPastoralRequests((prev) => [created, ...prev]);
    showToast(`🕊️ Pastoral request sent to ${requestData.workerName}! Notification sent to worker console.`, 'success');
    triggerConfetti();
  };

  const resolvePastoralRequest = (requestId) => {
    setPastoralRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'Contacted & Handled' } : r))
    );
    showToast('✓ Pastoral request marked as contacted & handled.', 'info');
  };

  const registerForEvent = (eventId, registrantData) => {
    let eventTitle = 'Event';
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === eventId) {
          eventTitle = c.title;
          const newRegistrant = {
            id: `reg-${Date.now()}`,
            name: registrantData.name || currentUser.name || 'Student Attendee',
            email: registrantData.email || currentUser.email || '',
            phone: registrantData.phone || '',
            campus: registrantData.campus || currentUser.campusName || 'Iloilo Campus',
            yearProgram: registrantData.yearProgram || '',
            dietaryOrNotes: registrantData.dietaryOrNotes || 'None',
            paymentMethod: registrantData.paymentMethod || 'GCash',
            referenceNumber: registrantData.referenceNumber || 'N/A',
            status: registrantData.paymentMethod === 'Cash on Arrival' ? 'Pending Verification' : 'Confirmed',
            amountPaid: c.registrationFee || 250,
            registeredAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          };

          return {
            ...c,
            registeredCount: (c.registeredCount || 0) + 1,
            registrants: [newRegistrant, ...(c.registrants || [])]
          };
        }
        return c;
      })
    );

    showToast(`🎉 Registration submitted for "${eventTitle}"! See you there!`, 'success');
    triggerConfetti();
  };

  const verifyRegistrantPayment = (eventId, registrantId) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === eventId && c.registrants) {
          return {
            ...c,
            registrants: c.registrants.map((r) =>
              r.id === registrantId ? { ...r, status: 'Confirmed' } : r
            )
          };
        }
        return c;
      })
    );
    showToast('✓ Attendee payment verified and confirmed!', 'success');
  };

  const deleteRegistrant = (eventId, registrantId) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === eventId && c.registrants) {
          return {
            ...c,
            registeredCount: Math.max(0, (c.registeredCount || 1) - 1),
            registrants: c.registrants.filter((r) => r.id !== registrantId)
          };
        }
        return c;
      })
    );
    showToast('Attendee registration removed.', 'info');
  };

  const donateToCampaign = (campaignId, donationData) => {
    // Backward compatibility wrapper
    registerForEvent(campaignId, donationData);
  };

  const updateCampaign = (campaignId, updatedFields) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === campaignId ? { ...c, ...updatedFields } : c))
    );
    showToast('✓ Event details and registration fee updated successfully!', 'success');
  };

  const addCurriculumSeries = (seriesData) => {
    const newSeries = {
      id: `ser-${Date.now()}`,
      title: seriesData.title,
      subtitle: seriesData.subtitle || 'Campus Discipleship Series',
      level: seriesData.level || 'Optional Elective',
      type: seriesData.type || 'Optional Elective',
      isOptional: seriesData.isOptional !== false,
      color: seriesData.color || 'from-indigo-600 to-violet-600',
      description: seriesData.description || '',
      lessons: seriesData.lessons || []
    };
    setCurriculumSeries((prev) => [newSeries, ...prev]);
    showToast(`✓ Created new discipleship series: "${seriesData.title}"!`, 'success');
  };

  const updateCurriculumSeries = (seriesId, updatedData) => {
    setCurriculumSeries((prev) =>
      prev.map((s) => (s.id === seriesId ? { ...s, ...updatedData } : s))
    );
    showToast('✓ Discipleship series updated!', 'success');
  };

  const toggleSeriesOptional = (seriesId) => {
    setCurriculumSeries((prev) =>
      prev.map((s) => {
        if (s.id === seriesId) {
          const newIsOptional = !s.isOptional;
          return {
            ...s,
            isOptional: newIsOptional,
            type: newIsOptional ? 'Optional Elective' : 'Core Required'
          };
        }
        return s;
      })
    );
    showToast('✓ Series requirement status toggled!', 'info');
  };

  const addLessonToSeries = (seriesId, lessonData) => {
    setCurriculumSeries((prev) =>
      prev.map((s) => {
        if (s.id === seriesId) {
          const newLesson = {
            id: `l-${Date.now()}`,
            number: s.lessons.length + 1,
            title: lessonData.title,
            passage: lessonData.passage || 'Scripture Reference',
            keyTakeaway: lessonData.keyTakeaway || '',
            questions: lessonData.questions || '',
            fileName: lessonData.fileName || `${lessonData.title.replace(/\s+/g, '_')}_Guide.pdf`,
            fileSize: lessonData.fileSize || '1.5 MB'
          };
          return { ...s, lessons: [...s.lessons, newLesson] };
        }
        return s;
      })
    );
    showToast(`✓ Added lesson "${lessonData.title}" with downloadable PDF guide!`, 'success');
  };

  const updateLesson = (seriesId, lessonId, updatedLesson) => {
    setCurriculumSeries((prev) =>
      prev.map((s) => {
        if (s.id === seriesId) {
          return {
            ...s,
            lessons: s.lessons.map((l) => (l.id === lessonId ? { ...l, ...updatedLesson } : l))
          };
        }
        return s;
      })
    );
    showToast('✓ Lesson & attached PDF updated!', 'success');
  };

  const deleteLesson = (seriesId, lessonId) => {
    setCurriculumSeries((prev) =>
      prev.map((s) => {
        if (s.id === seriesId) {
          return {
            ...s,
            lessons: s.lessons.filter((l) => l.id !== lessonId)
          };
        }
        return s;
      })
    );
    showToast('✓ Lesson removed from series.', 'info');
  };

  const toggleStudentLessonCompletion = (studentId, lessonId) => {
    setStudentProgress((prev) =>
      prev.map((sp) => {
        if (sp.id === studentId) {
          const completed = sp.completedLessonIds.includes(lessonId)
            ? sp.completedLessonIds.filter((id) => id !== lessonId)
            : [...sp.completedLessonIds, lessonId];
          return { ...sp, completedLessonIds: completed };
        }
        return sp;
      })
    );
  };

  const updateStudentProgressNote = (studentId, notes) => {
    setStudentProgress((prev) =>
      prev.map((sp) => (sp.id === studentId ? { ...sp, notes } : sp))
    );
    showToast('✓ Milestone note saved!', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        registeredUsers,
        setRegisteredUsers,
        updateUserRole,
        resetUserPassword,
        approveYouthWorker,
        approveTutor,
        login,
        register,
        logout,
        theme,
        toggleTheme,
        selectedRegion,
        setSelectedRegion,
        deliveryModeFilter,
        setDeliveryModeFilter,
        phRegions: PH_REGIONS,
        getRegionById,
        selectedCampus,
        setSelectedCampus,
        language,
        setLanguage,
        activeTab,
        setActiveTab,
        isAppInstalled,
        setIsAppInstalled,
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
        pastoralRequests,
        addPastoralRequest,
        resolvePastoralRequest,
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
        toggleEventRsvp,
        addEvent,
        updateEvent,
        deleteEvent,
        incrementReviewerDownload,
        addReviewer,
        updateReviewer,
        deleteReviewer,
        donateToCampaign,
        registerForEvent,
        verifyRegistrantPayment,
        deleteRegistrant,
        addCampaign,
        updateCampaign,
        deleteCampaign,
        addBibleStudy,
        updateBibleStudy,
        deleteBibleStudy,
        sendLifeGroupMessage,
        deleteLifeGroupMessage,
        addLifeGroupMember,
        removeLifeGroupMember,
        addLifeGroupPrayer,
        prayForLifeGroupPrayer,
        toggleLifeGroupPrayerAnswered,
        addLifeGroupPrayerEncouragement,
        deleteLifeGroupPrayer,
        deletePrayer,
        volunteerApplications,
        addVolunteerApplication,
        approveVolunteerApplication,
        deleteVolunteerApplication,
        addTutorListing,
        curriculumSeries,
        setCurriculumSeries,
        studentProgress,
        setStudentProgress,
        addCurriculumSeries,
        updateCurriculumSeries,
        toggleSeriesOptional,
        addLessonToSeries,
        updateLesson,
        deleteLesson,
        toggleStudentLessonCompletion,
        updateStudentProgressNote,
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
