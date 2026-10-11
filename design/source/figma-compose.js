await Promise.all([{family:'Instrument Serif',style:'Regular'},{family:'Instrument Serif',style:'Italic'},{family:'Inter',style:'Regular'},{family:'Inter',style:'Medium'}].map(f=>figma.loadFontAsync(f)));
const page=await figma.getNodeByIdAsync('0:1');await figma.setCurrentPageAsync(page);
const wm=await figma.getNodeByIdAsync('2:14'),action=await figma.getNodeByIdAsync('2:18');
const colors={plaster:'#E7E1D5',steel:'#303A34',clay:'#A8503C',metal:'#B6A98E',reaction:'#BDD3BE',paper:'#F2EEE5',secondary:'#61675F'};
const vars={};for(const [n,id] of Object.entries({plaster:'VariableID:2:3',steel:'VariableID:2:4',clay:'VariableID:2:5',metal:'VariableID:2:6',reaction:'VariableID:2:7',paper:'VariableID:2:8',secondary:'VariableID:2:9'}))vars[n]=await figma.variables.getVariableByIdAsync(id);
const rgb=h=>({r:parseInt(h.slice(1,3),16)/255,g:parseInt(h.slice(3,5),16)/255,b:parseInt(h.slice(5,7),16)/255});
function paint(c,op=1){let p={type:'SOLID',color:rgb(colors[c]||c),opacity:op};return vars[c]?figma.variables.setBoundVariableForPaint(p,'color',vars[c]):p;}
function gradient(stops,vertical=false){return {type:'GRADIENT_LINEAR',gradientTransform:vertical?[[0,1,0],[-1,0,1]]:[[1,0,0],[0,1,0]],gradientStops:stops.map(([pos,c,a=1])=>({position:pos,color:{...rgb(colors[c]||c),a}}))};}
const ids=[];const roots=[];
function register(n,p,name){ids.push(n.id);n.name=name;p.appendChild(n);return n;}
function rect(p,name,x,y,w,h,c,op=1){const n=register(figma.createRectangle(),p,name);n.resize(w,h);n.x=x;n.y=y;n.fills=[paint(c,op)];return n;}
function text(p,str,x,y,size=14,fam='Inter',style='Regular',color='steel',width=0,line=1.5){const n=register(figma.createText(),p,str);n.fontName={family:fam,style};n.fontSize=size;n.lineHeight={unit:'PIXELS',value:size*line};n.characters=str;n.fills=[paint(color)];if(width){n.textAutoResize='HEIGHT';n.resize(width,Math.max(size*line,n.height));}n.x=x;n.y=y;return n;}
function block(p,x,y,w,items,gap=12){const n=register(figma.createAutoLayout('VERTICAL'),p,'Editorial text');n.fills=[];n.itemSpacing=gap;n.resize(w,100);n.primaryAxisSizingMode='AUTO';n.counterAxisSizingMode='FIXED';for(const item of items){const t=text(n,item.s,0,0,item.size||15,item.serif?'Instrument Serif':'Inter',item.italic?'Italic':'Regular',item.color||'steel',w,item.serif?1.08:1.5);t.layoutSizingHorizontal='FIXED';}n.x=x;n.y=y;return n;}
function svg(p,name,content,w,h,x=0,y=0){const n=figma.createNodeFromSvg(`<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${content}</svg>`);register(n,p,name);ids.push(...n.findAll(()=>true).map(c=>c.id));n.x=x;n.y=y;return n;}
function button(p,label,x,y){const n=register(action.createInstance(),p,label);n.setProperties({'Label#2:0':label});n.x=x;n.y=y;ids.push(...n.findAll(()=>true).map(c=>c.id));return n;}
function mark(p,x,y,scale){const n=register(wm.createInstance(),p,'HELD TOGETHER');n.rescale(scale);n.x=x;n.y=y;ids.push(...n.findAll(()=>true).map(c=>c.id));return n;}
function room(f,mobile,tech){const w=f.width,h=f.height;f.fills=[paint(tech?'paper':'plaster')];
 if(tech){rect(f,'Former wall reveal',mobile?17:510,0,1,h,'metal',0.2);return;}
 const wall=rect(f,'Lime plaster / daylight',0,0,w,h,'plaster');wall.fills=[gradient([[0,'#DED7C9'],[0.48,'#E7E1D5'],[0.78,'#EEE9DD'],[1,'#D2CABA']])];
 const reveal=rect(f,'Architectural reveal',mobile?17:510,0,mobile?10:25,h,'plaster');reveal.fills=[gradient([[0,'#ACAA9D',0.3],[0.25,'#F7F2E6',0.8],[1,'#C4BBA8',0.1]])];
 const floorY=mobile?694:824;const floor=rect(f,'Limestone floor',0,floorY,w,h-floorY,'plaster');floor.fills=[gradient([[0,'#D0C8B7'],[1,'#E1D9C9']],true)];
 rect(f,'Floor reveal',0,floorY,w,1,'steel',0.14);
 const ray=mobile?`<path d="M280 0 H390 L185 694 H88 Z" fill="#FFF9E8" opacity=".28"/>`:`<path d="M1120 0 H1310 L867 824 H559 Z" fill="#FFF9E8" opacity=".32"/>`;
 svg(f,'Daylight aperture / quiet diagonal',ray,w,h);
 rect(f,'Right wall return',w-(mobile?12:72),0,mobile?12:72,floorY,'metal',0.14);
 if(!mobile){svg(f,'Limestone joints','<path d="M950 824 L1158 900 M360 824 L241 900" stroke="#B6A98E" stroke-opacity=".3"/>',w,h);}
}
function qLength(x0,y0,cx,cy,x1,y1){let sum=0,px=x0,py=y0;for(let i=1;i<=200;i++){let t=i/200,u=1-t,x=u*u*x0+2*u*t*cx+t*t*x1,y=u*u*y0+2*u*t*cy+t*t*y1;sum+=Math.hypot(x-px,y-py);px=x;py=y;}return sum;}
function sculpture(f,mobile,opening,tech){const k=mobile?(opening?86:94):(opening?120:210);const ax=mobile?(opening?68:54):(opening?808:592);const ay=mobile?(opening?312:352):(opening?302:420);const span=k*3,anchorY=ay-1.5*k;const bx=opening?ax:ax+span,by=opening?ay+span:ay;const s=opening?3:2.25;const wx=opening?ax:ax+k*s;const wy=by+0.35*k;const ww=.32*k,wh=.44*k,bh=.08*k;let a='';
 const defs='<defs><linearGradient id="steel" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#83897D"/><stop offset=".16" stop-color="#BAC0AD"/><stop offset=".24" stop-color="#535D53"/><stop offset=".75" stop-color="#303A34"/><stop offset="1" stop-color="#202B26"/></linearGradient><linearGradient id="clay"><stop stop-color="#B8644B"/><stop offset=".65" stop-color="#A8503C"/><stop offset="1" stop-color="#823C2F"/></linearGradient></defs>';
 if(!tech){
  for(const xx of [ax,ax+span])a+=`<rect x="${xx-10}" y="${anchorY-7}" width="20" height="10" fill="#B6A98E"/><rect x="${xx-5}" y="${anchorY+3}" width="10" height="9" rx="2" fill="#5A6256"/><circle cx="${xx}" cy="${anchorY+7}" r="2.2" fill="#E7E1D5"/>`;
  a+=`<path d="M${ax} ${anchorY+11} V${ay}" stroke="#303A34" stroke-width="${mobile?1.25:1.4}"/>`;
  if(opening){let lo=by,hi=by+span;for(let i=0;i<28;i++){let mid=(lo+hi)/2;qLength(ax+span,anchorY+11,ax+span,mid,bx,by)<k*6?lo=mid:hi=mid;}a+=`<path d="M${ax+span} ${anchorY+11} Q${ax+span} ${(lo+hi)/2} ${bx} ${by}" fill="none" stroke="#697064" stroke-width="${mobile?1.25:1.4}"/>`;}
  else a+=`<path d="M${bx} ${anchorY+11} V${by}" stroke="#303A34" stroke-width="${mobile?1.25:1.4}"/>`;
  if(opening){a+=`<rect x="${ax+16}" y="${ay+20}" width="${bh}" height="${span}" fill="#303A34" opacity=".045"/><rect x="${ax-bh/2}" y="${ay}" width="${bh}" height="${span}" fill="url(#steel)"/><path d="M${ax-bh/2} ${ay} V${by}" stroke="#C1C1B0" stroke-width=".9"/>`;}
  else {a+=`<path d="M${ax+17} ${ay+25} H${bx+17}" stroke="#303A34" stroke-width="${bh}" opacity=".045"/><rect x="${ax}" y="${ay-bh/2}" width="${span}" height="${bh}" fill="url(#steel)"/><path d="M${ax} ${ay-bh/2} H${bx}" stroke="#BEC0AF" stroke-width="1"/>`;for(let i=1;i<=4;i++)a+=`<path d="M${ax+2} ${ay-bh/2+i*2.1} H${bx-2}" stroke="#E7E1D5" stroke-width=".35" opacity=".2"/>`;}
  a+=`<path d="M${wx} ${by+bh/2} V${wy}" stroke="#303A34" stroke-width="1.2"/><rect x="${wx-4}" y="${by-4}" width="8" height="8" rx="1" fill="#B6A98E"/><path d="M${wx-ww/2} ${wy+4} L${wx-ww/2+4} ${wy} H${wx+ww/2-4} L${wx+ww/2} ${wy+4} V${wy+wh} H${wx-ww/2} Z" fill="url(#clay)"/><path d="M${wx-ww/2+1} ${wy+4} V${wy+wh-1}" stroke="#D08567" stroke-width="1" opacity=".5"/><circle cx="${wx}" cy="${wy+7}" r="2" fill="#623D30"/>`;
  if(!opening)for(const [xx,r] of [[ax,.4],[bx,.6]])a+=`<rect x="${xx-5}" y="${ay-5}" width="10" height="10" fill="#BDD3BE" opacity="${.15+.45*r}"/>`;
 }else{
  a+=`<path d="M${ax} ${anchorY} V${ay} M${bx} ${anchorY} V${by}" stroke="#B6A98E" stroke-width="1" stroke-dasharray="3 6" opacity=".45"/><rect x="${ax}" y="${ay-bh/2}" width="${span}" height="${bh}" fill="none" stroke="#303A34" stroke-width="1.1"/><path d="M${wx} ${by} V${wy}" stroke="#A8503C" opacity=".2"/><rect x="${wx-ww/2}" y="${wy}" width="${ww}" height="${wh}" fill="none" stroke="#A8503C" stroke-width="1" opacity=".25"/>`;
  const forceScale=mobile?.65:.95;
  function arrow(x,y,force,up,c){const end=y+(up?-1:1)*force*forceScale;const d=up?1:-1;a+=`<path d="M${x} ${y} V${end} M${x-4} ${end+d*7} L${x} ${end} L${x+4} ${end+d*7}" fill="none" stroke="${c}" stroke-width="1.65"/>`;}
  arrow(ax,ay,78.48,true,'#303A34');arrow(bx,ay,117.72,true,'#303A34');arrow(ax+span/2,ay,117.72,false,'#303A34');arrow(wx,ay,78.48,false,'#A8503C');
  const dy=mobile?506:656,sy=mobile?472:620;
  a+=`<path d="M${ax} ${dy-5} V${dy+5} M${bx} ${dy-5} V${dy+5} M${ax} ${dy} H${bx} M${ax} ${sy-4} V${sy+4} M${wx} ${sy-4} V${sy+4} M${ax} ${sy} H${wx}" stroke="#7A8074" stroke-width=".8" fill="none"/>`;
 }
 svg(f,tech?'Force drawing / true points of application':'Sculpture / steel, cables and clay',defs+a,f.width,f.height);
 return {ax,ay,bx,by,wx,wy,ww,wh,span,anchorY,k};
}
function range(f,m){const x=m?24:592,y=m?567:683,w=m?342:630;text(f,'Weight position along beam',x,y,13,'Inter','Medium');text(f,'2.25 m',x+w-52,y,13,'Inter','Medium');rect(f,'Position rail',x+10,y+46,w-20,1,'steel',.4);rect(f,'Position / active distance',x+10,y+46,(w-20)*.75,1,'steel');const dot=register(figma.createEllipse(),f,'Weight position thumb');dot.resize(12,12);dot.x=x+10+(w-20)*.75-6;dot.y=y+40;dot.fills=[paint('clay')];dot.strokes=[paint('steel')];dot.strokeWeight=1;
 text(f,'A',x+7,y+61,12);text(f,'B',x+w-15,y+61,12);button(f,'←  Move left',x,y+85);button(f,'Move right  →',x+w-112,y+85);}
