import fs from 'node:fs';
import assert from 'node:assert/strict';

const memory = new Map();
globalThis.localStorage = { getItem: key => memory.get(key) || null, setItem: (key, value) => memory.set(key, value) };
globalThis.location = { hash: '#quiz/ch01' };
globalThis.window = { dispatchEvent() {} };
globalThis.HashChangeEvent = class { constructor(type) { this.type = type; } };

const core = await import('../dist/core.js');
const quiz = await import('../dist/quiz.js');
const chapters = JSON.parse(fs.readFileSync(new URL('../dist/quiz-data.json', import.meta.url), 'utf8'));
core.setCourses(chapters);
let checked = 0;

for (const chapter of chapters) {
  assert.equal(chapter.questions.length, 15);
  location.hash = '#quiz/' + chapter.id;
  quiz.renderQuiz(chapter.id);
  const draft = core.state.drafts[chapter.id];
  for (const [index, question] of draft.questions.entries()) {
    draft.index = index;
    // Legacy saved drafts have no hint field; the current bank must supply it by ID.
    delete question.hint;
    const hint = chapter.questions[index].hint;
    assert(hint.approach.length > 20 && hint.remember.length > 10, question.id + ' needs both specific cues');
    assert(!/[\uFFFD]/u.test(hint.approach + hint.remember), 'Thai text must remain valid');
    const expectedAnswer = question.opts[question.correct];
    let html = quiz.renderQuiz(chapter.id);
    assert.match(html, /aria-expanded="false"/);
    assert.match(html, /aria-labelledby="[^"]+" hidden/);
    assert(html.includes(core.esc(hint.approach)) && html.includes(core.esc(hint.remember)));
    const answersBefore = structuredClone(draft.answers);
    await quiz.handleQuizClick({ dataset: { toggleHint: question.id, draft: chapter.id } });
    assert.deepEqual(draft.answers, answersBefore, 'Reading a hint cannot select an answer');
    assert.match(quiz.renderQuiz(chapter.id), /aria-expanded="true"/);
    await quiz.handleQuizClick({ dataset: { answer: String(question.correct), question: question.id, draft: chapter.id } });
    assert.match(quiz.renderQuiz(chapter.id), /aria-expanded="true"/, 'Hint stays open after choosing an answer');
    assert.equal(question.opts[question.correct], expectedAnswer, 'Hints cannot alter shuffled answers');
    await quiz.handleQuizClick({ dataset: { qIndex: String((index + 1) % 15), draft: chapter.id } });
    await quiz.handleQuizClick({ dataset: { qIndex: String(index), draft: chapter.id } });
    assert.match(quiz.renderQuiz(chapter.id), /aria-expanded="true"/, 'Hint state survives navigation');
    const saved = JSON.parse(memory.get(core.key));
    assert.equal(saved.drafts[chapter.id].hints[question.id], true, 'Hint state is saved for resuming');
    await quiz.handleQuizClick({ dataset: { toggleHint: question.id, draft: chapter.id } });
    assert.match(quiz.renderQuiz(chapter.id), /aria-expanded="false"/);
    checked++;
  }
  await quiz.handleQuizClick({ dataset: { submitQuiz: chapter.id } });
  assert.equal(core.state.attempts.at(-1).score, 15, 'Using hints must not deduct points');
}

const original = chapters[0].questions[0];
const legacyQuestion = structuredClone(original);
delete legacyQuestion.hint;
core.state.mistakes['ch01:' + original.id] = { courseId: 'ch01', question: legacyQuestion, answer: 1 };
location.hash = '#quiz/practice-ch01';
assert(quiz.renderQuiz('practice-ch01').includes(core.esc(original.hint.approach)), 'Legacy mistakes receive the latest hint');
await quiz.handleQuizClick({ dataset: { toggleHint: original.id, draft: 'practice-ch01' } });
assert.match(quiz.renderQuiz('practice-ch01'), /aria-expanded="true"/);
await quiz.handleQuizClick({ dataset: { toggleHint: 'not-a-question', draft: 'practice-ch01' } });
assert.equal(core.state.drafts['practice-ch01'].hints['not-a-question'], undefined);
assert.equal(checked, 120);
console.log(JSON.stringify({ hintCoverage: checked, legacyDrafts: true, legacyMistakePractice: true, persistedDisclosure: true, fullMarksWithHints: true }));
