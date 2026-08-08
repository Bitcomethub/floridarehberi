import type { Guide } from './types';

export const guide: Guide = {
  slug: 'saglik-sistemi',
  number: 7,
  title: 'Florida’da sağlık sistemi ve sigorta: nasıl çalışır?',
  navLabel: 'Sağlık ve sigorta',
  question: 'Florida’da sağlık sigortası nasıl alınır ve sistem nasıl işler?',
  excerpt:
    'İşveren planı, bireysel piyasa ve acil durum seçenekleri; muafiyet, ortak ödeme ve ağ kavramları; acil servis ile urgent care arasındaki fark.',
  keywords: [
    'amerika sağlık sigortası',
    'florida sağlık sistemi',
    'deductible nedir',
    'urgent care',
    'healthcare.gov',
  ],
  updated: '2026-08-08',
  intro: [
    'Amerika’da herkesi kapsayan bir devlet sağlık sistemi yoktur ve Florida bu tabloda özel bir istisna oluşturmaz. Sağlık hizmetine erişiminiz, sahip olduğunuz sigortanın kapsamına bağlıdır. Sigortasız bir hastane ziyaretinin maliyeti Türkiye’den gelen biri için beklenmedik ölçüde yüksektir; bu yüzden sigorta, Florida hayatında ertelenmemesi gereken ilk kalemlerden biridir.',
    'Sigorta üç kanaldan gelir: işvereniniz üzerinden, bireysel piyasadan (healthcare.gov) ya da belirli koşulları karşılayanlar için kamu programlarından. Hangi kanaldan gelirse gelsin, poliçenin gerçek maliyetini prim değil; muafiyet, ortak ödeme ve ağ yapısı belirler. Bu üç kavramı anlamak, doğru poliçeyi seçmenin tamamıdır.',
  ],
  quickFacts: [
    { label: 'Genel sağlık sigortası', value: 'Yok — sigorta bireysel ya da işveren üzerinden' },
    { label: 'Bireysel piyasa', value: 'healthcare.gov (federal platform)' },
    { label: 'Açık kayıt dönemi', value: 'Kasım başı – ocak ortası' },
    { label: 'Yıl içinde kayıt', value: 'Yalnızca yaşam olayı varsa' },
    { label: 'Acil servis alternatifi', value: 'Urgent care — belirgin şekilde ucuz' },
  ],
  sections: [
    {
      heading: 'Sağlık sigortası nereden alınır?',
      body: [
        'En yaygın kanal işverendir. Tam zamanlı çalışanlara sunulan grup planlarında primin bir bölümünü işveren karşılar ve kalan tutar maaş bordronuzdan kesilir. İşe başladığınızda plan seçimi için sınırlı bir pencere verilir; bu pencereyi kaçırırsanız bir sonraki açık kayıt dönemine kadar beklemeniz gerekebilir.',
        'İşveren planı yoksa bireysel piyasaya gidersiniz. Florida, kendi eyalet borsasını kurmadığı için başvurular federal platform olan healthcare.gov üzerinden yapılır. Burada planlar Bronz, Gümüş, Altın ve Platin olarak kademelendirilir; kademe yükseldikçe prim artar, cepten ödeme payı azalır. Gelir düzeyine bağlı olarak prim desteği uygulanabilir.',
        'Bireysel piyasada kayıt yılda bir kez açılan dönemde yapılır; Florida’da bu dönem kasım başında açılır ve ocak ortasında kapanır. Dönem dışında kayıt olabilmek için nitelikli bir yaşam olayı gerekir: iş kaybı, evlilik, doğum ya da başka bir eyaletten taşınma bunlara örnektir. Taşınma bir yaşam olayı sayıldığı için Florida’ya yeni gelenlerin özel kayıt hakkı doğar — bu pencere sınırlıdır, kaçırmayın.',
      ],
      list: [
        'İşveren grup planı — en yaygın ve genellikle en uygun yol',
        'healthcare.gov bireysel planları — Bronz’dan Platin’e kademeli',
        'Eşin işvereni üzerinden aile kapsamı',
        'Öğrenciler için üniversite planları',
      ],
      note: 'Uygunluk koşulları kişisel duruma göre değişir; kendi durumunuz için healthcare.gov üzerinden doğrulayın.',
    },
    {
      heading: 'Muafiyet, ortak ödeme ve ağ ne demek?',
      body: [
        'Muafiyet (deductible), sigortanın devreye girmesinden önce sizin cepten ödemeniz gereken yıllık tutardır. Muafiyeti yüksek bir planın primi düşüktür, ancak yıl içinde ciddi bir sağlık olayı yaşarsanız önce o tutarı kendiniz ödersiniz. Sağlıklı ve genç biri için düşük primli yüksek muafiyetli plan mantıklı olabilir; düzenli tedavi gören biri için pahalı bir tercihtir.',
        'Ortak ödeme (copay), her ziyarette ödediğiniz sabit tutardır; ortak sigorta (coinsurance) ise faturanın yüzdesel payınızdır. Bunların üzerinde yıllık cepten harcama tavanı (out-of-pocket maximum) bulunur: bu tavana ulaştığınızda kapsam dâhilindeki masrafların tamamını sigorta karşılar. Bir planı değerlendirirken bakılması gereken en önemli tek sayı budur, prim değil.',
        'Ağ (network), sigortanızın anlaşmalı olduğu doktor ve hastane listesidir. Ağ dışındaki bir sağlayıcıya gitmek maliyeti katlar, bazı planlarda ise hiç karşılanmaz. Yeni bir doktora gitmeden önce sağlayıcının ağınızda olduğunu hem sigortacıdan hem klinikten teyit edin — iki taraf listesi her zaman aynı güncellikte olmaz.',
      ],
      table: {
        caption: 'Poliçe kavramları ve pratik anlamları',
        columns: ['Kavram', 'Ne demek', 'Nerede önemli'],
        rows: [
          ['Premium (prim)', 'Aylık sabit ödeme', 'Bütçe planlaması'],
          ['Deductible (muafiyet)', 'Sigorta devreye girmeden önceki cepten tutar', 'Büyük sağlık olayları'],
          ['Copay (ortak ödeme)', 'Ziyaret başına sabit tutar', 'Rutin doktor ziyaretleri'],
          ['Coinsurance', 'Faturanın yüzdesel payınız', 'Ameliyat, görüntüleme'],
          ['Out-of-pocket max', 'Yıllık cepten ödeme tavanı', 'En kötü senaryo koruması'],
          ['Network (ağ)', 'Anlaşmalı sağlayıcı listesi', 'Her ziyaret öncesi'],
        ],
      },
    },
    {
      heading: 'Acil servis mi, urgent care mı?',
      body: [
        'Amerika’da acil servis (emergency room) ile urgent care arasındaki maliyet farkı çok büyüktür ve yeni gelenlerin en pahalı hatası bu ayrımı bilmemektir. Grip, kulak enfeksiyonu, dikiş gerektiren küçük kesikler, burkulma gibi durumlar urgent care kliniklerinde randevusuz ve belirgin şekilde düşük maliyetle görülür.',
        'Acil servis, hayati tehlike taşıyan durumlar içindir: göğüs ağrısı, nefes darlığı, ciddi kanama, bilinç kaybı, felç belirtileri. Bu durumlarda tereddüt etmeyin ve 911’i arayın. Acil servis, ödeme gücünüze bakmaksızın stabilizasyon sağlamakla yükümlüdür; ancak sonrasında fatura gelir.',
        'Üçüncü bir seçenek telesağlık hizmetleridir. Birçok sigorta planı, video görüşmesiyle doktora ulaşmayı düşük ortak ödemeyle sunar. Basit reçete yenilemeleri ve ilk değerlendirme için hızlı ve ucuz bir yoldur.',
      ],
      list: [
        'Urgent care — grip, küçük yaralanma, enfeksiyon; randevusuz',
        'Acil servis — hayati tehlike; maliyeti çok yüksek',
        'Telesağlık — ilk değerlendirme ve reçete yenileme',
        'Birinci basamak hekimi (PCP) — sürekli takip için',
      ],
      note: 'Bir sağlık olayı yaşamadan önce evinize en yakın urgent care kliniğini ve ağınızda olup olmadığını öğrenin.',
    },
    {
      heading: 'Aile hekimi (PCP) neden önemli?',
      body: [
        'Amerikan sisteminde birinci basamak hekimi (primary care physician), sağlık geçmişinizi takip eden ve gerektiğinde uzmana yönlendiren merkezî figürdür. Bazı plan türlerinde — özellikle HMO yapısında — uzman doktora gidebilmek için PCP yönlendirmesi zorunludur. PPO planlarında bu zorunluluk genellikle yoktur ama primi daha yüksektir.',
        'Yeni geldiğinizde henüz hasta olmadan bir PCP seçip ilk randevunuzu almak iyi bir yatırımdır. Popüler hekimlerde yeni hasta randevusu haftalar sürebilir; hastayken sıraya girmek istemezsiniz. İlk ziyarette aşı geçmişinizi ve kronik ilaçlarınızı götürün.',
        'Türkiye’den getirdiğiniz ilaçların Amerika’daki muadilleri farklı isimlerle satılır ve reçetesiz alınamaz. Düzenli kullandığınız bir ilaç varsa, etken madde adını ve dozunu yazılı olarak yanınızda bulundurun; hekim muadilini bu bilgiyle yazar.',
      ],
    },
    {
      heading: 'Sigortasız kaldığınızda ne olur?',
      body: [
        'Sigortasız bir dönem yaşamak Florida’da finansal olarak riskli bir durumdur. Hastaneler tedaviyi reddetmez ancak fatura tam tutar üzerinden gelir ve sigortacıların anlaşmalı indirimlerinden yararlanamazsınız. Aynı işlem için sigortalı bir hastanın ödediği tutar ile sigortasız bir hastanın faturası arasında ciddi fark oluşabilir.',
        'Beklenmedik bir şekilde sigortasız kaldıysanız üç şey yapılabilir. Birincisi, hastanenin finansal yardım (financial assistance) programını sormaktır; kâr amacı gütmeyen hastanelerin çoğunda böyle bir program vardır. İkincisi faturayı taksitlendirmek, üçüncüsü ise kalem kalem dökümünü isteyip hataları itiraz etmektir — faturalama hataları ender değildir.',
        'Kısa boşluk dönemleri için köprü niteliğinde kısa süreli poliçeler satılır. Bunlar ucuzdur ancak kapsamları dardır ve mevcut hastalıkları genellikle dışarıda bırakır. Kalıcı çözüm olarak değil, yalnızca geçici köprü olarak düşünülmelidir.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Florida’ya taşındığımda sağlık sigortasına hemen kaydolabilir miyim?',
      a: 'Başka bir eyaletten Florida’ya taşınmak nitelikli bir yaşam olayı sayılır ve size özel kayıt hakkı doğurur. Bu pencere sınırlıdır, genellikle taşınmayı izleyen 60 gün içinde işlem yapmanız gerekir. Kaçırırsanız bir sonraki açık kayıt dönemini beklemek zorunda kalabilirsiniz.',
    },
    {
      q: 'Türkiye’deki özel sağlık sigortam Amerika’da geçerli mi?',
      a: 'Genellikle hayır. Bazı uluslararası seyahat poliçeleri acil durumları sınırlı süreyle kapsar, ancak Florida’da yerleşik biri için sürekli bir çözüm sunmaz. Yerleşik olduğunuzda Amerikan piyasasından bir poliçeye geçmek gerekir.',
    },
    {
      q: 'Doktor faturası sigortadan sonra da gelir mi?',
      a: 'Evet, bu normaldir. Sigorta payını ödedikten sonra size kalan kısım — muafiyet, ortak ödeme ya da ortak sigorta payı — ayrı bir fatura olarak gelir. Ayrıca sigortacının gönderdiği "Explanation of Benefits" belgesi bir fatura değildir; ne kadarının karşılandığını açıklayan bir özet belgedir.',
    },
    {
      q: 'Diş ve göz sigortası dâhil mi?',
      a: 'Yetişkinler için diş ve göz kapsamı genellikle ayrı poliçelerdir ve standart sağlık planına dâhil değildir. Çocuklarda diş kapsamı bazı planlarda temel fayda olarak yer alır. Poliçe alırken bu iki kalemi ayrıca sormak gerekir.',
    },
    {
      q: 'Reçeteli ilaç maliyetini nasıl düşürebilirim?',
      a: 'Aynı etken maddenin jenerik versiyonunu istemek en etkili yoldur. Ayrıca eczaneler arasında aynı ilacın fiyatı farklılık gösterebilir; sigortanızın anlaşmalı eczane ağını ve varsa posta yoluyla üç aylık tedarik seçeneğini kontrol edin.',
    },
  ],
  sources: [
    { label: 'HealthCare.gov — Federal sigorta platformu', url: 'https://www.healthcare.gov/' },
    { label: 'Florida Department of Health', url: 'https://www.floridahealth.gov/' },
  ],
  related: ['yasam-maliyeti', 'okul-sistemi', 'banka-ve-kredi'],
};

export default guide;
