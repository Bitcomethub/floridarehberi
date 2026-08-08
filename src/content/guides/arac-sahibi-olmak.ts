import type { Guide } from './types';

export const guide: Guide = {
  slug: 'arac-sahibi-olmak',
  number: 5,
  title: 'Florida’da araç sahibi olmak: kayıt, sigorta ve no-fault sistemi',
  navLabel: 'Araç ve sigorta',
  question: 'Florida’da araç almak, kaydettirmek ve sigortalamak nasıl işliyor?',
  excerpt:
    'Araç kaydı, plaka, unvan ve Florida’nın no-fault sigorta sistemi; zorunlu teminatlar, PIP mantığı ve yeni gelenler için pratik uyarılar.',
  keywords: [
    'florida araba kaydı',
    'florida araç sigortası',
    'no-fault sigorta',
    'pip sigorta florida',
    'amerika araba almak',
  ],
  updated: '2026-08-08',
  intro: [
    'Florida’da araç, çoğu bölgede bir tercih değil altyapıdır. Toplu taşıma yalnızca belirli koridorlarda anlamlı çalışır; bunun dışında işe gitmek, market alışverişi ve çocuk okul servisi araç üzerinden kurulur. Bu yüzden bütçe planınızda araç, konuttan sonraki en büyük kalem olarak yer almalıdır.',
    'Sigorta tarafında Florida’nın diğer birçok eyaletten farklı bir sistemi vardır: no-fault. Bu sistemde küçük ölçekli bir kazadan sonra kendi tıbbi masraflarınızı, kusurun kimde olduğuna bakılmaksızın kendi poliçeniz karşılar. Sistem, zorunlu teminat listesini de bu mantığa göre şekillendirir ve yeni gelenlerin en sık yanlış anladığı konudur.',
  ],
  quickFacts: [
    { label: 'Sistem', value: 'No-fault (kusura bakılmaksızın kendi poliçen)' },
    { label: 'Zorunlu PIP', value: '10.000 ABD doları' },
    { label: 'Zorunlu maddi hasar (PDL)', value: '10.000 ABD doları' },
    { label: 'Sigortacı şartı', value: 'Florida’da lisanslı bir şirket olmalı' },
    { label: 'Kayıt için gereken', value: 'Unvan, Florida sigortası, kimlik' },
  ],
  sections: [
    {
      heading: 'Florida’da zorunlu araç sigortası neleri kapsıyor?',
      body: [
        'Florida’da bir aracı kaydettirebilmek için iki teminat zorunludur: 10.000 ABD doları tutarında Kişisel Yaralanma Koruması (PIP) ve 10.000 ABD doları tutarında Maddi Hasar Sorumluluğu (PDL). PIP, kaza sonrası kendi tıbbi masraflarınızın belirli bir oranını kusur aranmaksızın karşılar. PDL ise başkasının malına verdiğiniz zararı karşılar.',
        'Burada dikkat çekici olan şey listede olmayandır: Florida çoğu sürücü için Bedeni Zarar Sorumluluğu (Bodily Injury Liability) teminatını zorunlu tutmaz. Yani karşı tarafta ciddi bir yaralanmaya sebep olursanız, zorunlu minimum poliçeniz bunu karşılamaz ve fark kişisel varlıklarınızdan talep edilebilir. Bu nedenle birçok sigorta uzmanı, yasal minimumun üzerine bedeni zarar teminatı eklenmesini önerir.',
        'İkinci sık atlanan başlık, sigortasız sürücü teminatıdır (Uninsured Motorist). Zorunlu minimumun düşük olduğu bir eyalette, karşı tarafın poliçesinin yetersiz kalma ihtimali gerçektir; bu teminat o boşluğu kapatır.',
      ],
      list: [
        'PIP 10.000 dolar — kendi tıbbi masraflarınız, kusura bakılmaksızın',
        'PDL 10.000 dolar — başkasının malına verdiğiniz zarar',
        'Bedeni zarar sorumluluğu — çoğu sürücü için zorunlu değil, ancak önerilir',
        'Sigortasız sürücü teminatı — opsiyonel, boşluk kapatır',
        'Kasko (comprehensive/collision) — kredili araçlarda finans kuruluşu talep eder',
      ],
      note: 'Zorunlu teminat tutarları ve kapsamı yasa değişiklikleriyle güncellenebilir; poliçe almadan önce güncel gereklilikleri doğrulayın.',
    },
    {
      heading: 'Araç nasıl kaydettirilir?',
      body: [
        'Florida’da araç kaydı, unvan (title) ve plaka işlemleri FLHSMV ile ilçe vergi tahsil dairesi üzerinden yürür. Kayıt için aracın unvanı, Florida’da lisanslı bir sigortacıdan alınmış geçerli poliçeniz ve kimliğiniz gerekir. Başka eyaletten ya da yurt dışından gelen bir aracınız varsa, araç kimlik numarasının (VIN) yerinde doğrulanması istenir.',
        'Florida’da ilk kez araç kaydettiren sürücüler için standart kayıt ücretlerine ek olarak tek seferlik bir ilk kayıt ücreti uygulanır. Bu ücret plakaya bağlıdır ve plakayı başka bir araca aktarırsanız tekrar ödenmez; bu yüzden Florida’da ikinci araç alırken mevcut plakayı devretmek yaygın bir pratiktir.',
        'Sigortasız kalmak Florida’da sadece bir trafik ihlali değildir: sigortanız iptal olduğunda sigortacı bunu FLHSMV’ye bildirir ve sürücü belgeniz ile plakanız askıya alınabilir. Aracı bir süre kullanmayacak olsanız bile, plakayı teslim etmeden poliçeyi iptal etmeyin.',
      ],
      list: [
        'Aracın unvanı (title) ya da satıcıdan devir belgesi',
        'Florida’da lisanslı sigortacıdan poliçe',
        'Florida sürücü belgesi ya da kimlik kartı',
        'Başka eyaletten gelen araçlar için VIN doğrulaması',
        'Kayıt, plaka ve tek seferlik ilk kayıt ücretleri',
      ],
    },
    {
      heading: 'Yeni mi, ikinci el mi almalı?',
      body: [
        'Amerika’da ikinci el araç piyasası derin ve şeffaftır; bir aracın geçmişi VIN üzerinden raporlanabilir. Kaza kaydı, kilometre tutarsızlığı, sel hasarı ve kaç sahip değiştirdiği bu raporlarda görünür. Florida’da özellikle sel hasarı kaydına dikkat edin: kasırga sonrası su altında kalmış araçlar onarılıp piyasaya geri döner ve elektronik arızaları yıllar sonra ortaya çıkar.',
        'Kredi geçmişiniz yoksa araç kredisi almak zor ya da yüksek faizli olur. Bu durumda iki yaygın yol vardır: peşin ödemeye uygun daha uygun bir araçla başlamak ya da birkaç ay kredi geçmişi oluşturduktan sonra finansmana gitmek. Bayilerin “yeni gelenlere özel” programları vardır ancak faiz oranları genellikle yüksektir.',
        'Bayiden alırken ilan edilen fiyatın üzerine gelen kalemleri sorun: bayi hazırlık ücreti, unvan ve kayıt masrafları, satış vergisi. Toplam ödeyeceğiniz tutarı gösteren yazılı dökümü (out-the-door price) istemek pazarlığın standart parçasıdır.',
      ],
    },
    {
      heading: 'Sigorta primi neye göre belirleniyor?',
      body: [
        'Florida araç sigortası primleri ülke genelinde yüksek sayılır ve bunun birkaç yapısal nedeni vardır: nüfus yoğunluğu, turist trafiği, sigortasız sürücü oranı ve hava olayları. Primi belirleyen kişisel değişkenler ise sürüş geçmişiniz, yaşınız, aracın modeli, yaşadığınız posta kodu ve kredi geçmişinizdir.',
        'Yeni gelenler için en can sıkıcı nokta şudur: Türkiye’deki hasarsızlık geçmişiniz Amerika’ya taşınmaz. Sigortacılar sizi geçmişi olmayan bir sürücü gibi fiyatlar ve ilk yıl primi belirgin şekilde yüksek olur. Bazı şirketler, önceki ülkenizdeki sigortacıdan alınmış hasarsızlık yazısını dikkate alır; poliçe alırken bunu sormaya değer.',
        'Prim üzerinde en hızlı etki eden kaldıraç muafiyet (deductible) tutarıdır. Muafiyeti yükseltmek primi düşürür, ancak bir kaza durumunda cepten ödeyeceğiniz tutarı artırır. Bu dengeyi acil durum birikiminize göre kurun.',
      ],
      note: 'Florida’da kredi geçmişi sigorta fiyatlamasında kullanılabilir; kredi skorunuzu iyileştirmek dolaylı olarak sigorta priminizi de düşürür.',
    },
    {
      heading: 'Kaza durumunda ne yapılır?',
      body: [
        'Kaza sonrası ilk adım güvenliktir: mümkünse araçları trafiği engellemeyecek şekilde kenara çekin ve yaralı varsa 911’i arayın. Yaralanma, ölüm ya da aracın çekiciyle taşınmasını gerektirecek hasar varsa kolluk raporu tutulması gerekir.',
        'Karşı tarafla sigorta ve iletişim bilgilerini paylaşın; olay yerinde kusur tartışmasına girmeyin. No-fault sisteminde kendi tıbbi masraflarınız kendi PIP teminatınızdan karşılanır, dolayısıyla olay yerinde kusuru belirlemek pratik bir sonuç doğurmaz.',
        'PIP teminatından yararlanmak için kaza sonrasında belirli bir süre içinde tıbbi muayeneden geçmeniz gerekir; bu süreyi kaçırmak teminat hakkınızı ortadan kaldırabilir. Kendinizi iyi hissetseniz bile kaza sonrası kontrolü ertelemeyin ve süreleri sigortacınızdan teyit edin.',
      ],
      list: [
        'Yaralanma varsa 911’i arayın ve kolluk raporu tutturun',
        'Fotoğraf çekin: araçlar, plakalar, konum, yol koşulları',
        'Sigorta ve iletişim bilgilerini paylaşın, kusur tartışmayın',
        'Sigortacınıza en kısa sürede bildirin',
        'PIP için tıbbi muayene süresini kaçırmayın',
      ],
    },
  ],
  faqs: [
    {
      q: 'Florida’da zorunlu araç sigortası ne kadar?',
      a: 'Yasal minimum, 10.000 ABD doları Kişisel Yaralanma Koruması (PIP) ve 10.000 ABD doları Maddi Hasar Sorumluluğu (PDL) teminatlarıdır. Bu minimum, karşı tarafta oluşabilecek ciddi yaralanma masraflarını kapsamaz; birçok sürücü bedeni zarar sorumluluğu teminatını ayrıca ekler.',
    },
    {
      q: 'No-fault sistemi ne anlama geliyor?',
      a: 'Kaza sonrası kendi tıbbi masraflarınızın belirli bir oranı, kusurun kimde olduğuna bakılmaksızın kendi PIP teminatınızdan karşılanır. Bu, küçük kazalarda dava sürecini kısaltmayı amaçlar. Ciddi ve kalıcı yaralanmalarda karşı tarafa dava açma hakkı belirli eşikler aşıldığında doğar.',
    },
    {
      q: 'Türkiye’deki hasarsızlık indirimim geçerli olur mu?',
      a: 'Otomatik olarak geçmez; Amerikan sigortacıları genellikle yerel geçmişe bakar. Bazı şirketler önceki sigortacınızdan alınmış hasarsızlık yazısını değerlendirmeye alır, bu yüzden Türkiye’den ayrılmadan bu belgeyi almak işinize yarayabilir. İlk yıl priminizin yüksek olmasını beklemek gerçekçi bir planlamadır.',
    },
    {
      q: 'Sigortam iptal olursa ne olur?',
      a: 'Sigortacı iptali FLHSMV’ye bildirir. Aracınız kayıtlıyken sigortasız kalmak, sürücü belgenizin ve plakanızın askıya alınmasıyla sonuçlanabilir; yeniden aktifleştirmek için ceza ödemeniz gerekir. Aracı kullanmayacaksanız önce plakayı teslim edin, sonra poliçeyi iptal edin.',
    },
    {
      q: 'Sel hasarlı araçtan nasıl kaçınırım?',
      a: 'Satın almadan önce VIN üzerinden araç geçmiş raporu alın ve unvan üzerinde “flood” ya da “salvage” işareti olup olmadığını kontrol edin. Kasırga sonrası dönemlerde bu araçlar başka eyaletlere taşınıp temiz unvanla satılabildiği için, bağımsız bir tamirciye ön kontrol yaptırmak en güvenilir adımdır.',
    },
  ],
  sources: [
    { label: 'FLHSMV — Araç kaydı ve unvan işlemleri', url: 'https://www.flhsmv.gov/motor-vehicles-tags-titles/' },
    { label: 'Florida Office of Insurance Regulation', url: 'https://floir.com/' },
  ],
  related: ['ehliyet', 'yasam-maliyeti', 'kasirga-sezonu'],
};

export default guide;
