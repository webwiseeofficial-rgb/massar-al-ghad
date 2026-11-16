let CAT='all';
const T={fr:{all:'Toutes',pick:'Choisir une formation',ok:'Merci ! Nous vous rappelons très vite.',err:'Envoi impossible. Appelez-nous au +213 541 89 68 56.',send:'Envoi…'},
ar:{all:'الكل',pick:'اختر تكوينًا',ok:'شكرًا لك! سنتصل بك قريبًا.',err:'تعذّر الإرسال. اتصل بنا على ‎+213 541 89 68 56',send:'جارٍ الإرسال…'}};
function render(){const l=LANG;
 $('#chips').innerHTML=['all',...Object.keys(CATS)].map(k=>`<button class="chip" type="button" data-k="${k}" aria-pressed="${k==CAT}">${k=='all'?T[l].all:CATS[k][l]}</button>`).join('');
 $('#grid').innerHTML=COURSES.filter(c=>CAT=='all'||c.cat==CAT).map(c=>{const k=CATS[c.cat];return `<article class="course"><div class="art" style="background:linear-gradient(135deg,${k.c},${k.c2})">${c.ico}<i class="spark"></i></div><span class="tag" style="--t:${k.c}">${k[l]}</span><h4>${c[l]}</h4><small>${c.tools||''}</small><div class="foot"><b>${dur(c.months,l)}</b><button class="go" type="button" data-c="${c.fr}" aria-label="${c[l]}">→</button></div></article>`}).join('');
 $('#course').innerHTML=`<option value="">${T[l].pick}</option>`+COURSES.map(c=>`<option value="${c.fr}">${c[l]}</option>`).join('');}
$('#chips').onclick=e=>{const k=e.target.dataset.k;if(k){CAT=k;render()}};
$('#grid').onclick=e=>{const c=e.target.dataset.c;if(c){$('#course').value=c;location.hash='#inscription'}};
$('#form').onsubmit=async e=>{e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f)),m=$('#msg');d.lang=LANG;
 if(!sb){open('https://wa.me/213541896856?text='+encodeURIComponent(`${d.name} | ${d.phone} | ${d.course}`),'_blank');return}
 m.textContent=T[LANG].send;const {error}=await sb.from('registrations').insert(d);
 if(error){m.textContent=T[LANG].err}else{f.reset();m.textContent=T[LANG].ok}};
setLang(LANG);
if(sb)sb.from('courses').select('*').order('sort').then(({data})=>{if(data&&data.length){COURSES=data;render()}});
