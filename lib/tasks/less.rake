task :mig do
  puts 'rake db:migrate RAILS_ENV="development"'
  system "rake db:migrate RAILS_ENV='development'"
  puts "rake db:test:clone"
  system "rake db:test:clone"
  if !ENV['a'].nil?
    puts "NOT RUNNING: rake annotate_models"
  else
    system "rake annotate_models"
  end
end


desc "Commit changes to subversion and run tests"
task :ci => [:check_uncommitted_files, :default, :svn_commit]

desc "Run 'svn update' command"
task :svn_update do
  puts `svn update`
end

desc "Run 'svn commit' command"
task :svn_commit => [:check_uncommitted_files] do
  raise "\n\n!!!!! You must specify a message for the commit (example: m='some message') !!!!!\n\n" if ENV['m'].nil?
  puts `svn commit -m "#{ENV['m']}"`
  # svn_commit_result =~ /Committed revision (\d+)\.$/
  # svn_version = $1.to_i
  # puts svn_commit_result
end

desc "Check uncommitted files"
task :check_uncommitted_files do
  svn_status_result = `svn status`
  if svn_status_result.index(/^\?/)
    puts svn_status_result
    raise "\n\n!!!!! You have local files not added to subversion (note the question marks above) !!!!!\n\n"
  end 
end
