// スクロールリビール（カテゴリA：段階的開示の演出）
const revealTargets = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
    }
  });
}, { threshold: 0.15 });
revealTargets.forEach((el) => revealObserver.observe(el));

// 規制クイズ診断（カテゴリF：インタラクティブ・参加型）
const quizData = [
  {
    q: '駐車場だったこの土地。あなたはどんな建物を建てますか？',
    options: [
      { label: '高さ15mのタワー型邸宅', result: 'ng', text: '残念、この土地は高度地区により高さ10m以下に制限されています。ただしそれは「東山の稜線を隠さない」という約束でもあります。' },
      { label: '高さ10m以下・木造2階建て', result: 'ok', text: '正解。この土地に許された最大の高さです。10m以下＝木造2階建てまたはRC地下1階+地上2階が実現可能な上限。' },
      { label: '陸屋根の現代的なコンクリート住宅', result: 'ng', text: '陸屋根は特別修景地域では原則不可。切妻・寄棟・入母屋のいずれかの勾配屋根が求められます。' },
      { label: '瓦屋根・和風外観の邸宅', result: 'ok', text: '正解。日本瓦や光沢の少ない濃い灰色・黒色の屋根、薄茶色系の外壁が求められる「岡崎・南禅寺特別修景地域」の基準に適合します。' },
    ],
  },
];

function initQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container) return;
  quizData.forEach((item, qi) => {
    const box = document.createElement('div');
    box.className = 'quiz-box reveal';
    const q = document.createElement('div');
    q.className = 'quiz-q';
    q.textContent = `Q${qi + 1}. ${item.q}`;
    box.appendChild(q);

    const opts = document.createElement('div');
    opts.className = 'quiz-options';
    const result = document.createElement('div');
    result.className = 'quiz-result';

    item.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-btn';
      btn.textContent = opt.label;
      btn.addEventListener('click', () => {
        result.textContent = opt.text;
        result.className = `quiz-result show ${opt.result}`;
      });
      opts.appendChild(btn);
    });

    box.appendChild(opts);
    box.appendChild(result);
    container.appendChild(box);
    revealObserver.observe(box);
  });
}
initQuiz();

// 距離マトリクス タブ切り替え
const distTabs = document.querySelectorAll('.dist-tab');
const distPanels = document.querySelectorAll('.dist-panel');
distTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    distTabs.forEach((t) => t.classList.remove('active'));
    distPanels.forEach((p) => p.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById(tab.dataset.target);
    if (target) target.classList.add('active');
  });
});

// FAQアコーディオン（構造化データ(FAQPage)と同一内容をここでも表示）
const faqData = [
  { q: '岡崎南御所町の土地には、どのくらいの高さの建物が建てられますか？', a: '高さ10m以下（木造2階建て、またはRC地下1階+地上2階相当）に制限されています。京都市告示第215号（平成19年9月3日）で指定された「岡崎・南禅寺特別修景地域」の規制で、東山の稜線を隠さないための制限です。' },
  { q: 'この土地の建蔽率・容積率はどれくらいですか？', a: '建蔽率40%（10分の4）、容積率60%です。701.42㎡の敷地に対し、建築面積上限は約280㎡（85坪）、延床面積上限は約420㎡（127坪）で、残りの約420㎡（127坪）は庭園として設計に組み込む前提になります。' },
  { q: '地下鉄駅からの距離はどのくらいですか？', a: '地下鉄東西線「東山」駅まで徒歩14分（約819m）、「蹴上」駅まで約885mです。いずれもNAVITIME実測データで確認済みです。平安神宮までは徒歩4〜5分（約350〜400m）です。' },
  { q: 'なぜこの土地は周辺相場より高いのですか？', a: '本物件は坪単価約353.5万円で、隣接する岡崎徳成町（約204万円/坪）・岡崎円勝寺町（約193万円/坪）の公示地価と比べて約1.7〜1.8倍のプレミアムがあります。国交省の不動産取引データでは、京都市左京区で200坪超の土地取引は2015〜2025年の10年間で55件確認されましたが、岡崎エリアを含む所在地はそのうち0件でした。' },
  { q: '南禅寺界隈にはどんな著名な別荘がありますか？', a: '無鄰菴（山縣有朋、国の名勝）、碧雲荘（現在は野村ホールディングス所有、国の重要文化財）、對龍山荘（現在はニトリホールディングス所有）などがあります。海外ではオラクル共同創業者ラリー・エリソン氏が南禅寺境内の歴史的別荘を所有していると複数の海外メディアが報じています。' },
  { q: '岡崎エリアに地震・水害のリスクはありますか？', a: '花折断層帯地震（M7.5）では左京区が京都市内最大級の被害想定区域とされますが、30年以内の発生確率は0〜0.6%です。琵琶湖疏水固有の浸水想定図は存在しませんが、全市版の内水氾濫マップには岡崎エリアも含まれます。' },
  { q: '岡崎エリアに生活利便施設はありますか？', a: '半径1.1km圏内にコンビニ・スーパー合計17件（営業中）を実地確認しています。最寄りはローソン岡崎道店（267m）、大型スーパーとしてイオンスタイル東山二条（823m）があります。ただし最寄り3店舗を除くと700m以上歩く必要があります。' },
  { q: '京都の不動産取引は「よそ者に厳しい」というのは本当ですか？', a: '一次資料を調査した限り、京都の不動産取引でよそ者を露骨に排除するという直接的な証言・報道は見つかりませんでした。複雑さの実質は、排他的な人間関係というより新景観政策・埋蔵文化財包蔵地・洛中/洛外という歴史的地理的要因に起因する制度的複雑さである可能性が強く示唆されます。' },
];

function initFaq() {
  const list = document.getElementById('faq-list');
  if (!list) return;
  faqData.forEach((item) => {
    const box = document.createElement('div');
    box.className = 'faq-item';
    const btn = document.createElement('button');
    btn.className = 'faq-question';
    btn.innerHTML = `<span>${item.q}</span>`;
    const ans = document.createElement('div');
    ans.className = 'faq-answer';
    ans.innerHTML = `<p>${item.a}</p>`;
    btn.addEventListener('click', () => box.classList.toggle('open'));
    box.appendChild(btn);
    box.appendChild(ans);
    list.appendChild(box);
  });
}
initFaq();

// 数字のカウントアップ演出（スクロールで画面内に入ったら発火）
const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString('ja-JP');
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    statObserver.unobserve(el);
  });
}, { threshold: 0.4 });
statNums.forEach((el) => statObserver.observe(el));

// 問い合わせフォーム（カテゴリA：手水舎型リチュアル—送信前に3問だけ挟む簡易版）
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('送信内容を確認しました。担当者より折り返しご連絡いたします。\n（このフォームは構想版のデモです。実際の送受信にはGoogleフォーム等の連携が必要です）');
    form.reset();
  });
}
