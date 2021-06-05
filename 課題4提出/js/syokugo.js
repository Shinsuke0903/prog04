// firebase読み込み設定
// firesbaseのサイトのコード---------------------------
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "",
  authDomain: "dev20chat-c8419.firebaseapp.com",
  databaseURL: "https://dev20chat-c8419-default-rtdb.firebaseio.com/",  //仕様が変わった
  projectId: "dev20chat-c8419",
  storageBucket: "dev20chat-c8419.appspot.com",
  messagingSenderId: "179098484234",
  appId: "1:179098484234:web:d61a44c26659008fb1a9f3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//------------------------------------------------
//firebaseのデーターベース（保存させる場所）を使いますよ
// firebaseのデータベースとリアルタイムに繋がることができる
const newPostRef = firebase.database().ref();
// 現在地の取得(geolocation)ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
//最初に実行する関数
 function GetMap() {
  navigator.geolocation.getCurrentPosition(mapsInit, mapsError, set);
}
//****************************************
    //成功関数(位置情報を取得できたらこの関数を表示する)
    //****************************************
    let map;
    function mapsInit(position) {
      //lat=緯度、lon=経度 を取得
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      map = new Microsoft.Maps.Map('#myMap', {
        center: new Microsoft.Maps.Location(lat, lon), 
        zoom: 13,
        // 検索窓を追加する
        showSearchBar: true
    });
    // 現在地の緯度経度
    console.log(lat); //35.8616739
    console.log(lon); //139.9709821
    //現在地にピンの設定をするーーー
    var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), { 
      color: 'red' 
    });
    //現在地にピンを刺す
    map.entities.push(pushpin);
    // テキストBOXを追加する
   var center = map.getCenter();
   console.log(center);
   var infobox = new Microsoft.Maps.Infobox(center, { 
     title: '自分', 
     description: '食GOを開始します' ,
    });
   infobox.setMap(map);
 

//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

$("#images1").on("click", function () {
  // //firebaseを使った一連の流れーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー 
  // データを登録で送るーーーーーーーーーーーーーーーーーーーーーー
    newPostRef.push({
      longitude: 35.8490059,
      latitude:140.0053638,
      comment1: $("#activeimage1").val(),
      comment2: $("#activeimage2").val(),
      
    })
    $("#activeimage1").val(""); //空にする
    $("#activeimage2").val(""); //空にする
});

document.getElementById("pastplace1").onclick = function() {
// firebaseにあるデータを出力する
newPostRef.on("child_added", function (data) { //dataはなんでもいい
  let v = data.val(); //ここに保存されたデータが全て入ってくる
  console.log(v);
  var pin100 = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(v.longitude, v.latitude), {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><circle cx="25" cy="25" r="20" stroke="orange" stroke-width="4" fill="yellow" /></svg>',
    anchor: new Microsoft.Maps.Point(25, 25)
  });
   // テキストBOXを追加する
 var infobox100 = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(v.longitude, v.latitude), { 
   title: v.comment1, 
   description: v.comment2,
    visible: false
  });
   // テキストBOXを追加する
 infobox100.setMap(map);
  Microsoft.Maps.Events.addHandler(pin100, 'click', function () {
    infobox100.setOptions({ visible: true });
  });
  //指定した場所にピンを刺す
 map.entities.push(pin100);
//  // (ピンクリック時にinfoboxの表示)ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
 // 非表示ボタンでピンとテキストBOXを消す(現状最新の一個しか消せない)
 document.getElementById("pastplace2").onclick = function() {
map.entities.remove(pin100);
infobox100.setMap(null);
};
});
};
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

