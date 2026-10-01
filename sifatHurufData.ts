export type SifatNafas = 'Hams' | 'Jahr';
export type SifatSuara = 'Syiddah' | 'Tawassuth' | 'Rakhawah';
export type SifatLidah = 'Istila' | 'Istifal';
export type SifatLangit = 'Ithbaq' | 'Infitah';
export type SifatUcap = 'Idzlaq' | 'Ishmat';

export interface HurufSifat {
  huruf: string; // huruf hijaiyah
  latin: string; // nama latin
  nafas: SifatNafas;
  suara: SifatSuara;
  lidah: SifatLidah;
  langit: SifatLangit;
  ucap: SifatUcap;
  tambahan: string[]; // sifat yang tidak memiliki lawan
}

export const HURUF_SIFAT: HurufSifat[] = [
  { huruf: 'ء', latin: 'hamzah', nafas: 'Jahr', suara: 'Syiddah', lidah: 'Istifal', langit: 'Infitah', ucap: 'Ishmat', tambahan: [] },
  { huruf: 'ب', latin: 'ba', nafas: 'Jahr', suara: 'Syiddah', lidah: 'Istifal', langit: 'Infitah', ucap: 'Idzlaq', tambahan: ['Qalqalah'] },
  { huruf: 'ت', latin: 'ta', nafas: 'Hams', suara: 'Syiddah', lidah: 'Istifal', langit: 'Infitah', ucap: 'Ishmat', tambahan: [] },
  { huruf: 'ث', latin: 'tsa', nafas: 'Hams', suara: 'Rakhawah', lidah: 'Istifal', langit: 'Infitah', ucap: 'Ishmat', tambahan: [] },
  { huruf: 'ج', latin: 'jim', nafas: 'Jahr', suara: 'Syiddah', lidah: 'Istifal', langit: 'Infitah', ucap: 'Ishmat', tambahan: ['Qalqalah'] },
  { huruf: 'ح', latin: 'ha', nafas: 'Hams', suara: 'Rakhawah', lidah: 'Istifal', langit: 'Infitah', ucap: 'Ishmat', tambahan: [] },
  { huruf: 'خ', latin: 'kha', nafas: 'Hams', suara: 'Rakhawah', lidah: 'Istila', langit: 'Infitah', ucap: 'Ishmat', tambahan: [] },
  { huruf: 'د', latin: 'dal', nafas: 'Jahr', suara: 'Syiddah', lidah: 'Istifal', langit: 'Infitah', ucap: 'Ishmat', tambahan: ['Qalqalah'] },
  { huruf: 'ذ', latin: 'dzal', nafas: 'Jahr', suara: 'Rakhawah', lidah: 'Istifal', langit: 'Infitah', ucap: 'Ishmat', tambahan: [] },
  { huruf: 'ر', latin: 'ra', nafas: 'Jahr', suara: 'Tawassuth', lidah: 'Istifal', langit: 'Infitah', ucap: 'Idzlaq', tambahan: ['Takrir', 'Inhiraf'] },
  { huruf: 'ز', latin: 'zai', nafas: 'Jahr', suara: 'Rakhawah', lidah: 'Istifal', langit: 'Infitah', ucap: 'Ishmat', tambahan: ['Shafir'] },
  { huruf: 'س', latin: 'sin', nafas: 'Hams', suara: 'Rakhawah', lidah: 'Istifal', langit: 'Infitah', ucap: 'Ishmat', tambahan: ['Shafir'] },
  { huruf: 'ش', latin: 'syin', nafas: 'Hams', suara: 'Rakhawah', lidah: 'Istifal', langit: 'Infitah', ucap: 'Ishmat', tambahan: ['Tafasysyi'] },
  { huruf: 'ص', latin: 'shad', nafas: 'Hams', suara: 'Rakhawah', lidah: 'Istila', langit: 'Ithbaq', ucap: 'Ishmat', tambahan: ['Shafir'] },
  { huruf: 'ض', latin: 'dhad', nafas: 'Jahr', suara: 'Rakhawah', lidah: 'Istila', langit: 'Ithbaq', ucap: 'Ishmat', tambahan: ['Istithalah'] },
  { huruf: 'ط', latin: 'tha', nafas: 'Jahr', suara: 'Syiddah', lidah: 'Istila', langit: 'Ithbaq', ucap: 'Ishmat', tambahan: ['Qalqalah'] },
  { huruf: 'ظ', latin: 'zha', nafas: 'Jahr', suara: 'Rakhawah', lidah: 'Istila', langit: 'Ithbaq', ucap: 'Ishmat', tambahan: [] },
  { huruf: 'ع', latin: 'ain', nafas: 'Jahr', suara: 'Tawassuth', lidah: 'Istifal', langit: 'Infitah', ucap: 'Ishmat', tambahan: [] },
  { huruf: 'غ', latin: 'ghain', nafas: 'Jahr', suara: 'Rakhawah', lidah: 'Istila', langit: 'Infitah', ucap: 'Ishmat', tambahan: [] },
  { huruf: 'ف', latin: 'fa', nafas: 'Hams', suara: 'Rakhawah', lidah: 'Istifal', langit: 'Infitah', ucap: 'Idzlaq', tambahan: [] },
  { huruf: 'ق', latin: 'qaf', nafas: 'Jahr', suara: 'Syiddah', lidah: 'Istila', langit: 'Infitah', ucap: 'Ishmat', tambahan: ['Qalqalah'] },
  { huruf: 'ك', latin: 'kaf', nafas: 'Hams', suara: 'Syiddah', lidah: 'Istifal', langit: 'Infitah', ucap: 'Ishmat', tambahan: [] },
  { huruf: 'ل', latin: 'lam', nafas: 'Jahr', suara: 'Tawassuth', lidah: 'Istifal', langit: 'Infitah', ucap: 'Idzlaq', tambahan: ['Inhiraf'] },
  { huruf: 'م', latin: 'mim', nafas: 'Jahr', suara: 'Tawassuth', lidah: 'Istifal', langit: 'Infitah', ucap: 'Idzlaq', tambahan: [] },
  { huruf: 'ن', latin: 'nun', nafas: 'Jahr', suara: 'Tawassuth', lidah: 'Istifal', langit: 'Infitah', ucap: 'Idzlaq', tambahan: [] },
  { huruf: 'ه', latin: 'ha', nafas: 'Hams', suara: 'Rakhawah', lidah: 'Istifal', langit: 'Infitah', ucap: 'Ishmat', tambahan: [] },
  { huruf: 'و', latin: 'wau', nafas: 'Jahr', suara: 'Rakhawah', lidah: 'Istifal', langit: 'Infitah', ucap: 'Ishmat', tambahan: ['Liin'] },
  { huruf: 'ي', latin: 'ya', nafas: 'Jahr', suara: 'Rakhawah', lidah: 'Istifal', langit: 'Infitah', ucap: 'Ishmat', tambahan: ['Liin'] },
  { huruf: 'ا', latin: 'alif', nafas: 'Jahr', suara: 'Rakhawah', lidah: 'Istifal', langit: 'Infitah', ucap: 'Ishmat', tambahan: [] },
];

