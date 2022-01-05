class Api::V1::TasksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_task, only: [:show, :edit, :update, :destroy]
  
  def index
    if params[:description].present? || params[:priority].present? || params[:sort_value].present? || params[:tag_list].present?
      @tasks = Task.search(params[:description], params[:priority], params[:sort_value], params[:tag_list])
    else
      @tasks = Task.all.order(deadline: :asc, description: :asc)
    end
    render json: @tasks
  end

  def today
    if params[:description].present? || params[:priority].present? || params[:sort_value].present? || params[:tag_list].present?
      @tasks = Task.today.search(params[:description], params[:priority], params[:sort_value], params[:tag_list])
    else
      @tasks = Task.today.order(description: :asc)
    end
    render json: @tasks
  end

  def tomorrow
    if params[:description].present? || params[:priority].present? || params[:sort_value].present? || params[:tag_list].present?
      @tasks = Task.tomorrow.search(params[:description], params[:priority], params[:sort_value], params[:tag_list])
    else
      @tasks = Task.tomorrow.order(description: :asc)
    end
    render json: @tasks
  end

  def show
    if @task
      render json: @task
    else
      render json: @task.errors
    end
  end

  def new
    @task = Task.new
  end

  def create
    @task = Task.new(task_params)  
    tags_to_add = params[:task][:tag_list]
    tags_to_add.each do |name|
      tag_to_add = Tag.find_or_create_by(name: name)
      @task.tags << tag_to_add
    end

    if @task.save
      render json: @task
    else
      render json: @task.errors
    end
  end

  def update
    @task = Task.find(params[:id])
    tags_to_add = params[:task][:tag_list]
    tag_names = []
    tags_to_add.each do |name|
      tag_to_add = Tag.find_or_create_by(name: name)
      tag_names << tag_to_add
    end

    @task.tags = tag_names

    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors
    end
  end

  def destroy
    @task.destroy
    render json: { notice: 'Task deleted.'}
  end

  private

    def set_task
      @task = Task.find(params[:id])
    end
    
    def task_params
      params.require(:task).permit(:description, :deadline, :priority, :tag_list => [])
    end
end
