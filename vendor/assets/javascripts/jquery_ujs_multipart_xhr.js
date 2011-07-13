/**
 * Unobtrusive scripting adapter for jQuery
 *
 * Tested with jQuery 1.6.0 or later.
 * https://github.com/kurbmedia/jquery-rails-multipart-xhr
 *
 * Uploading file using rails.js
 * =============================
 *
 * Rails' default jQuery-ujs provides means for handling AJAX requests in which a remote form contains file inputs
 * with values. Adding this adapter expands on that functionality to add support for native XHR uploads when supported
 * by the browser.
 *
 * This add-on binds to the `ajax:aborted:file` event and overrides rails.ajax to bundle File objects into the request 
 * to be sent to the server. In addition, it adds a progress event to jQuery's AJAX handler to track upload progress.
 *
 * Ex:
 *     $('form').live('progress', function( event, xhr ){
 *     		event.loaded // the total bytes uploaded
 * 			event.total  // the total bytes to be sent. This is somewhat estimated but is reasonably accurate
 *			event.percent // a numeric percent of the current progress
 *     });
 *
 * The `progress` event is fired in intervals as the request is sent to the server.
 *
 * To help with tracking progress, the `ajax:upload:start` event is triggered right before the .ajax call is made
 * and receives a single parameter (in addition to the event itself) with a number representing the total number of 
 * file bytes to be sent with the request. 
 *
 *
 *
**/
(function( jQuery ){
	
	var originalXHR = jQuery.ajaxSettings.xhr,
		rails = jQuery.rails;
	
	
	jQuery.extend(rails, {
		
		// Enable / disable ajax file uploading.
		enableXHRUpload: true,
		
		// Check to see if the browser supports XHR uploading
		XHRUploadSupport: function(){
			var xhr;
			if( typeof XMLHttpRequest == 'undefined' ) return false;
			xhr = new XMLHttpRequest();
			return !! (xhr && ('upload' in xhr) && ('onprogress' in xhr.upload)); 
		},
		
		// Check to see if the browser supports the file API
		fileApiSupport: function(){
			var input  = document.createElement('INPUT');
			input.type = 'file';
			return 'files' in input;
		},
		
		buildMultipartPost: function( form ) {
			var data = new FormData(), 
				post = jQuery(form).serializeArray(), 
				totalSize = 0;
				
			jQuery.each( post, 
				function( ind, obj ){			
					data.append( obj.name, obj.value );
				});		
			jQuery(":file", form).each(
				function(){
					var field = jQuery(this),
						node  = field.get(0);
					if( node.files[0] ){
						data.append( field.attr("name"), node.files[0] );
						totalSize = totalSize + node.files[0].fileSize;
					}
				});		
			return [data, totalSize];
		},
		
		handleRemoteUpload: function( form, options ){
			var data = rails.buildMultipartPost( form );
			options.contentType = false;
			options.processData = false;			
			options.data        = data[0];
			options.context     = form;
			rails.fire( form, 'ajax:upload:start', [ data[1] ] );
			return jQuery.ajax( options );
		}
		
	});
	
	// Explicitly disable XHR uploading if the browser doesn't support it.
	if( !rails.XHRUploadSupport() && !rails.fileApiSupport() ){
		rails.enableXHRUpload = false;
	}
	
	// Recieves a progress event and returns an object representing the progress of the upload.
	function calculateProgress( event ){
		return { loaded: event.loaded, total: event.total,
			percent: parseInt( (event.loaded / event.total * 100), 10) };
	}
	
	function progressHandler( event, req ){
		var attrs;								
		if( event.lengthComputable ){
			attrs = calculateProgress( event );
		}else{
			attrs = { loaded: null, total: null, percent: null };
		}		
		
		jQuery.event.trigger( jQuery.Event('progress', attrs), [ req ] );
        this.progress( jQuery.Event('progress', attrs), req );
	}
		
	
	function handle_files( event, inputs ){		
		var form = jQuery(this);		
		if( rails.enableXHRUpload ){
			rails.ajax = function( options ){ 
				rails.handleRemoteUpload( jQuery(form), options ); 
			};
			rails.handleRemote( form );
			return false;
		}		
		return true;
	}
	
	
	// Setup AJAX to support progress callbacks.
	jQuery.ajaxSetup({
        progress: function(){},
        xhr: function() {
            var nReq = originalXHR(), that = this;
            if( nReq ){	
				if( typeof nReq.onprogress != 'undefined' ){					
					nReq.onprogress = function( event ){
						progressHandler.apply(that, [event, nReq]);
					};					
					if( typeof nReq.upload != 'undefined' ){
						nReq.upload.onprogress = function( event ){
							progressHandler.apply(that, [event, nReq]);
						};
					}
				}
            }
            return nReq;
        }
    });
	
	
	jQuery(function(){
		jQuery(jQuery.rails.formSubmitSelector)
			.bind('ajax:aborted:file', handle_files)
			.live('ajax:aborted:file', handle_files);
	});
	
	$(document).ajaxError(function( event, xhr, error ){
		console.log(error, xhr, event);
	});
	
})( jQuery );