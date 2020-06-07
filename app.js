let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Variables
mouse = {x:0, y:0}
window.onmousemove = e=>{
    mouse.x = e.x - window.innerWidth *0.5;
    mouse.y = e.y - window.innerHeight *0.5;
};

const IDENTITY_MATRIX =[[1, 0, 0],
                        [0, 1, 0],
                        [0, 0, 1]];

//Functions
function rotateMatrix(x, y, z, m){
    if(x != 0){
        let rotation_x=[[ 1,            0,           0],
                        [ 0,  Math.cos(x), Math.sin(x)],
                        [ 0, -Math.sin(x), Math.cos(x)]];
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
                        [ -Math.sin(z), Math.cos(z), 0],
                        [            0,           0, 1]];
        //console.log(m);
        m = mulMat(m, rotation_z);
        //console.log(m);
    }
    return m;
}

function degToRad(deg){
    //0.017453292519943295
    return (deg * 2 * Math.PI) / 360;
}

function drawMeshes(mesh_list){
    for(let mesh of mesh_list){
        
        p1 = projectPoint(cube_space.toWorld(mesh[0]));
        p2 = projectPoint(cube_space.toWorld(mesh[1]));
        p3 = projectPoint(cube_space.toWorld(mesh[2]));
        
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.lineTo(p3[0], p3[1]);
        ctx.lineTo(p1[0], p1[1]);
        ctx.stroke();
    }
}

function projectPoint(p){
    return [((p[0] / p[2]) * 100) + canvas.width / 2, ((p[1] / p[2]) * 100) + canvas.height / 2];
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

document.addEventListener('keydown', function(event) {
    if (event.keyCode == 38) {
        cube_space.location[2] += 10
    }else if (event.keyCode == 40) {
        cube_space.location[2] -= 10
    }
});

cube_space.translate(0, 0, 290);
function drawToCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cube_space.location[0] = mouse.x;
    cube_space.location[1] = mouse.y;

    cube_space.rotate(0, 1, 1);
    drawMeshes(mesh_list);
}

//drawToCanvas();
setInterval(drawToCanvas, 16);