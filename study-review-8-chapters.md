# Try-Studying — สรุปเนื้อหา 8 บท

เรียบเรียงจากสไลด์ต้นฉบับ ตัวอย่างเสริมระบุสมมติฐานและหน่วย เปิดภาพประกอบได้ในเว็บที่ #summary/all

## บท 1 — Computer Foundations
ส่วนประกอบคอมพิวเตอร์และภาพรวมสถาปัตยกรรม

เข้าใจว่าโปรแกรมสั่งฮาร์ดแวร์อย่างไร แล้ววัดความเร็วด้วยเวลาทำงานและสมการ CPU แทนการดู GHz อย่างเดียว

### ใจความสำคัญ
- Architecture คือสิ่งที่โปรแกรมมองเห็น; organization คือวิธีสร้างให้ทำงานจริง
- CPU ประกอบด้วย control unit, ALU, registers และทางเชื่อม; PC กับ IR มีหน้าที่ต่างกัน
- ลำดับหน่วยความจำและ cache ลดเวลารอข้อมูล; หลาย core กับหลาย thread ไม่ใช่จำนวนเดียวกัน
- แยก response time, CPU time และ throughput ก่อนเปรียบเทียบเครื่อง
- CPU time = Instruction count × CPI / Clock rate และต้องติดตามหน่วย
- Parallelism มีหลายระดับ และ Flynn แบ่งตามจำนวน instruction stream กับ data stream

### ภาพจำ: คอมพิวเตอร์ทำงานเป็นทีม
![คอมพิวเตอร์ทำงานเป็นทีม](dist/images/review/system.svg)
CPU ประมวลผลคำสั่งในหน่วยความจำ รับข้อมูลผ่าน Input และส่งผลผ่าน Output ส่วน Storage เก็บข้อมูลระยะยาว ลูกศรแสดงทางเดินข้อมูลโดยย่อ
อิงสไลด์หน้า 13, 14, 15

### Architecture กับ Organization
Architecture เป็นข้อตกลงที่ซอฟต์แวร์ใช้สั่งเครื่อง ส่วน organization เป็นวิธีจัดวงจรและทรัพยากรให้ทำตามข้อตกลงนั้นได้
- ISA ระบุคำสั่ง registers ชนิดข้อมูล addressing และรูปแบบการเข้ารหัส
- Cache, pipeline, bus และความถี่เป็นตัวอย่างด้านการจัดระบบ
- การออกแบบจริงต้องสมดุล performance, cost, power และ availability

ตัวอย่าง: CPU สองรุ่นรันโปรแกรม ISA เดียวกันได้ แต่ cache ต่างกันจึงเร็วไม่เท่ากัน
อ้างอิงสไลด์หน้า 3, 4

### ชนิดของเครื่องและบริการ Cloud
ความเหมาะสมของเครื่องขึ้นกับงาน: supercomputer เน้นงานคำนวณขนาดใหญ่ ส่วน embedded ถูกฝังในผลิตภัณฑ์และจำกัดกำลังไฟ/ต้นทุน Cloud ให้เข้าถึงทรัพยากรร่วมผ่านเครือข่ายตามต้องการ
- Cloud networking ทำให้บริการเชื่อมต่อกัน; cloud storage เก็บข้อมูลบนระบบระยะไกล
- IaaS ให้ VM/โครงสร้างพื้นฐาน; PaaS ให้แพลตฟอร์มสำหรับรันแอป; SaaS ให้แอปพร้อมใช้
- เมื่อขยับจาก IaaS ไป SaaS ผู้ให้บริการดูแลชั้นระบบมากขึ้น ผู้ใช้ควบคุมรายละเอียดน้อยลง

ตัวอย่าง: เช่า VM เพื่อติดตั้งระบบเองคือ IaaS; เปิดใช้แอปผ่านเว็บคือ SaaS
อ้างอิงสไลด์หน้า 5, 6, 7, 8

### Eight Great Ideas
แนวคิดสำคัญช่วยให้เครื่องเร็วขึ้นและเชื่อถือได้ โดยเริ่มจากแก้ส่วนที่ใช้บ่อยและซ่อนรายละเอียดที่ไม่จำเป็น
- Design for Moore’s Law และใช้ abstraction ลดความซับซ้อน
- Make common case fast; เพิ่ม performance ด้วย parallelism, pipelining และ prediction
- ใช้ memory hierarchy และเพิ่ม dependability ด้วย redundancy

ตัวอย่าง: สายการผลิตแบ่งงานเป็นช่วงเหมือน pipeline; สำเนาข้อมูลสำรองเป็นตัวอย่าง redundancy
อ้างอิงสไลด์หน้า 10

### จากภาษาระดับสูงถึงเครื่อง
แอปใช้ภาษาที่ใกล้ปัญหา ส่วน CPU รับคำสั่งที่เข้ารหัสเป็นบิต จึงมีเครื่องมือแปลและซอฟต์แวร์ระบบคั่นกลาง
- Compiler แปลภาษาระดับสูง; assembler แปล assembly เป็น machine code
- Assembly เป็นข้อความแทนคำสั่งเครื่อง ส่วน machine code เป็นบิตคำสั่งและข้อมูล
- OS จัด I/O, memory, storage, scheduling และทรัพยากรร่วม
- Algorithm กำหนดปริมาณงาน; ภาษา/compiler/ISA กำหนดจำนวนคำสั่ง; CPU/memory/I/O กำหนดเวลาที่ใช้

ตัวอย่าง: คำสั่งบวกใน C อาจกลายเป็นหลายคำสั่ง assembly ก่อนเข้ารหัสเป็นบิต
อ้างอิงสไลด์หน้า 9, 11, 12

### องค์ประกอบเครื่องและภายใน CPU
เครื่องมี input, output, memory, storage และหน่วยประมวลผล เชื่อมบน motherboard โดยมีแหล่งจ่ายไฟ ส่วน GPU ช่วยงานที่เหมาะกับการประมวลผลขนาน
- Control unit ควบคุมลำดับการทำงาน
- ALU ทำเลขคณิตและตรรกะ
- Registers เก็บข้อมูลใกล้วงจรประมวลผล; interconnection ส่งข้อมูลระหว่างส่วนต่าง ๆ
- RAM ใช้ระหว่างทำงาน ส่วน storage เก็บข้อมูลระยะยาว

ตัวอย่าง: พิมพ์เลขเข้าทางคีย์บอร์ด → เก็บใน RAM → CPU คำนวณ → แสดงผลจอ
อ้างอิงสไลด์หน้า 13, 14, 21, 22, 23

### Machine Cycle และ Registers
วงจรพื้นฐานคือ fetch → decode → execute → store/write back ทำซ้ำตามโปรแกรม โดยคำสั่งแต่ละชนิดอาจใช้ขั้นตอนย่อยไม่เท่ากัน
- PC ชี้ที่อยู่คำสั่งถัดไป; IR ถือคำสั่งที่นำมาทำงาน
- Status register เก็บสถานะหรือ flags ของผลการทำงาน
- Control unit ถอดรหัสแล้วสั่งให้ ALU และ memory ทำงาน

ตัวอย่าง: PC ชี้คำสั่งบวก → fetch ลง IR → decode → ALU บวก → เขียนผลกลับ
อ้างอิงสไลด์หน้า 15, 16

### Cache และ Memory Hierarchy
Cache เก็บสำเนาข้อมูลจาก main memory ที่คาดว่าจะใช้เร็ว ๆ นี้ ลดการรอของ CPU โดยแลกกับพื้นที่เล็กกว่า
- L1 อยู่ใกล้ core มาก เร็วและเล็ก; L2/L3 มีความจุมากขึ้นแต่ช้าลงตามลำดับทั่วไป
- หลายชั้นช่วยสมดุลความเร็ว ความจุ และต้นทุน
- ข้อมูลที่ไม่อยู่ใน cache ยังต้องดึงจากระดับถัดไป

ตัวอย่าง: เหมือนวางหนังสือที่ใช้บ่อยบนโต๊ะ แทนเดินไปชั้นหนังสือทุกครั้ง
อ้างอิงสไลด์หน้า 17, 18, 21

### Multi-core กับ Multi-thread
Core เป็นหน่วยประมวลผลทางกายภาพ ส่วน thread เป็นสายงานที่จัดให้ใช้ทรัพยากรของ core เทคนิค SMT ให้หนึ่ง core รองรับหลาย hardware threads
- หลาย core ทำงานคนละชิ้นได้พร้อมกันถ้างานแบ่งได้
- หลาย hardware threads บน core เดียวแบ่งใช้ execution resources
- จำนวน threads ไม่ใช่จำนวน core และไม่รับประกันความเร็วเพิ่มเป็นสัดส่วน

ตัวอย่าง: CPU 4 cores/8 threads มี 4 core จริง แต่เปิดให้ระบบเห็น 8 สายงานฮาร์ดแวร์
อ้างอิงสไลด์หน้า 19, 20, 21

### การผลิต IC และข้อจำกัดการเพิ่มความเร็ว
เริ่มจาก silicon ingot ตัดเป็น wafer สร้างวงจรหลายขั้น ทดสอบ ตัด die และบรรจุแพ็กเกจ ไม่ใช่ทุก die ที่ผลิตแล้วใช้งานได้
- Yield คือสัดส่วน die ที่ผ่านการใช้งานต่อ wafer
- กราฟพัฒนาการ single-processor แสดงว่าอัตราเพิ่ม performance ชะลอลงในแต่ละยุค
- จึงต้องใช้หลายแนวทาง เช่น parallelism และระบบ memory ที่ดีร่วมกัน

ตัวอย่าง: wafer มี 100 dies ผ่านทดสอบ 80 dies → yield 80%
อ้างอิงสไลด์หน้า 24, 25, 26

### RISC, CISC และ Embedded
RISC เน้นชุดคำสั่งพื้นฐานที่เรียบง่าย ส่วน CISC รองรับคำสั่งซับซ้อนมากขึ้น แต่ความเร็วจริงยังขึ้นกับการออกแบบและโปรแกรม
- อย่าตัดสิน performance จากชื่อกลุ่ม ISA อย่างเดียว
- Embedded ผูกกับสภาพแวดล้อมของผลิตภัณฑ์ มักมี real-time constraints และหลายกิจกรรมพร้อมกัน
- สไลด์ยก ARM และ Cortex-M3 เป็นตัวอย่าง processor/microcontroller ที่เน้นพลังงานต่ำและการตอบสนอง interrupt

ตัวอย่าง: ตัวควบคุมเครื่องซักผ้าต้องอ่านเซนเซอร์และสั่งมอเตอร์ภายในเวลาที่กำหนด
อ้างอิงสไลด์หน้า 27, 28, 29, 30, 31

### Parallelism และ Flynn’s Taxonomy
งานขนานอาจมาจากข้อมูลหลายชิ้นหรืองานย่อยอิสระ ส่วนฮาร์ดแวร์รองรับได้ทั้งระดับคำสั่ง เวกเตอร์ thread และคำขอ
- DLP: คำนวณแบบเดียวกันบนข้อมูลหลายชิ้น; TLP: งานต่างชิ้นทำพร้อมกัน
- ILP ทำคำสั่งหลายคำสั่งซ้อน/ขนาน; vector/GPU รองรับข้อมูลจำนวนมาก
- Flynn: SISD = 1 คำสั่ง/1 ข้อมูล, SIMD = 1 คำสั่ง/หลายข้อมูล
- MIMD = หลายคำสั่ง/หลายข้อมูล; MISD พบใช้จำกัดในบริบทที่เรียน

ตัวอย่าง: ปรับความสว่างทุกพิกเซลเป็น DLP/SIMD; หลาย core รันคนละโปรแกรมเป็น MIMD
อ้างอิงสไลด์หน้า 32, 33

### รูปแบบสถาปัตยกรรมระดับระบบ
รูปแบบการจัดระบบกำหนดว่าหน้าที่และการคำนวณอยู่ตรงไหน ไม่ใช่รูปแบบคำสั่งของ CPU
- Monolithic รวมเป็นระบบเดียว; client-server แยกผู้ขอและผู้ให้บริการ
- Distributed systems กระจายการคำนวณผ่านหลายเครื่องในเครือข่าย
- Microservices แบ่งบริการย่อยที่ติดตั้งแยกได้ เป็นแนวคิดสถาปัตยกรรมซอฟต์แวร์

ตัวอย่าง: แอปส่งคำขอไปเซิร์ฟเวอร์เป็น client-server; เซิร์ฟเวอร์กระจายงานต่อหลายเครื่องเป็น distributed
อ้างอิงสไลด์หน้า 34

### Performance และวิธีจับเวลา
Performance สำหรับงานเดียวแปรผกผันกับ execution time ต้องระบุว่ากำลังวัดเวลารวมที่ผู้ใช้รอ หรือเวลาที่ CPU ประมวลผลงานนั้น
- Elapsed time รวม I/O, OS overhead และเวลารอ
- CPU time แบ่งเป็น user CPU time กับ system CPU time และไม่รวมเวลารอ I/O
- Throughput หมายถึงปริมาณงานที่เสร็จต่อช่วงเวลา จึงต่างจากเวลาของงานหนึ่งชิ้น

ตัวอย่าง: A ทำงานเดิม 10 s, B ใช้ 15 s → A มี performance เป็น 1.5 เท่าของ B
อ้างอิงสไลด์หน้า 35, 36, 37

### Clock, Instruction Count และ CPI
CPU time เกิดจากจำนวนคำสั่ง × จำนวน cycle เฉลี่ยต่อคำสั่ง × เวลาต่อ cycle จึงต้องพิจารณาทั้งสามตัวพร้อมกัน
- Clock period เป็นวินาที/cycle; clock rate เป็น cycles/s และเป็นส่วนกลับกัน
- Instruction count ขึ้นกับโปรแกรม ISA และ compiler
- CPI เป็นค่าเฉลี่ยตาม instruction mix และการออกแบบ CPU
- เพิ่มความถี่อาจแลกกับจำนวน cycle ที่มากขึ้น; GHz สูงอย่างเดียวสรุปไม่ได้

ตัวอย่าง: เครื่อง A: CPI 2 × 250 ps = 500 ps/คำสั่ง; B: 1.2 × 500 ps = 600 ps/คำสั่ง เมื่อ IC เท่ากัน A เร็วกว่า 1.2 เท่า
อ้างอิงสไลด์หน้า 38, 39, 40, 41, 42

### สูตร: อัตราเร็วสัมพัทธ์

Performance = 1/T; Speedup(A over B) = T_B/T_A

- T_A, T_B = เวลาทำงานเดียวกันบน A, B (s)
- Speedup = อัตราส่วน performance (ไม่มีหน่วย)

โจทย์: งานเดิม A ใช้ 10 s; B ใช้ 15 s
1. Speedup = 15 s / 10 s
2. ตัดหน่วย s/s ได้ 1.5

**ตอบ: A เร็วเป็น 1.5 เท่าของ B**
ระวัง: เครื่องที่เร็วกว่าอยู่ตัวหารของอัตราส่วนเวลา
อ้างอิงสไลด์หน้า 36

### สูตร: Clock period กับ Clock rate

Clock period = 1/Clock rate

- Clock rate = ความถี่ (Hz = cycles/s)
- Clock period = เวลาต่อ cycle (s/cycle)

โจทย์: Clock rate = 4 GHz = 4×10^9 Hz
1. Period = 1/(4×10^9) s
2. Period = 0.25×10^-9 s = 250×10^-12 s

**ตอบ: 0.25 ns = 250 ps ต่อ cycle**
ระวัง: GHz ต้องแปลงเป็น 10^9 Hz; ns คือ 10^-9 s และ ps คือ 10^-12 s
อ้างอิงสไลด์หน้า 38

### สูตร: สมการ CPU Time

CPU time = IC × CPI / f = Clock cycles / f

- IC = จำนวนคำสั่ง (instructions)
- CPI = cycle เฉลี่ยต่อคำสั่ง (cycles/instruction)
- f = clock rate (cycles/s)
- CPU time = เวลาประมวลผล (s)

โจทย์: IC = 1×10^9 instructions, CPI = 2, f = 4 GHz
1. Cycles = 10^9 × 2 = 2×10^9 cycles
2. CPU time = 2×10^9 / 4×10^9 s

**ตอบ: 0.5 s**
ระวัง: อย่าสับสน cycles กับ instructions และอย่าใช้ GHz เป็นเลข 4 โดยไม่ปรับขนาด
อ้างอิงสไลด์หน้า 39, 41

### สูตร: หา Clock rate ใหม่เมื่อ cycle เพิ่ม

f_B = (cycles_B/cycles_A) × T_A × f_A / T_B

- f_A, f_B = clock rate (Hz)
- T_A, T_B = CPU time (s)
- cycles_B/cycles_A = อัตราส่วนจำนวน cycle (ไม่มีหน่วย)

โจทย์: A = 2 GHz, 10 s; B ใช้ cycle 1.2 เท่า และต้องการเวลา 6 s
1. cycles_A = 10 × 2×10^9 = 20×10^9 cycles
2. cycles_B = 1.2 × 20×10^9 = 24×10^9 cycles
3. f_B = 24×10^9 / 6 = 4×10^9 Hz

**ตอบ: B ต้องมี clock rate 4 GHz**
ระวัง: ลดเวลาลง 40% ไม่ได้แปลว่าความถี่เพิ่ม 40% เพราะ cycles อาจเปลี่ยน
อ้างอิงสไลด์หน้า 40

### สูตร: CPI เฉลี่ยตามสัดส่วนคำสั่ง

CPI_avg = Σ(IC_i × CPI_i)/ΣIC_i = Σ(p_i × CPI_i)

- IC_i = จำนวนคำสั่งกลุ่ม i (instructions)
- CPI_i = cycles/instruction ของกลุ่ม i
- p_i = สัดส่วนคำสั่งกลุ่ม i (ไม่มีหน่วย)

โจทย์: คำสั่ง 60% ใช้ 1 cycle; 40% ใช้ 3 cycles
1. CPI_avg = 0.60×1 + 0.40×3
2. CPI_avg = 0.60 + 1.20 = 1.80 cycles/instruction

**ตอบ: CPI เฉลี่ย 1.8**
ระวัง: ห้ามบวก CPI แล้วหารจำนวนกลุ่ม ถ้าจำนวนคำสั่งแต่ละกลุ่มไม่เท่ากัน
อ้างอิงสไลด์หน้า 41

### จุดที่มักสับสน
- Architecture กับ organization อาจเกี่ยวข้องกัน แต่ตอบคนละระดับ: สิ่งที่มองเห็นจากโปรแกรมกับวิธีทำจริง
- 4 cores/8 threads ไม่ได้หมายถึง 8 core และไม่รับประกันเร็ว 2 เท่า
- Elapsed time กับ CPU time ไม่ใช่ตัวเลขเดียวกัน
- เปรียบเทียบ CPI อย่างเดียวไม่ได้ หาก IC หรือ clock rate ต่างกัน
- คำว่าเร็ว 1.5 เท่าหมายถึง performance ratio 1.5 ไม่ใช่ใช้เวลาเพิ่ม 50%
- RISC ไม่ได้รับประกันเร็วกว่า CISC ทุกงาน; algorithm และระบบทั้งหมดมีผล

### ลองตอบเอง
**PC กับ IR ต่างกันอย่างไร?**
PC ถือที่อยู่คำสั่งถัดไป ส่วน IR ถือบิตคำสั่งที่ถูก fetch มาให้ถอดรหัส/ทำงาน

**เครื่อง 3 GHz จำเป็นต้องเร็วกว่า 2 GHz หรือไม่?**
ไม่จำเป็น ต้องดู IC และ CPI รวมทั้งงานที่วัด; CPU time = IC×CPI/f

**งานปรับสีพิกเซลพร้อมกันเข้ากับ Flynn แบบใด?**
SIMD ถ้าคำสั่งเดียวถูกใช้กับข้อมูลหลายพิกเซล

อ้างอิง: itds-211_comp_arch_Chapter01.pdf

## บท 2 — How Computers Work
ระบบคอมพิวเตอร์ วงจรคำสั่ง และการขัดจังหวะ

ตามเส้นทางคำสั่งและข้อมูลผ่าน PC, IR, MAR, MBR และ AC แล้วเข้าใจว่า interrupt ช่วยให้ CPU จัดการ I/O ได้อย่างไร

### ใจความสำคัญ
- Von Neumann ใช้หน่วยความจำร่วมสำหรับคำสั่ง/ข้อมูล; Harvard แยกหน่วยความจำและทางเชื่อม
- Bus มี data, address, control และต้อง arbitration เมื่อหลายอุปกรณ์แย่งใช้
- Fetch: PC → MAR → memory → MBR → IR; PC เลื่อนไปคำสั่งถัดไป
- MAR เก็บ address, MBR เก็บ value; M[X] หมายถึงค่าที่ตำแหน่ง X
- MARIE ใช้คำสั่ง 16 bits แบ่ง opcode 4 bits กับ address 12 bits และมี AC เป็นศูนย์กลาง
- Interrupt ต้องเก็บสถานะ เข้าสู่ ISR แล้วคืนสถานะเพื่อทำงานเดิมต่อ; แยก maskable กับ nonmaskable

### ภาพจำ: เดินตามคำสั่งหนึ่งรอบ
![เดินตามคำสั่งหนึ่งรอบ](dist/images/review/cycle.svg)
ดึงคำสั่ง → ถอดรหัส → ทำงาน → อัปเดตผลหรือสถานะ แล้วไปคำสั่งถัดไป รูปนี้เป็นลำดับงานเชิงแนวคิด ไม่ได้กำหนดว่าทุกคำสั่งใช้ 4 clock เมื่อรับ interrupt ต้องเก็บสถานะที่จำเป็นก่อนทำ handler และคืนสถานะเพื่อกลับมาทำต่อ
อิงสไลด์หน้า 12, 13, 14, 15, 29, 32, 40, 43

### Stored Program: Von Neumann และ Harvard
Von Neumann เก็บคำสั่งกับข้อมูลใน memory ร่วมกัน ส่วน Harvard แยก instruction memory/bus ออกจาก data memory/bus
- Address ระบุตำแหน่ง ไม่ได้ระบุชนิดเนื้อหาโดยตัวมันเอง
- การใช้ทางเชื่อมร่วมทำให้ fetch คำสั่งและเข้าถึงข้อมูลอาจแย่งทรัพยากรกัน
- Harvard อนุญาตให้เข้าถึงคำสั่ง/ข้อมูลแยกทาง แต่เพิ่มความซับซ้อน
- ระบบผสมอาจแยก L1 instruction/data cache แต่ใช้ main memory ร่วมกัน

ตัวอย่าง: เหมือนมีประตูเดียวสำหรับคนเข้าออกเทียบกับแยกประตูคนเข้าและคนออก
อ้างอิงสไลด์หน้า 3, 4

### Bus และ Bus Arbitration
Bus เป็นเส้นทางสื่อสารระหว่างส่วนของเครื่อง มีทั้ง point-to-point และ multipoint; แบบ multipoint เป็นทรัพยากรร่วมจึงต้องกำหนดสิทธิ์ใช้งาน
- Data lines ขนค่า; address lines เลือกตำแหน่ง/อุปกรณ์; control lines บอกชนิดและจังหวะการโอน
- Distributed self-detection ให้อุปกรณ์ตัดสินสิทธิ์กันเอง; collision-detection ตรวจการชนแล้วลองใหม่
- Daisy chain ส่งสิทธิ์ตามลำดับความสำคัญ
- Centralized parallel ใช้วงจรกลางรับคำขอจากแต่ละอุปกรณ์

ตัวอย่าง: ถ้า DMA กับ CPU ต้องเป็น bus master พร้อมกัน ต้อง arbitration ก่อนให้ฝ่ายหนึ่งส่งข้อมูล
อ้างอิงสไลด์หน้า 5, 6, 7

### โปรแกรมควบคุม Hardware อย่างไร
แทนการต่อวงจรใหม่ทุกงาน เราส่งลำดับ instruction codes ให้ส่วนตีความสร้าง control signals ไปควบคุมวงจรเลขคณิต/ตรรกะ
- CPU มีตัวตีความคำสั่งและหน่วยประมวลผลทั่วไป
- I/O รับข้อมูล/คำสั่งและรายงานผล
- ภาพระดับบนเชื่อม CPU, main memory และ I/O modules ด้วย system bus

ตัวอย่าง: เปลี่ยนโปรแกรมจากบวกเป็นลบได้ด้วยเปลี่ยนรหัสคำสั่ง ไม่ต้องเปลี่ยนสายวงจร
อ้างอิงสไลด์หน้า 8, 9, 11

