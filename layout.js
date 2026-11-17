// Shared header + footer for all public pages. Edit the menu here once.
(function(){
const P=(location.pathname.split('/').pop()||'index').replace('.html','')||'index';
const N=[['index','Accueil','الرئيسية'],['apropos','À propos','من نحن'],['formations','Formations','التكوينات'],['acces','Accès','كيف تصلنا'],['inscription','Inscription','التسجيل'],['contact','Contact','اتصل بنا']];
const links=cls=>N.filter(n=>!(cls&&n[0]=='inscription')).map(([k,f,a])=>`<a href="${k}.html"${P==k&&cls?' aria-current="page"':''}><span class="fr">${f}</span><span class="ar">${a}</span></a>`).join('');
document.getElementById('site-header').innerHTML=`<div>
  <a class="brand" href="index.html"><img class="logo-img" src="logo-mark.png" alt=""><span><span class="fr">Massar Al Ghad</span><span class="ar">مسار الغد</span></span></a>
  <nav aria-label="Menu">${links(1)}</nav>
  <a class="btn cta" href="inscription.html"><span class="fr">Inscription</span><span class="ar">التسجيل</span></a>
  <div class="seg" role="group" aria-label="Langue / اللغة"><button type="button" data-lang="fr">FR</button><button type="button" data-lang="ar">عربية</button></div></div>`;
const B=(f,a)=>`<span class="fr">${f}</span><span class="ar">${a}</span>`;
document.getElementById('site-footer').innerHTML=`<div class="fin"><div class="fgrid">
 <div class="fbrand"><img class="foot-logo" src="logo.png" alt="Massar Al Ghad"><p>${B('École de formation et de perfectionnement à Hussein Dey, Alger : informatique, secrétariat, gestion et langues.','مدرسة للتكوين والتدريب بحسين داي، الجزائر العاصمة: الإعلام الآلي، الأمانة، التسيير واللغات.')}</p></div>
 <div><h4>${B('Navigation','التصفح')}</h4><nav class="fcol">${links(0)}</nav></div>
 <div><h4>${B('Formations','التكوينات')}</h4><div class="fcol">
  <a href="formations.html?cat=info">${B('Informatique','الإعلام الآلي')}</a><a href="formations.html?cat=sec">${B('Secrétariat','الأمانة')}</a><a href="formations.html?cat=ges">${B('Gestion','التسيير')}</a><a href="formations.html?cat=lan">${B('Langues','اللغات')}</a></div></div>
 <div><h4>${B('Contact','اتصل بنا')}</h4><div class="fcol">
  <a href="tel:+213541896856" dir="ltr">📞 +213 541 89 68 56</a><a href="https://wa.me/213541896856" target="_blank" rel="noopener">💬 WhatsApp</a>
  <span>📍 ${B('Hussein Dey, Alger, en face du tramway Tripoli','حسين داي، الجزائر، أمام ترامواي طرابلس')}</span></div></div>
 </div><div class="fbar"><span>© 2026 ${B('Massar Al Ghad','مدرسة مسار الغد للتكوين والتدريب')}</span><a href="admin.html">${B('Espace admin','فضاء الإدارة')}</a></div></div>`;
})();
