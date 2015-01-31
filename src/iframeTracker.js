/**
* Track clicks on iframe
* @file iframeTracker
* @author Sonu K. Meena [sonukr666@gmail.com]
*	@example
* // return iFrameTracker Object
* track = new iFrameTracker( iframeWrapperElm, callback );
* track.start(arg1, arg2); // start tracking
* track.stop(); //stop tracking
*/

(function (window) {
	'use strict';

/**
* Abstraction to handle browser compatibility
*/
	var EventUtil = {
		addEvent: function (element, event, callback) {
			if (element.attachEvent) {
				element.attachEvent("on" + event, callback);
			} else {
				element.addEventListener(event, callback);
			}
		},
		removeEvent: function (element, event, callback) {
			if (this.attachEvent) {
				element.detachEvent("on" + event, callback);
			} else {
				element.removeEventListener(event, callback);
			}
		}
	};

	/**
	* @constructor
	*
	*	@param {Object} iframeWrapper - iframe wrapper Element.
	* @param {function} callback - callback function to call on click
	* @returns {Object} - iFrameTracker object
	*/
	var iFrameTracker = function (iframeWrapper, callback) {
		this.iframeWrapper = iframeWrapper;
		this.callback = callback;

		if (arguments.length < 2) {
			throw "wrong number of arguments"
		}

		if (typeof iframeWrapper !== "object" || typeof callback !== "function") {
			throw "Not a valid argument";
		}
		return this;

	};

	/**
	* Start tracker to begin tracking for click event
	*
	* @param {*} [] - arguments to pass to callback function, if any
	*	@returns {Object} - iFrameTracker object
	*/

	iFrameTracker.prototype.start = function () {
		this.mouseOver = false;
		var that = this;
		var args = Array.prototype.slice.call(arguments);

		var iframeWrapper = this.iframeWrapper;

		this.onMouseOver_fn = function () {
			that.mouseOver = true;
		}
		this.onMouseOut_fn = function () {
			that.mouseOver = false;
		}
		this.clickListener_fn = function () {
			if (that.mouseOver) {
				that.callback.apply(this, args);
			}
		}

		EventUtil.addEvent(this.iframeWrapper, "mouseover", this.onMouseOver_fn);
		EventUtil.addEvent(this.iframeWrapper, "mouseout", this.onMouseOut_fn);
		EventUtil.addEvent(window, "blur", this.clickListener_fn);

		return this;
	}

/**
* Stop tracking clicks on iframe
*
*/
	iFrameTracker.prototype.stop = function () {
		//no memory leak
		EventUtil.removeEvent(window, "blur", this.clickListener_fn);
		EventUtil.removeEvent(this.iframeWrapper, "mouseover", this.onMouseOver_fn);
		EventUtil.removeEvent(this.iframeWrapper, "mouseout", this.onMouseOut_fn);
		return this;
	}

	// AMD
	if (typeof window.define === "function") {
		window.define("iFrameTracker", [], function () {
			return Tracker;
		});
		// CommonJS
	} else if (typeof module !== "undefined" && module.exports !== undefined) {
		module.exports = iFrameTracker;
		// Browser
	} else if (typeof window.iFrameTracker !== "function") {
		window.iFrameTracker = iFrameTracker;
	}

}(this));
