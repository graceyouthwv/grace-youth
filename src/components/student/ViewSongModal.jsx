import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Music, FileText, Sparkles, Check, Download, Trash2, Edit3 } from 'lucide-react';

const SAMPLE_CHORD_CHARTS = {
  'Goodness of God': `[Verse 1]
G                          C
I love You, Lord, for Your mercy never fails me
D/F#          Em            C        D
All my days, I've been held in Your hands
                 Em               C
From the moment that I wake up until I lay my head
G    D/F#     Em         C       D    G
Oh, I will sing of the goodness of God

[Chorus]
C                                    G
All my life You have been faithful
C                                    G       D
All my life You have been so, so good
C                              G   D/F#   Em
With every breath that I am able
        C       D       G
I will sing of the goodness of God

[Bridge]
G/B             C
Your goodness is running after,
D                 G
It's running after me!`,

  'Gratitude': `[Verse 1]
B                             E
All my words fall short, I got nothing new
B                        F#
How could I express all my gratitude?
G#m                        E
I could sing these songs, like I often do
B                          F#
But every song must end, and You never do

[Chorus]
          B                       E
So I throw up my hands and praise You again and again
          G#m                       F#                    E
'Cause all that I have is a hallelujah, hallelujah
             B
And I know it's not much, but I've nothing else fit for a King
          G#m                      F#             E
Except for a heart singing hallelujah, hallelujah`,

  'The Blessing': `[Verse]
C                    F
The Lord bless you and keep you
C/E                         G
Make His face shine upon you and be gracious to you
Am                 F
The Lord turn His face toward you
C/E      G        C
And give you peace

[Chorus]
Am      F         C         G
Amen, amen, amen!
Am      F         C         G
Amen, amen, amen!`,

  'King of Kings': `[Verse 1]
D/F#        G             A          D
In the darkness, we were waiting without hope, without light
D/F#        G             A          D
Till from Heaven You came running, there was mercy in Your eyes
D/F#        G             A          D
To fulfill the law and prophets, to a virgin came the Word
D/F#        G             A          D
From a throne of endless glory to a cradle in the dirt

[Chorus]
D                 G          Bm              A
Praise the Father, praise the Son, praise the Spirit, three in one
D                 G          Bm              A        D
God of Glory, majesty, praise forever to the King of Kings`
};

export const ViewSongModal = ({ isOpen, onClose, song, onDeleteSong }) => {
  const { theme, showToast } = useApp();
  const isDark = theme === 'dark';

  const [currentKey, setCurrentKey] = useState(song?.key || 'Key of G');

  if (!song) return null;

  const chartText = SAMPLE_CHORD_CHARTS[song.song] || `[Worship Chord Sheet & Lead Sheet]
Song: ${song.song}
Arrangement: ${song.artist || 'Campus Worship Team'}
Current Key: ${currentKey}
Tempo: ${song.tempo || '72 BPM'}

[Verse 1]
G                 C
Praising the King of Glory with all our hearts
D                 Em
Walking in Grace each day on campus...

[Chorus]
C                 G
Holy, Holy are You Lord God Almighty!
D                 G
Worthy is the Lamb who was slain!

[Arrangement Note]
${song.notes || 'Acoustic intro, build dynamics into Chorus 2, full band bridge reprise.'}`;

  const handleDelete = () => {
    if (window.confirm(`Remove "${song.song}" from the campus worship setlist?`)) {
      if (onDeleteSong) onDeleteSong(song.id);
      showToast(`Removed "${song.song}" from setlist.`, 'info');
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`🎸 ${song.song} - Worship Chord Sheet`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Song Meta Header */}
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-indigo-50/70 border-indigo-200'
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-base sm:text-lg font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {song.song}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-pink-500/20 text-pink-400 border border-pink-500/30">
                {song.category || 'Praise & Worship'}
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Original: <strong>{song.artist}</strong> • Tempo: <strong>{song.tempo}</strong>
            </p>
          </div>

          {/* Live Key Transpose Selector */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-black uppercase text-slate-400">Key:</span>
            <select
              value={currentKey}
              onChange={(e) => setCurrentKey(e.target.value)}
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-black cursor-pointer ${
                isDark ? 'bg-slate-950 border-slate-700 text-pink-400' : 'bg-white border-slate-300 text-indigo-700 shadow-xs'
              }`}
            >
              <option value="Key of C">Key of C</option>
              <option value="Key of D">Key of D</option>
              <option value="Key of E">Key of E</option>
              <option value="Key of F">Key of F</option>
              <option value="Key of G">Key of G</option>
              <option value="Key of A">Key of A</option>
              <option value="Key of B">Key of B</option>
              <option value="Key of Bb">Key of Bb</option>
              <option value="Key of Eb">Key of Eb</option>
            </select>
          </div>
        </div>

        {/* Attached PDF Reference Banner */}
        <div className={`p-3 rounded-xl border flex items-center justify-between gap-2 text-xs ${
          isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
        }`}>
          <div className="flex items-center gap-2 truncate">
            <FileText className="w-4 h-4 text-pink-400 shrink-0" />
            <span className="font-mono text-[11px] truncate">
              Attached File: <strong>{song.fileName || `${song.song.replace(/\s+/g, '_')}_Chords.pdf`}</strong>
            </span>
          </div>

          <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold text-[10px] shrink-0">
            In-App PDF Mode
          </span>
        </div>

        {/* Dynamic Arrangement Notes */}
        {song.notes && (
          <div className={`p-3 rounded-xl border text-xs italic ${
            isDark ? 'bg-amber-950/20 border-amber-500/30 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            📌 <strong>Arrangement Cue:</strong> {song.notes}
          </div>
        )}

        {/* Interactive In-App Chord Sheet & Lyrics Viewer */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Chords & Lyrics ({currentKey}):
            </span>
            <span className="text-[11px] text-slate-500">Auto-formatted for musicians</span>
          </div>

          <pre className={`p-4 rounded-2xl border font-mono text-xs leading-relaxed overflow-x-auto select-all max-h-72 ${
            isDark
              ? 'bg-[#090d16] border-slate-800 text-emerald-400'
              : 'bg-slate-900 border-slate-800 text-emerald-300 shadow-inner'
          }`}>
            {chartText}
          </pre>
        </div>

        {/* Action Footer */}
        <div className={`pt-3 border-t flex items-center justify-between gap-2 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          {onDeleteSong ? (
            <button
              type="button"
              onClick={handleDelete}
              className="px-3 py-2 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border border-rose-500/20 font-bold text-xs cursor-pointer flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove from Setlist</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-xs shadow-md cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </Modal>
  );
};
