
// load history from local storage
var messageHistory = sessionStorage.getItem("messageHistory");
if (messageHistory == null) {
    messageHistory = new Array();
} else {
    messageHistory = JSON.parse(messageHistory);
}

for (i = 0; i < messageHistory.length; i++) {
    $("#history").prepend("<pre>" + messageHistory[i] + "</pre>");
}

function addHistory(input) {
    $("#history").prepend("<pre>" + input + "</pre>");
    
    messageHistory.push(input);
    if (messageHistory.length > 20) {
        messageHistory.shift();
    }
    sessionStorage.setItem("messageHistory", JSON.stringify(messageHistory));
}

$("#encodeButton").on("click", function(e) {
    var plain = $("#textarea").val();
    var encoded = btoa(plain);
    $("#textarea").val(encoded);
    addHistory(plain, encoded);
});

$("#decodeButton").on("click", function(e) {
    var encoded = $("#textarea").val();
    var plain = atob(encoded);
    $("#textarea").val(plain);
    addHistory(encoded, plain);
});

$(document).delegate('#textarea', 'keydown', function(e) {
  var keyCode = e.keyCode || e.which;

  if (keyCode == 9) {
    e.preventDefault();
    var start = $(this).get(0).selectionStart;

    // set textarea value to: text before caret + tab + text after caret
    $(this).val($(this).val().substring(0, start)
        + "    " + $(this).val().substring(start));

    // put caret at right position again
    $(this).get(0).selectionStart = $(this).get(0).selectionEnd = start + 4;
  }
});
