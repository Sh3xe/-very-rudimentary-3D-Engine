let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Variables
mouse = {x:0, y:0}
window.onmousemove = e=>{
    mouse.x = e.x;
    mouse.y = e.y;
};

//let points = [[0, 0, 0], [0, 1, 0], [1, 1, 0], [1, 0, 0], [0, 0, 1], [0, 1, 1], [1, 1, 1], [1, 0, 1]];

let points = [[0, 0, 100], [0, 100, 100], [100, 100, 100], [100, 0, 100], [0, 0, 200], [0, 100, 200], [100, 100, 200], [100, 0, 200]];

const IDENTITY_MATRIX = [[1, 0, 0],
           [0, 1, 0],
           [0, 0, 1]];

//Functions
function rotateMatrix(x, y, z, m){
    if(x != 0){
        let rotation_x=[[ 1,            0,           0],
                        [ 0,  Math.cos(x), Math.sin(x)],
                        [ 0, -Math.cos(x), Math.sin(x)]];
        m = mulMat(m, rotation_x);
    }
    if(y != 0){
        let rotation_y=[[ Math.cos(y), 0, -Math.sin(y)],
                        [           0, 1,            0],
                        [ Math.sin(y), 0,  Math.cos(y)]];
        m = mulMat(m, rotation_y);
    }
    if(z != 0){
        let rotation_z=[[  Math.cos(z), Math.sin(z), 0],
                        [ -Math.cos(z), Math.sin(z), 0],
                        [            0,           0, 1]];
        console.log(m);
        m = mulMat(m, rotation_z);
        console.log(m);
    }
    return m;
}

function degToRad(deg){
    return (deg * 2 * Math.PI) / 360;
}

//Classes

// VECTOR CLASS
function dot(v1, v2){
    return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
}

//MATRIX CLASS
function mulMatVec(v, m){
    m1 = m[0];
    m2 = m[1];
    m3 = m[2];

    r1 = [m1[0], m2[0], m3[0]];
    r2 = [m1[1], m2[1], m3[1]];
    r3 = [m1[2], m2[2], m3[2]];
    
    return [dot(v, r1), dot(v, r2), dot(v, r3)];
}

function mulMat(m1, m2){
    
    c1 = [m2[0][0], m2[1][0], m2[2][0]];
    c2 = [m2[0][1], m2[1][1], m2[2][1]];
    c3 = [m2[0][2], m2[1][2], m2[2][2]];

    return [[dot(m1[0], c1), dot(m1[0], c2), dot(m1[0], c3)],
            [dot(m1[1], c1), dot(m1[1], c2), dot(m1[1], c3)],
            [dot(m1[2], c1), dot(m1[2], c2), dot(m1[2], c3)]];
}

// COORDINATE SPACE
class CoordinateSpace{
    constructor(v, m){
        this.location = v;
        this.matrix   = m;
    }

    rotate(x, y, z){
        this.matrix = rotateMatrix(degToRad(x), degToRad(y), degToRad(z), this.matrix);
    }

    translate(x, y, z){
        this.location = [this.location[0] + x, this.location[1] + y, this.location[2] + z,]
    }

    toWorld(p){
        let point = mulMatVec(p, this.matrix);
        return [point[0] + this.location[0], point[1] + this.location[1], point[2] + this.location[2]];
    }
}

//Main
let cube_space = new CoordinateSpace([100, 200, 0], IDENTITY_MATRIX);

function drawToCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cube_space.rotate(0, 0, 45);

    for(let p of points){
        //converting points to world space
        p = cube_space.toWorld(p);
        
        let x = (p[0] / p[2]) * 100;
        let y = (p[1] / p[2]) * 100;
        
        x += canvas.width / 2;
        y += canvas.height / 2;

        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(x , y, 5, 0, Math.PI*2 );
        ctx.fill();

        console.log(x, y);
    }
}

drawToCanvas();
//setInterval(drawToCanvas, 100);