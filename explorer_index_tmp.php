<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ChainMaker Blockchain Explorer</title>

    <!-- jQuery -->
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>

    <!-- Bootstrap -->
    <link href="https://cdn.bootcss.com/twitter-bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/twitter-bootstrap/4.1.3/js/bootstrap.min.js"></script>

    <!-- Vue.js -->
    <script src="https://cdn.bootcss.com/vue/2.5.17/vue.min.js"></script>

    <!-- Font awesome -->
    <link href="https://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">

    <!-- SHA -->
    <script src="https://cdn.bootcss.com/jshashes/1.0.7/hashes.min.js"></script>

    <link href="https://cdn.bootcss.com/jqueryui/1.12.1/jquery-ui.min.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/jqueryui/1.12.1/jquery-ui.min.js"></script>

    <style>
        * {
            box-sizing: border-box;
            max-width: 100%;
            max-height: 100%;
        }

        body {
            background-color: #FAFAFA;
        }

        .rounded-left {
            border-top-left-radius: .8rem !important;
            border-bottom-left-radius: .8rem !important;
        }

        .rounded-right {
            border-top-right-radius: .8rem !important;
            border-bottom-right-radius: .8rem !important;
        }

        .summary-box {
            padding: 25px;
            display: flex;
            width: 100%;
        }

        .summary-left {
            width: 35%;
            height: 250px;
            padding: 15px;
        }

        .summary-right {
            width: 65%;
            height: 250px;
            padding: 15px;
            text-align: center;
        }

        .summary-right img {
            max-height: 180px;
        }

        #blocks {
            min-height: 230px;
            min-width: 1100px;
        }

        .block {
            float: left;
            margin: 10px;
            width: 250px;
            cursor: pointer;
        }

        .hide {
            display: none;
        }

        .card {
            color: #000;
        }

        .card .card-chain {
            display: none;
        }

        .block+.block .card-chain {
            position: absolute;
            left: -26px;
            top: 50%;
            width: 30px;
            z-index: 300;
            display: inline-block;
        }

        .card-title,
        .card-text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        #transactions {
            min-height: 500px;
        }

        #logo {
            position: absolute;
            right: 10px;
            top: 10px;
        }

        #logo img {
            height: 50px;
        }
    </style>
</head>