### Registers สำคัญในวงจรรับส่งข้อมูล
จำหน้าที่แยกเป็นที่อยู่กับค่าที่ส่ง: MAR/I/OAR ระบุเป้าหมาย ส่วน MBR/I/OBR ถือข้อมูล
- PC = address ของคำสั่งถัดไป; IR = คำสั่งที่กำลังทำ
- MAR = memory address สำหรับ read/write; MBR = ค่าที่อ่านมา/กำลังเขียน
- I/OAR เลือกอุปกรณ์; I/OBR แลกข้อมูลกับ I/O module
- AC เก็บ operand หรือผลชั่วคราวในเครื่องแบบ accumulator

ตัวอย่าง: อ่าน M[104]: MAR=104 แต่ MBR เป็นค่าที่เก็บในตำแหน่ง 104 เช่น 0023
อ้างอิงสไลด์หน้า 10, 11, 14, 17

### Fetch–Decode–Execute
วงจรคำสั่งเริ่มจาก fetch คำสั่งมาถอดรหัส ถ้าต้องใช้ operand จาก memory จึงหา address และอ่านข้อมูล ก่อนดำเนินการและเก็บผล
- MAR ← PC; MBR ← M[MAR]; IR ← MBR; PC เลื่อนไปคำสั่งถัดไป
- Decode แยก opcode กับ operand/address
- อาจต้อง fetch operands หลายตัวหรือเก็บหลายผล ไม่ใช่ทุกคำสั่งมีจำนวนขั้นเท่ากัน
- Branch/jump เปลี่ยน PC แทนการไล่ลำดับตามปกติ

ตัวอย่าง: คำสั่ง Load 104 ถูก fetch ลง IR ก่อน แล้วจึงอ่านข้อมูล M[104] ลง AC
อ้างอิงสไลด์หน้า 12, 13, 15, 25, 28, 29

### MARIE: แบบจำลองเครื่องขนาดเล็ก
MARIE เป็นเครื่องสำหรับเรียนหลักการ ประกอบด้วย AC และ registers ที่เชื่อมผ่าน data bus พร้อมทางเชื่อมเฉพาะเข้า ALU
- AC/MBR/IR กว้าง 16 bits; MAR/PC กว้าง 12 bits
- InREG/OutREG กว้าง 8 bits
- Address 12 bits เลือกได้ 4096 ตำแหน่ง แต่ละคำมี 16 bits
- ISA เป็นข้อตกลงระหว่าง hardware/software; สไลด์ระบุ MARIE มี 13 คำสั่ง

ตัวอย่าง: PC 12 bits เลือกคำสั่งได้ตั้งแต่ address 0 ถึง 4095
อ้างอิงสไลด์หน้า 17, 18, 19, 20, 21

### รูปแบบคำสั่งและคำสั่ง MARIE
คำสั่ง 16 bits แบ่ง opcode 4 bits ด้านบนกับ address/ช่องควบคุม 12 bits ด้านล่าง อ่านรหัส hex ได้เป็น opcode หนึ่งหลักตามด้วย address สามหลัก
- Load X: AC ← M[X]; Store X: M[X] ← AC
- Add X/Subt X ใช้ค่าใน memory รวมกับ/หักจาก AC
- Input/Output รับส่งค่า; Halt จบ; Jump X เปลี่ยน PC
- Skipcond ใช้ AC ตัดสินว่าจะข้ามคำสั่งถัดไปหรือไม่

ตัวอย่าง: 0x1003 = opcode 1 (Load), address 0x003 → AC ← M[3]
อ้างอิงสไลด์หน้า 21, 22, 23, 24

### Microoperations และ RTL
หนึ่ง machine instruction แตกเป็น microoperations หลายขั้น โดย RTL ใช้ลูกศรแทนการถ่ายโอนค่า และ M[X] แทนเนื้อหา memory
- LOAD X: MAR ← X; MBR ← M[MAR]; AC ← MBR
- ADD X: MAR ← X; MBR ← M[MAR]; AC ← AC+MBR
- STORE ต้องนำ AC ไปเขียนตำแหน่งที่ address ระบุ
- PC ที่เพิ่มตอน fetch เป็นคนละเหตุการณ์กับการแก้ PC จาก jump/skip

ตัวอย่าง: ถ้า AC=7, M[20]=5 คำสั่ง Add 20 ทำให้ MAR=20, MBR=5 และ AC=12
อ้างอิงสไลด์หน้า 25, 26, 35, 36

### Skipcond และการเปลี่ยน Flow
Skipcond ข้ามหนึ่งคำสั่งเมื่อเงื่อนไขของ AC เป็นจริง หลัง fetch ทำให้ PC ชี้คำสั่งถัดไปแล้ว การ skip จึงเพิ่ม PC อีกหนึ่งตำแหน่งของ MARIE
- IR[11:10]=00 ตรวจ AC<0
- IR[11:10]=01 ตรวจ AC=0
- IR[11:10]=10 ตรวจ AC>0 ตามตัวอย่างบิตหน้า 24
- สไลด์ RTL หน้า 27 พิมพ์ 11 ในเงื่อนไขสุดท้าย ซึ่งขัดกับหน้า 24

ตัวอย่าง: ถ้า AC=5 และ IR=0x8800 จะข้ามคำสั่งถัดไป; ถ้า AC=0 จะไม่ข้าม
อ้างอิงสไลด์หน้า 24, 27

### ตามรอยโปรแกรมสั้น
ตัวอย่างเก็บคำสั่งที่ address 0x100-0x103 แล้ว Load ค่าหนึ่ง บวกอีกค่า Store ผล และ Halt ต้องแยก address ของคำสั่งออกจาก address ของข้อมูล
- 0x100: Load 104; 0x101: Add 105; 0x102: Store 106; 0x103: Halt
- M[104]=0x0023 = 35; M[105]=0xFFE9 = -23 ใน two’s complement 16 bits
- หลัง Add ได้ 0x000C = 12 แล้ว Store ไป M[106]

ตัวอย่าง: เมื่อ fetch Add 105 ที่ PC=101 จะได้ IR=3105 และ PC=102 ก่อนอ่าน operand ที่ 105
อ้างอิงสไลด์หน้า 14, 35, 36

### Interrupt, ISR และการคืนงานเดิม
Interrupt ทำให้ CPU หยุด flow ปกติชั่วคราวเพื่อให้ interrupt service routine จัดการเหตุการณ์ แล้วกลับไปทำงานที่ค้างอยู่
- ต้องเก็บ return PC และสถานะ/registers ที่จำเป็น
- หา address ของ ISR → เปลี่ยน PC → ทำ ISR → restore สถานะและกลับ
- ตรวจ interrupt ที่จุดเหมาะสมในวงจรคำสั่ง ไม่ใช่ลบทิ้งโปรแกรมเดิม
- สไลด์รวมทั้ง hardware interrupts และ software requests/system calls ในบทนี้

ตัวอย่าง: อุปกรณ์อ่านข้อมูลเสร็จ → แจ้ง CPU → ISR จัดการข้อมูล → โปรแกรมเดิมทำต่อ
อ้างอิงสไลด์หน้า 30, 31, 32, 39, 40, 43

### ชนิด Interrupt และการซ้อนกัน
เหตุการณ์อาจมาจากโปรแกรม timer, I/O หรือ hardware failure การรับหลายเหตุการณ์ขึ้นกับการ mask และระดับความสำคัญ
- Program: เช่น illegal instruction, divide by zero หรือ memory protection
- Timer ให้ OS ทำงานตามช่วง; I/O แจ้งเสร็จ/ขอบริการ/แจ้งผิดพลาด
- Maskable interrupt ปิดกั้นชั่วคราวได้; nonmaskable ใช้กับเหตุการณ์สำคัญที่ต้องจัดการ
- จัดได้แบบ sequential หรือ nested: ISR สำคัญกว่าขัดจังหวะ ISR ที่กำลังทำ

ตัวอย่าง: ISR เครื่องพิมพ์อาจถูก communication ISR ที่มี priority สูงกว่าขัดจังหวะ แล้วค่อยกลับมาทำต่อ
อ้างอิงสไลด์หน้า 33, 37, 44, 45

### Polling กับ Interrupt-driven I/O
Polling ให้ CPU คอยตรวจสถานะอุปกรณ์ ส่วน interrupt ให้ CPU ทำอย่างอื่นและรับแจ้งเมื่ออุปกรณ์พร้อม จึงลดการรอเปล่าได้ แต่ยังมีค่าใช้จ่ายเข้า ISR
- MARIE ใช้ programmed I/O แบบง่าย โดยตรวจ InREG แล้วนำค่าเข้า AC
- ผลส่งออกผ่าน OutREG
- Interrupt ช่วย overlap การประมวลผลกับ I/O ได้ทั้งกรณีรอสั้นและรอนาน
- ถ้า I/O ยังไม่เสร็จเมื่อจำเป็นต้องใช้ผล CPU อาจยังต้องรอ

ตัวอย่าง: แทนยืนเฝ้าหม้ออย่างเดียว ตั้งเสียงเตือนแล้วทำอาหารอีกอย่างระหว่างรอ
อ้างอิงสไลด์หน้า 34, 38, 41, 42

### สูตร: จำนวนตำแหน่งที่ Address ระบุได้

Addressable locations = 2^a; Capacity = 2^a × w/8 bytes

- a = จำนวน address bits (bits)
- w = ข้อมูลต่อหนึ่งตำแหน่ง (bits/location)
- Capacity = ความจุ (bytes)

โจทย์: MARIE มี address 12 bits และแต่ละตำแหน่งเก็บ 16-bit word
1. ตำแหน่ง = 2^12 = 4096 words
2. ความจุ = 4096×16/8 = 8192 bytes
3. 8192/1024 = 8 KiB

**ตอบ: 4096 words = 8 KiB; address สูงสุด 4095**
ระวัง: 2^12 คือจำนวนตำแหน่ง ไม่ใช่ address สูงสุด และ MARIE นี้เป็น word-addressed
อ้างอิงสไลด์หน้า 17, 18

### สูตร: ถอดรหัสคำสั่ง MARIE

Instruction = opcode × 2^12 + address

- Instruction = คำสั่ง 16-bit (บิตแพตเทิร์น ไม่มีหน่วย)
- opcode = ช่อง 4 bits
- address = ช่อง 12 bits เป็นตำแหน่ง word

โจทย์: Instruction = 0x1003
1. opcode = (0x1003 >> 12) = 0x1
2. address = 0x1003 AND 0x0FFF = 0x003
3. opcode 1 คือ Load → AC ← M[3]

**ตอบ: Load ข้อมูลจาก word address 3 ลง AC**
ระวัง: 0x1003 เป็นบิตคำสั่ง ไม่ใช่ค่าข้อมูล 1003 ที่ต้องนำเข้า AC
อ้างอิงสไลด์หน้า 22, 23

### สูตร: ตรวจผลโปรแกรม 16-bit

Result bits = (A + B) mod 2^16

- A, B = บิตข้อมูล 16-bit ที่ตีความ signed ได้ (จำนวนเต็ม ไม่มีหน่วย)
- mod 2^16 = เก็บผล 16 bits ล่าง

โจทย์: M[104]=0x0023; M[105]=0xFFE9; ใช้ two’s complement 16-bit
1. 0x0023 = 35; 0xFFE9 = 65513−65536 = −23
2. 35 + (−23) = 12
3. 0x0023 + 0xFFE9 = 0x1000C; เก็บ 16 bits ล่าง = 0x000C

**ตอบ: AC = 12 และหลัง Store 106 จะได้ M[106]=0x000C**
ระวัง: carry-out ไม่ใช่ signed overflow; ตัวอย่างนี้ผล 12 อยู่ในช่วง 16-bit signed
อ้างอิงสไลด์หน้า 35, 36

### จุดที่มักสับสน
- MAR เก็บ address ส่วน MBR เก็บเนื้อหา; M[104] ไม่ใช่เลข 104
- MARIE เพิ่ม PC ทีละหนึ่ง word; อย่านำกฎ RISC-V +4 bytes มาใช้
- หลัง fetch แล้ว PC ชี้คำสั่งถัดไป จึงต้องเพิ่มอีกครั้งเมื่อ Skipcond สำเร็จ
- สไลด์หน้า 27 มีรหัส Skipcond เงื่อนไข AC>0 ขัดกับหน้า 24: ใช้ 10
- Interrupt ต้องคืนบริบทเดิม มิฉะนั้นโปรแกรมเดิมอาจกลับมาพร้อม registers ผิด
- Interrupt ช่วยใช้เวลารอ I/O ให้คุ้มขึ้น แต่ไม่ได้ทำให้อุปกรณ์ I/O เร็วขึ้นโดยตรง

หมายเหตุสไลด์หน้า 27
RTL บรรทัดสุดท้ายเขียน IR[11:10]=11 สำหรับ AC>0
ใช้ให้ถูก: ใช้ IR[11:10]=10 สำหรับ AC>0
ตรงกับ bit pattern ของ Skipcond หน้า 24 และรูปแบบ Skipcond 800

### ลองตอบเอง
**ถ้า MAR=105 และ M[105]=0xFFE9 หลังอ่าน memory ค่าไหนอยู่ใน MBR?**
MBR=0xFFE9; 105 เป็น address ส่วน 0xFFE9 เป็นข้อมูล

**คำสั่ง 0x3105 ของ MARIE ทำอะไร?**
opcode 3 = Add; อ่าน M[0x105] แล้วบวกเข้า AC

**ทำไม ISR ต้องเก็บและคืน registers?**
เพื่อให้โปรแกรมที่ถูกขัดจังหวะกลับมาทำต่อด้วยสถานะเดิมที่ถูกต้อง

อ้างอิง: itds-211_comp_arch_Chapter02.pdf

## บท 3 — Data & RISC-V
การแทนข้อมูล ชุดคำสั่ง และ Assembly

บิตชุดเดียวกันมีความหมายตามชนิดข้อมูล เรียนการแทนจำนวนก่อนตามรอยคำสั่ง RISC-V ตั้งแต่ register และ memory ไปจนถึง branch, procedure และการสร้างโปรแกรม

### ใจความสำคัญ
- กำหนดจำนวน bits และชนิด signed/unsigned ก่อนตีความหรือคำนวณทุกครั้ง
- Sign-magnitude/one’s complement มี ±0; two’s complement มีศูนย์เดียวและช่วง −2^(n−1) ถึง 2^(n−1)−1
- IEEE 754 แยก sign, exponent ที่เก็บแบบ bias และ fraction; สูตร 1.f ใช้กับ normalized numbers
- ตัวอย่างหลักใช้ RV64: registers 64 bits แต่คำสั่งพื้นฐานที่เรียนยาว 32 bits; RV32 มี registers 32 bits
- Memory เป็น byte-addressed: array offset = index × bytes/element; ld/sd ใช้ doubleword 8 bytes ใน RV64
- แยก R/I/S/B/U/J formats, signed/unsigned branch และ PC-relative offset
- เรียก procedure ต้องรักษา return address/ข้อมูลที่ยังต้องใช้ แล้วคืน stack และ saved registers ให้ถูกต้อง

### ภาพจำ: บิตเดิม แต่ตีความได้สองแบบ
![บิตเดิม แต่ตีความได้สองแบบ](dist/images/review/binary.svg)
ตัวอย่างเสริมขนาด 8 บิต: 10110010₂ คือ 178 เมื่ออ่านแบบ unsigned แต่เป็น −78 เมื่ออ่านแบบ two’s complement ต้องดูชนิดข้อมูลก่อนคำนวณ ตัวอย่างนี้ไม่ได้หมายความว่า register ของ RV64 มีเพียง 8 บิต
อิงสไลด์หน้า 5, 18, 19, 20, 21, 22, 53, 70

### ภาพจำ: Load ต้องคำนวณที่อยู่ก่อน
![Load ต้องคำนวณที่อยู่ก่อน](dist/images/review/riscv.svg)
ตัวอย่างเสริม RV64: ld x5, 16(x10) นำข้อมูล 8 ไบต์จากที่อยู่ x10 + 16 มาใส่ x5 โดย offset นับเป็นไบต์ ในรูปสมมติ x10 = 1000 และข้อมูลที่อ่านได้คือ 42
อิงสไลด์หน้า 49, 50

### ระบบเลขและ Unsigned
ข้อมูลถูกเก็บเป็นบิต แต่เราตีความเป็นตัวเลขหรือสัญลักษณ์ตามบริบท ฐาน b ให้น้ำหนักแต่ละหลักเป็นกำลังของ b รวมทั้งหลักหลังจุดที่เป็นกำลังลบ
- ฐาน 2 ใช้ 0/1; ฐาน 8 ใช้ 0–7; ฐาน 16 ใช้ 0–9/A–F
- 1 hex digit แทน 4 bits จึงอ่านบิตยาวได้สะดวก
- Unsigned n bits มี 2^n ค่า ตั้งแต่ 0 ถึง 2^n−1
- จำนวนเต็มกับจำนวนมีเศษต้องใช้วิธีแทนที่เหมาะสม

ตัวอย่าง: 101.1101₂ = 4+1+1/2+1/4+1/16 = 5.8125₁₀; 0xAF = 175
อ้างอิงสไลด์หน้า 4, 5, 6, 7, 8, 30

### Sign-magnitude และ One’s Complement
Sign-magnitude แยกบิตเครื่องหมายออกจากขนาด ส่วน one’s complement แทนค่าลบด้วยการกลับทุกบิตของค่าบวก ทั้งคู่มีศูนย์สองแบบ
- ถ้านับ n เป็นจำนวน bits ทั้งหมด ช่วงทั้งสองแบบคือ −(2^(n−1)−1) ถึง +(2^(n−1)−1)
- Sign-magnitude กลับเครื่องหมายโดยเปลี่ยน sign bit; การบวกต้องดูเครื่องหมายและเทียบ magnitude
- One’s complement กลับทุกบิต; บวกแล้วมี carry-out ให้นำกลับมาบวกที่ LSB เรียก end-around carry
- Complement ทั่วไปในฐาน r: (r−1)’s = (r^n−1)−m; r’s = r^n−m

ตัวอย่าง: 8-bit −5: sign-magnitude = 10000101; one’s complement = 11111010; 4-bit one’s: 0011 + 1101 = 1 0000 → 0001 แทน 3+(−2)=1
อ้างอิงสไลด์หน้า 9, 10, 11, 12, 13, 14, 15, 16, 17, 21, 22

### Two’s Complement, Sign Extension และ Overflow
Two’s complement ทำค่าลบด้วยกลับบิตแล้วบวกหนึ่ง เก็บผลตามความกว้างที่กำหนด ทำให้วงจรบวกใช้ทำการลบได้และมีศูนย์เดียว
- n bits มีช่วง −2^(n−1) ถึง 2^(n−1)−1; บิตบนสุดมีน้ำหนัก −2^(n−1)
- A−B ทำเป็น A+(two’s complement ของ B) แล้วเก็บ n bits ล่าง
- Sign extension คัดลอก sign bit ไปยัง bits ที่เพิ่ม; unsigned ใช้ zero extension
- Signed overflow เกิดเมื่อบวกเลขเครื่องหมายเดียวกันแต่ผลที่เก็บกลับเป็นอีกเครื่องหมาย; carry-out อย่างเดียวตัดสินไม่ได้

ตัวอย่าง: 8-bit 11111011 เป็น 251 แบบ unsigned แต่เป็น −5 แบบ signed; 4-bit 0110+1011=1 0001 → 1 คือ 6+(−5)
อ้างอิงสไลด์หน้า 18, 19, 20, 21, 22, 53, 70, 83

### Bias / Excess Notation
เก็บค่าจริงโดยบวก bias ให้เป็นรหัส unsigned ตอนอ่านค่าต้องลบ bias กลับ วิธีนี้ใช้กับ exponent ของ floating point
- ค่าจริง = รหัส unsigned − B; รหัสที่เก็บ = ค่าจริง + B
- รหัสต่ำสุด 0 แทนค่า −B
- 8-bit bias 127 มีช่วง −127 ถึง 128 หากใช้รหัสทั้งหมด
- เมื่อใช้ใน IEEE จะกัน exponent บางรหัสไว้เป็นกรณีพิเศษ

ตัวอย่าง: เก็บ exponent จริง 4 ด้วย bias 127 → E=131=10000011₂
อ้างอิงสไลด์หน้า 23, 24, 28

### Floating Point และ IEEE 754
Floating point เก็บ sign, exponent และ fraction เพื่อแทนจำนวนที่มีเศษและช่วงค่ากว้าง Normalized binary เขียนเป็น (−1)^s×1.f×2^e โดยเลข 1 หน้าจุดไม่ต้องเก็บ
- Single: 32 bits = sign 1 + exponent 8 + fraction 23, bias 127; double: 64 = 1+11+52, bias 1023
- Single แบบ normalized ใช้ E=1…254 และ e=E−127 = −126…127
- E=0: fraction=0 คือ ±0; fraction≠0 คือ subnormal ที่ไม่มี hidden 1
- E=255: fraction=0 คือ ±∞; fraction≠0 คือ NaN
- Fraction มีจำนวน bits จำกัด หลายค่าจึงต้องปัดเศษ; ค่าสูงสุด finite single คือ (2−2^-23)×2^127

ตัวอย่าง: 5.8125 = 1.011101₂×2² → sign=0, E=129, fraction=011101 ตามด้วยศูนย์; 17.15 ในสไลด์เป็นค่าที่ต้องประมาณด้วย bits จำกัด
อ้างอิงสไลด์หน้า 25, 26, 27, 28, 29, 30, 31

### Characters, ASCII และ Unicode
รหัสอักขระเป็นข้อตกลงว่าบิตแทนอักษรใด ไม่ใช่ค่าตัวเลขของตัวอักษรนั้น ASCII มีรหัส 7-bit 128 ค่า ส่วน Unicode ครอบคลุมอักษรหลายภาษา
- ASCII มีอักษร ตัวเลข เครื่องหมาย และ control characters; สไลด์เทียบกับ EBCDIC
- รหัส ASCII ของเลข 0…9 คือ 0x30…0x39 จึงต้องหัก 0x30 เพื่อได้ตัวเลข
- A=65=0x41 และ a=97=0x61 ต่างกัน 0x20
- Unicode เป็นชุด code points; UTF-8/UTF-16 เป็นวิธีเข้ารหัส จึงไม่ใช่อักขระทุกตัวมีขนาด 32 bits
- String แบบ C ลงท้ายด้วย byte ศูนย์ (NUL) ซึ่งต้องถูกคัดลอกด้วย

ตัวอย่าง: อักขระ 5 เก็บ byte 0x35 = 53 แต่จำนวนเต็ม 5 ไม่ได้มีค่าเท่ากับรหัสอักขระนี้
อ้างอิงสไลด์หน้า 32, 33, 34, 35, 36, 37, 82, 85, 86

### ISA, Registers และ RV32/RV64
ISA ระบุคำสั่งและรูปแบบที่เครื่องรองรับ ในบทนี้ RISC-V ใช้ load/store แยกการเข้าถึง memory ออกจากคำสั่ง arithmetic และตัวอย่างส่วนใหญ่เป็น RV64
- มี integer registers x0…x31; x0 อ่านได้ 0 เสมอ
- RV64 registers กว้าง 64 bits: word=32 bits และ doubleword=64 bits; RV32 registers กว้าง 32 bits
- x1=ra, x2=sp, x3=gp, x4=tp; x10…x17 ใช้ส่ง arguments และ x10…x11 ใช้ส่งผล
- Temporaries x5…x7/x28…x31; saved registers x8…x9/x18…x27 โดย x8 ใช้เป็น frame pointer ได้
- คำสั่งพื้นฐานที่เรียนเข้ารหัส 32 bits แม้ registers จะกว้าง 64 bits; extension C มีคำสั่งย่อ 16 bits

ตัวอย่าง: add x9,x20,x21 อ่าน x20 กับ x21 แล้วเก็บผล x9 ไม่ได้อ่าน memory โดยตรง
อ้างอิงสไลด์หน้า 41, 42, 43, 45, 46, 51, 54, 76, 114, 116, 117

### Arithmetic และ Immediate
คำสั่งแบบสาม operands วางปลายทางก่อนแล้วตามด้วยแหล่งข้อมูล สำหรับค่าคงที่ขนาดเล็กใช้ immediate ที่ฝังในคำสั่งเพื่อลดการโหลด
- add rd,rs1,rs2 และ sub rd,rs1,rs2 ทำงานกับ registers
- addi ใช้ signed immediate 12 bits ช่วง −2048…2047 และ sign-extend
- f=(g+h)−(i+j) ต้องบวกสองคู่แล้วใช้ sub กับผลรวมทั้งสอง
- lui วาง immediate 20 bits ใน bits31:12 และให้ 12 bits ล่างเป็นศูนย์; RV64 sign-extend จาก bit31
- ค่าคงที่กว้างอาจใช้ lui ร่วม addi; ต้องระวัง addi ตีความ 12 bits ล่างแบบ signed

