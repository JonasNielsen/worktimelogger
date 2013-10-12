class UsersController < ApplicationController
	def new
		@user = User.new()
	end

	def show
	end

	def create
		@user = User.new(params[:user])
		if @user.save
			flash[:successMsg] = "Du er nu oprettet som bruger."
			redirect_to '/'
		else
			render 'new'
		end
	end
end
