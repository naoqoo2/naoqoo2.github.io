---
layout: app
title: "Webルーレット"
app_name: "Webルーレット"
description: "入力した項目からランダムに即決定できる無料のオンラインルーレット。複数ルーレット管理、編集/ビュー切替、スマホ対応。イベントや当番決めに最適。"
include_tailwind: true
custom_css: |
    /* ルーレット固有のスタイル */
    .roulette-canvas {
        transition: transform 3s cubic-bezier(0.6, 0, 0, 1);
    }
    
    /* スマホ時の調整（サイズ固定は撤去、テキストのみ制御） */
    @media (max-width: 768px) {
        .spin-text, .add-text {
            display: none;
        }
        
        /* スマホ時はボタンを丸型にしてアイコンのみ表示 */
        #spinAll, #addRoulette {
            width: 60px !important;
            height: 60px !important;
            padding: 0 !important;
            border-radius: 50% !important;
            justify-content: center !important;
        }
        
        #spinAll i, #addRoulette i {
            margin: 0 !important;
        }
    }

    /* ビューモード・編集モード用スタイル */
    .view-mode .roulette-right,
    .view-mode .delete-btn {
        display: none !important;
    }

    /* 最終行を中央寄せするため、ビューモードはFlex + 固定比率基準 */
    .view-mode #rouletteSets {
        display: flex;
        flex-wrap: wrap;
        justify-content: center; /* 最終行中央寄せ */
        gap: 0.75rem; /* Tailwind gap-3 相当 */
    }
    .view-mode #rouletteSets > .roulette-card {
        flex: 0 1 100%;
        max-width: 100%;
    }
    @media (min-width: 640px) { /* sm: 2列 */
        .view-mode #rouletteSets > .roulette-card { flex-basis: calc(50% - 0.75rem); max-width: calc(50% - 0.75rem); }
    }
    @media (min-width: 1024px) { /* lg: 3列（最大） */
        .view-mode #rouletteSets > .roulette-card { flex-basis: calc(33.333% - 0.75rem); max-width: calc(33.333% - 0.75rem); }
    }

    /* 編集モードも中央寄せ（md以上は2列を維持） */
    .edit-mode #rouletteSets {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.75rem;
    }
    .edit-mode #rouletteSets > .roulette-card {
        flex: 0 1 100%;
        max-width: 100%;
    }
    /* カード内は常に縦積み（テキストエリアは下） */
    .roulette-app .roulette-card .md\:flex-row { flex-direction: column !important; }
    .roulette-app .roulette-card .md\:flex-row > * { width: 100% !important; }

    /* 列数は共通: mdで2列、lgで3列 */
    @media (min-width: 768px) { /* md */
        .edit-mode #rouletteSets > .roulette-card { flex-basis: calc(50% - 0.75rem); max-width: calc(50% - 0.75rem); }
    }
    @media (min-width: 1024px) { /* lg */
        .edit-mode #rouletteSets > .roulette-card { flex-basis: calc(33.333% - 0.75rem); max-width: calc(33.333% - 0.75rem); }
    }

    /* ルーレットを常に中央寄せ */
    .roulette-app .roulette-canvas { display: block; margin-left: auto; margin-right: auto; }
    .roulette-app .roulette-card .relative.flex { width: 100%; justify-content: center; }

    /* 以前のレイアウト強制は撤去し、Tailwindユーティリティで制御 */
    
    .result-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 0.75rem 1.25rem;
        border-radius: 12px;
        font-weight: 700;
        font-size: 1.1rem;
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        z-index: 15;
        max-width: 80%;
        text-align: center;
        word-break: break-word;
        box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        cursor: text;
        user-select: text;
        pointer-events: none;
    }
    
    .result-overlay.show {
        opacity: 1;
        pointer-events: auto;
    }
    
    .btn-spin {
        background: #6366f1;
        border: 1px solid #6366f1;
        color: white;
        padding: 0.375rem 0.75rem;
        border-radius: 6px;
        font-weight: 600;
        font-size: 0.875rem;
        cursor: pointer;
        transition: all 0.2s ease;
        align-self: flex-start;
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
        gap: 0.5rem;
        align-items: flex-start;
        width: 100%;
    }
    
    
    .items-textarea {
        width: 100%;
        min-height: 180px;
        border: 1px solid #ced4da;
        border-radius: 6px;
        padding: 0.5rem;
        font-size: 14px; /* JSでキャンバスと同じサイズに同期 */
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Yu Gothic UI', 'YuGothic', 'Meiryo', sans-serif;
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
    
    .btn-secondary {
        background: #6c757d;
        border: 1px solid #6c757d;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        min-width: 100px;
        text-align: center;
    }
    
    .btn-secondary:hover {
        background: #5a6268;
        border-color: #5a6268;
        transform: translateY(-1px);
    }
    
    .fab-add {
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
    
    .view-mode .roulette-right,
    .view-mode .delete-btn,
    .view-mode #addRoulette {
        display: none;
    }
    
    /* ビューモードでも全てスピンボタンは表示 */
    .view-mode #spinAll {
        display: flex !important;
    }
    
    .view-mode .card-header {
        padding: 0.25rem 0;
    }
    
    .view-mode .header-actions {
        display: none;
    }
    
    .view-mode .roulette-card {
        padding: 0.25rem;
    }
    
    /* ビューモード時の枠線とスタイルを削除 */
    .view-mode .roulette-card .bg-white {
        border: none !important;
        background: transparent !important;
        box-shadow: none !important;
    }
    
    /* ビューモード時のタイトル下の罫線も削除 */
    .view-mode .border-b {
        border-bottom: none !important;
    }
    
    /* ビューモードの見た目調整（表示制御のみ維持） */
    
    /* ビューモードの見た目調整（表示制御のみ維持） */
    
