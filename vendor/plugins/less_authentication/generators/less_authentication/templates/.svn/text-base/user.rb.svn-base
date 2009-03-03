
require 'digest/sha1'

class User < ActiveRecord::Base
  has_one :person, :dependent=>:destroy
  
  # Virtual attribute for the unencrypted password
  attr_accessor :password, :email

  validates_confirmation_of :password, :if => :password_required?
  validates_presence_of :login
  validates_presence_of :password, :if => :password_required?
  validates_presence_of :password_confirmation, :if => :password_required?
  validates_length_of :password_confirmation, :if => :password_required?,:within => 4..40
  validates_length_of :password, :within => 4..40, :if => :password_required?
  validates_length_of :login, :within => 3..40
  validates_uniqueness_of :login, :case_sensitive => false
  validates_format_of :email, :with => /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i, :on => :create, :must=>"Invalid email address."

  before_save :encrypt_password
  



  def before_create
    p = Person.find_by_email @email
    return true if p.blank?
    errors.add(:email, 'address has already been taken.') and return false unless p.user.blank?
  end

  
  def after_create
    p = Person.find_or_create_by_email @email
    raise 'User found when should be nil' unless p.user.blank?
    p.update_attributes :user_id=>self.id
    AccountMailer.deliver_signup self
  end
  
  def after_destroy
    #person.update_attributes :is_active=>false, :user_id=>nil
  end

  def f
    full_name
  end
  def full_name
    return self.person.full_name unless self.person.blank? || person.full_name.blank?
    self.login
  end

  # Authenticates a user by their login name and unencrypted password.
  # Returns the user or nil.
  def self.authenticate(login, password)
    u = find_by_login(login, :include=>:person) # need to get the salt
    u && u.authenticated?(password) ? u : nil
  end

  # Encrypts some data with the salt.
  def self.encrypt(password, salt)
    Digest::SHA1.hexdigest("--#{salt}--#{password}--")
  end

  # Encrypts the password with the user salt
  def encrypt(password)
    self.class.encrypt(password, salt)
  end

  def authenticated?(password)
    crypted_password == encrypt(password)
  end

  def remember_me
    self.remember_token_expires_at = 10.years.from_now
    self.remember_token = UUID.random_create.to_s + '-' + UUID.random_create.to_s if
      self.remember_token.nil?
    save false
  end
  
  def remember_token?
    remember_token_expires_at && Time.now.utc < remember_token_expires_at 
  end
  
  def forgot_password
    @forgot = true
    self.password = UUID.random_create.to_s[0,8]
    self.password_confirmation = password
    encrypt_password
    save!
    self.password
  end
  
  def change_password(current_password, new_password, confirm_password)
    sp = User.encrypt(current_password, self.salt)
    errors.add( :password, "The password you supplied is not the correct password.") and
      return false unless sp == self.crypted_password
    errors.add( :password, "The new password does not match the confirmation password.") and
      return false unless new_password == confirm_password
    errors.add( :password, "The new password may not be blank.") and
      return false if new_password.blank?
    
    self.password = new_password
    self.password_confirmation = confirm_password
    self.salt = Digest::SHA1.hexdigest("--#{Time.now.to_s}--#{login}--") 
    self.crypted_password = encrypt(new_password)
    save
  end

protected

  # before filter 
  def encrypt_password
    return if password.blank?
    self.salt = Digest::SHA1.hexdigest("--#{Time.now.to_s}--#{login}--") if
      new_record? || @forgot
    self.crypted_password = encrypt(password)
  end
  
  def password_required?
    crypted_password.blank? || !password.blank?
  end
end
