document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('artCanvas');
    const ctx = canvas.getContext('2d');
    const links = document.querySelectorAll('a');

    resizeCanvas();

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        draw();
    }

    function draw() {
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        // Example generative art: horizontal and vertical lines
        const numLines = Math.round(width / 40);
        const colors = [];
        
        for (let i = 0; i < numLines; i++) {
            ctx.beginPath();

            // Random starting point
            const startX = Math.random() * width;
            const startY = Math.random() * height;

            // Randomly choose horizontal or vertical line
            if (Math.random() > 0.5) {
                // Draw horizontal line
                const endX = startX + Math.random() * 100;
                const endY = startY;
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
            } else {
                // Draw vertical line
                const endX = startX;
                const endY = startY + Math.random() * 100;
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
            }

            // Random color between orange and light lilac
            const red = Math.floor(128 + Math.random() * 128); // Orange component
            const green = Math.floor(Math.random() * 128); // Orange component
            const blue = Math.floor(128 + Math.random() * 128); // Lilac component
            const color = `rgb(${red},${green},${blue})`;
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();

            colors.push(color);
        }

        applyColorsToLinks(colors);
    }

    function applyColorsToLinks(colors) {
        links.forEach((link, index) => {
            const color = colors[index % colors.length];
            link.style.color = color;
        });
    }

    window.addEventListener('resize', resizeCanvas);

    // Redraw on scroll
    window.addEventListener('scroll', draw);

    // Redraw on mouse drag
    let isDragging = false;
    canvas.addEventListener('mousedown', function() {
        isDragging = true;
    });
    canvas.addEventListener('mouseup', function() {
        isDragging = false;
    });
    canvas.addEventListener('mousemove', function(event) {
        if (isDragging) {
            draw();
        }
    });
});
