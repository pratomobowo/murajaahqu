// Data Dzikir Pagi dan Petang
// Sumber: Almanhaj.or.id - Al-Ustadz Yazid bin 'Abdul Qadir Jawas حفظه الله

export interface DzikirItem {
    id: number;
    title: string;
    arabic: string;
    translation: string;
    faedah: string;
    count: number;
    time: 'pagi' | 'petang' | 'both';
    note?: string;
}

export interface DzikirData {
    type: 'pagi' | 'petang';
    title: string;
    description: string;
    time: string;
    items: DzikirItem[];
}

// Dzikir yang dibaca PAGI saja
const DZIKIR_PAGI_ONLY: DzikirItem[] = [
    {
        id: 101,
        title: 'Dzikir Pagi Hari',
        arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرُ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِيْ هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوْذُ بِكَ مِنْ شَرِّ مَا فِيْ هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوْذُ بِكَ مِنَ الْكَسَلِ وَسُوْءِ الْكِبَرِ، رَبِّ أَعُوْذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
        translation: 'Kami telah memasuki waktu pagi dan kerajaan hanya milik Allah, segala puji hanya milik Allah. Tidak ada ilah yang berhak diibadahi dengan benar kecuali Allah Yang Maha Esa, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya pujian. Dia-lah Yang Mahakuasa atas segala sesuatu. Wahai Rabb, aku mohon kepada-Mu kebaikan di hari ini dan kebaikan sesudahnya. Aku berlindung kepada-Mu dari kejahatan hari ini dan kejahatan sesudahnya. Wahai Rabb, aku berlindung kepada-Mu dari kemalasan dan kejelekan di hari tua. Wahai Rabb, aku berlindung kepada-Mu dari siksaan di Neraka dan siksaan di kubur.',
        faedah: 'HR. Muslim no. 2723, Abu Dawud no. 5071, at-Tirmidzi no. 3390.',
        count: 1,
        time: 'pagi'
    },
    {
        id: 102,
        title: 'Doa Pagi',
        arabic: 'اَللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوْتُ وَإِلَيْكَ النُّشُوْرُ',
        translation: 'Ya Allah, dengan rahmat dan pertolongan-Mu kami memasuki waktu pagi, dan dengan rahmat dan pertolongan-Mu kami memasuki waktu sore. Dengan rahmat dan kehendak-Mu kami hidup dan dengan rahmat dan kehendak-Mu kami mati. Dan kepada-Mu kebangkitan (bagi semua makhluk).',
        faedah: 'HR. At-Tirmidzi no. 3391, Abu Dawud no. 5068.',
        count: 1,
        time: 'pagi'
    },
    {
        id: 103,
        title: 'Dzikir Fitrah Islam (Pagi)',
        arabic: 'أَصْبَحْنَا عَلَى فِطْرَةِ اْلإِسْلاَمِ وَعَلَى كَلِمَةِ اْلإِخْلاَصِ، وَعَلَى دِيْنِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِيْنَا إِبْرَاهِيْمَ، حَنِيْفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِيْنَ',
        translation: 'Di waktu pagi kami berada diatas fitrah agama Islam, kalimat ikhlas, agama Nabi kami Muhammad ﷺ dan agama ayah kami, Ibrahim, yang berdiri di atas jalan yang lurus, muslim dan tidak tergolong orang-orang musyrik.',
        faedah: 'HR. Ahmad III/406, 407, ad-Darimi II/292.',
        count: 1,
        time: 'pagi'
    },
    {
        id: 104,
        title: 'Tasbih Sempurna',
        arabic: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ: عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ وَمِدَادَ كَلِمَاتِهِ',
        translation: 'Mahasuci Allah, aku memuji-Nya sebanyak bilangan makhluk-Nya, Mahasuci Allah sesuai keridhaan-Nya, Mahasuci seberat timbangan Arsy-Nya, dan Mahasuci sebanyak tinta (yang menulis) kalimat-Nya.',
        faedah: 'HR. Muslim no. 2726, dari Juwairiyah binti al-Harits.',
        count: 3,
        time: 'pagi'
    },
    {
        id: 105,
        title: 'Doa Ilmu & Rizki',
        arabic: 'اَللَّهُمَّ إِنِّيْ أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلاً مُتَقَبَّلاً',
        translation: 'Ya Allah, sesungguhnya aku meminta kepada-Mu ilmu yang bermanfaat, rizki yang halal, dan amalan yang diterima.',
        faedah: 'HR. Ibnu Majah no. 925, dibaca setelah salam shalat Shubuh.',
        count: 1,
        time: 'pagi',
        note: 'Setelah salam shalat Shubuh'
    }
];

