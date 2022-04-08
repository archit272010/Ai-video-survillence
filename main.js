Status="";
objects=[];
video="";
function preload(){
    video= createVideo('video.mp4');
    video.hide();
}
function setup(){
   canvas=createCanvas(480,380) ;
   canvas.center();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("Status").innerHTML="status: Detecting object";
}
function draw(){
    image(video,0,0,480,380);
    if(Status!= ""){
        objectDetector.detect(video,gotResults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status: objectDetected";
            document.getElementById("numberofobjects").innerHTML="Number of objects Detected are"+objects.length;
        fill('red');
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+ ""+percent+"%",objects[i].x+15,objects[i].y+15);
        noFill();
        stroke("red");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function gotResults(error,results){
if(error){
    console.log(error);
}
console.log(results);
objects=results;
}
function modelLoaded(){
    console.log("modelLoaded");
    Status= true;
    video.loop();
    video.speed(1);
    video.volume(0);
}