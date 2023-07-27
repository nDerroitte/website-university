var canvas
function setup() {
    canvas = createCanvas (windowWidth,windowHeight);
    canvas.position(0,0);
    canvas.style('z-index','-1');
    background(0,3,17);
}

function starObject (x,y)
{
    this.x = x;
    this.y = y;
    this.sWeight = random(1,3);
    this.opa = random(0,255);
    this.arrayCon = [];
    this.drawPoint = function()
    {
        push();
        stroke(255,this.opa);
        strokeWeight(this.sWeight);
        point(x,y);
        pop();
    }
}
function connectionObject(x2,y2,opa)
{
    this.x2 = x2;
    this.y2 = y2;
    this.opa  = opa;
}
var arrayStar = [];


function draw()
{
    if(arrayStar.length<1000)
    {
        newStar = new starObject(random(0,width),random(0,height));
        newStar.drawPoint();
        arrayStar.push(newStar);

    }
    else
        noLoop();
}
