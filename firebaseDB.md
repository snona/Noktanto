## Firebase DB

```
{
  users: {  // ユーザ一覧
    user01: { // ユーザID
      name: 'Yamada', // ユーザ名
      rooms: {  // ユーザが参加可能なルーム一覧
        room01: true,
        room03: true,
      },
      channels: { // ユーザが参加可能なチャンネル一覧
        channel01: true,
        channel03: true,
      },
    },
    user02: {...},
  },
  rooms: {  // ルーム一覧
    room01: { // ルームID
      name: 'Example Room', // ルーム名
      users: {  // ルームに参加可能なユーザ一覧
        user01: true,
        user02: true,
      },
      authentication: true, // 認証必須/不要
      visit: true,  // 見学可否
      system: 'Cthulhu' // ダイスシステム
    },
    room02: {...},
  },
  channels: { // チャンネル一覧
    room01: { // チャンネルの属するルームID
      channel01: {  // チャンネルID
        name: 'Idle Talk',  // チャンネル名
        users: {  // チャンネルに参加可能なユーザ一覧
          user01: true,
          user02: true,
        },
      },
      channel02: {...},
    },
    room02: {...},
  }
  characters: { // キャラクタ一覧
    room01: { // キャラクタが属するルームID
      character01: {  // キャラクタID
        name: 'Brown',  // キャラクタ名
        image: './sample01.png',  // キャラクタ画像
        color: '#ff4081', // キャラクタ色
      },
      character02: {...},
    },
    room02: {...},
  },
  pieces: { // 駒一覧
    room01: { // 駒が属するルームID
      piece01: {  // 駒ID
        name: 'Yamada', // 駒名
        x: 0, // 駒のX座標
        y: 0, // 駒のY座標
        size: 1,  // 駒の大きさ
        image: './sample01.png',  // 駒画像
        status: { // ステータス情報
          hp: 10,
        }
      },
      piece02: {...},
    },
    room02: {...},
  },
  messages: { // メッセージ一覧
    room01: { // メッセージが属するルームID
      channel01: {  // メッセージが属するチャンネルID
        message01: {  // メッセージID
          text: '2d6',  // メッセージ本文
          sender: { // メッセージ送信者
            user: user01, // メッセージ送信ユーザ
            character: character01, // メッセージ送信キャラクタ
          },
        },
        message02: {...},
      },
      channel02: {...},
    },
    room02: {...},
  },
  memos: {  // 共有メモ一覧
    room01: { // 共有メモが属するルームID
      memo01: { // 共有メモID
        name: 'memo', // 共有メモ名
        text: 'text', // 共有メモ内容
      },
      memo02: {...},
    },
    room02: {...},
  },
  pallets: {  // チャットパレット一覧
    room01: { // チャットパレットが属するルームID
      user01: { // チャットパレットが属するユーザID
        pallet01: { // チャットパレットID
          name: 'Pallet', // チャットパレット名
          character: character01, // メッセージ送信キャラクタ
          text: '2d6+{AGI}\n//AGI=5'  // チャットパレット内容
        },
        pallet02: {...},
      },
      user02: {...},
    },
    room02: {...},
  },
  configs: {  // 設定一覧
    room01: { // 設定が属するルームID
      mapConfig: {  // マップ設定
        cols: 15, // マップサイズ(横)
        rows: 15, // マップサイズ(縦)
        image: './sample01.png',  // 背景画像
      },
    },
    room02: {...},
  },
  authentications: {
    room01: {
      authentication: 'Password',
    },
    room02: {...},
  }
},
```

## Firebase DB Rule
```
{
  rules: {
    users: {
      .read: auth !== null,
      .write: auth !== null,
      $user_id: {
        .write: auth === $user_id,
        rooms: {
          .read: auth === $user_id,
        },
        channels: {
          .read: auth === $user_id,
        },
      },
    },
    rooms: {
      .read: auth !== null,
      .write: auth !== null,
    },
    channels: {
      .read: auth !== null,
      .write: auth !== null,
      $room_id: {
        .read: root.child(`users/${auth.uid}/rooms/${$room_id}`).exists(),
        .write: root.child(`users/${auth.uid}/rooms/${$room_id}`).exists(),
        $channel_id: {
          .read: root.child(`users/${auth.uid}/channels/${$channel_id}`).exists(),
          .write: root.child(`users/${auth.uid}/channels/${$channel_id}`).exists(),
        },
      },
    },
    characters: {
      .read: auth !== null,
      .write: auth !== null,
      $room_id: {
        .read: root.child(`users/${auth.uid}/rooms/${$room_id}`).exists(),
        .write: root.child(`users/${auth.uid}/rooms/${$room_id}`).exists(),
      },
    },
    pieces: {
      .read: auth !== null,
      .write: auth !== null,
      $room_id: {
        .read: root.child(`users/${auth.uid}/rooms/${$room_id}`).exists(),
        .write: root.child(`users/${auth.uid}/rooms/${$room_id}`).exists(),
      },
    },
    messages: {
      .read: auth !== null,
      .write: auth !== null,
      $room_id: {
        .read: root.child(`users/${auth.uid}/rooms/${$room_id}`).exists(),
        .write: root.child(`users/${auth.uid}/rooms/${$room_id}`).exists(),
        $channel_id: {
          .read: root.child(`users/${auth.uid}/channels/${$channel_id}`).exists(),
          .write: root.child(`users/${auth.uid}/channels/${$channel_id}`).exists(),
        },
      },
    },
    memos: {
      .read: auth !== null,
      .write: auth !== null,
      $room_id: {
        .read: root.child(`users/${auth.uid}/rooms/${$room_id}`).exists(),
        .write: root.child(`users/${auth.uid}/rooms/${$room_id}`).exists(),
      },
    },
    pallets: {
      .read: auth !== null,
      .write: auth !== null,
      $room_id: {
        .read: root.child(`users/${auth.uid}/rooms/${$room_id}`).exists(),
        .write: root.child(`users/${auth.uid}/rooms/${$room_id}`).exists(),
        $user_id: {
          .read: auth === $user_id,
          .write: auth === $user_id,
        },
      },
    },
    configs: {
      .read: auth !== null,
      .write: auth !== null,
      $room_id: {
        .read: root.child(`users/${auth.uid}/rooms/${$room_id}`).exists(),
        .write: root.child(`users/${auth.uid}/rooms/${$room_id}`).exists(),
      },
    },
    authentications: {
      .read: auth !== null,
      .write: auth !== null,
      $room_id: {
        .write: root.child(`users/${auth.uid}/rooms/${$room_id}`).exists(),
      },
    },
  },
},
```

## LocalStorage
ローカル保持用のデータ構造

```
{
  layouts: [{ // 画面配置一覧
    i: 'key',  // 画面項目ID
    x: 0, // 配置位置(x)
    y: 0, // 配置位置(y)
    w: 10,  // サイズ(横)
    h: 10,  // サイズ(縦)
  }],
  mapConfig: {
    color: '#ff4081',
    zoom: 1,
  },
}
```