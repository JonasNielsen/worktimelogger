class CreateWorkdays < ActiveRecord::Migration
  def change
    create_table :workdays do |t|
      t.decimal :worktime
      t.date :date
      t.text :description
      t.integer :user_id

      t.timestamps
    end
  end
end
