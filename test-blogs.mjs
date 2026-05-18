import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://vxesxaaqvjbknliwgiiv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4ZXN4YWFxdmpia25saXdnaWl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NTQ3MzgsImV4cCI6MjA5MTEzMDczOH0.ccYKjkvYdIr16d9aeXmBrHNJ9Afjtp80_dJMFjwxzNM'
);

// ─── Check table exists ───
async function setupTable() {
  console.log('\n🔧 Checking table...');
  const { error } = await supabase.from('rbrblogs').select('id').limit(1);
  if (error) {
    console.log('❌ Table missing. Run this SQL in Supabase → SQL Editor:\n');
    console.log(`
create table if not exists rbrblogs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  cover_image text,
  author text default 'Prof. Ravindrababu Ravula',
  tags text[],
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table rbrblogs enable row level security;
create policy "Public read" on rbrblogs for select using (published = true);
create policy "Anon write" on rbrblogs for all using (true) with check (true);
    `);
    return false;
  }
  console.log('✅ Table reachable!');
  return true;
}

// ─── 4 Rich Test Blogs ───
// Each blog exercises specific rich editor features.
// HTML is written exactly as TipTap v3 generates it so the reader renders correctly.

const TEST_BLOGS = [

  // ════════════════════════════════════════════════════
  // BLOG 1 — Tests: H1/H2/H3, Bold, Italic, Underline,
  //          Strikethrough, Bullet list, Ordered list,
  //          Blockquote, Inline code, Code block, HR,
  //          Link, Text color, Highlight, Align center
  // ════════════════════════════════════════════════════
  {
    title: 'GATE CS 2027 — The Ultimate Preparation Blueprint',
    slug: 'gate-cs-2027-ultimate-preparation-blueprint',
    excerpt: 'Everything you need to crack GATE CS 2027 — syllabus, schedule, resources, mindset. Tested strategies from toppers who scored AIR < 10.',
    cover_image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    author: 'Prof. Ravindrababu Ravula',
    tags: ['GATE 2027', 'GATE CS', 'Preparation', 'Strategy', 'Roadmap'],
    published: true,
    content: `
<h1>GATE CS 2027 — The Ultimate Preparation Blueprint</h1>

<p style="text-align: center"><em>A complete, no-fluff guide from one of India's most trusted GATE educators.</em></p>

<hr>

<h2>Why GATE CS Still Matters in 2027</h2>

<p>GATE (Graduate Aptitude Test in Engineering) remains <strong>India's most competitive and respected</strong> post-graduate entrance exam in Computer Science. A good rank opens doors to:</p>

<ul>
  <li><strong>IITs &amp; IISc</strong> — M.Tech / MS(Research) / PhD</li>
  <li><strong>PSU Jobs</strong> — DRDO, BARC, ISRO, HPCL, BHEL (high salary, job security)</li>
  <li><strong>GATE Fellowship</strong> — ₹12,400/month scholarship during M.Tech</li>
  <li><s>Old belief: "GATE is only for non-IITians"</s> — Many IITians now take GATE for PSUs</li>
</ul>

<blockquote><p>"The gate to your dream campus literally opens with GATE. Every hour you invest now compounds into opportunities you cannot yet imagine." — <strong>Prof. Ravindrababu Ravula</strong></p></blockquote>

<hr>

<h2>Step 1 — Know the Syllabus Cold</h2>

<p>GATE CS 2027 syllabus has <u>10 core subjects</u>. Know which carries the most weight:</p>

<ol>
  <li><strong>Engineering Mathematics</strong> — ~15 marks (Linear Algebra, Probability, Calculus)</li>
  <li><strong>Algorithms</strong> — ~10 marks (sorting, graphs, DP, greedy)</li>
  <li><strong>Theory of Computation</strong> — ~10 marks (DFA, NFA, PDA, Turing Machines)</li>
  <li><strong>Operating Systems</strong> — ~10 marks (scheduling, memory, deadlocks)</li>
  <li><strong>Computer Networks</strong> — ~10 marks (TCP/IP, routing, MAC)</li>
  <li><strong>Databases</strong> — ~8 marks (normalization, SQL, transactions)</li>
  <li><strong>Compiler Design</strong> — ~6 marks (parsing, CFG, code gen)</li>
  <li><strong>Computer Organization</strong> — ~6 marks (pipelining, cache, I/O)</li>
  <li><strong>Digital Logic</strong> — ~5 marks (gates, K-map, flip-flops)</li>
  <li><strong>Programming &amp; DS</strong> — ~10 marks (C, pointers, trees, graphs)</li>
</ol>

<hr>

<h2>Step 2 — The 12-Month Schedule</h2>

<p>This schedule is built around a <mark>10–12 month preparation timeline</mark> starting from scratch:</p>

<h3>Phase 1 — Foundation (Months 1–4)</h3>
<p>Cover every subject from ground up. Do <strong>NOT skip any topic</strong>. Watch Prof. RBR's free YouTube lectures (2400+ videos). Take handwritten notes.</p>

<h3>Phase 2 — Consolidation (Months 5–7)</h3>
<p>Subject-wise revision. Solve <strong>previous year questions (PYQs) topic by topic</strong>. Identify weak areas. Re-study them immediately.</p>

<h3>Phase 3 — Mock Tests (Months 8–10)</h3>
<p>Take <mark>full-length mock tests every weekend</mark>. Analyze each test for 2x the time you spent taking it. Track your accuracy and time per question.</p>

<h3>Phase 4 — Final Revision (Months 11–12)</h3>
<p>Quick revision of all subjects. Solve last 10 years PYQs in full exam conditions. Focus on <span style="color: #ffb703"><strong>high-weightage topics</strong></span> only.</p>

<hr>

<h2>Step 3 — Resources That Actually Work</h2>

<p>Be disciplined with your resources. <u>Don't chase 10 different resources.</u> Stick to these:</p>

<ul>
  <li><strong>Video Lectures</strong>: Prof. RBR YouTube (free), NPTEL (free)</li>
  <li><strong>Standard Books</strong>: CLRS for Algorithms, Galvin for OS, Forouzan for Networks</li>
  <li><strong>PYQs</strong>: GATE Overflow — every question with community discussion</li>
  <li><strong>Mock Tests</strong>: Made Easy, ACE, TestBook — minimum 20 full tests</li>
</ul>

<h2>Common Mistakes to Avoid</h2>

<ul>
  <li><s>Starting mock tests too late (after 1 month from exam)</s></li>
  <li><s>Ignoring Engineering Mathematics — it's 15 easy marks</s></li>
  <li><s>Not reviewing wrong answers after mock tests</s></li>
  <li><s>Switching resources mid-way due to anxiety</s></li>
</ul>

<hr>

<h2>The RBR Guarantee</h2>

<p style="text-align: center"><span style="color: #ffb703"><strong>If you follow this blueprint with consistency for 12 months, scoring 60+ marks in GATE CS 2027 is not just possible — it is inevitable.</strong></span></p>

<p>Trust the process. Show up every day. The rank will follow.</p>
`
  },

  // ════════════════════════════════════════════════════
  // BLOG 2 — Tests: YouTube embed (TipTap format),
  //          Images (hosted URL), Code block,
  //          Inline code, H2/H3, Tables (via HTML),
  //          Link with target
  // ════════════════════════════════════════════════════
  {
    title: 'Computer Networks OSI Model — Deep Dive with Video Lectures',
    slug: 'computer-networks-osi-model-deep-dive-video',
    excerpt: 'Master the OSI 7-layer model for GATE CS — every layer explained with functions, protocols, examples, and embedded video lectures by Prof. RBR.',
    cover_image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    author: 'Prof. Ravindrababu Ravula',
    tags: ['Computer Networks', 'GATE CS', 'OSI Model', 'Video Lecture'],
    published: true,
    content: `
<h1>Computer Networks — OSI Model Deep Dive</h1>

<p>The OSI (Open Systems Interconnection) model is one of the <strong>most important and consistently asked topics</strong> in GATE CS. It appears in <mark>almost every GATE exam</mark> — either directly or as part of larger networking questions.</p>

<hr>

<h2>Watch the Video Lecture First</h2>

<p>Before reading this article, watch this <strong>complete OSI model lecture</strong>. It covers every layer with animations and examples:</p>

<div data-youtube-video=""><iframe src="https://www.youtube.com/embed/vv4y_uOneC0" allowfullscreen="true" frameborder="0" width="840" height="472"></iframe></div>

<p><em>After watching, come back and read the notes below for GATE-specific details.</em></p>

<hr>

<h2>Why OSI Model?</h2>

<p>OSI provides a <u>standardized framework</u> that allows different systems to communicate. It divides network communication into <strong>7 distinct layers</strong>, each with a specific role.</p>

<img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80" alt="Network infrastructure — server racks in a data center" />

<h2>The 7 Layers — Quick Reference</h2>

<h3>Layer 7 — Application Layer</h3>
<p><strong>Role:</strong> Interface between user and network.<br>
<strong>Protocols:</strong> <code>HTTP</code>, <code>HTTPS</code>, <code>FTP</code>, <code>SMTP</code>, <code>DNS</code>, <code>DHCP</code><br>
<strong>GATE tip:</strong> Know which application uses which port number.</p>

<h3>Layer 6 — Presentation Layer</h3>
<p><strong>Role:</strong> Data translation, encryption, compression.<br>
<strong>Protocols:</strong> <code>SSL/TLS</code>, <code>JPEG</code>, <code>MPEG</code>, <code>ASCII</code><br>
<strong>GATE tip:</strong> Rarely asked independently — appears in questions about encryption location.</p>

<h3>Layer 5 — Session Layer</h3>
<p><strong>Role:</strong> Manages sessions (start, maintain, terminate connections).<br>
<strong>Protocols:</strong> <code>NetBIOS</code>, <code>RPC</code><br>
<strong>GATE tip:</strong> Least tested layer. Know that it handles <em>full-duplex vs half-duplex</em> sessions.</p>

<h3>Layer 4 — Transport Layer</h3>
<p><strong>Role:</strong> End-to-end communication, reliability, flow control.<br>
<strong>Protocols:</strong> <code>TCP</code> (reliable, connection-oriented), <code>UDP</code> (unreliable, connectionless)<br>
<strong>Unit:</strong> <strong>Segment</strong></p>

<blockquote><p><strong>GATE TRAP:</strong> TCP provides reliable delivery. UDP does NOT. Questions often ask which protocol DNS, HTTP, FTP use. DNS uses UDP (port 53) for queries, TCP for zone transfer.</p></blockquote>

<h3>Layer 3 — Network Layer</h3>
<p><strong>Role:</strong> Logical addressing, routing.<br>
<strong>Protocols:</strong> <code>IP</code>, <code>ICMP</code>, <code>ARP</code>, <code>OSPF</code>, <code>BGP</code><br>
<strong>Unit:</strong> <strong>Packet</strong><br>
<strong>Device:</strong> <strong>Router</strong></p>

<h3>Layer 2 — Data Link Layer</h3>
<p><strong>Role:</strong> Node-to-node delivery, error detection/correction, MAC addressing.<br>
<strong>Protocols:</strong> <code>Ethernet</code>, <code>WiFi (802.11)</code>, <code>PPP</code>, <code>HDLC</code><br>
<strong>Unit:</strong> <strong>Frame</strong><br>
<strong>Device:</strong> <strong>Switch, Bridge</strong></p>

<h3>Layer 1 — Physical Layer</h3>
<p><strong>Role:</strong> Bit transmission over physical medium.<br>
<strong>Protocols:</strong> <code>USB</code>, <code>Ethernet cable</code>, <code>Fiber optic</code>, <code>RS-232</code><br>
<strong>Unit:</strong> <strong>Bit</strong><br>
<strong>Device:</strong> <strong>Hub, Repeater, Modem</strong></p>

<hr>

<h2>TCP vs UDP — GATE Comparison</h2>

<pre><code>Feature          TCP                    UDP
─────────────────────────────────────────────────
Connection       Connection-oriented    Connectionless
Reliability      Guaranteed delivery    No guarantee
Order            Maintains order        No ordering
Speed            Slower                 Faster
Header Size      20 bytes minimum       8 bytes
Flow Control     Yes (sliding window)   No
Error Check      Yes (checksum + ACK)   Checksum only
Use Cases        HTTP, FTP, SSH, SMTP   DNS, DHCP, Video</code></pre>

<hr>

<h2>ARP — Address Resolution Protocol</h2>

<p>ARP resolves <strong>IP addresses → MAC addresses</strong>. It operates between Layer 2 and Layer 3.</p>

<p>When Host A wants to send data to IP <code>192.168.1.5</code>:</p>
<ol>
  <li>A broadcasts: <em>"Who has IP 192.168.1.5? Tell 192.168.1.1"</em></li>
  <li>Host with that IP replies with its <strong>MAC address</strong></li>
  <li>A stores it in ARP cache and sends the frame</li>
</ol>

<h2>Want More? Watch Part 2</h2>

<div data-youtube-video=""><iframe src="https://www.youtube.com/embed/Ilk7UXzV_Qc" allowfullscreen="true" frameborder="0" width="840" height="472"></iframe></div>

<p>In the next article, we will cover <a href="/blog/gate-cs-2027-ultimate-preparation-blueprint" target="_blank" rel="noopener noreferrer">TCP/IP stack, routing algorithms (Dijkstra, Bellman-Ford), and subnetting with CIDR</a> — all from a GATE perspective.</p>
`
  },

  // ════════════════════════════════════════════════════
  // BLOG 3 — Tests: H1/H2/H3, Highlight, Color text,
  //          Align right/center, Code blocks (multi),
  //          Images, Bullet + Ordered + Nested lists,
  //          Strike, Underline, HR, Bold/Italic combo
  // ════════════════════════════════════════════════════
  {
    title: 'Theory of Computation — DFA, NFA, PDA Explained with Examples',
    slug: 'theory-of-computation-dfa-nfa-pda-explained',
    excerpt: 'TOC is one of the hardest GATE CS subjects. This guide breaks down DFA, NFA, epsilon-NFA, PDA, and Turing Machines with examples, diagrams, and GATE-level problems.',
    cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    author: 'Prof. Ravindrababu Ravula',
    tags: ['Theory of Computation', 'GATE CS', 'DFA', 'NFA', 'Automata'],
    published: true,
    content: `
<h1>Theory of Computation — Complete GATE Guide</h1>

<p>Theory of Computation (TOC) is the subject that <mark>separates average GATE scorers from toppers</mark>. Most students fear it — but with the right approach, it becomes one of your <span style="color: #22c55e"><strong>highest-scoring subjects</strong></span>.</p>

<blockquote><p>"TOC is not about memorizing rules. It is about developing a mathematical intuition for how computations work. Once you get that — it all clicks." — <strong>Prof. Ravindrababu Ravula</strong></p></blockquote>

<hr>

<h2>Chapter 1 — Finite Automata</h2>

<h3>1.1 Deterministic Finite Automaton (DFA)</h3>

<p>A DFA is a <strong>5-tuple</strong>: <code>(Q, Σ, δ, q₀, F)</code></p>

<ul>
  <li><code>Q</code> — Finite set of <strong>states</strong></li>
  <li><code>Σ</code> — <strong>Input alphabet</strong> (finite, non-empty)</li>
  <li><code>δ</code> — <strong>Transition function</strong>: Q × Σ → Q</li>
  <li><code>q₀</code> — <strong>Start state</strong> (q₀ ∈ Q)</li>
  <li><code>F</code> — Set of <strong>accepting (final) states</strong> (F ⊆ Q)</li>
</ul>

<p><strong>Key property:</strong> For every state and every input symbol, <u>exactly one transition exists</u>. No ambiguity.</p>

<h3>Example DFA — Accepts strings ending in "01"</h3>

<pre><code>States: Q = {q0, q1, q2}
Alphabet: Σ = {0, 1}
Start: q0
Final: {q2}

Transition table:
  State │  0   │  1
  ──────┼──────┼─────
   q0   │  q1  │  q0
   q1   │  q1  │  q2
   q2   │  q1  │  q0

Accepted: "01", "001", "101", "0101"
Rejected: "0", "1", "10", "11"</code></pre>

<hr>

<h3>1.2 Non-Deterministic Finite Automaton (NFA)</h3>

<p>NFA differs from DFA in that:</p>
<ol>
  <li>A state can have <strong>0, 1, or multiple transitions</strong> on same input</li>
  <li>Transitions on <strong>ε (epsilon)</strong> are allowed — moves without consuming input</li>
  <li>The machine <strong>accepts</strong> if ANY path leads to a final state</li>
</ol>

<p><span style="color: #ffb703"><strong>Important GATE fact:</strong></span> Every NFA can be converted to an equivalent DFA (subset construction). The DFA may have up to <code>2ⁿ</code> states for an n-state NFA.</p>

<blockquote><p><strong>Equivalence:</strong> DFA = NFA = ε-NFA in terms of <em>language recognition power</em>. All three recognize exactly the <strong>Regular Languages</strong>.</p></blockquote>

<hr>

<h2>Chapter 2 — Regular Languages &amp; Regular Expressions</h2>

<h3>Closure Properties of Regular Languages</h3>

<p>Regular languages are <mark>closed under</mark> all of the following operations:</p>

<ul>
  <li>✅ Union: L₁ ∪ L₂</li>
  <li>✅ Concatenation: L₁ · L₂</li>
  <li>✅ Kleene Star: L*</li>
  <li>✅ Complement: L̄</li>
  <li>✅ Intersection: L₁ ∩ L₂</li>
  <li>✅ Reversal: L^R</li>
  <li>✅ Homomorphism</li>
</ul>

<h3>Pumping Lemma — Proving Non-Regularity</h3>

<p>To prove a language is <u>NOT regular</u>, use the Pumping Lemma:</p>

<pre><code>If L is regular, then ∃ pumping length p such that:
  For any string w ∈ L with |w| ≥ p,
  w can be split as w = xyz where:
    1. |y| > 0
    2. |xy| ≤ p
    3. ∀ i ≥ 0, xy^i z ∈ L

To prove non-regular: assume L is regular,
find a string that cannot be pumped,
derive contradiction → L is not regular.</code></pre>

<p><strong>Classic example:</strong> <code>L = {aⁿbⁿ | n ≥ 0}</code> is <strong>NOT regular</strong> (proved by pumping lemma).</p>

<hr>

<h2>Chapter 3 — Pushdown Automata (PDA)</h2>

<p>PDA = NFA + <strong>a stack</strong> (Last In First Out memory)</p>

<p>PDA recognizes <span style="color: #6baed6"><strong>Context-Free Languages (CFLs)</strong></span> — a superset of regular languages.</p>

<h3>PDA is a 7-tuple:</h3>
<p><code>(Q, Σ, Γ, δ, q₀, Z₀, F)</code></p>

<ul>
  <li><code>Γ</code> — Stack alphabet</li>
  <li><code>Z₀</code> — Initial stack symbol (stack bottom marker)</li>
  <li><code>δ</code>: Q × (Σ ∪ {ε}) × Γ → P(Q × Γ*) — transition function</li>
</ul>

<h3>Example PDA — Accepts {aⁿbⁿ | n ≥ 1}</h3>
<pre><code>Strategy:
  Push 'a' for every 'a' read
  Pop 'a' for every 'b' read
  Accept if stack is empty when input ends

Transitions:
  (q0, a, Z0) → (q0, AZ0)   // push A on Z0
  (q0, a, A)  → (q0, AA)    // push A on A
  (q0, b, A)  → (q1, ε)     // pop A on seeing b
  (q1, b, A)  → (q1, ε)     // keep popping
  (q1, ε, Z0) → (q2, Z0)    // accept when empty</code></pre>

<hr>

<h2>Chapter 4 — Turing Machines</h2>

<p>A Turing Machine is the <strong>most powerful computational model</strong>. It has:</p>
<ul>
  <li>An <strong>infinite tape</strong> (memory)</li>
  <li>A read/write head that can move <strong>Left or Right</strong></li>
  <li>A finite set of states</li>
</ul>

<p>TMs recognize <span style="color: #ef4444"><strong>Recursively Enumerable (RE) languages</strong></span> — the most general class.</p>

<h3>Hierarchy of Languages</h3>
<pre><code>Regular ⊂ Context-Free ⊂ Context-Sensitive ⊂ RE
  DFA        PDA            Linear Bounded TM    TM</code></pre>

<hr>

<h2 style="text-align: center">GATE Quick Revision Table</h2>

<p style="text-align: center"><em>Memorize this table. It covers 80% of TOC questions.</em></p>

<pre><code>Model          Recognizes          Memory        Determinism
──────────────────────────────────────────────────────────────
DFA/NFA        Regular             None          DFA=det, NFA=non-det
PDA            Context-Free        Stack         DPDA ⊂ NPDA
LBA            Context-Sensitive   Tape(bounded) Both
TM             RE Languages        Tape(unbounded) Both</code></pre>

<p style="text-align: right"><span style="color: #555"><em>— Article by Prof. Ravindrababu Ravula, ravindrababuravula.in</em></span></p>
`
  },

  // ════════════════════════════════════════════════════
  // BLOG 4 — Tests: YouTube embed (2 videos),
  //          Cover image, Highlight + Color combo,
  //          Personal/story format, Image from URL,
  //          All heading levels, Align center,
  //          Blockquote, Bold/italic/underline mix
  // ════════════════════════════════════════════════════
  {
    title: 'From YouTube Lectures to 690K Subscribers — Prof. RBR\'s Story',
    slug: 'prof-rbr-youtube-journey-690k-subscribers-story',
    excerpt: 'How Prof. Ravindrababu Ravula built India\'s largest GATE CS YouTube channel from scratch — the journey, the philosophy, the impact, and what\'s next.',
    cover_image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1200&q=80',
    author: 'Prof. Ravindrababu Ravula',
    tags: ['RBR Story', 'YouTube', 'EdTech', 'GATE CS', 'Education India'],
    published: true,
    content: `
<h1>From Zero to 690K — The RBR YouTube Story</h1>

<p style="text-align: center"><span style="color: #ffb703"><strong>90 million views. 690,000 subscribers. 2,400+ free lectures. One mission.</strong></span></p>

<hr>

<h2>The Beginning — 2012</h2>

<p>In 2012, YouTube was just starting to gain traction in India. Most educators hadn't considered it as a serious teaching platform. <strong>Prof. Ravindrababu Ravula saw something different.</strong></p>

<p>A student at IISc Bangalore couldn't afford coaching classes. Another in a small town had no access to quality teachers. The problem was clear: <u>great CS education was locked behind geography and money</u>.</p>

<blockquote><p>"I asked myself — if I can help one student understand Operating Systems deeply, why not help 10,000? The only barrier was that I hadn't hit 'Record' yet." — <strong>Prof. Ravindrababu Ravula</strong></p></blockquote>

<p>He hit Record.</p>

<hr>

<h2>What Made the Lectures Different</h2>

<p>Thousands of educators were teaching CS online. <mark>What made RBR different was not just content — it was depth and honesty.</mark></p>

<ul>
  <li><strong>No rote learning</strong> — Every concept explained from first principles</li>
  <li><strong>GATE-specific focus</strong> — Every topic connected to what examiners actually test</li>
  <li><strong>No shortcuts in understanding</strong> — <em>"If you don't understand why, you will forget how."</em></li>
  <li><strong>Free. Always free.</strong> — The core YouTube library will never be paywalled</li>
</ul>

<img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80" alt="Students learning in a classroom — the inspiration behind free education" />

<hr>

<h2>Watch: How RBR Teaches (Sample Lecture)</h2>

<p>This is a sample of how Prof. RBR breaks down complex topics — here, <strong>Graph Algorithms</strong> from the Algorithms series:</p>

<div data-youtube-video=""><iframe src="https://www.youtube.com/embed/oDqjPvD1ios" allowfullscreen="true" frameborder="0" width="840" height="472"></iframe></div>

<p><em>Notice the way each concept builds on the previous one. No concept is introduced without its foundation being set first.</em></p>

<hr>

<h2>The Numbers Tell a Story</h2>

<h3>Growth Milestones</h3>

<ol>
  <li><strong>2012</strong> — First GATE CS video uploaded. 0 subscribers.</li>
  <li><strong>2014</strong> — 10,000 subscribers. Students start sharing lectures in engineering colleges.</li>
  <li><strong>2016</strong> — 100,000 subscribers. First topper (AIR 5) credits RBR lectures.</li>
  <li><strong>2018</strong> — 300,000 subscribers. Multiple AIR &lt; 10 rankers.</li>
  <li><strong>2019</strong> — AIR 2 Jay Bansal and AIR 3 Prateek Agarwal credit RBR as primary resource.</li>
  <li><strong>2022</strong> — 500,000 subscribers. 70 million total views.</li>
  <li><strong>2025</strong> — <span style="color: #ffb703"><strong>690,000 subscribers. 90 million views. 2,400+ lectures.</strong></span></li>
</ol>

<blockquote><p>These are not just numbers. Each view is a student who stayed up late preparing. Each subscriber is someone who trusted that free, quality education is possible in India.</p></blockquote>

<hr>

<h2>The Philosophy Behind Free Education</h2>

<p>Many people asked Prof. RBR: <em>"Why give it all away for free?"</em></p>

<p>The answer is both simple and profound:</p>

<blockquote><p>"Education is not a product to be sold. It is a gift to be shared. When knowledge flows freely, it lifts everyone — the giver and the receiver both grow." — <strong>Prof. Ravindrababu Ravula</strong></p></blockquote>

<p>This belief is <u>not just philosophical</u> — it is practical. Students who get quality free education go on to build things, solve problems, and some come back to support the mission. <mark>Generosity creates a virtuous cycle.</mark></p>

<hr>

<h2>Watch: Prof. RBR on the Future of CS Education in India</h2>

<div data-youtube-video=""><iframe src="https://www.youtube.com/embed/8mAITcNt710" allowfullscreen="true" frameborder="0" width="840" height="472"></iframe></div>

<hr>

<h2>What's Next — 2027 and Beyond</h2>

<p>The mission is expanding:</p>

<ul>
  <li><strong>Super 100 Batch</strong> — <mark>Handpicked 100 students</mark> for ultra-intensive GATE CS+DA 2027 preparation</li>
  <li><strong>1:1 Mentorship Network</strong> — IITians, IISc alumni, DRDO scientists as personal mentors</li>
  <li><strong>AI-powered learning tools</strong> — Personalized GATE prep via RBR's EdTech platform</li>
  <li><strong>International reach</strong> — CS education beyond India's borders</li>
</ul>

<p style="text-align: center"><span style="color: #ffb703"><strong>The gate is open. The question is — will you walk through it?</strong></span></p>

<hr>

<p style="text-align: center"><em>Follow the journey at <strong>ravindrababuravula.in</strong> · YouTube · Instagram · LinkedIn</em></p>
`
  }
];

