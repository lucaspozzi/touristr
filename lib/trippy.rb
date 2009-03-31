module Trippy
  def city?
    false
  end

  def attraction?
    false
  end

  def area?
    false
  end
  alias_method :country?, :area?
  
  def city
    nil
  end
end