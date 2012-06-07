class IndexController < ApplicationController
  respond_to :html, :js
  
  def index
  end
  
  def upload
    respond_with(true, :location => root_path)
  end
end
