// whatever kind of mobile test you wanna do.
if (screen.width < 500) {

  $("body").addClass("nohover");
  $("td, th")
    .attr("tabindex", "1")
    .on("touchstart", function() {
      $(this).focus();
    });

}

<!-- encrypt algorithm -->
var encryptVar = setInterval(encrypt, 50);
function encrypt() {
    var keyword = generateKeywordPos(document.getElementById("plainKeyword").value);
    var givenText = document.getElementById("plainInput").value;

    var result = "";
    for(var i = 0, j = 0; i < givenText.length; i++) {
      var curr = givenText.charCodeAt(i);
      if(isUppercase(curr)) {
        result += String.fromCharCode((curr - 65 + keyword[j % keyword.length]) % 26 + 65);
        j++;
      } else if(isLowercase(curr)) {
        result += String.fromCharCode((curr - 97 + keyword[j % keyword.length]) % 26 + 97);
        j++;
      } else {
        result += givenText.charAt(i);
      }
    }
    document.getElementById("cipherText").innerHTML = result;

    document.getElementById("plainGivenMessage").innerHTML = givenText;

    var resKey = "";
    var key = document.getElementById("plainKeyword").value;
    key = key.replace(/[\d\s\W]/g, '');
    var count = 0;
    for(var i = 0; i < givenText.length; i++) {
      var curr = givenText.charCodeAt(i);
      if(isLetter(curr)) {
        resKey += key.charAt(count % key.length);
        count++;
      } else {
        resKey += givenText.charAt(i);
      }
    }
    document.getElementById("plainResultKeyword").innerHTML = resKey;

}

<!-- decrypt algorithm -->
var decryptVar = setInterval(decrypt, 50);
function decrypt() {
    var keyword = generateKeywordPos(document.getElementById("cipherKeyword").value);

    for(var i = 0; i < keyword.length; i++) {
      keyword[i] = (26 - keyword[i] % 26);
    }

    var givenText = document.getElementById("cipherInput").value;

    var result = "";
    for(var i = 0, j = 0; i < givenText.length; i++) {
      var curr = givenText.charCodeAt(i);
      if(isUppercase(curr)) {
        result += String.fromCharCode((curr - 65 + keyword[j % keyword.length]) % 26 + 65);
        j++;
      } else if(isLowercase(curr)) {
        result += String.fromCharCode((curr - 97 + keyword[j % keyword.length]) % 26 + 97);
        j++;
      } else {
        result += givenText.charAt(i);
      }
    }
    document.getElementById("plainText").innerHTML = result;

    document.getElementById("cipherGivenMessage").innerHTML = givenText;

    var resKey = "";
    var key = document.getElementById("cipherKeyword").value;
    key = key.replace(/[\d\s\W]/g, '');
    var count = 0;
    for(var i = 0; i < givenText.length; i++) {
      var curr = givenText.charCodeAt(i);
      if(isLetter(curr)) {
        resKey += key.charAt(count % key.length);
        count++;
      } else {
        resKey += givenText.charAt(i);
      }
    }
    document.getElementById("cipherResultKeyword").innerHTML = resKey;

}

<!-- get an array of positions of letters in keyword -->
function generateKeywordPos(keyword) {
  var result = [];
  for(var i = 0; i < keyword.length; i++) {
    var curr = keyword.charCodeAt(i);
    if(isLetter(curr)) {
      result.push((curr - 65) % 32);
    }
  }
  return result;
}

// check if curr is an alphabet, be it upper or lower case
function isLetter(curr) {
	return isUppercase(curr) || isLowercase(curr);
}

// check if curr is upper case
function isUppercase(curr) {
	return curr >= 65 && curr <= 90;
}

// check if curr is lower case
function isLowercase(curr) {
	return curr >= 97 && curr <= 122;
}
