<!-- encrypt algorithm -->
var encryptVar = setInterval(encrypt, 50);
function encrypt() {
    var shiftString = document.getElementById("shift").value;
    var plain = document.getElementById("plainInput").value;
    var result = "";
    var shift = parseInt(shiftString,10);

    for(var i = 0; i < plain.length; i++) {
        var curr = plain.charCodeAt(i);
        if(curr >= 65 && curr <= 90) {
            result += String.fromCharCode((curr - 65 + shift) % 26 + 65);
        } else if (curr >= 97 && curr <= 122) {
            result += String.fromCharCode((curr - 97 + shift) % 26 + 97);
        } else {
            result += plain.charAt(i);
        }
    }

    document.getElementById("cipherText").innerHTML = result;
}

<!-- decrypt algorithm -->
var decryptVar = setInterval(decrypt, 50);
function decrypt() {
    var shiftString = document.getElementById("shift").value;
    var plain = document.getElementById("cipherInput").value;
    var result = "";
    var shift = parseInt(shiftString,10);
    shift = (26 - shift) % 26;

    for(var i = 0; i < plain.length; i++) {
        var curr = plain.charCodeAt(i);
        if(curr >= 65 && curr <= 90) {
            result += String.fromCharCode((curr - 65 + shift) % 26 + 65);
        } else if (curr >= 97 && curr <= 122) {
            result += String.fromCharCode((curr - 97 + shift) % 26 + 97);
        } else {
            result += plain.charAt(i);
        }
    }

    document.getElementById("plainText").innerHTML = result;
}
