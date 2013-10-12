class User < ActiveRecord::Base
	attr_protected :password_digest

	validates :password, :presence => true, 
												:confirmation => true, 
												:length => {:minimum => 6},
												:on => :create

	validates :email, :presence => true, :uniqueness => true	

	has_secure_password
end

