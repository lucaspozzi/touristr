

require 'rest_client'
class EzrezBase
  class EzrezMissingParameterException < Exception; end
  
  EZREZ_DEBUG = true
  
  def check_params params = [], required_params = []
    missing_params = []
    required_params.each {|param| missing_params << param unless params.has_key?(param)}
    raise EzrezMissingParameterException.new(missing_params.join(', ')) unless missing_params.blank?
  end
  
  
  
  def execute params
    xml = build_xml params
    Rails.logger.debug xml.red
    RestClient.proxy = "http://touristR:sHamr0ck8@ec2-75-101-159-245.compute-1.amazonaws.com:3128"
    response = RestClient.get( EZREZ_URL + xml, :content_type=>"application/xml")
    Rails.logger.debug response.inspect.yellow
    response
  end
  
  def build_xml params
    xml = {:AvailabilityRQ=>{:UserId=>EZREZ_USER, :Password=>EZREZ_PASSWORD, :Cobrand=>"tropical", :Currency=>'EUR', :Debug=>EZREZ_DEBUG}.merge(params)}.to_xml(:skip_instruct => false).gsub("<hash>\n", '').gsub("</hash>\n", '').gsub(' type="integer"', '').gsub(' type="date"', '').gsub(' type="boolean"', '').gsub('<Leg type="array">', '')

  # if AirSearch, we need to remove the last </Legs> item
    idx_start_strip = xml.rindex("</Leg>")
    if !idx_start_strip.nil?
      xml1 = xml[0..idx_start_strip-1]
      xml2 = xml[idx_start_strip+"</Leg>".size..xml.size]
      xml = xml1+xml2
    end
    
    Rails.logger.debug xml.green
    "?xml=" + CGI::escape(xml)
  end
  
end

