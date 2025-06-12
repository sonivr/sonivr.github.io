// timer.js

let timerInterval; // setIntervalのIDを保持し、タイマーを停止するために使います
let timeLeft = 10;//25 * 60; // 初期値：25分（秒単位）
let isRunning = false; // タイマーが現在実行中かどうか

const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');

/**
 * タイマー表示を更新する関数
 * timeLeft（秒数）を「MM:SS」形式に変換して表示します
 */
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    // 0埋めして「05:03」のように表示されるようにします
    timerDisplay.textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * タイマーを開始する関数
 */
function startTimer() {
    if (isRunning) return; // すでに実行中の場合は何もしない

    isRunning = true;
    timerInterval = setInterval(() => {
        timeLeft--; // 1秒ごとに残り時間を減らす
        updateDisplay(); // 表示を更新

        if (timeLeft <= 0) {
            clearInterval(timerInterval); // タイマーを停止
            isRunning = false;
            alert("時間が来ました！"); // 時間が0になったらアラートを表示
            // 必要であれば、ここで自動的に次のタイマー（休憩など）を開始するロジックを追加できます
            resetTimer(); // 今回は一度リセットに戻します
        }
    }, 1000); // 1000ミリ秒（1秒）ごとに実行
}

/**
 * タイマーを一時停止する関数
 */
function pauseTimer() {
    clearInterval(timerInterval); // setIntervalをクリアしてタイマーを停止
    isRunning = false;
}

/**
 * タイマーを初期状態に戻す関数
 * （ここでは25分に戻しますが、将来的には設定値を使います）
 */
function resetTimer() {
    clearInterval(timerInterval); // 実行中のタイマーがあれば停止
    isRunning = false;
    timeLeft = 25 * 60; // 25分にリセット
    updateDisplay(); // 表示を更新
}

// イベントリスナーを設定
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// 初期表示
updateDisplay();