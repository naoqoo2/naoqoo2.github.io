'use strict';

function splitBill(total, counts) {
  const weights = [
    240 + Math.floor(Math.random() * 61),
    115 + Math.floor(Math.random() * 46),
    100,
    35 + Math.floor(Math.random() * 21),
    15 + Math.floor(Math.random() * 11),
  ];
  const weightedCount = counts.reduce((sum, count, index) => sum + count * weights[index], 0);

  const otherMinimum = counts[1] * 1000 + counts[2] + counts[3] + counts[4];
  const grandMinimum = total * weights[0] >= 8000 * weightedCount
    && total >= counts[0] * 10000 + otherMinimum ? 10000 : 0;
  const lowest = counts.findLastIndex(count => count > 0);

  function calculate(budget, maxUnit, preferCoins = false, preferBills = false) {
    const prices = weights.map((weight, index) => {
      if (counts[index] === 0) return 0;
      const numerator = budget * weight;
      // Keep two significant digits where the change allows it.
      let unit = index < 2 ? 1000 : 1;
      const limit = index < 2 ? Math.max(1000, maxUnit) : maxUnit;
      while (unit < limit && numerator >= 100 * weightedCount * unit) unit *= 10;
      if (preferBills && index === 0) unit = Math.max(5000, unit);
      if (preferCoins && (index === 2 || index === 3)) unit = Math.max(500, unit);
      const rounded = Math.max(1, Math.ceil(numerator / (weightedCount * unit))) * unit;
      return index === 0 ? Math.max(grandMinimum, rounded) : rounded;
    });
    const collected = prices.reduce((sum, price, index) => sum + price * counts[index], 0);
    return { prices, collected, change: collected - total };
  }

  if (counts[lowest] === 1) {
    const preceding = counts.slice(0, lowest).findLastIndex(count => count > 0);
    if (preceding === -1) {
      const prices = counts.map((_, index) => index === lowest ? total : 0);
      return { prices, collected: total, change: 0 };
    }

    const reserve = Math.max(1, Math.round(total * weights[lowest] / weightedCount));
    // Reserve the lowest share first, then relax denominations if necessary.
    for (const [maxUnit, preferCoins, preferBills, minimum] of [
      [100, true, true, reserve],
      [100, true, false, reserve],
      [100, true, true, 1],
      [100, true, false, 1],
      [100, false, false, 1],
      [10, false, false, 1],
      [1, false, false, 1],
    ]) {
      let low = 0;
      let high = total;
      while (low < high) {
        const middle = Math.ceil((low + high) / 2);
        const candidate = calculate(middle, maxUnit, preferCoins, preferBills);
        if (candidate.collected - candidate.prices[lowest] <= total - minimum) low = middle;
        else high = middle - 1;
      }
      const { prices, collected } = calculate(low, maxUnit, preferCoins, preferBills);
      let remainder = total - (collected - prices[lowest]);
      if (preferCoins && remainder >= minimum && remainder > prices[preceding]) {
        let ceiling = Infinity;
        for (let index = 0; index < lowest; index++) {
          const count = counts[index];
          if (count === 0) continue;
          if (index >= 2 && remainder > prices[preceding]) {
            const available = Math.floor((ceiling - prices[index]) / 500);
            const affordable = Math.floor((remainder - minimum) / (count * 500));
            const extra = Math.min(available, affordable) * 500;
            prices[index] += extra;
            remainder -= extra * count;
          }
          ceiling = prices[index];
        }
      }
      if (remainder >= minimum && remainder <= prices[preceding]) {
        prices[lowest] = remainder;
        return { prices, collected: total, change: 0 };
      }
    }
  }

  let best = calculate(total, Infinity, true, true);
  if (best.change <= 500) return best;

  for (const [maxUnit, preferCoins, preferBills] of [[100, true, true], [100, true], [100, false], [10, false], [1, false]]) {
    // Find the smallest provisional budget whose rounded shares cover the bill.
    let low = 0;
    let high = total;
    while (low < high) {
      const middle = Math.floor((low + high) / 2);
      if (calculate(middle, maxUnit, preferCoins, preferBills).change < 0) low = middle + 1;
      else high = middle;
    }
    const candidate = calculate(low, maxUnit, preferCoins, preferBills);
    if (candidate.change < best.change) best = candidate;
    if (best.change <= 500) return best;

    if (low === 0) continue;
    const previous = calculate(low - 1, maxUnit, preferCoins, preferBills);
    let ceiling = Infinity;
    // Fill the gap with smaller denominations before taking another banknote.
    for (const [index, count] of counts.entries()) {
      if (count === 0) continue;
      const price = previous.prices[index];
      if (index >= 2) {
        const unit = preferCoins && index < 4 ? 500 : maxUnit;
        const needed = Math.ceil(-previous.change / (count * unit));
        const available = Math.floor((ceiling - price) / unit);
        const withinChange = Math.floor((500 - previous.change) / (count * unit));
        const extra = Math.min(needed, available, withinChange) * unit;
        previous.prices[index] += extra;
        previous.collected += extra * count;
        previous.change += extra * count;
        if (previous.change >= 0) return previous;
      }
      ceiling = previous.prices[index];
    }
  }
  return best;
}

