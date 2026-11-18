// Shared header + footer for all public pages. Edit the menu here once.
(function(){
const P=(location.pathname.split('/').pop()||'index').replace('.html','')||'index';
const N=[['index','Accueil','الرئيسية'],['apropos','À propos','من نحن'],['formations','Formations','التكوينات'],['acces','Accès','كيف تصلنا'],['inscription','Inscription','التسجيل'],['contact','Contact','اتصل بنا']];
const links=cls=>N.filter(n=>!(cls&&n[0]=='inscription')).map(([k,f,a])=>`<a href="${k}.html"${P==k&&cls?' aria-current="page"':''}><span class="fr">${f}</span><span class="ar">${a}</span></a>`).join('');
document.getElementById('site-header').innerHTML=`<div>
  <a class="brand" href="index.html"><img class="logo-img" src="logo-mark.png" alt=""><span class="bname"><b>Massar Al Ghad</b><small>مسار الغد</small></span></a>
  <button class="burger" id="burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="hmenu"><span class="blines"><i></i><i></i><i></i></span></button>
  <div id="hmenu"><nav aria-label="Menu">${links(1)}</nav>
  <a class="btn cta" href="inscription.html"><span class="fr">Inscription</span><span class="ar">التسجيل</span></a>
  <div class="seg" role="group" aria-label="Langue / اللغة"><button type="button" data-lang="fr">FR</button><button type="button" data-lang="ar">عربية</button></div></div></div>`;
const bg=document.getElementById('burger'),hm=document.getElementById('hmenu');
const shut=()=>{hm.classList.remove('open');bg.setAttribute('aria-expanded','false')};
bg.onclick=()=>{const o=hm.classList.toggle('open');bg.setAttribute('aria-expanded',o)};
hm.addEventListener('click',e=>{if(e.target.closest('a'))shut()});
addEventListener('resize',()=>{if(innerWidth>900)shut()});
addEventListener('keydown',e=>{if(e.key==='Escape')shut()});
const B=(f,a)=>`<span class="fr">${f}</span><span class="ar">${a}</span>`;
document.getElementById('site-footer').innerHTML=`<div class="fin"><div class="fgrid">
 <div class="fbrand"><img class="foot-logo" src="logo-light.png" alt="Massar Al Ghad"><p>${B('École de formation et de perfectionnement à Hussein Dey, Alger : informatique, secrétariat, gestion et langues.','مدرسة للتكوين والتدريب بحسين داي، الجزائر العاصمة: الإعلام الآلي، الأمانة، التسيير واللغات.')}</p><a class="btn" href="inscription.html">${B('Je m’inscris','سجّل الآن')}<b class="arr">→</b></a></div>
 <div><h4>${B('Navigation','التصفح')}</h4><nav class="fcol">${links(0)}</nav></div>
 <div><h4>${B('Formations','التكوينات')}</h4><div class="fcol">
  <a href="formations.html?cat=info">${B('Informatique','الإعلام الآلي')}</a><a href="formations.html?cat=sec">${B('Secrétariat','الأمانة')}</a><a href="formations.html?cat=ges">${B('Gestion','التسيير')}</a><a href="formations.html?cat=lan">${B('Langues','اللغات')}</a></div></div>
 <div><h4>${B('Contact','اتصل بنا')}</h4><div class="fcol">
  <a class="fct" href="tel:+213541896856"><i><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg></i><span dir="ltr">+213 541 89 68 56</span></a>
  <a class="fct" href="https://wa.me/213541896856" target="_blank" rel="noopener"><i><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1.3-4.2A8 8 0 1112 20a8 8 0 01-3.8-1z"/><path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z"/></svg></i><span>WhatsApp</span></a>
  <span class="fct"><i><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg></i><span>${B('Hussein Dey, Alger, en face du tramway Tripoli','حسين داي، الجزائر، أمام ترامواي طرابلس')}</span></span></div></div>
 </div><div class="fbar"><span>© 2026 ${B('Massar Al Ghad','مدرسة مسار الغد للتكوين والتدريب')}</span></div></div>`;

const WAI='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1.3-4.2A8 8 0 1112 20a8 8 0 01-3.8-1z"/><path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z"/></svg>';
const mb=document.createElement('div');mb.className='mbar';
mb.innerHTML=`<a class="m-reg" href="inscription.html">${B('S’inscrire','سجّل الآن')}</a><a class="m-wa" href="https://wa.me/213541896856" target="_blank" rel="noopener">${WAI}WhatsApp</a>`;
if(P!='inscription')document.body.appendChild(mb);
})();
