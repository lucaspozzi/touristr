

require 'rest_client'
class EzrezBase
  class EzrezMissingParameterException < Exception; end
  
  
  def check_params params = [], required_params = []
    missing_params = []
    required_params.each {|param| missing_params << param unless params.has_key?(param)}
    raise EzrezMissingParameterException.new(missing_params.join(', ')) unless missing_params.blank?
  end
  
  
  
  def execute params
    xml = build_xml params
    Rails.logger.debug xml.red
    RestClient.proxy = "http://touristR:sHamr0ck8@ec2-75-101-159-245.compute-1.amazonaws.com:3128"
    response = RestClient.post( EZREZ_URL, xml, :content_type=>"application/xml")
    Rails.logger.debug response.inspect.yellow
    response
  end
  
  def build_xml params
    {:AvailabilityRQ=>{:UserId=>EZREZ_USER, :Password=>EZREZ_PASSWORD, :Cobrand=>"default", :Currency=>'USD', :Debug=>true}.merge(params)}.to_xml.gsub("<hash>\n", '').gsub("</hash>\n", '').gsub(' type="integer"', '').gsub(' type="date"', '').gsub(' type="boolean"', '')
  end
end