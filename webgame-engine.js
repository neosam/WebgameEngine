WEcoreObject = new Object()
WEcoreObject.initFuncs = new Array();
WEcoreObject.mainloopCalls = new Array();
WEcoreObject.done = "";

function WEDelegate() {
    self.display = function(g) {};
    return self;
}

function WEQuit() {
    clearInterval(WEcoreObject.interval);
    WEcoreObject.done = true;
}

function WEInit2D(id, delegate) {
    WEcoreObject.initFuncs = new Array();
    WEcoreObject.mainloopCalls = new Array();
    var canvas = document.getElementById(id);
    WEcoreObject.graphicContext = canvas.getContext("2d");
    WEcoreObject.graphicContext.getPixel = function(x, y) {
        return WEcoreObject.graphicContext.getImageData(x, y, 1, 1).data;
    };
    WEInitCore(delegate);
    
}

function WEInitCore(delegate) {
    WEcoreObject.mainloopCalls = new Array();
    WEcoreObject.delegate = delegate;
    WEcoreObject.mainloopCalls.push(function() { 
        delegate.display(WEcoreObject.graphicContext); 
    });
    WEInit(33);
}

function WEGameloop() {
    for(var i in WEcoreObject.mainloopCalls)
        if (!WEcoreObject.done)
            WEcoreObject.mainloopCalls[i]();
}

function WEInit(fps) {
    WEcoreObject.done = false;
    for (var i in WEcoreObject.initFuncs)
        WEcoreObject.initFuncs[i]();
    WEcoreObject.interval = setInterval('WEGameloop()', fps);
}
