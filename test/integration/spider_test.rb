 require "#{File.dirname(__FILE__)}/../test_helper"

 class SpiderTest < ActionController::IntegrationTest
   # fixtures :all
   # include Caboose::SpiderIntegrator
   # 
   # def test_spider_non_user
   #   puts ''
   #   puts 'test_spider_non_user'
   #   get "/"
   #   assert_response 200
   # 
   #   spider(@response.body, '/', false)
   # end
   # 
   # 
   # def test_spider_user
   #   puts ''
   #   puts 'test_spider_user'
   #   get "/login"
   #   assert_response :success
   #   post "/login", :login => users(:first).login, :password => 'test'
   #   puts @response.body
   #   assert_response :redirect
   #   assert session[:user]
   #   assert_redirected_to home_path
   #   follow_redirect!
   # 
   #   #   puts @response.body
   #   spider(@response.body, "/", false)
   # end
   # 

   def test_no_spider_test
    puts "spider test is commented out for now. Once the app is a bit further along, create a complete dataset with fixjour and run spider against that."
   end

 end

