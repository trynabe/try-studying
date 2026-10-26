import {esc} from './core.js';

const figures = {
  ch01: [{key:'system',title:'คอมพิวเตอร์ทำงานเป็นทีม',caption:'CPU ประมวลผลคำสั่งในหน่วยความจำ รับข้อมูลผ่าน Input และส่งผลผ่าน Output ส่วน Storage เก็บข้อมูลระยะยาว ลูกศรแสดงทางเดินข้อมูลโดยย่อ',pages:[13,14,15]}],
  ch02: [{key:'cycle',title:'เดินตามคำสั่งหนึ่งรอบ',caption:'ดึงคำสั่ง → ถอดรหัส → ทำงาน → อัปเดตผลหรือสถานะ แล้วไปคำสั่งถัดไป รูปนี้เป็นลำดับงานเชิงแนวคิด ไม่ได้กำหนดว่าทุกคำสั่งใช้ 4 clock เมื่อรับ interrupt ต้องเก็บสถานะที่จำเป็นก่อนทำ handler และคืนสถานะเพื่อกลับมาทำต่อ',pages:[12,13,14,15,29,32,40,43]}],
  ch03: [
    {key:'binary',title:'บิตเดิม แต่ตีความได้สองแบบ',caption:'ตัวอย่างเสริมขนาด 8 บิต: 10110010₂ คือ 178 เมื่ออ่านแบบ unsigned แต่เป็น −78 เมื่ออ่านแบบ two’s complement ต้องดูชนิดข้อมูลก่อนคำนวณ ตัวอย่างนี้ไม่ได้หมายความว่า register ของ RV64 มีเพียง 8 บิต',pages:[5,18,19,20,21,22,53,70]},
    {key:'riscv',title:'Load ต้องคำนวณที่อยู่ก่อน',caption:'ตัวอย่างเสริม RV64: ld x5, 16(x10) นำข้อมูล 8 ไบต์จากที่อยู่ x10 + 16 มาใส่ x5 โดย offset นับเป็นไบต์ ในรูปสมมติ x10 = 1000 และข้อมูลที่อ่านได้คือ 42',pages:[49,50]}
  ],
  ch04: [
    {key:'hierarchy',title:'ยิ่งใกล้ CPU ยิ่งเร็ว แต่ยิ่งเล็ก',caption:'ลำดับชั้นช่วยให้ข้อมูลที่ใช้บ่อยอยู่ในหน่วยความจำที่เร็ว ข้อมูลทั้งหมดไม่จำเป็นต้องอยู่ในชั้นที่เร็วที่สุดพร้อมกัน ความเร็วและขนาดเป็นแนวโน้มโดยทั่วไป',pages:[6,7]},
    {key:'cache',title:'แบ่ง Address เป็น Tag · Index · Offset',caption:'ตัวอย่างเสริม: address แบบ byte-addressed 32 บิต, cache เฉพาะข้อมูล 16 KiB, 4-way และ block 64 B จึงมี 64 sets → Index 6 บิต, Offset 6 บิต, Tag 20 บิต ไม่รวมพื้นที่ tag/valid/dirty ในความจุข้อมูล',pages:[31,32,51,94]}
  ],
  ch05: [{key:'io',title:'Polling, Interrupt และ DMA ต่างกันตรงไหน',caption:'Polling ให้ CPU ถามสถานะซ้ำ ๆ; Interrupt ให้อุปกรณ์แจ้งเมื่อพร้อม แต่ CPU ยังอาจต้องคัดลอกข้อมูล; DMA ให้ตัวควบคุมขนข้อมูลระหว่างอุปกรณ์กับ memory หลัง CPU ตั้งค่างาน และมักแจ้งเมื่อเสร็จ',pages:[8,9,10,11]}],
  ch06: [{key:'raid',title:'RAID 5 กระจาย Parity ไปหลายดิสก์',caption:'ตัวอย่าง 4 ดิสก์ขนาดเท่ากัน: หนึ่ง stripe มีข้อมูล 3 ส่วนและ parity 1 ส่วน โดยตำแหน่ง parity สลับดิสก์ ความจุใช้งานประมาณ 3S และทนดิสก์เสียได้ 1 ลูก ตามสมมติฐานนี้ RAID ไม่แทนการสำรองข้อมูล',pages:[19,26]}],
  ch07: [{key:'pipeline',title:'Pipeline ซ้อนหลายคำสั่ง แทนการเร่งคำสั่งเดียว',caption:'ตัวอย่างอุดมคติ: 4 คำสั่งอิสระ ผ่าน 5 stages ที่ใช้ clock เท่ากัน จบใน 5 + 4 − 1 = 8 cycles แทน 20 cycles แบบไม่ซ้อนกัน ในกรณีจริงต้องบวก stall/flush และคำนึงถึงเวลา clock',pages:[4,5,6,31,32]}],
  ch08: [
    {key:'flynn',title:'Flynn แยกจากกระแสคำสั่งและข้อมูล',caption:'SISD: คำสั่งเดียว–ข้อมูลเดียว; SIMD: คำสั่งเดียวกับหลายข้อมูล; MIMD: หลายคำสั่งและหลายข้อมูล; MISD พบไม่บ่อย การจัดประเภทนี้ดู instruction/data streams จึงต้องระบุระดับที่กำลังพิจารณา',pages:[3,9]},
    {key:'arithmetic',title:'Arithmetic intensity: นับงานต่อข้อมูลที่ขน',caption:'ตัวอย่างเสริม DAXPY แบบ double: ต่อหนึ่ง element มี 1 multiply และ 1 add รวม 2 FLOPs และอ่าน X, อ่าน Y, เขียน Y รวม 24 bytes จึงได้ 2/24 ≈ 0.0833 FLOP/byte สมมติไม่นับ scalar ที่ใช้ซ้ำและไม่เพิ่ม traffic จาก write-allocate; ปริมาณจริงขึ้นกับระดับ memory ที่นับ',pages:[11,39]}
  ]
};

