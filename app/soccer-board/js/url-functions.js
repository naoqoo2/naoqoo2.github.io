// URLを更新する
function updateURL() {
  const url = new URL(window.location);
  const hasData = url.searchParams.has('d');
  const dataParam = hasData ? url.searchParams.get('d') : null;
  
  // 既存のdパラメータを保持しながら、langパラメータを更新
  if (hasData) {
    url.searchParams.set('lang', currentLang);
    url.searchParams.set('d', dataParam);
  } else {
    url.searchParams.set('lang', currentLang);
  }
  
  window.history.replaceState({}, '', url);
}

function saveState(){
  // カスタムの短い形式を作成: x色y-背番号-名前, 形式
  let customStr = '';
  
  state.players.forEach((p, index) => {
    // 縦表示中の場合は、保存前に座標を横表示に変換（一時的な変換）
    let xPos = p.x;
    let yPos = p.y;
    
    if (isVertical) {
      // 縦向きの座標を横向きに変換（表示には影響しない一時的な変換）
      xPos = 100 - p.y;
      yPos = p.x;
    }
    
    // 座標（10倍して整数化）
    const x = Math.round(xPos * 10);
    const y = Math.round(yPos * 10);
    
    // 色のコード（先頭1文字、ただしボールは'l'を使用）
    let colorCode = p.color.charAt(0);
    if (p.color === 'ball') {
      colorCode = 'l'; // 'bal[l]'の末尾の文字を使用（'b'は青と重複するため）
    }
    
    // 基本情報
    customStr += `${x}${colorCode}${y}`;
    
    // 背番号と名前がある場合は追加
    if (p.num !== undefined && p.num !== '') {
      customStr += `-${p.num}`;
      
      // 名前もある場合
      if (p.name) {
        customStr += `-${p.name}`;
      }
    } else if (p.name) {
      // 背番号なしで名前のみの場合
      customStr += `--${p.name}`;
    }
    
    // 最後の選手でなければカンマを追加
    if (index < state.players.length - 1) {
      customStr += ',';
    }
  });
  
  // バージョン番号を追加（将来の互換性のため）
  customStr = 'v2:' + customStr;
  
  // LZStringで圧縮
  const compressed = LZString.compressToEncodedURIComponent(customStr);
  
  // URLに設定（言語パラメータを保持）
  const url = new URL(window.location);
  const langParam = url.searchParams.get('lang') || currentLang;
  history.replaceState(null, '', `?d=${compressed}&lang=${langParam}`);
}
