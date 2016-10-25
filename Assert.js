 function assert(a, b) {
   if(a != b) {
    console.log("fail, a = "+a + ", b = " +b);
    return false;
  }
  else {
  console.log("succeeded, a = "+a + ", b = " +b);
  return true;
  }
 }
