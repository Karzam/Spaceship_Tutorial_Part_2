import { Loader, Sprite } from 'pixi.js'

export default class RocketManager
{
  constructor() {
    this.list = [];
    this.speed = 12;
  }

  /**
   * Create new rocket to the given position
   */
  createRocket(stage, position) {
    const rocket = new Sprite(Loader.shared.resources["assets/rocket.png"].texture);

    // Setup the sprite anchor, scale and position
    rocket.anchor.set(0.5, 0.5);
    rocket.scale.set(0.5, 0.5);
    rocket.position.set(position.x, position.y);

    // Store rockets in a list
    this.list.push(rocket);

    stage.addChild(rocket);
  }

  update() {
     // For each rocket in the list, move it
    this.list.forEach(element => {
      element.position.x += this.speed;

      // If out of the screen zone, destroy and remove from the list
      if (element.position.x > window.innerWidth) {
        element.destroy();
        this.list.splice(this.list.indexOf(element), 1);
      }
    });
  }
}