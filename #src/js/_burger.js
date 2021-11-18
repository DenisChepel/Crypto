/*BURGER MENU*/

///Initiation Variables
let icon = document.getElementById("b");
let topLine = document.getElementById("top-line");
let middleLine = document.getElementById("middle-line");
let bottomLine = document.getElementById("bottom-line");
let navMenu = document.querySelector('.navigation_wrap_mob')
let state = "menu";  // can be "menu" or "arrow"
let topLineY;
let middleLineY;
let bottomLineY;
let arrowLegY;
let arrowPointY;
let hideawayLinesOpacity;

///Animation letiables
let segmentDuration = 25;
let menuDisappearDurationInFrames = segmentDuration;
let arrowAppearDurationInFrames = segmentDuration;
let menuAppearDurationInFrames = segmentDuration*1.5;
let fadeInDurationInFrames = segmentDuration;
let menuDisappearComplete = false;
let arrowAppearComplete = false;
let menuAppearComplete = true;
let currentFrame = 1;

///Collapse
function menuDisappearAnimation() {
    currentFrame++;
    if ( currentFrame <= menuDisappearDurationInFrames ) {
        window.requestAnimationFrame( ()=> {
            //top line
            topLineY = AJS.easeInOutBack( 37, 63, menuDisappearDurationInFrames, currentFrame );
            topLine.setAttribute( "points", "30 "+topLineY+" 50 "+topLineY+" 70 "+topLineY );
            //middle line
            middleLineY = AJS.easeInOutBack( 50, 63, menuDisappearDurationInFrames, currentFrame );
            middleLine.setAttribute( "d", "M30,"+middleLineY+" L70,"+middleLineY );
            if ( middleLineY >= 63) middleLine.style.opacity = "0";
            //bottom line
            if ( middleLineY >= 63) bottomLine.style.opacity = "0";
            //recursion
            menuDisappearAnimation();
        });
    } else {
        bottomLine.style.opacity = "0";
        currentFrame = 1;
        menuDisappearComplete = true;
        openMenuAnimation();
    }
}

///Arrow Appear
function arrowAppearAnimation() {
    currentFrame++;
    if ( currentFrame <= arrowAppearDurationInFrames ) {
        window.requestAnimationFrame( ()=> {
            //arrow
            arrowLegY = AJS.easeOutBack( 63, 60, arrowAppearDurationInFrames, currentFrame );
            arrowPointY = AJS.easeOutBack( 63, 40, arrowAppearDurationInFrames, currentFrame );
            topLine.setAttribute("points", "30 "+arrowLegY+" 50 "+arrowPointY+" 70 "+arrowLegY);
            //recursion
            arrowAppearAnimation();
        });
    } else {
        currentFrame = 1;
        arrowAppearComplete = true;
        menuAppearComplete = false;
        openMenuAnimation();
    }
}

///Combined Open Menu Animation
function openMenuAnimation() {
    if ( !menuDisappearComplete ) {
        menuDisappearAnimation();
    } else if ( !arrowAppearComplete) {
        arrowAppearAnimation();
    }
}

///Menu Return
function menuAppearAnimation() {
    currentFrame++;
    if ( currentFrame <= menuAppearDurationInFrames ) {
        window.requestAnimationFrame( ()=> {
            //arrow to top line
            arrowLegY = AJS.easeOutBounce( 60, 37, menuAppearDurationInFrames, currentFrame );
            arrowPointY = AJS.easeOutBounce( 40, 37, menuAppearDurationInFrames, currentFrame );
            topLine.setAttribute("points", "30 "+arrowLegY+" 50 "+arrowPointY+" 70 "+arrowLegY);
            //middle line
            middleLineY = AJS.easeOutBounce( 68, 50, menuAppearDurationInFrames, currentFrame );
            middleLine.setAttribute( "d", "M30,"+middleLineY+" L70,"+middleLineY );
            //bottom line
            bottomLineY = AJS.easeOutBounce( 68, 63, menuAppearDurationInFrames, currentFrame );
            bottomLine.setAttribute( "d", "M30,"+bottomLineY+" L70,"+bottomLineY );
            //middle and bottom lines opacity
            hideawayLinesOpacity = AJS.linear( 0, 1, fadeInDurationInFrames, currentFrame );
            middleLine.style.opacity = hideawayLinesOpacity;
            bottomLine.style.opacity = hideawayLinesOpacity;
            //recursion
            menuAppearAnimation();
        });
    } else {
        currentFrame = 1;
        menuDisappearComplete = false;
        arrowAppearComplete = false;
        menuAppearComplete = true;
    }
}

///Close Menu Animation
function closeMenuAnimation() {
    if ( !menuAppearComplete ) {
        menuAppearAnimation();
    }
}

///Events
icon.addEventListener( "click", ()=> {
    if ( state === "menu" ) {
        navMenu.classList.add('open_nav')
        openMenuAnimation();
        state = "arrow"
    } else if ( state === "arrow" ) {
        navMenu.classList.remove('open_nav')
        closeMenuAnimation();
        state = "menu"
    }
});

/*BURGER MENU*/
