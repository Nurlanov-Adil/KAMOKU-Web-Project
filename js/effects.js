/* Three distinct jQuery effects: slideToggle, animate(scrollTop), fadeIn.
   stop(true,true) clears queues; reduced-motion users get immediate state changes. */
'use strict';
(($)=>{
 const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const duration=()=>reduced()?0:220;
 $('.nav-toggle').on('click',function(){const open=this.getAttribute('aria-expanded')!=='true';this.setAttribute('aria-expanded',String(open));this.textContent=open?'Close −':'Menu +';$('#nav-links').toggleClass('is-open',open);});
 $('#nav-links a').on('click',()=>{$('#nav-links').removeClass('is-open');$('.nav-toggle').attr('aria-expanded','false').text('Menu +');});
 $(document).on('keydown',e=>{if(e.key==='Escape'&&$('.nav-toggle').attr('aria-expanded')==='true'){$('.nav-toggle').trigger('click').trigger('focus');}});
 // 1. Accessible disclosures: state is set immediately, even during fast clicks.
 $(document).on('click','.disclosure',function(){
  const panel=document.getElementById(this.getAttribute('aria-controls'));
  const wasOpen=this.getAttribute('aria-expanded')==='true';
  $(panel).stop(true,true);
  this.setAttribute('aria-expanded',String(!wasOpen));
  $(this).find('span[aria-hidden]').text(wasOpen?'+':'−');
  panel.hidden=false;
  if(wasOpen)$(panel).slideUp(duration(),()=>{panel.hidden=true;panel.style.display='';});
  else $(panel).hide().slideDown(duration());
 });
 // 2. Smooth local-anchor navigation; preserve native fallback and URL history.
 $(document).on('click','a[href^="#"]',function(e){
  const id=this.getAttribute('href').slice(1),target=document.getElementById(id);
  if(!target)return; e.preventDefault();
  $('html, body').stop(true).animate({scrollTop:Math.max(0,$(target).offset().top-88)},reduced()?0:400);
  history.pushState(null,'','#'+id);target.setAttribute('tabindex','-1');target.focus({preventScroll:true});
 });
 // 3. Confirmation fades in once, and cannot build up an animation queue.
 document.addEventListener('kamoku:success',()=>{
  const panel=document.querySelector('#booking-success');
  $(panel).stop(true,true);panel.hidden=false;
  $(panel).hide().fadeIn(duration(),()=>panel.focus({preventScroll:false}));
 });
 // Filter changes get the same fade effect without delayed/queued stale results.
 document.addEventListener('kamoku:rendered',e=>{$(e.detail.target).stop(true,true).hide().fadeIn(duration());});
})(jQuery);
