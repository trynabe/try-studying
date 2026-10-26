import {summaryStats} from './review.js?v=quizzes-restored-20261027';
export const folderTitle='ITDS-211 · Computer Architecture';
export const folderRoute='#folder/itds-211';

export function renderFolderCard(){
  const {chapters,concepts}=summaryStats();
  return `<article class="subject-folder">
    <p class="folder-category"><span></span>คอมพิวเตอร์และระบบ</p>
    <a class="folder-art-link book-cover" href="${folderRoute}" aria-label="เปิดสมุดสรุป Computer Architecture ทั้ง ${chapters} บท">
      <span class="book-spine" aria-hidden="true"></span>
      <div class="book-cover-frame">
        <span class="folder-code">ITDS-211</span>
        <div class="book-cover-title">
          <span class="book-ornament" aria-hidden="true">✦</span>
          <h3 lang="en">Computer<br>Architecture</h3>
          <span class="book-divider" aria-hidden="true"></span>
          <p>สรุปเนื้อหาทั้ง ${chapters} บท</p>
        </div>
        <span class="book-imprint" lang="en">THE SUMMARY NOTEBOOK</span>
      </div><span class="folder-open-arrow" aria-hidden="true">↗</span>
    </a>
    <div class="folder-caption"><span class="folder-caption-code" lang="en">ITDS-211</span><a href="${folderRoute}"><span lang="en">Computer Architecture</span><span aria-hidden="true">↗</span></a><span class="folder-completion">${chapters} บท · ${concepts} หัวข้อสำคัญ</span></div>
  </article>`;
}
