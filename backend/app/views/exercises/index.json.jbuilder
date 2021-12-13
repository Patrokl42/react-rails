json.exercises @exercises do |exercise|
  puts exercise
  json.id exercise.id
  json.title exercise.title
  json.description exercise.description
  json.type exercise.exercise_type
end
json.partial! "shared/pagination", collection: @exercises