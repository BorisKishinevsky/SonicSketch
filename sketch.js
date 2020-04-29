// import processing.sound.*;
// import interfascia.*;

//createCanvas of pixel
var pixel_createCanvas=50;

//hieght/width of image array
var pixel_height;
var pixel_width;

//percentage of screen that you can draw on
var canvasSize;

//this is the data structure that holds the color for each pixel
var image= [];

//this is the color that we're drawing with. 
var fill;

//this is a data structure that connects colors (hex vars) varo note names. It'll come in handy. 
var note_to_color={};

//is true when the computer is playing the sketch
var isPlaying=false;

//image of the playButton
var playButton;
var soundButton ,sf;
//location/createCanvas of play button
var playButton_xPos;
var playButton_yPos;
var playButton_createCanvas;

//sound files we'll use
var C_file, D_file, E_file,lowF_file,highF_file, G_file, A_file, B_file, Db_file, Eb_file, Gb_file, Ab_file, Bb_file;

//we use this class to bundle SoundFile and associated note together
class Note{
 var note;
 SoundFile noteFile;
 
 Note(){
   noteFile=null;
 }
 
 Note(var name, SoundFile sf){
   note=name;
   noteFile=sf;
 }
 
 function setTo(Note n){
  note = n.getNote();
  noteFile = n.getNoteFile();
 }
 
 function setNote(var n){
   note=n;
 }
 
 var getNote(){
 return note;
 }
 
 function setNoteFile(SoundFile sf){
 noteFile=sf;
 }
 
 SoundFile getNoteFile(){
  return noteFile; 
 }
   
 
 function updateFill() {
   fill =note_to_color.get(note);
   this.play();
 }
 
 function play(){
   noteFile.play();
 } 
 
 function stop(){
  if(noteFile != null){noteFile.stop();} 
 }
}
 //creating our notes
  Note lowF, Gb, G, Ab, A, Bb, B, C, Db, D, Eb, E, highF ;
 // Note[] notes = new Note[]{lowF, Gb, G, Ab, A, Bb, B, C, Db, D, Eb, E, highF};
  
  //variables needed for keyboard buttons
  GUIController GUIcontrol;
  IFButton lowF_button, Gb_button, G_button, Ab_button, A_button, Bb_button, B_button, C_button, Db_button, D_button, Eb_button, E_button, highF_button, play_button ;

  IFLookAndFeel lowF_look, Gb_look, G_look, Ab_look, A_look, Bb_look, B_look, C_look, Db_look, D_look, Eb_look, E_look, highF_look, playButton_look ;

