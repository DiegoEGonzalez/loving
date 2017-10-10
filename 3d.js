//draw a spinning teapot
var hand;
var heart;

var baCounter =15;
var baDisplacement = 0;
var beating = false;
var baDelta = 1;



var bumpCounter = 0;
var bumpDisplacement = 0;
var bumpBeating = false;
var bumpDelta = 1;




function setup(){
    //basic square canvas
    createCanvas(1000, 1000, WEBGL);

    //loading models...
    hand = loadModel('Human Heart.obj');
    heart = loadModel('cute.obj');
}

function movement(){
    if(baCounter>30){
        beating = true;
    }
    if(beating){
        baDisplacement+=baDelta;
    }
    if(baDisplacement>10){
        baDelta=-1;
    } else if (baDisplacement<0){
        baDisplacement=0;
        beating=false;
        baCounter=0;
        baDelta=1;
    }

    if(bumpCounter>30){
        bumpBeating = true;
    }
    if(bumpBeating){
        bumpDisplacement+=bumpDelta;
    }
    if(bumpDisplacement>10){
        bumpDelta=-1;
    } else if (bumpDisplacement<0){
        bumpDisplacement=0;
        bumpBeating=false;
        bumpCounter=0;
        bumpDelta=1;
    }




    baCounter++;
    bumpCounter++;
}

function draw(){
    movement();

    background(color(255,145,130));
    ambientLight(155,0,0,1);
    directionalLight(255, 255, 255, 0, -3, 0);
    directionalLight(140, 60, 40, 0, 25, 0);

    scale(15);
    ambientMaterial(250);
    rotateY(frameCount * 0.01);
    //scale((baCounter+100)/100.0);
    model(hand);
    //scale(1/((baCounter+100)/100.0));
    scale(0.333);


    rotateX(PI/2);
    translate(0,6,-5);

    drawHearts();
    //
    rotateX(-PI/2);

    rotateY(frameCount * 0.01);

    //translate(0,35,0);

    //translate(0,-50,0);
    rotateY(-frameCount * 0.01);
    scale(3);
   // rotateX(-frameCount * 0.01);
    scale(1/15);
    //drawCircle();


}

function drawCircle(){

    noFill();
    //stroke(255);
    translate(0,0,-1000);
    fill(color(255,255,255));
    ellipse(0,0,1000,1000);
}

function drawHearts(){
    // hearts...
    for(var y=1;y<=2;y++){
        var variation = 0;
        switch (y){
            case 1:
                rotateX(frameCount * 0.01);
                variation = baDisplacement;
                break;
            case 2:
                rotateX(-frameCount * 0.02);
                variation = bumpDisplacement;
                rotateY(TWO_PI/20.0);
                break;
            default:
                variation = 0;
                break;
        }

        for(var x = 1.0; x <= 10.0; x++) {
            var calculateRotation = (TWO_PI/10.0);

            rotateY(calculateRotation);
            translate((25*y)+variation,0,0);
            model(heart);
            translate(-(25*y)-variation,0,0);
        }
    }
}