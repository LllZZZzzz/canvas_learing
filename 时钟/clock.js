// 先画一个圆
var dom = document.getElementById("clock");
var ctx = dom.getContext('2d');
var width = dom.width;
var height = dom.height;
var r = width / 2;

function drawBackground() {
    ctx.save();
    ctx.lineWidth = 10;
    // 变化零点位置
    ctx.translate(r, r);
    ctx.beginPath();
    ctx.arc(0, 0, r - 5, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.stroke();
    // 添上数字
    var num = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    ctx.font = '18px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    num.forEach(function (num, index) {
        var rad = 2 * Math.PI / 12 * index;
        // 计算数字的坐标
        var x = Math.cos(rad) * (r - 30);
        var y = Math.sin(rad) * (r - 30);
        ctx.fillText(num, x, y);
    })
    // 量程的点
    for (var i = 0; i < 60; i++) {
        var rad = 2 * Math.PI / 60 * i;
        var x = Math.cos(rad) * (r - 15);
        var y = Math.sin(rad) * (r - 15);
        ctx.beginPath();
        if (i % 5 == 0) {
            ctx.fillStyle = "#000";
            ctx.arc(x, y, 2, 0, 2 * Math.PI, true);
        } else {
            ctx.fillStyle = '#ccc'
            ctx.arc(x, y, 2, 0, 2 * Math.PI, true);
        }
        ctx.closePath();
        ctx.fill();
    }
}
// 时分秒针
function drawHour(hour, minute) {
    // 在创建新的画布之前，将原来的画布进行保存
    ctx.save();
    ctx.beginPath();
    var hourrad = 2 * Math.PI / 12 * hour;
    var minrad = 2 * Math.PI / 12 / 60 * minute;
    var rad = hourrad + minrad;
    // 创建新的旋转后的画布，并进行新的绘制
    ctx.rotate(rad);
    ctx.lineWidth = 5;
    ctx.lineCap="round";
    ctx.moveTo(0, 10);
    ctx.lineTo(0, -r / 2);
    ctx.stroke();
    // 新的画布的内容绘制完毕后将画布还原
    ctx.restore();
}

function drawMinute(minute, second) {
    // 在创建新的画布之前，将原来的画布进行保存
    ctx.save();
    ctx.beginPath();
    var minrad = 2 * Math.PI / 60 * minute;
    var secrad = 2 * Math.PI / 3600 * second;
    var rad = minrad + secrad;
    ctx.rotate(rad);
    ctx.lineWidth = 3;
    ctx.lineCap="round";
    ctx.moveTo(0, 10);
    ctx.lineTo(0, -r + 25);
    ctx.stroke();
    // 新的画布的内容绘制完毕后将画布还原
    ctx.restore();
}

function drawSecond(second) {
    // 在创建新的画布之前，将原来的画布进行保存
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 60 * second;
    ctx.rotate(rad);
    ctx.lineWidth = 1;
    ctx.moveTo(-2, 10);
    ctx.lineTo(0, -r + 15);
    ctx.lineTo(2, 10);
    ctx.lineTo(-2, 10);
    ctx.fillStyle = "#c14543";
    ctx.fill();

    // 新的画布的内容绘制完毕后将画布还原
    ctx.restore();
}

function drawDot() {
    ctx.beginPath()
    ctx.fillStyle = '#ccc'
    ctx.arc(0, 0, 2, 0, 2 * Math.PI, true);
    ctx.fill();
}

function draw() {
    //恢复零点位置
    ctx.clearRect(0, 0, width, height);
    drawBackground();
    var time = new Date();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    drawHour(hour, minute);
    drawMinute(minute, second);
    drawSecond(second);
    drawDot();
    ctx.restore();
}
// 让时钟动起来
setInterval(draw, 998);
