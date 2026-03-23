// Функция для эффекта появления
window.drawSpawnEffect = function(ctx, x, y) {
    // TODO: Расходящиеся круги
    
    ctx.strokeStyle = '#ffffff';
    
    for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(x, y, i * 8, 0, Math.PI * 2);
        ctx.stroke();
    }
}


// Функция для рисования молнии
window.drawLightning = function(ctx, x1, y1, x2, y2) {
    // TODO: Ломаная линия-зигзаг
    
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 4;
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    
    const midX = (x1 + x2) / 2 + (Math.random() * 20 - 10);
    const midY = (y1 + y2) / 2 + (Math.random() * 20 - 10);
    
    ctx.lineTo(midX, midY);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
