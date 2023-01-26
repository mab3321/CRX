function download(strData, strFileName, strMimeType) {
    var D = document,
        A = arguments,
        a = D.createElement("a"),
        d = A[0],
        n = A[1],
        t = A[2] || "text/plain";

    //build download link:
    a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);


    if (window.MSBlobBuilder) { // IE10
        var bb = new MSBlobBuilder();
        bb.append(strData);
        return navigator.msSaveBlob(bb, strFileName);
    } /* end if(window.MSBlobBuilder) */



    if ('download' in a) { //FF20, CH19
        a.setAttribute("download", n);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function() {
            var e = D.createEvent("MouseEvents");
            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
            D.body.removeChild(a);
        }, 66);
        return true;
    }; /* end if('download' in a) */



    //do iframe dataURL download: (older W3)
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
    setTimeout(function() {
        D.body.removeChild(f);
    }, 333);
    return true;
}

function removeByClassName(element){
  parent = document.getElementsByClassName(element)
  if (parent){
      console.log(parent[0])
  }
  ret = parent[0].remove();
  if (ret){
      console.log("Subscription removed")
    }
}
function removeCookie(cookie){
    const day = 24 * 60 * 60 * 1000;
    for (i of cookie){
      i.expires = Date.now() - day
      cookieStore
      .set(i)
      .then(
          () => {},
          (reason) => {
          console.error("It failed: ", reason);
          }
      );
    }
    
}

function AddCookie(cookie){
    const day = 24 * 60 * 60 * 1000;
    for (i of cookie){
      cookieStore
      .set(i)
      .then(
          () => {},
          (reason) => {
          console.error("It failed: ", reason);
          }
      );
    }
    
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;domain=" + 
  window.location.hostname;
}
async function getAllCookies(){
  let cookies = await cookieStore.getAll();
  if(cookies === undefined) throw new Error("No cookies");
  else return cookies;
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    expression = "^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)"
    url = request.url
    if (request.msg == "hello"){
      console.log(request.url)
      domain = url.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/)[1]
      if (domain == "app.grammamrly.com"){
        addr = 'http://127.0.0.1:5500/test.json'

        fetch(addr)
              .then(result => result.json())
              .then(result => {
                for (i of result){
                  cookieStore.set({domain: 'grammarly.com', expires: i.expirationDate, name: i.name, path: i.path, sameSite:'lax', secure: i.secure,value:i.value})
                          .then(function() {
                          }, function(reason) {
                            console.error(
                              'It did not work, and this is why:',
                              reason);
                          });
                }
              })

        // removeCookies()

        buttonToRemoveGrammarly = "_95a0edad-index_navigation-logout _f736b103-index_navigation-item"
        removeByClassName(buttonToRemoveGrammarly)
        sendResponse({farewell: "Action taken For grammarly.com"});
      }
      else if (domain == "youtube.com"){
        buttonToRemoveYoutube = "yt-spec-button-shape-next yt-spec-button-shape-next--filled yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m "
        removeByClassName(buttonToRemoveYoutube)
        sendResponse({farewell: "Action taken for YouTube.com"});
      }
      else{
        // download(cookie,'new.txt',"text/plain")
        sendResponse({farewell: url});
        console.log('Response Sent');
        // console.log(request.cookies);
        // cookies = JSON.stringify(request.cookies)
        // console.log(cookies)
        // download(cookies,'new.txt','text/plain')
        // getAllCookies().then(result => {
        //   temp = []
        //   console.log("Starting")
        //   console.log(result)
        //   for (i of result){
        //     console.log(i)
        //     temp.push(JSON.stringify(i))
        //   }
        //   temp = '['+temp+']'
        //   download((temp), 'new.txt', 'text/plain');
        // addr = 'http://127.0.0.1:5500/new.txt'

        // fetch(addr)
        //       .then(result => result.json())
        //       .then(result => {
        //         AddCookie(result)
        //         console.log("Success Cookies Changed.")
        //         buttonToRemoveGrammarly = "_95a0edad-index_navigation-logout _f736b103-index_navigation-item"
        //         removeByClassName(buttonToRemoveGrammarly)
        // }
        //   )
        
        // getAllCookies().
        //   then(removeCookie).
        //   catch(function(reason) {
        //     console.log('No Cookies Error : '+ reason);
        //   })
        // console.log("Removed cookies")
        // console.log(document.cookie)
        // if(document.cookie === ''){
        //   console.log("No cookies")
        // }
        // addr = 'http://127.0.0.1:5500/test.json'

        // fetch(addr)
        //       .then(result => result.json())
        //       .then(result => {
        //         for (i of result){
        //           cookieStore.set({domain: 'grammarly.com', expires: i.expirationDate, name: i.name, path: i.path, sameSite:'lax', secure: i.secure,value:i.value})
        //                   .then(function() {
        //                   }, function(reason) {
        //                     console.error(
        //                       'It did not work, and this is why:',
        //                       reason);
        //                   });
        //         }
        //       })


      }
      
      if(request.url)
        console.log("Message Received")
        
    }
  }
);

// After Use
// obj = {}
//                 removeCookies()
//                 console.log("cookies Removed")
//                 for (i of result){
//                   domain = i.domain
//                   expirationDate =i.expirationDate
//                   hostOnly =i.hostOnly
//                   httpOnly =i.httpOnly
//                   nam =i.name
//                   path =i.path
//                   sameSite =i.sameSite
//                   secure =i.secure
//                   session =i.session
//                   storeId =i.storeId
//                   value =i.value

//                   str = encodeURIComponent(nam)+ `=${encodeURIComponent(value)}; expires=${expirationDate}; domain=` + domain + ' ;path=/'
//                   console.log(str)
//                   document.cookie = str
//                   obj[nam] = value

//                 }
//                 console.log("cookies Edited")
//                 // removeCookies()
//                 // console.log("Cookies Removed")
//                 // console.log(obj)
//                 // AddCookies(obj)