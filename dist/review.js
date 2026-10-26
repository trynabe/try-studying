import {esc,icon,heading,empty} from './core.js';
import {renderChapterDiagrams,diagramCount} from './review-diagrams.js?v=summary-integrated-20261027';

let chapters = [];
export function setSummaryData(data) { chapters = Array.isArray(data) ? data.slice().sort((a,b)=>a.n-b.n) : []; }
export function hasContentSummary(id) { return chapters.some(chapter=>chapter.id===id); }
const total = key => chapters.reduce((sum,chapter)=>sum+(chapter[key]?.length||0),0);
export function summaryStats(){return {chapters:chapters.length,concepts:total('sections'),formulas:total('formulas'),figures:diagramCount()};}
const sectionId = chapter => `review-${chapter.id}`;
const list = values => `<ul>${(values||[]).map(value=>`<li>${esc(value)}</li>`).join('')}</ul>`;
function mathText(value) {
  return esc(value)
    .replace(/\b([A-Z][A-Z0-9]*|[a-z])_([A-Za-z0-9]+|\([^)]*\))/g,(_,name,index)=>`${name}<sub>${index.startsWith('(')?index.slice(1,-1):index}</sub>`)
    .replace(/(\([−-]?\d+\)|\d+(?:\.\d+)?|[A-Za-z])\^(\([^)]*\)|[−-]?\d+|[A-Za-z][A-Za-z0-9]*)/g,(_,base,power)=>`${base}<sup>${power.startsWith('(')?power.slice(1,-1):power}</sup>`);
}

function pagesLabel(pages=[]) {
  const values=[...new Set(pages)].filter(Number.isInteger).sort((a,b)=>a-b);
  // Group continuous page numbers without confusing separated endpoints for a range.
  const output=[];
  for(let i=0;i<values.length;i++){
    const start=values[i];let end=start;
    while(i+1<values.length&&values[i+1]===end+1)end=values[++i];
    output.push(start===end?String(start):`${start}–${end}`);
  }
  return output.join(', ');
}

function source(chapter,pages=[]) {
  return `<p class="review-source">${icon('file')}<span>อ้างอิงสไลด์หน้า ${esc(pagesLabel(pages))}</span></p>`;
}

function chapterTabs(active) {
  return `<nav class="review-nav" aria-label="เลือกบทสรุป"><a class="${active==='all'?'active':''}" href="#summary/all" ${active==='all'?'aria-current="page"':''}>ครบ 8 บท</a><a class="${active==='formulas'?'active':''}" href="#summary/formulas" ${active==='formulas'?'aria-current="page"':''}>รวมสูตร</a>${chapters.map(chapter=>`<a class="${active===chapter.id?'active':''}" href="#summary/${chapter.id}" aria-label="บทที่ ${chapter.n} ${esc(chapter.title)}" ${active===chapter.id?'aria-current="page"':''}>${String(chapter.n).padStart(2,'0')}</a>`).join('')}</nav>`;
}

function formulaCard(chapter,formula,index) {
  return `<article class="review-formula"><div class="review-formula-heading"><span class="review-kicker">สูตร ${String(index+1).padStart(2,'0')}</span>${formula.derived||formula.exampleSupplemental?'<span class="review-derived">ตัวอย่างเสริมจากแนวคิดในสไลด์</span>':''}</div><h4>${esc(formula.title)}</h4><div class="review-equation" role="math" aria-label="${esc(formula.expression)}">${formula.expression.split(';').map(line=>`<span class="review-equation-line">${mathText(line.trim())}</span>`).join('')}</div>${formula.condition?`<p class="review-formula-condition">เงื่อนไข: ${esc(formula.condition)}</p>`:''}<details class="review-variables" open><summary>ความหมายของตัวแปรและหน่วย ${icon('down')}</summary>${list(formula.variables)}</details><div class="review-worked"><h5>ลองแทนค่าจริง</h5><p>${esc(formula.given)}</p><ol>${(formula.steps||[]).map(step=>`<li>${esc(step)}</li>`).join('')}</ol><p class="review-answer"><strong>ตอบ</strong> ${esc(formula.answer)}</p></div>${formula.pitfall?`<p class="review-warning"><strong>ระวัง:</strong> ${esc(formula.pitfall)}</p>`:''}${source(chapter,formula.pages)}</article>`;
}

function conceptCard(chapter,section,index) {
  return `<section class="review-concept"><span class="review-concept-number">${String(index+1).padStart(2,'0')}</span><h4>${esc(section.title)}</h4><p>${esc(section.body)}</p>${list(section.bullets)}${section.example?`<div class="review-example"><strong>นึกภาพตาม</strong><p>${esc(section.example)}</p></div>`:''}${source(chapter,section.pages)}</section>`;
}

