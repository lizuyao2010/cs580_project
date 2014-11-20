var gl;
var canvas;
var glossiness = 0.6;
var eye = Vector.create([0, 0, 2.5]);
var light = Vector.create([0.4, 0.5, -0.6]);
var nextObjectId = 0;
window.onload=function()
{
    gl=null;
    canvas=document.getElementById("canvas");
    
    try {gl=canvas.getContext('experimental-webgl');} catch(e) {}
    if (gl)
    {
        ui=new UI();
        ui.setObjects(makeSphereColumn());
        ui.render();
    }
    
}
//---Render class
Render = function()
{
    this.objects=[];
    this.uniforms = {};
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
        var modelview = makeLookAt(eye.elements[0], eye.elements[1], eye.elements[2], 0, 0, 0, 0, 1, 0);
        var projection = makePerspective(55, 1, 0.1, 100);
        var modelviewProjection = projection.multiply(modelview);
        //set obj
        for(var i = 0; i < this.objects.length; i++) {
            this.objects[i].setUniforms(this);
          }
        //set obj

        var jitter = Matrix.Translation(Vector.create([Math.random() * 2 - 1, Math.random() * 2 - 1, 0]).multiply(1 / 512));
        var inverse = jitter.multiply(modelviewProjection).inverse();
        var matrix = inverse;
        this.uniforms.eye = eye;
        this.uniforms.glossiness = glossiness;
        this.uniforms.ray00 = getEyeRay(matrix, -1, -1);
        this.uniforms.ray01 = getEyeRay(matrix, -1, +1);
        this.uniforms.ray10 = getEyeRay(matrix, +1, -1);
        this.uniforms.ray11 = getEyeRay(matrix, +1, +1);
        setUniforms(this.renderProgram, this.uniforms);
    //this block of code below only deal with one cube: 
    //-- this.objects[0] is the cube added
        var cubeVertexPositionBuffer = gl.createBuffer();
    /*    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.objects[0].vertices), gl.STATIC_DRAW);   
        gl.vertexAttribPointer(this.renderVertexAttribute,this.objects[0].itemSize, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.objects[0].numItems);
    */
    var vertices = [
        -1, -1,
        -1, +1,
        +1, -1,
        +1, +1
      ];

    var type = gl.getExtension('OES_texture_float') ? gl.FLOAT : gl.UNSIGNED_BYTE;
        // create texture 
        this.textures = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.textures);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 512, 512, 0, gl.RGB, type, null);
      // create vertex buffer
        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        this.renderVertexAttribute = gl.getAttribLocation(this.renderProgram, 'vertex');
        gl.enableVertexAttribArray(this.renderVertexAttribute);
        gl.bindTexture(gl.TEXTURE_2D, this.textures);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(this.renderVertexAttribute, 2, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
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
Sphere = function(center, radius, id){
    this.center = center;
    this.radius = radius;
    this.centerVar = 'sCenter'+id;
    this.radiusVar = 'sRadius'+id;
    this.intersectVar = 'tSphere' + id;
}
Sphere.prototype = {
    //uniform vec3 sphereCenter0; 
    //uniform float sphereRadius0; 
    getVariableSetupCode: function(){
        return '' +
        ' uniform vec3 ' + this.centerVar + ';' +
        ' uniform float ' + this.radiusVar + ';';
    },
    //float tSphere0 = intersectSphere(origin, ray, sphereCenter0, sphereRadius0); 
    getIntersectCode:function(){
        return '' +
        ' float ' + this.intersectVar + ' = intersectSphere(origin, ray, ' + this.centerVar + ', ' + this.radiusVar + ');';
    },
    //if(tSphere0 < t) t = tSphere0; 
    getMinimumIntersectCode:function(){
        return '' +
        ' if(' + this.intersectVar + ' < t) t = ' + this.intersectVar + ';';
    },
    setUniforms:function(renderer){
        renderer.uniforms[this.centerVar] = this.center;
        renderer.uniforms[this.radiusVar] = this.radius;
    },

}
//----Light class
Light = function(){
    this.temporaryTranslation = Vector.create([0, 0, 0]);
}
Light.prototype = {
    setUniforms : function(renderer) {
        renderer.uniforms.light = light.add(this.temporaryTranslation);
    }
}

//----geometry construction functions
function makeSphereColumn(){
    var objects = [];
    objects.push(new Sphere(Vector.create([0, 0.75, 0]), 0.25, nextObjectId++));
    objects.push(new Sphere(Vector.create([0, 0.25, 0]), 0.25, nextObjectId++));
    objects.push(new Sphere(Vector.create([0, -0.25, 0]), 0.25, nextObjectId++));
    objects.push(new Sphere(Vector.create([0, -0.75, 0]), 0.25, nextObjectId++));
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



/*
pass uniform variables to the shaderString. including eye ray, sphere center, radius...
*/
function setUniforms(program, uniforms) {
  for(var name in uniforms) {
    var value = uniforms[name];
    var location = gl.getUniformLocation(program, name);
    if(location == null) continue;
    if(value instanceof Vector) {
      gl.uniform3fv(location, new Float32Array([value.elements[0], value.elements[1], value.elements[2]]));
    } else if(value instanceof Matrix) {
      gl.uniformMatrix4fv(location, false, new Float32Array(value.flatten()));
    } else {
      gl.uniform1f(location, value);
    }
  }
}

//-----------shader strings
function makeTracerFragmentShader(objects){

    //---TODO:  convert objects info to shader strings
    console.log(fShader);
    return fShader;
}

function makeTracerVertexShader(objects){
    return vShader;
}


// This is a sample to color the vertex using its position, 
//TODO: implement shader
var vShader = ' attribute vec3 vertex;' +
' uniform vec3 eye, ray00, ray01, ray10, ray11;' +
' varying vec3 initialRay;' +
' void main() {' +
'   vec2 percent = vertex.xy * 0.5 + 0.5;' +
'   initialRay = mix(mix(ray00, ray01, percent.y), mix(ray10, ray11, percent.y), percent.x);' +
'   gl_Position = vec4(vertex, 1.0);' +
' }';


var fShader =  document.getElementById('fshader').textContent;



function getEyeRay(matrix, x, y) {
  return matrix.multiply(Vector.create([x, y, 0, 1])).divideByW().ensure3().subtract(eye);
}



function makeLookAt(ex, ey, ez,
                    cx, cy, cz,
                    ux, uy, uz)
{
    var eyee = Vector.create([ex, ey, ez]);
    var center = Vector.create ([cx, cy, cz]);
    var up =  Vector.create([ux, uy, uz]);

    var mag;

    var z = eyee.subtract(center).toUnitVector();
    var x = up.cross(z).toUnitVector();
    var y = z.cross(x).toUnitVector();

    var m =  Matrix.create([[x.e(1), x.e(2), x.e(3), 0],
                [y.e(1), y.e(2), y.e(3), 0],
                [z.e(1), z.e(2), z.e(3), 0],
                [0, 0, 0, 1]]);

    var t = Matrix.create([[1, 0, 0, -ex],
                [0, 1, 0, -ey],
                [0, 0, 1, -ez],
                [0, 0, 0, 1]]);
    return m.multiply(t);
}

//
// gluPerspective
//
function makePerspective(fovy, aspect, znear, zfar)
{
    var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
    var ymin = -ymax;
    var xmin = ymin * aspect;
    var xmax = ymax * aspect;

    return makeFrustum(xmin, xmax, ymin, ymax, znear, zfar);
}

//
// glFrustum
//
function makeFrustum(left, right,
                     bottom, top,
                     znear, zfar)
{
    var X = 2*znear/(right-left);
    var Y = 2*znear/(top-bottom);
    var A = (right+left)/(right-left);
    var B = (top+bottom)/(top-bottom);
    var C = -(zfar+znear)/(zfar-znear);
    var D = -2*zfar*znear/(zfar-znear);

    return Matrix.create([[X, 0, A, 0],
               [0, Y, B, 0],
               [0, 0, C, D],
               [0, 0, -1, 0]]);
}


// augment Sylvester some MATH
Vector.prototype.ensure3 = function() {
  return Vector.create([this.elements[0], this.elements[1], this.elements[2]]);
};

Vector.prototype.ensure4 = function(w) {
  return Vector.create([this.elements[0], this.elements[1], this.elements[2], w]);
};

Vector.prototype.divideByW = function() {
  var w = this.elements[this.elements.length - 1];
  var newElements = [];
  for(var i = 0; i < this.elements.length; i++) {
    newElements.push(this.elements[i] / w);
  }
  return Vector.create(newElements);
};

Matrix.Translation = function (v)
{
  if (v.elements.length == 2) {
    var r = Matrix.I(3);
    r.elements[2][0] = v.elements[0];
    r.elements[2][1] = v.elements[1];
    return r;
  }

  if (v.elements.length == 3) {
    var r = Matrix.I(4);
    r.elements[0][3] = v.elements[0];
    r.elements[1][3] = v.elements[1];
    r.elements[2][3] = v.elements[2];
    return r;
  }

  throw "Invalid length for Translation";
}

Matrix.prototype.flatten = function ()
{
    var result = [];
    if (this.elements.length == 0)
        return [];


    for (var j = 0; j < this.elements[0].length; j++)
        for (var i = 0; i < this.elements.length; i++)
            result.push(this.elements[i][j]);
    return result;
}
