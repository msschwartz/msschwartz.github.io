console.log('This would be the main JS file.');

var messageHistory = sessionStorage.getItem("messageHistory");
if (messageHistory == null) {
    messageHistory = new Array();
} else {
    messageHistory = JSON.parse(messageHistory);
}

for (i = 0; i < messageHistory.length; i++) {
    $("#history").append(messageHistory[i]);
}

function addHistory(input, output) {
    var message = "<pre>" + input + "\n" + output + "</pre>";
    $("#history").append(message);
    messageHistory.push(message);
    sessionStorage.setItem("messageHistory", JSON.stringify(messageHistory));
}

$("#encodeButton").on("click", function(e) {
    var plain = $("#plainTextarea").val();
    var encoded = btoa(plain);
    $("#encodedTextarea").val(encoded);
    addHistory(plain, encoded);
});

$("#decodeButton").on("click", function(e) {
    var encoded = $("#encodedTextarea").val();
    var plain = atob(encoded);
    $("#plainTextarea").val(plain);
    addHistory(encoded, plain);
});

$(document).delegate('#plainTextarea', 'keydown', function(e) {
  var keyCode = e.keyCode || e.which;

  if (keyCode == 9) {
    e.preventDefault();
    var start = $(this).get(0).selectionStart;
    var end = $(this).get(0).selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    $(this).val($(this).val().substring(0, start)
        + "    " + $(this).val().substring(end));

    // put caret at right position again
    $(this).get(0).selectionStart =
    $(this).get(0).selectionEnd = start + 1;
  }
});
