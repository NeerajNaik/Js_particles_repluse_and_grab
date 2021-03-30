const canvas = document.getElementById("canvas1");
const ctx= canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.width/80),
}

window.addEventListener('mousemove',
function(e){
    mouse.x = e.x;
    mouse.y = e.y;

}
)

class Particle{
    constructor(x,y,directionX,directionY,size,color)
    {
        this.x=x;
        this.y=y;
        this.directionX=directionX;
        this.directionY=directionY;
        this.size=size;
        this.color=color;

    }
//can uncomment for opacity(while drawing there will be less opacity)
    draw(){
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2,false)
        ctx.fillStyle = '#8C5523';
        ctx.fill();
        //ctx.globalAlpha=0.3;

    }

    update(){
        if(this.x>canvas.width || this.x<0)
        {
            this.directionX = -this.directionX;
        }
        if(this.y>canvas.height || this.y<0)
        {
            this.directionY = -this.directionY;
        }

        let dx = mouse.x -this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < mouse.radius + this.size){
            //for grab uncomment the lines below and comment the this.x or this.y part
            //can uncomment ctx.globalApha for opacity else let it be commented
            if(mouse.x< this.x && this.x < canvas.width - this.size * 10){
                this.x +=10;
                //ctx.globalAlpha=1;
                // ctx.strokeStyle = "#8C5523";
                // ctx.beginPath();
                // ctx.moveTo(mouse.x, mouse.y);
                // ctx.lineTo(this.x, this.y);
                // ctx.stroke();
            }
            if(mouse.x > this.x && this.x > this.size * 10){
                this.x -=10;
                //ctx.globalAlpha=1;
                // ctx.strokeStyle = "#8C5523";
                // ctx.beginPath();
                // ctx.moveTo(mouse.x, mouse.y);
                // ctx.lineTo(this.x, this.y);
                // ctx.stroke();
            }
            if(mouse.y< this.x && this.y < canvas.height - this.size * 10){
                this.y +=10;
                //ctx.globalAlpha=1;
                // ctx.strokeStyle = "#8C5523";
                // ctx.beginPath();
                // ctx.moveTo(mouse.x, mouse.y);
                // ctx.lineTo(this.x, this.y);
                // ctx.stroke();
            }
            if(mouse.y > this.y && this.y > this.size * 10){
                this.y -=10;
                //ctx.globalAlpha=1;
                // ctx.strokeStyle = "#8C5523";
                // ctx.beginPath();
                // ctx.moveTo(mouse.x, mouse.y);
                // ctx.lineTo(this.x, this.y);
                // ctx.stroke();
            }

        }

        this.x += this.directionX;
        this.y +=this.directionY;
        this.draw();
    }
         
}


function init(){
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for(let i =0;i<numberOfParticles;i++){
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size*2) - (size*2)) +  size * 2);
        let y = (Math.random() * ((innerHeight - size*2) - (size*2)) +  size * 2);
        let directionX = (Math.random()* 5)-2.5;
        let directionY = (Math.random()* 5)-2.5;
        let color = '#8C5523';

        particlesArray.push(new Particle(x,y,directionX,directionY,size,color));


    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    for(let i=0;i<particlesArray.length;i++)
    {
        particlesArray[i].update();
    }
}


window.addEventListener('resize',
function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height/80) * (canvas.width/80));
    init();
})
init();
animate();
