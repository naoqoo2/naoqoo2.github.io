---
layout: app
title: "Webルーレット"
app_name: "Webルーレット"
description: "入力した項目からランダムに即決定できる無料のオンラインルーレット。複数ルーレット管理、編集/ビュー切替、スマホ対応。イベントや当番決めに最適。"
include_tailwind: true
custom_css: |
    /* ルーレット固有のスタイル */
    .roulette-canvas {
        transition: transform 5s cubic-bezier(0.6, 0, 0, 1);
    }
    
    /* スマホ時の調整: ラベルの省略（形状は四角のまま） */
    @media (max-width: 768px) {
        .add-text { display: none; }
        #modeToggle .mode-text { display: none; }
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
    
    /* Sticky header visuals */
    .roulette-sticky-header {
        background: rgba(255, 255, 255, 0.75);
        backdrop-filter: saturate(1.2) blur(6px);
        /* 下線・ホバー時の影は不要 */
    }

    /* Controls row helpers */
    .roulette-controls-row { min-height: 56px; }

    /* SP: スピンは左寄せ（中央絶対配置を無効化） */
    @media (max-width: 768px) {
        .roulette-controls-row { display: flex; }
        .controls-center { position: static !important; left: auto !important; transform: none !important; margin-right: auto; }
        #spinAll { white-space: nowrap; }
    }

    /* 横持ち時は強制2列（小さめ端末の横持ち対策） */
    @media (orientation: landscape) and (max-width: 767.98px) {
        .view-mode #rouletteSets > .roulette-card { flex-basis: calc(50% - 0.75rem); max-width: calc(50% - 0.75rem); }
        .edit-mode #rouletteSets > .roulette-card { flex-basis: calc(50% - 0.75rem); max-width: calc(50% - 0.75rem); }
    }
    
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
        font-size: 16px; /* iOSの自動ズーム回避（16px以上で発動しない） */
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
    
    
    /* 削除ボタンの表示はJSで制御（セット数が1のときのみ非表示） */
    
    .view-mode .roulette-right,
    .view-mode .delete-btn {
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
    <!-- Title row (non-sticky / SP only) -->
    <div class="py-2 md:hidden">
        <h1 class="text-xl font-semibold text-gray-700 m-0 text-center md:text-left">Webルーレット</h1>
    </div>

    <!-- Sticky controls: spin centered, actions on right; title shows here on md+ -->
    <div class="roulette-sticky-header sticky top-0 z-40">
        <div class="roulette-controls-row relative flex items-center py-2">
            <div class="controls-left hidden md:flex items-center">
                <h1 class="text-xl font-semibold text-gray-700 m-0">Webルーレット</h1>
            </div>
            <div class="controls-center absolute left-1/2 transform -translate-x-1/2">
                <button id="spinAll" class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 text-lg">
                    <i class="fas fa-sync-alt text-xl"></i>
                    <span class="spin-text">スピン！</span>
                </button>
            </div>
            <div class="controls-right ml-auto flex items-center gap-2">
                <button id="addRoulette" class="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-md font-semibold shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 text-sm" title="ルーレット追加">
                    <i class="fas fa-plus"></i>
                    <span class="add-text">追加</span>
                </button>
                <button id="modeToggle" type="button" class="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-200 border border-gray-400 hover:bg-gray-100 transition-all duration-200 flex items-center gap-2">
                    <i class="fas fa-edit"></i>
                    <span class="mode-text">編集</span>
                </button>
            </div>
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
                                    placeholder="項目（1行につき1つ）" rows="8"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    
    <!-- floating controls removed; now in sticky header -->
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

    getRandomDefaultText() {
        const patterns = [
            // 通常（均等）
            '項目1\n項目2\n項目3\n項目4\n項目5\n項目6',
            // 改行重み付（空行で直前項目の重み+1）
            'はずれ\n\n\nあたり',
            // 数値重み付（末尾 *N）
            'たわし*19\nパジェロ'
        ];
        return patterns[Math.floor(Math.random() * patterns.length)];
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
        
        const modeToggle = document.getElementById('modeToggle');
        if (modeToggle) {
            modeToggle.addEventListener('click', () => {
                this.setViewMode(!this.isViewMode);
            });
        }

        document.getElementById('addRoulette').addEventListener('click', () => {
            if (this.isViewMode) {
                this.setViewMode(false);
            }
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
            text: this.getRandomDefaultText(),
            title: 'ルーレット1',
            isSpinning: false,
            result: null,
            itemsVisible: true
        };
        
        this.sets.push(setData);
        this.renderAllSets();
        this.updateDeleteButtonsState();
        this.saveToStorage();
    }

    addSet() {
        const setData = {
            id: this.nextId++,
            text: this.getRandomDefaultText(),
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
        this.drawRoulette(canvas, setElement);
        this.observeSet(setElement);
        
        this.saveToStorage();
        this.updateDeleteButtonsState();
        
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
        this.updateDeleteButtonsState();
    }

    renderSet(setData) {
        const container = document.getElementById('rouletteSets');
        const setElement = this.createSetElement(setData);
        container.appendChild(setElement);
        const canvas = setElement.querySelector('.roulette-canvas');
        this.updateCanvasSize(canvas);
        this.drawRoulette(canvas, setElement);
        this.observeSet(setElement);
        this.updateDeleteButtonsState();
    }

    updateDeleteButtonsState() {
        const showByCount = this.sets.length > 1;
        const show = showByCount && !this.isViewMode; // ビューモードは常に非表示
        document.querySelectorAll('.roulette-card .delete-btn').forEach(btn => {
            btn.style.display = show ? 'block' : 'none';
        });
    }

    createSetElement(setData) {
        const tpl = document.getElementById('roulette-template');
        const node = tpl.content.firstElementChild.cloneNode(true);
        node.dataset.setId = setData.id;

        // Fill fields
        node.querySelector('.roulette-title').value = setData.title;
        node.querySelector('.items-textarea').value = (typeof setData.text === 'string') ? setData.text : '';
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

    getWeightedItems(setElement) {
        try {
            const ta = setElement?.querySelector?.('.items-textarea');
            const text = (ta && typeof ta.value === 'string') ? ta.value : '';
            const lines = text.split(/\n/);
            // 末尾の空行は無視（ユーザーの意図しない改行を除外）
            while (lines.length > 0 && lines[lines.length - 1].trim().length === 0) {
                lines.pop();
            }
            const result = [];
            let last = null;
            for (const raw of lines) {
                const line = raw.trim();
                if (line.length === 0) {
                    if (last) last.weight += 1; // 空行は直前の項目の重みを増やす
                } else {
                    // 明示重み（末尾 *N）に対応。例: 赤*3 → label=赤, weight=3
                    let label = line;
                    let weight = 1;
                    const m = line.match(/^(.*?)\s*\*\s*(\d+)$/);
                    if (m) {
                        label = m[1].trim();
                        const n = parseInt(m[2], 10);
                        if (!isNaN(n) && n > 0) weight = n;
                    }
                    last = { label, weight };
                    result.push(last);
                }
            }
            return result;
        } catch (_) {
            return [];
        }
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
            this.drawRoulette(canvas, el);
        });
    }

    setupSetEventListeners(setElement, setData) {
        const canvas = setElement.querySelector('.roulette-canvas');
        const textarea = setElement.querySelector('.items-textarea');
        const deleteBtn = setElement.querySelector('.delete-btn');
        const titleInput = setElement.querySelector('.roulette-title');

        // ルーレットクリック
        const spinHandler = () => this.spinRoulette(setData, canvas, setElement);
        canvas.addEventListener('click', spinHandler);

        // テキストエリア変更
        textarea.addEventListener('input', () => {
            setData.text = textarea.value;
            this.drawRoulette(canvas, setElement);
            this.saveToStorage();
        });

        // 削除ボタンのクリックハンドラ（可視状態は別途一括で制御）
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                this.deleteSet(setData.id);
            });
        }

        // タイトル変更
        titleInput.addEventListener('input', () => {
            setData.title = titleInput.value;
            this.saveToStorage();
        });

        // 項目は常時表示のためトグルなし
    }

    drawRoulette(canvas, setElement) {
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 5;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const weighted = this.getWeightedItems(setElement);
        if (weighted.length === 0) return;
        const totalWeight = weighted.reduce((s, it) => s + it.weight, 0);
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
            '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
            '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'
        ];

        // フォントサイズをキャンバスサイズに応じて可変（テキストエリアと共通化）
        const { dynamicFont, lineHeight } = this.computeFontMetrics(canvas);

        let currentAngle = -Math.PI / 2;
        weighted.forEach(({ label, weight }, index) => {
            const angle = (2 * Math.PI) * (weight / totalWeight);
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;

            // セクション描画
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            // 1個目と2個目の色を入れ替える
            let ci = index % colors.length;
            if (ci === 0) ci = 1; else if (ci === 1) ci = 0;
            ctx.fillStyle = colors[ci];
            ctx.fill();

            // テキスト描画
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + angle / 2);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#333';
            ctx.font = `bold ${dynamicFont}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Yu Gothic UI', 'YuGothic', 'Meiryo', sans-serif`;
            
            const textRadius = radius * 0.7;
            const maxWidth = radius * 0.6;
            this.drawTextWithWrap(ctx, label, textRadius, 0, maxWidth, dynamicFont, lineHeight);
            ctx.restore();
            currentAngle = endAngle;
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
        // 事前に重みを確認（空ルーレットなら何もしない）
        const weightedBefore = this.getWeightedItems(setElement);
        if (!weightedBefore || weightedBefore.length === 0) {
            return;
        }

        setData.isSpinning = true;
        setData.result = null;
        
        const resultOverlay = setElement.querySelector('.result-overlay');
        resultOverlay.classList.remove('show');

        // 回転角度計算（方向は毎回ランダム、初回から反時計回りもあり）
        const lightSpin = Math.random() < 0.15;
        const minRotation = lightSpin ? 720 : 1800;   // 2回転 or 5回転以上
        const maxRotation = lightSpin ? 1440 : 3600;  // 4回転 or 10回転未満
        const base = Math.random() * (maxRotation - minRotation) + minRotation;
        const direction = Math.random() < 0.5 ? -1 : 1;
        const deltaRotation = base * direction;
        setData._angleDeg = (setData._angleDeg || 0) + deltaRotation;
        canvas.style.transform = `rotate(${setData._angleDeg}deg)`;

        setTimeout(() => {
            // 結果計算（重み付き）: 今回の回転量で当たりを決定
            const normalizedRotation = deltaRotation % 360; // 0..±359
            const weighted = weightedBefore; // スタート時の定義で固定
            const totalWeight = weighted.reduce((s, it) => s + it.weight, 0) || 1;
            // ポインタは常に上(-90deg)。回転が時計回りRのとき、元の座標系でのポインタ角は -90 - R
            const pointerAngle = (((-90 - normalizedRotation) % 360) + 360) % 360; // 0..359
            let selectedIndex = 0;
            let startDeg = -90;
            for (let i = 0; i < weighted.length; i++) {
                const angleDeg = 360 * (weighted[i].weight / totalWeight);
                const endDeg = startDeg + angleDeg;
                // 正規化して範囲チェック（エッジでのブレは次の区間に含めない）
                const s = ((startDeg % 360) + 360) % 360;
                const e = ((endDeg % 360) + 360) % 360;
                const inRange = e > s
                  ? (pointerAngle >= s && pointerAngle < e)
                  : (pointerAngle >= s || pointerAngle < e);
                if (inRange) { selectedIndex = i; break; }
                startDeg = endDeg;
            }
            setData.result = weighted[selectedIndex]?.label || '';
            setData.isSpinning = false;
            
            if (setData.result) {
                this.showResult(setElement, setData.result);
            }
            this.saveToStorage();
        }, 5000);

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
        this.updateDeleteButtonsState();
    }

    saveToStorage() {
        // DOMのテキストエリア内容を優先して保存（空行も含めて保持）
        const setsForSave = this.sets.map(set => {
            const copy = { ...set, isSpinning: false };
            const el = document.querySelector(`[data-set-id="${set.id}"]`);
            const ta = el ? el.querySelector('.items-textarea') : null;
            if (ta && typeof ta.value === 'string') {
                copy.text = ta.value;
            } else if (typeof copy.text !== 'string') {
                // textが未設定の古いデータの場合、itemsから生成（今後は保存時にtextが入る）
                copy.text = Array.isArray(copy.items) ? copy.items.join('\n') : '';
            }
            // itemsは保存しない（将来はtextのみをソースオブトゥルースに）
            delete copy.items;
            return copy;
        });
        const saveData = { sets: setsForSave, nextId: this.nextId };
        localStorage.setItem('rouletteData', JSON.stringify(saveData));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('rouletteData');
        if (!saved) return;
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

    setViewMode(isViewMode) {
        this.isViewMode = isViewMode;
        const app = document.querySelector('.roulette-app');
        const modeToggle = document.getElementById('modeToggle');
        
        if (this.isViewMode) {
            app.classList.add('view-mode');
            app.classList.remove('edit-mode');
            if (modeToggle) {
                modeToggle.innerHTML = `<i class="fas fa-edit"></i><span class="mode-text">編集</span>`;
            }
        } else {
            app.classList.remove('view-mode');
            app.classList.add('edit-mode');
            if (modeToggle) {
            modeToggle.innerHTML = `<i class="fas fa-eye"></i><span class="mode-text">閲覧</span>`;
            }
        }
        
        this.saveViewModeState();
        this.applyLayoutClasses();
        this.observeAll();
        this.updateDeleteButtonsState();
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
            if (setData) this.drawRoulette(canvas, setElement);
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
        const modeToggle = document.getElementById('modeToggle');
        if (!app || !modeToggle) return;

        if (this.isViewMode) {
            app.classList.add('view-mode');
            app.classList.remove('edit-mode');
            modeToggle.innerHTML = `<i class="fas fa-edit"></i><span class=\"mode-text\">編集</span>`;
        } else {
            app.classList.remove('view-mode');
            app.classList.add('edit-mode');
            modeToggle.innerHTML = `<i class="fas fa-eye"></i><span class=\"mode-text\">閲覧</span>`;
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
