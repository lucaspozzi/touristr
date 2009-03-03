ActionController::Routing::Routes.draw do |map|
  map.resources :people, :member=>{:delete_icon=>:delete} 
  map.login   "/login",   :controller=>'accounts', :action => 'login'
  map.logout  "/logout",  :controller=>'accounts', :action => 'logout'
  map.signup  "/signup",  :controller=>'accounts', :action => 'signup'
  map.home '/', :controller=>'home', :action => 'index'
end
