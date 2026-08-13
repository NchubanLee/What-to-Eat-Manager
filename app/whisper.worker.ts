/// <reference lib="webworker" />
import {env,pipeline} from "@huggingface/transformers";
env.allowLocalModels=false;
env.useBrowserCache=true;
let transcriber:Promise<any>|null=null;
self.onmessage=async(event:MessageEvent<{audio:Float32Array}>)=>{
 try{
  self.postMessage({type:"status",message:"首次使用正在下载离线模型，之后可断网使用…"});
  transcriber??=pipeline("automatic-speech-recognition","onnx-community/whisper-tiny",{dtype:"q8",device:"wasm"});
  const model=await transcriber;self.postMessage({type:"status",message:"正在本机识别，不会上传录音…"});
  const result=await model(event.data.audio,{language:"zh",task:"transcribe",chunk_length_s:15,stride_length_s:2});
  self.postMessage({type:"result",text:result.text||""});
 }catch(error){self.postMessage({type:"error",message:error instanceof Error?error.message:"离线识别失败"})}
};
