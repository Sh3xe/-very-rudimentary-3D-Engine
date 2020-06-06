let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Vec3{
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Matrix3{
    constructor(p, q, r){
        this.m = [p, q, r];
    }
}

class CordinateSpace{
    constructor(location, matrix){
        this.location = location;
        this.matrix = matrix;
    }
}


let points = [[100, 100, 100], [100, 200, 100], [200, 100, 100], [200, 200, 100], [100, 100, 200], [100, 200, 200], [200, -100, 200], [200, 200, 200]];
// dx / z

function animate(){
    
    for(let p of points){
        ctx.beginPath();
        ctx.fillStyle = "black";
        let x = (p[0] / p[2])*100;
        let y = (p[1] / p[2])*100;
        ctx.arc( x , y, 5, 0, Math.PI*2 );s
        ctx.fill();
    }

    requestAnimationFrame(animate);
}

animate();