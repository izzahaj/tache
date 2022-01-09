class User < ApplicationRecord
  before_save :downcase_username
    has_secure_password
    
    PASSWORD_REQUIREMENTS = /\A
      (?=.{8,}) # At least 8 characters long
      (?=.*\d) # Contain at least one number
      (?=.*[[:^alnum:]]) #contain at least one symbo1

    validates :username, uniqueness: { case_sensitive: false }, length: { minimum: 4 }
    validates :password, presence: true, format: PASSWORD_REQUIREMENTS

    private

    def downcase_username
         self.username = self.username.downcase
    end
end
