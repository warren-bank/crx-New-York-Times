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

var get_hash_code = function(str){
  var hash, i, char
  hash = 0
  if (str.length == 0) {
    return hash
  }
  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i)
    hash = ((hash<<5)-hash)+char
    hash = hash & hash  // Convert to 32bit integer
  }
  return Math.abs(hash)
}

var inject_function = function(_function){
  var inline, script, head

  inline = _function.toString()
  inline = '(' + inline + ')()' + '; //# sourceURL=crx_extension.' + get_hash_code(inline)
  inline = document.createTextNode(inline)

  script = document.createElement('script')
  script.appendChild(inline)

  head = document.head
  head.appendChild(script)
}

if (document.readyState === 'complete'){
  inject_function(payload)
}
else {
  document.addEventListener("DOMContentLoaded", function(event) {
    inject_function(payload)
  })
}
