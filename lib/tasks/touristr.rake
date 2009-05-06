namespace :sitemap do
  desc "Generate sitemap for destinations with content"
  task :generate => :environment do
    require 'destination_content.rb'
    
    sitemap = File.new("public/sitemap.xml", "w")
    
    sitemap.puts(%!<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.google.com/schemas/sitemap/0.84">!)
    DestinationContent.each do |dest_cont|
      sitemap.puts(%!      <url>
        <loc>http://touristr.com/destinations/#{dest_cont.destination.to_param}</loc>
        <lastmod>2009-05-06</lastmod>
        <changefreq>weekly</changefreq>
      </url>!) if (dest_cont.destination.city? && dest_cont.destination.destination_content == dest_cont)
      # double condition because we have some "duplicated" DestinationContents...
    end
    sitemap.puts("</urlset>")
    sitemap.close
  end
end
