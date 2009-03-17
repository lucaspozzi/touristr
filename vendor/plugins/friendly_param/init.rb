# 
# load friendly_param plugin and include the macro on
# AR::Base
#
require 'friendly_param'
ActiveRecord::Base.send :include, ActiveRecord::Acts::FriendlyParam

# load a filter to catch RecordMoved redirect errors
#
require 'friendly_filter'
ActionController::Base.send :include, ActionController::FriendlyFilter
ActionController::Base.before_filter :remove_trailing_slashes, :only => [:show, :index]

