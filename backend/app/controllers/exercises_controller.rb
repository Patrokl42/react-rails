class ExercisesController < ApplicationController
  def index
    @exercises = Exercise.page(params[:page])
    render status: :ok
  end
end
