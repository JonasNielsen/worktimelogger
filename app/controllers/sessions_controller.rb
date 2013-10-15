class SessionsController < ApplicationController

	def new
		if session[:user_id]
			redirect_to new_workday_path
		else
			render :layout => nil
		end
	end

	def create
		user = User.find_by_email(params[:email])

		if user && user.authenticate(params[:password])
			session[:user_id] = user.id
			flash[:successMsg] = "Du er nu logget ind"
			redirect_to root_path
		else
			flash[:errorMsg] = "Forkert email eller kodeord"
			redirect_to signin_path
		end
	end

	def destroy
		session[:user_id] = nil
		redirect_to signin_path
	end
end
