var PlatfomerGame = PlatformerGame || {};

//title screen
PlatformerGame.Game = function(){};

PlatformerGame.Game.prototype = {
    create: function() {

        //  A simple background for our game
        this.game.add.sprite(0, 0, 'sky');

        this.map = this.game.add.tilemap('level1');

        this.map.addTilesetImage('penguins', 'tiles');

        //this.blockedLayer = this.map.createLayer('objectLayer');
        this.blockedLayer = this.map.createLayer('blockedLayer');
        //this.foregroundLayer = this.map.createLayer('foregroundLayer');

        this.map.setCollisionBetween(1, 10000, true, 'blockedLayer');

        // make the world boundaries fit the ones in the tiled map
        this.blockedLayer.resizeWorld();

        this.players = this.game.add.group();
        this.players.enableBody = true;

        var result = this.findObjectsByType('finish', this.map, 'objectLayer');
        this.finish = this.game.add.sprite(result[0].x, result[0].y, 'igloo');
        this.game.physics.arcade.enable(this.finish);
        this.finish.anchor.setTo(0.5);
        this.finish.body.setSize(2,2,0,0);
        


        result = this.findObjectsByType('playerStart', this.map, 'objectLayer');
        this.playerSpawner = this.players.create(result[0].x, result[0].y, 'igloo');
        this.playerSpawner.anchor.setTo(0.5);
        //  Finally some stars to collect
        this.stars = this.game.add.group();

        //  We will enable physics for any star that is created in this group
        this.stars.enableBody = true;

        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 0; i++)
        {
            //  Create a star inside of the 'stars' group
            var star = this.stars.create(i * 70, 0, 'tiles');

            //  Let gravity do its thing
            star.body.gravity.y = 300;
            star.frame = 31;
            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
        /*
        this.star = this.stars.create(40, 10, 'tiles')
        this.star.body.gravity.y = 300;
        this.star.body.bounce.y = 0.9;
        this.star.frame = 31;
        this.star.anchor.setTo(0);
        //setSize(width, height, offsetX, offsetY)
        this.star.body.setSize(9, 9, 3, 5);
        this.star.dangerous = true;

        this.music = this.game.add.audio('music');
        this.music.loop = true;
        this.music.play();
*/
        //  The score
        this.scoreText = this.game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        //this.scoreText.fixedToCamera = true;
        this.score = 0;

        this.gameOverText = this.game.add.text(146, 166, 'GAME OVER', { fontSize: '32px', fill: '#000' });
        this.gameOverText.visible = false;
        //  Our controls.
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        this.timer = 0;

        this.showDebug = false; 
        this.game.world.bringToTop(this.players);

        this.game.input.onTap.add(this.onTap, this);

        this.peng = 0;
        this.pengFinished = 0;

    },

    onTap : function (pointer, doubleTap) {


        var tile = this.map.getTile( Math.floor(this.game.input.x/16), Math.floor(this.game.input.y/16), 'blockedLayer' );
        if (tile != null && doubleTap && tile.index < 3) {
            //console.log( "yes");
            this.map.removeTile( Math.floor(this.game.input.x/16), Math.floor(this.game.input.y/16), 'blockedLayer' );
            //tile.destroy();

        }
    },

    createPlayer : function (x, y) {
        var player = this.players.create(x, y, 'penguin');
        player.frame = 0; 

        //  We need to enable physics on the player
        //this.game.physics.arcade.enable(this.player);
        //this.game.camera.setSize(this.game.world.width, this.game.world.height);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0;
        player.body.gravity.y = 400;
        player.anchor.setTo(0.5);
        player.body.collideWorldBounds = false;

        //this.game.camera.follow(this.player);

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1], 10, true);
        player.animations.add('right', [0, 1], 10, true);
        player.animations.play('right');

        player.body.velocity.x = 100;


    },

    update: function() {
        if ( this.pengFinished === 10) {
            if (this.score == 100) {
                this.gameOverText.text = "  All penguins\naccounted for!\n\n   Well done!";
            }
            this.gameOverText.visible = true;

        }
        this.timer++;

        if (this.timer % 100 == 0 && this.peng < 10) {
            this.createPlayer(this.playerSpawner.x, this.playerSpawner.y);
            this.peng++;
        }
        //  Collide the player and the stars with the platforms
        this.game.physics.arcade.collide(this.players, this.blockedLayer, this.collidePenguin, null, this);
//        this.game.physics.arcade.collide(this.stars, this.blockedLayer);

        this.game.physics.arcade.overlap(this.players, this.stars, this.collectStar, null, this);
        this.game.physics.arcade.overlap(this.finish, this.players, this.exit, null, this);

//        this.getTileWorldXY.
        this.players.forEach(function(player) {
            if (player.y > this.game.world.height) {
                player.destroy();
                this.score -= 10;
                this.scoreText.text = 'Score: ' + this.score;
                this.pengFinished++;
            }
        }, this);

    },

    death: function() {
        var result = this.findObjectsByType('playerStart', this.map, 'objectLayer');
        this.player.x = result[0].x;
        this.player.y = result[0].y;
        this.player.frame = 1; 

    },

    collidePenguin : function(penguin, block) {

        
        // Removes the star from the screen
        if (penguin.body.blocked.right) {
            penguin.body.velocity.x = -100;
            penguin.scale.setTo(-1,1);

        } 
        else if (penguin.body.blocked.left) {
            penguin.body.velocity.x = 100;
            penguin.scale.setTo(1,1);

        } 

    },

    exit : function(exit, penguin) {

        //console.log("exit" + exit);
        
        // Removes the star from the screen
        penguin.kill();

        this.score += 10;
        this.scoreText.text = 'Score: ' + this.score;
        this.pengFinished++;

    },



    // find objects in a tiled layer that contains a property called "type" equal to a value
    findObjectsByType: function(type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function(element) {
            if (element.properties.type === type) {
                // phaser uses top left - tiled bottom left so need to adjust:
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    },

    createFromTiledObject: function(element, group) {
        var sprite = group.create(element.x, element.y, 'objects');
        sprite.frame = parseInt(element.properties.frame);

        // copy all of the sprite's properties
        Object.keys(element.properties).forEach(function(key) {
            sprite[key] = element.properties[key];
        });
    },


    render: function() {

        if (this.showDebug) {
            this.game.debug.body(this.finish);
            
        }
    },

};