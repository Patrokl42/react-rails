class StaticController < ApplicationController
  def home
    render json: { status: "It's works" }
  end
end
