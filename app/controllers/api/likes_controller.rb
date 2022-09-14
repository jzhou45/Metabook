class Api::LikesController < ApplicationController
    def create
        @like = Like.new(like_params)
        @like.save ? (render :show) : (render json: @like.errors.full_messages, status: 422)
    end

    def destroy
        @like = Like.find(params[:id])
        if @like
            @like.destroy
            render :show
        else
            render json: @like.errors.full_messages, status: 422
        end
    end

    private

    def like_params
        params.require(:like).permit(:user_id, :likeable_id, :likeable_type)
    end
end
