// UI Module - пользовательский интерфейс
window.UI = {
    elements: {},
    
    init: function() {
        this.createUI();
        console.log('🖥️ UI initialized');
    },
    
    createUI: function() {
        // Создаем контейнер UI если его нет
        if (document.getElementById('gameUI')) return;
        
        const uiContainer = document.createElement('div');
        uiContainer.id = 'gameUI';
        uiContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.85);
            padding: 12px 24px;
            border-radius: 40px;
            display: flex;
            gap: 20px;
            backdrop-filter: blur(8px);
            z-index: 1000;
            font-family: monospace;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        `;
        
        // Эликсир дисплей
        const elixirDisplay = document.createElement('div');
        elixirDisplay.id = 'elixirDisplay';
        elixirDisplay.textContent = '⚡ 5/10';
        elixirDisplay.style.cssText = `
            color: #d13aff;
            font-weight: bold;
            font-size: 20px;
            text-shadow: 0 0 5px #9b4dff;
            padding: 0 10px;
        `;
        this.elements.elixirDisplay = elixirDisplay;
        
        // Кнопки юнитов
        const knightBtn = this.createUnitButton('🛡️ Knight', 3, 'knight');
        const archerBtn = this.createUnitButton('🏹 Archer', 3, 'archer');
        const mageBtn = this.createUnitButton('🔥 Mage', 4, 'mage');
        
        // Кнопка начала битвы
        const battleBtn = document.createElement('button');
        battleBtn.textContent = '⚔️ Start Battle';
        battleBtn.style.cssText = `
            background: #c97e2a;
            border: none;
            padding: 6px 16px;
            font-family: monospace;
            font-weight: bold;
            cursor: pointer;
            border-radius: 25px;
            color: #1e2a1a;
            transition: transform 0.1s;
        `;
        battleBtn.onmouseenter = () => battleBtn.style.transform = 'scale(1.05)';
        battleBtn.onmouseleave = () => battleBtn.style.transform = 'scale(1)';
        battleBtn.onclick = () => GameState.setState('battle');
        
        // Кнопка сброса
        const resetBtn = document.createElement('button');
        resetBtn.textContent = '🔄 Reset';
        resetBtn.style.cssText = battleBtn.style.cssText;
        resetBtn.style.background = '#5a3a1a';
        resetBtn.onclick = () => {
            GameState.setState('menu');
            if (window.AI) AI.reset();
            console.log('Game reset to menu');
        };
        
        uiContainer.appendChild(elixirDisplay);
        uiContainer.appendChild(knightBtn);
        uiContainer.appendChild(archerBtn);
        uiContainer.appendChild(mageBtn);
        uiContainer.appendChild(battleBtn);
        uiContainer.appendChild(resetBtn);
        
        document.body.appendChild(uiContainer);
        
        // Сохраняем кнопки
        this.elements.unitButtons = { knight: knightBtn, archer: archerBtn, mage: mageBtn };
    },
    
    createUnitButton: function(label, cost, type) {
        const btn = document.createElement('button');
        btn.textContent = `${label} (${cost})`;
        btn.style.cssText = `
            background: #2c1a0e;
            border: 2px solid #c97e2a;
            padding: 6px 14px;
            font-family: monospace;
            font-weight: bold;
            cursor: pointer;
            border-radius: 25px;
            color: #ffd966;
            transition: all 0.1s;
        `;
        btn.onmouseenter = () => {
            btn.style.background = '#c97e2a';
            btn.style.color = '#2c1a0e';
        };
        btn.onmouseleave = () => {
            btn.style.background = '#2c1a0e';
            btn.style.color = '#ffd966';
        };
        btn.onclick = () => {
            GameState.selectedUnit = type;
            this.highlightSelectedUnit(type);
            console.log(`📯 Selected: ${label}`);
        };
        return btn;
    },
    
    highlightSelectedUnit: function(type) {
        for (let key in this.elements.unitButtons) {
            const btn = this.elements.unitButtons[key];
            if (key === type) {
                btn.style.background = '#e09d3a';
                btn.style.color = '#1e2a1a';
                btn.style.borderColor = '#ffd966';
            } else {
                btn.style.background = '#2c1a0e';
                btn.style.color = '#ffd966';
                btn.style.borderColor = '#c97e2a';
            }
        }
    },
    
    updateElixirDisplay: function() {
        if (this.elements.elixirDisplay) {
            const elixir = Math.floor(GameState.elixir * 10) / 10;
            this.elements.elixirDisplay.textContent = `⚡ ${elixir}/${GameState.maxElixir}`;
        }
    },
    
    updateDisplay: function() {
        this.updateElixirDisplay();
    },
    
    showMessage: function(text, duration = 2000) {
        const msgDiv = document.createElement('div');
        msgDiv.textContent = text;
        msgDiv.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            color: gold;
            padding: 8px 20px;
            border-radius: 30px;
            font-family: monospace;
            font-weight: bold;
            z-index: 2000;
            animation: fadeOut ${duration/1000}s forwards;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                0% { opacity: 1; top: 100px; }
                70% { opacity: 1; top: 80px; }
                100% { opacity: 0; top: 60px; display: none; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(msgDiv);
        setTimeout(() => msgDiv.remove(), duration);
    }
};
