export class GameRoom {
  constructor(ctx, env) { this.ctx=ctx; this.env=env; this.sessions=new Map(); this.lastState=new Map(); }
  async fetch(request) {
    const url=new URL(request.url);
    if (url.pathname==="/health") return Response.json({ok:true,service:"lupin-platformer-room"});
    if (request.headers.get("Upgrade")!=="websocket") return new Response("WebSocket upgrade required",{status:426});
    const pair=new WebSocketPair(); const client=pair[0], server=pair[1]; server.accept();
    const id=crypto.randomUUID(); const name=(url.searchParams.get("name")||"Player").replace(/[^a-zA-Z0-9 _-]/g,"").slice(0,16)||"Player";
    const colors=["#9c8cff","#ff83bd","#7be7dc","#ffd778","#ff9b6b","#82b7ff"];
    this.sessions.set(id,{id,name,x:70,y:400,vx:0,vy:0,color:colors[this.sessions.size%colors.length],won:false});
    server.send(JSON.stringify({type:"welcome",id}));
    server.addEventListener("message",event=>{try{const m=JSON.parse(event.data);const p=this.sessions.get(id);if(!p)return;if(m.type==="move"){p.x=Number.isFinite(m.x)?Math.max(0,Math.min(2800,m.x)):p.x;p.y=Number.isFinite(m.y)?Math.max(-100,Math.min(900,m.y)):p.y;p.vx=Number.isFinite(m.vx)?Math.max(-8,Math.min(8,m.vx)):0;p.vy=Number.isFinite(m.vy)?Math.max(-16,Math.min(16,m.vy)):0;p.won=!!m.won;this.broadcast();}}catch{}});
    server.addEventListener("close",()=>{this.sessions.delete(id);this.broadcast()});server.addEventListener("error",()=>{this.sessions.delete(id);this.broadcast()});
    this.broadcast(); return new Response(null,{status:101,webSocket:client});
  }
  broadcast(){const data=JSON.stringify({type:"snapshot",players:[...this.sessions.values()]});for(const [id,p] of this.sessions){try{const ws=this.ctx.getWebSockets().find(s=>s.readyState===1);/* broadcast below uses stored sockets */}catch{}}for(const ws of this.ctx.getWebSockets()){try{if(ws.readyState===1)ws.send(data)}catch{}}}
}
export default {
 async fetch(request,env){
  const url=new URL(request.url);
  if(url.pathname==="/health")return Response.json({ok:true,service:"lupin-platformer-room"},{headers:{"Access-Control-Allow-Origin":"*","Cache-Control":"no-store"}});
  if(url.pathname==="/")return new Response("Lupin Platformer room service. Connect with WebSocket at /room/ROOMCODE?name=Player");
  if(url.pathname.startsWith("/room/")){const code=url.pathname.split("/")[2].toUpperCase().replace(/[^A-Z0-9_-]/g,"").slice(0,8);if(!code)return new Response("Room code required",{status:400});const id=env.ROOMS.idFromName(code);return env.ROOMS.get(id).fetch(request)}
  return new Response("Not found",{status:404});
 }
};