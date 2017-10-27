class AddCoordsToAsteroid < ActiveRecord::Migration[5.1]
  def change
    add_column :asteroids, :x, :integer
    add_column :asteroids, :y, :integer
  end
end
