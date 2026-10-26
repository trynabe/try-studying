import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import path from 'node:path';

const memory=new Map();
globalThis.localStorage={getItem:key=>memory.get(key)||null,setItem:(key,value)=>memory.set(key,value)};
globalThis.location={hash:'#quizzes'};
globalThis.window={dispatchEvent(){}};
globalThis.HashChangeEvent=class {constructor(type){this.type=type;}};

const core=await import(pathToFileURL(path.resolve('dist/core.js')).href);
const quiz=await import(pathToFileURL(path.resolve('dist/quiz.js')).href);
const data=JSON.parse(fs.readFileSync('dist/quiz-data.json','utf8'));
core.setCourses(data);
core.state.notes['ch01:12']='existing note';
assert.equal(data.length,8);
assert.equal((quiz.renderQuizList().match(/class="panel quiz-intro"/g)||[]).length,8);

for(const chapter of data){
  assert.equal(chapter.questions.length,15);
  assert.deepEqual(['easy','medium','hard'].map(level=>chapter.questions.filter(q=>q.level===level).length),[7,5,3]);
  assert.equal(new Set(chapter.questions.map(q=>q.id)).size,15);
  assert(chapter.questions.every(q=>q.opts.length===4&&q.correct>=0&&q.correct<4&&q.explanation));
  location.hash='#quiz/'+chapter.id;
  quiz.renderQuiz(chapter.id);
  const draft=core.state.drafts[chapter.id];
  quiz.renderQuiz(chapter.id);
  assert.equal(core.state.drafts[chapter.id],draft,'Opening a quiz must resume the same draft');
  await quiz.handleQuizClick({dataset:{qIndex:'999',draft:chapter.id}});
  assert.equal(draft.index,14);
  assert.match(quiz.renderQuiz(chapter.id),/data-submit-quiz="[^"]+" disabled/);
  for(const [index,question] of draft.questions.entries()){
    const original=chapter.questions.find(q=>q.id===question.id);
    assert.equal(question.opts[question.correct],original.opts[original.correct],'Shuffling must preserve the correct answer');
    const answer=chapter.id==='ch01'&&index===0?(question.correct+1)%4:question.correct;
    await quiz.handleQuizClick({dataset:{answer:String(answer),question:question.id,draft:chapter.id}});
  }
  await quiz.handleQuizClick({dataset:{submitQuiz:chapter.id}});
  const result=core.state.attempts.at(-1);
  assert.equal(result.score,chapter.id==='ch01'?14:15);
  assert.equal(result.total,15);
  assert.equal(core.state.drafts[chapter.id],undefined);
  assert.equal(location.hash,'#result/'+result.id);
  const html=quiz.renderResult(result.id);
  assert.match(html,/เฉลยและคำอธิบาย/);
  assert(!html.includes('#learn/'),'Results should return to summaries');
}

assert.equal(Object.keys(core.state.mistakes).length,1);
assert.match(quiz.renderMistakes(),/#summary\/ch01/);
location.hash='#quiz/practice-ch01';
quiz.renderQuiz('practice-ch01');
const practice=core.state.drafts['practice-ch01'];
assert.equal(practice.questions.length,1);
const question=practice.questions[0];
await quiz.handleQuizClick({dataset:{answer:String(question.correct),question:question.id,draft:'practice-ch01'}});
await quiz.handleQuizClick({dataset:{submitQuiz:'practice-ch01'}});
assert.equal(core.state.attempts.at(-1).score,1);
assert.equal(Object.keys(core.state.mistakes).length,0);
assert.equal(core.state.notes['ch01:12'],'existing note');
assert(memory.has(core.key),'Answers and results should be persisted');
console.log(JSON.stringify({chapters:8,questions:120,distribution:[7,5,3],draftResume:true,shuffledAnswers:true,scoring:true,mistakePractice:true,notesPreserved:true}));
