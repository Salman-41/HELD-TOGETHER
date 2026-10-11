await figma.loadFontAsync({family:'Instrument Serif',style:'Regular'});
await figma.loadFontAsync({family:'Instrument Serif',style:'Italic'});
await figma.loadFontAsync({family:'Inter',style:'Regular'});
await figma.loadFontAsync({family:'Inter',style:'Medium'});
const page=figma.currentPage; page.name='Structural Theatre';
const created=[];
const rgb=h=>({r:parseInt(h.slice(1,3),16)/255,g:parseInt(h.slice(3,5),16)/255,b:parseInt(h.slice(5,7),16)/255});
// Based on the skill's createVariableCollection helper, scoped to this design.
async function createVariableCollection(name, modeNames) {
 const collection=figma.variables.createVariableCollection(name);
 const modeIds={}; const first=collection.modes[0];
 collection.renameMode(first.modeId,modeNames[0]);modeIds[modeNames[0]]=first.modeId;
 return {collection,modeIds};
}
const {collection,modeIds}=await createVariableCollection('HELD / Materials',['Gallery']);
const colors={plaster:'#E7E1D5',steel:'#303A34',clay:'#A8503C',metal:'#B6A98E',reaction:'#BDD3BE',paper:'#F2EEE5',secondary:'#61675F'};
const vars={};for(const [name,hex] of Object.entries(colors)){
 const v=figma.variables.createVariable(name,collection,'COLOR');
 v.scopes=['FRAME_FILL','SHAPE_FILL','TEXT_FILL','STROKE_COLOR'];
 v.setValueForMode(modeIds.Gallery,rgb(hex));
 v.setVariableCodeSyntax('WEB','var(--'+name+')'); vars[name]=v;
}
const styles={};
for(const [name,family,style,size,line] of [['Wordmark','Instrument Serif','Regular',54,54],['Title','Instrument Serif','Regular',40,43],['Body','Inter','Regular',15,23],['Label','Inter','Medium',13,18]]){
 const st=figma.createTextStyle();st.name='HELD / '+name;st.fontName={family,style};st.fontSize=size;st.lineHeight={unit:'PIXELS',value:line};styles[name]=st.id;
}
function fill(name){return figma.variables.setBoundVariableForPaint({type:'SOLID',color:rgb(colors[name])},'color',vars[name]);}
const master=figma.createComponent();created.push(master.id);master.name='HELD / Wordmark';master.description='Two offset lines, tied by a fine horizontal rule. Always read as HELD TOGETHER.';master.resize(290,120);master.x=100;master.y=2200;master.fills=[];
for(const [word,x,y] of [['HELD',0,0],['TOGETHER',31,53]]){const t=figma.createText();created.push(t.id);master.appendChild(t);t.fontName={family:'Instrument Serif',style:'Regular'};t.textStyleId=styles.Wordmark;t.characters=word;t.x=x;t.y=y;t.fills=[fill('steel')];t.letterSpacing={unit:'PERCENT',value:-1};}
const rule=figma.createRectangle();created.push(rule.id);master.appendChild(rule);rule.name='Joining rule';rule.resize(252,0.8);rule.x=0;rule.y=55;rule.fills=[fill('steel')];
const action=figma.createComponent();created.push(action.id);action.name='HELD / Text action';action.description='Underlined gallery control, 44 px minimum hit height; text label is editable.';action.layoutMode='HORIZONTAL';action.primaryAxisSizingMode='AUTO';action.counterAxisSizingMode='FIXED';action.resize(245,44);action.paddingLeft=0;action.paddingRight=0;action.paddingTop=12;action.paddingBottom=12;action.itemSpacing=14;action.fills=[];action.x=460;action.y=2200;
const label=figma.createText();created.push(label.id);action.appendChild(label);label.fontName={family:'Inter',style:'Medium'};label.textStyleId=styles.Label;label.fontSize=14;label.lineHeight={unit:'PIXELS',value:20};label.characters='Engage second support';label.fills=[fill('steel')];label.textDecoration='UNDERLINE';
const key=action.addComponentProperty('Label','TEXT',label.characters);label.componentPropertyReferences={characters:key};
return {createdNodeIds:created,mutatedNodeIds:[page.id],page:page.id,wordmark:master.id,action:action.id,actionLabel:key,styles,variables:Object.fromEntries(Object.entries(vars).map(([n,v])=>[n,v.id])),collection:collection.id,scope:'Six compositions with shared wordmark and text action only; stock libraries intentionally unused under project creative constraints.'};
