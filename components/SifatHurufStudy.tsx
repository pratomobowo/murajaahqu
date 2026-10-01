import React from 'react';
import { HURUF_SIFAT, DIMENSI_SIFAT, SIFAT_DESKRIPSI } from '../sifatHurufData';

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
        <h3 className="font-bold text-gray-800 mb-2">5 dimensi sifat</h3>
        <div className="flex flex-col gap-2">
          {DIMENSI_SIFAT.map((d) => (
            <div key={d.id} className="text-sm">
              <span className="font-semibold text-sky-700">{d.label}: </span>
              <span className="text-gray-600">{d.values.join(' / ')}</span>
            </div>
          ))}
          <div className="text-sm">
            <span className="font-semibold text-sky-700">Tambahan: </span>
            <span className="text-gray-600">Shafir, Qalqalah, Liin, Inhiraf, Takrir, Tafasysyi, Istithalah</span>
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
                  <span className="font-bold text-gray-800" title={SIFAT_DESKRIPSI[value]}>{value}</span>
                </div>
              );
            })}
            {h.tambahan.length > 0 && (
              <div className="flex items-center justify-between text-sm bg-amber-50 rounded-lg px-3 py-1.5">
                <span className="text-gray-500">Tambahan</span>
                <span className="font-bold text-amber-700">{h.tambahan.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
