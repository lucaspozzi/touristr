module ApplicationHelper
  
  @@CURRENCY_SYMBOLS = Hash["USD" => " &#36;", "EUR" => "&#128;", "GBP" => "&#163;"]
  def get_price_as_currency(amount, currency_code)
    if (!amount.nil?) then
      return price_with_currency(amount, currency_code)
    else
      return "Oops"
    end
  end  
  
  def price_with_currency(amount, currency_code)
    return number_to_currency(amount, :precision => 0, :unit => @@CURRENCY_SYMBOLS[currency_code])
  end
  
  def convert_date_T_time_to_string(date)
    m = /(20\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9])/.match(date)
    return "#{m[3]}/#{m[2]}/#{m[1]} #{t("at_time")} #{m[4]}:#{m[5]}"
  end
  
  def get_date_from_date_T_time(date)
    m = /(20\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9])/.match(date)
    return "#{m[3]}/#{m[2]}/#{m[1]}"
  end
  
  def get_time_from_date_T_time(date)
    m = /(20\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9])/.match(date)
    return "#{m[4]}:#{m[5]}"
  end

  def less_form_for name, *args, &block
    options = args.last.is_a?(Hash) ? args.pop : {}
    options = options.merge(:builder=>LessFormBuilder)
    args = (args << options)
    form_for name, *args, &block
  end
  
  
  def less_remote_form_for name, *args, &block
    options = args.last.is_a?(Hash) ? args.pop : {}
    options = options.merge(:builder=>LessFormBuilder)
    args = (args << options)
    remote_form_for name, *args, &block
  end
  
 
  def display_standard_flashes(message = 'There were some problems with your submission:')
    if flash[:notice]
      flash_to_display, level = flash[:notice], 'notice'
    elsif flash[:warning]
      flash_to_display, level = flash[:warning], 'warning'
    elsif flash[:error]
      level = 'error'
      if flash[:error].instance_of? ActiveRecord::Errors
        flash_to_display = message
        flash_to_display << activerecord_error_list(flash[:error])
      else
        flash_to_display = flash[:error]
      end
    else
      return
    end
    content_tag 'div', flash_to_display, :class => "flash#{level}"
  end

  def activerecord_error_list(errors)
    error_list = '<ul class="error_list">'
    error_list << errors.collect do |e, m|
      "<li>#{e.humanize unless e == "base"} #{m}</li>"
    end.to_s << '</ul>'
    error_list
  end

  def activerecord_error_list2(errors)
    errors.map do |e, m|
      "#{e.humanize unless e == "base"} #{m}\n"
    end.to_s.chomp
  end
  
  
  
  def thickbox_link_to str, url, options = {}
    width = options.delete(:width) || 500
    height = options.delete(:height) || 500
    link_to str, url.add_params(:height=>height, :width=>width), options.merge({:class=>'thickbox'})
  end
  
  
end
