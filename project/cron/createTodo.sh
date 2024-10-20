#!/bin/bash

fetchWikipediaUrl() {
  # Use -L to follow redirects and -o to discard the output
  curl -s -L -o /dev/null -w "%{url_effective}" https://en.wikipedia.org/wiki/Special:Random
}

createTodo() {
  local url=$(fetchWikipediaUrl)
  local title="Read $url"
  local json="{\"title\": \"$title\"}"

  curl -s -X POST http://backend-svc:2345/todos \
       -H "Content-Type: application/json" \
       -d "$json"

  echo "created todo $title"
}

# Call the createTodo function to execute the script
createTodo
