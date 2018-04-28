// the game object
gameObject.Game = function(game) {

};

// game prototype
gameObject.Game.prototype = {
	// preload function
	preload: function() {

	},
	// create function
	create: function() {
		game.stage.backgroundColor = '#a6a6a6';
		var background = game.add.image(0,0,"mountains");
		background.scale.setTo(1.5,1.5);

		score = 0;

		game.physics.arcade.gravity.y = 300;

		var style = { font: "24px Arial", fill: "#ffffff", align: "center" };
		var text = game.add.text(game.world.centerX / 0.7, game.world.centerY / 3, "Press Spacebar to jump", style);
		text.anchor.set(0.5);
		text.alpha = 1;
		game.add.tween(text).to( { alpha: 0 }, 7000, "Linear", true);

		score_text = game.add.text(game.world.centerX / 7, game.world.centerY / 7, "Score " + score, style);
		text.anchor.setTo(0.5,0.5);

		invisibleBar = game.add.sprite(0,0,"bar");
		game.physics.enable(invisibleBar, Phaser.Physics.ARCADE);
		invisibleBar.body.immoveable = true;
		invisibleBar.body.collideWorldBounds = true;

		obstacles = game.add.group();
 		obstacles.enableBody = true;
 		obstacles.physicsBodyType = Phaser.Physics.ARCADE;


		player = game.add.sprite(100,100, "monoman");
		player.anchor.setTo(0.5,0.5);
		player.animations.add('run',[1,2,4,5]);
		player.animations.add('jump',[6]);
		player.animations.add('fall',[7]);
		//player.animations.play('run', 10, true);
		game.physics.enable(player, Phaser.Physics.ARCADE);
		player.body.collideWorldBounds = true;
		player.body.setSize(50,50,20,30);
		player.inputEnabled = true;
		jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


		game.time.events.loop(Phaser.Timer.SECOND * 4, this.createObstacles, this);
	},
	// update function
	update: function() {
		game.physics.arcade.overlap(invisibleBar, obstacles, this.outboundz, null ,true);
		game.physics.arcade.overlap(player, obstacles, this.collisionz, null ,true);
		//player.body.velocity.y = 0;
		if (jumpButton.isDown && player.body.onFloor()){
			player.body.velocity.y  = -400;
			player.animations.play('jump');
		}
		else if((player.body.velocity.y > 0) && (!player.body.onFloor()) ){
			player.animations.play('fall');
		} else if (player.body.onFloor()){
			player.animations.play('run', 10, true);
		} //end of if statement!!!!!


	},

	createObstacles : () => {

				var random = game.rnd.integerInRange(1,3);
				if (random === 1){
				obstacle = obstacles.create(600, 250, "tree");
				obstacle.body.setSize(50,400,100,10);
			}		else if (random === 2) {
				obstacle = obstacles.create(600, 350, "rock");
				obstacle.body.setSize(150,150,50,50);
			} else if (random === 3) {
				obstacle = obstacles.create(475,330, "rockcollection");
				obstacle.body.setSize(obstacle.x,100,50,150);
				}

//	obstacle = obstacles.create(475,330, "rockcollection");
				//obstacle.physicsBodyType = Phaser.Physics.ARCADE;


				game.physics.enable(obstacle, Phaser.Physics.ARCADE);

				obstacle.body.collideWorldBounds = true;
				obstacle.checkWorldBounds = true;
				obstacle.scale.setTo(0.5,0.5);
			//	obstacle.events.onOutOfBounds.add(this.outboundz, this);
				obstacle.body.velocity.x = -200;

	},

	outboundz : (invisibleBar, obstacle) => {
		obstacle.kill();
		score++;
		score_text.text = "Score " + score;
	//	console.log("kill");
	},

	collisionz : (player, obstacle) => {
		player.kill();
		score_text.kill();
		var restartButton = game.add.sprite(game.world.centerX, game.world.centerY, 'restartButton');
		//var restartButton = game.add.button(game.world.centerX, game.world.centerY, 'restartButton', catz(), this, 2, 1, 0);
		restartButton.anchor.setTo(0.5,0.5);
		//restartButton.inputEnabled = true;
		restartButton.inputEnabled = true;
		restartButton.events.onInputUp.add(restartScene, this);

	},

	catz :  function() {
		console.log("restart");
	//	game.state.restart();
	},

	render : function(){
		//game.debug.body(invisibleBar);

		if (obstacle){
	//	game.debug.body(obstacle);
		}

	}

}

function restartScene() {
	game.state.restart();
}