ตัวอย่าง: g=7,h=5,i=2,j=3 → temp0=12,temp1=5,f=7; addi x22,x22,4 เพิ่มค่า x22 อีก 4
อ้างอิงสไลด์หน้า 43, 44, 47, 52, 57, 87, 116

### Memory Operands, Endianness และ Load/Store
RISC-V ในตัวอย่างใช้ byte-addressed memory: address เพิ่ม 1 คือเลื่อนไป 1 byte การหา array element ต้องคูณ index ด้วยขนาดจริงของ element
- Effective address = base register + signed byte offset; ld/sd เป็น doubleword 8 bytes ใน RV64
- Little-endian วาง byte ที่มีนัยสำคัญต่ำที่ address ต่ำ; big-endian วาง byte ที่มีนัยสำคัญสูงก่อน
- lb/lh/lw sign-extend เป็น XLEN; lbu/lhu และ lwu ใน RV64 zero-extend
- sb/sh/sw เก็บเฉพาะ 8/16/32 bits ล่าง; ld/sd ไม่ใช่คำสั่งพื้นฐานของ RV32I
- Aligned access สะดวกต่อฮาร์ดแวร์; พฤติกรรม misaligned access ขึ้นกับ execution environment ไม่ควรเหมารวมว่าทำได้เสมอ

ตัวอย่าง: base A=0x1000 และเป็น 64-bit elements → A[8] ที่ 0x1040; ld x9,64(x22) อ่าน 8 bytes จากตำแหน่งนั้น
อ้างอิงสไลด์หน้า 48, 49, 50, 51, 53, 83, 103, 111, 112

### Instruction Encoding: R/I/S/B/U/J
Machine code แบ่งเป็นช่องบิตที่ระบุชนิดงาน register และ immediate รูปแบบต่างกันแต่เก็บช่องที่ใช้ร่วมไว้ตำแหน่งเดิมเพื่อลดความซับซ้อนของ decoder
- R: funct7(7), rs2(5), rs1(5), funct3(3), rd(5), opcode(7)
- I: imm12, rs1, funct3, rd, opcode; ใช้ arithmetic immediate และ load
- S: immediate แยกเป็น imm11:5 กับ imm4:0 พร้อม rs2/rs1; store ไม่มี rd
- B/SB ใช้ conditional branch; J/UJ ใช้ jal; offset มีบิตศูนย์ล่างโดยนัย จึงเป็นจำนวนคู่ bytes
- U ใช้ imm20 กับ rd/opcode สำหรับ lui/auipc; จำว่าเลข register 5 bits ไม่ใช่ค่าภายใน register

ตัวอย่าง: add x9,x20,x21 → funct7=0, rs2=21, rs1=20, funct3=0, rd=9, opcode=0x33 → 0x015A04B3
อ้างอิงสไลด์หน้า 54, 55, 56, 57, 58, 59, 88, 89, 90, 91, 115, 116

### Logical Operations และ Shifts
คำสั่งตรรกะทำงานทีละบิต เหมาะกับ mask, ตั้งบิต และกลับบิต ส่วน shift ช่วยย้ายบิตหรือคูณ/หารด้วยกำลังสองภายใต้ข้อจำกัดของขนาดข้อมูล
- AND เลือกบิตที่ต้องการ; OR ตั้งบิต; XOR กลับบิตเฉพาะที่ mask เป็น 1
- XOR กับทุกบิตเป็น 1 ทำ NOT ได้ เช่น xori rd,rs,−1
- slli เลื่อนซ้ายเติม 0; srli เลื่อนขวาเติม 0 จึงเหมาะกับ unsigned
- Arithmetic right shift (srai) เติม sign bit; ผลลบอาจต่างจากหารจำนวนเต็มที่ปัดเข้าศูนย์
- RV64 shift amount สูงสุด 63 สำหรับคำสั่ง 64-bit; RV32 สูงสุด 31

ตัวอย่าง: 0b10101100 AND 0b00001111 = 0b00001100 = 12; index×8 ใช้ slli ...,3
อ้างอิงสไลด์หน้า 60, 61, 62, 63, 64, 103, 116

### Branches, If/Loop และ Basic Blocks
Branch เลือก flow จากเงื่อนไข ถ้าไม่เข้าเงื่อนไขให้ทำคำสั่งถัดไป PC-relative target ใช้ address ของคำสั่ง branch เป็นฐาน ไม่ใช่ PC+4
- beq/bne ตรวจเท่ากัน/ต่างกัน; blt/bge เปรียบเทียบ signed และ bltu/bgeu เปรียบเทียบ unsigned
- If/else มัก branch ด้วยเงื่อนไขกลับด้านเพื่อข้าม body ที่ไม่ต้องทำ
- Loop มีจุดตรวจเงื่อนไข body การเปลี่ยนตัวแปร และทางย้อนกลับ
- Basic block มีทางเข้าที่ต้นและทางออกท้าย ไม่มี branch/branch target แทรกกลาง
- Assembler คำนวณ offset ของ label; offset ที่อธิบายเป็น halfword ต้องคูณ 2 เพียงครั้งเดียว

ตัวอย่าง: บิตทั้งหมดเป็น 1 เทียบกับ 1: signed คือ −1<1 แต่ unsigned คือค่าสูงสุด>1; while(save[i]==k) โหลดค่าแล้ว bne ไป Exit
อ้างอิงสไลด์หน้า 65, 66, 67, 68, 69, 70, 88, 89, 90

### Procedure Calls, Stack และ Recursion
ส่ง arguments ใน registers แล้ว jal ไปฟังก์ชันโดยบันทึก return address ส่วน jalr ใช้กลับ ค่าใน stack ช่วยรักษาสถานะเมื่อ registers ไม่พอหรือมีการเรียกซ้อน
- jal x1,label เก็บ address คำสั่งถัดไปใน ra; return ใช้ jalr x0,0(x1)
- Leaf ไม่มีการ call อื่น; non-leaf/recursion ต้องรักษา ra เดิมและค่าที่ต้องใช้หลัง call
- Callee ต้องคืน saved registers ที่ตนใช้; caller รักษา arguments/temporaries ที่ยังต้องใช้ข้าม call
- Stack ในตัวอย่างโตลง address ต่ำ: ลด sp เพื่อจอง ใช้ sd เก็บ/ld คืน แล้วเพิ่ม sp เท่าเดิม
- ตัวอย่าง frame 24/40 bytes ในสไลด์เป็นภาพสอนการเก็บข้อมูล; โค้ดตาม ABI จริงต้องคำนึงถึง alignment เพิ่มเติม

ตัวอย่าง: factorial(3) เก็บ n กับ ra ก่อนเรียก factorial(2); เมื่อได้ 2 กลับมา คืน n=3 แล้วคูณได้ 6
อ้างอิงสไลด์หน้า 71, 72, 73, 74, 75, 76, 77, 78, 79, 81, 107

### Memory Layout, Arrays, Pointers และ Strings
พื้นที่โปรแกรมแบ่งตามอายุและหน้าที่ของข้อมูล ส่วนการเข้าถึง array กับ pointer สุดท้ายคำนวณเป็น address เดียวกันได้
- Text เก็บ code; static data เก็บ globals/ข้อมูลตลอดอายุโปรแกรม; heap เก็บข้อมูล dynamic; stack เก็บ frame และ local automatic data
- Array address = base + index×element size; pointer loop เพิ่มทีละ element size ในระดับ byte address
- strcpy อ่าน byte จาก source แล้วเขียน destination จนพบ NUL และต้องรวม byte NUL
- Swap 64-bit v[k],v[k+1] ใช้ offset k×8 และอีกตำแหน่ง +8 แล้ว ld/ld/sd/sd
- Compiler อาจลดคูณเป็น shift และเปลี่ยน index loop เป็น pointer loop ได้ จึงควรเขียนให้ชัดเจนก่อน

ตัวอย่าง: 64-bit array เริ่ม 4096: v[3] ที่ 4120 และ v[4] ที่ 4128; ถ้าเป็น int 4 bytes ต้องใช้ stride 4 แทน 8
อ้างอิงสไลด์หน้า 80, 81, 85, 86, 102, 103, 111, 112, 113

### Synchronization และ Atomic Operations
หลาย processors ใช้ memory ร่วมกันอาจเกิด data race หากอ่าน/เขียนทับกันโดยไม่มีการประสาน ต้องใช้การทำงาน atomic เพื่อสร้าง lock ที่ถูกต้อง
- lr.d อ่านค่าและตั้ง reservation; sc.d พยายามเขียน โดยคืน status=0 เมื่อสำเร็จ และ nonzero เมื่อไม่สำเร็จ
- เมื่อ sc.d ไม่สำเร็จต้องกลับไปอ่าน/ลองใหม่
- Lock ตัวอย่างใช้ 0=ว่าง, 1=ถูกยึด; ต้องตรวจและเปลี่ยนค่าอย่าง atomic
- sd x0,0(lock) เป็นแนวคิดปลด lock ในสไลด์; ระบบจริงยังต้องคำนึง memory ordering ด้วย

ตัวอย่าง: สอง core เห็น lock=0 พร้อมกัน: load/store ปกติอาจทำให้ทั้งคู่เข้า critical section; lr/sc ให้ตรวจว่าการยึดสำเร็จจริง
อ้างอิงสไลด์หน้า 92, 93, 94, 117

### Compiler → Assembler → Linker → Loader และ Java
ไฟล์ object ยังมีส่วนที่ต้องเชื่อมกับไฟล์อื่น Linker รวมและแก้ที่อยู่ก่อน Loader จัดพื้นที่ memory และเริ่มโปรแกรม
- Object module มี header, text, static data, relocation info, symbol table และ debug info
- Linker รวม segments, resolve symbols และแก้ references ให้เป็น executable
- Loader สร้าง address space, วาง code/data, เตรียม stack/arguments/registers แล้วเข้า startup/main
- Dynamic linking ใช้ code library ร่วมและอาจผูกตอนเรียกครั้งแรกผ่าน stub/indirection table
- Java เริ่มจาก bytecode ให้ JVM ตีความ และ JIT แปลส่วนที่ใช้บ่อยเป็น native code

ตัวอย่าง: ไฟล์หนึ่งเรียกฟังก์ชันที่อยู่อีกไฟล์ → linker หา symbol และเชื่อม reference ให้ ก่อน loader เริ่มรัน
อ้างอิงสไลด์หน้า 95, 96, 97, 98, 99, 100, 101

### ตัวอย่าง Sort, Optimization และ ISA Extensions
ตัวอย่างรวม loop, address calculation, procedure calls และการรักษา registers ไว้ด้วยกัน ผลการ optimize ต้องดูเวลาจริงร่วมกับ algorithm ไม่ใช่ดู IC หรือ CPI เดี่ยว ๆ
- Swap เป็น leaf แต่ sort ที่เรียก swap เป็น non-leaf; ต้องรักษา ra และค่าที่ใช้ต่อ
- สไลด์ sort เดิน j ย้อนและสลับคู่ติดกัน จึงควรอ่าน flow ของโค้ดจริง; ตัวแปร j ต้องรองรับค่าติดลบเมื่อใช้ j>=0
- กราฟแสดง compiler optimization และ JIT เปลี่ยนทั้ง IC/CPI/cycles; algorithm ที่ดีอาจได้ประโยชน์มากกว่าเปลี่ยนภาษา
- MIPS ใกล้ RISC-V: load/store, 32 registers และคำสั่ง 32 bits แต่บาง comparison ใช้ slt แล้ว branch
- Extensions: M คูณ/หาร, A atomic, F single float, D double float, C compressed; RV64I มีคำสั่ง *w ทำงาน 32-bit แล้วขยายผล

ตัวอย่าง: สลับ v[2]=9 กับ v[3]=4 โดยอ่านทั้งสองค่าก่อนเขียนกลับ; การเขียนทับค่าแรกก่อนเก็บไว้จะทำข้อมูลหาย
อ้างอิงสไลด์หน้า 102, 103, 104, 105, 106, 107, 108, 109, 110, 114, 115, 116, 117

### สูตร: ตีความบิตแบบ Unsigned และ Two’s Complement

Unsigned U = Σ b_i×2^i; Signed V = U if b_(n−1)=0, otherwise U−2^n

- n = จำนวน bits (bits)
- b_i = บิตตำแหน่ง i ซึ่งมีค่า 0 หรือ 1
- U,V = จำนวนเต็มที่ตีความ (ไม่มีหน่วย)

โจทย์: n=8; bit pattern 11111011₂
1. U = 128+64+32+16+8+2+1 = 251
2. บิตบนสุดเป็น 1 → V = 251−256 = −5

**ตอบ: บิตเดียวกันแทน 251 unsigned หรือ −5 signed**
ระวัง: ต้องระบุทั้งความกว้างและชนิดข้อมูล; sign bit ไม่ได้แปลว่าให้ใส่เครื่องหมายลบหน้าค่า unsigned
อ้างอิงสไลด์หน้า 5, 18, 21, 22, 53, 70

### สูตร: หา Two’s Complement เพื่อทำการลบ

−B encoded in n bits = (2^n−B) mod 2^n; A−B = (A + encoded(−B)) mod 2^n

- A,B = จำนวนเต็ม (ไม่มีหน่วย)
- n = ความกว้างข้อมูล (bits)
- mod 2^n = เก็บ n bits ล่าง

โจทย์: ใช้ 4 bits คำนวณ 6−5
1. 5 = 0101; กลับบิตได้ 1010; +1 ได้ 1011 แทน −5
2. 0110 + 1011 = 1 0001
3. ตัด carry-out เหลือ 0001

**ตอบ: 6−5 = 1 โดยไม่มี signed overflow**
ระวัง: การทิ้ง carry-out ใช้กับ two’s complement; one’s complement ต้อง end-around carry
อ้างอิงสไลด์หน้า 18, 19, 20

### สูตร: อ่านค่า Bias

Value = U−B; Stored U = Value+B

- U = รหัส unsigned (ไม่มีหน่วย)
- B = bias (ไม่มีหน่วย)
- Value = ค่าจริง (ไม่มีหน่วย)

โจทย์: 8-bit bias127, รหัส 10000011₂
1. 10000011₂ = 131
2. Value = 131−127 = 4

**ตอบ: ค่าจริง 4**
ระวัง: รหัส 0 ไม่ใช่ค่าจริง 0 เมื่อใช้ bias; ใน IEEE exponent บางรหัสเป็นกรณีพิเศษ
อ้างอิงสไลด์หน้า 23, 24, 28

### สูตร: แปลง Binary Fraction

Value = Σ b_i×2^i รวม i ที่เป็นลบหลังจุด

- b_i = บิต 0 หรือ 1
- i = ตำแหน่งหลักเทียบจุดฐาน (ไม่มีหน่วย)
- Value = ค่าจำนวนจริง (ไม่มีหน่วย)

โจทย์: 101.1101₂
1. ส่วนเต็ม = 1×2²+0×2¹+1×2⁰ = 5
2. เศษ = 1×2^-1+1×2^-2+0×2^-3+1×2^-4 = 0.8125
3. รวม = 5+0.8125

**ตอบ: 5.8125₁₀**
ระวัง: หลักแรกหลังจุดมีน้ำหนัก 1/2 ไม่ใช่ 1/10
อ้างอิงสไลด์หน้า 30

### สูตร: เข้ารหัส IEEE 754 Single แบบ Normalized

N = (−1)^s × (1+F/2^23) × 2^(E−127), 1≤E≤254

- s = sign bit (0/1)
- F = ค่า unsigned ของ fraction 23 bits
- E = ค่า unsigned ของ exponent 8 bits
- N = ค่าจำนวนจริง (ไม่มีหน่วย)

โจทย์: N=5.8125 ต้องการ single32; ตัวอย่างนี้แทนได้พอดี
1. 5.8125 = 101.1101₂ = 1.011101₂×2²
2. s=0; e=2; E=2+127=129=10000001₂
3. fraction = 01110100000000000000000
4. รวม 0 | 10000001 | 01110100000000000000000 = 0x40BA0000

**ตอบ: single bits 0x40BA0000 แทน 5.8125 พอดี**
ระวัง: สูตร hidden1 ใช้กับ normalized เท่านั้น; E=0 หรือ 255 ต้องแยกกรณี
อ้างอิงสไลด์หน้า 27, 28, 29, 30, 31

### สูตร: Effective Address ของ Array และ Load

EA = base + offset; offset = i × element_bytes

- EA,base = byte address (bytes)
- i = index เริ่มที่ 0 (ไม่มีหน่วย)
- element_bytes = ขนาดต่อ element (bytes/element)
- offset = ระยะจาก base (bytes)

โจทย์: RV64, doubleword array A; x22=0x1000; ต้องการ A[8]
1. element_bytes=64/8=8 bytes
2. offset=8×8=64 bytes=0x40
3. EA=0x1000+0x40=0x1040
4. ld x9,64(x22) อ่าน 8 bytes ที่ 0x1040…0x1047

**ตอบ: EA=0x1040; ค่าที่อ่านมาอยู่ใน x9**
ระวัง: offset เป็น bytes; RV64 word ยังเป็น 32 bits และ doubleword เป็น 64 bits
อ้างอิงสไลด์หน้า 49, 50, 83

### สูตร: ประกอบ R-format เป็น Machine Code

word = (funct7<<25) | (rs2<<20) | (rs1<<15) | (funct3<<12) | (rd<<7) | opcode

- word = บิตคำสั่ง 32 bits
- rd,rs1,rs2 = หมายเลข register 0…31
- funct7,funct3,opcode = ช่องบิตชนิดคำสั่ง
- << = เลื่อนบิตซ้าย; | = bitwise OR

โจทย์: add x9,x20,x21: funct7=0,funct3=0,opcode=0x33
1. fields = 0000000 | 10101 | 10100 | 000 | 01001 | 0110011
2. (21<<20)=0x01500000; (20<<15)=0x000A0000
3. (9<<7)=0x00000480; OR opcode0x33
4. รวม = 0x015A04B3

**ตอบ: machine instruction 0x015A04B3**
ระวัง: rs1/rs2 เป็นเลขชื่อ register ไม่ใช่ค่าข้อมูลใน register; อย่าสลับ rd กับ rs1
อ้างอิงสไลด์หน้า 55, 56

### สูตร: Branch Target แบบ PC-relative

Target = PC + signed_byte_offset; signed_byte_offset = 2 × signed_halfword_offset

- PC,Target = byte address ของ branch และเป้าหมาย (bytes)
- signed_halfword_offset = ระยะในหน่วย 2 bytes
- signed_byte_offset = ระยะ bytes ที่ประกอบและ sign-extend แล้ว

โจทย์: branch อยู่ 0x1000, target=0x1014
1. offset bytes = 0x1014−0x1000 = 0x14 = 20
2. ค่าระยะในหน่วย 2 bytes = 20/2 = 10
3. Target = 0x1000+(10×2) = 0x1014

**ตอบ: เป้าหมาย 0x1014 ห่างไป 20 bytes**
ระวัง: หาก immediate ที่ decode รวมบิต 0=0 แล้ว ห้ามคูณ 2 ซ้ำ; ฐานคือ PC ของ branch
อ้างอิงสไลด์หน้า 88, 89, 90

### สูตร: จอง Stack Frame และคืน Stack

sp_new = sp_old − frame_bytes; sp_restored = sp_new + frame_bytes

- sp = byte address ของขอบ stack (bytes)
- frame_bytes = ขนาดพื้นที่จอง (bytes)
- หนึ่ง RV64 register ที่เก็บด้วย sd ใช้ 8 bytes

โจทย์: บันทึก ra และ n 2 registers; sp เดิม=0x8000; frame16 bytes
1. frame=2×8=16 bytes=0x10
2. sp_new=0x8000−0x10=0x7FF0
3. เก็บ n ที่ 0(sp)=0x7FF0 และ ra ที่ 8(sp)=0x7FF8
4. เมื่อคืนค่าด้วย ld แล้ว sp=0x7FF0+0x10=0x8000

**ตอบ: stack กลับสู่ 0x8000 ก่อน return**
ระวัง: sd คือ store; restore ต้องใช้ ld และต้องรักษา alignment ตาม ABI ที่ใช้
อ้างอิงสไลด์หน้า 77, 79, 81

### สูตร: สร้างค่าคงที่ด้วย LUI และ ADDI

value = (upper20 << 12) + signed_low12
เงื่อนไข: สูตรบวกตรงนี้ใช้เมื่อ bit 19 ของ upper20 = 0 ทำให้บิตเครื่องหมายของผล LUI 32 บิตเป็น 0 เช่น upper20=976 ในตัวอย่าง

- upper20 = immediate 20 bits
- signed_low12 = immediate signed12 ช่วง −2048…2047
- value = ค่าจำนวนเต็มใน register (ไม่มีหน่วย)
- ใน RV64 คำสั่ง LUI ขยายเครื่องหมายจากผล 32 บิตเป็น 64 บิต; ADDI ใช้ immediate 12 บิตแบบ signed

โจทย์: ใช้ lui x19,976 แล้ว addi x19,x19,128; upper=976=0x3D0, low128=0x080
1. lui: 976×4096 = 3,997,696 = 0x003D0000
2. addi: 3,997,696+128 = 3,997,824
3. ผล = 0x003D0080

**ตอบ: x19=3,997,824 หรือ 0x003D0080**
ระวัง: 128 decimal คือ 0x080 ไม่ใช่ 0x500 ตาม comment ที่พิมพ์ผิดในสไลด์; ถ้า bit 19 ของ upper20 เป็น 1 ต้องคิด sign extension ของ LUI ด้วย และถ้า low12 เป็นค่าลบอาจต้องปรับ upper20 ให้สอดคล้องกัน
อ้างอิงสไลด์หน้า 87

### จุดที่มักสับสน
- บิต n ตัวมี 2^n รูปแบบ แต่ช่วง signed กับ unsigned ต่างกัน; carry-out กับ signed overflow ก็คนละเรื่อง
- อย่าสับสน 1’s complement แบบฐานสองกับ (r−1)’s complement ทั่วไป: ในฐาน 10 คือ 9’s ไม่ใช่ 1’s
- IEEE special values ต้องแยกจากสูตร normalized; E=0 ไม่ได้หมายถึง infinity
- RV64 register64 ไม่ได้ทำให้ word กลายเป็น 64 หรือทำให้คำสั่งพื้นฐานยาว 64; ld/sd ไม่ใช้แทน lw/sw โดยอัตโนมัติ
- Signed branch กับ unsigned branch อาจตัดสินบิตเดียวกันคนละผล; byte offset ต้องคูณขนาด element ก่อน
- โค้ดตัวอย่างบางหน้าในสไลด์มี typo: sub/add, source pointer, restore ld/sd และเลข immediate ต้องอ่านกล่องแก้ความเข้าใจประกอบ

หมายเหตุสไลด์หน้า 29
รวม exponent E=0 และ 255 ว่าใช้แทน infinity/NaN และเขียนค่าสูงสุดเป็น 2^128
ใช้ให้ถูก: E=0 ใช้ zero/subnormal; E=255 ใช้ infinity/NaN; ค่าสูงสุด finite คือ(2−2^-23)×2^127
สูตร normalized ใช้เฉพาะ E=1…254 และ fraction ไม่สามารถมี significand เท่ากับ 2

หมายเหตุสไลด์หน้า 44
ตัวอย่าง f=(g+h)−(i+j) ใช้ add ในบรรทัดสุดท้าย
ใช้ให้ถูก: ใช้ sub f,t0,t1
ต้องหักผลรวมคู่หลังออกจากผลรวมคู่แรก; หน้า 47 แสดง sub ถูกต้อง

หมายเหตุสไลด์หน้า 45
ระบุ registers32 ตัว แต่ช่วงชื่อเป็น x0 ถึง x30
ใช้ให้ถูก: ช่วงชื่อคือ x0 ถึง x31
5bits ระบุหมายเลขได้ 0…31 รวม 32registers

หมายเหตุสไลด์หน้า 64
คำอธิบาย XOR เขียนว่า set some bits to1
ใช้ให้ถูก: XOR toggle บิตที่ mask เป็น 1 และคงบิตที่ mask เป็น 0
XOR ต่างจาก OR; ตัวอย่าง XOR กับทุกบิต 1 ทำ NOT

หมายเหตุสไลด์หน้า 74
ตัวอย่าง i+j เขียน add x6,x12,x1
ใช้ให้ถูก: ใช้ add x6,x12,x13 และปิดวงเล็บใน sd x20,0(sp)
arguments g,h,i,j อยู่ x10…x13; x1 เป็น return address

หมายเหตุสไลด์หน้า 78
factorial base case เขียน return f
ใช้ให้ถูก: ใช้ return 1 เมื่อ n<1
สอดคล้องกับนิยาม factorial และ addi x10,x0,1 ใน assembly หน้า 79