// 相手の表示をするーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 一人目
   document.getElementById("our").onclick = function() {
    var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(35.8613321, 139.9727391), {
      color: 'blue' 
    });
       // テキストBOXを追加する
       var infobox1 = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(35.8613321, 139.9727391), { 
        title: 'みづき', 
        description: '暇〜' ,
        actions: [
          { label: 'Handler1', eventHandler: function () { alert('Handler1'); } },
          { label: 'Handler2', eventHandler: function () { alert('Handler2'); } },
          { label: 'Handler3', eventHandler: function () { alert('Handler3'); } },
      ],
        visible: false
      });
       // テキストBOXを追加する
     infobox1.setMap(map);
      Microsoft.Maps.Events.addHandler(pin, 'click', function () {
        infobox1.setOptions({ visible: true });
      });
      //指定した場所にピンを刺す
     map.entities.push(pin);


     // 二人目 // 柏ヤングボウル(35.8460045 139.957012)
     var pin111 = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(35.8460045, 139.957012), {
      color: 'blue' 
    });
       // テキストBOXを追加する
       var infobox111 = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(35.8460045, 139.957012), { 
        title: 'ゆうじ', 
        description: '誰か夜空いてへん?' ,
        actions: [
          { label: 'Handler1', eventHandler: function () { alert('Handler1'); } },
          { label: 'Handler2', eventHandler: function () { alert('Handler2'); } },
          { label: 'Handler3', eventHandler: function () { alert('Handler3'); } },
      ],
        visible: false
      });
       // テキストBOXを追加する
     infobox111.setMap(map);
      Microsoft.Maps.Events.addHandler(pin111, 'click', function () {
        infobox111.setOptions({ visible: true });
      });
      //指定した場所にピンを刺す
     map.entities.push(pin111);

     // 三人目  // 東葛飾高校(35.8608078 139.9644934)
     var pin112 = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(35.8608078, 139.9644934), {
      color: 'blue' 
    });
       // テキストBOXを追加する
       var infobox112 = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(35.8608078, 139.9644934), { 
        title: 'みさき', 
        description: '初参戦です' ,
        actions: [
          { label: 'プロフィール', eventHandler: function () { alert('Handler1'); } },
          { label: 'eat', eventHandler: function () { alert('Handler2'); } },
          { label: 'Handler3', eventHandler: function () { alert('Handler3'); } },
      ],
        visible: false
      });
       // テキストBOXを追加する
     infobox112.setMap(map);
      Microsoft.Maps.Events.addHandler(pin112, 'click', function () {
        infobox112.setOptions({ visible: true });
      });
      //指定した場所にピンを刺す
     map.entities.push(pin112);
     // 四人目 // 柏しこだの森保育園(35.8729321 139.9563416)
     var pin113 = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(35.8729321, 139.9563416), {
      color: 'blue' 
    });
       // テキストBOXを追加する
       var infobox113 = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(35.8729321, 139.9563416), { 
        title: 'りょう', 
        description: 'よろしくお願いします' ,
        actions: [
          { label: 'prof', eventHandler: function () { 
            modal2.style.display = 'block';
            var closeBtn2 = document.getElementById('closeBtn2'); 
            closeBtn2.addEventListener('click', function(){
            modal2.style.display = 'none';
        })
          } },
          { label: 'eat', eventHandler: function () { 
            modal3.style.display = 'block';
            var closeBtn3 = document.getElementById('closeBtn3'); 
            closeBtn3.addEventListener('click', function(){
            modal3.style.display = 'none';
        })           
          } },
          { label: 'talk', eventHandler: function () { 
            modal4.style.display = 'block';
            var closeBtn4 = document.getElementById('closeBtn4'); 
            closeBtn4.addEventListener('click', function(){
            modal4.style.display = 'none';
            })
           } },
      ],
        visible: false
      });
       // テキストBOXを追加する
     infobox113.setMap(map);
      Microsoft.Maps.Events.addHandler(pin113, 'click', function () {
        infobox113.setOptions({ visible: true });
      });
      //指定した場所にピンを刺す
     map.entities.push(pin113);
    };
     // ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  };//(InitMapの終わり)
    //***************************************
    //失敗関数
    //****************************************
    function mapsError(error) {
      let e = "";
      if (error.code == 1) { //1＝位置情報取得が許可されてない（ブラウザの設定）
        e = "位置情報が許可されてません";
      }
      if (error.code == 2) { //2＝現在地を特定できない
        e = "現在位置を特定できません";
      }
      if (error.code == 3) { //3＝位置情報を取得する前にタイムアウトになった場合
        e = "位置情報を取得する前にタイムアウトになりました";
      }
      alert("エラー：" + e);
    };

    //****************************************
    //オプション設定
    //****************************************
    const set = {
      enableHighAccuracy: true, //より高精度な位置を求める
      maximumAge: 20000, //最後の現在地情報取得が20秒以内であればその情報を再利用する設定
      timeout: 10000 //10秒以内に現在地情報を取得できなければ、処理を終了
    };
