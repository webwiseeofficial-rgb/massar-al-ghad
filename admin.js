let ROWS=[],Q='',F='all',CF='',DEMO=false,VIEW='dash',SUBD=false;
const ST={new:{fr:'Nouveau',ar:'جديد'},called:{fr:'Contacté',ar:'تم الاتصال'},ok:{fr:'Confirmé',ar:'مؤكد'}};
const T={fr:{dash:'Tableau de bord',reg:'Inscriptions',crs:'Formations',hello:'Bonjour',hsub:'Voici l’activité des inscriptions de l’école.',total:'Inscriptions',neu:'Nouvelles',called:'Contactées',ok:'Confirmées',wk:'cette semaine',rate:'Taux',t14:'Inscriptions sur 14 jours',tst:'Répartition par statut',ttop:'Formations les plus demandées',trec:'Inscriptions récentes',all:'Tout voir',th:['Étudiant','Formation','Téléphone','E-mail','Message','Statut',''],empty:'Aucune inscription.',ph:'Rechercher un nom, un téléphone…',export:'Exporter CSV',allC:'Toutes les formations',tous:'Toutes',del:'Supprimer cette inscription ?',deleted:'Inscription supprimée.',noperm:'Suppression refusée : ajoutez la règle « delete » dans Supabase (voir supabase.sql).',unit:' inscrits',unit1:' inscrit',csub:'Les formations viennent de la table « courses » de Supabase (ou de common.js en mode démo).',see:'Voir les inscriptions',call:'Appeler',wa:'WhatsApp',rm:'Supprimer'},
ar:{dash:'لوحة التحكم',reg:'التسجيلات',crs:'التكوينات',hello:'مرحبًا',hsub:'هذه حركة تسجيلات المدرسة.',total:'التسجيلات',neu:'جديدة',called:'تم الاتصال',ok:'مؤكدة',wk:'هذا الأسبوع',rate:'النسبة',t14:'التسجيلات خلال 14 يومًا',tst:'التوزيع حسب الحالة',ttop:'التكوينات الأكثر طلبًا',trec:'آخر التسجيلات',all:'عرض الكل',th:['الطالب','التكوين','الهاتف','البريد','الرسالة','الحالة',''],empty:'لا توجد تسجيلات.',ph:'ابحث عن اسم أو هاتف…',export:'تصدير CSV',allC:'كل التكوينات',tous:'الكل',del:'حذف هذا التسجيل؟',deleted:'تم حذف التسجيل.',noperm:'تم رفض الحذف: أضف قاعدة «delete» في Supabase (انظر supabase.sql).',unit:' مسجّل',unit1:' مسجّل',csub:'التكوينات تأتي من جدول «courses» في Supabase (أو من common.js في الوضع التجريبي).',see:'عرض التسجيلات',call:'اتصال',wa:'واتساب',rm:'حذف'}};
const IC={dash:'<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
reg:'<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
crs:'<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
site:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
out:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',menu:'<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
refresh:'<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
dl:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
chat:'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',trash:'<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
check:'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>'};
const ic=n=>`<svg viewBox="0 0 24 24" aria-hidden="true">${IC[n]}</svg>`;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ini=n=>(String(n||'?').trim().split(/\s+/).slice(0,2).map(w=>w[0]).join('')||'?').toUpperCase();
const loc=()=>LANG=='ar'?'ar-DZ':'fr-FR';
const fmt=d=>new Date(d).toLocaleDateString(loc(),{day:'numeric',month:'short',year:'numeric'});
const tx=()=>T[LANG];
const course=n=>COURSES.find(c=>c.fr==n||c.ar==n);
const kc=n=>CATS[(course(n)||{cat:'info'}).cat];
const cname=n=>{const c=course(n);return c?c[LANG]:(n||'—')};
const phone=p=>{const d=String(p||'').replace(/\D/g,'');return d.startsWith('213')?d:d.replace(/^0/,'213')};
const cnt=s=>ROWS.filter(r=>r.status==s).length;
const inDays=(r,d)=>Date.now()-new Date(r.created_at)<d*864e5;
function toast(m,err){const t=$('#toast');t.textContent=m;t.className='a-toast'+(err?' err':'');t.hidden=false;clearTimeout(toast.h);toast.h=setTimeout(()=>t.hidden=true,3500)}
const demoRows=()=>[['Amine Bouzid','Développement web','0550 12 34 56','amine@mail.com','Je souhaite le planning du soir.','new',0],['Sara Haddad','Secrétariat de direction','0661 22 33 44','','','called',0],['يوسف بن علي','Anglais','0770 55 66 77','','أريد معرفة الأسعار','ok',1],['Nour Messaoudi','Bureautique','0555 98 76 54','nour@mail.com','','new',2],['Karim Ait','Comptabilité informatisée','0540 11 22 33','','','ok',3],['ليلى مرزوق','Infographie et design','0662 44 55 66','','','called',3],['Rania Cherif','Développement web','0771 88 99 00','','Début en janvier ?','ok',5],['Walid Saadi','Français professionnel','0558 31 42 53','','','new',6],['Hocine Mebarki','Bureautique','0551 20 30 40','','','ok',8],['Imane Belkacem','Anglais','0662 10 20 30','','','new',11]].map(([name,course,phone,email,message,status,d],i)=>({id:i+1,name,course,phone,email,message,status,created_at:new Date(Date.now()-d*864e5-i*36e5).toISOString()}));

