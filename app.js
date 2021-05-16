let outputDivAddress = document.getElementById('outputDivAddress');


$('#cardList a').on('click', function (e) {
    $(this).tab('show')
    outputDivAddress.style.display = 'none'
})

/*0*/

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
        $.getJSON('https://chain.api.btc.com/v3/address/' + addressInput.value, function (data) {
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
            outputDivAddress.style.display = 'block';
        });
    }
})

txBtn.addEventListener("click", function () {
    if (transactionInput.value.length == 0) {
    }
    else {
        $.getJSON('https://chain.api.btc.com/v3/tx/' + transactionInput.value, function (data) {
            let block_height = data.data.block_height;
            let block_time = data.data.block_time;
            let confirmations = data.data.confirmations;
            let fee = data.data.fee / 100000000;
            let hash = data.data.hash;
            let inputs_value = data.data.inputs_value / 100000000;
            let outputs_value = data.data.outputs_value / 100000000;
            let prev_addresses = data.data.inputs[0];
            let addresses = data.data.outputs[0];

            let date = new Date(block_time*1000);

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

            outputDivTx.style.display = 'block';
        });
    }
})