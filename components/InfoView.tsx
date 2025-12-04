import React from 'react';

export const InfoView: React.FC = () => {
    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Header */}
            <div className="flex-none bg-gradient-to-r from-primary-600 to-primary-500 z-20 px-6 py-4 shadow-sm">
                <h1 className="text-2xl font-bold text-white">Tentang Aplikasi</h1>
                <p className="text-white/70 mt-1">Informasi tentang MurajaahQu</p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
                {/* App Info Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-4">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">MurajaahQu</h2>
                            <p className="text-sm text-slate-500">Versi 1.0.0</p>
                        </div>
                    </div>

                    <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                        <p>
                            Aplikasi ini dibuat untuk membantu pembuat aplikasi dalam murajaah (mengulang) hafalan Al-Quran.
                            Dengan latihan-latihan interaktif, pengguna dapat menguji dan memperkuat ingatan tentang surat-surat
                            Al-Quran beserta informasinya.
                        </p>
                        <p>
                            Jika Anda merasa aplikasi ini bermanfaat dan ingin menggunakannya untuk keperluan murajaah Anda juga,
                            silakan gunakan dengan senang hati. Semoga bermanfaat untuk semua yang ingin menjaga hafalan Al-Quran.
                        </p>
                    </div>
                </div>

                {/* Features Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-4">
                    <h3 className="font-semibold text-slate-800 mb-4">Fitur Utama</h3>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-slate-800 text-sm">Daftar 114 Surat</h4>
                                <p className="text-xs text-slate-500">Lihat informasi lengkap semua surat Al-Quran</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-slate-800 text-sm">Latihan Murajaah</h4>
                                <p className="text-xs text-slate-500">Uji hafalan dengan berbagai jenis kuis interaktif</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-slate-800 text-sm">Kamus Dalil</h4>
                                <p className="text-xs text-slate-500">Temukan ayat Al-Quran berdasarkan tema</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Developer Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <h3 className="font-semibold text-slate-800 mb-4">Pengembang</h3>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-slate-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-medium text-slate-800">Abu Asiyah</h4>
                            <p className="text-xs text-slate-500">Semoga Allah memudahkan kita dalam menjaga hafalan Al-Quran</p>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-slate-400">
                        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                        Dibuat dengan ❤️ untuk kebaikan bersama
                    </p>
                </div>
            </div>
        </div>
    );
};