export interface DimensiSifat {
  id: 'nafas' | 'suara' | 'lidah' | 'langit' | 'ucap';
  label: string;
  values: string[];
}

export const DIMENSI_SIFAT: DimensiSifat[] = [
  { id: 'nafas', label: 'Nafas', values: ['Hams', 'Jahr'] },
  { id: 'suara', label: 'Suara', values: ['Syiddah', 'Tawassuth', 'Rakhawah'] },
  { id: 'lidah', label: 'Pangkal lidah', values: ['Istila', 'Istifal'] },
  { id: 'langit', label: 'Langit-langit', values: ['Ithbaq', 'Infitah'] },
  { id: 'ucap', label: 'Pengucapan', values: ['Idzlaq', 'Ishmat'] },
];

// Pasangan sifat yang memiliki lawan (Tawassuth tidak punya lawan karena sifat tengah)
export const LAWAN_SIFAT: Record<string, string> = {
  Hams: 'Jahr',
  Jahr: 'Hams',
  Syiddah: 'Rakhawah',
  Rakhawah: 'Syiddah',
  Istila: 'Istifal',
  Istifal: 'Istila',
  Ithbaq: 'Infitah',
  Infitah: 'Ithbaq',
  Idzlaq: 'Ishmat',
  Ishmat: 'Idzlaq',
};

export const SEMUA_SIFAT: string[] = [
  'Hams', 'Jahr',
  'Syiddah', 'Tawassuth', 'Rakhawah',
  'Istila', 'Istifal',
  'Ithbaq', 'Infitah',
  'Idzlaq', 'Ishmat',
  'Shafir', 'Qalqalah', 'Liin', 'Inhiraf', 'Takrir', 'Tafasysyi', 'Istithalah',
];

export const SIFAT_DESKRIPSI: Record<string, string> = {
  Hams: 'Nafas mengalir saat huruf diucapkan',
  Jahr: 'Nafas tertahan saat huruf diucapkan',
  Syiddah: 'Suara tertahan sejenak di makhraj',
  Tawassuth: 'Suara di antara tertahan dan mengalir',
  Rakhawah: 'Suara mengalir tanpa hambatan',
  Istila: 'Pangkal lidah terangkat, suara tebal',
  Istifal: 'Lidah turun, suara tipis',
  Ithbaq: 'Lidah menempel ke langit-langit',
  Infitah: 'Lidah renggang dari langit-langit',
  Idzlaq: 'Ringan dan mudah diucapkan',
  Ishmat: 'Berat dan sulit diucapkan',
  Shafir: 'Bunyi seperti siulan',
  Qalqalah: 'Memantul ketika sukun',
  Liin: 'Lembut (wau/ya sukun setelah fathah)',
  Inhiraf: 'Makhraj menyimpang atau condong',
  Takrir: 'Ujung lidah bergetar',
  Tafasysyi: 'Angin menyebar di dalam mulut',
  Istithalah: 'Suara memanjang dari sisi lidah',
};

export const SIFAT_ARAB: Record<string, string> = {
  Hams: 'همس',
  Jahr: 'جهر',
  Syiddah: 'شدة',
  Tawassuth: 'توسط',
  Rakhawah: 'رخاوة',
  Istila: 'استعلاء',
  Istifal: 'استفال',
  Ithbaq: 'إطباق',
  Infitah: 'انفتاح',
  Idzlaq: 'إذلاق',
  Ishmat: 'إصمات',
  Shafir: 'صفير',
  Qalqalah: 'قلقلة',
  Liin: 'لين',
  Inhiraf: 'انحراف',
  Takrir: 'تكرير',
  Tafasysyi: 'تفشي',
  Istithalah: 'استطالة',
};

// Cek apakah sebuah huruf memiliki sifat tertentu (pasangan maupun tanpa lawan)
export function hurufPunyaSifat(h: HurufSifat, sifat: string): boolean {
  return (
    h.nafas === sifat ||
    h.suara === sifat ||
    h.lidah === sifat ||
    h.langit === sifat ||
    h.ucap === sifat ||
    h.tambahan.includes(sifat)
  );
}
