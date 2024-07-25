const socket = io('http://localhost:3000');
const circle = document.querySelector('.circle');

let isDragging = false;

circle.addEventListener('mousedown', (e) => {
    isDragging = true;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const x = e.clientX - circle.offsetWidth / 2;
        const y = e.clientY - circle.offsetHeight / 2;

        socket.emit('move', { x, y });

        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
    }
});

socket.on('move', (data) => {
    circle.style.left = `${data.x}px`;
    circle.style.top = `${data.y}px`;
});