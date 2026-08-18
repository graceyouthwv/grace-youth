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

/**
 * Resizes and compresses client-uploaded image files into a clean base64 data URL
 */
export const processImageUpload = (file, maxWidth = 300, maxHeight = 300) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file selected.'));
      return;
    }
    if (!file.type || !file.type.startsWith('image/')) {
      reject(new Error('Please upload a valid image file (PNG, JPG, JPEG, WebP).'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Unable to decode image file.'));
      img.src = event.target.result;
    };
    reader.onerror = () => reject(new Error('Error reading image file.'));
    reader.readAsDataURL(file);
  });
};

/**
 * Retries dynamic import if chunk fails due to new deployment/cache invalidation
 */
export const lazyRetry = (componentImport) => {
  return new Promise((resolve, reject) => {
    componentImport()
      .then((component) => {
        try {
          window.sessionStorage.removeItem('gy_chunk_retry');
        } catch (e) {}
        resolve(component);
      })
      .catch((error) => {
        const errorStr = String(error?.message || error || '');
        const isChunkError =
          errorStr.includes('MIME type') ||
          errorStr.includes('dynamically imported module') ||
          errorStr.includes('Loading chunk') ||
          errorStr.includes('Failed to fetch');

        let alreadyRetried = false;
        try {
          alreadyRetried = !!window.sessionStorage.getItem('gy_chunk_retry');
        } catch (e) {}

        if (isChunkError && !alreadyRetried && typeof window !== 'undefined') {
          try {
            window.sessionStorage.setItem('gy_chunk_retry', 'true');
          } catch (e) {}
          window.location.href = window.location.pathname + '?t=' + Date.now();
          return;
        }
        reject(error);
      });
  });
};
