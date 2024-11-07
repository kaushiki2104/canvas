const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');



// const circles = [
//     {x: 100, y: 100, radius: 30, color: 'red', arrowX: 700, arrowY: 100, hit: false },
//     {x: 100, y: 200, radius: 30, color: 'green', arrowX: 700, arrowY: 200, hit: false },
//     {x: 100, y: 300, radius: 30, color: 'blue', arrowX: 700, arrowY: 300, hit: false },
//     {x: 100, y: 400, radius: 30, color: 'orange', arrowX: 700, arrowY: 400, hit: false }
// ];

const circles = [
    { x: 100, y: 100, radius: 30, color: 'red', targetColor: 'purple', arrowX: 800, arrowY: 100, hit: false },
    { x: 100, y: 200, radius: 30, color: 'green', targetColor: 'purple', arrowX: 800, arrowY: 200, hit: false },
    { x: 100, y: 300, radius: 30, color: 'blue', targetColor: 'purple', arrowX: 800, arrowY: 300, hit: false },
    { x: 100, y: 400, radius: 30, color: 'orange', targetColor: 'purple', arrowX: 800, arrowY: 400, hit: false }
  ];


let animationId;


function drawCanvas(){
    ctx.clearRect(0,0,canvas.Width, canvas.height);

    circles.forEach(circle=>{
   ctx.beginPath();
   ctx.arc(circle.x , circle.y, circle.radius, 0, Math.PI*2);
 ctx.fillStyle = circle.color;
        ctx.fill();
        ctx.closePath();

    // drawing the arrow
        ctx.beginPath();
        ctx.moveTo(circle.arrowX, circle.arrowY);
        ctx.lineTo(circle.arrowX - 20, circle.arrowY - 10);
        ctx.lineTo(circle.arrowX - 20, circle.arrowY + 10);
        ctx.closePath();
        ctx.fillStyle = 'black';
        ctx.fill();
    });
}
canvas.addEventListener('click', (event) => {
    const { offsetX, offsetY } = event;
    
    circles.forEach((circle, index) => {
      const distance = Math.sqrt((offsetX - circle.x) ** 2 + (offsetY - circle.y) ** 2);
      
      // Check if click was inside circle
      if (distance <= circle.radius && !circle.hit) {
        circle.hit = true;
        moveArrowToCircle(index);
      }
    });
  });


  function moveArrowToCircle(index) {
    const circle = circles[index];
    
    function animate() {
      // Move arrow towards the circle
      if (circle.arrowX > circle.x + circle.radius) {
        circle.arrowX -= 5;
        drawCanvas();
      } else {
        // Change color of the circle upon "hit"
        circle.color = circle.targetColor;
        cancelAnimationFrame(animationId);
        return;
      }
      
      animationId = requestAnimationFrame(animate);
    }
    
    animate();
  }
  
  // Reset function to revert everything to initial state
  function reset() {
    circles.forEach(circle => {
      circle.arrowX = 800;
      // circle.color = circle.initialColor || circle.color;
      circle.color = circle.targetColor === circle.color ? circle.initialColor || circle.color : circle.color;  
      circle.hit = false;
    });
    drawCanvas();
  }
  
  // Initial drawing
  drawCanvas();
  
  // Reset button event listener
  resetButton.addEventListener('click', reset);
  