import React from 'react';
import { MAKHRAJ, MAKHRAJ_UMUM } from '../makhrajData';

// Halaman materi makhraj: modul hafalan 17 makhraj dalam 5 kelompok umum.
export const MakhrajStudy: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="font-bold text-gray-800 mb-1">Cara menghafal</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Ada 17 tempat keluar huruf dalam 5 kelompok besar. Hafalkan kelompoknya dulu,
          baru tiap makhraj dan hurufnya. Huruf و ي م ن punya dua makhraj.
        </p>
      </div>

      {MAKHRAJ_UMUM.map((u) => {
        const daftar = MAKHRAJ.filter((m) => m.umum === u.id);
        return (
          <div key={u.id}>
            <h3 className="font-bold text-teal-700 mb-2 px-1">
              {u.nama} <span className="font-normal text-gray-500 text-sm">({u.arti})</span>
            </h3>
            <div className="flex flex-col gap-2">
              {daftar.map((m) => (
                <div key={m.id} className="bg-white rounded-2xl shadow p-4">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <div>
                      <p className="font-bold text-gray-800">{m.nama}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{m.deskripsi}</p>
                    </div>
                    <span className="text-4xl font-bold font-arabic text-teal-700 whitespace-nowrap" dir="rtl">
                      {m.huruf.join(' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
