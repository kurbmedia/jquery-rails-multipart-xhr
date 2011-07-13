# Jquery-rails Multipart XHR

Rails' default jQuery-ujs provides means for handling AJAX requests in which a remote form contains file inputs with values. Adding this adapter expands on that functionality to add support for native XHR uploads when supported by the browser.

## Rails 3.1

The gem is configured to work out of the box with the asset pipeline. In `apps/assets/javascripts/application.js` add the following

	//= require jquery
	//= require jquery_ujs
	//= require jquery_ujs_multipart_xhr
	
Make sure to include jquery and jquery_ujs first, as this library extends the default ujs functionality to support file uploads.

## Rails 3.0

Generators are included for copying files to public/javascripts. Either download the `jquery_ujs_multipart_xhr.js` file and add it to your project, or add the gem to your Gemfile and run the generator.

	gem "jquery-rails-multipart-xhr"

## Usage

As with the official ujs library, multipart-xhr is unobtrusive in how it functions. When included, forms are automatically updated to support the additional functionality, provided the browser supports it. Currently the following supports XHR uploading natively:

* Safari / Chrome (latest)
* Firefox 3.6+

To utilize progress events in your form, bind the `progress` event.

	$('form').bind('progress', function( event ){ ... your code here. });
	
The progress event is populated with 3 values for tracking submission progress:

`loaded`: The bytes currently completed
`total`: The total number of bytes in the request. ( note, this is a approximate (though fairly accurate) number provided by XHRHttpRequest, see below for getting more accurate totals )
`percent`: An integer representing the percent complete ( for convenience really )

Because the `total` provided by XHRHttpRequest isn't always 100% accurate, an additional event `ajax:upload:start` is provided which passes the total bytes of all attached files from their native File objects.

	$('form').bind('ajax:upload:start', function( event, bytes ){
		// bytes = a sum of all of the attached files, populated from the
		// input.files[x].fileSize property.
	});
	

## Supporting IE?

In the future we've considered adding support for a flash-based fallback for our friend Internet Explorer ( at least until they releast version 19 and finally catch up ) though I'd be interested to know any thoughts people may have on that. Ideally this would include Rack middleware to handle processing files prior to form submission, and then "re-attach" those files back to the resulting form submission. Suggestions are very welcome!

## Contributing

File uploading still sucks, mostly due to shoddy browser support (cough... IE), so any suggestions, pull request, ideas, etc to help enhance the user experience are very welcome. As are bug reports etc of course!

### Copyright

Copyright (c) 2011 Brent Kirby / Kurb Media LLC. Licensed under the MIT license. Do whatever you want with it, just give me a shout if you do something cool k? :)



