ActionController::Routing::Routes.draw do |map|
  map.resources :trip_items

  map.resources :hotels do |hotel|
    hotel.resources :trip_items
  end
  map.resources :destinations, :collection=>{:search=>:get}
  map.resources :trips
  map.private_trip "/trips/private/:id", :controller=>'trips', :action=>'private'
  
  
  map.resources :people, :member=>{:delete_icon=>:delete} 
  map.login   "/login",   :controller=>'accounts', :action => 'login'
  map.logout  "/logout",  :controller=>'accounts', :action => 'logout'
  map.signup  "/signup",  :controller=>'accounts', :action => 'signup'
  map.home '/', :controller=>'home', :action => 'index'
end
