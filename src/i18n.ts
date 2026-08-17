export type Lang="fa"|"en"|"tr";
export const langs:{code:Lang;label:string;dir:"rtl"|"ltr"}[]=[
 {code:"fa",label:"فارسی",dir:"rtl"},{code:"en",label:"English",dir:"ltr"},{code:"tr",label:"Türkçe",dir:"ltr"}
];
const copy={
fa:{
brand:"فارسیو",navProducts:"محصولات",navDocs:"راهنما",navAbout:"درباره",
hero:"فارسی را بهتر بنویس، بخوان و بشنو.",sub:"فارسیو خانه‌ی ابزارهای هوشمند فارسی‌محور است؛ سریع، ساده و قابل اعتماد.",
explore:"مشاهده محصولات",github:"گیت‌هاب فارسیو",products:"محصولات فارسیو",productsTitle:"دو ابزار، یک تجربه‌ی فارسی بهتر",
nev:"نوشت‌یار",nevTag:"بنویس، درست و روان.",nevBody:"دستیار هوشمند فارسی برای اصلاح نوشتار، بازیابی چیدمان صفحه‌کلید، Finglish و تجربه‌ی دو‌زبانه در مرورگر.",
ava:"آوا",avaTag:"بشنو، به فارسی.",avaBody:"محتوای وب را استخراج می‌کند، در صورت نیاز به فارسی روان برمی‌گرداند و برای شنیدن آماده می‌کند.",
public:"نسخه عمومی",dev:"در حال توسعه",view:"مشاهده محصول",why:"چرا فارسیو",
f1:"Persian-first",b1:"رابط و تجربه از ابتدا برای فارسی طراحی می‌شود، نه به‌عنوان ترجمه‌ی ثانویه.",
f2:"سریع و سبک",b2:"تمرکز روی سرعت، سادگی و مصرف حداقلی منابع.",
f3:"حریم خصوصی",b3:"جریان‌های داده فقط در حد نیاز واقعی محصول و با شفافیت طراحی می‌شوند.",
f4:"متن‌باز",b4:"بخش مهمی از توسعه و انتشار محصولات روی GitHub قابل بررسی است.",
f5:"چندزبانه",b5:"فارسی، انگلیسی و ترکی از نسخه‌ی اول سایت؛ آماده برای زبان‌های بیشتر.",
f6:"قابل گسترش",b6:"فارسیو یک محصول نیست؛ خانواده‌ای برای ابزارهای فارسی‌محور آینده است.",
docsTitle:"راهنما، نصب و پاسخ‌های سریع",docsBody:"Help Center برای شروع کار، نصب، حریم خصوصی و سوالات پرتکرار.",openDocs:"رفتن به راهنما",
aboutTitle:"فارسیو چیست؟",aboutBody:"فارسیو یک برند محصولی برای ساخت ابزارهای فارسی‌محور است. نوشت‌یار و آوا اولین محصولات این خانواده‌اند.",
d1:"شروع",db1:"فارسیو مجموعه‌ای از محصولات برای بهتر نوشتن، خواندن و شنیدن فارسی است.",
d2:"نصب نوشت‌یار",db2:"نسخه عمومی نوشت‌یار از GitHub Release رسمی در دسترس است؛ بسته‌های Chromium و Firefox جدا هستند.",
d3:"آوا",db3:"آوا در حال توسعه است و اطلاعات انتشار آن در صفحه رسمی محصول اضافه می‌شود.",
d4:"حریم خصوصی",db4:"اصل طراحی فارسیو کمینه‌سازی داده و شفافیت است. هر محصول اعلامیه‌ی حریم خصوصی مخصوص خود را خواهد داشت.",
d5:"سوالات پرتکرار",db5:"برای خطاها، پیشنهاد قابلیت و وضعیت توسعه، GitHub مرجع فنی فارسیو است."
},
en:{
brand:"Farsio",navProducts:"Products",navDocs:"Docs",navAbout:"About",
hero:"Write, read and hear Persian better.",sub:"Farsio is the home of Persian-first intelligent tools — fast, simple and trustworthy.",
explore:"Explore products",github:"Farsio on GitHub",products:"Farsio products",productsTitle:"Two tools, one better Persian experience",
nev:"Neveshtyar",nevTag:"Write clearly and correctly.",nevBody:"Persian writing intelligence for corrections, keyboard-layout recovery, Finglish and bilingual browser workflows.",
ava:"Ava",avaTag:"Listen, in Persian.",avaBody:"Extracts web content, turns non-Persian text into fluent Persian when needed, and prepares it for listening.",
public:"Public release",dev:"In development",view:"View product",why:"Why Farsio",
f1:"Persian-first",b1:"Interfaces and product behavior are designed for Persian from day one.",
f2:"Fast & lightweight",b2:"Speed, simplicity and minimal overhead are product requirements.",
f3:"Privacy-minded",b3:"Data flows are minimized to what each product actually needs.",
f4:"Open source",b4:"Important development and release history stays reviewable on GitHub.",
f5:"Multilingual",b5:"Persian, English and Turkish from the first website release.",
f6:"Expandable",b6:"Farsio is a growing family of Persian-first tools.",
docsTitle:"Guides, installation and quick answers",docsBody:"A real Help Center for getting started, installation, privacy and FAQs.",openDocs:"Open docs",
aboutTitle:"What is Farsio?",aboutBody:"Farsio is a product brand for Persian-first tools. Neveshtyar and Ava are the first products in the family.",
d1:"Getting started",db1:"Farsio is a family of products for writing, reading and hearing Persian better.",
d2:"Install Neveshtyar",db2:"Neveshtyar's public release is on the official GitHub Release page, with separate Chromium and Firefox packages.",
d3:"Ava",db3:"Ava is in development. Public release information will appear on its official product page.",
d4:"Privacy",db4:"Farsio is designed around data minimization and transparency. Each product will keep its own privacy notice.",
d5:"FAQ",db5:"GitHub is the technical source of truth for issues, feature requests and development status."
},
tr:{
brand:"Farsio",navProducts:"Ürünler",navDocs:"Dokümantasyon",navAbout:"Hakkında",
hero:"Farsçayı daha iyi yazın, okuyun ve dinleyin.",sub:"Farsio, Farsça odaklı akıllı araçların evidir: hızlı, sade ve güvenilir.",
explore:"Ürünleri keşfet",github:"GitHub'da Farsio",products:"Farsio ürünleri",productsTitle:"İki araç, daha iyi bir Farsça deneyimi",
nev:"Neveshtyar",nevTag:"Doğru ve akıcı yazın.",nevBody:"Yazım düzeltme, klavye düzeni kurtarma, Finglish ve iki dilli tarayıcı akışları için Farsça asistan.",
ava:"Ava",avaTag:"Farsça dinleyin.",avaBody:"Web içeriğini çıkarır, gerektiğinde akıcı Farsçaya dönüştürür ve dinlemeye hazırlar.",
public:"Genel sürüm",dev:"Geliştiriliyor",view:"Ürünü görüntüle",why:"Neden Farsio",
f1:"Farsça odaklı",b1:"Arayüz ve ürün davranışı ilk günden Farsça düşünülerek tasarlanır.",
f2:"Hızlı ve hafif",b2:"Hız, sadelik ve düşük kaynak kullanımı önceliktir.",
f3:"Gizlilik",b3:"Veri akışları gerçek ihtiyaca göre minimumda tutulur.",
f4:"Açık kaynak",b4:"Önemli geliştirme ve sürüm geçmişi GitHub'da incelenebilir.",
f5:"Çok dilli",b5:"İlk sürümde Farsça, İngilizce ve Türkçe.",
f6:"Büyüyebilir",b6:"Farsio büyüyen bir Farsça ürün ailesidir.",
docsTitle:"Kılavuzlar, kurulum ve hızlı yanıtlar",docsBody:"Başlangıç, kurulum, gizlilik ve SSS için Help Center.",openDocs:"Dokümantasyona git",
aboutTitle:"Farsio nedir?",aboutBody:"Farsio, Farsça odaklı araçlar geliştiren bir ürün markasıdır. Neveshtyar ve Ava ilk ürünlerdir.",
d1:"Başlangıç",db1:"Farsio, Farsçayı daha iyi yazmak, okumak ve dinlemek için bir ürün ailesidir.",
d2:"Neveshtyar kurulumu",db2:"Neveshtyar'ın genel sürümü resmi GitHub Release sayfasındadır; Chromium ve Firefox paketleri ayrıdır.",
d3:"Ava",db3:"Ava geliştiriliyor. Genel sürüm bilgileri resmi ürün sayfasına eklenecek.",
d4:"Gizlilik",db4:"Farsio veri minimizasyonu ve şeffaflık ilkelerine göre tasarlanır.",
d5:"SSS",db5:"Hata, özellik talebi ve geliştirme durumu için teknik referans GitHub'dır."
}};
export function t(lang:Lang,key:string){return (copy[lang] as Record<string,string>)[key]??key}
