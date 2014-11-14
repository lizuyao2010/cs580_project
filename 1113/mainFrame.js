var gl;
var canvas;
window.onload=function()
{
    gl=null;
    canvas=document.getElementById("canvas");
    
    try {gl=canvas.getContext('experimental-webgl');} catch(e) {}
    if (gl)
    {
        ui=new UI();
        //ui.addSquare();
        ui.addCube();
        ui.render();
    }
    
}
//---Render class
Render = function()
{
    this.objects=[]
}
Render.prototype = {
    setObjects: function(objects){
        gl.clearColor(0.0, 0.0, 0.0, 1.0);  
        gl.clearDepth(1.0);                 
        gl.enable(gl.DEPTH_TEST);           
        gl.depthFunc(gl.LEQUAL); 
        
        this.objects = objects;
        this.renderProgram = getProgram(makeTracerVertexShader(this.objects), makeTracerFragmentShader(this.objects));
        this.renderVertexAttribute = gl.getAttribLocation(this.renderProgram, 'vertex');
        gl.enableVertexAttribArray(this.renderVertexAttribute);
        
        this.renderVertexColorAttribute = gl.getAttribLocation(this.renderProgram, 'vertexColor');
        gl.enableVertexAttribArray(this.renderVertexColorAttribute);
    },
    /*
    steps for gl to draw a scene:
    1. set program, attach vertex shader and fragment shader
    2. set and bind vertex buffer to the vertices
    3. point to the current buffer to draw
    4. call drawArrays
    */
    render:function(){
        gl.useProgram(this.renderProgram);
        var renderProgram=this.renderProgram;
    //this block of code below only deal with one cube: 
    //-- this.objects[0] is the cube added
        
        //for(var i=0;i<this.objects.length;i++){
            
            //定义顶点索引
            var verticesIndexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, verticesIndexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.objects[0].vertexIndices), gl.STATIC_DRAW);
            
            var vertexPositionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.objects[0].vertices), gl.STATIC_DRAW);   
            gl.vertexAttribPointer(this.renderVertexAttribute,this.objects[0].itemSize, gl.FLOAT, false, 0, 0);
            //gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.objects[0].numItems);
            
            var vertexColorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.objects[0].colors), gl.STATIC_DRAW);   
            gl.vertexAttribPointer(this.renderVertexColorAttribute,4, gl.FLOAT, false, 0, 0);
            
            var matrix = new MatrixHelper();
            matrix.trans([0.0, 0.0, -4]);
            matrix.make(30, 640 / 480, 0.1, 100.0);
            
            setInterval(function(){
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                matrix.rotate(1, [1, 0, 1]);
                matrix.set(gl, renderProgram);
                gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
                console.log()
            }, 40);
            //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            //gl.drawElements(gl.TRIANGLES, this.objects[0].numItems, gl.UNSIGNED_SHORT, 0);
        //}
    }

    
}
//------UI class
UI = function()
{
    this.renderer = new Render();
    this.objects = [];
}
UI.prototype = {
    setObjects: function(objects){
        this.objects = objects;
        //add a light object to the beginning of objects array
        this.objects.unshift(new Light());
        this.renderer.setObjects(this.objects);
    },
    addSquare: function(){
        var square = new Square(new Vector(-0.5,-0.5,0),new Vector(0.5,0.5,0));
        this.objects.push(square);
        this.renderer.setObjects(this.objects);
    },
    addCube: function(){
        var cube = new Cube();
        this.objects.push(cube);
        this.renderer.setObjects(this.objects);
    },
    render:function(){
        this.renderer.render();
    }
    
}



//-----Shapes class
//--Square (this is just a rectangle sample, cube not implemented) 
Square = function(){
    this.vertices = [
        -0.5, -0.5,0,
        -0.5, 0.5,0,
        0.5, -0.5,0,
        0.5, 0.5,0
      ];
    this.vertexIndices = [
        0,  1,  2,      0,  1,  3
    ]
    this.itemSize = 2;
    this.numItems = 3;
    this.colors = [  
        1.0,  1.0,  1.0,  1.0,    // white  
        1.0,  0.0,  0.0,  1.0,    // red  
        0.0,  1.0,  0.0,  1.0,    // green  
        0.0,  0.0,  1.0,  1.0     // blue  
    ];

    
}

