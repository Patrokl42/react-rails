class RemoveSlugFromExercises < ActiveRecord::Migration[6.1]
  def change
    remove_column :exercises, :slug, :string
  end
end
