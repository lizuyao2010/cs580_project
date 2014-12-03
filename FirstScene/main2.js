var gl;
var canvas;
var glossiness = 0.6;
//camera
<<<<<<< Updated upstream
var viewX=-2.5;
var viewY=2.5;
var viewZ=2.5;
=======
var viewX=-2.4;
var viewY=2.4;
var viewZ=2.4;
>>>>>>> Stashed changes
var eye = Vector.create([viewX, viewY, viewZ]);
var redColor = Vector.create([1, 0, 0]);
var blueColor = Vector.create([0, 0, 1]);
var greenColor = Vector.create([0,1,0]);
var whiteColor = Vector.create([1,1,1]);
var yellowColor = Vector.create([1,1,0]);
var light0 = Vector.create([0, 0, 0]);
//var light0 = Vector.create([0.9, 0.5, -0.6]);
var light1 = Vector.create([2.5,2.5,2.5]);
var light2 = Vector.create([-0.7,0.7,0.7]);
var light3 = Vector.create([-0.7, 0.7,-0.7]);
var lights=new Array();
lights.push(new RealLight(light1,whiteColor));
//lights.push(new RealLight(light1,whiteColor));
//lights.push(new RealLight(light1,lightColor1));
//lights.push(new RealLight(light2,lightColor2));
//lights.push(new RealLight(light3,lightColor3));
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
var nextObjectId = 0;

var MATERIAL_DIFFUSE = 0;
var MATERIAL_MIRROR = 1;
var MATERIAL_GLOSSY = 2;
var MATERIAL_GLASS = 3;
var material = MATERIAL_MIRROR;
window.onload=function()
{
    gl=null;
    canvas=document.getElementById("canvas");
    
    try {gl=canvas.getContext('experimental-webgl');} catch(e) {}
    if (gl)
    {
        ui=new UI();
<<<<<<< Updated upstream
     //   ui.setObjects(makeCubes()); 

       ui.setObjects(makeSphereColumn());
=======
        //ui.setObjects(makeSphereColumn());
        ui.setObjects(makeCubes());
>>>>>>> Stashed changes
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        document.onkeydown = handleKeyDown;
        document.onkeyup = handleKeyUp;
        var start = new Date();
        tick();
        setInterval(function(){ 
<<<<<<< Updated upstream
            ui.render((new Date() - start) * 0.001); 
        }, 1000 / 60);
        
    }
    $('#set').click(function(){
        var selMaterial = $( "#material" ).val();
        var selMatMore = $('#materialAdjust').val();
        var selRGB = $("#rgb").val();
        ui.renderer.setProperty(selMaterial, selMatMore, selRGB);
        hideProperty();
        return;
    })

=======
            //lights[0].direction.elements[0]=lights[0].direction.elements[0]*Math.cos(Math.PI/180)-lights[0].direction.elements[2]*Math.sin(Math.PI/180);
            //lights[0].direction.elements[2]=lights[0].direction.elements[0]*Math.sin(Math.PI/180)+lights[0].direction.elements[2]*Math.cos(Math.PI/180);
            ui.render((new Date() - start) * 0.001);
        }, 1000 / 60);
        
    }
    
>>>>>>> Stashed changes
}
var mouseDown = false, oldX, oldY;

document.onmousedown = function(event) {
<<<<<<< Updated upstream
   
=======
    if(event.target.id=='set'){
    //    alert("OK");
        var sel = document.getElementById("material");
        var selMaterial = sel.options[sel.selectedIndex].value;
        var selRGB = document.getElementById("rgb").value;
    //    ui.renderer.setProperty(selMaterial, selRGB);
        hideProperty();
        return;
    }
 /*   else if(document.getElementById("popup").style.display!='none'){
        alert("pop");
        return;
    }*/
>>>>>>> Stashed changes
    var mouse = canvasMousePos(event);
    oldX = mouse.x;
    oldY = mouse.y;

    if(mouse.x >= 0 && mouse.x < 512 && mouse.y >= 0 && mouse.y < 512) {
<<<<<<< Updated upstream
        mouseDown = !ui.mouseDown(mouse.x, mouse.y);
        return false;
    }
    return true;
};
document.onmousemove = function(event) {
  var mouse = canvasMousePos(event);

  if(mouseDown) {
    // update the angles based on how far we moved since last time
    angleY -= (mouse.x - oldX) * 0.01;
    angleX += (mouse.y - oldY) * 0.01;

    // don't go upside down
    angleX = Math.max(angleX, -Math.PI / 2 + 0.01);
    angleX = Math.min(angleX, Math.PI / 2 - 0.01);

    // clear the sample buffer
    ui.renderer.sampleCount = 0;

    // remember this coordinate
    oldX = mouse.x;
    oldY = mouse.y;
  } else {
    var canvasPos = elementPos(canvas);
    ui.mouseMove(mouse.x, mouse.y);
  }
};

document.onmouseup = function(event) {
  mouseDown = false;
  var mouse = canvasMousePos(event);
  ui.mouseUp(mouse.x, mouse.y);
};
=======
    mouseDown = !ui.mouseDown(mouse.x, mouse.y);
    return false;
}
    return true;
};
>>>>>>> Stashed changes
var currentlyPressedKeys = {};


function handleKeyDown(event) {
    ui.renderer.sampleCount=0;
    currentlyPressedKeys[event.keyCode] = true;
}

