var PlatformerGame = PlatformerGame || {};

//loading the game assets
PlatformerGame.Preload = function(){};

PlatformerGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    this.game.load.spritesheet('logo-tiles', 'assets/images/logo-tiles.png', 17, 16);
    this.game.load.spritesheet('tiles', 'assets/images/penguins.png', 16, 16);
    this.game.load.spritesheet('penguin', 'assets/images/penguin1.png', 9, 14);
    this.load.tilemap('fun1', 'assets/tilemaps/fun1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('fun2', 'assets/tilemaps/fun2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('fun3', 'assets/tilemaps/fun3.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('fun4', 'assets/tilemaps/fun4.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('fun5', 'assets/tilemaps/fun5.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('fun6', 'assets/tilemaps/fun6.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('tricky1', 'assets/tilemaps/tricky1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('tricky2', 'assets/tilemaps/tricky2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('tricky3', 'assets/tilemaps/tricky3.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('taxing1', 'assets/tilemaps/taxing1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('taxing2', 'assets/tilemaps/taxing2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('mayhem1', 'assets/tilemaps/mayhem1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('menulevel', 'assets/tilemaps/menu.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('sky', 'assets/images/sky_new.png');
    this.game.load.image('star', 'assets/images/star.png');
    this.game.load.image('igloo', 'assets/images/igloo.png');
    this.game.load.image('blue', 'assets/images/blue.png');
    this.game.load.image('black', 'assets/images/black.png');
    this.game.load.image('banner', 'assets/images/banner2.png');
    this.game.load.spritesheet('frame', 'assets/images/frame.png', 18, 18);
    this.game.load.image('particle', 'assets/images/particle.png');
    this.game.load.image('gamejam', 'assets/images/onehourgamejamlogo.png');
    this.game.load.audio('splash', 'assets/audio/onehourgamejamsplash.ogg');
    this.game.load.audio('music', 'assets/audio/penguins.ogg');
    this.game.load.audio('dollarone_productions', 'assets/audio/dollarone_productions.ogg');

  },
  create: function() {
    var colour = "eee";
    var timeout = 2;
    this.state.start('Logo', true, false, colour, timeout);
  }
};
// lvl 3. 2 blocks, many desstroys
//lvl 4. 3 blocks
// lvl 5. 7 destroys only 0 block
//lvl 6 unlimited destroys 0 block