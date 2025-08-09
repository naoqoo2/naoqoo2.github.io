---
title: "PDFテスト：2025年下期テーマプレゼンテーション"
categories:
  - blog
tags:
  - テスト
  - PDF
  - プレゼンテーション
---

# 2025年下期テーマプレゼンテーション

下期のテーマ「視野を広く、バランスよく」についてのプレゼンテーション資料をPDF形式で埋め込み表示しています。

## プレゼンテーション資料

<div class="pdf-container">
  <object data="/assets/files/2025-08-08-2025-h2-theme.pdf" 
          type="application/pdf" 
          width="100%" 
          height="600px"
          class="pdf-embed">
    <div class="pdf-fallback">
      <p>PDFを表示できません。お使いのブラウザではPDFの埋め込み表示がサポートされていない可能性があります。</p>
      <p>
        <a href="/assets/files/2025-08-08-2025-h2-theme.pdf" 
           class="pdf-download-btn"
           download="2025年下期テーマプレゼンテーション.pdf">
          📄 PDFをダウンロード
        </a>
      </p>
    </div>
  </object>
</div>

## 内容について

このプレゼンテーションでは、以下の内容を扱っています：

- **視野を広く**: チーム全体、プロジェクトの流れを意識する重要性
- **バランスよく**: 並行作業を効率的に進める方法
- **スピード**: 確実にDONEにすることの大切さ
- **主体性**: 積極的に取り組む姿勢

<style>
.pdf-container {
  margin: 20px 0;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  overflow: hidden;
}

.pdf-embed {
  display: block;
  border: none;
}

.pdf-fallback {
  padding: 40px 20px;
  text-align: center;
  background-color: #f8f9fa;
}

.pdf-download-btn {
  display: inline-block;
  background: #0969da;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  margin-top: 15px;
  transition: background-color 0.2s;
}

.pdf-download-btn:hover {
  background: #0860ca;
  color: white;
  text-decoration: none;
}

/* モバイル対応 */
@media (max-width: 768px) {
  .pdf-container {
    margin: 15px -15px;
  }
  
  .pdf-embed {
    height: 400px;
  }
  
  .pdf-fallback {
    padding: 30px 15px;
  }
  
  .pdf-download-btn {
    display: block;
    margin: 15px auto 0;
    width: fit-content;
  }
}

/* 小さな画面ではPDFを非表示にしてダウンロードボタンのみ表示 */
@media (max-width: 480px) {
  .pdf-embed {
    display: none;
  }
  
  .pdf-fallback {
    display: block !important;
  }
}
</style>

<script>
// PDFが読み込めない場合のフォールバック処理
document.addEventListener('DOMContentLoaded', function() {
  const pdfObject = document.querySelector('.pdf-embed');
  const fallbackDiv = document.querySelector('.pdf-fallback');
  
  if (pdfObject) {
    pdfObject.addEventListener('load', function() {
      // PDF読み込み成功時の処理（必要に応じて）
    });
    
    pdfObject.addEventListener('error', function() {
      // PDF読み込みエラー時にフォールバックを表示
      if (fallbackDiv) {
        fallbackDiv.style.display = 'block';
      }
    });
  }
});
</script>