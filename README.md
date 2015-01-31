iFrameTracker: Track clicks on iframe( ads, social media buttons, etc)
=====================================

Since you can't listen to events occuring in iframe, this solution make use of two heuristic:

1. Mouse is over iframe wrapping element, and
2. Window blur event is fired while mouse is over.

It won't assure 100% that click has occurred over iframe because user can use browser shortcuts to close(alt+f4) or open new tab (ctrl+t), which will fire window 'blur' event while mouse is over the iframe wrapping element but click didn't happen. However, for other cases, it does the job.

> NOTE: Since it depend on mouse events('mouseover', 'mouseout') it won't work on touch devices.

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
