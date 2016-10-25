function FiFoStack()
{
 this.stac=new Array();
 
 this.pop=function(){
  return this.stac.pop();
 }
 
 this.unshift=function(item){
  this.stac.unshift(item);
 }
 
 this.size=function(){
  var ret = this.stac.length;
  return ret;
 }
}

/* function test1() {
 console.log("Test started");
 
 var stack = new FiFoStack();
 stack.push(1);
 var size1 = stack.size();
 assert(size1,1);
 stack.push(2);
 size1 = stack.size();
 assert(size1,2);
 var p1 = stack.pop();
 assert(p1,1);
 size1 = stack.size();
 assert(size1,1);
  stack.push(3);
   stack.push(4);
    stack.push(5);
	 stack.push(6);
var p2 = stack.pop();
 assert(p2,2);	 

}

test1(); */


