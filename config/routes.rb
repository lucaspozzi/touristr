ActionController::Routing::Routes.draw do |map|
  map.resources :todos

  map.resources :trip_items

  map.resources :hotels do |hotel|
    hotel.resources :trip_items
  end
  map.resources :todos do |todo|
    todo.resources :trip_items
  end
  map.resources :destinations, :collection=>{:search=>:get}, :member=>{:translate => [:get,:post]} do |destination|
    destination.resources :attractions, :member => {:translate => [:get,:post],
                                                    :crop_picture => [:get,:post]}
    destination.resources :trip_items
    destination.resources :car_rental, :collection => {:search => :any,
                                                       :advanced_search => :any,
                                                       :choose => :any, 
                                                       :pay => :any, 
                                                       :confirm => :any}
  end
  map.resources :trips, :member=>{:sort=>:post}
  map.private_trip "/trips/private/:id", :controller=>'trips', :action=>'private'
  
  
  map.resources :people, :member=>{:delete_icon=>:delete} 
  map.login   "/login",   :controller=>'accounts', :action => 'login'
  map.logout  "/logout",  :controller=>'accounts', :action => 'logout'
  map.signup  "/signup",  :controller=>'accounts', :action => 'signup'
  map.home '/', :controller=>'home', :action => 'index'
end
