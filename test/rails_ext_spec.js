describe("rails.js extensions", function() {
 
	var rails;
	
	beforeEach(function(){
		rails = $.rails;
	});

 	it("adds a enableXHRUpload variable", function() {
		expect(rails.enableXHRUpload)
			.toBeDefined();
  });
	
	it("adds a XHRUploadSupport method", function() {
		expect(rails.XHRUploadSupport)
			.toBeDefined();
  });

	it("adds a fileApiSupport method", function() {
		expect(rails.fileApiSupport)
			.toBeDefined();
  });

	it("adds a buildMultipartPost method", function() {
		expect(rails.buildMultipartPost)
			.toBeDefined();
  });

	it("adds a handleRemoteUpload method", function() {
		expect(rails.handleRemoteUpload)
			.toBeDefined();
  });

});