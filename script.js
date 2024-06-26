document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('artCanvas');
    const ctx = canvas.getContext('2d');
    const links = document.querySelectorAll('a');
    const summaries = document.querySelectorAll('summary');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        draw();
    }

    function draw() {
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        const numLines = Math.round(width / 40);
        const colors = [];
        
        for (let i = 0; i < numLines; i++) {
            ctx.beginPath();

            const startX = Math.random() * width;
            const startY = Math.random() * height;

            if (Math.random() > 0.5) {
                const endX = startX + Math.random() * 100;
                const endY = startY;
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
            } else {
                const endX = startX;
                const endY = startY + Math.random() * 100;
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
            }

            const red = Math.floor(128 + Math.random() * 128);
            const green = Math.floor(Math.random() * 128);
            const blue = Math.floor(128 + Math.random() * 128);
            const color = `rgb(${red},${green},${blue})`;
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();

            colors.push(color);
        }

        applyColorsToElements(colors);
    }

    function applyColorsToElements(colors) {
        links.forEach((link, index) => {
            link.style.color = colors[index % colors.length];
        });
        summaries.forEach((summary, index) => {
            summary.style.color = colors[index % colors.length];
        });
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', draw);

    let isDragging = false;
    canvas.addEventListener('mousedown', () => { isDragging = true; });
    canvas.addEventListener('mouseup', () => { isDragging = false; });
    canvas.addEventListener('mousemove', () => { if (isDragging) draw(); });

    resizeCanvas();
});
