---
title: {{year}} {{season}}
image: {{image}}
{{books  | yaml: 'title','authors','url','isbn' | name: 'books'}}
{{bookmarks  | yaml: 'title','site','url','image' | name: 'bookmarks' }}
{{playlist | yaml}}
---

The books I read, playlist I made, and bookmarks I saved this {{season}}.

## Books

{% for book in books %}- [{{book.title}}]({{book.link}}) - {{book.authors}}{% if book.tags %} ({{book.tags | join: ', '}}){% endif %}
{% endfor %}

## Playlist

{% for playlist in playlist.tracks %}- {{playlist.track}} - {{playlist.artist}}
{% endfor %}

## Bookmarks

{% for bookmark in bookmarks %}- [{{bookmark.title}}]({{bookmark.url}}) - {{bookmark.site}}
{% endfor %}