หมายเหตุสไลด์หน้า 86
strcpy คำนวณ address source และ destination โดยใช้ x10 ทั้งคู่
ใช้ให้ถูก: หาก x เป็น argument แรกและ y เป็น argument ที่สอง ให้ source y ใช้ x11 และ destination x ใช้ x10
ไม่เช่นนั้นโค้ดจะอ่านและเขียนตำแหน่งเดียวกัน

หมายเหตุสไลด์หน้า 87
addi immediate128 มี comment ว่า 0x500
ใช้ให้ถูก: 128=0x080; ถ้าต้องการ 0x500 ต้องใช้ decimal1280
0x500=1280 จึงไม่ใช่ค่าคงที่เดียวกัน

หมายเหตุสไลด์หน้า 104
j ประกาศ size_t แต่ loop ตรวจ j>=0 และต้องใช้ j=−1 ได้
ใช้ให้ถูก: ตัวอย่าง flow นี้ควรใช้ j แบบ signed หรือเขียนเงื่อนไข unsigned ใหม่ให้ไม่ underflow
size_t เป็น unsigned ทำให้ j>=0 เป็นจริงเสมอและ i−1 อาจ wrap

หมายเหตุสไลด์หน้า 107
ส่วน Restore saved registers ใช้ sd ทุกบรรทัด
ใช้ให้ถูก: ใช้ ld เพื่อโหลดค่าจาก stack คืน registers แล้วคืน sp ก่อน return
sd เขียนข้อมูลลง memory จึงไม่ใช่การ restore

### ลองตอบเอง
**11111111₂ แบบ 8-bit มีค่าเท่าไรเมื่อ unsigned และ signed two’s complement?**
Unsigned=255; signed=255−256=−1

**A เป็น doubleword array เริ่มที่ 1000 decimal; A[3] อยู่ไหน และโหลดด้วยอะไรใน RV64?**
1000+3×8=1024; ถ้า base อยู่ x22 ใช้ ld rd,24(x22)

**ทำไม non-leaf procedure ต้องระวัง x1 มากกว่า leaf?**
jal ที่เรียกฟังก์ชันลูกเขียน return address ใหม่ทับ x1 จึงต้องเก็บ ra เดิมก่อน call แล้วคืนก่อน return

อ้างอิง: itds-211_comp_arch_Chapter03_RiscV.pdf

## บท 4 — Memory & Cache
ระบบหน่วยความจำ แคช และหน่วยความจำเสมือน

ใช้ locality ให้ข้อมูลที่ใช้บ่อยอยู่ใกล้ CPU เรียนวิธีหา block ใน cache คำนวณเวลาเข้าถึง และแยก cache miss, TLB miss, page fault ให้ชัด

### ใจความสำคัญ
- Temporal locality คือใช้ข้อมูลเดิมซ้ำ; spatial locality คือใช้ตำแหน่งใกล้กัน จึงย้ายข้อมูลเป็น block/page
- แยก byte address, block address, cache index/set และ tag ก่อนคำนวณทุกครั้ง
- Direct mapped มีที่ลงเพียงช่องเดียว; set associative มีหลาย way ใน set; fully associative ลงได้ทุกช่อง
- แยก write-through/write-back ออกจาก write-allocate/no-write-allocate เพราะตอบคนละคำถาม
- AMAT = hit time + miss rate × miss penalty; CPI ต้องนับจำนวน memory access ต่อ instruction ด้วย
- TLB เก็บคำแปล address; cache เก็บข้อมูล; TLB miss ไม่จำเป็นต้องเป็น page fault
- รู้บทบาท ECC, page table, VMM, cache controller และ coherence เพื่อเชื่อมภาพรวมทั้งบท

### ภาพจำ: ยิ่งใกล้ CPU ยิ่งเร็ว แต่ยิ่งเล็ก
![ยิ่งใกล้ CPU ยิ่งเร็ว แต่ยิ่งเล็ก](dist/images/review/hierarchy.svg)
ลำดับชั้นช่วยให้ข้อมูลที่ใช้บ่อยอยู่ในหน่วยความจำที่เร็ว ข้อมูลทั้งหมดไม่จำเป็นต้องอยู่ในชั้นที่เร็วที่สุดพร้อมกัน ความเร็วและขนาดเป็นแนวโน้มโดยทั่วไป
อิงสไลด์หน้า 6, 7

### ภาพจำ: แบ่ง Address เป็น Tag · Index · Offset
![แบ่ง Address เป็น Tag · Index · Offset](dist/images/review/cache.svg)
ตัวอย่างเสริม: address แบบ byte-addressed 32 บิต, cache เฉพาะข้อมูล 16 KiB, 4-way และ block 64 B จึงมี 64 sets → Index 6 บิต, Offset 6 บิต, Tag 20 บิต ไม่รวมพื้นที่ tag/valid/dirty ในความจุข้อมูล
อิงสไลด์หน้า 31, 32, 51, 94

### Hierarchy และ locality
หน่วยความจำเร็วมีขนาดเล็กและต้นทุนต่อบิตสูง จึงจัดหลายชั้นให้ CPU พบข้อมูลส่วนใหญ่ในชั้นบน แล้วค่อยค้นชั้นล่างเมื่อไม่พบ
- เส้นทางหลัก: registers → L1 → L2/L3 → DRAM → storage; ยิ่งลงล่างโดยทั่วไปยิ่งใหญ่และช้า
- Temporal locality: สิ่งที่เพิ่งใช้มีโอกาสถูกใช้ซ้ำ เช่นคำสั่งใน loop
- Spatial locality: ตำแหน่งใกล้ข้อมูลที่เพิ่งใช้มักถูกใช้ต่อ เช่นสมาชิก array ที่เรียงกัน
- Block หรือ cache line คือหน่วยที่คัดลอก; hit คือพบในชั้นที่ตรวจ ส่วน miss ต้องไปชั้นถัดไป
- Hit rate + miss rate = 1; miss penalty คือเวลาที่เพิ่มเพราะ miss

ตัวอย่าง: อ่าน a[0] แล้วนำทั้ง line ที่มี a[0] ถึง a[7] เข้ามา การอ่าน a[1] ต่อใช้ประโยชน์จาก spatial locality
อ้างอิงสไลด์หน้า 4, 5, 6, 7, 8, 111

### SRAM, DRAM และ bandwidth
SRAM เหมาะกับ cache ที่ต้องเร็ว ส่วน DRAM เหมาะกับ main memory ที่ต้องจุมาก DRAM เก็บประจุใน capacitor จึงต้อง refresh เป็นระยะ
- DRAM จัดบิตเป็นแถวและคอลัมน์; row buffer ช่วยอ่านหลาย word จากแถวเดียวกัน
- Synchronous/burst access ส่งข้อมูลต่อเนื่องได้โดยไม่ต้องส่ง address ใหม่ทุก word
- DDR ส่งข้อมูลทั้งขอบขึ้นและขอบลงของ clock; สไลด์อธิบาย QDR ว่าแยก DDR input/output
- เพิ่มความกว้าง bus หรือแยกหลาย bank เพื่อเพิ่ม bandwidth; latency กับ bandwidth เป็นคนละค่า
- ตัวเลขราคาและรุ่น DRAM ในสไลด์เป็นข้อมูลประกอบในอดีต ให้เน้นความสัมพันธ์เร็ว–จุ–ต้นทุน

ตัวอย่าง: ส่ง block 4 words: memory กว้าง 1 word ใช้ 65 bus cycles, กว้าง 4 words ใช้ 17, แบบ 4-bank interleaving ใช้ 20 ตามสมมติฐานของสไลด์
อ้างอิงสไลด์หน้า 9, 10, 11, 12, 13, 14, 40

### Flash และ magnetic disk
Storage เก็บข้อมูลได้เมื่อปิดไฟ Flash ไม่มีชิ้นส่วนหมุน ส่วน disk ต้องขยับหัวอ่านและรอ sector หมุนมาถึง ทำให้เวลารอเชิงกลสำคัญมาก
- NOR เน้นการเข้าถึงตำแหน่งและใช้เก็บคำสั่งใน embedded systems; NAND หนาแน่นกว่าและทำงานเป็นหน่วย block/page
- Flash มีอายุการเขียน/ลบจำกัด จึงใช้ wear leveling กระจายการใช้งานไปยัง block ต่าง ๆ
- Disk แบ่งเป็น track/sector; sector มีข้อมูลระบุตำแหน่ง ข้อมูลจริง ECC และช่องว่าง/ข้อมูล synchronization
- เวลา disk access รวม queue + seek + rotational latency + transfer + controller overhead
- Disk cache, prefetch และ OS scheduling ช่วยลดการรอ; ตัวอย่าง idle disk ไม่มี queue delay

ตัวอย่าง: Disk 15,000 rpm หมุน 250 รอบ/วินาที หนึ่งรอบ 4 ms จึงรอหมุนเฉลี่ยครึ่งรอบ = 2 ms
อ้างอิงสไลด์หน้า 15, 16, 17, 18, 19, 20

### Cache line และการแบ่ง address
แต่ละ cache line มี data พร้อม metadata เพื่อบอกว่าข้อมูลใช้ได้หรือไม่และมาจาก block ใด Address จะแบ่งเป็น tag, index และ offset ตามโครงสร้าง cache
- Valid bit = 1 หมายถึง line มีข้อมูลใช้ได้; ตอนเริ่มต้น valid = 0 จึงไม่ถือว่า tag ตรงแล้ว hit ทันที
- Index เลือก line/set, tag ตรวจว่าเป็น block ที่ต้องการ, offset เลือก byte ภายใน block
- ถ้า byte-addressed และ block มี B bytes: offset = log2(B) bits เมื่อ B เป็นกำลังสอง
- ความจุ cache ที่โจทย์ระบุโดยทั่วไปหมายถึง data capacity ไม่รวม tag, valid, dirty และ replacement state
- ต้องรู้จำนวน address bits, ขนาด block, capacity และจำนวน ways ก่อนแบ่งบิต

ตัวอย่าง: 32-bit byte address, cache data 16 KiB, direct mapped, block 16 B: มี 1024 lines จึงได้ tag 18 | index 10 | offset 4 bits
อ้างอิงสไลด์หน้า 21, 22, 24, 31, 32, 94, 108

### Direct mapped: ทำโจทย์ hit/miss
แต่ละ memory block ลงได้เพียง cache line เดียว โดยใช้ block address modulo จำนวน lines เมื่อต่าง tag มาใช้ line เดียวกัน ข้อมูลเดิมจะถูกแทนที่
- เริ่มจากแปลง byte address เป็น block address = floor(address / bytes per block)
- Cache index = block address mod จำนวน lines; tag = floor(block address / จำนวน lines)
- Hit ต้องทั้ง valid = 1 และ tag ตรง; miss แล้วอัปเดต tag/data/valid ของ line นั้น
- ตัวอย่างหน้า 25–30 ใช้ word address และ 1 word/block จึงไม่ต้องหารด้วย 4 อีก

ตัวอย่าง: 8 lines, 1 word/block, word addresses 22,26,22,26,16,3,16,18 → M,M,H,H,M,M,H,M; 18 แทน 26 ที่ index 2
อ้างอิงสไลด์หน้า 23, 24, 25, 26, 27, 28, 29, 30, 32

### Associativity และ replacement
เพิ่ม associativity เพื่อให้ block ที่ชนกันมีตัวเลือกมากขึ้น แต่ต้องตรวจหลาย tag พร้อมกันและเลือกข้อมูลจากหลาย way จึงมีต้นทุนและอาจเพิ่ม hit time
- Direct mapped = 1-way; W-way set associative มี W lines ต่อ set; fully associative มี set เดียว
- Set = block address mod จำนวน sets; ค้นทุก way ภายใน set ที่เลือก
- เลือกช่อง invalid ก่อน; ถ้าเต็ม LRU ทิ้งตัวที่ไม่ได้ใช้มานานที่สุด ส่วน random เลือกสุ่ม
- Direct mapped ไม่ต้องเลือกเหยื่อ เพราะมีที่ลงที่เดียว; LRU ของหลาย ways มีวงจรซับซ้อน
- สไลด์ยังยก FIFO (เข้าก่อนออกก่อน) และ LFU (ใช้น้อยสุด) เป็นตัวเลือกด้านการออกแบบ

ตัวอย่าง: Cache 4 blocks เริ่มว่าง ลำดับ block 0,8,0,6,8: direct มี 5 misses; 2-way ใช้ LRU มี 4; fully associative มี 3
อ้างอิงสไลด์หน้า 22, 45, 46, 47, 48, 49, 50, 51, 52, 88, 89, 90

### Write hit และ write miss เป็นคนละนโยบาย
นโยบายเขียนตอบสองเรื่อง: เมื่อเขียนข้อมูลที่มีอยู่แล้วจะอัปเดตชั้นล่างเมื่อใด และเมื่อไม่มี block จะนำ block เข้ามาหรือไม่
- Write-through: เขียนทั้ง cache และชั้นล่าง; write buffer เก็บรายการรอเขียน CPU จะรอเมื่อ buffer เต็ม
- Write-back: เขียน cache ก่อน ตั้ง dirty bit และเขียนกลับเมื่อ dirty line ถูกแทนที่
- Write-allocate: เมื่อ write miss ให้นำ block เข้ามาก่อนเขียน
- No-write-allocate หรือ write-around: ส่งการเขียนไปชั้นล่างโดยไม่ดึง block เข้า cache
- Write-back มักจับคู่ write-allocate; write-through เลือก allocation ได้ทั้งสองแบบ; split cache แยกคำสั่งกับข้อมูล

ตัวอย่าง: เขียน x ซ้ำ 100 ครั้งใน line เดิม: write-back อาจส่งข้อมูลกลับชั้นล่างครั้งเดียวตอน evict ถ้าไม่มีเหตุอื่นบังคับ ส่วน write-through ส่งการเขียนแต่ละครั้ง
อ้างอิงสไลด์หน้า 34, 35, 36, 37, 38, 39, 91

### Miss 3 แบบ และ trade-off
รู้สาเหตุของ miss ก่อนเลือกวิธีแก้ เพราะเพิ่ม block size, cache size หรือ associativity ช่วยคนละปัญหาและมีค่าใช้จ่ายต่างกัน
- Compulsory: ครั้งแรกที่แตะ block; spatial locality และ prefetch อาจช่วยการเข้าถึงถัดไป
- Capacity: working set ใหญ่เกินความจุ cache แม้ fully associative ก็ยังเกิดได้
- Conflict: block แย่ง line/set ทั้งที่ fully associative ขนาดเท่ากันเก็บได้
- Cache ใหญ่ลด capacity misses; associativity มากลด conflict misses แต่อาจทำให้ hit ช้าลง
- Block ใหญ่ใช้ spatial locality แต่มี lines น้อยลง, pollution มากขึ้นและ miss penalty สูงขึ้น; critical-word-first/early restart ช่วยให้ CPU ได้ word ที่ต้องการเร็ว

ตัวอย่าง: Direct cache มี 4 lines แต่แตะ block 0 กับ 4 สลับกัน: ชน index 0 แม้ใช้งานจริงแค่ 2 blocks จึงเป็น conflict misses หลังการแตะครั้งแรก
อ้างอิงสไลด์หน้า 33, 87, 88, 89, 90, 91, 92, 93, 105

### AMAT, memory stalls และ CPI
AMAT เฉลี่ยเวลาต่อ memory access ส่วน CPI เฉลี่ย cycles ต่อ instruction จึงต้องถ่วงจำนวนการเข้าถึงข้อมูลต่อคำสั่งเมื่อแปลงผลของ miss เป็น CPI
- AMAT = hit time + miss rate × extra miss penalty โดยใช้หน่วยเวลาเดียวกัน
- CPU cycles = execution cycles ที่รวม hit time แล้ว + memory stall cycles
- ถ้าทุกคำสั่ง fetch หนึ่งครั้ง: I-cache stall/instruction = I miss rate × penalty
- D-cache stall/instruction = สัดส่วน load/store × D miss rate × penalty เมื่อแต่ละ load/store เข้าข้อมูลหนึ่งครั้ง
- สูตรพื้นฐานถือว่า stall ไม่ซ้อนกัน; out-of-order/non-blocking อาจซ่อน latency จึงต้องวิเคราะห์ data flow หรือจำลองระบบ

ตัวอย่าง: Base CPI 2, I miss 2%, D miss 4%, load/store 36%, penalty 100 cycles → CPI = 2 + 2 + 1.44 = 5.44
อ้างอิงสไลด์หน้า 35, 41, 42, 43, 44, 57, 109

### Multilevel cache และ local/global miss rate
L1 เน้น hit time ต่ำ ส่วน L2/L3 เน้นลดการไป main memory ตัวหารของ miss rate ต้องชัด เพราะทุก access ไม่ได้ไปถึง L2
- L2 local miss rate = L2 misses / L2 accesses; global miss rate = L2 misses / accesses ที่เริ่มจาก L1
- ในเส้นทางที่ทุก L1 miss ไป L2: global L2 miss rate = L1 miss rate × L2 local miss rate
- AMAT สองระดับ = tL1 + mL1 × (tL2 + mL2,local × pMemory) โดย pMemory เป็นเวลาที่เพิ่มหลัง L2 miss
- ตัวอย่างชิปในสไลด์มี split L1, L2 รวมคำสั่ง/ข้อมูล และบางรุ่นมี L3 ร่วมหลาย cores; TLB ก็มีหลายระดับได้
- Multi-bank ลดการแย่งทางเข้า; non-blocking รองรับ hit under miss/miss under miss และ prefetch นำข้อมูลมาก่อนใช้

ตัวอย่าง: L1 miss 2%, L2 global miss 0.5% → L2 local miss = 0.5/2 = 25% ไม่ใช่ 0.5%
อ้างอิงสไลด์หน้า 53, 54, 55, 56, 57, 103, 104, 105, 109

### Locality ในโปรแกรมและ cache blocking
ความเร็วขึ้นกับรูปแบบเข้าถึงข้อมูลด้วย Cache blocking แบ่งงานเป็นชิ้นเล็กเพื่อใช้ข้อมูลใน cache ซ้ำหลายครั้งก่อนถูกแทนที่
- ลำดับวน loop และ stride เปลี่ยน spatial/temporal locality แม้คำนวณคำตอบเดียวกัน
- DGEMM ใช้ tile ของ A, B, C เพื่อเพิ่มการใช้ซ้ำ; ต้องเลือก tile ให้เหมาะกับ working set ใน cache
- อ่านสูตร index ก่อนตัดสินว่า row หรือ column ต่อเนื่อง: ตัวอย่าง i + j*n คือรูปแบบ column-major
- Blocking, SIMD/subword parallelism และ loop unrolling ช่วยต่างด้านและใช้ร่วมกันได้
- โค้ด BLOCKSIZE 32 ในสไลด์ไม่แสดงการจัดการขอบ หาก n ไม่หาร 32 ลงตัวต้องปรับขอบ loop

ตัวอย่าง: แทนที่จะกวาด matrix ทั้งหมดแล้วกลับมาใช้ข้อมูลเดิม ให้ทำ tile 32×32 ให้จบหลายการคูณก่อนย้าย tile
อ้างอิงสไลด์หน้า 58, 59, 60, 61, 62, 107, 108

### Dependability, availability และ ECC
Fault ของชิ้นส่วนอาจยังไม่ทำให้บริการล้มเหลว การเพิ่มความทนทานและซ่อมเร็วช่วย availability ส่วน ECC ใช้บิตส่วนเกินตรวจและแก้ข้อมูลผิด
- MTTF คือเวลาใช้งานเฉลี่ยก่อน failure; MTTR คือเวลาซ่อมเฉลี่ย; MTBF = MTTF + MTTR ตามนิยามในสไลด์
- Availability = MTTF/(MTTF+MTTR); เพิ่ม MTTF หรือลด MTTR ทำให้ค่าสูงขึ้น
- Hamming distance คือจำนวนบิตที่ต่างกัน: distance 2 ตรวจ 1-bit error; distance 3 แก้ 1-bit error
- Hamming parity อยู่ตำแหน่ง 1,2,4,8,…; syndrome บอกตำแหน่งบิตผิดเมื่อมี single-bit error
- เพิ่ม overall parity ให้ minimum distance 4 ได้ SECDED: แก้หนึ่งบิตและแยกตรวจสองบิต; ตัวอย่าง ECC 64 data bits ใช้ 8 check bits

ตัวอย่าง: Syndrome 1010₂ = 10 จึงกลับบิตตำแหน่ง 10 เมื่อรู้ว่าเป็น single-bit error; SECDED ใช้ overall parity ตรวจเพิ่มเพื่อไม่แก้ double error ผิดตำแหน่ง
อ้างอิงสไลด์หน้า 63, 64, 65, 66, 67, 68

### Virtual machine, VMM และ protection
Virtual machine จำลองทรัพยากรให้ guest OS แต่ละตัว ส่วน VMM หรือ hypervisor จัดสรร CPU, memory และ I/O จริง พร้อมแยก guest ออกจากกัน
- Guest อาจใช้ OS ต่างจาก host; VMM จัดการอุปกรณ์จริงแล้วแสดง virtual devices ให้ guest
- แบบจำลองในสไลด์ให้ guest code วิ่งบนเครื่องจริง และ trap ไป VMM เมื่อทำงาน privileged/แตะ protected resources
- Timer interrupt ให้ VMM เลือก VM ถัดไป และสร้าง virtual timer interrupt ให้ guest
- User/supervisor modes และ privileged instructions ป้องกันโปรแกรมเปลี่ยน page tables หรือควบคุม I/O โดยตรง
- ตัวอย่าง system instructions: ecall เรียก environment, sret กลับจาก supervisor, CSR เข้าถึง control/status registers; fence เกี่ยวกับลำดับ memory และ fence.i เกี่ยวกับ instruction access

ตัวอย่าง: สอง guest OS มี timer ของตนเองได้ แม้แบ่งใช้ physical CPU เดียว เพราะ VMM จำลองเวลาและสลับ VM
อ้างอิงสไลด์หน้า 69, 70, 71, 72, 86, 106, 110

### Virtual memory และ page table
Virtual memory ให้แต่ละ process มีพื้นที่ address ของตน โดยฮาร์ดแวร์และ OS แปล virtual page ไป physical frame ใช้ DRAM เป็นที่พัก page จาก storage
- แบ่ง virtual address เป็น virtual page number (VPN) กับ page offset; แปลเฉพาะ VPN ส่วน offset คงเดิม
- Page table ใช้ VPN หา PTE; PTE บอก physical page number และสถานะ valid/present, referenced, dirty ตามแบบจำลอง
- Page table register ชี้ตารางใน physical memory; ถ้า page ไม่อยู่ RAM ต้องหาใน backing storage
- Page วางใน frame ที่ว่างใดก็ได้; OS ใช้ reference bit ช่วยประมาณ LRU และใช้ dirty bit ตัดสินว่าต้องเขียนกลับก่อนแทนที่หรือไม่
- Page fault แพงมาก จึงใช้ write-back เป็น page; ไม่ส่งทุก store ไป disk

ตัวอย่าง: Page 4 KiB = 4096 B → offset 12 bits; ในภาพ virtual address 48 bits มี VPN 36 bits และ physical address 40 bits มี PPN 28 bits
อ้างอิงสไลด์หน้า 73, 74, 75, 76, 77, 78, 79

### TLB miss กับ page fault
TLB เป็น cache ของ PTE/คำแปล address ไม่ใช่ cache ของข้อมูล เมื่อไม่พบคำแปลใน TLB ต้องตรวจ page table ก่อน จึงรู้ว่า page อยู่ใน RAM หรือไม่
- TLB hit: ได้ physical page number เร็วแล้วเข้าถึงข้อมูลผ่าน cache/memory
- TLB miss แต่ page อยู่ RAM: เติมคำแปลจาก page table แล้ว retry; hardware หรือ software อาจรับผิดชอบ
- Page fault: OS หา page ใน storage เลือกเหยื่อ เขียนเหยื่อถ้า dirty โหลด page อัปเดต PTE แล้วเริ่มคำสั่งที่ fault ใหม่
- Handler ต้องรักษาสถานะก่อนคำสั่งทำเสร็จ เพื่อ restart ได้ถูกต้อง
- Physical cache tag ต้องมีคำแปล address ก่อนใช้ tag; virtual tag มีปัญหา aliasing เมื่อหลาย virtual addresses ชี้ physical location เดียวกัน

ตัวอย่าง: เพิ่งสลับ process แล้ว TLB ไม่มี VPN นี้ แต่ page ยังอยู่ DRAM: เกิด TLB miss ได้โดยไม่มี disk I/O หรือ page fault
อ้างอิงสไลด์หน้า 80, 81, 82, 83, 84, 85, 104

