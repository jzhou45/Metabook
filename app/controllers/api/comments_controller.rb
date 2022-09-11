class Api::CommentsController < ApplicationController
    def create
        @comment = Comment.new(comment_params)
        @comment.save ? (render :show) : (render json: @comment.errors.full_messages, status: 422)
    end

    def show
        @comment = Comment.find(params[:id])
        render :show
    end

    def update
        @comment = Comment.find(params[:id])
        @comment.update(comment_params) ? (render :show) : (render json: @comment.errors.full_messages, status: 422)
    end

    def destroy
        @comment = Comment.find(params[:id])
        if @comment
            @comment.delete
            render :show
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    private

    def comment_params
        params.require(:comment).permit(:user_id, :post_id, :comment)
end
