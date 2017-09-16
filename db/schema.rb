# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170916161428) do

  create_table "alignments", force: :cascade do |t|
    t.string "lawfulness"
    t.string "morality"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "governments", force: :cascade do |t|
    t.string "type"
    t.text "description"
    t.integer "freedom_axis"
    t.integer "equality_axis"
    t.integer "person_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["person_id"], name: "index_governments_on_person_id"
  end

  create_table "governments_people", id: false, force: :cascade do |t|
    t.integer "government_id", null: false
    t.integer "person_id", null: false
    t.index ["government_id", "person_id"], name: "index_governments_people_on_government_id_and_person_id"
    t.index ["person_id", "government_id"], name: "index_governments_people_on_person_id_and_government_id"
  end

  create_table "nations", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.bigint "population"
    t.integer "alignment_id"
    t.integer "government_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["alignment_id"], name: "index_nations_on_alignment_id"
    t.index ["government_id"], name: "index_nations_on_government_id"
  end

  create_table "nations_species", id: false, force: :cascade do |t|
    t.integer "nation_id", null: false
    t.integer "species_id", null: false
    t.index ["nation_id", "species_id"], name: "index_nations_species_on_nation_id_and_species_id"
    t.index ["species_id", "nation_id"], name: "index_nations_species_on_species_id_and_nation_id"
  end

  create_table "occupations", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.boolean "shipworthy"
    t.integer "social_status"
    t.integer "salary"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "people", force: :cascade do |t|
    t.string "name"
    t.integer "age"
    t.integer "weight"
    t.integer "intelligence"
    t.integer "strength"
    t.integer "dexterity"
    t.integer "wisdom"
    t.integer "speed"
    t.integer "charisma"
    t.integer "constitution"
    t.integer "health"
    t.string "gender"
    t.integer "willpower"
    t.boolean "employed"
    t.integer "attractiveness"
    t.integer "race_id"
    t.integer "species_id"
    t.integer "spaceship_id"
    t.integer "nation_id"
    t.integer "planet_id"
    t.integer "alignment_id"
    t.integer "occupation_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["alignment_id"], name: "index_people_on_alignment_id"
    t.index ["nation_id"], name: "index_people_on_nation_id"
    t.index ["occupation_id"], name: "index_people_on_occupation_id"
    t.index ["planet_id"], name: "index_people_on_planet_id"
    t.index ["race_id"], name: "index_people_on_race_id"
    t.index ["spaceship_id"], name: "index_people_on_spaceship_id"
    t.index ["species_id"], name: "index_people_on_species_id"
  end

  create_table "people_skills", id: false, force: :cascade do |t|
    t.integer "person_id", null: false
    t.integer "skill_id", null: false
    t.index ["person_id", "skill_id"], name: "index_people_skills_on_person_id_and_skill_id"
    t.index ["skill_id", "person_id"], name: "index_people_skills_on_skill_id_and_person_id"
  end

  create_table "people_spaceships", id: false, force: :cascade do |t|
    t.integer "person_id", null: false
    t.integer "spaceship_id", null: false
    t.index ["spaceship_id", nil], name: "index_people_spaceships_on_spaceship_id_and_task_id"
    t.index [nil, "spaceship_id"], name: "index_people_spaceships_on_task_id_and_spaceship_id"
  end

  create_table "planets", force: :cascade do |t|
    t.string "name"
    t.integer "class"
    t.integer "size"
    t.text "atmosphere"
    t.bigint "population"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "races", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "social_status"
    t.integer "species_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["species_id"], name: "index_races_on_species_id"
  end

  create_table "races_skills", id: false, force: :cascade do |t|
    t.integer "race_id", null: false
    t.integer "skill_id", null: false
    t.index ["race_id", "skill_id"], name: "index_races_skills_on_race_id_and_skill_id"
    t.index ["skill_id", "race_id"], name: "index_races_skills_on_skill_id_and_race_id"
  end

  create_table "skills", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "social_status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "spaceships", force: :cascade do |t|
    t.string "name"
    t.string "type"
    t.string "size"
    t.integer "hp"
    t.integer "shield_strength"
    t.integer "energy"
    t.integer "ammo"
    t.integer "rockets"
    t.string "fuel_type"
    t.integer "reputation"
    t.integer "capacity"
    t.integer "cost"
    t.integer "user_id"
    t.integer "nation_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["nation_id"], name: "index_spaceships_on_nation_id"
    t.index ["user_id"], name: "index_spaceships_on_user_id"
  end

  create_table "species", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "ugliness"
    t.integer "skill_id"
    t.integer "planet_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["planet_id"], name: "index_species_on_planet_id"
    t.index ["skill_id"], name: "index_species_on_skill_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
