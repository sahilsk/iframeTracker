iFrameTracker: Track clicks on iframe( ads, social media buttons, etc)
=====================================

To  track clicks on iframe, it work using following two heuristics:

1. Mouse is over iframe wrapping element
2. Window blur event while mouse is over to signify an event.

>> Since it depend on 'mouseover', 'mouseout' event, it won't work on touch devices.

Build Instructions
-------

    $ npm install
    $ gulp --gulpfile gulpfile clean build

To generate jsdoc:

    $ gulp --gulpfile gulpfile jsdoc


How-to
--------

Find wrapper element to iframe

    var iWrp = document.getElementById("ID-OF-ELM");

Create a new callback

    var callback = function(a,b){ console.log( a+b ); }

Create a new tracker  

    var tracker = new iFrameTracker(iWrp, callback);

Finally, start tracker

    tracker.start(a,b);

Stop tracker

    tracker.stop();




API
------------------

### iFrameTracker#start(args)

Start tracking clicks on iframe

* args : arguments to pass to listener callback


    tracker.start(arg1, arg2);

### iFrameTracker#stop()

Remove all attached event listeners to avoid memory leaks;

    tracker.stop();


Maintained by
----------------------

Sonu K. Meena (Full Stack Developer )  
E-mail: sonukr666@gmail.com  
Web: http://sahilsk.github.io


License
-------------------

Licensed under the MIT license.  
Copyright (c) 2014 @sahilsk
