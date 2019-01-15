export var append = function (element, string) {
    var div = document.createElement('div');
    div.innerHTML = string;
    while (div.children.length > 0) {
        element.appendChild(div.children[0]);
    }
};
//# sourceMappingURL=lib.js.map