/*eslint-env browser*/
$(function()
 {
    //changing width of pointer to slider value
   $("#slider").slider(
   {
       min:3,
       max :30,
       slide:function(event,ui)
       {
           $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth = ui.value;
       }
   }); 
   
    //variable for painting or erasing
     var paint =false;
    
    var paint_erase = "paint";
    var canvas = document.getElementById("paint");
    var ctx = canvas.getContext("2d");
    
    
    var container = $("#drawingpad");
    var mouse = {x : 0,y:0};
    
    
    //onload local storage
    if(localStorage.getItem("imgCanvas") != null)
    {
        var img = new Image();
        img.onload = function()
                  {
           ctx.drawImage(img,0,0); 
        }
        img.src= localStorage.getItem("imgCanvas");
    };
    
    
    
    
    //set drawing parameters
    ctx.lineWidth=3;
    ctx.lineJoin="round";
    ctx.lineCap="round";
    
    
    //click inside container
    //when drawing pad is clicked to draw
    container.mousedown(function(e)
                       {
       paint = true;
       ctx.beginPath();
       mouse.x = e.pageX-this.offsetLeft;
       mouse.y = e.pageY-this.offsetTop;
        
        ctx.moveTo(mouse.x,mouse.y);
    });
    
    
    //color input
    $("#paintcolor").change(function()
                           {
        $("#circle").css("background-color",$(this).val());

    });
    
    
    
    
    
    //when mouse is moved for drawing
     container.mousemove(function(e)
                       {
       
       mouse.x = e.pageX-this.offsetLeft;
       mouse.y = e.pageY-this.offsetTop;
        if(paint==true)
            {
                if(paint_erase=="paint")
                    {
                        ctx.strokeStyle=$("#paintcolor").val();
                    }
                else{
                    ctx.strokeStyle="white";
                }
                ctx.lineTo(mouse.x,mouse.y);
                ctx.stroke();
            }
        
    });
    
    //when mouse is up
    container.mouseup(function()
    {
                      paint = false;
                      
    });
    
    
    //when we leave drawing pad
    container.mouseleave(function()
                        {
       paint = false; 
    });
    
    
    //buttons
    
    //setting erase button
    $("#erase").click(function()
                     {
       if(paint_erase == "paint")
           {
               paint_erase = "erase";
           }
        else{
             paint_erase = "paint";
        }
        $(this).toggleClass("eraseMode");
    });
    
    
    
    //setting reset button
    $("#reset").click(function()
                     {
       ctx.clearRect(0 , 0 , canvas.width, canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    });
    
    //setting Save button through HTML local storage
    $("#save").click(function()
                    {
        if(typeof(localStorage) != null)
            {
                localStorage.setItem("imgCanvas", canvas.toDataURL());
                
            }
        else{
            window.alert("Your browser does not support local storage");
        }
    });
    
    
    
});