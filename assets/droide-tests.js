(function ( $ ) {

    $.fn.DroideTests = function() {

		$.fn.DroideTests.atributos = {seletor:'',seletoraction:'',tipolink:'',textoaction:''};

		$.fn.DroideTests.jsonRobo = [];
		
    	var $css = 'position:absolute; bottom:0; left:0; width:100%;background:rgba(169, 68, 66,0.5); color:#fff;';

    	var $styleElement = "<style type='text/css'>";
    	$styleElement += "[droideclasshover]{border:2px solid #ff0000;}";
		$styleElement += ".modalDroide{display: none;position: fixed;z-index: 1;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgb(0,0,0);background-color: rgba(0,0,0,0.4)}";
		$styleElement += ".modalDroide .modal-content {background-color: #fefefe;margin: 15% auto;padding: 20px;border: 1px solid #888;width: 80%;}";
		$styleElement += ".closeDroide {color: #aaa;float: right;font-size: 28px;font-weight: bold;}";
		$styleElement += ".closeDroide:hover,.close:focus{ color: black;text-decoration: none;cursor: pointer;}";
    	$styleElement += "</style>";

    	var ambient = $(this);

    	ambient.after($styleElement);

	 	 ambient.append('<div class="alert alert-danger" style="'+$css+'"><button type="button" class="close" style="color:#fff; opacity:1;" data-dismiss="alert" aria-hidden="true">&times;</button> Você está no modo interativo de tests</div>');    	

	      ambient.on('click','a,button,input[type="submit"]',function(e){

	      	if(!$(this).is('[droide]'))
	      	 {
				   e.preventDefault();
				   
				   var element = $(this);

				   

				  verificandoElementoClicado(element)

	      	 	
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
		  
		  $(document).on('click','[data-testdroidelink]',function(e){
			  e.preventDefault();
				var bt = $(this);
				var form = $(bt.data('testdroidelink'));
				var linkelemento = bt.data('linkelemento'); // verifica a necessidade
				var campos = form.find('input');

				$.each(campos,function(i,e){
					if($(this).attr('name') == 'tipolink' && $(this).is(':checked'))
					{
						$.fn.DroideTests.atributos.tipolink = $(this).val();
						
					}

					if($(this).attr('name') == 'seletor' && $(this).val() != '')
					{
						$.fn.DroideTests.atributos.seletoraction = $(this).val();
					}

					if($(this).attr('name') == 'texto' && $(this).val() != '')
					{
						$.fn.DroideTests.atributos.textoaction = $(this).val();
					}
					
				});

				$.fn.DroideTests.jsonRobo.push($.fn.DroideTests.atributos);
				$.fn.DroideTests.atributos = {};

				console.log($.fn.DroideTests.jsonRobo);

				$('#modaldroide').remove();

		  });

		
		  function verificandoElementoClicado(elemento)
		  {
				getseletor = '';

				if(typeof elemento.attr('id') != 'undefined')
				{
				
					$.fn.DroideTests.atributos.seletor = '#'+elemento.attr('id');
				}else{
					$.fn.DroideTests.rasterizebeforetag(elemento);
				}

				$.fn.DroideTests.analiseSelector();
				
				if(typeof $.fn.DroideTests.atributos.seletor != 'undefined' &&  $.fn.DroideTests.atributos.seletor)
				{
					$.fn.DroideTests.modalDroide(elemento);
					
				}
				
		  }

		 

		  $.fn.DroideTests.analiseSelector = function()
		  {
			var patt = new RegExp(":eq\(\d{1,10000}\)",'g');

			if(patt.test($.fn.DroideTests.atributos.seletor ))
			{
				console.log('agora entrou o regex');

				var repseletor = str.replace(patt, "");
				var getEQ = patt.exec($.fn.DroideTests.atributos.seletor );
				$.fn.DroideTests.atributos.seletor = repseletor;
				$.fn.DroideTests.atributos.eq = getEQ;

				return ;
			}

			if($($.fn.DroideTests.atributos.seletor ).length != 1)
			{
				itens = [];
				$.each($($.fn.DroideTests.atributos.seletor ), function(i,e){
					if($(this).text() != '')
					{
						itens.push('index ['+i+'] valor = '+$(this).text());
					}else{
						itens.push('index ['+i+'] valor = icone ou imagem');
					}
				});

				var getseletor = prompt("O seletor não é unico, ou não foi encontrado, mude para uma construção unica. caso não seja possível unificar o seletor use :eq(index). Encontrado:\n"+itens.join('\n'), $.fn.DroideTests.atributos.seletor );
					if(getseletor != null)
					{
						$.fn.DroideTests.atributos.seletor = String(getseletor);
						$.fn.DroideTests.analiseSelector();
					}else{
						$.fn.DroideTests.atributos.seletor = false;
					}
					
			}

		  }

		  $.fn.DroideTests.rasterizebeforetag = function(elemento,codeSeletor='')
		  {

			if(elemento.prop('tagName') =='BODY')
			{
				console.log($.fn.DroideTests.atributos);
				$.fn.DroideTests.atributos.seletor = 'BODY'+codeSeletor;
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
						return $.fn.DroideTests.rasterizebeforetag(elemento.parent(), " "+codeSeletor);
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
						return $.fn.DroideTests.rasterizebeforetag(elemento.parent(), " "+codeSeletor);
					}

					

				}else if($(elemento.prop("tagName")).length > 1)
				{
					codeSeletor = elemento.prop("tagName")+codeSeletor;
				}

				

				if(typeof elemento.parent() == "object" && elemento.parent().length == 1)
				{
					return $.fn.DroideTests.rasterizebeforetag(elemento.parent(), " "+codeSeletor);
				}

		  }

		  $.fn.DroideTests.modalDroide = function(elemento)
	      {

			var html = '<div id="modaldroide" class="modalDroide" droide ="true">';
			    html += ' <div id="formmodaldroide" class="modal-content" droide ="true">';
				html += '   <a href="#close" title="Close" class="closeDroide" droide="true">X</a>';
				html += '   <h2 droide ="true">Proriedades do link</h2>';
				html += '   <p droide ="true">Este clique é <input type="radio" droide="true" value="ajax" name="tipolink" /> Ajax, <input name="tipolink" type="radio" droide="true" value="link" /> link,<input name="tipolink" type="radio" droide="true" value="link" /> formulário</p>';
				html += '   <p droide ="true" style="display:none">link para verificar: '+elemento.attr('href')+'</p>';
				html += '   <div droide ="true"><input droide ="true" name="seletor" type="text" placeholder="Informe o seletor do retorno da ação" /> <input type="text" name="texto" droide ="true" placeholder="Informe o texto de retorno dentro da ação" /></div>';
				html += '   <div droide="true" data-testdroidelink="#modaldroide"><a href="#">Aplicar</a></div>';
				html += ' </div>';
				html += '</div>';

			  $('body').append(html);

			  
			  modal = $('#modaldroide');

			  modal.css({'display':'block'});
			  
	      } 

	      

    };
 
}( jQuery ));