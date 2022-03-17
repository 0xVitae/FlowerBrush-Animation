//tell editor this is a html canvas project (loads 2d methods)
/** @type {HTMLCanvasElement} */
//set up canvas point to html canvas element
const canvas = document.getElementById('canvas1');
//2d art
const ctx = canvas.getContext('2d');
//cover browser window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;
ctx.lineWidth = 2;
ctx.globalCompositeOperation = 'lighten';

class Root {
    constructor(x, y){
        //x and y properties as arguments
        this.x = x;
        this.y = y;
        //initial growth points to current x and y coordinates
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        //root grow in all possible directions (circle) distance between equal positive and negative values
        this.maxSize = Math.random() * 7 + 5;
        this.size = Math.random() * 1 + 2;
        this.vs = Math.random() * 0.2 + 0.05;
        //velocity of size
        this.angleX = Math.random() * 6.2;
        this.vaX = Math.random() * 0.6 - 0.3;
        //velocity of angle
        this.angleY = Math.random() * 6.2;
        this.vaY = Math.random() * 0.6 - 0.3;
        this.lightness = 20;
    }
    update(){
        this.x += this.speedX + Math.sin(this.angleX);
        this.y += this.speedY + Math.sin(this.angleY);
        //each frame we move the root along vert and horizontal axis 
        //combined will create a random vector
        this.size += this.vs;
        //we increase its size as along as... 
        this.angleX += this.vaX;
        this.angleY == this.vaY;
        if(this.lightness < 70) {this.lightness += 0.5;}
        if(this.size < this.maxSize){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI *2);
            ctx.fillStyle = 'hsl(140,100%,'+ this.lightness+ '%)';
            ctx.fill();
            ctx.stroke();
            //new drawing segement circle
            requestAnimationFrame(this.update.bind(this));
            //calls update again to create another segement everytime update is used in this function
        }else {
            const flower = new Flower(this.x, this.y, this.size);
            flower.grow(); 
        }
    }
}

class Flower {
    constructor(x ,y, size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.vs = Math.random() * 0.3 + 0.2;
        this.maxFlowerSize = this.size + Math.random() * 100;
        this.image = new Image();
        this.image.src = 'flowers.png'
        this.frameSize = 100;
        this.frameX = Math.floor(Math.random() * 3)
        this.frameY = Math.floor(Math.random() * 3)
        this.size > 11.5 ? this.willFlower = true : this.willFlower = false;
        this.angle = 0;
        this.va = Math.random() * 0.05 - 0.025;

    };
    grow(){
        if(this.size < this.maxFlowerSize && this.willFlower){
            this.size +=  this.vs;
            this.angle += this.va;

            ctx.save(); 
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.drawImage(this.image, this.frameSize * this.frameX, this.frameSize * this.frameY, this.frameSize, this.frameSize, 0 - this.size/2, 0 - this.size/2, this.size, this.size);
            //crop out flower from flower spread
            ctx.restore(); 

            requestAnimationFrame(this.grow.bind(this));
        }
    }
}
window.addEventListener('mousemove', function(e){
    if(drawing){
        for ( let i = 0; i < 3; i ++){
            const root = new Root(e.x, e.y);
            root.update();
            }
    }
    
});
window.addEventListener('mousedown', function(e){
    drawing = true;
    for ( let i = 0; i < 30; i ++){
        const root = new Root(e.x, e.y);
        root.update();
        }
});
window.addEventListener('mouseup', function(){
    drawing = false;
});