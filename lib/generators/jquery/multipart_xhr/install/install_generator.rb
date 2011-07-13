require 'rails'

module Jquery
  module MultipartXHR
    
    module Generators
      class InstallGenerator < ::Rails::Generators::Base

        desc "This generator installs the jQuery-rails Multipart XHR files"
        source_root File.expand_path('../../../../../../vendor/assets/javascripts', __FILE__)

        def copy_multipart_xhr_driver
          say_status("copying", "jQuery UJS Multipart XHR adapter (#{Jquery::Rails::JQUERY_MULTIPART_XHR_VERSION})", :green)
          copy_file "jquery_ujs_multipart_xhr.js", "public/javascripts/jquery_ujs_multipart_xhr.js"
        end

      end
    end
  end
end if ::Rails.version < "3.1"