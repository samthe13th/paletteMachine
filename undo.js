(function (window) {
    function UndoManager() {
        var UM = {
            stack: [],
            depth: 10,
            pos: 0,
            test: function(){
                console.log("test undo");
            },
            pushToStack: function (action, reverse) {
                if (this.stack.length <= this.depth) {
                    this.stack.push({
                        redofn: action,
                        undofn: reverse
                    })
                } else {
                    console.log("stack full");
                }
                this.pos++;
                console.log("stack: " + JSON.stringify(this.stack));
            },
            undo: function () {
                console.log("undo from pos " + this.pos);
                console.log(this.stack[this.pos].undofn);
                if (this.pos > 0) {
                    this.stack[this.pos].undofn();
                    this.pos--;
                }
            },
            redo: function () {
                console.log("redo");
                if (this.pos < this.stack.length) {
                    this.stack[this.pos].redofn();
                    this.pos++;
                }
            }
        };
        return UM;
    }
    if (typeof (UM) === 'undefined') {
        window.UM = UndoManager();
    }
})(window);