function handleKeyUp(event) {
    
    currentlyPressedKeys[event.keyCode] = false;
}
var Zspeed = 0;
var Xspeed = 0;
var Yspeed = 0;
function handleKeys() {
    var theta=Math.PI/180;
    if (currentlyPressedKeys[33]) {
        // Page Up
        Zspeed = 0.001;
    } else if (currentlyPressedKeys[34]) {
        // Page Down
        Zspeed = -0.001;
    } else {
        Zspeed = 0;
        }
<<<<<<< Updated upstream
    if (currentlyPressedKeys[37] || currentlyPressedKeys[65]) {
        // Left cursor key or A
        Xspeed = 0.001;
    } else if (currentlyPressedKeys[39] || currentlyPressedKeys[68]) {
=======
    if (currentlyPressedKeys[37]) {
        // Left cursor key
        Xspeed = 0.001;
    } else if (currentlyPressedKeys[39]) {
>>>>>>> Stashed changes
        // Right cursor key or D
        Xspeed = -0.001;
    } else {
        Xspeed = 0;
        }
<<<<<<< Updated upstream
    if (currentlyPressedKeys[38] || currentlyPressedKeys[87]) {
        // Up cursor key or W
        Yspeed = 0.001;
    } else if (currentlyPressedKeys[40] || currentlyPressedKeys[83]) {
=======
    if (currentlyPressedKeys[38] ) {
        // Up cursor key or W
        Yspeed = 0.001;
    } else if (currentlyPressedKeys[40] ) {
>>>>>>> Stashed changes
        // Down cursor key
        Yspeed = -0.001;
    }else if (currentlyPressedKeys[69]) {
        // E
<<<<<<< Updated upstream
        viewX=viewX*Math.cos(theta)-viewZ*Math.sin(theta);
        viewZ=viewX*Math.sin(theta)+viewZ*Math.cos(theta);
    } else if (currentlyPressedKeys[81]) {
        // E
        viewX=viewX*Math.cos(-theta)-viewZ*Math.sin(-theta);
        viewZ=viewX*Math.sin(-theta)+viewZ*Math.cos(-theta);
    } 
    else {
=======
        viewX=viewX*Math.cos(theta)+viewY*Math.sin(theta);
        viewY=-viewX*Math.sin(theta)+viewY*Math.cos(theta);
    } else if (currentlyPressedKeys[81]) {
        // Q
        viewX=viewX*Math.cos(-theta)+viewY*Math.sin(-theta);
        viewY=-viewX*Math.sin(-theta)+viewY*Math.cos(-theta);
    } else if (currentlyPressedKeys[65]) {
        // A
        viewX=viewX*Math.cos(-theta)-viewZ*Math.sin(-theta);
        viewZ=viewX*Math.sin(-theta)+viewZ*Math.cos(-theta);
    } else if (currentlyPressedKeys[68]) {
        // D
        viewX=viewX*Math.cos(theta)-viewZ*Math.sin(theta);
        viewZ=viewX*Math.sin(theta)+viewZ*Math.cos(theta);
    }else if (currentlyPressedKeys[87]) {
        // W
        viewY=viewY*Math.cos(theta)+viewZ*Math.sin(theta);
        viewZ=-viewY*Math.sin(theta)+viewZ*Math.cos(theta);
    }else if (currentlyPressedKeys[83]) {
        // S
        viewY=viewY*Math.cos(-theta)+viewZ*Math.sin(-theta);
        viewZ=-viewY*Math.sin(-theta)+viewZ*Math.cos(-theta);
    } else {
>>>>>>> Stashed changes
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
    
    animate();
}
//---Render class
Render = function()
{
    this.selectedObject = null;
    this.selectedIndex = -1;
    this.tempColor = null;
    this.objects=[];
    this.uniforms = {};
    var vertices = [
        -1, -1,
        -1, +1,
        +1, -1,
        +1, +1
    ];

    // create vertex buffer
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // create framebuffer
    this.framebuffer = gl.createFramebuffer();

    // create textures
    var type = gl.getExtension('OES_texture_float') ? gl.FLOAT : gl.UNSIGNED_BYTE;
    this.textures = [];
    for(var i = 0; i < 2; i++) {
        this.textures.push(gl.createTexture());
        gl.bindTexture(gl.TEXTURE_2D, this.textures[i]);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 512, 512, 0, gl.RGB, type, null);
    }
        
    /*/1125
    this.textures[1].image = new Image();
    this.textures[1].image.src = "earth.jpg";
    this.textures[1].image.onload = function () {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.bindTexture(gl.TEXTURE_2D, this.textures[1]);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 512, 512, 0, gl.RGB, type, this.textures[1].image);
        gl.generateMipmap(gl.TEXTURE_2D);

        gl.bindTexture(gl.TEXTURE_2D, null);
    }
    //end 1125*/
    gl.bindTexture(gl.TEXTURE_2D, null);
    // create render shader
    this.renderProgram = getProgram(renderVertexSource, renderFragmentSource);
    this.renderVertexAttribute = gl.getAttribLocation(this.renderProgram, 'vertex');
    gl.enableVertexAttribArray(this.renderVertexAttribute);

    // objects and shader will be filled in when setObjects() is called
    this.objects = [];
    this.sampleCount = 0;
    this.tracerProgram = null;
}

Render.prototype = {
    setObjects: function(objects){
        if(this.tracerProgram != null) {
            gl.deleteProgram(this.shaderProgram);
        }
        this.sampleCount=0;
        this.objects = objects;
        this.tracerProgram = getProgram(makeTracerVertexShader(this.objects), makeTracerFragmentShader(this.objects));
        this.tracerVertexAttribute = gl.getAttribLocation(this.tracerProgram, 'vertex');
        gl.enableVertexAttribArray(this.tracerVertexAttribute);
    },
    
    render:function(timeSinceStart){
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.useProgram(this.renderProgram);
        eye = Vector.create([viewX, viewY, viewZ]);
        //gl.bindTexture(gl.TEXTURE_2D, this.textures[0]);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(this.renderVertexAttribute, 2, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        
        var modelview = makeLookAt(eye.elements[0], eye.elements[1], eye.elements[2], 0, 0,0, 0, 1, 0);
        var projection = makePerspective(55, 1, 0.1, 100);
        var modelviewProjection = projection.multiply(modelview);
        
        var jitter = Matrix.Translation(Vector.create([Math.random() * 2 - 1, Math.random() * 2 - 1, 0]).multiply(1 / 512));
        var inverse = jitter.multiply(modelviewProjection).inverse();
        this.modelviewProjection=modelviewProjection;
        var matrix = inverse;
        
        
        for(var i = 0; i < this.objects.length; i++) {
            this.objects[i].setUniforms(this);
          }
        this.uniforms.eye = eye;
        this.uniforms.glossiness = glossiness;
        this.uniforms.timeSinceStart = timeSinceStart;
        /*this.uniforms.ray00 = getEyeRay(matrix, -0.5, -0.5);
        this.uniforms.ray01 = getEyeRay(matrix, -0.5, +0.5);
        this.uniforms.ray10 = getEyeRay(matrix, +0.5, -0.5);
        this.uniforms.ray11 = getEyeRay(matrix, +0.5, +0.5);*/
        this.uniforms.ray00 = getEyeRay(matrix, -1, -1);
        this.uniforms.ray01 = getEyeRay(matrix, -1, +1);
        this.uniforms.ray10 = getEyeRay(matrix, +1, -1);
        this.uniforms.ray11 = getEyeRay(matrix, +1, +1);
        this.uniforms.textureWeight = this.sampleCount / (this.sampleCount+1);
        gl.useProgram(this.tracerProgram);
        setUniforms(this.tracerProgram, this.uniforms);
        
        gl.useProgram(this.tracerProgram);
        gl.bindTexture(gl.TEXTURE_2D, this.textures[0]);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.textures[1], 0);
        gl.vertexAttribPointer(this.tracerVertexAttribute, 2, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        
        this.textures.reverse();
        this.sampleCount++;
    },
<<<<<<< Updated upstream
    setProperty:function(selMaterial, selMatMore, selRGB){
        this.objects[this.selectedIndex].material = selMaterial;
        var rgb = selRGB.split(',');
        this.objects[this.selectedIndex].color = Vector.create([parseFloat(rgb[0]),parseFloat(rgb[1]),parseFloat(rgb[2])]);
        this.tempColor = this.objects[this.selectedIndex].color;
        glossiness = selMatMore/100.0;

        this.setObjects(this.objects);
        this.selectedIndex = -1;
        this.selectedObject = null;
=======
    setProperty:function(selMaterial, selRGB){
        this.objects[this.selectedIndex].material = selMaterial;
        var rgb = selRGB.split(',');
        this.objects[this.selectedIndex].color = Vector.create([parseFloat(rgb[0]),parseFloat(rgb[1]),parseFloat(rgb[2])]);
        this.setObjects(this.objects);
>>>>>>> Stashed changes
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
        this.objects.unshift(new Light(new Vector(0,0,0),new Vector(0,0,0)));
        this.renderer.setObjects(this.objects);
    },

    render:function(timeSinceStart){
        this.renderer.render(timeSinceStart);
    },
    mouseDown: function(x,y){
        //change highlighted back to normal
<<<<<<< Updated upstream
    /*    if(this.renderer.tempColor != null){
            this.objects[this.renderer.selectedIndex].color = this.renderer.tempColor;
            this.renderer.selectedIndex = -1;
            this.renderer.selectedObject = null;
=======
        if(this.renderer.tempColor != null){
            this.objects[this.renderer.selectedIndex].color = this.renderer.tempColor;
            this.renderer.selectedIndex = -1;
>>>>>>> Stashed changes
            this.renderer.setObjects(this.objects);
            hideProperty();
            this.renderer.tempColor = null;
        }
<<<<<<< Updated upstream
    */
        var t =  Number.MAX_VALUE;
        var origin = eye;
        var ray = getEyeRay(this.renderer.modelviewProjection.inverse(), (x / 512) * 2 - 1, 1 - (y / 512) * 2);
        
            // test the selection box first
        if(this.renderer.selectedIndex != -1) {
            var minBounds = this.renderer.selectedObject.getMinCorner();
            var maxBounds = this.renderer.selectedObject.getMaxCorner();
            t = Cube.intersect(origin, ray, minBounds, maxBounds);

            if(t < Number.MAX_VALUE) {
              var hit = origin.add(ray.multiply(t));

              if(Math.abs(hit.elements[0] - minBounds.elements[0]) < 0.001) this.movementNormal = Vector.create([-1, 0, 0]);
              else if(Math.abs(hit.elements[0] - maxBounds.elements[0]) < 0.001) this.movementNormal = Vector.create([+1, 0, 0]);
              else if(Math.abs(hit.elements[1] - minBounds.elements[1]) < 0.001) this.movementNormal = Vector.create([0, -1, 0]);
              else if(Math.abs(hit.elements[1] - maxBounds.elements[1]) < 0.001) this.movementNormal = Vector.create([0, +1, 0]);
              else if(Math.abs(hit.elements[2] - minBounds.elements[2]) < 0.001) this.movementNormal = Vector.create([0, 0, -1]);
              else this.movementNormal = Vector.create([0, 0, +1]);

              this.movementDistance = this.movementNormal.dot(hit);
              this.originalHit = hit;
              this.moving = true;

              return true;
            }
        }

        this.renderer.selectedObject = null;
        this.renderer.selectedIndex = -1;
        t =  Number.MAX_VALUE;
=======
        var t =  Number.MAX_VALUE;
        var origin = eye;
        var ray = getEyeRay(this.renderer.modelviewProjection.inverse(), (x / 512) * 2 - 1, 1 - (y / 512) * 2);
        this.renderer.selectedObject = null;
        this.renderer.selectedIndex = -1;
>>>>>>> Stashed changes
        for(var i = 1; i < this.objects.length; i++) {
            var objectT = this.objects[i].intersect(origin, ray);
            if(objectT < t) {
                t = objectT;
                this.renderer.selectedObject = this.objects[i];
                this.renderer.selectedIndex = i;
            }
        }
       
        if(t < Number.MAX_VALUE){
            this.renderer.tempColor = this.objects[this.renderer.selectedIndex].color;
            this.objects[this.renderer.selectedIndex].color = Vector.create([0.0,1.0,1.0]);
            this.renderer.setObjects(this.objects);
<<<<<<< Updated upstream
            showProperty(this.renderer.selectedObject.material, this.renderer.tempColor.toStringVal());

        }
        return (t < Number.MAX_VALUE);

    },
    mouseMove:function(x, y){
        if(this.moving ) {
            if(this.renderer.selectedIndex==-1){
                this.moving = false;
                return;
            }
            var origin = eye;
            var ray = getEyeRay(this.renderer.modelviewProjection.inverse(), (x / 512) * 2 - 1, 1 - (y / 512) * 2);

            var t = (this.movementDistance - this.movementNormal.dot(origin)) / this.movementNormal.dot(ray);
            var hit = origin.add(ray.multiply(t));
            this.renderer.selectedObject.temporaryTranslate(hit.subtract(this.originalHit));

            // clear the sample buffer
            this.renderer.sampleCount = 0;
        }
    },
    mouseUp: function(x, y){
        if(this.moving) {
            var origin = eye;
            var ray = getEyeRay(this.renderer.modelviewProjection.inverse(), (x / 512) * 2 - 1, 1 - (y / 512) * 2);

            var t = (this.movementDistance - this.movementNormal.dot(origin)) / this.movementNormal.dot(ray);
            var hit = origin.add(ray.multiply(t));
            this.renderer.selectedObject.temporaryTranslate(Vector.create([0, 0, 0]));
            this.renderer.selectedObject.translate(hit.subtract(this.originalHit));
            this.moving = false;
        }
    }
  
=======
            showProperty(x,y);
        }
    }
>>>>>>> Stashed changes
}



//-----Shapes class
//--Cube (this is just a rectangle sample, cube not implemented) 
function Cube(minCorner, maxCorner, id,color,material) {
  this.minCorner = minCorner;
  this.maxCorner = maxCorner;
  this.minStr = 'cubeMin' + id;
  this.maxStr = 'cubeMax' + id;
  this.intersectStr = 'tCube' + id;
  this.temporaryTranslation = Vector.create([0, 0, 0]);
  this.material = material;
  this.color = color==undefined ? Vector.create([0.75,0.75,0.75]):color;
}

Cube.prototype.getVariableSetupCode = function() {
  return '' +
' uniform vec3 ' + this.minStr + ';' +
' uniform vec3 ' + this.maxStr + ';';
};

Cube.prototype.getIntersectCode = function() {
  return '' +
' vec2 ' + this.intersectStr + ' = intersectCube(origin, ray, ' + this.minStr + ', ' + this.maxStr + ');';
};

Cube.prototype.getShadowCode = function() {
  return '' +
  this.getIntersectCode() +
' if(' + this.intersectStr + '.x > 0.0 && ' + this.intersectStr + '.x < 1.0 && ' + this.intersectStr + '.x < ' + this.intersectStr + '.y) return 0.0;';
};

Cube.prototype.getMinimumIntersectCode = function() {
  return '' +
' if(' + this.intersectStr + '.x > 0.0 && ' + this.intersectStr + '.x < ' + this.intersectStr + '.y && ' + this.intersectStr + '.x < t) t = ' + this.intersectStr + '.x;';
};

/*Cube.prototype.getNormalCalculationCode = function() {
  return '' +
  // have to compare intersectStr.x < intersectStr.y otherwise two coplanar
  // cubes will look wrong (one cube will "steal" the hit from the other)
' else if(t == ' + this.intersectStr + '.x && ' + this.intersectStr + '.x < ' + this.intersectStr + '.y) normal = normalForCube(hit, ' + this.minStr + ', ' + this.maxStr + ');';
};*/
Cube.prototype.getNormalCalculationCode = function() {
  return '' +
  // have to compare intersectStr.x < intersectStr.y otherwise two coplanar
  // cubes will look wrong (one cube will "steal" the hit from the other)
' else if(t == ' + this.intersectStr + '.x && ' + this.intersectStr + '.x < ' + this.intersectStr + '.y) {normal = normalForCube(hit, ' + this.minStr + ', ' + this.maxStr + ');'+[newDiffuseRay, newReflectiveRay, newGlossyRay,newRefractiveRay][this.material]+
      ' surfaceColor = vec3'+this.color.toString()+';}';
//      ', ' + this.maxStr + ');'+[newDiffuseRay, newReflectiveRay, newGlossyRay,newRefractiveRay][this.material]+'}';
};


Cube.prototype.setUniforms = function(renderer) {
  renderer.uniforms[this.minStr] = this.getMinCorner();
  renderer.uniforms[this.maxStr] = this.getMaxCorner();
};

Cube.prototype.temporaryTranslate = function(translation) {
  this.temporaryTranslation = translation;
};

Cube.prototype.translate = function(translation) {
  this.minCorner = this.minCorner.add(translation);
  this.maxCorner = this.maxCorner.add(translation);
};

Cube.prototype.getMinCorner = function() {
  return this.minCorner.add(this.temporaryTranslation);
};

Cube.prototype.getMaxCorner = function() {
  return this.maxCorner.add(this.temporaryTranslation);
};

Cube.prototype.intersect = function(origin, ray) {
  return Cube.intersect(origin, ray, this.getMinCorner(), this.getMaxCorner());
};

Cube.intersect = function(origin, ray, cubeMin, cubeMax) {
  var tMin = cubeMin.subtract(origin).componentDivide(ray);
  var tMax = cubeMax.subtract(origin).componentDivide(ray);
  var t1 = Vector.min(tMin, tMax);
  var t2 = Vector.max(tMin, tMax);
  var tNear = t1.maxComponent();
  var tFar = t2.minComponent();
  if(tNear > 0 && tNear < tFar) {
    return tNear;
  }
  return Number.MAX_VALUE;
};

Sphere = function(center, radius, id,color,material){
    this.center = center;
    this.radius = radius;
    this.centerVar = 'sCenter'+id;
    this.radiusVar = 'sRadius'+id;
    this.intersectVar = 'tSphere' + id;
    this.material = material;
    this.color = color==undefined ? Vector.create([0.75,0.75,0.75]):color;
    this.temporaryTranslation = Vector.create([0, 0, 0]);
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
    ' else if(t == ' + this.intersectVar + ') {normal = normalForSphere(hit, ' + this.centerVar + ', ' + this.radiusVar + ');'+[newDiffuseRay, newReflectiveRay, newGlossyRay,newRefractiveRay][this.material]+
        ' surfaceColor = vec3'+this.color.toString()+'; }';
    },
    /*getNormalCalculationCode : function() {
    return '' +
    ' else if(t == ' + this.intersectVar + ') {normal = normalForSphere(hit, ' + this.centerVar + ', ' + this.radiusVar + ');'
        //+'}';
        +[newDiffuseRay, newReflectiveRay, newGlossyRay,newRefractiveRay][this.material]+'}';
    },*/
    setUniforms:function(renderer){
        renderer.uniforms[this.centerVar] = this.center;
        renderer.uniforms[this.radiusVar] = this.radius;
    },
    getMinCorner: function() {
        return this.center.add(this.temporaryTranslation).subtract(Vector.create([this.radius, this.radius, this.radius]));
    },
    getMaxCorner: function() {
      return this.center.add(this.temporaryTranslation).add(Vector.create([this.radius, this.radius, this.radius]));
    },
<<<<<<< Updated upstream
    intersect: function(origin, ray){
        return Sphere.intersect(origin, ray, this.center.add(this.temporaryTranslation), this.radius);
    },
    temporaryTranslate:function(translation){
        this.temporaryTranslation = translation;
    },
    translate: function(translation) {
      this.center = this.center.add(translation);
=======
        intersect: function(origin, ray){
        return Sphere.intersect(origin, ray, this.center.add(this.temporaryTranslation), this.radius);
>>>>>>> Stashed changes
    }

}

Sphere.intersect = function(origin, ray, center, radius) {
  var toSphere = origin.subtract(center);
  var a = ray.dot(ray);
  var b = 2*toSphere.dot(ray);
  var c = toSphere.dot(toSphere) - radius*radius;
  var discriminant = b*b - 4*a*c;
  if(discriminant > 0) {
    var t = (-b - Math.sqrt(discriminant)) / (2*a);
    if(t > 0) {
      return t;
    }
  }
  return Number.MAX_VALUE;
};
function RealLight(direction,lightColor){
    this.color=lightColor;
    this.direction=direction;
}
//----Light class
Light = function(direction,lightColor){
    this.lightStr=new Array();
    this.temporaryTranslation = Vector.create([0, 0, 0]);
    for(var i=0;i<lights.length;i++){
        this.lightStr[i]="light"+i;
    }
    this.lightColorStr=new Array();
    for(var i=0;i<lights.length;i++){
        this.lightColorStr[i]="lightColor"+i;
    }
}
Light.prototype = {
    setUniforms : function(renderer) {
        for(var i=0;i<lights.length;i++){
            renderer.uniforms[this.lightStr[i]] = lights[i].direction.add(this.temporaryTranslation);
            renderer.uniforms[this.lightColorStr[i]] = lights[i].color;
        }
    },
    getVariableSetupCode: function(){
        var tmp="";
        for(var i=0;i<lights.length;i++){
            tmp+='uniform vec3 light'+i+';';
            tmp+='uniform vec3 lightColor'+i+';';
        }
      return tmp;
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
<<<<<<< Updated upstream
    },
    temporaryTranslate :function(translation) {
      var tempLight = light.add(translation);
      Light.clampPosition(tempLight);
      this.temporaryTranslation = tempLight.subtract(light);
    }
}
Light.clampPosition = function(position) {
  for(var i = 0; i < position.elements.length; i++) {
    position.elements[i] = Math.max(0.1 - 1, Math.min(1 - 0.1, position.elements[i]));
  }
};
=======
    }
}
>>>>>>> Stashed changes

