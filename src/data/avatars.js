/**
 * High-Quality Cartoon Avatar Library for Grace Youth App
 * Built using modern SVG cartoon styles (Avataaars & Adventurer)
 */

export const DEFAULT_CARTOON_AVATAR =
  'https://api.dicebear.com/7.x/avataaars/svg?seed=GraceExplorer&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf';

export const CARTOON_PRESET_AVATARS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Joshua&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Hannah&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Caleb&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Timothy&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Elijah&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Bea&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Kenzo&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Faith&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf',
  'https://api.dicebear.com/7.x/bottts/svg?seed=StudyBuddy&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf'
];

/**
 * Generate a deterministic cartoon avatar based on seed (e.g. name or email)
 */
export const getCartoonAvatar = (seed = 'GraceStudent') => {
  const cleanSeed = encodeURIComponent(String(seed || 'GraceStudent').trim());
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanSeed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
};

/**
 * Get role-specific default cartoon avatar
 */
export const getRoleCartoonAvatar = (role = 'student', name = 'User') => {
  if (role === 'leader') {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || 'Leader')}&clothing=blazerAndShirt,collarAndSweater&backgroundColor=ffd5dc,c0aede`;
  }
  if (role === 'worker') {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || 'Worker')}&clothing=collarAndSweater,overall&backgroundColor=b6e3f4,ffd5dc`;
  }
  if (role === 'tutor') {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || 'Tutor')}&accessories=kurt,prescription01,prescription02&backgroundColor=d1d4f9,ffdfbf`;
  }
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || 'Student')}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
};
