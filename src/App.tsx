import {Icon} from "@iconify/react";
import {Navigate,Route,Routes,useLocation,useNavigate,useParams} from "react-router-dom";
import {useEffect,useMemo,useState} from "react";
import {Lang,langs,t} from "./i18n";

const G={
  org:"https://github.com/FarsioIR",
  nev:"https://github.com/AmirMotefaker/Farsi-Smart-Assistant",
  nevRelease:"https://github.com/AmirMotefaker/Farsi-Smart-Assistant/releases/tag/v4.9.1",
  ava:"https://github.com/AmirMotefaker/farsismart-listen"
};
const ok=(v?:string):v is Lang=>langs.some(x=>x.code===v);
const langNow=()=>{const {lang}=useParams();return ok(lang)?lang:"fa"};
const path=(l:Lang,s="")=>`/${l}${s}`;

function Logo(){
 return <div className="logo"><b>F</b><span><strong>Farsio</strong><small>فارسیو</small></span></div>
}
function Header(){
 const l=langNow(), nav=useNavigate(), loc=useLocation();
 const [theme,setTheme]=useState(localStorage.getItem("farsio-theme")||"dark");
 const [open,setOpen]=useState(false);
 useEffect(()=>{document.documentElement.dataset.theme=theme;localStorage.setItem("farsio-theme",theme)},[theme]);
 const change=(n:Lang)=>{const parts=loc.pathname.split("/").filter(Boolean);if(ok(parts[0]))parts.shift();nav(`/${n}/${parts.join("/")}`);setOpen(false)};
 return <header><div className="shell bar">
   <button className="brandbtn" onClick={()=>nav(path(l))}><Logo/></button>
   <nav><a href={path(l,"/#products")}>{t(l,"navProducts")}</a><button onClick={()=>nav(path(l,"/docs"))}>{t(l,"navDocs")}</button><button onClick={()=>nav(path(l,"/about"))}>{t(l,"navAbout")}</button></nav>
   <div className="actions">
    <a className="iconbtn" href={G.org} target="_blank"><Icon icon="mdi:github"/></a>
    <button className="iconbtn" onClick={()=>setTheme(theme==="dark"?"light":"dark")}><Icon icon={theme==="dark"?"solar:sun-2-bold":"solar:moon-bold"}/></button>
    <div className="lang"><button onClick={()=>setOpen(!open)}><Icon icon="solar:global-bold"/><span>{langs.find(x=>x.code===l)!.label}</span></button>
    {open&&<div className="langs">{langs.map(x=><button key={x.code} className={x.code===l?"active":""} onClick={()=>change(x.code)}>{x.label}{x.code===l&&<Icon icon="solar:check-circle-bold"/>}</button>)}</div>}</div>
   </div>
 </div></header>
}
function Mock({kind}:{kind:"write"|"listen"}){
 return <div className={`mock ${kind}`}><div className="mocktop"><i/><i/><i/></div>
 {kind==="write"?<div className="writeui"><span/><span/><em>سلام 👋</em><span/></div>:
 <div className="listenui"><div className="wave">{Array.from({length:18}).map((_,i)=><i key={i} style={{height:`${10+((i*13)%28)}px`}}/>)}</div><b>فارسی، شنیدنی‌تر.</b><button><Icon icon="solar:play-bold"/></button></div>}</div>
}
function Hero({l}:{l:Lang}){
 return <section className="shell hero">
  <div className="herocopy"><span className="eyebrow">● Farsio · فارسیو</span><h1>{t(l,"hero")}</h1><p>{t(l,"sub")}</p>
   <div className="ctas"><a className="primary" href={path(l,"/#products")}><Icon icon="solar:widget-5-bold"/>{t(l,"explore")}</a><a className="secondary" href={G.org} target="_blank"><Icon icon="mdi:github"/>{t(l,"github")}</a></div>
   <div className="trust"><span>Privacy-minded</span><span>Open source</span><span>FA · EN · TR</span></div>
  </div>
  <div className="visual"><div className="glow a"/><div className="glow b"/><div className="card one"><Mock kind="write"/></div><div className="card two"><Mock kind="listen"/></div><span className="chip c1">نوشت‌یار</span><span className="chip c2">آوا</span></div>
 </section>
}
function Product({l,ava=false}:{l:Lang;ava?:boolean}){
 const name=t(l,ava?"ava":"nev"), tag=t(l,ava?"avaTag":"nevTag"), body=t(l,ava?"avaBody":"nevBody");
 return <article className="product"><div className="protop"><span className="proicon"><Icon icon={ava?"solar:headphones-round-sound-bold":"solar:pen-new-square-bold"}/></span><small>{t(l,ava?"dev":"public")}</small></div>
  <h3>{name}</h3><strong>{tag}</strong><p>{body}</p><Mock kind={ava?"listen":"write"}/>
  <div className="links"><a href={path(l,ava?"/products/ava":"/products/neveshtyar")}>{t(l,"view")}<Icon icon="solar:arrow-right-up-linear"/></a><a href={ava?G.ava:G.nev} target="_blank"><Icon icon="mdi:github"/>GitHub</a></div>
 </article>
}
function Home(){
 const l=langNow(), icons=["solar:language-bold","solar:bolt-bold","solar:shield-check-bold","solar:code-square-bold","solar:global-bold","solar:layers-bold"];
 return <><Hero l={l}/><section id="products" className="shell section"><div className="heading"><span>{t(l,"products")}</span><h2>{t(l,"productsTitle")}</h2></div><div className="products"><Product l={l}/><Product l={l} ava/></div></section>
 <section className="shell section"><div className="heading"><span>Farsio principles</span><h2>{t(l,"why")}</h2></div><div className="features">{[1,2,3,4,5,6].map((n,i)=><article key={n}><Icon icon={icons[i]}/><h3>{t(l,`f${n}`)}</h3><p>{t(l,`b${n}`)}</p></article>)}</div></section>
 <section className="shell docscta"><div><span className="eyebrow">Help Center</span><h2>{t(l,"docsTitle")}</h2><p>{t(l,"docsBody")}</p></div><a className="primary" href={path(l,"/docs")}>{t(l,"openDocs")}<Icon icon="solar:arrow-right-up-linear"/></a></section></>
}
function ProductPage({ava=false}:{ava?:boolean}){
 const l=langNow();return <main className="shell page"><span className="proicon xl"><Icon icon={ava?"solar:headphones-round-sound-bold":"solar:pen-new-square-bold"}/></span><small className="badge">{t(l,ava?"dev":"public")}</small><h1>{t(l,ava?"ava":"nev")}</h1><h2>{t(l,ava?"avaTag":"nevTag")}</h2><p className="lead">{t(l,ava?"avaBody":"nevBody")}</p><div className="ctas">{!ava&&<a className="primary" href={G.nevRelease} target="_blank"><Icon icon="solar:download-bold"/>v4.9.1</a>}<a className="secondary" href={ava?G.ava:G.nev} target="_blank"><Icon icon="mdi:github"/>GitHub</a></div><div className="bigmock"><Mock kind={ava?"listen":"write"}/></div></main>
}
function Docs(){
 const l=langNow(), items=useMemo(()=>[["d1","db1","solar:home-2-bold"],["d2","db2","solar:download-bold"],["d3","db3","solar:headphones-round-sound-bold"],["d4","db4","solar:shield-check-bold"],["d5","db5","solar:question-circle-bold"]] as const,[]);
 const [active,setActive]=useState(0);
 return <main className="shell docslayout"><aside><b>Farsio Docs</b>{items.map((x,i)=><button className={active===i?"active":""} onClick={()=>setActive(i)} key={x[0]}><Icon icon={x[2]}/>{t(l,x[0])}</button>)}</aside><article><span className="eyebrow">Documentation</span><h1>{t(l,items[active][0])}</h1><p>{t(l,items[active][1])}</p>{active===1&&<div className="callout"><Icon icon="solar:verified-check-bold"/><div><b>Farsi Smart Assistant v4.9.1</b><a href={G.nevRelease} target="_blank">GitHub Release</a></div></div>}</article></main>
}
function About(){
 const l=langNow();return <main className="shell page narrow"><span className="eyebrow">Farsio · فارسیو</span><h1>{t(l,"aboutTitle")}</h1><p className="lead">{t(l,"aboutBody")}</p><div className="about"><div><b>نوشت‌یار</b><span>Writing intelligence</span></div><div><b>آوا</b><span>Listening intelligence</span></div></div></main>
}
function Footer(){
 const l=langNow();return <footer><div className="shell foot"><div><Logo/><p>Built for Persian speakers.</p></div><div><b>{t(l,"navProducts")}</b><a href={path(l,"/products/neveshtyar")}>نوشت‌یار</a><a href={path(l,"/products/ava")}>آوا</a></div><div><b>Project</b><a href={G.org} target="_blank">GitHub</a><a href={path(l,"/docs")}>{t(l,"navDocs")}</a></div><div><b>Farsio</b><a href={path(l,"/about")}>{t(l,"navAbout")}</a><a href="mailto:hello@farsio.ir">hello@farsio.ir</a></div></div><div className="shell copyright">© 2026 Farsio.ir · فارسیو</div></footer>
}
function Layout(){
 const l=langNow();useEffect(()=>{const m=langs.find(x=>x.code===l)!;document.documentElement.lang=l;document.documentElement.dir=m.dir;document.title=l==="fa"?"فارسیو | ابزارهای هوشمند برای فارسی":"Farsio | Persian-first intelligent tools"},[l]);
 return <><Header/><Routes><Route index element={<Home/>}/><Route path="products/neveshtyar" element={<ProductPage/>}/><Route path="products/ava" element={<ProductPage ava/>}/><Route path="docs" element={<Docs/>}/><Route path="about" element={<About/>}/><Route path="*" element={<Navigate to={`/${l}`} replace/>}/></Routes><Footer/></>
}
export default function App(){return <Routes><Route path="/" element={<Navigate to="/fa" replace/>}/><Route path="/:lang/*" element={<Layout/>}/></Routes>}