//----geometry construction functions
function makeSphereColumn(){
    var objects = [];
<<<<<<< Updated upstream
    objects.push(new Sphere(Vector.create([0, 0.70, 0]), 0.15, nextObjectId++,Vector.create([0.75, 0.75, 0.75]),3));
//    objects.push(new Sphere(Vector.create([0, 0.25, 0]), 0.30, nextObjectId++,Vector.create([0.75, 0.75, 0.75]),0));
//    objects.push(new Sphere(Vector.create([0, -0.35, 0]), 0.30, nextObjectId++,Vector.create([0.75, 0.75, 0.75]),2));
    objects.push(new Sphere(Vector.create([0, -0.75, 0]), 0.40, nextObjectId++,Vector.create([0.75, 0.75, 0.75]),1));
    objects.push(new Cube( Vector.create([0.5, -0.75, -0.5]), Vector.create([0.9, -0.7, 0.5]) , nextObjectId++,Vector.create([0.75, 0.75, 0.75]),3)); 
=======
    objects.push(new Sphere(Vector.create([0, 0.70, 0]), 0.15, nextObjectId++,Vector.create([0.75, 0.75, 0.75]),1));
    objects.push(new Sphere(Vector.create([0, 0.25, 0]), 0.30, nextObjectId++,Vector.create([0.75, 0.75, 0.75]),0));
    objects.push(new Sphere(Vector.create([0, -0.35, 0]), 0.30, nextObjectId++,Vector.create([0.75, 0.75, 0.75]),2));
    objects.push(new Sphere(Vector.create([0, -0.75, 0]), 0.40, nextObjectId++,Vector.create([0.75, 0.75, 0.75]),2));
    objects.push(new Cube( Vector.create([0.5, -0.75, -0.5]), Vector.create([0.9, -0.7, 0.5]) , nextObjectId++,Vector.create([0.75, 0.75, 0.75]),0)); 
>>>>>>> Stashed changes
    //objects.push(new Cube( Vector.create([-0.5, -0.5, -0.5]), Vector.create([0.5,0.5, 0.5]) , nextObjectId++,1)); 
    
    //objects.push(new Cube( Vector.create([-0.99, -0.99, -0.99]), Vector.create([0.99,0.99, 0.99]) , nextObjectId++,1)); 
    //objects.push(new Cube( Vector.create([3, -2.95, 3]), Vector.create([-3, -2.96, -3]) , nextObjectId++,1)); 
<<<<<<< Updated upstream
//    objects.push(new Cube( Vector.create([-3, -3, -2.99]), Vector.create([3, 3, -3]) , nextObjectId++,Vector.create([0.75, 0.75, 0.75]),1)); 
=======
    objects.push(new Cube( Vector.create([-3, -3, -2.99]), Vector.create([3, 3, -3]) , nextObjectId++,Vector.create([0.75, 0.75, 0.75]),1)); 
>>>>>>> Stashed changes
    //objects.push(new Cube( Vector.create([3, -3, 3]), Vector.create([2.99, 3, -3]) , nextObjectId++,1)); 
    //objects.push(new Cube( Vector.create([-3, -3, -3]), Vector.create([-2.99, 3, 3]) , nextObjectId++,1)); 
    
    
    return objects;
}
<<<<<<< Updated upstream
=======