---

<div class="roulette-app max-w-screen-2xl mx-auto px-3" style="visibility:hidden;">
    <div class="flex justify-between items-center pb-2 mb-3">
        <h1 class="text-xl font-semibold text-gray-600 m-0">
            Webルーレット
        </h1>
        <div class="bg-gray-200 border border-gray-400 rounded-lg p-1 flex">
            <button id="viewTab" class="px-4 py-2 rounded-md text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-100" data-mode="view">
                <i class="fas fa-eye"></i> ビュー
            </button>
            <button id="editTab" class="px-4 py-2 rounded-md text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-100" data-mode="edit">
                <i class="fas fa-edit"></i> 編集
            </button>
        </div>
    </div>
    
    <!-- 初期クラスは最小限。JSでモード別にTailwindを付与 -->
    <div id="rouletteSets" class="mb-3">
        <!-- ルーレットが動的に追加されます -->
    </div>
    
    <!-- Template: ルーレットカード（複製用） -->
    <template id="roulette-template">
        <div class="roulette-card">
            <div class="bg-white border border-gray-200 rounded-lg shadow-sm h-full">
                <div class="flex justify-between items-center py-2 px-4 border-b border-gray-200">
                    <input type="text" class="flex-1 border-0 bg-transparent font-bold text-gray-700 roulette-title max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white rounded px-2 py-1" 
                           value="" maxlength="30" placeholder="ルーレット名">
                    <button class="delete-btn text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 transition-all" title="削除">×</button>
                </div>
                <div class="p-4">
                    <div class="flex flex-col md:flex-row w-full gap-4 md:gap-6 items-start">
                        <div class="flex flex-col items-center justify-center w-full md:w-1/2">
                            <div class="relative flex justify-center">
                                <div class="roulette-pin absolute text-gray-700 text-lg z-10" style="top: -8px; left: 50%; transform: translateX(-50%);">▼</div>
                                <canvas class="roulette-canvas cursor-pointer rounded-full border-4 border-gray-300" width="260" height="260"></canvas>
                                <div class="result-overlay absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            </div>
                        </div>
                        <div class="roulette-right w-full md:w-1/2 flex flex-col">
                            <textarea class="w-full border border-gray-300 rounded-md px-3 py-2 items-textarea bg-gray-50 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white flex-1" 
                                    placeholder="項目（1行につき1つ）" style="min-height: 260px;"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    
    <div class="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        <button id="spinAll" class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-2 text-lg">
            <i class="fas fa-sync-alt text-xl"></i>
            <span class="spin-text">全てスピン！</span>
        </button>
        <button id="addRoulette" class="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-2 text-lg" title="ルーレット追加">
            <i class="fas fa-plus text-xl"></i>
            <span class="add-text">ルーレットを追加</span>
        </button>
    </div>
