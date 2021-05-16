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
        // var sentURL = "https://script.google.com/a/wasedasai.net/macros/s/AKfycbw9BMWL3BLRhB8ZlIs32scTBWceP0TYy28wnWtBD2btOatmNiiw/exec?idm=" + idmString + "&&gate=" + gate;
        var sentURL = "https://www.youtube.com/embed/UlAkupInBqk" 
        resultPage.location = sentURL;
        checkImage();
    }


