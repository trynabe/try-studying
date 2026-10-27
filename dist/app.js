import {icon,empty,setCourses} from './core.js';
import {renderFolderCard} from './folders.js?v=quizzes-restored-20261027';
import {setSummaryData,renderContentSummary,handleSummaryClick} from './review.js?v=quizzes-restored-20261027';
import {renderQuizList,renderQuiz,renderResult,renderMistakes,handleQuizClick} from './quiz.js?v=question-hints-20261027';

let menuOpen=false;
const datestr=()=>new Intl.DateTimeFormat('th-TH',{timeZone:'Asia/Bangkok',day:'numeric',month:'long',year:'numeric'}).format(new Date());
function themeControls(){const dark=document.documentElement.dataset.theme==='dark';return `<div class="theme-switch" role="group" aria-label="เลือกโหมดสี"><button type="button" class="theme-choice" data-theme-choice="light" aria-label="โหมดสว่าง" aria-pressed="${!dark}" title="โหมดสว่าง"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg><span>สว่าง</span></button><button type="button" class="theme-choice" data-theme-choice="dark" aria-label="โหมดมืด" aria-pressed="${dark}" title="โหมดมืด"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/></svg><span>มืด</span></button></div>`;}
function journalMasthead(){return `<header class="journal-masthead"><div class="journal-masthead-top"><span lang="en">A PERSONAL LEARNING JOURNAL</span><span lang="en">ITDS-211 · COMPUTER ARCHITECTURE</span></div><h1 lang="en"><span>Try-<em>Studying</em></span></h1><p>วันนี้มาเข้าใจอะไรใหม่ ๆ กันอีกนิด</p><div class="journal-masthead-bottom"><span>สมุดสรุปเนื้อหา</span><span class="journal-flourish" aria-hidden="true">✦</span><span class="date">${datestr()}</span></div></header>`;}

function shell(content,inBook){
  const route=location.hash.slice(1).split('/')[0],inQuiz=['quizzes','quiz','result'].includes(route),inMistakes=route==='mistakes',onShelf=!inBook&&!inQuiz&&!inMistakes;
  const label=inQuiz?'แบบทดสอบ':inMistakes?'ข้อที่ต้องทบทวน':inBook?'สมุดสรุปเนื้อหา':'หน้าปก';
  return `<aside class="sidebar ${menuOpen?'open':''}">
    <a class="brand" href="#home"><span class="brand-mark" aria-hidden="true"><img src="images/try-studies-mark.svg" alt="" width="36" height="36"></span>Try-Studying<span class="sr-only">หน้าแรก</span></a>
    <div class="workspace"><span class="workspace-icon">${icon('book')}</span><div><small>PERSONAL JOURNAL</small><strong>สมุดสรุปของฉัน</strong></div></div>
    <p class="nav-label">MY READING</p>
    <nav class="nav" aria-label="เมนูหลัก">
      <a class="${onShelf?'active':''}" href="#home">${icon('home')}<span>หน้าปก</span></a>
      <a class="${inBook?'active':''}" href="#folder/itds-211">${icon('book')}<span>สรุปเนื้อหาทั้ง 8 บท</span></a>
      <a class="${inQuiz?'active':''}" href="#quizzes">${icon('quiz')}<span>แบบทดสอบ</span></a>
      <a class="${inMistakes?'active':''}" href="#mistakes">${icon('mistake')}<span>ข้อที่ต้องทบทวน</span></a>
    </nav>
    <div class="sidebar-foot"><div class="privacy">${icon('note')}<strong>ทุกบท อยู่ในสมุดเล่มเดียว</strong><p>ใจความสำคัญ ภาพอธิบาย<br>และสูตรพร้อมตัวอย่าง</p></div></div>
  </aside>
  <div class="shell summary-shell ${onShelf?'shelf-shell':''}"><header class="topbar">
    <button class="mobile-menu" data-action="menu" aria-label="เปิดเมนู">${icon('menu')}</button>
    <div class="breadcrumb"><a href="#home" aria-label="หน้าปก">${icon('home')}</a>${icon('chevron')}<b>${label}</b></div>
    ${themeControls()}
  </header><main class="main ${onShelf?'bookshelf-page':''}" id="main">${content}</main></div>`;
}

function dashboard(){
  return journalMasthead()+`<section class="summary-shelf" aria-label="ชั้นสมุดแยกตามรายวิชา">${renderFolderCard()}</section>`;
}

export function render(){
  const [route='',id]=location.hash.slice(1).split('?')[0].split('/');
  const inBook=['folder','summary','review','learn'].includes(route);
  const selected=['summary','review'].includes(route)?id||'all':route==='learn'?id||'all':'all';
  let content;
  if(inBook)content=`<a class="back-link folder-return" href="#home">${icon('back')}กลับหน้าปกสมุด</a>${renderContentSummary(selected)}`;
  else if(route==='quizzes')content=renderQuizList();
  else if(route==='quiz')content=renderQuiz(id);
  else if(route==='result')content=renderResult(id);
  else if(route==='mistakes')content=renderMistakes();
  else content=dashboard();
  document.getElementById('app').innerHTML=shell(content,inBook);
}

window.addEventListener('hashchange',event=>{
  // go() also refreshes the current quiz after a hint, answer, or question change.
  // Only navigation to a different URL should send the reader back to the top.
  const samePage=event.oldURL===event.newURL;
  const position=samePage?{left:window.scrollX,top:window.scrollY}:{left:0,top:0};
  const focusId=samePage?document.activeElement?.id:null;
  menuOpen=false;
  render();
  if(focusId)document.getElementById(focusId)?.focus({preventScroll:true});
  window.scrollTo({...position,behavior:'instant'});
});
document.addEventListener('click',async event=>{
  const target=event.target.closest('button,a');
  if(!target)return;
  handleSummaryClick(target);
  if(target.dataset.action==='menu'){
    menuOpen=!menuOpen;
    document.querySelector('.sidebar')?.classList.toggle('open',menuOpen);
  }else if(menuOpen&&!target.closest('.sidebar')){
    menuOpen=false;
    document.querySelector('.sidebar')?.classList.remove('open');
  }
  await handleQuizClick(target);
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'){
    menuOpen=false;
    document.querySelector('.sidebar')?.classList.remove('open');
  }
});

try{
  const [summaryResponse,quizResponse]=await Promise.all([
    fetch('review-data.json?v=summary-integrated-20261027',{cache:'no-cache'}),
    fetch('quiz-data.json?v=question-hints-20261027',{cache:'no-cache'})
  ]);
  if(!summaryResponse.ok||!quizResponse.ok)throw Error('Study content unavailable');
  const [summaryData,quizData]=await Promise.all([summaryResponse.json(),quizResponse.json()]);
  setSummaryData(summaryData);
  setCourses(quizData);
  render();
}catch(error){
  document.getElementById('app').innerHTML=shell(empty('โหลดเนื้อหาไม่ได้','ลองรีเฟรชหน้าเว็บอีกครั้ง','<button class="button" onclick="location.reload()">โหลดใหม่</button>'),false);
  console.error(error);
}
