---
layout: app
title: "Webルーレット"
app_name: "Webルーレット"
description: "項目からランダムに選択するオンラインルーレットツール"
custom_css: |
    @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
    @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css');
    
    .roulette-app {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem;
    }
    
    .header-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 1rem;
    }
    
    .header-title {
        font-size: 1.75rem;
        font-weight: 600;
        color: #495057;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .roulette-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(520px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
        justify-items: center;
    }
    
    @media (min-width: 1200px) {
        .roulette-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    
    /* 奇数時の最後の要素を自動的に中央配置（CSS Grid の自動判定） */
    .roulette-card:nth-last-child(1):nth-child(odd) {
        grid-column: 1 / -1;
        justify-self: center;
    }
    
    /* モバイル対応 */
    @media (max-width: 768px) {
        .roulette-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
        
        .roulette-grid.odd-count .roulette-card:last-child {
            grid-column: 1;
        }
        
        .roulette-card {
            width: 100%;
            max-width: none;
        }
        
        .card-body {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        
        .roulette-canvas {
            width: 240px;
            height: 240px;
        }
        
        .items-textarea {
            min-height: 150px;
        }
        
        .header-section {
            flex-direction: row;
            gap: 1rem;
            align-items: center;
            justify-content: space-between;
        }
        
        .fab-add {
            bottom: 1rem;
            right: 1rem;
            border-radius: 50%;
            padding: 0;
            width: 60px;
        }
        
        .fab-add .add-text {
            display: none;
        }
    }
    
    .roulette-card {
        background: white;
        border: 1px solid #e9ecef;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        overflow: hidden;
        transition: box-shadow 0.2s ease;
    }
    
    .roulette-card:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .card-header {
        background: #f8f9fa;
        border-bottom: 1px solid #e9ecef;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .roulette-title {
        border: none;
        background: transparent;
        font-weight: 600;
        font-size: 1.1rem;
        color: #495057;
        width: calc(100% - 60px);
        padding: 0.25rem;
        max-width: 300px;
    }
    
    .roulette-title:focus {
        outline: 2px solid #0d6efd;
        outline-offset: 2px;
        background: white;
        border-radius: 4px;
    }
    
    .delete-btn {
        background: none;
        border: 1px solid #dc3545;
        color: #dc3545;
        padding: 0.375rem 0.75rem;
        border-radius: 6px;
        font-size: 0.875rem;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .delete-btn:hover {
        background: #dc3545;
        color: white;
    }
    
    .card-body {
        padding: 1.5rem;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 2rem;
        align-items: start;
    }
    
    .roulette-left {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
    
    .roulette-display {
        position: relative;
        text-align: center;
    }
    
    .roulette-canvas {
        cursor: pointer;
        transition: transform 3s cubic-bezier(0.6, 0, 0, 1);
        width: 280px;
        height: 280px;
        border-radius: 50%;
        border: 3px solid #dee2e6;
    }
    
    .roulette-pin {
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 18px;
        color: #495057;
        z-index: 10;
    }
    
    .result-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(13, 110, 253, 0.95);
        color: white;
        padding: 0.75rem 1.25rem;
        border-radius: 8px;
        font-weight: 600;
        font-size: 1rem;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 15;
        max-width: 80%;
        text-align: center;
        word-break: break-word;
        box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
    }
    
    .result-overlay.show {
        opacity: 1;
    }
    
    .btn-spin {
        background: #6366f1;
        border: 1px solid #6366f1;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s ease;
        align-self: flex-end;
        margin-bottom: 0.5rem;
    }
    
    .btn-spin:hover:not(:disabled) {
        background: #5b21b6;
        border-color: #5b21b6;
        transform: translateY(-1px);
    }
    
    .btn-spin:disabled {
        background: #6c757d;
        border-color: #6c757d;
        cursor: not-allowed;
        transform: none;
    }
    
    .roulette-right {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
    }
    
    
    .items-textarea {
        width: 100%;
        min-height: 200px;
        border: 1px solid #ced4da;
        border-radius: 8px;
        padding: 0.75rem;
        font-size: 0.875rem;
        font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
        resize: vertical;
        transition: border-color 0.2s ease;
        background: #f8f9fa;
    }
    
    .items-textarea:focus {
        outline: none;
        border-color: #0d6efd;
        box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
        background: white;
    }
    
    .btn-primary {
        background: #6366f1;
        border: 1px solid #6366f1;
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
    }
    
    .btn-primary:hover {
        background: #5b21b6;
        border-color: #5b21b6;
        transform: translateY(-1px);
    }
    
    .fab-add {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        min-width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #10b981;
        border: none;
        color: white;
        font-size: 1.5rem;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        transition: all 0.2s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 1rem;
        white-space: nowrap;
    }
    
    .fab-add:hover {
        background: #059669;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
    }
    
    .fab-add .add-text {
        margin-left: 0.5rem;
        font-size: 0.9rem;
        line-height: 1;
    }
    
    @media (min-width: 769px) {
        .fab-add {
            border-radius: 30px;
            padding: 0 1.5rem;
        }
    }
    
    /* 最初のカードは削除ボタン非表示 */
    .roulette-card[data-set-id="1"] .delete-btn {
        display: none;
    }
    
---

<div class="roulette-app">
    <div class="header-section">
        <h1 class="header-title">
            Webルーレット
        </h1>
        <button id="spinAll" class="btn-primary">
            全てスピン！
        </button>
    </div>
    
    <div id="rouletteSets" class="roulette-grid">
        <!-- ルーレットが動的に追加されます -->
    </div>
    
    <!-- Template: ルーレットカード（複製用） -->
    <template id="roulette-template">
        <div class="roulette-card">
            <div class="card-header">
                <input type="text" class="roulette-title" value="" maxlength="30" placeholder="ルーレット名">
                <button class="delete-btn" title="削除">×</button>
            </div>
            <div class="card-body">
                <div class="roulette-left">
                    <div class="roulette-display">
                        <div class="roulette-pin">▼</div>
                        <canvas class="roulette-canvas" width="280" height="280"></canvas>
                        <div class="result-overlay"></div>
                    </div>
                    <!-- スピンボタンは右側に移動 -->
                </div>
                <div class="roulette-right">
                    <button class="btn-spin">スピン！</button>
                    <textarea class="items-textarea" placeholder="項目（1行につき1つ）"></textarea>
                </div>
            </div>
        </div>
    </template>
    
    <button id="addRoulette" class="fab-add" title="ルーレット追加">
        <span style="transform: translateY(-2px); display: inline-block;">+</span>
        <span class="add-text">ルーレットを追加</span>
    </button>
</div>

<script>
class RouletteManager {
    constructor() {
        this.sets = [];
        this.nextId = 1;
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        
        // 最低1つのルーレットを保証
        if (this.sets.length === 0) {
            this.addFirstSet();
        } else {
            this.renderAllSets();
        }
    }

    setupEventListeners() {
        document.getElementById('spinAll').addEventListener('click', () => {
            this.spinAll();
        });
        
        document.getElementById('addRoulette').addEventListener('click', () => {
            this.addSet();
        });
        window.addEventListener('resize', () => this.resizeAllCanvases());
    }

    addFirstSet() {
        // 初回のルーレットを追加（重複チェック）
        if (this.sets.length > 0) return;
        
        const setData = {
            id: this.nextId++,
            items: ['項目1', '項目2', '項目3', '項目4', '項目5', '項目6'],
            title: 'ルーレット1',
            isSpinning: false,
            result: null,
            itemsVisible: true
        };
        
        this.sets.push(setData);
        this.renderAllSets();
        this.saveToStorage();
    }

    addSet() {
        const setData = {
            id: this.nextId++,
            items: ['項目1', '項目2', '項目3', '項目4', '項目5', '項目6'],
            title: `ルーレット${this.sets.length + 1}`,
            isSpinning: false,
            result: null,
            itemsVisible: true
        };
        
        this.sets.push(setData);
        
        // 新しい要素のみを追加（全体再描画を避ける）
        const container = document.getElementById('rouletteSets');
        const setElement = this.createSetElement(setData);
        container.appendChild(setElement);
        
        // Canvas初期化
        const canvas = setElement.querySelector('.roulette-canvas');
        this.updateCanvasSize(canvas);
        this.drawRoulette(canvas, setData.items);
        
        this.saveToStorage();
        
        // 現在位置からスムーズスクロール
        setTimeout(() => {
            setElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
            
            const textarea = setElement.querySelector('.items-textarea');
            if (textarea) {
                setTimeout(() => {
                    textarea.focus();
                    textarea.select();
                }, 500);
            }
        }, 100);
    }

    renderAllSets() {
        const container = document.getElementById('rouletteSets');
        container.innerHTML = '';
        container.className = 'roulette-grid';
        
        this.sets.forEach(setData => { this.renderSet(setData); });
        this.resizeAllCanvases();
    }

    renderSet(setData) {
        const container = document.getElementById('rouletteSets');
        const setElement = this.createSetElement(setData);
        container.appendChild(setElement);
        const canvas = setElement.querySelector('.roulette-canvas');
        this.updateCanvasSize(canvas);
        this.drawRoulette(canvas, setData.items);
    }

    createSetElement(setData) {
        const tpl = document.getElementById('roulette-template');
        const node = tpl.content.firstElementChild.cloneNode(true);
        node.dataset.setId = setData.id;

        // Fill fields
        node.querySelector('.roulette-title').value = setData.title;
        node.querySelector('.items-textarea').value = setData.items.join('\n');
        const ro = node.querySelector('.result-overlay');
        ro.textContent = setData.result || '';

        // Disable state
        const spinBtn = node.querySelector('.btn-spin');
        if (setData.isSpinning) {
            spinBtn.disabled = true;
            spinBtn.textContent = '回転中...';
        } else {
            spinBtn.textContent = 'スピン！';
        }

        this.setupSetEventListeners(node, setData);
        return node;
    }

    updateCanvasSize(canvas) {
        const rect = canvas.getBoundingClientRect();
        // SPでは横いっぱい、PC/Tabletはカード内幅で自動。範囲を制限。
        const target = Math.max(220, Math.min(360, Math.round(rect.width)));
        if (canvas.width !== target) {
            canvas.width = target;
            canvas.height = target;
        }
    }

    resizeAllCanvases() {
        this.sets.forEach(setData => {
            const el = document.querySelector(`[data-set-id="${setData.id}"]`);
            if (!el) return;
            const canvas = el.querySelector('.roulette-canvas');
            this.updateCanvasSize(canvas);
            this.drawRoulette(canvas, setData.items);
        });
    }

    setupSetEventListeners(setElement, setData) {
        const canvas = setElement.querySelector('.roulette-canvas');
        const textarea = setElement.querySelector('.items-textarea');
        if (textarea) textarea.placeholder = '項目（1行につき1つ）';
        const spinBtn = setElement.querySelector('.btn-spin');
        const deleteBtn = setElement.querySelector('.delete-btn');
        const titleInput = setElement.querySelector('.roulette-title');

        // スピンボタン・ルーレットクリック
        const spinHandler = () => this.spinRoulette(setData, canvas, setElement);
        spinBtn.addEventListener('click', spinHandler);
        canvas.addEventListener('click', spinHandler);

        // テキストエリア変更
        textarea.addEventListener('input', () => {
            const items = textarea.value.split('\n').filter(item => item.trim());
            setData.items = items.length > 0 ? items : ['項目1'];
            this.drawRoulette(canvas, setData.items);
            this.saveToStorage();
        });

        // 削除ボタンの表示制御と処理
        if (deleteBtn) {
            // 最初のルーレット（ID=1）または最後の1つの場合は削除ボタンを非表示
            if (setData.id === 1 || this.sets.length <= 1) {
                deleteBtn.style.display = 'none';
            } else {
                deleteBtn.style.display = 'block';
                deleteBtn.addEventListener('click', () => {
                    this.deleteSet(setData.id);
                });
            }
        }

        // タイトル変更
        titleInput.addEventListener('input', () => {
            setData.title = titleInput.value;
            this.saveToStorage();
        });

        // 項目は常時表示のためトグルなし
    }

    drawRoulette(canvas, items) {
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 5;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (items.length === 0) return;

        const anglePerItem = (2 * Math.PI) / items.length;
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
            '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
            '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'
        ];

        items.forEach((item, index) => {
            const startAngle = index * anglePerItem - Math.PI / 2;
            const endAngle = (index + 1) * anglePerItem - Math.PI / 2;

            // セクション描画
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = colors[index % colors.length];
            ctx.fill();

            // テキスト描画
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + anglePerItem / 2);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#333';
            ctx.font = 'bold 13px "Segoe UI", sans-serif';
            
            const textRadius = radius * 0.7;
            const maxWidth = radius * 0.6;
            this.drawTextWithWrap(ctx, item, textRadius, 0, maxWidth);
            ctx.restore();
        });
    }

    drawTextWithWrap(ctx, text, x, y, maxWidth) {
        const words = text.split('');
        const lineHeight = 16;
        
        // 10文字程度を目安に改行
        if (text.length <= 10) {
            ctx.fillText(text, x, y);
            return;
        }
        
        // 2行に分割して表示
        const midPoint = Math.ceil(text.length / 2);
        let firstLine = text.substring(0, midPoint);
        let secondLine = text.substring(midPoint);
        
        // 単語境界で調整（ひらがな・カタカナ・漢字の場合は文字単位）
        if (text.length > 10) {
            firstLine = text.substring(0, Math.min(10, midPoint));
            secondLine = text.substring(firstLine.length);
            
            // 2行目が長すぎる場合は省略
            if (secondLine.length > 8) {
                secondLine = secondLine.substring(0, 7) + '...';
            }
        }
        
        ctx.fillText(firstLine, x, y - lineHeight / 2);
        ctx.fillText(secondLine, x, y + lineHeight / 2);
    }

    spinRoulette(setData, canvas, setElement) {
        if (setData.isSpinning) return;

        setData.isSpinning = true;
        setData.result = null;
        
        const spinBtn = setElement.querySelector('.btn-spin');
        const resultOverlay = setElement.querySelector('.result-overlay');
        
        spinBtn.textContent = '回転中...';
        spinBtn.disabled = true;
        resultOverlay.classList.remove('show');

        // 回転角度計算
        const lightSpin = Math.random() < 0.15;
        const minRotation = lightSpin ? 720 : 1800;
        const maxRotation = lightSpin ? 1440 : 3600;
        const rotation = Math.random() * (maxRotation - minRotation) + minRotation;
        
        canvas.style.transform = `rotate(${rotation}deg)`;

        setTimeout(() => {
            // 結果計算
            const normalizedRotation = rotation % 360;
            const sectorAngle = 360 / setData.items.length;
            const selectedIndex = Math.floor((360 - normalizedRotation + sectorAngle / 2) / sectorAngle) % setData.items.length;
            
            setData.result = setData.items[selectedIndex];
            setData.isSpinning = false;
            
            // UI更新
            spinBtn.textContent = 'スピン！';
            spinBtn.disabled = false;
            
            this.showResult(setElement, setData.result);
            this.saveToStorage();
        }, 3000);

        this.saveToStorage();
    }

    showResult(setElement, result) {
        const resultOverlay = setElement.querySelector('.result-overlay');
        if (resultOverlay) {
            resultOverlay.textContent = result;
            resultOverlay.classList.add('show');
        }
    }

    spinAll() {
        this.sets.forEach(setData => {
            const setElement = document.querySelector(`[data-set-id="${setData.id}"]`);
            if (setElement) {
                const canvas = setElement.querySelector('.roulette-canvas');
                this.spinRoulette(setData, canvas, setElement);
            }
        });
    }

    deleteSet(setId) {
        // 最後の1つは削除できない
        if (this.sets.length <= 1) {
            return;
        }
        
        // DOM要素を直接削除
        const elementToDelete = document.querySelector(`[data-set-id="${setId}"]`);
        if (elementToDelete) {
            elementToDelete.remove();
        }
        
        // データからも削除
        this.sets = this.sets.filter(set => set.id !== setId);
        this.saveToStorage();
    }

    saveToStorage() {
        const saveData = {
            sets: this.sets.map(set => ({
                ...set,
                isSpinning: false
            })),
            nextId: this.nextId
        };
        localStorage.setItem('rouletteData', JSON.stringify(saveData));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('rouletteData');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.sets = data.sets || [];
                this.nextId = data.nextId || 1;
            } catch (e) {
                console.error('Failed to load saved data:', e);
                this.sets = [];
                this.nextId = 1;
            }
        }
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    new RouletteManager();
});
</script>
