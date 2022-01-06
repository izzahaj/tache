class Api::V1::TagsController < ApplicationController
  before_action :set_tag, only: [:show, :destroy]

  def index
    @tags = Tag.order(name: :asc)
    render json: @tags
  end

  def destroy
    @tag.destroy
    render json: { notice: 'Tag deleted.' }
  end

  def get_tag_list
    @tag_list = Tag.joins(:taggings).where(taggings: { task_id: params[:id]})
    render json: @tag_list
  end
  
  private

    def set_tag
      @tag = Tag.find(params[:id])
    end
end