function setup(){
 
 note_to_color.set("lowF","520000" );
 note_to_color.set( "Gb","740000");
 note_to_color.set( "G","b30000");
 note_to_color.set( "Ab","ee0000");
 note_to_color.set( "A","ff6300");
 note_to_color.set( "Bb","ffec00");
 note_to_color.set( "B","99ff00");
 note_to_color.set( "C","28ff00");
 note_to_color.set( "Db","00ffe8");
 note_to_color.set("D","007cff" );
 note_to_color.set( "Eb","0500ff");
 note_to_color.set( "E","4500ff");
 note_to_color.set( "highF","57009e");

 note_to_color.set("520000","lowF" );
 note_to_color.set( "740000","Gb");
 note_to_color.set( "b30000","G");
 note_to_color.set( "ee0000","Ab");
 note_to_color.set( "ff6300","A");
 note_to_color.set( "ffec00","Bb");
 note_to_color.set( "99ff00","B");
 note_to_color.set( "28ff00","C");
 note_to_color.set( "00ffe8","Db");
 note_to_color.set("007cff","D" );
 note_to_color.set( "0500ff","Eb");
 note_to_color.set( "4500ff","E");
 note_to_color.set( "57009e","highF");
 
 
 //setting up the sound files
  lowF_file = new SoundFile(this, "Piano.mf.F4.mp3");
  Gb_file = new SoundFile(this, "Piano.mf.Gb4.mp3");
  G_file = new SoundFile(this, "Piano.mf.G4.mp3");
  Ab_file = new SoundFile(this, "Piano.mf.Ab4.mp3");
  A_file = new SoundFile(this, "Piano.mf.A4.mp3");
  Bb_file = new SoundFile(this, "Piano.mf.Bb4.mp3");
  B_file = new SoundFile(this, "Piano.mf.B4.mp3");
  C_file = new SoundFile(this, "Piano.mf.C5.mp3");
  Db_file = new SoundFile(this, "Piano.mf.Db5.mp3");
  D_file = new SoundFile(this, "Piano.mf.D5.mp3");
  Eb_file = new SoundFile(this, "Piano.mf.Eb5.mp3");
  E_file = new SoundFile(this, "Piano.mf.E5.mp3");
  highF_file = new SoundFile(this, "Piano.mf.F5.mp3");
  
    //set up Note objects

   lowF = new Note("lowF",lowF_file);
   Gb = new Note("Gb",Gb_file);
   G = new Note("G",G_file);
   Ab = new Note("Ab",Ab_file);
   A = new Note("A",A_file);
   Bb = new Note("Bb",Bb_file);
   B = new Note("B",B_file);
   C = new Note("C",C_file);
   Db = new Note("Db",Db_file);
   D = new Note("D",D_file);
   Eb = new Note("Eb",Eb_file);
   E = new Note("E",E_file);
   highF = new Note("highF",highF_file);
   
  //setting up play button image
  playButton = loadImage("playButton.png");
  soundButton = loadImage("soundButton.png");
   
   //setting up keyboard buttons
   GUIcontrol = new GUIController (this);
   
   lowF_button = new IFButton("",0,0);
       lowF_button.addActionListener(this);
       GUIcontrol.add(lowF_button);
   Gb_button = new IFButton("",0,0);
       Gb_button.addActionListener(this);
   G_button = new IFButton("",0,0);
       G_button.addActionListener(this);
       GUIcontrol.add(G_button);
   Ab_button = new IFButton("",0,0);
       Ab_button.addActionListener(this);
   A_button = new IFButton("",0,0);
       A_button.addActionListener(this);
       GUIcontrol.add(A_button);
   Bb_button = new IFButton("",0,0);
       Bb_button.addActionListener(this);
   B_button = new IFButton("",0,0);
       B_button.addActionListener(this);
       GUIcontrol.add(B_button);
   C_button = new IFButton("",0,0);
       C_button.addActionListener(this);
       GUIcontrol.add(C_button);
   Db_button = new IFButton("",0,0);
       Db_button.addActionListener(this);
   D_button = new IFButton("",0,0);
       D_button.addActionListener(this);
       GUIcontrol.add(D_button);
   Eb_button = new IFButton("",0,0);
       Eb_button.addActionListener(this);
   E_button = new IFButton("",0,0);
       E_button.addActionListener(this);
       GUIcontrol.add(E_button);
   highF_button = new IFButton("",0,0);
       highF_button.addActionListener(this);
       GUIcontrol.add(highF_button);
   play_button = new IFButton("",0,0);
       play_button.addActionListener(this);
       GUIcontrol.add(play_button);
    
   lowF_look = new IFLookAndFeel(this, IFLookAndFeel.DEFAULT);
     lowF_look.baseColor = unhex("FF"+note_to_color.get("lowF"));
     lowF_look.highlightColor = unhex("FF"+note_to_color.get("lowF"));
     lowF_look.activeColor =  unhex("FF"+note_to_color.get("lowF"));
     lowF_look.borderColor = color(0);
   Gb_look = new IFLookAndFeel(this, IFLookAndFeel.DEFAULT);
     Gb_look.baseColor = unhex("FF"+note_to_color.get("Gb"));
     Gb_look.highlightColor = unhex("FF"+note_to_color.get("Gb"));
     Gb_look.activeColor = unhex("FF"+note_to_color.get("Gb"));
     Gb_look.borderColor = color(0);
   G_look = new IFLookAndFeel(this, IFLookAndFeel.DEFAULT);
     G_look.baseColor = unhex("FF"+note_to_color.get("G"));
     G_look.highlightColor = unhex("FF"+note_to_color.get("G"));
     G_look.activeColor = unhex("FF"+note_to_color.get("G"));
     G_look.borderColor = color(0);
   Ab_look = new IFLookAndFeel(this, IFLookAndFeel.DEFAULT);
     Ab_look.baseColor = unhex("FF"+note_to_color.get("Ab"));
     Ab_look.highlightColor = unhex("FF"+note_to_color.get("Ab"));
     Ab_look.activeColor = unhex("FF"+note_to_color.get("Ab"));
     Ab_look.borderColor = color(0);
   A_look = new IFLookAndFeel(this, IFLookAndFeel.DEFAULT);
     A_look.baseColor =  unhex("FF"+note_to_color.get("A"));
     A_look.highlightColor = unhex("FF"+note_to_color.get("A"));
     A_look.activeColor = unhex("FF"+note_to_color.get("A"));
     A_look.borderColor = color(0);
   Bb_look = new IFLookAndFeel(this, IFLookAndFeel.DEFAULT);
     Bb_look.baseColor = unhex("FF"+note_to_color.get("Bb"));
     Bb_look.highlightColor = unhex("FF"+note_to_color.get("Bb"));
     Bb_look.activeColor = unhex("FF"+note_to_color.get("Bb"));
     Bb_look.borderColor = color(0);
   B_look = new IFLookAndFeel(this, IFLookAndFeel.DEFAULT);
     B_look.baseColor = unhex("FF"+note_to_color.get("B"));
     B_look.highlightColor = unhex("FF"+note_to_color.get("B"));
     B_look.activeColor = unhex("FF"+note_to_color.get("B"));
     B_look.borderColor = color(0);
   C_look = new IFLookAndFeel(this, IFLookAndFeel.DEFAULT);
     C_look.baseColor = unhex("FF"+note_to_color.get("C"));
     C_look.highlightColor = unhex("FF"+note_to_color.get("C"));
     C_look.activeColor = unhex("FF"+note_to_color.get("C"));
     C_look.borderColor = color(0);
   Db_look = new IFLookAndFeel(this, IFLookAndFeel.DEFAULT);
     Db_look.baseColor =  unhex("FF"+note_to_color.get("Db"));
     Db_look.highlightColor = unhex("FF"+note_to_color.get("Db"));
     Db_look.activeColor = unhex("FF"+note_to_color.get("Db"));
     Db_look.borderColor = color(0);
   D_look = new IFLookAndFeel(this, IFLookAndFeel.DEFAULT);
     D_look.baseColor = unhex("FF"+note_to_color.get("D"));
     D_look.highlightColor = unhex("FF"+note_to_color.get("D"));
     D_look.activeColor = unhex("FF"+note_to_color.get("D"));
     D_look.borderColor = color(0);
   Eb_look = new IFLookAndFeel(this, IFLookAndFeel.DEFAULT);
     Eb_look.baseColor = unhex("FF"+note_to_color.get("Eb"));
     Eb_look.highlightColor = unhex("FF"+note_to_color.get("Eb"));
     Eb_look.activeColor = unhex("FF"+note_to_color.get("Eb"));
     Eb_look.borderColor = color(0);
   E_look = new IFLookAndFeel(this, IFLookAndFeel.DEFAULT);
     E_look.baseColor = unhex("FF"+note_to_color.get("E"));
     E_look.highlightColor = unhex("FF"+note_to_color.get("E"));
     E_look.activeColor = unhex("FF"+note_to_color.get("E"));
     E_look.borderColor = color(0);
   highF_look = new IFLookAndFeel(this, IFLookAndFeel.DEFAULT);   
     highF_look.baseColor = unhex("FF"+note_to_color.get("highF"));
     highF_look.highlightColor = unhex("FF"+note_to_color.get("highF"));
     highF_look.activeColor = unhex("FF"+note_to_color.get("highF"));
     highF_look.borderColor = color(0);
     
   playButton_look = new IFLookAndFeel(this, IFLookAndFeel.DEFAULT);   
      playButton_look.baseColor = color(255,255,255,0);
      playButton_look.activeColor =color(255,255,255,0);
      playButton_look.selectionColor = color(255,255,255,0);
      playButton_look.highlightColor = color(255,255,255,0);
      playButton_look.borderColor=color(0);
     
     

//we add the top keys after the bottom keys, to make sure they get put on top
     GUIcontrol.add(Gb_button);
     GUIcontrol.add(Ab_button);
     GUIcontrol.add(Bb_button);
     GUIcontrol.add(Db_button);
     GUIcontrol.add(Eb_button);
     
     
//set up createCanvas of image/canvas
//fullScreen();
createCanvas(1500,1000);
canvasSize = .75;

pixel_height = (var)(canvasSize*displayHeight/(pixel_createCanvas));
//prvarln(pixel_height);
pixel_width = displayWidth/pixel_createCanvas;


image = new var [pixel_width][pixel_height];

background(#ffffff); // you can draw on the white half!!
fill = "ffffff";

//fill up image with all white
for(var x=0; x<pixel_width; x++){
  for(var y=0; y<pixel_height; y++){
    image[x][y]=fill;
  }} 
  drawCanvas();
  
//this is where all the buttons go        
fill(#000000);
rect(0,canvasSize*height,width,(1-canvasSize)*height);

     
    var border=50;
    var keyboardheight = (var)((1-canvasSize)*height-2*border);
    var keyHeight = (var)keyboardheight/2;
    var keyWidth = width/20; //keybord takes up -1/3 of screen, is 8 keys wide 
    var topkeyWidth = keyWidth/2;//top keys are narrower
    var xShift=border;
    var yShift =  (var)(canvasSize*height+border);
    
    //bottom row of keys
    lowF_button.setPosition(xShift,yShift);
    lowF_button.setSize(keyWidth,keyboardheight);
    lowF_button.setLookAndFeel(lowF_look);
    xShift+=keyWidth;
    G_button.setPosition(xShift,yShift);
    G_button.setSize(keyWidth,keyboardheight);
    G_button.setLookAndFeel(G_look);
    xShift+=keyWidth;
    A_button.setPosition(xShift,yShift);
    A_button.setSize(keyWidth,keyboardheight);
    A_button.setLookAndFeel(A_look);
    xShift+=keyWidth;
    B_button.setPosition(xShift,yShift);
    B_button.setSize(keyWidth,keyboardheight);
    B_button.setLookAndFeel(B_look);
    xShift+=keyWidth;
    C_button.setPosition(xShift,yShift);
    C_button.setSize(keyWidth,keyboardheight);
    C_button.setLookAndFeel(C_look);
    xShift+=keyWidth;
    D_button.setPosition(xShift,yShift);
    D_button.setSize(keyWidth,keyboardheight);
    D_button.setLookAndFeel(D_look);
    xShift+=keyWidth;
    E_button.setPosition(xShift,yShift);
    E_button.setSize(keyWidth,keyboardheight);
    E_button.setLookAndFeel(E_look);
    xShift+=keyWidth;
    highF_button.setPosition(xShift,yShift);
    highF_button.setSize((var)(.8*keyWidth),2*keyHeight);
    highF_button.setLookAndFeel(highF_look);

    //top row of buttons
    xShift=border+3*keyWidth/4;
    Gb_button.setPosition(xShift,yShift);
    Gb_button.setSize(topkeyWidth,keyHeight);
    Gb_button.setLookAndFeel(Gb_look);
    xShift+=keyWidth;
    Ab_button.setPosition(xShift,yShift);
    Ab_button.setSize(topkeyWidth,keyHeight);
    Ab_button.setLookAndFeel(Ab_look);
    xShift+=keyWidth;
    Bb_button.setPosition(xShift,yShift);
    Bb_button.setSize(topkeyWidth,keyHeight);
    Bb_button.setLookAndFeel(Bb_look);
    xShift+=2*keyWidth;
    Db_button.setPosition(xShift,yShift);
    Db_button.setSize(topkeyWidth,keyHeight);
    Db_button.setLookAndFeel(Db_look);
    xShift+=keyWidth;
    Eb_button.setPosition(xShift,yShift);
    Eb_button.setSize(topkeyWidth,keyHeight);
    Eb_button.setLookAndFeel(Eb_look);
    //setting up play button (active area)
    playButton_xPos=(var)(keyWidth*8 + 2.5*border);
    playButton_yPos=yShift+keyHeight/2;
    playButton_createCanvas=keyHeight;
    
    play_button.setPosition(playButton_xPos,playButton_yPos);
    play_button.setSize(playButton_createCanvas,playButton_createCanvas);
    play_button.setLookAndFeel(playButton_look);
    
      //setting up play button image
    prvarln("playButton in setup()");
    image(playButton,playButton_xPos,playButton_yPos,playButton_createCanvas,playButton_createCanvas);
    
      //setting up directions text
      
      var welcome = "Hello! Welcome to Sonic Sketch! \r\n"; 
      var colorInstructions = "Pick a color on the piano, and start drawing/composing! \r\n"; 
      var buttons = "Press the play button to hear your piece! \r\nPress SPACE to clear the screen.";
      
      var textbox_XPos =  (var)(playButton_xPos + playButton_createCanvas + 1.75*border);
      
      //PFont myFont = createFont("CMU Serif Roman", 53);

   
      fill(#ffffff);
      //textSize(64);
      //textFont(myFont);
      text(welcome+colorInstructions+buttons,textbox_XPos,yShift+25, width - textbox_XPos, height -yShift);
      

} 

function draw(){ 
 
 if(isPlaying){
   prvarln("soundButton activated in draw()");
  image(soundButton,playButton_xPos,playButton_yPos,playButton_createCanvas,playButton_createCanvas);
 }
 /*
 else{
  // prvarln("playButton");
   image(playButton,playButton_xPos,playButton_yPos,playButton_createCanvas,playButton_createCanvas);
 }
 */
}

function actionPerformed (GUIEvent e) {
  //prvarln(mouseX +" , " +mouseY);
  
 //play/stop button. switch which button when pressed
 if(e.getSource()==play_button){
   prvarln("play button is pressed");
     if(!isPlaying){
         isPlaying=true;
         prvarln("soundButton activated in actionPerformed()");
         image(soundButton,playButton_xPos,playButton_yPos,playButton_createCanvas,playButton_createCanvas);    
         makeNoise();  
          prvarln("playButton activated in actionPerformed()");
         image(playButton,playButton_xPos,playButton_yPos,playButton_createCanvas,playButton_createCanvas);    

         isPlaying=false;
     }
   
    }
    
 //check to see if you're on top of an accidental key (to afunction playing two notes)
 //have check for position be based on height/width to allow for different screen createCanvass
 if(onAccidentalKeys(mouseX, mouseY)){
    if(e.getSource()==Gb_button){Gb.updateFill();}
    else if(e.getSource()==Ab_button){Ab.updateFill();}
    else if(e.getSource()==Bb_button){Bb.updateFill();}
    else if(e.getSource()==Db_button){Db.updateFill();}
    else if(e.getSource()==Eb_button){Eb.updateFill();}
 }
 if(!onAccidentalKeys(mouseX, mouseY)){
     if(e.getSource()==lowF_button){lowF.updateFill();} 
     else if(e.getSource()==G_button){G.updateFill();}
     else if(e.getSource()==A_button){A.updateFill();}    
     else if(e.getSource()==B_button){B.updateFill();}
     else if(e.getSource()==C_button){C.updateFill();}   
     else if(e.getSource()==D_button){D.updateFill();}
     else if(e.getSource()==E_button){E.updateFill();}
     else if(e.getSource()==highF_button){highF.updateFill();}
 }

}

//check to see if we are pressing an accidental key. 
//NOTE: IF YOU CHANGE THE SIZE, YOU'RE GONNA HAVE TO CHANGE THE VALUES HERE. 
var onAccidentalKeys(double x, double y){
 if(y>=1550 && y<=1750){
    if((x>=165 && x<=235) || (x>=310 && x<=390) || (x>=464 && x<=535) ||  (x>=760 && x<=835) ||   (x>=913 && x<=984) ){
        return true;
    }
    else{return false;}
   }
 return false;
}

function mousePressed(){
  //prvarln(hex(fill));
   if(mouseY <= canvasSize*height){
     image[floor(mouseX/pixel_createCanvas)][floor(mouseY/pixel_createCanvas)]=fill; 
     updateCanvas(mouseX/pixel_createCanvas,mouseY/pixel_createCanvas);
   }
}

function mouseDragged(){  
  // prvarln("DRAGGING");
  //prvarln(+mouseX/pixel_createCanvas +", " +mouseY/pixel_createCanvas);
   //prvarln(hex(fill)); 
  if(mouseY < canvasSize*height){
   image[floor(mouseX/pixel_createCanvas)][floor(mouseY/pixel_createCanvas)]=fill; 
   updateCanvas(mouseX/pixel_createCanvas,mouseY/pixel_createCanvas);
   }
}

function keyReleased(){
 
  //if ( key == 'p'){makeNoise();}
  


//press SPACE to clear the screen
 if ( key == ' '){
  for(var x = 0; x<pixel_width; x++){
    for(var y=0; y<pixel_height; y++){
    image[x][y] = "ffffff";}}
  drawCanvas();}
    
//lol heres a SECRET hack 
if(key == 'c'){fill = "ffffff";};  //eraser mode!!

//here is where I'll set up a piano keyboard on a QWERTY keyboard. "A" is low F. "K" is high F
if(key == 'a'){ lowF.updateFill();}
if(key == 'w'){Gb.updateFill();;}
if(key == 's'){G.updateFill();;}
if(key == 'e'){Ab.updateFill();;}
if(key == 'd'){A.updateFill();;}
if(key == 'r'){Bb.updateFill();}
if(key == 'f'){B.updateFill();}
if(key == 'g'){C.updateFill();}
if(key == 'y'){Db.updateFill();}
if(key == 'h'){D.updateFill();}
if(key == 'u'){Eb.updateFill();}
if(key == 'j'){E.updateFill();}
if(key == 'k'){highF.updateFill();}

}

//this is where we draw all of our image array
function drawCanvas(){
noStroke();
 for (var x = 0; x< pixel_width; x++){
   for (var y = 0; y< pixel_height; y++) {
     //prvarln(image.get(x).get(y));
     fill(unhex("FF"+image[x][y]));//unhex uses alphaRBG as a color model
     rect(x*pixel_createCanvas,y*pixel_createCanvas,pixel_createCanvas,pixel_createCanvas);
   }
   }
}
 
 //this is where we update just a single pixel of our image array. 
function updateCanvas(var x, var y){
 noStroke();
 fill(unhex("FF"+image[x][y]));//unhex uses alphaRBG as a color model
 rect(x*pixel_createCanvas,y*pixel_createCanvas,pixel_createCanvas,pixel_createCanvas); 
}

function makeNoise(){

 //prvarln("making noise");
//replace play button with sound button
 prvarln("soundButton activated in makeNoise()");
 image(soundButton,playButton_xPos,playButton_yPos,playButton_createCanvas,playButton_createCanvas);
this.draw();
 Note prevNote = new Note();
   for (var y = 0; y< pixel_height; y++) {
     for (var x = 0; x< pixel_width; x++){
     delay(3);
     if(image[x][y]!="ffffff"){
        prvarln("note playing");
      if(note_to_color.get(image[x][y])!=prevNote.getNote()){prevNote.stop();}
      if (note_to_color.get(image[x][y])=="lowF"){lowF.play(); prevNote.setTo(lowF);}
      if (note_to_color.get(image[x][y])=="Gb"){Gb.play(); prevNote.setTo(Gb);}
      if (note_to_color.get(image[x][y])=="G"){G.play(); prevNote.setTo(G);}
      if (note_to_color.get(image[x][y])=="Ab"){Ab.play(); prevNote.setTo(Ab);}
      if (note_to_color.get(image[x][y])=="A"){A.play(); prevNote.setTo(A);}
      if (note_to_color.get(image[x][y])=="Bb"){Bb.play(); prevNote.setTo(Bb);}
      if (note_to_color.get(image[x][y])=="B"){B.play(); prevNote.setTo(B);}
      if (note_to_color.get(image[x][y])=="C"){C.play(); prevNote.setTo(C);}
      if (note_to_color.get(image[x][y])=="Db"){Db.play(); prevNote.setTo(Db);}
      if (note_to_color.get(image[x][y])=="D"){D.play(); prevNote.setTo(D);}
      if (note_to_color.get(image[x][y])=="Eb"){Eb.play(); prevNote.setTo(Eb);}
      if (note_to_color.get(image[x][y])=="E"){E.play(); prevNote.setTo(E);}
      if (note_to_color.get(image[x][y])=="highF"){highF.play(); prevNote.setTo(highF);}
       
    }
    
  }
 }
 
 //we are done playing music at the end of our for-loop
   prvarln("playButton activated in makeNoise()");
   image(playButton,playButton_xPos,playButton_yPos,playButton_createCanvas,playButton_createCanvas);


}