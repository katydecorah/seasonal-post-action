# {{year}} {{season}} Books

{% for book in books %}- [{{book.title}}]({{book.link}}) - {{book.authors}}{% if book.tags %} ({{book.tags | join: ', '}}){% endif %}
{% endfor %}

---

{{radomVarThatWontWork}}