function drawing(key) {
  const marker = `review-arrow-${key}`;
  const text = (x,y,value,size=18,cls='',anchor='middle') => `<text x="${x}" y="${y}" font-size="${size}" class="${cls}" text-anchor="${anchor}">${esc(value)}</text>`;
  const rect = (x,y,w,h,cls='d-box') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" class="${cls}"/>`;
  const box = (x,y,w,h,title,lines=[],cls='d-box') => rect(x,y,w,h,cls)+text(x+w/2,y+28,title,21,'d-bold')+lines.map((line,i)=>text(x+w/2,y+53+i*23,line,17)).join('');
  const arrow = (x1,y1,x2,y2,dashed=false) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="d-line" ${dashed?'stroke-dasharray="5 5"':''} marker-end="url(#${marker})"/>`;
  const path = d => `<path d="${d}" class="d-line" marker-end="url(#${marker})"/>`;
  let body='',height=320;
  switch(key) {
    case 'system':
      height=370;
      body=box(250,20,220,70,'Memory',['Instructions + data'])+box(230,145,260,115,'CPU',[])+rect(247,184,106,42)+rect(367,184,106,42)+text(300,211,'ALU',19)+text(420,211,'Control',19)+text(360,246,'Registers',17)+box(20,160,155,78,'Input',['Data in'])+box(545,160,155,78,'Output',['Result out'])+box(250,298,220,60,'Storage',[])+arrow(175,199,226,199)+arrow(490,199,541,199)+arrow(342,145,342,94)+arrow(378,90,378,141)+arrow(350,260,350,294)+arrow(385,298,385,264);
      break;
    case 'cycle':
      height=290;
      body=['Fetch','Decode','Execute','Update state'].map((label,i)=>box(17+i*177,42,155,86,label,[['PC → IR','Read operands','ALU / memory','Save if needed'][i]])).join('')+[0,1,2].map(i=>arrow(173+i*177,85,191+i*177,85)).join('')+path('M626 128V159H95V132')+box(128,202,464,66,'Interrupt',['Save state → Handler → Restore state'])+arrow(361,162,361,198,true);
      break;
    case 'binary': {
      height=300;
      const bits=[1,0,1,1,0,0,1,0],weights=[128,64,32,16,8,4,2,1];
      body=text(360,30,'10110010₂ = B2₁₆',25,'d-bold')+bits.map((v,i)=>rect(20+i*85,57,79,58,i===0?'d-accent':'d-box')+text(59+i*85,95,String(v),27,'d-bold')+text(59+i*85,143,String(weights[i]),18)).join('')+text(360,180,'Unsigned: 128 + 32 + 16 + 2 = 178',22)+text(360,220,'Signed: −128 + 32 + 16 + 2 = −78',22)+text(360,268,'Same bits · interpret the type first',18,'d-muted');
      break;
    }
    case 'riscv':
      height=310;
      body=text(360,35,'ld x5, 16(x10)',26,'d-bold')+box(20,91,184,115,'Registers',['x10 = 1000','x5 receives 42'])+box(278,91,164,115,'ALU',['1000 + 16','EA = 1016'])+box(518,91,182,115,'Memory',['address 1016','data = 42'])+arrow(205,145,274,145)+arrow(443,145,514,145)+text(240,127,'base',16)+text(480,127,'address',16)+path('M609 207V250H113V211')+text(360,284,'8-byte value → x5',20);
      break;
    case 'hierarchy':
      height=330;
      body=[['Registers',172],['L1 / L2 / L3 cache',300],['DRAM',430],['SSD / HDD',560]].map(([label,width],i)=>rect((720-width)/2,32+i*66,width,53)+text(360,66+i*66,label,22,'d-bold')).join('')+arrow(56,246,56,52)+text(56,285,'Faster',17)+arrow(664,52,664,246)+text(664,285,'Larger',17)+text(360,319,'Keep frequently used data close to the CPU',18,'d-muted');
      break;
    case 'cache':
      height=270;
      body=text(360,29,'32-bit address · 16 KiB · 4-way · 64 B/block',19)+rect(20,62,425,90,'d-accent')+rect(445,62,127,90)+rect(572,62,128,90)+text(232,98,'TAG',24,'d-bold')+text(232,131,'20 bits',21)+text(508,98,'INDEX',20,'d-bold')+text(508,131,'6 bits',20)+text(636,98,'OFFSET',19,'d-bold')+text(636,131,'6 bits',20)+text(360,190,'Sets = 16,384 ÷ (4 × 64) = 64',22)+text(360,233,'Tag = 32 − 6 − 6 = 20 bits',22);
      break;
    case 'io':
      height=370;
      body=[['Polling',18],['Interrupt',256],['DMA',494]].map(([label,x])=>rect(x,14,208,342)+text(x+104,44,label,23,'d-bold')).join('')+box(37,65,170,67,'CPU',[])+box(37,253,170,65,'Device',[])+arrow(94,137,94,248)+arrow(150,248,150,137)+text(122,185,'Ready?',18)+text(122,211,'Ask repeatedly',16)+box(275,65,170,67,'CPU',[])+box(275,253,170,65,'Device',[])+arrow(324,248,324,137)+arrow(390,137,390,248)+text(360,185,'IRQ ↑',18)+text(360,211,'CPU copies ↓',17)+box(513,65,170,60,'CPU',[])+box(531,171,134,58,'DMA',[])+box(505,284,87,58,'Device',[])+box(603,284,88,58,'Memory',[])+arrow(598,129,598,167)+text(644,150,'Setup',16)+arrow(549,280,549,234)+arrow(644,234,644,279)+path('M671 196H692V97H687');
      break;
    case 'raid': {
      height=390;
      const rows=[['A1','A2','A3','P(A)'],['B1','B2','P(B)','B3'],['C1','P(C)','C2','C3'],['P(D)','D1','D2','D3']];
      body=[0,1,2,3].map(i=>text(98+i*175,35,`Disk ${i+1}`,21,'d-bold')).join('')+rows.map((row,r)=>row.map((label,c)=>rect(23+c*175,62+r*61,150,49,label.startsWith('P(')?'d-accent':'d-box')+text(98+c*175,93+r*61,label,22,'d-bold')).join('')).join('')+text(360,340,'Usable capacity = (4 − 1) × S = 3S',22)+text(360,375,'Distributed parity · tolerates one disk failure',18,'d-muted');
      break;
    }
    case 'pipeline': {
      height=330;
      const stages=['IF','ID','EX','MEM','WB'];
      body=Array.from({length:8},(_,i)=>text(122+i*76,33,String(i+1),18)).join('')+text(29,32,'Cycle',16);
      for(let row=0;row<4;row++){
        body+=text(31,91+row*48,`I${row+1}`,21,'d-bold');
        for(let stage=0;stage<5;stage++)body+=rect(86+(row+stage)*76,59+row*48,70,41,stage===2?'d-accent':'d-box')+text(121+(row+stage)*76,87+row*48,stages[stage],18,'d-bold');
      }
      body+=text(360,290,'4 instructions + 5 stages − 1 = 8 cycles',22,'d-bold')+text(360,321,'Ideal case: no stalls, flushes, or unequal stage clocks',17,'d-muted');
      break;
    }
    case 'flynn':
      height=335;
      body=text(289,31,'1 instruction stream',19,'d-bold')+text(565,31,'Many instruction streams',19,'d-bold')+text(80,109,'1 data stream',17)+text(80,243,'Many data',17)+text(80,267,'streams',17)+box(168,59,244,101,'SISD',['One operation at a time'])+box(440,59,264,101,'MISD',['Uncommon category'])+box(168,198,244,108,'SIMD',['Same operation','across multiple data'])+box(440,198,264,108,'MIMD',['Independent instructions','and independent data']);
      break;
    case 'arithmetic':
      height=310;
      body=text(360,32,'Yᵢ = a Xᵢ + Yᵢ',26,'d-bold')+box(20,65,200,85,'Read X',['8 bytes'])+box(260,65,200,85,'Read Y',['8 bytes'])+box(500,65,200,85,'Write Y',['8 bytes'])+text(360,201,'1 multiply + 1 add = 2 FLOPs',22)+text(360,244,'Traffic = 8 + 8 + 8 = 24 bytes',21)+text(360,289,'Intensity = 2 / 24 ≈ 0.0833 FLOP/byte',23,'d-bold');
      break;
  }
  return `<svg viewBox="0 0 720 ${height}" role="img" aria-labelledby="${key}-title ${key}-desc" xmlns="http://www.w3.org/2000/svg"><title id="${key}-title">${esc(key)}</title><desc id="${key}-desc">${esc(figures && Object.values(figures).flat().find(f=>f.key===key)?.caption||'')}</desc><defs><marker id="${marker}" markerWidth="8" markerHeight="8" refX="7" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7Z" class="d-arrow"/></marker></defs>${body}</svg>`;
}

export function diagramCount(id) { return id ? (figures[id]?.length||0) : Object.values(figures).flat().length; }
export function chapterDiagramAssets(id) { return (figures[id]||[]).map(figure=>({...figure,svg:drawing(figure.key)})); }
export function renderChapterDiagrams(chapter) {
  return chapterDiagramAssets(chapter.id).map(figure=>`<figure class="review-diagram"><h3>${esc(figure.title)}</h3><div class="review-diagram-art">${figure.svg}</div><figcaption>${esc(figure.caption)}<small>อิงแนวคิดสไลด์หน้า ${figure.pages.join(', ')}</small></figcaption></figure>`).join('');
}