/* ---------- rendu ---------- */
function render(){const t=tx();
 document.querySelectorAll('[data-ic]').forEach(e=>{if(!e.firstChild)e.innerHTML=ic(e.dataset.ic)});
 $('#title').textContent=t[VIEW];$('#q').placeholder=t.ph;
 $('#hello').textContent=t.hello;$('#hsub').textContent=t.hsub;
 const nn=cnt('new'),nb=$('#nbNew');nb.hidden=!nn;nb.textContent=nn;
 renderDash(t);renderReg(t);renderCrs(t)}
function rowsHTML(rows,t,full){
 if(!rows.length)return `<p class="a-empty">${t.empty}</p>`;
 const head=(full?[0,1,2,4,5,6]:[0,1,2,5,6]).map(i=>t.th[i]);
 return `<table><thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>`+rows.map(r=>{const k=kc(r.course),ph=phone(r.phone);
  return `<tr><td><div class="a-who"><span class="a-av">${esc(ini(r.name))}</span><div><b>${esc(r.name)}</b><small>${fmt(r.created_at)}</small></div></div></td>`+
  `<td><span class="a-tag" style="--t:${k.c}">${esc(cname(r.course))}</span></td><td dir="ltr">${esc(r.phone)}${full&&r.email?`<small>${esc(r.email)}</small>`:''}</td>`+
  (full?`<td><div class="a-msg" title="${esc(r.message)}">${esc(r.message)||'—'}</div></td>`:'')+
  `<td><select class="a-st" data-s="${esc(r.status)}" data-id="${esc(r.id)}">${Object.keys(ST).map(s=>`<option value="${s}"${s==r.status?' selected':''}>${ST[s][LANG]}</option>`).join('')}</select></td>`+
  `<td><div class="a-acts"><a class="a-act" href="tel:+${ph}" title="${t.call}" aria-label="${t.call}">${ic('phone')}</a><a class="a-act" href="https://wa.me/${ph}" target="_blank" rel="noopener" title="${t.wa}" aria-label="${t.wa}">${ic('chat')}</a><button class="a-act del" type="button" data-del="${esc(r.id)}" title="${t.rm}" aria-label="${t.rm}">${ic('trash')}</button></div></td></tr>`}).join('')+'</tbody></table>'}
