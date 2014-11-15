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
        this.objects = objects;
        this.renderProgram = getProgram(makeTracerVertexShader(this.objects), makeTracerFragmentShader(this.objects));
        this.renderVertexAttribute = gl.getAttribLocation(this.renderProgram, 'vertex');
        gl.enableVertexAttribArray(this.renderVertexAttribute);
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
    //this block of code below only deal with one cube: 
    //-- this.objects[0] is the cube added
        var cubeVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
        var sphereVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.objects[0].vertices), gl.STATIC_DRAW);   
        gl.vertexAttribPointer(this.renderVertexAttribute,this.objects[0].itemSize, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.objects[0].numItems);
    //----
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
//--Cube (this is just a rectangle sample, cube not implemented) 
Cube = function(){
    this.vertices = [
        -0.5, -0.5,
        -0.5, +0.5,
        +0.5, -0.5,
        +0.5, 0.5
      ];
    this.itemSize = 2;
    this.numItems = 5;
    
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
    'attribute vec2 vertex;'+
    'varying vec4 vColor;'+
    'void main(void) {'+
        'gl_Position = vec4(vertex, 0, 1);'+
        'vColor = vec4((1.0+vertex.x), 0, (1.0 + vertex.y), 1);'+
    '}';

var fShader = 
    'precision mediump float;'+
    'varying vec4 vColor;'+
    'void main(void) {'+
        'gl_FragColor = vColor;'+
    '}';
