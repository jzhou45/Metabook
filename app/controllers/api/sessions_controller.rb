class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(
          params[:user][:email],
          params[:user][:password]
        )
    
        if @user
          login(@user)
          render "api/users/show"
        else
          render json: ["The email you entered isn't connected to an account or the password you've entered is incorrect."], status: 401
        end
      end
    
      def destroy
        @user = current_user
        if @user
          logout
          render "api/users/show"
        else
          render json: ["Nobody signed in."], status: 404
        end
      end
end