// Dzikir yang dibaca PETANG saja
const DZIKIR_PETANG_ONLY: DzikirItem[] = [
    {
        id: 201,
        title: 'Dzikir Petang Hari',
        arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ للهِ، وَالْحَمْدُ للهِ، لَا إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُبِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُبِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُبِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
        translation: 'Kami telah memasuki waktu sore dan kerajaan hanya milik Allah, segala puji hanya milik Allah. Tidak ada Ilah yang berhak diibadahi dengan benar kecuali Allah Yang Maha Esa, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya pujian. Dia-lah Yang Mahakuasa atas segala sesuatu. Wahai Rabb, aku mohon kepada-Mu kebaikan di malam ini dan kebaikan sesudahnya. Aku berlindung kepada-Mu dari kejahatan malam ini dan kejahatan sesudahnya. Wahai Rabb, aku berlindung kepada-Mu dari kemalasan dan kejelekan di hari tua. Wahai Rabb, aku berlindung kepada-Mu dari siksaan di Neraka dan siksaan di kubur.',
        faedah: 'HR. Muslim no. 2723.',
        count: 1,
        time: 'petang'
    },
    {
        id: 202,
        title: 'Doa Petang',
        arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا،وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيْرُ',
        translation: 'Ya Allah, dengan rahmat dan pertolongan-Mu kami memasuki waktu sore dan dengan rahmat dan pertolongan-Mu kami memasuki waktu pagi. Dengan rahmat dan kehendak-Mu kami hidup dan dengan rahmat dan kehendak-Mu kami mati. Dan kepada-Mu tempat kembali (bagi semua makhluk).',
        faedah: 'HR. At-Tirmidzi no. 3391, Abu Dawud no. 5068.',
        count: 1,
        time: 'petang'
    },
    {
        id: 203,
        title: 'Dzikir Fitrah Islam (Petang)',
        arabic: 'أَمْسَيْنَا عَلَى فِطْرَةِ اْلإِسْلاَمِ وَعَلَى كَلِمَةِ اْلإِخْلاَصِ، وَعَلَى دِيْنِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِيْنَا إِبْرَاهِيْمَ، حَنِيْفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِيْنَ',
        translation: 'Di waktu sore kami berada diatas fitrah agama Islam, kalimat ikhlas, agama Nabi kita Muhammad ﷺ dan agama ayah kami, Ibrahim, yang berdiri di atas jalan yang lurus, muslim dan tidak tergolong orang-orang yang musyrik.',
        faedah: 'HR. Ahmad III/406, 407.',
        count: 1,
        time: 'petang'
    },
    {
        id: 204,
        title: 'Doa Perlindungan Malam',
        arabic: 'أَعُوْذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
        translation: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna, dari kejahatan sesuatu yang diciptakan-Nya.',
        faedah: 'HR. Ahmad II/290, an-Nasa\'i. Barangsiapa membacanya di waktu sore, tidak ada sesuatu yang mencelakakannya di malam itu.',
        count: 3,
        time: 'petang',
        note: 'Khusus petang saja'
    }
];