### Cache controller เป็น FSM
Cache controller ใช้สถานะควบคุมลำดับการตรวจ tag เขียนเหยื่อกลับ และอ่าน block ใหม่ โดยต้องรอ ready จาก memory ที่ทำงานหลาย cycles
- ตัวอย่างคือ direct mapped, write-back, write-allocate, blocking cache ขนาด data 16 KiB, block 16 B, address 32 bits
- Idle รอ request → Compare Tag ตรวจ valid/tag และชนิด read/write
- Hit: ส่ง ready; write hit ตั้ง dirty และอัปเดตข้อมูล
- Miss กับเหยื่อ clean/invalid: Allocate อ่าน block ใหม่; เหยื่อ dirty: Write-Back ก่อนแล้วจึง Allocate
- เมื่อ memory ready กลับไป Compare Tag เพื่อทำ request เดิมให้จบ; next state ขึ้นกับ current state และ inputs

ตัวอย่าง: Read miss ที่ชน dirty line: Idle → Compare Tag → Write-Back → Allocate → Compare Tag → Idle; ไม่ข้าม write-back เพราะข้อมูลล่าสุดอยู่ใน cache
อ้างอิงสไลด์หน้า 94, 95, 96, 97

### Coherence และ memory consistency
หลาย cores อาจถือสำเนา address เดียวกัน Cache coherence ทำให้สำเนาของตำแหน่งเดียวสอดคล้องกัน ส่วน consistency พูดถึงลำดับที่ cores เห็นการเข้าถึงหลายตำแหน่ง
- Write-through อย่างเดียวไม่ทำให้ cache ของ core อื่นทันสมัย แม้ main memory ถูกอัปเดตแล้ว
- Coherence ต้องให้ผู้อ่านได้ค่าที่เขียนล่าสุดตามเงื่อนไขของระบบ และทุก core เห็นลำดับ writes ของตำแหน่งเดียวตรงกัน
- Snooping: cache เฝ้าดู bus; directory: บันทึกว่า block ถูกแชร์ที่ใด
- Invalidation protocol ให้ผู้เขียนได้สิทธิ์และทำสำเนาอื่น invalid; การอ่านครั้งถัดไปจึง miss แล้วรับค่าล่าสุด
- ตัวอย่าง consistency ในสไลด์สมมติ write เสร็จเมื่อทุก core เห็นและไม่ reorder writes; ภายใต้สมมตินี้ ถ้าเขียน X แล้ว Y ผู้ที่เห็น Y ใหม่ต้องเห็น X ใหม่ด้วย

ตัวอย่าง: A และ B cache ค่า X=0; A เขียน X=1 ต้อง invalidate สำเนา B ก่อน B อ่านครั้งถัดไป มิฉะนั้น B อาจยังอ่าน 0
อ้างอิงสไลด์หน้า 98, 99, 100, 101, 102, 109

### สูตร: แปลง byte address เป็นตำแหน่งใน direct cache

block = floor(A / B); index = block mod N; tag = floor(block / N); offset = A mod B

- A = byte address หน่วย byte
- B = ขนาด block หน่วย bytes/block
- N = จำนวน cache lines หน่วย lines
- block = หมายเลข memory block; index = หมายเลข line; tag = ตัวระบุ block; offset = byte ภายใน block

โจทย์: Direct mapped 64 lines, 16 bytes/block, byte address A = 1200
1. block = floor(1200/16) = 75
2. index = 75 mod 64 = 11
3. tag = floor(75/64) = 1
4. offset = 1200 mod 16 = 0

**ตอบ: อยู่ line 11, tag 1, offset 0; ยังบอก hit ไม่ได้จนตรวจ valid และ tag ที่เก็บจริง**
ระวัง: หน้า 32 ระบุ tag 22 + index 6 + offset 4 = 32 bits แต่ป้ายบิตซ้ายสุดพิมพ์ 63; ถ้า address 32 bits ตำแหน่งซ้ายสุดต้องเป็น 31
อ้างอิงสไลด์หน้า 23, 24, 32, 108

### สูตร: จำนวน sets และ address bits ของ W-way cache

N = C/B; S = C/(B×W); b = log2(B); s = log2(S); t = a - s - b

- C = data capacity หน่วย bytes ไม่รวม metadata
- B = block size หน่วย bytes/block
- W = associativity หน่วย ways/set
- N = จำนวน lines; S = จำนวน sets
- a = address width หน่วย bits; b = byte-offset bits; s = set-index bits; t = tag bits

โจทย์: ตัวอย่างขยาย: byte-addressed 32 bits, data cache 16 KiB = 16384 B, block 64 B, 4-way; ทุกขนาดเป็นกำลังสอง
1. N = 16384/64 = 256 lines
2. S = 256/4 = 64 sets
3. b = log2(64) = 6 bits; s = log2(64) = 6 bits
4. t = 32 - 6 - 6 = 20 bits
5. Data bits = 16384×8 = 131072 bits; ถ้านับเฉพาะ tag+valid+dirty เพิ่ม 256×(20+1+1) = 5632 bits

**ตอบ: tag 20 | set 6 | offset 6 bits; data+tag+valid+dirty = 136704 bits โดยยังไม่รวม replacement/control state**
ระวัง: จำนวน sets ไม่ใช่จำนวน lines เมื่อ W > 1; fully associative มี S=1 จึงไม่มี index bits
อ้างอิงสไลด์หน้า 31, 32, 45, 47, 51, 94

### สูตร: AMAT ชั้นเดียว

AMAT = h + m×p

- AMAT = เวลาเฉลี่ยต่อ memory access หน่วย ns/access หรือ cycles/access
- h = hit time หน่วย ns หรือ cycles ต่อ access
- m = miss rate เป็นสัดส่วนไม่มีหน่วย
- p = เวลาเพิ่มเมื่อ miss หน่วยเดียวกับ h โดยไม่รวม h ซ้ำ

โจทย์: Clock period 1 ns, hit time 1 cycle, miss rate 5%, extra miss penalty 20 cycles
1. m = 5/100 = 0.05
2. AMAT = 1 + 0.05×20 = 2 cycles/access
3. 2 cycles/access × 1 ns/cycle = 2 ns/access

**ตอบ: AMAT = 2 ns/access ภายใต้แบบจำลอง miss ที่ไม่ซ้อนกัน**
ระวัง: AMAT เป็นเวลาต่อ access ไม่ใช่ CPI ของโปรแกรมทั่วไป; ใช้ miss rate 0.05 ไม่ใช่ 5
อ้างอิงสไลด์หน้า 43, 57, 109

### สูตร: Memory stalls และ CPI ของ I-cache/D-cache

stall cycles = accesses×miss rate×penalty; CPI = CPIbase + mI×pI + fD×mD×pD

- stall cycles = จำนวน cycles ที่รอ memory ในแบบจำลองไม่ซ้อนกัน
- accesses = จำนวน memory accesses ทั้งโปรแกรม
- CPIbase = cycles/instruction ที่รวม cache hit time แล้ว
- mI,mD = miss rate ต่อ I/D access ไม่มีหน่วย
- fD = D accesses/instruction; pI,pD = extra miss penalty หน่วย cycles/miss

โจทย์: ทุก instruction fetch 1 ครั้ง, load/store 36% และเข้าข้อมูล 1 ครั้งต่อคำสั่งนั้น; base CPI 2, mI=2%, mD=4%, penalty 100 cycles
1. I stalls = 1×0.02×100 = 2 cycles/instruction
2. D stalls = 0.36×0.04×100 = 1.44 cycles/instruction
3. CPI = 2 + 2 + 1.44 = 5.44
4. เวลาเทียบ ideal ที่ instruction count และ clock เท่ากัน = 5.44/2 = 2.72 เท่า

**ตอบ: Actual CPI 5.44; ระบบ ideal ใช้เวลาน้อยลงจนเร็วกว่า 2.72 เท่า**
ระวัง: ห้ามบวก I miss rate กับ D miss rate โดยไม่ถ่วงจำนวน D accesses ต่อ instruction
อ้างอิงสไลด์หน้า 41, 42, 44

### สูตร: สองระดับ: local/global miss และผลต่อ CPI

g2 = m1×m2local; AMAT = h1 + m1×(h2 + m2local×pM); CPI = CPIbase + missesL1/instr×pL2 + missesMemory/instr×pM

- m1 = L1 misses/L1 accesses; m2local = L2 misses/L2 accesses; g2 = L2 misses/L1 accesses ไม่มีหน่วย
- h1,h2,pM = เวลาเข้าถึงหรือ penalty หน่วย ns/access โดย pM เป็นเวลาเพิ่มหลัง L2 miss
- missesL1/instr,missesMemory/instr = จำนวน misses ต่อ instruction
- pL2,pM ในสูตร CPI = extra penalty หน่วย cycles/miss; CPIbase = cycles/instruction

โจทย์: ตัวอย่างสไลด์: base CPI 1, 4 GHz, L1 misses/instruction 0.02, memory misses/instruction 0.005, L2 5 ns, memory เพิ่ม 100 ns; การหา local rate ถือว่าทุก L1 miss ไป L2
1. Clock period = 1/(4 GHz) = 0.25 ns/cycle
2. ไม่มี L2: pM = 100/0.25 = 400 cycles; CPI = 1 + 0.02×400 = 9
3. มี L2: pL2 = 5/0.25 = 20 cycles; local L2 miss = 0.005/0.02 = 0.25 = 25%
4. CPI = 1 + 0.02×20 + 0.005×400 = 3.4
5. Speedup = 9/3.4 = 2.647… ≈ 2.65 เท่า

**ตอบ: L2 ลด CPI จาก 9 เป็น 3.4; source ปัด speedup เป็น 2.6 เท่า**
ระวัง: หน้า 55 พิมพ์ extra penalty 500 cycles แต่ข้อมูลและสมการให้ 400; อย่านำ global 0.5% ไปคูณ L1 miss rate ซ้ำ
อ้างอิงสไลด์หน้า 53, 54, 55, 56

### สูตร: Block transfer และ bandwidth

Bandwidth = bytes transferred / transfer cycles

- Bandwidth หน่วย bytes/bus cycle; ถ้าต้องการ bytes/s ให้คูณ bus frequency หน่วย cycles/s
- Miss penalty = จำนวน bus cycles รวม address, DRAM access และ data transfer
- 1 word = 4 bytes เฉพาะตัวอย่างนี้

โจทย์: Block 4 words = 16 B; address 1 cycle, DRAM access 15 cycles, ส่ง 1 word ต่อ data cycle
1. 1-word-wide: penalty = 1 + 4×15 + 4×1 = 65 bus cycles; BW = 16/65 ≈ 0.246 B/cycle
2. 4-word-wide: penalty = 1 + 15 + 1 = 17 bus cycles; BW = 16/17 ≈ 0.941 B/cycle
3. 4-bank interleaved: penalty = 1 + 15 + 4×1 = 20 bus cycles; BW = 16/20 = 0.8 B/cycle

**ตอบ: ภายใต้สมมติฐานนี้ bandwidth ≈ 0.25, 0.94 และ 0.8 B/bus cycle ตามลำดับ**
ระวัง: Bus cycle อาจช้ากว่า CPU cycle; ห้ามนำจำนวน cycles สองชนิดมาบวกโดยไม่แปลงเวลา
อ้างอิงสไลด์หน้า 14, 40

### สูตร: เวลาอ่าน disk เฉลี่ย

Tread = Tqueue + Tseek + 0.5×(60/rpm) + bytes/rate + Tcontroller

- Tread,Tqueue,Tseek,Tcontroller หน่วย seconds เมื่อใช้สมการนี้
- rpm = รอบต่อนาที; 60/rpm = seconds/รอบ
- bytes = ขนาดข้อมูลหน่วย B; rate = transfer rate หน่วย B/s
- รอหมุนเฉลี่ยครึ่งรอบเมื่อจุดเริ่มต้นกระจายสม่ำเสมอ

โจทย์: Idle disk: queue=0, seek 4 ms, 15000 rpm, sector 512 B, rate 100 MB/s โดย MB=10^6 B, controller 0.2 ms
1. Rotational latency = 0.5×60/15000 s = 0.002 s = 2 ms
2. Transfer = 512/(100×10^6) s = 0.00512 ms
3. Tread = 0 + 4 + 2 + 0.00512 + 0.2 = 6.20512 ms
4. ถ้า seek จริง 1 ms: Tread = 1 + 2 + 0.00512 + 0.2 = 3.20512 ms

**ตอบ: ประมาณ 6.2 ms หรือ 3.2 ms เมื่อ seek ลดเหลือ 1 ms**
ระวัง: rpm เป็นรอบต่อนาทีต้องหาร 60 ก่อนใช้รอบต่อวินาที; transfer time ของ sector เล็กอาจน้อยกว่า seek/rotation มาก
อ้างอิงสไลด์หน้า 18, 19, 20

### สูตร: Availability จากเวลาใช้งานและซ่อม

MTBF = MTTF + MTTR; Availability = MTTF/(MTTF+MTTR)

- MTTF = mean time to failure หน่วย hours หรือเวลาอื่น
- MTTR = mean time to repair หน่วยเดียวกับ MTTF
- MTBF = mean time between failures หน่วยเวลา ตามนิยามสไลด์
- Availability = สัดส่วนเวลาที่บริการพร้อม ไม่มีหน่วย; คูณ 100 เพื่อเป็น %

โจทย์: ตัวอย่างเพิ่มเติม: MTTF 990 hours, MTTR 10 hours
1. MTBF = 990 + 10 = 1000 hours
2. Availability = 990/1000 = 0.99 = 99%
3. ถ้าซ่อมเหลือ 1 hour: Availability = 990/991 ≈ 99.899%

**ตอบ: ลดเวลาซ่อมจาก 10 เป็น 1 ชั่วโมงช่วยเพิ่ม availability แม้ MTTF เท่าเดิม**
ระวัง: Availability ไม่ใช่ MTTF และไม่ใช่โอกาสที่ระบบจะไม่เสียตลอดช่วงเวลาหนึ่ง
อ้างอิงสไลด์หน้า 63, 64

### สูตร: แปล virtual address ด้วย page offset

VPN = floor(VA/P); offset = VA mod P; PA = PPN×P + offset

- VA = virtual byte address; PA = physical byte address หน่วย bytes
- P = page size หน่วย bytes/page; frame มีขนาดเท่ากัน
- VPN = virtual page number; PPN = physical page/frame number ที่หาได้จาก PTE
- Offset หน่วย bytes ภายใน page; offset bits = log2(P) เมื่อ P เป็นกำลังสอง

โจทย์: ตัวอย่างขยายจากการแบ่ง page: P=4 KiB=4096 B, VA=0x12345, PTE ของ VPN นี้ให้ PPN=0x2A และ page present
1. VPN = 0x12345 // 0x1000 = 0x12 = 18
2. Offset = 0x12345 mod 0x1000 = 0x345 = 837 B (12 bits)
3. PA = 0x2A×0x1000 + 0x345 = 0x2A345
4. ตรวจเลขฐานสิบ: 42×4096+837 = 172869

**ตอบ: Physical byte address = 0x2A345 = 172869; offset 0x345 คงเดิม**
ระวัง: VPN ไม่จำเป็นต้องเท่ากับ PPN; ถ้า PTE บอกไม่ present จะยังใช้สูตรหา PA เพื่ออ่านข้อมูลไม่ได้
อ้างอิงสไลด์หน้า 74, 76, 77, 78

### จุดที่มักสับสน
- แยกหน่วยก่อน: byte address 36 กับ word address 36 อาจแมปคนละ line; ในตัวอย่าง word=4 B จึงแปลง word address 36 เป็น byte address 144
- Tag ตรงยังไม่พอ ต้อง valid=1; cache capacity ที่เป็น data bytes ไม่รวม metadata และจำนวน sets ไม่เท่าจำนวน lines เมื่อหลาย ways
- LRU ต้องอัปเดตลำดับทั้งเมื่อ hit และเมื่อเติม block; compulsory, conflict, capacity แยกตามสาเหตุ ไม่ใช่เรียกทุก miss ที่แทนที่ว่า capacity
- ใช้หน่วยเวลาเดียวกันและตัวหาร miss rate ให้ถูก; local L2 rate ต่างจาก global และ CPI ต้องถ่วง data accesses/instruction
- TLB miss ไม่เท่ากับ page fault; virtual machine (guest OS/VMM) ต่างจาก virtual memory (address translation/page)
- SEC แก้บิตเดียวกับ SECDED ไม่เหมือนกัน; AMAT พื้นฐานไม่รวมการซ่อน latency ของ out-of-order และ coherence ต่างจาก consistency

หมายเหตุสไลด์หน้า 32
ภาพแบ่ง address ระบุ tag 22, index 6, offset 4 bits แต่ป้ายซ้ายสุดเป็น 63
ใช้ให้ถูก: สำหรับ address 32 bits ป้ายซ้ายสุดคือ bit 31; ถ้าใช้ address 64 bits จริง tag จะเป็น 54 bits
22+6+4=32; จำนวน tag bits ต้องเท่ากับ address width ลบ index และ offset

หมายเหตุสไลด์หน้า 55
บรรทัด extra penalty เขียน 500 cycles
ใช้ให้ถูก: Extra main-memory penalty คือ 400 cycles ตามข้อมูลตัวอย่าง
100 ns ÷ 0.25 ns/cycle = 400 cycles และสมการ CPI ในหน้าเดียวกันใช้ 400 ได้ 3.4

หมายเหตุสไลด์หน้า 68
หัวข้อเขียน SEC/DEC และตารางใช้ H odd/even โดยไม่อธิบายว่าเป็นผลตรวจ syndrome
ใช้ให้ถูก: ชื่อมาตรฐานที่สอดคล้องกับเนื้อหาคือ SECDED (single-error correction, double-error detection). ใช้ H=0/ไม่เท่ากับ 0 กับ overall parity: H=0,parity ผ่าน→ไม่พบ error; H≠0,parity ผิด→แก้หนึ่งบิต; H=0,parity ผิด→overall parity bit ผิด; H≠0,parity ผ่าน→ตรวจพบสองบิตผิด
การตัดสินจากเลข syndrome ว่าเป็นเลขคี่หรือคู่ใช้ไม่ได้ เช่น syndrome 1010₂ เป็นตำแหน่ง 10 ที่ยังแก้ single error ได้; เงื่อนไขนี้สมมติความผิดพลาดไม่เกินสองบิต

### ลองตอบเอง
**Cache 8 lines, 1 word/block, direct mapped เริ่มว่าง อ่าน word addresses 22,26,22,18,26 ได้ hit/miss อะไร?**
M,M,H,M,M: 22→index6 tag2; 26→index2 tag3; 18→index2 tag2 จึงไล่ 26 ออก ทำให้การอ่าน 26 ครั้งสุดท้าย miss

**L1 miss rate 4%, local L2 miss rate 10%, L1 hit 1 ns, L2 เพิ่ม 5 ns, memory เพิ่ม 100 ns: global memory miss rate และ AMAT เท่าไร?**
Global = 0.04×0.10 = 0.004 = 0.4%; AMAT = 1 + 0.04×(5+0.10×100) = 1.6 ns/access โดยทุก L1 miss ไป L2 และไม่มี latency overlap

**TLB ไม่มีคำแปล แต่ page อยู่ DRAM และ PTE present: ต้องอ่าน disk หรือไม่? ถ้า page ไม่อยู่ DRAM และเหยื่อ dirty ล่ะ?**
กรณีแรกไม่ต้องอ่าน disk: เติม TLB จาก page table แล้ว retry. กรณีหลังเป็น page fault: OS เขียนเหยื่อ dirty กลับก่อน โหลด page ที่ต้องการ อัปเดต PTE/คำแปล แล้ว restart คำสั่ง

อ้างอิง: itds-211_comp_arch_Chapter04.pdf

## บท 5 — Input / Output Systems
ระบบรับเข้าและส่งออก

I/O module เป็นล่ามระหว่าง CPU ที่เร็วกับอุปกรณ์ที่ช้า: ต้องส่งข้อมูลถูกที่ ถูกเวลา และลดเวลาที่ CPU เสียไปกับการรอ

### ใจความสำคัญ
- แยกข้อมูล คำสั่งควบคุม และสถานะให้ได้
- MMIO ใช้ address space ร่วมกับ memory; isolated I/O แยกพื้นที่และคำสั่ง
- Polling รอวน; interrupt ให้ CPU ไปทำงานอื่น; DMA ย้ายบล็อกโดยไม่ผ่าน CPU ทุกคำ
- Interrupt ต้องบันทึกสถานะ เรียก ISR แล้วคืนสถานะ
- DMA ยังต้องให้ CPU ตั้งค่าและยังแย่ง bandwidth ของ bus/memory
- DCA แบบ prefetch hint และ DDIO แบบ cache injection เป็นคนละวิธี

### ภาพจำ: Polling, Interrupt และ DMA ต่างกันตรงไหน
![Polling, Interrupt และ DMA ต่างกันตรงไหน](dist/images/review/io.svg)
Polling ให้ CPU ถามสถานะซ้ำ ๆ; Interrupt ให้อุปกรณ์แจ้งเมื่อพร้อม แต่ CPU ยังอาจต้องคัดลอกข้อมูล; DMA ให้ตัวควบคุมขนข้อมูลระหว่างอุปกรณ์กับ memory หลัง CPU ตั้งค่างาน และมักแจ้งเมื่อเสร็จ
อิงสไลด์หน้า 8, 9, 10, 11

### I/O module และอุปกรณ์ภายนอก
อุปกรณ์ติดต่อผ่าน controller เพราะความเร็ว รูปแบบข้อมูล และจังหวะต่างจาก CPU
- System bus มี address, data และ control lines
- Device มี control logic, buffer และ transducer แปลงสัญญาณกับโลกภายนอก
- อุปกรณ์แบ่งเป็น human-readable, machine-readable และ communication
- I/O module จัด timing, decode คำสั่ง, รายงานสถานะ, buffer และตรวจ error

ตัวอย่าง: คีย์บอร์ดแปลงการกดเป็นรหัส พักใน buffer แล้วให้ CPU อ่าน
อ้างอิงสไลด์หน้า 3, 4, 5, 6, 7

### คำสั่งและ register ที่ใช้สื่อสาร
CPU เลือก address ของ controller แล้วอ่านหรือเขียน register เพื่อสั่งงานและรับผล
- Control: เริ่มหรือกำหนดการทำงาน
- Test: ตรวจ ready/busy/error
- Read: รับข้อมูลจากอุปกรณ์เข้า buffer; Write: ส่งข้อมูลจาก bus ไปอุปกรณ์
- Data register เก็บข้อมูล ส่วน status/control register เก็บสถานะและคำสั่ง

ตัวอย่าง: เริ่มอ่านคีย์ → ตรวจ ready → อ่าน data register
อ้างอิงสไลด์หน้า 7, 10, 12, 14

### Memory-mapped เทียบกับ isolated I/O
ความต่างอยู่ที่วิธีระบุ address และคำสั่งที่ CPU ใช้ ไม่ได้บอกว่าข้อมูลอุปกรณ์กลายเป็น RAM
- MMIO: memory และ I/O อยู่ใน address space เดียว ใช้ load/store
- Isolated I/O: address space แยก มีสัญญาณเลือกและคำสั่ง I/O เฉพาะ
- Controller ต้อง decode address ว่าคำสั่งส่งถึงตัวเองหรือไม่

ตัวอย่าง: MMIO อาจอ่าน status ที่ address 517 ส่วน isolated ใช้ Test I/O ที่ port ของอุปกรณ์
อ้างอิงสไลด์หน้า 12, 13, 14

### Programmed I/O และ polling
CPU สั่งงานแล้ววนอ่าน status จนพร้อม จากนั้น CPU เป็นคนย้ายข้อมูลทีละหน่วย
- เข้าใจง่าย แต่เสีย CPU cycles ระหว่างรอ
- การย้ายบล็อกต้องทำวงรอบตรวจและย้ายซ้ำ
- อัตราข้อมูลจำกัดด้วยความเร็วที่ CPU ตรวจและ service ได้

ตัวอย่าง: เหมือนยืนถามหน้าร้านทุกวินาทีว่าอาหารเสร็จหรือยัง
อ้างอิงสไลด์หน้า 8, 9, 11, 24

### Interrupt-driven I/O และลำดับ ISR
CPU สั่ง I/O แล้วทำงานอื่น เมื่ออุปกรณ์พร้อมจึงขอ interrupt ให้ CPU มาบริการ
- แบบง่ายรับ interrupt เมื่อคำสั่งปัจจุบันจบ
- เก็บ PC และ PSW แล้วบันทึก register ที่ ISR จะใช้
- เรียก interrupt service routine (ISR), จัดการข้อมูล/สถานะ แล้ว restore เพื่อทำงานเดิมต่อ
- ลดการรอวน แต่ CPU ยังย้ายข้อมูลและเสีย overhead ต่อการ service

ตัวอย่าง: เหมือนร้านกดเรียกเมื่ออาหารพร้อม เราจึงกลับไปรับ
อ้างอิงสไลด์หน้า 8, 11, 15, 16, 17, 24

