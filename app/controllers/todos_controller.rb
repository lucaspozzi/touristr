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
    @t.add @todo
    post_response !@todo.new_record? do |page|
      page.insert_html :bottom, 'todos_list', :partial=>'list_item'
      page.insert_html :bottom, 'trip_bar', :partial=>'list_item', :locals=>{:dom_id=>@todo.trip_item.dom_id}
    end
  end
  
  
  def update
    @todo = @p.todos.find params[:id]
    post_response @todo.update_attributes( params[:todo]) do |page|
      page.replace @todo.dom_id('in_list'), :partial=>'list_item'
      page.replace @todo.trip_item.dom_id, :partial=>'list_item'
    end
  end
  
  
  def destroy
    @todo = @p.todos.find params[:id]
    @todo.destroy
    respond_to do |wants|
      wants.js do
        render :update do |page|
          page.remove @todo.dom_id 'in_list'
          page.remove @todo.trip_item.dom_id
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
            yield page
            page.replace 'new_todo', :partial=>'form'
          else
            page.alert @todo.errors.to_s
          end
        end
      end
    end
  end
end
