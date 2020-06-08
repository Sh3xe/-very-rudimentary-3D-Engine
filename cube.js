//let mesh_list = [[[0, 0, 0], [0, 100, 0], [100, 100, 0]], [[0, 0, 0], [100, 0, 0], [100, 100, 0]], [[0, 0, 100], [0, 100, 100], [100, 100, 100]], [[0, 0, 100], [100, 0, 100], [100, 100, 100]], [[0, 0, 100], [0, 0, 0], [0, 100, 0]], [[0, 0, 100], [0, 100, 100], [0, 100, 0]], [[100, 0, 100], [100, 100, 100], [100, 100, 0]], [[100, 0, 100], [100, 0, 0], [100, 100, 0]], [[0, 0, 0], [100, 0, 0], [0, 0, 100]], [[0, 100, 0], [100, 100, 0], [0, 100, 100]]];

let cube1 = [[[-0.5, -0.5, -0.5], [-0.5, 0.5, -0.5], [0.5, 0.5, -0.5]], [[-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [0.5, 0.5, -0.5]], [[-0.5, -0.5, 0.5], [-0.5, 0.5, 0.5], [0.5, 0.5, 0.5]], [[-0.5, -0.5, 0.5], [0.5, -0.5, 0.5], [0.5, 0.5, 0.5]], [[-0.5, -0.5, 0.5], [-0.5, -0.5, -0.5], [-0.5, 0.5, -0.5]], [[-0.5, -0.5, 0.5], [-0.5, 0.5, 0.5], [-0.5, 0.5, -0.5]], [[0.5, -0.5, 0.5], [0.5, 0.5, 0.5], [0.5, 0.5, -0.5]], [[0.5, -0.5, 0.5], [0.5, -0.5, -0.5], [0.5, 0.5, -0.5]], [[-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [-0.5, -0.5, 0.5]], [[-0.50, 0.5, -0.5], [0.5, 0.5, -0.5], [-0.5, 0.5, 0.5]]];
let cube = [[[0.302,0.98,0.532],[0.302,0.98,-0.088],[-0.046,1.763,0.222]],[[-0.393,0.98,0.532],[0.302,0.98,0.532],[-0.046,1.763,0.222]],[[-0.393,0.98,0.532],[-0.393,0.98,-0.088],[-0.046,1.763,0.222]],[[-0.393,0.98,-0.088],[0.302,0.98,-0.088],[-0.046,1.763,0.222]],[[-0.393,0.98,-0.088],[0.302,0.98,-0.088],[-0.393,0,-0.088]],[[0.302,0.98,-0.088],[-0.393,0,-0.088],[0.302,0,-0.088]],[[0.302,0,0.532],[0.302,0.98,-0.088],[0.302,0,-0.088]],[[0.302,0,0.532],[0.302,0.98,0.532],[0.302,0.98,-0.088]],[[-0.392,0,0.532],[0.302,0,0.532],[0.302,0.98,0.532]],[[-0.392,0,0.532],[-0.393,0.98,0.532],[0.302,0.98,0.532]],[[-0.392,0,0.532],[-0.393,0.98,0.532],[-0.393,0,-0.088]],[[-0.393,0.98,0.532],[-0.393,0.98,-0.088],[-0.393,0,-0.088]],[[-0.393,0,-0.088],[-0.254,0,-0.088],[-0.254,-0.233,0.036]],[[-0.254,0,-0.088],[0.191,-0.233,0.036],[-0.254,-0.233,0.036]],[[-0.254,0,-0.088],[0.191,0,-0.088],[0.191,-0.233,0.036]],[[0.302,0,-0.088],[0.191,0,-0.088],[0.191,-0.233,0.036]],[[0.302,0,-0.088],[0.302,0,0.036],[0.191,-0.233,0.036]],[[0.302,0,0.036],[0.191,-0.233,0.036],[0.191,-0.233,0.383]],[[0.302,0,0.036],[0.302,0,0.383],[0.191,-0.233,0.383]],[[0.302,0,0.532],[0.302,0,0.383],[0.191,-0.233,0.383]],[[0.302,0,0.532],[0.191,0,0.532],[0.191,-0.233,0.383]],[[0.191,0,0.532],[0.191,-0.233,0.383],[-0.254,-0.233,0.383]],[[-0.254,0,0.532],[0.191,0,0.532],[-0.254,-0.233,0.383]],[[-0.392,0,0.532],[-0.254,0,0.532],[-0.254,-0.233,0.383]],[[-0.392,0,0.532],[-0.254,-0.233,0.383],[-0.393,0,0.383]],[[-0.254,-0.233,0.036],[-0.254,-0.233,0.383],[-0.393,0,0.383]],[[-0.254,-0.233,0.036],[-0.393,0,0.036],[-0.393,0,0.383]],[[-0.393,0,-0.088],[-0.254,-0.233,0.036],[-0.393,0,0.036]],[[-0.254,-0.233,0.036],[0.191,-0.233,0.383],[-0.254,-0.233,0.383]],[[0.191,-0.233,0.036],[-0.254,-0.233,0.036],[0.191,-0.233,0.383]]]

mesh_list = []
for(let mesh of cube){
    let f_mesh = [];
    for(let vec of mesh){
        let f_vec = [];
        for(let i of vec){
            f_vec.push(i * 100);
        }
        f_mesh.push(f_vec);
    }
    mesh_list.push(f_mesh);
}