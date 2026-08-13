export type View = "home" | "plan" | "recipes" | "stock";
export type Kind = "meat" | "veg";
export type Ingredient = { id: string; name: string; grams: number; kind: Kind };
export type Recipe = { id: string; name: string; kind: Kind; source: "Bryan Johnson" | "泡厨房的顾小胖"; link: string; protein?: string; minutes: number; method: string; spice: string; color: string; ingredients: Ingredient[]; extras: string[] };
export type Meal = { id: string; date: string; recipeIds: string[]; done: boolean };
export type StorageMode = "冷藏" | "冷冻" | "常温";
export type ExpirySource = "explicit-expiry" | "production-plus-shelf-life" | "default-freshness" | "manual";
export type Batch = { id: string; ingredientId: string; name: string; kind: Kind; grams: number; storage: StorageMode; purchased: string; productionDate?: string; shelfLifeDays?: number; expires: string; expirySource: ExpirySource; transcript?: string; transcriptionEngine?: "whisper-web" | "whisper-ios" | "manual"; createdAt: string; updatedAt: string };
export type Usage = { mealId: string; amounts: Record<string, number>; deductions: { batchId: string; grams: number }[] };
export type State = { version: 2; start: string; meals: Meal[]; stock: Batch[]; usage: Usage[] };
export const DAY = 86400000;
export const KEY = "shiwei-meal-planner-v1";
export const STATE_VERSION = 2;
const bryan = "https://blueprint.bryanjohnson.com/blogs/news/blueprint-recipes";
const gu = "https://space.bilibili.com/474803476/video";
const I = (id: string, name: string, grams: number, kind: Kind): Ingredient => ({ id, name, grams, kind });
const R = (id: string, name: string, kind: Kind, source: Recipe["source"], protein: string | undefined, minutes: number, method: string, spice: string, color: string, ingredients: Ingredient[], extras: string[]): Recipe => ({ id, name, kind, source, protein, minutes, method, spice, color, ingredients, extras, link: source === "Bryan Johnson" ? bryan : gu });
export const recipes: Recipe[] = [
 R("chicken","土豆烧鸡块","meat","泡厨房的顾小胖","鸡肉",35,"一锅焖","微辣","#d58a66",[I("chicken-thigh","鸡腿肉",420,"meat"),I("potato","土豆",320,"veg"),I("pepper","彩椒",100,"veg")],["生抽","八角","姜"]),
 R("beef-stew","番茄炖牛腩","meat","泡厨房的顾小胖","牛肉",75,"慢炖","清淡","#c9604d",[I("beef","牛腩",450,"meat"),I("tomato","番茄",500,"veg"),I("onion","洋葱",120,"veg")],["番茄膏","香叶"]),
 R("fish","葱姜蒸鲈鱼","meat","泡厨房的顾小胖","鱼类",22,"清蒸","清淡","#66968f",[I("fish","鲈鱼",500,"meat"),I("scallion","小葱",35,"veg")],["姜","蒸鱼豉油"]),
 R("shrimp","蒜香粉丝虾","meat","泡厨房的顾小胖","虾类",25,"蒸","微辣","#df9a5f",[I("shrimp","鲜虾",420,"meat"),I("enoki","金针菇",180,"veg"),I("scallion","小葱",25,"veg")],["粉丝","蒜"]),
 R("pork","青椒肉丝","meat","泡厨房的顾小胖","猪肉",18,"快炒","微辣","#819b66",[I("pork","猪里脊",320,"meat"),I("green-pepper","青椒",260,"veg")],["淀粉","料酒"]),
 R("beef-water","家常水煮肥牛","meat","泡厨房的顾小胖","牛肉",28,"水煮","香辣","#b95f50",[I("fat-beef","肥牛卷",400,"meat"),I("lettuce","生菜",240,"veg"),I("sprout","豆芽",200,"veg")],["豆瓣酱","花椒"]),
 R("teriyaki","照烧鸡腿","meat","泡厨房的顾小胖","鸡肉",26,"煎焖","清淡","#b9885d",[I("chicken-thigh","鸡腿肉",460,"meat"),I("broccoli","西兰花",200,"veg")],["蜂蜜","味醂"]),
 R("ribs","玉米蒸排骨","meat","泡厨房的顾小胖","猪肉",45,"清蒸","清淡","#cda251",[I("ribs","猪肋排",480,"meat"),I("corn","甜玉米",260,"veg")],["豆豉","蒜"]),
 R("beef-pepper","黑椒牛肉一锅出","meat","泡厨房的顾小胖","牛肉",25,"一锅出","微辣","#826e61",[I("beef-slice","牛肉片",380,"meat"),I("onion","洋葱",180,"veg"),I("pepper","彩椒",160,"veg")],["黑胡椒","蚝油"]),
 R("sour-fish","酸汤鱼片","meat","泡厨房的顾小胖","鱼类",30,"煮","微辣","#c2a350",[I("fish-fillet","鱼片",420,"meat"),I("napa","娃娃菜",260,"veg"),I("mushroom","白蘑菇",120,"veg")],["黄椒酱","高汤"]),
 R("super","Super Veggie","veg","Bryan Johnson",undefined,32,"煮 / 蒸","清淡","#597c5e",[I("broccoli","西兰花",300,"veg"),I("cauliflower","花椰菜",220,"veg"),I("mushroom","白蘑菇",100,"veg")],["黑扁豆","孜然","青柠"]),
 R("buddha","彩蔬佛陀碗","veg","Bryan Johnson",undefined,48,"烤 / 拌","清淡","#ad794d",[I("sweet-potato","红薯",360,"veg"),I("kale","羽衣甘蓝",160,"veg"),I("carrot","胡萝卜",180,"veg"),I("pepper","彩椒",180,"veg")],["白豆","核桃","柠檬"]),
 R("stirfry","花椰菜饭彩蔬炒","veg","Bryan Johnson",undefined,24,"快炒","清淡","#806f5e",[I("cauliflower","花椰菜",420,"veg"),I("cabbage","紫甘蓝",160,"veg"),I("mushroom","香菇",180,"veg"),I("snap-pea","荷兰豆",140,"veg")],["低钠酱油","姜"]),
 R("lentil","柠檬红扁豆汤","veg","Bryan Johnson",undefined,38,"炖煮","清淡","#bc914c",[I("carrot","胡萝卜",260,"veg"),I("celery","西芹",160,"veg"),I("onion","洋葱",140,"veg")],["红扁豆","柠檬"]),
 R("chickpea","甜椒鹰嘴豆炖菜","veg","Bryan Johnson",undefined,30,"炖煮","微辣","#b97455",[I("pepper","甜椒",260,"veg"),I("tomato","番茄",320,"veg"),I("onion","洋葱",120,"veg")],["鹰嘴豆","孜然"]),
 R("bean","亚洲高密度豆沙拉","veg","Bryan Johnson",undefined,18,"凉拌","清淡","#6b886c",[I("cabbage","卷心菜",280,"veg"),I("carrot","胡萝卜",180,"veg"),I("scallion","小葱",45,"veg")],["鹰嘴豆","白芸豆","味噌"]),
 R("squash","苹果胡萝卜南瓜汤","veg","Bryan Johnson",undefined,46,"烤 / 搅打","清淡","#ca8d4e",[I("butternut","奶油南瓜",520,"veg"),I("carrot","胡萝卜",180,"veg"),I("onion","洋葱",120,"veg")],["苹果","椰奶"])
];
export const recipeMap = new Map(recipes.map(r=>[r.id,r]));
const templates=[["fish","pork","super"],["shrimp","teriyaki","bean"],["beef-stew","sour-fish","stirfry"],["ribs","chicken","lentil"],["shrimp","beef-pepper","buddha"],["pork","fish","chickpea"],["teriyaki","beef-water","super"],["ribs","sour-fish","squash"]];
const offsets=[0,2,4,6,7,9,11,13];
export function iso(value:Date|number=new Date()){const d=new Date(value);return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10)}
export function add(date:string,days:number){return iso(new Date(`${date}T12:00:00`).getTime()+days*DAY)}
export function makeMeals(start:string):Meal[]{return offsets.map((n,i)=>({id:`meal-${i}`,date:add(start,n),recipeIds:[...templates[i]],done:false}))}
function initialStock(today:string):Batch[]{return[
 {id:"b1",ingredientId:"chicken-thigh",name:"鸡腿肉",kind:"meat",grams:700,storage:"冷冻",purchased:add(today,-2),expires:add(today,28),expirySource:"default-freshness",createdAt:today,updatedAt:today},
 {id:"b2",ingredientId:"broccoli",name:"西兰花",kind:"veg",grams:520,storage:"冷藏",purchased:add(today,-2),expires:add(today,2),expirySource:"default-freshness",createdAt:today,updatedAt:today},
 {id:"b3",ingredientId:"carrot",name:"胡萝卜",kind:"veg",grams:650,storage:"冷藏",purchased:add(today,-4),expires:add(today,7),expirySource:"default-freshness",createdAt:today,updatedAt:today},
 {id:"b4",ingredientId:"fish",name:"鲈鱼",kind:"meat",grams:500,storage:"冷藏",purchased:today,expires:add(today,1),expirySource:"default-freshness",createdAt:today,updatedAt:today},
 {id:"b5",ingredientId:"onion",name:"洋葱",kind:"veg",grams:900,storage:"常温",purchased:add(today,-5),expires:add(today,12),expirySource:"default-freshness",createdAt:today,updatedAt:today},
 {id:"b6",ingredientId:"mushroom",name:"白蘑菇",kind:"veg",grams:260,storage:"冷藏",purchased:add(today,-3),expires:add(today,-1),expirySource:"default-freshness",createdAt:today,updatedAt:today}]}
