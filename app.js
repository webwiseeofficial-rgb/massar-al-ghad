let READY=!sb;
const QS=new URLSearchParams(location.search);
let CAT=QS.get('cat')||'all';if(CAT!='all'&&!CATS[CAT])CAT='all';
const CIMG={info:'img/web.jpg',sec:'img/secretariat.jpg',ges:'img/comptabilite.jpg',lan:'img/anglais.jpg'};
const T={fr:{all:'Toutes',pick:'Choisir une formation',ok:'Merci ! Nous vous rappelons très vite.',err:'Envoi impossible. Appelez-nous au +213 541 89 68 56.',send:'Envoi…',n:n=>n+(n>1?' formations':' formation')},
ar:{all:'الكل',pick:'اختر تكوينًا',ok:'شكرًا لك! سنتصل بك قريبًا.',err:'تعذّر الإرسال. اتصل بنا على ‎+213 541 89 68 56',send:'جارٍ الإرسال…',n:n=>n+(n>2&&n<11?' تكوينات':' تكوينًا')}};
const card=(c,l)=>{const k=CATS[c.cat];return `<article class="course" data-href="${courseUrl(c)}"><div class="art" style="background:linear-gradient(135deg,${k.c},${k.c2})">${artIn(c)}</div><span class="tag" style="--t:${k.c}">${k[l]}</span><h4>${c[l]}</h4><small>${c.tools||''}</small><div class="foot"><b>${dur(c.months,l)}</b><a class="go" href="${courseUrl(c)}" aria-label="${c[l]}">→</a></div></article>`};
function render(){const l=LANG;
 renderCourse(l);
 if($('#chips'))$('#chips').innerHTML=['all',...Object.keys(CATS)].map(k=>`<button class="chip" type="button" data-k="${k}" aria-pressed="${k==CAT}">${k=='all'?T[l].all:CATS[k][l]}</button>`).join('');
 if($('#grid'))$('#grid').innerHTML=COURSES.filter(c=>CAT=='all'||c.cat==CAT).map(c=>card(c,l)).join('');
 if($('#featured'))$('#featured').innerHTML=Object.keys(CATS).map(k=>COURSES.find(c=>c.cat==k)).filter(Boolean).map(c=>card(c,l)).join('');
 if($('#cats'))$('#cats').innerHTML=Object.keys(CATS).map(k=>{const n=COURSES.filter(c=>c.cat==k).length;return `<a class="cat" href="formations.html?cat=${k}" style="--t:${CATS[k].c}"><img src="${CIMG[k]}" alt=""><span><b>${CATS[k][l]}</b><small>${T[l].n(n)}</small></span></a>`}).join('');
const SI={'info': '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12"/>', 'sec': '<path d="M3 7h6l2 2h10v10H3z"/>', 'ges': '<path d="M5 20V10M12 20V4M19 20v-7"/>', 'lan': '<path d="M4 5h16v11H9l-5 4z"/>'},SD={info:{fr:'Des compétences numériques utiles dès le premier jour.',ar:'مهارات رقمية مفيدة منذ اليوم الأول.'},sec:{fr:'Accueil, courrier, dossiers : le métier au quotidien.',ar:'الاستقبال والمراسلات والملفات: المهنة في الميدان.'},ges:{fr:'Comptabilité et stock, avec les bons outils.',ar:'المحاسبة والمخزون بالأدوات المناسبة.'},lan:{fr:'Français et anglais pour le travail.',ar:'الفرنسية والإنجليزية للعمل.'}};
 if($('#svc'))$('#svc').innerHTML=Object.keys(CATS).map(k=>{const L=COURSES.filter(c=>c.cat==k).slice(0,5);return `<article class="sv" style="--c:${CATS[k].c}"><div class="sv-h"><i><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${SI[k]}</svg></i><b>${CATS[k][l]}</b></div><p>${SD[k][l]}</p><ul>${L.map(c=>`<li>${c[l]}</li>`).join('')}</ul><a class="sv-img" href="formations.html?cat=${k}"><img src="${CIMG[k]}" alt="" loading="lazy"></a></article>`}).join('');
 if($('#course')){const cur=$('#course').value||QS.get('course')||'';$('#course').innerHTML=`<option value="">${T[l].pick}</option>`+COURSES.map(c=>`<option value="${c.fr}">${c[l]}</option>`).join('');$('#course').value=cur}}
