var myVar = setInterval(makeTableau(), 50);
function makeTableau(keyword) {
  <!-- compute contents of Tableau -->
  alphabets = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
  keyword = keyword.toUpperCase();
  keyword = keyword.replace(/ /g, '');
  keyword = keyword.replace(/J/g, 'I');
  keyword = keyword.replace(/[\W\d]/g, '');

  str = keyword + alphabets;
  for (i = 0; i < alphabets.length; i++) {
    let = str.charAt(i);
    pos = str.indexOf(let, i+1);

    while(pos > -1) {
      str = str.substring(0, pos) + str.substring(pos+1, str.length);
      pos = str.indexOf(let, i+1);
    }
  }

  <!-- display tableau -->
  row = new Array();
  for (i = 0; i < 5; i++) {
    row[i] = "";
  }

  for (i = 0; i < 5; i++) {
    for (j = 0; j < 5; j++) {
      row[i] += str.charAt(5*i+j) + " ";
    }
  }

  result = "";

  for (i = 0; i < 5; i++) {
    result += row[i] + "\n";
  }

  return result;

}

function encrypt(plainText,keyword) {
  alphabets = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
  plainText = plainText.toUpperCase();
  plainText = plainText.replace(/[\W\d]/g, '');
  keyword = keyword.toUpperCase();
  keyword = keyword.replace(/ /g, '');
  keyword = keyword.replace(/J/g, 'I');
  keyword = keyword.replace(/[\W\d]/g, '');

  pos = plainText.indexOf(" ");
  while (pos > -1) {
    plainText = plainText.substring(0, pos) + plainText.substring(pos+1, plainText.length);
    pos = plainText.indexOf(" ");
  }

  pos = plainText.indexOf("?");
  while (pos > -1) {
    plainText = plainText.substring(0, pos) + plainText.substring(pos+1, plainText.length);
    pos = plainText.indexOf("?");
  }

  <!-- check both characters same, indent letter Y to seperate them -->
  for (i = 0; i < plainText.length; i+=2) {
    temp1 = plainText.charAt(i);
    temp2 = plainText.charAt(i+1);
    if (temp1 == temp2) {
      plainText = plainText.substring(0, i+1) + "Y" + plainText.substring(i+1, plainText.length);
    }
  }

  <!-- check length of plainText, append Y when odd -->
  if((plainText.length % 2) == 1) {
    plainText += 'Y';
  }

  <!-- handle letter J occurance in plainText -->
  pos = plainText.indexOf("J");
  while (pos > -1) {
    plainText = plainText.substring(0, pos) + "I" + plainText.substring(pos+1, plainText.length);
    pos = plainText.indexOf("J");
  }

  str = keyword + alphabets;
  for(i = 0; i < alphabets.length; i++) {
    let = str.charAt(i);
    pos = str.indexOf(let, i+1);

    while(pos > -1) {
      str = str.substring(0, pos) + str.substring(pos+1, str.length);
      pos = str.indexOf(let, i+1);
    }
  }

  row = new Array();
  for(i = 0; i < 5; i++) {
    row[i] = "";
  }

  for(i = 0; i < 5; i++) {
    for(j = 0; j < 5; j++) {
      row[i] += str.charAt(5*i+j);
    }
  }

  shift = 1;

  result = "";
  for (i = 0; i < plainText.length; i+=2) {
    pos1 = str.indexOf(plainText.charAt(i));
    pos2 = str.indexOf(plainText.charAt(i+1));

    x1 = pos1 % 5;
    y1 = Math.floor(pos1 / 5);
    x2 = pos2 % 5;
    y2 = Math.floor(pos2 / 5);

    if (y1 == y2) {
      x1 = (x1+shift) % 5;
      x2 = (x2+shift) % 5;
    } else if (x1 == x2) {
      y1 = (y1+shift) % 5;
      y2 = (y2+shift) % 5;
    } else {
      temp = x1;
      x1 = x2;
      x2 = temp;
    }

    result += row[y1].charAt(x1) + row[y2].charAt(x2);
  }

  var msg = "";
  for (i = 0; i < plainText.length; i++) {
    msg += plainText.charAt(i);
    if ((i+1) % 2 == 0) {
      msg += ' ';
    }
  }

  var finalResult = "";
  for(i = 0; i < result.length; i++) {
    finalResult += result.charAt(i);
    if ((i+1) % 2 == 0) {
      finalResult += ' ';
    }
  }
  document.getElementById('ciphertext').innerHTML = finalResult;

  return msg;
}

