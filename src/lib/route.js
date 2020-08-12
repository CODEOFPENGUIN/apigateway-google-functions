module.exports = function (url, route, reqMethod, targetMethod) {
    const urlParts = url.split('/');
    const routeParts = route.split('/');
    console.log(reqMethod, targetMethod)
    if(reqMethod.toUpperCase() !== targetMethod.toUpperCase()){
        return false;
    } else {
        for (let i = 0, l = routeParts.length; i < l; i++) {
          const urlPart = urlParts[i];
          const routePart = routeParts[i];
      
          // Case 1: If either part is undefined => not match
          if (urlPart === undefined || routePart === undefined) { return false; }
      
          // Case 2: If route part is match all => match
          if (routePart === '*') { return true; }
       
          // Case 3: Exact match => keep checking
          if (urlPart === routePart) { continue; }
      
          // Case 4: route part is variable => keep checking
          if (routePart.startsWith('{')) { continue; }
        }
    }
  
    return true;
  }