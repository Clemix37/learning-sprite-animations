const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//Set the width & height of the canvas to match the viewport dimensions
canvas.width = innerWidth;
canvas.height = innerHeight;
//Get access to the sprite sheet
const subZeroSpriteSheet = new Image();
subZeroSpriteSheet.src = "https://archive.org/download/subZeroSpriteSheet/subZeroSpriteSheet.png";
subZeroSpriteSheet.onload = loadImages;
//There are 7 different sprites on 2 rows
let cols = 7;
let rows = 2;
//Work out the size of individual sprites because they are evenly spaced apart
let spriteWidth = subZeroSpriteSheet.width / cols;
let spriteHeight = subZeroSpriteSheet.height / rows;
//So increased image size can still retain its pixel art style
ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
//So the animation can play
let totalFrames = 7; //Because there are 7 sprites in total. Therefore the animation will take place over 7 frames
let currentFrame = 0;
//So the source position can be updated
let srcX = 0;
let srcY = 0;
//Record the number of times the 'animate' function has been called
let framesDrawn = 0;

const draw = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height); // So the contents of the previous frame can be cleared
    requestAnimationFrame(draw); //The function will be called repeatedly on each new frame

    currentFrame = currentFrame % totalFrames; //Work out the current frame of the animation. Remember that 0 counts as the first image of the animation.
    srcX = currentFrame * spriteWidth; //Src position is updated to show the new sprite image

    //image, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight
    ctx.save();
    resizeImage();
    ctx.drawImage(subZeroSpriteSheet, srcX, srcY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    ctx.restore();

    framesDrawn++;
    if(framesDrawn >= 10){
        currentFrame++;
        framesDrawn = 0;
    }
};

function resizeImage() {
    let scaleFactor = 4;
    let midXPos = innerWidth / 2 - (spriteWidth * scaleFactor) / 2;
    let midYPos = innerHeight / 2 - (spriteHeight * scaleFactor) / 2;
    ctx.translate(midXPos, midYPos);
    ctx.scale(scaleFactor, scaleFactor);
}

addEventListener("keydown", e => {
    if(e.key === "ArrowLeft"){
        srcY = 1 * spriteHeight;
    }
});

addEventListener("keydown", e => {
    if(e.key === "ArrowRight"){
        srcY = 0 * spriteHeight;
    }
})

//So the canvas can't be rendered before the image
let numOfImages = 1;
function loadImages() {
    if(--numOfImages > 0) return;
    draw();
}