import type { Guide } from './types';

export const guide: Guide = {
  slug: 'kasirga-sezonu',
  number: 10,
  title: 'Kasırga sezonu: hazırlık, tahliye ve sigorta',
  navLabel: 'Kasırga sezonu',
  question: 'Florida’da kasırga sezonu ne zaman ve nasıl hazırlanılır?',
  excerpt:
    'Atlantik kasırga sezonunun takvimi, tahliye bölgeleri, evi hazırlamak, sel sigortasının ayrı olması ve sezon öncesi yapılacaklar.',
  keywords: [
    'florida kasırga sezonu',
    'hurricane hazırlık',
    'tahliye bölgesi florida',
    'sel sigortası',
    'kasırga sigortası florida',
  ],
  updated: '2026-08-08',
  intro: [
    'Atlantik kasırga sezonu resmî olarak 1 Haziran’da başlar ve 30 Kasım’da biter; en yoğun dönem genellikle ağustos ortası ile ekim sonu arasındadır. Florida’da yaşamak bu takvimle birlikte yaşamak demektir ve bu bir felaket beklentisi değil, rutin bir mevsimsel hazırlıktır — tıpkı kar bölgesinde kışa hazırlanmak gibi.',
    'Yeni gelenler için en kritik üç bilgi şudur: hangi tahliye bölgesinde oturduğunuz, evinizin fırtınaya karşı ne kadar dayanıklı olduğu ve sigorta poliçenizin neyi kapsayıp neyi kapsamadığı. Bu üçünü sezon başlamadan önce netleştirmek, fırtına yaklaştığında yapılacak iş listesini birkaç maddeye indirir.',
  ],
  quickFacts: [
    { label: 'Sezon', value: '1 Haziran – 30 Kasım' },
    { label: 'En yoğun dönem', value: 'Ağustos ortası – ekim sonu' },
    { label: 'Tahliye kararı', value: 'Bölge bazlı — ilçe yetkilileri açıklar' },
    { label: 'Sel hasarı', value: 'Standart ev sigortasına dahil DEĞİL' },
    { label: 'Sel poliçesi', value: 'Genellikle bekleme süresi var' },
  ],
  sections: [
    {
      heading: 'Tahliye bölgesi neden en önemli bilgi?',
      body: [
        'Florida’da tahliye kararları şehir geneli değil, bölge bazlı verilir. Her adres bir tahliye bölgesine (evacuation zone) atanmıştır ve bu bölgeler öncelikle fırtına kabarmasına (storm surge) yani denizin karaya taşmasına göre çizilir. Bir fırtına yaklaştığında yetkililer “A ve B bölgeleri tahliye ediliyor” gibi bir duyuru yapar; sizin göreviniz o an bölgenizi öğrenmek değil, önceden biliyor olmaktır.',
        'Tahliye bölgesi ile sel risk bölgesi farklı şeylerdir ve karıştırılır. Tahliye bölgesi denizden gelen kabarma riskini, sel bölgesi ise yağış ve taşkın riskini tanımlar. İkisini de öğrenmek gerekir; biri tahliye kararınızı, diğeri sigorta kararınızı belirler.',
        'Ev kiralarken ya da satın alırken adresin tahliye bölgesini sormak makul bir sorudur. Florida Division of Emergency Management’ın “Know Your Zone” aracı adres bazında bu bilgiyi verir. Yüksek katlı bir binada oturmak da tahliyeden muaf tutmaz: elektrik, asansör ve su kesintisi fırtına sonrasında günlerce sürebilir.',
      ],
      note: 'Tahliye kararını ilçe yetkilileri verir; kararı yerel resmî kaynaklardan takip edin.',
    },
    {
      heading: 'Evi ve haneyi sezon öncesinde nasıl hazırlarsınız?',
      body: [
        'Hazırlığın büyük kısmı fırtına yaklaştığında değil, sezon başlamadan yapılır. Çünkü uyarı çıktıktan sonra marketlerde su ve pil, benzin istasyonlarında yakıt, marangozlarda panel biter. Haziran başında yapılan iki saatlik bir hazırlık, ağustosta iki günlük telaşı önler.',
        'Evin fiziksel tarafında en belirleyici unsur pencerelerdir. Florida Building Code sonrasında yapılmış binalarda darbeye dayanıklı camlar (impact windows) yaygındır; daha eski binalarda panjur ya da takılabilir panel kullanılır. Kiracıysanız bu donanımın evde olup olmadığını ve kimin takacağını sözleşme aşamasında sorun.',
        'Hane tarafında bir “fırtına çantası” ve belge klasörü hazırlanır. Elektrik kesintisi günlerce sürebileceği için ışık, şarj ve nakit para listeye girer — kart okuyucular çalışmaz, ATM’ler kapanabilir. Evcil hayvanınız varsa hangi barınakların hayvan kabul ettiğini önceden öğrenin, tahliye anında araştırılacak bir konu değildir.',
      ],
      list: [
        'Tahliye bölgenizi ve varsa iki alternatif rotanızı öğrenin',
        'Birkaç günlük su, bozulmayan gıda, ilaç ve pil',
        'El feneri, powerbank, radyo; şarjları sezon boyunca dolu tutun',
        'Nakit para — kart sistemleri elektrikle birlikte durur',
        'Pasaport, sigorta poliçesi, kira sözleşmesi: su geçirmez klasör + dijital kopya',
        'Evin ve eşyaların fotoğraflı envanteri (hasar talebinde işinizi görür)',
        'Bahçedeki mobilya, saksı ve ızgara gibi uçabilecek her şey için içeri alma planı',
      ],
    },
    {
      heading: 'Watch ile warning arasındaki fark ne?',
      body: [
        'Resmî uyarılarda iki terim geçer ve anlamları farklıdır. “Hurricane Watch” koşulların belirli bir süre içinde oluşmasının mümkün olduğunu bildirir; bu hazırlıkları tamamlama sinyalidir. “Hurricane Warning” koşulların beklendiğini bildirir; bu artık plan uygulama aşamasıdır ve tahliye kararı verilmişse yola çıkma zamanıdır.',
        'Fırtınanın kategorisi yalnızca rüzgâr hızını anlatır ve tehlikenin tamamını temsil etmez. Can kaybının ve hasarın büyük bölümü çoğu zaman rüzgârdan değil sudan gelir: fırtına kabarması ve yağış kaynaklı taşkın. Bu nedenle “düşük kategori, kalabiliriz” muhakemesi yanıltıcıdır; tahliye kararı kategoriye değil, bulunduğunuz bölgeye göre verilir.',
        'Bilgiyi resmî kaynaktan alın: National Hurricane Center ulusal tahminleri, ilçenizin acil durum yönetimi ise tahliye ve barınak kararlarını yayımlar. Sosyal medyada dolaşan uydu görüntüsü ve tahmin haritaları çoğu zaman güncelliğini yitirmiş ya da bağlamından kopmuş olur.',
      ],
      table: {
        caption: 'Uyarı seviyeleri ve karşılığı',
        columns: ['Uyarı', 'Anlamı', 'Sizin adımınız'],
        rows: [
          ['Watch', 'Koşullar mümkün', 'Hazırlıkları tamamlayın, yakıt ve erzak alın'],
          ['Warning', 'Koşullar bekleniyor', 'Planı uygulayın; tahliye varsa çıkın'],
          ['Tahliye emri', 'Bölgeniz boşaltılıyor', 'Erken çıkın — geç çıkmak trafikte kalmaktır'],
        ],
      },
    },
    {
      heading: 'Sigorta neyi kapsıyor, neyi kapsamıyor?',
      body: [
        'Bu, Florida’ya yeni taşınanların en pahalıya mal olan yanlış varsayımıdır: standart ev sigortası (homeowners insurance) sel hasarını kapsamaz. Sel için ayrı bir poliçe gerekir ve bu poliçelerde genellikle bir bekleme süresi vardır — yani fırtına yaklaşırken alınan poliçe o fırtına için işlemez. Sel sigortası sezon öncesinde alınacak bir üründür.',
        'Kiracıysanız ev sahibinin poliçesi binayı korur, sizin eşyalarınızı korumaz. Kiracı sigortası (renters insurance) görece düşük maliyetlidir ve eşya kaybının yanı sıra sorumluluk riskini de kapsar. Birçok ev sahibi zaten sözleşmede bunu şart koşar.',
        'Fırtına hasarına özel bir muafiyet (hurricane deductible) çoğu Florida poliçesinde ayrıca tanımlıdır ve genellikle sabit bir tutar değil, sigortalı bedelin bir yüzdesi olarak hesaplanır. Poliçenizi alırken bakacağınız iki satır budur: sel kapsam dışında mı, fırtına muafiyeti nasıl hesaplanıyor?',
      ],
      list: [
        'Sel hasarı ayrı poliçe gerektirir ve bekleme süresi vardır',
        'Kiracının eşyası ev sahibinin poliçesiyle korunmaz',
        'Fırtına muafiyeti genellikle yüzde olarak hesaplanır',
        'Hasar talebi için sezon öncesi çekilmiş fotoğraflar belirleyicidir',
      ],
      note: 'Poliçe koşulları şirkete ve mülke göre değişir; kapsamı kendi poliçenizden okuyun.',
    },
    {
      heading: 'Fırtına geçtikten sonra ne oluyor?',
      body: [
        'Fırtına sonrası dönem çoğu zaman fırtınanın kendisinden uzun sürer. Elektrik kesintisi günlerce, bazı bölgelerde daha uzun sürebilir; trafik ışıkları çalışmadığında kavşaklar dört yönlü durak gibi kullanılır. Su kaynatma uyarısı (boil water notice) yayımlanabilir; kaldırılana kadar musluk suyu içmeyin.',
        'Dönüş kararını kendi başınıza vermeyin: tahliye edilmiş bölgeler yetkililer güvenli ilan ettikten sonra açılır. Erken dönmek, düşmüş elektrik hattı ve taşkın suyu nedeniyle fırtına sırasında kalmaktan daha riskli olabilir.',
        'Hasar varsa önce fotoğraf çekin, sonra geçici koruma yapın (örtme, sızıntıyı durdurma) ve sigorta şirketine bildirin. Fırtına sonrasında kapı kapı dolaşan ve peşin ödeme isteyen tamir tekliflerine karşı temkinli olun; lisanslı müteahhit doğrulaması Florida’da çevrimiçi yapılabilir.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Florida’da kasırga sezonu ne zaman?',
      a: 'Atlantik kasırga sezonu 1 Haziran’da başlar, 30 Kasım’da biter. En yoğun dönem genellikle ağustos ortasından ekim sonuna kadar olan aralıktır. Hazırlıkların sezon başlamadan tamamlanması önerilir, çünkü fırtına yaklaştığında su, pil, yakıt ve panel gibi malzemeler hızla tükenir.',
    },
    {
      q: 'Tahliye edilmem gerekip gerekmediğini nasıl anlarım?',
      a: 'Tahliye kararları adresinizin bağlı olduğu tahliye bölgesine göre verilir ve ilçe yetkilileri duyurur. Bölgenizi Florida Division of Emergency Management’ın adres sorgusundan öğrenebilirsiniz. Bu bilgiyi fırtına yaklaşmadan önce öğrenmek, kararı saatler kazandıracak biçimde basitleştirir.',
    },
    {
      q: 'Ev sigortam sel hasarını karşılar mı?',
      a: 'Hayır. Standart ev sigortası poliçeleri sel hasarını kapsam dışında bırakır; sel için ayrı bir poliçe alınması gerekir. Bu poliçelerde genellikle bir bekleme süresi bulunur, yani fırtına yaklaşırken yapılan başvuru o fırtına için koruma sağlamaz. Sel sigortası sezon öncesinde ayarlanır.',
    },
    {
      q: 'Kiracıysam ne yapmalıyım?',
      a: 'Ev sahibinin poliçesi binayı korur, sizin eşyalarınızı korumaz; bunun için kiracı sigortası gerekir. Ayrıca sözleşme aşamasında evde fırtına paneli ya da darbeye dayanıklı cam olup olmadığını ve fırtına öncesi hazırlığı kimin yapacağını netleştirin.',
    },
    {
      q: 'Yüksek katlı bir binada oturuyorum, yine de tahliye gerekir mi?',
      a: 'Tahliye kararı bina tipine göre değil, bulunduğunuz bölgeye göre verilir. Ayrıca yüksek katta rüzgâr hızı daha yüksektir ve elektrik kesildiğinde asansör, su basıncı ve klima devre dışı kalır. Kalma kararı verilse bile bu koşullara birkaç günlük hazırlık gerekir.',
    },
  ],
  sources: [
    { label: 'National Hurricane Center', url: 'https://www.nhc.noaa.gov/' },
    { label: 'Florida Division of Emergency Management', url: 'https://www.floridadisaster.org/' },
    { label: 'Ready.gov — Kasırga hazırlığı', url: 'https://www.ready.gov/hurricanes' },
  ],
  related: ['nerede-yasanir', 'ev-kiralamak', 'arac-sahibi-olmak'],
};

export default guide;
