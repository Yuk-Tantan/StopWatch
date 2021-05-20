'use strict';

  const timeElement = document.getElementById('time');//時間を記載している部分を更新する定数
  const start = document.getElementById('start');//スタートボタンとリンクする為の定数
  const stop = document.getElementById('stop');//ストップボタンとリンクする為の定数
  const reset = document.getElementById('reset');//リセットボタンとリンクする為の定数
  
  
  
  let elapsed = 0;//経過時間を設定する為の変数(初期値は0とする)
  let intervalId = null;//setInterval, clearIntervalに命令を出す為のID
  $("#stop").prop("disabled", true);//ストップボタンを最初の段階で押せない様に設定したもの
  $("#reset").prop("disabled", true);//リセットボタンを最初の段階で押せない様に設定したもの
  
  
  //時間の流れを可視化する為に用いる関数
  function updateTime() {
    const mSec = elapsed % 1000;//m秒単位
    const sec = Math.floor(elapsed / 1000) % 60;//秒単位
    const min = Math.floor(elapsed / (1000*60)) % 60;//分単位
    const hour = Math.floor(elapsed / (1000*60*60));//時間単位
    
    //数字属性である上のメソッド等を文字属性に変換する為のメソッド
    const mSecStr = mSec.toString().padStart(3, '0');
    const secStr = sec.toString().padStart(2, '0');
    const minStr = min.toString().padStart(2, '0');
    const hourStr = hour.toString().padStart(2, '0');
    
    //上で作ったメソッドをHTMLで時間を記載している部分に代入する為のメソッド
    timeElement.innerHTML = `${hourStr}:${minStr}:${secStr}.${mSecStr}`;
    
  }
  
  
  //スタートボタンによる変化を「時間」「ボタン」に与える関数
  start.addEventListener('click', function(e){
    if (intervalId !== null) { return };  //何度スタートボタンを押しても無効化する為のメソッド
    let previous = new Date();//スタートを押した時の時間
    
    //時間の経過を10ミリ秒単位で計算する為の関数
    intervalId = setInterval(function(){
      const present = new Date();
      elapsed += present - previous; 
      previous = present;
      updateTime();
    }, 10);
    
    $("#start").prop("disabled", true);//スタート押せないようにする
    $("#stop").prop("disabled", false);//ストップ押せるようにする
  });
  
  
  //ストップを押した時に起こるストップウォッチへ変化を与える関数
  stop.addEventListener('click', function(e) {
    clearInterval(intervalId); //ミリ秒カウントを止める
    intervalId = null; //無効化メソッドに与える値
    $("#stop").prop("disabled", true);//ストップ押せないようにする
    $("#reset").prop("disabled", false);//リセット押せるようにする
  });
      
      
      //リセットを押した時に起こるストップウォッチへ変化を与える関数
      reset.addEventListener('click', function(e){
        elapsed = 0;//記録を無くす
        updateTime()//経過記録が'elapsed = 0;'で消えたので初期値と同じになる
        $("#start").prop("disabled", false);//スタート押せるようにする
        $("#reset").prop("disabled", true);//リセット押せなくする
      });
      
      
