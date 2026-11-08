/* Shared fictional catalogue. Original Midterm titles/members retained. */
'use strict';
window.KAMOKU = {
 songs: [
 {id:1,title:'Neon Rain',genre:'Alternative',seconds:218,year:2026,description:'A fast track built around guitar riffs and bright keyboard melodies.'},
 {id:2,title:'After 2AM',genre:'Indie',seconds:264,year:2026,description:'A slower song with atmospheric keys and a simple rhythmic sound.'},
 {id:3,title:'No Signal',genre:'Rock',seconds:197,year:2026,description:'An energetic track mixing distorted guitar with electronic elements.'},
 {id:4,title:'Paper City',genre:'Indie',seconds:231,year:2026,description:'Soft keys wander through a city of paper walls before the drums break through.'},
 {id:5,title:'Static Bloom',genre:'Electronic',seconds:186,year:2026,description:'Broken pulses and warm keyboard loops grow into a restless instrumental.'},
 {id:6,title:'Red Line',genre:'Rock',seconds:205,year:2026,description:'A sharp guitar riff follows the last train home, driven by insistent drums.'},
 {id:7,title:'Tokyo Echo',genre:'Alternative',seconds:248,year:2025,description:'Imagined city lights reflected in layered guitars and distant keys.'},
 {id:8,title:'Daybreak / 06',genre:'Electronic',seconds:283,year:2025,description:'The noise settles into a slow electronic sunrise. One last note before morning.'}
 ],
 events: [
 {id:'first-signal',title:'First Signal',date:'2026-10-18',city:'Astana',type:'Live',price:4500,detail:'Our first signal: a loud introduction to the KAMOKU project. Original Midterm date.'},
 {id:'night-session',title:'Night Session',date:'2026-11-07',city:'Almaty',type:'Session',price:3500,detail:'A close-up session built around keys and stripped-back rhythm. Original Midterm date.'},
 {id:'kamoku-01',title:'KAMOKU / 01',date:'2026-11-21',city:'Astana',type:'Live',price:5000,detail:'The full fictional set: Neon Rain, No Signal and everything in between. Doors 19:00, music 20:00.'},
 {id:'after-hours',title:'After Hours',date:'2026-12-12',city:'Almaty',type:'Session',price:4000,detail:'An intimate fictional session for the late-night tracks. Doors 18:30, music 19:30.'}
 ],
 isUpcoming(event) { return event.date >= new Date().getFullYear()+'-'+String(new Date().getMonth()+1).padStart(2,'0')+'-'+String(new Date().getDate()).padStart(2,'0'); },
 money(value) { return new Intl.NumberFormat('en-US',{style:'currency',currency:'KZT',maximumFractionDigits:0}).format(value); },
 date(value) { return new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(value+'T12:00:00')); }
};
