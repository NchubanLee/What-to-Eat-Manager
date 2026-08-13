import {add,defaultFreshnessDays,iso,recipes,type ExpirySource,type Kind,type StorageMode} from "./data";

export type VoiceDraft={name:string;ingredientId:string;kind:Kind;grams:number;storage:StorageMode;purchased:string;productionDate?:string;shelfLifeDays?:number;explicitExpiry?:string;expires:string;expirySource:ExpirySource;transcript:string};
const aliases:Record<string,string>={"\u897f\u84dd\u82b1":"\u897f\u5170\u82b1","\u8611\u83c7":"\u767d\u8611\u83c7","\u9e21\u817f":"\u9e21\u817f\u8089","\u867e":"\u9c9c\u867e","\u725b\u8089":"\u725b\u8169","\u9c7c":"\u9c88\u9c7c"};
const catalog=new Map(recipes.flatMap(r=>r.ingredients).map(x=>[x.name,x]));
const cn:Record<string,number>={"\u96f6":0,"\u4e00":1,"\u4e8c":2,"\u4e24":2,"\u4e09":3,"\u56db":4,"\u4e94":5,"\u516d":6,"\u4e03":7,"\u516b":8,"\u4e5d":9,"\u5341":10};
function number(v:string){if(/^\d+$/.test(v))return +v;if(v.includes("\u5341")){const[a,b]=v.split("\u5341");return(a?cn[a]:1)*10+(b?cn[b]:0)}return cn[v]??0}
function dateFrom(text:string,now=new Date()){const full=text.match(/(20\d{2})[\u5e74\/.-](\d{1,2})[\u6708\/.-](\d{1,2})\u65e5?/);if(full)return iso(new Date(+full[1],+full[2]-1,+full[3]));const md=text.match(/(\d{1,2})\u6708(\d{1,2})[\u53f7\u65e5]/);if(md)return iso(new Date(now.getFullYear(),+md[1]-1,+md[2]));if(text.includes("\u4eca\u5929"))return iso(now);if(text.includes("\u6628\u5929"))return add(iso(now),-1);if(text.includes("\u524d\u5929"))return add(iso(now),-2)}
export function parseVoice(text:string):VoiceDraft{
 const normalized=Object.entries(aliases).reduce((s,[a,b])=>s.replaceAll(a,b),text.trim());
 const hit=[...catalog.keys()].sort((a,b)=>b.length-a.length).find(n=>normalized.includes(n));
 const name=hit||normalized.match(/^([\u4e00-\u9fa5]{1,8}?)(?=\d|[\u4e00\u4e8c\u4e24\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341]|\uff0c|,|$)/)?.[1]||"\u65b0\u98df\u6750",item=catalog.get(name);
 const weight=normalized.match(/(\d+(?:\.\d+)?|[\u4e00\u4e8c\u4e24\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341]+)\s*(\u516c\u65a4|\u5343\u514b|\u65a4|\u514b|g)/i);let grams=300;if(weight){const n=/^\d/.test(weight[1])?+weight[1]:number(weight[1]);grams=weight[2]==="\u65a4"?n*500:["\u516c\u65a4","\u5343\u514b"].includes(weight[2])?n*1000:n}
 const storage:StorageMode=normalized.includes("\u51b7\u51bb")?"\u51b7\u51bb":normalized.includes("\u5e38\u6e29")?"\u5e38\u6e29":"\u51b7\u85cf",kind:Kind=item?.kind||(normalized.match(/[\u8089\u9c7c\u867e]|\u6392\u9aa8|\u9e21|\u725b|\u732a/)?"meat":"veg");
 const expiryPart=normalized.match(/(?:\u5230\u671f\u65e5|\u6709\u6548\u671f\u81f3|\u4fdd\u8d28\u5230)[\u662f\u4e3a]?([^\uff0c,]+)/)?.[1],explicitExpiry=expiryPart?dateFrom(expiryPart):undefined;
 const productionPart=normalized.match(/(?:\u751f\u4ea7\u65e5\u671f|\u751f\u4ea7\u65e5)[\u662f\u4e3a]?([^\uff0c,]+)/)?.[1],productionDate=productionPart?dateFrom(productionPart):undefined;
 const shelf=normalized.match(/\u4fdd\u8d28\u671f(?:\u662f|\u4e3a)?\s*(\d+|[\u4e00\u4e8c\u4e24\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341]+)\s*(\u5929|\u65e5|\u4e2a\u6708|\u6708)/),shelfLifeDays=shelf?number(shelf[1])*(shelf[2].includes("\u6708")?30:1):undefined;
 const purchased=iso(),expirySource:ExpirySource=explicitExpiry?"explicit-expiry":productionDate&&shelfLifeDays?"production-plus-shelf-life":"default-freshness";
 const expires=explicitExpiry||(productionDate&&shelfLifeDays?add(productionDate,shelfLifeDays):add(productionDate||purchased,defaultFreshnessDays(name,kind,storage)));
 return{name,ingredientId:item?.id||`custom-${name}`,kind,grams,storage,purchased,productionDate,shelfLifeDays,explicitExpiry,expires,expirySource,transcript:text};
}
