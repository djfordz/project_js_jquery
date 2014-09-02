// initialize script
function clone() {

// Set global variables
    var canvas = document.getElementById('canvas'), innerCanvas = document.getElementById('innerCanvas'),initialBlock = document.createElement('div'), log = document.getElementById('log');

// build initial block
    innerCanvas.appendChild(initialBlock);
    initialBlock.setAttribute('class', 'block');
    initialBlock.setAttribute('id', '0');

// set initial width of #innerCanvas
    innerCanvas.style.width = innerCanvasWidth(64);

// Set area of #innerCanvas
    function innerCanvasArea() {
        var total = parseInt(innerCanvas.style.width) * 2;
        return total;
    }

// Set total blocks
     function totalBlocks() {
        var totalBlocks = innerCanvas.childNodes.length ;
        return totalBlocks + 1;
    }

// populate blocks
    while(totalBlocks() <= innerCanvasArea()) {
        var block = initialBlock.cloneNode(true);
        innerCanvas.appendChild(block)
     
    }

// set attribute #id to all blocks populated above in order from 0
        for(var i = 1, l = innerCanvas.childNodes.length - 1; i <= l; i++) {
            document.getElementsByClassName('block')[i].setAttribute('id', i)
        }

// change color property to camelCase to use in Javascript if needed and to ensure cross-browser integration with Microsoft IE.  copied from: http://www.sophox.com/wordpress/?p=764
    function hyphen2camel (str) {
        return str.replace(/\-(.)/g, function (m, c) { 
        return c.toUpperCase();
        } );
    }

// Method to pull the CSS Property from an external stylesheet.
// Modified code to include identifying and element by class as well as id.  Original code copied from: http://www.sophox.com/wordpress/?p=759.
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

// compute #canvas width
    function canvasWidth() {
         var canvasWidth = computeStyle('canvas', 'width');
        canvasWidth = parseInt(canvasWidth);
        return canvasWidth;
    }

// compute block width
    function blockWidth() {
        var blockWidth = computeStyle('block', 'width');
        blockWidth = parseInt(blockWidth);
        return blockWidth;
    }

//compute number of blocks in #innerCanvas
    function innerCanvasWidth(width) {
        var innerCanvasWidth = width;
        var numBlocks = innerCanvasWidth * blockWidth();
        return numBlocks + 'px'
    }

// log which block the mouse pointer is hovering over
     function position(pos) {
        log.innerHTML = pos
    }

// create onmouseover method
    canvas.onmouseover = function(x) {
        // get block type mouse is over
        var blockType = x.target;
        //get block #id mouse is over
        var pos = x.target.id;
        // change background color to red of block mouse is over
       if(document.getElementById(pos).hasAttribute('class')) {
            blockType.style.backgroundColor = 'red'
        }
        // call position function to log block mouse is coloring
        position(pos)
    }

// reset #innerCanvas
    function reset() {
        var button = document.getElementById('reset');
        button.onclick = function() {
            // cycle through blocks resetting background color to white.
             for(var i = 0, l = innerCanvas.childNodes.length - 1; i <= l; i++) {
                var block = document.getElementsByClassName('block')[i];
                if(block.hasAttribute('class')) {
                block.style.backgroundColor = 'white';
                }
            }
            // prompt for width of #innerCanvas
            var width = prompt("Enter width of canvas in number of squares");
             innerCanvas.style.width = innerCanvasWidth(width);
        }
    }
// call reset function
    reset();

};
