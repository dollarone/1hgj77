var PlatformerGame = PlatformerGame || {};

//title screen
PlatformerGame.Menu = function(){};

PlatformerGame.Menu.prototype = {
  init: function(colour, timeout) { 
    this.colour = colour;
    this.timeout = timeout;
  },
    create: function() {

        this.walk_speed = 70;

        //  A simple background for our game
        this.game.add.sprite(0, 0, 'sky');

        this.game.add.sprite(60, 10, 'banner');
        this.map = this.game.add.tilemap('menulevel');

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
        this.music = this.game.add.audio('music');
        this.music.loop = true;
        this.music.volume = 0.6;
        this.music.loopFull();

        this.timer = 0;

        this.showDebug = false; 
        this.game.world.bringToTop(this.players);

        //this.game.input.onTap.add(this.onTap, this);

        this.levelSelectText = this.game.add.text(200, 176, 'Level Select:', { fontSize: '18px', fill: '#000' });
        this.doubleText = this.game.add.text(190,196, '(double click to start)', { fontSize: '13px', fill: '#000' });
        this.funText = this.game.add.text(100,210, 'Fun', { fontSize: '14px', fill: '#000' });

        this.fun1_frame = this.game.add.sprite(80+20*1, 230, 'frame');
        this.fun1text = this.game.add.text(80+20*1+5, 230, '1', { fontSize: '14px', fill: '#000' });
        this.fun2_frame = this.game.add.sprite(80+20*2, 230, 'frame');
        this.fun2text = this.game.add.text(80+20*2+5, 230, '2', { fontSize: '14px', fill: '#000' });

        this.fun3_frame = this.game.add.sprite(80+20*3, 230, 'frame');
        this.fun3text = this.game.add.text(80+20*3+5, 230, '3', { fontSize: '14px', fill: '#000' });
        this.fun4_frame = this.game.add.sprite(80+20*4, 230, 'frame');
        this.fun4text = this.game.add.text(80+20*4+5, 230, '4', { fontSize: '14px', fill: '#000' });

        this.fun5_frame = this.game.add.sprite(80+20*5, 230, 'frame');
        this.fun5text = this.game.add.text(80+20*5+5, 230, '5', { fontSize: '14px', fill: '#000' });
        this.fun6_frame = this.game.add.sprite(80+20*6, 230, 'frame');
        this.fun6text = this.game.add.text(80+20*6+5, 230, '6', { fontSize: '14px', fill: '#000' });
/*
        this.tricky1_frame = this.game.add.sprite(80+20*7, 210, 'frame');
        this.tricky1text = this.game.add.text(80+20*7+5, 210, '7', { fontSize: '14px', fill: '#000' });
        this.tricky2_frame = this.game.add.sprite(80+20*8, 210, 'frame');
        this.tricky2text = this.game.add.text(80+20*8+5, 210, '8', { fontSize: '14px', fill: '#000' });

        this.fun9_frame = this.game.add.sprite(80+20*9, 210, 'frame');
        this.fun9text = this.game.add.text(80+20*9+5, 210, '9', { fontSize: '14px', fill: '#000' });
        this.fun10_frame = this.game.add.sprite(80+20*10, 210, 'frame');
        this.fun10text = this.game.add.text(80+20*10+1, 210, '10', { fontSize: '14px', fill: '#000' });
*/

        this.trickyText = this.game.add.text(100,260, 'Tricky', { fontSize: '14px', fill: '#000' });
        this.taxingText = this.game.add.text(100,310, 'Taxing', { fontSize: '14px', fill: '#000' });
        this.mayhemText = this.game.add.text(100,360, 'Mayhem', { fontSize: '14px', fill: '#000' });

        this.tricky1_frame = this.game.add.sprite(80+20*1, 280, 'frame');
        this.tricky1text = this.game.add.text(80+20*1+5, 280, '1', { fontSize: '14px', fill: '#000' });
        this.tricky2_frame = this.game.add.sprite(80+20*2, 280, 'frame');
        this.tricky2text = this.game.add.text(80+20*2+5, 280, '2', { fontSize: '14px', fill: '#000' });

        this.tricky3_frame = this.game.add.sprite(80+20*3, 280, 'frame');
        this.tricky3text = this.game.add.text(80+20*3+5, 280, '3', { fontSize: '14px', fill: '#000' });

        this.taxing1_frame = this.game.add.sprite(80+20*1, 330, 'frame');
        this.taxing1text = this.game.add.text(80+20*1+5, 330, '1', { fontSize: '14px', fill: '#000' });
        this.taxing2_frame = this.game.add.sprite(80+20*2, 330, 'frame');
        this.taxing2text = this.game.add.text(80+20*2+5, 330, '2', { fontSize: '14px', fill: '#000' });

        this.mayhem1_frame = this.game.add.sprite(80+20*1, 380, 'frame');
        this.mayhem1text = this.game.add.text(80+20*1+5, 380, '1', { fontSize: '14px', fill: '#000' });
        

//"Fun", "Tricky", "Taxing" and "Mayhem".
        this.fun1_frame.inputEnabled = true;
        this.fun2_frame.inputEnabled = true;
        this.fun3_frame.inputEnabled = true;
        this.fun4_frame.inputEnabled = true;
        this.fun5_frame.inputEnabled = true;
        this.fun6_frame.inputEnabled = true;
        this.tricky1_frame.inputEnabled = true;
        this.tricky2_frame.inputEnabled = true;
        this.tricky3_frame.inputEnabled = true;
        this.taxing1_frame.inputEnabled = true;
        this.taxing2_frame.inputEnabled = true;
        this.mayhem1_frame.inputEnabled = true;

        this.fun1_frame.events.onInputDown.add(function() { this.select_level("fun1"); }, this);
        this.fun2_frame.events.onInputDown.add(function() { this.select_level("fun2"); }, this);
        this.fun3_frame.events.onInputDown.add(function() { this.select_level("fun3"); }, this);
        this.fun4_frame.events.onInputDown.add(function() { this.select_level("fun4"); }, this);
        this.fun5_frame.events.onInputDown.add(function() { this.select_level("fun5"); }, this);
        this.fun6_frame.events.onInputDown.add(function() { this.select_level("fun6"); }, this);
        this.tricky1_frame.events.onInputDown.add(function() { this.select_level("tricky1"); }, this);
        this.tricky2_frame.events.onInputDown.add(function() { this.select_level("tricky2"); }, this);
        this.tricky3_frame.events.onInputDown.add(function() { this.select_level("tricky3"); }, this);
        this.taxing1_frame.events.onInputDown.add(function() { this.select_level("taxing1"); }, this);
        this.taxing2_frame.events.onInputDown.add(function() { this.select_level("taxing2"); }, this);
        this.mayhem1_frame.events.onInputDown.add(function() { this.select_level("mayhem1"); }, this);


        this.selected_level = -1;

        this.backToMenuCountdown = -1;



    },

    select_level: function(action) {
        if (this.selected_level === action) {
            this.music.stop();
            this.state.start('Game', true, false, action);
        }
         this.selected_level = action;
          this.fun1_frame.frame = 0;
          this.fun2_frame.frame = 0;
          this.fun3_frame.frame = 0;
          this.fun4_frame.frame = 0;
          this.fun5_frame.frame = 0;
          this.fun6_frame.frame = 0;
          this.tricky1_frame.frame = 0;
          this.tricky2_frame.frame = 0;
          this.tricky3_frame.frame = 0;
          this.taxing1_frame.frame = 0;
          this.taxing2_frame.frame = 0;
          this.mayhem1_frame.frame = 0;

         if (action === "fun1") {
            this.fun1_frame.frame = 1;
         }
         else if (action === "fun2") {
            this.fun2_frame.frame = 1;
         }
         else if (action === "fun3") {
            this.fun3_frame.frame = 1;
         }
         else if (action === "fun4") {
            this.fun4_frame.frame = 1;
         }
         else if (action === "fun5") {
            this.fun5_frame.frame = 1;
         }
         else if (action === "fun6") {
            this.fun6_frame.frame = 1;
         }
         else if (action === "tricky1") {
            this.tricky1_frame.frame = 1;
         }
         else if (action === "tricky2") {
            this.tricky2_frame.frame = 1;
         }
         else if (action === "tricky3") {
            this.tricky3_frame.frame = 1;
         }
         else if (action === "taxing1") {
            this.taxing1_frame.frame = 1;
         }
         else if (action === "taxing2") {
            this.taxing2_frame.frame = 1;
         }
         else if (action === "mayhem1") {
            this.mayhem1_frame.frame = 1;
         }

    },


    createPlayer : function (x, y) {
        var player = this.players.create(x, y, 'penguin');
        player.frame = 0; 

        player.body.bounce.y = 0;
        player.body.gravity.y = 400;
        player.anchor.setTo(0.5);
        player.body.collideWorldBounds = false;
        player.fall = 0;
        player.dead = false;

        //this.game.camera.follow(this.player);

        //  Our two animations, walking left and right.
        player.animations.add('walk', [0, 1], 10, true);
        player.animations.add('fall', [2, 3, 4, 5], 10, false);
        player.animations.play('walk');

        player.body.velocity.x = this.walk_speed;
    },

    update: function() {

        this.timer++;

        if (this.timer % 100 == 0) {
            this.createPlayer(this.playerSpawner.x, this.playerSpawner.y);
        }

        if (this.timer % 3 === 0) {
           this.map.replace(10, 9, 0, 0, 200, 100, 'blockedLayer' );
           
        }
        this.game.physics.arcade.collide(this.players, this.blockedLayer, this.collidePenguin, null, this);
        this.game.physics.arcade.overlap(this.finish, this.players, this.exit, null, this);

    },


    collidePenguin : function(penguin, block) {

        
        // Removes the star from the screen
        if (penguin.body.blocked.right) {
            penguin.body.velocity.x = -1 * this.walk_speed;
            penguin.scale.setTo(-1,1);

        } 
        else if (penguin.body.blocked.left) {
            penguin.body.velocity.x = this.walk_speed;
            penguin.scale.setTo(1,1);

        } 

        if (penguin.body.blocked.down && block.index === 9) {
            penguin.body.velocity.y = -200;
            block.index = 10;
            this.map.replace(9, 10, Math.floor(block.x/16), Math.floor(block.y/16), 1, 1, 'blockedLayer' );
            
        }
        else if (penguin.body.blocked.down && block.index === 10) {
            penguin.body.velocity.y = -200;
            block.index = 9;
        }

    },

    exit : function(exit, penguin) {
        penguin.kill();

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