pdf.text "Arbejdsseddel #{@dateStart} - #{@dateEnd}", :size => 18, :style => :bold
pdf.move_down(30)

pdf.text "Medarbejder: #{@user.name}"
pdf.text "Email: #{@user.email}"
pdf.move_down(10)

items = [["Dato", "Arbejdstimer", "Arbejdsbeskrivelse"]];
items += @workdays.map do |workday|
	[
		workday.date,
		workday.worktime,
		workday.description
	]
end
pdf.table items, :header => true

pdf.move_down(50)

pdf.text "Timeløn: #{@user.salary}"
pdf.text "Samlet antal arbejdstimer: #{@workhours}"
pdf.move_down(10)
pdf.text "Samlet løn: #{@salary}", :style => :bold