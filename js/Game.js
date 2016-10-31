var PlatfomerGame = PlatformerGame || {};

//title screen
PlatformerGame.Game = function(){};

PlatformerGame.Game.prototype = {
    init: function(level) { 
        this.level = level;
    },
    create: function() {

        this.levelFile = "fun1";

        if (this.level) {
            this.levelFile = this.level;
        }



        this.walk_speed = 70;

        //  A simple background for our game
        this.game.add.sprite(0, 0, 'sky');
        
        this.map = this.game.add.tilemap(this.levelFile);

        this.map.addTilesetImage('penguins', 'tiles');

        //this.blockedLayer = this.map.createLayer('objectLayer');
        this.blockedLayer = this.map.createLayer('blockedLayer');
        //this.foregroundLayer = this.map.createLayer('foregroundLayer');

        this.particles = this.game.add.group();
        this.particles.enableBody = true;
        

        var p = this.particles.create(-100, 1000, 'particle');
        p.body.velocity.y = 20;
        p.body.velocity.x = -10;
        p = this.particles.create(-100, 1000, 'particle');
        p.body.velocity.y = 30;
        p = this.particles.create(-100, 1000, 'particle');
        p.body.velocity.y = 13;
        p.body.velocity.x = 30;
        p = this.particles.create(-100, 1000, 'particle');
        p.body.velocity.y = -13;
        p.body.velocity.x = -30;
        p = this.particles.create(-100, 1000, 'particle');
        p.body.velocity.y = 3;
        p.body.velocity.x = 3;
        p = this.particles.create(-100, 1000, 'particle');
        p.body.velocity.y = -23;
        p.body.velocity.x = -6;
        p = this.particles.create(-100, 1000, 'particle');
        p.body.velocity.y = 23;
        p.body.velocity.x = 12;
        p = this.particles.create(-100, 1000, 'particle');
        p.body.velocity.y = -13;
        p.body.velocity.x = 20;

        this.particleCountdown = 0;

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
*/
        this.music = this.game.add.audio('music');
        this.music.loop = true;
        this.music.volume = 0.6;
        this.music.loopFull();

        //  The score
        this.scoreText = this.game.add.text(16, 16, 'Penguins', { fontSize: '16px', fill: '#000' });
        //this.scoreText.fixedToCamera = true;
        this.score = 0;

        this.penguinsOut = 0;
        this.penguinsDead = 0;
        this.penguinsSafe = 0;
        this.penguinsTotal = 10;
        this.penguinsOutText = this.game.add.text(120, 16, 'Out: ' + this.penguinsOut + " / " + this.penguinsTotal, { fontSize: '16px', fill: '#000' });


        this.penguinsSavedText = this.game.add.text(240, 16, 'Safe: ' + this.penguinsSafe + " / " + this.penguinsTotal, { fontSize: '16px', fill: '#000' });

        this.penguinsDeadText = this.game.add.text(370, 16, 'Dead: ' + this.penguinsDead + " / " + this.penguinsTotal, { fontSize: '16px', fill: '#000' });

        this.gameOverText = this.game.add.text(96, 166, "You didn't save all\n     the penguins!", { fontSize: '32px', fill: '#000' });
        this.gameOverText.visible = false;
        //  Our controls.
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        this.timer = 0;

        this.showDebug = false; 
        this.game.world.bringToTop(this.players);

        this.game.input.onTap.add(this.onTap, this);

        this.peng = 0;
        this.pengFinished = 0;


        this.icon1_uses = 10;
        this.icon2_uses = 3;
        this.icon3_uses = 5;


        result = this.findObjectsByType('clear', this.map, 'objectLayer');
        if (result && result[0]) {}
        this.icon1_uses = parseInt(result[0].properties.value);
        result = this.findObjectsByType('add', this.map, 'objectLayer');
        this.icon2_uses = parseInt(result[0].properties.value);
        result = this.findObjectsByType('jump', this.map, 'objectLayer');
        this.icon3_uses = parseInt(result[0].properties.value);


        this.helptext = this.game.add.text(60, 350, 'Select your action here\n ↓', { fontSize: '14px', fill: '#000' });       
        this.helptext.visible = false;

        this.menu_background = this.game.add.sprite(0, 400, 'black');
        this.menu_background.scale.setTo(500, 50);

        this.menu_background2 = this.game.add.sprite(50, 402, 'blue');
        this.menu_background2.scale.setTo(150, 48);

        this.icon1_frame = this.game.add.sprite(60-1, 412-1, 'frame');
        this.icon1 = this.game.add.sprite(60, 412, 'tiles');
        this.icon1.frame = 10;
        this.icon1text = this.game.add.text(62, 412+16, '', { fontSize: '14px', fill: '#000' });

        this.icon2_frame = this.game.add.sprite(84-1, 412-1, 'frame');
        this.icon2 = this.game.add.sprite(84, 412, 'tiles');
        this.icon2.frame = 1;
        this.icon2text = this.game.add.text(86, 412+16, '', { fontSize: '14px', fill: '#000' });

        this.icon3_frame = this.game.add.sprite(108-1, 412-1, 'frame');
        this.icon3 = this.game.add.sprite(108, 412, 'tiles');
        this.icon3.frame = 8;
        this.icon3text = this.game.add.text(110, 412+16, '', { fontSize: '14px', fill: '#000' });

        this.icon9_frame = this.game.add.sprite(200-18-8-1-24, 412-1, 'frame');
        this.icon9 = this.game.add.sprite(200-18-8-24, 412, 'tiles');
        this.icon9.frame = 11;

        this.icon10_frame = this.game.add.sprite(200-18-8-1, 412-1, 'frame');
        this.icon10 = this.game.add.sprite(200-18-8, 412, 'tiles');
        this.icon10.frame = 12;


        if (this.icon1_uses < 0) {
            this.icon1text.text = '∞';
        }
        else {
            this.icon1text.text = this.icon1_uses;
        }
        if (this.icon2_uses < 0) {
            this.icon2text.text = '∞';
        }
        else {
            this.icon2text.text = this.icon2_uses;
        }
        if (this.icon3_uses < 0) {
            this.icon3text.text = '∞';
        }
        else {
            this.icon3text.text = this.icon3_uses;
        }

        this.icon1.inputEnabled = true;
        this.icon2.inputEnabled = true;
        this.icon3.inputEnabled = true;
        this.icon9.inputEnabled = true;
        this.icon10.inputEnabled = true;
        this.icon1.events.onInputDown.add(function() { this.select_action(1); }, this);
        this.icon2.events.onInputDown.add(function() { this.select_action(2); }, this);
        this.icon3.events.onInputDown.add(function() { this.select_action(3); }, this);
        this.icon9.events.onInputDown.add(function() { this.select_action(9); }, this);
        this.icon10.events.onInputDown.add(function() { this.select_action(10); }, this);


        this.selected_action = -1;

        this.backToMenuCountdown = -1;

    },

    select_action: function(action) {
        if (this.selected_action === 9 && action === 9) {
            this.music.stop();
            this.state.restart(true, false, this.level);
        }
        if (this.selected_action === 10 && action === 10) {
            this.music.stop();
            this.state.start('Menu');
        }
        this.selected_action = action;
        this.icon1_frame.frame = 0;
        this.icon2_frame.frame = 0;
        this.icon3_frame.frame = 0;
        this.icon9_frame.frame = 0;
        this.icon10_frame.frame = 0;
        if (action === 1) {
            this.icon1_frame.frame = 1;
         }
         else if (action === 2) {
            this.icon2_frame.frame = 1;
         }
         else if (action === 3) {
            this.icon3_frame.frame = 1;
         }
         else if (action === 9) {
            this.icon9_frame.frame = 1;
         }
         else if (action === 10) {
            this.icon10_frame.frame = 1;
         }


    },

    summonParticles : function (x, y) {
        this.particles.forEach(function(p) {
            p.x = x;
            p.y = y;
            p.body.velocity.x += this.game.rnd.integerInRange(-10,10);
            p.body.velocity.y += this.game.rnd.integerInRange(-10,10);
            p.body.velocity.x = Math.min(30, Math.max(p.body.velocity.x, -30));
            p.body.velocity.y = Math.min(30, Math.max(p.body.velocity.y, -30));
        }, this);
        this.particleCountdown = 20;
    },



    onTap : function (pointer, doubleTap) {

        doubleTap = true;

        if( this.game.input.y > 400) {
            return;
        }
        

        var busy = false;
        this.players.forEach(function(player) {
            if ((player.x > Math.floor(this.game.input.x/16)*16 && player.x < Math.floor(this.game.input.x/16)*16 +16)
                && (player.y > Math.floor(this.game.input.y/16)*16 && player.y < Math.floor(this.game.input.y/16)*16 +16)) {
                busy = true;
            }
        }, this);
        if (busy) return;


        var tile = this.map.getTile( Math.floor(this.game.input.x/16), Math.floor(this.game.input.y/16), 'blockedLayer' );
        if (this.selected_action === 1 && this.icon1_uses != 0) {
            if (tile != null && doubleTap && (tile.index < 3 || tile.index === 9)) {
                //console.log( "yes");
                this.map.removeTile( Math.floor(this.game.input.x/16), Math.floor(this.game.input.y/16), 'blockedLayer' );
                //this.map.putTile(11, Math.floor(this.game.input.x/16), Math.floor(this.game.input.y/16), 'blockedLayer' );
                this.summonParticles(this.game.input.x, this.game.input.y);
                //tile.destroy();
                if (this.icon1_uses > 0) {
                    this.icon1_uses--;
                }

            }
        }
        else if (this.selected_action === 2 && this.icon2_uses != 0) {
            if (tile == null && doubleTap) {
                this.map.putTile(1, Math.floor(this.game.input.x/16), Math.floor(this.game.input.y/16), 'blockedLayer' );
                if (this.icon2_uses > 0) {
                    this.icon2_uses--;
                }
            }
            else if(tile != null && tile.index === 9 && doubleTap) {
                this.map.removeTile( Math.floor(this.game.input.x/16), Math.floor(this.game.input.y/16), 'blockedLayer' );
                this.map.putTile(2, Math.floor(this.game.input.x/16), Math.floor(this.game.input.y/16), 'blockedLayer' );
                if (this.icon2_uses > 0) {
                    this.icon2_uses--;
                }
            }
        }
        else if (this.selected_action === 3 && this.icon3_uses != 0) {
            if (tile == null && doubleTap) {
                this.map.putTile(9, Math.floor(this.game.input.x/16), Math.floor(this.game.input.y/16), 'blockedLayer' );
                if (this.icon3_uses > 0) {
                    this.icon3_uses--;
                }
            }
            else if (tile != null && tile.index < 3 && doubleTap) {
                this.map.removeTile( Math.floor(this.game.input.x/16), Math.floor(this.game.input.y/16), 'blockedLayer' );
                this.map.putTile(9, Math.floor(this.game.input.x/16), Math.floor(this.game.input.y/16), 'blockedLayer' );
                if (this.icon3_uses > 0) {
                    this.icon3_uses--;
                }
            }
        }
        else if (this.selected_action === 9 && doubleTap) {
            
        }

        if (this.icon1_uses < 0) {
        }
        else {
            this.icon1text.text = this.icon1_uses;
        }
        if (this.icon2_uses < 0) {
        }
        else {
            this.icon2text.text = this.icon2_uses;
        }
        if (this.icon3_uses < 0) {
        }
        else {
            this.icon3text.text = this.icon3_uses;
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
        this.penguinsOut++;
        this.penguinsOutText.text = 'Out: ' + this.penguinsOut + " / " + this.penguinsTotal;
    },

    update: function() {

        if (this.level === "fun1") {
            if (this.timer > 100 && this.timer < 400) {
                this.helptext.visible = true;
            }
            if (this.timer === 400) {
                this.helptext.text = 'Then click to perform that action';
            }
            if (this.timer === 800) {
                this.helptext.text = 'Actions are "Break Block", "Create Block", "Create Jump Block"\n(plus "Restart" and "Main Menu")';
            }
            if (this.timer === 1200) {
                this.helptext.text = 'Note that you may have a limited amount of each';
            }
            if (this.timer === 1600) {
                this.helptext.text = "Sometimes - like now - you may have unlimited (∞)";
            }
            if (this.timer === 2000) {
                this.helptext.text = "You must save all the penguins to beat a level";
            }
            if (this.timer === 2400) {
                this.helptext.text = "Good luck!";
            }
            if (this.timer === 2800) {
                this.helptext.visible = false;
            }
        }

        if (this.backToMenuCountdown === 0) {
            this.backToMenuCountdown--;
            this.music.stop();
            this.state.start('Menu');
        }
        else if (this.backToMenuCountdown > 0) {
            this.backToMenuCountdown--;
        }

        if (this.particleCountdown === 1) {
            this.particleCountdown--;
            this.summonParticles(-100, 2000);
        }
        else if (this.particleCountdown > 1) {
            this.particleCountdown--;
        }

        if (this.pengFinished === 10 && this.backToMenuCountdown === -1) {
            if (this.score == 100) {
                this.gameOverText.text = "     All penguins\n   accounted for!\n\n      Well done!";
                this.backToMenuCountdown = 200;
            }
            this.gameOverText.visible = true;
        }
        this.timer++;

        if (this.timer % 100 == 0 && this.peng < 10) {
            this.createPlayer(this.playerSpawner.x, this.playerSpawner.y);
            this.peng++;
        }

        if (this.timer % 3 === 0) {
           this.map.replace(10, 9, 0, 0, 200, 100, 'blockedLayer' );
           
        }
        //  Collide the player and the stars with the platforms
        this.game.physics.arcade.collide(this.players, this.blockedLayer, this.collidePenguin, null, this);
//        this.game.physics.arcade.collide(this.stars, this.blockedLayer);

        this.game.physics.arcade.overlap(this.players, this.stars, this.collectStar, null, this);
        this.game.physics.arcade.overlap(this.finish, this.players, this.exit, null, this);

//        this.getTileWorldXY.
        this.players.forEach(function(player) {
            if (!player.dead) {
                if (player.body.blocked.down) {
                    if (player.fall > 45) {
                        player.animations.play("fall");
                        player.body.velocity.x = 0;
                        this.finish.body.setSize(0,0,0,0);
                        player.dead = true;
                        this.pengFinished++;
                        this.penguinsDead++;
                        this.penguinsDeadText.text = 'Dead: ' + this.penguinsDead + " / " + this.penguinsTotal;
                        this.score -= 10;

                    }
                    else  {
                        player.fall = 0;
                    }
                }
                else if (player.body.velocity.y > 0) {
                    player.fall++;
                }
                if (player.y > this.game.world.height || player.x > this.game.world.width || player.x < 0) {
                    player.destroy();
                    /*
                    this.score -= 10;
                    this.scoreText.text = 'Score: ' + this.score;
                    */
                    this.pengFinished++;
                    this.penguinsDead++;
                    this.penguinsDeadText.text = 'Dead: ' + this.penguinsDead + " / " + this.penguinsTotal;

                }
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

        //console.log("exit" + exit);
        
        // Removes the star from the screen
        penguin.kill();

        this.score += 10;
        //this.scoreText.text = 'Score: ' + this.score;
        this.pengFinished++;
        this.penguinsSafe++;
        this.penguinsSavedText.text = "Safe: " + this.penguinsSafe + " / " + this.penguinsTotal;

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
