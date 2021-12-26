class Api::V1::TasksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_task, only: [:show, :edit, :update, :destroy]
  
  def index
    @tasks = Task.all.order(deadline: :asc, timedue: :asc)
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

  def edit
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      render json: @task
    else
      render json: @task.errors
    end
  end

  def update
    @task = Task.find(params[:id])
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
      params.permit(:description, :deadline, :timedue, :priority)
    end
end
