class CreateHearings < ActiveRecord::Migration[7.1]
  def change
    create_table :hearings do |t|
      t.references :legal_case, null: false, foreign_key: true
      t.datetime :scheduled_at, null: false
      t.string :courtroom, null: false
      t.text :notes
      t.string :outcome

      t.timestamps
    end
  end
end
