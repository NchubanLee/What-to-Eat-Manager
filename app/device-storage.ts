import {KEY,createInitial,migrateState,type State} from "./data";

export interface DeviceStore { load():Promise<State>; save(state:State):Promise<void>; clear():Promise<void> }

class BrowserDeviceStore implements DeviceStore{
 async load(){try{return migrateState(JSON.parse(localStorage.getItem(KEY)||"null"))}catch{return createInitial()}}
 async save(state:State){localStorage.setItem(KEY,JSON.stringify(state))}
 async clear(){localStorage.removeItem(KEY)}
}

// iOS 只需在这里接入 SQLite/Core Data，业务组件无需改变。
export const deviceStore:DeviceStore=new BrowserDeviceStore();
