import { Loader, Sprite, Ticker } from 'pixi.js'
import RocketManager from './RocketManager';

export default class Player extends Sprite
{
  constructor(stage) {
    // Set spaceship texture
    super(Loader.shared.resources["assets/spaceship.png"].texture);

    // Set the stage param in this object
    this.stage = stage;

    // Setup the sprite anchor, scale and position
    this.anchor.set(0.5, 0.5);
    this.scale.set(0.33, 0.33);
    this.position.set(window.innerWidth * 0.1, window.innerHeight * 0.4);

    // Add it to the stage container
    stage.addChild(this);

    // Current ship velocity
    this.velocity = { x: 0, y: 0 };

    // Ship speed
    this.speed = 6;

    // Contains the keys state (pressed / released)
    this.keysState = { 32: false, 37: false, 38: false, 39: false, 40: false };

    // Listen to keyboard events
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));

    // Spaceship rocket manager
    this.rocketManager = new RocketManager();

    // Is fire delay over
    this.canFire = true;

    // Delay between 2 rockets fire (in miliseconds)
    this.fireDelay = 500;
  }

  /**
   * Occurs when key is pressed 
   */
  onKeyDown(key) {
    const velocities = { 37: -1, 38: -1, 39: 1, 40: 1 };

    this.keysState[key.keyCode] = true;

    if (key.keyCode == 37 || key.keyCode == 39) {
      this.velocity.x = velocities[key.keyCode];
    } else if (key.keyCode == 38 || key.keyCode == 40) {
      this.velocity.y = velocities[key.keyCode];
    }
  }

  /**
   * Occurs when key is released 
   */
  onKeyUp(key) {
    this.keysState[key.keyCode] = false;

    if (key.keyCode == 37 || key.keyCode == 39) {
      this.velocity.x = 0;
    } else if (key.keyCode == 38 || key.keyCode == 40) {
      this.velocity.y = 0;
    }
  }

  /**
   * Update rocket firing
   */
  updateFiring() {
    // If space bar is pressed and fire delay is over
    if (this.keysState[32] && this.canFire) {
      // Create new rocket (with x axis shift so it's popping in front of the ship)
      this.rocketManager.createRocket(this.stage, {
        x: this.position.x + this.width / 2,
        y: this.position.y
      });

      // Reset delay needed to fire
      this.resetFireDelay();
    }
  }

  /**
   * Called when player just fired (reset fire delay timer)
   */
  resetFireDelay() {
    this.canFire = false;

    setTimeout(() => this.canFire = true, this.fireDelay);
  }

  update() {
    this.updateFiring();
    this.rocketManager.update();

    let nextX = this.position.x + this.velocity.x * this.speed;
    let nextY = this.position.y + this.velocity.y * this.speed;

    // Prevent from leaving the screen
    if (nextX > 0 && nextX < window.innerWidth) {
        this.position.x = nextX;
    }
    if (nextY > 0 && nextY < window.innerHeight) {
        this.position.y = nextY;
    }
  }
}