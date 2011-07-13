begin
  require 'jquery/rails/railtie'
rescue LoadError
end

module Jquery
  module Rails
    
    module MultipartXHR
      class Railtie < ::Rails::Railtie
        config.before_configuration do
          config.action_view.javascript_expansions[:defaults] << 'jquery_ujs_multipart_xhr'
        end
      end
    end
    
  end
end