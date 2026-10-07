(()=>{
const schedule=[[8*60,17*60],[7*60+30,18*60],[7*60,19*60],[6*60+30,20*60+30],[6*60,21*60],[5*60+30,22*60],[6*60,22*60],[6*60+30,21*60],[7*60,20*60],[7*60+30,18*60+30],[8*60,17*60],[8*60+30,16*60+30]];
function clock(date=new Date()){const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Brussels',month:'numeric',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(date);const value=type=>Number(parts.find(p=>p.type===type).value);return{month:value('month'),minutes:value('hour')*60+value('minute')}}
function daylight(date){const c=clock(date);const [start,end]=schedule[c.month-1];return{light:c.minutes>=start&&c.minutes<end,start,end}}
let preference='auto';try{const saved=localStorage.getItem('td91-theme');if(['auto','light','dark'].includes(saved))preference=saved}catch{}
function apply(){const d=daylight();const mode=preference==='auto'?(d.light?'light':'dark'):preference;document.documentElement.dataset.theme=mode;document.documentElement.style.colorScheme=mode;return{mode,preference,...d}}
window.td91Theme={apply,daylight,set(value){if(!['auto','light','dark'].includes(value))return;preference=value;try{localStorage.setItem('td91-theme',value)}catch{}return apply()},get preference(){return preference}};apply();
})();
