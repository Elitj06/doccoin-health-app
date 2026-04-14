import { useState, useEffect, useRef, useCallback } from "react";

/* ── Professional SVG Icon System ── */
const I = ({children, size=24, color="currentColor", sw=1.8, fill="none", ...p}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...p}>{children}</svg>
);
const Ic = {
  home: (p={}) => <I {...p}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></I>,
  search: (p={}) => <I {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></I>,
  gem: (p={}) => <I {...p}><path d="M6 3h12l4 6-10 13L2 9z"/><path d="M2 9h20"/><path d="M12 22L6 9"/><path d="M12 22l6-13"/></I>,
  wallet: (p={}) => <I {...p}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></I>,
  user: (p={}) => <I {...p}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></I>,
  heart: (p={}) => <I {...p}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></I>,
  stethoscope: (p={}) => <I {...p}><path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6 6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3"/><path d="M8 15v1a6 6 0 006 6 6 6 0 006-6v-4"/><circle cx="20" cy="10" r="2"/></I>,
  mapPin: (p={}) => <I {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></I>,
  calendar: (p={}) => <I {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></I>,
  shield: (p={}) => <I {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></I>,
  bell: (p={}) => <I {...p}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></I>,
  activity: (p={}) => <I {...p}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></I>,
  zap: (p={}) => <I {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="none"/></I>,
  star: (p={}) => <I {...p} fill={p.filled?"#FFD700":"none"} stroke={p.filled?"#FFD700":p.color}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></I>,
  check: (p={}) => <I {...p}><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></I>,
  plus: (p={}) => <I {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></I>,
  exchange: (p={}) => <I {...p}><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></I>,
  eye: (p={}) => <I {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></I>,
  users: (p={}) => <I {...p}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></I>,
  hospital: (p={}) => <I {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></I>,
  clipboard: (p={}) => <I {...p}><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></I>,
  fileText: (p={}) => <I {...p}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></I>,
  lock: (p={}) => <I {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></I>,
  helpCircle: (p={}) => <I {...p}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></I>,
  chevRight: (p={}) => <I size={p.size||16} {...p}><polyline points="9 18 15 12 9 6"/></I>,
  brain: (p={}) => <I {...p}><path d="M9.5 2A6.5 6.5 0 003 8.5c0 2.5 1.5 4.5 3.5 5.5V22h3V14l2.5-2"/><path d="M14.5 2A6.5 6.5 0 0121 8.5c0 2.5-1.5 4.5-3.5 5.5V22h-3V14l-2.5-2"/></I>,
  baby: (p={}) => <I {...p}><circle cx="12" cy="8" r="5" fill="none"/><path d="M20 21v-2a7 7 0 00-16 0v2"/></I>,
  apple: (p={}) => <I {...p}><path d="M12 3c-2-2-5-1.5-6 0s-1 5 1 8c1.2 1.8 3 4 5 7 2-3 3.8-5.2 5-7 2-3 2-6 1-8s-4-2-6 0z" fill="none"/><path d="M12 3c0-1 .5-2 2-2"/></I>,
  dumbbell: (p={}) => <I {...p}><rect x="2" y="7" width="3" height="10" rx="1"/><rect x="19" y="7" width="3" height="10" rx="1"/><rect x="5" y="9" width="2" height="6" rx=".5"/><rect x="17" y="9" width="2" height="6" rx=".5"/><line x1="7" y1="12" x2="17" y2="12"/></I>,
  bone: (p={}) => <I {...p}><path d="M17 10l-5 5M9.9 7.1A2.1 2.1 0 008 5a2.1 2.1 0 00-3 3c0 .8.3 1.4.8 1.9"/><path d="M14.1 16.9A2.1 2.1 0 0016 19a2.1 2.1 0 003-3c0-.8-.3-1.4-.8-1.9"/></I>,
  send: (p={}) => <I {...p}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></I>,
  x: (p={}) => <I {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></I>,
  video: (p={}) => <I {...p}><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></I>,
  micOff: (p={}) => <I {...p}><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v-1a3 3 0 016 0v12a3 3 0 01-6 0v-2"/><path d="M9 9h0"/><path d="M19 9a7 7 0 01-7 7 7 7 0 01-7-7"/></I>,
  phone: (p={}) => <I {...p}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></I>,
  trendingUp: (p={}) => <I {...p}><polyline points="23 6 13.5 15.5 8.5 10.5 1 17"/><polyline points="17 6 23 6 23 12"/></I>,
  barChart2: (p={}) => <I {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></I>,
  pieChart: (p={}) => <I {...p}><path d="M21.21 15.89A10 10 0 1120 4.69"/><path d="M12 2v10"/></I>,
  awardIcon: (p={}) => <I {...p}><circle cx="12" cy="8" r="7"/><polyline points="8 14 12 17 16 14"/><line x1="12" y1="17" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></I>,
  droplet: (p={}) => <I {...p}><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></I>,
  dna: (p={}) => <I {...p}><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21M3 3l2.59 2.59a8.38 8.38 0 013.8.9 8.5 8.5 0 017.6 4.7 8.38 8.38 0 01.9 3.8"/><line x1="9" y1="9" x2="15" y2="15"/></I>,
  wifi: (p={}) => <I {...p}><path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.94 0"/></I>,
  zoomIn: (p={}) => <I {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></I>,
};

/* ── DocCoin Logo ── */
const Logo = ({size=32}) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00E5FF"/><stop offset="100%" stopColor="#00838F"/></linearGradient></defs>
    <rect width="40" height="40" rx="12" fill="url(#lg)"/>
    <path d="M20 10c-2.5-2-6-2-7.5 0s-1.5 5.5 0 8.5c1.2 2.4 4 6 7.5 9.5 3.5-3.5 6.3-7.1 7.5-9.5 1.5-3 1.5-6.5 0-8.5s-5-2-7.5 0z" fill="#fff" opacity=".92"/>
    <path d="M14 18h3.5l1.5-3 2 6 1.5-3H26" stroke="#00838F" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
  </svg>
);

const Coin = ({size=18}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#FFD700" opacity=".12" stroke="#FFD700" strokeWidth="1.5"/>
    <text x="12" y="16" textAnchor="middle" fill="#FFD700" fontSize="11" fontWeight="700" fontFamily="system-ui">D</text>
  </svg>
);

/* ── Data ── */
const SPECS = [
  {id:"clinico",name:"Clínico Geral",Ic:Ic.stethoscope,price:15,clr:"#00ACC1"},
  {id:"cardio",name:"Cardiologia",Ic:Ic.heart,price:25,clr:"#EF5350"},
  {id:"derma",name:"Dermatologia",Ic:Ic.user,price:20,clr:"#AB47BC"},
  {id:"orto",name:"Ortopedia",Ic:Ic.bone,price:22,clr:"#42A5F5"},
  {id:"psico",name:"Psicologia",Ic:Ic.brain,price:18,clr:"#7E57C2"},
  {id:"pediatria",name:"Pediatria",Ic:Ic.baby,price:18,clr:"#66BB6A"},
  {id:"oftalmo",name:"Oftalmologia",Ic:Ic.eye,price:20,clr:"#26A69A"},
  {id:"nutri",name:"Nutrição",Ic:Ic.apple,price:15,clr:"#FFA726"},
  {id:"fisio",name:"Fisioterapia",Ic:Ic.dumbbell,price:12,clr:"#EC407A"},
  {id:"neuro",name:"Neurologia",Ic:Ic.activity,price:30,clr:"#5C6BC0"},
];
const TC={essential:"#CD7F32",silver:"#A8A9AD",gold:"#FFD700",diamond:"#00ACC1"};
const TN={essential:"Essencial",silver:"Prata",gold:"Ouro",diamond:"Diamante"};
const PLANS=[
  {id:"essential",tier:"Essencial",color:"#CD7F32",grad:"linear-gradient(135deg,#CD7F32,#8B5E3C)",mp:89.9,tok:120,feat:["Clínico Geral","Telemedicina ilimitada","2 consultas/mês","Desconto farmácia 10%"],mx:1},
  {id:"silver",tier:"Prata",color:"#A8A9AD",grad:"linear-gradient(135deg,#C0C0C0,#808080)",mp:179.9,tok:300,feat:["15+ especialidades","4 consultas/mês","Exames básicos","Seguro vida básico"],mx:1},
  {id:"gold",tier:"Ouro",color:"#FFD700",grad:"linear-gradient(135deg,#FFD700,#B8860B)",mp:349.9,tok:700,feat:["Todas especialidades","Consultas ilimitadas","Seguros inclusos","Exames completos"],mx:4,pop:true},
  {id:"diamond",tier:"Diamante",color:"#00E5FF",grad:"linear-gradient(135deg,#E0F7FA,#00ACC1,#006064)",mp:899.9,tok:2000,feat:["VIP ilimitado","Concierge 24h","Check-up executivo","Internação particular"],mx:6,prem:true},
];
const PROFS=[
  {id:1,nm:"Dra. Ana Silva",sp:"clinico",rat:4.9,rev:234,dist:0.8,pr:15,tier:"gold",lat:-22.91,lng:-43.18,ini:"AS",avail:true},
  {id:2,nm:"Dr. Carlos Mendes",sp:"cardio",rat:4.8,rev:189,dist:1.2,pr:25,tier:"diamond",lat:-22.92,lng:-43.17,ini:"CM",avail:true},
  {id:3,nm:"Dra. Beatriz Costa",sp:"derma",rat:4.7,rev:156,dist:2.1,pr:20,tier:"silver",lat:-22.90,lng:-43.19,ini:"BC",avail:false},
  {id:4,nm:"Dr. Felipe Rocha",sp:"orto",rat:4.9,rev:312,dist:0.5,pr:22,tier:"gold",lat:-22.915,lng:-43.175,ini:"FR",avail:true},
  {id:5,nm:"Dra. Juliana Lima",sp:"psico",rat:5.0,rev:278,dist:1.8,pr:18,tier:"gold",lat:-22.905,lng:-43.185,ini:"JL",avail:true},
  {id:6,nm:"Dr. Eduardo Pires",sp:"neuro",rat:4.9,rev:267,dist:4.5,pr:30,tier:"diamond",lat:-22.935,lng:-43.155,ini:"EP",avail:true},
  {id:7,nm:"Dra. Mariana Souza",sp:"pediatria",rat:4.8,rev:198,dist:1.5,pr:18,tier:"gold",lat:-22.908,lng:-43.172,ini:"MS",avail:true},
];

/* ── Animated Counter ── */
function AC({value:v,dur=1000}){const[d,sD]=useState(0);useEffect(()=>{let s=0;const st=v/(dur/16),t=setInterval(()=>{s+=st;if(s>=v){sD(v);clearInterval(t)}else sD(Math.floor(s))},16);return()=>clearInterval(t)},[v,dur]);return<>{d.toLocaleString("pt-BR")}</>}

/* ── Splash Screen ── */
function Splash({onDone}){
  const[anim,setAnim]=useState(false);useEffect(()=>{setAnim(true);const t=setTimeout(onDone,3000);return()=>clearTimeout(t)},[onDone]);
  return(
    <div style={{position:"fixed",inset:0,background:"linear-gradient(135deg,#060D1B,#0F1D35,#0A1528)",zIndex:5000,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",animation:"fadeInSplash 0.6s ease"}}>
      <style>{`@keyframes fadeInSplash{from{opacity:0}to{opacity:1}}@keyframes scaleIn{from{opacity:0;transform:scale(0.5)}to{opacity:1;transform:scale(1)}}@keyframes fadeOutSplash{from{opacity:1}to{opacity:0}}@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{animation:`${anim?"scaleIn":"fadeOutSplash"} 0.8s ease forwards`,marginBottom:24}}>
        <Logo size={80}/>
      </div>
      <h1 style={{fontSize:36,fontWeight:800,background:"linear-gradient(135deg,#4FC3F7,#00ACC1)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",margin:0,marginBottom:12,animation:`${anim?"slideUp":"fadeOutSplash"} 0.8s ease 0.2s both`}}>DocCoin</h1>
      <p style={{fontSize:14,color:"#4FC3F7",fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",animation:`${anim?"slideUp":"fadeOutSplash"} 0.8s ease 0.4s both`,margin:0}}>Sua saúde, tokenizada</p>
      <div style={{marginTop:32,textAlign:"center",animation:`${anim?"slideUp":"fadeOutSplash"} 0.8s ease 0.6s both`}}>
        <p style={{fontSize:12,color:"#78909C",lineHeight:1.6,maxWidth:280,margin:0}}>Plataforma de saúde com economia de criptomoedas. Acesso a médicos, telemedicina e bem-estar.</p>
      </div>
    </div>
  );
}

/* ── Map ── */
function HMap({profs,selSpec,onSel}){
  const fl=selSpec?profs.filter(p=>p.sp===selSpec):profs;
  const c={lat:-22.912,lng:-43.175},sc=800;
  const xy=(lat,lng)=>({x:(lng-c.lng+.025)*sc+40,y:(c.lat-lat+.025)*sc+40});
  return(
    <div style={{position:"relative",width:"100%",height:350,borderRadius:20,background:"linear-gradient(145deg,#060D1B,#0F1D35,#0A1528)",overflow:"hidden",border:"1px solid rgba(0,172,193,.12)"}}>
      <svg width="100%" height="100%" style={{position:"absolute",opacity:.05}}>
        {Array.from({length:20}).map((_,i)=><line key={`h${i}`} x1="0" y1={i*18} x2="100%" y2={i*18} stroke="#4FC3F7" strokeWidth=".5"/>)}
        {Array.from({length:30}).map((_,i)=><line key={`v${i}`} x1={i*20} y1="0" x2={i*20} y2="100%" stroke="#4FC3F7" strokeWidth=".5"/>)}
      </svg>
      <svg width="100%" height="100%" style={{position:"absolute",opacity:.1}}>
        <path d="M0 150Q200 130 400 180T800 140" stroke="#4FC3F7" fill="none" strokeWidth="2"/>
        <path d="M100 0Q120 200 180 380" stroke="#4FC3F7" fill="none" strokeWidth="1.5"/>
        <path d="M300 0Q280 150 350 380" stroke="#4FC3F7" fill="none" strokeWidth="1.5"/>
      </svg>
      {(()=>{const p=xy(c.lat,c.lng);return<div style={{position:"absolute",left:p.x-14,top:p.y-14,width:28,height:28,borderRadius:"50%",animation:"pulse 2s ease-in-out infinite",zIndex:10}}><div style={{width:12,height:12,borderRadius:"50%",background:"#4FC3F7",position:"absolute",top:8,left:8,boxShadow:"0 0 14px #4FC3F7"}}/></div>})()}
      {fl.map((pr,i)=>{const pos=xy(pr.lat,pr.lng);const tc=TC[pr.tier];return(
        <div key={pr.id} onClick={()=>onSel(pr)} style={{position:"absolute",left:pos.x-18,top:pos.y-18,cursor:"pointer",zIndex:5,transition:"transform .2s",animation:`fim .4s ease ${i*.08}s both`}}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.25)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
          <div style={{width:36,height:36,borderRadius:"50%",background:pr.avail?`linear-gradient(135deg,${tc},${tc}88)`:"#444",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#fff",border:`2px solid ${pr.avail?tc:"#555"}`,boxShadow:pr.avail?`0 0 16px ${tc}44`:"none"}}>{pr.ini}</div>
          {pr.avail&&<div style={{position:"absolute",top:-1,right:-1,width:8,height:8,borderRadius:"50%",background:"#4CAF50",border:"2px solid #060D1B",animation:"pulse 2s ease-in-out infinite"}}/>}
        </div>
      )})}
      <div style={{position:"absolute",bottom:12,left:12,background:"rgba(6,13,27,.88)",borderRadius:10,padding:"8px 12px",backdropFilter:"blur(8px)",border:"1px solid rgba(0,172,193,.1)"}}>
        <div style={{fontSize:8,color:"#4FC3F7",fontWeight:700,marginBottom:4,letterSpacing:1.5,textTransform:"uppercase"}}>Rede</div>
        {[["gold","Ouro"],["silver","Prata"],["diamond","Diamante"]].map(([k,v])=><div key={k} style={{display:"flex",alignItems:"center",gap:6,marginTop:3}}><div style={{width:6,height:6,borderRadius:"50%",background:TC[k]}}/><span style={{fontSize:9,color:"#90A4AE"}}>{v}</span></div>)}
      </div>
      <div style={{position:"absolute",top:12,right:12,background:"rgba(6,13,27,.88)",borderRadius:10,padding:"8px 14px",backdropFilter:"blur(8px)",border:"1px solid rgba(0,172,193,.1)"}}>
        <span style={{fontSize:20,fontWeight:800,color:"#4FC3F7"}}>{fl.length}</span><span style={{fontSize:10,color:"#90A4AE",marginLeft:6}}>disponíveis</span>
      </div>
    </div>
  );
}

/* ── Prof Card ── */
function PC({pr,onBook}){const tc=TC[pr.tier];const sp=SPECS.find(s=>s.id===pr.sp);return(
  <div style={{background:"rgba(255,255,255,.025)",borderRadius:16,border:`1px solid ${tc}18`,padding:"14px 16px",display:"flex",gap:12,alignItems:"flex-start",transition:"all .2s"}}
    onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.05)";e.currentTarget.style.borderColor=`${tc}40`}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.025)";e.currentTarget.style.borderColor=`${tc}18`}}>
    <div style={{width:48,height:48,borderRadius:14,background:`linear-gradient(135deg,${tc}25,${tc}08)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:700,color:tc,flexShrink:0,border:`1px solid ${tc}20`}}>{pr.ini}</div>
    <div style={{flex:1,minWidth:0}}>
      <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
        <span style={{fontSize:14,fontWeight:600,color:"#E8EDF2"}}>{pr.nm}</span>
        <span style={{fontSize:8,padding:"2px 8px",borderRadius:20,background:`${tc}18`,color:tc,fontWeight:700,textTransform:"uppercase",letterSpacing:.8}}>{TN[pr.tier]}</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:4,marginTop:4}}>
        {sp&&<sp.Ic size={13} color={sp.clr}/>}<span style={{fontSize:12,color:"#78909C"}}>{sp?.name} · {pr.dist}km</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:4,marginTop:5}}>
        <Ic.star size={12} filled/><span style={{fontSize:12,color:"#FFD700",fontWeight:600}}>{pr.rat}</span><span style={{fontSize:11,color:"#546E7A"}}>({pr.rev})</span>
      </div>
    </div>
    <div style={{textAlign:"right",flexShrink:0}}>
      <div style={{fontSize:10,color:"#78909C"}}>a partir de</div>
      <div style={{fontSize:18,fontWeight:700,color:"#4FC3F7",display:"flex",alignItems:"center",gap:3,justifyContent:"flex-end"}}><Coin size={14}/>{pr.pr}</div>
      <button onClick={e=>{e.stopPropagation();onBook(pr)}} style={{marginTop:8,padding:"6px 18px",borderRadius:10,background:pr.avail?`linear-gradient(135deg,${tc},${tc}cc)`:"#333",color:pr.avail?(pr.tier==="diamond"?"#fff":"#000"):"#666",border:"none",fontSize:11,fontWeight:700,cursor:pr.avail?"pointer":"default",transition:"all 0.2s"}} onMouseEnter={e=>pr.avail&&(e.currentTarget.style.transform="scale(1.05)")} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>{pr.avail?"Agendar":"Indisponível"}</button>
    </div>
  </div>
)}

/* ── Booking Modal ── */
function BM({pr,onClose,bal,onOk}){
  const sp=SPECS.find(s=>s.id===pr.sp);const tc=TC[pr.tier];const ok=bal>=pr.pr;
  const[sd,sSD]=useState(null);const[st,sST]=useState(null);
  const ds=Array.from({length:5}).map((_,i)=>{const d=new Date();d.setDate(d.getDate()+i+1);return{day:d.getDate(),wd:["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"][d.getDay()],mo:d.toLocaleString("pt-BR",{month:"short"})}});
  const ts=["08:00","09:30","11:00","14:00","15:30","17:00"];const can=sd!==null&&st&&ok;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20,backdropFilter:"blur(8px)",animation:"fi .2s"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0C1829",borderRadius:24,padding:24,maxWidth:400,width:"100%",border:"1px solid rgba(0,172,193,.12)",maxHeight:"90vh",overflowY:"auto",animation:"su .3s ease"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <h3 style={{fontSize:17,fontWeight:700,color:"#E8EDF2",margin:0}}>Agendar Consulta</h3>
          <button onClick={onClose} style={{background:"rgba(255,255,255,.06)",border:"none",color:"#78909C",width:30,height:30,borderRadius:10,cursor:"pointer",fontSize:14}}>✕</button>
        </div>
        <div style={{display:"flex",gap:12,padding:14,borderRadius:14,background:`${tc}06`,border:`1px solid ${tc}12`,marginBottom:18}}>
          <div style={{width:44,height:44,borderRadius:12,background:`${tc}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:700,color:tc}}>{pr.ini}</div>
          <div><div style={{fontSize:14,fontWeight:600,color:"#E8EDF2"}}>{pr.nm}</div><div style={{display:"flex",alignItems:"center",gap:4,marginTop:2}}>{sp&&<sp.Ic size={12} color={sp.clr}/>}<span style={{fontSize:12,color:"#78909C"}}>{sp?.name}</span></div></div>
        </div>
        <div style={{marginBottom:16}}><div style={{fontSize:11,color:"#78909C",marginBottom:8,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5}}>Data</div>
          <div style={{display:"flex",gap:6,overflowX:"auto"}}>{ds.map((d,i)=><div key={i} onClick={()=>sSD(i)} style={{padding:"8px 12px",borderRadius:12,cursor:"pointer",background:sd===i?"linear-gradient(135deg,#00ACC1,#00838F)":"rgba(255,255,255,.03)",border:sd===i?"none":"1px solid rgba(255,255,255,.06)",textAlign:"center",minWidth:52,transition:"all .15s"}}><div style={{fontSize:9,color:sd===i?"#E0F7FA":"#78909C"}}>{d.wd}</div><div style={{fontSize:17,fontWeight:700,color:sd===i?"#fff":"#E8EDF2"}}>{d.day}</div><div style={{fontSize:8,color:sd===i?"#B2EBF2":"#546E7A"}}>{d.mo}</div></div>)}</div>
        </div>
        <div style={{marginBottom:18}}><div style={{fontSize:11,color:"#78909C",marginBottom:8,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5}}>Horário</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>{ts.map(t=><div key={t} onClick={()=>sST(t)} style={{padding:9,borderRadius:10,cursor:"pointer",textAlign:"center",background:st===t?"linear-gradient(135deg,#00ACC1,#00838F)":"rgba(255,255,255,.03)",border:st===t?"none":"1px solid rgba(255,255,255,.06)",fontSize:13,fontWeight:600,color:st===t?"#fff":"#B0BEC5",transition:"all .15s"}}>{t}</div>)}</div>
        </div>
        <div style={{padding:14,borderRadius:14,background:"rgba(0,172,193,.05)",border:"1px solid rgba(0,172,193,.1)",marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:12,color:"#78909C"}}>Custo</span><span style={{fontSize:20,fontWeight:700,color:"#4FC3F7",display:"flex",alignItems:"center",gap:6}}><Coin size={18}/>{pr.pr} DC</span></div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:6}}><span style={{fontSize:11,color:"#546E7A"}}>Saldo</span><span style={{fontSize:12,color:ok?"#4CAF50":"#F44336",fontWeight:600}}>{bal} DC {ok?"✓":"(insuficiente)"}</span></div>
        </div>
        <button onClick={()=>can&&onOk(pr)} disabled={!can} style={{width:"100%",padding:"13px 0",borderRadius:14,background:can?"linear-gradient(135deg,#00ACC1,#00838F)":"rgba(255,255,255,.05)",color:can?"#fff":"#546E7A",border:"none",fontSize:14,fontWeight:700,cursor:can?"pointer":"default",transition:"all 0.2s"}} onMouseEnter={e=>can&&(e.currentTarget.style.transform="scale(1.02)")} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>{!ok?"Saldo insuficiente":can?`Confirmar · ${pr.pr} DC`:"Selecione data e horário"}</button>
      </div>
    </div>
  );
}

/* ── Telemedicine Modal ── */
function TeleModal({pr,onClose}){
  const[mic,setMic]=useState(true);const[vid,setVid]=useState(false);const[sec,setSec]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setSec(s=>s+1),1000);return()=>clearInterval(t)},[]);
  const fmt=s=>`${Math.floor(s/60).toString().padStart(2,"0")}:${(s%60).toString().padStart(2,"0")}`;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",padding:20,animation:"fi .2s"}}>
      <button onClick={onClose} style={{position:"absolute",top:20,right:20,background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",color:"#fff",width:40,height:40,borderRadius:"50%",cursor:"pointer",fontSize:20,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
      <div style={{marginBottom:24,textAlign:"center"}}>
        <h3 style={{fontSize:18,fontWeight:700,color:"#E8EDF2",margin:"0 0 8px"}}>Teleconsulta com {pr.nm}</h3>
        <p style={{fontSize:12,color:"#78909C",margin:0}}>Consulta online agora</p>
      </div>
      <div style={{width:280,height:420,background:"#0A1528",borderRadius:20,border:"2px solid rgba(0,172,193,.2)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20,position:"relative",overflow:"hidden"}}>
        <div style={{textAlign:"center"}}>
          <Ic.video size={60} color="#4FC3F7" opacity=".3"/>
          <p style={{fontSize:12,color:"#546E7A",marginTop:12}}>Câmera desligada</p>
        </div>
        <div style={{position:"absolute",bottom:12,right:12,width:60,height:80,background:"linear-gradient(135deg,#00ACC1,#006064)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <span style={{fontSize:10,fontWeight:700,color:"#fff"}}>Você</span>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
        <span style={{fontSize:16,fontWeight:700,color:"#4FC3F7"}}>{fmt(sec)}</span>
      </div>
      <div style={{display:"flex",gap:12,marginBottom:20}}>
        <button onClick={()=>setMic(!mic)} style={{width:56,height:56,borderRadius:"50%",background:mic?"linear-gradient(135deg,#00ACC1,#00838F)":"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>{mic?<Ic.phone size={20}/>:<Ic.micOff size={20}/>}</button>
        <button onClick={()=>setVid(!vid)} style={{width:56,height:56,borderRadius:"50%",background:vid?"linear-gradient(135deg,#00ACC1,#00838F)":"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><Ic.video size={20}/></button>
        <button onClick={onClose} style={{width:56,height:56,borderRadius:"50%",background:"#EF5350",border:"none",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,transition:"all 0.2s"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}}>✕</button>
      </div>
    </div>
  );
}

/* ── AI Triage Modal ── */
function TriageModal({onClose}){
  const[sym,setSym]=useState(null);const[msgs,setMsgs]=useState([{role:"ai",text:"Olá! Descreva seus sintomas para que eu possa ajudar na triagem."}]);
  const symptoms=["Febre","Tosse","Dor de cabeça","Fadiga","Dor na garganta","Dor no peito","Tontura","Nausea"];
  const recs={Febre:["Clinico Geral","Pediatria"],Tosse:["Clinico Geral","Pneumologia"],Fadiga:["Clinico Geral","Neurologia"],"Dor na garganta":["Clinico Geral","ORL"],"Dor no peito":["Cardiologia","Clinico Geral"]};
  const handleSym=s=>{setSym(s);setMsgs(m=>[...m,{role:"user",text:s},{role:"ai",text:`Entendido. Você está com ${s.toLowerCase()}. Recomendo consulta com: ${(recs[s]||["Clinico Geral"]).join(", ")}. Marcar consulta agora?`}])};
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20,backdropFilter:"blur(8px)",animation:"fi .2s"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0C1829",borderRadius:24,padding:24,maxWidth:380,width:"100%",border:"1px solid rgba(0,172,193,.12)",maxHeight:"75vh",display:"flex",flexDirection:"column",animation:"su .3s ease"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <h3 style={{fontSize:17,fontWeight:700,color:"#E8EDF2",margin:0}}>Triagem IA</h3>
          <button onClick={onClose} style={{background:"rgba(255,255,255,.06)",border:"none",color:"#78909C",width:30,height:30,borderRadius:10,cursor:"pointer",fontSize:14}}>✕</button>
        </div>
        <div style={{flex:1,overflowY:"auto",marginBottom:16,padding:"12px 0",display:"flex",flexDirection:"column",gap:10}}>
          {msgs.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}><div style={{maxWidth:"80%",padding:"10px 14px",borderRadius:12,background:m.role==="user"?"linear-gradient(135deg,#00ACC1,#00838F)":"rgba(255,255,255,.05)",color:"#E8EDF2",fontSize:13,border:m.role==="user"?"none":"1px solid rgba(255,255,255,.1)"}}>{m.text}</div></div>)}
        </div>
        {!sym&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
            {symptoms.map(s=><button key={s} onClick={()=>handleSym(s)} style={{padding:"10px 8px",borderRadius:10,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",color:"#B0BEC5",fontSize:12,fontWeight:500,cursor:"pointer",transition:"all 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,172,193,.1)";e.currentTarget.style.borderColor="rgba(0,172,193,.2)"}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.05)";e.currentTarget.style.borderColor="rgba(255,255,255,.08)"}}>{s}</button>)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Toast ── */
function Toast({msg,onDone}){useEffect(()=>{const t=setTimeout(onDone,3000);return()=>clearTimeout(t)},[onDone]);return(
  <div style={{position:"fixed",bottom:30,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#1B5E20,#2E7D32)",color:"#fff",padding:"12px 24px",borderRadius:14,fontSize:13,fontWeight:600,zIndex:2000,boxShadow:"0 8px 32px rgba(0,0,0,.4)",animation:"su .3s ease",display:"flex",alignItems:"center",gap:8}}><Ic.check size={18} color="#fff"/>{msg}</div>
)}

/* ── Notification Slide ── */
function NotifSlide({onClose}){
  const notifs=[
    {t:"Próxima consulta",d:"Dra. Ana Silva em 3 dias",icon:Ic.calendar,c:"#00ACC1"},
    {t:"Novo resultado",d:"Exame de sangue disponível",icon:Ic.fileText,c:"#FF7043"},
    {t:"Ganhou moedas",d:"Você recebeu 50 DC de bônus",icon:Coin,c:"#FFD700"},
    {t:"Dica de saúde",d:"Mantenha-se hidratado durante o dia",icon:Ic.droplet,c:"#4CAF50"},
  ];
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.3)",zIndex:900,animation:"fi .2s"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{position:"absolute",right:0,top:0,width:"85%",maxWidth:320,height:"100%",background:"#060D1B",borderLeft:"1px solid rgba(0,172,193,.12)",overflowY:"auto",animation:"slideRight .3s ease"}}>
        <div style={{padding:"20px 16px",borderBottom:"1px solid rgba(0,172,193,.08)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h3 style={{fontSize:16,fontWeight:700,color:"#E8EDF2",margin:0}}>Notificações</h3>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#78909C",cursor:"pointer",fontSize:18}}>✕</button>
        </div>
        <div style={{padding:"12px 16px"}}>
          {notifs.map((n,i)=><div key={i} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,.03)"}}>
            <div style={{width:40,height:40,borderRadius:12,background:`${n.c}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><n.icon size={18} color={n.c}/></div>
            <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:"#E8EDF2"}}>{n.t}</div><div style={{fontSize:11,color:"#78909C",marginTop:2}}>{n.d}</div></div>
          </div>)}
        </div>
      </div>
    </div>
  );
}

/* ═══ MAIN APP ═══ */
export default function App(){
  const[splash,setSplash]=useState(true);const[v,sV]=useState("home");const[sp,sSp]=useState("gold");const[ss,sSs]=useState(null);
  const[bal,sBal]=useState(700);const[fm,sFm]=useState(1);const[toast,sT]=useState(null);const[bm,sBm]=useState(null);
  const[tele,setTele]=useState(null);const[triage,setTriage]=useState(false);const[notif,setNotif]=useState(false);
  const[users,setUsers]=useState(47832);const[trans,setTrans]=useState(12450);const[docs,setDocs]=useState(2340);
  const cB=pr=>{sBal(b=>b-pr.pr);sBm(null);sT(`Consulta com ${pr.nm} confirmada`)};
  const nav=[{id:"home",Ic:Ic.home,l:"Início"},{id:"search",Ic:Ic.search,l:"Buscar"},{id:"plans",Ic:Ic.gem,l:"Planos"},{id:"wallet",Ic:Ic.wallet,l:"Carteira"},{id:"profile",Ic:Ic.user,l:"Perfil"}];

  if(splash)return <Splash onDone={()=>setSplash(false)}/>;

  return(
    <div style={{minHeight:"100vh",background:"#060D1B",fontFamily:"'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",color:"#E8EDF2",maxWidth:480,margin:"0 auto",position:"relative",paddingBottom:80}}>
      <style>{`
        @keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(2);opacity:.2}}
        @keyframes fi{from{opacity:0}to{opacity:1}}
        @keyframes su{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fim{from{opacity:0;transform:scale(.5)}to{opacity:1;transform:scale(1)}}
        @keyframes slideRight{from{transform:translateX(100%)}to{transform:translateX(0)}}
        *{box-sizing:border-box;scrollbar-width:thin;scrollbar-color:#1a2a40 transparent}
        *::-webkit-scrollbar{width:3px;height:3px}
        *::-webkit-scrollbar-thumb{background:#1a2a40;border-radius:3px}
      `}</style>

      {/* Header */}
      <div style={{padding:"14px 20px 10px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:100,background:"linear-gradient(180deg,#060D1B 60%,transparent)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}><Logo size={34}/><span style={{fontSize:19,fontWeight:800,letterSpacing:-.5,background:"linear-gradient(135deg,#4FC3F7,#00ACC1)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>DocCoin</span></div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{padding:"5px 12px",borderRadius:20,background:"rgba(0,172,193,.08)",border:"1px solid rgba(0,172,193,.12)",fontSize:13,fontWeight:700,color:"#4FC3F7",display:"flex",alignItems:"center",gap:6}}><Coin size={15}/><AC value={bal}/> DC</div>
          <button onClick={()=>setNotif(true)} style={{width:34,height:34,borderRadius:11,background:"rgba(255,255,255,.04)",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(255,255,255,.06)",cursor:"pointer",transition:"all 0.2s"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.08)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.04)"}><Ic.bell size={16} color="#78909C"/></button>
        </div>
      </div>

      <div style={{padding:"0 20px"}}>
        {/* HOME */}
        {v==="home"&&<div style={{animation:"fi .35s ease"}}>
          <div style={{borderRadius:20,padding:22,marginBottom:20,background:"linear-gradient(135deg,rgba(0,172,193,.1),rgba(0,105,120,.04))",border:"1px solid rgba(0,172,193,.08)"}}>
            <div style={{fontSize:13,color:"#78909C"}}>Olá, Eliandro</div>
            <div style={{fontSize:22,fontWeight:700,marginTop:4,lineHeight:1.3}}>Sua saúde na palma<br/>da mão</div>
            <div style={{fontSize:12,color:"#546E7A",marginTop:8,display:"flex",alignItems:"center",gap:6}}><div style={{width:6,height:6,borderRadius:"50%",background:"#FFD700"}}/>Plano Ouro · {bal} DocCoins</div>
          </div>

          {/* KPI Dashboard */}
          <div style={{background:"linear-gradient(135deg,rgba(0,172,193,.08),rgba(0,105,120,.03))",borderRadius:18,padding:18,marginBottom:20,border:"1px solid rgba(0,172,193,.1)"}}>
            <h4 style={{fontSize:12,fontWeight:700,color:"#4FC3F7",margin:"0 0 14px",letterSpacing:1.5,textTransform:"uppercase"}}>Métricas da Rede</h4>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div style={{background:"rgba(255,255,255,.02)",borderRadius:12,padding:12}}>
                <div style={{fontSize:28,fontWeight:800,color:"#E8EDF2",marginBottom:4}}><AC value={users} dur={2000}/></div>
                <div style={{fontSize:10,color:"#78909C"}}>Usuários Ativos</div>
              </div>
              <div style={{background:"rgba(255,255,255,.02)",borderRadius:12,padding:12}}>
                <div style={{fontSize:28,fontWeight:800,color:"#4FC3F7",marginBottom:4}}><AC value={trans} dur={2000}/></div>
                <div style={{fontSize:10,color:"#78909C"}}>Transações/mês</div>
              </div>
              <div style={{background:"rgba(255,255,255,.02)",borderRadius:12,padding:12}}>
                <div style={{fontSize:28,fontWeight:800,color:"#66BB6A",marginBottom:4}}><AC value={docs} dur={2000}/></div>
                <div style={{fontSize:10,color:"#78909C"}}>Médicos na Rede</div>
              </div>
              <div style={{background:"rgba(255,255,255,.02)",borderRadius:12,padding:12}}>
                <div style={{fontSize:28,fontWeight:800,color:"#FFD700",marginBottom:4}}>4.8<span style={{fontSize:16}}>/5</span></div>
                <div style={{fontSize:10,color:"#78909C"}}>Satisfação</div>
              </div>
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:24}}>
            {[{Ic:Ic.brain,l:"Triagem IA",c:"#7E57C2",a:()=>setTriage(true)},{Ic:Ic.stethoscope,l:"Consulta",c:"#00ACC1",a:()=>sV("search")},{Ic:Ic.clipboard,l:"Exames",c:"#7E57C2"},{Ic:Ic.zap,l:"Urgência",c:"#EF5350"}].map((a,i)=>(
              <div key={i} onClick={a.a} style={{padding:"16px 8px",borderRadius:16,textAlign:"center",background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.04)",cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=`${a.c}40`} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.04)"}>
                <div style={{display:"flex",justifyContent:"center"}}><a.Ic size={22} color={a.c}/></div>
                <div style={{fontSize:11,color:"#B0BEC5",marginTop:8,fontWeight:500}}>{a.l}</div>
              </div>
            ))}
          </div>
          <div style={{marginBottom:24}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><h3 style={{fontSize:15,fontWeight:700,margin:0}}>Especialidades</h3><span onClick={()=>sV("search")} style={{fontSize:12,color:"#4FC3F7",cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>Ver todas <Ic.chevRight size={12} color="#4FC3F7"/></span></div>
            <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:8}}>
              {SPECS.slice(0,8).map(s=>(
                <div key={s.id} onClick={()=>{sSs(s.id);sV("search")}} style={{padding:"14px 16px",borderRadius:14,minWidth:100,textAlign:"center",background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.04)",cursor:"pointer",transition:"all .2s",flexShrink:0}} onMouseEnter={e=>e.currentTarget.style.borderColor=`${s.clr}30`} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.04)"}>
                  <div style={{display:"flex",justifyContent:"center"}}><s.Ic size={22} color={s.clr}/></div>
                  <div style={{fontSize:11,color:"#B0BEC5",marginTop:8,whiteSpace:"nowrap"}}>{s.name}</div>
                  <div style={{fontSize:10,color:"#4FC3F7",marginTop:3,display:"flex",alignItems:"center",justifyContent:"center",gap:3}}><Coin size={11}/>{s.price}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Wallet */}
          <div style={{background:"linear-gradient(145deg,rgba(0,172,193,.06),rgba(0,172,193,.02))",borderRadius:20,padding:22,border:"1px solid rgba(0,172,193,.08)",marginBottom:20}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontSize:10,color:"#78909C",textTransform:"uppercase",letterSpacing:1.5,fontWeight:700}}>Saldo DocCoin</div>
                <div style={{fontSize:36,fontWeight:800,color:"#E8EDF2",marginTop:2,lineHeight:1,display:"flex",alignItems:"center",gap:8}}><AC value={bal}/><span style={{fontSize:14,color:"#4FC3F7",fontWeight:600}}>DC</span></div>
                <div style={{fontSize:12,color:"#546E7A",marginTop:4}}>≈ R$ {(bal*2.5).toFixed(2).replace(".",",")}</div>
              </div><Coin size={44}/>
            </div>
            <div style={{display:"flex",gap:10,marginTop:18}}>
              <button style={{flex:1,padding:"10px 0",borderRadius:12,background:"linear-gradient(135deg,#00ACC1,#00838F)",color:"#fff",border:"none",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6,transition:"all 0.2s"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><Ic.plus size={15} color="#fff"/>Recarregar</button>
              <button style={{flex:1,padding:"10px 0",borderRadius:12,background:"rgba(255,255,255,.04)",color:"#B0BEC5",border:"1px solid rgba(255,255,255,.06)",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6,transition:"all 0.2s"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.08)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.04)"}><Ic.exchange size={15} color="#B0BEC5"/>Converter</button>
            </div>
          </div>
          {/* Insurance */}
          <h3 style={{fontSize:15,fontWeight:700,margin:"0 0 14px"}}>Proteção Extra</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
            {[{Ic:Ic.shield,t:"Seguro Vida",d:"A partir de R$ 19,90/mês",c:"#4CAF50"},{Ic:Ic.hospital,t:"Seguro Saúde",d:"Cobertura emergencial",c:"#FF7043"}].map((ins,i)=>(
              <div key={i} style={{padding:16,borderRadius:16,background:`${ins.c}06`,border:`1px solid ${ins.c}12`,cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=`${ins.c}35`} onMouseLeave={e=>e.currentTarget.style.borderColor=`${ins.c}12`}>
                <ins.Ic size={22} color={ins.c}/><div style={{fontSize:13,fontWeight:600,color:"#E8EDF2",marginTop:10}}>{ins.t}</div><div style={{fontSize:11,color:"#78909C",marginTop:4}}>{ins.d}</div>
              </div>
            ))}
          </div>
        </div>}

        {/* SEARCH */}
        {v==="search"&&<div style={{animation:"fi .35s ease"}}>
          <h2 style={{fontSize:21,fontWeight:700,marginBottom:16,marginTop:4}}>Encontre seu médico</h2>
          <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:16,paddingBottom:4}}>
            <div onClick={()=>sSs(null)} style={{padding:"7px 14px",borderRadius:20,fontSize:12,fontWeight:600,background:!ss?"linear-gradient(135deg,#00ACC1,#00838F)":"rgba(255,255,255,.04)",color:!ss?"#fff":"#B0BEC5",border:!ss?"none":"1px solid rgba(255,255,255,.06)",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>Todos</div>
            {SPECS.map(s=><div key={s.id} onClick={()=>sSs(ss===s.id?null:s.id)} style={{padding:"7px 14px",borderRadius:20,fontSize:12,fontWeight:600,background:ss===s.id?"linear-gradient(135deg,#00ACC1,#00838F)":"rgba(255,255,255,.04)",color:ss===s.id?"#fff":"#B0BEC5",border:ss===s.id?"none":"1px solid rgba(255,255,255,.06)",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,display:"flex",alignItems:"center",gap:5}}><s.Ic size={13} color={ss===s.id?"#fff":s.clr}/>{s.name}</div>)}
          </div>
          <HMap profs={PROFS} selSpec={ss} onSel={()=>{}}/>
          <div style={{marginTop:18}}>
            <div style={{fontSize:12,color:"#546E7A",marginBottom:12}}>{(ss?PROFS.filter(p=>p.sp===ss):PROFS).length} profissionais</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>{(ss?PROFS.filter(p=>p.sp===ss):PROFS).sort((a,b)=>a.dist-b.dist).map(p=><div key={p.id}><PC pr={p} onBook={(pr)=>{sBm(pr);setTele(null)}}/>{p.avail&&<button onClick={()=>setTele(p)} style={{width:"100%",marginTop:8,padding:"8px 0",borderRadius:12,background:"rgba(0,172,193,.1)",border:"1px solid rgba(0,172,193,.2)",color:"#00ACC1",fontSize:11,fontWeight:600,cursor:"pointer",transition:"all 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,172,193,.15)";e.currentTarget.style.borderColor="rgba(0,172,193,.3)"}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(0,172,193,.1)";e.currentTarget.style.borderColor="rgba(0,172,193,.2)"}}>Teleconsulta Agora</button>}</div>)}</div>
          </div>
        </div>}

        {/* PLANS */}
        {v==="plans"&&<div style={{animation:"fi .35s ease"}}>
          <h2 style={{fontSize:21,fontWeight:700,marginTop:4,marginBottom:4}}>Planos DocCoin</h2>
          <p style={{fontSize:13,color:"#78909C",marginBottom:18,marginTop:0}}>Escolha o plano ideal</p>
          <div style={{padding:14,borderRadius:14,marginBottom:18,background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.05)"}}>
            <div style={{fontSize:12,fontWeight:600,color:"#E8EDF2",marginBottom:10,display:"flex",alignItems:"center",gap:6}}><Ic.users size={16} color="#4FC3F7"/>Plano Familiar</div>
            <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:11,color:"#78909C"}}>Membros:</span>
              {[1,2,3,4,5,6].map(n=><div key={n} onClick={()=>sFm(n)} style={{width:30,height:30,borderRadius:9,background:fm>=n?"linear-gradient(135deg,#00ACC1,#00838F)":"rgba(255,255,255,.04)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:600,cursor:"pointer",color:fm>=n?"#fff":"#546E7A",transition:"all .15s"}}>{n}</div>)}
            </div>
            {fm>1&&<div style={{fontSize:11,color:"#4FC3F7",marginTop:8}}>+{fm-1} adicional(is) · R$ {((fm-1)*49.9).toFixed(2)}/mês</div>}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {PLANS.map(pl=>{const iS=sp===pl.id;const tT=pl.tok+(fm>1?(fm-1)*Math.floor(pl.tok*.4):0);return(
              <div key={pl.id} onClick={()=>sSp(pl.id)} style={{position:"relative",borderRadius:18,padding:iS?2:0,background:iS?pl.grad:"transparent",cursor:"pointer",transition:"all .3s",transform:iS?"scale(1.02)":"scale(1)"}}>
                {pl.pop&&<div style={{position:"absolute",top:-8,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#FFD700,#FF8F00)",padding:"2px 12px",borderRadius:20,fontSize:8,fontWeight:800,color:"#000",letterSpacing:1.5,textTransform:"uppercase",zIndex:2,whiteSpace:"nowrap"}}>Mais Popular</div>}
                <div style={{background:iS?"rgba(6,13,27,.95)":"rgba(255,255,255,.025)",borderRadius:16,padding:"20px 14px",border:iS?"none":"1px solid rgba(255,255,255,.05)"}}>
                  <div style={{textAlign:"center",marginBottom:14}}>
                    <div style={{fontSize:16,fontWeight:700,color:pl.color}}>{pl.tier}</div>
                    <div style={{marginTop:8}}><span style={{fontSize:10,color:"#78909C"}}>R$ </span><span style={{fontSize:28,fontWeight:800,color:"#E8EDF2"}}>{pl.mp.toFixed(0)}</span><span style={{fontSize:10,color:"#78909C"}}>/mês</span></div>
                    <div style={{marginTop:8,padding:"5px 12px",borderRadius:10,background:`${pl.color}12`,display:"inline-flex",alignItems:"center",gap:4}}><Coin size={13}/><span style={{fontSize:14,fontWeight:700,color:pl.color}}>{tT.toLocaleString("pt-BR")}</span><span style={{fontSize:9,color:pl.color}}>DC/mês</span></div>
                  </div>
                  <div style={{borderTop:"1px solid rgba(255,255,255,.05)",paddingTop:12}}>
                    {pl.feat.map((f,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 0",fontSize:11,color:"#B0BEC5"}}><Ic.check size={12} color={pl.color}/>{f}</div>)}
                  </div>
                  <button style={{width:"100%",marginTop:14,padding:"10px 0",borderRadius:11,background:iS?pl.grad:"rgba(255,255,255,.05)",color:iS?(pl.prem?"#fff":"#000"):"#B0BEC5",border:"none",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.2s"}} onMouseEnter={e=>iS&&(e.currentTarget.style.transform="scale(1.03)")} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>{iS?"✓ Selecionado":"Escolher"}</button>
                </div>
              </div>
            )})}
          </div>
          <div style={{marginTop:22,padding:18,borderRadius:18,background:"linear-gradient(135deg,rgba(0,172,193,.06),rgba(0,172,193,.02))",border:"1px solid rgba(0,172,193,.08)"}}>
            <div style={{fontSize:14,fontWeight:700,marginBottom:4,display:"flex",alignItems:"center",gap:6}}><Ic.zap size={16} color="#FF7043"/>Recarga Avulsa</div>
            <div style={{fontSize:12,color:"#78909C",marginBottom:12}}>Recarregue a qualquer momento</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
              {[{t:50,p:"R$ 125"},{t:100,p:"R$ 235"},{t:200,p:"R$ 440"}].map((r,i)=>(
                <div key={i} onClick={()=>{sBal(b=>b+r.t);sT(`+${r.t} DC adicionados`)}} style={{padding:"10px 6px",borderRadius:12,textAlign:"center",background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.05)",cursor:"pointer",transition:"all .15s"}} onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(0,172,193,.25)"} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.05)"}>
                  <div style={{fontSize:16,fontWeight:700,color:"#4FC3F7",display:"flex",alignItems:"center",justifyContent:"center",gap:3}}><Coin size={14}/>{r.t}</div>
                  <div style={{fontSize:12,fontWeight:600,color:"#E8EDF2",marginTop:6}}>{r.p}</div>
                </div>
              ))}
            </div>
          </div>
        </div>}

        {/* WALLET */}
        {v==="wallet"&&<div style={{animation:"fi .35s ease"}}>
          <h2 style={{fontSize:21,fontWeight:700,marginTop:4,marginBottom:16}}>Minha Carteira</h2>
          <div style={{background:"linear-gradient(145deg,rgba(0,172,193,.06),rgba(0,172,193,.02))",borderRadius:20,padding:22,border:"1px solid rgba(0,172,193,.08)",marginBottom:18}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div><div style={{fontSize:10,color:"#78909C",textTransform:"uppercase",letterSpacing:1.5,fontWeight:700}}>Saldo DocCoin</div><div style={{fontSize:36,fontWeight:800,color:"#E8EDF2",marginTop:2,lineHeight:1}}><AC value={bal}/> <span style={{fontSize:14,color:"#4FC3F7"}}>DC</span></div><div style={{fontSize:12,color:"#546E7A",marginTop:4}}>≈ R$ {(bal*2.5).toFixed(2).replace(".",",")}</div></div><Coin size={44}/>
            </div>
          </div>
          <div style={{padding:18,borderRadius:18,background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.05)",marginBottom:18}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:14}}>Sobre o DocCoin (DC)</div>
            {[["Cotação","1 DC = R$ 2,50"],["Validade","Sem expiração*"],["Conversão","Até 2 dias úteis"],["Transferência","Entre familiares"]].map(([l,vl],i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:i<3?"1px solid rgba(255,255,255,.03)":"none"}}><span style={{fontSize:12,color:"#78909C"}}>{l}</span><span style={{fontSize:12,color:"#E8EDF2",fontWeight:600}}>{vl}</span></div>
            ))}
          </div>
          <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>Histórico</div>
          {[{d:"Recarga mensal — Plano Ouro",a:"+700 DC",dt:"01/04",pos:true},{d:"Consulta — Dra. Ana Silva",a:"-15 DC",dt:"28/03",pos:false},{d:"Consulta — Dr. Felipe Rocha",a:"-22 DC",dt:"22/03",pos:false},{d:"Recarga avulsa",a:"+50 DC",dt:"15/03",pos:true}].map((tx,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderBottom:"1px solid rgba(255,255,255,.03)"}}>
              <div><div style={{fontSize:13,color:"#E8EDF2"}}>{tx.d}</div><div style={{fontSize:10,color:"#546E7A",marginTop:2}}>{tx.dt}/2026</div></div>
              <span style={{fontSize:14,fontWeight:700,color:tx.pos?"#4CAF50":"#EF5350"}}>{tx.a}</span>
            </div>
          ))}
          <div style={{marginTop:18,padding:14,borderRadius:14,background:"rgba(76,175,80,.05)",border:"1px solid rgba(76,175,80,.1)"}}>
            <div style={{fontSize:12,fontWeight:700,color:"#4CAF50",marginBottom:4,display:"flex",alignItems:"center",gap:6}}><Ic.shield size={14} color="#4CAF50"/>Liquidez Garantida</div>
            <div style={{fontSize:11,color:"#78909C",lineHeight:1.5}}>Profissionais convertem DC em reais com depósito em até 2 dias úteis.</div>
          </div>
        </div>}

        {/* PROFILE */}
        {v==="profile"&&<div style={{animation:"fi .35s ease"}}>
          <div style={{textAlign:"center",paddingTop:20,marginBottom:24}}>
            <div style={{width:72,height:72,borderRadius:22,margin:"0 auto",background:"linear-gradient(135deg,#00ACC1,#006064)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:700,color:"#fff"}}>E</div>
            <div style={{fontSize:19,fontWeight:700,marginTop:12}}>Eliandro</div>
            <div style={{fontSize:12,color:"#78909C",display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:4}}><div style={{width:6,height:6,borderRadius:"50%",background:"#FFD700"}}/>Plano Ouro · Desde 2026</div>
          </div>

          {/* Health Metrics */}
          <h4 style={{fontSize:12,fontWeight:700,color:"#4FC3F7",margin:"0 0 12px",letterSpacing:1.5,textTransform:"uppercase"}}>Métricas de Saúde</h4>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
            {[{l:"Frequência Cardíaca",v:"72 bpm",u:"↓ -2",c:"#EF5350"},{l:"Passos",v:"8,421",u:"↑ +12%",c:"#66BB6A"},{l:"Qualidade do Sono",v:"7h 24m",u:"↑ +18min",c:"#7E57C2"},{l:"Calorias",v:"1.842",u:"↓ -156",c:"#FFA726"}].map((m,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,.02)",borderRadius:12,padding:12}}>
                <div style={{fontSize:11,color:"#78909C"}}>{m.l}</div>
                <div style={{fontSize:20,fontWeight:700,color:m.c,marginTop:6}}>{m.v}</div>
                <div style={{fontSize:10,color:"#4FC3F7",marginTop:4}}>{m.u}</div>
              </div>
            ))}
          </div>

          <h4 style={{fontSize:12,fontWeight:700,color:"#4FC3F7",margin:"0 0 12px",letterSpacing:1.5,textTransform:"uppercase"}}>Próximos Compromissos</h4>
          <div style={{background:"rgba(0,172,193,.05)",borderRadius:14,padding:14,marginBottom:20,border:"1px solid rgba(0,172,193,.1)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:44,height:44,borderRadius:12,background:"linear-gradient(135deg,#FFD700,#FFA726)",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic.calendar size={20} color="#fff"/></div>
              <div><div style={{fontSize:13,fontWeight:600,color:"#E8EDF2"}}>Consulta - Dra. Ana Silva</div><div style={{fontSize:11,color:"#78909C",marginTop:2}}>Quarta-feira, 16 de abril · 14:00</div></div>
            </div>
          </div>

          {[{Ic:Ic.user,l:"Dados Pessoais"},{Ic:Ic.users,l:"Grupo Familiar"},{Ic:Ic.calendar,l:"Minhas Consultas"},{Ic:Ic.shield,l:"Seguros Contratados"},{Ic:Ic.fileText,l:"Prontuário Digital"},{Ic:Ic.bell,l:"Notificações"},{Ic:Ic.lock,l:"Privacidade (LGPD)"},{Ic:Ic.helpCircle,l:"Central de Ajuda"}].map((item,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"13px 14px",borderRadius:12,cursor:"pointer",transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.03)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <item.Ic size={18} color="#78909C"/><span style={{fontSize:14,color:"#E8EDF2",flex:1}}>{item.l}</span><Ic.chevRight size={14} color="#546E7A"/>
            </div>
          ))}
        </div>}
      </div>

      {/* Bottom Nav */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,padding:"8px 16px 12px",background:"linear-gradient(180deg,transparent,rgba(6,13,27,.95) 30%,#060D1B)",display:"flex",justifyContent:"space-around",zIndex:100,backdropFilter:"blur(20px)"}}>
        {nav.map(n=>(
          <div key={n.id} onClick={()=>sV(n.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",padding:"6px 12px",borderRadius:12,opacity:v===n.id?1:.45,transition:"all .2s"}}>
            <n.Ic size={20} color={v===n.id?"#4FC3F7":"#78909C"}/><span style={{fontSize:10,fontWeight:v===n.id?700:500,color:v===n.id?"#4FC3F7":"#78909C"}}>{n.l}</span>
            {v===n.id&&<div style={{width:4,height:4,borderRadius:"50%",background:"#4FC3F7"}}/>}
          </div>
        ))}
      </div>
      {bm&&<BM pr={bm} onClose={()=>sBm(null)} bal={bal} onOk={cB}/>}
      {tele&&<TeleModal pr={tele} onClose={()=>setTele(null)}/>}
      {triage&&<TriageModal onClose={()=>setTriage(false)}/>}
      {notif&&<NotifSlide onClose={()=>setNotif(false)}/>}
      {toast&&<Toast msg={toast} onDone={()=>sT(null)}/>}
    </div>
  );
}
