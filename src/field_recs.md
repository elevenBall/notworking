---
layout: base.njk
title: sérgio - field recs
---

<div class="centradoo">

## field recordings
<br>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<style>
    #field-recs-map {
        width: 60%;
        height: 70vh;
        min-height: 420px;
        border: 1px solid lightseagreen;
        z-index: 1;
        margin: 0 auto;
    }

    /* Evita que o mapa fique escondido atrás de elementos do layout */
    main {
        min-width: 0;
    }
</style>

<div id="field-recs-map"></div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
(() => {
    const map = L.map('field-recs-map').setView([41.1579, -8.6291], 4);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16
    }).addTo(map);

    const recordingIcon = L.icon({
        iconUrl: '/field_recs/rec.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    fetch('/field_recs/fieldrecordings.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Não foi possível carregar as gravações (${response.status})`);
            }
            return response.json();
        })
        .then(recordings => {
            const markers = [];

            recordings.forEach(recording => {
                const marker = L.marker(recording.coordinates, {
                    icon: recordingIcon
                }).addTo(map);

                const popup = document.createElement('div');
                const heading = document.createElement('strong');
                heading.textContent = `${recording.date} — ${recording.name}`;

                const lineBreak = document.createElement('br');
                const link = document.createElement('a');
                link.href = recording.link;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.textContent = 'link p/ drive';

                popup.append(heading, lineBreak, link);
                marker.bindPopup(popup);
                markers.push(marker);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar field recordings:', error);
            document.getElementById('field-recs-map').insertAdjacentHTML(
                'afterend',
                '<p>Não foi possível carregar as gravações. Verifica a consola do browser.</p>'
            );
        });

    // Corrige o cálculo do tamanho caso o layout demore a estabilizar.
    setTimeout(() => map.invalidateSize(), 150);
})();
</script>
</div>