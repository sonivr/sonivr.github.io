// timer.js (修正箇所のみ)

let timerInterval;
let timeLeft = 25 * 60;
let isRunning = false;

const timerDisplay = document.getElementById('timer-display');
// ... 既存のボタン定義 ...

// ★ ここに筒に落ちるしずくを生成する関数を追加 ★
const splashingDropletContainer = document.getElementById('splashing-droplet-container');

/**
 * 筒に落ちるしずくを生成し、アニメーションを開始する関数
 * @param {string} type - 'work' または 'break' でしずくの色を決定
 */
function createSplashingDroplet(type) {
    const droplet = document.createElement('div');
    droplet.classList.add('splashing-droplet');
    if (type === 'work') {
        droplet.classList.add('droplet-color-work');
    } else {
        droplet.classList.add('droplet-color-break');
    }
    splashingDropletContainer.appendChild(droplet);

    // アニメーション終了後に要素を削除
    droplet.addEventListener('animationend', () => {
        droplet.remove();
    });
}
// ★ ここまで追加 ★


/**
 * タイマーの時間を設定する関数
 * @param {number} minutes - 設定する分数
 */
function setTimer(minutes) {
    if (isRunning) {
        resetTimer();
    }
    timeLeft = minutes * 60;
    updateDisplay();
    console.log(`${minutes}分のタイマーが設定されました。`);
}

/**
 * タイマー表示を更新する関数
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
    createSplashingDroplet(pomodoroSequenceType[currentSequenceIndex]); // ★ ここを修正 ★
    // alert("タイマー開始！"); // デバッグ用、最終的には削除
    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            playAlertSound();
            alert("時間が来ました！"); // ★ 次のステップでこれを削除する ★
            resetTimer(); 
            setNextSequenceTimer(); // ★ ここで次のタイマーをすぐに設定 ★
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
    //timeLeft = 25 * 60; // リセット時にもシーケンスの現在の時間を保持したいのでコメントアウト
    updateDisplay();
}

// ... 既存のイベントリスナー設定 ...

// 初期表示
// updateDisplay(); // setNextSequenceTimer()が呼ぶので不要

// --- 初期スタックしずくのプレースホルダー ---
// 最終的には、この部分はしずくのスタック管理機能に置き換わります
let pomodoroSequence = [1, 2]; // for test [25, 5]; // テスト用: 1分作業, 2分休憩
let pomodoroSequenceType = ['work', 'break']; // 各シーケンスのタイプ
let currentSequenceIndex = 0;

/**
 * 次のタイマー（しずく）を設定する関数
 * （現在はシーケンスから時間を読み込みます）
 */
function setNextSequenceTimer() {
    const nextMinutes = pomodoroSequence[currentSequenceIndex];
    setTimer(nextMinutes); 


    // ★ ここを追加・修正 ★
    currentSequenceIndex = (currentSequenceIndex + 1) % pomodoroSequence.length; // 次のシーケンスへ
    console.log(`次のタイマーは ${nextMinutes} 分に設定されました。現在のシーケンスインデックス: ${currentSequenceIndex}`);
    // ★ ここまで追加・修正 ★
    
    // ここはまだ自動開始ではないので、alertの後、ユーザーが操作するまで待機状態
    // 最終的には、アラートなしで自動的に次のタイマーが開始されるようにする
    // alertは一時的に残します。
}

// ページロード時（または初期化時）に最初のタイマーを設定
setNextSequenceTimer();