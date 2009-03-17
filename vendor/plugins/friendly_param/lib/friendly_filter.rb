require 'record_moved'

module ActionController

  module FriendlyFilter
    
    def self.included(base)
      base.alias_method_chain :rescue_action, :friendly_filter
    end
    
    # three_oh_one is a filter for your controller that catches RecordMoved
    # errors raised during an ActiveRecord#find method on friendly_param
    # enabled models
    #    
    def rescue_action_with_friendly_filter(ex)      
      if ex.kind_of?(ActiveRecord::RecordMoved) && request.get?
        redirect_301 record_moved_url(ex.record)
      else
        rescue_action_without_friendly_filter(ex)
      end
    end
    
    # remove any trailing slashes from the request
    # since these create two URLs for the same resource
    #
    def remove_trailing_slashes
      if request.path.match(/\/$/) && request.path.size > 1
        redirect_301 request.request_uri.sub(/\/(\?|$)/,'\1')
        return false
      end
    end
    
    # generate the correct url for
    #
    def record_moved_url(record)
      #
      # try and handle nested resources by checking if the param is available
      # that correctly identifies the nested item.
      #
      # side effect: when using #to_param and .find('8-blah') 
      #
      overwrite_param = if params[record.class.to_s.foreign_key]
        record.class.to_s.foreign_key
      elsif params[record.class.primary_key]
        record.class.primary_key
      else
        # could not find a URL to fix...
        # try to give a useful help message so that the URL can be fixed
        # gather posible suspects for bad params
        bad_param_suspects = params.reject{|k,v| !(v =~ /#{record.id}/)}.map{|k,v| [k,v]}
        tip = case bad_param_suspects.size
        when 0
          ''
        when 1
          %{TIP:
            Try using params[:#{bad_param_suspects.first[0]}].to_i 
            OR name the parameter :#{record.class.to_s.foreign_key} instead of :#{bad_param_suspects.first[0]} and let the plugin redirect.
          }
        else
          %{TIP:            
            Take a look at how you are using the following params, maybe call #to_i
            on the one you used to try and find the #{record.class.name}
            #{bad_param_suspects.map{|pair| ":#{pair[0]}"}.join(',')}.
          }
        end
        raise ::ActiveRecord::RecordNotFound, %{
          This RecordNotFound error is most likely rasied becuase you declared friendly_param for #{record.class.name.downcase.pluralize} 
          and then tried to use #{record.class.name}.find('#{record.id}') instead of #{record.class.name}.find(#{record.id})

          #{tip}
          To disable strict checking of record id's in URLs please use
          
          friendly_param :name, :strict => false
        }.squeeze(' ')
      end
      url_for(overwrite_param => record)
    end
    
    # same as redirect_to but uses 301 instead of 302
    #
    def redirect_301(url_opts)
      erase_results
      redirect_to url_opts
      headers["Status"] = interpret_status(301)
    end

  end
end
