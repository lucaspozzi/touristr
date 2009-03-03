
Less::JsRoutes.generate!

EMAIL_FROM = 'The Guys <the_guys@___________________.com>'



SUBDOMAIN_EXCLUSIONS = %w{www mail test ftp admin alpha beta gamma demo pop pop3 server1 webmail smtp mx}


DELETE_CONFIRM = "Are you sure you want to delete?\nThis cannot be undone."
ITEMS_PER_PAGE = 20
MAILER_TO_ADDRESS = 'steve@lesseverything.com'
MAILER_FROM_ADDRESS = 'The Guys <theguys@___________.com>'
BUSINESS_NAME_REGEX =  /^[\W\d\w\s_,\.-]+$/i
EMAIL_REGEX = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i



ActionView::Helpers::InstanceTag::DEFAULT_FIELD_OPTIONS = {}
ActionView::Helpers::InstanceTag::DEFAULT_TEXT_AREA_OPTIONS = {}