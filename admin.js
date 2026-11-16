let ROWS=[],Q='',DEMO=false;
const ST={new:{fr:'Nouveau',ar:'جديد'},called:{fr:'Contacté',ar:'تم الاتصال'},ok:{fr:'Confirmé',ar:'مؤكد'}};
const X={fr:{pend:'En attente',conf:'Confirmées',all:'Inscriptions',n:' inscrits',hi:'Bonjour 👋',wk:'Inscriptions sur 7 jours',th:['Étudiant','Formation','Téléphone','Statut',''],see:'Voir',empty:'Aucune inscription.'},
ar:{pend:'في الانتظار',conf:'مؤكدة',all:'التسجيلات',n:' مسجّل',hi:'مرحبًا 👋',wk:'التسجيلات خلال 7 أيام',th:['الطالب','التكوين','الهاتف','الحالة',''],see:'عرض',empty:'لا توجد تسجيلات.'}};
const ini=n=>n.trim().split(/\s+/).slice(0,2).map(w=>w[0]).join('').toUpperCase();
const loc=()=>LANG=='ar'?'ar-DZ':'fr-FR';
const fmt=d=>new Date(d).toLocaleDateString(loc(),{day:'numeric',month:'short'});
const ico=n=>(COURSES.find(c=>c.fr==n)||{ico:'🎓'}).ico;
const demoRows=()=>[['Amine Bouzid','Développement web','0550 12 34 56','new',0],['Sara Haddad','Secrétariat de direction','0661 22 33 44','called',0],['يوسف بن علي','Anglais','0770 55 66 77','ok',1],['Nour Messaoudi','Bureautique','0555 98 76 54','new',2],['Karim Ait','Comptabilité informatisée','0540 11 22 33','ok',3],['ليلى مرزوق','Infographie et design','0662 44 55 66','called',3],['Rania Cherif','Développement web','0771 88 99 00','ok',5],['Walid Saadi','Français professionnel','0558 31 42 53','new',6]].map(([name,course,phone,status,d],i)=>({id:i,name,course,phone,status,created_at:new Date(Date.now()-d*864e5).toISOString()}));
function render(){const l=LANG,x=X[l],n=s=>ROWS.filter(r=>r.status==s).length,tot=ROWS.length,pct=tot?Math.round(n('ok')/tot*100):0;
 $('#q').placeholder='🔍 '+(l=='fr'?'Rechercher un nom, un téléphone…':'ابحث عن اسم أو هاتف…');
 $('#stats').innerHTML=[['📩',x.pend,n('new')],['✅',x.conf,n('ok')],['👥',x.all,tot]].map(([i,t,v])=>`<div class="pcard"><i>${i}</i><div><b>${v}</b><small>${t}</small></div></div>`).join('');
 $('#ring').style.setProperty('--p',pct);$('#ring b').textContent=pct+'%';$('#hello').textContent=x.hi+' '+x.conf+' · '+pct+'%';
 const days=[...Array(7)].map((_,i)=>{const d=new Date(Date.now()-(6-i)*864e5);return{d,n:ROWS.filter(r=>new Date(r.created_at).toDateString()==d.toDateString()).length}}),mx=Math.max(1,...days.map(a=>a.n));
 $('#wk').textContent=x.wk;
 $('#bars').innerHTML=days.map(a=>`<div class="col"><i class="${a.n==mx&&a.n?'hi':''}" style="height:${a.n/mx*100}%"></i>${a.d.toLocaleDateString(loc(),{weekday:'short'})}</div>`).join('');
 const cnt={};ROWS.forEach(r=>cnt[r.course]=(cnt[r.course]||0)+1);
 const rank=COURSES.map(c=>({c,n:cnt[c.fr]||0})).sort((a,b)=>b.n-a.n);
 $('#popg').innerHTML=rank.slice(0,3).map(({c,n})=>{const k=CATS[c.cat];return `<article class="course"><div class="art" style="background:linear-gradient(135deg,${k.c},${k.c2})">${c.ico}</div><span class="tag" style="--t:${k.c}">${k[l]}</span><h4>${c[l]}</h4><div class="foot"><b>${n}${x.n}</b><span>${dur(c.months,l)}</span></div></article>`}).join('');
 $('#top3').innerHTML=rank.slice(0,3).map(({c,n})=>`<div class="row"><span class="av">${c.ico}</span><div><b>${c[l]}</b><small>${n}${x.n}</small></div><button type="button" data-q="${c.fr}">${x.see}</button></div>`).join('');
 const q=Q.toLowerCase(),rows=ROWS.filter(r=>(r.name+r.phone+r.course).toLowerCase().includes(q));
 $('#tbl').innerHTML=rows.length?`<table><tr>${x.th.map(h=>`<th>${h}</th>`).join('')}</tr>`+rows.map(r=>{const k=CATS[(COURSES.find(c=>c.fr==r.course)||{cat:'info'}).cat],ph=(r.phone||'').replace(/\D/g,'').replace(/^0/,'213');
  return `<tr><td><div class="who"><span class="av">${ini(r.name)}</span><div><b>${r.name}</b><small>${fmt(r.created_at)}</small></div></div></td><td><span class="tag" style="--t:${k.c}">${ico(r.course)} ${r.course||'—'}</span></td><td dir="ltr">${r.phone}</td><td><select class="st" data-s="${r.status}" data-id="${r.id}">${Object.keys(ST).map(s=>`<option value="${s}"${s==r.status?' selected':''}>${ST[s][l]}</option>`).join('')}</select></td><td><a class="act" href="tel:+${ph}" aria-label="Call">📞</a><a class="act" href="https://wa.me/${ph}" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a></td></tr>`}).join('')+'</table>':`<p>${x.empty}</p>`;}
$('#q').oninput=e=>{Q=e.target.value;render()};
$('#top3').onclick=e=>{const q=e.target.dataset.q;if(q){Q=q;$('#q').value=q;render();location.hash='#reg'}};
$('#tbl').onchange=async e=>{const s=e.target;if(!s.dataset.id)return;const r=ROWS.find(r=>r.id==s.dataset.id);r.status=s.value;if(sb&&!DEMO)await sb.from('registrations').update({status:s.value}).eq('id',r.id);render()};
async function enter(){$('#login').hidden=true;$('#app').hidden=false;
 if(DEMO){ROWS=demoRows();$('#demo').hidden=false}else{const {data}=await sb.from('registrations').select('*').order('created_at',{ascending:false});ROWS=data||[];const c=await sb.from('courses').select('*').order('sort');if(c.data&&c.data.length)COURSES=c.data}
 render()}
$('#login').onsubmit=async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));const {error}=await sb.auth.signInWithPassword(d);if(error)$('#lmsg').textContent=error.message;else enter()};
$('#out').onclick=async e=>{e.preventDefault();if(sb)await sb.auth.signOut();location.href='index.html'};
setLang(LANG);
if(!sb){DEMO=true;enter()}else sb.auth.getSession().then(({data})=>data.session?enter():$('#login').hidden=false);
