let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let points = [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 1, 0], [0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, 1]];
// dx / z

function animate(){
    
    for(let p of points){
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc( p[0] / p[2] ,p[1] / p[2] , 10, 0, Math.PI*2 );
        ctx.fill();
    }

    requestAnimationFrame(animate);
}