</div>

<script>
class RouletteManager {
    constructor() {
        this.sets = [];
        this.nextId = 1;
        this.isViewMode = false;
        this._resizeObservers = new Map();
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.setupEventListeners();

        // 可能な限り早くモードを適用（チラつき軽減）
        this.bootstrapViewMode();

        // 最低1つのルーレットを保証
        if (this.sets.length === 0) {
            this.addFirstSet();
        } else {
            this.renderAllSets();
        }

        // 初期レイアウト調整後に表示
        requestAnimationFrame(() => {
            this.applyLayoutClasses();
            this.resizeAllCanvases();
            const root = document.querySelector('.roulette-app');
            if (root) root.style.visibility = 'visible';
        });
    }

    setupEventListeners() {
        document.getElementById('spinAll').addEventListener('click', () => {
            this.spinAll();
        });
        
        document.getElementById('viewTab').addEventListener('click', () => {
            this.setViewMode(true);
        });
        
        document.getElementById('editTab').addEventListener('click', () => {
            this.setViewMode(false);
        });
        
        document.getElementById('addRoulette').addEventListener('click', () => {
            this.addSet();
        });
        window.addEventListener('resize', () => {
            this.applyLayoutClasses();
            this.resizeAllCanvases();
        });
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
        this.applyLayoutClasses();
        
        // Canvas初期化
        const canvas = setElement.querySelector('.roulette-canvas');
        this.updateCanvasSize(canvas);
        this.drawRoulette(canvas, setData.items);
        this.observeSet(setElement);
        
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
        // レイアウトはモードに応じてTailwindクラスで適用

        this.sets.forEach(setData => { this.renderSet(setData); });
        this.applyLayoutClasses();
        this.observeAll();
        this.resizeAllCanvases();
    }

    renderSet(setData) {
        const container = document.getElementById('rouletteSets');
        const setElement = this.createSetElement(setData);
        container.appendChild(setElement);
        const canvas = setElement.querySelector('.roulette-canvas');
        this.updateCanvasSize(canvas);
        this.drawRoulette(canvas, setData.items);
        this.observeSet(setElement);
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

        // 回転状態の表示は結果オーバーレイで管理

        // 追加前にモードに応じたレイアウトクラスを整える（初期チラつき対策）
        try {
            const row = node.querySelector('.md\\:flex-row') || node.querySelector('.flex');
            if (row && row.firstElementChild) {
                const left = row.firstElementChild;
                left.classList.add('w-full');
                left.classList.remove('md:w-1/2');
            }
        } catch (e) {}

        this.setupSetEventListeners(node, setData);
        return node;
    }

