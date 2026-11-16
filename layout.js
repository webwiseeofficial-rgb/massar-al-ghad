// Shared header + footer for all public pages. Edit the menu here once.
(function(){
const P=(location.pathname.split('/').pop()||'index').replace('.html','')||'index';
const N=[['index','Accueil','الرئيسية'],['formations','Formations','التكوينات'],['acces','Accès','كيف تصلنا'],['inscription','Inscription','التسجيل'],['contact','Contact','اتصل بنا']];
const links=cls=>N.map(([k,f,a])=>`<a href="${k}.html"${P==k&&cls?' aria-current="page"':''}><span class="fr">${f}</span><span class="ar">${a}</span></a>`).join('');
document.getElementById('site-header').innerHTML=`<div>
  <a class="brand" href="index.html"><span class="logo">✦</span><span><span class="fr">Massar Al Ghad</span><span class="ar">مسار الغد</span></span></a>
  <nav aria-label="Menu">${links(1)}</nav>
  <button class="pill" id="lang" type="button"><span class="fr">العربية</span><span class="ar">Français</span></button>
  <a class="btn" href="tel:+213541896856" dir="ltr">📞 +213 541 89 68 56</a></div>`;
document.getElementById('site-footer').innerHTML=`<span>© 2026 <span class="fr">Massar Al Ghad</span><span class="ar">مدرسة مسار الغد للتكوين والتدريب</span></span><nav>${links(0)}<a href="admin.html"><span class="fr">Espace admin</span><span class="ar">فضاء الإدارة</span></a></nav>`;
})();
