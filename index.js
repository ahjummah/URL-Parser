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
      var pathname = getPath(url);
      var query = getQuery(url);
      console.log(query);
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
        //AFTER PROTOCOL IS THE USER:PASS@HOST:PORT
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
          portname = 80;
        }
        else if (url.split(":")[0]=="https") {
          portname = 443;
        }
      }

    }else {
       //AFTER PROTOCOL IS THE HOST
       user = null;
       pass = null;
       hostname =null;
       portname = null;

       //IF THAT IS GREATER THAN 2 AND THE NEXT CHARACTER AFTER / IS NOT EMPTY THEN IT HAS A PATH AND A HOST ELSE IT'S JUST A PATH
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
        //  console.log(tmp.split("/"));
         if (size>1 ) {
           if (tmp.split("/")[size-1].includes("?")||tmp.split("/")[size-1].includes("#")) {
            //  console.log(tmp + " "+ "hostname ok");
             hostname = tmp.split("/")[0];
             if (hostname.includes(":")) {
               portname = hostname.split(":")[1];
             }
             else {
               if (url.split(":")[0]=="http") {
                 portname = 80;
               }
               else if (url.split(":")[0]=="https") {
                 portname = 443;
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
    }
    else {
      tmp = url.split(":/")[1];
    }
    // console.log(tmp);
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

  function getQuery(url){
    var q;
    if(url.includes("?")){
      if (url.includes("#")) {
        q =  url.split("?")[1].split("#")[0];
      }else {
        q =  url.split("?")[1];
      }

    if (q.includes("%")) { //THERE'S A UTF-8 DECODING REQUIREMENT
        q = decodeURIComponent(q);
    }

    var queries = q.split("=");
    var a = queries[0];
    return{
      a: queries[1]
    };
    }else {
      return null;
    }
  }


  function getFragment(url){
    if (url.split("#")[1]!=null) {
      return url.split("#")[1];
    }
    else {
      return null;
    }
  }
