 // Get the canvas element and its context
 const canvas = document.getElementById("game-board");
 const ctx = canvas.getContext("2d");

 // Set up variables for the snake and food
 let score = 0;
 let snake = [{x: 10, y: 10}];
 let food = {x: 5, y: 5};
 let direction = "right";
 const gridSize = 20;
 
 // Function to draw the snake and food on the canvas
 function draw() {
   // Clear the canvas
   ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the score
   ctx.fillStyle = "#fff";
   ctx.font = "20px Arial";
   ctx.fillText("Score: " + score, 10, canvas.height - 10);

  // Update the score
  scoreText.innerHTML = "Score: " + score;

   // Draw the snake
   ctx.fillStyle = "#333";
   snake.forEach((segment) => {
     ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
   });
 
   // Draw the food
   ctx.fillStyle = "red";
   ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
 }
 // Function to update the snake's position
 document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case 37: // left arrow
        direction = "left";
        break;
      case 38: // up arrow
        direction = "up";
        break;
      case 39: // right arrow
        direction = "right";
        break;
      case 40: // down arrow
        direction = "down";
        break;
    }
  });

 // Function to update the snake's position
 function move() {
   // Get the snake's head position
   const head = snake[0];
 
   // Calculate the new head position based on the direction
   let newHead;
   switch (direction) {
     case "up":
       newHead = {x: head.x, y: head.y - 1};
       break;
     case "down":
       newHead = {x: head.x, y: head.y + 1};
       break;
     case "left":
       newHead = {x: head.x - 1, y: head.y};
       break;
     case "right":
       newHead = {x: head.x + 1, y: head.y};
       break;
   }
 
   // Add the new head to the beginning of the snake array
   snake.unshift(newHead);
 
   // Remove the tail segment
   if (snake.length > 1) {
     snake.pop();
   }
 }
 
 // Function to generate new food
 function generateFood() {
   food.x = Math.floor(Math.random() * canvas.width / gridSize);
   food.y = Math.floor(Math.random() * canvas.height / gridSize);
 }
 
 // Function to check for collisions
 function checkCollisions() {
   // Check for collision with the walls
   const head = snake[0];
   if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
     alert("Game over!");
      score = 0;
     clearInterval(gameLoop);
     return;
   }
 
   // Check for collision with the snake's tail
   for (let i = 1; i < snake.length; i++) {
     if (head.x === snake[i].x && head.y === snake[i].y) {
       alert("Game over!");
       score = 0;
       clearInterval(gameLoop);
       return;
     }
   }


 // Check for collision with the food
 if (head.x === food.x && head.y === food.y) {
 // Add a new segment to the snake
 snake.push({x: snake[snake.length - 1].x, y: snake[snake.length - 1].y});
 // Increase the score when feed is eaten
 score += 1;
   // Generate new food
 generateFood();
 
 }
 }
 
 // Function to handle button presses
 function handleKeyPress(event) {
 switch (event.keyCode) {
 case 38: // up arrow
 if (direction !== "down") {
 direction = "up";
 }
 break;
 case 40: // down arrow
 if (direction !== "up") {
 direction = "down";
 }
 break;
 case 37: // left arrow
 if (direction !== "right") {
 direction = "left";
 }
 break;
 case 39: // right arrow
 if (direction !== "left") {
 direction = "right";
 }
 break;
 }
 }
 
 // Generate initial food
 generateFood();
 
 // Set up game loop
 const gameLoop = setInterval(() => {
 move();
 checkCollisions();
 draw();
 }, 100);
 
 // Add event listeners for button presses
 document.addEventListener("keydown", handleKeyPress);