<body>
    <nav class="navbar navbar-light bg-light">
        <div>
            <a class="navbar-brand" href="?" style="font-size: 36px;">ChainMaker Explorer - $ESBC_HEADTITLE$</a>
        </div>
    </nav>

    <div id="logo">
        <img src="logo1.jpeg" alt="齐智科技" height="100" width="30">        
    </div>

    <div id="app" class="container">
        <h1>Blocks</h1>
        <p class="text-muted">
            Update per 10 seconds
            ( Count down: <span id="blockUpdateSecond"></span> sec.)
        </p>
        <div id="blocks"></div>

        <div id="detail" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" style="width: 80%;" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">#{{ block.height }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" style="word-break: break-all;">
                        <div>
                            Hash：{{ block.hash }}
                        </div>
                        <p>
                            Size：{{ block.formatsize }}
                            <br />
                            Gas used: {{ block.gasUsed | NumFormat }}
                        </p>
                        <small class="text-muted">
                            {{ block.timestamp}} ( {{ block.TXn }} )
                        </small>

                        <hr v-if="block.TXn > 0" />

                        <table class="table table-striped">
                            <tr v-for="transaction in block.transactions" :key="transaction.block">
                                <td style="white-space: nowrap;"><span class="text-primary">#{{ parseInt(transaction.transactionIndex, 16) }}</span></td>
                                <td style="word-break: break-all;">
                                    <p>Block：<span class="text-primary">#{{ parseInt(transaction.blockNumber, 16) }}</span></p>
                                    <p>
                                        From：<span class="text-primary">{{ transaction.from }}</span>
                                        <br />
                                        To：<span class="text-primary">{{ transaction.to }}</span>
                                    </p>
                                    <p>
                                        Hash：<span class="text-primary">{{ transaction.hash }}</span>
                                    </p>
                                    <p>
                                        Gas：<span class="text-primary">{{ parseInt(transaction.gas, 16) | NumFormat }}</span>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        Gas price：<span class="text-primary">{{ parseInt(transaction.gasPrice, 16) | NumFormat }}</span>
                                    </p>
                                    <p>
                                        Input：<span class="text-primary">
                                                {{ transaction.input | hextoString }}
                                        </span>
                                    </p>
                                    <p>
                                        Nonce：<span class="text-primary">{{ parseInt(transaction.nonce, 16) | NumFormat }}</span>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        Value：<span class="text-primary">{{ (parseInt(transaction.value, 16) / Math.pow(10, 18)).toFixed(2) }} eth</span>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>


        <h1 style="clear: both;">Transactions</h1>
        <div id="transactions">

            <table class="table table-striped">
                <tr v-for="transaction in transactions">
                    <td style="word-break: break-all;">
                        <p>Block：
                            <span class="text-primary">#{{ parseInt(transaction.blockNumber, 16) }}</span>
                            <small class="text-muted">{{ transaction.timestamp }}</small>
                        </p>

                        <p>
                            Hash：<span class="text-primary">{{ transaction.blockHash }}</span>
                        </p>

                        <p>
                            From：<span class="text-primary">{{ transaction.from }}</span>
                            <br />
                            To：<span class="text-primary">{{ transaction.to }}</span>
                        </p>
                        <p>
                            Hash：<span class="text-primary">{{ transaction.hash }}</span>
                        </p>
                        <p>
                            Gas：<span class="text-primary">{{ parseInt(transaction.gas, 16) | NumFormat }}</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            Gas price：<span class="text-primary">{{ parseInt(transaction.gasPrice, 16) | NumFormat }}</span>
                        </p>
                        <p>
                            Input：<span class="text-primary">
                                    {{ transaction.input | hextoString }}
                            </span>
                        </p>
                        <p>
                            Nonce：<span class="text-primary">{{ parseInt(transaction.nonce, 16) | NumFormat }}</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            Value：<span class="text-primary">{{ (parseInt(transaction.value, 16) / Math.pow(10, 18)).toFixed(2) }} eth</span></span>
                        </p>
                    </td>
                </tr>
            </table>

        </div>
    </div>

    <script>
        var lastHeight = 0; // 最新区块数
        var totalDifficulty = 0;
        var block = {};

        var blockUpdateSecond = 10; // Block 下次更新剩馀秒数

        Vue.filter('NumFormat', function (value) {
            value = String(value);
            if (!value) return '0';

            var intPart = Number(value).toFixed(0); //获取整数部分
            var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');

            return intPartFormat;
        });

        Vue.filter('hextoString', function (hex) {
            var string = '';
            hex = String(hex);
            for (var i = 0; i < hex.length; i += 2) {
                string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
            }
            return string;
        });

        var app = new Vue({
            el: '#app',
            data: {
                blocks: [],
                block: {},
                totalDifficulty: 0,
                transactions: []
            }
        });

        // 读入并新增一个 Block
        function insertBlock() {
            blockUpdateSecond = 10;
            var hash1 = new Hashes.SHA1;

            block = $.getJSON("dom.php", {}, function (result) {
                block = block.responseJSON;

                if (lastHeight == block.height) return;

                block.formatsize = formatNumberRgx(block.size);
                block.height = block.number;
                app.totalDifficulty += parseInt(block.difficulty);

                app.blocks.unshift(block);

                if (app.blocks.length > 6) {
                    app.blocks.pop()
                }

                if ($('.block').length > 3) {
                    $('.block:last').remove();
                    $('.block-modal:last').remove();
                }

                $('#blocks').prepend(
                    `
                        <div id="b${block.height}" onclick="showDetail(${block.height});" class="card block hide">
                            <div class="card-header">
                                #${block.height}
                            </div>
                            <div class="card-body">
                                <div class="card-title">
                                    Hash：${block.hash}
                                </div>
                                <p class="card-text">
                                    Size：${block.formatsize}
                                    <br />
                                    Gas used: ${block.gasUsed}
                                </p>
                                <small class="card-text text-muted">
                                    ${block.timestamp} ( ${block.TXn} )
                                </small>
                            </div>

                            <img src="chain.png" class="card-chain" />
                        </div>
                    `
                );

                if (block.TXn > 0) {
                    $("#b" + block.height).addClass('text-white bg-primary');
                    $("#b" + block.height + ' .text-muted').removeClass('text-muted');

                    block.transactions.forEach(elememt => {
                        elememt.timestamp = block.timestamp;
                        app.transactions.unshift(elememt);

                        if (app.transactions.length > 20) {
                            app.transactions.pop()
                        }
                    });
                }

                lastHeight = block.height;

                $('.block:first').show('fold', 1000);

            }, 'json');
        }

        // 显示区块详细
        function showDetail(height) {
            app.block = {};
            app.blocks.forEach(element => {
                if (element.height == height) {
                    app.block = element;
                }
            });

            $("#detail").modal('show');
        }

        // 区块更新倒数
        setInterval(function () {
            blockUpdateSecond--;
            $("#blockUpdateSecond").html(blockUpdateSecond);
        }, 1000);

        // 每 10 秒读入并新增一个 Block
        setInterval('insertBlock()', 10000);

        // setInterval(function () {
        //     var hash1 = new Hashes.SHA1;
        //     var hash256 = new Hashes.SHA256;

        //     const date = new Date();

        //     var transaction = {
        //         block: (Math.random() * Math.pow(10, 4)).toFixed(),
        //         timestamp: date.toLocaleString(),
        //         hash: '0x' + hash256.hex(Math.random()),
        //         from: '0x' + hash1.hex(Math.random()),
        //         to: '0x' + hash1.hex(Math.random())
        //     };

        //     app.transactions.unshift(transaction);

        //     if (app.transactions.length > 3) {
        //         app.transactions.pop()
        //     }
        // }, 10000);

        function formatNumberRgx(num) {
            var parts = num.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        };

        // 产生假英文名
        function generate() {
            var firstname = ["Marquis", "Samir", "Adrien", "Joyce", "Pierce", "Juliette", "Kelton", "Jacob", "Isiah",
                "Lindsay", "Kian", "Jordyn", "Jaquan", "Anya", "Wayne", "Khalil"
            ];
            var lastname = ["Mills", "Mercer", "Reeves", "Hines", "Sanford", "Irwin", "Koch", "Hinton", "Estes",
                "Jackson", "Lowe", "Guerra", "Pineda", "Franco", "Cowan", "Krause"
            ];
            var rand_first = Math.floor(Math.random() * firstname.length);
            var rand_last = Math.floor(Math.random() * lastname.length);

            return firstname[rand_first] + " " + lastname[rand_last];
        }

        $(function () {
            // 先读入 1 个 Blocks
            insertBlock();
        });
    </script>
</body>

</html>