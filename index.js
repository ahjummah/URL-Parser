/**
 *  Parses the given URL into its different components.
 *
 *  TODO: Implement this function.
 *  NOTE: You may implement additional functions as you need, as long as this
 *    function behaves as specified in the instructions. Have fun! :)
 **/

 /* DEFAULT PORTS
    HTTP: 80
    HTTPS: 443
*/

function parse(url) {

    var protocol = getScheme(url);
    var auth = getAuthority(url);

    // var pathname = getPath(url);
    // var queries = getQuery(url);
    // var frag = getFragment(url);

    return {
      scheme: protocol,
      authority: auth,
      // path: pathname
      // query: queries,
      // fragment: frag
    };
}


function getScheme(url){

    return url.split(":")[0];

}

function getAuthority(url){

  var user,pass,tmp;
  if(url.includes("//")){
    tmp = url.split("://")[1];
  }
  else {
    tmp = url.split(":/")[1];
  }

  if (tmp.includes("@")) {
      //AFTER PROTOCOL IS THE USER:PASS@HOST:PORT
    // console.log("USER: "+tmp);
    user = tmp.split(":")[0];
    if (user.includes("%")) { //THERE'S A UTF-8 DECODING REQUIREMENT
      alert(decodeURIComponent(user));
      user = decodeURIComponent(user);
    }
    pass = decodeURIComponent(tmp.split(":")[1].split("@")[0]);
    // console.log("PASS:" +pass);
    var hostname = tmp.split(":")[1].split("@")[1].split("/")[0];
    var portname = tmp.split("@")[1].split("/")[0].split(":");
    if (portname[1]!=null) {
      portname = portname[1];
    }else {
      if (url.split(":")[0]=="http") {
        portname = 80;
      }
      else if (url.split(":")[0]=="https") {
        portname = 443;
      }
    }

  }else {
     //AFTER PROTOCOL IS THE HOST
    //  console.log("HOST:" +tmp);
     user = null;
     pass = null;
     hostname =null;
     console.log(url+ ": "+tmp.split("/").length);
     //IF THAT IS GREATER THAN 2 AND THE NEXT CHARACTER AFTER / IS NOT EMPTY THEN IT HAS A PATH AND A HOST ELSE IT'S JUST A PATH
     if (tmp.split("/").length>2 && tmp.lastIndexOf("/")+1 !=null) {
       console.log("just host");
     }
     else {
       console.log("no")
     }
    //  console.log(url+": "+tmp.split("/")[0]);
    // if (tmp.split("/")[1].split(":").length>1) {
    //   console.log("2");
    // }
    //  hostname = tmp.split("/")[0];
    //  console.log(hostname);
    //  if (hostname.includes(":")) {
    //    hostname = hostname.split(":")[0];
    //    var portname = hostname.split(":")[1];
    //  }
  }

  // var portname = getPort(url);

  return {username: user,
          password:pass,
          host: hostname,
          port: portname
        }
}

function getPath(url){
  var pathname =  url.split("#")[0];
  pathname = (pathname.substr(pathname.lastIndexOf("/")+1).split("?")[0]);

  if(pathname==""){
    return '/';
  }
  else {
      return pathname;
  }
}

function getQuery(url){
  if(url.includes("?")){
    // var que = url.split("?")[1].split("#")[0];
    // var queries = que.split("=");
    alert(queries[1].replace(/\W+/g," "));

  }
  else
    return null;
}


function getFragment(url){
  return url.split("#")[1];
}
