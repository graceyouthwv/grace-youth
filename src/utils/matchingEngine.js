// Helper function to compute matching score between a student request and a peer tutor
export const calculateMatchScore = (request, tutor) => {
  let score = 0;
  const reasons = [];

  // 1. Campus Match (40 pts)
  if (tutor.campusId === request.campusId) {
    score += 40;
    reasons.push('Same Campus');
  } else if (tutor.preferredMode?.toLowerCase().includes('online') || tutor.slots?.some(s => s.mode?.toLowerCase().includes('online'))) {
    score += 25;
    reasons.push('Online Compatible');
  }

  // 2. Subject / Category Match (40 pts)
  const reqSubject = (request.subject || '').toLowerCase();
  const exactSubject = tutor.subjects?.some(s => reqSubject.includes(s.toLowerCase()) || s.toLowerCase().includes(reqSubject));
  
  if (exactSubject) {
    score += 40;
    reasons.push('Exact Subject Match');
  } else if (tutor.category === request.category) {
    score += 25;
    reasons.push('Category Expert');
  }

  // 3. Availability / Active rating (20 pts)
  if (tutor.rating >= 4.8) {
    score += 20;
    reasons.push('Top-Rated Mentor');
  } else {
    score += 10;
  }

  return {
    score: Math.min(100, score),
    reasons
  };
};

export const GOSPEL_SESSION_FRAMEWORK = {
  title: 'Grace Youth 3-Phase Session Blueprint',
  tagline: 'Serve first with love, share the Gospel with clarity, excel in academics.',
  phases: [
    {
      step: '1',
      title: 'Life Check & Gospel Bridge',
      time: '10 - 15 Mins',
      color: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
      action: 'Mandatory Gospel Starter',
      points: [
        'Ask how their week, dorm life, and exams are going.',
        'Share the Gospel Conversation Card (e.g. Grace vs Performance, Finding Peace in Jesus).',
        'Pray over their exam anxiety and mental clarity.'
      ]
    },
    {
      step: '2',
      title: 'Academic Tutoring Deep-Dive',
      time: '45 - 60 Mins',
      color: 'text-indigo-400 border-indigo-400/30 bg-indigo-400/10',
      action: 'Core Subject Review',
      points: [
        'Break down difficult problem sets & formula applications.',
        'Drill mock questions and simplify concepts.',
        'Encourage patience and growth mindset.'
      ]
    },
    {
      step: '3',
      title: 'Blessing & Life Group Invite',
      time: '5 Mins',
      color: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
      action: 'Discipleship Next Step',
      points: [
        'Hand off high-yield study sheet / reviewer.',
        'Invite them to the weekly campus life group.',
        'Exchange contacts for follow-up and prayer.'
      ]
    }
  ]
};