function renderDash(t){
 const tot=ROWS.length,ok=cnt('ok'),pct=tot?Math.round(ok/tot*100):0,wk=ROWS.filter(r=>inDays(r,7)).length;
 $('#stats').innerHTML=[['users',t.total,tot,`+${wk} ${t.wk}`],['mail',t.neu,cnt('new'),''],['phone',t.called,cnt('called'),''],['check',t.ok,ok,`${t.rate} : ${pct}%`]].map(([i,l,v,s])=>`<div class="a-stat"><i>${ic(i)}</i><div><small>${l}</small><b>${v}</b><em>${s||'&nbsp;'}</em></div></div>`).join('');
 const days=[...Array(14)].map((_,i)=>{const d=new Date(Date.now()-(13-i)*864e5);return{d,n:ROWS.filter(r=>new Date(r.created_at).toDateString()==d.toDateString()).length}}),mx=Math.max(1,...days.map(a=>a.n));
 $('#t14').textContent=t.t14;
 $('#bars').innerHTML=days.map(a=>`<div class="a-col" title="${a.d.toLocaleDateString(loc(),{day:'numeric',month:'long'})} : ${a.n}"><b>${a.n||''}</b><i class="${a.n==mx&&a.n?'hi':''}" style="height:${Math.max(a.n/mx*100,2)}%"></i>${a.d.toLocaleDateString(loc(),{day:'numeric'})}</div>`).join('');
 $('#tst').textContent=t.tst;
 const a=tot?cnt('new')/tot*100:0,b=a+(tot?cnt('called')/tot*100:0);
 $('#donut').style.background=tot?`conic-gradient(var(--pink) 0 ${a}%,var(--amber) ${a}% ${b}%,var(--green) ${b}% 100%)`:'var(--tint)';
 $('#donut b').textContent=pct+'%';
 $('#leg').innerHTML=[['new','var(--pink)'],['called','var(--amber)'],['ok','var(--green)']].map(([s,c])=>`<li style="--c:${c}">${ST[s][LANG]}<span>${cnt(s)}</span></li>`).join('');
 $('#ttop').textContent=t.ttop;
 const u=n=>n+(n==1?t.unit1:t.unit),rank=rankCourses().slice(0,5),m2=Math.max(1,...rank.map(r=>r.n));
 $('#top').innerHTML=rank.map(({c,n})=>{const k=CATS[c.cat]||CATS.info;return `<div class="a-top-row" style="--c:${k.c}"><div>${esc(c[LANG])}<span>${u(n)}</span></div><div class="a-prog"><i style="width:${n/m2*100}%"></i></div></div>`}).join('');
 $('#trec').textContent=t.trec;$('#seeAll').textContent=t.all;
 $('#tbl-recent').innerHTML=rowsHTML(ROWS.slice(0,8),t,false)}
function rankCourses(){const c={};ROWS.forEach(r=>{const k=course(r.course);const key=k?k.fr:r.course;c[key]=(c[key]||0)+1});return COURSES.map(co=>({c:co,n:c[co.fr]||0})).sort((a,b)=>b.n-a.n)}
function filtered(){const q=Q.trim().toLowerCase();return ROWS.filter(r=>(F=='all'||r.status==F)&&(!CF||(course(r.course)||{fr:r.course}).fr==CF)&&(!q||[r.name,r.phone,r.email,r.course,r.message].join(' ').toLowerCase().includes(q)))}
function renderReg(t){
 $('#chips').innerHTML=[['all',t.tous,ROWS.length],...Object.keys(ST).map(s=>[s,ST[s][LANG],cnt(s)])].map(([s,l,n])=>`<button type="button" class="a-chip${F==s?' on':''}" data-f="${s}">${l}<b>${n}</b></button>`).join('');
 $('#cf').innerHTML=`<option value="">${t.allC}</option>`+COURSES.map(c=>`<option value="${esc(c.fr)}"${CF==c.fr?' selected':''}>${esc(c[LANG])}</option>`).join('');
 $('#csvT').textContent=t.export;
 $('#tbl-all').innerHTML=rowsHTML(filtered(),t,true)}
function renderCrs(t){
 $('#csub').textContent=t.csub;
 const n={};ROWS.forEach(r=>{const k=course(r.course);const key=k?k.fr:r.course;n[key]=(n[key]||0)+1});
 $('#courses').innerHTML=COURSES.map(c=>{const k=CATS[c.cat]||CATS.info;return `<article class="a-course"><div class="cv" style="${c.img?`background-image:url('${esc(c.img)}')`:`background:linear-gradient(135deg,${k.c},${k.c2})`}"></div><div class="cb"><span class="a-tag" style="--t:${k.c};justify-self:start">${k[LANG]}</span><h4>${esc(c[LANG])}</h4><p>${esc(c.tools||'')}</p><div class="cf"><b>${(n[c.fr]||0)+((n[c.fr]||0)==1?t.unit1:t.unit)}</b><span>${dur(c.months,LANG)}</span></div><button type="button" data-course="${esc(c.fr)}">${t.see}</button></div></article>`}).join('')}

/* ---------- navigation ---------- */
function show(v){if(!['dash','reg','crs'].includes(v))v='dash';VIEW=v;
 ['dash','reg','crs'].forEach(x=>$('#v-'+x).hidden=x!=v);
 document.querySelectorAll('.a-side nav a[data-v]').forEach(a=>a.classList.toggle('on',a.dataset.v==v));
 document.body.classList.remove('menu');$('.a-main').scrollTop=0;$('#title').textContent=tx()[v]}
