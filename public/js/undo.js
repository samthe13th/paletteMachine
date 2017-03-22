(function (window) {
    function UndoManager() {
        var UM = {
            stack: [],
            depth: 10,
            pos: 0,
            pushToStack: function (redofn, undofn) {
                if (this.stack.length <= this.depth) {
                    this.stack.push({
                        redofn: redofn,
                        undofn: undofn
                    })
                } else {
                    console.log("stack full");
                }
            },
            undo: function () {
                if (this.pos < this.stack.length) {
                    this.stack[this.pos].undofn();
                    this.pos++;
                }
            },
            redo: function () {
                if (this.pos > 0) {
                    this.stack[this.pos].redofn();
                    this.pos--;
                }
            }
        };
        return UM;
    }
    if (typeof (UM) === 'undefined') {
        window.UM = UndoManager();
    }
})(window);