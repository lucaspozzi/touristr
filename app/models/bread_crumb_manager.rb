class BreadCrumbManager

  require 'facets/dictionary'
  
  def self.mark_destination_as_visited(session, destination)  
    if session[:visited_destinations].nil?
      session[:visited_destinations] = Dictionary.new
    end      
    #mark current
    session[:current_destination_id] = destination.id     
    session[:visited_destinations][destination.id] = destination.name
    #optimization - return them 
#      RAILS_DEFAULT_LOGGER.debug "in session"
#      RAILS_DEFAULT_LOGGER.debug "#{session[:visited_destinations].inspect}"
#      RAILS_DEFAULT_LOGGER.debug "in session"
    return session[:visited_destinations]
  end

  def self.remove_destination(session, destination)  
    session[:visited_destinations].delete(destination.id) unless session[:visited_destinations].nil?
  end

  def self.get_last_viewed_destination_id(session)      
    session[:visited_destinations].reverse.keys.each { | key | 
      return key
    }
    return nil
  end
  
  def self.get_current_destination_id(session)
    session[:current_destination_id]
  end
  
  def self.get_current_destination(session)
    Destination::Destination.find(get_current_destination_id(session))
  end

  def self.get_current_destination_name(session)
    get_visited_destinations(session).each { |id, name|
      if id == get_current_destination_id(session)
        return name
      end
    }
    return nil
  end

  def self.get_visited_destinations(session)
    session[:visited_destinations]
  end

end
