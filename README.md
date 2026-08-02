# BEYBLADE X 比賽計分板

專為三對三賽制做的計分板。**單一 HTML 檔、零相依套件、離線可跑**，音效與零件資料全部內嵌，用瀏覽器打開就能用。

配色取自 BEYBLADE X 主視覺海報的兩顆主角陀螺 —— A 方是深紅核心配橙焰，B 方是深藍核心配青龍，兩邊共通的白鉻裝甲質感做在分數的漸層上。

---

## 功能

### 計分

依 TAKARA TOMY 官方規則計分，四顆 Finish 按鈕：

| Finish | 分數 |
| --- | --- |
| Spin Finish 回轉勝 | +1 |
| Burst Finish 爆裂勝 | +2 |
| Over Finish 場外勝 | +2 |
| Xtreme Finish 極限勝 | +3 |

另有 ±1 微調。預設先到 **4 分**獲勝，可切換 3 / 5 / 7 / 無上限。

### 倒數

按 START 跑全螢幕的 3、2、1、GO SHOOT 動畫，搭配內建的人聲錄音。在「🎙 倒數錄音」面板裡可以試聽、微調畫面與聲音的對位（開始延遲、每個數字的間隔），或換成自己的音檔 —— 換過的檔案存在瀏覽器的 IndexedDB，下次打開自動帶回來，也能一鍵還原內建版本。

### 陀螺配置

每邊最多登錄 3 顆。戰刃 / 固鎖 / 軸心 / 輔助戰刃都可以打關鍵字搜尋，選單上標示天梯等級（X～E）與屬性。登錄兩顆以上時，主畫面分數下方的清單可以點選「本回合上場」的那顆。

### 回合戰報

選好雙方上場的陀螺後按下獲勝方的 Finish，就記下一筆完整對戰 —— 誰的第幾號機、什麼配置、用什麼方式贏了對面的哪顆。可撤銷上一回合（分數會一起退回）。按 RESET 開新的一場，戰報重新算，資料保留給統計。

### 累積統計

依歷史回合自動計算：

- **配置勝率** — 出場、勝、敗、勝率
- **Finish 分布** — 四種結束方式的次數與佔比
- **軸心被擊敗次數** — 依「被場外」排序，看得出哪顆軸心在你的場地上抓地力不足

### 分享戰績

勝利畫面按「分享戰績」，產生一張 A4 直式戰績卡 PDF：勝方、比分、逐回合對戰、雙方登錄陣容、時間戳。手機會叫出系統分享選單，電腦直接下載。

PDF 是由 Canvas 繪製後自行組裝的（Canvas 負責文字所以中文完全正常，再把輸出的 JPEG 包進一份最小的單頁 PDF），**沒有引入任何 PDF 套件**。

### 音效

右上角「🔊 音效 ▾」展開三個獨立開關：

| 開關 | 影響範圍 |
| --- | --- |
| 倒數音效 | 3-2-1 GO SHOOT |
| 計分音效 | 加分時的音效（Finish 四顆 + ＋1） |
| 獲勝音效 | WINNER 畫面 |

點任一列會立刻切換並試放一次。三個全關時按鈕圖示變 🔇。

### 隊名

主畫面上方那個框整個是一顆按鈕，點下去變成輸入框，打完按 Enter 或點旁邊就存起來。隊名會用在勝利畫面、戰報和 PDF 上。

### 快捷鍵

| 鍵 | 動作 |
| --- | --- |
| `空白鍵` | 開始倒數 |
| `A` / `L` | A 方 / B 方各加 1 分 |
| `Z` | 撤銷上一回合 |
| `R` | 重置本場 |
| `Esc` | 關閉面板 |

---

## 資料儲存

全部存在使用者自己的瀏覽器，**沒有後端，不上傳任何資料**。

| 內容 | 位置 |
| --- | --- |
| 回合紀錄與統計 | `localStorage` → `beyx_rounds`（保留最近 800 回合） |
| 音效開關 | `localStorage` → `beyx_sfx` |
| 倒數對位設定 | `localStorage` → `beyx_cue` |
| 隊名 | `localStorage` → `beyx_nameA`、`beyx_nameB` |
| 自訂倒數錄音 | `IndexedDB` → `beyx_scorer` |

---

## 瀏覽器需求

現代瀏覽器（Safari 16+ / Chrome 99+ / Edge / Firefox）。用到 Web Audio、IndexedDB、Canvas `roundRect`（有備援）與 CSS `background-clip: text`。手機和平板都可以用，iOS 支援「加入主畫面」以全螢幕開啟。

---

## 資料來源

- 零件與天梯資料整理自 [Beyblade X Tier｜台灣天梯情報站](https://stan-yao.github.io/beyblade_x_tier/)（@stan_yao）
- 計分規則依 [TAKARA TOMY《BEYBLADE X REGULATION》第 6 版](https://www.takaratomyasia.com/img/beybladex/1732149844_BEYBLADE%20X%20-%20REGULATION%206th%20Edition.pdf)
- 配色參考 BEYBLADE X 動畫主視覺海報 ©Homura Kawamoto, Hikaru Muno, Posuka Demizu, BBXProject, TV TOKYO

BEYBLADE X 為株式会社タカラトミー的商標。本專案為非商業性質的同好工具，與 TAKARA TOMY 無隸屬關係。