### ใคร interrupt และใครได้ก่อน
ต้องระบุแหล่ง interrupt และเลือก priority เมื่อหลายอุปกรณ์ร้องขอพร้อมกัน
- Multiple lines: แยกเส้นร้องขอ แต่จำนวนเส้นมีจำกัด
- Software polling: ISR ไล่ตรวจ status ของแต่ละ module
- Daisy chain: acknowledge ผ่านลำดับอุปกรณ์; ผู้รับส่ง vector ระบุ routine
- Bus arbitration: module ชนะสิทธิ์ bus แล้วส่ง vector; interrupt controller เช่น 82C59A ช่วยรวมและจัด priority

ตัวอย่าง: Daisy chain ให้ตัวต้นสายพบ acknowledge ก่อน จึงเกิด priority ตามตำแหน่ง
อ้างอิงสไลด์หน้า 18, 19, 20

### 8255A: ตัวอย่าง programmable interface
8255A แสดงให้เห็นว่า software เปลี่ยนทิศทางและ mode ของพอร์ตผ่าน control word ได้
- Port A และ B กว้าง 8 บิต; Port C แบ่ง upper/lower 4 บิต
- D7=1 เลือก mode-setting; บิตอื่นกำหนด input/output และ mode ของกลุ่ม A/B
- D7=0 ใช้ bit set/reset กับ Port C; D3..D1 เลือกบิตและ D0 เลือก set/reset
- Port C ใช้ส่งสัญญาณประสานงาน เช่น data ready และ acknowledge
- Control word แยก mode ของ Group A (0/1/2) กับ Group B (0/1) และกำหนดทิศทาง Port C สองครึ่งแยกกัน

ตัวอย่าง: คีย์บอร์ดเข้าพอร์ต A, display ออกพอร์ต B, ใช้ C แจ้งพร้อมรับข้อมูล
อ้างอิงสไลด์หน้า 21, 22, 23

### DMA: ให้ controller ย้ายบล็อก
CPU ตั้งทิศทาง address เริ่มต้นและจำนวนข้อมูล จากนั้น DMA controller จัดการรับส่งกับ memory แล้วแจ้งเมื่อเสร็จ
- มี address register, data count และ control logic
- CPU ไม่ต้อง copy ทุก word แต่ยังตั้งค่าและจัดการ completion/error
- Cycle stealing ขอใช้ bus เป็นช่วง ทำให้ CPU อาจชะงักระหว่างแย่ง bus
- DMA request กับ interrupt มีจุดรับบริการต่างกันใน instruction cycle

ตัวอย่าง: อ่านดิสก์ 4 KiB: ตั้ง buffer/count ครั้งเดียว แล้วให้ DMA ย้ายทั้งบล็อก
อ้างอิงสไลด์หน้า 8, 9, 11, 24, 25, 26

### โครงสร้าง DMA และตัวอย่าง 8237
ตำแหน่ง DMA controller มีผลต่อจำนวนครั้งที่ใช้ system bus และการแย่งทรัพยากร
- Detached DMA ใช้ bus สื่อสาร I/O และ memory; integrated DMA-I/O ลดบางรอบบน bus
- I/O bus แยกอุปกรณ์ออกจาก system bus โดยมี DMA เป็นตัวเชื่อม
- 8237 ใช้ DREQ/DACK กับอุปกรณ์ และ HRQ/HLDA เพื่อขอ bus จาก CPU
- Fly-by DMA ให้ข้อมูลไหลตรง I/O ↔ memory; 8237 มี 4 channels และทำงานทีละ channel
- Command/status/mode/mask registers ใช้เปิดระบบ ตรวจ terminal count เลือกวิธีโอน และอนุญาตแต่ละ channel; memory-to-memory ใช้ register เป็นทางผ่าน

ตัวอย่าง: HRQ = ขอ bus; HLDA = CPU ยอมให้; DMA ส่ง address/control ขณะที่ข้อมูลวิ่งตรง
อ้างอิงสไลด์หน้า 27, 28, 29, 30

### Network I/O ทำไมไปติด cache
Packet มี payload และ header ซ้อนตาม Ethernet/IP/TCP; เส้นทางผ่านหลาย buffer ทำให้เกิด memory traffic และ cache miss
- รับเข้า: NIC รับ packet → DMA → interrupt → CPU อ่าน descriptor/header
- ส่งออก: สร้าง packet → DMA ไป NIC → completion → คืน buffer
- แม้ DMA ไม่ copy ด้วย CPU ทุก byte แต่ CPU ยังต้องอ่าน header และข้อมูลที่ต้องประมวลผล
- การ copy ระหว่าง system/application buffer เพิ่มงาน memory

ตัวอย่าง: NIC เขียน packet ลง RAM แต่ core จะอ่าน header อาจยัง cache miss
อ้างอิงสไลด์หน้า 31, 33, 34, 35

### DCA และ DDIO
แนวคิดคือทำให้ข้อมูล I/O ใกล้ core ที่ต้องใช้ ลดการเดินทางผ่าน main memory
- DCA แบบแรก: memory controller ส่ง prefetch hint เมื่อข้อมูลเข้า RAM แล้ว ใช้กับ incoming traffic ในตัวอย่าง
- Cache injection/DDIO: ให้ I/O รับส่งผ่าน last-level cache โดยตรงมากขึ้น
- DDIO ในรูปครอบคลุมเส้นทางรับและส่ง จึงอย่าเหมารวมว่าทุก DCA ใช้ได้เฉพาะขาเข้า
- ยังต้องจัด coherence และทรัพยากร cache; ไม่ได้ทำให้ bandwidth ไม่จำกัด

ตัวอย่าง: แบบ hint คือบอกให้หยิบของไว้ก่อน; แบบ injection คือส่งของเข้าชั้น cache เลย
อ้างอิงสไลด์หน้า 31, 32, 36, 37

### I/O channel: ย้ายงานควบคุมออกจาก CPU
จาก controller ธรรมดา พัฒนาเป็นหน่วยที่รันชุดคำสั่ง I/O และมี memory ของตัวเอง
- วิวัฒนาการ: CPU คุมตรง → programmed → interrupt → DMA → I/O processor
- Selector channel เลือกดูแลการโอนของอุปกรณ์หนึ่งในช่วงหนึ่ง
- Multiplexer channel สลับดูแลหลายการโอน
- IBM EC12 แสดงลำดับ partition → channel subsystem → channel → controller/device

ตัวอย่าง: เหมือนจ้างหัวหน้าคลังให้จัดส่งเอง CPU ส่งงานใหญ่แล้วรับผล
อ้างอิงสไลด์หน้า 38, 39, 49, 50, 51

### Bus และ interface สำหรับอุปกรณ์
เลือกดูบทบาท โครงสร้าง และชนิดการเชื่อมต่อก่อนจำชื่อรุ่นหรือความเร็ว
- USB: host controller และต้นไม้แบบลำดับชั้น; FireWire: serial, daisy chain, hot plug
- SCSI ในตัวอย่างเป็น shared parallel bus; PCI Express เป็นการเชื่อม peripheral ความเร็วสูง
- SATA สำหรับ storage; Thunderbolt รวม data/display/power ในสายเดียว
- InfiniBand ใช้ switched fabric เชื่อม server/storage; USB/SATA ไม่ใช่คำแทน DMA

ตัวอย่าง: SSD อาจติดต่อผ่าน SATA หรือ PCIe แต่ DMA คือวิธีย้ายข้อมูลภายในระบบ
อ้างอิงสไลด์หน้า 41, 42, 43, 44, 45, 46

### Ethernet, Wi-Fi และการอ่านสเปก
Ethernet ใช้เครือข่ายสายและ switch ส่วน Wi-Fi ใช้คลื่นไร้สายตามตระกูล IEEE 802.11
- Throughput ใช้งานจริงต่ำกว่า signaling rate เพราะ protocol/encoding/การแข่งขันใช้ลิงก์
- แยก bit/s กับ byte/s: 8 bit = 1 byte
- ตัวเลขรุ่น ปี ราคา และคำว่า current ในสไลด์เป็นบริบทเก่า
- โจทย์ให้ค่าใดใช้ค่านั้นพร้อมหน่วย แต่อย่านำตัวเลขเก่ามาสรุปเป็นเพดานของเทคโนโลยีทั้งหมด

ตัวอย่าง: ลิงก์ 1 Gbit/s มีเพดานก่อน overhead เท่ากับ 125 MB/s แบบฐานสิบ
อ้างอิงสไลด์หน้า 41, 43, 44, 46, 47, 48

### สูตร: เวลาโอนข้อมูลจาก bandwidth

T = D / B

- T: เวลาโอน (s)
- D: ขนาดข้อมูล (byte)
- B: อัตราข้อมูลที่ใช้ได้ (byte/s)

โจทย์: ข้อมูล 4 MB, payload bandwidth 100 MB/s; ใช้ MB ฐานสิบและไม่รวม setup
1. T = 4 MB ÷ 100 MB/s
2. T = 0.04 s = 40 ms

**ตอบ: ใช้เวลาโอน 40 ms**
ระวัง: ต้องแปลง Mbps เป็น MB/s ก่อน และแยก setup/interrupt overhead ออกจาก transfer
อ้างอิงสไลด์หน้า 24, 41

### สูตร: ต้นทุน CPU ของ programmed I/O เทียบ DMA

C_PIO = N × c; C_DMA = C_setup + C_done

- C: CPU cycles
- N: จำนวนหน่วยข้อมูล (หน่วย)
- c: CPU cycles ต่อหน่วย
- C_setup,C_done: CPU cycles สำหรับตั้งค่าและปิดงาน

โจทย์: ย้าย 1024 words, PIO 10 cycles/word; DMA setup 200 และ completion 100 cycles (ตัวอย่างเสริม)
1. C_PIO = 1024 × 10 = 10240 cycles
2. C_DMA = 200 + 100 = 300 cycles
3. CPU cycles ที่ประหยัด = 10240 − 300 = 9940

**ตอบ: CPU ใช้ 300 แทน 10240 cycles ภายใต้สมมติฐานนี้**
ระวัง: เป็นต้นทุน CPU ไม่ใช่เวลารวมของ I/O; DMA ยังใช้ bus และรออุปกรณ์
อ้างอิงสไลด์หน้า 8, 24, 25

### สูตร: แปลงอัตราบิตเป็นอัตราไบต์

B_byte = B_bit / 8

- B_bit: อัตรา bit/s
- B_byte: อัตรา byte/s

โจทย์: signaling rate 480 Mbit/s สมมติยังไม่หัก overhead
1. 480 ÷ 8 = 60 MB/s
2. ข้อมูล 120 MB ใช้เวลาอย่างน้อย 120 ÷ 60 = 2 s

**ตอบ: เพดานดิบ 60 MB/s; เวลาจริงมากกว่า 2 s เมื่อมี overhead**
ระวัง: MB/s ไม่ใช่ Mbps และ raw rate ไม่เท่ากับ payload throughput
อ้างอิงสไลด์หน้า 41

### จุดที่มักสับสน
- Interrupt-driven I/O ยังผ่าน CPU ขณะย้ายข้อมูล ต่างจาก DMA
- MMIO กับ isolated I/O เป็นการจัด address ไม่ใช่การเลือก polling/interrupt
- DMA ไม่ได้แปลว่า CPU ไม่เกี่ยวข้องเลย และอาจแย่ง bus
- Vector ระบุ ISR/แหล่งบริการ ไม่ใช่ข้อมูล payload
- DCA แบบ hint ในสไลด์ไม่ใช่ DDIO ทุกแบบ
- อย่าจำความเร็วในสไลด์เก่าเป็นสเปกปัจจุบันหรือสับสน Mbps กับ MB/s

### ลองตอบเอง
**อุปกรณ์ช้าและข้อมูลมาครั้งละน้อย จะลดการรอวนด้วยอะไร?**
ใช้ interrupt-driven I/O ให้ CPU ทำงานอื่นระหว่างรอ แต่ CPU ยัง service และย้ายข้อมูล

**DMA เริ่มงานต้องรู้อะไร และเสร็จแล้วทำอะไร?**
ต้องรู้ทิศทาง อุปกรณ์/address memory และ count; โอนเองแล้วรายงาน completion/error มักใช้ interrupt

**MMIO ใช้ load/store หมายความว่าต้องใช้ polling เสมอหรือไม่?**
ไม่จำเป็น MMIO เป็นวิธี address register ส่วน polling/interrupt เป็นวิธีรู้ว่าอุปกรณ์พร้อม

อ้างอิง: itds-211_comp_arch_Chapter05.pdf

## บท 6 — Storage Systems
หน่วยเก็บข้อมูลภายนอก

HDD รอหัวอ่านและการหมุน; SSD ไม่มีชิ้นส่วนหมุนแต่มีข้อจำกัดการลบ/เขียน; RAID แลกพื้นที่และงานเขียนกับความเร็วหรือความทนต่อดิสก์เสีย

### ใจความสำคัญ
- HDD access time = seek + rotational delay; transfer และ queue ต้องบวกเมื่อหาเวลารวม
- Average rotational latency เท่ากับครึ่งรอบ เมื่อจุดเริ่มกระจายสม่ำเสมอ
- RAID 0 ไม่มี redundancy; 1 mirror; 5 parity 1 ชุด; 6 parity 2 ชุด
- ความจุ RAID ต้องระบุว่าจำนวนดิสก์หมายถึงจำนวนทั้งหมดหรือจำนวน data disks
- SSD ต้อง erase เป็น block และมี endurance จำกัด จึงใช้ wear leveling/ECC
- Optical แยก ROM/R/RW; tape เด่นงานเรียงต่อเนื่องและเก็บสำรอง

### ภาพจำ: RAID 5 กระจาย Parity ไปหลายดิสก์
![RAID 5 กระจาย Parity ไปหลายดิสก์](dist/images/review/raid.svg)
ตัวอย่าง 4 ดิสก์ขนาดเท่ากัน: หนึ่ง stripe มีข้อมูล 3 ส่วนและ parity 1 ส่วน โดยตำแหน่ง parity สลับดิสก์ ความจุใช้งานประมาณ 3S และทนดิสก์เสียได้ 1 ลูก ตามสมมติฐานนี้ RAID ไม่แทนการสำรองข้อมูล
อิงสไลด์หน้า 19, 26

### HDD เขียนและอ่านอย่างไร
ผิว platter เคลือบแม่เหล็ก เก็บข้อมูลด้วยสภาวะแม่เหล็ก หัวเขียนสร้างสนาม ส่วนหัวอ่านตรวจการเปลี่ยนแปลง
- Inductive write head ใช้กระแสสร้างสนามแม่เหล็ก
- Magnetoresistive read head อ่านผ่าน sensor
- Substrate ต้องเรียบ แข็ง และทนแรงกระแทกเพื่อลด error
- หัวแคบและอยู่ใกล้ผิวช่วยเพิ่ม density แต่ไวต่อสิ่งปนเปื้อน

ตัวอย่าง: เหมือนเขียนลายแม่เหล็กบนแผ่นที่หมุนผ่านหัวอ่าน
อ้างอิงสไลด์หน้า 4, 5, 6, 12

### Track, sector และ cylinder
มอง HDD เป็นวงซ้อนบนแต่ละผิว แบ่งเป็น sector และวางหลาย platter บน spindle เดียว
- Track: วงข้อมูลหนึ่งวง; sector: ช่วงหนึ่งของ track
- Cylinder: กลุ่ม track รัศมีเดียวกันทุกผิว
- Movable-head มีหัวต่อผิวและขยับแขน; fixed-head มีหัวต่อ track
- มีทั้ง removable/nonremovable และ single/double-sided

ตัวอย่าง: จะอ่าน sector หนึ่ง: ขยับไปรัศมีของ track แล้วรอ sector หมุนมาถึง
อ้างอิงสไลด์หน้า 7, 10, 11

### การจัดผิวและ format
พื้นที่ดิบไม่ได้กลายเป็น payload ทั้งหมด เพราะต้องมีช่องว่างและข้อมูลกำกับ
- CAV รักษาความเร็วเชิงมุม; รูปเทียบกับ multiple-zone ที่ track ชั้นนอกมี sector มากขึ้น
- Zone เพิ่มการใช้พื้นที่ด้านนอกให้คุ้มกว่าแบ่ง sector เท่ากันทุก track
- Sector format มี ID, sync, CRC และ gaps นอกเหนือข้อมูลผู้ใช้
- ตัวอย่าง ST506 มี payload 512 bytes ใน physical sector ราว 600 bytes

ตัวอย่าง: 600 bytes ที่ใช้บนจานไม่ได้แปลว่าโปรแกรมเก็บข้อมูลได้ 600 bytes
อ้างอิงสไลด์หน้า 8, 9

### เวลาเข้าถึง HDD ต้องแยกส่วน
การอ่านหนึ่งครั้งอาจรอคิว/ช่องทางก่อนเริ่มเคลื่อนหัวและโอนข้อมูล
- Seek: เลื่อนหัวไป track ที่ต้องการ
- Rotational latency: รอ sector หมุนมาถึงหัว
- ในสไลด์ access time = seek + rotational delay
- Response time รวม queue/controller/channel และ transfer ด้วยตามโจทย์

ตัวอย่าง: อ่านไฟล์จิ๋วสุ่มหลายครั้งอาจช้า แม้ sequential MB/s สูง เพราะรอ seek/rotation ซ้ำ
อ้างอิงสไลด์หน้า 13, 14, 15

### RAID: striping, mirroring และ parity
RAID รวมหลาย physical drives เป็น logical drive แล้วกระจายข้อมูล และอาจเพิ่มข้อมูลซ้ำเพื่อทนความเสียหาย
- Striping แบ่งข้อมูลลงหลายดิสก์เพื่อขนาน
- Mirroring เก็บสำเนาข้อมูลเต็ม
- Parity เก็บค่าคำนวณเพื่อสร้างข้อมูลที่หายกลับเมื่อเสียไม่เกินขีดจำกัด
- RAID เป็นแบบสถาปัตยกรรม ไม่ใช่ level สูงแล้วดีกว่าทุกด้าน; RAID 0 เป็นข้อยกเว้นที่ไม่มี redundancy

ตัวอย่าง: RAID 5 ใช้พื้นที่เทียบเท่า 1 ดิสก์เก็บ parity แต่ parity กระจายทั่ว array
อ้างอิงสไลด์หน้า 16, 17, 18, 19

### RAID 0 และ RAID 1
RAID 0 เน้นกระจายงาน ส่วน RAID 1 จ่ายพื้นที่เพิ่มเพื่อเก็บสำเนา
- RAID 0: ไม่มี parity/mirror; ดิสก์ตัวเดียวเสียอาจทำให้ข้อมูลทั้ง array ใช้ไม่ได้
- RAID 0 เร็วขึ้นเมื่อทางเชื่อมและรูปแบบ request ใช้งานหลายดิสก์ได้จริง
- RAID 1: อ่านได้จากสำเนาใดก็ได้ เขียนต้องปรับสำเนาทั้งคู่
- Mirror หลายคู่ทนเสียหลายตัวได้เฉพาะเมื่อไม่เสียทั้งสองตัวในคู่เดียว
- ภาพเสริมหน้า 19 มี RAID 10: ทำ mirror เป็นคู่แล้ว stripe ข้ามคู่; ต่างจาก RAID 0 ที่ไม่มีสำเนา

ตัวอย่าง: 4 ลูก × 2 TB: RAID 0 ใช้ได้ 8 TB; mirror เป็น 2 คู่ใช้ได้ 4 TB
อ้างอิงสไลด์หน้า 18, 20, 21, 22, 27

### RAID 2 และ RAID 3: parallel access
ในกลุ่มนี้ดิสก์หลายตัวร่วมทำ I/O เดียว โดยกระจายเป็นชิ้นเล็กมาก
- RAID 2 ใช้ ECC/Hamming code และหลาย redundancy disks
- RAID 3 ใช้ small-strip/bit-or-byte-level striping กับ parity disk เดียว
- เหมาะถ่ายข้อมูลก้อนใหญ่ มากกว่ารับคำขอเล็กอิสระจำนวนมาก
- RAID 3 กู้ข้อมูลจาก parity และดิสก์ที่เหลือได้เมื่อเสีย 1 ตัว แต่ต้อง rebuild

ตัวอย่าง: งานหนึ่งเรียกใช้ทุกดิสก์พร้อมกัน จึงไม่ได้รับงานเล็กแยกกันได้อิสระเท่า block striping
อ้างอิงสไลด์หน้า 17, 18, 19, 23, 24, 28

### RAID 4, 5 และ 6: block และ parity
Block striping ให้ดิสก์ตอบคำขอแยกกันได้ แต่ต้องคง parity ให้ตรงกับข้อมูล
- RAID 4 มี parity disk เฉพาะ จึงอาจเป็นคอขวดของการเขียน
- RAID 5 กระจาย parity ลดคอขวดเฉพาะดิสก์ ทนเสีย 1 ตัว
- RAID 6 มี parity อิสระ 2 ชุด ทนเสีย 2 ตัว และเขียนมีภาระมากขึ้น
- Small random write แบบ read-modify-write ของ RAID 4/5 ใช้ 2 reads + 2 writes; full-stripe write มีรูปแบบต่างออกไป

ตัวอย่าง: RAID 6 จำนวน 6 ลูก ลูกละ 2 TB เหลือข้อมูล 8 TB และ parity เทียบเท่า 4 TB
อ้างอิงสไลด์หน้า 19, 25, 26, 28

### Reliability, degraded mode และ rebuild
ทนดิสก์เสียไม่ได้แปลว่าปลอดภัยจากทุกสาเหตุ ต้องดู failure ที่แบบ RAID รับได้และเวลาสร้างสำเนากลับ
- Degraded mode ยังให้บริการได้แต่เหลือ redundancy น้อยลงและอาจช้าลง
- Rebuild อ่านดิสก์ที่เหลือมาสร้างข้อมูลบนลูกใหม่ เพิ่ม I/O load
- Availability ขึ้นกับ failure/repair time และสาเหตุร่วม ไม่ใช่แค่จำนวนลูก
- RAID ไม่ย้อนการลบผิดหรือไฟล์เสียที่ถูกเขียนซ้ำทุกสำเนา จึงยังต้องมี backup

ตัวอย่าง: Mirror สองลูกป้องกันลูกหนึ่งเสีย แต่การลบไฟล์ผิดจะถูกลบใน mirror ด้วย
อ้างอิงสไลด์หน้า 17, 22, 24, 26, 27, 28

### SSD และ controller
SSD ใช้ flash ไม่มี seek/rotational delay จึงได้ latency ต่ำและ IOPS สูงเมื่อเทียบกับ HDD ในบทเรียน
- ภายในมี interface/controller, addressing, data buffer/cache, error correction และ flash chips
- ไม่มีส่วนหมุน จึงเงียบและทนแรงกระแทกจากการใช้งานได้ดี
- ความเร็ว อายุ และพลังงานจริงขึ้นกับรุ่น/workload; ข้อความว่าอายุยืนกว่าทุกกรณีไม่ใช่กฎ
- ตัวเลขราคา/ความจุในตารางเป็นตัวอย่างเก่า ไม่ใช่เพดานของ SSD

ตัวอย่าง: การอ่านเล็กแบบสุ่มไม่ต้องเสียเวลาขยับหัวหรือรอรอบจาน
อ้างอิงสไลด์หน้า 29, 30, 31

### ข้อจำกัดการเขียน flash
Flash เขียนทับตำแหน่งเดิมแบบ RAM ไม่ได้ ต้องลบระดับ block และมีจำนวนรอบลบ/เขียนจำกัด
- การแก้ข้อมูลเล็กอาจกระตุ้นงานอ่าน/ย้าย/ลบ/เขียนมากกว่าที่ host ส่ง
- Cache รวมการเขียนเพื่อลดงานซ้ำ
- Wear leveling กระจายการเขียนไม่ให้บาง block สึกก่อน
- Bad-block management/ECC ดูแล block เสียและ error; ประเมิน remaining lifetime เพื่อวางแผน

ตัวอย่าง: เหมือนแก้คำเดียวแต่ต้องจัดการหน้ากระดาษทั้งแผ่น จึงมีต้นทุนมากกว่าข้อมูลที่เปลี่ยน
อ้างอิงสไลด์หน้า 31, 32

### Optical: ROM, R และ RW
Optical disk ใช้เลเซอร์อ่านความต่างของแสงสะท้อนบน track
- ROM: ผลิตข้อมูลมาแล้วอ่านอย่างเดียว; R: เขียนครั้งเดียวอ่านหลายครั้ง
- RW: เปลี่ยนสภาพวัสดุเพื่อเขียนใหม่ได้ มี endurance จำกัด
- CD-ROM มี sync/ID/ECC นอก payload; block ตัวอย่าง 2352 bytes มี user data 2048 bytes
- CD-ROM เหมาะแจกสำเนาจำนวนมากและถอดเก็บ แต่แก้ข้อมูลเดิมไม่ได้

