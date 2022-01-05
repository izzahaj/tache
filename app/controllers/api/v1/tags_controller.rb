class Api::V1::TagsController < ApplicationController
  def index
    @tags = Tag.all.order(name: :asc)
    render json: @tags
  end

  def destroy
    @tag.destroy
    render json: { notice: 'Tag deleted.' }
  end

  private

    def set_tag
      @tag = Tag.find(params[:id])
    end
end