export function createInitial():State{const today=iso();return{version:STATE_VERSION,start:today,meals:makeMeals(today),stock:initialStock(today),usage:[]}}
export function migrateState(value:unknown):State{const fallback=createInitial();if(!value||typeof value!=="object")return fallback;const old=value as Partial<State>&{stock?:Partial<Batch>[]};return{version:STATE_VERSION,start:old.start||fallback.start,meals:Array.isArray(old.meals)?old.meals:fallback.meals,usage:Array.isArray(old.usage)?old.usage:[],stock:Array.isArray(old.stock)?old.stock.map((b,i)=>{const now=iso();return{id:b.id||`migrated-${i}`,ingredientId:b.ingredientId||`custom-${i}`,name:b.name||"未命名食材",kind:b.kind||"veg",grams:Number(b.grams)||0,storage:b.storage||"冷藏",purchased:b.purchased||now,productionDate:b.productionDate,shelfLifeDays:b.shelfLifeDays,expires:b.expires||expiry(b.purchased||now,b.kind||"veg",b.storage||"冷藏",b.name),expirySource:b.expirySource||"default-freshness",transcript:b.transcript,transcriptionEngine:b.transcriptionEngine,createdAt:b.createdAt||now,updatedAt:b.updatedAt||now}}):fallback.stock}}
export function aggregate(ids:string[]){const map=new Map<string,Ingredient>();ids.forEach(id=>recipeMap.get(id)?.ingredients.forEach(x=>map.set(x.id,{...x,grams:(map.get(x.id)?.grams||0)+x.grams})));return[...map.values()]}
export function fresh(expires:string){const d=Math.ceil((new Date(`${expires}T12:00:00`).getTime()-new Date(`${iso()}T12:00:00`).getTime())/DAY);return d<0?{cls:"bad",text:`已过期 ${-d} 天`,days:d}:d<=2?{cls:"warn",text:d===0?"今天到期":`剩 ${d} 天`,days:d}:{cls:"good",text:`剩 ${d} 天`,days:d}}
const freshnessDays:Record<string,Partial<Record<StorageMode,number>>>={"鲜虾":{"冷藏":1,"冷冻":60},"鲈鱼":{"冷藏":1,"冷冻":60},"鱼片":{"冷藏":1,"冷冻":60},"白蘑菇":{"冷藏":4},"香菇":{"冷藏":5},"金针菇":{"冷藏":5},"生菜":{"冷藏":4},"豆芽":{"冷藏":2},"西兰花":{"冷藏":5},"羽衣甘蓝":{"冷藏":5},"小葱":{"冷藏":6},"鸡腿肉":{"冷藏":2,"冷冻":90},"牛腩":{"冷藏":3,"冷冻":90},"猪里脊":{"冷藏":3,"冷冻":90},"猪肋排":{"冷藏":3,"冷冻":90}};
export function defaultFreshnessDays(name:string,kind:Kind,storage:StorageMode){return freshnessDays[name]?.[storage]??(storage==="冷冻"?(kind==="meat"?90:30):storage==="常温"?10:kind==="meat"?2:5)}
export function expiry(base:string,kind:Kind,storage:StorageMode,name=""){return add(base,defaultFreshnessDays(name,kind,storage))}
export const expirySourceText:Record<ExpirySource,string>={"explicit-expiry":"包装到期日","production-plus-shelf-life":"生产日 + 保质期","default-freshness":"食材默认新鲜期","manual":"手动修正"};
export function format(date:string){return new Date(`${date}T12:00:00`).toLocaleDateString("zh-CN",{month:"short",day:"numeric",weekday:"short"})}
