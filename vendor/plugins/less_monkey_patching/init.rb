require File.dirname(__FILE__) + '/lib/array'
require File.dirname(__FILE__) + '/lib/text_helper'
require 'active_record_helper'
require 'action_view_helpers_url_helper'
require 'action_view_helpers_text_helper'
require 'string'
require 'float'
require 'numeric'
require 'big_decimal'
require File.dirname(__FILE__) + '/lib/date'
require File.dirname(__FILE__) + '/lib/time'
require 'active_record_base'
require 'active_record_errors'
require 'active_mailer_base'
require 'nil'
require 'less_dates'
require 'object'
ActiveRecord::Base.send(:include, Less::Dates::Methods)
