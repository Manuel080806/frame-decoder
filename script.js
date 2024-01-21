window.addEventListener('DOMContentLoaded' , function(){
    let button = document.getElementById("button");
    let inputtext = document.getElementById("input");
    inputtext.onkeyup = function(){
        chek();
    }
    button.onclick = function (){
        analyze();
    }
})
function analyze(){
    let output = document.getElementById("result");
    let inputtext = document.getElementById("input").value;
    let arr= inputtext.split(" ");
    let bool = chek();
    if (bool) {
        result = "";
        result += type(arr);
        if (type(arr)=="Frame Ethernet 2 <br>") {
            result += two(arr);
            result += domain(arr);
            output.innerHTML = result;
        }
        if(type(arr)=="Frame 802.3 <br>"){
            result += eight(arr);
            result += domain(arr);
            output.innerHTML = result;
        }
    }
    if(!bool){
        output.innerHTML = " errore nel inserimento della trama ";
    }
}
function chek(){
    let output = document.getElementById("result");
    let inputtext = document.getElementById("input").value;
    let array= inputtext.split(" ");
    let counter = 0;
    array.forEach(element => {
        let regex = /^[0-9abcdef]+$/i ;
        if(regex.test(element)){
            document.getElementById("input").classList.remove("error");
            counter++;
        }
        else{
            document.getElementById("input").classList.add("error");
            output.innerHTML = " errore nel inserimento della trama ";
        }
    });
    if(counter==array.length){
        return true;
    }
    else{
        return false
    }
}
function type(array){
    if(array.length< 16){
        return "errore nel inserimento della trama";
    }
    let firstbytes = array[12]+array[13];
    if (parseInt(firstbytes,16)<=1500) {
        return "Frame 802.3 <br>";
    }
    if (parseInt(firstbytes,16)>1500) {
        return "Frame Ethernet 2 <br>";
    }
}
function two(array){
    let firstbytes = array[12]+array[13];
    switch (firstbytes.toUpperCase()) {
        case '0800':
            return 'Ethertype IPv4 <br>';
        case '0806':
            return 'Ethertype ARP <br>';
        case '8035':
            return 'Ethertype RARP <br>';
        case '809B':
            return 'Ethertype Ethertalk <br>';
        case '8100':
            return 'Ethertype IEEE 802.1Q <br>';
        case '814C':
            return 'Ethertype SNMP <br>';
        case '86DD':
            return 'Ethertype IPv6 <br>';
        case '8808':
            return 'Ethertype MAC Control <br>';
        case '8809':
            return 'Ethertype LACP <br>';
        case '8847':
            return 'Ethertype MPLS <br>';
        case '8863':
            return 'Ethertype PPPoE <br>';
        case '8870':
            return 'Ethertype Jumbo Frames <br>';
        default:
            return 'no Ethertype found <br>';
    }
}
function domain(array) {
    let firstByte=array[0];
    let destAddress=array[0]+array[1]+array[2]+array[3]+array[4]+array[5];
    if (destAddress.toUpperCase()=='FFFFFFFFFFFF') {
        return 'Broadcast <br>';
    }
    firstByte=parseInt(firstByte,16).toString(2).padStart(8,'0');
    if (firstByte.charAt(7)=='0') {
        return 'Unicast <br>';
    }
    if (firstByte.charAt(7)=='1') {
        if (firstByte.charAt(6)=='0') {
            return 'Multicast Universal <br>';
        }
        if (firstByte.charAt(6)=='1') {
            return 'Multicast Local <br>';
        }
    }
}
function eight(array){
    let secondbytes=array[14]+array[15];
    switch (secondbytes.toUpperCase()) {
        case 'AAAA':
            return 'LLC SAP SNAP <br>';
        case 'F0F0':
            return 'LLC SAP Netbios <br>';
        case 'E0E0':
            return 'LLC SAP IPX Novell <br>';
        case '0606':
            return 'LLC SAP IPv4 <br>';
        case '4242':
            return 'LLC SAP STP (IEEE 802.1D) <br>';
        default:
            return 'no LLC SAP found <br>';
    }
}