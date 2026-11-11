(() => {
  const themeButton=document.querySelector('[data-theme-toggle]');
  if(themeButton && !document.querySelector('script[src$="project.js"]')){
    const apply=t=>{document.documentElement.dataset.theme=t;localStorage.setItem('portfolio-theme',t);themeButton.setAttribute('aria-pressed',String(t==='dark'));themeButton.querySelector('.theme-icon').textContent=t==='dark'?'☼':'☾';themeButton.querySelector('.theme-label').textContent=t==='dark'?'Light':'Dark';};
    apply(localStorage.getItem('portfolio-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
    themeButton.addEventListener('click',()=>apply(document.documentElement.dataset.theme==='dark'?'light':'dark'));
  }
  document.querySelectorAll('[data-gallery]').forEach(gallery=>{
    const photos=[...gallery.querySelectorAll('[data-gallery-open]')];if(!photos.length)return;
    const modal=document.createElement('div');modal.className='gallery-modal';modal.hidden=true;
    modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','Project photograph viewer');
    modal.innerHTML='<button type="button" class="gallery-close" aria-label="Close gallery">×</button><button type="button" class="gallery-prev" aria-label="Previous photograph">‹</button><img alt=""><p class="gallery-caption"></p><button type="button" class="gallery-next" aria-label="Next photograph">›</button>';
    document.body.append(modal);
    let index=0,lastFocus=null;
    const image=modal.querySelector('img'),caption=modal.querySelector('.gallery-caption');
    const render=()=>{const photo=photos[index].querySelector('img');image.src=photo.src;image.alt=photo.alt;caption.textContent=photos[index].closest('figure').querySelector('figcaption')?.textContent||photo.alt;};
    const close=()=>{modal.hidden=true;document.body.style.overflow='';image.removeAttribute('src');document.removeEventListener('keydown',key);lastFocus?.focus();};
    const step=d=>{index=(index+d+photos.length)%photos.length;render();};
    const key=e=>{if(e.key==='Escape')close();else if(e.key==='ArrowRight')step(1);else if(e.key==='ArrowLeft')step(-1);else if(e.key==='Tab'){const ctrls=[modal.querySelector('.gallery-close'),modal.querySelector('.gallery-prev'),modal.querySelector('.gallery-next')];let n=ctrls.indexOf(document.activeElement);if(n<0)n=0;e.preventDefault();ctrls[(n+(e.shiftKey?-1:1)+ctrls.length)%ctrls.length].focus();}};
    photos.forEach((b,i)=>b.addEventListener('click',()=>{lastFocus=document.activeElement;index=i;render();modal.hidden=false;document.body.style.overflow='hidden';modal.querySelector('.gallery-close').focus();document.addEventListener('keydown',key);}));
    modal.querySelector('.gallery-close').addEventListener('click',close);
    modal.querySelector('.gallery-prev').addEventListener('click',()=>step(-1));
    modal.querySelector('.gallery-next').addEventListener('click',()=>step(1));
    modal.addEventListener('click',e=>{if(e.target===modal)close();});
  });
})();