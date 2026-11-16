const $=s=>document.querySelector(s);
const CATS={info:{fr:'Informatique',ar:'الإعلام الآلي',c:'#3B63F5',c2:'#8CA9FF'},sec:{fr:'Secrétariat',ar:'الأمانة',c:'#D6336C',c2:'#FBB1CF'},ges:{fr:'Gestion',ar:'التسيير',c:'#16A085',c2:'#8EE3CF'},lan:{fr:'Langues',ar:'اللغات',c:'#E8890C',c2:'#FFD48A'}};
// Sample catalogue: edit here, or manage the Supabase "courses" table (it takes priority).
let COURSES=[
{cat:'info',ico:'💻',img:'img/bureautique.jpg',fr:'Bureautique',ar:'المعلوماتية المكتبية',tools:'Word · Excel · PowerPoint',months:1},
{cat:'info',ico:'🌐',img:'img/web.jpg',fr:'Développement web',ar:'تطوير المواقع',tools:'HTML · CSS · JavaScript',months:3},
{cat:'info',ico:'🎨',img:'img/bureautique.jpg',fr:'Infographie et design',ar:'التصميم الغرافيكي',tools:'Photoshop · Illustrator',months:2},
{cat:'info',ico:'🛠️',img:'img/maintenance.jpg',fr:'Maintenance et réseaux',ar:'الصيانة والشبكات',tools:'PC · Windows · LAN',months:3},
{cat:'info',ico:'📱',img:'img/marketing.jpg',fr:'Marketing digital',ar:'التسويق الرقمي',tools:'Facebook · Instagram · Google',months:2},
{cat:'sec',ico:'🗂️',img:'img/secretariat.jpg',fr:'Secrétariat de direction',ar:'أمانة المديرية',tools:'Courrier · Archivage · Accueil',months:3},
{cat:'sec',ico:'🩺',img:'img/medical.jpg',fr:'Secrétariat médical',ar:'الأمانة الطبية',tools:'Dossiers · Rendez-vous',months:3},
{cat:'sec',ico:'⌨️',img:'img/saisie.jpg',fr:'Saisie et traitement de texte',ar:'الإدخال ومعالجة النصوص',tools:'Word · Frappe rapide',months:1},
{cat:'ges',ico:'🧾',img:'img/comptabilite.jpg',fr:'Comptabilité informatisée',ar:'المحاسبة المعلوماتية',tools:'Excel · Logiciel comptable',months:3},
{cat:'ges',ico:'📦',img:'img/stock.jpg',fr:'Gestion de stock',ar:'تسيير المخزون',tools:'Inventaire · Excel',months:1},
{cat:'lan',ico:'🇫🇷',img:'img/francais.jpg',fr:'Français professionnel',ar:'الفرنسية المهنية',tools:'Oral · Écrit · CV',months:3},
{cat:'lan',ico:'🇬🇧',img:'img/anglais.jpg',fr:'Anglais',ar:'الإنجليزية',tools:'Conversation · Business',months:3}];
const artIn=c=>c.img?`<img src="${c.img}" alt="" loading="lazy">`:c.ico;
const dur=(m,l)=>l=='fr'?m+' mois':m==1?'شهر':m==2?'شهران':m+' أشهر';
let LANG=localStorage.getItem('lang')||'fr';
const sb=(window.CFG&&CFG.SUPABASE_URL&&window.supabase)?supabase.createClient(CFG.SUPABASE_URL,CFG.SUPABASE_ANON_KEY):null;
function setLang(l){LANG=l;localStorage.setItem('lang',l);document.documentElement.lang=l;document.documentElement.dir=l=='ar'?'rtl':'ltr';window.render&&render()}
$('#lang').onclick=()=>setLang(LANG=='fr'?'ar':'fr');
