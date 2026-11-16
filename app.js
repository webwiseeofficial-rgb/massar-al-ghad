const QS=new URLSearchParams(location.search);
let CAT=QS.get('cat')||'all';if(CAT!='all'&&!CATS[CAT])CAT='all';
const CICO={info:'💻',sec:'🗂️',ges:'🧾',lan:'🗣️'};
const T={fr:{all:'Toutes',pick:'Choisir une formation',ok:'Merci ! Nous vous rappelons très vite.',err:'Envoi impossible. Appelez-nous au +213 541 89 68 56.',send:'Envoi…',n:n=>n+(n>1?' formations':' formation')},
ar:{all:'الكل',pick:'اختر تكوينًا',ok:'شكرًا لك! سنتصل بك قريبًا.',err:'تعذّر الإرسال. اتصل بنا على ‎+213 541 89 68 56',send:'جارٍ الإرسال…',n:n=>n+(n>2&&n<11?' تكوينات':' تكوينًا')}};
const card=(c,l)=>{const k=CATS[c.cat];return `<article class="course"><div class="art" style="background:linear-gradient(135deg,${k.c},${k.c2})">${c.ico}</div><span class="tag" style="--t:${k.c}">${k[l]}</span><h4>${c[l]}</h4><small>${c.tools||''}</small><div class="foot"><b>${dur(c.months,l)}</b><a class="go" href="inscription.html?course=${encodeURIComponent(c.fr)}" aria-label="${c[l]}">→</a></div></article>`};
function render(){const l=LANG;
 if($('#chips'))$('#chips').innerHTML=['all',...Object.keys(CATS)].map(k=>`<button class="chip" type="button" data-k="${k}" aria-pressed="${k==CAT}">${k=='all'?T[l].all:CATS[k][l]}</button>`).join('');
 if($('#grid'))$('#grid').innerHTML=COURSES.filter(c=>CAT=='all'||c.cat==CAT).map(c=>card(c,l)).join('');
 if($('#featured'))$('#featured').innerHTML=Object.keys(CATS).map(k=>COURSES.find(c=>c.cat==k)).filter(Boolean).map(c=>card(c,l)).join('');
 if($('#cats'))$('#cats').innerHTML=Object.keys(CATS).map(k=>{const n=COURSES.filter(c=>c.cat==k).length;return `<a class="cat" href="formations.html?cat=${k}" style="--t:${CATS[k].c}"><i>${CICO[k]}</i><b>${CATS[k][l]}</b><small>${T[l].n(n)}</small></a>`}).join('');
 if($('#course')){const cur=$('#course').value||QS.get('course')||'';$('#course').innerHTML=`<option value="">${T[l].pick}</option>`+COURSES.map(c=>`<option value="${c.fr}">${c[l]}</option>`).join('');$('#course').value=cur}}
if($('#chips'))$('#chips').onclick=e=>{const k=e.target.dataset.k;if(k){CAT=k;render()}};
if($('#form'))$('#form').onsubmit=async e=>{e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f)),m=$('#msg');d.lang=LANG;d.course=d.course||'Contact';
 if(!sb){open('https://wa.me/213541896856?text='+encodeURIComponent(`${d.name} | ${d.phone} | ${d.course}${d.message?' | '+d.message:''}`),'_blank');return}
 m.textContent=T[LANG].send;const {error}=await sb.from('registrations').insert(d);
 if(error){m.textContent=T[LANG].err}else{f.reset();m.textContent=T[LANG].ok}};
setLang(LANG);
if(sb)sb.from('courses').select('*').order('sort').then(({data})=>{if(data&&data.length){COURSES=data;render()}});