ตัวอย่าง: CD-R ใช้ชั้น dye เปลี่ยนการสะท้อน ส่วน CD-RW ใช้ phase change ระหว่าง amorphous/crystalline
อ้างอิงสไลด์หน้า 33, 34, 35, 36, 37, 38

### DVD และ Blu-ray เพิ่มความหนาแน่น
ลดขนาดจุดเลเซอร์และเพิ่มชั้นข้อมูลเพื่อบรรจุข้อมูลมากขึ้น
- รูปเปรียบเทียบ CD 780 nm, DVD 650 nm, Blu-ray 405 nm
- ความยาวคลื่นสั้นลงช่วยอ่าน pit/track ที่เล็กและชิดขึ้น
- DVD ในตัวอย่างเป็น dual-layer/double-sided; ความจุขึ้นกับจำนวนชั้นและด้าน
- ROM/R/RW คือความสามารถการเขียน ไม่ใช่ชื่อความจุ

ตัวอย่าง: Blu-ray single-side single-layer ในสไลด์เก็บ 25 GB
อ้างอิงสไลด์หน้า 33, 39, 40

### Magnetic tape และการเลือกสื่อ
Tape เก็บบล็อกต่อกันบน track ยาว เหมาะอ่าน/เขียนต่อเนื่องและเก็บข้อมูลสำรองมากกว่าค้นสุ่มบ่อย
- Physical records คั่นด้วย inter-record gaps
- Serpentine เขียนไปสุดเทปแล้วกลับทิศบน track ถัดไป
- หลาย track อาจอ่าน/เขียนพร้อมกันได้
- เทียบ HDD/SSD/tape โดย access pattern, latency, throughput, capacity และต้นทุน ไม่ดู MB/s เพียงตัวเดียว

ตัวอย่าง: กู้ backup ใหญ่แบบไล่เรียงเหมาะกับ tape แต่เปิดไฟล์สุ่มทีละไฟล์ต้องรอเลื่อนเทป
อ้างอิงสไลด์หน้า 41, 42, 43, 44

### สูตร: รอบหมุนและ rotational latency เฉลี่ย

T_rev = 60000 / RPM; L_avg = T_rev / 2

- RPM: รอบต่อนาที (rev/min)
- T_rev: เวลา 1 รอบ (ms)
- L_avg: เวลารอการหมุนเฉลี่ย (ms)

โจทย์: HDD 7200 RPM; สมมติจุดเริ่ม sector กระจายสม่ำเสมอ
1. T_rev = 60000 ÷ 7200 = 8.333 ms
2. L_avg = 8.333 ÷ 2 = 4.167 ms

**ตอบ: รอการหมุนเฉลี่ยประมาณ 4.17 ms**
ระวัง: 60000 แปลงนาทีเป็น ms; ครึ่งรอบคือค่าเฉลี่ย ไม่ใช่กรณีแย่ที่สุด
อ้างอิงสไลด์หน้า 13, 15

### สูตร: เวลาตอบสนองของ disk I/O

T_total = T_queue + T_seek + L_rot + D / B

- เวลาแต่ละ T และ L ใช้ ms
- D: ปริมาณข้อมูล (byte)
- B: อัตราข้อมูล (byte/s); แปลง D/B จาก s เป็น ms

โจทย์: queue=2 ms, seek=5 ms, 7200 RPM, อ่าน 1 MB ที่ 100 MB/s; สมมติไม่คิด overhead อื่น
1. L_rot เฉลี่ย = 30000/7200 = 4.167 ms
2. Transfer = 1/100 s = 10 ms
3. T_total = 2 + 5 + 4.167 + 10 = 21.167 ms

**ตอบ: เวลารวมประมาณ 21.17 ms; access time ตามนิยามสไลด์ = 9.17 ms**
ระวัง: Access time ในสไลด์ไม่รวม transfer/queue และอย่าใช้ peak transfer แทน random-I/O latency
อ้างอิงสไลด์หน้า 14, 15

### สูตร: ความจุใช้ได้ของ RAID แบบดิสก์ขนาดเท่ากัน

RAID0: nS; mirror pairs: nS/2; RAID5: (n−1)S; RAID6: (n−2)S

- n: จำนวน physical disks ทั้งหมด (ลูก)
- S: ความจุต่อดิสก์ (TB แบบเดียวกัน)
- C: ความจุใช้งานก่อน filesystem/metadata (TB)

โจทย์: มี 6 ลูก ลูกละ 2 TB; mirror แบบจับคู่, ไม่รวม spare
1. RAID 0 = 6×2 = 12 TB
2. Mirror 3 คู่ = 6×2/2 = 6 TB
3. RAID 5 = (6−1)×2 = 10 TB
4. RAID 6 = (6−2)×2 = 8 TB

**ตอบ: 0:12 TB, mirror:6 TB, 5:10 TB, 6:8 TB**
ระวัง: ตารางสไลด์ใช้ N เป็น data disks แต่สูตรนี้ใช้ n เป็นดิสก์ทั้งหมด; spare และ filesystem ลดพื้นที่เพิ่ม
อ้างอิงสไลด์หน้า 17, 18, 19, 26

### สูตร: Parity XOR และการกู้ดิสก์หนึ่งตัว

P = A XOR B XOR C; B = P XOR A XOR C

- A,B,C,P: บิตหรือ word ของ stripe (หน่วยข้อมูลเท่ากัน)
- XOR: บิตต่างให้ 1 บิตเหมือนให้ 0

โจทย์: ข้อมูล A=1, B=0, C=1 แล้ว B หาย
1. P = 1 XOR 0 XOR 1 = 0
2. B = 0 XOR 1 XOR 1 = 0

**ตอบ: กู้ B ได้ 0 เมื่อรู้ตำแหน่งที่หาย**
ระวัง: Single parity กู้ได้หนึ่งตำแหน่งที่หาย ไม่ใช่สอง; RAID 6 ต้องมีสมการ parity อิสระเพิ่ม
อ้างอิงสไลด์หน้า 19, 24, 25, 26

### สูตร: IOPS โดยประมาณเมื่อทำทีละคำขอ

IOPS ≈ 1 / T_request

- T_request: เวลาต่อคำขอ (s/request)
- IOPS: จำนวนคำขอต่อวินาที (request/s)

โจทย์: เวลาต่อ random request 10 ms; queue depth 1 ไม่ซ้อนงาน
1. 10 ms = 0.010 s
2. IOPS ≈ 1/0.010 = 100 request/s

**ตอบ: ประมาณ 100 IOPS สำหรับเงื่อนไขนี้**
ระวัง: ใช้ไม่ได้ตรง ๆ กับหลาย request ที่ทำพร้อมกัน และ IOPS ไม่เท่ากับ MB/s
อ้างอิงสไลด์หน้า 15, 29

### จุดที่มักสับสน
- RAID 0 ไม่มี redundancy แม้อยู่ในชื่อ RAID
- RAID 1 หลายคู่ไม่ได้ทนดิสก์เสียทุกชุดที่มีจำนวนเท่ากัน
- RAID 5/6 ไม่รับประกันการกู้ได้เมื่อเสียเกิน 1/2 ตัว และ rebuild ไม่ได้เกิดทันที
- Small-write penalty ไม่ใช่กฎจำนวน I/O ของทุกแบบการเขียน เช่น full stripe
- SSD ไม่มี rotational latency แต่ยังมี controller, memory latency และ endurance
- อย่าสับสนความจุดิบกับ usable capacity หรือเอา RAID ไปแทน backup

หมายเหตุสไลด์หน้า 16
ข้อความรวม RAID ทุกระดับว่ามี redundancy
ใช้ให้ถูก: RAID 0 ใช้ striping แต่ไม่มี parity หรือ mirror
หน้า 17–18 ระบุ RAID 0 ว่า nonredundant จึงต้องถือเป็นข้อยกเว้น

### ลองตอบเอง
**5400 RPM มี rotational latency เฉลี่ยเท่าใด?**
30000/5400 ≈ 5.56 ms เมื่อจุดเริ่มกระจายสม่ำเสมอ

**RAID 5 มี 5 ลูก ลูกละ 4 TB ทนเสียกี่ลูกและเหลือพื้นที่เท่าใด?**
ทนเสีย 1 ลูกและใช้ได้ (5−1)×4 = 16 TB ก่อน overhead; ไม่มี spare

**ทำไมแก้ข้อมูลนิดเดียวบน SSD จึงอาจมีงานภายในมาก?**
Flash ลบเป็น block และเขียนทับตรง ๆ ไม่ได้ จึงอาจต้องย้ายข้อมูล ลบ แล้วเขียนใหม่

อ้างอิง: itds-211_comp_arch_Chapter06.pdf

## บท 7 — The Pipelined Processor
หน่วยประมวลผลและไปป์ไลน์

Pipeline ซ้อนขั้นของหลายคำสั่งเพื่อให้คำสั่งเสร็จถี่ขึ้น แต่ต้องแก้การแย่งทรัพยากร การรอข้อมูล และการเลือกเส้นทาง branch ให้ถูกต้อง

### ใจความสำคัญ
- จำ IF–ID–EX–MEM–WB และหน้าที่ของแต่ละขั้น
- Pipeline เพิ่ม throughput; ไม่ได้ทำให้คำสั่งเดียวจบเร็วขึ้นเสมอ
- จำนวนรอบอุดมคติ n+k−1 ใช้ได้เมื่อเริ่มได้หนึ่งคำสั่งต่อรอบ ไม่มี stall
- Forwarding ส่งผลที่พร้อมไปใช้ก่อน WB; load-use ติดกันยังต้อง stall ในโมเดลนี้
- Forwarding ต้องตรวจ RegWrite, rd≠x0, register match และให้ค่าล่าสุดมาก่อน
- Branch penalty ต้องดูว่ารู้ผลที่ ID หรือ MEM และทายถูกหรือผิด

### ภาพจำ: Pipeline ซ้อนหลายคำสั่ง แทนการเร่งคำสั่งเดียว
![Pipeline ซ้อนหลายคำสั่ง แทนการเร่งคำสั่งเดียว](dist/images/review/pipeline.svg)
ตัวอย่างอุดมคติ: 4 คำสั่งอิสระ ผ่าน 5 stages ที่ใช้ clock เท่ากัน จบใน 5 + 4 − 1 = 8 cycles แทน 20 cycles แบบไม่ซ้อนกัน ในกรณีจริงต้องบวก stall/flush และคำนึงถึงเวลา clock
อิงสไลด์หน้า 4, 5, 6, 31, 32

### Pipeline คือซ้อนงานหลายคำสั่ง
แต่ละ stage ทำงานกับคนละคำสั่งพร้อมกัน เหมือนซัก อบ พับเสื้อผ้าคนละตะกร้าในช่วงเดียวกัน
- หลังเติม pipeline เต็ม อุดมคติจบได้ 1 คำสั่งต่อ clock
- คำสั่งหนึ่งยังผ่านทุก stage จึงไม่ใช่การทำให้ latency หารด้วยจำนวนขั้น
- ก่อนงานไหลต่อเนื่องมี fill และท้ายงานมี drain
- Stage ที่ช้าที่สุดและ overhead ของ pipeline register จำกัด clock

ตัวอย่าง: 5 ขั้น: รอบ 5 คำสั่งแรกอยู่ WB พร้อมคำสั่งถัดไปใน MEM/EX/ID/IF
อ้างอิงสไลด์หน้า 3, 5, 6, 18

### ห้าขั้นของ RISC-V ในบทเรียน
ใช้โมเดล 5-stage แบบ in-order เพื่ออ่าน datapath และนับเวลาอย่างสม่ำเสมอ
- IF: ใช้ PC fetch instruction และหา PC ถัดไป
- ID: decode และอ่าน source registers
- EX: ALU คำนวณผลหรือ effective address
- MEM: load อ่านหรือ store เขียน data memory; WB: เขียนผลกลับ register

ตัวอย่าง: ld x5,8(x1): fetch → อ่าน x1 → x1+8 → อ่าน memory → เขียน x5
อ้างอิงสไลด์หน้า 4, 19, 22, 23, 24, 25, 26, 27

### ISA และ pipeline registers
รูปแบบคำสั่งที่สม่ำเสมอช่วยให้แบ่ง stage ได้ง่าย และต้องเก็บข้อมูลของแต่ละคำสั่งไว้ระหว่างรอบ
- โมเดลนี้ใช้คำสั่ง 32-bit รูปแบบสม่ำเสมอ; เป็นขอบเขตของตัวอย่าง ไม่ใช่ทุก extension
- Load/store คำนวณ address ที่ EX แล้วใช้ data memory ที่ MEM
- IF/ID, ID/EX, EX/MEM, MEM/WB จับค่าระหว่าง stage
- ต้องพาทั้งข้อมูล เลข register ปลายทาง และ control bits ของคำสั่งเดียวกันไปด้วย

ตัวอย่าง: rd ของ load ต้องเดินถึง MEM/WB ด้วย มิฉะนั้น WB อาจหยิบ rd ของคำสั่งใหม่ที่ ID
อ้างอิงสไลด์หน้า 7, 20, 26, 27, 34

### อ่าน datapath ของ load และ store
ทั้งสองใช้ ALU บวก base+immediate แต่ทิศทางข้อมูลและผลข้างเคียงต่างกัน
- Load: address ไป data memory แล้วค่าที่อ่านส่งกลับผ่าน WB mux
- Store: ส่ง address และค่าจาก source register ไป memory ที่ MEM
- Store ไม่มีการเขียน register ที่ WB แม้คำสั่งยังเลื่อนผ่าน stage
- PC/branch path และ WB path วิ่งย้อนในรูป จึงต้องพิจารณา timing ข้ามคำสั่ง

ตัวอย่าง: sd x5,8(x1): ALU หา x1+8 และพาค่า x5 ไปเขียน ไม่ใช่เขียน x1
อ้างอิงสไลด์หน้า 19, 22, 23, 24, 25, 27, 28, 29, 30

### Control ต้องเดินทางพร้อมคำสั่ง
Decode สร้าง control ของแต่ละคำสั่ง แล้วส่งผ่าน pipeline registers ไปใช้ใน stage ที่ถูกต้อง
- EX เช่นเลือก ALU operation/operand; MEM เช่น MemRead/MemWrite
- WB เช่น RegWrite และเลือก ALU result หรือ memory data
- คำสั่งเดียวกันอาจจบการใช้งานทรัพยากรคนละ stage
- การทำ bubble/flush ปิด control ที่อาจเปลี่ยน register หรือ memory

ตัวอย่าง: Store ต้องเปิด MemWrite ตอนตัวมันถึง MEM ไม่ใช่ตอนคำสั่งใหม่กำลัง decode
อ้างอิงสไลด์หน้า 20, 27, 30, 34, 45, 49

### อ่านแผนภาพเวลาและ hazard สามชนิด
Multi-cycle diagram ตามแต่ละคำสั่งข้ามเวลา; single-cycle diagram คือภาพหลายคำสั่งที่ทำงานใน clock เดียว
- Structural: ใช้ทรัพยากรเดียวกันพร้อมกัน
- Data: ผู้ใช้ต้องการค่าที่ผู้ผลิตยังไม่พร้อม
- Control: ยังไม่รู้ PC ที่ควร fetch ต่อ
- Bubble คือช่องว่างงานที่ไม่เปลี่ยนสถานะระบบ แต่ยังเคลื่อนผ่าน stage

ตัวอย่าง: ดูคอลัมน์เดียวในตารางเวลา จะเห็นคำสั่งคนละตัวครอง IF/ID/EX/MEM/WB
อ้างอิงสไลด์หน้า 8, 21, 31, 32, 33

### Structural hazard: แย่ง hardware
ถ้า memory มีพอร์ตเดียว IF และ MEM ของ load/store อาจขอใช้พร้อมกัน
- ต้อง stall ฝั่ง fetch หรือเพิ่มทรัพยากรให้รองรับพร้อมกัน
- แยก instruction/data memory หรือ cache ช่วยแก้ conflict นี้
- การแบ่ง stage ไม่ได้สร้างทรัพยากรเพิ่มขึ้นเอง

ตัวอย่าง: คำสั่งแรก load อยู่ MEM ขณะที่คำสั่งที่สี่อยาก IF จาก memory พอร์ตเดียว
อ้างอิงสไลด์หน้า 9

### Data dependency และ forwarding
RAW dependency คือคำสั่งหลังต้องอ่านผลที่คำสั่งก่อนเขียน Forwarding ใช้ค่าที่คำนวณแล้วโดยไม่รอ register file
- ALU result พร้อมหลัง EX จึงส่งจาก EX/MEM ไป input ALU ของคำสั่งถัดไปได้
- ผลเก่ากว่าอาจส่งจาก MEM/WB
- ต้องมี mux และสายเพิ่ม จึงไม่ใช่แค่เปลี่ยน software
- Dependency ไม่ได้ทำให้ stall ทุกครั้ง ถ้ามีทางส่งและข้อมูลพร้อมทัน

ตัวอย่าง: add x19,x0,x1 → sub x2,x19,x3 ส่งค่า x19 จาก add ไป EX ของ sub
อ้างอิงสไลด์หน้า 10, 11, 35, 36, 39, 43

### เงื่อนไข forwarding และค่าล่าสุด
เปรียบเทียบ rd ของคำสั่งก่อนหน้ากับ rs1/rs2 ของคำสั่งใน EX แล้วเลือกแหล่งข้อมูลที่ใหม่ที่สุด
- ต้องเป็นคำสั่งที่ RegWrite=1 และ rd≠0 จึงจะมีผลที่ควรส่ง
- EX/MEM.rd ตรง source: ForwardA/B=10
- ถ้า EX/MEM ไม่มี match แต่ MEM/WB match: ForwardA/B=01
- ไม่มี match: 00 ใช้ค่าจาก ID/EX; เมื่อทั้งคู่ match ให้ EX/MEM ก่อน
- เลข source/destination ต้องเดินมากับ pipeline ไม่อ่านจากคำสั่งปัจจุบันที่ผิด stage

ตัวอย่าง: add x1,x1,x2; add x1,x1,x3; add x1,x1,x4: ตัวที่สามต้องใช้ x1 จากตัวที่สอง
อ้างอิงสไลด์หน้า 37, 38, 39, 40, 41, 42

### Load-use hazard: forwarding ย้อนเวลาไม่ได้
Load ได้ข้อมูลหลัง MEM แต่คำสั่งถัดไปอยากใช้ตอน EX ในรอบเดียวกัน จึงต้องรอในโมเดลนี้
- ขณะ load อยู่ EX ให้ hazard unit ตรวจคำสั่งผู้ใช้ใน ID
- ตรวจ MemRead และ rd ตรงกับ source ที่คำสั่งถัดไปใช้จริง
- ค้าง PC และ IF/ID; ใส่ control=0 ที่ ID/EX เพื่อส่ง bubble
- Load และคำสั่งเก่ากว่ายังเดินต่อ; หลังรอ 1 รอบจึง forward จาก MEM/WB ไป EX ได้

ตัวอย่าง: ld x1,0(x2); add x3,x1,x4 → ต้องมี bubble 1 รอบเมื่อมี forwarding ตามรูป
อ้างอิงสไลด์หน้า 12, 44, 45, 46, 47

### Code scheduling ลด stall โดยไม่เปลี่ยนความหมาย
แทรกคำสั่งอิสระในช่องที่ต้องรอข้อมูล ให้เกิดงานที่มีประโยชน์แทน bubble
- สลับเฉพาะคำสั่งที่ไม่ทำลาย data/control/memory dependency
- ย้าย load อิสระมาอยู่ระหว่าง load กับผู้ใช้
- ตัวอย่างสไลด์มี 7 คำสั่ง: 13 cycles ลดเป็น 11 โดยเอา 2 stalls ออก
- จำนวนคำสั่งเท่าเดิม แต่เสียรอข้อมูลน้อยลง

ตัวอย่าง: ld x1; ld x2; add ใช้ x2 → เลื่อน ld x4 อิสระมาคั่นก่อน add
อ้างอิงสไลด์หน้า 13, 48

### Control hazard: ต้องรู้ผล branch ที่ stage ใด
Branch เปลี่ยน PC ดังนั้นคำสั่งที่ fetch ไปก่อนรู้ผลอาจเป็นเส้นทางผิด
- รอผล branch ก่อน fetch ต่อทำให้ง่ายแต่เสียรอบ
- ถ้ารู้ผลที่ MEM ในโมเดลรูป ต้อง flush คำสั่งอายุน้อยกว่าใน IF/ID/EX เมื่อเส้นทางผิด
- ย้าย target adder และ register comparator ไป ID ลดจำนวนคำสั่งผิดที่เข้ามา
- การเทียบที่ ID อาจมี data dependency ของ branch เพิ่ม จึงต้องดู forwarding/stall ของแบบนั้น

ตัวอย่าง: รู้ taken ที่ MEM มีคำสั่งหลัง branch เข้ามาแล้ว 3 ตัว; ที่ ID ปกติมี 1 ตัว
อ้างอิงสไลด์หน้า 14, 15, 49, 50, 51, 52

### Static และ dynamic branch prediction
เดาทางก่อนรู้ผลเพื่อไม่ต้องรอทุก branch แล้วแก้เมื่อเดาผิด
- Predict not taken: fetch คำสั่งถัดไปตามลำดับ
- Static heuristic: มักทาย branch ย้อนหลัง taken และไปข้างหน้า not taken
- Dynamic: เก็บพฤติกรรมที่เกิดจริงเพื่อทายครั้งถัดไป
- Mispredict ต้อง flush งานผิดและ fetch ใหม่; ทายถูกไม่ควรรับ penalty เท่าทายผิด

ตัวอย่าง: ท้ายลูปส่วนใหญ่ย้อนกลับ แต่รอบสุดท้ายออกลูปจึงอาจทายพลาด
อ้างอิงสไลด์หน้า 16, 17, 49

### คำนวณประสิทธิภาพอย่างมีสมมติฐาน
เริ่มจาก clock ของ design นับ fill/drain แล้วเพิ่ม stall/flush cycles ที่เกิดจริง
- Single-cycle ใช้ clock ตามคำสั่งช้าที่สุด ไม่ใช้เวลาสั้นของแต่ละ opcode เป็น clock แยกกัน
- Pipeline clock ≥ stage ที่ช้าที่สุดบวก register overhead
- CPI steady-state ใกล้ 1 ได้เฉพาะ single-issue ไม่มี stall; งานสั้นยังเห็น fill/drain
- Speedup = เวลาเดิม/เวลาใหม่; ไม่เท่าจำนวน stage เสมอ

ตัวอย่าง: ในสไลด์ single-cycle 800 ps แต่ pipeline 200 ps: load หนึ่งตัวผ่าน 5 รอบ = 1000 ps เมื่อไม่คิด overhead
อ้างอิงสไลด์หน้า 3, 5, 6, 18, 48

### สูตร: จำนวนรอบ pipeline อุดมคติ

C_pipe = n + k − 1; T_pipe = (n+k−1)t

- n: จำนวนคำสั่ง (instruction)
- k: จำนวน stage (stage)
- t: clock period (ns/cycle)
- C_pipe: จำนวน clock cycles

โจทย์: 4 คำสั่งอิสระ, 5 ขั้น แต่ละขั้น 1 ns, ไม่มี stalls และ register overhead
1. C_pipe = 4 + 5 − 1 = 8 cycles
2. T_pipe = 8 × 1 = 8 ns
3. ทำทีละคำสั่งใช้ 4×5×1 = 20 ns
4. Speedup = 20/8 = 2.5

**ตอบ: Pipeline ใช้ 8 รอบ เร็วขึ้น 2.5 เท่าสำหรับงานสั้นนี้**
ระวัง: 5 stage ไม่ได้ให้ speedup 5 เท่าทันที; ต้องรวม fill/drain และ stage ต้องเป็นเงื่อนไขที่กำหนด
อ้างอิงสไลด์หน้า 3, 4, 31, 32

### สูตร: Stage ไม่สมดุล: clock, latency และ throughput

t_pipe ≈ max(t_i); T_n = (n+k−1)t_pipe; speedup = n t_single / T_n

- t_i: delay ของ stage i (ps)
- t_pipe,t_single: clock period ของแต่ละ design (ps/cycle)
- T_n: เวลาจบ n คำสั่ง (ps)

โจทย์: delay 200,100,200,200,100 ps; k=5, single-cycle=800 ps; n=100 ไม่มี stalls/overhead
1. t_pipe = max(...) = 200 ps
2. Latency คำสั่งหนึ่ง = 5×200 = 1000 ps เทียบกับ single-cycle 800 ps
3. T_n = (100+4)×200 = 20800 ps
4. T_single = 100×800 = 80000 ps; speedup = 80000/20800 ≈ 3.85

