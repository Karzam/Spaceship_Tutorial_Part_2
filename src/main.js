/*****************************************************

                    Main.js

*****************************************************/

var stage = new PIXI.Container();
var cloudManager;
var player;

PIXI.loader.add([
    "assets/cloud_1.png",
    "assets/cloud_2.png",
    "assets/spaceship.png",
    "assets/rocket.png"
]).load(init);


function init()
{
    renderer.backgroundColor = 0x22A7F0;

    cloudManager = new CloudManager();
    player = new Player();

    renderer.render(stage);

    loop();
}

function loop()
{
    cloudManager.update();
    player.update();

    Rocket.list.map((element) =>
    {
        element.update();
    });

    requestAnimationFrame(loop);
    renderer.render(stage);
}
