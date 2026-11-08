/* Demo only: no network requests, payments, or personal-data storage. */
'use strict';
(() => {
 const form=document.querySelector('#booking-form'), eventSelect=form.elements.event, ticket=form.elements.ticket, quantity=form.elements.quantity;
 const fields=['name','email','phone','event','ticket','quantity','notes','consent'];
 const touched=new Set(); let submitted=false;
 const selectedEvent=()=>KAMOKU.events.find(event=>event.id===eventSelect.value);
 function quantityValid(){return /^\d+$/.test(quantity.value)&&Number(quantity.value)>=1&&Number(quantity.value)<=6;}
 function calculatePrice(){
  const event=selectedEvent(), multiplier=ticket.value==='supporter'?1.5:1;
  return event&&KAMOKU.isUpcoming(event)&&quantityValid() ? event.price*multiplier*Number(quantity.value) : 0;
 }
 function updateTotal(){
  const event=selectedEvent();
  document.querySelector('#booking-total').textContent=KAMOKU.money(calculatePrice());
  document.querySelector('#preview-event').textContent=event?event.title:'Choose your show';
  document.querySelector('#preview-detail').textContent=event?`${KAMOKU.date(event.date)} / ${event.city}`:'Select an upcoming event to see the details.';
  document.querySelector('#price-breakdown').textContent=event?`${KAMOKU.money(event.price*(ticket.value==='supporter'?1.5:1))} × ${quantityValid()?quantity.value:'—'} · No booking fee`:'Standard × 1 · No booking fee';
 }
 function errorFor(id){
  const input=form.elements[id], value=input.value.trim();
  switch(id){
   case 'name': return value.length<2||value.length>80?'Enter a name between 2 and 80 characters.':'';
   case 'email': return !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)?'Enter a valid email, for example name@example.com.':'';
   case 'phone': { const digits=value.replace(/\D/g,''); return !/^\+?[\d ()-]+$/.test(value)||digits.length<10||digits.length>15?'Enter 10–15 digits; +, spaces, brackets and hyphens are allowed.':''; }
   case 'event': return !selectedEvent()||!KAMOKU.isUpcoming(selectedEvent())?'Choose an upcoming show. Past shows cannot be booked.':'';
   case 'ticket': return !['standard','supporter'].includes(value)?'Choose Standard or Supporter.':'';
   case 'quantity': return !quantityValid()?'Choose a whole number from 1 to 6.':'';
   case 'notes': return value.length>300?'Keep access notes within 300 characters.':'';
   case 'consent': return !input.checked?'Please confirm that you understand this is a demo.':'';
   default:return '';
  }
 }
 function validate(id){
  const message=errorFor(id), input=form.elements[id];
  document.querySelector('#'+id+'-error').textContent=message;
  input.classList.toggle('is-invalid',!!message);
  if(message) input.setAttribute('aria-invalid','true'); else input.removeAttribute('aria-invalid');
  return !message;
 }
 function renderEvents(){
  const list=document.querySelector('#event-list');
  KAMOKU.events.forEach((event,i)=>{
   const upcoming=KAMOKU.isUpcoming(event), article=document.createElement('article'); article.className='event-row';
   article.innerHTML=`<div class="event-date"><span class="eyebrow">${String(i+1).padStart(2,'0')} / ${upcoming?'UPCOMING':'PAST SHOW'}</span><strong>${KAMOKU.date(event.date)}</strong></div><div class="event-info"><span class="eyebrow">${event.city} / ${event.type}</span><h3>${event.title}</h3><button class="disclosure" type="button" aria-expanded="false" aria-controls="event-${event.id}">Show details <span aria-hidden="true">+</span></button><div class="disclosure-panel" id="event-${event.id}" hidden><p>${event.detail}</p></div></div><div class="event-action">${upcoming?`<span>From ${KAMOKU.money(event.price)}</span><button class="button light book-event" type="button" data-event="${event.id}">Book demo ticket ↗</button>`:'<span class="archive-label">ARCHIVE / CLOSED</span>'}</div>`;
   list.append(article);
   if(upcoming){const option=new Option(`${event.title} — ${KAMOKU.date(event.date)}`,event.id);eventSelect.add(option);}
  });
  if(eventSelect.options.length===1){document.querySelector('#form-status').textContent='All listed shows are now in the archive. Demo booking is closed until new dates are added.';document.querySelector('#submit-booking').disabled=true;}
 }
 document.querySelector('#event-list').addEventListener('click',e=>{
  const button=e.target.closest('.book-event'); if(!button)return;
  eventSelect.value=button.dataset.event; if(touched.has('event'))validate('event'); updateTotal();
  document.querySelector('#booking').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});eventSelect.focus({preventScroll:true});
 });
 fields.forEach(id=>{
  const input=form.elements[id];
  input.addEventListener('blur',()=>{touched.add(id);validate(id);});
  ['input','change'].forEach(type=>input.addEventListener(type,()=>{if(touched.has(id)||submitted)validate(id);if(submitted&&fields.every(field=>!errorFor(field)))document.querySelector('#form-status').textContent='';if(['event','ticket','quantity'].includes(id))updateTotal();}));
 });
 form.addEventListener('submit',e=>{
  e.preventDefault();submitted=true;
  const valid=fields.map(validate).every(Boolean);
  if(!valid){document.querySelector('#form-status').textContent='Please correct the marked fields.';form.querySelector('[aria-invalid="true"]').focus();return;}
  const event=selectedEvent(),total=calculatePrice(),count=Number(quantity.value),type=ticket.value;
  // textContent prevents user-supplied names from becoming HTML.
  document.querySelector('#confirmation').textContent=`Thank you, ${form.elements.name.value.trim()}. ${count} ${type} ticket${count===1?'':'s'} for ${event.title}, ${KAMOKU.date(event.date)}, ${event.city}. Demo total: ${KAMOKU.money(total)}.`;
  form.reset();
  document.dispatchEvent(new CustomEvent('kamoku:success'));
 });
 form.addEventListener('reset',()=>{
  touched.clear();submitted=false;
  fields.forEach(id=>{form.elements[id].classList.remove('is-invalid');form.elements[id].removeAttribute('aria-invalid');document.querySelector('#'+id+'-error').textContent='';});
  document.querySelector('#form-status').textContent='';
  document.querySelector('#booking-success').hidden=true;
  setTimeout(updateTotal,0);
 });
 document.querySelector('#dismiss-success').addEventListener('click',()=>{document.querySelector('#booking-success').hidden=true;form.elements.name.focus();});
 renderEvents();updateTotal();
})();
