---
layout: app
title: "Webルーレット"
app_name: "Webルーレット"
description: "入力した項目からランダムに即決定できる無料のオンラインルーレット。複数ルーレット管理、編集/ビュー切替、スマホ対応。イベントや当番決めに最適。"
include_tailwind: true
custom_css: |
    .roulette-canvas {
        transition: transform 5s cubic-bezier(0.6, 0, 0, 1);
    }

    body.roulette-present-mode .app-header {
        display: none;
    }

    .roulette-app {
        position: relative;
        width: 100%;
        margin: 0 auto;
        --roulette-card-min-width: 320px;
        --roulette-viewport-offset: 140px;
    }

    .roulette-grid {
        display: grid;
        gap: 1rem;
        width: 100%;
        grid-template-columns: repeat(auto-fit, minmax(var(--roulette-card-min-width), 1fr));
        align-content: flex-start;
        justify-items: stretch;
        justify-content: center;
    }

    .roulette-grid > .roulette-card {
        width: 100%;
    }

    .roulette-app.edit-mode .roulette-grid {
        grid-template-columns: repeat(auto-fit, minmax(var(--roulette-card-edit-width, var(--roulette-card-min-width)), var(--roulette-card-edit-width, var(--roulette-card-min-width))));
        justify-items: center;
    }

    .roulette-app.edit-mode .roulette-grid > .roulette-card {
        max-width: var(--roulette-card-edit-width, var(--roulette-card-min-width));
    }

    .roulette-grid.single-row,
    .roulette-grid.double-row {
        min-height: calc(100vh - var(--roulette-viewport-offset, 0px));
        height: calc(100vh - var(--roulette-viewport-offset, 0px));
    }

    .roulette-grid.single-row .roulette-card,
    .roulette-grid.double-row .roulette-card {
        height: 100%;
    }

    .roulette-grid.double-row {
        grid-auto-rows: minmax(0, 1fr);
    }

    .roulette-app.present-mode .roulette-grid {
        grid-template-columns: repeat(auto-fit, minmax(var(--roulette-card-min-width), 1fr));
        justify-content: center;
        justify-items: center;
    }

    .roulette-app.present-mode .roulette-grid.double-row {
        min-height: auto;
        height: auto;
        grid-auto-rows: auto;
        row-gap: 2.5rem;
    }

    .roulette-app.present-mode .roulette-grid.single-roulette {
        grid-template-columns: minmax(var(--roulette-card-min-width), min(100%, clamp(420px, 80vw, 960px)));
    }

    .roulette-app.present-mode .roulette-grid.single-roulette .roulette-card {
        width: 100%;
        max-width: min(100%, clamp(420px, 80vw, 960px));
    }

    .roulette-wrap {
        line-height: 0;
    }

    .roulette-pin {
        position: absolute;
        top: -2px;
        left: 50%;
        transform: translateX(-50%);
        font-size: clamp(1.1rem, calc(var(--roulette-scale, 1) * 1.2rem), 1.6rem);
        line-height: 1;
        color: #1f2937;
        text-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
        transition: font-size 0.2s ease;
    }

    .roulette-app.present-mode .roulette-pin {
        top: -6px;
        font-size: clamp(1.6rem, calc(var(--roulette-scale, 1) * 1.9rem), 2.8rem);
    }

    .roulette-card {
        --roulette-scale: 1;
    }

    .roulette-card .card-inner {
        display: flex;
        flex-direction: column;
        height: 100%;
        border-radius: 1rem;
        padding: 0;
        transition: background 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    }

    .roulette-card .card-body {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .roulette-card .card-body[data-roulette-layout] {
        gap: 1.75rem;
    }

    .roulette-visual {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .roulette-editor {
        display: flex;
        flex-direction: column;
    }

    .roulette-card .roulette-title {
        font-size: clamp(1rem, var(--roulette-font-size, 1.1rem), 1.5rem);
        transition: font-size 0.2s ease;
    }

    .roulette-card .roulette-title[readonly] {
        color: #4b5563;
    }

    .roulette-card .result-overlay {
        font-size: var(--roulette-font-size, 1.1rem);
    }

    .roulette-app.edit-mode .card-inner {
        background: #fff;
        border: 1px solid #e5e7eb;
        box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
    }

    .roulette-app.present-mode .card-inner {
        background: transparent;
        border: none;
        box-shadow: none;
    }

    .roulette-app.present-mode .present-hidden-title {
        display: none !important;
    }

    .btn-fab-spin {
        position: absolute;
        bottom: 10px;
        right: 10px;
        width: 44px;
        height: 44px;
        border-radius: 9999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        color: #fff;
        border: none;
        box-shadow: 0 6px 18px rgba(59, 130, 246, 0.35);
        transition: transform 0.15s ease, box-shadow 0.15s ease;
        z-index: 12;
    }

    .btn-fab-spin:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 22px rgba(59, 130, 246, 0.45);
    }

    .roulette-sticky-header {
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: saturate(1.2) blur(6px);
    }

    .roulette-controls-row {
        min-height: 56px;
    }

    .spin-wrapper {
        display: flex;
    }

    #addRoulette .add-text {
        display: inline;
    }

    @media (max-width: 768px) {
        .roulette-controls-row {
            display: flex;
            flex-wrap: wrap;
        }
        .controls-center {
            position: static !important;
            left: auto !important;
            transform: none !important;
            margin-right: auto;
        }
        .controls-right {
            position: relative;
            width: 100%;
            margin-left: 0 !important;
            justify-content: flex-end;
            align-items: center;
            gap: 0.5rem;
            flex-wrap: nowrap;
        }
        .spin-wrapper {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            display: inline-flex;
            justify-content: center;
        }
        #spinAll {
            white-space: nowrap;
        }
        #addRoulette {
            padding: 0.5rem;
            width: 44px;
            height: 40px;
            border-radius: 10px;
            justify-content: center;
            align-items: center;
        }
        #addRoulette .add-text {
            display: none;
        }
    }

    body.roulette-present-mode main.page__content {
        padding-top: 0;
        padding-bottom: 0;
    }

    .roulette-app.present-mode {
        --roulette-card-min-width: 380px;
        --roulette-viewport-offset: 16px;
    }

    .roulette-app.present-mode .controls-left,
    .roulette-app.present-mode #addRoulette {
        display: none !important;
    }

    .roulette-app.present-mode #rouletteSets {
        margin-bottom: 0;
    }

    .roulette-app.present-mode .roulette-editor,
    .roulette-app.present-mode .delete-btn {
        display: none !important;
    }

    #modeToggle.mode-toggle-btn {
        position: static;
        border: none;
        background: transparent;
        color: #6b7280;
        padding: 0.25rem;
        font-size: 1.25rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: color 0.2s ease;
    }

    #modeToggle.mode-toggle-btn:hover {
        color: #374151;
    }

    .roulette-app.present-mode #modeToggle.mode-toggle-btn {
        color: rgba(31, 41, 55, 0.35);
    }

    .roulette-app.present-mode #modeToggle.mode-toggle-btn:hover {
        color: rgba(31, 41, 55, 0.55);
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
        font-size: var(--roulette-font-size, 1.1rem);
        line-height: 1.4; /* 親のline-height:0の影響を受けないよう明示 */
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
    
    .roulette-editor {
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
    
---

<div class="roulette-app w-full px-3 md:px-6 lg:px-10" style="visibility:hidden;">
    <!-- Title row (non-sticky / SP only) -->
    <div class="py-2 md:hidden present-hidden-title">
        <h1 class="text-xl font-semibold text-gray-700 m-0 text-center md:text-left">Webルーレット</h1>
    </div>

    <!-- Sticky controls: spin centered, actions on right; title shows here on md+ -->
    <div class="roulette-sticky-header sticky top-0 z-40">
        <div class="roulette-controls-row flex flex-wrap items-center justify-between gap-4 py-2 px-1">
            <div class="controls-left hidden md:flex items-center">
                <h1 class="text-xl font-semibold text-gray-700 m-0">Webルーレット</h1>
            </div>
            <div class="controls-right ml-auto flex items-center gap-2">
                <div class="spin-wrapper">
                    <button id="spinAll" class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 text-base">
                        <i class="fas fa-sync-alt"></i>
                        <span class="spin-text">スピン！</span>
                    </button>
                </div>
                <button id="addRoulette" class="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-md font-semibold shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 text-sm" title="ルーレットを追加" aria-label="ルーレットを追加">
                    <i class="fas fa-plus"></i>
                    <span class="add-text">ルーレットを追加</span>
                </button>
                <button id="modeToggle" type="button" class="mode-toggle-btn mode-toggle" aria-label="プレゼン表示に切り替え">
                    <i class="fas fa-expand"></i>
                </button>
            </div>
        </div>
    </div>
    
    <!-- 初期クラスは最小限。JSでモード別にTailwindを付与 -->
    <div id="rouletteSets" class="roulette-grid gap-4 mb-6">
        <!-- ルーレットが動的に追加されます -->
    </div>
    
    <!-- Template: ルーレットカード（複製用） -->
    <template id="roulette-template">
        <div class="roulette-card h-full">
            <div class="card-inner h-full">
                <div class="flex justify-between items-center py-2 px-4">
                    <input type="text" class="flex-1 border-0 bg-transparent font-bold text-gray-700 roulette-title focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white rounded px-2 py-1" 
                           value="" maxlength="30" placeholder="ルーレット名">
                    <button class="delete-btn text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 transition-all" title="削除">×</button>
                </div>
                <div class="card-body p-4 flex flex-col gap-6" data-roulette-layout>
                    <div class="roulette-visual w-full">
                        <div class="flex justify-center">
                            <div class="roulette-wrap relative inline-block">
                                <div class="roulette-pin absolute z-10">▼</div>
                                <canvas class="roulette-canvas cursor-pointer rounded-full border-4 border-gray-300" width="260" height="260"></canvas>
                                <div class="result-overlay absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                                <button class="btn-fab-spin" type="button" title="スピン"><i class="fas fa-sync-alt"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="roulette-editor w-full">
                        <textarea class="w-full border border-gray-300 rounded-md px-3 py-2 items-textarea bg-gray-50 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white flex-1" 
                                placeholder="項目（1行につき1つ）" rows="8"></textarea>
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
        this.isPresentMode = false;
        this.currentGridRows = 1;
        this.viewportOffset = 0;
        this._resizeObservers = new Map();
        this._resizeTimer = null;
        this.init();
    }

    getRandomDefaultText() {
        const patterns = [
            // 通常（均等）
            '1\n2\n3\n4\n5\n6',
            // 改行重み付（空行で直前項目の重み+1）
            'グー👊\n\nチョキ✌️\nパー✋',
            // 数値重み付（末尾 *N）
            'たわし*19\nパジェロ'
        ];
        return patterns[Math.floor(Math.random() * patterns.length)];
    }

    init() {
        this.loadFromStorage();
        this.applyPresentModeFromQuery();
        this.setupEventListeners();

        // 可能な限り早くモードを適用（チラつき軽減）
        this.bootstrapPresentMode();

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
        const spinAll = document.getElementById('spinAll');
        if (spinAll) {
            spinAll.addEventListener('click', () => this.spinAll());
        }
        
        const modeToggle = document.getElementById('modeToggle');
        if (modeToggle) {
            modeToggle.addEventListener('click', () => this.togglePresentParam());
        }

        const addButton = document.getElementById('addRoulette');
        if (addButton) {
            addButton.addEventListener('click', () => {
                if (this.isPresentMode) {
                    this.updatePresentParamInUrl(false);
                    this.applyPresentModeFromQuery();
                    this.setPresentMode(this.isPresentMode);
                }
                this.addSet();
            });
        }

        this.handleResize = () => {
            clearTimeout(this._resizeTimer);
            this._resizeTimer = setTimeout(() => {
                this.applyLayoutClasses();
                this.resizeAllCanvases();
            }, 120);
        };
        window.addEventListener('resize', this.handleResize);
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
        this.updateTitleInputsState();
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
        this.updateTitleInputsState();
    }

    updateDeleteButtonsState() {
        const showByCount = this.sets.length > 1;
        const show = showByCount && !this.isPresentMode;
        document.querySelectorAll('.roulette-card .delete-btn').forEach(btn => {
            btn.style.display = show ? 'block' : 'none';
        });
    }

    updateTitleInputsState() {
        document.querySelectorAll('.roulette-title').forEach(input => {
            input.readOnly = false;
            input.tabIndex = 0;
        });
    }

    updatePresentParamInUrl(enable) {
        const params = new URLSearchParams(window.location.search);
        if (enable) {
            params.set('present', '1');
        } else {
            params.delete('present');
        }
        const query = params.toString();
        const newUrl = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
        window.history.replaceState({}, '', newUrl);
    }

    togglePresentParam() {
        this.updatePresentParamInUrl(!this.isPresentMode);
        this.applyPresentModeFromQuery();
        this.setPresentMode(this.isPresentMode);
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

    getCanvasSizeLimits() {
        const rows = Math.max(1, this.currentGridRows || 1);
        const viewportHeight = window.innerHeight || document.documentElement?.clientHeight || 900;
        const usableHeight = Math.max(320, viewportHeight - (this.viewportOffset || 0) - 24);
        const editorAllowance = (!this.isPresentMode && rows === 1) ? 320 : 0;
        const perRowHeight = Math.max(240, (usableHeight - editorAllowance) / rows);

        if (this.isPresentMode) {
            if (rows <= 1) return { min: 320, max: 820, cap: perRowHeight };
            if (rows === 2) return { min: 320, max: 820, cap: perRowHeight };
            return { min: 260, max: 720, cap: perRowHeight };
        }

        // 編集モードは1列時も2列時と同じ上限に揃える
        if (rows <= 2) {
            return { min: 280, max: 720, cap: perRowHeight };
        }

        return { min: 240, max: 640, cap: perRowHeight };
    }

    updateCanvasSize(canvas) {
        // 表示領域幅に応じて可変
        let col = null;
        if (canvas && typeof canvas.closest === 'function') {
            col = canvas.closest('.roulette-visual');
        }
        if (!col && canvas && canvas.parentElement && canvas.parentElement.parentElement) {
            col = canvas.parentElement.parentElement;
        }
        const available = col ? Math.floor(col.getBoundingClientRect().width) : (canvas.clientWidth || 260);
        const desired = Math.floor(available - 24);
        const limits = this.getCanvasSizeLimits();
        const heightAdjusted = limits.cap ? Math.min(limits.cap, desired) : desired;
        let size = Math.max(limits.min, Math.min(limits.max, heightAdjusted));
        const totalSets = Array.isArray(this.sets) ? this.sets.length : 0;
        const shrinkPreview = this.isPresentMode && (totalSets === 1 || totalSets === 2);
        if (shrinkPreview && size > limits.min) {
            const previewScale = 0.9;
            size = Math.max(limits.min, Math.round(size * previewScale));
        }
        const card = canvas?.closest ? canvas.closest('.roulette-card') : null;
        if (card) {
            const scale = Math.min(1.6, Math.max(0.75, size / 420));
            card.style.setProperty('--roulette-scale', scale.toFixed(3));
        }
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
        const spinBtn = setElement.querySelector('.btn-fab-spin');
        if (spinBtn) {
            spinBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); spinHandler(); });
        }

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
        if (setElement && typeof setElement.style?.setProperty === 'function') {
            setElement.style.setProperty('--roulette-font-size', `${dynamicFont}px`);
        }

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
        const dynamicFont = Math.max(16, Math.min(44, Math.round(canvas.width * 0.065)));
        const lineHeight = Math.round(dynamicFont * 1.25);
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
            // 結果計算（重み付き）: 最終的な角度で当たりを決定（累積回転を考慮）
            const finalRotation = setData._angleDeg || 0; // 累積回転角
            const normalizedRotation = ((finalRotation % 360) + 360) % 360; // 0..359
            const weighted = weightedBefore; // スタート時の定義で固定
            const totalWeight = weighted.reduce((s, it) => s + it.weight, 0) || 1;
            // ポインタは常に上(-90deg)。ホイールがRだけ回転したときの元の座標系でのポインタ角は -90 - R
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

    setPresentMode(isPresentMode) {
        this.isPresentMode = isPresentMode;
        this.applyModeClasses();
        this.applyLayoutClasses();
        this.observeAll();
        this.updateDeleteButtonsState();
        this.updateTitleInputsState();
    }

    applyModeClasses() {
        const app = document.querySelector('.roulette-app');
        const body = document.body;
        const modeToggle = document.getElementById('modeToggle');

        if (app) {
            app.classList.toggle('present-mode', this.isPresentMode);
            app.classList.toggle('edit-mode', !this.isPresentMode);
        }
        if (body) {
            body.classList.toggle('roulette-present-mode', this.isPresentMode);
        }
        if (modeToggle) {
            modeToggle.innerHTML = this.isPresentMode ? `<i class="fas fa-times"></i>` : `<i class="fas fa-expand"></i>`;
            modeToggle.setAttribute('aria-label', this.isPresentMode ? '編集モードに戻る' : 'プレゼン表示に切り替え');
        }
    }

    observeSet(setElement) {
        const id = parseInt(setElement.dataset.setId, 10);
        this.unobserveSet(id);
        const visual = setElement.querySelector('.roulette-visual');
        const canvas = setElement.querySelector('.roulette-canvas');
        if (!visual || !canvas) return;
        const ro = new ResizeObserver(() => {
            this.updateCanvasSize(canvas);
            const setData = this.sets.find(s => s.id === id);
            if (setData) this.drawRoulette(canvas, setElement);
        });
        ro.observe(visual);
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

        const baseClasses = ['roulette-grid', 'gap-4', 'w-full', 'mx-auto'];
        container.className = baseClasses.join(' ');
        container.classList.remove('single-row', 'double-row', 'single-roulette');

        // ルーレットグリッドが画面上部からどれだけ下にあるかを元に高さを算出
        const gridTop = Math.max(0, Math.round(container.getBoundingClientRect().top));
        const extraPadding = this.isPresentMode ? 8 : 16;
        const viewportOffset = gridTop + extraPadding;
        container.style.setProperty('--roulette-viewport-offset', `${viewportOffset}px`);

        const minWidth = this.isPresentMode ? 380 : 320;
        container.style.setProperty('--roulette-card-min-width', `${minWidth}px`);
        if (!this.isPresentMode) {
            container.style.setProperty('--roulette-card-edit-width', `${minWidth}px`);
        } else {
            container.style.removeProperty('--roulette-card-edit-width');
        }

        const totalSets = this.sets.length;
        const gap = 16;
        const width = container.clientWidth || window.innerWidth;
        const columns = Math.max(1, Math.floor((width + gap) / (minWidth + gap)));
        const rows = Math.max(1, Math.ceil((totalSets || 1) / columns));

        container.dataset.columns = columns;
        container.dataset.rows = rows;

        if (rows === 1) {
            container.classList.add('single-row');
        } else if (this.isPresentMode && rows === 2) {
            container.classList.add('double-row');
        }

        if (this.isPresentMode && totalSets === 1) {
            container.classList.add('single-roulette');
        }

        container.style.marginBottom = rows <= 2 ? '1rem' : '1.5rem';

        this.currentGridRows = rows;
        this.viewportOffset = viewportOffset;

        requestAnimationFrame(() => this.resizeAllCanvases());
    }

    applyPresentModeFromQuery() {
        try {
            const params = new URLSearchParams(window.location.search);
            this.isPresentMode = params.get('present') === '1';
        } catch (_) {
            this.isPresentMode = false;
        }
    }

    // DOM挿入前にモードのクラスだけ適用（レイアウト確定を早める）
    bootstrapPresentMode() {
        this.applyModeClasses();
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    const manager = new RouletteManager();
    // 全リソースロード後にも再計算して初期サイズのぶれを抑制
    window.addEventListener('load', () => manager.resizeAllCanvases());
});
</script>
