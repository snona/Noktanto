# dice-chat

TRPG向けのWebサイト

## Demo

https://dice-chat-6b7e2.firebaseapp.com/

**※Dice Botを選択してからメッセージを送信してください**

## What is dice-chat

BCDice-APIを用いて、TRPG用のチャット機能を提供します。  
[Firebase]() にデプロイすることで、サーバ管理をせずに環境を構築できます。

イカの技術を利用しています。

* React
* Flux
* Immutable.js
* jsonp
* Material UI
* firebase
* react-grid-layout


## Setup

**※Firebaseの設定が事前に必要です。**

### npm install まで

```
git clone https://github.com/snona/dice-chat.git your-app-name
cd your-app-name
npm install
```

### Firebaseの設定

Firebaseに登録し、*ウェブアプリに Firebase を追加* を参考に下記ファイルを作成してください。
```./src/firebase/config.js
export const firebaseConfig = {
  apiKey: "****************",
  authDomain: "****************",
  databaseURL: "****************",
  storageBucket: "****************",
  messagingSenderId: "****************"
};
```

### 起動

```
npm start
```

デフォルトブラウザが自動で開き、 `localhost:3000` のページを表示します。

### デプロイ

```
npm install -g firebase-tools
fireabse login
firebase init
npm run build
```

## Author

山田はじめ(@hajimeYamada)
