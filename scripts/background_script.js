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
  var copyFrom = document.createElement("textarea");
  copyFrom.textContent = text;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  copyFrom.blur();
  document.body.removeChild(copyFrom);
}
