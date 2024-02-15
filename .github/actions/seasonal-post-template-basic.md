# {{year}} {{season}} Books

{% for book in books %}- [{{book.title}}]({{book.url}}) - {{book.authors}}{% if book.tags %} ({{book.tags | join: ', '}}){% endif %}
{% endfor %}

---

{{radomVarThatWontWork}}
