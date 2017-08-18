# dice-chat

TRPG向けのWebサイト

## Demo

https://dice-chat-6b7e2.firebaseapp.com/

**※Dice Botを選択してからメッセージを送信してください**

## What is dice-chat

[BCDice-API](https://github.com/NKMR6194/bcdice-api) を用いて、TRPG用のチャット機能を提供します。  
[Firebase](https://firebase.google.com/) にデプロイすることで、サーバ管理をせずに環境を構築できます。

また、イカの技術を利用しています。

* [React](https://github.com/facebook/react)
* [Flux](https://github.com/facebook/flux)
* [Immutable.js](https://github.com/facebook/immutable-js)
* [jsonp](https://github.com/webmodules/jsonp)
* [Material UI](https://github.com/callemall/material-ui)
* [firebase](https://github.com/firebase/firebase-tools)
* [react-grid-layout](https://github.com/STRML/react-grid-layout)

## Setup

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

## 素材提供

背景のマップ画像を利用させていただいています。  
[恋と冒険の学園ＴＲＰＧエリュシオン オンラインセッションツール用素材](http://www.wtrpg9.com/trpg/)

## Author

山田はじめ(@hajimeYamada)
