chrome.runtime.onMessage.addListener(function(message, sender, senderResponse) {
  const { url, type, ...props } = message
  if (type === '4devs') {
    fetch(url, props)
      .then(res => {
        const contentType = res.headers.get("content-type")
        if (contentType.includes('html')) {
          return res.text()
        } else {
          return res.json()
        }
      }).then(res => {
        senderResponse(res);
      })
  }
  if (type === 'scrap') {
    console.log('scrpping that shit baby')
    const allInputs = document.querySelectorAll('input')
    console.log(allInputs.length)
    for (const input of allInputs) {
      console.log(input.id)
    }
  }

  if (type === 'clipboard') {
    var t = document.createElement("input");
    document.body.appendChild(t);
    t.focus();
    document.execCommand("paste");
    var clipboardText = t.value; //this is your clipboard data
    copyTextToClipboard("Hi" + clipboardText); //prepends "Hi" to the clipboard text
    document.body.removeChild(t);
  }
  return true
});

function copyTextToClipboard(text) {
  //Create a textbox field where we can insert text to. 
  var copyFrom = document.createElement("textarea");

  //Set the text content to be the text you wished to copy.
  copyFrom.textContent = text;

  //Append the textbox field into the body as a child. 
  //"execCommand()" only works when there exists selected text, and the text is inside 
  //document.body (meaning the text is part of a valid rendered HTML element).
  document.body.appendChild(copyFrom);

  //Select all the text!
  copyFrom.select();

  //Execute command
  document.execCommand('copy');

  //(Optional) De-select the text using blur(). 
  copyFrom.blur();

  //Remove the textbox field from the document.body, so no other JavaScript nor 
  //other elements can get access to this.
  document.body.removeChild(copyFrom);
}
