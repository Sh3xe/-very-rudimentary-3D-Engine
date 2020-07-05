let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.99;

const VIEWMODEL = 4; // 4 = normal, more = zoom, less = High fov

const IDENTITY_MATRIX =[[1, 0, 0],
                        [0, 1, 0],
                        [0, 0, 1]];

//Functions
function rotateMatrix(x, y, z, m){
	if(z != 0){
        let rotation_z=[[  Math.cos(z), Math.sin(z), 0],
                        [ -Math.sin(z), Math.cos(z), 0],
                        [            0,           0, 1]];
        m = mulMat(m, rotation_z);
    }
	if(y != 0){
        let rotation_y=[[ Math.cos(y), 0, -Math.sin(y)],
                        [           0, 1,            0],
                        [ Math.sin(y), 0,  Math.cos(y)]];
        m = mulMat(m, rotation_y);
    }
    if(x != 0){
        let rotation_x=[[ 1,            0,           0],
                        [ 0,  Math.cos(x), Math.sin(x)],
                        [ 0, -Math.sin(x), Math.cos(x)]];
        m = mulMat(m, rotation_x);
    }
    return m;
}

function degToRad(deg){
    //0.017453292519943295
    return (deg * 2 * Math.PI) / 360;
}

function drawMeshes(mesh_list){
    for(let mesh of mesh_list){
		
        let p1 = mesh[0];
        let p2 = mesh[1];
        let p3 = mesh[2];

        p1 = cube_space.toWorld(p1);
        p2 = cube_space.toWorld(p2);
        p3 = cube_space.toWorld(p3);

        p1 = camera.toCam(p1);
        p2 = camera.toCam(p2);
        p3 = camera.toCam(p3);

if(mesh == mesh_list[0]){debug_infos = p1}

        p1 = projectPoint(p1);
        p2 = projectPoint(p2);
        p3 = projectPoint(p3);
        
		
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
    return [((p[0] / p[2]*VIEWMODEL) * 100) + canvas.width / 2, ((p[1] / p[2]*VIEWMODEL) * 100) + canvas.height / 2];
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



// CLASSES
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

class Camera{
    constructor(v, m, a){
        this.location = v;
        this.matrix = m;
		this.angle = a;
    }

    toCam(p){
        let point = [p[0] - this.location[0], p[1] - this.location[1], p[2] - this.location[2]];
        return mulMatVec(point, this.matrix);
    }

    rotate(x, y){
		this.angle[0] += x;
		this.angle[1] += y;
		
        this.matrix = rotateMatrix(degToRad(this.angle[0]), degToRad(this.angle[1]), degToRad(180), IDENTITY_MATRIX);
    }
}

let controller = {
    x: 0,
    y: 0,
    z: 0,
    cx: 0,
    cy: 0
}

//Main
let cube_space = new CoordinateSpace([100, 200, 0], IDENTITY_MATRIX);
let camera = new Camera([0, 0, 0], IDENTITY_MATRIX, [0, 180, 0]);
let debug_infos = {};

//This shit is horrible forgive me plz
document.addEventListener('keydown', function(event) {
    switch(event.keyCode){
        case 90: controller.z = 1;break;
        case 83: controller.z = -1;break;
        case 81: controller.x = -1;break;
        case 68: controller.x = 1;break;
        case 16: controller.y = 1;break;
        case 32: controller.y = -1;break;
        case 38: controller.cx = -1;break;
        case 39: controller.cy = -1;break;
        case 37: controller.cy = 1;break;
        case 40: controller.cx = 1;break;
		case 97: console.log(debug_infos);break;
    }
});
document.addEventListener('keyup', function(event) {
    switch(event.keyCode){
        case 90: controller.z = 0;break;
        case 83: controller.z = 0;break;
        case 81: controller.x = 0;break;
        case 68: controller.x = 0;break;
        case 16: controller.y = 0;break;
        case 32: controller.y = 0;break;
        case 38: controller.cx = 0;break;
        case 39: controller.cy = 0;break;
        case 37: controller.cy = 0;break;
        case 40: controller.cx = 0;break;
    }
});

cube_space.translate(0, 0, 290);
cube_space.rotate(180, 0, 0);

function drawToCanvas(){
    cube_space.rotate(0, 0, 0);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    camera.location[0] += controller.x;
    camera.location[1] += controller.y;
    camera.location[2] += controller.z;

    camera.rotate(controller.cx, controller.cy);
	
    drawMeshes(mesh_list);
    requestAnimationFrame(drawToCanvas);
}
drawToCanvas();