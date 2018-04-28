var gameObject = {};

gameObject.Start = function(game) {

};

gameObject.Start.prototype = {
	// preload function
	preload: function() {
		game.load.image("mountains","assets/blackmountains.png");
		game.load.spritesheet("monoman","assets/monman.png", 96,96);
		game.load.image("title", "assets/monrun-title.png");
		game.load.image("rock","assets/rock.png");
		game.load.image("rockcollection","assets/rockcollection.png");
		game.load.image("tree", "assets/tree.png");
		game.load.image("bar","assets/invisiblewall.png");
		game.load.image("restartButton","assets/monorestart.png");
	},

	// create function
	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.stage.backgroundColor = '#a6a6a6';
		var background = game.add.image(0,0,"mountains");
		background.scale.setTo(1.5,1.5);

		var title = game.add.sprite(game.world.centerX, game.world.centerY, 'title');
		title.anchor.setTo(0.5,0.5);
		title.scale.setTo(1.25,1.25);
		title.inputEnabled = true;
		title.events.onInputDown.add(this.nextScene, this);


	},
	// update function
	update: function() {

	},
	// starts the next state
	nextScene: function() {
		console.log('status');
		this.state.start('Game');
	}
	// end of the object If to put more stuff remove this comment
}