>>>>>>> Stashed changes
function makeCubes(){
    var objects = [];
    objects.push(new Cube( Vector.create([-3, -3, -2.99]), Vector.create([3, 3, -3]) , nextObjectId++,Vector.create([0.75, 0.75, 0.75]),1)); 
    objects.push(new Cube( Vector.create([-1, -1, 0.6]), Vector.create([1,-0.6,1]) , nextObjectId++,Vector.create([0, 0.75, 0.75]),1)); 
    objects.push(new Cube( Vector.create([-1, 0.6, 0.6]), Vector.create([1,1,1]) , nextObjectId++,Vector.create([0, 0.75, 0.75]),1)); 
    objects.push(new Cube( Vector.create([-1, -0.6, 0.6]), Vector.create([-0.6,0.6,1]) , nextObjectId++,Vector.create([0, 0.75, 0.75]),1)); 
    objects.push(new Cube( Vector.create([0.6, -0.6, 0.6]), Vector.create([1,0.6,1]) , nextObjectId++,Vector.create([0, 0.75, 0.75]),1)); 
    
    
    objects.push(new Cube( Vector.create([-1, -1, -0.6]), Vector.create([1,-0.6,-1]) , nextObjectId++,Vector.create([0, 0.75, 0.75]),1)); 
    objects.push(new Cube( Vector.create([-1, 0.6, -0.6]), Vector.create([1,1,-1]) , nextObjectId++,Vector.create([0, 0.75, 0.75]),1)); 
    objects.push(new Cube( Vector.create([-1, -0.6, -0.6]), Vector.create([-0.6,0.6,-1]) , nextObjectId++,Vector.create([0, 0.75, 0.75]),1)); 
    objects.push(new Cube( Vector.create([0.6, -0.6, -0.6]), Vector.create([1,0.6,-1]) , nextObjectId++,Vector.create([0, 0.75, 0.75]),1)); 
    
    
    objects.push(new Cube( Vector.create([-1, -1, -1]), Vector.create([-0.6,-0.6,1]) , nextObjectId++,Vector.create([0, 0.75, 0.75]),1)); 
    objects.push(new Cube( Vector.create([0.6, -1, -1]), Vector.create([1,-0.6,1]) , nextObjectId++,Vector.create([0, 0.75, 0.75]),1)); 
    objects.push(new Cube( Vector.create([-1, 0.6, -1]), Vector.create([-0.6,1,1]) , nextObjectId++,Vector.create([0, 0.75, 0.75]),1)); 
    objects.push(new Cube( Vector.create([0.6, 0.6, -1]), Vector.create([1,1,1]) , nextObjectId++,Vector.create([0, 0.75, 0.75]),1)); 

    
    objects.push(new Sphere(Vector.create([0, 0, 0]), 0.60, nextObjectId++,Vector.create([0.75, 0.75, 0.75]),2));
    return objects;
}
function makeCube(){
    var objects = [];
    objects.push(new Cube( Vector.create([-3, -3, -2.99]), Vector.create([3, 3, -3]) , nextObjectId++,Vector.create([0.75, 0.75, 0.75]),1)); 
    objects.push(new Cube( Vector.create([-0.5, -0.5, -0.5]), Vector.create([0.5, 0.5,0.5]) , nextObjectId++,Vector.create([0, 0.75, 0.75]),1)); 
    objects.push(new Sphere(Vector.create([0, 0, 0]),Math.sqrt(0.65), nextObjectId++,Vector.create([1, 1,1]),1));
    return objects;
}
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
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


