import type { Guide } from './types';

export const guide: Guide = {
  slug: 'ev-kiralamak',
  number: 3,
  title: 'Florida’da ev kiralamak: süreç, sözleşme ve kiracı hakları',
  navLabel: 'Ev kiralamak',
  question: 'Florida’da ev kiralamak için hangi adımlar ve belgeler gerekiyor?',
  excerpt:
    'Başvuru dosyasından depozito iadesine kadar Florida kiralama süreci; Bölüm 83 kapsamındaki kiracı hakları ve sözleşmede dikkat edilecek maddeler.',
  keywords: [
    'florida ev kiralamak',
    'miami kiralık daire',
    'amerika kira sözleşmesi',
    'florida kiracı hakları',
    'depozito iadesi',
  ],
  updated: '2026-08-08',
  intro: [
    'Florida’da ev kiralamak, Türkiye’deki sürece göre daha belgeye dayalı ve daha hızlı işleyen bir süreçtir. Ev sahibi ya da yönetim şirketi sizi tanımadığı için kararını üç şeye bakarak verir: gelir belgeniz, kredi geçmişiniz ve önceki kiracılık kaydınız. Yeni gelen biri için bunların üçü de zayıf olduğundan, dosyanızı buna göre kurmanız gerekir.',
    'Kiracı hakları eyalet düzeyinde Florida Statutes Bölüm 83, Kısım II ile düzenlenir. Bu yasa depozitonun nasıl tutulacağını, iade sürecinin nasıl işleyeceğini ve tarafların fesih ihbar sürelerini belirler. Sözleşmenizde yazanlar bu yasanın üzerine çıkamaz; yasaya aykırı bir madde bağlayıcı değildir.',
  ],
  quickFacts: [
    { label: 'Düzenleyen yasa', value: 'Florida Statutes Bölüm 83, Kısım II' },
    { label: 'Tipik sözleşme süresi', value: '12 ay' },
    { label: 'Depozito üst sınırı', value: 'Yasada belirlenmiş bir tavan yok' },
    { label: 'Depozito bildirimi', value: 'Ev sahibi 30 gün içinde yazılı bildirir' },
    { label: 'Aylık kiralamada fesih', value: '30 gün önceden yazılı ihbar' },
  ],
  sections: [
    {
      heading: 'Kiralama başvurusu için hangi belgeler isteniyor?',
      body: [
        'Standart bir başvuru dosyası kimlik, gelir kanıtı ve kredi raporu iznini içerir. Gelir kanıtı olarak genellikle son maaş bordroları, iş sözleşmesi ya da işveren yazısı kabul edilir. Serbest çalışıyorsanız banka hesap dökümü ve vergi beyanı istenir. Yaygın uygulama, aylık brüt gelirin kiranın yaklaşık iki buçuk–üç katı olmasının beklenmesidir; bu bir yasa değil, piyasa alışkanlığıdır ve ev sahibine göre değişir.',
        'Kredi kontrolü için başvuru sırasında Sosyal Güvenlik Numaranız (SSN) ya da ITIN istenir. Amerika’da kredi geçmişiniz yoksa raporunuz boş çıkar. Bu bir ret sebebi değildir ama ev sahibi genellikle bunu ek güvenceyle dengelemek ister: daha yüksek depozito, birkaç ay kiranın peşin ödenmesi ya da bir kefil (co-signer).',
        'Başvuru ücreti her yetişkin başvurucu için ayrı alınır ve başvurunuz reddedilse bile iade edilmez. Aynı anda birden fazla eve başvurmak bu nedenle hızla masraflı hâle gelir; önce evi görüp ciddi olduğunuza karar vermek daha ekonomiktir.',
      ],
      list: [
        'Pasaport ya da sürücü belgesi (kimlik)',
        'SSN veya ITIN — kredi kontrolü için',
        'Gelir kanıtı: bordro, iş yazısı, banka dökümü veya vergi beyanı',
        'Önceki ev sahibinden referans (varsa)',
        'Başvuru ve kredi kontrol ücreti — iade edilmez',
      ],
    },
    {
      heading: 'Depozito nasıl korunuyor ve ne zaman geri alınır?',
      body: [
        'Florida yasası depozito tutarına bir üst sınır koymaz; miktar pazarlığa ve ev sahibinin risk değerlendirmesine bağlıdır. Buna karşılık paranın nasıl tutulacağı ve iade sürecinin nasıl işleyeceği ayrıntılı biçimde düzenlenmiştir. Ev sahibi, depozitoyu aldıktan sonraki 30 gün içinde parayı nerede tuttuğunu, faizli bir hesap olup olmadığını ve bankanın adını size yazılı olarak bildirmek zorundadır.',
        'Sözleşme bittiğinde ve evden çıktığınızda ev sahibinin depozitodan kesinti yapma niyeti varsa, bunu 30 gün içinde yazılı olarak bildirmesi gerekir. Bu bildirimi aldıktan sonra itiraz etmek için 15 gününüz vardır. Ev sahibi süresi içinde bildirim yapmazsa, depozitodan kesinti yapma hakkını kaybeder ve tutarı iade etmesi gerekir.',
        'Bu yüzden çıkış tarihinde yeni yazışma adresinizi ev sahibine yazılı olarak bırakmak önemlidir: bildirim size ulaşmazsa süreleri takip edemezsiniz. Taşınırken evin durumunu tarih damgalı fotoğraflarla belgelemek, olası kesinti tartışmasında en güçlü savunmadır.',
      ],
      note: 'Normal kullanım aşınması (wear and tear) kesinti sebebi değildir; hasar ile aşınma arasındaki ayrım uyuşmazlıkların çoğunun kaynağıdır.',
    },
    {
      heading: 'Kira sözleşmesinde hangi maddelere dikkat etmeli?',
      body: [
        'Sözleşmeyi imzalamadan önce hangi giderlerin kiraya dâhil olduğunu netleştirin. Bazı binalarda su, çöp ve ortak alan kullanımı kira içindedir; elektrik neredeyse her zaman ayrıdır. “Kira artı ücretler” yapısı toplam aylık maliyetinizi ilan edilen kiranın belirgin üzerine çıkarabilir.',
        'Erken çıkış maddesi ikinci kritik başlıktır. Birçok sözleşme, süre dolmadan çıkmanız hâlinde belirli bir tutarda erken fesih bedeli öngörür; bazıları ise yeni kiracı bulunana kadar kirayı ödemeye devam etmenizi şart koşar. İki yapı arasındaki fark ciddidir; imzalamadan önce hangisi olduğunu bilmelisiniz.',
        'Evcil hayvan, misafir süresi, alt kiralama ve bakım sorumluluğu maddeleri de değişkenlik gösterir. Klima gibi Florida’da hayati bir ekipmanın arızası durumunda tamir sorumluluğunun kimde olduğu yazılı olmalıdır.',
      ],
      list: [
        'Kiraya dâhil ve hariç giderlerin listesi',
        'Erken fesih bedeli ve koşulları',
        'Yenileme koşulları ve kira artış yöntemi',
        'Bakım-onarım sorumluluğunun paylaşımı (özellikle klima)',
        'Evcil hayvan depozitosu ve aylık evcil hayvan ücreti',
      ],
    },
    {
      heading: 'Sözleşme nasıl sona erdirilir?',
      body: [
        'Belirli süreli bir sözleşme (tipik olarak 12 ay) süre sonunda kendiliğinden biter; ancak birçok sözleşme, taraflardan biri bildirimde bulunmazsa aylık kiralamaya dönüşeceğini yazar. Yenilemeyeceğinizi sözleşmede belirtilen süre içinde yazılı olarak bildirmezseniz, otomatik uzama nedeniyle beklemediğiniz bir yükümlülük altına girebilirsiniz.',
        'Süresiz aylık kiralamada tarafların fesih ihbar süresi Florida yasasında düzenlenmiştir ve 2023’te yapılan değişiklikle uzatılmıştır. Aylık kiralamayı sona erdirmek isteyen taraf, kira döneminin bitiminden en az 30 gün önce yazılı bildirim vermelidir. Sözleşmenizde daha eski bir süre yazıyorsa güncel yasa geçerlidir.',
        'Ödenmemiş kira nedeniyle tahliye süreci mahkeme kararıyla yürür. Ev sahibinin kilit değiştirmesi, elektrik-suyu kesmesi ya da eşyaları dışarı çıkarması yasal değildir. Bu tür bir durumda yerel kiracı hakları kuruluşuna ya da bir avukata danışın.',
      ],
      note: 'Yasal süreler ve prosedürler değişebilir; güncel metin için Florida Statutes Bölüm 83’ün yürürlükteki hâlini kontrol edin.',
    },
    {
      heading: 'Kredi geçmişi olmadan nasıl ev bulunur?',
      body: [
        'Amerika’ya yeni gelen hemen herkesin karşılaştığı sorun budur: kiralamak için kredi geçmişi isteniyor, kredi geçmişi oluşturmak içinse zaman gerekiyor. Bu döngüyü kırmanın yaygın yolları vardır ve ev sahipleri bunlara alışıktır.',
        'İlk yol, ek güvence sunmaktır: birkaç aylık kirayı peşin ödemek ya da daha yüksek depozito kabul etmek. İkinci yol, Amerika’da yerleşik ve kredi geçmişi güçlü birini kefil olarak göstermektir. Üçüncü yol, büyük yönetim şirketleri yerine bireysel ev sahipleriyle çalışmaktır; bireysel ev sahipleri kural setine değil ikna olmaya bakar.',
        'Dosyanızı güçlendirmek için iş sözleşmenizi, banka bakiyenizi ve varsa Türkiye’deki ödeme geçmişinizi düzenli bir dosyada sunun. Kredi raporunuzun boş olmasının nedenini açıklayan kısa bir mektup, yönetim şirketi görevlisi için beklediğinizden daha etkilidir.',
      ],
    },
    {
      heading: 'Kiralamak mı, satın almak mı daha mantıklı?',
      body: [
        'Yeni gelenler için ilk yıl kiralamak neredeyse her zaman doğru karardır. Bunun sebebi finansal değil bilgiseldir: hangi mahallede yaşamak istediğinizi, işe gidiş sürenizin gerçekte ne kadar olduğunu ve okul bölgesinin size uyup uymadığını ancak orada yaşayarak öğrenirsiniz. Yanlış mahallede satın alınmış bir evden çıkmak, yanlış kiradan çıkmaktan çok daha pahalıdır.',
        'Satın alma tarafında Florida’ya özgü iki kalem hesabınızı değiştirir: konut sigortası ve emlak vergisi. İkisi de aylık kredi taksitinin yanında küçümsenecek tutarlar değildir ve konuma göre büyük fark gösterir. Bir eve teklif vermeden önce o adres için sigorta teklifi almak, Florida’da atlanmaması gereken bir adımdır.',
        'Kalıcı olmaya karar verdiyseniz ve bölgeyi tanıdıysanız, ev sahibi olmanın Florida’da güçlü bir avantajı vardır: homestead muafiyeti ve değer artışına getirilen yıllık tavan, uzun vadede emlak vergisi yükünü öngörülebilir kılar. Ayrıntı için vergiler rehberine bakın.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Florida’da depozito en fazla ne kadar olabilir?',
      a: 'Florida yasası depozito tutarına üst sınır koymaz. Uygulamada bir aylık kira yaygındır, ancak kredi geçmişi olmayan kiracılardan daha yüksek tutar istenmesi olağandır. Yasanın düzenlediği şey tutar değil, paranın nasıl tutulacağı ve iade sürecidir.',
    },
    {
      q: 'Depozitomu geri alamazsam ne yapabilirim?',
      a: 'Ev sahibinin, evden çıkışınızdan sonraki 30 gün içinde kesinti niyetini yazılı bildirmesi gerekir. Bildirim gelmezse kesinti hakkını kaybeder. Bildirim gelirse itiraz için 15 gününüz vardır. Uyuşmazlık sürerse küçük talepler mahkemesi (small claims court) uygun bir yoldur; tarih damgalı çıkış fotoğrafları en güçlü delilinizdir.',
    },
    {
      q: 'SSN’im yokken ev kiralayabilir miyim?',
      a: 'Evet, mümkündür. Bazı ev sahipleri ITIN kabul eder; bazıları pasaport, iş sözleşmesi ve ek depozito ile ilerler. Büyük yönetim şirketleri katı kural setleriyle çalıştığı için bireysel ev sahipleri bu durumda genellikle daha esnektir.',
    },
    {
      q: 'Ev sahibi kirayı istediği zaman artırabilir mi?',
      a: 'Belirli süreli sözleşme boyunca kira sabittir; ev sahibi süre içinde tek taraflı artış yapamaz. Süre bitiminde yenileme sırasında artış önerebilir ve siz kabul etmek zorunda değilsiniz. Florida’da eyalet düzeyinde bir kira artış tavanı (rent control) uygulaması bulunmaz.',
    },
    {
      q: 'Kiracı sigortası zorunlu mu?',
      a: 'Yasal olarak zorunlu değildir, ancak birçok kira sözleşmesi sözleşmesel şart olarak talep eder. Ev sahibinin poliçesi yalnızca binayı korur; eşyalarınız ve üçüncü kişilere karşı sorumluluğunuz kiracı sigortası kapsamındadır ve ev sigortasına göre belirgin şekilde düşük maliyetlidir.',
    },
  ],
  sources: [
    { label: 'Florida Statutes Bölüm 83 — Kiracı ve ev sahibi ilişkileri', url: 'https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0000-0099/0083/0083.html' },
    { label: 'Florida Attorney General — Kiracı bilgilendirmesi', url: 'https://www.myfloridalegal.com/consumer-protection' },
  ],
  related: ['nerede-yasanir', 'banka-ve-kredi', 'yasam-maliyeti'],
  miamili: {
    path: '/ilanlar',
    label: 'MiamiLi’nin Güney Florida ilan listesi',
    context:
      'Kiralama yılınızı tamamladıktan sonra satın almayı düşünüyorsanız, Güney Florida piyasasını Türkçe takip edebileceğiniz güncel bir ilan listesi işe yarayabilir:',
    campaign: 'rehber-ev-kiralamak',
  },
};

export default guide;