const defs=[['Desktop / Opening',1440,900,false,true,false,100,100],['Desktop / Supported',1440,900,false,false,false,1640,100],['Desktop / Force drawing',1440,900,false,false,true,3180,100],['Mobile / Opening',390,844,true,true,false,100,1150],['Mobile / Supported',390,844,true,false,false,590,1150],['Mobile / Force drawing',390,844,true,false,true,1080,1150]];
for(const [name,w,h,m,opening,tech,x,y] of defs){const f=register(figma.createFrame(),page,name);f.resize(w,h);f.x=x;f.y=y;f.clipsContent=true;f.exportSettings=[{format:'PNG',constraint:{type:'SCALE',value:1}}];f.placeholder=true;room(f,m,tech);mark(f,m?24:72,m?28:52,m?.64:1);
 const g=sculpture(f,m,opening,tech);
 if(!m){text(f,'An interactive sculpture',74,197,13);text(f,tech?'Force drawing':opening?'Held by one support':'Held by two supports',74,286,14,'Inter','Medium');
  block(f,72,366,353,[{s:tech?'How the weight\nis shared.':opening?'A span, waiting\nto happen.':'The weight moves.\nThe work is shared.',size:40,serif:true},{s:tech?'The same beam, with its forces made visible.':opening?'One cable holds the beam at rest.\nEngage the second to lift the span.':'Move the clay weight along the beam.\nEach cable carries a different share.',size:15}],20);
  if(opening){button(f,'Engage second support  →',1032,262);text(f,'Take up the slack cable',1032,313,13,'Inter','Regular','secondary');text(f,'Cable slack',1195,147,12);svg(f,'Activation leader','<path d="M1170 174 V243 H1155" fill="none" stroke="#61675F" stroke-width=".8"/>',w,h);text(f,'Weight locked at the lower end',856,737,13,'Inter','Regular','secondary');button(f,'How it is held',1200,829);text(f,'Steel, clay, and the space between.',74,834,13,'Inter','Regular','secondary');}
  else if(tech){
   text(f,'A · 78.48 N',g.ax-23,310,14,'Inter','Medium');text(f,'B · 117.72 N',g.bx-48,269,14,'Inter','Medium');text(f,'Beam weight',g.ax+g.span/2-91,545,13);text(f,'W · 117.72 N',g.ax+g.span/2-91,568,14,'Inter','Medium');text(f,'Hanging weight',g.wx+27,464,13,'Inter','Regular','clay');text(f,'P · 78.48 N',g.wx+27,487,14,'Inter','Medium','clay');text(f,'s = 2.25 m',(g.ax+g.wx)/2-35,624,13);text(f,'L = 3.00 m',(g.ax+g.bx)/2-36,661,13);
   block(f,74,563,357,[{s:'A + B = W + P = 196.20 N',size:15},{s:'B · L = W · L/2 + P · s',size:15}],8);block(f,74,690,370,[{s:'Uniform beam 12 kg · hanging weight 8 kg\ng = 9.81 m/s² · beam self-weight included',size:13},{s:'Virtual parameters. Static equilibrium only.',size:13,color:'secondary'}],8);
   text(f,'Upward support balances downward weight.',g.ax,735,14);text(f,'Arrow lengths share one force scale.',g.ax,762,13,'Inter','Regular','secondary');button(f,'Return to sculpture',1200,829);
  }else{range(f,false);text(f,'Drag the weight',g.wx+54,g.wy+g.wh/2-8,14);button(f,'Return to rest',74,829);button(f,'How it is held',1200,829);}
 }else{
  if(opening){text(f,'A span, waiting to happen.',24,133,23,'Instrument Serif','Regular', 'steel',342,1.15);text(f,'Held by one support',117,354,13,'Inter','Medium');text(f,'The second cable is slack.',117,380,13,'Inter','Regular','secondary');text(f,'Engage it to lift the span.',24,671,14);button(f,'Engage second support  →',24,714);button(f,'How it is held',24,779);}
  else if(tech){button(f,'Close',321,34);text(f,'How it is held',24,142,30,'Instrument Serif','Regular');text(f,'The same beam. Its forces revealed.',24,191,14);text(f,'A · 78.48 N',24,266,13,'Inter','Medium');text(f,'B · 117.72 N',262,240,13,'Inter','Medium');text(f,'Beam weight',117,436,12);text(f,'117.72 N',117,454,13,'Inter','Medium');text(f,'Load',282,396,12,'Inter','Regular','clay');text(f,'78.48 N',282,415,13,'Inter','Medium','clay');text(f,'s = 2.25 m',118,478,12);text(f,'L = 3.00 m',162,512,12);block(f,24,565,342,[{s:'A + B = W + P = 196.20 N',size:15},{s:'B · L = W · L/2 + P · s',size:15}],7);block(f,24,654,342,[{s:'Uniform beam 12 kg · weight 8 kg\ng = 9.81 m/s² · self-weight included',size:13},{s:'Virtual parameters. Static equilibrium only.\nArrows share one force scale.',size:13,color:'secondary'}],12);button(f,'Return to sculpture',24,779);}
  else{text(f,'Two supports. One shared load.',24,140,14);text(f,'Move the weight',220,461,14,'Inter','Medium');text(f,'The work is shared.',24,504,28,'Instrument Serif','Regular');range(f,true);button(f,'Return to rest',24,779);button(f,'How it is held',250,779);}
 }
 f.placeholder=false;const nodes=f.findAll(()=>true);roots.push({id:f.id,name,width:f.width,height:f.height,nodes:nodes.length,types:nodes.reduce((a,n)=>(a[n.type]=(a[n.type]||0)+1,a),{}),textFonts:[...new Set(nodes.filter(n=>n.type==='TEXT').map(n=>n.fontName.family))],rasterNodes:nodes.filter(n=>'fills'in n&&Array.isArray(n.fills)&&n.fills.some(p=>p.type==='IMAGE')).length});
}
figma.viewport.scrollAndZoomIntoView(roots.slice(0,3).map(r=>page.children.find(n=>n.id===r.id)));
return {createdNodeIds:ids,frames:roots};
