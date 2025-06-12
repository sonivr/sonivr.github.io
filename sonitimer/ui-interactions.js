// ui-interactions.js

// 画面上部の4枚の葉っぱ
const smallLeaves = document.querySelectorAll('.small-leaf');
smallLeaves.forEach(leaf => {
    leaf.addEventListener('click', (event) => {
        console.log(`${event.target.id} がタップされました。`);
        let minutesToSet;
        // 葉っぱのIDに基づいて時間を設定
        switch (event.target.id) {
            case 'leaf1':
                minutesToSet = 5; // 例: 一番左の葉っぱは5分
                break;
            case 'leaf2':
                minutesToSet = 10; // 例: 10分
                break;
            case 'leaf3':
                minutesToSet = 15; // 例: 15分
                break;
            case 'leaf4':
                minutesToSet = 25; // 例: 一番右の葉っぱは25分（ポモドーロの標準時間）
                break;
            default:
                minutesToSet = 0;
        }
        if (minutesToSet > 0) {
            // timer.jsで定義されたsetTimer関数を呼び出す
            // (timer.jsが先に読み込まれていることを前提とします)
           setTimer(minutesToSet); 
            // しずくが落ちる簡易アニメーション
            const largeLeaf = document.getElementById('large-leaf');
            const droplet = document.createElement('div');
            droplet.classList.add('temp-droplet');
            largeLeaf.appendChild(droplet);
            droplet.addEventListener('animationend', () => {
                droplet.remove();
            });
            playShortSound(); // ★ ここを追加：葉っぱクリック時に短い効果音を鳴らす
        }
    });
});


// ハチドリ
const hummingbird = document.getElementById('hummingbird');
let hummingbirdTapCount = 0;
hummingbird.addEventListener('click', () => {
    hummingbirdTapCount++;
    console.log(`ハチドリが ${hummingbirdTapCount} 回タップされました。`);
    playShortSound(); // ★ ここを追加：ハチドリクリック時に短い効果音を鳴らす
    // 音量設定ロジックは後で実装（タップ回数に応じる）
});

let hummingbirdPressTimer;
hummingbird.addEventListener('mousedown', () => {
    hummingbirdPressTimer = setTimeout(() => {
        console.log("ハチドリが長押しされました（さえずり、BGM再生）");
        playBackgroundMusic(); // ★ ここを追加：ハチドリ長押し時にBGMを再生
    }, 1000);
});
hummingbird.addEventListener('mouseup', () => {
    clearTimeout(hummingbirdPressTimer);
    stopBackgroundMusic(); // ★ ここを追加：ハチドリ長押し解除時にBGMを停止
});
hummingbird.addEventListener('mouseleave', () => {
    clearTimeout(hummingbirdPressTimer);
    stopBackgroundMusic(); // ★ ここを追加：マウスが要素から離れたらBGMを停止
});

// 大きめの葉っぱの左右、筒のくびれのクリックイベント
largeLeafLeft.addEventListener('click', () => {
    console.log("大きめの葉っぱの左側が押されました（地面に零れ落ちる）");
    resetTimer(); 
    setNextSequenceTimer(); // ★ ここを変更：リセット後に次のシーケンスタイマーを設定
    playShortSound(); // ★ ここを追加
});

largeLeafRight.addEventListener('click', () => {
    console.log("大きめの葉っぱの右側が押されました（しずくが筒に落ちる）");
    startTimer(); 
    playShortSound(); // ★ ここを追加
});

tubeNeckArea.addEventListener('click', () => {
    console.log("筒のくびれ部分が押されました（しずくが落ちる）");
    startTimer(); 
    playShortSound(); // ★ ここを追加
});


// 地面の要素 (既存コードはそのまま)
const feather = document.getElementById('feather');
const pebble = document.getElementById('pebble');
const sprout = document.getElementById('sprout');

feather.addEventListener('click', () => {
    console.log("羽が押されました（音声設定）");
});

pebble.addEventListener('click', () => {
    console.log("小石が押されました（残り時間表示トグル）");
});

sprout.addEventListener('click', () => {
    console.log("芽が押されました（時間数・色合い変化設定）");
});