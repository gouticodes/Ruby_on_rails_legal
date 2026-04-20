class CreateClients < ActiveRecord::Migration[7.1]
  def change
    create_table :clients do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :phone
      t.boolean :active, default: true, null: false

      t.timestamps
    end

    add_index :clients, :email, unique: true
  end
end
