/*Output Divs*/
let outputDivAddress = document.getElementById('outputDivAddress');
let outputDivTx = document.getElementById('outputDivTx');
let outputDivBlock = document.getElementById('outputDivBlock');

$('#cardList a').on('click', function (e) {
    $(this).tab('show')
    outputDivAddress.style.display = 'none'
})
/*Output Divs*/

/*Buttons*/
let addressBtn = document.getElementById('addrBtn');
let txBtn = document.getElementById('txBtn');
let blockBtn = document.getElementById('blockBtn');
/*Buttons*/

/*Inputs*/
let addressInput = document.getElementById('addressInput');
let transactionInput = document.getElementById('transactionInput');
let blockInput = document.getElementById('blockInput');
/*Inputs*/

addressBtn.addEventListener("click", function () {
    if (addressInput.value.length == 0) {
    }
    else {
        $.getJSON('https://explorerbitcoin.herokuapp.com/https://chain.api.btc.com/v3/address/' + addressInput.value, function (data) {
            let address = data.data.address;
            let balance = data.data.balance / 100000000;
            let received = data.data.received / 100000000;
            let sent = data.data.sent / 100000000;
            let txCount = data.data.tx_count;

            document.getElementById("address_paragraph").innerHTML = 'Address: ' + address;
            document.getElementById("tx_paragraph").innerHTML = 'Transactions: ' + txCount;
            document.getElementById("total_received_paragraph").innerHTML = 'Total Received: ' + received + ' BTC';
            document.getElementById("total_sent_paragraph").innerHTML = 'Total Sent: ' + sent + ' BTC';
            document.getElementById("balance_paragraph").innerHTML = 'Balance: ' + balance + ' BTC';
            
            outputDivTx.style.display = 'none';
            outputDivBlock.style.display = 'none'
            outputDivAddress.style.display = 'block';
        });
    }
})

txBtn.addEventListener("click", function () {
    if (transactionInput.value.length == 0) {
    }
    else {
        $.getJSON('https://explorerbitcoin.herokuapp.com/https://chain.api.btc.com/v3/tx/' + transactionInput.value, function (data) {
            let block_height = data.data.block_height;
            let block_time = data.data.block_time;
            let confirmations = data.data.confirmations;
            let fee = data.data.fee / 100000000;
            let hash = data.data.hash;
            let inputs_value = data.data.inputs_value / 100000000;
            let outputs_value = data.data.outputs_value / 100000000;
            let prev_addresses = data.data.inputs[0];
            let addresses = data.data.outputs[0];

            let date = new Date(block_time * 1000);

            if (block_height == -1) {
                document.getElementById("status").innerHTML = 'Status: Unconfirmed';
                let time = document.getElementById("block_time");
                time.style.display = 'none';
                document.getElementById("confirmations").innerHTML = 'Confirmations: 0';
            }
            else {
                document.getElementById("status").innerHTML = 'Status: Confirmed';
                document.getElementById("block_time").innerHTML = 'Timestamp : ' + date;
                document.getElementById("confirmations").innerHTML = 'Confirmations: ' + confirmations;
            }

            document.getElementById("prev_addresses").innerHTML = 'From: ' + prev_addresses.prev_addresses;
            document.getElementById("addresses").innerHTML = 'To: ' + addresses.addresses;
            document.getElementById("fee").innerHTML = 'Fee: ' + fee + ' BTC';
            document.getElementById("hash").innerHTML = 'Tx hash: ' + hash;
            document.getElementById("inputs_value").innerHTML = 'Total Input: ' + inputs_value + ' BTC';
            document.getElementById("outputs_value").innerHTML = 'Total Output: ' + outputs_value + ' BTC'

            outputDivAddress.style.display = 'none';
            outputDivBlock.style.display = 'none'
            outputDivTx.style.display = 'block';
            
        });
    }
})

blockBtn.addEventListener("click", function () {
    if (blockInput.value.length == 0) {
    }
    else {
        $.getJSON('https://explorerbitcoin.herokuapp.com/https://chain.api.btc.com/v3/block/' + blockInput.value, function (data) {
            let timestamp = data.data.timestamp;
            let hash = data.data.hash;
            let height = data.data.height;
            let size = data.data.size;
            let difficulty = data.data.difficulty / 100000000;
            let pool_difficulty = data.data.pool_difficulty / 100000000;
            let tx_count = data.data.tx_count;
            let reward_block = data.data.reward_block / 100000000;
            let reward_fees = data.data.reward_fees / 100000000;
            let confirmations = data.data.confirmations;
            let pool_name = data.data.extras.pool_name;
            let pool_link = data.data.extras.pool_link;

            let date = new Date(timestamp * 1000);

            document.getElementById("hashBlock").innerHTML = 'Hash: ' + hash;
            document.getElementById("height").innerHTML = 'Height: ' + height
            document.getElementById("timestamp").innerHTML = 'Timestamp: ' + date
            document.getElementById("size").innerHTML = 'Size: ' + size + ' Bytes'
            document.getElementById("difficulty").innerHTML = 'Difficulty: ' + difficulty
            document.getElementById("pool_difficulty").innerHTML = 'Pool difficulty: ' + pool_difficulty
            document.getElementById("tx_count").innerHTML = 'Transactions: ' + tx_count
            document.getElementById("reward_block").innerHTML = 'Reward block: ' + reward_block
            document.getElementById("reward_fees").innerHTML = 'Reward fees: ' + reward_fees
            document.getElementById("confirmations_block").innerHTML = 'Confirmations: ' + confirmations
            document.getElementById("pool_name").innerHTML = 'Miner: ' + pool_name
            document.getElementById("pool_link").innerHTML = 'Pool link: <a href=' + pool_link + '>' + pool_link + '</a>';

            outputDivTx.style.display = 'none';
            outputDivAddress.style.display = 'none';
            outputDivBlock.style.display = 'block'
        });
    }
})