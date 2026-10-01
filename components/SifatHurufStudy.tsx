import React from 'react';
import { HURUF_SIFAT, DIMENSI_SIFAT, SIFAT_DESKRIPSI, SIFAT_ARAB } from '../sifatHurufData';

// Istilah sifat: tulisan Arab sebagai utama, latin dalam kurung. Mis. "جهر (Jahr)".
const IstilahSifat: React.FC<{ nama: string; className?: string; title?: string }> = ({ nama, className = '', title }) => (
  <span className={className} title={title}>
    <span className="font-arabic text-lg font-bold" dir="rtl" lang="ar">{SIFAT_ARAB[nama] ?? ''}</span>{' '}
    <span className="font-normal text-gray-500 text-sm">({nama})</span>
  </span>
);

// Halaman materi sifat huruf: modul hafalan 29 huruf per dimensi sifat.
export const SifatHurufStudy: React.FC = () => {
  return (
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
                  <IstilahSifat nama={value} className="font-bold text-gray-800" title={SIFAT_DESKRIPSI[value]} />
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
  );
};
