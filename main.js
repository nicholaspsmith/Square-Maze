(function(){
  var Game = {
    over: false
  };
  var input = {
    down: false,
    up: false,
    left: false,
    right: false
  };
  var player = {
    x: 55,
    y: 55,
    width: 40,
    height: 40,
    render: function() {
      ctx.fillRect(this.x,this.y,player.width,player.height);
    }
  };
  var canvas = document.createElement('canvas');
  canvas.width = 500;
  canvas.height = 500;
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  var stop = false;
  var frameCount = 0;
  var fps, fpsInterval, startTime, now, then, elapsed;

  function gameLoop() {
    window.requestAnimationFrame(gameLoop, canvas);

    now = performance.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);
      update();
      render();
    }
  }

  function init(fps) {
    fpsInterval = 1000 / fps;
    then = performance.now();
    startTime = then;
    gameLoop();
  }

  init(60);

  function update() {
    playerMovement();
  }

  function render() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawMap();
    player.render();
  }

  window.onkeydown = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    switch (code) {
      case 38:
        input.up = true;
        break;
      case 37:
        input.left = true;
        break;
      case 39:
        input.right = true;
        break;
      case 40:
        input.down = true;
        break;
      default:
        break;
    }
  };
  window.onkeyup = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    switch (code) {
      case 38:
        input.up = false;
        break;
      case 37:
        input.left = false;
        break;
      case 39:
        input.right = false;
        break;
      case 40:
        input.down = false;
        break;
      default:
        break;
    }
  };
  function playerMovement() {
    if (input.down && (player.y + player.height < canvas.height)) {
        player.y += 3;
    } else if (input.up & player.y > 0) {
        player.y -= 3;
    }
    if (input.left && player.x > 0) {
        player.x -= 3;
    } else if (input.right && (player.x + player.width) < canvas.width) {
        player.x += 3;
    }
  }
  var wall = {
    width: 50,
    height: 50
  }
  var maze = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,1,0,1],
    [1,1,0,0,0,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1]
  ];
  function drawMap() {
    for (var column=0;column< maze.length;column++) {
      for (var row=0;row<maze[column].length;row++) {
        if (maze[row][column] === 1) {
          ctx.fillRect(column*wall.width,row*wall.height,wall.width,wall.height);
        }
      }
    }
  }
  drawMap();
})();
