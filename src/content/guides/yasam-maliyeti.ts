import type { Guide } from './types';

export const guide: Guide = {
  slug: 'yasam-maliyeti',
  number: 2,
  title: 'Florida’da yaşam maliyeti: Miami, Orlando ve Tampa karşılaştırması',
  navLabel: 'Yaşam maliyeti',
  question: 'Florida’da aylık yaşam maliyeti neyden oluşur ve şehirler arasında nasıl değişir?',
  excerpt:
    'Florida bütçesini oluşturan altı kalem — konut, sigorta, araç, elektrik, sağlık ve vergi — ve Miami, Orlando, Tampa arasındaki yapısal farklar.',
  keywords: [
    'florida yaşam maliyeti',
    'miami aylık gider',
    'orlando yaşam maliyeti',
    'tampa maliyet',
    'florida bütçe',
  ],
  updated: '2026-08-08',
  intro: [
    'Florida’da aylık bütçe, Türkiye’den bakınca beklenenden farklı bir dağılım gösterir. Eyalet gelir vergisi olmadığı için brüt maaşın daha büyük bir kısmı cebe girer; buna karşılık konut, sigorta, araç ve klima kaynaklı elektrik kalemleri toplamı yukarı çeker. Yani “vergi yok” avantajı gerçektir ama otomatik olarak ucuz hayat anlamına gelmez.',
    'Bu rehber size aylık bir toplam rakam vermez — çünkü dürüst bir toplam yoktur. Miami Beach’te iki yatak odalı bir dairede yaşamakla Tampa’nın iç kesiminde aynı evde yaşamak arasındaki fark, bir maaş farkına denk gelebilir. Bunun yerine bütçenizi oluşturan kalemleri tek tek açar ve her birinde şehirler arası farkın nereden geldiğini gösterir.',
  ],
  quickFacts: [
    { label: 'Eyalet gelir vergisi', value: 'Yok (Florida Anayasası)' },
    { label: 'Eyalet satış vergisi', value: '%6 + ilçe ek vergisi' },
    { label: 'Bütçenin en büyük kalemi', value: 'Konut' },
    { label: 'En çok şaşırtan kalem', value: 'Konut sigortası ve yaz elektriği' },
    { label: 'Araç', value: 'Çoğu bölgede zorunlu gider' },
  ],
  sections: [
    {
      heading: 'Florida bütçesi hangi kalemlerden oluşur?',
      body: [
        'Bir Florida hanesinin aylık giderini altı başlıkta düşünmek işe yarar: konut (kira ya da kredi taksiti), sigorta (ev/kiracı ve araç), araç (taksit, yakıt, bakım), elektrik ve su, sağlık sigortası primi, gıda ve diğer. Türkiye’den gelenlerin bütçe kurarken en sık eksik bıraktığı iki kalem sigorta ve sağlık primidir; ikisi de Türkiye’de ya çok daha küçük ya da devlet tarafından karşılanan kalemlerdir.',
        'Konut kalemi bütçenin en büyük parçasıdır ve şehirler arasındaki farkın da neredeyse tamamını açıklar. Diğer kalemler — gıda, yakıt, telefon, internet — Florida içinde şehirden şehre çarpıcı biçimde değişmez. Yani “Orlando daha ucuz” cümlesi pratikte “Orlando’da konut daha ucuz” demektir.',
        'Vergi tarafı ise tersine çalışır: eyalet genelinde gelir vergisi yoktur, dolayısıyla bu avantaj şehre göre değişmez. Ancak emlak vergisi ilçe bazında belirlenir ve ev sahibiyseniz bütçenizde şehre göre değişen gerçek bir kalemdir.',
      ],
      list: [
        'Konut — bütçenin en büyük ve şehirler arası farkı yaratan kalemi',
        'Sigorta — Florida’ya özgü şekilde ağır; konum ve çatı yaşına duyarlı',
        'Araç — çoğu bölgede opsiyonel değil',
        'Elektrik — yaz aylarında klima nedeniyle belirgin sıçrama yapar',
        'Sağlık sigortası — işveren karşılamıyorsa hanenin en riskli kalemi',
      ],
    },
    {
      heading: 'Miami, Orlando ve Tampa arasındaki fark nereden geliyor?',
      body: [
        'Üç şehir arasındaki maliyet farkı büyük ölçüde arazi ve risk üzerinden kurulur. Miami-Dade coğrafi olarak sıkışmıştır: batıda Everglades, doğuda okyanus. Yeni konut üretebileceği alan sınırlıdır, bu da fiyatı yapısal olarak yukarıda tutar. Orlando ve Tampa çevrelerinde ise genişleyebilecek arazi vardır; konut arzı talebe daha hızlı cevap verir.',
        'İkinci fark sigortadır. Sahil ve körfez hattına yaklaştıkça fırtına kabarması riski artar, primler yükselir. Orlando iç kesimde olduğu için bu kalemde yapısal bir avantaja sahiptir. Bu avantaj kiracıya doğrudan görünmez ama ev sahibinin maliyetine girdiği için kira seviyesine dolaylı yansır.',
        'Üçüncü fark ulaşımdır ve tersine çalışır: Orlando ve Tampa’da mesafeler uzun, toplu taşıma seyrektir; bu, hane başına ikinci araç ihtiyacını artırır. Miami’nin yoğun koridorlarında tek araçla, hatta bazı durumlarda araçsız yaşamak mümkündür. Konut tarafında kazandığınızı ulaşım tarafında kısmen geri verirsiniz.',
      ],
      table: {
        caption: 'Üç metropolde bütçe kalemlerinin göreli ağırlığı',
        columns: ['Kalem', 'Miami bölgesi', 'Orlando', 'Tampa Körfezi'],
        rows: [
          ['Kira / konut', 'En yüksek', 'Daha uygun', 'Daha uygun'],
          ['Konut sigortası', 'En yüksek', 'En düşük (iç kesim)', 'Yüksek (körfez hattı)'],
          ['Araç ihtiyacı', 'Koridorlarda düşük', 'Çok yüksek', 'Yüksek'],
          ['Yaz elektriği', 'Yüksek', 'Yüksek', 'Yüksek'],
          ['Gıda ve market', 'Benzer', 'Benzer', 'Benzer'],
          ['Eyalet gelir vergisi', 'Yok', 'Yok', 'Yok'],
        ],
        note: 'Göreli karşılaştırmadır. Mahalle, bina yaşı ve tahliye bölgesi aynı şehir içinde bu sıralamayı tersine çevirebilir.',
      },
    },
    {
      heading: 'Yaz elektrik faturası neden bu kadar yükseliyor?',
      body: [
        'Florida’da klima lüks değil, altyapıdır. Mayıs ile ekim arasında nem yüksek seyreder ve klima çoğu evde günün büyük bölümünde çalışır. Bunun sonucu, yaz aylarında elektrik faturasının kış aylarına göre belirgin biçimde artmasıdır. Türkiye’den gelen birçok hane bütçesini kış faturasına göre kurar ve temmuz–ağustos faturasında sürprizle karşılaşır.',
        'Faturayı belirleyen en güçlü değişken evin yalıtımı ve klima ünitesinin yaşıdır. Eski bir merkezi sistem, aynı büyüklükteki iyi yalıtılmış bir daireye göre kat kat fazla tüketebilir. Kiralık ev bakarken klimanın kaç yaşında olduğunu ve son ne zaman bakım gördüğünü sormak, doğrudan bütçe sorusudur.',
        'Bazı binalarda su ve çöp toplama kira içindedir, elektrik ise ayrıdır. Sözleşme imzalamadan önce hangi kalemin dâhil olduğunu yazılı olarak netleştirin.',
      ],
      note: 'Elektrik dağıtıcınız bölgeye göre değişir: Güney Florida’nın büyük kısmında FPL, Tampa’da TECO, Orlando çevresinde Duke Energy ya da OUC.',
    },
    {
      heading: 'Sağlık sigortası bütçeyi nasıl etkiliyor?',
      body: [
        'Amerika’da genel sağlık sigortası yoktur; sigorta ya işveren üzerinden ya da bireysel piyasadan alınır. İşvereniniz plan sunuyorsa primin bir kısmını genellikle işveren karşılar ve kalan tutar maaş bordronuzdan kesilir. İşveren planı yoksa bireysel poliçe hane bütçesinin en büyük tekil kalemlerinden biri hâline gelebilir.',
        'Prim tek başına yeterli bir gösterge değildir. Poliçenin muafiyeti (deductible), ortak ödeme tutarları ve yıllık cepten harcama tavanı, gerçek maliyeti prim kadar belirler. Düşük primli bir plan, yüksek muafiyeti nedeniyle bir sağlık olayında çok daha pahalıya gelebilir.',
        'Sağlık sistemi ve poliçe seçimi ayrı bir rehberde ayrıntılandırılmıştır.',
      ],
    },
    {
      heading: 'Gelir vergisi olmaması ne kadar avantaj sağlıyor?',
      body: [
        'Florida’nın eyalet düzeyinde kişisel gelir vergisi almaması, eyaletin anayasasında yer alan kalıcı bir düzenlemedir. Bu, gelir vergisi alan eyaletlerden Florida’ya taşınan biri için doğrudan ve her ay hissedilen bir farktır. Ancak federal gelir vergisi ödemeye devam edersiniz; “Florida’da vergi yok” cümlesi yalnızca eyalet katmanı için doğrudur.',
        'Eyalet, gelirden almadığı vergiyi başka kanallardan toplar. Satış vergisi eyalet düzeyinde %6’dır ve ilçeler bunun üzerine ek bir oran uygulayabilir; toplam oran ilçeye göre değişir. Emlak vergisi ilçe ve okul bölgesi tarafından belirlenir ve ev sahipleri için düzenli bir yıllık yüktür. Turizm ağırlıklı ilçelerde konaklama vergileri de bütçeye katkı sağlar.',
        'Pratik sonuç: Florida çalışan bir hane için gelir tarafında avantajlı, mülk sahibi bir hane için gider tarafında dikkat isteyen bir eyalettir.',
      ],
    },
    {
      heading: 'Taşınmadan önce hangi maliyetleri hesaba katmalı?',
      body: [
        'İlk aya özgü giderler, düzenli aylık bütçenin dışında ayrı bir kalem olarak planlanmalıdır. Kiralamada genellikle ilk ay kirası ve depozito peşin istenir; bazı ev sahipleri son ay kirasını da talep eder. Başvuru ve kredi kontrol ücretleri her başvuru için ayrı ödenir ve iade edilmez.',
        'Araç tarafında ilk kayıt, plaka ve unvan işlemleri tek seferlik bir maliyet çıkarır. Florida’ya ilk kez araç kaydettiren sürücüler için standart kayıt ücretlerine ek, tek seferlik bir ilk kayıt ücreti uygulanır. Ayrıca aracınızı kaydettirebilmek için Florida’da lisanslı bir sigortacıdan alınmış poliçe göstermeniz gerekir.',
        'Eşya taşıma, geçici konaklama ve ilk aylarda kredi geçmişiniz olmadığı için istenebilecek ek depozitoları da listeye ekleyin. Amerika’da kredi geçmişi olmayan bir kiracıdan daha yüksek depozito istenmesi olağandır.',
      ],
      list: [
        'İlk ay kirası + depozito (bazen son ay kirası)',
        'Başvuru ve kredi kontrol ücretleri — iade edilmez',
        'Araç ilk kayıt, plaka ve unvan masrafları',
        'Elektrik, su ve internet abonelik açılış depozitoları',
        'Kredi geçmişi olmayanlardan istenen ek güvence',
      ],
      note: 'Ücretler ve oranlar yıldan yıla ve ilçeden ilçeye değişir; güncel tutarları resmî kaynaktan doğrulayın.',
    },
  ],
  faqs: [
    {
      q: 'Florida’da yaşamak New York’tan ucuz mu?',
      a: 'Konut ve vergi tarafında genellikle evet: Florida’da eyalet gelir vergisi yoktur ve New York City ölçeğinde bir konut baskısı Florida’nın çoğu yerinde bulunmaz. Ancak Miami Beach ya da Brickell gibi mikro piyasalarda konut maliyeti New York’un birçok mahallesiyle yarışır. Ayrıca Florida’da konut sigortası ve araç maliyeti belirgin şekilde daha ağırdır.',
    },
    {
      q: 'Aylık ne kadar paraya ihtiyacım var?',
      a: 'Bu sorunun dürüst tek bir cevabı yoktur; hane büyüklüğü, şehir, mahalle ve sağlık sigortanızı işverenin karşılayıp karşılamadığı toplamı ikiye katlayabilir. Sağlıklı yöntem, bu rehberdeki altı kalemi kendi durumunuz için ayrı ayrı fiyatlandırmak ve üzerine beklenmedik giderler için pay eklemektir.',
    },
    {
      q: 'Kiracıysam konut sigortası ödemem gerekir mi?',
      a: 'Ev sahibinin poliçesi binayı korur, eşyalarınızı korumaz. Kiracı sigortası (renters insurance) eşyalarınızı ve üçüncü kişilere karşı sorumluluğunuzu kapsar ve birçok ev sahibi sözleşmede bunu zorunlu tutar. Ev sigortasına kıyasla belirgin şekilde düşük maliyetlidir.',
    },
    {
      q: 'Satış vergisi ne kadar?',
      a: 'Eyalet oranı %6’dır. İlçeler bunun üzerine kendi ek oranlarını uygulayabilir, dolayısıyla ödediğiniz toplam oran yaşadığınız ilçeye göre değişir. Market alışverişinde birçok temel gıda ürünü satış vergisinden muaftır; hazır yiyecek ve restoran harcaması muaf değildir.',
    },
    {
      q: 'Florida’da elektrik faturası kışın da yüksek mi?',
      a: 'Genellikle hayır. Faturanın tepe noktası yaz aylarıdır; klima yükü ortadan kalktığında kış faturaları belirgin şekilde düşer. Kuzey Florida’da soğuk gecelerde ısıtma nedeniyle küçük bir kış artışı görülebilir, ancak yaz zirvesine yaklaşmaz.',
    },
  ],
  sources: [
    { label: 'Florida Department of Revenue — Satış ve kullanım vergisi', url: 'https://floridarevenue.com/taxes/taxesfees/Pages/sales_tax.aspx' },
    { label: 'U.S. Bureau of Labor Statistics — Tüketici harcama verileri', url: 'https://www.bls.gov/cex/' },
  ],
  related: ['nerede-yasanir', 'vergiler', 'saglik-sistemi'],
};

export default guide;
