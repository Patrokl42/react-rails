json.pagination do
  json.current         collection.current_page
  json.previous        collection.prev_page
  json.next            collection.next_page
  json.limit           collection.limit_value
  json.totalPages      collection.total_pages
  json.totalCount      collection.total_count
end