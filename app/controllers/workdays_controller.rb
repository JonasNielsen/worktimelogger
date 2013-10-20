class WorkdaysController < ApplicationController

	def index
		@user = User.find(session[:user_id])
		@workdays = @user.workdays
	end

	def create
		attrs = params[:workday]
		workday = Workday.new()

		workday.worktime = attrs[:worktime]
		workday.date = attrs[:date]
		workday.description = attrs[:description]
		workday.user_id = session[:user_id]

		if workday.save
			flash[:successMsg] = "Tiden er nu gemt."
		end
	end

	def filter
		@user = User.find(session[:user_id])
		@workdays = @user.workdays.find(:all, :conditions => ['date > ? AND date < ?', params[:fromDate], params[:toDate]])

		render 'index'
	end
end
