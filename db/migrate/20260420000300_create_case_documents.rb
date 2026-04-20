class CreateCaseDocuments < ActiveRecord::Migration[7.1]
  def change
    create_table :case_documents do |t|
      t.references :legal_case, null: false, foreign_key: true
      t.string :name, null: false
      t.string :document_type, null: false
      t.string :storage_url, null: false

      t.timestamps
    end
  end
end
