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
end
