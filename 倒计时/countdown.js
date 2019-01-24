var WINDOW_WIDTH = 1200;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 80;
var MARGIN_LEFT = 50;
var endTime = new Date(2019, 0, 17, 12, 30, 50);
var balls = [];
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]
var CurrentShowTimeSeconds = getCurrentShowTimeSeconds();
window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    setInterval(function () {
        update()
        render(context);
    }, 50)
}

function update() {
    var nextShowTimeSecond = getCurrentShowTimeSeconds();
    var nextHours = parseInt(nextShowTimeSecond / 3600);
    var nextminutes = parseInt((nextShowTimeSecond - nextHours * 3600) / 60);
    var nextseconds = parseInt(nextShowTimeSecond - nextHours * 3600 - nextminutes * 60);
    var hours = parseInt(CurrentShowTimeSeconds / 3600);
    var minutes = parseInt((CurrentShowTimeSeconds - hours * 3600) / 60);
    var seconds = parseInt(CurrentShowTimeSeconds - hours * 3600 - minutes * 60);
    if (nextseconds != seconds) {
        CurrentShowTimeSeconds = nextShowTimeSecond;
        // 如果监测到数字有发生变化，则添加一组数据到数组中
        if (parseInt(hours / 10) != parseInt(nextHours / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(nextHours / 10));
        }
        if (parseInt(hours % 10) != parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(nextHours % 10));
        }
        if (parseInt(minutes / 10) != parseInt(nextminutes / 10)) {
            addBalls(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, parseInt(nextminutes / 10));
        }
        if (parseInt(minutes % 10) != parseInt(nextminutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(nextminutes % 10));
        }
        if (parseInt(seconds / 10) != parseInt(nextseconds / 10)) {
            addBalls(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, parseInt(nextseconds / 10));
        }
        if (parseInt(seconds % 10) != parseInt(nextseconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextseconds % 10));
        }
    }
}

function updateBalls() {

    for (var i = 0; i < balls.length; i++) {

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        }
    }
    balls = balls.filter(function (ball, index) {
        return ball.x + RADIUS > 0 && ball.x - RADIUS < WINDOW_WIDTH
    })
    console.log(balls.length)
}

function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + (2 * j + 1) * (RADIUS),
                    y: y + (2 * i + 1) * (RADIUS),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: 5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                balls.push(aBall);
            }
        }
    }
}

function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round(ret / 1000);
    return ret > 0 ? ret : 0;
}

function render(ctx) {
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    var hours = parseInt(CurrentShowTimeSeconds / 3600);
    var minutes = parseInt((CurrentShowTimeSeconds - hours * 3600) / 60);
    var seconds = parseInt(CurrentShowTimeSeconds - hours * 3600 - minutes * 60);
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx);
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ctx);
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ctx);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ctx);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), ctx);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), ctx);
    for (var i = 0; i < balls.length; i++) {
        ctx.fillStyle = balls[i].color;

        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
        ctx.closePath();

        ctx.fill();
    }
    updateBalls();

}

function renderDigit(x, y, num, ctx) {
    ctx.fillStyle = "rgb(0,102,153)";
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                ctx.beginPath();
                ctx.arc(x + (2 * j + 1) * (RADIUS), y + (2 * i + 1) * (RADIUS), RADIUS, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}