function chapterTools(chapter){return `<nav class="review-chapter-tools" aria-label="เลือกส่วนในบท ${chapter.n}"><button type="button" data-review-scroll="review-visuals-${chapter.id}">ภาพจำ</button><button type="button" data-review-scroll="review-concepts-${chapter.id}">หัวข้อสำคัญ</button><button type="button" data-review-scroll="review-formulas-${chapter.id}">สูตรพร้อมตัวอย่าง</button><button type="button" data-review-scroll="review-checks-${chapter.id}">ลองตอบเอง</button></nav>`;}

function chapterBody(chapter,formulaOnly=false,inlinePages=false) {
  if(formulaOnly)return `<article class="review-chapter" id="${sectionId(chapter)}"><header class="review-chapter-header"><span class="review-kicker" lang="en">CHAPTER ${String(chapter.n).padStart(2,'0')}</span><h2>${esc(chapter.title)}</h2><p class="review-chapter-thai">${esc(chapter.thai)} · ${chapter.formulas.length} สูตรพร้อมตัวอย่าง</p></header>${chapter.formulas.map((formula,index)=>formulaCard(chapter,formula,index)).join('')}</article>`;
  return `<article class="review-chapter" id="${sectionId(chapter)}"><header class="review-chapter-header"><span class="review-kicker" lang="en">CHAPTER ${String(chapter.n).padStart(2,'0')}</span><h2>${esc(chapter.title)}</h2><p class="review-chapter-thai">${esc(chapter.thai)}</p><p class="review-gist">${esc(chapter.gist)}</p><small>${chapter.sections.length} หัวข้อ · ${chapter.formulas.length} สูตรพร้อมตัวอย่าง · สไลด์ ${chapter.source.pages} หน้า</small></header>${chapterTools(chapter)}<aside class="review-must"><h3>${icon('bookmark')}ใจความสำคัญ</h3>${list(chapter.mustKnow)}</aside><section class="review-visuals" id="review-visuals-${chapter.id}" aria-label="ภาพอธิบายบทที่ ${chapter.n}">${renderChapterDiagrams(chapter)}</section><div class="review-section-title"><span lang="en">THE ESSENTIALS</span><h3>เข้าใจทีละหัวข้อ</h3></div><div class="review-concepts" id="review-concepts-${chapter.id}">${chapter.sections.map((section,index)=>conceptCard(chapter,section,index)).join('')}</div>${chapter.formulas.length?`<section class="review-formulas" id="review-formulas-${chapter.id}"><div class="review-section-title"><span lang="en">FORMULAS & WORKED EXAMPLES</span><h3>สูตรใหญ่ พร้อมคิดทีละขั้น</h3><p>อ่านโจทย์ → จัดหน่วยให้ตรง → แทนค่า → ตรวจคำตอบ</p></div>${chapter.formulas.map((formula,index)=>formulaCard(chapter,formula,index)).join('')}</section>`:''}<aside class="review-pitfalls"><h3>${icon('bulb')}จุดที่มักสับสน</h3>${list(chapter.pitfalls)}</aside>${chapter.corrections?.length?`<details class="review-corrections"><summary>หมายเหตุที่ตรวจแก้จากสไลด์ต้นฉบับ (${chapter.corrections.length}) ${icon('down')}</summary>${chapter.corrections.map(item=>`<div><strong>สไลด์หน้า ${item.page}</strong><p>${esc(item.issue)}</p><p><b>ใช้ให้ถูก:</b> ${esc(item.correct)}</p><small>${esc(item.reason)}</small></div>`).join('')}</details>`:''}<section class="review-self-check" id="review-checks-${chapter.id}"><div class="review-section-title"><span lang="en">CHECK YOUR UNDERSTANDING</span><h3>ลองตอบเองก่อนเปิดคำอธิบาย</h3></div>${chapter.selfCheck.map((item,index)=>`<details><summary><span>${index+1}.</span>${esc(item.question)}${icon('down')}</summary><div><p>${esc(item.answer)}</p>${source(chapter,item.pages)}</div></details>`).join('')}</section><footer class="review-chapter-foot"><span>อ้างอิง: ${esc(chapter.source.filename)} · ${chapter.source.pages} หน้า</span>${inlinePages?`<button type="button" class="text-link" data-review-scroll="summary-pages-${chapter.id}">สรุปตามหน้าสไลด์ ${icon('down')}</button>`:`<a class="text-link" href="#summary/${chapter.id}">เปิดสรุปบทนี้ ${icon('arrow')}</a>`}<a class="text-link" href="#quiz/${chapter.id}">ทำโจทย์ 15 ข้อ ${icon('quiz')}</a></footer></article>`;
}