const form = document.querySelector('#split');
const totalInput = document.querySelector('#total');
const countInputs = [...form.querySelectorAll('[name="count"]')];
const result = document.querySelector('#result');
const error = document.querySelector('#error');
const priceFields = [...result.querySelectorAll('[data-price]')];
const countFields = [...result.querySelectorAll('[data-count]')];
const collectedField = document.querySelector('#collected');
const paymentField = document.querySelector('#payment');
const changeField = document.querySelector('#change');
const formatYen = amount => amount.toLocaleString('ja-JP') + ' 円';

const countButtons = [...form.querySelectorAll('[data-step]')];

function updateCountButtons() {
  countButtons.forEach(button => {
    const input = document.getElementById(button.dataset.target);
    const value = input.valueAsNumber || 0;
    button.disabled = Number(button.dataset.step) < 0
      ? value <= Number(input.min)
      : value >= Number(input.max);
  });
}

countButtons.forEach(button => {
  button.addEventListener('click', () => {
    const input = document.getElementById(button.dataset.target);
    const value = Math.trunc(input.valueAsNumber || 0);
    input.value = Math.min(Number(input.max), Math.max(Number(input.min), value + Number(button.dataset.step)));
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
});
updateCountButtons();

form.addEventListener('input', () => {
  updateCountButtons();
  result.hidden = true;
  error.textContent = '';
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const counts = countInputs.map(input => input.valueAsNumber);
  if (counts.every(count => count === 0)) {
    error.textContent = '人数を合計1人以上にしてください。';
    countInputs[0].focus();
    return;
  }

  const total = totalInput.valueAsNumber;
  const { prices, collected, change } = splitBill(total, counts);
  priceFields.forEach((field, index) => {
    field.textContent = counts[index] === 0 ? '—' : formatYen(prices[index]);
  });
  countFields.forEach((field, index) => {
    field.textContent = counts[index] + '人';
  });
  collectedField.textContent = formatYen(collected);
  paymentField.textContent = formatYen(total);
  changeField.textContent = formatYen(change);
  form.hidden = true;
  result.hidden = false;
  document.querySelector('#result-title').focus();
});

document.querySelector('#back').addEventListener('click', () => {
  result.hidden = true;
  form.hidden = false;
  totalInput.focus();
});

document.querySelector('#retry').addEventListener('click', () => {
  form.requestSubmit();
});

const installDialog = document.querySelector('#install-dialog');
const installIntro = document.querySelector('#install-intro');
const installSteps = document.querySelector('#install-steps');
const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent)
  || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isAndroid = /Android/.test(navigator.userAgent);
let intro;
let steps;
if (isIOS) {
  intro = 'Safariでwarikanを開いて、3ステップ。';
  steps = [
    '共有ボタン（四角に上向きの矢印）をタップ。見当たらないときは「…」を開いてね。',
    'メニューを下へスクロールして「ホーム画面に追加」を選ぼう。',
    '「Webアプリとして開く」があればオンにして、「追加」をタップ！',
  ];
} else if (isAndroid) {
  intro = 'いつものブラウザから、かんたん追加。';
  steps = [
    'ブラウザの右上などにある「︙」メニューを開こう。',
    '「ホーム画面に追加」または「アプリをインストール」を選ぼう。',
    '画面の案内に沿って「追加」または「インストール」をタップ！',
  ];
} else {
  intro = 'スマホでwarikanを開いて追加しよう。';
  steps = [
    'スマホのブラウザで、このページを開こう。',
    'ページ下の「ホーム画面に追加」をタップ。',
    'スマホに合った追加手順が表示されるよ。',
  ];
}
installIntro.textContent = intro;
steps.forEach(text => {
  const item = document.createElement('li');
  item.textContent = text;
  installSteps.append(item);
});

if (window.matchMedia('(display-mode: standalone)').matches || navigator.standalone) {
  document.querySelector('#install-promo').hidden = true;
}
document.querySelector('#install-help').addEventListener('click', () => {
  installDialog.showModal();
});
document.querySelector('#install-close').addEventListener('click', () => {
  installDialog.close();
});
