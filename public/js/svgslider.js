var $_dragging = { o: null, id: null };
var Slider = function (stage, x, y, l, m, drag, up) {
    var bar, rtnSlider, label
    var sliderWidth = 10
    var sliderRoundness = 8;
    var step = m;
    bar = stage.rect(x, y, l, sliderWidth, sliderRoundness).attr({ fill: "white", opacity: 0.5, stroke: "none" });
    rtnSlider = stage.rect(x, y - (sliderWidth / 2), 10, 20).attr({ fill: "white", stroke: "grey" })
        .drag(
        drag,
        function () {
            $_dragging = { o: this };
            $("body").css("cursor", "pointer");
            rtnSlider.calcSliderX();
        }, function () {
            $_dragging = { o: null, id: null };
            $("body").css("cursor", "default");
            up();
        });
    rtnSlider.width = sliderWidth;
    rtnSlider.x = x;
    rtnSlider.stage = stage;
    rtnSlider.bar = bar;
    rtnSlider.xoffset = stage.canvas.parentNode.offsetLeft;
    rtnSlider.sliderX = x + rtnSlider.xoffset;
    rtnSlider.sliderY = y;
    rtnSlider.sliderLength = l;
    rtnSlider.sliderPoint = 0;
    rtnSlider.units = "";
    rtnSlider.label = stage.text(rtnSlider.sliderX, (rtnSlider.sliderY - 20), "").attr({ "font-size": 16, "fill": "black" });
    rtnSlider.setColor = function (c) {
        bar.attr({ fill: c });
    }
    rtnSlider.setstep = function (s) {
        rtnSlider.step = s;
    }
    rtnSlider.setLabel = function (l) {
        rtnSlider.label = stage.text(rtnSlider.sliderX, (rtnSlider.sliderY - 20), "0 " + l).attr({ "font-size": 16, "fill": "white" });
    }
    rtnSlider.hideSlider = function () {
        bar.hide();
        this.hide();
    }
    rtnSlider.setColor = function (c) {
        if (Array.isArray(c)) {
            var grad = "180"
            for (var color in c) {
                grad += "-" + c[color]
            }
            rtnSlider.bar.attr({ fill: grad });
        } else {
            rtnSlider.bar.attr({ fill: c });
        }
    }
    rtnSlider.setSlider = function (p) {
        var toPoint = p;
        if (p < 0) {
            toPoint = 0;
        } else if (p > rtnSlider.step) {
            toPoint = rtnSlider.step;
        }
        var SP = rtnSlider.sliderPoint;
        var dSP = toPoint - SP;
        var div = (rtnSlider.sliderLength - 10) / rtnSlider.step;
        rtnSlider.translate((dSP * div), 0);
        rtnSlider.sliderPoint = toPoint;
        if (rtnSlider.label) {
            rtnSlider.label.translate((toPoint * div), 0);
        }
    }
    rtnSlider.setAbsX = function (x) {
        var newx = x - rtnSlider._.dx - rtnSlider.xoffset;
        rtnSlider.translate(newx, 0);
        rtnSlider.label.translate(newx, 0);
    }
    rtnSlider.calcSliderX = function () {
        rtnSlider.xoffset = rtnSlider.stage.canvas.parentNode.offsetLeft;
        rtnSlider.sliderX = rtnSlider.xoffset;
    }
    rtnSlider.step = step;
    $(stage.canvas).mousemove(function (e) {
        var xdiff, moveTo, endPoint;
        var o = $_dragging.o;
        if ($_dragging.o !== null) {
            if (e.pageX <= o.sliderX + o.x) {
                o.setAbsX(o.sliderX);
            } else if (e.pageX >= (o.x + o.sliderX + o.sliderLength - o.width)) {
                o.setAbsX(o.sliderX + o.sliderLength - o.width)
            } else {
                o.setAbsX(e.pageX - o.x);
            }
            o.sliderPoint = Math.round((o.step * (o.xoffset + o._.dx - o.sliderX)) / (o.sliderLength - o.width));
        }
    })
    return rtnSlider;
}