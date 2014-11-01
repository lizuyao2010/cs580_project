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
        ui.setobjects(makeSphere());
    }
    
}
Render = function()
{
    
}
UI = function()
{
    this.render = new Render();
}
UI.prototype.setobjects= function(objects)
{
    
}
makeSphere = function()
{
    var objects=[];
    return objects;
}