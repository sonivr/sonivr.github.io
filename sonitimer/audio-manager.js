// audio-manager.js

// 短い効果音用のAudioオブジェクト
const shortSound = new Audio('/sonitimer/sounds/tap_sound.mp3'); // 仮のパス。後で実際の音源に置き換える
const alertSound = new Audio('/sonitimer/sounds/alert_sound.mp3'); // タイマー終了時の音

// 背景音楽用のAudioオブジェクト
const backgroundMusic = new Audio('/sonitimer/sounds/background_music.mp3'); // 仮のパス
backgroundMusic.loop = true; // ループ再生を設定

/**
 * 短い効果音を再生する関数
 */
function playShortSound() {
    shortSound.currentTime = 0; // 再生位置を最初に戻す
    shortSound.play().catch(e => console.error("短い効果音の再生エラー:", e));
}

/**
 * タイマー終了時のアラート音を再生する関数
 */
function playAlertSound() {
    alertSound.currentTime = 0;
    alertSound.play().catch(e => console.error("アラート音の再生エラー:", e));
}

/**
 * 背景音楽を再生する関数
 */
function playBackgroundMusic() {
    backgroundMusic.play().catch(e => console.error("背景音楽の再生エラー:", e));
}

/**
 * 背景音楽を停止する関数
 */
function stopBackgroundMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0; // 最初に戻す
}

// ページロード時にユーザーの操作なしに音を再生しようとするとブラウザにブロックされる可能性があるため、
// 初期状態では音を再生しないようにしています。
// ユーザーが何らかの操作（タップなど）を行った後に、これらの関数を呼び出すようにします。