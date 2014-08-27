function clone() {
    var canvas = document.getElementById('canvas'), innerCanvas = document.getElementById('innerCanvas'),initialBlock = document.createElement('div'), log = document.getElementById('log');
    innerCanvas.appendChild(initialBlock);
    initialBlock.setAttribute('class', 'block');
    initialBlock.setAttribute('id', '0');
  //  innerCanvas.setAttribute('width', '960');
    var total = window.innerHeight * 3;

     function totalBlocks() {
        var totalBlocks = innerCanvas.childNodes.length;
        return totalBlocks;
    }

    while(totalBlocks() <= total) {
        var block = initialBlock.cloneNode(true);
        innerCanvas.appendChild(block)
     
    }
        for(var i = 1, l = innerCanvas.childNodes.length - 1; i <= l; i++) {
            document.getElementsByClassName('block')[i].setAttribute('id', i)
        }

    function hyphen2camel (str) {
        return str.replace(/\-(.)/g, function (m, c) { 
        return c.toUpperCase();
        } );
    }
    function computeStyle(el, property) {
        var computedStyle, val = false
        if(document.getElementById(el) && window.getComputedStyle) {
            var element = document.getElementById(el);
            var computedStyle = window.getComputedStyle(element);
            val = computedStyle.getPropertyValue(property);
        }
        else if(document.getElementsByClassName(el)[0] && window.getComputedStyle) {
            var element = document.getElementsByClassName(el)[0];
            var computedStyle = window.getComputedStyle(element);
            val = computedStyle.getPropertyValue(property);
        }
        else if(document.getElementById(el) && el.currentStyle) {
            property = hyphen2camel(property);
            val = el.currentStyle(property)
        }
        else if(document.getElementsByClassName(el)[0] && el.currentStyle) {
            property = hyphen2camel(property);
            val = el.currentStyle(property)
        }
       return val;
    }
    function canvasWidth() {
         var canvasWidth = computeStyle('canvas', 'width');
        canvasWidth = parseInt(fillDivWidth);
        return canvasWidth;
    }

    function blockWidth() {
        var blockWidth = computeStyle('block', 'width');
        blockWidth = parseInt(blockWidth);
        return blockWidth;
    }
    function innerCanvasWidth(width) {
        var innerCanvasWidth = width;
        var numBlocks = innerCanvasWidth * blockWidth();
        return numBlocks + 'px'
    }
     function position(pos) {
        log.innerHTML = pos
    }

    canvas.onmouseover = function(x) {
        var blockType = x.target;
        var pos = x.target.id;
       if(document.getElementById(pos).hasAttribute('class')) {
            blockType.style.backgroundColor = 'red'
        }
        position(pos)
    }

    function reset() {
        var button = document.getElementById('reset');
        button.onclick = function() {
             for(var i = 0, l = innerCanvas.childNodes.length - 1; i <= l; i++) {
                var block = document.getElementsByClassName('block')[i];
                if(block.hasAttribute('class')) {
                block.style.backgroundColor = 'white';
                }
            }
            var width = prompt("Enter width of canvas in number of squares");
             innerCanvas.style.width = innerCanvasWidth(width);
             position(innerCanvas.style.width)
        }
    }
    reset();

};