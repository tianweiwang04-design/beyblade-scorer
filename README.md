# Beyblade X 比賽計分板

三對三賽制專用的計分板，單一 HTML 檔、無相依套件、離線可跑。

## 功能

- **雙方計分** — 依 TAKARA TOMY 官方規則：Spin Finish +1、Burst Finish +2、Over Finish +2、Xtreme Finish +3，另有 ±1 微調
- **勝負判定** — 預設先到 4 分獲勝，可切換 3 / 5 / 7 / 無上限
- **倒數** — 3、2、1、GO SHOOT 全螢幕動畫，內建人聲錄音，可換成自己的音檔（存於瀏覽器 IndexedDB）
- **陀螺配置** — 每邊最多登錄 3 顆，可搜尋戰刃 / 固鎖 / 軸心 / 輔助戰刃，標示天梯等級與屬性
- **快捷鍵** — `空白鍵` 倒數、`A` / `L` 各加 1 分、`R` 重置

## 零件資料

| 類別 | 數量 |
| --- | --- |
| 戰刃 Blade | 150 |
| 固鎖 Ratchet | 36 |
| 軸心 Bit | 52 |
| 輔助戰刃 Assist | 18 |

戰刃已合併同款的塗裝／版本變體。

## 部署

純靜態網站，`index.html` 放在根目錄即可，不需要建置步驟。

Vercel 匯入此 repo 時：

- Framework Preset — `Other`
- Build Command — 留空
- Output Directory — 留空（或 `.`）

## 資料來源

- 零件與天梯資料整理自 [Beyblade X Tier 台灣天梯情報站](https://stan-yao.github.io/beyblade_x_tier/)
- 計分規則依 [TAKARA TOMY《BEYBLADE X REGULATION》](https://www.takaratomyasia.com/img/beybladex/1732149844_BEYBLADE%20X%20-%20REGULATION%206th%20Edition.pdf)
