// ==UserScript==
// @name         New York Times
// @description  Read articles without a paywall.
// @version      0.1.0
// @match        *://*.nytimes.com/*
// @icon         https://www.nytimes.com/favicon.ico
// @run-at       document-idle
// @homepage     https://github.com/warren-bank/crx-New-York-Times
// @supportURL   https://github.com/warren-bank/crx-New-York-Times/issues
// @downloadURL  https://github.com/warren-bank/crx-New-York-Times/raw/greasemonkey-userscript/greasemonkey-userscript/New-York-Times.user.js
// @updateURL    https://github.com/warren-bank/crx-New-York-Times/raw/greasemonkey-userscript/greasemonkey-userscript/New-York-Times.user.js
// @namespace    warren-bank
// @author       Warren Bank
// @copyright    Warren Bank
// ==/UserScript==

// https://www.chromium.org/developers/design-documents/user-scripts

var payload = function(){
  // stop after 1 minute if no paywall is found when DOM is polled every 0.5 seconds
  let timeout = 120

  const remove_paywall = () => {
    document.querySelector('#gateway-content').remove()

    // .css-1bd8bfl
    document.querySelector('#app > div > div > div:nth-child(3)').remove()

    // .css-mcm29f
    document.querySelector('#app > div > div').className = ''
  }

  const test_paywall = () => {
    if (document.querySelector('#gateway-content'))
      remove_paywall()
    else
      run_timer()
  }

  const run_timer = () => {
    if (timeout > 0) {
      timeout--
      setTimeout(test_paywall, 500)
    }
  }

  run_timer()
}

var inject_payload = function(){
  var inline, script, head

  inline = document.createTextNode(
    '(' + payload.toString() + ')()'
  )

  script = document.createElement('script')
  script.appendChild(inline)

  head = document.getElementsByTagName('head')[0]
  head.appendChild(script)
}

if (document.readyState === 'complete'){
  inject_payload()
}
else {
  document.onreadystatechange = function(){
    if (document.readyState === 'complete'){
      inject_payload()
    }
  }
}
