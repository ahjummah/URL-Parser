  /**
   *  Parses the given URL into its different components.
   *
   *  TODO: Implement this function.
   *  NOTE: You may implement additional functions as you need, as long as this
   *    function behaves as specified in the instructions. Have fun! :)
   **/

  function parse(url) {

      var protocol = getScheme(url);
      var auth = getAuthority(url);
      var pathname = getPath(url);
      var query = getQuery(url);
      var frag = getFragment(url);

      return {
        scheme: protocol,
        authority: auth,
        path: pathname,
        query,
        fragment: frag
      };
  }

  function getScheme(url){
      return url.split(":")[0];
  }

  function getAuthority(url){

    var user,pass,tmp, hostname, portname;
    if(url.includes("//")){
      tmp = url.split("://")[1];
    }
    else {
      tmp = url.split(":/")[1];
    }

    if (tmp.includes("@")) {
      user = tmp.split(":")[0];
      if (user.includes("%")) { //THERE'S A UTF-8 DECODING REQUIREMENT
        alert(decodeURIComponent(user));
        user = decodeURIComponent(user);
      }
      pass = decodeURIComponent(tmp.split(":")[1].split("@")[0]);
      hostname = tmp.split(":")[1].split("@")[1].split("/")[0];
      portname = tmp.split("@")[1].split("/")[0].split(":");
      if (portname[1]!=null) {
        portname = portname[1];
      }else {
        if (url.split(":")[0]=="http") {
          portname = '80';
        }
        else if (url.split(":")[0]=="https") {
          portname = '443';
        }
      }

    }else {
       user = null;
       pass = null;
       hostname =null;
       portname = null;

       var size = tmp.split("/").length;
       var c = url.charAt(url.lastIndexOf("/")+1);
       if (tmp.includes(":")) {
         hostname = tmp.split(":")[0];
         portname = tmp.split(":")[1].split("/")[0];
         if (((/(.)\1{9,}/)).test(portname)) {
           portname = portname.charAt(0);
         }
       }
       else {
         if (size>1 ) {
           if (tmp.split("/")[size-1].includes("?")||tmp.split("/")[size-1].includes("#")) {
             hostname = tmp.split("/")[0];
             if (hostname.includes(":")) {
               portname = hostname.split(":")[1];
             }
             else {
               if (url.split(":")[0]=="http") {
                 portname = '80';
               }
               else if (url.split(":")[0]=="https") {
                 portname = '443';
               }
             }
           }
           else {
            //  do nothing
           }
         }
         else if(size==1){
           //it's a path
         }
      }
    }

    return {username: user,
            password:pass,
            host: hostname,
            port: portname
          }
  }

  function getPath(url){
    var tmp;
    if(url.includes("//")){
      tmp = url.split("://")[1];
      var pathname = tmp.substr(tmp.indexOf("/"));

      if (pathname.includes("?")){
        pathname = pathname.split("?")[0];
      }
      if (pathname.includes("#")) {
          pathname = pathname.split("#")[0];
      }

      if (pathname=="")
        pathname="/";
      return pathname;
    }
    else {
      tmp = url.split(":");
      var pathname = tmp[1];

      if (pathname.includes("?")){
        pathname = pathname.split("?")[0];
      }
      if (pathname.includes("#")) {
          pathname = pathname.split("#")[0];
      }

      if (pathname=="")
        pathname="/";
      return pathname;
    }
  }

  function getQuery(url){
    var q;
    if(url.includes("?")){
      if (url.includes("#")) {
        q =  url.split("?")[1].split("#")[0];
      }else {
        q =  url.split("?")[1];
      }
      if (q.includes("&")) {
        var query = {};
        var queries = q.split("&");
        var j = 0;
        for (var i = 0; i < queries.length; i++) {
          var tmp = queries[i].split("=");
          query[tmp[j]] = tmp[j+1];

        }

        return query;

      }

    else{
    if (q.includes("%")) { //THERE'S A UTF-8 DECODING REQUIREMENT
        q = decodeURIComponent(q);
    }


    var temp = q.split("=");
    var query = {};
    query[temp[0]] = temp[1];
    return query;
    }
    }else {
      return null;
    }
  }

  function getFragment(url){
    if (url.includes("#")) {
      if (url.split("#")[1]!=null) {
        return url.split("#")[1];
      }
    }
    else {
      return null;
    }
  }
