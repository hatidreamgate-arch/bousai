const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });
}

const quiz = document.querySelector('[data-quiz]');
if (quiz) {
  const result = quiz.querySelector('[data-quiz-result]');
  const resultTitle = result.querySelector('strong');
  const resultText = result.querySelector('p');
  const resultLinks = result.querySelector('[data-quiz-links]');
  const routes = [
    { title: '自宅や生活圏の災害リスク', href: 'risk.html', label: '災害リスクを確認する →' },
    { title: '大雨や台風のときの情報源', href: 'information.html', label: '情報の集め方を確認する →' },
    { title: '避難のタイミングと避難先', href: 'evacuation.html', label: '避難行動を確認する →' },
    { title: '家族の避難計画', href: 'plan.html', label: '避難計画を作る →' }
  ];

  quiz.addEventListener('change', () => {
    const answers = [...quiz.querySelectorAll('fieldset')].map((field) => field.querySelector('input:checked')?.value);
    resultLinks.replaceChildren();

    const unansweredCount = answers.filter((answer) => !answer).length;
    if (unansweredCount > 0) {
      resultTitle.textContent = 'すべての質問に答えてください';
      resultText.textContent = `あと${unansweredCount}問です。回答すると、確認してほしいページをまとめて表示します。`;
      result.classList.add('is-visible');
      return;
    }

    const recommendations = new Map();
    answers.forEach((answer, index) => {
      if (answer !== 'yes') recommendations.set(routes[index].href, routes[index]);
    });

    if (recommendations.size === 0) {
      resultTitle.textContent = '基本的な備えができています';
      resultText.textContent = '今の備えを定期的に見直し、家族でも確認を続けましょう。';
    } else {
      resultTitle.textContent = 'あなたに確認してほしいこと';
      resultText.textContent = [...recommendations.values()].map((route) => route.title).join('、');
      recommendations.forEach((route) => {
        const link = document.createElement('a');
        link.className = 'button button-secondary';
        link.href = route.href;
        link.textContent = route.label;
        resultLinks.append(link);
      });
    }
    result.classList.add('is-visible');
  });
}

const plan = document.querySelector('[data-plan]');
if (plan) {
  const tabs = [...plan.querySelectorAll('[role="tab"]')];
  const panels = [...plan.querySelectorAll('[role="tabpanel"]')];
  const status = plan.querySelector('[data-save-status]');
  const storageKey = 'wagaya-bousai-plan';

  const showStep = (index) => {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
    });
    panels.forEach((panel, i) => { panel.hidden = i !== index; });
    if (index === 4) updateSummary();
    document.querySelector('.plan-shell')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const formDataObject = () => {
    const data = new FormData(plan);
    const values = {};
    for (const [key, value] of data.entries()) {
      values[key] = values[key] ? `${values[key]}、${value}` : value;
    }
    return values;
  };

  const save = () => {
    localStorage.setItem(storageKey, JSON.stringify(formDataObject()));
    status.textContent = `保存しました（${new Intl.DateTimeFormat('ja-JP', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date())}）`;
  };

  const updateSummary = () => {
    const v = formDataObject();
    const lines = [
      `関係する災害：${v.hazard || '未入力'}`,
      `想定浸水深：${v.depth || '未入力'}`,
      `土砂災害警戒区域等：${v.landslideZone || '未入力'}`,
      `避難先：${v.destination || '未入力'}`,
      `避難のタイミング：${v.timing || '未入力'}`,
      `連絡方法：${v.contact || '未入力'}`,
      `持ち物・メモ：${v.items || '未入力'}`
    ];
    plan.querySelector('[data-summary]').textContent = lines.join('\n');
  };

  tabs.forEach((tab, index) => tab.addEventListener('click', () => showStep(index)));
  plan.querySelectorAll('[data-next]').forEach((button) => button.addEventListener('click', () => showStep(Math.min(Number(button.dataset.next), 4))));
  plan.querySelectorAll('[data-prev]').forEach((button) => button.addEventListener('click', () => showStep(Math.max(Number(button.dataset.prev), 0))));
  plan.addEventListener('input', save);
  plan.addEventListener('change', save);

  const saved = localStorage.getItem(storageKey);
  if (saved) {
    try {
      const values = JSON.parse(saved);
      Object.entries(values).forEach(([name, value]) => {
        const fields = [...plan.elements].filter((field) => field.name === name);
        fields.forEach((field) => {
          if (field.type === 'checkbox' || field.type === 'radio') field.checked = String(value).split('、').includes(field.value);
          else field.value = value;
        });
      });
      status.textContent = '前回の入力内容を復元しました';
    } catch (_) { localStorage.removeItem(storageKey); }
  }

  plan.querySelector('[data-delete]').addEventListener('click', () => {
    if (!window.confirm('ブラウザに保存した避難計画を削除しますか？')) return;
    localStorage.removeItem(storageKey);
    plan.reset();
    status.textContent = '保存内容を削除しました';
    updateSummary();
  });
}
