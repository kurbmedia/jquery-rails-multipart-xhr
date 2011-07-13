# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require File.expand_path('../lib/jquery/rails/multipart_xhr/version', __FILE__)

Gem::Specification.new do |s|
  s.name        = "jquery-rails-multipart-xhr"
  s.version     = Jquery::Rails::MultipartXHR::VERSION
  s.authors     = ["Brent Kirby"]
  s.email       = ["brent@kurbmedia.com"]
  s.homepage    = "https://github.com/kurbmedia/jquery-rails-multipart-xhr"
  s.summary     = %q{Adds additional support for XHR file uploads to jquery_ujs}
  s.description = %q{Rails' default jQuery-ujs provides means for handling AJAX requests in which a remote form contains file inputs with values. Adding this adapter expands on that functionality to add support for native XHR uploads when supported by the browser.}

  s.required_rubygems_version = ">= 1.3.6"
  s.rubyforge_project = "jquery-rails-multipart-xhr"
  s.add_dependency "railties", "~> 3.0"
  s.add_dependency "thor",     "~> 0.14"
  s.add_development_dependency "bundler", "~> 1.0.0"
  s.add_development_dependency "rails",   "~> 3.0"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]
  
end
