(function(){
  var requestAnimationFrame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
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
    collision: false,
    render: function() {
      ctx.fillStyle = "#004444";
      ctx.fillRect(this.x,this.y,player.width,player.height);
      ctx.fillStyle = "#00000f";
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
    if (!Game.over) {
      update();
    }
    render();
  }

  function update() {
    playerMovement();
    playerCollisionWall();
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
    if (input.down && (player.y + player.height < canvas.height) && !player.collision) {
      player.y += 3;
    } else if (input.up & player.y > 0 && !player.collision) {
      player.y -= 3;
    }
    if (input.left && player.x > 0 && !player.collision) {
      player.x -= 3;
    } else if (input.right && (player.x + player.width) < canvas.width && !player.collision) {
      player.x += 3;
    }
  }
  var wall = {
    width: 50,
    height: 50
  };
  var maze = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,1,2,1],
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
    for (var column=0;column<maze.length;column++) {
      for (var row=0;row<maze[column].length;row++) {
        var block = maze[row][column];
        if (block === 1) {
          ctx.fillStyle = "#880000";
          ctx.fillRect(column*wall.width,row*wall.height,wall.width,wall.height);
          ctx.fillStyle = "#000000";
        } else if (block === 2) {
          ctx.arc(column*wall.width + (wall.width/2),row*wall.height + (wall.height / 2),15,0,2*Math.PI);
          ctx.fillStyle = 'green';
          ctx.fill();
          ctx.fillStyle = "#000000";
        }
      }
    }
  }

  function playerCollisionWall() {
    var playerleft = player.x;
    var playerright = player.x + player.width;
    var playertop = player.y;
    var playerbottom = player.y + player.height;
    for (var column=0;column<maze.length;column++) {
      for (var row=0;row<maze[column].length;row++) {
        var block = maze[row][column];
        if (block === 1 || block === 2) {
          var blockX = column*wall.width;
          var blockY = row*wall.height;
          var blockright = blockX + wall.width;
          var blockleft = blockX;
          var blocktop = blockY;
          var blockbottom = blockY + wall.height;
          if (playerleft < blockright &&
            playerright > blockleft &&
            playertop < blockbottom &&
            playerbottom > blocktop) {
              if (block === 1) {
                player.collision = true;
              } else if (block === 2) {
                gameWon();
              }
            }
          }
        }
      }
    }

    function gameOver() {
      Game.over = true;
      alert('Game Over :(');
      // setTimeout(function() {window.location.reload()}, 3000);
    }

    function gameWon() {
      alert('You win!!!');
      Game.over = true;
    }
    gameLoop();
  })();
