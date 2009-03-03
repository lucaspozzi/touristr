set :application, "touristr"
set :repository,  "ssh://batman.lesseverything.com/git/#{application}.git"
set :user, "steve" 
set :server_ip, "iceman.lesseverything.com"
set :root_path, "/var/rails"
set :app_home, "#{root_path}/#{application}"
set :keep_releases, 6

set :deploy_to, "#{app_home}"
set :use_sudo, false
set :scm, :git


role :app, server_ip
role :web, server_ip
role :db,  server_ip, :primary=>true



default_run_options[:pty] = true 
after "deploy:update", "deploy:cleanup"










task :after_update_code, :roles => :app, :except => {:no_symlink => true} do
 run <<-CMD
   cd #{release_path} &&
   ln -nfs #{shared_path}/config/database.yml #{release_path}/config/database.yml &&
   ln -nfs #{shared_path}/config/integrations.yml #{release_path}/config/integrations.yml &&
   ln -nfs #{shared_path}/index/ #{release_path}/index
 CMD
end




desc "tell me how many users are in the system now"
task :user_count do 
 run "cd #{current_path} && ./script/current_users" do |ch, st, data|
   print data
 end
end


namespace :deploy do
task :restart do
run <<-RUN
 #{root_path}/bin/#{application}_bounce
RUN
end

task :stop do
 run <<-RUN
   #{root_path}/bin/#{application}_kill
 RUN
end

task :start do
 run <<-RUN
   #{root_path}/bin/#{application}_start
 RUN
end
end



namespace :ferret do 
desc 'start ferret'
task :start do
 run "cd #{current_path}; RAILS_ENV=production script/ferret_start"
end

desc 'stop ferret'
task :stop do
 run "cd #{current_path}; RAILS_ENV=production script/ferret_stop"
end
desc 'bounce ferret'
task :restart do
 stop
 start
end
end

