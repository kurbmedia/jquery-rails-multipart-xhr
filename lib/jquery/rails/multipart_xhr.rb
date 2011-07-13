module Jquery
  module Rails
    module MultipartXHR
      if ::Rails.version < "3.1"
        require 'jquery/rails/multipart_xhr/railtie'
      else
        require 'jquery/rails/multipart_xhr/engine'
      end
      require 'jquery/rails/multipart_xhr/version'
    end
    
  end
end
