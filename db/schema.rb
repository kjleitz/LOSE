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

ActiveRecord::Schema.define(version: 20171021214436) do

  create_table "alignments", force: :cascade do |t|
    t.string "lawfulness"
    t.string "morality"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "asteroids", force: :cascade do |t|
    t.integer "space_tile_id"
    t.text "description"
    t.text "inventory"
    t.integer "size"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["space_tile_id"], name: "index_asteroids_on_space_tile_id"
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
    t.integer "government_id"
    t.integer "person_id"
    t.index ["government_id"], name: "index_governments_people_on_government_id"
    t.index ["person_id"], name: "index_governments_people_on_person_id"
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

  create_table "nations_planets", id: false, force: :cascade do |t|
    t.integer "nation_id"
    t.integer "planet_id"
    t.index ["nation_id"], name: "index_nations_planets_on_nation_id"
    t.index ["planet_id"], name: "index_nations_planets_on_planet_id"
  end

  create_table "nations_species", id: false, force: :cascade do |t|
    t.integer "nation_id"
    t.integer "species_id"
    t.index ["nation_id"], name: "index_nations_species_on_nation_id"
    t.index ["species_id"], name: "index_nations_species_on_species_id"
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
    t.integer "ship_id"
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
    t.index ["ship_id"], name: "index_people_on_ship_id"
    t.index ["species_id"], name: "index_people_on_species_id"
  end

  create_table "people_ships", id: false, force: :cascade do |t|
    t.integer "person_id"
    t.integer "ship_id"
    t.index ["person_id"], name: "index_people_ships_on_person_id"
    t.index ["ship_id"], name: "index_people_ships_on_ship_id"
  end

  create_table "people_skills", id: false, force: :cascade do |t|
    t.integer "person_id"
    t.integer "skill_id"
    t.index ["person_id"], name: "index_people_skills_on_person_id"
    t.index ["skill_id"], name: "index_people_skills_on_skill_id"
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
    t.integer "space_tile_id"
    t.index ["space_tile_id"], name: "index_planets_on_space_tile_id"
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
    t.integer "race_id"
    t.integer "skill_id"
    t.index ["race_id"], name: "index_races_skills_on_race_id"
    t.index ["skill_id"], name: "index_races_skills_on_skill_id"
  end

  create_table "ships", force: :cascade do |t|
    t.string "name"
    t.string "type"
    t.integer "size"
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
    t.index ["nation_id"], name: "index_ships_on_nation_id"
    t.index ["user_id"], name: "index_ships_on_user_id"
  end

  create_table "skills", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "social_status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "skills_species", id: false, force: :cascade do |t|
    t.integer "skill_id"
    t.integer "species_id"
    t.index ["skill_id"], name: "index_skills_species_on_skill_id"
    t.index ["species_id"], name: "index_skills_species_on_species_id"
  end

  create_table "space_tiles", force: :cascade do |t|
    t.integer "x"
    t.integer "y"
    t.text "star_map"
    t.string "coord_string"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coord_string"], name: "index_space_tiles_on_coord_string"
    t.index ["user_id"], name: "index_space_tiles_on_user_id"
  end

  create_table "species", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "ugliness"
    t.integer "planet_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["planet_id"], name: "index_species_on_planet_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "wrecks", force: :cascade do |t|
    t.integer "ship_id"
    t.integer "space_tile_id"
    t.text "description"
    t.integer "quality"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ship_id"], name: "index_wrecks_on_ship_id"
    t.index ["space_tile_id"], name: "index_wrecks_on_space_tile_id"
  end

end
