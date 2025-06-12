// timer.js

let timerInterval;
let timeLeft = 25 * 60; // 初期値：25分（秒単位）
let isRunning = false;

const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-button'); // 既存のボタン
const pauseButton = document.getElementById('pause-button'); // 既存のボタン
const resetButton = document.getElementById('reset-button'); // 既存のボタン

// --- 新しい関数を追加 ---
/**
 * タイマーの時間を設定する関数
 * @param {number} minutes - 設定する分数
 */
function setTimer(minutes) {
    if (isRunning) {
        // タイマー実行中に設定変更しようとした場合は、一度リセットして再設定
        resetTimer();
    }
    timeLeft = minutes * 60; // 分数を秒に変換して設定
    updateDisplay(); // 表示を即座に更新
    console.log(`${minutes}分のタイマーが設定されました。`);
}
// --- ここまで追加 ---

/**
 * タイマー表示を更新する関数
 * timeLeft（秒数）を「MM:SS」形式に変換して表示します
 */
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * タイマーを開始する関数
 */
function startTimer() {
    if (isRunning) return;

    isRunning = true;
    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            alert("時間が来ました！");
            resetTimer(); 
        }
    }, 1000);
}

/**
 * タイマーを一時停止する関数
 */
function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

/**
 * タイマーを初期状態に戻す関数
 */
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = 25 * 60; // 25分にリセット (将来的にはデフォルト設定から読み込む)
    updateDisplay();
}

// イベントリスナーを設定 (既存のボタンは現在非表示)
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// 初期表示
updateDisplay();