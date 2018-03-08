(function ( $ ) {

    $.fn.DroideTests = function() {

		atributos = {seletor:''};
		
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

				   modalDroide();

				  // verificandoElementoClicado(element)

	      	 	
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
				
				if(typeof this.atributos.seletor != 'undefined' &&  this.atributos.seletor)
				{
					analiseAction(elemento);
					
				}
				
		  }

		  function analiseAction(elemento)
		  {

			informebutton = confirm("Este clique é um ajax?");

			if(informebutton == true)
			{
				this.atributos.typelink = 'ajax';
			}else{

				informebutton = confirm("Este clique é um link para página interna?");

				if(informebutton == true)
				{
					this.atributos.typelink = 'link';
					this.atributos.urllink = elemento.attr('href');
				}
			}

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

	      function modalDroide()
	      {

			var html = '<div id="modaldroide" class="modalDroide" droide ="true">';
			    html += ' <div class="modal-content" droide ="true">';
				html += '   <a href="#close" title="Close" class="closeDroide" droide ="true">X</a>';
				html += '   <h2 droide ="true">Modal Box</h2>';
				html += '   <p droide ="true">This is a sample modal box that can be created using the powers of CSS3.</p>';
				html += '   <p droide ="true">You could do a lot of things here like have a pop-up ad that shows when your website loads, or create a login/register form for users.</p>';
				html += ' </div>';
				html += '</div>';

			  $('body').append(html);

			  
			  modal = $('#modaldroide');

			  modal.css({'display':'block'});
			  
	      } 

	      

    };
 
}( jQuery ));