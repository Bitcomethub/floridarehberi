import type { Guide } from './types';

export const guide: Guide = {
  slug: 'okul-sistemi',
  number: 6,
  title: 'Florida’da okul sistemi: kayıt, seçenekler ve okul bölgeleri',
  navLabel: 'Okul sistemi',
  question: 'Florida’da çocuğumu okula nasıl kaydettiririm ve okul seçenekleri neler?',
  excerpt:
    'K-12 yapısı, adrese göre okul ataması, kontrollü açık kayıt, charter ve magnet okullar, kayıt için gereken sağlık belgeleri ve okul takvimi.',
  keywords: [
    'florida okul sistemi',
    'amerika okul kaydı',
    'charter okul nedir',
    'magnet okul',
    'florida okul bölgesi',
  ],
  updated: '2026-08-08',
  intro: [
    'Florida’da devlet okulları ilçe düzeyinde örgütlenir: her ilçenin tek bir okul bölgesi (school district) vardır ve Miami-Dade, Broward, Orange gibi büyük ilçelerin bölgeleri ülkenin en kalabalık okul sistemleri arasındadır. Çocuğunuz varsayılan olarak ev adresinize göre bir okula atanır; ancak Florida’da bu atama tek seçenek değildir.',
    'Sistem K-12 olarak adlandırılır: anaokulu (kindergarten) sonrası 12 sınıf. Genel yapı ilkokul, ortaokul ve lise şeklinde üçe ayrılır ve okullar A’dan F’ye kadar bir not sistemiyle eyalet tarafından derecelendirilir. Bu notlar kamuya açıktır ve birçok aile ev ararken bu bilgiyi mahalle seçiminin bir parçası olarak kullanır.',
  ],
  quickFacts: [
    { label: 'Sistem', value: 'K-12, ilçe okul bölgeleri' },
    { label: 'Varsayılan atama', value: 'Ev adresine göre' },
    { label: 'Alternatif kayıt', value: 'Kontrollü açık kayıt (eyalet yasası)' },
    { label: 'Okul yılı', value: 'Ağustos başı – mayıs sonu' },
    { label: 'Kayıt için', value: 'Aşı kaydı ve sağlık muayenesi zorunlu' },
  ],
  sections: [
    {
      heading: 'Çocuğum hangi okula gidecek?',
      body: [
        'Varsayılan olarak ev adresiniz belirler. Her okulun bir kayıt bölgesi (attendance zone) vardır ve ilçe okul bölgesinin sitesinde adres girerek atanacağınız okulu görebilirsiniz. Bu, ev ararken atlanmaması gereken bir adımdır: aynı sokağın iki yakası farklı okullara düşebilir.',
        'Ancak Florida yasası kontrollü açık kayıt (controlled open enrollment) uygular. Bu düzenleme, ilçedeki kapasitesi uygun herhangi bir devlet okuluna — hatta başka bir ilçedeki okula — başvurabilmenize imkân tanır. Kabul, kapasiteye bağlıdır ve başvuru dönemleri sınırlıdır; kaçırılan bir başvuru penceresi bir yıl beklemek anlamına gelebilir.',
        'Açık kayıtta ulaşım genellikle ailenin sorumluluğundadır. Atanmış okulunuz servis sağlarken, tercih ettiğiniz uzaktaki okul sağlamayabilir. Kararı verirken günlük sürüş yükünü hesaba katın.',
      ],
      note: 'Okul notları ve kayıt bölgeleri yıllara göre güncellenir; karar vermeden önce ilçenizin okul bölgesi sitesinden doğrulayın.',
    },
    {
      heading: 'Charter, magnet ve özel okul arasındaki fark nedir?',
      body: [
        'Charter okullar devlet okuludur: ücretsizdir ve kamu fonuyla çalışır, ancak ilçe bürokrasisinden bağımsız bir yönetim kuruluna sahiptir. Bu bağımsızlık müfredat ve okul kültüründe farklılaşmaya izin verir. Kontenjan sınırlı olduğu için kayıt genellikle kura (lottery) ile yapılır ve popüler okullarda bekleme listeleri uzundur.',
        'Magnet programlar ise ilçe okul bölgesinin kendi içinde yürüttüğü uzmanlaşmış programlardır: fen ve teknoloji, güzel sanatlar, uluslararası bakalorya gibi. Bunlar da ücretsizdir ancak kabul genellikle akademik ölçütlere, yeteneğe ya da mülakata dayanır. Güçlü bir magnet program, mahalle okulunuzun notundan bağımsız olarak yüksek kaliteli bir seçenek sunabilir.',
        'Özel okullar ücretlidir ve kendi kabul süreçlerini uygular. Florida’da ailelere yönelik eyalet destekli burs programları bulunur; bu programların kapsamı ve uygunluk koşulları zaman içinde değişmiştir, dolayısıyla güncel durumu eyalet kaynağından doğrulamak gerekir.',
      ],
      table: {
        caption: 'Florida’da okul seçeneklerinin karşılaştırması',
        columns: ['Tür', 'Ücret', 'Kabul yöntemi', 'Ulaşım'],
        rows: [
          ['Mahalle devlet okulu', 'Ücretsiz', 'Adrese göre otomatik', 'Genellikle servis var'],
          ['Charter okul', 'Ücretsiz', 'Kura', 'Değişken, çoğu zaman aileye ait'],
          ['Magnet program', 'Ücretsiz', 'Akademik ölçüt / yetenek', 'Değişken'],
          ['Özel okul', 'Ücretli', 'Okulun kendi süreci', 'Aileye ait'],
        ],
        note: 'Kabul yöntemleri ve ulaşım politikaları ilçeye göre değişir.',
      },
    },
    {
      heading: 'Kayıt için hangi belgeler gerekiyor?',
      body: [
        'Kayıt dosyası dört başlıkta toplanır: çocuğun kimlik ve yaş kanıtı, adres kanıtı, sağlık belgeleri ve varsa önceki okul kayıtları. Yaş kanıtı için pasaport ya da doğum belgesi kullanılır. Adres kanıtı olarak kira sözleşmesi ya da fatura istenir; birçok ilçe iki ayrı belge talep eder.',
        'Sağlık tarafında iki belge zorunludur: Florida aşı takvimine uygunluğu gösteren aşı kaydı ve okul öncesi sağlık muayenesi raporu. Türkiye’den gelen aşı kartları genellikle kabul edilir ancak Florida formatındaki resmî forma bir hekim tarafından aktarılması gerekir. Bunu yerel bir çocuk doktoru ya da ilçe sağlık dairesi yapabilir.',
        'Önceki okul karnelerini ve varsa transkriptleri yanınızda getirin. Lise çağındaki öğrenciler için bu belgeler kredi denkliğini ve hangi sınıfa yerleştirileceğini belirler; eksik belge bir yıl kaybına yol açabilir. Belgelerin İngilizce çevirisi istenebilir.',
      ],
      list: [
        'Pasaport ya da doğum belgesi',
        'İki adet adres kanıtı',
        'Florida formatında aşı kaydı',
        'Okul öncesi sağlık muayenesi raporu',
        'Önceki okul karneleri ve transkript (lise için kritik)',
      ],
    },
    {
      heading: 'İngilizcesi olmayan bir çocuk okula nasıl uyum sağlar?',
      body: [
        'Florida okulları, ana dili İngilizce olmayan öğrenciler için destek programları yürütür. Kayıt sırasında evde konuşulan dili soran bir anket doldurursunuz; bu anket, çocuğunuzun dil değerlendirmesine yönlendirilmesini sağlar. Değerlendirme sonucuna göre öğrenci, normal sınıfına devam ederken ek dil desteği alır.',
        'Bu destek çocuğu ayrı bir okula ya da ayrı bir sınıfa taşımaz; genel uygulama, öğrencinin yaş grubuyla birlikte kalıp gün içinde ek destek almasıdır. Küçük yaşta gelen çocuklarda uyum genellikle bir yıl içinde belirgin şekilde ilerler; lise çağında gelenlerde süreç daha uzundur çünkü akademik dil gündelik dilden farklıdır.',
        'Ailelere düşen kısım, Türkçenin evde canlı kalmasını sağlamaktır. İki dilliliğin akademik başarıyı olumsuz etkilediğine dair bir zorunluluk yoktur; asıl risk, çocuğun ana dilini kaybederek aile içi iletişimin zayıflamasıdır.',
      ],
    },
    {
      heading: 'Okul takvimi ve günlük düzen nasıl işliyor?',
      body: [
        'Florida’da okul yılı genellikle ağustos başında başlar ve mayıs sonunda biter. Bu, Türkiye’ye alışkın aileler için erken gelen bir başlangıçtır: temmuz ortasında hâlâ tatildeymiş gibi hissedilirken kayıt ve okul alışverişi dönemi çoktan başlamış olur.',
        'Yıl içinde kış tatili, bahar tatili (spring break) ve çeşitli resmî tatiller bulunur. Kasırga sezonu nedeniyle okulların kapandığı günler de olur; bu günler bazen yıl sonunda telafi edilir. İlçe okul bölgesinin takvimini ağustos öncesi indirip iş izinlerinizi buna göre planlamak pratik bir alışkanlıktır.',
        'Okul günü ilkokulda ortaokul ve liseden farklı saatlerde başlar; aynı ailede farklı kademelerde çocuk varsa sabah düzeni buna göre kurulur. Servis kullanıyorsanız durak ve saat bilgisi okul yılı başlamadan önce ilçe tarafından paylaşılır.',
      ],
    },
    {
      heading: 'Üniversiteye hazırlık Florida’da nasıl işliyor?',
      body: [
        'Lise boyunca alınan dersler ve not ortalaması (GPA), üniversite başvurusunun temelini oluşturur. Florida’da lise öğrencileri, ileri düzey dersler (AP), çift kayıt (dual enrollment) ya da uluslararası bakalorya programlarıyla lise sırasında üniversite kredisi kazanabilir. Çift kayıt, yerel bir community college dersinin lise sırasında ve genellikle ücretsiz alınmasıdır; maliyet açısından güçlü bir avantajdır.',
        'Eyalet, belirli akademik ölçütleri karşılayan Florida mezunlarına yönelik burs programları yürütür. Bu programlar eyalet içi üniversitelerde okuma maliyetini önemli ölçüde düşürebilir. Uygunluk koşulları not ortalaması, alınan dersler ve gönüllü çalışma saatleri gibi ölçütlere bağlıdır ve yıllara göre güncellenir.',
        'Eyalet içi öğrenim ücreti (in-state tuition) ile eyalet dışı ücret arasındaki fark büyüktür. Bu statü ikamet süresine ve belgelendirmeye bağlıdır; lise son sınıfta değil, taşındığınız ilk yıldan itibaren koşulları öğrenmek doğru zamanlamadır.',
      ],
      note: 'Burs ve ikamet koşulları değişebilir; güncel ölçütleri Florida Department of Education kaynaklarından doğrulayın.',
    },
  ],
  faqs: [
    {
      q: 'Florida’da devlet okulları ücretsiz mi?',
      a: 'Evet, devlet okulları ve charter okullar ücretsizdir. Ders kitapları genellikle okul tarafından sağlanır. Aileye kalan kalemler okul malzemeleri, bazı etkinlik ücretleri, öğle yemeği ve okul üniforması gerektiren okullarda kıyafet masrafıdır.',
    },
    {
      q: 'Çocuğumu istediğim okula kaydettirebilir miyim?',
      a: 'Varsayılan atama adresinize göredir, ancak Florida’nın kontrollü açık kayıt düzenlemesi kapasitesi uygun başka okullara başvurmanıza imkân tanır. Kabul kapasiteye bağlıdır, başvuru pencereleri sınırlıdır ve ulaşım genellikle ailenin sorumluluğuna geçer.',
    },
    {
      q: 'Türkiye’den getirdiğim aşı kartı kabul edilir mi?',
      a: 'Aşı bilgileri genellikle kabul edilir, ancak Florida’nın resmî formuna bir hekim tarafından aktarılması gerekir. Bu işlemi yerel bir çocuk doktoru ya da ilçe sağlık dairesi yapabilir. Eksik aşı varsa tamamlanması istenir.',
    },
    {
      q: 'Okul notları (A-F) ne kadar güvenilir bir ölçüt?',
      a: 'Eyaletin okul notu, standart testler ve öğrenci ilerlemesi gibi ölçülebilir göstergelere dayanır ve karşılaştırma için kullanışlı bir başlangıçtır. Ancak tek başına okulun size uygun olup olmadığını söylemez: program çeşitliliği, sınıf mevcudu ve okulun kültürü ziyaret ederek anlaşılır.',
    },
    {
      q: 'Yıl ortasında taşınırsak çocuğum okula başlayabilir mi?',
      a: 'Evet, kayıt yıl boyunca yapılabilir. Belgeleriniz tamamsa süreç genellikle birkaç gün içinde tamamlanır. Lise çağındaki öğrencilerde önceki transkriptin kredi denkliği için incelenmesi biraz daha uzun sürebilir.',
    },
  ],
  sources: [
    { label: 'Florida Department of Education', url: 'https://www.fldoe.org/' },
    { label: 'Florida Department of Health — Okul aşı gereklilikleri', url: 'https://www.floridahealth.gov/programs-and-services/immunization/' },
  ],
  related: ['nerede-yasanir', 'saglik-sistemi', 'ev-kiralamak'],
};

export default guide;