function decrypt(cipherText,keyword) {
  alphabets = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
  cipherText = cipherText.toUpperCase();
  cipherText = cipherText.replace(/[\W\d]/g, '');
  keyword = keyword.toUpperCase();
  keyword = keyword.replace(/ /g, '');
  keyword = keyword.replace(/J/g, 'I');
  keyword = keyword.replace(/[\W\d]/g, '');

  pos = cipherText.indexOf(" ");
  while (pos > -1) {
    cipherText = cipherText.substring(0, pos) + cipherText.substring(pos+1, cipherText.length);
    pos = cipherText.indexOf(" ");
  }

  pos = cipherText.indexOf("?");
  while (pos > -1) {
    cipherText = cipherText.substring(0, pos) + cipherText.substring(pos+1, cipherText.length);
    pos = cipherText.indexOf("?");
  }

  <!-- check both characters same, indent letter Y to seperate them -->
  for (i = 0; i < cipherText.length; i+=2) {
    temp1 = cipherText.charAt(i);
    temp2 = cipherText.charAt(i+1);
    if (temp1 == temp2) {
      cipherText = cipherText.substring(0, i+1) + "Y" + cipherText.substring(i+1, cipherText.length);
    }
  }

  <!-- check length of plainText, append Y when odd -->
  if((cipherText.length % 2) == 1) {
    plainText += 'Y';
  }

  <!-- handle letter J occurance in plainText -->
  pos = cipherText.indexOf("J");
  while (pos > -1) {
    cipherText = cipherText.substring(0, pos) + "I" + cipherText.substring(pos+1, cipherText.length);
    pos = cipherText.indexOf("J");
  }

  str = keyword + alphabets;
  for(i = 0; i < alphabets.length; i++) {
    let = str.charAt(i);
    pos = str.indexOf(let, i+1);

    while(pos > -1) {
      str = str.substring(0, pos) + str.substring(pos+1, str.length);
      pos = str.indexOf(let, i+1);
    }
  }

  row = new Array();
  for(i = 0; i < 5; i++) {
    row[i] = "";
  }

  for(i = 0; i < 5; i++) {
    for(j = 0; j < 5; j++) {
      row[i] += str.charAt(5*i+j);
    }
  }

  shift = 4;

  result = "";
  for (i = 0; i < cipherText.length; i+=2) {
    pos1 = str.indexOf(cipherText.charAt(i));
    pos2 = str.indexOf(cipherText.charAt(i+1));

    x1 = pos1 % 5;
    y1 = Math.floor(pos1 / 5);
    x2 = pos2 % 5;
    y2 = Math.floor(pos2 / 5);

    if (y1 == y2) {
      x1 = (x1+shift) % 5;
      x2 = (x2+shift) % 5;
    } else if (x1 == x2) {
      y1 = (y1+shift) % 5;
      y2 = (y2+shift) % 5;
    } else {
      temp = x1;
      x1 = x2;
      x2 = temp;
    }

    result += row[y1].charAt(x1) + row[y2].charAt(x2);
  }

  var msg = "";
  for (i = 0; i < cipherText.length; i++) {
    msg += cipherText.charAt(i);
    if ((i+1) % 2 == 0) {
      msg += ' ';
    }
  }

  var finalResult = "";
  for(i = 0; i < result.length; i++) {
    finalResult += result.charAt(i);
    if ((i+1) % 2 == 0) {
      finalResult += ' ';
    }
  }
  document.getElementById('plaintext').innerHTML = finalResult;

  return msg;
}
