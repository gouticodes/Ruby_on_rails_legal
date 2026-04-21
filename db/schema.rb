# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2026_04_20_000400) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "case_documents", force: :cascade do |t|
    t.bigint "legal_case_id", null: false
    t.string "name", null: false
    t.string "document_type", null: false
    t.string "storage_url", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["legal_case_id"], name: "index_case_documents_on_legal_case_id"
  end

  create_table "clients", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "phone"
    t.boolean "active", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_clients_on_email", unique: true
  end

  create_table "hearings", force: :cascade do |t|
    t.bigint "legal_case_id", null: false
    t.datetime "scheduled_at", null: false
    t.string "courtroom", null: false
    t.text "notes"
    t.string "outcome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["legal_case_id"], name: "index_hearings_on_legal_case_id"
  end

  create_table "legal_cases", force: :cascade do |t|
    t.bigint "client_id", null: false
    t.string "title", null: false
    t.string "case_number", null: false
    t.string "jurisdiction", null: false
    t.string "status", default: "open", null: false
    t.text "summary"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["case_number"], name: "index_legal_cases_on_case_number", unique: true
    t.index ["client_id"], name: "index_legal_cases_on_client_id"
    t.index ["status"], name: "index_legal_cases_on_status"
  end

  add_foreign_key "case_documents", "legal_cases"
  add_foreign_key "hearings", "legal_cases"
  add_foreign_key "legal_cases", "clients"
end
