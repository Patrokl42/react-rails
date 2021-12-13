class CreateExercises < ActiveRecord::Migration[6.1]
  def change
    create_table :exercises do |t|
      t.string :title
      t.string :exercise_type
      t.string :description
      t.string :slug

      t.timestamps
    end
  end
end