// ─── Insert blogs ───
async function insertBlogs() {
  console.log('\n📝 Inserting 4 new blogs...\n');
  let passed = 0, failed = 0;

  for (const blog of TEST_BLOGS) {
    const payload = {
      ...blog,
      created_at: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('rbrblogs')
      .upsert(payload, { onConflict: 'slug' })
      .select('id, slug, published');

    if (error) {
      console.log(`❌ FAILED  — "${blog.title}"`);
      console.log(`   Error: ${error.message}`);
      failed++;
    } else {
      console.log(`✅ INSERTED — "${blog.title}"`);
      console.log(`   → /blog/${data[0]?.slug}  |  published: ${data[0]?.published}`);
      passed++;
    }
  }
  console.log(`\n📊 ${passed} inserted, ${failed} failed\n`);
  return failed === 0;
}

// ─── Verify all blogs readable ───
async function verifyBlogs() {
  console.log('\n🔍 Verifying published blogs are readable...\n');
  const { data, error } = await supabase
    .from('rbrblogs')
    .select('id, title, slug, published, tags, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) { console.log('❌ Read failed:', error.message); return; }

  console.log(`Found ${data.length} published blog(s):\n`);
  data.forEach((b, i) => {
    console.log(`  ${i + 1}. ${b.title}`);
    console.log(`     /blog/${b.slug}`);
    console.log(`     Tags: ${(b.tags || []).join(', ')}\n`);
  });
}

// ─── Verify each slug individually ───
async function verifySlug(slug) {
  const { data, error } = await supabase
    .from('rbrblogs')
    .select('title, slug, content, author')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !data) {
    console.log(`❌ /blog/${slug} — NOT FOUND (${error?.message})`);
    return false;
  }
  const chars = (data.content || '').length;
  const hasYoutube = data.content?.includes('data-youtube-video') ? '📺 has YouTube embed' : '';
  const hasImg = data.content?.includes('<img') ? '🖼  has image' : '';
  const hasCode = data.content?.includes('<pre>') ? '💻 has code block' : '';
  const features = [hasYoutube, hasImg, hasCode].filter(Boolean).join(', ');
  console.log(`✅ /blog/${slug}`);
  console.log(`   "${data.title}"`);
  console.log(`   Content: ${chars.toLocaleString()} chars${features ? ' · ' + features : ''}`);
  return true;
}

// ─── Main ───
async function runAllTests() {
  console.log('\n════════════════════════════════════════════════');
  console.log('  BLOG SYSTEM TEST — ravindrababuravula.in');
  console.log('════════════════════════════════════════════════');

  const tableOk = await setupTable();
  if (!tableOk) { console.log('\n❌ Create the table first.'); process.exit(1); }

  const insertOk = await insertBlogs();
  await verifyBlogs();

  console.log('\n🔗 Testing individual slug reads...\n');
  let slugsOk = 0;
  for (const blog of TEST_BLOGS) {
    const ok = await verifySlug(blog.slug);
    if (ok) slugsOk++;
  }

  const port = 5173;
  console.log('\n════════════════════════════════════════════════');
  if (insertOk && slugsOk === TEST_BLOGS.length) {
    console.log('🎉 ALL TESTS PASSED!\n');
    console.log('Open in browser:\n');
    console.log(`  Blog list:    http://localhost:${port}/blog`);
    TEST_BLOGS.forEach(b => {
      console.log(`  ${b.slug.slice(0, 40).padEnd(40)} http://localhost:${port}/blog/${b.slug}`);
    });
    console.log(`\n  Admin panel:  http://localhost:${port}/admin/blog`);
    console.log('\nFeatures in each blog:');
    console.log('  Blog 1 — H1/H2/H3, Bold, Italic, Underline, Strike, Lists, Blockquote, HR, Color, Highlight, Align');
    console.log('  Blog 2 — 2× YouTube embed, Image, Code block, Inline code, Links');
    console.log('  Blog 3 — TOC content, Code blocks, Highlight, Color, All heading levels, Align right');
    console.log('  Blog 4 — 2× YouTube embed, Image, Story format, Ordered list, Color, Align center');
  } else {
    console.log('⚠️  Some tests failed. Check errors above.');
  }
  console.log('════════════════════════════════════════════════\n');
}

runAllTests().catch(console.error);