function reviewIntro(active){if(active!=='all')return `<p class="review-compact-tip">${active==='formulas'?'รวมสูตรจากทั้ง 8 บท พร้อมตัวแปร หน่วยและตัวอย่าง ตรวจสมมติฐานก่อนแทนค่า':'อ่านแกนหลักก่อน แล้วเลือกดูภาพจำ หัวข้อสำคัญ สูตร หรือคำถามท้ายบทได้ทันที'}</p>`;return `<div class="review-introduction"><span class="review-kicker" lang="en">CHAPTER SUMMARIES</span><p>สรุปจากสไลด์ทั้ง 8 บท อธิบายใหม่ให้สั้นและเชื่อมกัน ตัวอย่างคำนวณเสริมระบุสมมติฐานและหน่วยไว้ชัดเจน</p><div class="review-metrics"><span><strong>${chapters.length}</strong> บท</span><span><strong>${total('sections')}</strong> หัวข้อ</span><span><strong>${total('formulas')}</strong> สูตรพร้อมตัวอย่าง</span><span><strong>${diagramCount()}</strong> ภาพอธิบาย</span></div><p class="review-reading-tip">เริ่มจาก “ใจความสำคัญ” → ดูภาพ → อ่านหัวข้อที่ยังติด → ทำตัวอย่าง → ตอบคำถามท้ายบท</p></div>`;}

export function renderContentSummary(id='all',options={}) {
  if(!chapters.length)return empty('เปิดสรุปเนื้อหาไม่ได้','ลองรีเฟรชหน้าเว็บอีกครั้ง');
  const active=!id||id==='all'?'all':id,selected=active==='all'||active==='formulas'?chapters:chapters.filter(chapter=>chapter.id===active);
  if(!selected.length)return empty('ไม่พบบทสรุปนี้','เลือกจากสารบัญทั้ง 8 บท','<a class="button" href="#summary/all">เปิดสารบัญ</a>');
  const overview=active==='all'?`<section class="review-map" aria-label="ภาพรวมทั้ง 8 บท">${chapters.map(chapter=>`<button type="button" data-review-scroll="${sectionId(chapter)}"><span class="review-kicker">บท ${String(chapter.n).padStart(2,'0')}</span><strong>${esc(chapter.title)}</strong><span>${esc(chapter.gist)}</span>${icon('down')}</button>`).join('')}</section>`:'';
  const index=selected[0].n-1,previous=chapters[index-1],next=chapters[index+1];
  return `<div class="content-summary">${heading(active==='formulas'?'รวมสูตรคำนวณ · 8 บท':active==='all'?'สรุปเนื้อหา · 8 บท':`สรุปเนื้อหา · บท ${selected[0].n}`,'อ่านแกนหลัก ดูภาพจำ แล้วลองแทนค่าด้วยตัวเอง',`<button type="button" class="button ghost" data-review-print>${icon('download')}พิมพ์ / เก็บเป็น PDF</button>`)}${reviewIntro(active)}${chapterTabs(active)}<aside class="summary-quiz-entry"><div><strong>${selected.length===1?'เช็กความเข้าใจบทที่ '+selected[0].n:'แบบทดสอบประจำบททั้ง 8 บท'}</strong><p>บทละ 15 ข้อ · ง่าย 7 · ปานกลาง 5 · ยาก 3</p></div><a class="button primary small" href="${selected.length===1?'#quiz/'+selected[0].id:'#quizzes'}">${icon('quiz')}${selected.length===1?'ทำโจทย์บทนี้':'เลือกบททำโจทย์'}</a></aside>${overview}${selected.map(chapter=>chapterBody(chapter,active==='formulas',!!options.inlinePages)).join('')}${active!=='all'&&active!=='formulas'?`<nav class="review-next" aria-label="บทสรุปก่อนหน้าและถัดไป">${previous?`<a class="button" href="#summary/${previous.id}">${icon('back')}บท ${previous.n}</a>`:'<span></span>'}<a href="#summary/all">ครบ 8 บท</a>${next?`<a class="button primary" href="#summary/${next.id}">บท ${next.n}${icon('arrow')}</a>`:'<span></span>'}</nav>`:''}<p class="review-bottom">${icon('shield')}สรุปเนื้อหา ตัวอย่าง และภาพอธิบายจากสไลด์ทั้ง 8 บท รวมไว้ในสมุดเล่มเดียว</p></div>`;
}

export function handleSummaryClick(target) {
  if(target.hasAttribute('data-review-print')){
    const closed=[...document.querySelectorAll('.content-summary details:not([open])')];
    closed.forEach(details=>details.open=true);
    window.addEventListener('afterprint',()=>closed.forEach(details=>details.open=false),{once:true});
    window.print();
  }
  if(target.dataset.reviewScroll){
    const section=document.getElementById(target.dataset.reviewScroll);
    if(section?.tagName==='DETAILS')section.open=true;
    section?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  }
}
