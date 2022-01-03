const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var ovni1;
var ovni2;
var ovni3;
var piedraroja;
var meteorito;
var lanzador;
var plataforma1;
var plataforma2; 
var plataforma3;
var barreraabajo;
var barreraalta;
var fondo;
var golpeSonido;
var PLAY=1;
var END=0;
var gameState=1;
var puntos=0;

function preload(){
  golpeSonido=loadSound("golpeplatillo.mp3");
  fondo=loadImage("espacioazul.jpg")

}

function setup() {
  createCanvas(800,400);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);

  plataforma1=new plataForma(700,120,10,1);
  plataforma2=new plataForma(600,220,10,1);
  plataforma3=new plataForma(680,340,10,1);
  
  barreraabajo=new plataForma(400,470,900,1);
  barreraalta=new plataForma(830,20,1,900);
  //Crea los ovnis
  ovni1=new platilloVolador(700,100,50);
  ovni2= new platilloVolador(600,200,50);
  ovni3=new platilloVolador(680,330,50);
  //Crea la piedra roja
  piedraroja=new piedraRoja(110,200,30);
  lanzador=new lanzaDor(piedraroja.body,{x:110,y:200});
}

function draw() {
  background(fondo);
  if(gameState===PLAY){
  textSize(20);
  fill("lightyellow");
  text("Lanza la piedra con el mouse y tira los ovnis",50,350);
  text("Tecla espacio para recoger la piedra",50,370);
  text("Tecla R para reiniciar",50,390);
  text("Puntos "+ puntos,500,50);
  // No descomentar estas lineas
  // plataforma1.display();
  // plataforma2.display();
  // plataforma3.display();
  //Engine.update(engine);
  ovni1.display();
  ovni2.display();
  ovni3.display();
  //barreraalta.display();
  //barreraabajo.display();
  //console.log(ovni3.body.position.y);
  //console.log(ovni1.body.speed);
  piedraroja.display();
  lanzador.display();
  // if(ovni1.body.position.y>360 && ovni1.body.position.y<368){
  //   puntos=puntos+100;
  // }
  // if(ovni2.body.position.y>360 && ovni2.body.position.y<368){
  //   puntos=puntos+100;
  // }
  // if(ovni3.body.position.y>360 && ovni3.body.position.y<368){
  //   puntos=puntos+100;
  // }
  if(ovni1.body.speed>1 && ovni1.body.speed<2){
    puntos=puntos+100;
  }
  if(ovni2.body.speed>1 && ovni2.body.speed<2){
    puntos=puntos+100;
  }
  if(ovni3.body.speed>1 && ovni3.body.speed<2){
    puntos=puntos+100;
  }
}
  drawSprites();
  if(keyDown("R")){
    gameState=PLAY;
    Matter.Body.setPosition(piedraroja.body,{x:110,y:200})
    lanzador.attach(piedraroja.body);
    Matter.Body.setPosition(ovni1.body,{x:700,y:100})
    Matter.Body.setPosition(ovni2.body,{x:600,y:200})
    Matter.Body.setPosition(ovni3.body,{x:680,y:330})
    puntos=0;
  }
}

function mouseDragged(){
  Matter.Body.setPosition(piedraroja.body,{x:mouseX,y:mouseY})
}

function mouseReleased(){
  lanzador.fly();
}

function keyPressed(){
  if(keyCode===32 && piedraroja.body.speed<1){
    Matter.Body.setPosition(piedraroja.body,{x:110,y:200})
    lanzador.attach(piedraroja.body);
  }
}