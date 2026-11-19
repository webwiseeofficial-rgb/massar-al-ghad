const QS=new URLSearchParams(location.search);
let CAT=QS.get('cat')||'all';if(CAT!='all'&&!CATS[CAT])CAT='all';
const CIMG={info:'img/web.jpg',sec:'img/secretariat.jpg',ges:'img/comptabilite.jpg',lan:'img/anglais.jpg'};
const T={fr:{all:'Toutes',pick:'Choisir une formation',ok:'Merci ! Nous vous rappelons très vite.',err:'Envoi impossible. Appelez-nous au +213 541 89 68 56.',send:'Envoi…',n:n=>n+(n>1?' formations':' formation')},
ar:{all:'الكل',pick:'اختر تكوينًا',ok:'شكرًا لك! سنتصل بك قريبًا.',err:'تعذّر الإرسال. اتصل بنا على ‎+213 541 89 68 56',send:'جارٍ الإرسال…',n:n=>n+(n>2&&n<11?' تكوينات':' تكوينًا')}};
const card=(c,l)=>{const k=CATS[c.cat];return `<article class="course"><div class="art" style="background:linear-gradient(135deg,${k.c},${k.c2})">${artIn(c)}</div><span class="tag" style="--t:${k.c}">${k[l]}</span><h4>${c[l]}</h4><small>${c.tools||''}</small><div class="foot"><b>${dur(c.months,l)}</b><a class="go" href="inscription.html?course=${encodeURIComponent(c.fr)}" aria-label="${c[l]}">→</a></div></article>`};
function render(){const l=LANG;
 if($('#chips'))$('#chips').innerHTML=['all',...Object.keys(CATS)].map(k=>`<button class="chip" type="button" data-k="${k}" aria-pressed="${k==CAT}">${k=='all'?T[l].all:CATS[k][l]}</button>`).join('');
 if($('#grid'))$('#grid').innerHTML=COURSES.filter(c=>CAT=='all'||c.cat==CAT).map(c=>card(c,l)).join('');
 if($('#featured'))$('#featured').innerHTML=Object.keys(CATS).map(k=>COURSES.find(c=>c.cat==k)).filter(Boolean).map(c=>card(c,l)).join('');
 if($('#cats'))$('#cats').innerHTML=Object.keys(CATS).map(k=>{const n=COURSES.filter(c=>c.cat==k).length;return `<a class="cat" href="formations.html?cat=${k}" style="--t:${CATS[k].c}"><img src="${CIMG[k]}" alt=""><span><b>${CATS[k][l]}</b><small>${T[l].n(n)}</small></span></a>`}).join('');
const SI={'info': '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12"/>', 'sec': '<path d="M3 7h6l2 2h10v10H3z"/>', 'ges': '<path d="M5 20V10M12 20V4M19 20v-7"/>', 'lan': '<path d="M4 5h16v11H9l-5 4z"/>'},SD={info:{fr:'Des compétences numériques utiles dès le premier jour.',ar:'مهارات رقمية مفيدة منذ اليوم الأول.'},sec:{fr:'Accueil, courrier, dossiers : le métier au quotidien.',ar:'الاستقبال والمراسلات والملفات: المهنة في الميدان.'},ges:{fr:'Comptabilité et stock, avec les bons outils.',ar:'المحاسبة والمخزون بالأدوات المناسبة.'},lan:{fr:'Français et anglais pour le travail.',ar:'الفرنسية والإنجليزية للعمل.'}};
 if($('#svc'))$('#svc').innerHTML=Object.keys(CATS).map(k=>{const L=COURSES.filter(c=>c.cat==k).slice(0,5);return `<article class="sv" style="--c:${CATS[k].c}"><div class="sv-h"><i><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${SI[k]}</svg></i><b>${CATS[k][l]}</b></div><p>${SD[k][l]}</p><ul>${L.map(c=>`<li>${c[l]}</li>`).join('')}</ul><a class="sv-img" href="formations.html?cat=${k}"><img src="${CIMG[k]}" alt="" loading="lazy"></a></article>`}).join('');
 if($('#course')){const cur=$('#course').value||QS.get('course')||'';$('#course').innerHTML=`<option value="">${T[l].pick}</option>`+COURSES.map(c=>`<option value="${c.fr}">${c[l]}</option>`).join('');$('#course').value=cur}}
if($('#chips'))$('#chips').onclick=e=>{const k=e.target.dataset.k;if(k){CAT=k;render()}};
if($('#form'))$('#form').onsubmit=async e=>{e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f)),m=$('#msg');d.lang=LANG;d.course=d.course||'Contact';if(!d.birthdate)delete d.birthdate;
 if(!sb){open('https://wa.me/213541896856?text='+encodeURIComponent(`${d.name} | ${d.phone} | ${d.course}${d.birthdate?' | '+d.birthdate:''}${d.message?' | '+d.message:''}`),'_blank');return}
 m.textContent=T[LANG].send;const {error}=await sb.from('registrations').insert(d);
 if(error){m.textContent=T[LANG].err}else{f.reset();m.textContent=T[LANG].ok}};
setLang(LANG);
const LOCAL=[...COURSES];
if(sb)sb.from('courses').select('*').order('sort').then(({data})=>{if(data&&data.length){COURSES=data.filter(r=>!r.hidden).map(r=>({...r,img:r.img||(LOCAL.find(x=>x.fr==r.fr)||{}).img}));render()}});

if($('[name=birthdate]'))$('[name=birthdate]').max=new Date().toISOString().slice(0,10);
