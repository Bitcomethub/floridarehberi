import type { Guide } from './types';

export const guide: Guide = {
  slug: 'banka-ve-kredi',
  number: 9,
  title: 'Banka hesabı açmak ve kredi geçmişi kurmak',
  navLabel: 'Banka ve kredi',
  question: 'Amerika’da banka hesabı nasıl açılır ve kredi puanı sıfırdan nasıl kurulur?',
  excerpt:
    'Hesap açarken istenen belgeler, checking ile savings farkı, kredi puanının nasıl çalıştığı ve sıfırdan geçmiş kurmanın pratik yolları.',
  keywords: [
    'amerika banka hesabı açmak',
    'kredi puanı nasıl yükselir',
    'fico skoru',
    'secured credit card',
    'ssn itin banka',
  ],
  updated: '2026-08-08',
  intro: [
    'Amerika’ya taşınan bir hanenin ilk haftalarındaki en kritik iki adım banka hesabı açmak ve kredi geçmişi kurmaya başlamaktır. Hesap açmak görece kolaydır; kredi geçmişi ise zaman ister ve Türkiye’deki geçmişiniz buraya taşınmaz — sıfırdan başlarsınız. Bu iki işi ne kadar erken başlatırsanız, ev kiralamak, araç almak ve telefon hattı açmak o kadar kolaylaşır.',
    'Kredi puanı Amerika’da yalnızca bankaların değil, ev sahiplerinin, sigorta şirketlerinin ve bazı işverenlerin de baktığı bir sinyaldir. “Borcum yok, o hâlde puanım iyidir” varsayımı burada yanlıştır: hiç kredi kullanmamış biri iyi puanlı değil, puansızdır ve sistem bunu risk olarak okur.',
  ],
  quickFacts: [
    { label: 'Hesap için gereken', value: 'Kimlik + adres kanıtı + SSN ya da ITIN' },
    { label: 'Günlük hesap', value: 'Checking (vadesiz)' },
    { label: 'Kredi puanı aralığı', value: 'FICO: 300–850' },
    { label: 'Geçmiş taşınır mı?', value: 'Hayır — Türkiye’deki geçmiş geçmez' },
    { label: 'İlk adım', value: 'Teminatlı (secured) kart ya da banka içi ürün' },
  ],
  sections: [
    {
      heading: 'Banka hesabı açmak için ne gerekiyor?',
      body: [
        'Bankalar genellikle üç şey ister: fotoğraflı kimlik, Amerika’daki adresinizin kanıtı ve bir vergi kimlik numarası. Fotoğraflı kimlik olarak pasaport kabul edilir; Florida ehliyeti ya da eyalet kimliği aldıysanız süreç daha da hızlanır. Adres kanıtı için kira sözleşmesi ya da adınıza gelen bir fatura kullanılır.',
        'Vergi kimlik numarası tarafında iki seçenek vardır: çalışma yetkiniz varsa Social Security Number (SSN), yoksa IRS’ten alınan ITIN. Bazı bankalar ITIN ile hesap açar, bazıları açmaz — politikalar bankadan bankaya değişir. Bu nedenle tek bir şubeden aldığınız “olmaz” yanıtını genel kural saymayın; ikinci ve üçüncü bankayı da deneyin.',
        'Şubeye giderken randevu almak ve belgeleri asıllarıyla götürmek işlemi tek seferde bitirir. Hesap açılışında size bir debit kart verilir, fiziksel kart genellikle bir hafta içinde posta ile gelir.',
      ],
      list: [
        'Pasaport (ve varsa Florida ehliyeti / eyalet kimliği)',
        'Adres kanıtı: kira sözleşmesi ya da adınıza fatura',
        'SSN ya da ITIN',
        'Bazı bankalarda minimum açılış tutarı',
      ],
      note: 'ITIN ile hesap açma politikası bankadan bankaya değişir; ilk “hayır” yanıtı genel kural değildir.',
    },
    {
      heading: 'Checking ile savings arasındaki fark ne?',
      body: [
        'Checking hesabı günlük harcama hesabıdır: maaş buraya yatar, kira ve faturalar buradan ödenir, debit kart buna bağlıdır. Savings hesabı ise biriktirme hesabıdır, faiz getirir ancak aydaki işlem sayısı sınırlı olabilir. Çoğu hane ikisini birlikte açar ve maaşın bir kısmını otomatik olarak savings’e aktarır.',
        'Aylık hesap işletim ücreti (monthly maintenance fee) Amerika’da yaygındır ama neredeyse her bankada muafiyet koşulu vardır: düzenli maaş yatması, asgari bakiye tutulması ya da belirli sayıda otomatik ödeme. Hesap açarken “bu ücretten nasıl muaf olurum?” sorusunu açıkça sorun; yıllık toplamı küçümsenmeyecek bir tutardır.',
        'Havale tarafında iki temel yöntem vardır: ücretsiz ve birkaç iş günü süren ACH transferi, hızlı ama ücretli olan wire transfer. Kira ödemesi gibi düzenli işlemler için ACH ya da banka içi ödeme yeterlidir. Kişiden kişiye küçük ödemelerde Zelle gibi banka içi servisler yaygın kullanılır.',
      ],
    },
    {
      heading: 'Kredi puanı nasıl hesaplanıyor?',
      body: [
        'En yaygın model FICO’dur ve 300 ile 850 arasında bir değer üretir. Puan tek bir işlemden değil, zaman içindeki davranış deseninden çıkar. Ağırlığı en yüksek iki başlık ödeme geçmişi ve kullanım oranıdır: borcunuzu zamanında ödemek ve limitinizin küçük bir bölümünü kullanmak puanı yukarı çeker.',
        'Kullanım oranı (utilization) çoğu yeni gelenin kaçırdığı noktadır. Limiti 1.000 dolar olan bir kartta ay içinde 900 dolar harcayıp ay sonunda tamamını ödemek, borcu kapatmış olsanız bile yüksek kullanım olarak raporlanabilir. Kullanımı düşük tutmak, borcu sıfırlamaktan farklı bir davranıştır ve puana ayrı katkı yapar.',
        'Diğer başlıklar hesap geçmişinizin ortalama yaşı, kredi türlerinin çeşitliliği ve yeni başvuru sayısıdır. Kısa sürede çok sayıda kredi başvurusu yapmak puanı geçici olarak düşürür — bu yüzden ev ya da araç kredisi almayı planlıyorsanız, o dönemde yeni kart başvurularını durdurun.',
      ],
      table: {
        caption: 'Kredi puanını etkileyen başlıklar',
        columns: ['Başlık', 'Ne anlama geliyor', 'Pratik davranış'],
        rows: [
          ['Ödeme geçmişi', 'Vadesinde ödediniz mi', 'Otomatik ödeme kurun, asla geciktirmeyin'],
          ['Kullanım oranı', 'Limitin ne kadarını kullandınız', 'Limitin küçük bir kısmında kalın'],
          ['Hesap yaşı', 'Hesaplarınız ne kadar eski', 'İlk kartınızı kapatmayın'],
          ['Kredi çeşitliliği', 'Farklı ürün türleri', 'Zamanla doğal olarak oluşur'],
          ['Yeni başvurular', 'Son dönemdeki sorgu sayısı', 'Başvuruları yığmayın'],
        ],
        note: 'Ağırlıklar modele göre değişir; buradaki sıralama genel eğilimi anlatır, kesin yüzde değildir.',
      },
    },
    {
      heading: 'Sıfırdan kredi geçmişi nasıl kurulur?',
      body: [
        'Puanınız yokken standart kredi kartı başvuruları büyük olasılıkla reddedilir. Bu bir engel değil, bilinen bir başlangıç durumudur ve bunun için tasarlanmış ürünler vardır. En yaygını teminatlı karttır (secured credit card): bankaya bir depozito yatırırsınız, kartın limiti bu tutar kadar olur. Kartı normal bir kart gibi kullanır, borcu zamanında ödersiniz ve bu davranış kredi bürolarına raporlanır.',
        'Birkaç ay düzenli kullanımdan sonra bankalar teminatı iade edip kartı standart karta çevirebilir. İkinci bir yol, hâlihazırda kredi geçmişi olan bir aile bireyinin kartında yetkili kullanıcı (authorized user) olarak eklenmenizdir; o hesabın geçmişi belirli koşullarda sizin dosyanıza da yansır.',
        'Sabır bu işin asıl bileşenidir. Ödeme geçmişi zamanla birikir; ilk anlamlı puan genellikle birkaç aylık raporlamadan sonra oluşur ve güçlü bir profil için daha uzun bir süre gerekir. Bu yüzden ev alma ya da araç kredisi planınız varsa, kredi kurma işine varış gününde başlamak en doğru sıralamadır.',
      ],
      list: [
        'Teminatlı kart (secured card) ile başlayın',
        'Küçük ve düzenli harcayın, tamamını vadesinde ödeyin',
        'Otomatik ödeme kurun — tek gecikme uzun süre görünür',
        'İlk kartınızı ileride kapatmayın; hesap yaşınızı taşır',
        'Yılda bir kez ücretsiz kredi raporunuzu kontrol edin',
      ],
    },
    {
      heading: 'Kredi puanı nerelerde karşınıza çıkıyor?',
      body: [
        'Kredi puanı yalnızca kredi başvurularında değil, günlük hayatın birçok noktasında sorulur. Ev kiralarken ev sahipleri kredi raporunuza bakar ve düşük ya da yok puan, ek depozito ya da kefil talebine dönüşebilir. Araç sigortasında birçok şirket kredi tabanlı bir sigorta skoru kullanır. Telefon hattı ya da bazı abonelikler açılırken de sorgulanabilir.',
        'Bu nedenle Amerika’ya yeni gelen bir hane için pratik strateji şudur: ilk kiralamayı kredi geçmişi olmadan yapabilmek için peşin ödeme, ek depozito ya da işveren mektubu gibi alternatif kanıtları hazır tutun; aynı anda kredi kurma sürecini başlatın. Bir yıl sonra ikinci kiralama ya da araç alımı çok daha az sürtünmeyle geçer.',
        'Kredi raporunuzu üç büyük bürodan yılda bir kez ücretsiz alma hakkınız vardır. Hatalı bir kayıt puanınızı gereksiz yere düşürebilir; raporu okumak ve itiraz etmek sizin hakkınızdır.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Türkiye’deki kredi geçmişim Amerika’da geçerli mi?',
      a: 'Hayır. Kredi büroları ülke bazlıdır ve Türkiye’deki ödeme geçmişiniz Amerika’daki dosyanıza aktarılmaz. Amerika’da sıfırdan başlarsınız; bu kötü bir puan değil, puansız olma durumudur ve teminatlı kart gibi ürünlerle birkaç ay içinde başlatılabilir.',
    },
    {
      q: 'SSN’im yok, banka hesabı açabilir miyim?',
      a: 'Birçok banka ITIN ile hesap açar, ancak bu politika bankadan bankaya ve hatta şubeden şubeye değişir. Pasaport, Amerika’daki adres kanıtı ve ITIN belgenizle birkaç farklı bankayı denemek en pratik yaklaşımdır; ilk aldığınız olumsuz yanıt genel kural değildir.',
    },
    {
      q: 'Kredi puanı ne kadar sürede oluşur?',
      a: 'Bürolara raporlanan bir hesabınız olduktan sonra ilk puanın oluşması genellikle birkaç ay alır. Güçlü sayılan bir profil ise düzenli ödeme ve düşük kullanım oranıyla daha uzun bir süre içinde birikir. Bu yüzden kredi kurma işine varır varmaz başlamak, ev ve araç planlarınızı öne çeker.',
    },
    {
      q: 'Kredi kartı borcumu her ay tamamen ödemem kredi puanımı yükseltir mi?',
      a: 'Zamanında ve tam ödeme puanın en ağırlıklı bileşenidir, dolayısıyla evet. Ancak ay içinde limitin büyük bölümünü kullanıp sonra kapatmak yüksek kullanım oranı olarak raporlanabilir. Hem düşük kullanım hem de tam ödeme birlikte en iyi sonucu verir.',
    },
    {
      q: 'Kaç tane kredi kartım olmalı?',
      a: 'Sayının kendisi hedef değildir. Bir kartı düzenli ve düşük kullanımla taşımak, çok sayıda kartı dağınık kullanmaktan iyidir. Zamanla ikinci bir kart eklemek çeşitlilik açısından yardımcı olabilir, ancak kısa sürede arka arkaya başvuru yapmak puanı geçici olarak düşürür.',
    },
  ],
  sources: [
    {
      label: 'Consumer Financial Protection Bureau — Kredi ve bankacılık',
      url: 'https://www.consumerfinance.gov/',
    },
    { label: 'AnnualCreditReport.com — Ücretsiz kredi raporu', url: 'https://www.annualcreditreport.com/' },
  ],
  related: ['ev-kiralamak', 'vergiler', 'arac-sahibi-olmak'],
};

export default guide;
