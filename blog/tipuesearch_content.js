var tipuesearch = {"pages":[{"title":"About","text":"2017Fall 機械設計工程系 CADP & CP 課程倉儲: https://mde1a1.kmol.info/2017fall 課程投影片: https://mde1a1.kmol.info/2017fall/doc/trunk/index.html 課程網誌: https://mde1a1.kmol.info/2017fall/doc/trunk/blog/","tags":"misc","url":"./pages/about/"},{"title":"2017 Fall CP 第十六週","text":"計算機程式 按鍵分類 0 ~9 數字按建, 點按後由 digitClicked() 方法槽承接處理 直接運算元, 包括 Sqrt, x&#94;2 與 1/x, 點按後由 unaryOperatorClicked() 方法槽承接處理 加或減運算元, 包括 + 與 - 運算, 點按後由 additiveOperatorClicked() 方法槽承接處理 乘或除運算元, 包括 * 與 / 運算, 點按後由 multiplicativeOperatorClicked() 方法槽承接處理 其餘按鍵則各自以特定的方法槽承接處理 變數與運算流程考量 數字按鍵以 zero, one, two, three, four, five, six, seven, eight, nine 命名 顯示幕以 display 命名 等號以 equalButton 命名 與 MS, M+, 或 MC 按鍵相關的計算機記憶體數值, 存入 sumInMemory 變數對應的記憶空間 以 sumSoFar 儲存累計數值, 使用者按下等號後, sumSoFar 重新計算結果, 並顯示在 display 幕, Clear All 按鍵則重置 sumSoFar 為 0 以 factorSoFar 儲存乘或除運算子運算過程所得的暫存數值 以 pendingAdditiveOperator 儲存使用者最後點按的加或減運算子字串 以 pendingMultiplicativeOperator 儲存使用者最後點按的乘或除運算子字串 以 waitingForOperand 界定使用者是否處理運算數輸入階段, 若 waitingForOperand 為 True, 表示計算機正在等待使用者\"開始\"輸入運算數 waitingForOperand 起始值為 True, 只有重新進入 digitClicked 方法, display 才會 clear(), 否則在顯示幕非為 0 的情況下, 將堆疊數字字串 因為考量先乘除後加減運算順序, 將加減與乘除處理方法分開, 若使用者輸入加減運算子後, 緊接乘除運算子, 計算機會先乘除運算後再加減 直接運算元可以在使用者按下按鍵後, 直接對 display 中的數值進行處理, 無需其他暫存需求 pendingAdditiveOperator, pendingMultiplicativeOperator, sumSoFar, factorSoFar 與 waitingForOperand, 在 Dialog 類別建構子中設定起始值 數字按鍵點按處理 使用者點按數字按鍵, 將會送出該按鍵的 clicked() 訊號 按鍵的 clicked() 訊號將會根據設定, 觸發 digitClicked() 方法槽 由於 PyQt5 的 Push Button 以 Qt5 中的 QObject::sender() 送出訊號, 此函式會傳回 sender 作為 QObject 的指標 因為此一與 Push Button 配合的 sender 為 Button 物件, 因此可以在 digitClicked() 函式中, 利用 sender().text() 取得按鍵的 text 字串 假如使用者點按 0, display 顯示字串 0, 但是若一開始輸入兩個以上的 0, digitClicked() 應該仍只顯示 0 字串 但是若計算機處於等待新運算數輸入時 (以 waitingForOperand 判定), 新數字在顯示前, display 應該要清除先前所顯示的數字 最後, 除了在顯示幕為 0 之後的 0 按鍵輸入, digitClicked() 方法槽不會繼續判定是否清除顯示幕或堆疊數字字串外, 所按的數字將會堆疊顯示 直接運算按鍵處理 Sqrt, x&#94;2 與 1/x 等按鍵的處理方法為 unaryOperatorClicked(), 與數字按鍵的點按回應相同, 透過 sender().text() 取得按鍵上的 text 字串 unaryOperatorClicked() 方法隨後根據 text 判定運算子後, 利用 display 上的運算數進行運算後, 再將結果顯示在 display 顯示幕 若進行運算 Sqrt 求數值的平方根時, 顯示幕中為負值, 或 1/x 運算時, x 為 0, 都視為無法處理的情況, 以呼叫 abortOperation() 處理 abortOperation() 方法則重置所有起始變數, 並在 display 中顯示 \"####\" 直接運算子處理結束前, 運算結果會顯示在 display 中, 而且運算至此告一段落, 計算機狀態應該要回復到等待新運算數的階段, 因此 waitingForOperand 要重置為 True 加或減按鍵處理 使用者按下加或減運算子按鍵時, 程式設定以 additiveOperatorClicked() 處理 進入 additiveOperatorClicked() 後, 必須先查是否有尚未運算的乘或除運算子, 因為必須先乘除後才能加減 先處理乘與除運算後, 再處理加或減運算後, 將 sumSoFar 顯示在 display 後, 必須重置 sumSoFar 為 0, 表示運算告一段落 乘或除按鍵處理 使用者按下乘或除運算子按鍵時, 程式設定以 multiplicativeOperatorClicked() 處理 進入 multiplicativeOperatorClicked() 後, 無需檢查是否有尚未運算的加或減運算子, 因為乘除運算有優先權 先處理乘與除運算後, 再處理加或減運算, 將 sumSoFar 顯示在 display 後, 必須重置 sumSoFar 為 0, 表示運算告一段落 小數點按鍵處理 使用者按下小數點按鍵後, 以 pointClicked() 方法處理, 直接在 display 字串中加上 \".\" 字串 數值變號按鍵處理 使用者按下變號按鍵後, 由 changeSignClicked() 處理, 若顯示幕上為正值, 則在 display 字串最前面, 疊上 \"-\" 字串 假如顯示幕上為負值, 則設法移除 display 上字串最前方的 \"-\" 字元 退格按鍵處理 使用者按下退格按鍵後, 由 backspaceClicked() 處理, 這時可以利用 Python 字串數列中的 [:-1], 保留除了最後一個字元的字串 離開 backspaceClicked() 前 ,將顯示幕中原有字串的 [:-1] 字串, 顯示在 display 上 若退格後 display 上為空字串, 則顯示 0, 並且將 waitingForOperand 起始設為 True, 表示等待新運算數中 清除按鍵處理 使用者按下 Clear 按鍵後, 以 clear() 方法處理, 進入函式後, 將現有的運算數重置為 0 離開 clear() 前, 將 waitingForOperand 起始設為 True, 表示等待新運算數中 ClearAll 按鍵, 則將所有變數全部重置為起始狀態 記憶體按鍵處理 clearMemory() 方法與 \"MC\" 按鍵對應, 清除記憶體中所存 sumInMemory 設為 0 readMemory() 方法與 \"MR\" 按鍵對應, 功能為讀取記憶體中的數值, 因此將 sumInMemory 顯示在 display, 作為運算數 setMemory() 方法則與 \"MS\" 按鍵對應, 功能為設定記憶體中的數值，因此取 display 中的數字, 存入 sumInMemory addToMemory() 方法與 \"M+\" 按鍵對應, 功能為加上記憶體中的數值, 因此將 sumInMemory 加上 display 中的數值 因為 setMemory() 與 addToMemory() 方法, 都需要取用 display 上的數值, 因此必須先呼叫 equalClicked(), 以更新 sumSoFar 與 display 上的數值 calculate() 方法 calculate() 方法中的運算, 以 rightOperand 為右運算數 當執行加或減運算時, 左運算數為 sumSoFar 當執行乘或除運算時, 左運算數為 factorSoFar 若運算過程出現除與 0 時, 將會回傳 False","tags":"Course","url":"./40623226_2017-fall-cp-w16.html"},{"title":"2017 Fall CP 第十五週","text":"W15 git指令: git branch git status git add . git config --global user.name \"學號\"(先綁定才能add.) git config --global user.email \"email\"(先綁定才能add.) git commit -m \"____\" git push git config --global http.proxy http://140.130.17.42:3128 cmd指令: nslookup伺服器IP查詢 proxy.kmol.info server 伺服器IP ping IP ping -t IP ctrl+C 退出 git config --global http.proxy http://proxy.kmol.info:3128 影片一: 期末專案執行相關期程規劃與內容提要 影片二: 利用 Pandoc 與 MikTeX 協同編寫期末報告","tags":"Course","url":"./40623226_2017-fall-cp-w15.html"},{"title":"2017 Fall CP 第十四週","text":"W14 1.請各組選一名代表, 負責建立 Github 期末協同專案倉儲 以第一組為例, 專案倉儲名稱為 ag1_pyqt5_calculator 在此倉儲新增 gh-pages 分支, 然後設為 default branch 將所有組員設為協同者 (collaborators) 確定各組員都已回覆, 同意為協同者 各組員必須確定 y:/home/.gitconfig 下為各自的 github 身分 git config --global user.name \"學號\" git config --global user.email \"學號@gm.nfu.edu.tw\" git config --global http.proxy http://proxy.kmol.info:3128 git add . 表示要新增所有改版的內容 git commit -m \"改版訊息\" 表示要在所有的改版內容資料, 綁定身分與訊息 git push 將近端所提交的改版資料推送到遠端 git pull 若遠端已經有近端沒有的版本資料, 近端用戶 必須拉下遠端的版本資料, 嘗試進行自動合併 但是若無法自動合併, 則必須要進行手動合併 在 fossil 使用 fossil update 拉下遠端資料","tags":"Course","url":"./40623226_2017-fall-cp-w14.html"},{"title":"2017 Fall CP 第十三週","text":"W13 https://github.com/40623224/w13 C-K Design Theory Using C-K Theory http://www.openinnovate.co.uk/papers/CK_KnowledgeMgt_OpenInnovation.pdf 連接 (Conjunction) (C->K): 概念經過實際驗證, 成為知識空間的延伸, 此概念即脫離概念空間. 未被實際驗證的概念, 則留在概念空間之中. 分離 (Disjunction): (K->C): 由知識產生新構想, 反映出從知識到概念的轉換過程. C -> C: 概念可以從原始概念長出新概念, 也能產生多種新概念, 與其他概念同時存在概念空間. 為達有效創新, 必須利全力導引概念成長與衍生流程. K -> K: 以新的組合或發現, 持續擴展知識. PyQt5 Tutorial https://github.com/Programmica/pyqt5-tutorial Finite State Machine and the Cheap Calculator: https://www.clear.rice.edu/comp212/08-spring/labs/12/ UML in python https://github.com/PyCQA/pylint/ Python and UML https://bitbucket.org/tzulberti/pywebuml","tags":"Course","url":"./40623226_2017-fall-cp-w13.html"},{"title":"2017 Fall CP 第十二週","text":"W12 影片一: 設定 git clone 的連線條件, 以及視窗程式在機電系統控制上的應用 影片二: 在 Qt Design 所產生的對話框程式中加入數字顯示邏輯","tags":"Course","url":"./40623226_2017-fall-cp-w12.html"},{"title":"2017 Fall CP 第十一週","text":"W11 https://github.com/40623224/w11 註冊github的帳戶.新增w11表單 將fossil的東西轉移到gitgub協同","tags":"Course","url":"./40623226_2017-fall-cp-w11.html"},{"title":"2017 Fall CP 第十週","text":"W10 使用eric6產生計算機表單 下載dia portable 下載gimp portable 客製化可攜環境 使用者可以配合需求修改 start.bat, stop.bat 以及 launchLeo.py, 讓系統啟動時, 自行建立進入特定目錄的命令列視窗, 並且自動開啟特定 Leo Editor 專案. 例如: start.bat 改為: @echo off REM 設定 y 硬碟代號與 data 目錄對應 set Disk=y subst %Disk%: \"data\" REM 設定 leo 相關對應 Home 位置 set HomePath=%Disk%:\\home set HomeDrive=%Disk%:\\home set Home=%Disk%:\\home REM 將系統 Python 程式的 io 設為 utf-8 set PYTHONIOENCODING=\"utf-8\" REM 將後續的指令執行, 以 %Disk% 為主 %Disk%: REM 設定 PYTHONPATH set PYTHONPATH=%Disk%:\\python36 REM 設定 Leo 所用的編輯器 set LEO_EDITOR=%Disk%:\\wscite\\SciTE.exe REM for fossil https 連線設定 REM 若在近端使用 fossil ui 則要蓋掉 REM set HTTPS=on REM 指令搜尋路徑設定 set path1=%Disk%:;%Disk%:\\python36;%Disk%:\\git\\bin;%Disk%:\\python36\\Scripts;%Disk%:\\Git\\bin; path=%path1%; start /MIN %Disk%:\\wscite\\SciTE.exe start /MIN %Disk%:\\wscite\\SciTE.exe start /MIN cmd.exe start /MIN cmd.exe REM 啟動 cmd 之前先更換目錄到倉儲目錄 cd %Disk%:\\tmp\\fossil\\wd\\2017fall start /MIN cmd.exe REM 啟動 Leo 編輯器 %Disk%:\\Python36\\python.exe %Disk%:\\launchLeo.py REM 啟動 stunnel REM start /MIN fossil.exe server -P 127.0.0.1:8080 %Disk%:\\tmp\\fossil_repo REM start /MIN stunnel.exe launchLeo.py 改為: !/usr/bin/env python \"\"\" Leo launcher script A minimal script to launch leo. \"\"\" import leo.core.runLeo leo.core.runLeo.run(fileName=\"y:/tmp/fossil/wd/2017fall/users/yen.leo\")","tags":"Course","url":"./40623226_2017-fall-cp-w10.html"},{"title":"2017 Fall CP W8 Exam","text":"W8 Exam 操作影片 學習心得 今天學習了關於python3程式碼的敘述，利用eric6完成calculator的編譯 自評成績 每週出席情況: 100% 紙本筆記: 90% 隨身碟內容: 85% 個人倉儲內容: 90% 各週上課摘要: 90% 自評分數 87","tags":"Course","url":"./40623226_2017-fall-cp-w8-exam.html"},{"title":"2017 Fall CP W7 Exam","text":"W7 Exam 操作影片 學習心得 上計算機雖然一堆程式碼令我困惱，但如果懂了的話並加以利用，就會變得方便，而且有些東西利用網誌管理會省時很多。 自評成績 每週出席情況: 100% 紙本筆記: 90% 隨身碟內容: 85% 個人倉儲內容: 90% 各週上課摘要: 90% 自評分數 87","tags":"Course","url":"./40623226_2017-fall-cp-w7-exam.html"},{"title":"2017 Fall CP 第五週","text":"W5 PyQt5 #!/usr/bin/env python import math from PyQt5.QtCore import Qt from PyQt5.QtWidgets import (QApplication, QGridLayout, QLayout, QLineEdit, QSizePolicy, QToolButton, QWidget) class Button(QToolButton): ''' def __init__(self, text, parent=None): super(Button, self).__init__(parent) ''' # for Python 3 def __init__(self, text): super().__init__() self.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Preferred) self.setText(text) def sizeHint(self): size = super(Button, self).sizeHint() size.setHeight(size.height() + 20) size.setWidth(max(size.width(), size.height())) return size class Calculator(QWidget): NumDigitButtons = 10 ''' def __init__(self, parent=None): super(Calculator, self).__init__(parent) ''' def __init__(self): super().__init__() self.pendingAdditiveOperator = '' self.pendingMultiplicativeOperator = '' self.sumInMemory = 0.0 self.sumSoFar = 0.0 self.factorSoFar = 0.0 self.waitingForOperand = True self.display = QLineEdit('0') self.display.setReadOnly(True) self.display.setAlignment(Qt.AlignRight) self.display.setMaxLength(15) font = self.display.font() font.setPointSize(font.pointSize() + 8) self.display.setFont(font) self.digitButtons = [] for i in range(Calculator.NumDigitButtons): self.digitButtons.append(self.createButton(str(i), self.digitClicked)) self.pointButton = self.createButton(\".\", self.pointClicked) self.changeSignButton = self.createButton(u\"\\N{PLUS-MINUS SIGN}\", self.changeSignClicked) self.backspaceButton = self.createButton(\"Backspace\", self.backspaceClicked) self.clearButton = self.createButton(\"Clear\", self.clear) self.clearAllButton = self.createButton(\"Clear All\", self.clearAll) self.clearMemoryButton = self.createButton(\"MC\", self.clearMemory) self.readMemoryButton = self.createButton(\"MR\", self.readMemory) self.setMemoryButton = self.createButton(\"MS\", self.setMemory) self.addToMemoryButton = self.createButton(\"M+\", self.addToMemory) self.divisionButton = self.createButton(u\"\\N{DIVISION SIGN}\", self.multiplicativeOperatorClicked) self.timesButton = self.createButton(u\"\\N{MULTIPLICATION SIGN}\", self.multiplicativeOperatorClicked) self.minusButton = self.createButton(\"-\", self.additiveOperatorClicked) self.plusButton = self.createButton(\"+\", self.additiveOperatorClicked) self.squareRootButton = self.createButton(\"Sqrt\", self.unaryOperatorClicked) self.powerButton = self.createButton(u\"x\\N{SUPERSCRIPT TWO}\", self.unaryOperatorClicked) self.reciprocalButton = self.createButton(\"1/x\", self.unaryOperatorClicked) self.equalButton = self.createButton(\"=\", self.equalClicked) mainLayout = QGridLayout() mainLayout.setSizeConstraint(QLayout.SetFixedSize) mainLayout.addWidget(self.display, 0, 0, 1, 6) mainLayout.addWidget(self.backspaceButton, 1, 0, 1, 2) mainLayout.addWidget(self.clearButton, 1, 2, 1, 2) mainLayout.addWidget(self.clearAllButton, 1, 4, 1, 2) mainLayout.addWidget(self.clearMemoryButton, 2, 0) mainLayout.addWidget(self.readMemoryButton, 3, 0) mainLayout.addWidget(self.setMemoryButton, 4, 0) mainLayout.addWidget(self.addToMemoryButton, 5, 0) for i in range(1, Calculator.NumDigitButtons): row = ((9 - i) / 3) + 2 column = ((i - 1) % 3) + 1 mainLayout.addWidget(self.digitButtons[i], row, column) mainLayout.addWidget(self.digitButtons[0], 5, 1) mainLayout.addWidget(self.pointButton, 5, 2) mainLayout.addWidget(self.changeSignButton, 5, 3) mainLayout.addWidget(self.divisionButton, 2, 4) mainLayout.addWidget(self.timesButton, 3, 4) mainLayout.addWidget(self.minusButton, 4, 4) mainLayout.addWidget(self.plusButton, 5, 4) mainLayout.addWidget(self.squareRootButton, 2, 5) mainLayout.addWidget(self.powerButton, 3, 5) mainLayout.addWidget(self.reciprocalButton, 4, 5) mainLayout.addWidget(self.equalButton, 5, 5) self.setLayout(mainLayout) self.setWindowTitle(\"Calculator\") def digitClicked(self): clickedButton = self.sender() digitValue = int(clickedButton.text()) if self.display.text() == '0' and digitValue == 0.0: return if self.waitingForOperand: self.display.clear() self.waitingForOperand = False self.display.setText(self.display.text() + str(digitValue)) def unaryOperatorClicked(self): clickedButton = self.sender() clickedOperator = clickedButton.text() operand = float(self.display.text()) if clickedOperator == \"Sqrt\": if operand < 0.0: self.abortOperation() return result = math.sqrt(operand) elif clickedOperator == u\"x\\N{SUPERSCRIPT TWO}\": result = math.pow(operand, 2.0) elif clickedOperator == \"1/x\": if operand == 0.0: self.abortOperation() return result = 1.0 / operand self.display.setText(str(result)) self.waitingForOperand = True def additiveOperatorClicked(self): clickedButton = self.sender() clickedOperator = clickedButton.text() operand = float(self.display.text()) if self.pendingMultiplicativeOperator: if not self.calculate(operand, self.pendingMultiplicativeOperator): self.abortOperation() return self.display.setText(str(self.factorSoFar)) operand = self.factorSoFar self.factorSoFar = 0.0 self.pendingMultiplicativeOperator = '' if self.pendingAdditiveOperator: if not self.calculate(operand, self.pendingAdditiveOperator): self.abortOperation() return self.display.setText(str(self.sumSoFar)) else: self.sumSoFar = operand self.pendingAdditiveOperator = clickedOperator self.waitingForOperand = True def multiplicativeOperatorClicked(self): clickedButton = self.sender() clickedOperator = clickedButton.text() operand = float(self.display.text()) if self.pendingMultiplicativeOperator: if not self.calculate(operand, self.pendingMultiplicativeOperator): self.abortOperation() return self.display.setText(str(self.factorSoFar)) else: self.factorSoFar = operand self.pendingMultiplicativeOperator = clickedOperator self.waitingForOperand = True def equalClicked(self): operand = float(self.display.text()) if self.pendingMultiplicativeOperator: if not self.calculate(operand, self.pendingMultiplicativeOperator): self.abortOperation() return operand = self.factorSoFar self.factorSoFar = 0.0 self.pendingMultiplicativeOperator = '' if self.pendingAdditiveOperator: if not self.calculate(operand, self.pendingAdditiveOperator): self.abortOperation() return self.pendingAdditiveOperator = '' else: self.sumSoFar = operand self.display.setText(str(self.sumSoFar)) self.sumSoFar = 0.0 self.waitingForOperand = True def pointClicked(self): if self.waitingForOperand: self.display.setText('0') if \".\" not in self.display.text(): self.display.setText(self.display.text() + \".\") self.waitingForOperand = False def changeSignClicked(self): text = self.display.text() value = float(text) if value > 0.0: text = \"-\" + text elif value < 0.0: text = text[1:] self.display.setText(text) def backspaceClicked(self): if self.waitingForOperand: return text = self.display.text()[:-1] if not text: text = '0' self.waitingForOperand = True self.display.setText(text) def clear(self): if self.waitingForOperand: return self.display.setText('0') self.waitingForOperand = True def clearAll(self): self.sumSoFar = 0.0 self.factorSoFar = 0.0 self.pendingAdditiveOperator = '' self.pendingMultiplicativeOperator = '' self.display.setText('0') self.waitingForOperand = True def clearMemory(self): self.sumInMemory = 0.0 def readMemory(self): self.display.setText(str(self.sumInMemory)) self.waitingForOperand = True def setMemory(self): self.equalClicked() self.sumInMemory = float(self.display.text()) def addToMemory(self): self.equalClicked() self.sumInMemory += float(self.display.text()) def createButton(self, text, member): button = Button(text) button.clicked.connect(member) return button def abortOperation(self): self.clearAll() self.display.setText(\"####\") def calculate(self, rightOperand, pendingOperator): if pendingOperator == \"+\": self.sumSoFar += rightOperand elif pendingOperator == \"-\": self.sumSoFar -= rightOperand elif pendingOperator == u\"\\N{MULTIPLICATION SIGN}\": self.factorSoFar *= rightOperand elif pendingOperator == u\"\\N{DIVISION SIGN}\": if rightOperand == 0.0: return False self.factorSoFar /= rightOperand return True if __name__ == '__main__': import sys app = QApplication(sys.argv) calc = Calculator() calc.show() sys.exit(app.exec_())","tags":"Course","url":"./40623226_2017-fall-cp-w5.html"},{"title":"網際 Brython 3.3.4 程式執行環境","text":"Brython 程式環境可以用來練習許多 Python3 的簡單語法, 也可以納入 Javascript 程式庫, 利用 Ajax 模式結合網際瀏覽器與伺服器上的資源解決協同產品設計流程上的問題. window.onload=function(){ brython({debug:1, pythonpath:['./../data/py']}); } 利用以下的編輯器執行 Python3 程式 在 Firefox 中, 以 Preferences - General - Downloads 選擇 \"Always ask me where to save files\" 在 Chrome 中, 以 Settings - Advanced - Downloads 選擇 Ask where to save each file before downloading function doSave(){ var blob = new Blob([localStorage[\"py_src\"]], {type: \"text/plain;charset=utf-8\"}); filename = document.getElementById('filename').value saveAs(blob, filename+\".py\"); } import sys import time import traceback import javascript from browser import document as doc, window, alert has_ace = True try: editor = window.ace.edit(\"editor\") session = editor.getSession() session.setMode(\"ace/mode/python\") editor.setOptions({ 'enableLiveAutocompletion': True, 'enableSnippets': True, 'highlightActiveLine': False, 'highlightSelectedWord': True }) except: from browser import html editor = html.TEXTAREA(rows=20, cols=70) doc[\"editor\"] <= editor def get_value(): return editor.value def set_value(x):editor.value = x editor.getValue = get_value editor.setValue = set_value has_ace = False if hasattr(window, 'localStorage'): from browser.local_storage import storage else: storage = None def reset_src(): if storage is not None and \"py_src\" in storage: editor.setValue(storage[\"py_src\"]) else: editor.setValue('for i in range(10):\\n\\tprint(i)') editor.scrollToRow(0) editor.gotoLine(0) def reset_src_area(): if storage and \"py_src\" in storage: editor.value = storage[\"py_src\"] else: editor.value = 'for i in range(10):\\n\\tprint(i)' class cOutput: def __init__(self,target): self.target = doc[target] def write(self,data): self.target.value += str(data) #if \"console\" in doc: sys.stdout = cOutput(\"console\") sys.stderr = cOutput(\"console\") def to_str(xx): return str(xx) info = sys.implementation.version doc['version'].text = 'Brython %s.%s.%s' % (info.major, info.minor, info.micro) output = '' def show_console(ev): doc[\"console\"].value = output doc[\"console\"].cols = 60 doc[\"console\"].rows = 10 # load a Python script def load_script(evt): _name = evt.target.value + '?foo=%s' % time.time() editor.setValue(open(_name).read()) # run a script, in global namespace if in_globals is True def run(*args): global output doc[\"console\"].value = '' src = editor.getValue() if storage is not None: storage[\"py_src\"] = src t0 = time.perf_counter() try: #ns = {'__name__':'__main__'} ns = {'__name__':'editor'} exec(src, ns) state = 1 except Exception as exc: traceback.print_exc(file=sys.stderr) state = 0 output = doc[\"console\"].value print('<completed in %6.2f ms>' % ((time.perf_counter() - t0) * 1000.0)) return state if has_ace: reset_src() else: reset_src_area() def clear_console(ev): doc[\"console\"].value = \"\" def clear_container(ev): doc[\"container\"].clear() doc['run'].bind('click',run) doc['show_console'].bind('click',show_console) doc['clear_console'].bind('click',clear_console) doc['clear_container'].bind('click',clear_container) Filename: .py Run Output 清除 清除畫布 from browser import document as doc import script1 def ex1(ev): script1.editor.setValue('''#ex1 簡單的 for 迴圈範例 for i in range(10): print(i) ''') script1.editor.scrollToRow(0) script1.editor.gotoLine(0) doc['ex1'].bind('click',ex1) ex1 -for 迴圈 from browser import document as doc import script1 def ex2(ev): script1.editor.setValue('''#溫度轉換程式 from browser import document as doc # 因為此函式與滑鼠互動, 需要 event 當作輸入 def convTemp(): mystring = \"\" cdegree = input(\"請輸入攝氏溫度:\") fdegree = float(cdegree)*9/5 + 32 output_string = \"攝氏 \" + str(cdegree) + \"度=華氏 \" + str(fdegree) + \"度\" # 利用 print() 將轉換結果送到 console 區 print(output_string) #直接呼叫 convTemp() 執行 convTemp() ''') script1.editor.scrollToRow(0) script1.editor.gotoLine(0) doc['ex2'].bind('click',ex2) ex2 -溫度換算 from browser import document as doc import script1 def ex3(ev): script1.editor.setValue('''#jansen 多連桿機構驗算 from math import pi, cos, sin, sqrt, acos radian = 180/pi degree = pi/180 #PLAP def plap(ax, ay, ac, bac, bx, by, ccw): if ccw == 1: cx= ac*cos(bac - acos((ax**2 - 2*ax*bx + ay**2 - 2*ay*by + bx**2 + by**2 + abs(ax - bx)**2 - abs(ay - by)**2)/(2*sqrt(ax**2 - 2*ax*bx + ay**2 - 2*ay*by + bx**2 + by**2)*abs(ax - bx)))) + ax cy= ac*sin(bac - acos((ax**2 - 2*ax*bx + ay**2 - 2*ay*by + bx**2 + by**2 + abs(ax - bx)**2 - abs(ay - by)**2)/(2*sqrt(ax**2 - 2*ax*bx + ay**2 - 2*ay*by + bx**2 + by**2)*abs(ax - bx)))) + ay else: cx= ac*cos(bac + acos((ax**2 - 2*ax*bx + ay**2 - 2*ay*by + bx**2 + by**2 + abs(ax - bx)**2 - abs(ay - by)**2)/(2*sqrt(ax**2 - 2*ax*bx + ay**2 - 2*ay*by + bx**2 + by**2)*abs(ax - bx)))) + ax cy= ac*sin(bac + acos((ax**2 - 2*ax*bx + ay**2 - 2*ay*by + bx**2 + by**2 + abs(ax - bx)**2 - abs(ay - by)**2)/(2*sqrt(ax**2 - 2*ax*bx + ay**2 - 2*ay*by + bx**2 + by**2)*abs(ax - bx)))) + ay return cx, cy #PLLP def pllp(ax, ay, ac, cb, bx, by, cw): if cw == 1: cx = -((ay - by)*(-ac**2*ay + ac**2*by + ax**2*ay + ax**2*by - 2*ax*ay*bx - 2*ax*bx*by + ay**3 - ay**2*by + ay*bx**2 - ay*by**2 + ay*cb**2 + bx**2*by + by**3 - by*cb**2 - sqrt((-ac**2 + 2*ac*cb + ax**2 - 2*ax*bx + ay**2 - 2*ay*by + bx**2 + by**2 - cb**2)*(ac**2 + 2*ac*cb - ax**2 + 2*ax*bx - ay**2 + 2*ay*by - bx**2 - by**2 + cb**2))*(ax - bx)) + (ac**2 - ax**2 - ay**2 + bx**2 + by**2 - cb**2)*(ax**2 - 2*ax*bx + ay**2 - 2*ay*by + bx**2 + by**2))/(2*(ax - bx)*(ax**2 - 2*ax*bx + ay**2 - 2*ay*by + bx**2 + by**2)) cy = (-ac**2*ay + ac**2*by + ax**2*ay + ax**2*by - 2*ax*ay*bx - 2*ax*bx*by + ay**3 - ay**2*by + ay*bx**2 - ay*by**2 + ay*cb**2 + bx**2*by + by**3 - by*cb**2 + sqrt((-ac**2 + 2*ac*cb + ax**2 - 2*ax*bx + ay**2 - 2*ay*by + bx**2 + by**2 - cb**2)*(ac**2 + 2*ac*cb - ax**2 + 2*ax*bx - ay**2 + 2*ay*by - bx**2 - by**2 + cb**2))*(-ax + bx))/(2*(ax**2 - 2*ax*bx + ay**2 - 2*ay*by + bx**2 + by**2)) else: cx = -((ay - by)*(-ac**2*ay + ac**2*by + ax**2*ay + ax**2*by - 2*ax*ay*bx - 2*ax*bx*by + ay**3 - ay**2*by + ay*bx**2 - ay*by**2 + ay*cb**2 + bx**2*by + by**3 - by*cb**2 + sqrt((-ac**2 + 2*ac*cb + ax**2 - 2*ax*bx + ay**2 - 2*ay*by + bx**2 + by**2 - cb**2)*(ac**2 + 2*ac*cb - ax**2 + 2*ax*bx - ay**2 + 2*ay*by - bx**2 - by**2 + cb**2))*(ax - bx)) + (ac**2 - ax**2 - ay**2 + bx**2 + by**2 - cb**2)*(ax**2 - 2*ax*bx + ay**2 - 2*ay*by + bx**2 + by**2))/(2*(ax - bx)*(ax**2 - 2*ax*bx + ay**2 - 2*ay*by + bx**2 + by**2)) cy = (-ac**2*ay + ac**2*by + ax**2*ay + ax**2*by - 2*ax*ay*bx - 2*ax*bx*by + ay**3 - ay**2*by + ay*bx**2 - ay*by**2 + ay*cb**2 + bx**2*by + by**3 - by*cb**2 + sqrt((-ac**2 + 2*ac*cb + ax**2 - 2*ax*bx + ay**2 - 2*ay*by + bx**2 + by**2 - cb**2)*(ac**2 + 2*ac*cb - ax**2 + 2*ax*bx - ay**2 + 2*ay*by - bx**2 - by**2 + cb**2))*(ax - bx))/(2*(ax**2 - 2*ax*bx + ay**2 - 2*ay*by + bx**2 + by**2)) return cx, cy ax = -38 ay = 0 # b 為原點 bx = 0 by = 0 cx = 0 cy = 7.8 # m 為配合 PLAP 新增固定點 mx = 30 my = 7.8 # dcm ccw 方向角度 dcm = 30*degree cd = 15 # 三角形 dcm 為 ccw plap d=(a, cd, dcm, m) dx, dy = plap(cx, cy, cd, dcm, mx, my, ccw=1) print(\"dx=\", dx, \"dy=\", dy) # 三角形 aed 為 cw pllp e=(a, ae, ed, d) ae = 41.5 ed = 50 ex, ey = pllp(ax, ay, ae, ed, dx, dy, cw=1) print(\"ex=\", ex, \"ey=\", ey) # 三角形 afe 為 cw pllp f=(a, af, fe, e) af = 40.1 fe = 55.8 fx, fy = pllp(ax, ay, af, fe, ex, ey, cw=1) print(\"fx=\", fx, \"fy=\", fy) # 三角形 dha 為 cw pllp h=(d, dh, ha, a) dh = 61.9 ha = 39.3 hx, hy = pllp(dx, dy, dh, ha, ax, ay, cw=1) print(\"hx=\", hx, \"hy=\", hy) # 三角形 hgf 為 cw pllp g=(h, hg, gf, f) hg = 36.7 gf = 39.4 gx, gy = pllp(hx, hy, hg, gf, fx, fy, cw=1) print(\"gx=\", gx, \"gy=\", gy) # 三角形 hkg 為 cw pllp k=(h, hk, kg, g) hk = 49 kg = 65.7 kx, ky = pllp(hx, hy, hk, kg, gx, gy, cw=1) print(\"kx=\", kx, \"ky=\", ky) ''') script1.editor.scrollToRow(0) script1.editor.gotoLine(0) doc['ex3'].bind('click',ex3) ex3 -多連桿機構 from browser import document as doc import script1 def ex4(ev): script1.editor.setValue('''#ex4 turtle 網際繪圖 import turtle t=turtle.Turtle() t.penup() t.left(45) t.backward(125) t.right(45) t.pendown() for c in ['red', 'green', 'yellow', 'blue']: t.color(c) t.forward(75) t.left(90) t1=turtle.Turtle(\"turtle\") t1.penup() t1.pendown() t1.width(3) for c in ['red', 'blue', 'yellow', 'green', 'purple', 'brown']: t1.color(c) t1.forward(50) t1.left(60) t1.penup() t1.left(60) t1.backward(120) t1.pendown() t1.color('red') t1.write(\"I love Brython!!\") turtle._Screen().end() ''') script1.editor.scrollToRow(0) script1.editor.gotoLine(0) doc['ex4'].bind('click',ex4) ex4 -turtle 網際繪圖 from browser import document import script1 def get_file(e): data = open(\"./../python_ex/for1.py\").read() script1.editor.setValue(data) script1.editor.scrollToRow(0) script1.editor.gotoLine(0) document[\"get\"].bind(\"click\", get_file) from browser import document import script1 def get_temp1(e): data = open(\"./../python_ex/temp1.py\").read() script1.editor.setValue(data) script1.editor.scrollToRow(0) script1.editor.gotoLine(0) document[\"get_temp1\"].bind(\"click\", get_temp1) from browser import document import script1 def get_ver_and_kw(e): data = open(\"./../python_ex/ver_and_kw.py\").read() script1.editor.setValue(data) script1.editor.scrollToRow(0) script1.editor.gotoLine(0) document[\"get_ver_and_kw\"].bind(\"click\", get_ver_and_kw) from browser import document import script1 def jansen(e): data = open(\"./../python_ex/jansen.py\").read() script1.editor.setValue(data) script1.editor.scrollToRow(0) script1.editor.gotoLine(0) document[\"jansen\"].bind(\"click\", jansen) from browser import document import script1 def tutorial(e): # 利用 e.target.text 取的對應按鈕的字串, 可以開啟對應的程式檔案 data = open(\"./../python_ex/python3_\"+e.target.text+\".py\").read() script1.editor.setValue(data) script1.editor.scrollToRow(0) script1.editor.gotoLine(0) document[\"tutorial1\"].bind(\"click\", tutorial) document[\"tutorial2\"].bind(\"click\", tutorial) document[\"tutorial3\"].bind(\"click\", tutorial) document[\"tutorial4\"].bind(\"click\", tutorial) document[\"tutorial5\"].bind(\"click\", tutorial) document[\"tutorial6\"].bind(\"click\", tutorial) document[\"tutorial7\"].bind(\"click\", tutorial) for1.py temp1.py ver_and_kw.py jansen.py tutorial1 tutorial2 tutorial3 tutorial4 tutorial5 tutorial6 tutorial7 Jansen 多連桿機構尺寸圖:","tags":"Course","url":"./40623226-brython-editor-334.html"},{"title":"2017 Fall CP 第二週","text":"本學期起各班透過一台 Ubuntu 16.04 主機, 建立 Fossil SCM 伺服器, 且每一學員發放一個 Fossil SCM 倉儲, 其中各學員可以利用 Wiki 與 Technote 紀錄學習資料外, 還可以將靜態網誌與簡報檔案放入 Files 資料區. 測試沒有綁定帳號後, 指定帳號新增提交推送版本. 測試 commit 時沒有 --user-override 4062 測試 push 才綁帳號 configuration - 組成內容與狀態 scm - software configuration management batch - 批次 remark - 註解 default - 內定, 默認 fossil clone - 克隆 fossil add - 新增 fossil commit - 提交 fossil push - 推送 fossil remote-url off fossil ui - user interface url - uniform resource locator https - secure hypertext transfer protocol protocol - 協定 certification - 簽章 - public key server certify - 認證 vacuum - 吸塵 fossil clone https://mde1a1.kmol.info/pymcadp pymcadp.fossil IDE - Integrated Development Environment 希望為每位學員建立倉儲的設想流程如下: 各學員可以獨立維護倉儲內容, 也可以在總管理員的權限下, 為分組學員建立帳號, 逐步導入協同設計 各學員的倉儲以修課班級命名伺服器, 以學號命名倉儲, 方便依照此一規律擷取各學員的倉儲頁面. 各學員能以電子郵件收到與新建倉儲相關的連結, 以及帳號密碼. 必須擴增 Ubuntu ulimits -n 同時開檔的設限範圍 (內定只允許同時開啟 1024 個檔案) 解決方案: 主機名稱可以透過 domain dns 中的 CNAME 別名方式處理, 因為目前所能提供出來的 IPv4/IPv6 雙支援主機, 之前已經都設定了符號名稱. fossil init 雖然提供指定管理者的 -A 選項功能, 但是無法直接指定管理者對應密碼, 因此必須建立倉儲之後, 再利用 fossil user 修改密碼, 之後再利用 Gmail 寄出通知信, 其中提供倉儲連結, 登入帳號與密碼等資訊. 建立各學員倉儲檔案的程式如下, 如前所述, 主要透過兩個 Fossil SCM 指令完成, 在 Windows 採用 Fossil SCM 2.3 版建立所有 .fossil 倉儲時, 將同時以 email 通知各學員. 各學員的 .fossil 檔案再以 sftp 送到伺服主機對應帳號所屬的目錄下. 必須要特別注意的是, 採用 Fossil SCM 2.3 版所建立的 .fossil 倉儲檔案, 在 Ubuntu 操作系統上也必須採用相同版本的 fossil, 否則舊版 fossil 可能無法開啟新版 fossil 程式所建立的倉儲檔. import os import string import random # 使用 Gmail 寄信必須導入下列模組 import smtplib import re from email.mime.text import MIMEText from email.header import Header # 用來以亂數建立密碼的韓式 def id_generator(size=6, chars=string.ascii_uppercase + string.digits): ''' source: https://stackoverflow.com/questions/2257441/random-string-generation-with-upper-case-letters-and-digits-in-python ''' return ''.join(random.choice(chars) for _ in range(size)) # 讀取學員名單, 逐一取得學員學號, 學員名單, 檢查點 1/7 student_data = open(\"2017fall_list/1b.txt\").read() student_list = student_data.splitlines() # 利用 gmail smtp 功能寄信 server = smtplib.SMTP('smtp.gmail.com:587') server.ehlo() server.starttls() # 以下必須準備好對應郵件帳號與密碼的外部檔案, 所提供的寄信帳號, 是否可以寄信, 檢查點 2/7 ''' 寄信之前必須到 https://www.google.com/settings/security/lesssecureapps 修改權限, 改為較低安全權限 否則無法使用程式寄信! ''' # 從外部檔案讀取要用來寄信的 gmail 帳號與密碼 # mail.txt 格式為: 電子郵箱,對應密碼, 以逗點隔開, 檢查點 3/7 email_data = open(\"z:/2017fall/mail.txt\").read() email, email_password= email_data.split(\",\") print(email, email_password) # 是否登入所提供寄信的電子郵箱, 4/7 server.login(email, email_password) # 不同課程名稱, 與對應主機名稱, 必須配合修改 5/7 course_title = \"計算機程式\" fossil_server = \"cpb.kmol.info\" for student_num in student_list: username = student_num repository = username + '.fossil' # 利用所提供的字串, 以亂數組成六個字元的密碼 password = id_generator(6, \"23456789abcdef\") print(student_num, \", \" , password) # 執行 dos command 指令, 建立倉儲 os.system(\"fossil init -A \" +username + \" \" + repository) print(\"已經建立倉儲 \" + repository) # 執行 dos command 指令, 修改使用者密碼 os.system(\"fossil user password \" + username + \" \" + password + \" -R \" + repository) print(\"已經修改密碼\") # 利用 Gmail 寄信, 告知各學員倉儲連結與帳號密碼 # 每一位學員收到的 output 都從這裡 reset output = \"\" # 若學號欄為空, 則不寄信 if student_num != \"\": # output 為寄給每一位學員的資料表格 mail_content = student_num+' 您好: 您在 '+course_title+' 課程中的區域網路倉儲: https://'+fossil_server+'/'+student_num+' ' mail_content += '管理帳號為:'+ student_num + ' 管理密碼為: '+ password+' ' print(student_num) print(mail_content) # 至此 mail_content 已經確定 # 在測試與實際寄送資料, 也必須配合修改, 檢查點 6/7 receiver_email = student_num + \"@gm.nfu.edu.tw\" # 測試用 #receiver_email = student_num+\"@mde.tw\" # 列出收信人 email 位址 #print(receiver_email) #message= MIMEText(mail_content,'plain','UTF-8') # 以 html 格式寄信 message= MIMEText(mail_content,'html','UTF-8') message['Subject'] = Header(course_title+\" Fossil SCM 帳號通知\", 'UTF-8') # 可以先不寄信, 確定格式正確後再開啟, 是否實際寄出信件, 檢查點 7/7 server.sendmail(\"gmail_address\", receiver_email, message.as_string()) server.quit() 各班所完成的主機: 二甲電腦輔助設計實習: https://cadpa.kmol.info 二乙電腦輔助設計實習: https://cadpb.kmol.info 一甲計算機程式: https://cpa.kmol.info 一乙計算機程式: https://cpb.kmol.info","tags":"Course","url":"./40623226_2017-fall-cadp-w2.html"}]};