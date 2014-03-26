
function seesaw(angle) {
    var canvas, ctx;
    canvas = document.getElementById("cv");
    ctx = canvas.getContext("2d");
    ctx.lineWidth = "5";

    ctx.beginPath();
    ctx.moveTo(710 / 2, 10);
    ctx.lineTo(710 / 2, 585);

    ctx.moveTo(10, 595 / 2);
    ctx.lineTo(700, 595 / 2);

    ctx.moveTo(710 / 2, 10);
    ctx.lineTo(710 / 2 - 10, 40);
    ctx.moveTo(710 / 2, 10);
    ctx.lineTo(710 / 2 + 10, 40);

    ctx.moveTo(710 / 2, 585);
    ctx.lineTo(710 / 2 - 10, 545);
    ctx.moveTo(710 / 2, 585);
    ctx.lineTo(710 / 2 + 10, 545);

    ctx.moveTo(10, 595 / 2);
    ctx.lineTo(50, 595 / 2 - 10);
    ctx.moveTo(10, 595 / 2);
    ctx.lineTo(50, 595 / 2 + 10);

    ctx.moveTo(700, 595 / 2);
    ctx.lineTo(660, 595 / 2 - 10);
    ctx.moveTo(700, 595 / 2);
    ctx.lineTo(660, 595 / 2 + 10);
    ctx.closePath();
    //ctx.fill();
    ctx.stroke();
    ctx.save();


}

window.onload = function() {
    seesaw(0);
};