function handleLoadedTexture(texture) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.bindTexture(gl.TEXTURE_2D, null);
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
<<<<<<< Updated upstream
//    console.log(fShaderStr);
=======
    console.log(fShaderStr);
>>>>>>> Stashed changes
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
'   vec3 calculateColor(vec3 origin, vec3 ray, vec3 light,vec3 lightColor) {' +
//light color
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
//'       else if(hit.x > 2.9999) surfaceColor = vec3(0.43, 0.05, 0.81);'+ // purple
    //'if(hit.x < -2.9999) { float step = 0.3; float y = hit.y/step; if (y-floor(y)<0.5) surfaceColor = vec3(1,1,1); else surfaceColor = vec3(0,0,0);}'+
    'if(hit.x < -2.9999) { float step = 0.3; float y = hit.y/step; float z = hit.z/step; if (y-floor(y)<0.5 && z-floor(z)<0.5) surfaceColor = vec3(1,1,1); if(y-floor(y)<0.5 && z-floor(z)>0.5) surfaceColor = vec3(0,0,0); if (y-floor(y)>0.5 && z-floor(z)<0.5) surfaceColor = vec3(0,0,0); if(y-floor(y)>0.5 && z-floor(z)>0.5) surfaceColor = vec3(1,1,1);}'+
    //'else if(hit.x > 2.9999) { float step = 0.3; float y = hit.y/step; float z = hit.z/step; if (y-floor(y)<0.5 && z-floor(z)<0.5) surfaceColor = vec3(1,1,1); if(y-floor(y)<0.5 && z-floor(z)>0.5) surfaceColor = vec3(0,0,0); if (y-floor(y)>0.5 && z-floor(z)<0.5) surfaceColor = vec3(0,0,0); if(y-floor(y)>0.5 && z-floor(z)>0.5) surfaceColor = vec3(1,1,1);}'+
    'else if(hit.x > 2.9999) surfaceColor = vec3(0.43, 0.05, 0.81);'+
        newDiffuseRay +