Cube= function(){
    this.vertices = [
       // Front face
        -0.5, -0.5,  0.5,
         0.5, -0.5,  0.5,
         0.5,  0.5,  0.5,
        -0.5,  0.5,  0.5,

        // Back face
        -0.5, -0.5, -0.5,
        -0.5,  0.5, -0.5,
         0.5,  0.5, -0.5,
         0.5, -0.5, -0.5,

        // Top face
        -0.5,  0.5, -0.5,
        -0.5,  0.5,  0.5,
         0.5,  0.5,  0.5,
         0.5,  0.5, -0.5,

        // Bottom face
        -0.5, -0.5, -0.5,
         0.5, -0.5, -0.5,
         0.5, -0.5,  0.5,
        -0.5, -0.5,  0.5,

        // Right face
         0.5, -0.5, -0.5,
         0.5,  0.5, -0.5,
         0.5,  0.5,  0.5,
         0.5, -0.5,  0.5,

        // Left face
        -0.5, -0.5, -0.5,
        -0.5, -0.5,  0.5,
        -0.5,  0.5,  0.5,
        -0.5,  0.5, -0.5
      ];
    this.itemSize = 3;
    this.numItems = 36;
    this.vertexIndices = [
        0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // back
        8,  9,  10,     8,  10, 11,   // top
        12, 13, 14,     12, 14, 15,   // bottom
        16, 17, 18,     16, 18, 19,   // right
        20, 21, 22,     20, 22, 23    // left
    ]

    this.colorGroups = [  
        [1.0,  0.0,  0.0,  1.0],    // red  
        [1.0,  0.0,  1.0,  1.0],    // white  
        [0.0,  1.0,  0.0,  1.0],    // green  
        [0.0,  0.0,  1.0,  1.0],    // blue
        [0.0,  1.0,  1.0,  1.0],
        [1.0,  1.0,  0.0,  1.0]
    ];

    this.colors = [];
    for(var i = 0; i < 6; i++){
        for(var j = 0; j < 4; j++){
            this.colors = this.colors.concat(this.colorGroups[i]);
        }
    }
}



Sphere = function(){

}

//----Light class
Light = function(){

}


//----geometry construction functions
makeSphere = function()
{
    var objects=[];
    return objects;
}

//------webgl utility functions
/*
These two funcitons are used to create webgl program, 
and attach vertex and fragment shader to the prgram
*/
function getProgram(vertexShaderStr, fragmentShaderStr) {
               
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, getShader(vertexShaderStr, gl.VERTEX_SHADER));
    gl.attachShader(shaderProgram, getShader(fragmentShaderStr, gl.FRAGMENT_SHADER));
    gl.linkProgram(shaderProgram);
    if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        throw new Error('link error: ' + gl.getProgramInfoLog(shaderProgram));
    }
    return shaderProgram;
}

function getShader(shaderStr, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, shaderStr);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error('compile error: ' + gl.getShaderInfoLog(shader));
    }
    return shader;
}


//-----------shader strings
function makeTracerFragmentShader(objects){

    //---TODO:  convert objects info to shader strings
    return fShader;
}

function makeTracerVertexShader(objects){
    return vShader;
}


// This is a sample to color the vertex using its position, 
//TODO: implement shader
var vShader = 
    'attribute vec3 vertex;'+
    'attribute vec4 vertexColor;'+
    'uniform mat4 uMVMatrix;'+
    'uniform mat4 uPMatrix;'+
    'varying vec4 vColor;'+
    'void main(void) {'+
        'gl_Position = uPMatrix * uMVMatrix * vec4(vertex, 1.0);'+
        //'gl_Position = vec4(vertex,1);'+
        //'vColor = vec4((1.0+vertex.x), 0, (1.0 + vertex.y), 1);'+
        'vColor = vertexColor;'+
    '}';
var fShader = 
    'precision mediump float;'+
    'varying vec4 vColor;'+
    'void main(void) {'+
        'gl_FragColor = vColor;'+
    '}';


