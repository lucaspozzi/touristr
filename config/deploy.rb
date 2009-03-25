# For complete deployment instructions, see the following support guide:
# http://www.engineyard.com/support/guides/deploying_your_application_with_capistrano 

require "eycap/recipes"

# =================================================================================================
# ENGINE YARD REQUIRED VARIABLES
# =================================================================================================
# You must always specify the application and repository for every recipe. The repository must be
# the URL of the repository you want this recipe to correspond to. The :deploy_to variable must be
# the root of the application.

set :keep_releases,       5
set :application,         "touristr"
set :user,                "touristr"
set :password,            "EMbWV9ao"
set :deploy_to,           "/data/#{application}"
set :monit_group,         "touristr"
set :runner,              "touristr"


set :repository,          "git@github.com:conor/touristr.git"
set :scm_username,       ""
set :scm_password,       ""
set :scm,                 :git

set :deploy_via,          :remote_cache
# This will execute the Git revision parsing on the *remote* server rather than locally
set :real_revision, 			lambda { source.query_revision(revision) { |cmd| capture(cmd) } }






set :staging_database, "touristr_staging"
set :staging_dbhost,   "mysql50-staging-1"








set :dbuser,        "touristr_db"
set :dbpass,        "9pNnPeG9NTrQlpMlz"

# comment out if it gives you trouble. newest net/ssh needs this set.
ssh_options[:paranoid] = false


# =================================================================================================
# ROLES
# =================================================================================================
# You can define any number of roles, each of which contains any number of machines. Roles might
# include such things as :web, or :app, or :db, defining what the purpose of each machine is. You
# can also specify options that can be used to single out a specific subset of boxes in a
# particular role, like :primary => true.

  
  
  
  
task :staging do
  
  role :web, "74.201.254.36:8220" # touristr [mongrel] [mysql50-staging-1], new_touristr [mongrel] [mysql50-staging-1], blog_touristr [mongrel] [mysql50-staging-1]
  role :app, "74.201.254.36:8220", :mongrel => true
  role :db , "74.201.254.36:8220", :primary => true
  
  
  set :rails_env, "staging"
  set :environment_database, defer { staging_database }
  set :environment_dbhost, defer { staging_dbhost }
end

  
  
  
  
  
  
  
  
  
  
  
  
  
  

# =================================================================================================
# desc "Example custom task"
# task :touristr_custom, :roles => :app, :except => {:no_release => true, :no_symlink => true} do
#   run <<-CMD
#     echo "This is an example"
#   CMD
# end
# 
# after "deploy:symlink_configs", "touristr_custom"
# =================================================================================================

# Do not change below unless you know what you are doing!
after "deploy", "deploy:cleanup"
after "deploy:migrations" , "deploy:cleanup"
after "deploy:update_code", "deploy:symlink_configs"

# uncomment the following to have a database backup done before every migration
# before "deploy:migrate", "db:dump"

