<html>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/push.js/0.0.11/push.min.js"></script>
    <head>
        <title>Push.js Sample</title>
    </head>
    <body>
        <h1>Push.js Sample</h1>
        <button type="button" onclick="sendPushNotification()">クリックして下さい</button>
        <script type="text/javascript">
            function sendPushNotification() {
                Push.create('こんにちは！', {
                    body: '更新をお知らせします！',
                    icon: 'index.jpg',
                    timeout: 5000,
                    onClick: function () {
                        this.close();
                        location.href = 'https://www.yahoo.co.jp';
                    }
                })
            }
        </script>
    </body>
</html>