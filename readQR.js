const video = document.querySelector('.camera');

navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            facingMode: {
                exact: 'environment'
            }
        }
    })
    .then(function(stream) {
        video.srcObject = stream;
        video.onloadedmetadata = function(e) {
            video.play();
            checkImage();
        }
    })
    .catch(function(err) {
        alert('エラーが発生しました。\nカメラを起動できません。');
    })



    const canvas = document.querySelector('.canvas');
    const ctx = canvas.getContext('2d');
    var readCode;

    function checkImage(){
        // 取得している動画をCanvasに描画
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Canvasからデータを取得
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // jsQRに渡す
        var code = null;
        code = jsQR(imageData.data, canvas.width, canvas.height);

        // 失敗したら再度実行
        if(code){
            readCode = code.data;
            sendImage();     
        }else{
            setTimeout(() => {
                 checkImage() }, 200)
        }
    }

    function sendImage(){
        var idmString = "0114C3C5EB198022";
        var gate = "早稲田";
        var sentURL = "https://script.google.com/a/wasedasai.net/macros/s/AKfycbw9BMWL3BLRhB8ZlIs32scTBWceP0TYy28wnWtBD2btOatmNiiw/exec?idm=" + idmString + "&&gate=" + gate;
        resultPage.location = sentURL;

        // // XMLHttpRequestオブジェクトの作成
        // var request = new XMLHttpRequest();

        // // URLを開く
        // request.open('GET', sentURL, true);
        // request.responseType = 'json';

        // // レスポンスが返ってきた時の処理を記述 
        // request.onload = function () {
        //     var data = this.response;
        //     console.log(data);
        // // レスポンスが返ってきた時の処理
        // }

        // // リクエストをURLに送信
        // request.send();



        const url = "https://script.google.com/macros/s/AKfycbw9BMWL3BLRhB8ZlIs32scTBWceP0TYy28wnWtBD2btOatmNiiw/exec"
        fetch(sentURL , {
            method: "GET",
        }).then(response => response.text())
        .then(text => {
            // 取得した値をコンソールに出力
            console.log(text);
            // HTML上の必要な箇所に値を設定します。
            const targetID = "console";
            document.getElementById(targetID).innerText = text;
        });

        checkImage();
    }


