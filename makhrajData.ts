export type MakhrajUmumId = 'Jauf' | 'Halq' | 'Lisan' | 'Syafatan' | 'Khaisyum';

export interface MakhrajUmum {
  id: MakhrajUmumId;
  nama: string;
  arti: string;
}

export const MAKHRAJ_UMUM: MakhrajUmum[] = [
  { id: 'Jauf', nama: 'Al-Jauf', arti: 'Rongga mulut' },
  { id: 'Halq', nama: 'Al-Halq', arti: 'Tenggorokan' },
  { id: 'Lisan', nama: 'Al-Lisan', arti: 'Lidah' },
  { id: 'Syafatan', nama: 'Asy-Syafatan', arti: 'Dua bibir' },
  { id: 'Khaisyum', nama: 'Al-Khaisyum', arti: 'Rongga hidung' },
];

export interface Makhraj {
  id: string;
  nama: string;
  umum: MakhrajUmumId;
  deskripsi: string;
  huruf: string[];
}

export const MAKHRAJ: Makhraj[] = [
  { id: 'jauf', nama: 'Rongga Mulut (Jauf)', umum: 'Jauf', deskripsi: 'Rongga mulut dan tenggorokan, tempat keluar huruf mad', huruf: ['ا', 'و', 'ي'] },
  { id: 'pangkal-tenggorokan', nama: 'Pangkal Tenggorokan', umum: 'Halq', deskripsi: 'Tenggorokan bagian bawah (dekat dada)', huruf: ['ء', 'ه'] },
  { id: 'tengah-tenggorokan', nama: 'Tengah Tenggorokan', umum: 'Halq', deskripsi: 'Tenggorokan bagian tengah', huruf: ['ع', 'ح'] },
  { id: 'ujung-tenggorokan', nama: 'Ujung Tenggorokan', umum: 'Halq', deskripsi: 'Tenggorokan bagian atas (dekat mulut)', huruf: ['غ', 'خ'] },
  { id: 'pangkal-lidah-belakang', nama: 'Pangkal Lidah Belakang', umum: 'Lisan', deskripsi: 'Pangkal lidah bertemu langit-langit atas', huruf: ['ق'] },
  { id: 'pangkal-lidah-depan', nama: 'Pangkal Lidah Depan', umum: 'Lisan', deskripsi: 'Pangkal lidah agak ke depan, di bawah makhraj qaf', huruf: ['ك'] },
  { id: 'tengah-lidah', nama: 'Tengah Lidah', umum: 'Lisan', deskripsi: 'Tengah lidah bertemu langit-langit atas', huruf: ['ج', 'ش', 'ي'] },
  { id: 'sisi-lidah', nama: 'Sisi Lidah', umum: 'Lisan', deskripsi: 'Sisi lidah (kiri/kanan) bertemu geraham atas', huruf: ['ض'] },
  { id: 'ujung-lidah-langit', nama: 'Ujung Lidah + Langit-langit', umum: 'Lisan', deskripsi: 'Ujung lidah bertemu langit-langit mulut', huruf: ['ل'] },
  { id: 'ujung-lidah-gusi', nama: 'Ujung Lidah + Gusi', umum: 'Lisan', deskripsi: 'Ujung lidah bertemu gusi atas', huruf: ['ن'] },
  { id: 'punggung-ujung-lidah', nama: 'Punggung Ujung Lidah', umum: 'Lisan', deskripsi: 'Punggung ujung lidah, lebih ke dalam dari makhraj nun', huruf: ['ر'] },
  { id: 'ujung-lidah-pangkal-gigi', nama: 'Ujung Lidah + Pangkal Gigi', umum: 'Lisan', deskripsi: 'Ujung lidah bertemu pangkal dua gigi seri atas', huruf: ['ط', 'د', 'ت'] },
  { id: 'ujung-lidah-celah-gigi', nama: 'Ujung Lidah + Celah Gigi', umum: 'Lisan', deskripsi: 'Ujung lidah di celah antara gigi seri atas dan bawah', huruf: ['ص', 'ز', 'س'] },
  { id: 'ujung-lidah-ujung-gigi', nama: 'Ujung Lidah + Ujung Gigi', umum: 'Lisan', deskripsi: 'Ujung lidah bertemu ujung dua gigi seri atas', huruf: ['ظ', 'ذ', 'ث'] },
  { id: 'bibir-bawah-dalam', nama: 'Bibir Bawah Dalam', umum: 'Syafatan', deskripsi: 'Bibir bawah bagian dalam bertemu ujung gigi seri atas', huruf: ['ف'] },
  { id: 'dua-bibir', nama: 'Dua Bibir', umum: 'Syafatan', deskripsi: 'Kedua bibir merapat atau menutup', huruf: ['ب', 'م', 'و'] },
  { id: 'khaisyum', nama: 'Rongga Hidung (Khaisyum)', umum: 'Khaisyum', deskripsi: 'Rongga hidung, tempat keluar dengung (ghunnah)', huruf: ['م', 'ن'] },
];

// Semua huruf unik yang tercakup makhraj
export const SEMUA_HURUF_MAKHRAJ: string[] = [
  ...new Set(MAKHRAJ.flatMap((m) => m.huruf)),
];

// Daftar makhraj untuk sebuah huruf (beberapa huruf punya 2 makhraj: و ي م ن)
export function makhrajDariHuruf(huruf: string): Makhraj[] {
  return MAKHRAJ.filter((m) => m.huruf.includes(huruf));
}

// Huruf yang hanya punya satu makhraj (dipakai untuk soal tanpa ambiguitas)
export const HURUF_SATU_MAKHRAJ: string[] = SEMUA_HURUF_MAKHRAJ.filter(
  (h) => makhrajDariHuruf(h).length === 1
);

export function namaMakhrajUmum(id: MakhrajUmumId): string {
  return MAKHRAJ_UMUM.find((u) => u.id === id)?.nama ?? id;
}