'     } else if(t == 10000.0) { '+
'       break;' +
'     } else {' +
'       if(false) ;' + // hack to discard the first 'else' in 'else if'
        concat(objects, function(o){ return o.getNormalCalculationCode(); }) +
        //[newDiffuseRay, newReflectiveRay, newGlossyRay,newRefractiveRay][material] +
'     }' +

      // compute diffuse lighting contribution
'     vec3 toLight = light - hit;' +
'     float diffuse = max(0.0, dot(normalize(toLight), normal));' +

      // trace a shadow ray to the light
'     float shadowIntensity = shadow(hit + normal * 0.001, toLight);' +

      // do light bounce
'     lightColor *= surfaceColor;' +
'     accumulatedColor += lightColor * (0.5 * diffuse * shadowIntensity);' +
'     accumulatedColor += lightColor * specularHighlight * shadowIntensity;' +

      // calculate next origin
'     origin = hit;' +
'   }' +

'   return accumulatedColor;' +
' }';
}

function makeMain() {
    var newLightStr="";
    var tmpColorStr="vec3 tmp_Color = (calculateColor(eye, initialRay, newLight0,lightColor0)";
    for(var i=0;i<lights.length;i++){
        newLightStr+='   vec3 newLight'+i+' = light'+i+' + uniformlyRandomVector(timeSinceStart - 53.0) * 0.1;';
    }
    for(var i=1;i<lights.length;i++){
        tmpColorStr+='+'+'calculateColor(eye, initialRay, newLight'+i+',lightColor'+i+')';
    }
    tmpColorStr+=(lights.length==1)?");":")*"+1/lights.length+";";
    
    
    
  return '' +
' void main() {' +
//'   vec3 lightColor0=vec3(1);vec3 lightColor1=vec3(1,0,0);vec3 lightColor2=vec3(1);vec3 lightColor3=vec3(1);' +     
'   vec3 texture = texture2D(texture, gl_FragCoord.xy / 512.0).rgb;' +
      newLightStr+tmpColorStr+
'   gl_FragColor = vec4(mix(tmp_Color, texture, textureWeight), 1.0);' +
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
' vec3 roomCubeMin = vec3(-3.0, -3.0, -3.0);' +
' vec3 roomCubeMax = vec3(3.0, 3.0, 3.0);';
<<<<<<< Updated upstream
=======
//' vec3 roomCubeMin = vec3(-3.0, -3.0, -3.0);' +
//' vec3 roomCubeMax = vec3(3.0, 3.0, 3.0);';
>>>>>>> Stashed changes

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

//linchi
var newRefractiveRay = 
<<<<<<< Updated upstream
' float ratio = 1.0;'+
=======
' float ratio = 1.1;'+
>>>>>>> Stashed changes
' if(dot(ray,normal) < 0.0001){'+
' normal = -normal;'+
' ratio = 1.0/ratio;}'+
' ray = normalize(ray);'+
' ray = normalize(refract(ray, normal, ratio));'+
' vec3 refractedLight = normalize(refract(light - hit, normal, ratio));'+
' specularHighlight = max(0.0, dot(refractedLight, normalize(hit - origin)));'
//' specularHighlight = 0.0;';


//zyy
var renderVertexSource =
' attribute vec3 vertex;' +
' varying vec2 texCoord;' +
' void main() {' +
'   texCoord = vertex.xy * 0.5 + 0.5;' +
'   gl_Position = vec4(vertex, 1.0);' +
' }';

var renderFragmentSource =
' precision highp float;' +
' varying vec2 texCoord;' +
' uniform sampler2D texture;' +
' void main() {' +
'   gl_FragColor = texture2D(texture, texCoord);' +
' }';

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

Vector.prototype.toString = function(){
    return '('+this.elements.join(', ')+')';
}
<<<<<<< Updated upstream
Vector.prototype.toStringVal = function(){
    return this.elements.join(', ');
}
=======
>>>>>>> Stashed changes
Vector.prototype.divideByW = function() {
  var w = this.elements[this.elements.length - 1];
  var newElements = [];
  for(var i = 0; i < this.elements.length; i++) {
    newElements.push(this.elements[i] / w);
  }
  return Vector.create(newElements);
};

Vector.prototype.componentDivide = function(vector) {
  if(this.elements.length != vector.elements.length) {
    return null;
  }
  var newElements = [];
  for(var i = 0; i < this.elements.length; i++) {
    newElements.push(this.elements[i] / vector.elements[i]);
  }
  return Vector.create(newElements);
};


Vector.min = function(a, b) {
  if(a.length != b.length) {
    return null;
  }
  var newElements = [];
  for(var i = 0; i < a.elements.length; i++) {
    newElements.push(Math.min(a.elements[i], b.elements[i]));
  }
  return Vector.create(newElements);
};

Vector.max = function(a, b) {
  if(a.length != b.length) {
    return null;
  }
  var newElements = [];
  for(var i = 0; i < a.elements.length; i++) {
    newElements.push(Math.max(a.elements[i], b.elements[i]));
  }
  return Vector.create(newElements);
};

Vector.prototype.minComponent = function() {
  var value = Number.MAX_VALUE;
  for(var i = 0; i < this.elements.length; i++) {
    value = Math.min(value, this.elements[i]);
  }
  return value;
};

Vector.prototype.maxComponent = function() {
  var value = -Number.MAX_VALUE;
  for(var i = 0; i < this.elements.length; i++) {
    value = Math.max(value, this.elements[i]);
  }
  return value;
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



//lc

function canvasMousePos(event) {
  var mousePos = eventPos(event);
  var canvasPos = elementPos(canvas);
  return {
    x: mousePos.x - canvasPos.x,
    y: mousePos.y - canvasPos.y
  };
}

function eventPos(event) {
  return {
    x: event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
    y: event.clientY + document.body.scrollTop + document.documentElement.scrollTop
  };
}

function elementPos(element) {
  var x = 0, y = 0;
  while(element.offsetParent) {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  }
  return { x: x, y: y };
}

<<<<<<< Updated upstream
function showProperty(material, color){
    $( "#popup" ).show("slide", { direction: "right" }, 1000);
    $( "#material" ).val(material);
    $('#materialAdjust').val(100 * glossiness);
    $("#rgb").val(color);
}

function hideProperty(){   
   $('#popup').toggle( "slide" );

}

=======
function showProperty(x,y){
    document.getElementById('popup').style.display = "block";
    document.getElementById('popup').style.left = ''+x+'px';
    document.getElementById('popup').style.top = ''+y+'px';
}

function hideProperty(){
    document.getElementById('popup').style.display = "none";
}

function setProperty(){
}
>>>>>>> Stashed changes
