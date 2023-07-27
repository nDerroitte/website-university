var GEN_RADIUS = 7
var NB_BALLS = 150

function balls ()
{
    this.x = random(windowWidth/2-200,windowWidth/2+200);
    this.y = random(-200,-10);

    this.vx = random(-20,20);
    this.vy = 0;


    this.ax = 0;
    this.ay = 0.5//1;

    this.ballOff = false;

    this.red = random(255);
    this.green = random(255);
    this.blue = random(255);
    this.r = GEN_RADIUS
    this.drawBall = function()
    {
        push();
        noStroke();
        fill(this.red,this.green,this.blue);
        ellipse(this.x,this.y,this.r*2);
        pop();
    }
    this.moveBall = function ()
    {
        if(!this.ballOff)
        {
            this.x = this.x + this.vx;
            this.y = this.y + this.vy;

            this.vx = this.vx + this.ax;
            this.vy = this.vy + this.ay;
        }
    }
    this.checkColl= function()
    {
        if(this.x - this.r <= 0)
        {
            this.vx *=-1;
            this.vx -= 2;
            this.x = this.r;
        }
        else if(this.x + this.r >= windowWidth)
        {
            this.vx *=-1;
            this.vx += 2;
            this.x = windowWidth-this.r;
        }
        if(this.y + this.r >= windowHeight)
        {
            this.vy *=-1;
            if(this.pvy!=0)
                this.vy += 2;
            if(this.vx>0)
                this.vx -=0.02;
            else if(this.vx<0)
                this.vx+=0.02;
            this.y = windowHeight-this.r;
        }
    }
    this.collBalls = function()
    {
        if(this.ballOff)
            return;
        for ( j = 0; j<ballsArray.length; j++)
        {
            distance = dist(this.x,this.y, ballsArray[j].x, ballsArray[j].y)
            if(distance<=(this.r+ballsArray[j].r))
                ballCollResponse(this,ballsArray[j]);
        }
    }
}

function ballCollResponse(ball1,ball2)
{
    var ball1Pos = createVector(ball1.x,ball1.y);
    var ball2Pos = createVector(ball2.x,ball2.y);
    var ball1Vit = createVector(ball1.vx,ball1.vy);
    var ball2Vit = createVector(ball2.vx,ball2.vy)

    var delta = p5.Vector.sub(ball1Pos,ball2Pos);
    var d = delta.mag();

    var mtd = delta.mult(((ball1.r + ball2.r-d)/d));

    var im1 = 1 / 1;
    var im2 = 1 / 1;

    ball1Pos = p5.Vector.add(ball1Pos,mtd.mult(im1 / (im1 + im2)));
    ball2Pos = p5.Vector.sub(ball2Pos,mtd.mult(im2 / (im1 + im2)));

    var v = p5.Vector.sub(ball1Vit,ball2Vit);
    var vn = v.dot(mtd.normalize());

    if (vn > 0.0)
        return;

    // collision impulse
    var i = (-(1.0 + 0.9) * vn) / (im1 + im2);
    var impulse = mtd.mult(i);

    // change in momentum
    ball1Vit = p5.Vector.add(ball1Vit, impulse.mult(im1));
    ball2Vit = p5.Vector.sub(ball2Vit, impulse.mult(im2));

    ball1.x = ball1Pos.x;
    ball1.y = ball1Pos.y ;
    ball1.vx = ball1Vit.x;
    ball1.vy = ball1Vit.y;

    ball2.x = ball2Pos.x;
    ball2.y = ball2Pos.y ;
    ball2.vx = ball2Vit.x;
    ball2.vy = ball2Vit.y;
}

function stopAll()
{
    finish = true;
}

var ballsArray = [];
var mouseIsClicked = false;
var finish = false;
var t1 =0;
var t2 = 0;

function setup()
{
    frameRate(40);
    createCanvas (windowWidth,windowHeight);
    for(i = 0 ; i<NB_BALLS; i++)
        ballsArray.push(new balls());

    time = setTimeout(stopAll,25000);
}

function mouseClicked()
{
    mouseIsClicked = true;
}

function draw()
{
    if(finish && (t1 %2==0) && t2 < ballsArray.length)
        ballsArray[t2++].ballOff = true;
    t1++;

    if(mouseIsClicked)
        ballsArray.push(new balls());

    background(234);
    for(i =0 ; i< ballsArray.length ; i++)
    {
        ballsArray[i].moveBall();

        ballsArray[i].checkColl();
        ballsArray[i].collBalls();

        ballsArray[i].drawBall();
    }
    mouseIsClicked = false;
    if(keyIsPressed)
        frameRate(1);
}
