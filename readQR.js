const video = document.querySelector('.camera')

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
        alert('エラーが発生しました。\nカメラを起動できません。')
    })



    const canvas = document.querySelector('.canvas')
    const ctx = canvas.getContext('2d')

    function checkImage(){
        // 取得している動画をCanvasに描画
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Canvasからデータを取得
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        if(imageData != null){
            alert("canvasはできてるよ1")
        }

        // jsQRに渡す
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        // QRコードの読み取りに成功したらモーダル開く
        // 失敗したら再度実行
        if (code) {
            // openModal(code.data);
            alert(code.data);
        } else {
            (function setTimeout(){
                checkImage();
            }, 200);
        }
    }


    const openModal = function(url) {
        document.querySelector('#js-result').innerText = url
        document.querySelector('#js-link').setAttribute('href', url)
        document.querySelector('#js-modal').classList.add('is-show')
    }
    
    document.querySelector('#js-modal-close')
        .addEventListener('click', () => {
            document.querySelector('#js-modal').classList.remove('is-show')
            checkImage()
        })