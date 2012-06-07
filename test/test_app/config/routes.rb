TestApp::Application.routes.draw do
  post 'upload' => 'index#upload', :as => :upload
  root :to => 'index#index'
end
