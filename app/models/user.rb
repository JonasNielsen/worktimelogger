class User < ActiveRecord::Base
	has_many :workdays
	
	attr_protected :password_digest

	validates :password, :presence => true, 
		:confirmation => true, 
		:length => {:minimum => 6},
		:on => :create

	validates :email, :presence => true, :uniqueness => true	

	has_secure_password

	def calculate_salary 
		time = Time.new #This should be refactored!
		dateStart = time.strftime('01/%m/%Y').to_date
		dateEnd = time.strftime('31/%m/%Y').to_date
		
		salary = self.salary;
		totalSalary = 0;
		workdays = self.workdays.find(:all, :conditions => ['date >= ? and date <= ?', dateStart, dateEnd])

		workdays.each do |w|
			totalSalary = totalSalary + (w.worktime*salary)
		end

		#return totalSalary
		totalSalary
	end

	def total_workhours
		time = Time.new #This should be refactored!
		dateStart = time.strftime('01/%m/%Y').to_date
		dateEnd = time.strftime('31/%m/%Y').to_date

		workhours = 0;
		workdays = self.workdays.find(:all, :conditions => ['date >= ? and date <= ?', dateStart, dateEnd])

		workdays.each do |w|
			workhours = workhours + w.worktime
		end

		#return workhours
		workhours
	end
end

