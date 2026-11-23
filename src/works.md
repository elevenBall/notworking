---
layout: base.njk
title: sérgio - works
---


<div class="centradoo"> 

this area is not working, still under construction.
<br>
<br>

{% if collections.work and collections.work.size > 0 %} {% assign works = collections.work | sort: "data.order" %} {% for item in works %} <a href="{{ item.url }}">{{ item.data.title | replace: "sérgio - ", "" }}</a> <br> {% endfor %} {% else %}nothing here yet{% endif %}

</div>