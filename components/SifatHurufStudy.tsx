import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { HURUF_SIFAT, DIMENSI_SIFAT, SIFAT_DESKRIPSI, SIFAT_ARAB, LAWAN_SIFAT } from '../sifatHurufData';

// Context agar setiap istilah sifat bisa membuka hotspot tanpa prop drilling.
const SifatHotspotContext = createContext<(nama: string) => void>(() => {});
const useOpenSifatHotspot = () => useContext(SifatHotspotContext);

// Istilah sifat: tulisan Arab sebagai utama, latin dalam kurung. Mis. "جهر (Jahr)".
// Bisa diketuk untuk membuka hotspot berisi arti istilah tersebut.
const IstilahSifat: React.FC<{ nama: string; className?: string }> = ({ nama, className = '' }) => {
  const openHotspot = useOpenSifatHotspot();
  return (
    <button
      type="button"
      onClick={() => openHotspot(nama)}
      aria-label={`Lihat arti ${nama}`}
      className={`text-left underline decoration-dotted decoration-sky-400 underline-offset-2 cursor-pointer ${className}`}
    >
      <span className="font-arabic text-lg font-bold" dir="rtl" lang="ar">{SIFAT_ARAB[nama] ?? ''}</span>{' '}
      <span className="font-normal text-gray-500 text-sm">({nama})</span>
    </button>
  );
};

// Cari label dimensi untuk sebuah istilah (mis. 'Syiddah' -> 'Suara').
function dimensiOf(nama: string): string | null {
  const d = DIMENSI_SIFAT.find((dim) => dim.values.includes(nama));
  return d ? d.label : null;
}

// Hotspot: popup bawah berisi arti istilah sifat. Tutup via tombol X atau ketuk area gelap.
const SifatHotspotPopup: React.FC<{
  nama: string | null;
  onClose: () => void;
  onOpen: (nama: string) => void;
}> = ({ nama, onClose, onOpen }) => {
  useEffect(() => {
    if (!nama) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [nama, onClose]);

  if (!nama) return null;

  const lawan = LAWAN_SIFAT[nama];
  const dimensi = dimensiOf(nama);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-label={`Arti istilah ${nama}`}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-sm p-5 pb-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-3 right-3 p-2 rounded-full text-gray-400 hover:bg-slate-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="font-arabic text-4xl font-bold text-gray-800" dir="rtl" lang="ar">{SIFAT_ARAB[nama] ?? ''}</p>
        <p className="text-sm text-gray-500 mt-1">({nama})</p>
        {dimensi ? (
          <p className="text-xs text-sky-600 font-semibold mt-1">Dimensi: {dimensi}</p>
        ) : (
          <p className="text-xs text-amber-600 font-semibold mt-1">Sifat tambahan</p>
        )}
        <p className="text-sm text-gray-700 leading-relaxed mt-3">{SIFAT_DESKRIPSI[nama] ?? ''}</p>

        {lawan && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <p className="text-xs text-gray-400 mb-1.5">Lawan katanya:</p>
            <button
              type="button"
              onClick={() => onOpen(lawan)}
              className="inline-flex items-center gap-2 bg-slate-50 hover:bg-sky-50 rounded-xl px-3 py-1.5 transition-colors"
            >
              <span className="font-arabic text-xl font-bold text-gray-800" dir="rtl" lang="ar">{SIFAT_ARAB[lawan] ?? ''}</span>
              <span className="text-sm font-semibold text-gray-700">({lawan})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Halaman materi sifat huruf: modul hafalan 29 huruf per dimensi sifat.
export const SifatHurufStudy: React.FC = () => {
  const [hotspot, setHotspot] = useState<string | null>(null);
  const openHotspot = useCallback((nama: string) => setHotspot(nama), []);
  const closeHotspot = useCallback(() => setHotspot(null), []);

  return (
    <SifatHotspotContext.Provider value={openHotspot}>
      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-bold text-gray-800 mb-1">Cara menghafal</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Setiap huruf hijaiyah punya 5 sifat berpasangan (atau tiga untuk suara)
            plus sifat tambahan yang tidak punya lawan. Hafalkan per huruf di bawah,
            lalu uji dengan tab Murajaah.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-bold text-gray-800 mb-1">5 dimensi sifat</h3>
          <p className="text-sm text-gray-500 mb-3">Setiap huruf dinilai dari 5 sisi berikut:</p>
          <div className="flex flex-col gap-2.5">
            {DIMENSI_SIFAT.map((d) => (
              <div key={d.id} className="bg-slate-50 rounded-xl p-3">
                <p className="font-bold text-sky-700 text-sm">{d.label}</p>
                <p className="text-xs text-gray-500 mb-2">{d.tentang}</p>
                <div className="flex flex-col gap-1.5">
                  {d.values.map((v) => (
                    <div key={v} className="flex items-center justify-between gap-2">
                      <IstilahSifat nama={v} className="font-semibold text-gray-800 text-sm" />
                      <span className="text-xs text-gray-500 text-right">{SIFAT_DESKRIPSI[v]}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="text-sm">
              <span className="font-semibold text-sky-700">Tambahan: </span>
              <span className="text-gray-600">
                {['Shafir', 'Qalqalah', 'Liin', 'Inhiraf', 'Takrir', 'Tafasysyi', 'Istithalah'].map((v, i) => (
                  <React.Fragment key={v}>
                    {i > 0 && ', '}
                    <IstilahSifat nama={v} />
                  </React.Fragment>
                ))}
              </span>
            </div>
          </div>
        </div>

        {HURUF_SIFAT.map((h) => (
          <div key={h.huruf} className="bg-white rounded-2xl shadow p-4">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-5xl font-bold font-arabic text-gray-800" dir="rtl">{h.huruf}</span>
              <div>
                <p className="font-bold text-gray-800 capitalize">{h.latin}</p>
                <p className="text-xs text-gray-500">{h.tambahan.length > 0 ? `${h.tambahan.length} sifat tambahan` : 'Tanpa sifat tambahan'}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {DIMENSI_SIFAT.map((d) => {
                const value = h[d.id];
                return (
                  <div key={d.id} className="flex items-center justify-between text-sm bg-slate-50 rounded-lg px-3 py-1.5">
                    <span className="text-gray-500">{d.label}</span>
                    <IstilahSifat nama={value} className="font-bold text-gray-800" />
                  </div>
                );
              })}
              {h.tambahan.length > 0 && (
                <div className="flex items-center justify-between text-sm bg-amber-50 rounded-lg px-3 py-1.5">
                  <span className="text-gray-500">Tambahan</span>
                  <span className="font-bold text-amber-700">
                    {h.tambahan.map((t, i) => (
                      <React.Fragment key={t}>
                        {i > 0 && ', '}
                        <IstilahSifat nama={t} />
                      </React.Fragment>
                    ))}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <SifatHotspotPopup nama={hotspot} onClose={closeHotspot} onOpen={openHotspot} />
    </SifatHotspotContext.Provider>
  );
};