**ตอบ: Latency อาจเพิ่ม แต่ throughput ระยะยาวเพิ่มจาก 1/800 เป็น 1/200 คำสั่งต่อ ps**
ระวัง: ละ overhead แล้ว; 5 stage ที่ไม่สมดุลนี้ไม่ได้เข้าใกล้ 5 เท่า แต่เข้าใกล้ 800/200=4
อ้างอิงสไลด์หน้า 5, 6, 18

### สูตร: เพิ่ม stalls ในเวลารวม

C = n+k−1+s; T = C t

- n: จำนวนคำสั่ง
- k: จำนวน stage
- s: จำนวนรอบเสียเพิ่มทั้งหมด (cycle)
- t: clock period (ps/cycle)

โจทย์: สไลด์ scheduling: n=7,k=5,ก่อนจัดมี 2 stalls, หลังจัดไม่มี; t=200 ps
1. ก่อนจัด C = 7+5−1+2 = 13; T=2600 ps
2. หลังจัด C = 7+5−1 = 11; T=2200 ps
3. Speedup จาก scheduling = 13/11 ≈ 1.18

**ตอบ: ลด 2 รอบ หรือ 400 ps ภายใต้สมมติฐานเดิม**
ระวัง: นับ stall cycles ไม่ใช่นับจำนวน dependency และรวมเหตุการณ์ที่ซ้อนกันอย่างระวัง
อ้างอิงสไลด์หน้า 13, 45, 48

### สูตร: CPI เมื่อ branch ทายพลาด

CPI ≈ CPI_base + f_branch × r_miss × p

- CPI: cycles/instruction แบบ steady-state
- f_branch: สัดส่วนคำสั่งที่เป็น branch (0–1)
- r_miss: สัดส่วน branch ที่ทายผิด (0–1)
- p: penalty ต่อทายผิด (cycles/miss)

โจทย์: CPI_base=1, branch 20%, ทายผิด 10%, penalty=3 cycles; ไม่คิด hazard อื่น
1. รอบเสียต่อคำสั่ง = 0.20×0.10×3 = 0.06
2. CPI = 1 + 0.06 = 1.06

**ตอบ: CPI เฉลี่ยประมาณ 1.06**
ระวัง: 10% ในที่นี้คือส่วนของ branch ไม่ใช่ทุกคำสั่ง; penalty เปลี่ยนตาม stage ที่รู้ผลและ design
อ้างอิงสไลด์หน้า 16, 17, 49, 50

### จุดที่มักสับสน
- Throughput ดีขึ้นไม่ได้แปลว่า latency คำสั่งเดียวลด
- Forwarding ใช้ได้เฉพาะค่าที่พร้อมแล้ว; load-use ติดกันยัง stall ในโมเดลนี้
- Forward ทุก register match ไม่ได้ ต้องดู RegWrite, rd≠0 และค่าล่าสุด
- Store ไม่เขียน register ที่ WB; ต้องแยก MemWrite กับ RegWrite
- Stall ค้างบาง stage ส่วน flush ยกเลิกคำสั่งผิด ไม่ใช่สิ่งเดียวกัน
- Branch penalty ไม่มีค่าตายตัว ต้องดู pipeline และจุดตัดสิน branch

หมายเหตุสไลด์หน้า 42
เงื่อนไขยกเว้น EX hazard ใช้ rd ≠ rs ในวงเล็บ not
ใช้ให้ถูก: ใช้ EX/MEM.RegisterRd = ID/EX.RegisterRs1 หรือ Rs2 ในส่วนตรวจ EX hazard
ต้องกัน MEM/WB เมื่อมีผลใหม่กว่าใน EX/MEM ที่ตรง source เดียวกัน ตามหลักหน้า 41

หมายเหตุสไลด์หน้า 44
เงื่อนไข load-use พิมพ์ RegisterRs1 ซ้ำทั้งสองข้างของ or
ใช้ให้ถูก: ตรวจ rd เท่ากับ Rs1 หรือ Rs2 ของคำสั่งถัดไป เฉพาะ source ที่ใช้จริง
ผู้ใช้ load อาจอยู่ที่ operand ที่หนึ่งหรือสอง และหัวข้อด้านบนระบุทั้ง Rs1 และ Rs2

### ลองตอบเอง
**5-stage pipeline รัน 10 คำสั่งอิสระ ไม่มี stall ใช้กี่รอบ?**
10+5−1 = 14 รอบ เมื่อนับตั้งแต่ IF แรกถึง WB สุดท้าย

**ทำไม ld x1,... ตามด้วย add ที่ใช้ x1 ยังมี bubble แม้ forward ได้?**
ข้อมูล load พร้อมหลัง MEM แต่ add ต้องการก่อนเริ่ม EX จึงต้องรอ 1 รอบในโมเดลนี้

**EX/MEM และ MEM/WB เขียน rd เดียวกับ rs ของผู้ใช้ ต้องเลือกใคร?**
เลือก EX/MEM ที่ใหม่กว่า เมื่อเป็นผลพร้อมใช้งานและ RegWrite=1, rd≠0

อ้างอิง: itds-211_comp_arch_Chapter07.pdf

## บท 8 — Parallel Computing
ประมวลผลขนานจากเครื่องส่วนบุคคลถึงคลาวด์

เพิ่ม core หรือเครื่องช่วยได้เมื่อแบ่งงานและสื่อสารได้ดี ต้องดูส่วนที่ยังทำทีละขั้น ค่า coordination และ bandwidth ไม่ใช่ดูจำนวนหน่วยคำนวณอย่างเดียว

### ใจความสำคัญ
- Flynn แยกตาม instruction stream × data stream: SISD/SIMD/MISD/MIMD
- SPMD คือโปรแกรมเดียวรันหลาย processor บนข้อมูลต่างกัน ไม่ใช่ชนิด hardware ใหม่
- Multithreading แชร์ทรัพยากร core; multicore มีหลาย core
- Shared memory ต้องมี synchronization และ cache coherence; UMA/NUMA เวลาเข้าถึงต่างกัน
- GPU เหมาะ data parallel และซ่อน memory latency ด้วยหลาย threads แต่ branch แตกทางอาจเสียประสิทธิภาพ
- Arithmetic intensity ใช้ FLOP/byte; peak compute ใช้ FLOP/s และ bandwidth ใช้ byte/s

### ภาพจำ: Flynn แยกจากกระแสคำสั่งและข้อมูล
![Flynn แยกจากกระแสคำสั่งและข้อมูล](dist/images/review/flynn.svg)
SISD: คำสั่งเดียว–ข้อมูลเดียว; SIMD: คำสั่งเดียวกับหลายข้อมูล; MIMD: หลายคำสั่งและหลายข้อมูล; MISD พบไม่บ่อย การจัดประเภทนี้ดู instruction/data streams จึงต้องระบุระดับที่กำลังพิจารณา
อิงสไลด์หน้า 3, 9

### ภาพจำ: Arithmetic intensity: นับงานต่อข้อมูลที่ขน
![Arithmetic intensity: นับงานต่อข้อมูลที่ขน](dist/images/review/arithmetic.svg)
ตัวอย่างเสริม DAXPY แบบ double: ต่อหนึ่ง element มี 1 multiply และ 1 add รวม 2 FLOPs และอ่าน X, อ่าน Y, เขียน Y รวม 24 bytes จึงได้ 2/24 ≈ 0.0833 FLOP/byte สมมติไม่นับ scalar ที่ใช้ซ้ำและไม่เพิ่ม traffic จาก write-allocate; ปริมาณจริงขึ้นกับระดับ memory ที่นับ
อิงสไลด์หน้า 11, 39

### ทำไมต้อง parallel และยากตรงไหน
หลายหน่วยช่วยเพิ่ม throughput, scalability, availability และประสิทธิภาพพลังงาน แต่ software ต้องแบ่งงานให้เหมาะ
- Task-level: แบ่งงานอิสระ เช่นบริการคำขอคนละรายการ
- Parallel program: โปรแกรมเดียวแบ่งคำนวณร่วมกันหลาย processor
- Partitioning, coordination และ communication เป็นค่าใช้จ่าย
- Sequential/concurrent software กับ serial/parallel hardware เป็นคนละมิติ

ตัวอย่าง: 64 core ไม่ได้ทำให้งานที่รอผลขั้นก่อนทุกขั้นเร็วขึ้น 64 เท่า
อ้างอิงสไลด์หน้า 4, 5, 6, 8

### Flynn และ SPMD
นับจำนวนกระแสคำสั่งและกระแสข้อมูลเพื่อจัดชนิดเครื่อง
- SISD: 1 instruction stream, 1 data stream
- SIMD: คำสั่งเดียวทำกับหลายข้อมูล; MIMD: หลาย instruction streams บนหลายข้อมูล
- MISD: หลายคำสั่งบน data stream เดียว; สไลด์ไม่มีตัวอย่างทั่วไป
- SPMD: program เดียวแต่แต่ละ processor ใช้ data/เงื่อนไขต่างกัน ทำบน MIMD ได้

ตัวอย่าง: ทุก core รันโปรแกรม sum เดียวกัน แต่ core0 รวมช่วงแรก core1 รวมช่วงถัดไป = SPMD
อ้างอิงสไลด์หน้า 3, 9

### Vector และ SIMD: งานแบบเดียวกันหลายข้อมูล
คำสั่ง vector อธิบายการคำนวณซ้ำเป็นชุด ลดการ fetch/decode และ loop overhead
- Vector load เก็บหลาย element ใน vector registers แล้วคำนวณ/เก็บกลับ
- SIMD media extension ในตัวอย่างใช้ register ความกว้างคงที่แบ่งเป็น lanes
- Vector model รองรับ vector length/strided access และใช้ functional unit แบบ pipeline/array
- ทำได้ดีเมื่อ element เป็นอิสระและเข้าถึง memory เป็นแบบแผน; dependency ข้ามรอบอาจขัดขวาง

ตัวอย่าง: DAXPY: คูณ X ทุกช่องด้วย a แล้วบวก Y ช่องเดียวกัน
อ้างอิงสไลด์หน้า 10, 11, 12, 13, 14

### Hardware multithreading และ SMT
เก็บ PC/register state หลาย thread เพื่อใช้ทรัพยากร core ระหว่างที่บาง thread รอ
- Fine-grain สลับ thread ทุก cycle ช่วยซ่อน stalls
- Coarse-grain สลับเมื่อ stall ยาว แต่ซ่อน stall สั้นได้ไม่ดี
- SMT ออกคำสั่งจากหลาย thread ใน cycle เดียวเมื่อ functional units ว่าง
- Logical threads แชร์ functional units/cache จึงไม่เท่ากับจำนวน physical cores เพิ่ม

ตัวอย่าง: Thread A รอ memory จึงให้คำสั่งของ B ใช้ ALU ที่ว่าง
อ้างอิงสไลด์หน้า 15, 16, 17, 18

### Shared memory, UMA และ NUMA
หลาย processor เห็น physical address space เดียวกัน จึงใช้ข้อมูลร่วมผ่าน load/store ได้
- UMA: เวลาเข้าถึง memory โดยหลักใกล้เคียงกันทุก processor
- NUMA: local memory กับ remote memory ใช้เวลาไม่เท่ากัน
- SMP/shared-memory diagram มี private cache ของแต่ละ processor ต่อ network ไป memory
- ตำแหน่งข้อมูลและจำนวนผู้แย่ง memory มีผลต่อ scaling

ตัวอย่าง: NUMA วางข้อมูลที่ core ใช้บ่อยไว้ใกล้ core ช่วยลด remote traffic
อ้างอิงสไลด์หน้า 3, 19

### Synchronization และ cache coherence
การมีที่อยู่ร่วมกันยังต้องตกลงว่าใครอ่าน/แก้ข้อมูลเมื่อใด พร้อมรักษาสำเนา cache ให้สอดคล้อง
- Lock ป้องกัน critical section ที่หลาย thread แก้ข้อมูลเดียวกัน
- Barrier ให้ทุกคนถึงจุดหนึ่งก่อนเริ่มขั้นต่อไป
- Cache coherence ดูแลสำเนาของ memory location เดียวในหลาย cache; สไลด์อ้างเชื่อมบท memory
- Coherence ไม่ทำให้ x=x+1 ทั้งชุดเป็น atomic จึงยังต้องใช้ synchronization (คำอธิบายเชื่อมแนวคิด)

ตัวอย่าง: สอง core อ่าน counter=0 แล้วต่างเขียน 1 จะสูญหนึ่งการเพิ่ม แม้ cache สอดคล้องกัน
อ้างอิงสไลด์หน้า 7, 19, 20, 21

### Sum reduction: แบ่งก่อนแล้วรวมเป็นต้นไม้
แจกข้อมูลเท่า ๆ กันให้แต่ละ processor รวมส่วนของตน จากนั้นจับคู่รวม partial sums ซ้ำ
- ตัวอย่าง 64000 ตัวบน 64 processors → คนละ 1000 ตัว
- การรวมเป็นต้นไม้ลดจำนวน partial sums ครึ่งหนึ่งทุกขั้น
- ต้อง synchronize แต่ละขั้นเพื่อไม่อ่านผลที่ยังไม่เสร็จ
- ถ้าจำนวนผู้ร่วมเป็นเลขคี่ ต้องจัดการ partial sum ที่ไม่มีคู่

ตัวอย่าง: 8 partial sums → 4 → 2 → 1 จึงมี 3 รอบการรวมหลัง local sums
อ้างอิงสไลด์หน้า 20, 21

### GPU และระบบ CPU/GPU
GPU เริ่มจากงานภาพที่ทำแบบเดียวกันกับหลาย vertex/pixel แล้วขยายไปคำนวณทั่วไป
- Data parallel สูงและมีหลาย thread เพื่อซ่อน memory latency
- Memory interface กว้างและ bandwidth สูง; CPU จัดการส่วนควบคุม/ลำดับ ส่วน GPU รับงานขนาน
- ระบบอาจมี GPU แยกกับ GPU memory หรืออยู่ร่วมชิป; ตำแหน่งมีผลต่อการส่งข้อมูล
- CUDA และ graphics APIs เป็นตัวอย่าง software interfaces; hardware ต้องใช้โปรแกรมที่จัดงานเหมาะ

ตัวอย่าง: ปรับสีทุก pixel แยกกันเหมาะกับ GPU มากกว่างานเงื่อนไขซับซ้อนที่ต่อกันเป็นลำดับ
อ้างอิงสไลด์หน้า 22, 23, 24

### GPU lanes, threads, block และ memory
อย่าจับคำว่า CUDA thread เท่ากับ CPU core: เป็นงานเชิงตรรกะที่ hardware จัดคิวลง lanes
- ตัวอย่าง Fermi ในสไลด์ใช้ 16 lanes ทำงานกลุ่ม 32 elements ผ่าน 2 cycles
- หลาย threads รวมเป็น block และหลาย blocks เป็น grid; warp คือกลุ่ม threads ที่ถูกออกคำสั่งร่วมกันในตัวอย่าง
- มี state ส่วนตัวต่อ thread, shared memory ต่อ block และ global/device memory
- Threads ในกลุ่มแตก branch อาจต้องทำหลายเส้นทางด้วย mask จึงลดการใช้ lanes
- ขนาด cache/register และคุณสมบัติ demand paging ในตารางเป็นของตัวอย่างรุ่นเก่า

ตัวอย่าง: 32 threads ถ้า 16 ตัวทำ if อีก 16 ทำ else อาจใช้เวลาเดินทั้งสองเส้นทาง
อ้างอิงสไลด์หน้า 25, 26, 27, 28, 29, 30

### Message passing, cluster และ grid
ต่างจาก shared physical address space แต่ละเครื่องมี memory ของตัวเอง จึงแลกข้อมูลด้วยข้อความ
- Message passing ใช้ send/receive แทนอ่าน address ของอีกเครื่องโดยตรง
- Cluster: เครื่องอิสระ แต่ละเครื่องมี OS/memory เชื่อมด้วย network/I/O
- ข้อดี: เพิ่มขนาดระบบและ availability; ต้นทุนสื่อสาร/บริหารอาจสูง
- Grid กระจายงานผ่าน long-haul network เหมาะชิ้นงานอิสระและส่งผลกลับ

ตัวอย่าง: แจกภาพคนละชุดให้หลายเครื่องประมวลผล แล้วส่งผลลัพธ์กลับตัวรวม
อ้างอิงสไลด์หน้า 31, 32, 33

### Topology: โครงข่ายเชื่อมหน่วยประมวลผล
จำนวนสายและระยะเดินทางมีผลทั้ง latency, bandwidth, cost และ power
- Bus แชร์ทางหลัก; ring ต่อเป็นวง; mesh ต่อเพื่อนบ้านบนกริด
- Hypercube d มิติ มี 2^d nodes; fully connected มีทางตรงทุกคู่
- Crossbar เชื่อม input/output ผ่านจุดตัดจำนวนมาก
- Multistage เช่น omega ลดจำนวน switch connections แต่เส้นทางอาจชนกัน

ตัวอย่าง: เพิ่ม node ใน fully connected ทำให้สายเพิ่มเร็วกว่า ring/mesh
อ้างอิงสไลด์หน้า 34, 35

### Network performance ไม่ได้มีแค่ link speed
ลิงก์แต่ละเส้นเร็วไม่ได้รับประกันว่าทุก node ส่งข้ามระบบพร้อมกันได้เต็มอัตรา
- Latency คือเวลาข้อความไปถึง; throughput คือปริมาณที่ส่งสำเร็จต่อเวลา
- Link bandwidth วัดเส้นเดียว; total network bandwidth รวมความสามารถของระบบ
- Bisection bandwidth ดูความสามารถส่งข้ามรอยแบ่ง network เป็นสองส่วนเท่า ๆ กัน
- Congestion เพิ่มการรอ; ต้องคำนึง cost, power และการเดินสายบนชิปด้วย

ตัวอย่าง: ถ้าทุกเครื่องส่งข้ามครึ่ง network พร้อมกัน ลิงก์กลางอาจเป็นคอขวดแม้ลิงก์ขอบเร็ว
อ้างอิงสไลด์หน้า 36

### Benchmarks และการเปรียบเทียบ parallel systems
เลือก benchmark ให้ตรงว่าอยากวัดงานขนานแบบไหน และเปรียบเทียบปริมาณงานเดียวกัน
- Linpack: linear algebra; SPECrate: หลาย jobs อิสระ
- SPLASH และ PARSEC: shared-memory/multithreaded applications; NAS: kernels เช่น fluid dynamics
- Strong scaling: ตรึงงานแล้วเพิ่ม processors; overhead และ serial part จำกัดผล
- Performance per dollar และ per joule ช่วยเปรียบเทียบต้นทุน/พลังงาน

ตัวอย่าง: เครื่องที่รันหลาย jobs ได้ throughput สูง อาจไม่ได้ทำให้ job เดียว latency ต่ำลงเท่ากัน
อ้างอิงสไลด์หน้า 37, 38, 40

### Arithmetic intensity และข้อมูลใช้วัด performance
นับงาน floating-point ต่อ byte ที่เข้าถึง memory เพื่ออธิบายความหนักด้านคำนวณเทียบกับการเคลื่อนข้อมูล
- Arithmetic intensity = จำนวน FLOPs / memory bytes accessed
- FLOP/s เป็นอัตรางาน ไม่ใช่จำนวน FLOPs
- หน้า 39 ให้หา peak GFLOP/s ของเครื่อง และ memory bytes/s จาก Stream benchmark ประกอบ
- ระบุ memory level ที่วัด bytes และรวม reads/writes ให้สอดคล้องกัน

ตัวอย่าง: DAXPY ทำ multiply1 + add1 ต่อ element แต่ต้องอ่าน X,Y และเขียน Y จึงไม่ได้มีแต่งาน ALU
อ้างอิงสไลด์หน้า 11, 39

### สูตร: DAXPY: คิดทีละ element

Y_i = a X_i + Y_i

- a: scalar ไม่มีหน่วยในตัวอย่าง
- X_i,Y_i: ค่าแต่ละ element (หน่วยเดียวกัน)
- i: index ของ element

โจทย์: a=2, X=[1,3], Y เดิม=[4,5]
1. Y_0 = 2×1+4 = 6
2. Y_1 = 2×3+5 = 11

**ตอบ: Y ใหม่=[6,11]; ใช้ 2 multiplications และ 2 additions รวม 4 FLOPs**
ระวัง: นับ FLOPs ตาม operation แม้ hardware รวม multiply-add เป็นคำสั่งเดียว
อ้างอิงสไลด์หน้า 11

### สูตร: Speedup และ efficiency

S_N = T_1 / T_N; E_N = S_N / N

- T_1,T_N: เวลางานเดียวกันบน 1 และ N processors (s)
- N: จำนวน processors
- S_N: speedup (เท่า)
- E_N: efficiency (0–1 หรือ %)

โจทย์: งานเดิมใช้ 100 s; ใช้ 4 processors เหลือ 40 s
1. S_4 = 100/40 = 2.5
2. E_4 = 2.5/4 = 0.625 = 62.5%

**ตอบ: เร็วขึ้น 2.5 เท่าและ efficiency62.5%**
ระวัง: ต้องเป็นงานและเงื่อนไขเปรียบเทียบเดียวกัน; จำนวน jobs รวมกับ latency งานเดียวเป็นคนละ metric
อ้างอิงสไลด์หน้า 5, 8, 37

### สูตร: Tree reduction: จำนวนรอบรวม

r = log2 N (เมื่อ N เป็นกำลังของ 2)

- N: จำนวน partial sums/processors
- r: จำนวนรอบการรวมแบบจับคู่ (รอบ)

โจทย์: 64 processors ได้ partial sum คนละ 1 ค่า
1. 64 →32→16→8→4→2→1
2. r = log2 64 = 6 รอบ

**ตอบ: ต้อง 6 รอบหลัง local summation**
ระวัง: ไม่ใช่เวลารวม 6cycles: แต่ละรอบมีการบวก สื่อสาร และ synchronization; N ไม่เป็นกำลัง 2 ต้องจัดการส่วนเกิน
อ้างอิงสไลด์หน้า 20, 21

### สูตร: Arithmetic intensity: งานต่อข้อมูล

I = F / D

- F: จำนวน floating-point operations (FLOP)
- D: bytes ที่ผ่าน memory level ที่กำหนด (byte)
- I: arithmetic intensity (FLOP/byte)

โจทย์: DAXPY ต่อ element อ่าน X,Y และเขียน Y เป็น double8bytes; ไม่นับ scalar amortized/cache reuse/write-allocate (ตัวอย่างคำนวณเสริม)
1. F=1 multiply + 1 add = 2 FLOPs/element
2. D=8+8+8=24 bytes/element
3. I=2/24=1/12≈0.0833 FLOP/byte

**ตอบ: Arithmetic intensity ประมาณ 0.0833 FLOP/byte ตามสมมติฐานนี้**
ระวัง: Memory bytes รวมทั้งอ่านและเขียน; cache reuse หรือ write-allocate ทำให้ D เปลี่ยน จึงต้องบอกว่ากำลังนับ traffic ระดับใด
อ้างอิงสไลด์หน้า 11, 39

### จุดที่มักสับสน
- SPMD เป็นรูปแบบโปรแกรม ไม่ใช่คำพ้องของ SIMD
- หลาย hardware threads ไม่เท่ากับหลาย physical cores
- Coherence ไม่แทน lock/barrier และไม่ทำให้ชุด read-modify-write เป็น atomic
- GPU ไม่เร็วกับทุกงาน โดยเฉพาะงานเล็ก งานแตก branch และงานที่โอนข้อมูลมาก
- อย่าใช้สเปก Fermi/ตาราง GPU เก่าเหมารวม GPU ทุกยุค
- FLOPs คือจำนวนงาน; FLOP/s คืออัตรา และ arithmetic intensity ใช้ FLOP/byte

### ลองตอบเอง
**ทุก core รันโปรแกรมเดียวกัน แต่มี if ตาม core ID ควรเรียกอะไร?**
SPMD บน hardware ที่อาจเป็น MIMD; instruction stream แต่ละ core ไม่จำเป็นต้องเหมือนกันทุกขณะ

**64 processors แต่ละคนรวม 1000 ค่า แล้วจับคู่รวมผล ต้องมีกี่รอบและต้องระวังอะไร?**
6 รอบหลัง local sum และต้อง synchronize ไม่ให้ใช้ผลที่อีกฝ่ายยังไม่พร้อม

**DAXPY แบบ double ต่อ element ทำ 2 FLOPs และโอน 24bytes มี arithmetic intensity เท่าใด?**
2/24 = 1/12 ≈ 0.0833 FLOP/byte ภายใต้สมมติฐานอ่าน X,Y และเขียน Y อย่างละหนึ่งครั้ง โดยไม่คิด traffic อื่น

อ้างอิง: itds-211_comp_arch_Chapter08.pdf
