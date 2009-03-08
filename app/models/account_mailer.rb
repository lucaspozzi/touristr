class AccountMailer < ActionMailer::Base
  
  def signup(user)
    @subject        = "Signup info - Touristr"
    @recipients     = user.person.email
    @body['user']   = user
    @from           = EMAIL_FROM
  end
  
  def forgot_password(user, new_password)
    @subject        = "Forgot password - Touristr"
    @body['user']   = user
    @body['new_password'] = new_password
    @recipients     = user.person.email
    @from           = EMAIL_FROM
  end
  
  def invite invited_person, trip, invitee_person, message
    logger.debug "**************************************************************************************************************".red
    @subject        = "Join My Trip on Touristr"
    @body['invitee_person']   = invitee_person
    @body['invited_person'] = invited_person
    @body['message'] = message
    @body['trip'] = trip
    @recipients     = invited_person.email
    @from           = invitee_person.email
  end
end
