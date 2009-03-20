class RemoveMarkupFromDestinationIntroduction < ActiveRecord::Migration
  def self.up
    DestinationContentTranslation.find(:all).each do |content|
      if (!content.introduction.nil?) 
        new_intro = content.introduction.gsub("<p>","").gsub("</p>","")
        content.introduction = new_intro
        content.save
      end 
    end
    nil
  end

  def self.down
  end
end
