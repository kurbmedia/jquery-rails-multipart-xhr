(function(){

	window.helper = {
		node: function(){
			return $('#test_editor');
		},
		
		edit: function(){
			helper.node().html('<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sagittis metus elit. Nulla tincidunt lorem tristique velit feugiat vehicula.</p>')
			return new Edit();
		},
		
		mknode: function(node){
			return document.createElement(node);
		},
		
		content: function(semantic){
			semantic = semantic || true;
			if( semantic ){
				return $("<p><strong>Bold text</strong> with some <em>italic text within it</em></p>");
			}
			return $("<p><b>Bold text</b> with some <i>italic text within it</i></p>");
		}
	};
	
	
	
})();