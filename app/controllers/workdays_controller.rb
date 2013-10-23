class WorkdaysController < ApplicationController

	def index
		time = Time.new
		dateStart = time.strftime('01/%m/%Y').to_date
		dateEnd = time.strftime('31/%m/%Y').to_date

		@user = User.find(session[:user_id])
		@workdays = @user.workdays.find(:all, :conditions => ['date >= ? and date <= ?', dateStart, dateEnd])
	end

	def new
		time = Time.new
		date = time.strftime('%d/%m/%Y').to_date
		@user = User.find(session[:user_id])
		@workday = @user.workdays.where(:date => date).first
	end

	def create
		@user = User.find(session[:user_id])
		attrs = params[:workday]

		workday = @user.workdays.where(:date => attrs[:date].to_date).first
		if workday != nil
			workday.worktime = attrs[:worktime]
			workday.description = attrs[:description]
		else
			workday = Workday.new()

			workday.worktime = attrs[:worktime]
			workday.date = attrs[:date].to_date
			workday.description = attrs[:description]
			workday.user_id = session[:user_id]
		end

		if workday.save
			flash[:successMsg] = "Tiden er nu gemt."
		end
	end

	def filter
		@user = User.find(session[:user_id])
		@workdays = @user.workdays.find(:all, :conditions => ['date >= ? AND date <= ?', params[:fromDate].to_s.to_date, params[:toDate].to_s.to_date])

		render 'index'
	end
end
