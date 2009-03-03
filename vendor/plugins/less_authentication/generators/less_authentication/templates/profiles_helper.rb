module PeopleHelper
  
  
  
  def icon person = nil, size = :small
    return image_tag(icon_path( person, size), :class => size) if person.blank?
    img_tag = image_tag icon_path( person, size), :title=>person.user.login, :alt=>person.user.login, :class=>"#{size} left avatar"
    img_tag rescue ''
  end
  
  
  
  def icon_path person = nil, size = :small
    default = "/images/avatar_#{size}.png"
    return default if person.blank?
    x = url_for_image_column(person, :icon, size) rescue default
    x.blank? ? default : x
  end
end
