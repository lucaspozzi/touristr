class TodosController < ApplicationController
  skip_before_filter :login_required
  
  
  def index
    @todos = @p.todos
    respond_to do |wants|
      wants.html { render }
    end
  end
  
  def create
    @todo = @p.todos.create params[:todo]
    post_response !@todo.new_record? do |page|
      page.insert_html :bottom, 'todos_list', :partial=>'list_item'
    end
  end
  
  
  def update
    @todo = @p.todos.find params[:id]
    post_response @todo.update_attributes( params[:todo]) do |page|
      page.replace @todo.dom_id('in_list'), :partial=>'list_item'
    end
  end
  
  
  def destroy
    @todo = @p.todos.find params[:id]
    @todo.delete
    respond_to do |wants|
      wants.js do
        render :update do |page|
          page.remove @todo.dom_id 'in_list'
        end
      end
    end
  end

  protected
  def post_response saved
    respond_to do |wants|
      wants.js do
        render :update do |page|
          if saved
            page.replace 'new_todo', :partial=>'form'
            yield page
          else
            page.alert @todo.errors.to_s
          end
        end
      end
    end
  end
end
