/*
 * Simulate click function (Youtube is nasty)
 * Script found on http://stackoverflow.com/questions/6157929/how-to-simulate-a-mouse-click-using-javascript/6158050#6158050
 */

function simulate(element, eventName) {
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;
    for (var name in eventMatchers){
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }
    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent){
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents'){
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        } else {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
            options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    } else {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}
function extend(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
}
var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
}

/*
 * This is where all the magic happends
 * Event handling
 */ 
const myapp = require('electron').app;
var remote = require('remote');
var globalShortcut = remote.require('global-shortcut');

//Unregister events (Fixes error if html is refreshed)
globalShortcut.unregisterAll();

//Unregister events on app close
myapp.on('quit', function() {
  console.log('Bye Bye');
  globalShortcut.unregisterAll();
});

//Register keyboard events
globalShortcut.register('MediaPlayPause', function() { 
	console.log('MediaPlayPause');
	simulate(document.getElementsByClassName("ytp-button ytp-play-button")[0], "click");
});

globalShortcut.register('MediaPreviousTrack', function() {
	var prevItem = document.getElementsByClassName("ytp-button ytp-prev-button");
	console.log('MediaPreviousTrack');
	if(prevItem.length > 0) {
		simulate(prevItem[0], "click");
	} else {
		alert('Nothing back...');
	}
});

globalShortcut.register('MediaNextTrack', function() {
  	console.log('MediaNextTrack');
  	var nextItem = document.getElementsByClassName("ytp-button ytp-next-button");
	if(nextItem.length > 0) {
		simulate(nextItem[0], "click");
	} else {
		alert('Nothing next...');
	}
});
