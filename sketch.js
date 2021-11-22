var database,foodRef,food,gameStateRef,gameState;
var petName = "";
var form,pet1,play,player1;
var dogI,dogII,dog,game1,Food1,room;
var myState = "instructions";
var mState;
var a = 1;
var tis;
var feedButton;

function preload(){
	dogII = loadImage("images/dogImg1.png");
	dogI = loadImage("images/dogImg.png");
	room = loadImage("images/room.jpg");
}

function setup() {
	createCanvas(800, 500);

	feedButton = createSprite(400,450);
	feedButton.visible = false;

	database = firebase.database();

	play = new Play();

	play.start();
}

function draw(){
	background("black");
	
	tis = performance.now()/1000;


	mState = game1.getState();

	getFood();

	if(mState == "playing"){
		dog.visible = true;
		background(room);
		feedButton.visible=true;

		if(keyDown("a")){
			food = food + 1;
		}
	
		if(tis%20 > 0.482 && tis%20 < 0.518 && tis > 1){
			food = food - 1;
			database.ref("/").update({
				"Food" : food
			});
		}
	
		if(food < 9){
			dog.addImage(dogII);
		}
	
		if(food >=9){
			dog.addImage(dogI);
		}
		
	}

  	drawSprites();
}

async function getFood(){
	foodRef = database.ref("Food");
	foodRef.on("value",function(data){
		food = data.val();
	});

	console.log(food);
}