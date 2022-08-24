class Api::PostsController < ApplicationController
    def create
        @post = Post.new(post_params)
        @post.save ? (render :show) : (render json: @post.errors.full_messages, status: 422)
    end

    def index
        @posts = Post.all
        render :index
    end

    def show
        @post = Post.find(params[:id])
        render :show
    end

    def update
        @post = Post.find(params[:id])
        @post.update(post_params) ? (render :show) : (render json: @post.errors.full_messages, status: 422)
    end

    private

    def post_params
        params.require(:post).permit(:user_id, :content, :photo)
    end
end
