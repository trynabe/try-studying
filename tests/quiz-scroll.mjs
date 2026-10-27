import fs from 'node:fs';
import assert from 'node:assert/strict';

const chapters=JSON.parse(fs.readFileSync(new URL('../dist/quiz-data.json',import.meta.url),'utf8'));
const memory=new Map();
globalThis.localStorage={getItem:key=>memory.get(key)||null,setItem:(key,value)=>memory.set(key,value)};
globalThis.location={hash:'#quiz/ch01'};
globalThis.HashChangeEvent=class extends Event {
  constructor(type,{oldURL='',newURL=''}={}){super(type);this.oldURL=oldURL;this.newURL=newURL;}
};
globalThis.window=new EventTarget();
window.scrollX=0;
window.scrollY=0;
window.scrollTo=(position,y)=>{
  window.scrollX=typeof position==='object'?position.left:position;
  window.scrollY=typeof position==='object'?position.top:y;
};
let markup='';
const mount={
  get innerHTML(){return markup;},
  set innerHTML(value){
    markup=value;
    // Simulate losing the document's old scroll range during a full redraw.
    window.scrollY=0;
  },
};
globalThis.document={
  documentElement:{dataset:{theme:'dark'}},
  activeElement:null,
  getElementById:id=>id==='app'?mount:null,
  addEventListener(){},
};
globalThis.fetch=async url=>({ok:true,json:async()=>url.startsWith('quiz-data')?chapters:[]});

await import('../dist/app.js');
const core=await import('../dist/core.js');
const quiz=await import('../dist/quiz.js?v=question-hints-20261027');
const key='ch01',draft=core.state.drafts[key],question=draft.questions[0];

async function atReadingPosition(dataset){
  window.scrollX=5;
  window.scrollY=180;
  await quiz.handleQuizClick({dataset});
  assert.equal(window.scrollX,5,'Quiz actions must preserve horizontal position');
  assert.equal(window.scrollY,180,'Quiz actions must not jump to the top after rendering');
}

await atReadingPosition({toggleHint:question.id,draft:key});
assert.match(markup,/aria-expanded="true"/);
await atReadingPosition({toggleHint:question.id,draft:key});
assert.match(markup,/aria-expanded="false"/);
await atReadingPosition({qIndex:'1',draft:key});
assert.equal(draft.index,1);
assert(markup.includes(core.esc(draft.questions[1].q)));
await atReadingPosition({qIndex:'0',draft:key});
await atReadingPosition({answer:String(question.correct),question:question.id,draft:key});
assert.equal(draft.answers[question.id],question.correct);

// Genuine route changes, including browser back/forward, still open at the top.
window.scrollY=180;
location.hash='#quizzes';
window.dispatchEvent(new HashChangeEvent('hashchange',{
  oldURL:'https://example.test/#quiz/ch01',newURL:'https://example.test/#quizzes',
}));
assert.equal(window.scrollY,0);
assert.equal(window.scrollX,0);
assert(markup.includes('แบบทดสอบความเข้าใจ'));
console.log(JSON.stringify({hintScrollPreserved:true,questionScrollPreserved:true,answerScrollPreserved:true,routeNavigation:true}));
