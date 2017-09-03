# Noktanto (Nokt/(i)/ant/o)

ノクタント  
TRPG向けチャット&マップツール

## Demo

https://dice-chat-6b7e2.firebaseapp.com/

**※Dice Botを選択してからメッセージを送信してください**

## What is dice-chat

[BCDice-API](https://github.com/NKMR6194/bcdice-api) を用いて、TRPG用のチャット機能を提供します。  
[Firebase](https://firebase.google.com/) を利用することで、リアルタイム通信によりチャット, マップの同期を行っています。  
また、Firebaseにデプロイすることで、サーバを必要とせずに環境を構築できます。

また、イカの技術を利用しています。

* [React](https://github.com/facebook/react)
* [Flux](https://github.com/facebook/flux)
* [Immutable.js](https://github.com/facebook/immutable-js)
* [Material UI](https://github.com/callemall/material-ui)
* [firebase](https://github.com/firebase/firebase-tools)
* [react-grid-layout](https://github.com/STRML/react-grid-layout)
* [react-konva](https://github.com/lavrton/react-konva)
* [axios](https://github.com/mzabriskie/axios)

## Setup

### npm install まで

```
git clone https://github.com/snona/dice-chat.git your-app-name
cd your-app-name
npm install
```

### Firebaseの設定

下記ファイルを `./src/firebase/config.js` として作成してください。
```
export const firebaseConfig = {
  apiKey: "****************",
  authDomain: "****************",
  databaseURL: "****************",
  storageBucket: "****************",
  messagingSenderId: "****************"
};
```

Firebaseに登録し、*ウェブアプリに Firebase を追加* を参考に上記の設定を記載してください。

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
firebase deploy
```

## 素材提供

背景, キャラの初期画像として利用させていただいています。  
[恋と冒険の学園ＴＲＰＧエリュシオン オンラインセッションツール用素材](http://www.wtrpg9.com/trpg/)

## Author

山田はじめ(@hajimeYamada)
