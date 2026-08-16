import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ec4899']
    });
  } catch (e) {
    console.log('Confetti trigger skipped', e);
  }
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  return dateString;
};

export const generateCalendarICS = (event) => {
  const title = event.title || 'Grace Youth Session';
  const description = event.description || 'Grace Youth Campus Ministry Session';
  const location = event.location || event.venue || 'Campus Study Spot / Online';
  
  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Grace Youth//Campus Ministry Western Visayas//EN',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `DTSTART:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTEND:${new Date(Date.now() + 3600000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${title.replace(/\s+/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
