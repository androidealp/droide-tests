(function ( $ ) {

    $.fn.DroideTests = function() {

		atributos = {seletor:''};
		
    	var $css = 'position:absolute; bottom:0; left:0; width:100%;background:rgba(169, 68, 66,0.5); color:#fff;';

    	var $styleElement = "<style type='text/css'>";
    	$styleElement += "[droideclasshover]{border:2px solid #ff0000;}";
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
				   
				   var element = $(this);

				   console.log("verificando elemento clicado....");

				   verificandoElementoClicado(element)

	      	 	// positions = positionMenu($(this).offset(), e, $(this).parent());

				// $('#droide-menu-clique').css({'top':positions.x, 'left':positions.y});	      	 	

	      	    // $('#droide-menu-clique').show('slow');

	      		//console.log(positions);

	      	 }
	      		


	      }); 

	      ambient.on('mouseover','*',function(e){

	      	 if(!$(this).is('[droide]'))
	      	 {
				   //$(this).addClass('droidetestsHover');

				   $(this).attr('droideclasshover','');
				   
				  // $(this).css({'border':'2px solid #ff0000'});
	      	 	//ambient.find(':selected').text();
	      	 }
	      		
	      		

	      		//console.log(element);
	      });  

	      ambient.on('mouseout','*',function(e){

	      	if(!$(this).is('[droide]'))
	      	 {
				   //$(this).removeClass('droidetestsHover');

				   $(this).removeAttr('droideclasshover');
				   
				  // $(this).css({'border':'2px solid #ff0000'});

	      	 }
	      		
	      		

	      		//console.log($(this));
	      }); 

		
		  function verificandoElementoClicado(elemento)
		  {
				getseletor = '';

				if(typeof elemento.attr('id') != 'undefined')
				{
				
					this.atributos.seletor = '#'+elemento.attr('id');
				}else{
					rasterizebeforetag(elemento);
				}

				analiseSelector();
				
				console.log(this.atributos);
		  }

		  function analiseSelector()
		  {
			var patt = new RegExp(":eq\(\d{1,10000}\)",'g');

			if(patt.test(this.atributos.seletor ))
			{
				console.log('agora entrou o regex');

				var repseletor = str.replace(patt, "");
				var getEQ = patt.exec(this.atributos.seletor );
				this.atributos.seletor = repseletor;
				this.atributos.eq = getEQ;

				return ;
			}

			if($(this.atributos.seletor ).length != 1)
			{
				itens = [];
				$.each($(this.atributos.seletor ), function(i,e){
					if($(this).text() != '')
					{
						itens.push('index ['+i+'] valor = '+$(this).text());
					}else{
						itens.push('index ['+i+'] valor = icone ou imagem');
					}
				});

				var getseletor = prompt("O seletor não é unico, ou não foi encontrado, mude para uma construção unica. caso não seja possível unificar o seletor use :eq(index). Encontrado:\n"+itens.join('\n'), this.atributos.seletor );
					if(getseletor != null)
					{
						this.atributos.seletor = String(getseletor);
						analiseSelector();
					}else{
						this.atributos.seletor = false;
					}
					
			}

		  }

		  function rasterizebeforetag(elemento,codeSeletor='')
		  {

			if(elemento.prop('tagName') =='BODY')
			{
				console.log(this.atributos);
				this.atributos.seletor = 'BODY'+codeSeletor;
			}

			if(typeof elemento.attr('class') != 'undefined')
			{
				firstClass = elemento.attr('class').split(' ')[0];

				if(firstClass != '' && $('.'+firstClass).length == 1)
				{

					testuniqueelements = $('.'+firstClass+codeSeletor);

					if(testuniqueelements.length == 1)
					{
						return '.'+firstClass+codeSeletor;
					}else{
						codeSeletor = '.'+firstClass+codeSeletor;
						return rasterizebeforetag(elemento.parent(), " "+codeSeletor);
					}

					
				}else if(firstClass != '' &&  $('.'+firstClass).length > 1)
				{
					codeSeletor = '.'+firstClass+codeSeletor;
				}
			}

				if($(elemento.prop("tagName")).length == 1)
				{

					testuniqueelements = $(elemento.prop("tagName")+codeSeletor);

					if(testuniqueelements.length == 1)
					{
						return elemento.prop("tagName")+codeSeletor;
					}else{
						codeSeletor = elemento.prop("tagName")+codeSeletor;
						return rasterizebeforetag(elemento.parent(), " "+codeSeletor);
					}

					

				}else if($(elemento.prop("tagName")).length > 1)
				{
					codeSeletor = elemento.prop("tagName")+codeSeletor;
				}

				

				if(typeof elemento.parent() == "object" && elemento.parent().length == 1)
				{
					return rasterizebeforetag(elemento.parent(), " "+codeSeletor);
				}

		  }

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