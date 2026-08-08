import type { BlogPost } from './types';

/**
 * Elle yazılan açılış yazıları. Üretim hattı BU dosyaya dokunmaz —
 * o generated-posts.json'a append eder. İkisi blogData.ts'te birleşir.
 */
export const SEED_POSTS: BlogPost[] = [
  {
    slug: 'floridada-elektrik-su-internet-nasil-baglanir',
    title: 'Florida’da Elektrik, Su ve İnternet Nasıl Bağlanır?',
    question: 'Florida’da yeni bir eve taşınırken faturalar nasıl açılır?',
    excerpt:
      'Elektrik ve su çoğu yerde tek bir bölgesel sağlayıcıdan gelir, internet ise adres bazında değişir. Kredi geçmişi olmayanlardan depozito istenmesi olağandır.',
    keywords: [
      'florida elektrik bağlatma',
      'fpl hesap açma',
      'florida su faturası',
      'amerika internet bağlatma',
    ],
    publishedAt: '2026-08-08',
    updatedAt: '2026-08-08',
    intro: [
      'Florida’da eve taşınırken abonelikler üç ayrı yerden gelir: elektrik bölgesel bir elektrik şirketinden, su genellikle belediye ya da ilçe idaresinden, internet ise adresinize hizmet veren özel operatörlerden. Türkiye’deki gibi tek bir kurumun her şeyi bağladığı bir yapı yoktur; her biri ayrı başvuru ister.',
      'Taşınma gününden birkaç iş günü önce başvuruları başlatmak pratik bir alışkanlıktır. Elektrik ve su devri genellikle hızlıdır, internet kurulumu ise teknisyen randevusuna bağlı olduğu için en uzun süreni olur.',
    ],
    sections: [
      {
        heading: 'Elektrik hesabı nasıl açılır?',
        body: [
          'Elektrikte tercih hakkınız yoktur: adresiniz hangi bölgesel şirketin hizmet alanındaysa hesabı orada açarsınız. Başvuru çevrimiçi yapılabilir ve genellikle kimlik, adres, taşınma tarihi ve bir vergi kimlik numarası (SSN ya da ITIN) istenir.',
          'Kredi geçmişiniz yoksa şirket bir depozito talep edebilir. Bu bir ret değil, standart bir risk uygulamasıdır; belirli bir süre düzenli ödeme yaptıktan sonra depozito iade edilir. Depozitoyu baştan bütçeye yazmak, taşınma haftasında sürpriz yaşamayı önler.',
          'Hesabı önceki kiracının kapatma tarihiyle uyumlu açmaya dikkat edin. İki tarih arasında boşluk kalırsa elektrik kesilir ve yeniden açtırmak hem zaman hem ek ücret demektir.',
        ],
      },
      {
        heading: 'Su ve çöp hizmeti kimden alınır?',
        body: [
          'Su, kanalizasyon ve çöp genellikle belediye ya da ilçe idaresi tarafından verilir ve çoğu zaman tek faturada birleşir. Apartman ya da site tipi konutlarda bu kalemler kira ya da aidat içinde olabilir; müstakil evlerde neredeyse her zaman ayrı hesap açılır.',
          'Kiralamada bu ayrımı sözleşme aşamasında netleştirin: hangi faturalar kiraya dahil, hangileri size ait? Florida’da su ve çöpün kiraya dahil olduğu ilanlar da, tamamen kiracıya bırakıldığı ilanlar da yaygındır ve fark aylık bütçede hissedilir.',
        ],
      },
      {
        heading: 'İnternet seçenekleri adres bazında neden değişiyor?',
        body: [
          'İnternette elektriğin aksine birden fazla sağlayıcı olabilir, ancak hangisinin hizmet verdiği sokak düzeyinde değişir. Aynı mahallenin iki ucunda farklı altyapılar bulunabilir; bu yüzden "şu operatör iyi" tavsiyesi tek başına işe yaramaz, önce adresinize kimin hizmet verdiğini sorgulamak gerekir.',
          'Ev ararken bunu bir kriter olarak sormak, evden memnuniyeti doğrudan etkiler; özellikle evden çalışıyorsanız. Kiralama kararı vermeden önce adresin altyapısını operatörün kendi sorgu sayfasından kontrol etmek birkaç dakika alır.',
          'Sözleşmelerde tanıtım fiyatının bir süre sonra yükseldiği, modem kirasının ayrı fatura edildiği ve erken çıkış bedeli uygulandığı sık görülür. Aylık toplam maliyeti hesaplarken bu üç kalemi de dahil edin.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Elektrik bağlatmak için SSN şart mı?',
        a: 'Çoğu şirket SSN ya da ITIN ister; bunlardan biri yoksa pasaport ve ek depozito ile hesap açılabildiği durumlar vardır ancak politika şirkete göre değişir. Başvuru sırasında hangi belgelerin kabul edildiğini doğrudan müşteri hizmetlerine sormak en hızlı yoldur.',
      },
      {
        q: 'Depozito ne zaman geri alınır?',
        a: 'Genellikle belirli bir süre boyunca gecikmesiz ödeme yapıldıktan sonra depozito hesabınıza alacak olarak işlenir ya da iade edilir. Süre ve koşul şirkete göre değişir; hesabı açarken bu koşulu yazılı olarak isteyin.',
      },
      {
        q: 'Faturaları otomatik ödemeye bağlamalı mıyım?',
        a: 'Evet, çünkü Amerika’da ödeme geçmişi kredi profilinizin en ağırlıklı bileşenidir ve bazı hizmet sağlayıcılar gecikmeleri raporlar. Otomatik ödeme kurmak hem kesinti riskini hem de kredi puanı riskini aynı anda ortadan kaldırır.',
      },
      {
        q: 'Taşınırken hesapları devretmek mi, kapatıp yeniden açmak mı gerekir?',
        a: 'Aynı sağlayıcının hizmet alanında kalıyorsanız adres değişikliği (transfer) genellikle daha hızlı ve ucuzdur. Farklı bir bölgeye taşınıyorsanız eski hesabı kapatma tarihini yeni hesabın açılış tarihiyle çakıştırmadan planlayın.',
      },
    ],
  },
  {
    slug: 'floridada-arac-muayenesi-var-mi',
    title: 'Florida’da Araç Muayenesi ve Egzoz Testi Var mı?',
    question: 'Florida’da araçlar için zorunlu muayene yapılıyor mu?',
    excerpt:
      'Florida’da binek araçlar için düzenli eyalet muayenesi ya da emisyon testi zorunluluğu bulunmuyor; asıl yükümlülük yıllık kayıt yenileme ve sigortanın kesintisiz olması.',
    keywords: [
      'florida araç muayenesi',
      'florida emisyon testi',
      'araç kayıt yenileme florida',
      'florida trafik sigortası zorunlu',
    ],
    publishedAt: '2026-08-07',
    updatedAt: '2026-08-07',
    intro: [
      'Türkiye’den gelenlerin en çok şaşırdığı farklardan biri: Florida’da özel binek araçlar için düzenli, zorunlu bir eyalet muayenesi ya da egzoz emisyon testi uygulanmıyor. Aracın teknik durumu sürücünün sorumluluğunda kalıyor ve TÜVTÜRK benzeri periyodik bir kontrol istasyonu döngüsü yok.',
      'Bu, hiçbir yükümlülük olmadığı anlamına gelmiyor. Florida’da araç sahibinin takip etmesi gereken üç şey var: yıllık kayıt (registration) yenilemesi, kesintisiz zorunlu sigorta ve aracı ilk kez eyalete getirirken yapılan araç kimlik numarası doğrulaması.',
    ],
    sections: [
      {
        heading: 'Kayıt yenileme nasıl işliyor?',
        body: [
          'Araç kaydı süreli verilir ve süresi dolmadan yenilenir. Yenileme çevrimiçi, posta ile ya da ilçe vergi tahsildarı ofisinden yapılabilir; işlem tamamlandığında plakanıza yapıştırılan tarihli etiket güncellenir. Kaydın süresi genellikle araç sahibinin doğum gününe göre belirlenir.',
          'Süresi geçmiş kayıtla araç kullanmak trafik cezası doğurur ve durdurma sebebidir. Yenileme hatırlatmaları posta adresinize gönderildiği için, taşındığınızda adres güncellemesini yapmayı ihmal etmeyin — hatırlatma gelmemesi mazeret sayılmaz.',
        ],
      },
      {
        heading: 'Aracı başka eyaletten getirirken ne gerekiyor?',
        body: [
          'Aracı Florida dışından getiriyorsanız, ilk kayıt sırasında araç kimlik numarasının (VIN) fiziksel olarak doğrulanması istenir. Bu bir teknik muayene değildir; şasi numarasının belgelerle uyuştuğunun teyididir ve yetkili kişilerce doldurulan bir form üzerinden yapılır.',
          'İkinci el araç alırken ise asıl kontrol edilecek şey ruhsat geçmişidir. Sel hasarlı araçlar Florida piyasasında gerçek bir risktir ve bunlar unvan kaydında (title) işaretlenir. Satın almadan önce hem unvan geçmişini hem de bağımsız bir mekanik ekspertizi yaptırmak, olmayan zorunlu muayenenin yerini tutar.',
        ],
      },
      {
        heading: 'Sigorta neden asıl yükümlülük?',
        body: [
          'Florida bir "no-fault" eyaletidir ve araç kaydı için asgari kişisel yaralanma koruması (PIP) ile mülk hasarı sorumluluğu (PDL) teminatı zorunludur. Sigorta şirketleri poliçenin sona erdiğini eyalete bildirir; teminatsız kalan bir kayıt, ehliyet ve plaka askıya alınmasına kadar gidebilir.',
          'Bu nedenle Florida’da "aracı bir süre kullanmayacağım, sigortayı dondurayım" yaklaşımı risklidir. Aracı gerçekten kullanmayacaksanız doğru yol sigortayı bırakmak değil, kaydı usulüne uygun biçimde askıya almak ve plakayı teslim etmektir.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Florida’da egzoz emisyon testi zorunlu mu?',
        a: 'Hayır, Florida özel binek araçlar için eyalet genelinde zorunlu emisyon testi uygulamıyor. Bazı eyaletlerde bu test yıllık rutindir; Florida’ya başka bir eyaletten taşınanların en sık karıştırdığı noktalardan biri budur.',
      },
      {
        q: 'Aracımın kaydı ne sıklıkla yenilenir?',
        a: 'Kayıt süreli verilir ve süre dolmadan yenilenmesi gerekir; yenileme dönemi genellikle araç sahibinin doğum gününe bağlanır. Kaydın güncel durumunu ve son tarihi FLHSMV üzerinden kontrol edebilirsiniz.',
      },
      {
        q: 'Muayene yoksa ikinci el araç alırken neye güveneceğim?',
        a: 'İki şeye: aracın unvan geçmişine ve bağımsız bir mekanik ekspertize. Unvan kaydındaki sel ya da pert işaretleri Florida’da özellikle önemlidir. Satıcının beyanı yerine kayıt geçmişini doğrulamak, olmayan zorunlu muayenenin işlevini karşılar.',
      },
      {
        q: 'Sigortam biterse ne olur?',
        a: 'Sigorta şirketi teminatın sona erdiğini eyalete bildirir. Zorunlu teminatı olmayan bir araç kaydı askıya alınabilir ve yeniden açtırmak ceza ödemeyi gerektirir. Poliçeyi kesintisiz tutmak Florida’da kaydın kendisi kadar önemlidir.',
      },
    ],
  },
  {
    slug: 'floridada-yaz-elektrik-faturasi-neden-yuksek',
    title: 'Florida’da Yaz Aylarında Elektrik Faturası Neden Yükseliyor?',
    question: 'Florida’da yaz elektrik faturaları neden bu kadar artıyor?',
    excerpt:
      'Faturayı büyüten kalem neredeyse her zaman klima. Nem, yalıtım ve cihazın verimi tüketimi belirliyor; sabit sıcaklık tutmak açıp kapatmaktan daha öngörülebilir sonuç veriyor.',
    keywords: [
      'florida elektrik faturası',
      'klima elektrik tüketimi',
      'florida yaz sıcaklığı',
      'ev elektrik tasarrufu',
    ],
    publishedAt: '2026-08-06',
    updatedAt: '2026-08-06',
    intro: [
      'Florida’ya taşınan hanelerin ilk yazında karşılaştığı en somut sürpriz elektrik faturasıdır. Nedeni tek bir kalemdir: klima. Subtropikal iklimde klima birkaç ay boyunca gün içinde neredeyse sürekli çalışır ve evin toplam elektrik tüketiminin büyük bölümünü tek başına üretir.',
      'İyi haber, bu kalemin davranışa duyarlı olmasıdır. Termostat alışkanlığı, nem yönetimi ve cihazın bakım durumu aynı evde belirgin farklar üretir. Kötü haber, evin yalıtımı ve klimanın yaşı gibi kiracının kontrolünde olmayan etkenlerin de belirleyici olmasıdır.',
    ],
    sections: [
      {
        heading: 'Nem neden sıcaklıktan daha belirleyici?',
        body: [
          'Florida’da klimanın işi yalnızca havayı soğutmak değil, nemi almaktır. Yüksek nemde aynı sıcaklık daha sıcak hissedilir ve cihaz hedef sıcaklığa ulaşmak için daha uzun çalışır. Bu yüzden nem kontrolü, termostatı birkaç derece aşağı çekmekten daha etkili bir konfor stratejisi olabilir.',
          'Tavan vantilatörleri havayı soğutmaz, ciltteki buharlaşmayı hızlandırarak serin hissettirir. Odada kimse yokken çalıştırmak boşa tüketimdir; ama odada otururken kullanmak termostatı bir derece yukarı almayı katlanılabilir kılar ve o bir derece faturada gerçek karşılık bulur.',
        ],
      },
      {
        heading: 'Evden çıkarken klimayı kapatmak mantıklı mı?',
        body: [
          'Tamamen kapatmak Florida’da genellikle yanlış stratejidir. Klima kapalıyken ev hem ısınır hem nem çeker; döndüğünüzde cihaz iki işi birden yapmak zorunda kalır ve uzun süre tam kapasitede çalışır. Ayrıca yüksek iç nem, mobilya ve duvarlarda küf riski yaratır.',
          'Daha öngörülebilir yaklaşım, evde yokken termostatı birkaç derece yukarı almak ve tamamen kapatmamaktır. Programlanabilir termostat bu işi otomatikleştirir; gün içindeki uzun boşlukları ve gece saatlerini ayrı ayrı ayarlayabilirsiniz.',
        ],
      },
      {
        heading: 'Kiracı olarak neyi kontrol edebilirsiniz?',
        body: [
          'Filtre değişimi en düşük maliyetli ve en çok ihmal edilen kalemdir: tıkalı filtre hava akışını düşürür, cihaz aynı sonucu almak için daha uzun çalışır. Filtre değişiminin kiracıya mı ev sahibine mi ait olduğu sözleşmede yazar; yazmıyorsa taşınırken sorun.',
          'Güneş alan pencerelerde perde ve stor kullanmak, dış kapı ve pencere kenarlarındaki hava sızıntılarını bildirmek, kurutucu ve fırın gibi ısı üreten cihazları günün en sıcak saatinde çalıştırmamak kiracının elindeki üç somut adımdır.',
          'Ev ararken klimanın yaşını ve varsa verimlilik değerini sormak makul bir sorudur. Aynı büyüklükteki iki dairede eski ve yeni cihaz arasındaki fark, aylık faturada kiradaki küçük farkları gölgede bırakabilir.',
        ],
        list: [
          'Filtreyi düzenli değiştirin — en ucuz ve en etkili adım',
          'Evde yokken kapatmak yerine birkaç derece yukarı alın',
          'Programlanabilir termostat kurun',
          'Güneş alan pencereleri gündüz gölgeleyin',
          'Kiralamadan önce klimanın yaşını sorun',
        ],
      },
    ],
    faqs: [
      {
        q: 'Klimayı gün boyu açık bırakmak daha mı ucuz?',
        a: 'Tamamen kapatıp dönüşte sıfırdan soğutmaya göre genellikle daha öngörülebilir sonuç verir, çünkü Florida’da cihaz nemi de almak zorundadır. Yaygın öneri kapatmak değil, evde yokken hedef sıcaklığı birkaç derece yukarı almaktır.',
      },
      {
        q: 'Faturam beklediğimden çok yüksek geldi, ne kontrol etmeliyim?',
        a: 'Önce klima filtresini ve termostat programını, sonra pencere ve kapı sızıntılarını kontrol edin. Tüketimde ani bir sıçrama varsa cihaz arızası ya da su kaçağı olabilir; birçok elektrik şirketi hesabınızda günlük tüketim grafiği sunar ve sıçramanın hangi güne denk geldiğini gösterir.',
      },
      {
        q: 'Elektrik sağlayıcımı değiştirebilir miyim?',
        a: 'Florida’da elektrik dağıtımı bölgeseldir; adresinize hangi şirket hizmet veriyorsa hesabınız orada açılır. Tasarruf, sağlayıcı değiştirmekten değil tüketimi azaltmaktan gelir.',
      },
      {
        q: 'Kiracıysam klimanın bakımı kimin sorumluluğunda?',
        a: 'Genellikle cihazın bakım ve onarımı ev sahibine, filtre değişimi gibi rutin işler kiracıya bırakılır — ancak bu sözleşmeye göre değişir. Taşınmadan önce bu ayrımı yazılı olarak netleştirmek, yaz ortasında tartışma çıkmasını önler.',
      },
    ],
  },
];
