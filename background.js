// this is the background page!

if (typeof chrome !== "undefined") {
  var browser = chrome;
}

browser.runtime.onMessage.addListener(onMessage);

function onMessage(messageEvent, sender, callback)
{
    if (messageEvent.name == "updateCounter")
    {
        if ("counterValue" in messageEvent) {
			chrome.browserAction.setBadgeText({text: messageEvent.counterValue.toString()});
		}
    }
    else if (messageEvent.name == "getCounter")
    {
        chrome.browserAction.getBadgeText({}, function(result)
        {
            callback(result);
        });
    }
}
browser.webRequest.onHeadersReceived.addListener(function(details)
{
    console.log(details);
    for (var i = 0; i < details.responseHeaders.length; ++i) 
    {
        if (details.responseHeaders[i].name.toLowerCase() == "content-security-policy")
        {
            var cspValue = details.responseHeaders[i].value;
            var entries = cspValue.split(";");
            for (var j = 0; j < entries.length; j++)
            {
                if (entries[j].includes("script-src"))
                {
                    // a hack to allow the page to load our injected inline scripts
                    entries[j] = entries[j].replaceAll(/'(nonce|sha\d+)-[a-zA-Z0-9+\/=]+'/g, '');
                    entries[j] += " 'unsafe-inline'";
                }
            }

            details.responseHeaders[i].value = entries.join(";");
            console.log(details.responseHeaders);
        }
    }

    return {responseHeaders: details.responseHeaders};

}, {urls: ["<all_urls>"]}, ["blocking", "responseHeaders"]);