    updateCanvasSize(canvas) {
        // 左カラム（canvasの親の親）幅に応じて可変
        let col = null;
        if (canvas && canvas.parentElement && canvas.parentElement.parentElement) {
            col = canvas.parentElement.parentElement;
        }
        const available = col ? Math.floor(col.getBoundingClientRect().width) : (canvas.clientWidth || 260);
        const desired = Math.floor(available - 24);
        const size = Math.max(240, Math.min(desired, 720));
        if (canvas.width !== size || canvas.height !== size) {
            canvas.width = size;
            canvas.height = size;
            canvas.style.width = size + 'px';
            canvas.style.height = size + 'px';
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
        const deleteBtn = setElement.querySelector('.delete-btn');
        const titleInput = setElement.querySelector('.roulette-title');

        // ルーレットクリック
        const spinHandler = () => this.spinRoulette(setData, canvas, setElement);
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

        // フォントサイズをキャンバスサイズに応じて可変（テキストエリアと共通化）
        const { dynamicFont, lineHeight } = this.computeFontMetrics(canvas);

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
            ctx.font = `bold ${dynamicFont}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Yu Gothic UI', 'YuGothic', 'Meiryo', sans-serif`;
            
            const textRadius = radius * 0.7;
            const maxWidth = radius * 0.6;
            this.drawTextWithWrap(ctx, item, textRadius, 0, maxWidth, dynamicFont, lineHeight);
            ctx.restore();
        });
    }

    drawTextWithWrap(ctx, text, x, y, maxWidth, fontSize, lineHeight) {
        // 文字単位で改行しつつ最大幅に収める（最大3行、超過は省略）
        const chars = Array.from(text);
        const lines = [];
        let current = '';

        const fits = (s) => ctx.measureText(s).width <= maxWidth;

        for (const ch of chars) {
            if (current === '') {
                current = ch;
                continue;
            }
            const next = current + ch;
            if (fits(next)) {
                current = next;
            } else {
                lines.push(current);
                current = ch;
                if (lines.length >= 2) { // これ以上増える場合は省略処理に回す
                    break;
                }
            }
        }
        if (current) lines.push(current);

        // 3行を超える場合は3行目を省略付きで調整
        if (lines.length > 3) {
            lines.length = 3;
        }
        if (lines.length === 3) {
            let last = lines[2];
            while (!fits(last + '…') && last.length > 0) {
                last = last.slice(0, -1);
            }
            lines[2] = last + (last ? '…' : '');
        }

        // 垂直中央に配置
        const totalHeight = lineHeight * (lines.length - 1);
        lines.forEach((line, idx) => {
            const yOffset = y - totalHeight / 2 + idx * lineHeight;
            ctx.fillText(line, x, yOffset);
        });
    }

    computeFontMetrics(canvas) {
        // タブレット・PCではより大きく、SPでも見やすい下限に
        const dynamicFont = Math.max(16, Math.min(28, Math.round(canvas.width * 0.05)));
        const lineHeight = Math.round(dynamicFont * 1.2);
        return { dynamicFont, lineHeight };
    }

    // テキストエリアと結果オーバーレイのフォントはCSSに委ねる

    spinRoulette(setData, canvas, setElement) {
        if (setData.isSpinning) return;

        setData.isSpinning = true;
        setData.result = null;
        
        const resultOverlay = setElement.querySelector('.result-overlay');
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
        this.applyLayoutClasses();
        this.unobserveSet(setId);
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

    setViewMode(isViewMode) {
        this.isViewMode = isViewMode;
        const app = document.querySelector('.roulette-app');
        const viewTab = document.getElementById('viewTab');
        const editTab = document.getElementById('editTab');
        
        if (this.isViewMode) {
            app.classList.add('view-mode');
            app.classList.remove('edit-mode');
            viewTab.classList.add('bg-gray-600', 'text-white', 'shadow-md');
            viewTab.classList.remove('text-gray-600');
            editTab.classList.remove('bg-gray-600', 'text-white', 'shadow-md');
            editTab.classList.add('text-gray-600');
        } else {
            app.classList.remove('view-mode');
            app.classList.add('edit-mode');
            editTab.classList.add('bg-gray-600', 'text-white', 'shadow-md');
            editTab.classList.remove('text-gray-600');
            viewTab.classList.remove('bg-gray-600', 'text-white', 'shadow-md');
            viewTab.classList.add('text-gray-600');
        }
        
        this.saveViewModeState();
        this.applyLayoutClasses();
        this.observeAll();
    }

    observeSet(setElement) {
        const id = parseInt(setElement.dataset.setId, 10);
        this.unobserveSet(id);
        const row = setElement.querySelector('.flex.flex-col.md\\:flex-row');
        if (!row || !row.firstElementChild) return;
        const leftCol = row.firstElementChild;
        const canvas = setElement.querySelector('.roulette-canvas');
        if (!canvas) return;
        const ro = new ResizeObserver(() => {
            this.updateCanvasSize(canvas);
            const setData = this.sets.find(s => s.id === id);
            if (setData) this.drawRoulette(canvas, setData.items);
        });
        ro.observe(leftCol);
        this._resizeObservers.set(id, ro);
    }

    observeAll() {
        document.querySelectorAll('[data-set-id]').forEach(node => this.observeSet(node));
    }

    unobserveSet(setId) {
        const ro = this._resizeObservers.get(setId);
        if (ro) {
            try { ro.disconnect(); } catch (e) {}
            this._resizeObservers.delete(setId);
        }
    }

    applyLayoutClasses() {
        const container = document.getElementById('rouletteSets');
        if (!container) return;
        container.className = 'mb-3'; // 表示はCSSで切替

        // カード内レイアウト（常に縦積み。左=ルーレットは全幅）
        const cards = container.querySelectorAll('.roulette-card');
        cards.forEach(card => {
            const row = card.querySelector('.md\\:flex-row') || card.querySelector('.flex');
            if (!row || !row.firstElementChild) return;
            row.firstElementChild.classList.remove('md:w-1/2');
            row.firstElementChild.classList.add('w-full');
        });

        requestAnimationFrame(() => this.resizeAllCanvases());
    }

    saveViewModeState() {
        localStorage.setItem('rouletteViewMode', JSON.stringify(this.isViewMode));
    }

    loadViewModeState() {
        try {
            const saved = localStorage.getItem('rouletteViewMode');
            if (saved !== null) {
                this.isViewMode = JSON.parse(saved);
                // setViewModeを呼び出して正しくスタイルを適用
                this.setViewMode(this.isViewMode);
            }
        } catch (e) {
            console.error('Failed to load view mode state:', e);
            this.isViewMode = false;
            this.setViewMode(false);
        }
    }

    // DOM挿入前にモードのクラスだけ適用（レイアウト確定を早める）
    bootstrapViewMode() {
        try {
            const saved = localStorage.getItem('rouletteViewMode');
            if (saved !== null) this.isViewMode = JSON.parse(saved);
        } catch (_) { this.isViewMode = false; }

        const app = document.querySelector('.roulette-app');
        const viewTab = document.getElementById('viewTab');
        const editTab = document.getElementById('editTab');
        if (!app || !viewTab || !editTab) return;

        if (this.isViewMode) {
            app.classList.add('view-mode');
            app.classList.remove('edit-mode');
            viewTab.classList.add('bg-gray-600', 'text-white', 'shadow-md');
            viewTab.classList.remove('text-gray-600');
            editTab.classList.remove('bg-gray-600', 'text-white', 'shadow-md');
            editTab.classList.add('text-gray-600');
        } else {
            app.classList.remove('view-mode');
            app.classList.add('edit-mode');
            editTab.classList.add('bg-gray-600', 'text-white', 'shadow-md');
            editTab.classList.remove('text-gray-600');
            viewTab.classList.remove('bg-gray-600', 'text-white', 'shadow-md');
            viewTab.classList.add('text-gray-600');
        }
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    const manager = new RouletteManager();
    // 全リソースロード後にも再計算して初期サイズのぶれを抑制
    window.addEventListener('load', () => manager.resizeAllCanvases());
});
</script>
