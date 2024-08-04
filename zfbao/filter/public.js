		var tempContext = null; // global variable 2d context
		var defaultContext = null; // 保留原来的
		window.onload = function() {
			var source = document.getElementById("source");
			var canvas = document.getElementById("target");
			canvas.width = source.clientWidth;
			canvas.height = source.clientHeight;
			
			if (!canvas.getContext) {
			    console.log("Canvas not supported. Please install a HTML5 compatible browser.");
			    return;
			}
			
			// get 2D context of canvas and draw image
			tempContext = canvas.getContext("2d");
			tempContext.drawImage(source, 0, 0, canvas.width, canvas.height);
			defaultContext = tempContext.getImageData(0, 0, canvas.width, canvas.height);
	        // initialization actions
	        var deButton = document.getElementById("default-button");
	        var inButton = document.getElementById("invert-button");
	        var adButton = document.getElementById("adjust-button");
	        var blurButton = document.getElementById("blur-button");
	        var reButton = document.getElementById("relief-button");
	        var dkButton = document.getElementById("diaoke-button");
	        var mirrorButton = document.getElementById("mirror-button");

	        var rgbaButton = document.getElementById("rgba-button");

	        // bind mouse click event
	        bindButtonEvent(deButton, "click", defaultColor);
	        bindButtonEvent(inButton, "click", invertColor);
	        bindButtonEvent(adButton, "click", adjustColor);
	        bindButtonEvent(blurButton, "click", blurImage);
	        bindButtonEvent(reButton, "click", fudiaoImage);
	        bindButtonEvent(dkButton, "click", kediaoImage);
	        bindButtonEvent(mirrorButton, "click", mirrorImage);

	        bindButtonEvent(rgbaButton, "click", removeRgbaImage);
		}
		
		function bindButtonEvent(element, type, handler)  
		{  
			if(element.addEventListener) {  
			   element.addEventListener(type, handler, false);  
			} else {  
			   element.attachEvent('on'+type, handler); // for IE6,7,8
			}  
		}  
		
		function defaultColor() {
			var canvas = document.getElementById("target");
			var canvasData = tempContext.getImageData(0, 0, canvas.width, canvas.height);
			tempContext.putImageData(defaultContext, 0, 0);
		}

		function removeRgbaImage(){
			var rgbaInput = document.getElementById("rgba-input").value;
			rgbaInput = rgbaInput.split(',');
			var ran = 1;
			var canvas = document.getElementById("target");
			var len = canvas.width * canvas.height * 4;
			var canvasData = tempContext.getImageData(0, 0, canvas.width, canvas.height);
			var binaryData = canvasData.data;
			// len == binaryData.length;
			for (var i = 0; i < len; i += 4) {
		        var r = binaryData[i];
		        var g = binaryData[i + 1];
		        var b = binaryData[i + 2];
		        var iR = false, iG = false, iB = false;
		        if( r == rgbaInput[0]) iR = true;
		        if( g == rgbaInput[1]) iG = true;
		        if( b == rgbaInput[2]) iB = true;
		        if(iR && iG && iB) {
		        	binaryData[i + 3] = 0;
		        	console.log('remove');
		        }
		        // if( r > rgbaInput[0]-ran && r < rgbaInput[0] + ran) iR = true;
		        // if( g > rgbaInput[1]-ran && g < rgbaInput[1] + ran) iG = true;
		        // if( b > rgbaInput[2]-ran && r < rgbaInput[2] + ran) iB = true;
		        // if(r == rgbaInput[0] && g == rgbaInput[1] && b == rgbaInput[2]){
		        	
		        // }
		    }
		    tempContext.putImageData(canvasData, 0, 0);

		}

		function invertColor() {
			var canvas = document.getElementById("target");
			var len = canvas.width * canvas.height * 4;
			var canvasData = tempContext.getImageData(0, 0, canvas.width, canvas.height);
			var binaryData = canvasData.data;
	        
	        // Processing all the pixels
	        gfilter.colorInvertProcess(binaryData, len);

	        // Copying back canvas data to canvas
	        tempContext.putImageData(canvasData, 0, 0);
		}
		
		function adjustColor() {
			var canvas = document.getElementById("target");
			var len = canvas.width * canvas.height * 4;
			var canvasData = tempContext.getImageData(0, 0, canvas.width, canvas.height);
	        var binaryData = canvasData.data;
	        
	        // Processing all the pixels
	        gfilter.colorAdjustProcess(binaryData, len);

	        // Copying back canvas data to canvas
	        tempContext.putImageData(canvasData, 0, 0);
		}
		
		function blurImage() 
		{
			var canvas = document.getElementById("target");
			var len = canvas.width * canvas.height * 4;
			var canvasData = tempContext.getImageData(0, 0, canvas.width, canvas.height);
	        
	        // Processing all the pixels
	        gfilter.blurProcess(tempContext, canvasData);

	        // Copying back canvas data to canvas
	        tempContext.putImageData(canvasData, 0, 0);
		}
			
		function fudiaoImage() 
		{
			var canvas = document.getElementById("target");
			var len = canvas.width * canvas.height * 4;
			var canvasData = tempContext.getImageData(0, 0, canvas.width, canvas.height);
	        
	        // Processing all the pixels
	        gfilter.reliefProcess(tempContext, canvasData);

	        // Copying back canvas data to canvas
	        tempContext.putImageData(canvasData, 0, 0);
		}
		
		function kediaoImage() 
		{
			var canvas = document.getElementById("target");
			var len = canvas.width * canvas.height * 4;
			var canvasData = tempContext.getImageData(0, 0, canvas.width, canvas.height);
	        
	        // Processing all the pixels
	        gfilter.diaokeProcess(tempContext, canvasData);

	        // Copying back canvas data to canvas
	        tempContext.putImageData(canvasData, 0, 0);
		}
		
		function mirrorImage() 
		{
			var canvas = document.getElementById("target");
			var len = canvas.width * canvas.height * 4;
			var canvasData = tempContext.getImageData(0, 0, canvas.width, canvas.height);
	        
	        // Processing all the pixels
	        gfilter.mirrorProcess(tempContext, canvasData);

	        // Copying back canvas data to canvas
	        tempContext.putImageData(canvasData, 0, 0);
		}