window.addEventListener('hashchange',()=>show(location.hash.slice(1)));
$('#burger').onclick=()=>document.body.classList.toggle('menu');$('#scrim').onclick=()=>document.body.classList.remove('menu');

/* ---------- actions ---------- */
$('#q').oninput=e=>{Q=e.target.value;if(VIEW!='reg'){location.hash='#reg'}renderReg(tx())};
$('#chips').onclick=e=>{const b=e.target.closest('[data-f]');if(b){F=b.dataset.f;renderReg(tx())}};
$('#cf').onchange=e=>{CF=e.target.value;renderReg(tx())};
$('#courses').onclick=e=>{const b=e.target.closest('[data-course]');if(b){CF=b.dataset.course;F='all';location.hash='#reg';renderReg(tx())}};
async function setStatus(id,s){const r=ROWS.find(r=>r.id==id);if(!r)return;const old=r.status;r.status=s;render();
 if(sb&&!DEMO){const {data,error}=await sb.from('registrations').update({status:s}).eq('id',id).select();if(error||!data||!data.length){r.status=old;render();toast(error?error.message:'Update refused (RLS).',true)}}}
async function del(id){if(!confirm(tx().del))return;
 if(sb&&!DEMO){const {data,error}=await sb.from('registrations').delete().eq('id',id).select();if(error)return toast(error.message,true);if(!data||!data.length)return toast(tx().noperm,true)}
 ROWS=ROWS.filter(r=>r.id!=id);render();toast(tx().deleted)}
function tblEvents(e){const s=e.target.closest('select[data-id]');if(s&&e.type=='change')return setStatus(s.dataset.id,s.value);
 const d=e.target.closest('[data-del]');if(d&&e.type=='click')del(d.dataset.del)}
['#tbl-recent','#tbl-all'].forEach(id=>{$(id).addEventListener('change',tblEvents);$(id).addEventListener('click',tblEvents)});
$('#csv').onclick=()=>{const q=v=>`"${String(v??'').replace(/"/g,'""')}"`,rows=filtered();
 const csv='\ufeff'+['Date','Nom','Téléphone','E-mail','Formation','Statut','Message'].map(q).join(',')+'\n'+rows.map(r=>[new Date(r.created_at).toISOString().slice(0,10),r.name,r.phone,r.email,r.course,ST[r.status]?ST[r.status].fr:r.status,r.message].map(q).join(',')).join('\n');
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));a.download='inscriptions-'+new Date().toISOString().slice(0,10)+'.csv';a.click();URL.revokeObjectURL(a.href)};
$('#refresh').onclick=async()=>{await load();render()};
$('#lang0').onclick=()=>setLang(LANG=='fr'?'ar':'fr');

/* ---------- Supabase ---------- */
async function load(){if(DEMO){ROWS=demoRows();return}
 const {data,error}=await sb.from('registrations').select('*').order('created_at',{ascending:false});
 if(error)return toast(error.message,true);ROWS=data||[]}
async function enter(session){$('#login').hidden=true;$('#app').hidden=false;
 const mail=session&&session.user&&session.user.email||'Admin';$('#meName').textContent=mail.split('@')[0];$('#meAv').textContent=ini(mail.split('@')[0]);
 if(DEMO)$('#demo').hidden=false;
 else{const c=await sb.from('courses').select('*').order('sort');if(c.data&&c.data.length)COURSES=c.data;
  if(!SUBD){SUBD=true;try{sb.channel('regs').on('postgres_changes',{event:'*',schema:'public',table:'registrations'},async()=>{await load();render()}).subscribe()}catch(e){}}}
 await load();show(location.hash.slice(1));render()}
$('#loginForm').onsubmit=async e=>{e.preventDefault();$('#lmsg').textContent='';const {data,error}=await sb.auth.signInWithPassword(Object.fromEntries(new FormData(e.target)));
 if(error)$('#lmsg').textContent=error.message;else enter(data.session)};
$('#out').onclick=async e=>{e.preventDefault();if(sb)await sb.auth.signOut();location.href='index.html'};
setLang(LANG);
if(!sb){DEMO=true;enter(null)}
else{sb.auth.getSession().then(({data})=>data.session?enter(data.session):$('#login').hidden=false);
 sb.auth.onAuthStateChange((ev)=>{if(ev=='SIGNED_OUT'){$('#app').hidden=true;$('#login').hidden=false}})}
