var gl;
var canvas;
var glossiness = 0.6;
//camera
var viewX=-2.5;
var viewY=2.5;
var viewZ=2.5;
var eye = Vector.create([viewX, viewY, viewZ]);
var light = Vector.create([0.4, 0.5, -0.6]);
var nextObjectId = 0;

var MATERIAL_DIFFUSE = 0;
var MATERIAL_MIRROR = 1;
var MATERIAL_GLOSSY = 2;
var material = MATERIAL_DIFFUSE;
window.onload=function()
{
    gl=null;
    canvas=document.getElementById("canvas");
    
    try {gl=canvas.getContext('experimental-webgl');} catch(e) {}
    if (gl)
    {
        ui=new UI();
        ui.setObjects(makeSphereColumn());
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
    tick();
}

var currentlyPressedKeys = {};

function handleKeyDown(event) {
    currentlyPressedKeys[event.keyCode] = true;
}

function handleKeyUp(event) {
    currentlyPressedKeys[event.keyCode] = false;
}
var Zspeed = 0;
var Xspeed = 0;
var Yspeed = 0;
function handleKeys() {
    if (currentlyPressedKeys[33]) {
        // Page Up
        Zspeed = 0.001;
    } else if (currentlyPressedKeys[34]) {
        // Page Down
        Zspeed = -0.001;
    } else {
        Zspeed = 0;
        }
    if (currentlyPressedKeys[37] || currentlyPressedKeys[65]) {
        // Left cursor key or A
        Xspeed = 0.001;
    } else if (currentlyPressedKeys[39] || currentlyPressedKeys[68]) {
        // Right cursor key or D
        Xspeed = -0.001;
    } else {
        Xspeed = 0;
        }
    if (currentlyPressedKeys[38] || currentlyPressedKeys[87]) {
        // Up cursor key or W
        Yspeed = 0.001;
    } else if (currentlyPressedKeys[40] || currentlyPressedKeys[83]) {
        // Down cursor key
        Yspeed = -0.001;
    } else {
        Yspeed = 0;
    }

}
var lastTime=0;
function animate() {
    var timeNow = new Date().getTime();
    if (lastTime != 0) {
        var elapsed = timeNow - lastTime;
        viewY += Yspeed * elapsed;
        viewX += Xspeed * elapsed;
            viewZ += Zspeed * elapsed;
    }
    lastTime = timeNow;
 }
function tick() {
    requestAnimFrame(tick);
    handleKeys();
    ui.render();
    animate();
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
        eye = Vector.create([viewX, viewY, viewZ]);
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
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
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

    render:function(){
        this.renderer.render();
    }
    
}



//-----Shapes class
//--Cube (this is just a rectangle sample, cube not implemented) 
Cube = function(){

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
    getShadowCode:function(){
        return '' +
        this.getIntersectCode() +
        ' if(' + this.intersectVar + ' < 1.0) return 0.0;';
    },
    getNormalCalculationCode : function() {
    return '' +
    ' else if(t == ' + this.intersectVar + ') normal = normalForSphere(hit, ' + this.centerVar + ', ' + this.radiusVar + ');';
    },
    setUniforms:function(renderer){
        renderer.uniforms[this.centerVar] = this.center;
        renderer.uniforms[this.radiusVar] = this.radius;
    }

}
//----Light class
Light = function(){
    this.temporaryTranslation = Vector.create([0, 0, 0]);
}
Light.prototype = {
    setUniforms : function(renderer) {
        renderer.uniforms.light = light.add(this.temporaryTranslation);
    },
    getVariableSetupCode: function(){
      return 'uniform vec3 light;';
    },
    getShadowCode:function(){
        return '';
    },
    getIntersectCode : function() {
        return '';
    },
    getMinimumIntersectCode: function() {
        return '';
    },
    getNormalCalculationCode: function(){
        return '';
    }
}

//----geometry construction functions
function makeSphereColumn(){
    var objects = [];
    objects.push(new Sphere(Vector.create([0, 0.70, 0]), 0.15, nextObjectId++));
    objects.push(new Sphere(Vector.create([0, 0.25, 0]), 0.30, nextObjectId++));
    objects.push(new Sphere(Vector.create([0, -0.35, 0]), 0.30, nextObjectId++));
    objects.push(new Sphere(Vector.create([0, -0.75, 0]), 0.40, nextObjectId++));
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


function makeTracerVertexShader(objects){
    return vShader;
}



// vshader does not change
var vShader = ' attribute vec3 vertex;' +
' uniform vec3 eye, ray00, ray01, ray10, ray11;' +
' varying vec3 initialRay;' +
' void main() {' +
'   vec2 percent = vertex.xy * 0.5 + 0.5;' +
'   initialRay = mix(mix(ray00, ray01, percent.y), mix(ray10, ray11, percent.y), percent.x);' +
'   gl_Position = vec4(vertex, 1.0);' +
' }';

function makeTracerFragmentShader(objects){

    //---TODO:  convert objects info to shader strings

    var fShaderStr  = declareVariable +
    concat(objects, function(o){ return o.getVariableSetupCode(); }) +
    functionCode+
    makeShadow(objects) +
    makeCalculateColor(objects) +
    makeMain();
    console.log(fShaderStr);
    return fShaderStr;
}

function makeShadow(objs){
    return '' +
    ' float shadow(vec3 origin, vec3 ray) {' +
    concat(objs, function(o){ return o.getShadowCode(); }) +
    '   return 1.0;' +
    ' }';
}

function makeCalculateColor(objects){
     return '' +
'   vec3 calculateColor(vec3 origin, vec3 ray, vec3 light) {' +
'   vec3 colorMask = vec3(1.0);' +
'   vec3 accumulatedColor = vec3(0.0);' +

    // main raytracing loop
'   for(int bounce = 0; bounce < 5; bounce++) {' +
      // compute the intersection with everything
'     vec2 tRoom = intersectCube(origin, ray, roomCubeMin, roomCubeMax);' +
      concat(objects, function(o){ return o.getIntersectCode(); }) +

      // find the closest intersection
'     float t = 10000.0;' +
'     if(tRoom.x < tRoom.y) t = tRoom.y;' +
      concat(objects, function(o){ return o.getMinimumIntersectCode(); }) +

      // info about hit
'     vec3 hit = origin + ray * t;' +
'     vec3 surfaceColor = vec3(0.75);' +
'     float specularHighlight = 0.0;' +
'     vec3 normal;' +

      // calculate the normal (and change wall color)
'     if(t == tRoom.y) {' +
'       normal = -normalForCube(hit, roomCubeMin, roomCubeMax);' +
        ' if(hit.x < -0.9999) surfaceColor = vec3(1.0, 0.0, 0.6);' + // pink
'       else if(hit.x > 0.9999) surfaceColor = vec3(0.43, 0.05, 0.81);'+ // purple
        newDiffuseRay +
'     } else if(t == 10000.0) { '+
'       break;' +
'     } else {' +
'       if(false) ;' + // hack to discard the first 'else' in 'else if'
        concat(objects, function(o){ return o.getNormalCalculationCode(); }) +
        [newDiffuseRay, newReflectiveRay, newGlossyRay][material] +
'     }' +

      // compute diffuse lighting contribution
'     vec3 toLight = light - hit;' +
'     float diffuse = max(0.0, dot(normalize(toLight), normal));' +

      // trace a shadow ray to the light
'     float shadowIntensity = shadow(hit + normal * 0.001, toLight);' +

      // do light bounce
'     colorMask *= surfaceColor;' +
'     accumulatedColor += colorMask * (0.5 * diffuse * shadowIntensity);' +
'     accumulatedColor += colorMask * specularHighlight * shadowIntensity;' +

      // calculate next origin
'     origin = hit;' +
'   }' +

'   return accumulatedColor;' +
' }';
}

function makeMain() {
  return '' +
' void main() {' +
'   vec3 newLight = light + uniformlyRandomVector(timeSinceStart - 53.0) * 0.1;' +
'   vec3 texture = texture2D(texture, gl_FragCoord.xy / 512.0).rgb;' +
'   gl_FragColor = vec4(mix(calculateColor(eye, initialRay, newLight), texture, textureWeight), 1.0);' +
' }';
}
var declareVariable =
' precision highp float;' +
' uniform vec3 eye;' +
' varying vec3 initialRay;' +
' uniform float textureWeight;' +
' uniform float timeSinceStart;' +
' uniform sampler2D texture;' +
' uniform float glossiness;' +
' vec3 roomCubeMin = vec3(-1.0, -1.0, -1.0);' +
' vec3 roomCubeMax = vec3(1.0, 1.0, 1.0);';

var functionCode = 
'vec2 intersectCube(vec3 origin, vec3 ray, vec3 cubeMin, vec3 cubeMax) {  '+ 
'    vec3 tMin = (cubeMin - origin) / ray; '+ 
'    vec3 tMax = (cubeMax - origin) / ray; '+ 
'    vec3 t1 = min(tMin, tMax); '+ 
'     vec3 t2 = max(tMin, tMax); '+ 
'     float tNear = max(max(t1.x, t1.y), t1.z); '+ 
'     float tFar = min(min(t2.x, t2.y), t2.z); '+ 
'     return vec2(tNear, tFar); '+ 
'  } '+ 
' vec3 normalForCube(vec3 hit, vec3 cubeMin, vec3 cubeMax) {   '+ 
'     if(hit.x < cubeMin.x + 0.0001) return vec3(-1.0, 0.0, 0.0); '+ 
'     else if(hit.x > cubeMax.x - 0.0001) return vec3(1.0, 0.0, 0.0); '+ 
'     else if(hit.y < cubeMin.y + 0.0001) return vec3(0.0, -1.0, 0.0);'+  
'     else if(hit.y > cubeMax.y - 0.0001) return vec3(0.0, 1.0, 0.0); '+ 
'     else if(hit.z < cubeMin.z + 0.0001) return vec3(0.0, 0.0, -1.0);'+  
'     else return vec3(0.0, 0.0, 1.0); '+ 
'  } '+ 
' float intersectSphere(vec3 origin, vec3 ray, vec3 sCenter, float sRadius) {   '+ 
'     vec3 toSphere = origin - sCenter; '+ 
'     float a = dot(ray, ray); '+ 
'    float b = 2.0 * dot(toSphere, ray); '+ 
'     float c = dot(toSphere, toSphere) - sRadius*sRadius; '+ 
'     float discriminant = b*b - 4.0*a*c; '+ 
'     if(discriminant > 0.0) {     float t = (-b - sqrt(discriminant)) / (2.0 * a); '+ 
 '     if(t > 0.0) return t; '+ 
'     } '+ 
'     return 10000.0; '+ 
'  } '+ 
'  vec3 normalForSphere(vec3 hit, vec3 sCenter, float sRadius) {   '+ 
'     return (hit - sCenter) / sRadius; '+ 
'  } '+ 
'  float random(vec3 scale, float seed) {   '+ 
'     return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed); '+ 
'  } '+ 
'  vec3 cosineWeightedDirection(float seed, vec3 normal) {   '+ 
'     float u = random(vec3(12.9898, 78.233, 151.7182), seed); '+ 
'     float v = random(vec3(63.7264, 10.873, 623.6736), seed); '+ 
'     float r = sqrt(u); '+ 
'     float angle = 6.283185307179586 * v; '+ 
'     vec3 sdir, tdir; '+ 
'     if (abs(normal.x)<.5) {     '+ 
'         sdir = cross(normal, vec3(1,0,0)); '+ 
'     } '+ 
'     else {     '+ 
'         sdir = cross(normal, vec3(0,1,0)); '+ 
'     } '+ 
'     tdir = cross(normal, sdir); '+ 
'     return r*cos(angle)*sdir + r*sin(angle)*tdir + sqrt(1.-u)*normal; '+ 
'  } '+ 
'  vec3 uniformlyRandomDirection(float seed) {   '+ 
'     float u = random(vec3(12.9898, 78.233, 151.7182), seed); '+ 
'     float v = random(vec3(63.7264, 10.873, 623.6736), seed); '+ 
'     float z = 1.0 - 2.0 * u; '+ 
'     float r = sqrt(1.0 - z * z); '+ 
'     float angle = 6.283185307179586 * v; '+ 
'     return vec3(r * cos(angle), r * sin(angle), z); '+ 
'  } '+ 
'  vec3 uniformlyRandomVector(float seed) {   '+ 
'     return uniformlyRandomDirection(seed) * sqrt(random(vec3(36.7539, 50.3658, 306.2759), seed));'+  
'  }' 
;
// compute specular lighting contribution
var specularReflection =
' vec3 reflectedLight = normalize(reflect(light - hit, normal));' +
' specularHighlight = max(0.0, dot(reflectedLight, normalize(hit - origin)));';

var newDiffuseRay =
' ray = cosineWeightedDirection(timeSinceStart + float(bounce), normal);';

// update ray using normal according to a specular reflection
var newReflectiveRay =
' ray = reflect(ray, normal);' +
  specularReflection +
' specularHighlight = 2.0 * pow(specularHighlight, 20.0);';

var newGlossyRay =
' ray = normalize(reflect(ray, normal)) + uniformlyRandomVector(timeSinceStart + float(bounce)) * glossiness;' +
  specularReflection +
' specularHighlight = pow(specularHighlight, 3.0);';


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

//utility funciton
function concat(objects, func) {
  var text = '';
  for(var i = 0; i < objects.length; i++) {
    text += func(objects[i]);
  }
  return text;
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