/* ---------- page d'une formation ---------- */
const escH=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const TC={fr:{about:'À propos de cette formation',tools:'Outils et contenu',dur:'Durée',dom:'Domaine',lieu:'Lieu',more:'Autres formations',nodesc:'Contactez-nous pour en savoir plus sur cette formation : programme, horaires et tarifs.',nf:'Formation introuvable',nfp:'Cette formation n’existe pas ou n’est plus proposée.',nfb:'Voir toutes les formations',reserve:'Formation :'},
ar:{about:'عن هذا التكوين',tools:'الأدوات والمحتوى',dur:'المدة',dom:'المجال',lieu:'المكان',more:'تكوينات أخرى',nodesc:'تواصل معنا لمعرفة المزيد عن هذا التكوين: البرنامج والتوقيت والأسعار.',nf:'التكوين غير موجود',nfp:'هذا التكوين غير موجود أو لم يعد متاحًا.',nfb:'عرض كل التكوينات',reserve:'التكوين:'}};
const SAFEURL=u=>/^(https?:\/\/[^\s"'<>]+|[\w\-.\/%]+)$/.test(u);
function embed(u){u=(u||'').trim();if(!u||!SAFEURL(u))return '';let m;
 const fr=(src,extra)=>`<iframe src="${src}" title="video" loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture; fullscreen" allowfullscreen${extra||''}></iframe>`;
 if(m=u.match(/(?:youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/))return fr(`https://www.youtube-nocookie.com/embed/${m[1]}?rel=0`);
 if(m=u.match(/vimeo\.com\/(?:video\/)?(\d+)/))return fr(`https://player.vimeo.com/video/${m[1]}`);
 if(/(facebook\.com|fb\.watch)\//.test(u))return fr(`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(u)}&show_text=false`);
 if(/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(u)||u.includes('/storage/v1/object/public/'))return `<video controls playsinline preload="metadata" src="${escH(u)}"></video>`;
 return ''}
function renderCourse(l){const box=$('#cpage');if(!box)return;
 const q=QS.get('c')||'',c=COURSES.find(x=>String(x.id)==q)||COURSES.find(x=>slug(x.fr)==q),t=TC[l];
 if(!c){if(!READY)return;document.title=t.nf+' | Massar Al Ghad';$('#cbody').hidden=true;$('#chero').innerHTML=`<h1>${t.nf}</h1><p>${t.nfp}</p><a class="btn" href="formations.html">${t.nfb}</a>`;return}
 $('#cbody').hidden=false;
 const k=CATS[c.cat]||CATS.info,name=c[l]||c.fr,tools=String(c.tools||'').split(/\s*[·,،]\s*/).filter(Boolean);
 document.title=name+' | Massar Al Ghad';
 $('#chero').innerHTML=`<span class="tag" style="--t:${k.c}">${k[l]}</span><h1>${escH(name)}</h1><p>${dur(c.months,l)}${tools.length?' · '+escH(tools.join(' · ')):''}</p>`;
 const v=embed(c.video);
 $('#cvideo').innerHTML=v?`<div class="cp-media">${v}</div>`:`<div class="cp-media cp-cover" style="background:linear-gradient(135deg,${k.c},${k.c2})">${artIn(c)}</div>`;
 const d=(l=='ar'?c.desc_ar:c.desc_fr)||t.nodesc;
 $('#cdesc').innerHTML=`<h2>${t.about}</h2><p class="cp-desc">${escH(d)}</p><div class="cp-facts"><div><small>${t.dur}</small><b>${dur(c.months,l)}</b></div><div><small>${t.dom}</small><b>${k[l]}</b></div><div><small>${t.lieu}</small><b>${l=='ar'?'حسين داي، الجزائر':'Hussein Dey, Alger'}</b></div></div>`+(tools.length?`<h3>${t.tools}</h3><div class="cp-tools">${tools.map(x=>`<span>${escH(x)}</span>`).join('')}</div>`:'');
 $('#ccourse').value=c.fr;$('#cformname').textContent=t.reserve+' '+name;
 $('#cmoreT').textContent=t.more;
 $('#cgridmore').innerHTML=COURSES.filter(x=>x!==c).sort((a,b)=>(b.cat==c.cat)-(a.cat==c.cat)).slice(0,3).map(x=>card(x,l)).join('')}
document.addEventListener('click',e=>{const a=e.target.closest('.course[data-href]');if(a&&!e.target.closest('a'))location.href=a.dataset.href});
if($('#chips'))$('#chips').onclick=e=>{const k=e.target.dataset.k;if(k){CAT=k;render()}};
if($('#form'))$('#form').onsubmit=async e=>{e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f)),m=$('#msg');d.lang=LANG;d.course=d.course||'Contact';if(!d.birthdate)delete d.birthdate;
 if(!sb){open('https://wa.me/213541896856?text='+encodeURIComponent(`${d.name} | ${d.phone} | ${d.course}${d.birthdate?' | '+d.birthdate:''}${d.message?' | '+d.message:''}`),'_blank');return}
 m.textContent=T[LANG].send;const {error}=await sb.from('registrations').insert(d);
 if(error){m.textContent=T[LANG].err}else{f.reset();m.textContent=T[LANG].ok}};
setLang(LANG);
const LOCAL=[...COURSES];
if(sb)sb.from('courses').select('*').order('sort').then(({data})=>{if(data&&data.length){COURSES=data.filter(r=>!r.hidden).map(r=>{const L=LOCAL.find(x=>x.fr==r.fr)||{};return{...r,img:r.img||L.img,desc_fr:r.desc_fr||L.desc_fr,desc_ar:r.desc_ar||L.desc_ar}})}READY=true;render()},()=>{READY=true;render()});

if($('[name=birthdate]'))$('[name=birthdate]').max=new Date().toISOString().slice(0,10);
