const questions = [
    {
        text: '你比較喜歡的 Monster 特質是？',
        options: [
            { text: '黏人可愛', scores: { affinity: 2, independence: -1 } },
            { text: '聽話好管', scores: { care: -2, affinity: 1 } },
            { text: '活潑自由', scores: { independence: 2, runaway: 1 } },
            { text: '神秘難捉摸', scores: { care: 2, runaway: 2 } },
        ],
    },
    {
        text: 'Monster 半夜亂叫，你會？',
        options: [
            { text: '立刻安撫他', scores: { care: -1, affinity: 2 } },
            { text: '跟他一起叫', scores: { affinity: 1, runaway: 1 } },
            { text: '冷靜觀察', scores: { independence: 1, care: 1 } },
            { text: '把他趕出房間', scores: { affinity: -2, runaway: 2 } },
        ],
    },
    {
        text: '出門時你會怎麼照顧 Monster？',
        options: [
            { text: '放牠自由走動', scores: { independence: 2, runaway: 2 } },
            { text: '綁繩牽好', scores: { care: -1, runaway: -1 } },
            { text: '藏進包包帶著走', scores: { care: 1, affinity: 1 } },
            { text: '請朋友幫忙顧', scores: { independence: 1, care: 1 } },
        ],
    },
];

let currentQuestion = 0;
let totalScores = { care: 0, affinity: 0, independence: 0, runaway: 0 };

function showQuestion() {
    const q = questions[currentQuestion];
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = `
      <div class="question">
        <div>第 ${currentQuestion + 1} 題</div>
        <p>${q.text}</p>
      </div>
      <div class="answer-section">
        ${q.options
        .map(
            (opt, i) => `
          <div class="option" data-index="${i}">${opt.text}</div>
        `
        )
        .join('')}
      </div>
    `;

    document.querySelectorAll('.option').forEach((optionEl) => {
        optionEl.addEventListener('click', () => {
            const selectedIndex = optionEl.getAttribute('data-index');
            const chosenOption = q.options[selectedIndex];
            Object.entries(chosenOption.scores).forEach(([key, val]) => {
                totalScores[key] += val;
            });

            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        });
    });
}


function showResult() {
    let resultText = '';
    if (totalScores.runaway >= 4) {
        resultText = '你適合的是【Jjuf 惡魔版】— 狼型 Monster，神出鬼沒但很有魅力！';
    } else {
        resultText = '你適合的是【Han-il 天使版】— 鼠型鼓手 Monster，穩定又可依靠。';
    }

    document.getElementById('quiz').innerHTML = '';
    document.getElementById('result').innerHTML = `
    <p>${resultText}</p>
    <button id="restart-btn">再玩一次</button>
  `;

    document.getElementById('restart-btn').addEventListener('click', restartQuiz);
}

function restartQuiz() {
    currentQuestion = 0;
    totalScores = { care: 0, affinity: 0, independence: 0, runaway: 0 };
    document.getElementById('result').innerHTML = '';
    showQuestion();
}

document.addEventListener('DOMContentLoaded', showQuestion);
