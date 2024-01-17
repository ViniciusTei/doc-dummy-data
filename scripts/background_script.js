chrome.runtime.onMessage.addListener(function(message, sender, senderResponse) {
  const { url, type, ...props } = message
  if (type === "4devs") {
    fetch(url, props)
      .then(res => {
        return res.json();
      }).then(res => {
        senderResponse(res);
      })
  }
  return true
});
