Snap.plugin(function (Snap, Element, Paper, glob) {
    Paper.prototype.multitext = function (xpos, ypos, width, txt) {
        var t = this.text(xpos, ypos, txt);
        var content = t.attr("text");
        var abc="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        t.attr({'text-anchor': 'start', "text": abc});
        var letterWidth=t.getBBox().width / abc.length;
        t.attr({"text": content});
        var words = content.split(" "), x=0, s=[];
        for ( var i = 0; i < words.length; i++) {
            var l = words[i].length;
            if(x+l>width) {
                s.push("\n")
                x=0;
            }
            else {
                x+=l*letterWidth;
            }
            s.push(words[i]+" ");
        }
        txt = s.join("").split("\n");
        t.remove();
        var t2 = this.text(xpos, ypos, txt);
        t2.selectAll("tspan:nth-child(n+2)").attr({
            dy: "1.2em",
            x: xpos
        });
        return t2;
    };
});
