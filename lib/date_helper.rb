module DateHelper
  def convert_datepicker_date_to_yyyy_mm_dd(date)
    m = /(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(20\d\d)/.match(date)
    day = m[1] 
    month = m[2]
    year = m[3]
    new_date = "#{year}-#{month}-#{day}"
    return new_date
  end 
end