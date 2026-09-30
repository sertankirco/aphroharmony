export interface IngredientSection {
  heading: string;
  text: string;
}

export interface IngredientFaq {
  q: string;
  a: string;
}

export interface Ingredient {
  slug: string;
  name: string;
  latinName?: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: IngredientSection[];
  faq: IngredientFaq[];
}

export const INGREDIENTS: Ingredient[] = [
  {
    slug: 'l-arjinin',
    name: 'L-Arjinin',
    latinName: undefined,
    tagline: 'Temel amino asit',
    metaTitle: 'L-Arjinin Nedir, Ne İşe Yarar? — AphroHarmony Blog',
    metaDescription:
      'L-Arjinin nedir, hangi gıdalarda bulunur, nitrik oksit ile ilişkisi nedir? AphroHarmony formülünde neden yer aldığını ve araştırma geçmişini öğrenin.',
    intro:
      'L-Arjinin, vücutta sentezlenebilen ancak yoğun aktivite veya belirli dönemlerde dışarıdan alınması önem kazanan bir amino asittir. Protein yapı taşı olmasının ötesinde, nitrik oksit (NO) sentezindeki doğrudan öncü rolüyle beslenme bilimleri ve spor fizyolojisi başta olmak üzere pek çok araştırma alanında yoğun ilgi görmektedir.',

    sections: [
      {
        heading: 'L-Arjinin Nedir?',
        text: 'L-Arjinin, alfa-amino asitler grubuna giren ve kimyasal formülü C₆H₁₄N₄O₂ olan bir bileşiktir. Vücut tarafından üretilebilmekle birlikte büyüme dönemlerinde, yoğun egzersiz sonrasında veya bazı metabolik koşullarda ihtiyaç artabildiği için "koşullu esansiyel" amino asit olarak sınıflandırılır.\n\nAmino asitler, vücudun her doku ve organında bulunan proteinlerin yapı taşlarıdır. L-Arjinin ise bu yapısal görevin yanı sıra üre döngüsünde, kreatin sentezinde ve özellikle nitrik oksit üretiminde işlevsel rol üstlenmesiyle diğer amino asitlerden ayrışır.',
      },
      {
        heading: 'L-Arjinin ve Nitrik Oksit İlişkisi',
        text: 'Nitrik oksit (NO), düz kas dokusunun gevşemesini düzenleyen ve kan akışı üzerinde belirleyici etkileri olan küçük bir sinyal molekülüdür. 1998 yılında Robert Furchgott, Louis Ignarro ve Ferid Murad bu keşfiyle Nobel Fizyoloji Ödülü\'ne layık görülmüştür.\n\nL-Arjinin, vücutta nitrik oksit sentaz (NOS) enzimi aracılığıyla nitrik okside dönüştürülür. Bu biyokimyasal yol, L-Arjinin\'i NO üretimini araştıran çalışmaların odak noktalarından biri haline getirir. Söz konusu ilişki; spor beslenme takviyeleri, kardiyovasküler fizyoloji ve egzersiz kapasitesi üzerine yapılan araştırmalarda sıklıkla incelenmektedir.',
      },
      {
        heading: 'Hangi Gıdalarda Bulunur?',
        text: 'L-Arjinin doğal olarak protein bakımından zengin pek çok gıdada bulunur. En yüksek miktarlar şu kaynaklarda gözlemlenir:\n\n• Kabak çekirdeği ve ayçiçeği çekirdeği\n• Yer fıstığı ve badem\n• Kırmızı et, tavuk ve hindi\n• Tuna ve uskumru gibi yağlı balıklar\n• Kuru baklagiller (mercimek, nohut, soya)\n• Süt ve peynir\n\nGünlük beslenme yoluyla alınan L-Arjinin miktarı, diyetin protein içeriğine bağlı olarak büyük değişkenlik gösterir. Takviye edici gıdalar, özellikle yüksek protein tüketimine rağmen L-Arjinin ihtiyacının artabildiği dönemlerde tercih edilmektedir.',
      },
      {
        heading: 'Araştırma Geçmişi',
        text: 'L-Arjinin üzerine yapılan çalışmalar, 1980\'lerden bu yana hız kazanmıştır. Özellikle nitrik oksit yolağının keşfedilmesinin ardından bu amino asidin biyokimyası dünya genelinde pek çok laboratuvarda incelenmiştir.\n\nAraştırmalar genel olarak üç temel başlık altında yoğunlaşmaktadır: nitrik oksit sentezindeki rolü ve bunun egzersiz performansıyla ilişkisi; büyüme hormonu salgısı üzerindeki geçici etkileri; üre döngüsündeki işlevi ve amonyak metabolizması. Her üç alanda da on yılları kapsayan kapsamlı bir akademik literatür oluşmuştur.',
      },
      {
        heading: 'AphroHarmony Formülündeki Rolü',
        text: 'AphroHarmony, Novacolin markasının takviye edici gıda ürünüdür. L-Arjinin, bu formülün 8 bileşeninden birini oluşturur. Günde 1 tablet alınması tavsiye edilir; 18 yaş ve üzeri yetişkinler içindir.\n\nTakviye edici gıdalar, dengeli ve çeşitli bir beslenmenin yerine geçemez. Tavsiye edilen günlük porsiyonu aşmayın. Hastalık veya ilaç kullanımı durumunda doktorunuza danışınız.',
      },
    ],

    faq: [
      {
        q: 'L-Arjinin amino asit midir?',
        a: 'Evet, L-Arjinin bir alfa-amino asittir. Koşullu esansiyel amino asit kategorisinde değerlendirilir; yani vücut tarafından üretilebilmesine rağmen bazı dönemlerde dışarıdan takviye edilmesi önem kazanabilir.',
      },
      {
        q: 'L-Arjinin nitrik oksit ile nasıl ilişkilidir?',
        a: 'L-Arjinin, vücutta nitrik oksit sentaz (NOS) enziminin substratıdır; yani nitrik oksit (NO) üretiminde doğrudan kullanılan ham maddedir. Bu ilişki, 1998 Nobel Fizyoloji Ödülü\'ne konu olan keşifle bilim dünyasında yerini sağlamlaştırmıştır.',
      },
      {
        q: 'L-Arjinin hangi gıdalarda bol miktarda bulunur?',
        a: 'Kabak çekirdeği, yer fıstığı, kırmızı et, ton balığı ve kuru baklagiller (mercimek, nohut) L-Arjinin açısından zengin başlıca gıdalardır.',
      },
      {
        q: 'AphroHarmony\'de L-Arjinin neden kullanılıyor?',
        a: "L-Arjinin, AphroHarmony'nin 8 bileşenli takviye formülünün bir parçasıdır. Formülde bitkisel ekstreler, E vitamini ve çinkoyla birlikte yer alır.",
      },
    ],
  },

  {
    slug: 'tribulus-terrestris',
    name: 'Demir Dikeni',
    latinName: 'Tribulus terrestris',
    tagline: 'Geleneksel bitkisel ekstrakt',
    metaTitle: 'Tribulus Terrestris (Demir Dikeni) Nedir? — AphroHarmony Blog',
    metaDescription:
      'Tribulus terrestris (demir dikeni) nedir, ne işe yarar, saponin içeriği neden önemli? Geleneksel kullanımı ve araştırma geçmişini bu makalede öğrenin.',
    intro:
      'Tribulus terrestris, halk arasında demir dikeni veya çakır dikeni olarak da bilinen, Zygophyllaceae familyasından çiçekli bir bitkidir. Akdeniz kıyılarından Orta Asya steplerlerine, Hindistan\'dan Güney Afrika\'ya dek geniş bir coğrafyaya yayılmış bu bitki, Ayurveda ve geleneksel Çin tıbbında yüzyıllar boyunca yer almıştır.',

    sections: [
      {
        heading: 'Tribulus Terrestris Nedir?',
        text: 'Tribulus terrestris, tek yıllık veya çok yıllık olabilen, yerde yayılarak büyüyen ve toprağa yakın, sarı çiçekler açan otsu bir bitkidir. Meyvesi sert ve dikenlidir; bu özellik bitkiye hem Türkçe\'deki "demir dikeni" adını hem de İngilizce\'deki "puncture vine" (lastik delebilen bitki) adını kazandırmıştır.\n\nBitki, hem ılıman hem tropikal iklim koşullarına uyum sağlayabilmesi sayesinde neredeyse tüm kıtalarda doğal olarak yetişir. Özellikle sıcak ve kurak alanlarda kolayca tutunabilen bu bitki, tarımsal açıdan inatçı bir yabani ot olarak da bilinir.',
      },
      {
        heading: 'Fitokimyasal Yapısı: Saponinler',
        text: 'Tribulus terrestris araştırmalarının odak noktasını, bitkinin steroidal saponin içeriği oluşturur. Saponinler; çeşitli bitkilerde bulunan, glikozit yapısındaki bileşik grubudur. Demir dikeninde tespit edilen başlıca saponin bileşeni ise protodioscin\'dir.\n\nProtodioscinın biyolojik aktivitesi, başta üreme fizyolojisi ve hormonal parametreler olmak üzere farklı araştırma grupları tarafından incelenmiştir. Bunların yanı sıra Tribulus meyvesi ve yapraklarında flavonoidler, alkaloidler ve glikozitler de tespit edilmiştir. Bitkinin farklı coğrafyalarda yetişen örneklerindeki saponin oranının önemli ölçüde değişkenlik gösterdiği bilinmektedir.',
      },
      {
        heading: 'Geleneksel Kullanım Geçmişi',
        text: 'Tribulus terrestris\'in geleneksel tıp sistemlerindeki kullanımı en az birkaç yüzyıl öncesine dayanmaktadır. Ayurveda\'da bitki, "gokshura" adıyla anılır ve çeşitli bütüncül uygulamalarda yer alır. Geleneksel Çin tıbbında (TCM) ise "ji li" olarak bilinen bitki, farklı bitkisel formüllerin bileşeni olarak kullanılmıştır.\n\nBatı dünyasında Tribulus terrestris, özellikle 1990\'ların başında Sovyet sporcularının performans takviyeleri hakkındaki raporların kamuoyuna yansımasıyla spor beslenme çevresinde gündeme gelmiş ve bu tarihten itibaren kapsamlı araştırmalara konu olmuştur.',
      },
      {
        heading: 'Bilimsel Araştırmalar',
        text: 'Tribulus terrestris üzerine yapılan modern araştırmalar, saponin bileşenlerinin çeşitli fizyolojik parametreler üzerindeki olası etkileri üzerine yoğunlaşmaktadır. Özellikle testosteron ve LH (lüteinizan hormon) seviyeleri üzerindeki olası etkiler, birden fazla araştırma grubu tarafından farklı popülasyonlarda incelenmiştir.\n\nMevcut çalışmaların bir bölümü sporcular ve aktif bireyler üzerinde, bir bölümü ise hayvan modelleri üzerinde yürütülmüştür. Hayvan çalışmalarında gözlemlenen bazı etkiler, insan çalışmalarında her zaman aynı şekilde yansımamıştır. Bu durum, bitkinin araştırma gündeminde canlılığını korumasına yol açmaktadır.',
      },
      {
        heading: 'AphroHarmony Formülündeki Yeri',
        text: "Demir dikeni ekstresi, AphroHarmony'nin 8 bileşenli formülünde bitkisel ekstreler grubunun bir parçasıdır. Günde 1 tablet alınması tavsiye edilir; 18 yaş ve üzeri yetişkinler içindir. Takviye edici gıdalar günlük beslenmenin yerine geçemez.",
      },
    ],

    faq: [
      {
        q: 'Tribulus terrestris Türkçede ne anlama gelir?',
        a: 'Tribulus terrestris, Türkçede "demir dikeni" veya "çakır dikeni" olarak bilinir. Sert ve dikenli meyve yapısından dolayı bu ismi almıştır.',
      },
      {
        q: 'Demir dikeninde hangi aktif bileşikler bulunur?',
        a: 'En önemli aktif bileşenler steroidal saponinler, başta da protodioscin\'dir. Bunların yanı sıra flavonoidler, alkaloidler ve çeşitli glikozitler de tespit edilmiştir.',
      },
      {
        q: 'Tribulus terrestris hangi geleneksel tıp sistemlerinde kullanılmıştır?',
        a: "Ayurveda'da 'gokshura', geleneksel Çin tıbbında ise 'ji li' adıyla bilinir. Her iki sistemde de bütüncül yaklaşımlar çerçevesinde yüzyıllar boyunca kullanılmıştır.",
      },
      {
        q: 'Tribulus terrestris takviyesi güvenli midir?',
        a: 'AphroHarmony gibi takviye edici gıdalar, tavsiye edilen günlük porsiyonda kullanıldığında genel olarak tolere edilebilir kabul edilmektedir. Yine de ilaç kullanıyorsanız veya bir sağlık sorununuz varsa, takviye kullanmadan önce doktorunuza danışmanız önerilir.',
      },
    ],
  },

  {
    slug: 'epimedium',
    name: 'Epimedium',
    latinName: 'Epimedium spp.',
    tagline: 'Geleneksel Çin tıbbının bitkisel ekstresi',
    metaTitle: 'Epimedium (Horny Goat Weed) Nedir? — AphroHarmony Blog',
    metaDescription:
      "Epimedium nedir, ikarin içeriği nedir, Çin geleneksel tıbbındaki yeri nedir? Epimedium ekstresi ve AphroHarmony formülündeki rolü hakkında detaylı bilgi edinin.",
    intro:
      'Epimedium, berbergillerden (Berberidaceae) olan ve dünyada 60\'tan fazla türü bulunan çok yıllık otsu bitkilerin genel adıdır. Batı dünyasında zaman zaman "horny goat weed" adıyla da anılan bu bitki, Çin geleneksel tıbbında en uzun süreli kullanım geçmişine sahip bitkisel bileşenler arasında yer alır.',

    sections: [
      {
        heading: 'Epimedium Nedir?',
        text: 'Epimedium cinsi, ağırlıklı olarak Çin ve diğer Asya ülkelerinde, orman altı gölgelik alanlarda yetişen çok yıllık otsu bitkilerden oluşur. Kalp ya da ok şeklindeki yaprakları ve küçük mor, beyaz veya sarı çiçekleriyle tanınan bu bitkiler, süs bitkileri olarak da tercih edilmektedir.\n\nTibbi amaçlarla yaprak ekstresi kullanılır. Çin farmakopesinde "Herba Epimedii" adıyla kayıtlıdır ve en az beş farklı Epimedium türü bu adla değerlendirilmektedir. Her türün aktif bileşen profili birbirinden farklılık gösterebilir.',
      },
      {
        heading: 'İkarin: Epimedium\'un Temel Bileşeni',
        text: 'Epimedium araştırmalarının merkezinde ikarin (icariin) adlı flavonoid bileşik yer alır. İkarin, kimyasal olarak bir flavonol glikoziti olan ve yalnızca Epimedium türlerine özgü bir fitokimyasaldır.\n\nİn vitro ve hayvan modellerinde yürütülen çalışmalarda ikarin; anti-oksidan aktivite, osteoklast inhibisyonu ve çeşitli sinyal yolaklarındaki etkileri açısından incelenmiştir. İkarin\'in enzimatik hidrolizi sonucu oluşan ikariin ve norikariside gibi metabolitler de araştırma gündemindedir. Söz konusu çalışmaların önemli bir bölümü Çin ve Japon araştırma grupları tarafından yürütülmektedir.',
      },
      {
        heading: 'Çin Geleneksel Tıbbındaki Tarihi',
        text: 'Epimedium, Çin geleneksel tıbbında en az bin yıldır "yin yang huo" adıyla kullanılmaktadır. Çin farmakopesi ve klasik TCM metinlerinde bitkiye geniş yer verilmiştir.\n\nGeleneksel kullanımda Epimedium genellikle diğer bitkisel bileşenlerle kombinasyon halinde kullanılır; tek başına uygulamadan ziyade formül bazlı yaklaşım söz konusudur. Modern dönemde ise bitki, hem Asya hem de Batı kökenli takviye formülasyonlarında giderek artan bir tercih haline gelmiştir.',
      },
      {
        heading: 'Araştırma Alanları',
        text: 'Epimedium ve ikarin üzerine yürütülen araştırmalar birkaç temel başlıkta yoğunlaşmaktadır: kemik sağlığı (osteoporoz modelleri), nöroprotektif etkiler, anti-oksidan aktivite ve cinsel sağlık.\n\nÖzellikle fosfodiesteraz-5 (PDE5) inhibisyonu üzerine yapılan çalışmalar büyük ilgi çekmiştir; ikarin\'in PDE5 enzimini inhibe ettiği in vitro ortamda gösterilmiştir. Ancak bu etkinin insanlarda yeterli konsantrasyona ulaşıp ulaşamayacağı hâlâ tartışma konusudur. Söz konusu etkinin daha iyi anlaşılabilmesi için kapsamlı insan çalışmalarına ihtiyaç duyulmaktadır.',
      },
      {
        heading: 'AphroHarmony Formülündeki Rolü',
        text: "Epimedium ekstresi, AphroHarmony'nin sekiz bileşenli formülünde bitkisel ekstreler grubunu oluşturan beş bileşenden biridir. Formül; L-Arjinin, E vitamini ve çinkoyla birlikte bir bütün oluşturur. 18 yaş ve üzeri yetişkinler için günde 1 tablet alınması tavsiye edilir.",
      },
    ],

    faq: [
      {
        q: "Epimedium'un Türkçe adı nedir?",
        a: "Epimedium'un Türkiye'de yaygın bir Türkçe ismi bulunmamaktadır. Batı dillerinde 'horny goat weed' olarak bilinir; Çin tıbbında ise 'yin yang huo' adıyla anılır.",
      },
      {
        q: 'İkarin ne demektir?',
        a: "İkarin (icariin), yalnızca Epimedium türlerinde bulunan bir flavonol glikozididir. Epimedium araştırmalarının temel odak noktasını oluşturur ve standardize ekstrelerde içerik miktarı ölçüt olarak kullanılır.",
      },
      {
        q: 'Epimedium PDE5 inhibitörü müdür?',
        a: "In vitro çalışmalarda ikarin'in PDE5 enzimini inhibe ettiği gösterilmiştir. Ancak bu etkinin insan vücudunda fizyolojik dozlarda ne ölçüde geçerli olduğu henüz netlik kazanmamıştır; bu konu araştırmacıların gündemini korumaktadır.",
      },
      {
        q: 'Epimedium hangi ülkelerde yetişir?',
        a: "Epimedium türleri başta Çin olmak üzere Japonya, Kore ve Akdeniz'in bazı bölgelerinde doğal olarak yetişir. Süs bitkisi olarak dünyada geniş bir coğrafyada da yetiştirilmektedir.",
      },
    ],
  },

  {
    slug: 'maca-koku',
    name: 'Maca Kökü',
    latinName: 'Lepidium meyenii',
    tagline: "And dağlarının süper besin kaynağı",
    metaTitle: 'Maca Kökü Nedir, Faydaları Nelerdir? — AphroHarmony Blog',
    metaDescription:
      'Maca kökü (Lepidium meyenii) nedir, hangi besinleri içerir, geleneksel kullanımı nasıldır? And dağlarının bitkisel ekstresi ve araştırma geçmişini öğrenin.',
    intro:
      "Lepidium meyenii, halk arasında kısaca maca veya Perulu maca olarak bilinen turpgillerden (Brassicaceae) çok yıllık bir bitkidir. Peru'nun And dağlarında, özellikle Puno bölgesindeki Junin platosunda 4.000-4.500 metre yüksekliklerde yetişen bu bitki, zorlu iklim koşullarına — kuvvetli UV radyasyonu, düşük sıcaklıklar ve dondurucu gece soğukları — olağanüstü bir uyum yeteneği geliştirmiştir.",

    sections: [
      {
        heading: 'Maca Kökü Nedir?',
        text: "Maca bitkisinin tüketilen kısmı, yere yakın konumda şişmiş olarak büyüyen hipokotil adlı kısımdır; bu bölge hem kök hem de alt gövde özelliklerini taşır. Renk bakımından krem-sarı, turuncu, kırmızı ve mor gibi çeşitli varyeteler mevcuttur. Renk farklılığı yalnızca görsel bir özellik değildir; farklı renkteki maca varyetelerinin biyoaktif bileşen profilleri de birbirinden kısmen ayrışmaktadır.\n\nBitki, And halklarının geleneksel mutfağında temel besin maddelerinden biri olarak yer almıştır. Haşlanarak, kurutularak veya un haline getirilerek tüketilir. Günümüzde maca; toz, kapsül ve sıvı özüt formlarında dünya genelinde satılmaktadır.",
      },
      {
        heading: 'Besin İçeriği',
        text: "Maca kökü, makro ve mikro besin öğeleri açısından dikkat çekici bir profile sahiptir:\n\n• Karbonhidrat: Kuru ağırlığın yaklaşık %60'ını oluşturur.\n• Protein: Kuru ağırlığa göre %10-14 oranında; esansiyel amino asit içeriği bakımından bitkisel kaynaklara kıyasla oldukça yüksektir.\n• Lif: Bağırsak sağlığını destekleyen önemli bir kaynak.\n• Vitaminler: C vitamini, niasin (B3), riboflavin (B2) ve folik asit başı çeker.\n• Mineraller: Demir, bakır, manganez, potasyum ve çinko içerir.\n• Yağ asitleri: Düşük miktarda olmakla birlikte linoleik asit ve oleik asit gibi çoklu doymamış yağ asitleri içerir.\n\nBunların yanı sıra maca; glukosinolat, makamid ve makain gibi kendine özgü fitokimyasal bileşikler barındırmaktadır.",
      },
      {
        heading: 'And Halklarında Geleneksel Kullanım',
        text: "Maca'nın And bölgesinde kullanım tarihi, İnka uygarlığından çok önceye, yaklaşık 2.000-3.000 yıl öncesine dayanmaktadır. Arkeolojik bulgular, bitkinin yüksek rakımlı tarım alanlarında bilinçli olarak yetiştirildiğini ortaya koymaktadır.\n\nGeleneksel kullanımda maca, özellikle doğurganlık, dayanıklılık ve genel canlılık bağlamında değerlendirilmiştir. İspanyol sömürge döneminde kaleme alınan kronikler, İnkaların at üretiminde maca'nın rolünü belgelemiştir. Bugün Peru'da maca, hem geleneksel hem de modern mutfakta varlığını sürdürmektedir.",
      },
      {
        heading: 'Araştırma Alanları ve Bulgular',
        text: 'Maca üzerine yapılan araştırmalar özellikle 2000\'li yıllardan itibaren artış göstermiştir. Çalışmaların büyük bölümü üç temel alanda yoğunlaşmaktadır:\n\n1. Üreme sağlığı ve fertilite: Hem hayvan modellerinde hem de insan çalışmalarında maca\'nın sperm parametreleri üzerindeki olası etkileri incelenmiştir. Bazı pilot çalışmalar olumlu yönde gözlemler aktarsa da sonuçlar tutarsızlık göstermektedir.\n\n2. Ruh hali ve yorgunluk: Birkaç küçük ölçekli çalışmada menopoz semptomları ve yorgunluk üzerinde öznel iyileşme raporlanmıştır; bununla birlikte plasebo kontrollü büyük ölçekli araştırmalara ihtiyaç duyulmaktadır.\n\n3. Kemik sağlığı: Hayvan modellerinde glukosinolatların kemik mineral yoğunluğuna olası katkıları araştırılmaktadır.',
      },
      {
        heading: 'AphroHarmony Formülündeki Yeri',
        text: "Maca kökü ekstresi, AphroHarmony'nin 8 bileşeninden biri olarak formülde yer almaktadır. Bu takviye edici gıda; 18 yaş ve üzeri yetişkinler için günde 1 tablet alınması önerisiyle sunulmaktadır. Tavsiye edilen günlük porsiyonu aşmayın; dengeli beslenmenin yerini tutmaz.",
      },
    ],

    faq: [
      {
        q: 'Maca kökünün bilimsel adı nedir?',
        a: "Maca'nın bilimsel adı Lepidium meyenii'dir. Turpgillerden (Brassicaceae) olan bu bitki, Peru And dağlarına özgüdür.",
      },
      {
        q: 'Maca tozu ne işe yarar?',
        a: "Maca tozu; protein, karbonhidrat, C vitamini, demir ve bakır açısından besleyici bir takviye kaynağıdır. And geleneksel tıbbında yüzyıllarca genel canlılık amacıyla kullanılmıştır.",
      },
      {
        q: 'Maca ile Ginseng aynı bitki midir?',
        a: "Hayır, bunlar farklı bitkilerdir. Maca (Lepidium meyenii) turpgillerden bir And bitkisidir; Ginseng ise Panax cinsinden Asya kökenli bir bitkidir. AphroHarmony formülünde yalnızca maca yer almaktadır; Ginseng içermez.",
      },
      {
        q: 'Maca kökü takviyesi kimler kullanabilir?',
        a: "AphroHarmony takviye edici gıdası 18 yaş ve üzeri yetişkinler içindir. Hamilelik, emzirme döneminde veya ilaç kullanıyorsanız, kullanmadan önce doktorunuza danışınız.",
      },
    ],
  },

  {
    slug: 'cuce-palmiye',
    name: 'Cüce Palmiye',
    latinName: 'Serenoa repens',
    tagline: "Saw palmetto — bitkisel ekstrakt",
    metaTitle: 'Cüce Palmiye (Saw Palmetto) Nedir? — AphroHarmony Blog',
    metaDescription:
      'Serenoa repens (cüce palmiye / saw palmetto) nedir, ne işe yarar, hangi bileşenleri içerir? Araştırma geçmişini ve AphroHarmony formülündeki rolünü öğrenin.',
    intro:
      "Serenoa repens, Arecaceae (palmiye) familyasından, boyunun düşüklüğüyle öne çıkan tek türlü bir bitkidir. Florida, Georgia ve diğer Güneydoğu ABD eyaletlerinin kıyı şeritleri boyunca yayılan bu alçak palmiye, keskin dişli yaprakları nedeniyle İngilizce'de 'saw palmetto' (testere yapraklı palmiye) olarak adlandırılmaktadır. Meyveleri, yüzyıllardır bitkisel takviye formülasyonlarının vazgeçilmez bir bileşeni olmaktadır.",

    sections: [
      {
        heading: 'Cüce Palmiye Nedir?',
        text: "Serenoa repens, genellikle 2-4 metre boyunda, dik bir gövde yerine yerde yayılan horizontal gövde yapısıyla büyüyen çok yıllık bir bitkidir. Kışa ve kuraklığa karşı son derece dayanıklıdır; bazı bireylerinin 700 yılı aşkın süre yaşadığı tahmin edilmektedir.\n\nBitki, Ekim-Kasım aylarında olgunlaşan koyu mor-siyah renkli meyveler verir. Bu meyveler taze, kurutulmuş veya yağ ekstresi formunda işlenerek takviye ürünü olarak kullanılır. Serenoa repens, Kuzey Amerika'nın en çok araştırılan bitkisel takviyeleri arasında yer almaktadır.",
      },
      {
        heading: 'Kimyasal Bileşimi',
        text: "Cüce palmiye meyvesinin fitokimyasal profili oldukça karmaşık bir yapı sergilmektedir:\n\n• Yağ asitleri: Laurik asit, oleik asit, miristik asit ve kaprilik asit öne çıkan bileşenlerdir. Toplam yağ içeriği meyvenin kuru ağırlığının %25-30'una ulaşabilir.\n• Fitosterol: Beta-sitosterol, kampesterol ve stigmasterol başlıca fitosterollerdir. Fitosterollerin kolesterol ile yapısal benzerliği araştırma çevrelerinin ilgisini çekmiştir.\n• Polisakkaritler: Bağışıklık sistemi üzerine çalışılan bazı araştırmalarda incelenmektedir.\n• Flavonoidler: Kuersetin ve rutin gibi antioksidan bileşikler de tespit edilmiştir.\n\nStandardize cüce palmiye ekstrelerinde aktif madde içeriği, yağ asidi ve fitosterol oranına göre belirlenir.",
      },
      {
        heading: 'Geleneksel ve Tarihsel Kullanım',
        text: "Cüce palmiyenin meyvesi, Seminol ve diğer Kuzey Amerika yerli halklarının geleneksel diyetinde önemli bir yer tutmuştur. Hem besin hem de geleneksel bitkisel pratiklerde kullanılan meyveler, kurutularak kış için saklanmıştır.\n\n19. yüzyıl Amerikan tıbbi literatüründe de cüce palmiyeye ilişkin kayıtlar bulunmaktadır. Eczacılık alanında yaygın bir ilgi gören bitki, 20. yüzyılın ortalarına dek çeşitli Amerikan farmakope yayınlarında yer almıştır. Günümüzde ise Serenoa repens, Avrupa ve Kuzey Amerika'da en yüksek satış hacmine sahip bitkisel takviye bileşenlerinden biri konumundadır.",
      },
      {
        heading: 'Bilimsel Araştırmalar',
        text: "Cüce palmiye üzerine yapılan araştırmalar, büyük çoğunlukla erkek üreme sağlığı ve hormonal parametreler üzerine odaklanmıştır. Özellikle 5-alfa redüktaz enziminin inhibisyonu, araştırmacıların ilgilendiği başlıca mekanizma olmuştur.\n\n5-alfa redüktaz, testosteronun dihidrotestosterona (DHT) dönüştürülmesini katalizler. In vitro çalışmalarda cüce palmiye yağ asitlerinin bu enzimi inhibe edebildiği gösterilmiş; bu bulgu bitkiyi BPH (benign prostat hiperplazisi) araştırmalarının merkezine taşımıştır. Ancak randomize kontrollü insan çalışmalarının sonuçları karışık veriler ortaya koymuş ve konu araştırmacıların tartışma gündeminde kalmaya devam etmektedir.",
      },
      {
        heading: 'AphroHarmony Formülündeki Yeri',
        text: "Serenoa repens ekstresi, AphroHarmony'nin 8 bileşenli takviye formülünde yer almaktadır. 18 yaş ve üzeri yetişkinler için günde 1 tablet önerilir. Tavsiye edilen günlük porsiyonu aşmayın; ilaç kullanıyorsanız kullanmadan önce doktorunuza danışınız.",
      },
    ],

    faq: [
      {
        q: 'Saw palmetto nedir, Türkçesi nedir?',
        a: "Saw palmetto, Serenoa repens bitkisinin İngilizce adıdır. Türkçede 'cüce palmiye' olarak bilinir; keskin dişli yaprakları nedeniyle bu ismi almıştır.",
      },
      {
        q: 'Cüce palmiye meyve mi kullanılır, yaprak mı?',
        a: "Takviye amaçlı kullanımlarda meyve özütü tercih edilir. Yaprak, bitkisel ürün formülasyonlarında çok daha az yer almaktadır.",
      },
      {
        q: 'Cüce palmiye ekstresi saç dökülmesine karşı kullanılır mı?',
        a: "DHT ile saç dökülmesi arasındaki ilişki nedeniyle bazı araştırmalar cüce palmiyenin saç dökülmesi üzerindeki olası etkilerini incelemiştir. Mevcut bulgular sınırlı ve tutarsız olup bu konuda büyük ölçekli çalışmalara ihtiyaç duyulmaktadır.",
      },
      {
        q: 'Cüce palmiye kaç yıl yaşar?',
        a: "Serenoa repens bireylerinin bazılarının 700 yılı aşkın yaşadığı tahmin edilmektedir. Kışa, kuraklığa ve yangına son derece dayanıklı olan bu bitki, dünyanın en uzun ömürlü bitkisel organizmalarından biridir.",
      },
    ],
  },

  {
    slug: 'ginkgo-biloba',
    name: 'Ginkgo Biloba',
    latinName: 'Ginkgo biloba',
    tagline: "Yaşayan fosil — 270 milyon yıllık bitki",
    metaTitle: 'Ginkgo Biloba Nedir, Ne İşe Yarar? — AphroHarmony Blog',
    metaDescription:
      'Ginkgo biloba nedir, flavonoid içeriği nedir, Çin tıbbındaki yeri nedir? Dünyanın en çok araştırılan bitkisel ekstrelerinden birinin hikayesini öğrenin.',
    intro:
      "Ginkgo biloba, yeryüzünde yaşayan en eski ağaç türlerinden biridir. Fosil kayıtları bu ağacın yaklaşık 270 milyon yıl önce Permian döneminde var olduğunu göstermektedir; bu özellik, onu dinozorların çağdaşı yapan ve 'yaşayan fosil' unvanını kazandıran olgu budur. Bugün dünyada kalan tek Ginkgo türü olan G. biloba, doğada yalnızca Çin'in bazı dağlık bölgelerinde yabani olarak yetişmekte; dünya genelinde ise yaygın biçimde park ve bahçelerde kültüre alınmaktadır.",

    sections: [
      {
        heading: 'Ginkgo Biloba Nedir?',
        text: "Ginkgo biloba, Ginkgoaceae familyasının tek yaşayan temsilcisidir. 25-35 metreye ulaşabilen bu yaprak döken ağaç, yelpaze şekilli yaprakları ve sonbaharda aldığı canlı sarı rengiyle kolayca tanınır. Dişi ağaçlar küçük, sarı-turuncu renkli tohumlar üretir; ancak tohumların olgunlaşması sırasında hoş olmayan bir koku ortaya çıkmasından dolayı peyzaj uygulamalarında çoğunlukla erkek ağaçlar tercih edilmektedir.\n\nBitki hem şehir kirliliğine hem de hastalıklara karşı olağanüstü bir direnç sergilemektedir. Hiroşima'ya atılan atom bombasının ardından bomba merkezinin yakınında kalan Ginkgo ağaçları hayatta kalmış; bu durum bitkinin efsanevi dayanıklılığını daha da güçlendirmiştir.",
      },
      {
        heading: 'Kimyasal Bileşimi: Flavonoidler ve Terpenoidler',
        text: "Standart Ginkgo biloba yaprak ekstresi (GBE), iki temel bileşen grubu üzerine standardize edilmektedir:\n\n1. Ginkgo flavon glikozitleri (%24): Kuersetin, kaempferol ve isorhamnetin glikozitlerini kapsar. Bu bileşikler güçlü antioksidan aktiviteyle ilişkilendirilmektedir.\n\n2. Terpenoid laktonlar (%6): Ginkgolid A, B, C ve bilobalid en iyi belgelenmiş olanlarıdır. Özellikle ginkgolid B, PAF (platelet-aktive edici faktör) antagonisti olarak araştırmalarda öne çıkmaktadır.\n\nBu iki grup dışında, ham yapraklarda toksik olabilen ginkgolik asitler de bulunur. Kaliteli ekstreler, ginkgolik asit içeriğini 5 ppm'nin altına düşürmek amacıyla özel saflaştırma işlemlerinden geçirilir.",
      },
      {
        heading: 'Çin Geleneksel Tıbbındaki Yeri',
        text: "Ginkgo tohumları, Çin tıbbında en az 1.000 yıldır 'bai guo' adıyla kullanılmaktadır. Geleneksel Çin eczacılığı metinlerinde bitkinin hem tohumu hem de yaprağına yer verilmiştir.\n\nModern dönemde tıbbi ilgi tohumdan yaprağa kayarak standartlaştırılmış EGb 761 formülasyonunun geliştirilmesine zemin hazırlamıştır. EGb 761, özellikle 1980'lerden itibaren Avrupa'da geniş akademik ilgi görmüştür ve bu konudaki araştırmalar, Ginkgo biloba'yı bugün dünyada en kapsamlı incelenen bitkisel ekstrelerin başına taşımıştır.",
      },
      {
        heading: 'Araştırma Alanları',
        text: "Ginkgo biloba ekstresine ilişkin araştırmalar birkaç temel başlıkta yoğunlaşmıştır:\n\n• Bilişsel işlev ve yaşlanma: EGb 761'in hafıza ve bilişsel parametreler üzerindeki etkileri, özellikle yaşlı bireylerde kapsamlı biçimde incelenmiştir. Mevcut veriler umut verici olmakla birlikte tartışmalı olmaya devam etmektedir.\n• Antioksidan etki: Flavonoid içeriğinin oksidatif stres biyobelirteçleri üzerindeki etkileri çeşitli klinik ortamlarda araştırılmıştır.\n• Retina ve görme: Bazı çalışmalarda Ginkgo'nun retinal dolaşım parametreleri üzerindeki etkileri incelenmiştir.\n• Tinnitus (kulak çınlaması): Küçük ölçekli bazı çalışmalar olumlu gözlemler aktarsa da büyük çaplı randomize kontrollü çalışmaların bulguları tutarsızlık göstermektedir.",
      },
      {
        heading: 'AphroHarmony Formülündeki Rolü',
        text: "Ginkgo biloba yaprak ekstresi, AphroHarmony'nin 8 bileşenli formülünde yer alan bitkisel ekstrelerden biridir. 18 yaş ve üzeri yetişkinler için günde 1 tablet tavsiye edilir. Kan sulandırıcı ilaç kullanıyorsanız, antikoagülan veya antiplatelet tedavi görüyorsanız doktorunuza danışınız.",
      },
    ],

    faq: [
      {
        q: 'Ginkgo biloba neden "yaşayan fosil" olarak adlandırılır?',
        a: "Ginkgo biloba'nın atalarına ait fosil kayıtları yaklaşık 270 milyon yıl öncesine uzanmaktadır. Bugün dünyada yaşayan tek Ginkgo türü olması ve milyonlarca yıl boyunca morfolojisini neredeyse değiştirmemiş olması, ona bu unvanı kazandırmıştır.",
      },
      {
        q: 'Ginkgo biloba yaprak ekstresi ile tohumu arasındaki fark nedir?',
        a: "Modern takviye ürünlerinde standart yaprak ekstresi (GBE) kullanılır; tohum değil. Ham tohumlar yüksek miktarda ginkgolik asit içerebilir. Kaliteli yaprak ekstrelerinde bu bileşenler 5 ppm'nin altına düşürülür.",
      },
      {
        q: 'EGb 761 nedir?',
        a: "EGb 761, %24 ginkgo flavon glikoziti ve %6 terpenoid lakton içerecek biçimde standardize edilmiş tescilli bir Ginkgo biloba yaprak ekstresidir. Akademik literatürdeki çalışmaların büyük bölümünde bu formülasyon kullanılmıştır.",
      },
      {
        q: 'Kan sulandırıcı kullananlar Ginkgo biloba alabilir mi?',
        a: "Ginkgolid B'nin PAF inhibitör özelliği göz önüne alındığında, antikoagülan veya antiplatelet ilaç kullananların Ginkgo biloba içeren takviyeler almadan önce doktorlarına danışması önemle önerilir.",
      },
    ],
  },

  {
    slug: 'e-vitamini',
    name: 'E Vitamini',
    latinName: undefined,
    tagline: "Tokoferol — yağda çözünen antioksidan",
    metaTitle: 'E Vitamini (Tokoferol) Nedir, Ne İşe Yarar? — AphroHarmony Blog',
    metaDescription:
      'E vitamini nedir, hangi gıdalarda bulunur, antioksidan etkisi nasıl çalışır? Tokoferol ailesininin biyokimyası ve AphroHarmony formülündeki rolünü keşfedin.',
    intro:
      "E vitamini, yağda çözünen bir vitamin grubu olan tokoferoller ve tokotrienollerin kolektif adıdır. Sekiz farklı izoforma sahip bu vitamin grubu içinde biyolojik olarak en aktif ve insan vücudunda en çok depolanan formu alfa-tokoferol (α-tocopherol) olup Uluslararası Besin Referans Değerleri bu form üzerinden belirlenmektedir. İlk kez 1922'de keşfedilen E vitamini, o tarihten bu yana beslenme biliminin en yoğun araştırdığı vitaminler arasında yerini korumaktadır.",

    sections: [
      {
        heading: 'E Vitamini Nedir?',
        text: "E vitamini, kimyasal olarak kroman-6-ol çekirdeği üzerine inşa edilmiş bir yapıya sahiptir. Dört tokoferol (alfa, beta, gama, delta) ve dört tokotrienol izoformu bulunmaktadır. Bu sekiz bileşiğin tamamı, bağırsak duvarından emilmek için yağ varlığına ihtiyaç duyduğundan yağlı besinlerle birlikte alınmaları tavsiye edilir.\n\nKaraciğer, vücuttaki E vitamini metabolizmasını düzenleyen merkezi organdır. Burada alfa-tokoferol transfer proteini (α-TTP) aracılığıyla alfa-tokoferol, diğer izoformların önüne geçerek vücut dokularına dağıtılmak üzere seçilir. Bu mekanizma, neden alfa-tokoferolün 'referans E vitamini' olarak kabul edildiğini açıklar.",
      },
      {
        heading: 'Antioksidan Mekanizması',
        text: "E vitaminin temel işlevi, biyolojik membranlardaki lipid peroksidasyonunu durdurmaktır. Hücre zarlarında bol miktarda bulunan doymamış yağ asitleri, serbest radikallerin saldırısına açık hedeflerdir. Alfa-tokoferol, bu serbest radikalleri kendine çekerek tokoferoksil radikaline dönüşür; böylece zincir reaksiyonunu durdurur.\n\nOluşan tokoferoksil radikali ise C vitamini (askorbat) veya glutatyon gibi diğer antioksidanlar tarafından yeniden aktif forma dönüştürülebilir. Bu 'antioksidan ağı' konsepti, E vitamini araştırmalarının temel çerçevesini oluşturmuştur.",
      },
      {
        heading: 'Hangi Gıdalarda Bulunur?',
        text: "E vitamini, özellikle bitkisel yağlarda ve yağlı tohumlarda yoğun olarak bulunur. En zengin kaynaklar şunlardır:\n\n• Buğday tohumu yağı (en yüksek konsantrasyon)\n• Ayçiçeği yağı ve ayçiçeği tohumu\n• Badem ve fındık\n• Zeytin ve zeytinyağı\n• Avokado\n• Ispanak ve koyu yeşil yapraklı sebzeler\n• Kırmızı biber\n\nE vitamini ısıya ve oksidasyona karşı hassastır; rafine edilmiş yağlar ve yüksek ısıda pişirilen besinlerdeki içerik kayda değer ölçüde azalabilir.",
      },
      {
        heading: 'Bilimsel Araştırma Geçmişi',
        text: "E vitamini araştırmalarının tarihi, 1922'de Herbert McLean Evans ve Katharine Scott Bishop'ın sıçanlarda üreme için gerekli yağda çözünen bir faktörü keşfetmesiyle başlar. Bitkiyi izole etmek 1936'yı bulurken 1938'de Fernholz kimyasal yapısını aydınlatmıştır.\n\nSonraki on yıllarda E vitamini, kardiyovasküler sağlık, kanser önleme, nörodejeneratif hastalıklar ve bağışıklık sistemi başlıklarında kapsamlı çalışmalara konu olmuştur. Özellikle 1990'lardaki büyük ümitler, sonraki dönemde yürütülen randomize kontrollü çalışmalarla kısmen gölgelenmiş olsa da vitamin, beslenme bilimlerinin gündeminden düşmemiştir.",
      },
      {
        heading: 'AphroHarmony Formülündeki Rolü',
        text: "E vitamini, AphroHarmony'nin 8 bileşeninden birini oluşturmaktadır. Bitkisel ekstreler ve L-Arjinin ile birlikte formülde yer alır. Günde 1 tablet, 18 yaş ve üzeri yetişkinler için tavsiye edilir. Tavsiye edilen günlük porsiyonu aşmayın.",
      },
    ],

    faq: [
      {
        q: 'E vitamininin kaç farklı formu vardır?',
        a: "E vitamini sekiz izoformdan oluşur: dört tokoferol (alfa, beta, gama, delta) ve dört tokotrienol. Biyolojik aktivitesi en yüksek ve insan dokularında en çok bulunan form alfa-tokoferoldür.",
      },
      {
        q: 'E vitamini neden yağlı besinlerle alınmalı?',
        a: "E vitamini yağda çözünen bir vitamindir. Bağırsak duvarından emilmesi için safra asitleri ve diyet yağlarının varlığına ihtiyaç duyar. Bu nedenle yağsız besinlerle tek başına alındığında emilim miktarı önemli ölçüde azalır.",
      },
      {
        q: 'E vitamini eksikliği ne zaman görülür?',
        a: "E vitamini eksikliği, yeterli beslenme sağlayan bireylerde nadiren görülür. Yağ emilimini bozan hastalıklar (kistik fibrozis, kronik karaciğer rahatsızlığı, Crohn hastalığı gibi) veya ciddi malnütrisyon durumlarında eksiklik gelişebilir.",
      },
      {
        q: 'E vitamini C vitamini ile birlikte alınabilir mi?',
        a: "Evet. Beslenme bilimleri literatüründe E ve C vitaminlerinin birbirini tamamladığı bilinmektedir. C vitamini (askorbat), oksidasyona uğramış tokoferoksil radikalini yeniden aktif alfa-tokoferole dönüştürerek E vitamininin antioksidan kapasitesini sürdürmesine yardımcı olur.",
      },
    ],
  },

  {
    slug: 'cinko',
    name: 'Çinko',
    latinName: undefined,
    tagline: "300+ enzimin kofaktörü — temel iz mineral",
    metaTitle: 'Çinko Nedir, Ne İşe Yarar? — AphroHarmony Blog',
    metaDescription:
      'Çinko nedir, hangi gıdalarda bulunur, testosteron ile ilişkisi nedir? EFSA onaylı sağlık beyanları ve AphroHarmony formülündeki rolüyle birlikte tüm detaylar burada.',
    intro:
      "Çinko, demir ve kalsiyumun ardından insan vücudunda en bol bulunan üçüncü iz mineraldir. Yaklaşık 300 enzimin katalitik bileşeni, 2.000'den fazla transkripsiyon faktörünün yapısal bileşeni olarak görev yapan çinko; bağışıklık işlevinden DNA sentezine, protein metabolizmasından duyusal algıya dek sayısız temel fizyolojik sürecin merkezinde yer alır.",

    sections: [
      {
        heading: 'Çinko Nedir?',
        text: "Çinko (Zn, atom numarası 30), periyodik tablonun 12. grubunda yer alan bir geçiş metalidir. Biyolojik sistemlerde Zn²⁺ iyonu formunda işlev görmektedir. İnsan vücudu 2-4 gram çinko depolamaktadır; bu miktarın yaklaşık %60'ı iskelet kaslarında, %30'u kemikte, geri kalanı ise deri, karaciğer, pankreas, böbrek ve beyin gibi çeşitli dokularda bulunmaktadır.\n\nVücut, çinkoyu depolamak için özel mekanizmalardan yoksundur. Bu nedenle günlük diyet yoluyla alım, vücudun ihtiyacını karşılamak açısından kritik önem taşır.",
      },
      {
        heading: 'Enzimatik ve Yapısal Rolleri',
        text: "Çinkonun biyolojik işlevleri üç temel kategoride incelenir:\n\n1. Katalitik rol: Karbonikhidraz (CO₂ dengesi), alkol dehidrojenaz (alkol metabolizması), RNA polimeraz (gen ifadesi) ve çok sayıda proteaz gibi enzimlerin aktif merkezinde yer alır.\n\n2. Yapısal rol: 'Çinko parmağı' (zinc finger) adı verilen protein motiflerinde çinko, dört sistein veya histidin kalıntısı arasında koordinasyon bağı kurarak proteinin üç boyutlu yapısını stabilize eder. Bu motifler transkripsiyon faktörleri için kritiktir.\n\n3. Düzenleyici rol: Metalotiyonein gibi proteinler aracılığıyla çinko homeostazı düzenlenir; fazla çinko depolanır, eksiklik halinde serbest bırakılır.",
      },
      {
        heading: 'EFSA Onaylı Sağlık Beyanları',
        text: "Avrupa Gıda Güvenliği Otoritesi (EFSA), çinko için bilimsel dayanaklara sahip çok sayıda sağlık beyanını değerlendirmiş ve onaylamıştır. Bu beyanlar AB Tüzüğü 432/2012 kapsamında listelenmiştir:\n\n• Normal bağışıklık sistemi işlevine katkı\n• Normal testosteron seviyelerinin korunmasına katkı\n• Normal fertilitenin ve üreme işlevinin korunmasına katkı\n• Normal DNA sentezine katkı\n• Normal protein sentezine katkı\n• Normal makro besinlerin metabolizmasına katkı\n• Normal kemik korunmasına katkı\n• Normal görüşün korunmasına katkı\n• Saç, tırnak ve derinin normal korunmasına katkı\n• Normal bilişsel işleve katkı\n\nBu liste, çinkonun insan fizyolojisindeki geniş işlevselliğini net biçimde ortaya koymaktadır.",
      },
      {
        heading: 'Hangi Gıdalarda Bulunur?',
        text: "Çinkonun biyoyararlanımı, gıda kaynağına ve beraberinde alınan maddelere bağlı olarak büyük farklılık gösterir. Hayvansal kaynaklardaki çinko, bitkisel kaynaklara kıyasla daha yüksek oranda emilir:\n\n• İstiridye (en yüksek çinko kaynağı)\n• Kırmızı et (sığır, kuzu)\n• Kabak çekirdeği\n• Kenevir tohumu\n• Kakao ve bitter çikolata\n• Baklagiller (mercimek, nohut, fasulye)\n• Tam tahıllar\n• Süt ürünleri (özellikle peynir)\n\nNot: Tahıl ve baklagillerdeki fitik asit, çinkonun bağırsak emilimini engelleyebilir. Fermentasyon ve ıslatma yöntemleri fitik asit miktarını azaltarak çinko biyoyararlanımını artırabilir.",
      },
      {
        heading: 'Araştırma Bulguları',
        text: "Çinko üzerine yapılan araştırmalar birkaç kritik alanda yoğunlaşmaktadır:\n\nTestosteron ve üreme sağlığı: Testosteron biyosentezinde çinkonun rolü iyi belgelenmiştir. Çinko eksikliği olan erkeklerde testosteron seviyelerinin düştüğü ve yerine koyma tedavisinin bu parametreyi iyileştirebileceği çeşitli çalışmalarda gösterilmiştir. Bu etki, EFSA'nın 'normal testosteron seviyelerinin korunmasına katkı' beyanına temel oluşturmaktadır.\n\nBağışıklık sistemi: T lenfosit gelişimi ve aktivasyonu için çinkonun varlığı şarttır. Çinko eksikliğinin bağışıklık baskılanmasına yol açtığı kapsamlı biçimde belgelenmiştir.\n\nYara iyileşmesi: Kollajen sentezi ve hücre çoğalması için çinkonun gerekliliği nedeniyle dermatoloji alanında çinko takviyeleri araştırılmaktadır.",
      },
      {
        heading: 'AphroHarmony Formülündeki Rolü',
        text: "Çinko, AphroHarmony'nin 8 bileşeninden biridir. EFSA'nın değerlendirdiği sağlık beyanları doğrultusunda normal testosteron seviyelerine ve bağışıklık sistemine katkısı bilinmektedir. 18 yaş ve üzeri yetişkinler için günde 1 tablet önerilir. Tavsiye edilen günlük porsiyonu aşmayın.",
      },
    ],

    faq: [
      {
        q: 'Çinko eksikliğinin belirtileri nelerdir?',
        a: "Çinko eksikliğinin başlıca belirtileri arasında bağışıklık sisteminin zayıflaması, yara iyileşmesinde gecikme, saç dökülmesi, iştah kaybı ve tat-koku duyusunda değişim sayılabilir. Ciddi eksiklik büyüme geriliğine yol açabilir.",
      },
      {
        q: 'Çinko testosteron seviyesini etkiler mi?',
        a: "EFSA'nın değerlendirmesine göre çinko, normal testosteron seviyelerinin korunmasına katkıda bulunur. Bu bir AB düzeyinde değerlendirilen, bilimsel dayanaklı bir sağlık beyanıdır.",
      },
      {
        q: 'En iyi çinko kaynağı hangi besindir?',
        a: "İstiridye, birim gramda en yüksek çinko konsantrasyonunu sunan gıdadır. Kırmızı et, kabak çekirdeği ve kakao da zengin kaynaklar arasındadır.",
      },
      {
        q: 'Çinko ile bakır birlikte alınabilir mi?',
        a: "Yüksek doz çinko, bağırsakta bakır emilimini engelleyebilir. Bu nedenle uzun süreli yüksek doz çinko takviyesi kullanımında bakır dengesi göz önünde bulundurulmalıdır. Takviye edici gıdalardaki standart dozlar genellikle bu etkileşimi klinik düzeyde sorun yaratmayacak miktarlarda içerir.",
      },
      {
        q: 'Vejetaryenler çinko eksikliği yaşar mı?',
        a: "Hayvansal kaynaklardaki çinkonun biyoyararlanımı bitkisel kaynaklara göre daha yüksektir. Buna ek olarak bitkisel besinlerdeki fitik asit emilimi kısıtlar. Bu nedenle vejetaryen ve vegan beslenen bireylerin çinko ihtiyaçları dikkatle takip edilmelidir.",
      },
    ],
  },
];

export function getIngredient(slug: string): Ingredient | undefined {
  return INGREDIENTS.find((i) => i.slug === slug);
}
