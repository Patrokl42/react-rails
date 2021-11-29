class RegistrationsController < ApplicationController
  def create
    is_user_exist = User.exists?(email: params['user']['email']);
    
    if !is_user_exist 
      user = User.create!(
        email: params['user']['email'],
        password: params['user']['password'],
        password_confirmation: params['user']['password_confirmation']
      )

      if user
        session[:user_id] = user.id
        render json: {
          user: user
        }, status: :ok
      else
        render status: :internal_server_error
      end

    else
      render json: { 
        error: {
          message: "There is already a user with this email"
        }
       }, status: :conflict
    end
  end
end
