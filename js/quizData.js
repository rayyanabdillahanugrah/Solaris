

export const QUIZ_QUESTIONS = {
  sun: [
    {
      question: "Matahari termasuk jenis bintang apa?",
      options: ["Katai merah", "Katai kuning (tipe G2V)", "Raksasa biru", "Katai putih"],
      correctIndex: 1,
      explanation: "Matahari adalah bintang deret utama tipe G2V, sering disebut katai kuning — bukan raksasa biru atau katai putih yang jauh lebih panas/padat.",
    },
    {
      question: "Berapa lama waktu yang dibutuhkan cahaya Matahari untuk sampai ke Bumi?",
      options: ["1 menit", "8 menit 20 detik", "1 jam", "1 hari"],
      correctIndex: 1,
      explanation: "Jarak Matahari-Bumi (~149,6 juta km) ditempuh cahaya dalam waktu sekitar 8 menit 20 detik, karena cahaya bergerak dengan kecepatan terbatas (~300.000 km/detik).",
    },
    {
      question: "Berapa suhu permukaan Matahari?",
      options: ["1.000 °C", "5.500 °C", "15.000.000 °C", "100.000 °C"],
      correctIndex: 1,
      explanation: "Suhu permukaan (fotosfer) Matahari sekitar 5.500 °C. Suhu 15 juta °C adalah suhu di intinya, jauh lebih panas karena tempat terjadinya fusi nuklir.",
    },
    {
      question: "Sekitar berapa persen massa Tata Surya yang disumbang oleh Matahari?",
      options: ["50%", "75%", "lebih dari 99%", "25%"],
      correctIndex: 2,
      explanation: "Matahari menyusun lebih dari 99% massa seluruh Tata Surya — sisanya (kurang dari 1%) terbagi ke planet, bulan, asteroid, dan komet.",
    },
    {
      question: "Sekitar berapa usia Matahari saat ini?",
      options: ["1 miliar tahun", "4,6 miliar tahun", "10 miliar tahun", "100 juta tahun"],
      correctIndex: 1,
      explanation: "Matahari diperkirakan berusia sekitar 4,6 miliar tahun, seusia dengan Tata Surya secara keseluruhan.",
    },
  ],

  mercury: [
    {
      question: "Merkurius adalah planet ke berapa dari Matahari?",
      options: ["Ke-1", "Ke-2", "Ke-3", "Ke-4"],
      correctIndex: 0,
      explanation: "Merkurius adalah planet terdekat dengan Matahari, menempati urutan pertama.",
    },
    {
      question: "Satu hari penuh (matahari terbit ke terbit) di Merkurius setara dengan berapa hari Bumi?",
      options: ["88 hari", "176 hari", "224 hari", "365 hari"],
      correctIndex: 1,
      explanation: "Meski periode orbitnya hanya 88 hari, rotasi Merkurius yang sangat lambat membuat satu hari matahari (solar day) di sana setara 176 hari Bumi.",
    },
    {
      question: "Berapa jumlah satelit alami yang dimiliki Merkurius?",
      options: ["0", "1", "2", "79"],
      correctIndex: 0,
      explanation: "Merkurius tidak memiliki satelit alami sama sekali.",
    },
    {
      question: "Planet manakah yang sebenarnya paling panas di Tata Surya (bukan Merkurius)?",
      options: ["Merkurius", "Venus", "Bumi", "Mars"],
      correctIndex: 1,
      explanation: "Meski paling dekat dengan Matahari, Merkurius hampir tidak memiliki atmosfer sehingga panasnya cepat hilang. Venus lebih panas karena efek rumah kaca ekstrem dari atmosfernya yang tebal.",
    },
    {
      question: "Seperti apa ciri khas permukaan Merkurius?",
      options: ["Lautan luas", "Dipenuhi kawah tumbukan", "Tertutup cincin es", "Diselimuti awan tebal"],
      correctIndex: 1,
      explanation: "Karena nyaris tanpa atmosfer pelindung, permukaan Merkurius dipenuhi kawah tumbukan seperti permukaan Bulan.",
    },
  ],

  venus: [
    {
      question: "Venus berotasi dengan cara yang tidak biasa, yaitu?",
      options: ["Sangat cepat searah planet lain", "Retrograde (berlawanan arah)", "Tidak berotasi sama sekali", "Berotasi secara acak"],
      correctIndex: 1,
      explanation: "Venus berotasi retrograde — berlawanan arah dibanding kebanyakan planet lain di Tata Surya.",
    },
    {
      question: "Mana yang lebih panjang: satu hari di Venus atau satu tahun di Venus?",
      options: ["Satu tahun lebih panjang", "Satu hari lebih panjang", "Sama panjang", "Tidak bisa dibandingkan"],
      correctIndex: 1,
      explanation: "Karena rotasinya sangat lambat, satu hari di Venus (243 hari Bumi) justru lebih panjang daripada satu tahunnya (224,7 hari Bumi).",
    },
    {
      question: "Apa penyebab utama Venus menjadi planet terpanas di Tata Surya?",
      options: ["Paling dekat dengan Matahari", "Efek rumah kaca ekstrem", "Banyak gunung berapi aktif", "Radiasi Matahari yang terkonsentrasi"],
      correctIndex: 1,
      explanation: "Atmosfer Venus yang sangat tebal dan didominasi karbon dioksida menciptakan efek rumah kaca paling ekstrem di Tata Surya, menjebak panas secara masif.",
    },
    {
      question: "Berapa jumlah satelit alami Venus?",
      options: ["0", "1", "2", "4"],
      correctIndex: 0,
      explanation: "Sama seperti Merkurius, Venus tidak memiliki satelit alami.",
    },
    {
      question: "Venus adalah objek paling terang di langit malam setelah apa?",
      options: ["Matahari", "Bulan", "Jupiter", "Bintang Sirius"],
      correctIndex: 1,
      explanation: "Setelah Bulan, Venus adalah objek paling terang yang terlihat di langit malam — karena atmosfernya sangat reflektif terhadap cahaya Matahari.",
    },
  ],

  earth: [
    {
      question: "Berapa persen permukaan Bumi yang tertutup air?",
      options: ["50%", "60%", "71%", "90%"],
      correctIndex: 2,
      explanation: "Sekitar 71% permukaan Bumi tertutup air, menjadikannya planet dengan air cair terbanyak yang diketahui di Tata Surya.",
    },
    {
      question: "Berapa jumlah satelit alami Bumi?",
      options: ["0", "1", "2", "3"],
      correctIndex: 1,
      explanation: "Bumi memiliki satu satelit alami, yaitu Bulan.",
    },
    {
      question: "Setiap tahun, Bulan menjauh dari Bumi sekitar berapa?",
      options: ["0,1 cm", "3,8 cm", "10 cm", "1 meter"],
      correctIndex: 1,
      explanation: "Bulan menjauh dari Bumi secara bertahap, sekitar 3,8 cm setiap tahunnya, akibat interaksi gravitasi pasang surut.",
    },
    {
      question: "Apa yang unik dari penamaan Bumi dibanding planet lain?",
      options: [
        "Satu-satunya tanpa satelit",
        "Satu-satunya yang tidak dinamai menurut dewa Yunani/Romawi",
        "Satu-satunya tanpa atmosfer",
        "Satu-satunya tanpa medan magnet",
      ],
      correctIndex: 1,
      explanation: "Semua planet lain di Tata Surya dinamai menurut dewa Yunani/Romawi, sementara nama \"Earth\" (Bumi) berasal dari bahasa Jermanik kuno yang berarti \"tanah\".",
    },
    {
      question: "Apa yang melindungi Bumi dari radiasi berbahaya Matahari?",
      options: ["Cincin planet", "Medan magnet", "Dua bulan", "Rotasi yang sangat cepat"],
      correctIndex: 1,
      explanation: "Medan magnet Bumi (bersama atmosfernya) melindungi permukaan dari radiasi dan partikel berbahaya yang dipancarkan Matahari.",
    },
  ],

  mars: [
    {
      question: "Mengapa Mars disebut sebagai \"planet merah\"?",
      options: ["Karena dekat dengan Matahari", "Karena oksida besi (karat) di permukaannya", "Karena atmosfernya berwarna merah pekat", "Karena aktivitas vulkanik yang terus-menerus"],
      correctIndex: 1,
      explanation: "Warna merah khas Mars berasal dari oksida besi (karat) yang melapisi sebagian besar permukaannya.",
    },
    {
      question: "Di planet mana terdapat gunung tertinggi di Tata Surya, dan apa namanya?",
      options: ["Bumi — Everest", "Mars — Olympus Mons", "Venus — Maxwell Montes", "Jupiter — Great Red Spot"],
      correctIndex: 1,
      explanation: "Olympus Mons di Mars adalah gunung berapi tertinggi di Tata Surya, tingginya sekitar 2,5 kali Gunung Everest.",
    },
    {
      question: "Berapa jumlah satelit alami Mars?",
      options: ["0", "1", "2", "4"],
      correctIndex: 2,
      explanation: "Mars memiliki dua satelit kecil bernama Phobos dan Deimos.",
    },
    {
      question: "Satu tahun di Mars kira-kira setara dengan berapa tahun Bumi?",
      options: ["Setengah tahun Bumi", "Sama dengan 1 tahun Bumi", "Hampir 2 tahun Bumi", "5 tahun Bumi"],
      correctIndex: 2,
      explanation: "Periode orbit Mars sekitar 687 hari, atau hampir dua kali periode orbit Bumi.",
    },
    {
      question: "Bukti apa yang ditemukan di permukaan Mars terkait masa lalunya?",
      options: ["Lautan magma aktif", "Aliran air purba", "Hutan purba", "Lapisan es kering permanen di khatulistiwa"],
      correctIndex: 1,
      explanation: "Para ilmuwan menemukan bukti kuat berupa bekas aliran air purba di permukaan Mars, menandakan planet ini pernah memiliki air cair.",
    },
  ],

  jupiter: [
    {
      question: "Jupiter adalah planet terbesar sekaligus planet ke berapa dari Matahari?",
      options: ["Ke-4", "Ke-5", "Ke-6", "Ke-7"],
      correctIndex: 1,
      explanation: "Jupiter adalah planet kelima dari Matahari, sekaligus yang terbesar di Tata Surya.",
    },
    {
      question: "Apa nama badai raksasa yang terkenal di Jupiter?",
      options: ["Badai Utara", "Bintik Merah Besar", "Pusaran Jupiter", "Awan Merah Raksasa"],
      correctIndex: 1,
      explanation: "Bintik Merah Besar (Great Red Spot) adalah badai antisiklon raksasa yang telah berlangsung selama ratusan tahun.",
    },
    {
      question: "Berapa lama kira-kira satu hari (rotasi) di Jupiter?",
      options: ["Sekitar 10 jam", "Sekitar 24 jam", "Sekitar 48 jam", "Sekitar 100 jam"],
      correctIndex: 0,
      explanation: "Jupiter memiliki hari terpendek di antara semua planet, hanya sekitar 10 jam, meski ukurannya sangat besar.",
    },
    {
      question: "Berapa jumlah bulan Galilean (bulan besar yang ditemukan Galileo) milik Jupiter?",
      options: ["2", "4", "8", "16"],
      correctIndex: 1,
      explanation: "Empat bulan terbesar Jupiter — Io, Europa, Ganymede, dan Callisto — dikenal sebagai bulan Galilean karena ditemukan oleh Galileo Galilei.",
    },
    {
      question: "Bagaimana massa Jupiter dibandingkan gabungan seluruh planet lain di Tata Surya?",
      options: ["Lebih kecil", "Kira-kira sama besar", "Lebih besar dari gabungan semua planet lain", "Tidak bisa dibandingkan"],
      correctIndex: 2,
      explanation: "Massa Jupiter lebih besar daripada gabungan massa seluruh planet lain di Tata Surya.",
    },
  ],

  saturn: [
    {
      question: "Apa ciri khas paling terkenal dari Saturnus?",
      options: ["Warna merah pekat", "Sistem cincin", "Tanpa atmosfer", "Permukaan padat berbatu"],
      correctIndex: 1,
      explanation: "Saturnus terkenal dengan sistem cincinnya yang megah dan mudah dikenali.",
    },
    {
      question: "Cincin Saturnus sebagian besar tersusun dari apa?",
      options: ["Gas beracun", "Es dan batuan", "Logam cair", "Debu vulkanik"],
      correctIndex: 1,
      explanation: "Cincin Saturnus tersusun dari jutaan partikel es dan batuan, dengan ketebalan hanya puluhan meter.",
    },
    {
      question: "Apa yang unik dari kepadatan Saturnus?",
      options: ["Lebih padat dari besi", "Lebih rendah dari air", "Sama dengan kepadatan Bumi", "Tidak diketahui"],
      correctIndex: 1,
      explanation: "Kepadatan Saturnus begitu rendah sehingga secara teori bisa mengapung jika ditaruh di air yang cukup besar.",
    },
    {
      question: "Apa nama bulan terbesar Saturnus yang memiliki atmosfer tebal dan danau metana cair?",
      options: ["Titan", "Europa", "Ganymede", "Triton"],
      correctIndex: 0,
      explanation: "Titan adalah bulan terbesar Saturnus, dikenal karena atmosfernya yang tebal dan danau metana cair di permukaannya.",
    },
    {
      question: "Kira-kira berapa jumlah satelit Saturnus yang telah dikonfirmasi?",
      options: ["Sekitar 10", "Sekitar 50", "Lebih dari 140", "Hanya 1"],
      correctIndex: 2,
      explanation: "Saturnus memiliki lebih dari 140 satelit yang telah dikonfirmasi, menjadikannya salah satu planet dengan bulan terbanyak.",
    },
  ],

  uranus: [
    {
      question: "Apa keunikan rotasi Uranus dibanding planet lain?",
      options: ["Berotasi sangat cepat", "Sumbu rotasinya miring ekstrem (≈98°)", "Tidak berotasi sama sekali", "Berotasi tegak lurus sempurna"],
      correctIndex: 1,
      explanation: "Sumbu rotasi Uranus miring sekitar 98 derajat, sehingga planet ini seolah-olah berputar sambil \"berbaring\" saat mengorbit Matahari.",
    },
    {
      question: "Siapa yang menemukan Uranus, dan bagaimana caranya?",
      options: [
        "Galileo lewat teleskop sederhana",
        "William Herschel lewat teleskop, tahun 1781",
        "Terlihat dengan mata telanjang sejak zaman kuno",
        "Ditemukan lewat misi luar angkasa",
      ],
      correctIndex: 1,
      explanation: "Uranus ditemukan oleh William Herschel pada tahun 1781, menjadikannya planet pertama yang ditemukan menggunakan teleskop.",
    },
    {
      question: "Warna biru-hijau Uranus disebabkan oleh gas apa di atmosfernya?",
      options: ["Oksigen", "Metana", "Nitrogen", "Hidrogen sulfida"],
      correctIndex: 1,
      explanation: "Kandungan metana di atmosfer Uranus menyerap cahaya merah dan memantulkan warna biru-hijau khasnya.",
    },
    {
      question: "Uranus berotasi dengan cara yang sama seperti Venus, yaitu?",
      options: ["Searah dengan planet lain", "Retrograde (berlawanan arah)", "Tidak berotasi", "Berotasi secara acak"],
      correctIndex: 1,
      explanation: "Sama seperti Venus, Uranus berotasi secara retrograde — berlawanan arah dibanding kebanyakan planet lain.",
    },
    {
      question: "Karena kemiringan sumbunya, setiap kutub Uranus mengalami siang terus-menerus selama sekitar?",
      options: ["1 tahun", "10 tahun", "42 tahun", "84 tahun"],
      correctIndex: 2,
      explanation: "Akibat kemiringan ekstrem sumbunya, setiap kutub Uranus mengalami sekitar 42 tahun siang terus-menerus, diikuti 42 tahun malam terus-menerus.",
    },
  ],

  neptune: [
    {
      question: "Neptunus dikenal memiliki apa yang tercepat di Tata Surya?",
      options: ["Rotasi", "Angin", "Orbit", "Arus laut"],
      correctIndex: 1,
      explanation: "Neptunus memiliki angin terkencang yang pernah tercatat di Tata Surya, mencapai sekitar 2.100 km/jam.",
    },
    {
      question: "Bagaimana Neptunus pertama kali ditemukan?",
      options: [
        "Kebetulan lewat teleskop amatir",
        "Lewat perhitungan matematis sebelum diamati langsung",
        "Melalui misi luar angkasa",
        "Terdeteksi radar dari Bumi",
      ],
      correctIndex: 1,
      explanation: "Neptunus ditemukan berdasarkan perhitungan matematis yang memprediksi keberadaannya sebelum benar-benar diamati lewat teleskop pada 1846.",
    },
    {
      question: "Apa nama bulan besar Neptunus yang mengorbit secara terbalik (retrograde)?",
      options: ["Triton", "Titan", "Charon", "Europa"],
      correctIndex: 0,
      explanation: "Triton, bulan terbesar Neptunus, mengorbit secara retrograde — kemungkinan besar merupakan objek Sabuk Kuiper yang tertangkap gravitasi Neptunus.",
    },
    {
      question: "Sejak ditemukan tahun 1846, Neptunus baru menyelesaikan satu orbit penuh pada tahun berapa?",
      options: ["1946", "1980", "2011", "2046"],
      correctIndex: 2,
      explanation: "Karena periode orbitnya sekitar 164,8 tahun, Neptunus baru menyelesaikan satu orbit penuh sejak penemuannya pada tahun 2011.",
    },
    {
      question: "Warna biru cerah Neptunus berasal dari gas apa di atmosfernya?",
      options: ["Metana", "Oksigen", "Nitrogen cair", "Hidrogen murni"],
      correctIndex: 0,
      explanation: "Sama seperti Uranus, kandungan metana di atmosfer Neptunus menyerap cahaya merah dan menghasilkan warna biru cerah khasnya.",
    },
  ],
};
