class AddContactlist < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :firname
      t.string :lasname
      t.string :work_tel
      t.string :mobile_tel
      t.string :email
      t.string :twit

      t.timestamps
    end
  end
end
