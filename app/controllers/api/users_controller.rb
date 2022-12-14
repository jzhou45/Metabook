require 'open-uri'

class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)

        @user.about_me = ""

        profile_photo = URI.open("https://metabook-seed.s3.amazonaws.com/default_pfp.webp")
        @user.profile_photo.attach(io: profile_photo, filename: 'default_pfp.webp')

        cover_photo = URI.open("https://metabook-seed.s3.amazonaws.com/default_cover_photo.jpeg")
        @user.cover_photo.attach(io: cover_photo, filename: 'default_cover_photo.jpeg')

        if @user.save
            login(@user)
            render "api/users/show"
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def show
        @user = User.find(params[:id])
        render :show
    end

    def index
        @users = User.all
        render :index
    end

    def update
        @user = User.find(params[:id])
        if @user.update(user_params)
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end
    
    private

    def user_params
        params.require(:user).permit(:email, :password, :first_name, :last_name, :birthday, :gender, :profile_photo, :cover_photo, :about_me)
    end
end
