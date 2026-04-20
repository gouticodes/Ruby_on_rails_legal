class CreateLegalCases < ActiveRecord::Migration[7.1]
  def change
    create_table :legal_cases do |t|
      t.references :client, null: false, foreign_key: true
      t.string :title, null: false
      t.string :case_number, null: false
      t.string :jurisdiction, null: false
      t.string :status, null: false, default: 'open'
      t.text :summary

      t.timestamps
    end

    add_index :legal_cases, :case_number, unique: true
    add_index :legal_cases, :status
  end
end
