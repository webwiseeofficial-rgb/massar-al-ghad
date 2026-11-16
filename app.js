const $=s=>document.querySelector(s);
const CATS={info:{fr:'Informatique',ar:'الإعلام الآلي',c:'#0B3C5D'},sec:{fr:'Secrétariat',ar:'الأمانة',c:'#F5B301'},ges:{fr:'Gestion',ar:'التسيير',c:'#1A7F6B'},lan:{fr:'Langues',ar:'اللغات',c:'#C2410C'}};
// Sample catalogue: edit here, or manage it in the Supabase "courses" table (it takes priority).
let COURSES=[
{cat:'info',ico:'💻',fr:'Bureautique',ar:'المعلوماتية المكتبية',tools:'Word · Excel · PowerPoint',months:1},
{cat:'info',ico:'🌐',fr:'Développement web',ar:'تطوير المواقع',tools:'HTML · CSS · JavaScript',months:3},
{cat:'info',ico:'🎨',fr:'Infographie et design',ar:'التصميم الغرافيكي',tools:'Photoshop · Illustrator',months:2},
{cat:'info',ico:'🛠️',fr:'Maintenance et réseaux',ar:'الصيانة والشبكات',tools:'PC · Windows · LAN',months:3},
{cat:'info',ico:'📱',fr:'Marketing digital',ar:'التسويق الرقمي',tools:'Facebook · Instagram · Google',months:2},
{cat:'sec',ico:'🗂️',fr:'Secrétariat de direction',ar:'أمانة المديرية',tools:'Courrier · Archivage · Accueil',months:3},
{cat:'sec',ico:'🩺',fr:'Secrétariat médical',ar:'الأمانة الطبية',tools:'Dossiers · Rendez-vous',months:3},
{cat:'sec',ico:'⌨️',fr:'Saisie et traitement de texte',ar:'الإدخال ومعالجة النصوص',tools:'Word · Frappe rapide',months:1},
{cat:'ges',ico:'🧾',fr:'Comptabilité informatisée',ar:'المحاسبة المعلوماتية',tools:'Excel · Logiciel comptable',months:3},
{cat:'ges',ico:'📦',fr:'Gestion de stock',ar:'تسيير المخزون',tools:'Inventaire · Excel',months:1},
{cat:'lan',ico:'🇫🇷',fr:'Français professionnel',ar:'الفرنسية المهنية',tools:'Oral · Écrit · CV',months:3},
{cat:'lan',ico:'🇬🇧',fr:'Anglais',ar:'الإنجليزية',tools:'Conversation · Business',months:3}];
const T={fr:{all:'Toutes',pick:'Choisir une formation',ok:'Merci ! Nous vous rappelons très vite.',err:'Envoi impossible. Appelez-nous au +213 541 89 68 56.',send:'Envoi…'},
ar:{all:'الكل',pick:'اختر تكوينًا',ok:'شكرًا لك! سنتصل بك قريبًا.',err:'تعذّر الإرسال. اتصل بنا على ‎+213 541 89 68 56',send:'جارٍ الإرسال…'}};
const dur=(m,l)=>l=='fr'?m+' mois':m==1?'شهر':m==2?'شهران':m+' أشهر';
let LANG=localStorage.getItem('lang')||'fr',CAT='all';
const sb=(window.CFG&&CFG.SUPABASE_URL&&window.supabase)?supabase.createClient(CFG.SUPABASE_URL,CFG.SUPABASE_ANON_KEY):null;
function render(){
  const l=LANG;
  $('#chips').innerHTML=['all',...Object.keys(CATS)].map(k=>`<button class="chip" type="button" data-k="${k}" aria-pressed="${k==CAT}">${k=='all'?T[l].all:CATS[k][l]}</button>`).join('');
  $('#grid').innerHTML=COURSES.filter(c=>CAT=='all'||c.cat==CAT).map(c=>`<article class="card" style="--c:${CATS[c.cat].c}"><div class="ic">${c.ico}</div><h4>${c[l]}</h4><small>${c.tools||''}</small><div class="m">${dur(c.months,l)}</div></article>`).join('');
  $('#course').innerHTML=`<option value="">${T[l].pick}</option>`+COURSES.map(c=>`<option value="${c.fr}">${c[l]}</option>`).join('');
}
function setLang(l){LANG=l;localStorage.setItem('lang',l);document.documentElement.lang=l;document.documentElement.dir=l=='ar'?'rtl':'ltr';render()}
$('#lang').onclick=()=>setLang(LANG=='fr'?'ar':'fr');
$('#chips').onclick=e=>{const k=e.target.dataset.k;if(k){CAT=k;render()}};
$('#form').onsubmit=async e=>{
  e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f)),m=$('#msg');d.lang=LANG;
  if(!sb){window.open('https://wa.me/213541896856?text='+encodeURIComponent(`${d.name} | ${d.phone} | ${d.course}`),'_blank');return}
  m.textContent=T[LANG].send;
  const {error}=await sb.from('registrations').insert(d);
  if(error){m.textContent=T[LANG].err}else{f.reset();m.textContent=T[LANG].ok}
};
setLang(LANG);
if(sb)sb.from('courses').select('*').order('sort').then(({data})=>{if(data&&data.length){COURSES=data;render()}});
