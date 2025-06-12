// ui-interactions.js

// 画面上部の4枚の葉っぱ
const smallLeaves = document.querySelectorAll('.small-leaf');
smallLeaves.forEach(leaf => {
    leaf.addEventListener('click', (event) => {
        console.log(`${event.target.id} がタップされました。`);
        // 後でタイマー設定ロジックを追加
    });
});

// ハチドリ
const hummingbird = document.getElementById('hummingbird');
let hummingbirdTapCount = 0;
hummingbird.addEventListener('click', () => {
    hummingbirdTapCount++;
    console.log(`ハチドリが ${hummingbirdTapCount} 回タップされました。`);
    // 後で音符の落下と音量設定ロジックを追加
});
// ハチドリの長押しイベント（簡易的な実装）
let hummingbirdPressTimer;
hummingbird.addEventListener('mousedown', () => {
    hummingbirdPressTimer = setTimeout(() => {
        console.log("ハチドリが長押しされました（さえずり、BGM再生）");
        // 後でBGM再生ロジックを追加
    }, 1000); // 1秒長押しで発動
});
hummingbird.addEventListener('mouseup', () => {
    clearTimeout(hummingbirdPressTimer);
});
hummingbird.addEventListener('mouseleave', () => { // マウスが要素から離れたらリセット
    clearTimeout(hummingbirdPressTimer);
});

// 大きめの葉っぱの左右領域
const largeLeafLeft = document.getElementById('large-leaf-left-area');
const largeLeafRight = document.getElementById('large-leaf-right-area');

largeLeafLeft.addEventListener('click', () => {
    console.log("大きめの葉っぱの左側が押されました（地面に零れ落ちる）");
    // 後でしずくの再設定ロジックを追加
});

largeLeafRight.addEventListener('click', () => {
    console.log("大きめの葉っぱの右側が押されました（しずくが筒に落ちる）");
    // 後でしずくの筒へのスタックロジックを追加
});

// 筒のくびれ部分
const tubeNeckArea = document.getElementById('tube-neck-area');
tubeNeckArea.addEventListener('click', () => {
    console.log("筒のくびれ部分が押されました（しずくが落ちる）");
    // 後でタイマー開始トリガーロジックを追加
});

// 地面の要素
const feather = document.getElementById('feather');
const pebble = document.getElementById('pebble');
const sprout = document.getElementById('sprout');

feather.addEventListener('click', () => {
    console.log("羽が押されました（音声設定）");
    // 後で音声設定モーダル表示ロジックを追加
});

pebble.addEventListener('click', () => {
    console.log("小石が押されました（残り時間表示トグル）");
    // 後で残り時間表示トグルロジックを追加
});

sprout.addEventListener('click', () => {
    console.log("芽が押されました（時間数・色合い変化設定）");
    // 後で設定モーダル表示ロジックを追加
});