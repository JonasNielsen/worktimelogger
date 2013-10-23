class Workday < ActiveRecord::Base

	attr_accessible :worktime, :date, :description, :user_id
	belongs_to :user
end
