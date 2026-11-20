const $=s=>document.querySelector(s);
const CATS={info:{fr:'Informatique',ar:'الإعلام الآلي',c:'#3B63F5',c2:'#8CA9FF'},sec:{fr:'Secrétariat',ar:'السكرتارية',c:'#D6336C',c2:'#FBB1CF'},ges:{fr:'Gestion',ar:'التسيير',c:'#16A085',c2:'#8EE3CF'},lan:{fr:'Langues',ar:'اللغات',c:'#E8890C',c2:'#FFD48A'}};
// Sample catalogue: edit here, or manage the Supabase "courses" table (it takes priority).
let COURSES=[
{cat:'info',ico:'💻',img:'img/bureautique.jpg',fr:'Bureautique',ar:'المعلوماتية المكتبية',tools:'Word · Excel · PowerPoint',months:1},
{cat:'info',ico:'🌐',img:'img/web.jpg',fr:'Développement web',ar:'تطوير المواقع',tools:'HTML · CSS · JavaScript',months:3},
{cat:'info',ico:'🎨',img:'img/bureautique.jpg',fr:'Infographie et design',ar:'التصميم الغرافيكي',tools:'Photoshop · Illustrator',months:2},
{cat:'info',ico:'🛠️',img:'img/maintenance.jpg',fr:'Maintenance et réseaux',ar:'الصيانة والشبكات',tools:'PC · Windows · LAN',months:3},
{cat:'info',ico:'📱',img:'img/marketing.jpg',fr:'Marketing digital',ar:'التسويق الرقمي',tools:'Facebook · Instagram · Google',months:2},
{cat:'sec',ico:'🗂️',img:'img/secretariat.jpg',fr:'Secrétariat de direction',ar:'سكرتارية المديرية',tools:'Courrier · Archivage · Accueil',months:3},
{cat:'sec',ico:'🩺',img:'img/medical.jpg',fr:'Secrétariat médical',ar:'السكرتارية الطبية',tools:'Dossiers · Rendez-vous',months:3},
{cat:'sec',ico:'⌨️',img:'img/saisie.jpg',fr:'Saisie et traitement de texte',ar:'الإدخال ومعالجة النصوص',tools:'Word · Frappe rapide',months:1},
{cat:'ges',ico:'🧾',img:'img/comptabilite.jpg',fr:'Comptabilité informatisée',ar:'المحاسبة المعلوماتية',tools:'Excel · Logiciel comptable',months:3},
{cat:'ges',ico:'📦',img:'img/stock.jpg',fr:'Gestion de stock',ar:'تسيير المخزون',tools:'Inventaire · Excel',months:1},
{cat:'lan',ico:'🇫🇷',img:'img/francais.jpg',fr:'Français professionnel',ar:'الفرنسية المهنية',tools:'Oral · Écrit · CV',months:3},
{cat:'lan',ico:'🇬🇧',img:'img/anglais.jpg',fr:'Anglais',ar:'الإنجليزية',tools:'Conversation · Business',months:3}];
const DESC={
'Bureautique':['Apprenez à utiliser Word, Excel et PowerPoint pour rédiger des documents, faire des tableaux et présenter vos idées. Une formation pratique, accessible aux débutants, pour gagner en efficacité au travail comme dans vos études.','تعلّم استعمال Word وExcel وPowerPoint لكتابة الوثائق وإنجاز الجداول وعرض أفكارك. تكوين تطبيقي مناسب للمبتدئين لتكسب الوقت والكفاءة في العمل والدراسة.'],
'Développement web':['Créez vos premiers sites web avec HTML, CSS et JavaScript. Vous construisez des pages complètes, adaptées au téléphone, et vous repartez avec des projets concrets à montrer.','أنشئ مواقعك الأولى باستعمال HTML وCSS وJavaScript. تبني صفحات كاملة تناسب الهاتف، وتخرج بمشاريع حقيقية يمكنك عرضها.'],
'Infographie et design':['Maîtrisez Photoshop et Illustrator pour créer des affiches, des logos et des visuels pour les réseaux sociaux. De la retouche photo à la mise en page, vous apprenez en réalisant des projets.','أتقن Photoshop وIllustrator لتصميم الملصقات والشعارات ومحتوى مواقع التواصل. من تعديل الصور إلى تنسيق الصفحات، تتعلم من خلال إنجاز مشاريع.'],
'Maintenance et réseaux':['Apprenez à installer Windows, dépanner un ordinateur et configurer un réseau local. Une formation très pratique pour devenir technicien en informatique.','تعلّم تثبيت Windows وإصلاح أعطال الحاسوب وإعداد شبكة محلية. تكوين تطبيقي للغاية لتصبح تقنيًا في الإعلام الآلي.'],
'Marketing digital':['Promouvez une activité sur Facebook, Instagram et Google : création de pages, publicités, contenus et suivi des résultats. Idéal pour les commerçants et les porteurs de projet.','روّج لنشاطك على فيسبوك وإنستغرام وغوغل: إنشاء الصفحات والإعلانات والمحتوى ومتابعة النتائج. مناسب للتجار وأصحاب المشاريع.'],
'Secrétariat de direction':['Formez-vous aux missions d’un secrétaire de direction : accueil, courrier, classement, archivage et organisation de l’agenda. Vous apprenez à travailler avec rigueur et professionnalisme.','تكوّن على مهام السكرتارية في المديرية: الاستقبال والمراسلات والتصنيف والأرشفة وتنظيم الأجندة. تتعلم العمل بدقة واحترافية.'],
'Secrétariat médical':['Découvrez le métier de secrétaire médical : accueil des patients, gestion des rendez-vous, tenue des dossiers et vocabulaire médical de base.','اكتشف مهنة السكرتارية الطبية: استقبال المرضى وتسيير المواعيد ومسك الملفات والمصطلحات الطبية الأساسية.'],
'Saisie et traitement de texte':['Gagnez en vitesse et en précision : frappe rapide au clavier, mise en forme de documents et de courriers avec Word.','اكسب السرعة والدقة: الطباعة السريعة على لوحة المفاتيح وتنسيق الوثائق والرسائل باستعمال Word.'],
'Comptabilité informatisée':['Apprenez les bases de la comptabilité et sa pratique sur ordinateur : écritures, factures et bilans, avec Excel et un logiciel comptable.','تعلّم أساسيات المحاسبة وتطبيقها على الحاسوب: القيود والفواتير والميزانيات باستعمال Excel وبرنامج محاسبة.'],
'Gestion de stock':['Maîtrisez la gestion des entrées, des sorties et des inventaires pour éviter les ruptures et les pertes, avec des outils simples comme Excel.','أتقن تسيير المدخلات والمخرجات والجرد لتفادي النقص والخسائر، باستعمال أدوات بسيطة مثل Excel.'],
'Français professionnel':['Améliorez votre français à l’oral et à l’écrit pour le travail : rédiger un CV, une lettre, un e-mail et communiquer avec assurance.','حسّن فرنسيتك شفهيًا وكتابيًا للعمل: كتابة السيرة الذاتية والرسائل والبريد الإلكتروني والتواصل بثقة.'],
'Anglais':['Parlez anglais avec plus de confiance : conversation de tous les jours et anglais des affaires, pour voyager, étudier ou travailler.','تحدّث الإنجليزية بثقة أكبر: محادثات يومية وإنجليزية الأعمال، للسفر أو الدراسة أو العمل.']};
COURSES.forEach(c=>{const d=DESC[c.fr];if(d){c.desc_fr=d[0];c.desc_ar=d[1]}});
const slug=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9\u0600-\u06ff]+/g,'-').replace(/^-+|-+$/g,'');
const courseUrl=c=>'formation.html?c='+encodeURIComponent(c.id!=null?c.id:slug(c.fr));
const artIn=c=>c.img?`<img src="${c.img}" alt="" loading="lazy">`:(c.ico||'');
const dur=(m,l)=>l=='fr'?m+' mois':m==1?'شهر':m==2?'شهران':m+' أشهر';
let LANG=localStorage.getItem('lang')||'fr';
const sb=(window.CFG&&CFG.SUPABASE_URL&&window.supabase)?supabase.createClient(CFG.SUPABASE_URL,CFG.SUPABASE_ANON_KEY):null;
function setLang(l){LANG=l;localStorage.setItem('lang',l);document.documentElement.lang=l;document.documentElement.dir=l=='ar'?'rtl':'ltr';document.querySelectorAll('[data-lang]').forEach(b=>b.classList.toggle('on',b.dataset.lang==l));window.render&&render()}
if($('#lang'))$('#lang').onclick=()=>setLang(LANG=='fr'?'ar':'fr');
document.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>setLang(b.dataset.lang));
