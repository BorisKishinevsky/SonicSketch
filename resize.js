$(function () {
    resizeWindow();
});

// Fix aspect ratio of the stage
$(window).resize(function () {
    resizeWindow();
});

// Resize the window
function resizeWindow() {
    var aspectRatio = 3/2;
    // Get window width and height
    var w = $(window).width();
    var h = $(window).height();
    
	console.log(w,h);
    // If the aspect ratio is greater than or equal to 4:3, fix height and set width based on height
    if ((w / h) >= aspectRatio) {
        stageHeight = h;
        stageWidth = (aspectRatio) * h;
        stageLeft = (w - stageWidth) / 2;
        stageTop = 0;
        coverTop = 0;
        coverBottom = 0;
        coverLeft = stageLeft;
        coverRight = stageLeft;
    }
    // If the aspect ratio is less than 4:3, fix width and set height based on width
    else {
        stageWidth = w;
        stageHeight = (1/aspectRatio) * w;
        stageTop = (h - stageHeight) / 2;
        stageLeft = 0;
        coverTop = stageTop;
        coverBottom = stageTop;
        coverLeft = 0;
        coverRight = 0;
    }

    // Set "screen" object width and height to stageWidth and stageHeight, and center screen
    stageTop=0; //never vertically align
	$(".screen").css({
        width: stageWidth + "px",
        height: stageHeight + "px",
        left: stageLeft + "px",
        top: stageTop + "px"
    });

 
    $("html").css("font-size", (stageHeight / 60) + "px");

}