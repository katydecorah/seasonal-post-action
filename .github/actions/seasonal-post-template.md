---
title: {{year}} {{season}}
image: {{image}}
{{bookYaml}}
{{bookmarkYaml}}
{{playlistYaml}}
---

The books I read, playlist I made, and bookmarks I saved this {{season}}.

## Books

{% for book in books %}- [{{book.title}}]({{book.url}}) - {{book.authors}}{% if book.tags %} ({{book.tags | join: ', '}}){% endif %}
{% endfor %}

## Playlist

{% for playlist in playlistTracks %}- {{playlist.track}} - {{playlist.artist}}
{% endfor %}

## Bookmarks

{% for bookmark in bookmarks %}- [{{bookmark.title}}]({{bookmark.url}}) - {{bookmark.site}}
{% endfor %}
