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

// 問い合わせフォーム（カテゴリA：手水舎型リチュアル—送信前に3問だけ挟む簡易版）
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('送信内容を確認しました。担当者より折り返しご連絡いたします。\n（このフォームは構想版のデモです。実際の送受信にはGoogleフォーム等の連携が必要です）');
    form.reset();
  });
}
