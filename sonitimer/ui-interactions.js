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
                minutesToSet = 5;
                break;
            case 'leaf2':
                minutesToSet = 10;
                break;
            case 'leaf3':
                minutesToSet = 15;
                break;
            case 'leaf4':
                minutesToSet = 25;
                break;
            default:
                minutesToSet = 0;
        }
        if (minutesToSet > 0) {
            setTimer(minutesToSet); 
            const largeLeaf = document.getElementById('large-leaf');
            const droplet = document.createElement('div');
            droplet.classList.add('temp-droplet');
            largeLeaf.appendChild(droplet);
            droplet.addEventListener('animationend', () => {
                droplet.remove();
            });
            playShortSound();
        }
    });
});

// ハチドリ
const hummingbird = document.getElementById('hummingbird');
let hummingbirdTapCount = 0;
hummingbird.addEventListener('click', () => {
    hummingbirdTapCount++;
    console.log(`ハチドリが ${hummingbirdTapCount} 回タップされました。`);
    playShortSound();
});

let hummingbirdPressTimer;
hummingbird.addEventListener('mousedown', () => {
    hummingbirdPressTimer = setTimeout(() => {
        console.log("ハチドリが長押しされました（さえずり、BGM再生）");
        playBackgroundMusic();
    }, 1000);
});
hummingbird.addEventListener('mouseup', () => {
    clearTimeout(hummingbirdPressTimer);
    stopBackgroundMusic();
});
hummingbird.addEventListener('mouseleave', () => {
    clearTimeout(hummingbirdPressTimer);
    stopBackgroundMusic();
});

// ★★★ ここから修正/追加 ★★★
// 大きめの葉っぱの左右領域
const largeLeafLeft = document.getElementById('large-leaf-left-area');
const largeLeafRight = document.getElementById('large-leaf-right-area');
// 筒のくびれ部分
const tubeNeckArea = document.getElementById('tube-neck-area');

// 地面の要素
const feather = document.getElementById('feather');
const pebble = document.getElementById('pebble');
const sprout = document.getElementById('sprout');
// ★★★ ここまで修正/追加 ★★★


largeLeafLeft.addEventListener('click', () => {
    console.log("大きめの葉っぱの左側が押されました（地面に零れ落ちる）");
    resetTimer(); 
    setNextSequenceTimer();
    playShortSound();
});

largeLeafRight.addEventListener('click', () => {
    console.log("大きめの葉っぱの右側が押されました（しずくが筒に落ちる）");
    startTimer(); 
    playShortSound();
});

tubeNeckArea.addEventListener('click', () => {
    console.log("筒のくびれ部分が押されました（しずくが落ちる）");
    startTimer(); 
    playShortSound();
});

feather.addEventListener('click', () => {
    console.log("羽が押されました（音声設定）");
});

pebble.addEventListener('click', () => {
    console.log("小石が押されました（残り時間表示トグル）");
});

sprout.addEventListener('click', () => {
    console.log("芽が押されました（時間数・色合い変化設定）");
});