// Dzikir yang dibaca PAGI dan PETANG
const DZIKIR_BOTH: DzikirItem[] = [
    {
        id: 1,
        title: 'Ayat Kursi',
        arabic: 'اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ، لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ، لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ، مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ، يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ، وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلاَّ بِمَا شَاءَ، وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ، وَلَا يَئُودُهُ حِفْظُهُمَا، وَهُوَ الْعَلِيُّ الْعَظِيمُ',
        translation: 'Allah tidak ada Ilah (yang berhak diibadahi) melainkan Dia Yang Hidup Kekal lagi terus menerus mengurus (makhluk-Nya); tidak mengantuk dan tidak tidur. Kepunyaan-Nya apa yang ada di langit dan di bumi. Tidak ada yang dapat memberi syafa\'at di sisi Allah tanpa izin-Nya. Allah mengetahui apa-apa yang (berada) dihadapan mereka, dan dibelakang mereka dan mereka tidak mengetahui apa-apa dari Ilmu Allah melainkan apa yang dikehendaki-Nya. Kursi Allah meliputi langit dan bumi. Dan Allah tidak merasa berat memelihara keduanya, Allah Mahatinggi lagi Mahabesar. (Al-Baqarah: 255)',
        faedah: 'Barangsiapa yang membaca ayat ini ketika pagi, maka ia dilindungi dari gangguan jin hingga sore. Dan sebaliknya. (HR. Al-Hakim 1/562)',
        count: 1,
        time: 'both'
    },
    {
        id: 2,
        title: 'Surat Al-Ikhlas',
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\nقُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        translation: 'Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang. Katakanlah, Dia-lah Allah Yang Maha Esa. Allah adalah (Rabb) yang segala sesuatu bergantung kepada-Nya. Dia tidak beranak dan tidak pula diperanakkan. Dan tidak ada seorang pun yang setara dengan-Nya. (Al-Ikhlas: 1-4)',
        faedah: 'HR. Abu Dawud no. 5082, at-Tirmidzi no. 3575. Barangsiapa membaca 3 surat ini setiap pagi dan sore, maka cukup baginya dari segala sesuatu.',
        count: 3,
        time: 'both'
    },
    {
        id: 3,
        title: 'Surat Al-Falaq',
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        translation: 'Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang. Katakanlah: Aku berlindung kepada Rabb Yang menguasai (waktu) Shubuh dari kejahatan makhluk-Nya. Dan dari kejahatan malam apabila telah gelap gulita. Dan dari kejahatan wanita-wanita tukang sihir yang menghembus pada buhul-buhul. Serta dari kejahatan orang yang dengki apabila dia dengki. (Al-Falaq: 1-5)',
        faedah: 'HR. Abu Dawud no. 5082, at-Tirmidzi no. 3575.',
        count: 3,
        time: 'both'
    },
    {
        id: 4,
        title: 'Surat An-Naas',
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَ النَّاسِ',
        translation: 'Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang. Katakanlah, Aku berlindung kepada Rabb (yang memelihara dan menguasai) manusia. Raja manusia. Sembahan (Ilah) manusia. Dari kejahatan (bisikan) syaitan yang biasa bersembunyi. Yang membisikkan (kejahatan) ke dalam dada-dada manusia. Dari golongan jin dan manusia. (An-Naas: 1-6)',
        faedah: 'HR. Abu Dawud no. 5082, at-Tirmidzi no. 3575.',
        count: 3,
        time: 'both'
    },
    {
        id: 5,
        title: 'Sayyidul Istighfar',
        arabic: 'اَللَّهُمَّ أَنْتَ رَبِّيْ لاَ إِلَـهَ إِلاَّ أَنْتَ، خَلَقْتَنِيْ وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوْءُ بِذَنْبِيْ فَاغْفِرْ لِيْ فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوْبَ إِلاَّ أَنْتَ',
        translation: 'Ya Allah, Engkau adalah Rabb-ku, tidak ada Ilah (yang berhak diibadahi dengan benar) kecuali Engkau, Engkau-lah yang menciptakanku. Aku adalah hamba-Mu. Aku akan setia pada perjanjianku dengan-Mu semampuku. Aku berlindung kepada-Mu dari kejelekan (apa) yang kuperbuat. Aku mengakui nikmat-Mu (yang diberikan) kepadaku dan aku mengakui dosaku, oleh karena itu, ampunilah aku. Sesungguhnya tidak ada yang dapat mengampuni dosa kecuali Engkau.',
        faedah: 'Barangsiapa membacanya dengan yakin di waktu pagi lalu meninggal sebelum sore, maka ia termasuk ahli Surga. Begitu pula sebaliknya. (HR. Al-Bukhari no. 6306)',
        count: 1,
        time: 'both'
    },
    {
        id: 6,
        title: 'Doa Keselamatan Tubuh',
        arabic: 'اَللَّهُمَّ عَافِنِيْ فِيْ بَدَنِيْ، اَللَّهُمَّ عَافِنِيْ فِيْ سَمْعِيْ، اَللَّهُمَّ عَافِنِيْ فِيْ بَصَرِيْ، لاَ إِلَـهَ إِلاَّ أَنْتَ. اَللَّهُمَّ إِنِّي أَعُوْذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوْذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لاَ إِلَـهَ إِلاَّ أَنْتَ',
        translation: 'Ya Allah, selamatkanlah tubuhku (dari penyakit dan dari apa yang tidak aku inginkan). Ya Allah, selamatkanlah pendengaranku (dari penyakit dan maksiat atau dari apa yang tidak aku inginkan). Ya Allah, selamatkanlah penglihatanku, tidak ada Ilah yang berhak diibadahi dengan benar kecuali Engkau. Ya Allah, sesungguhnya aku berlindung kepada-Mu dari kekufuran dan kefakiran. Aku berlindung kepada-Mu dari siksa kubur, tidak ada Ilah yang berhak diibadahi dengan benar kecuali Engkau.',
        faedah: 'HR. Al-Bukhari dalam al-Adabul Mufrad no. 701, Abu Dawud no. 5090.',
        count: 3,
        time: 'both'
    },
    {
        id: 7,
        title: 'Doa Keselamatan',
        arabic: 'اَللَّهُمَّ إِنِّيْ أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَاْلآخِرَةِ، اَللَّهُمَّ إِنِّيْ أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِيْنِيْ وَدُنْيَايَ وَأَهْلِيْ وَمَالِيْ اللَّهُمَّ اسْتُرْ عَوْرَاتِى وَآمِنْ رَوْعَاتِى. اَللَّهُمَّ احْفَظْنِيْ مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِيْ، وَعَنْ يَمِيْنِيْ وَعَنْ شِمَالِيْ، وَمِنْ فَوْقِيْ، وَأَعُوْذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِيْ',
        translation: 'Ya Allah, sesungguhnya aku memohon kebajikan dan keselamatan di dunia dan akhirat. Ya Allah, sesungguhnya aku memohon kebajikan dan keselamatan dalam agama, dunia, keluarga dan hartaku. Ya Allah, tutupilah auratku (aib dan sesuatu yang tidak layak dilihat orang) dan tentramkanlah aku dari rasa takut. Ya Allah, peliharalah aku dari depan, belakang, kanan, kiri dan dari atasku. Aku berlindung dengan kebesaran-Mu, agar aku tidak dibenamkan ke dalam bumi.',
        faedah: 'HR. Al-Bukhari dalam al-Adabul Mufrad no. 1200, Abu Dawud no. 5074.',
        count: 1,
        time: 'both'
    },
    {
        id: 8,
        title: 'Doa Perlindungan',
        arabic: 'اَللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَاْلأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيْكَهُ، أَشْهَدُ أَنْ لاَ إِلَـهَ إِلاَّ أَنْتَ، أَعُوْذُ بِكَ مِنْ شَرِّ نَفْسِيْ، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِيْ سُوْءًا أَوْ أَجُرُّهُ إِلَى مُسْلِمٍ',
        translation: 'Ya Allah Yang Mahamengetahui yang ghaib dan yang nyata, wahai Rabb Pencipta langit dan bumi, Rabb atas segala sesuatu dan Yang Merajainya. Aku bersaksi bahwa tidak ada Ilah yang berhak diibadahi dengan benar kecuali Engkau. Aku berlindung kepada-Mu dari kejahatan diriku, syaitan dan ajakannya menyekutukan Allah (aku berlindung kepada-Mu) dari berbuat kejelekan atas diriku atau mendorong seorang muslim kepadanya.',
        faedah: 'Nabi ﷺ bersabda kepada Abu Bakar ash-Shiddiq: "Ucapkanlah pagi dan petang dan apabila engkau hendak tidur." (HR. At-Tirmidzi no. 3392, Abu Dawud no. 5067)',
        count: 1,
        time: 'both'
    },
    {
        id: 9,
        title: 'Bismillah Perlindungan',
        arabic: 'بِسْمِ اللهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي اْلأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيْعُ الْعَلِيْمُ',
        translation: 'Dengan Menyebut Nama Allah, yang dengan Nama-Nya tidak ada satupun yang membahayakan, baik di bumi maupun dilangit. Dia-lah Yang Mahamendengar dan Maha mengetahui.',
        faedah: 'Barangsiapa membacanya 3x ketika pagi dan sore, maka tidak ada sesuatu pun yang membahayakan dirinya. (HR. At-Tirmidzi no. 3388, Abu Dawud no. 5088)',
        count: 3,
        time: 'both'
    },
    {
        id: 10,
        title: 'Ridha kepada Allah',
        arabic: 'رَضِيْتُ بِاللهِ رَبًّا، وَبِاْلإِسْلاَمِ دِيْنًا، وَبِمُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
        translation: 'Aku rela (ridha) Allah sebagai Rabb-ku (untukku dan orang lain), Islam sebagai agamaku dan Muhammad ﷺ sebagai Nabiku (yang diutus oleh Allah).',
        faedah: 'Barangsiapa membacanya 3x ketika pagi dan sore, maka Allah memberikan keridhaan-Nya kepadanya pada hari Kiamat. (HR. Abu Dawud no. 5072, at-Tirmidzi no. 3389)',
        count: 3,
        time: 'both'
    },
    {
        id: 11,
        title: 'Doa Pertolongan',
        arabic: 'يَا حَيُّ يَا قَيُّوْمُ بِرَحْمَتِكَ أَسْتَغِيْثُ، أَصْلِحْ لِيْ شَأْنِيْ كُلَّهُ وَلاَ تَكِلْنِيْ إِلَى نَفْسِيْ طَرْفَةَ عَيْنٍ',
        translation: 'Wahai Rabb Yang Maha hidup, Wahai Rabb Yang Maha berdiri sendiri (tidak butuh segala sesuatu) dengan rahmat-Mu aku meminta pertolongan, perbaikilah segala urusanku dan jangan diserahkan (urusanku) kepada diriku sendiri meskipun hanya sekejap mata (tanpa mendapat pertolongan dari-Mu).',
        faedah: 'HR. An-Nasa\'i dalam \'Amalul Yaum wal Lailah no. 575, al-Hakim 1/545.',
        count: 1,
        time: 'both'
    },
    {
        id: 12,
        title: 'Tahlil',
        arabic: 'لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرُ',
        translation: 'Tidak ada Ilah yang berhak diibadahi dengan benar selain Allah Yang Maha Esa, tidak ada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya segala puji. Dan Dia Mahakuasa atas segala sesuatu.',
        faedah: 'HR. Muslim no. 2693. Dibaca 10x atau 100x setiap hari. Seperti memerdekakan 10 budak, ditulis 100 kebaikan, dihapus 100 keburukan, mendapat perlindungan dari syaitan.',
        count: 10,
        time: 'both',
        note: 'Bisa 10x atau 100x'
    },
    {
        id: 13,
        title: 'Tasbih',
        arabic: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ',
        translation: 'Mahasuci Allah, aku memuji-Nya.',
        faedah: 'HR. Muslim no. 2691, 2692. Barangsiapa membacanya 100x pagi dan sore, tidak ada yang datang pada hari kiamat dengan amalan yang lebih baik kecuali yang melakukan lebih banyak.',
        count: 100,
        time: 'both'
    },
    {
        id: 14,
        title: 'Istighfar',
        arabic: 'أَسْتَغْفِرُ اللهَ وَأَتُوْبُ إِلَيْهِ',
        translation: 'Aku memohon ampunan kepada Allah dan bertaubat kepada-Nya.',
        faedah: 'HR. Al-Bukhari dan Muslim no. 2702. Nabi ﷺ beristighfar 100x dalam sehari.',
        count: 100,
        time: 'both',
        note: 'Dibaca kapan saja dalam sehari'
    }
];

// Export data untuk Pagi
export const DZIKIR_PAGI: DzikirData = {
    type: 'pagi',
    title: 'Dzikir Pagi',
    description: 'Dzikir yang dibaca di waktu pagi',
    time: 'Setelah Shubuh hingga terbit matahari',
    items: [
        ...DZIKIR_BOTH.map((item, index) => ({ ...item, id: index + 1 })),
        ...DZIKIR_PAGI_ONLY.map((item, index) => ({ ...item, id: DZIKIR_BOTH.length + index + 1 }))
    ]
};

// Export data untuk Petang
export const DZIKIR_PETANG: DzikirData = {
    type: 'petang',
    title: 'Dzikir Petang',
    description: 'Dzikir yang dibaca di waktu petang',
    time: 'Setelah Ashar hingga terbenam matahari',
    items: [
        ...DZIKIR_BOTH.map((item, index) => ({ ...item, id: index + 1 })),
        ...DZIKIR_PETANG_ONLY.map((item, index) => ({ ...item, id: DZIKIR_BOTH.length + index + 1 }))
    ]
};