//APIを用いて天気を表示するーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 天気の表示文字列および画像ファイル名
const WEATHERS = {
  Thunderstorm: { label: '雷雨', img: 'clouds' },
  Drizzle: { label: '霧雨', img: 'rains' },
  Rain: { label: '雨', img: 'rains' },
  Snow: { label: '雪', img: 'snow' },
  Atmosphere: { label: '濃霧', img: 'snow' },
  Clear: { label: '晴れ', img: 'clear' },
  Clouds: { label: '曇り', img: 'clouds' }
};
// 日にちを入れるターゲットを定義する
const nowTimeTarget = document.getElementById('nowData');
const nextTimeTarget = document.getElementById('nextData');
const afNextTimeTarget = document.getElementById('afNextData');
// 現在の日時を取得
const now = new Date();
// 取得した日時をターゲットに代入
nowTimeTarget.innerHTML = (now.getMonth() + 1) + '月' + now.getDate() + '日' + now.getHours() + '時' + now.getMinutes() + '分';
// 位置情報を取得開始
if (navigator.geolocation) {
  // 位置情報が取得成功した時
  console.log("わーい");
  navigator.geolocation.getCurrentPosition(function (position) {
      // 緯度経度を取得
      const basePosition = position.coords;
      const lat = basePosition.latitude;
      const lng = basePosition.longitude;
      console.log(lat); //35.8511354
      console.log(lng); //139.9512978
      // WEB API を使用し、現在地の現在の天気を取得ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
      const API_KEY = "";
      const url = "https://api.openweathermap.org/data/2.5/weather" + "?lat=" + lat + "&lon=" + lng + "&units=metric&APPID=" + API_KEY;
      const request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "json";
      // 現在の天気に関する関数
      request.onload = function () {
        const nowData = this.response;
        // 「現在の天気」「現在の気温」「現在地」を取得
        const weatherName = nowData.weather[0].main;
        const weatherTemp = nowData.main.temp;
        const cityName = nowData.name;
        console.log(weatherName); //Clouds
        console.log(weatherTemp); //18.86
        console.log(cityName); //Kashiwa
        // 取得した現在地が「Suguri」の時の処置
        if (cityName === 'Suguri') {
          alert('現在位置をうまく取得することができませんでした。\nしばらくお待ちいただき、再度アクセスいただけますでしょうか？\n「Suguri」の天気を表示させていただきます。どこかは知りません。')
        }
        // 取得したもの入れるターゲットを定義
        const geoTarget = document.getElementById('cityName');
        const patternTextTarget = document.getElementById('pattern');
        const patternImgTarget = document.getElementById('picture');
        const patternTempTarget = document.getElementById('temp');
        // 現在地、気温をターゲットに代入
        geoTarget.innerHTML = cityName;
        patternTempTarget.innerHTML = weatherTemp + '<span class="unit">℃</span>';
        /*取得した天気によって
        「天気の名前」「天気の画像を」を挿入*/
        const weather = WEATHERS[weatherName];
        
        if (weather) {
          const { label, img } = weather;
          patternTextTarget.innerHTML = label;
          patternImgTarget.innerHTML = `<img src="imgs/${img}.png" alt="${label}">`;
        } else {
          return false;
        }
      };
      request.send();
      //ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
      // // WEB API を使用し、現在地の翌日以降の天気を取得
      const nextUrl = "https://api.openweathermap.org/data/2.5/forecast" + "?lat=" + lat + "&lon=" + lng + "&units=metric&APPID=" + API_KEY;
      const nextRequest = new XMLHttpRequest();
      nextRequest.open("GET", nextUrl, true);
      nextRequest.responseType = "json";
      // 現在、翌日以降の天気に関する関数
      nextRequest.onload = function () {
        const data = this.response;
         // 「現在の天気」「現在の気温」「現在地」を取得
         //取り出せた!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  // 3時間後の天気を取り出すーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  const nextweatertime1 = data.list[3].dt_txt;//取り出した現在時刻を取り出した()
  console.log(nextweatertime1);
  const nextweatherName1 = data.list[3].weather[0].main;//Clouds(3時間後の天気の種類)
  console.log(nextweatherName1); //Clouds
  const nextweatherTemp1 = data.list[3].main.temp;//3時間後の気温
  console.log(nextweatherTemp1); 

  // 取得したもの入れるターゲットを定義ーーーーーー
  const patternTime1 = document.getElementById('forecast-time1');
  const patternTextTarget1 = document.getElementById('forecast-weather1');
  const patternImgTarget1 = document.getElementById('forecast-picture1');
  const patternTempTarget1 = document.getElementById('forecast-temp1');

  // 現在地、気温をHTMLに反映させる代入ーーーーーー
  patternTime1.innerHTML = nextweatertime1;
  patternTextTarget1.innerHTML = nextweatherName1;
  patternTempTarget1.innerHTML = nextweatherTemp1 + '<span class="unit">℃</span>';

  /*取得した天気によって
  「天気の名前」「天気の画像を」を挿入*/
  const weather1 = WEATHERS[nextweatherName1];
  if (weather1) {
    const { label, img } = weather1;
    patternTextTarget1.innerHTML = label;
    patternImgTarget1.innerHTML = `<img src="imgs/${img}.png" alt="${label}">`;
  } else {
    return false;
  }
  // ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
   // 6時間後の天気を取り出すーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
   const nextweatertime2 = data.list[4].dt_txt;//取り出した現在時刻を取り出した(2021-05-31 00:00:00)
   console.log(nextweatertime2);
   const nextweatherName2 = data.list[4].weather[0].main;//Clouds(3時間後の天気の種類)
   console.log(nextweatherName2); //Clouds
   const nextweatherTemp2 = data.list[4].main.temp;//3時間後の気温(21.71)
   console.log(nextweatherTemp2); 
   // 取得したもの入れるターゲットを定義ーーーーーー
  const patternTime2 = document.getElementById('forecast-time2');
  const patternTextTarget2 = document.getElementById('forecast-weather2');
  const patternImgTarget2 = document.getElementById('forecast-picture2');
  const patternTempTarget2 = document.getElementById('forecast-temp2');

  // 現在地、気温をHTMLに反映させる代入ーーーーーー
  patternTime2.innerHTML = nextweatertime2;
  patternTextTarget2.innerHTML = nextweatherName2;
  patternTempTarget2.innerHTML = nextweatherTemp2 + '<span class="unit">℃</span>';
   /*取得した天気によって
  「天気の名前」「天気の画像を」を挿入*/
  const weather2 = WEATHERS[nextweatherName2];
  if (weather2) {
    const { label, img } = weather2;
    patternTextTarget2.innerHTML = label;
    patternImgTarget2.innerHTML = `<img src="imgs/${img}.png" alt="${label}">`;
  } else {
    return false;
  }
  // ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
      };
      nextRequest.send();
    },
    //位置情報の取得失敗した時
    function () {
      alert('位置情報の取得に失敗しました。');
    });
} 
// チャットボットのトークの部分の設定
// データを登録で送るーーーーーーーーーーーーーーーーーーーーーー
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
/* HTML(だけ)の読み込みが完了したら */
window.addEventListener('DOMContentLoaded',()=>{
  //- イベントリスナー登録
  document.getElementById('talkapi__request').addEventListener('click',handler_request_reply);
});
/* 返答をリクエスト */
function handler_request_reply(ev){
  /* インプットしたコメント取得 */
  const comment = document.getElementById('talkapi__input').value;
        $("#talkme").prepend(comment)
        $("#talkapi__input").val(""); //空にする
  /* レクエストデータ */
  let formdata = new FormData();
  //- apikeyパラメーター 
  formdata.append('apikey','');
  //- コメント
  formdata.append('query',comment);
  /* リクエスト */
  fetch('https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk',{
      method: 'post',
      body: formdata,
  }).then(response => {//- レスポンス取得
    response.json().then(data => {
        //- 返答取得
        const reply = data.results[0].reply;
        //- 出力
        document.getElementById('talkapi__reply').innerHTML = reply;
    });
});
// talkAPIの設定をする
}
// let ai1 = document.getElementById("talkapi__input").innerHTML;
// console.log(ai1);






