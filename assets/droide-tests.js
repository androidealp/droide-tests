(function ( $ ) {


 
    $.fn.DroideTests = function() {

    	var jsongenerate = {};
    	var $css = 'position:absolute; bottom:0; left:0; width:100%;background:rgba(169, 68, 66,0.5); color:#fff;';

    	var $styleElement = "<style type='text/css'>";
    	$styleElement += ".droidetestsHover{border:2px solid #ff0000;}";
    	$styleElement += ".droide-menu-clique{width: 200px; position:absolute;}";
    	$styleElement += ".droide-menu-clique li{background-color: #eee;color: black;display: block;padding: 12px;text-decoration: none;}";
    	$styleElement += ".droide-menu-clique li:hover{background-color: #ccc;cursor:pointer}";
    	$styleElement += ".droide-menu-clique li:focus{background-color: #4CAF50;}";
    	
    	$styleElement += "</style>";
    	$styleElement += menu();

    	var ambient = $(this);

    	ambient.after($styleElement);

	 	 ambient.append('<div class="alert alert-danger" style="'+$css+'"><button type="button" class="close" style="color:#fff; opacity:1;" data-dismiss="alert" aria-hidden="true">&times;</button> Você está no modo interativo de tests</div>');    	

	      ambient.on('click','a,button,input[type="submit"]',function(e){

	      	if(!$(this).is('[droide]'))
	      	 {
	      	 	e.preventDefault();

	      	 	positions = positionMenu($(this).offset(), e, $(this).parent());

				$('#droide-menu-clique').css({'top':positions.x, 'left':positions.y});	      	 	

	      	    $('#droide-menu-clique').show('slow');

	      		console.log(positions);

	      	 }
	      		


	      }); 

	      ambient.on('mouseover','*',function(e){

	      	 if(!$(this).is('[droide]'))
	      	 {
	      	 	$(this).addClass('droidetestsHover');
	      	 	ambient.find(':selected').text();
	      	 }
	      		
	      		

	      		//console.log(element);
	      });  

	      ambient.on('mouseout','*',function(e){

	      	if(!$(this).is('[droide]'))
	      	 {
	      	 	$(this).removeClass('droidetestsHover');


	      	 }
	      		
	      		

	      		//console.log($(this));
	      }); 


	      function menu()
	      {
	      	var html = '<ul id="droide-menu-clique" droide="1" class="droide-menu-clique" style="display:none">';
	      		html += '<li id="droide-link-interno" droide="1">link interno</li>';
	      		html += '<li id="droide-link-externo" droide="1">link externo</li>';
	      		html += '<li id="droide-ajax" droide="1">ajax</li>';
	      		html += '<li id="droide-login" droide="1">login</li>';
	      		html += '<li id="droide-formulario" droide="1">formulario</li>';
	      		html += '</ul>';

	      	return html;
	      } 

	      function positionMenu(offset, e, wrapper)
	      {
	      	
	      	var parentOffset = offset; 
   			var relX = e.pageX - parentOffset.left + wrapper.scrollLeft();
   			var relY = e.pageY - parentOffset.top  + wrapper.scrollTop();

   			return {x:relX, y:relY}

	      }

    };
 
}( jQuery ));