/* DOM rendering + combined search/filter/sort. No handwritten track cards. */
'use strict';
(() => {
 const search=document.querySelector('#song-search'), genre=document.querySelector('#song-genre'), sort=document.querySelector('#song-sort'), form=document.querySelector('#song-controls'), grid=document.querySelector('#song-grid');
 function renderSongs() {
  const term=search.value.trim().toLocaleLowerCase();
  const list=KAMOKU.songs.filter(song => (song.title+' '+song.description).toLocaleLowerCase().includes(term) && (genre.value==='all'||song.genre===genre.value));
  if(sort.value==='title') list.sort((a,b)=>a.title.localeCompare(b.title));
  if(sort.value==='shortest') list.sort((a,b)=>a.seconds-b.seconds);
  if(sort.value==='newest') list.sort((a,b)=>b.year-a.year||a.id-b.id);
  grid.replaceChildren();
  list.forEach(song => {
   const article=document.createElement('article'); article.className='song-card';
   // All interpolated values below come from our fixed local catalogue, never user input.
   article.innerHTML=`<div class="song-art"><img src="images/track-${song.id}.svg" width="600" height="600" alt="Original geometric record sleeve for ${song.title}" loading="lazy"><span class="track-badge">${String(song.id).padStart(2,'0')}</span></div><div class="song-body"><div class="song-meta"><span>${song.genre}</span><span>${Math.floor(song.seconds/60)}:${String(song.seconds%60).padStart(2,'0')} / ${song.year}</span></div><h3>${song.title}</h3><button class="disclosure song-disclosure" type="button" aria-expanded="false" aria-controls="song-${song.id}">Track notes <span aria-hidden="true">+</span></button><div class="disclosure-panel" id="song-${song.id}" hidden><p>${song.description}</p></div></div>`;
   grid.append(article);
  });
  document.querySelector('#song-empty').hidden=list.length!==0;
  document.querySelector('#song-count').textContent=`${list.length} / ${KAMOKU.songs.length} tracks · ${Math.floor(list.reduce((sum,s)=>sum+s.seconds,0)/60)} minutes of music`;
  document.dispatchEvent(new CustomEvent('kamoku:rendered',{detail:{target:grid}}));
 }
 [search,genre,sort].forEach(control=>control.addEventListener(control===search?'input':'change',renderSongs));
 form.addEventListener('submit',e=>e.preventDefault()); // Enter searches without reloading.
 form.addEventListener('reset',()=>setTimeout(renderSongs,0));
 document.querySelector('#clear-search').addEventListener('click',()=>{form.reset();search.focus();});
 renderSongs();
})();
