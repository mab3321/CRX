console.log('This is BackGround')

// chrome.cookies.getAll({
//     domain: ".grammarly.com"
//   }, function (cookies) {
//     return cookies
//       }
//       );


// chrome.cookies.getAll({
//   domain: "grammarly.com/"
// }, function (cookies) {
//   for (var i = 0; i < cookies.length; i++) {
//     console.log(cookies[i] + "deleted");
//     chrome.cookies.remove({
//       url: "https://" + cookies[i].domain + cookies[i].path,
//       name: cookies[i].name
//     });
//   }
// });
chrome.action.onClicked.addListener(ButtonClicked)
function ButtonClicked(tab){
    chrome.tabs.query(
        {active: true, currentWindow: true},
         function(tabs) {
          tabs[0].msg = "hello"
          chrome.cookies.getAll({
                      domain: ".grammarly.com"
                    }, function (cookies) {
                      obj = []
                      for (i of cookies){obj.push(i)}
                      console.log(obj)
                      tabs[0].cookies = obj
                      chrome.tabs.sendMessage(tabs[0].id, tabs[0],
                      function(response) {
                          console.log("Msg Sent");
                          url = response.farewell
                          console.log(url)
                          addr = 'http://127.0.0.1:5500/test.json'
                          fetch(addr)
                                .then(result => result.json())
                                .then(result => {
                                  for (i of result){
                                    delete i['hostOnly']
                                    delete i['session']
                                    i.url = url
                                    chrome.cookies.set(i
                          ,(res)=>(console.log)
                        )
                                  }
                                })
                          
                              }
                              );
            
            
                    // chrome.cookies.getAll(
                    //     {domain: url})

                    
                            // , function (cookies) {
                            // for (var i = 0; i < cookies.length; i++) {
                            //     console.log(cookies[i] + "deleted");
                            //     chrome.cookies.remove({
                            //     url: "https://" + cookies[i].domain + cookies[i].path,
                            //     name: cookies[i].name
                            //     });
                            // }
                            // }
                      });

  });
}