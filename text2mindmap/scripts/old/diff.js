/* 
Simple Diff for version 1.0 (ported to JavaScript)

Annotate two versions of a list with the values that have been
changed between the versions, similar to unix's `diff` but with
a dead-simple JavaScript interface.

JavaScript port by DJ Mountney (twk3) based on code by Paul Butler.

(C) 2008-2012 <http://www.paulbutler.org/>
May be used and distributed under the zlib/libpng license
<http://www.opensource.org/licenses/zlib-license.php>
*/
var diff=function(d,c){var b={},a;for(a=0;a<d.length;a++)b[d[a]]=b[d[a]]||[],b[d[a]].push(a);var f=[],e,g,h,j;for(j=e=g=h=0;j<c.length;j++){var l=[];b[c[j]]=b[c[j]]||[];for(a=0;a<b[c[j]].length;a++){var k=b[c[j]][a];l[k]=(k&&f[k-1]||0)+1;l[k]>h&&(h=l[k],e=k-h+1,g=j-h+1)}f=l}return 0===h?(b=[],d.length&&b.push(["-",d]),c.length&&b.push(["+",c]),b):[].concat(diff(d.slice(0,e),c.slice(0,g)),[["=",c.slice(g,g+h)]],diff(d.slice(e+h),c.slice(g+h)))},stringDiff=function(d,c){return diff(d.split(/[ ]+/),
c.split(/[ ]+/))},htmlDiff=function(d,c){var b,a,f,e=[];b={"=":function(a){return a},"+":function(a){return"<ins>"+a+"</ins>"},"-":function(a){return"<del>"+a+"</del>"}};a=stringDiff(d,c);for(f=0;f<a.length;f++){var g=a[f];e.push(b[g[0]](g[1].join(" ")))}return e.join(" ")},checkDiff=function(d,c){d=[d];c=[c];var b=diff(d,c),a=[],f=[],e;for(e=0;e<b.length;e++)switch(b[e][0]){case "-":a=a.concat(b[e][1]);break;case "+":f=f.concat(b[e][1]);break;default:a=a.concat(b[e][1]),f=f.concat(b[e][1])}console.assert(JSON.stringify(d)===
JSON.stringify(a),"Expected",d,"got",a);console.assert(JSON.stringify(c)===JSON.stringify(f),"Expected",c,"got",f)};"object"===typeof module&&(module.exports={diff:diff,htmlDiff:htmlDiff,stringDiff:stringDiff,checkDiff:checkDiff});