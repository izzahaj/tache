class Api::V1::AuthController < ApplicationController
  def login
    user = User.find_by(usernam: login_params[:username])
    if user && user.authenticate(login_params[:password])
      payload = {user_id: user.id}
      token = encode_token(payload)
      render json: {user: UserSerializer.new(user), jwt: token}, status: :accepted
    else
      render json: {failure: "Invalid username or password"}, status: :unauthorized
    end
  end

  def auto_login
    render json: {user: UserSerializer.new(current_user)}, status: :accepted
  end

  private

  def login_params
    params.require(:user).permit(:username, :password)
  end
end