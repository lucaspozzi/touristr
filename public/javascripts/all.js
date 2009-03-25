/*
 * jQuery 1.2.6 - New Wave Javascript
 *
 * Copyright (c) 2008 John Resig (jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * $Date: 2008-05-24 14:22:17 -0400 (Sat, 24 May 2008) $
 * $Rev: 5685 $
 */
(function(){var _jQuery=window.jQuery,_$=window.$;var jQuery=window.jQuery=window.$=function(selector,context){return new jQuery.fn.init(selector,context);};var quickExpr=/^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/,isSimple=/^.[^:#\[\.]*$/,undefined;jQuery.fn=jQuery.prototype={init:function(selector,context){selector=selector||document;if(selector.nodeType){this[0]=selector;this.length=1;return this;}if(typeof selector=="string"){var match=quickExpr.exec(selector);if(match&&(match[1]||!context)){if(match[1])selector=jQuery.clean([match[1]],context);else{var elem=document.getElementById(match[3]);if(elem){if(elem.id!=match[3])return jQuery().find(selector);return jQuery(elem);}selector=[];}}else
return jQuery(context).find(selector);}else if(jQuery.isFunction(selector))return jQuery(document)[jQuery.fn.ready?"ready":"load"](selector);return this.setArray(jQuery.makeArray(selector));},jquery:"1.2.6",size:function(){return this.length;},length:0,get:function(num){return num==undefined?jQuery.makeArray(this):this[num];},pushStack:function(elems){var ret=jQuery(elems);ret.prevObject=this;return ret;},setArray:function(elems){this.length=0;Array.prototype.push.apply(this,elems);return this;},each:function(callback,args){return jQuery.each(this,callback,args);},index:function(elem){var ret=-1;return jQuery.inArray(elem&&elem.jquery?elem[0]:elem,this);},attr:function(name,value,type){var options=name;if(name.constructor==String)if(value===undefined)return this[0]&&jQuery[type||"attr"](this[0],name);else{options={};options[name]=value;}return this.each(function(i){for(name in options)jQuery.attr(type?this.style:this,name,jQuery.prop(this,options[name],type,i,name));});},css:function(key,value){if((key=='width'||key=='height')&&parseFloat(value)<0)value=undefined;return this.attr(key,value,"curCSS");},text:function(text){if(typeof text!="object"&&text!=null)return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text));var ret="";jQuery.each(text||this,function(){jQuery.each(this.childNodes,function(){if(this.nodeType!=8)ret+=this.nodeType!=1?this.nodeValue:jQuery.fn.text([this]);});});return ret;},wrapAll:function(html){if(this[0])jQuery(html,this[0].ownerDocument).clone().insertBefore(this[0]).map(function(){var elem=this;while(elem.firstChild)elem=elem.firstChild;return elem;}).append(this);return this;},wrapInner:function(html){return this.each(function(){jQuery(this).contents().wrapAll(html);});},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html);});},append:function(){return this.domManip(arguments,true,false,function(elem){if(this.nodeType==1)this.appendChild(elem);});},prepend:function(){return this.domManip(arguments,true,true,function(elem){if(this.nodeType==1)this.insertBefore(elem,this.firstChild);});},before:function(){return this.domManip(arguments,false,false,function(elem){this.parentNode.insertBefore(elem,this);});},after:function(){return this.domManip(arguments,false,true,function(elem){this.parentNode.insertBefore(elem,this.nextSibling);});},end:function(){return this.prevObject||jQuery([]);},find:function(selector){var elems=jQuery.map(this,function(elem){return jQuery.find(selector,elem);});return this.pushStack(/[^+>] [^+>]/.test(selector)||selector.indexOf("..")>-1?jQuery.unique(elems):elems);},clone:function(events){var ret=this.map(function(){if(jQuery.browser.msie&&!jQuery.isXMLDoc(this)){var clone=this.cloneNode(true),container=document.createElement("div");container.appendChild(clone);return jQuery.clean([container.innerHTML])[0];}else
return this.cloneNode(true);});var clone=ret.find("*").andSelf().each(function(){if(this[expando]!=undefined)this[expando]=null;});if(events===true)this.find("*").andSelf().each(function(i){if(this.nodeType==3)return;var events=jQuery.data(this,"events");for(var type in events)for(var handler in events[type])jQuery.event.add(clone[i],type,events[type][handler],events[type][handler].data);});return ret;},filter:function(selector){return this.pushStack(jQuery.isFunction(selector)&&jQuery.grep(this,function(elem,i){return selector.call(elem,i);})||jQuery.multiFilter(selector,this));},not:function(selector){if(selector.constructor==String)if(isSimple.test(selector))return this.pushStack(jQuery.multiFilter(selector,this,true));else
selector=jQuery.multiFilter(selector,this);var isArrayLike=selector.length&&selector[selector.length-1]!==undefined&&!selector.nodeType;return this.filter(function(){return isArrayLike?jQuery.inArray(this,selector)<0:this!=selector;});},add:function(selector){return this.pushStack(jQuery.unique(jQuery.merge(this.get(),typeof selector=='string'?jQuery(selector):jQuery.makeArray(selector))));},is:function(selector){return!!selector&&jQuery.multiFilter(selector,this).length>0;},hasClass:function(selector){return this.is("."+selector);},val:function(value){if(value==undefined){if(this.length){var elem=this[0];if(jQuery.nodeName(elem,"select")){var index=elem.selectedIndex,values=[],options=elem.options,one=elem.type=="select-one";if(index<0)return null;for(var i=one?index:0,max=one?index+1:options.length;i<max;i++){var option=options[i];if(option.selected){value=jQuery.browser.msie&&!option.attributes.value.specified?option.text:option.value;if(one)return value;values.push(value);}}return values;}else
return(this[0].value||"").replace(/\r/g,"");}return undefined;}if(value.constructor==Number)value+='';return this.each(function(){if(this.nodeType!=1)return;if(value.constructor==Array&&/radio|checkbox/.test(this.type))this.checked=(jQuery.inArray(this.value,value)>=0||jQuery.inArray(this.name,value)>=0);else if(jQuery.nodeName(this,"select")){var values=jQuery.makeArray(value);jQuery("option",this).each(function(){this.selected=(jQuery.inArray(this.value,values)>=0||jQuery.inArray(this.text,values)>=0);});if(!values.length)this.selectedIndex=-1;}else
this.value=value;});},html:function(value){return value==undefined?(this[0]?this[0].innerHTML:null):this.empty().append(value);},replaceWith:function(value){return this.after(value).remove();},eq:function(i){return this.slice(i,i+1);},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments));},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},andSelf:function(){return this.add(this.prevObject);},data:function(key,value){var parts=key.split(".");parts[1]=parts[1]?"."+parts[1]:"";if(value===undefined){var data=this.triggerHandler("getData"+parts[1]+"!",[parts[0]]);if(data===undefined&&this.length)data=jQuery.data(this[0],key);return data===undefined&&parts[1]?this.data(parts[0]):data;}else
return this.trigger("setData"+parts[1]+"!",[parts[0],value]).each(function(){jQuery.data(this,key,value);});},removeData:function(key){return this.each(function(){jQuery.removeData(this,key);});},domManip:function(args,table,reverse,callback){var clone=this.length>1,elems;return this.each(function(){if(!elems){elems=jQuery.clean(args,this.ownerDocument);if(reverse)elems.reverse();}var obj=this;if(table&&jQuery.nodeName(this,"table")&&jQuery.nodeName(elems[0],"tr"))obj=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"));var scripts=jQuery([]);jQuery.each(elems,function(){var elem=clone?jQuery(this).clone(true)[0]:this;if(jQuery.nodeName(elem,"script"))scripts=scripts.add(elem);else{if(elem.nodeType==1)scripts=scripts.add(jQuery("script",elem).remove());callback.call(obj,elem);}});scripts.each(evalScript);});}};jQuery.fn.init.prototype=jQuery.fn;function evalScript(i,elem){if(elem.src)jQuery.ajax({url:elem.src,async:false,dataType:"script"});else
jQuery.globalEval(elem.text||elem.textContent||elem.innerHTML||"");if(elem.parentNode)elem.parentNode.removeChild(elem);}function now(){return+new Date;}jQuery.extend=jQuery.fn.extend=function(){var target=arguments[0]||{},i=1,length=arguments.length,deep=false,options;if(target.constructor==Boolean){deep=target;target=arguments[1]||{};i=2;}if(typeof target!="object"&&typeof target!="function")target={};if(length==i){target=this;--i;}for(;i<length;i++)if((options=arguments[i])!=null)for(var name in options){var src=target[name],copy=options[name];if(target===copy)continue;if(deep&&copy&&typeof copy=="object"&&!copy.nodeType)target[name]=jQuery.extend(deep,src||(copy.length!=null?[]:{}),copy);else if(copy!==undefined)target[name]=copy;}return target;};var expando="jQuery"+now(),uuid=0,windowData={},exclude=/z-?index|font-?weight|opacity|zoom|line-?height/i,defaultView=document.defaultView||{};jQuery.extend({noConflict:function(deep){window.$=_$;if(deep)window.jQuery=_jQuery;return jQuery;},isFunction:function(fn){return!!fn&&typeof fn!="string"&&!fn.nodeName&&fn.constructor!=Array&&/^[\s[]?function/.test(fn+"");},isXMLDoc:function(elem){return elem.documentElement&&!elem.body||elem.tagName&&elem.ownerDocument&&!elem.ownerDocument.body;},globalEval:function(data){data=jQuery.trim(data);if(data){var head=document.getElementsByTagName("head")[0]||document.documentElement,script=document.createElement("script");script.type="text/javascript";if(jQuery.browser.msie)script.text=data;else
script.appendChild(document.createTextNode(data));head.insertBefore(script,head.firstChild);head.removeChild(script);}},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()==name.toUpperCase();},cache:{},data:function(elem,name,data){elem=elem==window?windowData:elem;var id=elem[expando];if(!id)id=elem[expando]=++uuid;if(name&&!jQuery.cache[id])jQuery.cache[id]={};if(data!==undefined)jQuery.cache[id][name]=data;return name?jQuery.cache[id][name]:id;},removeData:function(elem,name){elem=elem==window?windowData:elem;var id=elem[expando];if(name){if(jQuery.cache[id]){delete jQuery.cache[id][name];name="";for(name in jQuery.cache[id])break;if(!name)jQuery.removeData(elem);}}else{try{delete elem[expando];}catch(e){if(elem.removeAttribute)elem.removeAttribute(expando);}delete jQuery.cache[id];}},each:function(object,callback,args){var name,i=0,length=object.length;if(args){if(length==undefined){for(name in object)if(callback.apply(object[name],args)===false)break;}else
for(;i<length;)if(callback.apply(object[i++],args)===false)break;}else{if(length==undefined){for(name in object)if(callback.call(object[name],name,object[name])===false)break;}else
for(var value=object[0];i<length&&callback.call(value,i,value)!==false;value=object[++i]){}}return object;},prop:function(elem,value,type,i,name){if(jQuery.isFunction(value))value=value.call(elem,i);return value&&value.constructor==Number&&type=="curCSS"&&!exclude.test(name)?value+"px":value;},className:{add:function(elem,classNames){jQuery.each((classNames||"").split(/\s+/),function(i,className){if(elem.nodeType==1&&!jQuery.className.has(elem.className,className))elem.className+=(elem.className?" ":"")+className;});},remove:function(elem,classNames){if(elem.nodeType==1)elem.className=classNames!=undefined?jQuery.grep(elem.className.split(/\s+/),function(className){return!jQuery.className.has(classNames,className);}).join(" "):"";},has:function(elem,className){return jQuery.inArray(className,(elem.className||elem).toString().split(/\s+/))>-1;}},swap:function(elem,options,callback){var old={};for(var name in options){old[name]=elem.style[name];elem.style[name]=options[name];}callback.call(elem);for(var name in options)elem.style[name]=old[name];},css:function(elem,name,force){if(name=="width"||name=="height"){var val,props={position:"absolute",visibility:"hidden",display:"block"},which=name=="width"?["Left","Right"]:["Top","Bottom"];function getWH(){val=name=="width"?elem.offsetWidth:elem.offsetHeight;var padding=0,border=0;jQuery.each(which,function(){padding+=parseFloat(jQuery.curCSS(elem,"padding"+this,true))||0;border+=parseFloat(jQuery.curCSS(elem,"border"+this+"Width",true))||0;});val-=Math.round(padding+border);}if(jQuery(elem).is(":visible"))getWH();else
jQuery.swap(elem,props,getWH);return Math.max(0,val);}return jQuery.curCSS(elem,name,force);},curCSS:function(elem,name,force){var ret,style=elem.style;function color(elem){if(!jQuery.browser.safari)return false;var ret=defaultView.getComputedStyle(elem,null);return!ret||ret.getPropertyValue("color")=="";}if(name=="opacity"&&jQuery.browser.msie){ret=jQuery.attr(style,"opacity");return ret==""?"1":ret;}if(jQuery.browser.opera&&name=="display"){var save=style.outline;style.outline="0 solid black";style.outline=save;}if(name.match(/float/i))name=styleFloat;if(!force&&style&&style[name])ret=style[name];else if(defaultView.getComputedStyle){if(name.match(/float/i))name="float";name=name.replace(/([A-Z])/g,"-$1").toLowerCase();var computedStyle=defaultView.getComputedStyle(elem,null);if(computedStyle&&!color(elem))ret=computedStyle.getPropertyValue(name);else{var swap=[],stack=[],a=elem,i=0;for(;a&&color(a);a=a.parentNode)stack.unshift(a);for(;i<stack.length;i++)if(color(stack[i])){swap[i]=stack[i].style.display;stack[i].style.display="block";}ret=name=="display"&&swap[stack.length-1]!=null?"none":(computedStyle&&computedStyle.getPropertyValue(name))||"";for(i=0;i<swap.length;i++)if(swap[i]!=null)stack[i].style.display=swap[i];}if(name=="opacity"&&ret=="")ret="1";}else if(elem.currentStyle){var camelCase=name.replace(/\-(\w)/g,function(all,letter){return letter.toUpperCase();});ret=elem.currentStyle[name]||elem.currentStyle[camelCase];if(!/^\d+(px)?$/i.test(ret)&&/^\d/.test(ret)){var left=style.left,rsLeft=elem.runtimeStyle.left;elem.runtimeStyle.left=elem.currentStyle.left;style.left=ret||0;ret=style.pixelLeft+"px";style.left=left;elem.runtimeStyle.left=rsLeft;}}return ret;},clean:function(elems,context){var ret=[];context=context||document;if(typeof context.createElement=='undefined')context=context.ownerDocument||context[0]&&context[0].ownerDocument||document;jQuery.each(elems,function(i,elem){if(!elem)return;if(elem.constructor==Number)elem+='';if(typeof elem=="string"){elem=elem.replace(/(<(\w+)[^>]*?)\/>/g,function(all,front,tag){return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?all:front+"></"+tag+">";});var tags=jQuery.trim(elem).toLowerCase(),div=context.createElement("div");var wrap=!tags.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!tags.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||tags.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!tags.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!tags.indexOf("<td")||!tags.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!tags.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||jQuery.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];div.innerHTML=wrap[1]+elem+wrap[2];while(wrap[0]--)div=div.lastChild;if(jQuery.browser.msie){var tbody=!tags.indexOf("<table")&&tags.indexOf("<tbody")<0?div.firstChild&&div.firstChild.childNodes:wrap[1]=="<table>"&&tags.indexOf("<tbody")<0?div.childNodes:[];for(var j=tbody.length-1;j>=0;--j)if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length)tbody[j].parentNode.removeChild(tbody[j]);if(/^\s/.test(elem))div.insertBefore(context.createTextNode(elem.match(/^\s*/)[0]),div.firstChild);}elem=jQuery.makeArray(div.childNodes);}if(elem.length===0&&(!jQuery.nodeName(elem,"form")&&!jQuery.nodeName(elem,"select")))return;if(elem[0]==undefined||jQuery.nodeName(elem,"form")||elem.options)ret.push(elem);else
ret=jQuery.merge(ret,elem);});return ret;},attr:function(elem,name,value){if(!elem||elem.nodeType==3||elem.nodeType==8)return undefined;var notxml=!jQuery.isXMLDoc(elem),set=value!==undefined,msie=jQuery.browser.msie;name=notxml&&jQuery.props[name]||name;if(elem.tagName){var special=/href|src|style/.test(name);if(name=="selected"&&jQuery.browser.safari)elem.parentNode.selectedIndex;if(name in elem&&notxml&&!special){if(set){if(name=="type"&&jQuery.nodeName(elem,"input")&&elem.parentNode)throw"type property can't be changed";elem[name]=value;}if(jQuery.nodeName(elem,"form")&&elem.getAttributeNode(name))return elem.getAttributeNode(name).nodeValue;return elem[name];}if(msie&&notxml&&name=="style")return jQuery.attr(elem.style,"cssText",value);if(set)elem.setAttribute(name,""+value);var attr=msie&&notxml&&special?elem.getAttribute(name,2):elem.getAttribute(name);return attr===null?undefined:attr;}if(msie&&name=="opacity"){if(set){elem.zoom=1;elem.filter=(elem.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(value)+''=="NaN"?"":"alpha(opacity="+value*100+")");}return elem.filter&&elem.filter.indexOf("opacity=")>=0?(parseFloat(elem.filter.match(/opacity=([^)]*)/)[1])/100)+'':"";}name=name.replace(/-([a-z])/ig,function(all,letter){return letter.toUpperCase();});if(set)elem[name]=value;return elem[name];},trim:function(text){return(text||"").replace(/^\s+|\s+$/g,"");},makeArray:function(array){var ret=[];if(array!=null){var i=array.length;if(i==null||array.split||array.setInterval||array.call)ret[0]=array;else
while(i)ret[--i]=array[i];}return ret;},inArray:function(elem,array){for(var i=0,length=array.length;i<length;i++)if(array[i]===elem)return i;return-1;},merge:function(first,second){var i=0,elem,pos=first.length;if(jQuery.browser.msie){while(elem=second[i++])if(elem.nodeType!=8)first[pos++]=elem;}else
while(elem=second[i++])first[pos++]=elem;return first;},unique:function(array){var ret=[],done={};try{for(var i=0,length=array.length;i<length;i++){var id=jQuery.data(array[i]);if(!done[id]){done[id]=true;ret.push(array[i]);}}}catch(e){ret=array;}return ret;},grep:function(elems,callback,inv){var ret=[];for(var i=0,length=elems.length;i<length;i++)if(!inv!=!callback(elems[i],i))ret.push(elems[i]);return ret;},map:function(elems,callback){var ret=[];for(var i=0,length=elems.length;i<length;i++){var value=callback(elems[i],i);if(value!=null)ret[ret.length]=value;}return ret.concat.apply([],ret);}});var userAgent=navigator.userAgent.toLowerCase();jQuery.browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:/msie/.test(userAgent)&&!/opera/.test(userAgent),mozilla:/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)};var styleFloat=jQuery.browser.msie?"styleFloat":"cssFloat";jQuery.extend({boxModel:!jQuery.browser.msie||document.compatMode=="CSS1Compat",props:{"for":"htmlFor","class":"className","float":styleFloat,cssFloat:styleFloat,styleFloat:styleFloat,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing"}});jQuery.each({parent:function(elem){return elem.parentNode;},parents:function(elem){return jQuery.dir(elem,"parentNode");},next:function(elem){return jQuery.nth(elem,2,"nextSibling");},prev:function(elem){return jQuery.nth(elem,2,"previousSibling");},nextAll:function(elem){return jQuery.dir(elem,"nextSibling");},prevAll:function(elem){return jQuery.dir(elem,"previousSibling");},siblings:function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem);},children:function(elem){return jQuery.sibling(elem.firstChild);},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes);}},function(name,fn){jQuery.fn[name]=function(selector){var ret=jQuery.map(this,fn);if(selector&&typeof selector=="string")ret=jQuery.multiFilter(selector,ret);return this.pushStack(jQuery.unique(ret));};});jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(){var args=arguments;return this.each(function(){for(var i=0,length=args.length;i<length;i++)jQuery(args[i])[original](this);});};});jQuery.each({removeAttr:function(name){jQuery.attr(this,name,"");if(this.nodeType==1)this.removeAttribute(name);},addClass:function(classNames){jQuery.className.add(this,classNames);},removeClass:function(classNames){jQuery.className.remove(this,classNames);},toggleClass:function(classNames){jQuery.className[jQuery.className.has(this,classNames)?"remove":"add"](this,classNames);},remove:function(selector){if(!selector||jQuery.filter(selector,[this]).r.length){jQuery("*",this).add(this).each(function(){jQuery.event.remove(this);jQuery.removeData(this);});if(this.parentNode)this.parentNode.removeChild(this);}},empty:function(){jQuery(">*",this).remove();while(this.firstChild)this.removeChild(this.firstChild);}},function(name,fn){jQuery.fn[name]=function(){return this.each(fn,arguments);};});jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();jQuery.fn[type]=function(size){return this[0]==window?jQuery.browser.opera&&document.body["client"+name]||jQuery.browser.safari&&window["inner"+name]||document.compatMode=="CSS1Compat"&&document.documentElement["client"+name]||document.body["client"+name]:this[0]==document?Math.max(Math.max(document.body["scroll"+name],document.documentElement["scroll"+name]),Math.max(document.body["offset"+name],document.documentElement["offset"+name])):size==undefined?(this.length?jQuery.css(this[0],type):null):this.css(type,size.constructor==String?size:size+"px");};});function num(elem,prop){return elem[0]&&parseInt(jQuery.curCSS(elem[0],prop,true),10)||0;}var chars=jQuery.browser.safari&&parseInt(jQuery.browser.version)<417?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",quickChild=new RegExp("^>\\s*("+chars+"+)"),quickID=new RegExp("^("+chars+"+)(#)("+chars+"+)"),quickClass=new RegExp("^([#.]?)("+chars+"*)");jQuery.extend({expr:{"":function(a,i,m){return m[2]=="*"||jQuery.nodeName(a,m[2]);},"#":function(a,i,m){return a.getAttribute("id")==m[2];},":":{lt:function(a,i,m){return i<m[3]-0;},gt:function(a,i,m){return i>m[3]-0;},nth:function(a,i,m){return m[3]-0==i;},eq:function(a,i,m){return m[3]-0==i;},first:function(a,i){return i==0;},last:function(a,i,m,r){return i==r.length-1;},even:function(a,i){return i%2==0;},odd:function(a,i){return i%2;},"first-child":function(a){return a.parentNode.getElementsByTagName("*")[0]==a;},"last-child":function(a){return jQuery.nth(a.parentNode.lastChild,1,"previousSibling")==a;},"only-child":function(a){return!jQuery.nth(a.parentNode.lastChild,2,"previousSibling");},parent:function(a){return a.firstChild;},empty:function(a){return!a.firstChild;},contains:function(a,i,m){return(a.textContent||a.innerText||jQuery(a).text()||"").indexOf(m[3])>=0;},visible:function(a){return"hidden"!=a.type&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden";},hidden:function(a){return"hidden"==a.type||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden";},enabled:function(a){return!a.disabled;},disabled:function(a){return a.disabled;},checked:function(a){return a.checked;},selected:function(a){return a.selected||jQuery.attr(a,"selected");},text:function(a){return"text"==a.type;},radio:function(a){return"radio"==a.type;},checkbox:function(a){return"checkbox"==a.type;},file:function(a){return"file"==a.type;},password:function(a){return"password"==a.type;},submit:function(a){return"submit"==a.type;},image:function(a){return"image"==a.type;},reset:function(a){return"reset"==a.type;},button:function(a){return"button"==a.type||jQuery.nodeName(a,"button");},input:function(a){return/input|select|textarea|button/i.test(a.nodeName);},has:function(a,i,m){return jQuery.find(m[3],a).length;},header:function(a){return/h\d/i.test(a.nodeName);},animated:function(a){return jQuery.grep(jQuery.timers,function(fn){return a==fn.elem;}).length;}}},parse:[/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/,/^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/,new RegExp("^([:.#]*)("+chars+"+)")],multiFilter:function(expr,elems,not){var old,cur=[];while(expr&&expr!=old){old=expr;var f=jQuery.filter(expr,elems,not);expr=f.t.replace(/^\s*,\s*/,"");cur=not?elems=f.r:jQuery.merge(cur,f.r);}return cur;},find:function(t,context){if(typeof t!="string")return[t];if(context&&context.nodeType!=1&&context.nodeType!=9)return[];context=context||document;var ret=[context],done=[],last,nodeName;while(t&&last!=t){var r=[];last=t;t=jQuery.trim(t);var foundToken=false,re=quickChild,m=re.exec(t);if(m){nodeName=m[1].toUpperCase();for(var i=0;ret[i];i++)for(var c=ret[i].firstChild;c;c=c.nextSibling)if(c.nodeType==1&&(nodeName=="*"||c.nodeName.toUpperCase()==nodeName))r.push(c);ret=r;t=t.replace(re,"");if(t.indexOf(" ")==0)continue;foundToken=true;}else{re=/^([>+~])\s*(\w*)/i;if((m=re.exec(t))!=null){r=[];var merge={};nodeName=m[2].toUpperCase();m=m[1];for(var j=0,rl=ret.length;j<rl;j++){var n=m=="~"||m=="+"?ret[j].nextSibling:ret[j].firstChild;for(;n;n=n.nextSibling)if(n.nodeType==1){var id=jQuery.data(n);if(m=="~"&&merge[id])break;if(!nodeName||n.nodeName.toUpperCase()==nodeName){if(m=="~")merge[id]=true;r.push(n);}if(m=="+")break;}}ret=r;t=jQuery.trim(t.replace(re,""));foundToken=true;}}if(t&&!foundToken){if(!t.indexOf(",")){if(context==ret[0])ret.shift();done=jQuery.merge(done,ret);r=ret=[context];t=" "+t.substr(1,t.length);}else{var re2=quickID;var m=re2.exec(t);if(m){m=[0,m[2],m[3],m[1]];}else{re2=quickClass;m=re2.exec(t);}m[2]=m[2].replace(/\\/g,"");var elem=ret[ret.length-1];if(m[1]=="#"&&elem&&elem.getElementById&&!jQuery.isXMLDoc(elem)){var oid=elem.getElementById(m[2]);if((jQuery.browser.msie||jQuery.browser.opera)&&oid&&typeof oid.id=="string"&&oid.id!=m[2])oid=jQuery('[@id="'+m[2]+'"]',elem)[0];ret=r=oid&&(!m[3]||jQuery.nodeName(oid,m[3]))?[oid]:[];}else{for(var i=0;ret[i];i++){var tag=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];if(tag=="*"&&ret[i].nodeName.toLowerCase()=="object")tag="param";r=jQuery.merge(r,ret[i].getElementsByTagName(tag));}if(m[1]==".")r=jQuery.classFilter(r,m[2]);if(m[1]=="#"){var tmp=[];for(var i=0;r[i];i++)if(r[i].getAttribute("id")==m[2]){tmp=[r[i]];break;}r=tmp;}ret=r;}t=t.replace(re2,"");}}if(t){var val=jQuery.filter(t,r);ret=r=val.r;t=jQuery.trim(val.t);}}if(t)ret=[];if(ret&&context==ret[0])ret.shift();done=jQuery.merge(done,ret);return done;},classFilter:function(r,m,not){m=" "+m+" ";var tmp=[];for(var i=0;r[i];i++){var pass=(" "+r[i].className+" ").indexOf(m)>=0;if(!not&&pass||not&&!pass)tmp.push(r[i]);}return tmp;},filter:function(t,r,not){var last;while(t&&t!=last){last=t;var p=jQuery.parse,m;for(var i=0;p[i];i++){m=p[i].exec(t);if(m){t=t.substring(m[0].length);m[2]=m[2].replace(/\\/g,"");break;}}if(!m)break;if(m[1]==":"&&m[2]=="not")r=isSimple.test(m[3])?jQuery.filter(m[3],r,true).r:jQuery(r).not(m[3]);else if(m[1]==".")r=jQuery.classFilter(r,m[2],not);else if(m[1]=="["){var tmp=[],type=m[3];for(var i=0,rl=r.length;i<rl;i++){var a=r[i],z=a[jQuery.props[m[2]]||m[2]];if(z==null||/href|src|selected/.test(m[2]))z=jQuery.attr(a,m[2])||'';if((type==""&&!!z||type=="="&&z==m[5]||type=="!="&&z!=m[5]||type=="^="&&z&&!z.indexOf(m[5])||type=="$="&&z.substr(z.length-m[5].length)==m[5]||(type=="*="||type=="~=")&&z.indexOf(m[5])>=0)^not)tmp.push(a);}r=tmp;}else if(m[1]==":"&&m[2]=="nth-child"){var merge={},tmp=[],test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(m[3]=="even"&&"2n"||m[3]=="odd"&&"2n+1"||!/\D/.test(m[3])&&"0n+"+m[3]||m[3]),first=(test[1]+(test[2]||1))-0,last=test[3]-0;for(var i=0,rl=r.length;i<rl;i++){var node=r[i],parentNode=node.parentNode,id=jQuery.data(parentNode);if(!merge[id]){var c=1;for(var n=parentNode.firstChild;n;n=n.nextSibling)if(n.nodeType==1)n.nodeIndex=c++;merge[id]=true;}var add=false;if(first==0){if(node.nodeIndex==last)add=true;}else if((node.nodeIndex-last)%first==0&&(node.nodeIndex-last)/first>=0)add=true;if(add^not)tmp.push(node);}r=tmp;}else{var fn=jQuery.expr[m[1]];if(typeof fn=="object")fn=fn[m[2]];if(typeof fn=="string")fn=eval("false||function(a,i){return "+fn+";}");r=jQuery.grep(r,function(elem,i){return fn(elem,i,m,r);},not);}}return{r:r,t:t};},dir:function(elem,dir){var matched=[],cur=elem[dir];while(cur&&cur!=document){if(cur.nodeType==1)matched.push(cur);cur=cur[dir];}return matched;},nth:function(cur,result,dir,elem){result=result||1;var num=0;for(;cur;cur=cur[dir])if(cur.nodeType==1&&++num==result)break;return cur;},sibling:function(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType==1&&n!=elem)r.push(n);}return r;}});jQuery.event={add:function(elem,types,handler,data){if(elem.nodeType==3||elem.nodeType==8)return;if(jQuery.browser.msie&&elem.setInterval)elem=window;if(!handler.guid)handler.guid=this.guid++;if(data!=undefined){var fn=handler;handler=this.proxy(fn,function(){return fn.apply(this,arguments);});handler.data=data;}var events=jQuery.data(elem,"events")||jQuery.data(elem,"events",{}),handle=jQuery.data(elem,"handle")||jQuery.data(elem,"handle",function(){if(typeof jQuery!="undefined"&&!jQuery.event.triggered)return jQuery.event.handle.apply(arguments.callee.elem,arguments);});handle.elem=elem;jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];handler.type=parts[1];var handlers=events[type];if(!handlers){handlers=events[type]={};if(!jQuery.event.special[type]||jQuery.event.special[type].setup.call(elem)===false){if(elem.addEventListener)elem.addEventListener(type,handle,false);else if(elem.attachEvent)elem.attachEvent("on"+type,handle);}}handlers[handler.guid]=handler;jQuery.event.global[type]=true;});elem=null;},guid:1,global:{},remove:function(elem,types,handler){if(elem.nodeType==3||elem.nodeType==8)return;var events=jQuery.data(elem,"events"),ret,index;if(events){if(types==undefined||(typeof types=="string"&&types.charAt(0)=="."))for(var type in events)this.remove(elem,type+(types||""));else{if(types.type){handler=types.handler;types=types.type;}jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];if(events[type]){if(handler)delete events[type][handler.guid];else
for(handler in events[type])if(!parts[1]||events[type][handler].type==parts[1])delete events[type][handler];for(ret in events[type])break;if(!ret){if(!jQuery.event.special[type]||jQuery.event.special[type].teardown.call(elem)===false){if(elem.removeEventListener)elem.removeEventListener(type,jQuery.data(elem,"handle"),false);else if(elem.detachEvent)elem.detachEvent("on"+type,jQuery.data(elem,"handle"));}ret=null;delete events[type];}}});}for(ret in events)break;if(!ret){var handle=jQuery.data(elem,"handle");if(handle)handle.elem=null;jQuery.removeData(elem,"events");jQuery.removeData(elem,"handle");}}},trigger:function(type,data,elem,donative,extra){data=jQuery.makeArray(data);if(type.indexOf("!")>=0){type=type.slice(0,-1);var exclusive=true;}if(!elem){if(this.global[type])jQuery("*").add([window,document]).trigger(type,data);}else{if(elem.nodeType==3||elem.nodeType==8)return undefined;var val,ret,fn=jQuery.isFunction(elem[type]||null),event=!data[0]||!data[0].preventDefault;if(event){data.unshift({type:type,target:elem,preventDefault:function(){},stopPropagation:function(){},timeStamp:now()});data[0][expando]=true;}data[0].type=type;if(exclusive)data[0].exclusive=true;var handle=jQuery.data(elem,"handle");if(handle)val=handle.apply(elem,data);if((!fn||(jQuery.nodeName(elem,'a')&&type=="click"))&&elem["on"+type]&&elem["on"+type].apply(elem,data)===false)val=false;if(event)data.shift();if(extra&&jQuery.isFunction(extra)){ret=extra.apply(elem,val==null?data:data.concat(val));if(ret!==undefined)val=ret;}if(fn&&donative!==false&&val!==false&&!(jQuery.nodeName(elem,'a')&&type=="click")){this.triggered=true;try{elem[type]();}catch(e){}}this.triggered=false;}return val;},handle:function(event){var val,ret,namespace,all,handlers;event=arguments[0]=jQuery.event.fix(event||window.event);namespace=event.type.split(".");event.type=namespace[0];namespace=namespace[1];all=!namespace&&!event.exclusive;handlers=(jQuery.data(this,"events")||{})[event.type];for(var j in handlers){var handler=handlers[j];if(all||handler.type==namespace){event.handler=handler;event.data=handler.data;ret=handler.apply(this,arguments);if(val!==false)val=ret;if(ret===false){event.preventDefault();event.stopPropagation();}}}return val;},fix:function(event){if(event[expando]==true)return event;var originalEvent=event;event={originalEvent:originalEvent};var props="altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view wheelDelta which".split(" ");for(var i=props.length;i;i--)event[props[i]]=originalEvent[props[i]];event[expando]=true;event.preventDefault=function(){if(originalEvent.preventDefault)originalEvent.preventDefault();originalEvent.returnValue=false;};event.stopPropagation=function(){if(originalEvent.stopPropagation)originalEvent.stopPropagation();originalEvent.cancelBubble=true;};event.timeStamp=event.timeStamp||now();if(!event.target)event.target=event.srcElement||document;if(event.target.nodeType==3)event.target=event.target.parentNode;if(!event.relatedTarget&&event.fromElement)event.relatedTarget=event.fromElement==event.target?event.toElement:event.fromElement;if(event.pageX==null&&event.clientX!=null){var doc=document.documentElement,body=document.body;event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc.clientLeft||0);event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc.clientTop||0);}if(!event.which&&((event.charCode||event.charCode===0)?event.charCode:event.keyCode))event.which=event.charCode||event.keyCode;if(!event.metaKey&&event.ctrlKey)event.metaKey=event.ctrlKey;if(!event.which&&event.button)event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)));return event;},proxy:function(fn,proxy){proxy.guid=fn.guid=fn.guid||proxy.guid||this.guid++;return proxy;},special:{ready:{setup:function(){bindReady();return;},teardown:function(){return;}},mouseenter:{setup:function(){if(jQuery.browser.msie)return false;jQuery(this).bind("mouseover",jQuery.event.special.mouseenter.handler);return true;},teardown:function(){if(jQuery.browser.msie)return false;jQuery(this).unbind("mouseover",jQuery.event.special.mouseenter.handler);return true;},handler:function(event){if(withinElement(event,this))return true;event.type="mouseenter";return jQuery.event.handle.apply(this,arguments);}},mouseleave:{setup:function(){if(jQuery.browser.msie)return false;jQuery(this).bind("mouseout",jQuery.event.special.mouseleave.handler);return true;},teardown:function(){if(jQuery.browser.msie)return false;jQuery(this).unbind("mouseout",jQuery.event.special.mouseleave.handler);return true;},handler:function(event){if(withinElement(event,this))return true;event.type="mouseleave";return jQuery.event.handle.apply(this,arguments);}}}};jQuery.fn.extend({bind:function(type,data,fn){return type=="unload"?this.one(type,data,fn):this.each(function(){jQuery.event.add(this,type,fn||data,fn&&data);});},one:function(type,data,fn){var one=jQuery.event.proxy(fn||data,function(event){jQuery(this).unbind(event,one);return(fn||data).apply(this,arguments);});return this.each(function(){jQuery.event.add(this,type,one,fn&&data);});},unbind:function(type,fn){return this.each(function(){jQuery.event.remove(this,type,fn);});},trigger:function(type,data,fn){return this.each(function(){jQuery.event.trigger(type,data,this,true,fn);});},triggerHandler:function(type,data,fn){return this[0]&&jQuery.event.trigger(type,data,this[0],false,fn);},toggle:function(fn){var args=arguments,i=1;while(i<args.length)jQuery.event.proxy(fn,args[i++]);return this.click(jQuery.event.proxy(fn,function(event){this.lastToggle=(this.lastToggle||0)%i;event.preventDefault();return args[this.lastToggle++].apply(this,arguments)||false;}));},hover:function(fnOver,fnOut){return this.bind('mouseenter',fnOver).bind('mouseleave',fnOut);},ready:function(fn){bindReady();if(jQuery.isReady)fn.call(document,jQuery);else
jQuery.readyList.push(function(){return fn.call(this,jQuery);});return this;}});jQuery.extend({isReady:false,readyList:[],ready:function(){if(!jQuery.isReady){jQuery.isReady=true;if(jQuery.readyList){jQuery.each(jQuery.readyList,function(){this.call(document);});jQuery.readyList=null;}jQuery(document).triggerHandler("ready");}}});var readyBound=false;function bindReady(){if(readyBound)return;readyBound=true;if(document.addEventListener&&!jQuery.browser.opera)document.addEventListener("DOMContentLoaded",jQuery.ready,false);if(jQuery.browser.msie&&window==top)(function(){if(jQuery.isReady)return;try{document.documentElement.doScroll("left");}catch(error){setTimeout(arguments.callee,0);return;}jQuery.ready();})();if(jQuery.browser.opera)document.addEventListener("DOMContentLoaded",function(){if(jQuery.isReady)return;for(var i=0;i<document.styleSheets.length;i++)if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);return;}jQuery.ready();},false);if(jQuery.browser.safari){var numStyles;(function(){if(jQuery.isReady)return;if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);return;}if(numStyles===undefined)numStyles=jQuery("style, link[rel=stylesheet]").length;if(document.styleSheets.length!=numStyles){setTimeout(arguments.callee,0);return;}jQuery.ready();})();}jQuery.event.add(window,"load",jQuery.ready);}jQuery.each(("blur,focus,load,resize,scroll,unload,click,dblclick,"+"mousedown,mouseup,mousemove,mouseover,mouseout,change,select,"+"submit,keydown,keypress,keyup,error").split(","),function(i,name){jQuery.fn[name]=function(fn){return fn?this.bind(name,fn):this.trigger(name);};});var withinElement=function(event,elem){var parent=event.relatedTarget;while(parent&&parent!=elem)try{parent=parent.parentNode;}catch(error){parent=elem;}return parent==elem;};jQuery(window).bind("unload",function(){jQuery("*").add(document).unbind();});jQuery.fn.extend({_load:jQuery.fn.load,load:function(url,params,callback){if(typeof url!='string')return this._load(url);var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off);}callback=callback||function(){};var type="GET";if(params)if(jQuery.isFunction(params)){callback=params;params=null;}else{params=jQuery.param(params);type="POST";}var self=this;jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(res,status){if(status=="success"||status=="notmodified")self.html(selector?jQuery("<div/>").append(res.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):res.responseText);self.each(callback,[res.responseText,status,res]);}});return this;},serialize:function(){return jQuery.param(this.serializeArray());},serializeArray:function(){return this.map(function(){return jQuery.nodeName(this,"form")?jQuery.makeArray(this.elements):this;}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password/i.test(this.type));}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:val.constructor==Array?jQuery.map(val,function(val,i){return{name:elem.name,value:val};}):{name:elem.name,value:val};}).get();}});jQuery.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f);};});var jsc=now();jQuery.extend({get:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data=null;}return jQuery.ajax({type:"GET",url:url,data:data,success:callback,dataType:type});},getScript:function(url,callback){return jQuery.get(url,null,callback,"script");},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json");},post:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data={};}return jQuery.ajax({type:"POST",url:url,data:data,success:callback,dataType:type});},ajaxSetup:function(settings){jQuery.extend(jQuery.ajaxSettings,settings);},ajaxSettings:{url:location.href,global:true,type:"GET",timeout:0,contentType:"application/x-www-form-urlencoded",processData:true,async:true,data:null,username:null,password:null,accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(s){s=jQuery.extend(true,s,jQuery.extend(true,{},jQuery.ajaxSettings,s));var jsonp,jsre=/=\?(&|$)/g,status,data,type=s.type.toUpperCase();if(s.data&&s.processData&&typeof s.data!="string")s.data=jQuery.param(s.data);if(s.dataType=="jsonp"){if(type=="GET"){if(!s.url.match(jsre))s.url+=(s.url.match(/\?/)?"&":"?")+(s.jsonp||"callback")+"=?";}else if(!s.data||!s.data.match(jsre))s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?";s.dataType="json";}if(s.dataType=="json"&&(s.data&&s.data.match(jsre)||s.url.match(jsre))){jsonp="jsonp"+jsc++;if(s.data)s.data=(s.data+"").replace(jsre,"="+jsonp+"$1");s.url=s.url.replace(jsre,"="+jsonp+"$1");s.dataType="script";window[jsonp]=function(tmp){data=tmp;success();complete();window[jsonp]=undefined;try{delete window[jsonp];}catch(e){}if(head)head.removeChild(script);};}if(s.dataType=="script"&&s.cache==null)s.cache=false;if(s.cache===false&&type=="GET"){var ts=now();var ret=s.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+ts+"$2");s.url=ret+((ret==s.url)?(s.url.match(/\?/)?"&":"?")+"_="+ts:"");}if(s.data&&type=="GET"){s.url+=(s.url.match(/\?/)?"&":"?")+s.data;s.data=null;}if(s.global&&!jQuery.active++)jQuery.event.trigger("ajaxStart");var remote=/^(?:\w+:)?\/\/([^\/?#]+)/;if(s.dataType=="script"&&type=="GET"&&remote.test(s.url)&&remote.exec(s.url)[1]!=location.host){var head=document.getElementsByTagName("head")[0];var script=document.createElement("script");script.src=s.url;if(s.scriptCharset)script.charset=s.scriptCharset;if(!jsonp){var done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){done=true;success();complete();head.removeChild(script);}};}head.appendChild(script);return undefined;}var requestDone=false;var xhr=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();if(s.username)xhr.open(type,s.url,s.async,s.username,s.password);else
xhr.open(type,s.url,s.async);try{if(s.data)xhr.setRequestHeader("Content-Type",s.contentType);if(s.ifModified)xhr.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url]||"Thu, 01 Jan 1970 00:00:00 GMT");xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");xhr.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?s.accepts[s.dataType]+", */*":s.accepts._default);}catch(e){}if(s.beforeSend&&s.beforeSend(xhr,s)===false){s.global&&jQuery.active--;xhr.abort();return false;}if(s.global)jQuery.event.trigger("ajaxSend",[xhr,s]);var onreadystatechange=function(isTimeout){if(!requestDone&&xhr&&(xhr.readyState==4||isTimeout=="timeout")){requestDone=true;if(ival){clearInterval(ival);ival=null;}status=isTimeout=="timeout"&&"timeout"||!jQuery.httpSuccess(xhr)&&"error"||s.ifModified&&jQuery.httpNotModified(xhr,s.url)&&"notmodified"||"success";if(status=="success"){try{data=jQuery.httpData(xhr,s.dataType,s.dataFilter);}catch(e){status="parsererror";}}if(status=="success"){var modRes;try{modRes=xhr.getResponseHeader("Last-Modified");}catch(e){}if(s.ifModified&&modRes)jQuery.lastModified[s.url]=modRes;if(!jsonp)success();}else
jQuery.handleError(s,xhr,status);complete();if(s.async)xhr=null;}};if(s.async){var ival=setInterval(onreadystatechange,13);if(s.timeout>0)setTimeout(function(){if(xhr){xhr.abort();if(!requestDone)onreadystatechange("timeout");}},s.timeout);}try{xhr.send(s.data);}catch(e){jQuery.handleError(s,xhr,null,e);}if(!s.async)onreadystatechange();function success(){if(s.success)s.success(data,status);if(s.global)jQuery.event.trigger("ajaxSuccess",[xhr,s]);}function complete(){if(s.complete)s.complete(xhr,status);if(s.global)jQuery.event.trigger("ajaxComplete",[xhr,s]);if(s.global&&!--jQuery.active)jQuery.event.trigger("ajaxStop");}return xhr;},handleError:function(s,xhr,status,e){if(s.error)s.error(xhr,status,e);if(s.global)jQuery.event.trigger("ajaxError",[xhr,s,e]);},active:0,httpSuccess:function(xhr){try{return!xhr.status&&location.protocol=="file:"||(xhr.status>=200&&xhr.status<300)||xhr.status==304||xhr.status==1223||jQuery.browser.safari&&xhr.status==undefined;}catch(e){}return false;},httpNotModified:function(xhr,url){try{var xhrRes=xhr.getResponseHeader("Last-Modified");return xhr.status==304||xhrRes==jQuery.lastModified[url]||jQuery.browser.safari&&xhr.status==undefined;}catch(e){}return false;},httpData:function(xhr,type,filter){var ct=xhr.getResponseHeader("content-type"),xml=type=="xml"||!type&&ct&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;if(xml&&data.documentElement.tagName=="parsererror")throw"parsererror";if(filter)data=filter(data,type);if(type=="script")jQuery.globalEval(data);if(type=="json")data=eval("("+data+")");return data;},param:function(a){var s=[];if(a.constructor==Array||a.jquery)jQuery.each(a,function(){s.push(encodeURIComponent(this.name)+"="+encodeURIComponent(this.value));});else
for(var j in a)if(a[j]&&a[j].constructor==Array)jQuery.each(a[j],function(){s.push(encodeURIComponent(j)+"="+encodeURIComponent(this));});else
s.push(encodeURIComponent(j)+"="+encodeURIComponent(jQuery.isFunction(a[j])?a[j]():a[j]));return s.join("&").replace(/%20/g,"+");}});jQuery.fn.extend({show:function(speed,callback){return speed?this.animate({height:"show",width:"show",opacity:"show"},speed,callback):this.filter(":hidden").each(function(){this.style.display=this.oldblock||"";if(jQuery.css(this,"display")=="none"){var elem=jQuery("<"+this.tagName+" />").appendTo("body");this.style.display=elem.css("display");if(this.style.display=="none")this.style.display="block";elem.remove();}}).end();},hide:function(speed,callback){return speed?this.animate({height:"hide",width:"hide",opacity:"hide"},speed,callback):this.filter(":visible").each(function(){this.oldblock=this.oldblock||jQuery.css(this,"display");this.style.display="none";}).end();},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2){return jQuery.isFunction(fn)&&jQuery.isFunction(fn2)?this._toggle.apply(this,arguments):fn?this.animate({height:"toggle",width:"toggle",opacity:"toggle"},fn,fn2):this.each(function(){jQuery(this)[jQuery(this).is(":hidden")?"show":"hide"]();});},slideDown:function(speed,callback){return this.animate({height:"show"},speed,callback);},slideUp:function(speed,callback){return this.animate({height:"hide"},speed,callback);},slideToggle:function(speed,callback){return this.animate({height:"toggle"},speed,callback);},fadeIn:function(speed,callback){return this.animate({opacity:"show"},speed,callback);},fadeOut:function(speed,callback){return this.animate({opacity:"hide"},speed,callback);},fadeTo:function(speed,to,callback){return this.animate({opacity:to},speed,callback);},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);return this[optall.queue===false?"each":"queue"](function(){if(this.nodeType!=1)return false;var opt=jQuery.extend({},optall),p,hidden=jQuery(this).is(":hidden"),self=this;for(p in prop){if(prop[p]=="hide"&&hidden||prop[p]=="show"&&!hidden)return opt.complete.call(this);if(p=="height"||p=="width"){opt.display=jQuery.css(this,"display");opt.overflow=this.style.overflow;}}if(opt.overflow!=null)this.style.overflow="hidden";opt.curAnim=jQuery.extend({},prop);jQuery.each(prop,function(name,val){var e=new jQuery.fx(self,opt,name);if(/toggle|show|hide/.test(val))e[val=="toggle"?hidden?"show":"hide":val](prop);else{var parts=val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),start=e.cur(true)||0;if(parts){var end=parseFloat(parts[2]),unit=parts[3]||"px";if(unit!="px"){self.style[name]=(end||1)+unit;start=((end||1)/e.cur(true))*start;self.style[name]=start+unit;}if(parts[1])end=((parts[1]=="-="?-1:1)*end)+start;e.custom(start,end,unit);}else
e.custom(start,val,"");}});return true;});},queue:function(type,fn){if(jQuery.isFunction(type)||(type&&type.constructor==Array)){fn=type;type="fx";}if(!type||(typeof type=="string"&&!fn))return queue(this[0],type);return this.each(function(){if(fn.constructor==Array)queue(this,type,fn);else{queue(this,type).push(fn);if(queue(this,type).length==1)fn.call(this);}});},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;if(clearQueue)this.queue([]);this.each(function(){for(var i=timers.length-1;i>=0;i--)if(timers[i].elem==this){if(gotoEnd)timers[i](true);timers.splice(i,1);}});if(!gotoEnd)this.dequeue();return this;}});var queue=function(elem,type,array){if(elem){type=type||"fx";var q=jQuery.data(elem,type+"queue");if(!q||array)q=jQuery.data(elem,type+"queue",jQuery.makeArray(array));}return q;};jQuery.fn.dequeue=function(type){type=type||"fx";return this.each(function(){var q=queue(this,type);q.shift();if(q.length)q[0].call(this);});};jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&speed.constructor==Object?speed:{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&easing.constructor!=Function&&easing};opt.duration=(opt.duration&&opt.duration.constructor==Number?opt.duration:jQuery.fx.speeds[opt.duration])||jQuery.fx.speeds.def;opt.old=opt.complete;opt.complete=function(){if(opt.queue!==false)jQuery(this).dequeue();if(jQuery.isFunction(opt.old))opt.old.call(this);};return opt;},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p;},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum;}},timers:[],timerId:null,fx:function(elem,options,prop){this.options=options;this.elem=elem;this.prop=prop;if(!options.orig)options.orig={};}});jQuery.fx.prototype={update:function(){if(this.options.step)this.options.step.call(this.elem,this.now,this);(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);if(this.prop=="height"||this.prop=="width")this.elem.style.display="block";},cur:function(force){if(this.elem[this.prop]!=null&&this.elem.style[this.prop]==null)return this.elem[this.prop];var r=parseFloat(jQuery.css(this.elem,this.prop,force));return r&&r>-10000?r:parseFloat(jQuery.curCSS(this.elem,this.prop))||0;},custom:function(from,to,unit){this.startTime=now();this.start=from;this.end=to;this.unit=unit||this.unit||"px";this.now=this.start;this.pos=this.state=0;this.update();var self=this;function t(gotoEnd){return self.step(gotoEnd);}t.elem=this.elem;jQuery.timers.push(t);if(jQuery.timerId==null){jQuery.timerId=setInterval(function(){var timers=jQuery.timers;for(var i=0;i<timers.length;i++)if(!timers[i]())timers.splice(i--,1);if(!timers.length){clearInterval(jQuery.timerId);jQuery.timerId=null;}},13);}},show:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.show=true;this.custom(0,this.cur());if(this.prop=="width"||this.prop=="height")this.elem.style[this.prop]="1px";jQuery(this.elem).show();},hide:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0);},step:function(gotoEnd){var t=now();if(gotoEnd||t>this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var done=true;for(var i in this.options.curAnim)if(this.options.curAnim[i]!==true)done=false;if(done){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(jQuery.css(this.elem,"display")=="none")this.elem.style.display="block";}if(this.options.hide)this.elem.style.display="none";if(this.options.hide||this.options.show)for(var p in this.options.curAnim)jQuery.attr(this.elem.style,p,this.options.orig[p]);}if(done)this.options.complete.call(this.elem);return false;}else{var n=t-this.startTime;this.state=n/this.options.duration;this.pos=jQuery.easing[this.options.easing||(jQuery.easing.swing?"swing":"linear")](this.state,n,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update();}return true;}};jQuery.extend(jQuery.fx,{speeds:{slow:600,fast:200,def:400},step:{scrollLeft:function(fx){fx.elem.scrollLeft=fx.now;},scrollTop:function(fx){fx.elem.scrollTop=fx.now;},opacity:function(fx){jQuery.attr(fx.elem.style,"opacity",fx.now);},_default:function(fx){fx.elem.style[fx.prop]=fx.now+fx.unit;}}});jQuery.fn.offset=function(){var left=0,top=0,elem=this[0],results;if(elem)with(jQuery.browser){var parent=elem.parentNode,offsetChild=elem,offsetParent=elem.offsetParent,doc=elem.ownerDocument,safari2=safari&&parseInt(version)<522&&!/adobeair/i.test(userAgent),css=jQuery.curCSS,fixed=css(elem,"position")=="fixed";if(elem.getBoundingClientRect){var box=elem.getBoundingClientRect();add(box.left+Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),box.top+Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));add(-doc.documentElement.clientLeft,-doc.documentElement.clientTop);}else{add(elem.offsetLeft,elem.offsetTop);while(offsetParent){add(offsetParent.offsetLeft,offsetParent.offsetTop);if(mozilla&&!/^t(able|d|h)$/i.test(offsetParent.tagName)||safari&&!safari2)border(offsetParent);if(!fixed&&css(offsetParent,"position")=="fixed")fixed=true;offsetChild=/^body$/i.test(offsetParent.tagName)?offsetChild:offsetParent;offsetParent=offsetParent.offsetParent;}while(parent&&parent.tagName&&!/^body|html$/i.test(parent.tagName)){if(!/^inline|table.*$/i.test(css(parent,"display")))add(-parent.scrollLeft,-parent.scrollTop);if(mozilla&&css(parent,"overflow")!="visible")border(parent);parent=parent.parentNode;}if((safari2&&(fixed||css(offsetChild,"position")=="absolute"))||(mozilla&&css(offsetChild,"position")!="absolute"))add(-doc.body.offsetLeft,-doc.body.offsetTop);if(fixed)add(Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));}results={top:top,left:left};}function border(elem){add(jQuery.curCSS(elem,"borderLeftWidth",true),jQuery.curCSS(elem,"borderTopWidth",true));}function add(l,t){left+=parseInt(l,10)||0;top+=parseInt(t,10)||0;}return results;};jQuery.fn.extend({position:function(){var left=0,top=0,results;if(this[0]){var offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=/^body|html$/i.test(offsetParent[0].tagName)?{top:0,left:0}:offsetParent.offset();offset.top-=num(this,'marginTop');offset.left-=num(this,'marginLeft');parentOffset.top+=num(offsetParent,'borderTopWidth');parentOffset.left+=num(offsetParent,'borderLeftWidth');results={top:offset.top-parentOffset.top,left:offset.left-parentOffset.left};}return results;},offsetParent:function(){var offsetParent=this[0].offsetParent;while(offsetParent&&(!/^body|html$/i.test(offsetParent.tagName)&&jQuery.css(offsetParent,'position')=='static'))offsetParent=offsetParent.offsetParent;return jQuery(offsetParent);}});jQuery.each(['Left','Top'],function(i,name){var method='scroll'+name;jQuery.fn[method]=function(val){if(!this[0])return;return val!=undefined?this.each(function(){this==window||this==document?window.scrollTo(!i?val:jQuery(window).scrollLeft(),i?val:jQuery(window).scrollTop()):this[method]=val;}):this[0]==window||this[0]==document?self[i?'pageYOffset':'pageXOffset']||jQuery.boxModel&&document.documentElement[method]||document.body[method]:this[0][method];};});jQuery.each(["Height","Width"],function(i,name){var tl=i?"Left":"Top",br=i?"Right":"Bottom";jQuery.fn["inner"+name]=function(){return this[name.toLowerCase()]()+num(this,"padding"+tl)+num(this,"padding"+br);};jQuery.fn["outer"+name]=function(margin){return this["inner"+name]()+num(this,"border"+tl+"Width")+num(this,"border"+br+"Width")+(margin?num(this,"margin"+tl)+num(this,"margin"+br):0);};});})();

;(function($){$.ui={plugin:{add:function(module,option,set){var proto=$.ui[module].prototype;for(var i in set){proto.plugins[i]=proto.plugins[i]||[];proto.plugins[i].push([option,set[i]]);}},call:function(instance,name,args){var set=instance.plugins[name];if(!set){return;}
for(var i=0;i<set.length;i++){if(instance.options[set[i][0]]){set[i][1].apply(instance.element,args);}}}},cssCache:{},css:function(name){if($.ui.cssCache[name]){return $.ui.cssCache[name];}
var tmp=$('<div class="ui-gen">').addClass(name).css({position:'absolute',top:'-5000px',left:'-5000px',display:'block'}).appendTo('body');$.ui.cssCache[name]=!!((!(/auto|default/).test(tmp.css('cursor'))||(/^[1-9]/).test(tmp.css('height'))||(/^[1-9]/).test(tmp.css('width'))||!(/none/).test(tmp.css('backgroundImage'))||!(/transparent|rgba\(0, 0, 0, 0\)/).test(tmp.css('backgroundColor'))));try{$('body').get(0).removeChild(tmp.get(0));}catch(e){}
return $.ui.cssCache[name];},disableSelection:function(e){e.unselectable="on";e.onselectstart=function(){return false;};if(e.style){e.style.MozUserSelect="none";}},enableSelection:function(e){e.unselectable="off";e.onselectstart=function(){return true;};if(e.style){e.style.MozUserSelect="";}},hasScroll:function(e,a){var scroll=/top/.test(a||"top")?'scrollTop':'scrollLeft',has=false;if(e[scroll]>0)return true;e[scroll]=1;has=e[scroll]>0?true:false;e[scroll]=0;return has;}};var _remove=$.fn.remove;$.fn.remove=function(){$("*",this).add(this).trigger("remove");return _remove.apply(this,arguments);};function getter(namespace,plugin,method){var methods=$[namespace][plugin].getter||[];methods=(typeof methods=="string"?methods.split(/,?\s+/):methods);return($.inArray(method,methods)!=-1);}
$.widget=function(name,prototype){var namespace=name.split(".")[0];name=name.split(".")[1];$.fn[name]=function(options){var isMethodCall=(typeof options=='string'),args=Array.prototype.slice.call(arguments,1);if(isMethodCall&&getter(namespace,name,options)){var instance=$.data(this[0],name);return(instance?instance[options].apply(instance,args):undefined);}
return this.each(function(){var instance=$.data(this,name);if(isMethodCall&&instance&&$.isFunction(instance[options])){instance[options].apply(instance,args);}else if(!isMethodCall){$.data(this,name,new $[namespace][name](this,options));}});};$[namespace][name]=function(element,options){var self=this;this.widgetName=name;this.widgetBaseClass=namespace+'-'+name;this.options=$.extend({},$.widget.defaults,$[namespace][name].defaults,options);this.element=$(element).bind('setData.'+name,function(e,key,value){return self.setData(key,value);}).bind('getData.'+name,function(e,key){return self.getData(key);}).bind('remove',function(){return self.destroy();});this.init();};$[namespace][name].prototype=$.extend({},$.widget.prototype,prototype);};$.widget.prototype={init:function(){},destroy:function(){this.element.removeData(this.widgetName);},getData:function(key){return this.options[key];},setData:function(key,value){this.options[key]=value;if(key=='disabled'){this.element[value?'addClass':'removeClass'](this.widgetBaseClass+'-disabled');}},enable:function(){this.setData('disabled',false);},disable:function(){this.setData('disabled',true);}};$.widget.defaults={disabled:false};$.ui.mouse={mouseInit:function(){var self=this;this.element.bind('mousedown.'+this.widgetName,function(e){return self.mouseDown(e);});if($.browser.msie){this._mouseUnselectable=this.element.attr('unselectable');this.element.attr('unselectable','on');}
this.started=false;},mouseDestroy:function(){this.element.unbind('.'+this.widgetName);($.browser.msie&&this.element.attr('unselectable',this._mouseUnselectable));},mouseDown:function(e){(this._mouseStarted&&this.mouseUp(e));this._mouseDownEvent=e;var self=this,btnIsLeft=(e.which==1),elIsCancel=(typeof this.options.cancel=="string"?$(e.target).is(this.options.cancel):false);if(!btnIsLeft||elIsCancel||!this.mouseCapture(e)){return true;}
this._mouseDelayMet=!this.options.delay;if(!this._mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){self._mouseDelayMet=true;},this.options.delay);}
if(this.mouseDistanceMet(e)&&this.mouseDelayMet(e)){this._mouseStarted=(this.mouseStart(e)!==false);if(!this._mouseStarted){e.preventDefault();return true;}}
this._mouseMoveDelegate=function(e){return self.mouseMove(e);};this._mouseUpDelegate=function(e){return self.mouseUp(e);};$(document).bind('mousemove.'+this.widgetName,this._mouseMoveDelegate).bind('mouseup.'+this.widgetName,this._mouseUpDelegate);return false;},mouseMove:function(e){if($.browser.msie&&!e.button){return this.mouseUp(e);}
if(this._mouseStarted){this.mouseDrag(e);return false;}
if(this.mouseDistanceMet(e)&&this.mouseDelayMet(e)){this._mouseStarted=(this.mouseStart(this._mouseDownEvent,e)!==false);(this._mouseStarted?this.mouseDrag(e):this.mouseUp(e));}
return!this._mouseStarted;},mouseUp:function(e){$(document).unbind('mousemove.'+this.widgetName,this._mouseMoveDelegate).unbind('mouseup.'+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;this.mouseStop(e);}
return false;},mouseDistanceMet:function(e){return(Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance);},mouseDelayMet:function(e){return this._mouseDelayMet;},mouseStart:function(e){},mouseDrag:function(e){},mouseStop:function(e){},mouseCapture:function(e){return true;}};$.ui.mouse.defaults={cancel:null,distance:1,delay:0};})(jQuery);(function($){$.widget("ui.draggable",$.extend($.ui.mouse,{init:function(){var o=this.options;if(o.helper=='original'&&!(/(relative|absolute|fixed)/).test(this.element.css('position')))
this.element.css('position','relative');this.element.addClass('ui-draggable');(o.disabled&&this.element.addClass('ui-draggable-disabled'));this.mouseInit();},mouseStart:function(e){var o=this.options;if(this.helper||o.disabled||$(e.target).is('.ui-resizable-handle'))return false;var handle=!this.options.handle||!$(this.options.handle,this.element).length?true:false;$(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==e.target)handle=true;});if(!handle)return false;if($.ui.ddmanager)$.ui.ddmanager.current=this;this.helper=$.isFunction(o.helper)?$(o.helper.apply(this.element[0],[e])):(o.helper=='clone'?this.element.clone():this.element);if(!this.helper.parents('body').length)this.helper.appendTo((o.appendTo=='parent'?this.element[0].parentNode:o.appendTo));if(this.helper[0]!=this.element[0]&&!(/(fixed|absolute)/).test(this.helper.css("position")))this.helper.css("position","absolute");this.margins={left:(parseInt(this.element.css("marginLeft"),10)||0),top:(parseInt(this.element.css("marginTop"),10)||0)};this.cssPosition=this.helper.css("position");this.offset=this.element.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};this.offset.click={left:e.pageX-this.offset.left,top:e.pageY-this.offset.top};this.offsetParent=this.helper.offsetParent();var po=this.offsetParent.offset();if(this.offsetParent[0]==document.body&&$.browser.mozilla)po={top:0,left:0};this.offset.parent={top:po.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:po.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)};var p=this.element.position();this.offset.relative=this.cssPosition=="relative"?{top:p.top-(parseInt(this.helper.css("top"),10)||0)+this.offsetParent[0].scrollTop,left:p.left-(parseInt(this.helper.css("left"),10)||0)+this.offsetParent[0].scrollLeft}:{top:0,left:0};this.originalPosition=this.generatePosition(e);this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()};if(o.cursorAt){if(o.cursorAt.left!=undefined)this.offset.click.left=o.cursorAt.left+this.margins.left;if(o.cursorAt.right!=undefined)this.offset.click.left=this.helperProportions.width-o.cursorAt.right+this.margins.left;if(o.cursorAt.top!=undefined)this.offset.click.top=o.cursorAt.top+this.margins.top;if(o.cursorAt.bottom!=undefined)this.offset.click.top=this.helperProportions.height-o.cursorAt.bottom+this.margins.top;}
if(o.containment){if(o.containment=='parent')o.containment=this.helper[0].parentNode;if(o.containment=='document'||o.containment=='window')this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,$(o.containment=='document'?document:window).width()-this.offset.relative.left-this.offset.parent.left-this.helperProportions.width-this.margins.left-(parseInt(this.element.css("marginRight"),10)||0),($(o.containment=='document'?document:window).height()||document.body.parentNode.scrollHeight)-this.offset.relative.top-this.offset.parent.top-this.helperProportions.height-this.margins.top-(parseInt(this.element.css("marginBottom"),10)||0)];if(!(/^(document|window|parent)$/).test(o.containment)){var ce=$(o.containment)[0];var co=$(o.containment).offset();this.containment=[co.left+(parseInt($(ce).css("borderLeftWidth"),10)||0)-this.offset.relative.left-this.offset.parent.left,co.top+(parseInt($(ce).css("borderTopWidth"),10)||0)-this.offset.relative.top-this.offset.parent.top,co.left+Math.max(ce.scrollWidth,ce.offsetWidth)-(parseInt($(ce).css("borderLeftWidth"),10)||0)-this.offset.relative.left-this.offset.parent.left-this.helperProportions.width-this.margins.left-(parseInt(this.element.css("marginRight"),10)||0),co.top+Math.max(ce.scrollHeight,ce.offsetHeight)-(parseInt($(ce).css("borderTopWidth"),10)||0)-this.offset.relative.top-this.offset.parent.top-this.helperProportions.height-this.margins.top-(parseInt(this.element.css("marginBottom"),10)||0)];}}
this.propagate("start",e);this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()};if($.ui.ddmanager&&!o.dropBehaviour)$.ui.ddmanager.prepareOffsets(this,e);this.helper.addClass("ui-draggable-dragging");this.mouseDrag(e);return true;},convertPositionTo:function(d,pos){if(!pos)pos=this.position;var mod=d=="absolute"?1:-1;return{top:(pos.top
+this.offset.relative.top*mod
+this.offset.parent.top*mod
-(this.cssPosition=="fixed"||(this.cssPosition=="absolute"&&this.offsetParent[0]==document.body)?0:this.offsetParent[0].scrollTop)*mod
+(this.cssPosition=="fixed"?$(document).scrollTop():0)*mod
+this.margins.top*mod),left:(pos.left
+this.offset.relative.left*mod
+this.offset.parent.left*mod
-(this.cssPosition=="fixed"||(this.cssPosition=="absolute"&&this.offsetParent[0]==document.body)?0:this.offsetParent[0].scrollLeft)*mod
+(this.cssPosition=="fixed"?$(document).scrollLeft():0)*mod
+this.margins.left*mod)};},generatePosition:function(e){var o=this.options;var position={top:(e.pageY
-this.offset.click.top
-this.offset.relative.top
-this.offset.parent.top
+(this.cssPosition=="fixed"||(this.cssPosition=="absolute"&&this.offsetParent[0]==document.body)?0:this.offsetParent[0].scrollTop)
-(this.cssPosition=="fixed"?$(document).scrollTop():0)),left:(e.pageX
-this.offset.click.left
-this.offset.relative.left
-this.offset.parent.left
+(this.cssPosition=="fixed"||(this.cssPosition=="absolute"&&this.offsetParent[0]==document.body)?0:this.offsetParent[0].scrollLeft)
-(this.cssPosition=="fixed"?$(document).scrollLeft():0))};if(!this.originalPosition)return position;if(this.containment){if(position.left<this.containment[0])position.left=this.containment[0];if(position.top<this.containment[1])position.top=this.containment[1];if(position.left>this.containment[2])position.left=this.containment[2];if(position.top>this.containment[3])position.top=this.containment[3];}
if(o.grid){var top=this.originalPosition.top+Math.round((position.top-this.originalPosition.top)/o.grid[1])*o.grid[1];position.top=this.containment?(!(top<this.containment[1]||top>this.containment[3])?top:(!(top<this.containment[1])?top-o.grid[1]:top+o.grid[1])):top;var left=this.originalPosition.left+Math.round((position.left-this.originalPosition.left)/o.grid[0])*o.grid[0];position.left=this.containment?(!(left<this.containment[0]||left>this.containment[2])?left:(!(left<this.containment[0])?left-o.grid[0]:left+o.grid[0])):left;}
return position;},mouseDrag:function(e){this.position=this.generatePosition(e);this.positionAbs=this.convertPositionTo("absolute");this.position=this.propagate("drag",e)||this.position;if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+'px';if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+'px';if($.ui.ddmanager)$.ui.ddmanager.drag(this,e);return false;},mouseStop:function(e){if($.ui.ddmanager&&!this.options.dropBehaviour)
$.ui.ddmanager.drop(this,e);if(this.options.revert){var self=this;$(this.helper).animate(this.originalPosition,parseInt(this.options.revert,10)||500,function(){self.propagate("stop",e);self.clear();});}else{this.propagate("stop",e);this.clear();}
return false;},clear:function(){this.helper.removeClass("ui-draggable-dragging");if(this.options.helper!='original'&&!this.cancelHelperRemoval)this.helper.remove();this.helper=null;this.cancelHelperRemoval=false;},plugins:{},uiHash:function(e){return{helper:this.helper,position:this.position,absolutePosition:this.positionAbs,options:this.options};},propagate:function(n,e){$.ui.plugin.call(this,n,[e,this.uiHash()]);return this.element.triggerHandler(n=="drag"?n:"drag"+n,[e,this.uiHash()],this.options[n]);},destroy:function(){if(!this.element.data('draggable'))return;this.element.removeData("draggable").unbind(".draggable").removeClass('ui-draggable');this.mouseDestroy();}}));$.extend($.ui.draggable,{defaults:{appendTo:"parent",axis:false,cancel:":input",delay:0,distance:1,helper:"original"}});$.ui.plugin.add("draggable","cursor",{start:function(e,ui){var t=$('body');if(t.css("cursor"))ui.options._cursor=t.css("cursor");t.css("cursor",ui.options.cursor);},stop:function(e,ui){if(ui.options._cursor)$('body').css("cursor",ui.options._cursor);}});$.ui.plugin.add("draggable","zIndex",{start:function(e,ui){var t=$(ui.helper);if(t.css("zIndex"))ui.options._zIndex=t.css("zIndex");t.css('zIndex',ui.options.zIndex);},stop:function(e,ui){if(ui.options._zIndex)$(ui.helper).css('zIndex',ui.options._zIndex);}});$.ui.plugin.add("draggable","opacity",{start:function(e,ui){var t=$(ui.helper);if(t.css("opacity"))ui.options._opacity=t.css("opacity");t.css('opacity',ui.options.opacity);},stop:function(e,ui){if(ui.options._opacity)$(ui.helper).css('opacity',ui.options._opacity);}});$.ui.plugin.add("draggable","iframeFix",{start:function(e,ui){$(ui.options.iframeFix===true?"iframe":ui.options.iframeFix).each(function(){$('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1000}).css($(this).offset()).appendTo("body");});},stop:function(e,ui){$("div.DragDropIframeFix").each(function(){this.parentNode.removeChild(this);});}});$.ui.plugin.add("draggable","scroll",{start:function(e,ui){var o=ui.options;var i=$(this).data("draggable");o.scrollSensitivity=o.scrollSensitivity||20;o.scrollSpeed=o.scrollSpeed||20;i.overflowY=function(el){do{if(/auto|scroll/.test(el.css('overflow'))||(/auto|scroll/).test(el.css('overflow-y')))return el;el=el.parent();}while(el[0].parentNode);return $(document);}(this);i.overflowX=function(el){do{if(/auto|scroll/.test(el.css('overflow'))||(/auto|scroll/).test(el.css('overflow-x')))return el;el=el.parent();}while(el[0].parentNode);return $(document);}(this);if(i.overflowY[0]!=document&&i.overflowY[0].tagName!='HTML')i.overflowYOffset=i.overflowY.offset();if(i.overflowX[0]!=document&&i.overflowX[0].tagName!='HTML')i.overflowXOffset=i.overflowX.offset();},drag:function(e,ui){var o=ui.options;var i=$(this).data("draggable");if(i.overflowY[0]!=document&&i.overflowY[0].tagName!='HTML'){if((i.overflowYOffset.top+i.overflowY[0].offsetHeight)-e.pageY<o.scrollSensitivity)
i.overflowY[0].scrollTop=i.overflowY[0].scrollTop+o.scrollSpeed;if(e.pageY-i.overflowYOffset.top<o.scrollSensitivity)
i.overflowY[0].scrollTop=i.overflowY[0].scrollTop-o.scrollSpeed;}else{if(e.pageY-$(document).scrollTop()<o.scrollSensitivity)
$(document).scrollTop($(document).scrollTop()-o.scrollSpeed);if($(window).height()-(e.pageY-$(document).scrollTop())<o.scrollSensitivity)
$(document).scrollTop($(document).scrollTop()+o.scrollSpeed);}
if(i.overflowX[0]!=document&&i.overflowX[0].tagName!='HTML'){if((i.overflowXOffset.left+i.overflowX[0].offsetWidth)-e.pageX<o.scrollSensitivity)
i.overflowX[0].scrollLeft=i.overflowX[0].scrollLeft+o.scrollSpeed;if(e.pageX-i.overflowXOffset.left<o.scrollSensitivity)
i.overflowX[0].scrollLeft=i.overflowX[0].scrollLeft-o.scrollSpeed;}else{if(e.pageX-$(document).scrollLeft()<o.scrollSensitivity)
$(document).scrollLeft($(document).scrollLeft()-o.scrollSpeed);if($(window).width()-(e.pageX-$(document).scrollLeft())<o.scrollSensitivity)
$(document).scrollLeft($(document).scrollLeft()+o.scrollSpeed);}}});$.ui.plugin.add("draggable","snap",{start:function(e,ui){var inst=$(this).data("draggable");inst.snapElements=[];$(ui.options.snap===true?'.ui-draggable':ui.options.snap).each(function(){var $t=$(this);var $o=$t.offset();if(this!=inst.element[0])inst.snapElements.push({item:this,width:$t.outerWidth(),height:$t.outerHeight(),top:$o.top,left:$o.left});});},drag:function(e,ui){var inst=$(this).data("draggable");var d=ui.options.snapTolerance||20;var x1=ui.absolutePosition.left,x2=x1+inst.helperProportions.width,y1=ui.absolutePosition.top,y2=y1+inst.helperProportions.height;for(var i=inst.snapElements.length-1;i>=0;i--){var l=inst.snapElements[i].left,r=l+inst.snapElements[i].width,t=inst.snapElements[i].top,b=t+inst.snapElements[i].height;if(!((l-d<x1&&x1<r+d&&t-d<y1&&y1<b+d)||(l-d<x1&&x1<r+d&&t-d<y2&&y2<b+d)||(l-d<x2&&x2<r+d&&t-d<y1&&y1<b+d)||(l-d<x2&&x2<r+d&&t-d<y2&&y2<b+d)))continue;if(ui.options.snapMode!='inner'){var ts=Math.abs(t-y2)<=20;var bs=Math.abs(b-y1)<=20;var ls=Math.abs(l-x2)<=20;var rs=Math.abs(r-x1)<=20;if(ts)ui.position.top=inst.convertPositionTo("relative",{top:t-inst.helperProportions.height,left:0}).top;if(bs)ui.position.top=inst.convertPositionTo("relative",{top:b,left:0}).top;if(ls)ui.position.left=inst.convertPositionTo("relative",{top:0,left:l-inst.helperProportions.width}).left;if(rs)ui.position.left=inst.convertPositionTo("relative",{top:0,left:r}).left;}
if(ui.options.snapMode!='outer'){var ts=Math.abs(t-y1)<=20;var bs=Math.abs(b-y2)<=20;var ls=Math.abs(l-x1)<=20;var rs=Math.abs(r-x2)<=20;if(ts)ui.position.top=inst.convertPositionTo("relative",{top:t,left:0}).top;if(bs)ui.position.top=inst.convertPositionTo("relative",{top:b-inst.helperProportions.height,left:0}).top;if(ls)ui.position.left=inst.convertPositionTo("relative",{top:0,left:l}).left;if(rs)ui.position.left=inst.convertPositionTo("relative",{top:0,left:r-inst.helperProportions.width}).left;}};}});$.ui.plugin.add("draggable","connectToSortable",{start:function(e,ui){var inst=$(this).data("draggable");inst.sortables=[];$(ui.options.connectToSortable).each(function(){if($.data(this,'sortable')){var sortable=$.data(this,'sortable');inst.sortables.push({instance:sortable,shouldRevert:sortable.options.revert});sortable.refreshItems();sortable.propagate("activate",e,inst);}});},stop:function(e,ui){var inst=$(this).data("draggable");$.each(inst.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;inst.cancelHelperRemoval=true;this.instance.cancelHelperRemoval=false;if(this.shouldRevert)this.instance.options.revert=true;this.instance.mouseStop(e);this.instance.element.triggerHandler("sortreceive",[e,$.extend(this.instance.ui(),{sender:inst.element})],this.instance.options["receive"]);this.instance.options.helper=this.instance.options._helper;}else{this.instance.propagate("deactivate",e,inst);}});},drag:function(e,ui){var inst=$(this).data("draggable"),self=this;var checkPos=function(o){var l=o.left,r=l+o.width,t=o.top,b=t+o.height;return(l<(this.positionAbs.left+this.offset.click.left)&&(this.positionAbs.left+this.offset.click.left)<r&&t<(this.positionAbs.top+this.offset.click.top)&&(this.positionAbs.top+this.offset.click.top)<b);};$.each(inst.sortables,function(i){if(checkPos.call(inst,this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;this.instance.currentItem=$(self).clone().appendTo(this.instance.element).data("sortable-item",true);this.instance.options._helper=this.instance.options.helper;this.instance.options.helper=function(){return ui.helper[0];};e.target=this.instance.currentItem[0];this.instance.mouseCapture(e,true);this.instance.mouseStart(e,true,true);this.instance.offset.click.top=inst.offset.click.top;this.instance.offset.click.left=inst.offset.click.left;this.instance.offset.parent.left-=inst.offset.parent.left-this.instance.offset.parent.left;this.instance.offset.parent.top-=inst.offset.parent.top-this.instance.offset.parent.top;inst.propagate("toSortable",e);}
if(this.instance.currentItem)this.instance.mouseDrag(e);}else{if(this.instance.isOver){this.instance.isOver=0;this.instance.cancelHelperRemoval=true;this.instance.options.revert=false;this.instance.mouseStop(e,true);this.instance.options.helper=this.instance.options._helper;this.instance.currentItem.remove();if(this.instance.placeholder)this.instance.placeholder.remove();inst.propagate("fromSortable",e);}};});}});$.ui.plugin.add("draggable","stack",{start:function(e,ui){var group=$.makeArray($(ui.options.stack.group)).sort(function(a,b){return(parseInt($(a).css("zIndex"),10)||ui.options.stack.min)-(parseInt($(b).css("zIndex"),10)||ui.options.stack.min);});$(group).each(function(i){this.style.zIndex=ui.options.stack.min+i;});this[0].style.zIndex=ui.options.stack.min+group.length;}});})(jQuery);(function($){$.widget("ui.droppable",{init:function(){this.element.addClass("ui-droppable");this.isover=0;this.isout=1;var o=this.options,accept=o.accept;o=$.extend(o,{accept:o.accept&&o.accept.constructor==Function?o.accept:function(d){return $(d).is(accept);}});this.proportions={width:this.element.outerWidth(),height:this.element.outerHeight()};$.ui.ddmanager.droppables.push(this);},plugins:{},ui:function(c){return{draggable:(c.currentItem||c.element),helper:c.helper,position:c.position,absolutePosition:c.positionAbs,options:this.options,element:this.element};},destroy:function(){var drop=$.ui.ddmanager.droppables;for(var i=0;i<drop.length;i++)
if(drop[i]==this)
drop.splice(i,1);this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");},over:function(e){var draggable=$.ui.ddmanager.current;if(!draggable||(draggable.currentItem||draggable.element)[0]==this.element[0])return;if(this.options.accept.call(this.element,(draggable.currentItem||draggable.element))){$.ui.plugin.call(this,'over',[e,this.ui(draggable)]);this.element.triggerHandler("dropover",[e,this.ui(draggable)],this.options.over);}},out:function(e){var draggable=$.ui.ddmanager.current;if(!draggable||(draggable.currentItem||draggable.element)[0]==this.element[0])return;if(this.options.accept.call(this.element,(draggable.currentItem||draggable.element))){$.ui.plugin.call(this,'out',[e,this.ui(draggable)]);this.element.triggerHandler("dropout",[e,this.ui(draggable)],this.options.out);}},drop:function(e,custom){var draggable=custom||$.ui.ddmanager.current;if(!draggable||(draggable.currentItem||draggable.element)[0]==this.element[0])return false;var childrenIntersection=false;this.element.find(".ui-droppable").not(".ui-draggable-dragging").each(function(){var inst=$.data(this,'droppable');if(inst.options.greedy&&$.ui.intersect(draggable,$.extend(inst,{offset:inst.element.offset()}),inst.options.tolerance)){childrenIntersection=true;return false;}});if(childrenIntersection)return false;if(this.options.accept.call(this.element,(draggable.currentItem||draggable.element))){$.ui.plugin.call(this,'drop',[e,this.ui(draggable)]);this.element.triggerHandler("drop",[e,this.ui(draggable)],this.options.drop);return true;}
return false;},activate:function(e){var draggable=$.ui.ddmanager.current;$.ui.plugin.call(this,'activate',[e,this.ui(draggable)]);if(draggable)this.element.triggerHandler("dropactivate",[e,this.ui(draggable)],this.options.activate);},deactivate:function(e){var draggable=$.ui.ddmanager.current;$.ui.plugin.call(this,'deactivate',[e,this.ui(draggable)]);if(draggable)this.element.triggerHandler("dropdeactivate",[e,this.ui(draggable)],this.options.deactivate);}});$.extend($.ui.droppable,{defaults:{disabled:false,tolerance:'intersect'}});$.ui.intersect=function(draggable,droppable,toleranceMode){if(!droppable.offset)return false;var x1=(draggable.positionAbs||draggable.position.absolute).left,x2=x1+draggable.helperProportions.width,y1=(draggable.positionAbs||draggable.position.absolute).top,y2=y1+draggable.helperProportions.height;var l=droppable.offset.left,r=l+droppable.proportions.width,t=droppable.offset.top,b=t+droppable.proportions.height;switch(toleranceMode){case'fit':return(l<x1&&x2<r&&t<y1&&y2<b);break;case'intersect':return(l<x1+(draggable.helperProportions.width/2)&&x2-(draggable.helperProportions.width/2)<r&&t<y1+(draggable.helperProportions.height/2)&&y2-(draggable.helperProportions.height/2)<b);break;case'pointer':return(l<((draggable.positionAbs||draggable.position.absolute).left+(draggable.clickOffset||draggable.offset.click).left)&&((draggable.positionAbs||draggable.position.absolute).left+(draggable.clickOffset||draggable.offset.click).left)<r&&t<((draggable.positionAbs||draggable.position.absolute).top+(draggable.clickOffset||draggable.offset.click).top)&&((draggable.positionAbs||draggable.position.absolute).top+(draggable.clickOffset||draggable.offset.click).top)<b);break;case'touch':return((y1>=t&&y1<=b)||(y2>=t&&y2<=b)||(y1<t&&y2>b))&&((x1>=l&&x1<=r)||(x2>=l&&x2<=r)||(x1<l&&x2>r));break;default:return false;break;}};$.ui.ddmanager={current:null,droppables:[],prepareOffsets:function(t,e){var m=$.ui.ddmanager.droppables;var type=e?e.type:null;for(var i=0;i<m.length;i++){if(m[i].options.disabled||(t&&!m[i].options.accept.call(m[i].element,(t.currentItem||t.element))))continue;m[i].visible=m[i].element.is(":visible");if(!m[i].visible)continue;m[i].offset=m[i].element.offset();m[i].proportions={width:m[i].element.outerWidth(),height:m[i].element.outerHeight()};if(type=="dragstart"||type=="sortactivate")m[i].activate.call(m[i],e);}},drop:function(draggable,e){var dropped=false;$.each($.ui.ddmanager.droppables,function(){if(!this.options)return;if(!this.options.disabled&&this.visible&&$.ui.intersect(draggable,this,this.options.tolerance))
dropped=this.drop.call(this,e);if(!this.options.disabled&&this.visible&&this.options.accept.call(this.element,(draggable.currentItem||draggable.element))){this.isout=1;this.isover=0;this.deactivate.call(this,e);}});return dropped;},drag:function(draggable,e){if(draggable.options.refreshPositions)$.ui.ddmanager.prepareOffsets(draggable,e);$.each($.ui.ddmanager.droppables,function(){if(this.options.disabled||this.greedyChild||!this.visible)return;var intersects=$.ui.intersect(draggable,this,this.options.tolerance);var c=!intersects&&this.isover==1?'isout':(intersects&&this.isover==0?'isover':null);if(!c)return;var parentInstance;if(this.options.greedy){var parent=this.element.parents('.ui-droppable:eq(0)');if(parent.length){parentInstance=$.data(parent[0],'droppable');parentInstance.greedyChild=(c=='isover'?1:0);}}
if(parentInstance&&c=='isover'){parentInstance['isover']=0;parentInstance['isout']=1;parentInstance.out.call(parentInstance,e);}
this[c]=1;this[c=='isout'?'isover':'isout']=0;this[c=="isover"?"over":"out"].call(this,e);if(parentInstance&&c=='isout'){parentInstance['isout']=0;parentInstance['isover']=1;parentInstance.over.call(parentInstance,e);}});}};$.ui.plugin.add("droppable","activeClass",{activate:function(e,ui){$(this).addClass(ui.options.activeClass);},deactivate:function(e,ui){$(this).removeClass(ui.options.activeClass);},drop:function(e,ui){$(this).removeClass(ui.options.activeClass);}});$.ui.plugin.add("droppable","hoverClass",{over:function(e,ui){$(this).addClass(ui.options.hoverClass);},out:function(e,ui){$(this).removeClass(ui.options.hoverClass);},drop:function(e,ui){$(this).removeClass(ui.options.hoverClass);}});})(jQuery);(function($){function contains(a,b){var safari2=$.browser.safari&&$.browser.version<522;if(a.contains&&!safari2){return a.contains(b);}
if(a.compareDocumentPosition)
return!!(a.compareDocumentPosition(b)&16);while(b=b.parentNode)
if(b==a)return true;return false;};$.widget("ui.sortable",$.extend($.ui.mouse,{init:function(){var o=this.options;this.containerCache={};this.element.addClass("ui-sortable");this.refresh();this.floating=this.items.length?(/left|right/).test(this.items[0].item.css('float')):false;if(!(/(relative|absolute|fixed)/).test(this.element.css('position')))this.element.css('position','relative');this.offset=this.element.offset();this.mouseInit();},plugins:{},ui:function(inst){return{helper:(inst||this)["helper"],placeholder:(inst||this)["placeholder"]||$([]),position:(inst||this)["position"],absolutePosition:(inst||this)["positionAbs"],options:this.options,element:this.element,item:(inst||this)["currentItem"],sender:inst?inst.element:null};},propagate:function(n,e,inst,noPropagation){$.ui.plugin.call(this,n,[e,this.ui(inst)]);if(!noPropagation)this.element.triggerHandler(n=="sort"?n:"sort"+n,[e,this.ui(inst)],this.options[n]);},serialize:function(o){var items=($.isFunction(this.options.items)?this.options.items.call(this.element):$(this.options.items,this.element)).not('.ui-sortable-helper');var str=[];o=o||{};items.each(function(){var res=($(this).attr(o.attribute||'id')||'').match(o.expression||(/(.+)[-=_](.+)/));if(res)str.push((o.key||res[1])+'[]='+(o.key&&o.expression?res[1]:res[2]));});return str.join('&');},toArray:function(attr){var items=($.isFunction(this.options.items)?this.options.items.call(this.element):$(this.options.items,this.element)).not('.ui-sortable-helper');var ret=[];items.each(function(){ret.push($(this).attr(attr||'id'));});return ret;},intersectsWith:function(item){var x1=this.positionAbs.left,x2=x1+this.helperProportions.width,y1=this.positionAbs.top,y2=y1+this.helperProportions.height;var l=item.left,r=l+item.width,t=item.top,b=t+item.height;if(this.options.tolerance=="pointer"||(this.options.tolerance=="guess"&&this.helperProportions[this.floating?'width':'height']>item[this.floating?'width':'height'])){return(y1+this.offset.click.top>t&&y1+this.offset.click.top<b&&x1+this.offset.click.left>l&&x1+this.offset.click.left<r);}else{return(l<x1+(this.helperProportions.width/2)&&x2-(this.helperProportions.width/2)<r&&t<y1+(this.helperProportions.height/2)&&y2-(this.helperProportions.height/2)<b);}},intersectsWithEdge:function(item){var x1=this.positionAbs.left,x2=x1+this.helperProportions.width,y1=this.positionAbs.top,y2=y1+this.helperProportions.height;var l=item.left,r=l+item.width,t=item.top,b=t+item.height;if(this.options.tolerance=="pointer"||(this.options.tolerance=="guess"&&this.helperProportions[this.floating?'width':'height']>item[this.floating?'width':'height'])){if(!(y1+this.offset.click.top>t&&y1+this.offset.click.top<b&&x1+this.offset.click.left>l&&x1+this.offset.click.left<r))return false;if(this.floating){if(x1+this.offset.click.left>l&&x1+this.offset.click.left<l+item.width/2)return 2;if(x1+this.offset.click.left>l+item.width/2&&x1+this.offset.click.left<r)return 1;}else{if(y1+this.offset.click.top>t&&y1+this.offset.click.top<t+item.height/2)return 2;if(y1+this.offset.click.top>t+item.height/2&&y1+this.offset.click.top<b)return 1;}}else{if(!(l<x1+(this.helperProportions.width/2)&&x2-(this.helperProportions.width/2)<r&&t<y1+(this.helperProportions.height/2)&&y2-(this.helperProportions.height/2)<b))return false;if(this.floating){if(x2>l&&x1<l)return 2;if(x1<r&&x2>r)return 1;}else{if(y2>t&&y1<t)return 1;if(y1<b&&y2>b)return 2;}}
return false;},refresh:function(){this.refreshItems();this.refreshPositions();},refreshItems:function(){this.items=[];this.containers=[this];var items=this.items;var self=this;var queries=[[$.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):$(this.options.items,this.element),this]];if(this.options.connectWith){for(var i=this.options.connectWith.length-1;i>=0;i--){var cur=$(this.options.connectWith[i]);for(var j=cur.length-1;j>=0;j--){var inst=$.data(cur[j],'sortable');if(inst&&!inst.options.disabled){queries.push([$.isFunction(inst.options.items)?inst.options.items.call(inst.element):$(inst.options.items,inst.element),inst]);this.containers.push(inst);}};};}
for(var i=queries.length-1;i>=0;i--){queries[i][0].each(function(){$.data(this,'sortable-item',queries[i][1]);items.push({item:$(this),instance:queries[i][1],width:0,height:0,left:0,top:0});});};},refreshPositions:function(fast){if(this.offsetParent){var po=this.offsetParent.offset();this.offset.parent={top:po.top+this.offsetParentBorders.top,left:po.left+this.offsetParentBorders.left};}
for(var i=this.items.length-1;i>=0;i--){if(this.items[i].instance!=this.currentContainer&&this.currentContainer&&this.items[i].item[0]!=this.currentItem[0])
continue;var t=this.options.toleranceElement?$(this.options.toleranceElement,this.items[i].item):this.items[i].item;if(!fast){this.items[i].width=t.outerWidth();this.items[i].height=t.outerHeight();}
var p=t.offset();this.items[i].left=p.left;this.items[i].top=p.top;};for(var i=this.containers.length-1;i>=0;i--){var p=this.containers[i].element.offset();this.containers[i].containerCache.left=p.left;this.containers[i].containerCache.top=p.top;this.containers[i].containerCache.width=this.containers[i].element.outerWidth();this.containers[i].containerCache.height=this.containers[i].element.outerHeight();};},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");this.mouseDestroy();for(var i=this.items.length-1;i>=0;i--)
this.items[i].item.removeData("sortable-item");},createPlaceholder:function(that){var self=that||this,o=self.options;if(o.placeholder.constructor==String){var className=o.placeholder;o.placeholder={element:function(){return $('<div></div>').addClass(className)[0];},update:function(i,p){p.css(i.offset()).css({width:i.outerWidth(),height:i.outerHeight()});}};}
self.placeholder=$(o.placeholder.element.call(self.element,self.currentItem)).appendTo('body').css({position:'absolute'});o.placeholder.update.call(self.element,self.currentItem,self.placeholder);},contactContainers:function(e){for(var i=this.containers.length-1;i>=0;i--){if(this.intersectsWith(this.containers[i].containerCache)){if(!this.containers[i].containerCache.over){if(this.currentContainer!=this.containers[i]){var dist=10000;var itemWithLeastDistance=null;var base=this.positionAbs[this.containers[i].floating?'left':'top'];for(var j=this.items.length-1;j>=0;j--){if(!contains(this.containers[i].element[0],this.items[j].item[0]))continue;var cur=this.items[j][this.containers[i].floating?'left':'top'];if(Math.abs(cur-base)<dist){dist=Math.abs(cur-base);itemWithLeastDistance=this.items[j];}}
if(!itemWithLeastDistance&&!this.options.dropOnEmpty)
continue;if(this.placeholder)this.placeholder.remove();if(this.containers[i].options.placeholder){this.containers[i].createPlaceholder(this);}else{this.placeholder=null;;}
this.currentContainer=this.containers[i];itemWithLeastDistance?this.rearrange(e,itemWithLeastDistance,null,true):this.rearrange(e,null,this.containers[i].element,true);this.propagate("change",e);this.containers[i].propagate("change",e,this);}
this.containers[i].propagate("over",e,this);this.containers[i].containerCache.over=1;}}else{if(this.containers[i].containerCache.over){this.containers[i].propagate("out",e,this);this.containers[i].containerCache.over=0;}}};},mouseCapture:function(e,overrideHandle){if(this.options.disabled||this.options.type=='static')return false;this.refreshItems();var currentItem=null,self=this,nodes=$(e.target).parents().each(function(){if($.data(this,'sortable-item')==self){currentItem=$(this);return false;}});if($.data(e.target,'sortable-item')==self)currentItem=$(e.target);if(!currentItem)return false;if(this.options.handle&&!overrideHandle){var validHandle=false;$(this.options.handle,currentItem).find("*").andSelf().each(function(){if(this==e.target)validHandle=true;});if(!validHandle)return false;}
this.currentItem=currentItem;return true;},mouseStart:function(e,overrideHandle,noActivation){var o=this.options;this.currentContainer=this;this.refreshPositions();this.helper=typeof o.helper=='function'?$(o.helper.apply(this.element[0],[e,this.currentItem])):this.currentItem.clone();if(!this.helper.parents('body').length)this.helper.appendTo((o.appendTo!='parent'?o.appendTo:this.currentItem[0].parentNode));this.helper.css({position:'absolute',clear:'both'}).addClass('ui-sortable-helper');this.margins={left:(parseInt(this.currentItem.css("marginLeft"),10)||0),top:(parseInt(this.currentItem.css("marginTop"),10)||0)};this.offset=this.currentItem.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};this.offset.click={left:e.pageX-this.offset.left,top:e.pageY-this.offset.top};this.offsetParent=this.helper.offsetParent();var po=this.offsetParent.offset();this.offsetParentBorders={top:(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)};this.offset.parent={top:po.top+this.offsetParentBorders.top,left:po.left+this.offsetParentBorders.left};this.originalPosition=this.generatePosition(e);this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()};if(o.placeholder)this.createPlaceholder();this.propagate("start",e);this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()};if(o.cursorAt){if(o.cursorAt.left!=undefined)this.offset.click.left=o.cursorAt.left;if(o.cursorAt.right!=undefined)this.offset.click.left=this.helperProportions.width-o.cursorAt.right;if(o.cursorAt.top!=undefined)this.offset.click.top=o.cursorAt.top;if(o.cursorAt.bottom!=undefined)this.offset.click.top=this.helperProportions.height-o.cursorAt.bottom;}
if(o.containment){if(o.containment=='parent')o.containment=this.helper[0].parentNode;if(o.containment=='document'||o.containment=='window')this.containment=[0-this.offset.parent.left,0-this.offset.parent.top,$(o.containment=='document'?document:window).width()-this.offset.parent.left-this.helperProportions.width-this.margins.left-(parseInt(this.element.css("marginRight"),10)||0),($(o.containment=='document'?document:window).height()||document.body.parentNode.scrollHeight)-this.offset.parent.top-this.helperProportions.height-this.margins.top-(parseInt(this.element.css("marginBottom"),10)||0)];if(!(/^(document|window|parent)$/).test(o.containment)){var ce=$(o.containment)[0];var co=$(o.containment).offset();this.containment=[co.left+(parseInt($(ce).css("borderLeftWidth"),10)||0)-this.offset.parent.left,co.top+(parseInt($(ce).css("borderTopWidth"),10)||0)-this.offset.parent.top,co.left+Math.max(ce.scrollWidth,ce.offsetWidth)-(parseInt($(ce).css("borderLeftWidth"),10)||0)-this.offset.parent.left-this.helperProportions.width-this.margins.left-(parseInt(this.currentItem.css("marginRight"),10)||0),co.top+Math.max(ce.scrollHeight,ce.offsetHeight)-(parseInt($(ce).css("borderTopWidth"),10)||0)-this.offset.parent.top-this.helperProportions.height-this.margins.top-(parseInt(this.currentItem.css("marginBottom"),10)||0)];}}
if(this.options.placeholder!='clone')
this.currentItem.css('visibility','hidden');if(!noActivation){for(var i=this.containers.length-1;i>=0;i--){this.containers[i].propagate("activate",e,this);}}
if($.ui.ddmanager)$.ui.ddmanager.current=this;if($.ui.ddmanager&&!o.dropBehaviour)$.ui.ddmanager.prepareOffsets(this,e);this.dragging=true;this.mouseDrag(e);return true;},convertPositionTo:function(d,pos){if(!pos)pos=this.position;var mod=d=="absolute"?1:-1;return{top:(pos.top
+this.offset.parent.top*mod
-(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)*mod
+this.margins.top*mod),left:(pos.left
+this.offset.parent.left*mod
-(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft)*mod
+this.margins.left*mod)};},generatePosition:function(e){var o=this.options;var position={top:(e.pageY
-this.offset.click.top
-this.offset.parent.top
+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)),left:(e.pageX
-this.offset.click.left
-this.offset.parent.left
+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft))};if(!this.originalPosition)return position;if(this.containment){if(position.left<this.containment[0])position.left=this.containment[0];if(position.top<this.containment[1])position.top=this.containment[1];if(position.left>this.containment[2])position.left=this.containment[2];if(position.top>this.containment[3])position.top=this.containment[3];}
if(o.grid){var top=this.originalPosition.top+Math.round((position.top-this.originalPosition.top)/o.grid[1])*o.grid[1];position.top=this.containment?(!(top<this.containment[1]||top>this.containment[3])?top:(!(top<this.containment[1])?top-o.grid[1]:top+o.grid[1])):top;var left=this.originalPosition.left+Math.round((position.left-this.originalPosition.left)/o.grid[0])*o.grid[0];position.left=this.containment?(!(left<this.containment[0]||left>this.containment[2])?left:(!(left<this.containment[0])?left-o.grid[0]:left+o.grid[0])):left;}
return position;},mouseDrag:function(e){this.position=this.generatePosition(e);this.positionAbs=this.convertPositionTo("absolute");for(var i=this.items.length-1;i>=0;i--){var intersection=this.intersectsWithEdge(this.items[i]);if(!intersection)continue;if(this.items[i].item[0]!=this.currentItem[0]&&this.currentItem[intersection==1?"next":"prev"]()[0]!=this.items[i].item[0]&&!contains(this.currentItem[0],this.items[i].item[0])&&(this.options.type=='semi-dynamic'?!contains(this.element[0],this.items[i].item[0]):true)){this.direction=intersection==1?"down":"up";this.rearrange(e,this.items[i]);this.propagate("change",e);break;}}
this.contactContainers(e);this.propagate("sort",e);if(!this.options.axis||this.options.axis=="x")this.helper[0].style.left=this.position.left+'px';if(!this.options.axis||this.options.axis=="y")this.helper[0].style.top=this.position.top+'px';if($.ui.ddmanager)$.ui.ddmanager.drag(this,e);return false;},rearrange:function(e,i,a,hardRefresh){a?a.append(this.currentItem):i.item[this.direction=='down'?'before':'after'](this.currentItem);this.counter=this.counter?++this.counter:1;var self=this,counter=this.counter;window.setTimeout(function(){if(counter==self.counter)self.refreshPositions(!hardRefresh);},0);if(this.options.placeholder)
this.options.placeholder.update.call(this.element,this.currentItem,this.placeholder);},mouseStop:function(e,noPropagation){if($.ui.ddmanager&&!this.options.dropBehaviour)
$.ui.ddmanager.drop(this,e);if(this.options.revert){var self=this;var cur=self.currentItem.offset();if(self.placeholder)self.placeholder.animate({opacity:'hide'},(parseInt(this.options.revert,10)||500)-50);$(this.helper).animate({left:cur.left-this.offset.parent.left-self.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:cur.top-this.offset.parent.top-self.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){self.clear(e);});}else{this.clear(e,noPropagation);}
return false;},clear:function(e,noPropagation){if(this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])this.propagate("update",e,null,noPropagation);if(!contains(this.element[0],this.currentItem[0])){this.propagate("remove",e,null,noPropagation);for(var i=this.containers.length-1;i>=0;i--){if(contains(this.containers[i].element[0],this.currentItem[0])){this.containers[i].propagate("update",e,this,noPropagation);this.containers[i].propagate("receive",e,this,noPropagation);}};};for(var i=this.containers.length-1;i>=0;i--){this.containers[i].propagate("deactivate",e,this,noPropagation);if(this.containers[i].containerCache.over){this.containers[i].propagate("out",e,this);this.containers[i].containerCache.over=0;}}
this.dragging=false;if(this.cancelHelperRemoval){this.propagate("stop",e,null,noPropagation);return false;}
$(this.currentItem).css('visibility','');if(this.placeholder)this.placeholder.remove();this.helper.remove();this.helper=null;this.propagate("stop",e,null,noPropagation);return true;}}));$.extend($.ui.sortable,{getter:"serialize toArray",defaults:{helper:"clone",tolerance:"guess",distance:1,delay:0,scroll:true,scrollSensitivity:20,scrollSpeed:20,cancel:":input",items:'> *',zIndex:1000,dropOnEmpty:true,appendTo:"parent"}});$.ui.plugin.add("sortable","cursor",{start:function(e,ui){var t=$('body');if(t.css("cursor"))ui.options._cursor=t.css("cursor");t.css("cursor",ui.options.cursor);},stop:function(e,ui){if(ui.options._cursor)$('body').css("cursor",ui.options._cursor);}});$.ui.plugin.add("sortable","zIndex",{start:function(e,ui){var t=ui.helper;if(t.css("zIndex"))ui.options._zIndex=t.css("zIndex");t.css('zIndex',ui.options.zIndex);},stop:function(e,ui){if(ui.options._zIndex)$(ui.helper).css('zIndex',ui.options._zIndex);}});$.ui.plugin.add("sortable","opacity",{start:function(e,ui){var t=ui.helper;if(t.css("opacity"))ui.options._opacity=t.css("opacity");t.css('opacity',ui.options.opacity);},stop:function(e,ui){if(ui.options._opacity)$(ui.helper).css('opacity',ui.options._opacity);}});$.ui.plugin.add("sortable","scroll",{start:function(e,ui){var o=ui.options;var i=$(this).data("sortable");i.overflowY=function(el){do{if(/auto|scroll/.test(el.css('overflow'))||(/auto|scroll/).test(el.css('overflow-y')))return el;el=el.parent();}while(el[0].parentNode);return $(document);}(i.currentItem);i.overflowX=function(el){do{if(/auto|scroll/.test(el.css('overflow'))||(/auto|scroll/).test(el.css('overflow-x')))return el;el=el.parent();}while(el[0].parentNode);return $(document);}(i.currentItem);if(i.overflowY[0]!=document&&i.overflowY[0].tagName!='HTML')i.overflowYOffset=i.overflowY.offset();if(i.overflowX[0]!=document&&i.overflowX[0].tagName!='HTML')i.overflowXOffset=i.overflowX.offset();},sort:function(e,ui){var o=ui.options;var i=$(this).data("sortable");if(i.overflowY[0]!=document&&i.overflowY[0].tagName!='HTML'){if((i.overflowYOffset.top+i.overflowY[0].offsetHeight)-e.pageY<o.scrollSensitivity)
i.overflowY[0].scrollTop=i.overflowY[0].scrollTop+o.scrollSpeed;if(e.pageY-i.overflowYOffset.top<o.scrollSensitivity)
i.overflowY[0].scrollTop=i.overflowY[0].scrollTop-o.scrollSpeed;}else{if(e.pageY-$(document).scrollTop()<o.scrollSensitivity)
$(document).scrollTop($(document).scrollTop()-o.scrollSpeed);if($(window).height()-(e.pageY-$(document).scrollTop())<o.scrollSensitivity)
$(document).scrollTop($(document).scrollTop()+o.scrollSpeed);}
if(i.overflowX[0]!=document&&i.overflowX[0].tagName!='HTML'){if((i.overflowXOffset.left+i.overflowX[0].offsetWidth)-e.pageX<o.scrollSensitivity)
i.overflowX[0].scrollLeft=i.overflowX[0].scrollLeft+o.scrollSpeed;if(e.pageX-i.overflowXOffset.left<o.scrollSensitivity)
i.overflowX[0].scrollLeft=i.overflowX[0].scrollLeft-o.scrollSpeed;}else{if(e.pageX-$(document).scrollLeft()<o.scrollSensitivity)
$(document).scrollLeft($(document).scrollLeft()-o.scrollSpeed);if($(window).width()-(e.pageX-$(document).scrollLeft())<o.scrollSensitivity)
$(document).scrollLeft($(document).scrollLeft()+o.scrollSpeed);}}});})(jQuery);(function($){$.fn.unwrap=$.fn.unwrap||function(expr){return this.each(function(){$(this).parents(expr).eq(0).after(this).remove();});};$.widget("ui.slider",{plugins:{},ui:function(e){return{options:this.options,handle:this.currentHandle,value:this.options.axis!="both"||!this.options.axis?Math.round(this.value(null,this.options.axis=="vertical"?"y":"x")):{x:Math.round(this.value(null,"x")),y:Math.round(this.value(null,"y"))},range:this.getRange()};},propagate:function(n,e){$.ui.plugin.call(this,n,[e,this.ui()]);this.element.triggerHandler(n=="slide"?n:"slide"+n,[e,this.ui()],this.options[n]);},destroy:function(){this.element.removeClass("ui-slider ui-slider-disabled").removeData("slider").unbind(".slider");if(this.handle&&this.handle.length){this.handle.unwrap("a");this.handle.each(function(){$(this).data("mouse").mouseDestroy();});}
this.generated&&this.generated.remove();},setData:function(key,value){$.widget.prototype.setData.apply(this,arguments);if(/min|max|steps/.test(key)){this.initBoundaries();}
if(key=="range"){value?this.handle.length==2&&this.createRange():this.removeRange();}},init:function(){var self=this;this.element.addClass("ui-slider");this.initBoundaries();this.handle=$(this.options.handle,this.element);if(!this.handle.length){self.handle=self.generated=$(self.options.handles||[0]).map(function(){var handle=$("<div/>").addClass("ui-slider-handle").appendTo(self.element);if(this.id)
handle.attr("id",this.id);return handle[0];});}
var handleclass=function(el){this.element=$(el);this.element.data("mouse",this);this.options=self.options;this.element.bind("mousedown",function(){if(self.currentHandle)this.blur(self.currentHandle);self.focus(this,1);});this.mouseInit();};$.extend(handleclass.prototype,$.ui.mouse,{mouseStart:function(e){return self.start.call(self,e,this.element[0]);},mouseStop:function(e){return self.stop.call(self,e,this.element[0]);},mouseDrag:function(e){return self.drag.call(self,e,this.element[0]);},mouseCapture:function(){return true;},trigger:function(e){this.mouseDown(e);}});$(this.handle).each(function(){new handleclass(this);}).wrap('<a href="javascript:void(0)" style="cursor:default;"></a>').parent().bind('focus',function(e){self.focus(this.firstChild);}).bind('blur',function(e){self.blur(this.firstChild);}).bind('keydown',function(e){if(!self.options.noKeyboard)self.keydown(e.keyCode,this.firstChild);});this.element.bind('mousedown.slider',function(e){self.click.apply(self,[e]);self.currentHandle.data("mouse").trigger(e);self.firstValue=self.firstValue+1;});$.each(this.options.handles||[],function(index,handle){self.moveTo(handle.start,index,true);});if(!isNaN(this.options.startValue))
this.moveTo(this.options.startValue,0,true);this.previousHandle=$(this.handle[0]);if(this.handle.length==2&&this.options.range)this.createRange();},initBoundaries:function(){var element=this.element[0],o=this.options;this.actualSize={width:this.element.outerWidth(),height:this.element.outerHeight()};$.extend(o,{axis:o.axis||(element.offsetWidth<element.offsetHeight?'vertical':'horizontal'),max:!isNaN(parseInt(o.max,10))?{x:parseInt(o.max,10),y:parseInt(o.max,10)}:({x:o.max&&o.max.x||100,y:o.max&&o.max.y||100}),min:!isNaN(parseInt(o.min,10))?{x:parseInt(o.min,10),y:parseInt(o.min,10)}:({x:o.min&&o.min.x||0,y:o.min&&o.min.y||0})});o.realMax={x:o.max.x-o.min.x,y:o.max.y-o.min.y};o.stepping={x:o.stepping&&o.stepping.x||parseInt(o.stepping,10)||(o.steps?o.realMax.x/(o.steps.x||parseInt(o.steps,10)||o.realMax.x):0),y:o.stepping&&o.stepping.y||parseInt(o.stepping,10)||(o.steps?o.realMax.y/(o.steps.y||parseInt(o.steps,10)||o.realMax.y):0)};},keydown:function(keyCode,handle){if(/(37|38|39|40)/.test(keyCode)){this.moveTo({x:/(37|39)/.test(keyCode)?(keyCode==37?'-':'+')+'='+this.oneStep("x"):0,y:/(38|40)/.test(keyCode)?(keyCode==38?'-':'+')+'='+this.oneStep("y"):0},handle);}},focus:function(handle,hard){this.currentHandle=$(handle).addClass('ui-slider-handle-active');if(hard)
this.currentHandle.parent()[0].focus();},blur:function(handle){$(handle).removeClass('ui-slider-handle-active');if(this.currentHandle&&this.currentHandle[0]==handle){this.previousHandle=this.currentHandle;this.currentHandle=null;};},click:function(e){var pointer=[e.pageX,e.pageY];var clickedHandle=false;this.handle.each(function(){if(this==e.target)
clickedHandle=true;});if(clickedHandle||this.options.disabled||!(this.currentHandle||this.previousHandle))
return;if(!this.currentHandle&&this.previousHandle)
this.focus(this.previousHandle,true);this.offset=this.element.offset();this.moveTo({y:this.convertValue(e.pageY-this.offset.top-this.currentHandle[0].offsetHeight/2,"y"),x:this.convertValue(e.pageX-this.offset.left-this.currentHandle[0].offsetWidth/2,"x")},null,!this.options.distance);},createRange:function(){if(this.rangeElement)return;this.rangeElement=$('<div></div>').addClass('ui-slider-range').css({position:'absolute'}).appendTo(this.element);this.updateRange();},removeRange:function(){this.rangeElement.remove();this.rangeElement=null;},updateRange:function(){var prop=this.options.axis=="vertical"?"top":"left";var size=this.options.axis=="vertical"?"height":"width";this.rangeElement.css(prop,(parseInt($(this.handle[0]).css(prop),10)||0)+this.handleSize(0,this.options.axis=="vertical"?"y":"x")/2);this.rangeElement.css(size,(parseInt($(this.handle[1]).css(prop),10)||0)-(parseInt($(this.handle[0]).css(prop),10)||0));},getRange:function(){return this.rangeElement?this.convertValue(parseInt(this.rangeElement.css(this.options.axis=="vertical"?"height":"width"),10),this.options.axis=="vertical"?"y":"x"):null;},handleIndex:function(){return this.handle.index(this.currentHandle[0]);},value:function(handle,axis){if(this.handle.length==1)this.currentHandle=this.handle;if(!axis)axis=this.options.axis=="vertical"?"y":"x";var curHandle=$(handle!=undefined&&handle!==null?this.handle[handle]||handle:this.currentHandle);if(curHandle.data("mouse").sliderValue){return parseInt(curHandle.data("mouse").sliderValue[axis],10);}else{return parseInt(((parseInt(curHandle.css(axis=="x"?"left":"top"),10)/(this.actualSize[axis=="x"?"width":"height"]-this.handleSize(handle,axis)))*this.options.realMax[axis])+this.options.min[axis],10);}},convertValue:function(value,axis){return this.options.min[axis]+(value/(this.actualSize[axis=="x"?"width":"height"]-this.handleSize(null,axis)))*this.options.realMax[axis];},translateValue:function(value,axis){return((value-this.options.min[axis])/this.options.realMax[axis])*(this.actualSize[axis=="x"?"width":"height"]-this.handleSize(null,axis));},translateRange:function(value,axis){if(this.rangeElement){if(this.currentHandle[0]==this.handle[0]&&value>=this.translateValue(this.value(1),axis))
value=this.translateValue(this.value(1,axis)-this.oneStep(axis),axis);if(this.currentHandle[0]==this.handle[1]&&value<=this.translateValue(this.value(0),axis))
value=this.translateValue(this.value(0,axis)+this.oneStep(axis),axis);}
if(this.options.handles){var handle=this.options.handles[this.handleIndex()];if(value<this.translateValue(handle.min,axis)){value=this.translateValue(handle.min,axis);}else if(value>this.translateValue(handle.max,axis)){value=this.translateValue(handle.max,axis);}}
return value;},translateLimits:function(value,axis){if(value>=this.actualSize[axis=="x"?"width":"height"]-this.handleSize(null,axis))
value=this.actualSize[axis=="x"?"width":"height"]-this.handleSize(null,axis);if(value<=0)
value=0;return value;},handleSize:function(handle,axis){return $(handle!=undefined&&handle!==null?this.handle[handle]:this.currentHandle)[0]["offset"+(axis=="x"?"Width":"Height")];},oneStep:function(axis){return this.options.stepping[axis]||1;},start:function(e,handle){var o=this.options;if(o.disabled)return false;this.actualSize={width:this.element.outerWidth(),height:this.element.outerHeight()};if(!this.currentHandle)
this.focus(this.previousHandle,true);this.offset=this.element.offset();this.handleOffset=this.currentHandle.offset();this.clickOffset={top:e.pageY-this.handleOffset.top,left:e.pageX-this.handleOffset.left};this.firstValue=this.value();this.propagate('start',e);this.drag(e,handle);return true;},stop:function(e){this.propagate('stop',e);if(this.firstValue!=this.value())
this.propagate('change',e);this.focus(this.currentHandle,true);return false;},drag:function(e,handle){var o=this.options;var position={top:e.pageY-this.offset.top-this.clickOffset.top,left:e.pageX-this.offset.left-this.clickOffset.left};if(!this.currentHandle)this.focus(this.previousHandle,true);position.left=this.translateLimits(position.left,"x");position.top=this.translateLimits(position.top,"y");if(o.stepping.x){var value=this.convertValue(position.left,"x");value=Math.round(value/o.stepping.x)*o.stepping.x;position.left=this.translateValue(value,"x");}
if(o.stepping.y){var value=this.convertValue(position.top,"y");value=Math.round(value/o.stepping.y)*o.stepping.y;position.top=this.translateValue(value,"y");}
position.left=this.translateRange(position.left,"x");position.top=this.translateRange(position.top,"y");if(o.axis!="vertical")this.currentHandle.css({left:position.left});if(o.axis!="horizontal")this.currentHandle.css({top:position.top});this.currentHandle.data("mouse").sliderValue={x:Math.round(this.convertValue(position.left,"x"))||0,y:Math.round(this.convertValue(position.top,"y"))||0};if(this.rangeElement)
this.updateRange();this.propagate('slide',e);return false;},moveTo:function(value,handle,noPropagation){var o=this.options;this.actualSize={width:this.element.outerWidth(),height:this.element.outerHeight()};if(handle==undefined&&!this.currentHandle&&this.handle.length!=1)
return false;if(handle==undefined&&!this.currentHandle)
handle=0;if(handle!=undefined)
this.currentHandle=this.previousHandle=$(this.handle[handle]||handle);if(value.x!==undefined&&value.y!==undefined){var x=value.x,y=value.y;}else{var x=value,y=value;}
if(x!==undefined&&x.constructor!=Number){var me=/^\-\=/.test(x),pe=/^\+\=/.test(x);if(me||pe){x=this.value(null,"x")+parseInt(x.replace(me?'=':'+=',''),10);}else{x=isNaN(parseInt(x,10))?undefined:parseInt(x,10);}}
if(y!==undefined&&y.constructor!=Number){var me=/^\-\=/.test(y),pe=/^\+\=/.test(y);if(me||pe){y=this.value(null,"y")+parseInt(y.replace(me?'=':'+=',''),10);}else{y=isNaN(parseInt(y,10))?undefined:parseInt(y,10);}}
if(o.axis!="vertical"&&x!==undefined){if(o.stepping.x)x=Math.round(x/o.stepping.x)*o.stepping.x;x=this.translateValue(x,"x");x=this.translateLimits(x,"x");x=this.translateRange(x,"x");this.currentHandle.css({left:x});}
if(o.axis!="horizontal"&&y!==undefined){if(o.stepping.y)y=Math.round(y/o.stepping.y)*o.stepping.y;y=this.translateValue(y,"y");y=this.translateLimits(y,"y");y=this.translateRange(y,"y");this.currentHandle.css({top:y});}
if(this.rangeElement)
this.updateRange();this.currentHandle.data("mouse").sliderValue={x:Math.round(this.convertValue(x,"x"))||0,y:Math.round(this.convertValue(y,"y"))||0};if(!noPropagation){this.propagate('start',null);this.propagate('stop',null);this.propagate('change',null);this.propagate("slide",null);}}});$.ui.slider.getter="value";$.ui.slider.defaults={handle:".ui-slider-handle",distance:1};})(jQuery);;(function($){$.effects=$.effects||{};$.extend($.effects,{save:function(el,set){for(var i=0;i<set.length;i++){if(set[i]!==null)$.data(el[0],"ec.storage."+set[i],el[0].style[set[i]]);}},restore:function(el,set){for(var i=0;i<set.length;i++){if(set[i]!==null)el.css(set[i],$.data(el[0],"ec.storage."+set[i]));}},setMode:function(el,mode){if(mode=='toggle')mode=el.is(':hidden')?'show':'hide';return mode;},getBaseline:function(origin,original){var y,x;switch(origin[0]){case'top':y=0;break;case'middle':y=0.5;break;case'bottom':y=1;break;default:y=origin[0]/original.height;};switch(origin[1]){case'left':x=0;break;case'center':x=0.5;break;case'right':x=1;break;default:x=origin[1]/original.width;};return{x:x,y:y};},createWrapper:function(el){if(el.parent().attr('id')=='fxWrapper')
return el;var props={width:el.outerWidth({margin:true}),height:el.outerHeight({margin:true}),'float':el.css('float')};el.wrap('<div id="fxWrapper" style="font-size:100%;background:transparent;border:none;margin:0;padding:0"></div>');var wrapper=el.parent();if(el.css('position')=='static'){wrapper.css({position:'relative'});el.css({position:'relative'});}else{var top=parseInt(el.css('top'),10);if(isNaN(top))top='auto';var left=parseInt(el.css('left'),10);if(isNaN(left))left='auto';wrapper.css({position:el.css('position'),top:top,left:left,zIndex:el.css('z-index')}).show();el.css({position:'relative',top:0,left:0});}
wrapper.css(props);return wrapper;},removeWrapper:function(el){if(el.parent().attr('id')=='fxWrapper')
return el.parent().replaceWith(el);return el;},setTransition:function(el,list,factor,val){val=val||{};$.each(list,function(i,x){unit=el.cssUnit(x);if(unit[0]>0)val[x]=unit[0]*factor+unit[1];});return val;},animateClass:function(value,duration,easing,callback){var cb=(typeof easing=="function"?easing:(callback?callback:null));var ea=(typeof easing=="object"?easing:null);return this.each(function(){var offset={};var that=$(this);var oldStyleAttr=that.attr("style")||'';if(typeof oldStyleAttr=='object')oldStyleAttr=oldStyleAttr["cssText"];if(value.toggle){that.hasClass(value.toggle)?value.remove=value.toggle:value.add=value.toggle;}
var oldStyle=$.extend({},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));if(value.add)that.addClass(value.add);if(value.remove)that.removeClass(value.remove);var newStyle=$.extend({},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));if(value.add)that.removeClass(value.add);if(value.remove)that.addClass(value.remove);for(var n in newStyle){if(typeof newStyle[n]!="function"&&newStyle[n]&&n.indexOf("Moz")==-1&&n.indexOf("length")==-1&&newStyle[n]!=oldStyle[n]&&(n.match(/color/i)||(!n.match(/color/i)&&!isNaN(parseInt(newStyle[n],10))))&&(oldStyle.position!="static"||(oldStyle.position=="static"&&!n.match(/left|top|bottom|right/))))offset[n]=newStyle[n];}
that.animate(offset,duration,ea,function(){if(typeof $(this).attr("style")=='object'){$(this).attr("style")["cssText"]="";$(this).attr("style")["cssText"]=oldStyleAttr;}else $(this).attr("style",oldStyleAttr);if(value.add)$(this).addClass(value.add);if(value.remove)$(this).removeClass(value.remove);if(cb)cb.apply(this,arguments);});});}});$.fn.extend({_show:$.fn.show,_hide:$.fn.hide,__toggle:$.fn.toggle,_addClass:$.fn.addClass,_removeClass:$.fn.removeClass,_toggleClass:$.fn.toggleClass,effect:function(fx,o,speed,callback){return $.effects[fx]?$.effects[fx].call(this,{method:fx,options:o||{},duration:speed,callback:callback}):null;},show:function(){if(!arguments[0]||(arguments[0].constructor==Number||/(slow|normal|fast)/.test(arguments[0])))
return this._show.apply(this,arguments);else{var o=arguments[1]||{};o['mode']='show';return this.effect.apply(this,[arguments[0],o,arguments[2]||o.duration,arguments[3]||o.callback]);}},hide:function(){if(!arguments[0]||(arguments[0].constructor==Number||/(slow|normal|fast)/.test(arguments[0])))
return this._hide.apply(this,arguments);else{var o=arguments[1]||{};o['mode']='hide';return this.effect.apply(this,[arguments[0],o,arguments[2]||o.duration,arguments[3]||o.callback]);}},toggle:function(){if(!arguments[0]||(arguments[0].constructor==Number||/(slow|normal|fast)/.test(arguments[0]))||(arguments[0].constructor==Function))
return this.__toggle.apply(this,arguments);else{var o=arguments[1]||{};o['mode']='toggle';return this.effect.apply(this,[arguments[0],o,arguments[2]||o.duration,arguments[3]||o.callback]);}},addClass:function(classNames,speed,easing,callback){return speed?$.effects.animateClass.apply(this,[{add:classNames},speed,easing,callback]):this._addClass(classNames);},removeClass:function(classNames,speed,easing,callback){return speed?$.effects.animateClass.apply(this,[{remove:classNames},speed,easing,callback]):this._removeClass(classNames);},toggleClass:function(classNames,speed,easing,callback){return speed?$.effects.animateClass.apply(this,[{toggle:classNames},speed,easing,callback]):this._toggleClass(classNames);},morph:function(remove,add,speed,easing,callback){return $.effects.animateClass.apply(this,[{add:add,remove:remove},speed,easing,callback]);},switchClass:function(){return this.morph.apply(this,arguments);},cssUnit:function(key){var style=this.css(key),val=[];$.each(['em','px','%','pt'],function(i,unit){if(style.indexOf(unit)>0)
val=[parseFloat(style),unit];});return val;}});jQuery.each(['backgroundColor','borderBottomColor','borderLeftColor','borderRightColor','borderTopColor','color','outlineColor'],function(i,attr){jQuery.fx.step[attr]=function(fx){if(fx.state==0){fx.start=getColor(fx.elem,attr);fx.end=getRGB(fx.end);}
fx.elem.style[attr]="rgb("+[Math.max(Math.min(parseInt((fx.pos*(fx.end[0]-fx.start[0]))+fx.start[0]),255),0),Math.max(Math.min(parseInt((fx.pos*(fx.end[1]-fx.start[1]))+fx.start[1]),255),0),Math.max(Math.min(parseInt((fx.pos*(fx.end[2]-fx.start[2]))+fx.start[2]),255),0)].join(",")+")";}});function getRGB(color){var result;if(color&&color.constructor==Array&&color.length==3)
return color;if(result=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
return[parseInt(result[1]),parseInt(result[2]),parseInt(result[3])];if(result=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
return[parseFloat(result[1])*2.55,parseFloat(result[2])*2.55,parseFloat(result[3])*2.55];if(result=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
return[parseInt(result[1],16),parseInt(result[2],16),parseInt(result[3],16)];if(result=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
return[parseInt(result[1]+result[1],16),parseInt(result[2]+result[2],16),parseInt(result[3]+result[3],16)];if(result=/rgba\(0, 0, 0, 0\)/.exec(color))
return colors['transparent']
return colors[jQuery.trim(color).toLowerCase()];}
function getColor(elem,attr){var color;do{color=jQuery.curCSS(elem,attr);if(color!=''&&color!='transparent'||jQuery.nodeName(elem,"body"))
break;attr="backgroundColor";}while(elem=elem.parentNode);return getRGB(color);};var colors={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};jQuery.easing['jswing']=jQuery.easing['swing'];jQuery.extend(jQuery.easing,{def:'easeOutQuad',swing:function(x,t,b,c,d){return jQuery.easing[jQuery.easing.def](x,t,b,c,d);},easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b;},easeOutQuad:function(x,t,b,c,d){return-c*(t/=d)*(t-2)+b;},easeInOutQuad:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*((--t)*(t-2)-1)+b;},easeInCubic:function(x,t,b,c,d){return c*(t/=d)*t*t+b;},easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},easeInOutCubic:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},easeInQuart:function(x,t,b,c,d){return c*(t/=d)*t*t*t+b;},easeOutQuart:function(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;},easeInOutQuart:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b;},easeInQuint:function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b;},easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},easeInOutQuint:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},easeInSine:function(x,t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b;},easeOutSine:function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},easeInOutSine:function(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b;},easeInExpo:function(x,t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b;},easeOutExpo:function(x,t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;},easeInOutExpo:function(x,t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b;},easeInCirc:function(x,t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b;},easeOutCirc:function(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},easeInOutCirc:function(x,t,b,c,d){if((t/=d/2)<1)return-c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},easeInElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},easeOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;},easeInOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},easeInBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b;},easeOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},easeInOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},easeInBounce:function(x,t,b,c,d){return c-jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b;},easeOutBounce:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;}},easeInOutBounce:function(x,t,b,c,d){if(t<d/2)return jQuery.easing.easeInBounce(x,t*2,0,c,d)*.5+b;return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d)*.5+c*.5+b;}});})(jQuery);(function($){$.effects.blind=function(o){return this.queue(function(){var el=$(this),props=['position','top','left'];var mode=$.effects.setMode(el,o.options.mode||'hide');var direction=o.options.direction||'vertical';$.effects.save(el,props);el.show();var wrapper=$.effects.createWrapper(el).css({overflow:'hidden'});var ref=(direction=='vertical')?'height':'width';var distance=(direction=='vertical')?wrapper.height():wrapper.width();if(mode=='show')wrapper.css(ref,0);var animation={};animation[ref]=mode=='show'?distance:0;wrapper.animate(animation,o.duration,o.options.easing,function(){if(mode=='hide')el.hide();$.effects.restore(el,props);$.effects.removeWrapper(el);if(o.callback)o.callback.apply(el[0],arguments);el.dequeue();});});};})(jQuery);(function($){$.effects.bounce=function(o){return this.queue(function(){var el=$(this),props=['position','top','left'];var mode=$.effects.setMode(el,o.options.mode||'effect');var direction=o.options.direction||'up';var distance=o.options.distance||20;var times=o.options.times||5;var speed=o.duration||250;if(/show|hide/.test(mode))props.push('opacity');$.effects.save(el,props);el.show();$.effects.createWrapper(el);var ref=(direction=='up'||direction=='down')?'top':'left';var motion=(direction=='up'||direction=='left')?'pos':'neg';var distance=o.options.distance||(ref=='top'?el.outerHeight({margin:true})/3:el.outerWidth({margin:true})/3);if(mode=='show')el.css('opacity',0).css(ref,motion=='pos'?-distance:distance);if(mode=='hide')distance=distance/(times*2);if(mode!='hide')times--;if(mode=='show'){var animation={opacity:1};animation[ref]=(motion=='pos'?'+=':'-=')+distance;el.animate(animation,speed/2,o.options.easing);distance=distance/2;times--;};for(var i=0;i<times;i++){var animation1={},animation2={};animation1[ref]=(motion=='pos'?'-=':'+=')+distance;animation2[ref]=(motion=='pos'?'+=':'-=')+distance;el.animate(animation1,speed/2,o.options.easing).animate(animation2,speed/2,o.options.easing);distance=(mode=='hide')?distance*2:distance/2;};if(mode=='hide'){var animation={opacity:0};animation[ref]=(motion=='pos'?'-=':'+=')+distance;el.animate(animation,speed/2,o.options.easing,function(){el.hide();$.effects.restore(el,props);$.effects.removeWrapper(el);if(o.callback)o.callback.apply(this,arguments);});}else{var animation1={},animation2={};animation1[ref]=(motion=='pos'?'-=':'+=')+distance;animation2[ref]=(motion=='pos'?'+=':'-=')+distance;el.animate(animation1,speed/2,o.options.easing).animate(animation2,speed/2,o.options.easing,function(){$.effects.restore(el,props);$.effects.removeWrapper(el);if(o.callback)o.callback.apply(this,arguments);});};el.queue('fx',function(){el.dequeue();});el.dequeue();});};})(jQuery);(function($){$.effects.clip=function(o){return this.queue(function(){var el=$(this),props=['position','top','left','height','width'];var mode=$.effects.setMode(el,o.options.mode||'hide');var direction=o.options.direction||'vertical';$.effects.save(el,props);el.show();var wrapper=$.effects.createWrapper(el).css({overflow:'hidden'});var animate=el[0].tagName=='IMG'?wrapper:el;var ref={size:(direction=='vertical')?'height':'width',position:(direction=='vertical')?'top':'left'};var distance=(direction=='vertical')?animate.height():animate.width();if(mode=='show'){animate.css(ref.size,0);animate.css(ref.position,distance/2);}
var animation={};animation[ref.size]=mode=='show'?distance:0;animation[ref.position]=mode=='show'?0:distance/2;animate.animate(animation,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){if(mode=='hide')el.hide();$.effects.restore(el,props);$.effects.removeWrapper(el);if(o.callback)o.callback.apply(el[0],arguments);el.dequeue();}});});};})(jQuery);(function($){$.effects.drop=function(o){return this.queue(function(){var el=$(this),props=['position','top','left','opacity'];var mode=$.effects.setMode(el,o.options.mode||'hide');var direction=o.options.direction||'left';$.effects.save(el,props);el.show();$.effects.createWrapper(el);var ref=(direction=='up'||direction=='down')?'top':'left';var motion=(direction=='up'||direction=='left')?'pos':'neg';var distance=o.options.distance||(ref=='top'?el.outerHeight({margin:true})/2:el.outerWidth({margin:true})/2);if(mode=='show')el.css('opacity',0).css(ref,motion=='pos'?-distance:distance);var animation={opacity:mode=='show'?1:0};animation[ref]=(mode=='show'?(motion=='pos'?'+=':'-='):(motion=='pos'?'-=':'+='))+distance;el.animate(animation,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){if(mode=='hide')el.hide();$.effects.restore(el,props);$.effects.removeWrapper(el);if(o.callback)o.callback.apply(this,arguments);el.dequeue();}});});};})(jQuery);(function($){$.effects.fold=function(o){return this.queue(function(){var el=$(this),props=['position','top','left'];var mode=$.effects.setMode(el,o.options.mode||'hide');var size=o.options.size||15;var horizFirst=!(!o.options.horizFirst);$.effects.save(el,props);el.show();var wrapper=$.effects.createWrapper(el).css({overflow:'hidden'});var widthFirst=((mode=='show')!=horizFirst);var ref=widthFirst?['width','height']:['height','width'];var distance=widthFirst?[wrapper.width(),wrapper.height()]:[wrapper.height(),wrapper.width()];var percent=/([0-9]+)%/.exec(size);if(percent)size=parseInt(percent[1])/100*distance[mode=='hide'?0:1];if(mode=='show')wrapper.css(horizFirst?{height:0,width:size}:{height:size,width:0});var animation1={},animation2={};animation1[ref[0]]=mode=='show'?distance[0]:size;animation2[ref[1]]=mode=='show'?distance[1]:0;wrapper.animate(animation1,o.duration/2,o.options.easing).animate(animation2,o.duration/2,o.options.easing,function(){if(mode=='hide')el.hide();$.effects.restore(el,props);$.effects.removeWrapper(el);if(o.callback)o.callback.apply(el[0],arguments);el.dequeue();});});};})(jQuery);;(function($){$.effects.highlight=function(o){return this.queue(function(){var el=$(this),props=['backgroundImage','backgroundColor','opacity'];var mode=$.effects.setMode(el,o.options.mode||'show');var color=o.options.color||"#ffff99";var oldColor=el.css("backgroundColor");$.effects.save(el,props);el.show();el.css({backgroundImage:'none',backgroundColor:color});var animation={backgroundColor:oldColor};if(mode=="hide")animation['opacity']=0;el.animate(animation,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){if(mode=="hide")el.hide();$.effects.restore(el,props);if(mode=="show"&&jQuery.browser.msie)this.style.removeAttribute('filter');if(o.callback)o.callback.apply(this,arguments);el.dequeue();}});});};})(jQuery);(function($){$.effects.pulsate=function(o){return this.queue(function(){var el=$(this);var mode=$.effects.setMode(el,o.options.mode||'show');var times=o.options.times||5;if(mode=='hide')times--;if(el.is(':hidden')){el.css('opacity',0);el.show();el.animate({opacity:1},o.duration/2,o.options.easing);times=times-2;}
for(var i=0;i<times;i++){el.animate({opacity:0},o.duration/2,o.options.easing).animate({opacity:1},o.duration/2,o.options.easing);};if(mode=='hide'){el.animate({opacity:0},o.duration/2,o.options.easing,function(){el.hide();if(o.callback)o.callback.apply(this,arguments);});}else{el.animate({opacity:0},o.duration/2,o.options.easing).animate({opacity:1},o.duration/2,o.options.easing,function(){if(o.callback)o.callback.apply(this,arguments);});};el.queue('fx',function(){el.dequeue();});el.dequeue();});};})(jQuery);(function($){$.effects.puff=function(o){return this.queue(function(){var el=$(this);var options=$.extend(true,{},o.options);var mode=$.effects.setMode(el,o.options.mode||'hide');var percent=parseInt(o.options.percent)||150;options.fade=true;var original={height:el.height(),width:el.width()};var factor=percent/100;el.from=(mode=='hide')?original:{height:original.height*factor,width:original.width*factor};options.from=el.from;options.percent=(mode=='hide')?percent:100;options.mode=mode;el.effect('scale',options,o.duration,o.callback);el.dequeue();});};$.effects.scale=function(o){return this.queue(function(){var el=$(this);var options=$.extend(true,{},o.options);var mode=$.effects.setMode(el,o.options.mode||'effect');var percent=parseInt(o.options.percent)||(parseInt(o.options.percent)==0?0:(mode=='hide'?0:100));var direction=o.options.direction||'both';var origin=o.options.origin;if(mode!='effect'){options.origin=origin||['middle','center'];options.restore=true;}
var original={height:el.height(),width:el.width()};el.from=o.options.from||(mode=='show'?{height:0,width:0}:original);var factor={y:direction!='horizontal'?(percent/100):1,x:direction!='vertical'?(percent/100):1};el.to={height:original.height*factor.y,width:original.width*factor.x};if(o.options.fade){if(mode=='show'){el.from.opacity=0;el.to.opacity=1;};if(mode=='hide'){el.from.opacity=1;el.to.opacity=0;};};options.from=el.from;options.to=el.to;options.mode=mode;el.effect('size',options,o.duration,o.callback);el.dequeue();});};$.effects.size=function(o){return this.queue(function(){var el=$(this),props=['position','top','left','width','height','overflow','opacity'];var props1=['position','top','left','overflow','opacity'];var props2=['width','height','overflow'];var cProps=['fontSize'];var vProps=['borderTopWidth','borderBottomWidth','paddingTop','paddingBottom'];var hProps=['borderLeftWidth','borderRightWidth','paddingLeft','paddingRight'];var mode=$.effects.setMode(el,o.options.mode||'effect');var restore=o.options.restore||false;var scale=o.options.scale||'both';var origin=o.options.origin;var original={height:el.height(),width:el.width()};el.from=o.options.from||original;el.to=o.options.to||original;if(origin){var baseline=$.effects.getBaseline(origin,original);el.from.top=(original.height-el.from.height)*baseline.y;el.from.left=(original.width-el.from.width)*baseline.x;el.to.top=(original.height-el.to.height)*baseline.y;el.to.left=(original.width-el.to.width)*baseline.x;};var factor={from:{y:el.from.height/original.height,x:el.from.width/original.width},to:{y:el.to.height/original.height,x:el.to.width/original.width}};if(scale=='box'||scale=='both'){if(factor.from.y!=factor.to.y){props=props.concat(vProps);el.from=$.effects.setTransition(el,vProps,factor.from.y,el.from);el.to=$.effects.setTransition(el,vProps,factor.to.y,el.to);};if(factor.from.x!=factor.to.x){props=props.concat(hProps);el.from=$.effects.setTransition(el,hProps,factor.from.x,el.from);el.to=$.effects.setTransition(el,hProps,factor.to.x,el.to);};};if(scale=='content'||scale=='both'){if(factor.from.y!=factor.to.y){props=props.concat(cProps);el.from=$.effects.setTransition(el,cProps,factor.from.y,el.from);el.to=$.effects.setTransition(el,cProps,factor.to.y,el.to);};};$.effects.save(el,restore?props:props1);el.show();$.effects.createWrapper(el);el.css('overflow','hidden').css(el.from);if(scale=='content'||scale=='both'){vProps=vProps.concat(['marginTop','marginBottom']).concat(cProps);hProps=hProps.concat(['marginLeft','marginRight']);props2=props.concat(vProps).concat(hProps);el.find("*[width]").each(function(){child=$(this);if(restore)$.effects.save(child,props2);var c_original={height:child.height(),width:child.width()};child.from={height:c_original.height*factor.from.y,width:c_original.width*factor.from.x};child.to={height:c_original.height*factor.to.y,width:c_original.width*factor.to.x};if(factor.from.y!=factor.to.y){child.from=$.effects.setTransition(child,vProps,factor.from.y,child.from);child.to=$.effects.setTransition(child,vProps,factor.to.y,child.to);};if(factor.from.x!=factor.to.x){child.from=$.effects.setTransition(child,hProps,factor.from.x,child.from);child.to=$.effects.setTransition(child,hProps,factor.to.x,child.to);};child.css(child.from);child.animate(child.to,o.duration,o.options.easing,function(){if(restore)$.effects.restore(child,props2);});});};el.animate(el.to,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){if(mode=='hide')el.hide();$.effects.restore(el,restore?props:props1);$.effects.removeWrapper(el);if(o.callback)o.callback.apply(this,arguments);el.dequeue();}});});};})(jQuery);(function($){$.effects.shake=function(o){return this.queue(function(){var el=$(this),props=['position','top','left'];var mode=$.effects.setMode(el,o.options.mode||'effect');var direction=o.options.direction||'left';var distance=o.options.distance||20;var times=o.options.times||3;var speed=o.duration||o.options.duration||140;$.effects.save(el,props);el.show();$.effects.createWrapper(el);var ref=(direction=='up'||direction=='down')?'top':'left';var motion=(direction=='up'||direction=='left')?'pos':'neg';var animation={},animation1={},animation2={};animation[ref]=(motion=='pos'?'-=':'+=')+distance;animation1[ref]=(motion=='pos'?'+=':'-=')+distance*2;animation2[ref]=(motion=='pos'?'-=':'+=')+distance*2;el.animate(animation,speed,o.options.easing);for(var i=1;i<times;i++){el.animate(animation1,speed,o.options.easing).animate(animation2,speed,o.options.easing);};el.animate(animation1,speed,o.options.easing).animate(animation,speed/2,o.options.easing,function(){$.effects.restore(el,props);$.effects.removeWrapper(el);if(o.callback)o.callback.apply(this,arguments);});el.queue('fx',function(){el.dequeue();});el.dequeue();});};})(jQuery);(function($){$.effects.slide=function(o){return this.queue(function(){var el=$(this),props=['position','top','left'];var mode=$.effects.setMode(el,o.options.mode||'show');var direction=o.options.direction||'left';$.effects.save(el,props);el.show();$.effects.createWrapper(el).css({overflow:'hidden'});var ref=(direction=='up'||direction=='down')?'top':'left';var motion=(direction=='up'||direction=='left')?'pos':'neg';var distance=o.options.distance||(ref=='top'?el.outerHeight({margin:true}):el.outerWidth({margin:true}));if(mode=='show')el.css(ref,motion=='pos'?-distance:distance);var animation={};animation[ref]=(mode=='show'?(motion=='pos'?'+=':'-='):(motion=='pos'?'-=':'+='))+distance;el.animate(animation,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){if(mode=='hide')el.hide();$.effects.restore(el,props);$.effects.removeWrapper(el);if(o.callback)o.callback.apply(this,arguments);el.dequeue();}});});};})(jQuery);

(function($){$().ajaxSend(function(a,xhr,s){xhr.setRequestHeader("Accept","text/javascript, text/html, application/xml, text/xml, */*")})})(jQuery);(function($){$.fn.reset=function(){return this.each(function(){if(typeof this.reset=="function"||(typeof this.reset=="object"&&!this.reset.nodeType)){this.reset()}})};$.fn.enable=function(){return this.each(function(){this.disabled=false})};$.fn.disable=function(){return this.each(function(){this.disabled=true})}})(jQuery);(function($){$.extend({fieldEvent:function(el,obs){var field=el[0]||el,e="change";if(field.type=="radio"||field.type=="checkbox"){e="click"}else{if(obs&&field.type=="text"||field.type=="textarea"){e="keyup"}}return e}});$.fn.extend({delayedObserver:function(delay,callback){var el=$(this);if(typeof window.delayedObserverStack=="undefined"){window.delayedObserverStack=[]}if(typeof window.delayedObserverCallback=="undefined"){window.delayedObserverCallback=function(stackPos){observed=window.delayedObserverStack[stackPos];if(observed.timer){clearTimeout(observed.timer)}observed.timer=setTimeout(function(){observed.timer=null;observed.callback(observed.obj,observed.obj.formVal())},observed.delay*1000);observed.oldVal=observed.obj.formVal()}}window.delayedObserverStack.push({obj:el,timer:null,delay:delay,oldVal:el.formVal(),callback:callback});var stackPos=window.delayedObserverStack.length-1;if(el[0].tagName=="FORM"){$(":input",el).each(function(){var field=$(this);field.bind($.fieldEvent(field,delay),function(){observed=window.delayedObserverStack[stackPos];if(observed.obj.formVal()==observed.obj.oldVal){return}else{window.delayedObserverCallback(stackPos)}})})}else{el.bind($.fieldEvent(el,delay),function(){observed=window.delayedObserverStack[stackPos];if(observed.obj.formVal()==observed.obj.oldVal){return}else{window.delayedObserverCallback(stackPos)}})}},formVal:function(){var el=this[0];if(el.tagName=="FORM"){return this.serialize()}if(el.type=="checkbox"||self.type=="radio"){return this.filter("input:checked").val()||""}else{return this.val()}}})})(jQuery);(function($){$.fn.extend({visualEffect:function(o){e=o.replace(/\_(.)/g,function(m,l){return l.toUpperCase()});return eval("$(this)."+e+"()")},appear:function(speed,callback){return this.fadeIn(speed,callback)},blindDown:function(speed,callback){return this.show("blind",{direction:"vertical"},speed,callback)},blindUp:function(speed,callback){return this.hide("blind",{direction:"vertical"},speed,callback)},blindRight:function(speed,callback){return this.show("blind",{direction:"horizontal"},speed,callback)},blindLeft:function(speed,callback){this.hide("blind",{direction:"horizontal"},speed,callback);return this},dropOut:function(speed,callback){return this.hide("drop",{direction:"down"},speed,callback)},dropIn:function(speed,callback){return this.show("drop",{direction:"up"},speed,callback)},fade:function(speed,callback){return this.fadeOut(speed,callback)},fadeToggle:function(speed,callback){return this.animate({opacity:"toggle"},speed,callback)},fold:function(speed,callback){return this.hide("fold",{},speed,callback)},foldOut:function(speed,callback){return this.show("fold",{},speed,callback)},grow:function(speed,callback){return this.show("scale",{},speed,callback)},highlight:function(speed,callback){return this.show("highlight",{},speed,callback)},puff:function(speed,callback){return this.hide("puff",{},speed,callback)},pulsate:function(speed,callback){return this.show("pulsate",{},speed,callback)},shake:function(speed,callback){return this.show("shake",{},speed,callback)},shrink:function(speed,callback){return this.hide("scale",{},speed,callback)},squish:function(speed,callback){return this.hide("scale",{origin:["top","left"]},speed,callback)},slideUp:function(speed,callback){return this.hide("slide",{direction:"up"},speed,callback)},slideDown:function(speed,callback){return this.show("slide",{direction:"up"},speed,callback)},switchOff:function(speed,callback){return this.hide("clip",{},speed,callback)},switchOn:function(speed,callback){return this.show("clip",{},speed,callback)}})})(jQuery);

function less_json_eval(json){return eval('(' +  json + ')')}  

function jq_defined(){return typeof(jQuery) != "undefined"}

function less_get_params(obj){
   
  if (jq_defined()) { return obj }
  if (obj == null) {return '';}
  var s = [];
  for (prop in obj){
    s.push(prop + "=" + obj[prop]);
  }
  return s.join('&') + '';
}

function less_merge_objects(a, b){
   
  if (b == null) {return a;}
  z = new Object;
  for (prop in a){z[prop] = a[prop]}
  for (prop in b){z[prop] = b[prop]}
  return z;
}

function less_ajax(url, verb, params, options){
   
  if (verb == undefined) {verb = 'get';}
  var res;
  if (jq_defined()){
    v = verb.toLowerCase() == 'get' ? 'GET' : 'POST'
    if (verb.toLowerCase() == 'get' || verb.toLowerCase() == 'post'){p = less_get_params(params);}
    else{p = less_get_params(less_merge_objects({'_method': verb.toLowerCase()}, params))} 
     
     
    res = jQuery.ajax(less_merge_objects({async:false, url: url, type: v, data: p}, options)).responseText;
  } else {  
    new Ajax.Request(url, less_merge_objects({asynchronous: false, method: verb, parameters: less_get_params(params), onComplete: function(r){res = r.responseText;}}, options));
  }
  if (url.indexOf('.json') == url.length-5){ return less_json_eval(res);}
  else {return res;}
}
function less_ajaxx(url, verb, params, options){
   
  if (verb == undefined) {verb = 'get';}
  if (jq_defined()){
    v = verb.toLowerCase() == 'get' ? 'GET' : 'POST'
    if (verb.toLowerCase() == 'get' || verb.toLowerCase() == 'post'){p = less_get_params(params);}
    else{p = less_get_params(less_merge_objects({'_method': verb.toLowerCase()}, params))} 
     
     
    jQuery.ajax(less_merge_objects({ url: url, type: v, data: p, complete: function(r){eval(r.responseText)}}, options));
  } else {  
    new Ajax.Request(url, less_merge_objects({method: verb, parameters: less_get_params(params), onComplete: function(r){eval(r.responseText);}}, options));
  }
}
function todos_path(verb){ return '/todos';}
function todos_ajax(verb, params, options){ return less_ajax('/todos', verb, params, options);}
function todos_ajaxx(verb, params, options){ return less_ajaxx('/todos', verb, params, options);}
function formatted_todos_path(format, verb){ return '/todos.' + format + '';}
function formatted_todos_ajax(format, verb, params, options){ return less_ajax('/todos.' + format + '', verb, params, options);}
function formatted_todos_ajaxx(format, verb, params, options){ return less_ajaxx('/todos.' + format + '', verb, params, options);}
function new_todo_path(verb){ return '/todos/new';}
function new_todo_ajax(verb, params, options){ return less_ajax('/todos/new', verb, params, options);}
function new_todo_ajaxx(verb, params, options){ return less_ajaxx('/todos/new', verb, params, options);}
function formatted_new_todo_path(format, verb){ return '/todos/new.' + format + '';}
function formatted_new_todo_ajax(format, verb, params, options){ return less_ajax('/todos/new.' + format + '', verb, params, options);}
function formatted_new_todo_ajaxx(format, verb, params, options){ return less_ajaxx('/todos/new.' + format + '', verb, params, options);}
function edit_todo_path(id, verb){ return '/todos/' + id + '/edit';}
function edit_todo_ajax(id, verb, params, options){ return less_ajax('/todos/' + id + '/edit', verb, params, options);}
function edit_todo_ajaxx(id, verb, params, options){ return less_ajaxx('/todos/' + id + '/edit', verb, params, options);}
function formatted_edit_todo_path(id, format, verb){ return '/todos/' + id + '/edit.' + format + '';}
function formatted_edit_todo_ajax(id, format, verb, params, options){ return less_ajax('/todos/' + id + '/edit.' + format + '', verb, params, options);}
function formatted_edit_todo_ajaxx(id, format, verb, params, options){ return less_ajaxx('/todos/' + id + '/edit.' + format + '', verb, params, options);}
function todo_path(id, verb){ return '/todos/' + id + '';}
function todo_ajax(id, verb, params, options){ return less_ajax('/todos/' + id + '', verb, params, options);}
function todo_ajaxx(id, verb, params, options){ return less_ajaxx('/todos/' + id + '', verb, params, options);}
function formatted_todo_path(id, format, verb){ return '/todos/' + id + '.' + format + '';}
function formatted_todo_ajax(id, format, verb, params, options){ return less_ajax('/todos/' + id + '.' + format + '', verb, params, options);}
function formatted_todo_ajaxx(id, format, verb, params, options){ return less_ajaxx('/todos/' + id + '.' + format + '', verb, params, options);}
function trip_items_path(verb){ return '/trip_items';}
function trip_items_ajax(verb, params, options){ return less_ajax('/trip_items', verb, params, options);}
function trip_items_ajaxx(verb, params, options){ return less_ajaxx('/trip_items', verb, params, options);}
function formatted_trip_items_path(format, verb){ return '/trip_items.' + format + '';}
function formatted_trip_items_ajax(format, verb, params, options){ return less_ajax('/trip_items.' + format + '', verb, params, options);}
function formatted_trip_items_ajaxx(format, verb, params, options){ return less_ajaxx('/trip_items.' + format + '', verb, params, options);}
function new_trip_item_path(verb){ return '/trip_items/new';}
function new_trip_item_ajax(verb, params, options){ return less_ajax('/trip_items/new', verb, params, options);}
function new_trip_item_ajaxx(verb, params, options){ return less_ajaxx('/trip_items/new', verb, params, options);}
function formatted_new_trip_item_path(format, verb){ return '/trip_items/new.' + format + '';}
function formatted_new_trip_item_ajax(format, verb, params, options){ return less_ajax('/trip_items/new.' + format + '', verb, params, options);}
function formatted_new_trip_item_ajaxx(format, verb, params, options){ return less_ajaxx('/trip_items/new.' + format + '', verb, params, options);}
function edit_trip_item_path(id, verb){ return '/trip_items/' + id + '/edit';}
function edit_trip_item_ajax(id, verb, params, options){ return less_ajax('/trip_items/' + id + '/edit', verb, params, options);}
function edit_trip_item_ajaxx(id, verb, params, options){ return less_ajaxx('/trip_items/' + id + '/edit', verb, params, options);}
function formatted_edit_trip_item_path(id, format, verb){ return '/trip_items/' + id + '/edit.' + format + '';}
function formatted_edit_trip_item_ajax(id, format, verb, params, options){ return less_ajax('/trip_items/' + id + '/edit.' + format + '', verb, params, options);}
function formatted_edit_trip_item_ajaxx(id, format, verb, params, options){ return less_ajaxx('/trip_items/' + id + '/edit.' + format + '', verb, params, options);}
function trip_item_path(id, verb){ return '/trip_items/' + id + '';}
function trip_item_ajax(id, verb, params, options){ return less_ajax('/trip_items/' + id + '', verb, params, options);}
function trip_item_ajaxx(id, verb, params, options){ return less_ajaxx('/trip_items/' + id + '', verb, params, options);}
function formatted_trip_item_path(id, format, verb){ return '/trip_items/' + id + '.' + format + '';}
function formatted_trip_item_ajax(id, format, verb, params, options){ return less_ajax('/trip_items/' + id + '.' + format + '', verb, params, options);}
function formatted_trip_item_ajaxx(id, format, verb, params, options){ return less_ajaxx('/trip_items/' + id + '.' + format + '', verb, params, options);}
function hotels_path(verb){ return '/hotels';}
function hotels_ajax(verb, params, options){ return less_ajax('/hotels', verb, params, options);}
function hotels_ajaxx(verb, params, options){ return less_ajaxx('/hotels', verb, params, options);}
function formatted_hotels_path(format, verb){ return '/hotels.' + format + '';}
function formatted_hotels_ajax(format, verb, params, options){ return less_ajax('/hotels.' + format + '', verb, params, options);}
function formatted_hotels_ajaxx(format, verb, params, options){ return less_ajaxx('/hotels.' + format + '', verb, params, options);}
function new_hotel_path(verb){ return '/hotels/new';}
function new_hotel_ajax(verb, params, options){ return less_ajax('/hotels/new', verb, params, options);}
function new_hotel_ajaxx(verb, params, options){ return less_ajaxx('/hotels/new', verb, params, options);}
function formatted_new_hotel_path(format, verb){ return '/hotels/new.' + format + '';}
function formatted_new_hotel_ajax(format, verb, params, options){ return less_ajax('/hotels/new.' + format + '', verb, params, options);}
function formatted_new_hotel_ajaxx(format, verb, params, options){ return less_ajaxx('/hotels/new.' + format + '', verb, params, options);}
function edit_hotel_path(id, verb){ return '/hotels/' + id + '/edit';}
function edit_hotel_ajax(id, verb, params, options){ return less_ajax('/hotels/' + id + '/edit', verb, params, options);}
function edit_hotel_ajaxx(id, verb, params, options){ return less_ajaxx('/hotels/' + id + '/edit', verb, params, options);}
function formatted_edit_hotel_path(id, format, verb){ return '/hotels/' + id + '/edit.' + format + '';}
function formatted_edit_hotel_ajax(id, format, verb, params, options){ return less_ajax('/hotels/' + id + '/edit.' + format + '', verb, params, options);}
function formatted_edit_hotel_ajaxx(id, format, verb, params, options){ return less_ajaxx('/hotels/' + id + '/edit.' + format + '', verb, params, options);}
function hotel_path(id, verb){ return '/hotels/' + id + '';}
function hotel_ajax(id, verb, params, options){ return less_ajax('/hotels/' + id + '', verb, params, options);}
function hotel_ajaxx(id, verb, params, options){ return less_ajaxx('/hotels/' + id + '', verb, params, options);}
function formatted_hotel_path(id, format, verb){ return '/hotels/' + id + '.' + format + '';}
function formatted_hotel_ajax(id, format, verb, params, options){ return less_ajax('/hotels/' + id + '.' + format + '', verb, params, options);}
function formatted_hotel_ajaxx(id, format, verb, params, options){ return less_ajaxx('/hotels/' + id + '.' + format + '', verb, params, options);}
function hotel_trip_items_path(hotel_id, verb){ return '/hotels/' + hotel_id + '/trip_items';}
function hotel_trip_items_ajax(hotel_id, verb, params, options){ return less_ajax('/hotels/' + hotel_id + '/trip_items', verb, params, options);}
function hotel_trip_items_ajaxx(hotel_id, verb, params, options){ return less_ajaxx('/hotels/' + hotel_id + '/trip_items', verb, params, options);}
function formatted_hotel_trip_items_path(hotel_id, format, verb){ return '/hotels/' + hotel_id + '/trip_items.' + format + '';}
function formatted_hotel_trip_items_ajax(hotel_id, format, verb, params, options){ return less_ajax('/hotels/' + hotel_id + '/trip_items.' + format + '', verb, params, options);}
function formatted_hotel_trip_items_ajaxx(hotel_id, format, verb, params, options){ return less_ajaxx('/hotels/' + hotel_id + '/trip_items.' + format + '', verb, params, options);}
function new_hotel_trip_item_path(hotel_id, verb){ return '/hotels/' + hotel_id + '/trip_items/new';}
function new_hotel_trip_item_ajax(hotel_id, verb, params, options){ return less_ajax('/hotels/' + hotel_id + '/trip_items/new', verb, params, options);}
function new_hotel_trip_item_ajaxx(hotel_id, verb, params, options){ return less_ajaxx('/hotels/' + hotel_id + '/trip_items/new', verb, params, options);}
function formatted_new_hotel_trip_item_path(hotel_id, format, verb){ return '/hotels/' + hotel_id + '/trip_items/new.' + format + '';}
function formatted_new_hotel_trip_item_ajax(hotel_id, format, verb, params, options){ return less_ajax('/hotels/' + hotel_id + '/trip_items/new.' + format + '', verb, params, options);}
function formatted_new_hotel_trip_item_ajaxx(hotel_id, format, verb, params, options){ return less_ajaxx('/hotels/' + hotel_id + '/trip_items/new.' + format + '', verb, params, options);}
function edit_hotel_trip_item_path(hotel_id, id, verb){ return '/hotels/' + hotel_id + '/trip_items/' + id + '/edit';}
function edit_hotel_trip_item_ajax(hotel_id, id, verb, params, options){ return less_ajax('/hotels/' + hotel_id + '/trip_items/' + id + '/edit', verb, params, options);}
function edit_hotel_trip_item_ajaxx(hotel_id, id, verb, params, options){ return less_ajaxx('/hotels/' + hotel_id + '/trip_items/' + id + '/edit', verb, params, options);}
function formatted_edit_hotel_trip_item_path(hotel_id, id, format, verb){ return '/hotels/' + hotel_id + '/trip_items/' + id + '/edit.' + format + '';}
function formatted_edit_hotel_trip_item_ajax(hotel_id, id, format, verb, params, options){ return less_ajax('/hotels/' + hotel_id + '/trip_items/' + id + '/edit.' + format + '', verb, params, options);}
function formatted_edit_hotel_trip_item_ajaxx(hotel_id, id, format, verb, params, options){ return less_ajaxx('/hotels/' + hotel_id + '/trip_items/' + id + '/edit.' + format + '', verb, params, options);}
function hotel_trip_item_path(hotel_id, id, verb){ return '/hotels/' + hotel_id + '/trip_items/' + id + '';}
function hotel_trip_item_ajax(hotel_id, id, verb, params, options){ return less_ajax('/hotels/' + hotel_id + '/trip_items/' + id + '', verb, params, options);}
function hotel_trip_item_ajaxx(hotel_id, id, verb, params, options){ return less_ajaxx('/hotels/' + hotel_id + '/trip_items/' + id + '', verb, params, options);}
function formatted_hotel_trip_item_path(hotel_id, id, format, verb){ return '/hotels/' + hotel_id + '/trip_items/' + id + '.' + format + '';}
function formatted_hotel_trip_item_ajax(hotel_id, id, format, verb, params, options){ return less_ajax('/hotels/' + hotel_id + '/trip_items/' + id + '.' + format + '', verb, params, options);}
function formatted_hotel_trip_item_ajaxx(hotel_id, id, format, verb, params, options){ return less_ajaxx('/hotels/' + hotel_id + '/trip_items/' + id + '.' + format + '', verb, params, options);}
function todo_trip_items_path(todo_id, verb){ return '/todos/' + todo_id + '/trip_items';}
function todo_trip_items_ajax(todo_id, verb, params, options){ return less_ajax('/todos/' + todo_id + '/trip_items', verb, params, options);}
function todo_trip_items_ajaxx(todo_id, verb, params, options){ return less_ajaxx('/todos/' + todo_id + '/trip_items', verb, params, options);}
function formatted_todo_trip_items_path(todo_id, format, verb){ return '/todos/' + todo_id + '/trip_items.' + format + '';}
function formatted_todo_trip_items_ajax(todo_id, format, verb, params, options){ return less_ajax('/todos/' + todo_id + '/trip_items.' + format + '', verb, params, options);}
function formatted_todo_trip_items_ajaxx(todo_id, format, verb, params, options){ return less_ajaxx('/todos/' + todo_id + '/trip_items.' + format + '', verb, params, options);}
function new_todo_trip_item_path(todo_id, verb){ return '/todos/' + todo_id + '/trip_items/new';}
function new_todo_trip_item_ajax(todo_id, verb, params, options){ return less_ajax('/todos/' + todo_id + '/trip_items/new', verb, params, options);}
function new_todo_trip_item_ajaxx(todo_id, verb, params, options){ return less_ajaxx('/todos/' + todo_id + '/trip_items/new', verb, params, options);}
function formatted_new_todo_trip_item_path(todo_id, format, verb){ return '/todos/' + todo_id + '/trip_items/new.' + format + '';}
function formatted_new_todo_trip_item_ajax(todo_id, format, verb, params, options){ return less_ajax('/todos/' + todo_id + '/trip_items/new.' + format + '', verb, params, options);}
function formatted_new_todo_trip_item_ajaxx(todo_id, format, verb, params, options){ return less_ajaxx('/todos/' + todo_id + '/trip_items/new.' + format + '', verb, params, options);}
function edit_todo_trip_item_path(todo_id, id, verb){ return '/todos/' + todo_id + '/trip_items/' + id + '/edit';}
function edit_todo_trip_item_ajax(todo_id, id, verb, params, options){ return less_ajax('/todos/' + todo_id + '/trip_items/' + id + '/edit', verb, params, options);}
function edit_todo_trip_item_ajaxx(todo_id, id, verb, params, options){ return less_ajaxx('/todos/' + todo_id + '/trip_items/' + id + '/edit', verb, params, options);}
function formatted_edit_todo_trip_item_path(todo_id, id, format, verb){ return '/todos/' + todo_id + '/trip_items/' + id + '/edit.' + format + '';}
function formatted_edit_todo_trip_item_ajax(todo_id, id, format, verb, params, options){ return less_ajax('/todos/' + todo_id + '/trip_items/' + id + '/edit.' + format + '', verb, params, options);}
function formatted_edit_todo_trip_item_ajaxx(todo_id, id, format, verb, params, options){ return less_ajaxx('/todos/' + todo_id + '/trip_items/' + id + '/edit.' + format + '', verb, params, options);}
function todo_trip_item_path(todo_id, id, verb){ return '/todos/' + todo_id + '/trip_items/' + id + '';}
function todo_trip_item_ajax(todo_id, id, verb, params, options){ return less_ajax('/todos/' + todo_id + '/trip_items/' + id + '', verb, params, options);}
function todo_trip_item_ajaxx(todo_id, id, verb, params, options){ return less_ajaxx('/todos/' + todo_id + '/trip_items/' + id + '', verb, params, options);}
function formatted_todo_trip_item_path(todo_id, id, format, verb){ return '/todos/' + todo_id + '/trip_items/' + id + '.' + format + '';}
function formatted_todo_trip_item_ajax(todo_id, id, format, verb, params, options){ return less_ajax('/todos/' + todo_id + '/trip_items/' + id + '.' + format + '', verb, params, options);}
function formatted_todo_trip_item_ajaxx(todo_id, id, format, verb, params, options){ return less_ajaxx('/todos/' + todo_id + '/trip_items/' + id + '.' + format + '', verb, params, options);}
function search_destinations_path(verb){ return '/destinations/search';}
function search_destinations_ajax(verb, params, options){ return less_ajax('/destinations/search', verb, params, options);}
function search_destinations_ajaxx(verb, params, options){ return less_ajaxx('/destinations/search', verb, params, options);}
function formatted_search_destinations_path(format, verb){ return '/destinations/search.' + format + '';}
function formatted_search_destinations_ajax(format, verb, params, options){ return less_ajax('/destinations/search.' + format + '', verb, params, options);}
function formatted_search_destinations_ajaxx(format, verb, params, options){ return less_ajaxx('/destinations/search.' + format + '', verb, params, options);}
function destinations_path(verb){ return '/destinations';}
function destinations_ajax(verb, params, options){ return less_ajax('/destinations', verb, params, options);}
function destinations_ajaxx(verb, params, options){ return less_ajaxx('/destinations', verb, params, options);}
function formatted_destinations_path(format, verb){ return '/destinations.' + format + '';}
function formatted_destinations_ajax(format, verb, params, options){ return less_ajax('/destinations.' + format + '', verb, params, options);}
function formatted_destinations_ajaxx(format, verb, params, options){ return less_ajaxx('/destinations.' + format + '', verb, params, options);}
function new_destination_path(verb){ return '/destinations/new';}
function new_destination_ajax(verb, params, options){ return less_ajax('/destinations/new', verb, params, options);}
function new_destination_ajaxx(verb, params, options){ return less_ajaxx('/destinations/new', verb, params, options);}
function formatted_new_destination_path(format, verb){ return '/destinations/new.' + format + '';}
function formatted_new_destination_ajax(format, verb, params, options){ return less_ajax('/destinations/new.' + format + '', verb, params, options);}
function formatted_new_destination_ajaxx(format, verb, params, options){ return less_ajaxx('/destinations/new.' + format + '', verb, params, options);}
function translate_destination_path(id, verb){ return '/destinations/' + id + '/translate';}
function translate_destination_ajax(id, verb, params, options){ return less_ajax('/destinations/' + id + '/translate', verb, params, options);}
function translate_destination_ajaxx(id, verb, params, options){ return less_ajaxx('/destinations/' + id + '/translate', verb, params, options);}
function formatted_translate_destination_path(id, format, verb){ return '/destinations/' + id + '/translate.' + format + '';}
function formatted_translate_destination_ajax(id, format, verb, params, options){ return less_ajax('/destinations/' + id + '/translate.' + format + '', verb, params, options);}
function formatted_translate_destination_ajaxx(id, format, verb, params, options){ return less_ajaxx('/destinations/' + id + '/translate.' + format + '', verb, params, options);}
function edit_destination_path(id, verb){ return '/destinations/' + id + '/edit';}
function edit_destination_ajax(id, verb, params, options){ return less_ajax('/destinations/' + id + '/edit', verb, params, options);}
function edit_destination_ajaxx(id, verb, params, options){ return less_ajaxx('/destinations/' + id + '/edit', verb, params, options);}
function formatted_edit_destination_path(id, format, verb){ return '/destinations/' + id + '/edit.' + format + '';}
function formatted_edit_destination_ajax(id, format, verb, params, options){ return less_ajax('/destinations/' + id + '/edit.' + format + '', verb, params, options);}
function formatted_edit_destination_ajaxx(id, format, verb, params, options){ return less_ajaxx('/destinations/' + id + '/edit.' + format + '', verb, params, options);}
function destination_path(id, verb){ return '/destinations/' + id + '';}
function destination_ajax(id, verb, params, options){ return less_ajax('/destinations/' + id + '', verb, params, options);}
function destination_ajaxx(id, verb, params, options){ return less_ajaxx('/destinations/' + id + '', verb, params, options);}
function formatted_destination_path(id, format, verb){ return '/destinations/' + id + '.' + format + '';}
function formatted_destination_ajax(id, format, verb, params, options){ return less_ajax('/destinations/' + id + '.' + format + '', verb, params, options);}
function formatted_destination_ajaxx(id, format, verb, params, options){ return less_ajaxx('/destinations/' + id + '.' + format + '', verb, params, options);}
function destination_attractions_path(destination_id, verb){ return '/destinations/' + destination_id + '/attractions';}
function destination_attractions_ajax(destination_id, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/attractions', verb, params, options);}
function destination_attractions_ajaxx(destination_id, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/attractions', verb, params, options);}
function formatted_destination_attractions_path(destination_id, format, verb){ return '/destinations/' + destination_id + '/attractions.' + format + '';}
function formatted_destination_attractions_ajax(destination_id, format, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/attractions.' + format + '', verb, params, options);}
function formatted_destination_attractions_ajaxx(destination_id, format, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/attractions.' + format + '', verb, params, options);}
function new_destination_attraction_path(destination_id, verb){ return '/destinations/' + destination_id + '/attractions/new';}
function new_destination_attraction_ajax(destination_id, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/attractions/new', verb, params, options);}
function new_destination_attraction_ajaxx(destination_id, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/attractions/new', verb, params, options);}
function formatted_new_destination_attraction_path(destination_id, format, verb){ return '/destinations/' + destination_id + '/attractions/new.' + format + '';}
function formatted_new_destination_attraction_ajax(destination_id, format, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/attractions/new.' + format + '', verb, params, options);}
function formatted_new_destination_attraction_ajaxx(destination_id, format, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/attractions/new.' + format + '', verb, params, options);}
function translate_destination_attraction_path(destination_id, id, verb){ return '/destinations/' + destination_id + '/attractions/' + id + '/translate';}
function translate_destination_attraction_ajax(destination_id, id, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/attractions/' + id + '/translate', verb, params, options);}
function translate_destination_attraction_ajaxx(destination_id, id, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/attractions/' + id + '/translate', verb, params, options);}
function formatted_translate_destination_attraction_path(destination_id, id, format, verb){ return '/destinations/' + destination_id + '/attractions/' + id + '/translate.' + format + '';}
function formatted_translate_destination_attraction_ajax(destination_id, id, format, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/attractions/' + id + '/translate.' + format + '', verb, params, options);}
function formatted_translate_destination_attraction_ajaxx(destination_id, id, format, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/attractions/' + id + '/translate.' + format + '', verb, params, options);}
function edit_destination_attraction_path(destination_id, id, verb){ return '/destinations/' + destination_id + '/attractions/' + id + '/edit';}
function edit_destination_attraction_ajax(destination_id, id, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/attractions/' + id + '/edit', verb, params, options);}
function edit_destination_attraction_ajaxx(destination_id, id, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/attractions/' + id + '/edit', verb, params, options);}
function formatted_edit_destination_attraction_path(destination_id, id, format, verb){ return '/destinations/' + destination_id + '/attractions/' + id + '/edit.' + format + '';}
function formatted_edit_destination_attraction_ajax(destination_id, id, format, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/attractions/' + id + '/edit.' + format + '', verb, params, options);}
function formatted_edit_destination_attraction_ajaxx(destination_id, id, format, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/attractions/' + id + '/edit.' + format + '', verb, params, options);}
function destination_attraction_path(destination_id, id, verb){ return '/destinations/' + destination_id + '/attractions/' + id + '';}
function destination_attraction_ajax(destination_id, id, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/attractions/' + id + '', verb, params, options);}
function destination_attraction_ajaxx(destination_id, id, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/attractions/' + id + '', verb, params, options);}
function formatted_destination_attraction_path(destination_id, id, format, verb){ return '/destinations/' + destination_id + '/attractions/' + id + '.' + format + '';}
function formatted_destination_attraction_ajax(destination_id, id, format, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/attractions/' + id + '.' + format + '', verb, params, options);}
function formatted_destination_attraction_ajaxx(destination_id, id, format, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/attractions/' + id + '.' + format + '', verb, params, options);}
function destination_trip_items_path(destination_id, verb){ return '/destinations/' + destination_id + '/trip_items';}
function destination_trip_items_ajax(destination_id, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/trip_items', verb, params, options);}
function destination_trip_items_ajaxx(destination_id, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/trip_items', verb, params, options);}
function formatted_destination_trip_items_path(destination_id, format, verb){ return '/destinations/' + destination_id + '/trip_items.' + format + '';}
function formatted_destination_trip_items_ajax(destination_id, format, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/trip_items.' + format + '', verb, params, options);}
function formatted_destination_trip_items_ajaxx(destination_id, format, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/trip_items.' + format + '', verb, params, options);}
function new_destination_trip_item_path(destination_id, verb){ return '/destinations/' + destination_id + '/trip_items/new';}
function new_destination_trip_item_ajax(destination_id, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/trip_items/new', verb, params, options);}
function new_destination_trip_item_ajaxx(destination_id, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/trip_items/new', verb, params, options);}
function formatted_new_destination_trip_item_path(destination_id, format, verb){ return '/destinations/' + destination_id + '/trip_items/new.' + format + '';}
function formatted_new_destination_trip_item_ajax(destination_id, format, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/trip_items/new.' + format + '', verb, params, options);}
function formatted_new_destination_trip_item_ajaxx(destination_id, format, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/trip_items/new.' + format + '', verb, params, options);}
function edit_destination_trip_item_path(destination_id, id, verb){ return '/destinations/' + destination_id + '/trip_items/' + id + '/edit';}
function edit_destination_trip_item_ajax(destination_id, id, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/trip_items/' + id + '/edit', verb, params, options);}
function edit_destination_trip_item_ajaxx(destination_id, id, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/trip_items/' + id + '/edit', verb, params, options);}
function formatted_edit_destination_trip_item_path(destination_id, id, format, verb){ return '/destinations/' + destination_id + '/trip_items/' + id + '/edit.' + format + '';}
function formatted_edit_destination_trip_item_ajax(destination_id, id, format, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/trip_items/' + id + '/edit.' + format + '', verb, params, options);}
function formatted_edit_destination_trip_item_ajaxx(destination_id, id, format, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/trip_items/' + id + '/edit.' + format + '', verb, params, options);}
function destination_trip_item_path(destination_id, id, verb){ return '/destinations/' + destination_id + '/trip_items/' + id + '';}
function destination_trip_item_ajax(destination_id, id, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/trip_items/' + id + '', verb, params, options);}
function destination_trip_item_ajaxx(destination_id, id, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/trip_items/' + id + '', verb, params, options);}
function formatted_destination_trip_item_path(destination_id, id, format, verb){ return '/destinations/' + destination_id + '/trip_items/' + id + '.' + format + '';}
function formatted_destination_trip_item_ajax(destination_id, id, format, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/trip_items/' + id + '.' + format + '', verb, params, options);}
function formatted_destination_trip_item_ajaxx(destination_id, id, format, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/trip_items/' + id + '.' + format + '', verb, params, options);}
function advanced_search_destination_car_rental_path(destination_id, verb){ return '/destinations/' + destination_id + '/car_rental/advanced_search';}
function advanced_search_destination_car_rental_ajax(destination_id, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/car_rental/advanced_search', verb, params, options);}
function advanced_search_destination_car_rental_ajaxx(destination_id, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/car_rental/advanced_search', verb, params, options);}
function formatted_advanced_search_destination_car_rental_path(destination_id, format, verb){ return '/destinations/' + destination_id + '/car_rental/advanced_search.' + format + '';}
function formatted_advanced_search_destination_car_rental_ajax(destination_id, format, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/car_rental/advanced_search.' + format + '', verb, params, options);}
function formatted_advanced_search_destination_car_rental_ajaxx(destination_id, format, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/car_rental/advanced_search.' + format + '', verb, params, options);}
function confirm_destination_car_rental_path(destination_id, verb){ return '/destinations/' + destination_id + '/car_rental/confirm';}
function confirm_destination_car_rental_ajax(destination_id, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/car_rental/confirm', verb, params, options);}
function confirm_destination_car_rental_ajaxx(destination_id, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/car_rental/confirm', verb, params, options);}
function formatted_confirm_destination_car_rental_path(destination_id, format, verb){ return '/destinations/' + destination_id + '/car_rental/confirm.' + format + '';}
function formatted_confirm_destination_car_rental_ajax(destination_id, format, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/car_rental/confirm.' + format + '', verb, params, options);}
function formatted_confirm_destination_car_rental_ajaxx(destination_id, format, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/car_rental/confirm.' + format + '', verb, params, options);}
function choose_destination_car_rental_path(destination_id, verb){ return '/destinations/' + destination_id + '/car_rental/choose';}
function choose_destination_car_rental_ajax(destination_id, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/car_rental/choose', verb, params, options);}
function choose_destination_car_rental_ajaxx(destination_id, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/car_rental/choose', verb, params, options);}
function formatted_choose_destination_car_rental_path(destination_id, format, verb){ return '/destinations/' + destination_id + '/car_rental/choose.' + format + '';}
function formatted_choose_destination_car_rental_ajax(destination_id, format, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/car_rental/choose.' + format + '', verb, params, options);}
function formatted_choose_destination_car_rental_ajaxx(destination_id, format, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/car_rental/choose.' + format + '', verb, params, options);}
function pay_destination_car_rental_path(destination_id, verb){ return '/destinations/' + destination_id + '/car_rental/pay';}
function pay_destination_car_rental_ajax(destination_id, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/car_rental/pay', verb, params, options);}
function pay_destination_car_rental_ajaxx(destination_id, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/car_rental/pay', verb, params, options);}
function formatted_pay_destination_car_rental_path(destination_id, format, verb){ return '/destinations/' + destination_id + '/car_rental/pay.' + format + '';}
function formatted_pay_destination_car_rental_ajax(destination_id, format, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/car_rental/pay.' + format + '', verb, params, options);}
function formatted_pay_destination_car_rental_ajaxx(destination_id, format, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/car_rental/pay.' + format + '', verb, params, options);}
function search_destination_car_rental_path(destination_id, verb){ return '/destinations/' + destination_id + '/car_rental/search';}
function search_destination_car_rental_ajax(destination_id, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/car_rental/search', verb, params, options);}
function search_destination_car_rental_ajaxx(destination_id, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/car_rental/search', verb, params, options);}
function formatted_search_destination_car_rental_path(destination_id, format, verb){ return '/destinations/' + destination_id + '/car_rental/search.' + format + '';}
function formatted_search_destination_car_rental_ajax(destination_id, format, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/car_rental/search.' + format + '', verb, params, options);}
function formatted_search_destination_car_rental_ajaxx(destination_id, format, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/car_rental/search.' + format + '', verb, params, options);}
function destination_car_rental_index_path(destination_id, verb){ return '/destinations/' + destination_id + '/car_rental';}
function destination_car_rental_index_ajax(destination_id, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/car_rental', verb, params, options);}
function destination_car_rental_index_ajaxx(destination_id, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/car_rental', verb, params, options);}
function formatted_destination_car_rental_index_path(destination_id, format, verb){ return '/destinations/' + destination_id + '/car_rental.' + format + '';}
function formatted_destination_car_rental_index_ajax(destination_id, format, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/car_rental.' + format + '', verb, params, options);}
function formatted_destination_car_rental_index_ajaxx(destination_id, format, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/car_rental.' + format + '', verb, params, options);}
function new_destination_car_rental_path(destination_id, verb){ return '/destinations/' + destination_id + '/car_rental/new';}
function new_destination_car_rental_ajax(destination_id, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/car_rental/new', verb, params, options);}
function new_destination_car_rental_ajaxx(destination_id, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/car_rental/new', verb, params, options);}
function formatted_new_destination_car_rental_path(destination_id, format, verb){ return '/destinations/' + destination_id + '/car_rental/new.' + format + '';}
function formatted_new_destination_car_rental_ajax(destination_id, format, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/car_rental/new.' + format + '', verb, params, options);}
function formatted_new_destination_car_rental_ajaxx(destination_id, format, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/car_rental/new.' + format + '', verb, params, options);}
function edit_destination_car_rental_path(destination_id, id, verb){ return '/destinations/' + destination_id + '/car_rental/' + id + '/edit';}
function edit_destination_car_rental_ajax(destination_id, id, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/car_rental/' + id + '/edit', verb, params, options);}
function edit_destination_car_rental_ajaxx(destination_id, id, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/car_rental/' + id + '/edit', verb, params, options);}
function formatted_edit_destination_car_rental_path(destination_id, id, format, verb){ return '/destinations/' + destination_id + '/car_rental/' + id + '/edit.' + format + '';}
function formatted_edit_destination_car_rental_ajax(destination_id, id, format, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/car_rental/' + id + '/edit.' + format + '', verb, params, options);}
function formatted_edit_destination_car_rental_ajaxx(destination_id, id, format, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/car_rental/' + id + '/edit.' + format + '', verb, params, options);}
function destination_car_rental_path(destination_id, id, verb){ return '/destinations/' + destination_id + '/car_rental/' + id + '';}
function destination_car_rental_ajax(destination_id, id, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/car_rental/' + id + '', verb, params, options);}
function destination_car_rental_ajaxx(destination_id, id, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/car_rental/' + id + '', verb, params, options);}
function formatted_destination_car_rental_path(destination_id, id, format, verb){ return '/destinations/' + destination_id + '/car_rental/' + id + '.' + format + '';}
function formatted_destination_car_rental_ajax(destination_id, id, format, verb, params, options){ return less_ajax('/destinations/' + destination_id + '/car_rental/' + id + '.' + format + '', verb, params, options);}
function formatted_destination_car_rental_ajaxx(destination_id, id, format, verb, params, options){ return less_ajaxx('/destinations/' + destination_id + '/car_rental/' + id + '.' + format + '', verb, params, options);}
function trips_path(verb){ return '/trips';}
function trips_ajax(verb, params, options){ return less_ajax('/trips', verb, params, options);}
function trips_ajaxx(verb, params, options){ return less_ajaxx('/trips', verb, params, options);}
function formatted_trips_path(format, verb){ return '/trips.' + format + '';}
function formatted_trips_ajax(format, verb, params, options){ return less_ajax('/trips.' + format + '', verb, params, options);}
function formatted_trips_ajaxx(format, verb, params, options){ return less_ajaxx('/trips.' + format + '', verb, params, options);}
function new_trip_path(verb){ return '/trips/new';}
function new_trip_ajax(verb, params, options){ return less_ajax('/trips/new', verb, params, options);}
function new_trip_ajaxx(verb, params, options){ return less_ajaxx('/trips/new', verb, params, options);}
function formatted_new_trip_path(format, verb){ return '/trips/new.' + format + '';}
function formatted_new_trip_ajax(format, verb, params, options){ return less_ajax('/trips/new.' + format + '', verb, params, options);}
function formatted_new_trip_ajaxx(format, verb, params, options){ return less_ajaxx('/trips/new.' + format + '', verb, params, options);}
function sort_trip_path(id, verb){ return '/trips/' + id + '/sort';}
function sort_trip_ajax(id, verb, params, options){ return less_ajax('/trips/' + id + '/sort', verb, params, options);}
function sort_trip_ajaxx(id, verb, params, options){ return less_ajaxx('/trips/' + id + '/sort', verb, params, options);}
function formatted_sort_trip_path(id, format, verb){ return '/trips/' + id + '/sort.' + format + '';}
function formatted_sort_trip_ajax(id, format, verb, params, options){ return less_ajax('/trips/' + id + '/sort.' + format + '', verb, params, options);}
function formatted_sort_trip_ajaxx(id, format, verb, params, options){ return less_ajaxx('/trips/' + id + '/sort.' + format + '', verb, params, options);}
function edit_trip_path(id, verb){ return '/trips/' + id + '/edit';}
function edit_trip_ajax(id, verb, params, options){ return less_ajax('/trips/' + id + '/edit', verb, params, options);}
function edit_trip_ajaxx(id, verb, params, options){ return less_ajaxx('/trips/' + id + '/edit', verb, params, options);}
function formatted_edit_trip_path(id, format, verb){ return '/trips/' + id + '/edit.' + format + '';}
function formatted_edit_trip_ajax(id, format, verb, params, options){ return less_ajax('/trips/' + id + '/edit.' + format + '', verb, params, options);}
function formatted_edit_trip_ajaxx(id, format, verb, params, options){ return less_ajaxx('/trips/' + id + '/edit.' + format + '', verb, params, options);}
function trip_path(id, verb){ return '/trips/' + id + '';}
function trip_ajax(id, verb, params, options){ return less_ajax('/trips/' + id + '', verb, params, options);}
function trip_ajaxx(id, verb, params, options){ return less_ajaxx('/trips/' + id + '', verb, params, options);}
function formatted_trip_path(id, format, verb){ return '/trips/' + id + '.' + format + '';}
function formatted_trip_ajax(id, format, verb, params, options){ return less_ajax('/trips/' + id + '.' + format + '', verb, params, options);}
function formatted_trip_ajaxx(id, format, verb, params, options){ return less_ajaxx('/trips/' + id + '.' + format + '', verb, params, options);}
function private_trip_path(id, verb){ return '/trips/private/' + id + '';}
function private_trip_ajax(id, verb, params, options){ return less_ajax('/trips/private/' + id + '', verb, params, options);}
function private_trip_ajaxx(id, verb, params, options){ return less_ajaxx('/trips/private/' + id + '', verb, params, options);}
function people_path(verb){ return '/people';}
function people_ajax(verb, params, options){ return less_ajax('/people', verb, params, options);}
function people_ajaxx(verb, params, options){ return less_ajaxx('/people', verb, params, options);}
function formatted_people_path(format, verb){ return '/people.' + format + '';}
function formatted_people_ajax(format, verb, params, options){ return less_ajax('/people.' + format + '', verb, params, options);}
function formatted_people_ajaxx(format, verb, params, options){ return less_ajaxx('/people.' + format + '', verb, params, options);}
function new_person_path(verb){ return '/people/new';}
function new_person_ajax(verb, params, options){ return less_ajax('/people/new', verb, params, options);}
function new_person_ajaxx(verb, params, options){ return less_ajaxx('/people/new', verb, params, options);}
function formatted_new_person_path(format, verb){ return '/people/new.' + format + '';}
function formatted_new_person_ajax(format, verb, params, options){ return less_ajax('/people/new.' + format + '', verb, params, options);}
function formatted_new_person_ajaxx(format, verb, params, options){ return less_ajaxx('/people/new.' + format + '', verb, params, options);}
function edit_person_path(id, verb){ return '/people/' + id + '/edit';}
function edit_person_ajax(id, verb, params, options){ return less_ajax('/people/' + id + '/edit', verb, params, options);}
function edit_person_ajaxx(id, verb, params, options){ return less_ajaxx('/people/' + id + '/edit', verb, params, options);}
function formatted_edit_person_path(id, format, verb){ return '/people/' + id + '/edit.' + format + '';}
function formatted_edit_person_ajax(id, format, verb, params, options){ return less_ajax('/people/' + id + '/edit.' + format + '', verb, params, options);}
function formatted_edit_person_ajaxx(id, format, verb, params, options){ return less_ajaxx('/people/' + id + '/edit.' + format + '', verb, params, options);}
function delete_icon_person_path(id, verb){ return '/people/' + id + '/delete_icon';}
function delete_icon_person_ajax(id, verb, params, options){ return less_ajax('/people/' + id + '/delete_icon', verb, params, options);}
function delete_icon_person_ajaxx(id, verb, params, options){ return less_ajaxx('/people/' + id + '/delete_icon', verb, params, options);}
function formatted_delete_icon_person_path(id, format, verb){ return '/people/' + id + '/delete_icon.' + format + '';}
function formatted_delete_icon_person_ajax(id, format, verb, params, options){ return less_ajax('/people/' + id + '/delete_icon.' + format + '', verb, params, options);}
function formatted_delete_icon_person_ajaxx(id, format, verb, params, options){ return less_ajaxx('/people/' + id + '/delete_icon.' + format + '', verb, params, options);}
function person_path(id, verb){ return '/people/' + id + '';}
function person_ajax(id, verb, params, options){ return less_ajax('/people/' + id + '', verb, params, options);}
function person_ajaxx(id, verb, params, options){ return less_ajaxx('/people/' + id + '', verb, params, options);}
function formatted_person_path(id, format, verb){ return '/people/' + id + '.' + format + '';}
function formatted_person_ajax(id, format, verb, params, options){ return less_ajax('/people/' + id + '.' + format + '', verb, params, options);}
function formatted_person_ajaxx(id, format, verb, params, options){ return less_ajaxx('/people/' + id + '.' + format + '', verb, params, options);}
function login_path(verb){ return '/login';}
function login_ajax(verb, params, options){ return less_ajax('/login', verb, params, options);}
function login_ajaxx(verb, params, options){ return less_ajaxx('/login', verb, params, options);}
function logout_path(verb){ return '/logout';}
function logout_ajax(verb, params, options){ return less_ajax('/logout', verb, params, options);}
function logout_ajaxx(verb, params, options){ return less_ajaxx('/logout', verb, params, options);}
function signup_path(verb){ return '/signup';}
function signup_ajax(verb, params, options){ return less_ajax('/signup', verb, params, options);}
function signup_ajaxx(verb, params, options){ return less_ajaxx('/signup', verb, params, options);}
function home_path(verb){ return '';}
function home_ajax(verb, params, options){ return less_ajax('', verb, params, options);}
function home_ajaxx(verb, params, options){ return less_ajaxx('', verb, params, options);}


/*
 * Autocomplete - jQuery plugin 1.0.2
 *
 * Copyright (c) 2007 Dylan Verheul, Dan G. Switzer, Anjesh Tuladhar, Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.autocomplete.js 5747 2008-06-25 18:30:55Z joern.zaefferer $
 *
 */

;(function($) {
	
$.fn.extend({
	autocomplete: function(urlOrData, options) {
		var isUrl = typeof urlOrData == "string";
		options = $.extend({}, $.Autocompleter.defaults, {
			url: isUrl ? urlOrData : null,
			data: isUrl ? null : urlOrData,
			delay: isUrl ? $.Autocompleter.defaults.delay : 10,
			max: options && !options.scroll ? 10 : 150
		}, options);
		
		// if highlight is set to false, replace it with a do-nothing function
		options.highlight = options.highlight || function(value) { return value; };
		
		// if the formatMatch option is not specified, then use formatItem for backwards compatibility
		options.formatMatch = options.formatMatch || options.formatItem;
		
		return this.each(function() {
			new $.Autocompleter(this, options);
		});
	},
	result: function(handler) {
		return this.bind("result", handler);
	},
	search: function(handler) {
		return this.trigger("search", [handler]);
	},
	flushCache: function() {
		return this.trigger("flushCache");
	},
	setOptions: function(options){
		return this.trigger("setOptions", [options]);
	},
	unautocomplete: function() {
		return this.trigger("unautocomplete");
	}
});

$.Autocompleter = function(input, options) {

	var KEY = {
		UP: 38,
		DOWN: 40,
		DEL: 46,
		TAB: 9,
		RETURN: 13,
		ESC: 27,
		COMMA: 188,
		PAGEUP: 33,
		PAGEDOWN: 34,
		BACKSPACE: 8
	};

	// Create $ object for input element
	var $input = $(input).attr("autocomplete", "off").addClass(options.inputClass);

	var timeout;
	var previousValue = "";
	var cache = $.Autocompleter.Cache(options);
	var hasFocus = 0;
	var lastKeyPressCode;
	var config = {
		mouseDownOnSelect: false
	};
	var select = $.Autocompleter.Select(options, input, selectCurrent, config);
	
	var blockSubmit;
	
	// prevent form submit in opera when selecting with return key
	$.browser.opera && $(input.form).bind("submit.autocomplete", function() {
		if (blockSubmit) {
			blockSubmit = false;
			return false;
		}
	});
	
	// only opera doesn't trigger keydown multiple times while pressed, others don't work with keypress at all
	$input.bind(($.browser.opera ? "keypress" : "keydown") + ".autocomplete", function(event) {
		// track last key pressed
		lastKeyPressCode = event.keyCode;
		switch(event.keyCode) {
		
			case KEY.UP:
				event.preventDefault();
				if ( select.visible() ) {
					select.prev();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.DOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.next();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.PAGEUP:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageUp();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.PAGEDOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageDown();
				} else {
					onChange(0, true);
				}
				break;
			
			// matches also semicolon
			case options.multiple && $.trim(options.multipleSeparator) == "," && KEY.COMMA:
			case KEY.TAB:
			case KEY.RETURN:
				if( selectCurrent() ) {
					// stop default to prevent a form submit, Opera needs special handling
					event.preventDefault();
					blockSubmit = true;
					return false;
				}
				break;
				
			case KEY.ESC:
				select.hide();
				break;
				
			default:
				clearTimeout(timeout);
				timeout = setTimeout(onChange, options.delay);
				break;
		}
	}).focus(function(){
		// track whether the field has focus, we shouldn't process any
		// results if the field no longer has focus
		hasFocus++;
	}).blur(function() {
		hasFocus = 0;
		if (!config.mouseDownOnSelect) {
			hideResults();
		}
	}).click(function() {
		// show select when clicking in a focused field
		if ( hasFocus++ > 1 && !select.visible() ) {
			onChange(0, true);
		}
	}).bind("search", function() {
		// TODO why not just specifying both arguments?
		var fn = (arguments.length > 1) ? arguments[1] : null;
		function findValueCallback(q, data) {
			var result;
			if( data && data.length ) {
				for (var i=0; i < data.length; i++) {
					if( data[i].result.toLowerCase() == q.toLowerCase() ) {
						result = data[i];
						break;
					}
				}
			}
			if( typeof fn == "function" ) fn(result);
			else $input.trigger("result", result && [result.data, result.value]);
		}
		$.each(trimWords($input.val()), function(i, value) {
			request(value, findValueCallback, findValueCallback);
		});
	}).bind("flushCache", function() {
		cache.flush();
	}).bind("setOptions", function() {
		$.extend(options, arguments[1]);
		// if we've updated the data, repopulate
		if ( "data" in arguments[1] )
			cache.populate();
	}).bind("unautocomplete", function() {
		select.unbind();
		$input.unbind();
		$(input.form).unbind(".autocomplete");
	});
	
	
	function selectCurrent() {
		var selected = select.selected();
		if( !selected )
			return false;
		
		var v = selected.result;
		previousValue = v;
		
		if ( options.multiple ) {
			var words = trimWords($input.val());
			if ( words.length > 1 ) {
				v = words.slice(0, words.length - 1).join( options.multipleSeparator ) + options.multipleSeparator + v;
			}
			v += options.multipleSeparator;
		}
		
		$input.val(v);
		hideResultsNow();
		$input.trigger("result", [selected.data, selected.value]);
		return true;
	}
	
	function onChange(crap, skipPrevCheck) {
		if( lastKeyPressCode == KEY.DEL ) {
			select.hide();
			return;
		}
		
		var currentValue = $input.val();
		
		if ( !skipPrevCheck && currentValue == previousValue )
			return;
		
		previousValue = currentValue;
		
		currentValue = lastWord(currentValue);
		if ( currentValue.length >= options.minChars) {
			$input.addClass(options.loadingClass);
			if (!options.matchCase)
				currentValue = currentValue.toLowerCase();
			request(currentValue, receiveData, hideResultsNow);
		} else {
			stopLoading();
			select.hide();
		}
	};
	
	function trimWords(value) {
		if ( !value ) {
			return [""];
		}
		var words = value.split( options.multipleSeparator );
		var result = [];
		$.each(words, function(i, value) {
			if ( $.trim(value) )
				result[i] = $.trim(value);
		});
		return result;
	}
	
	function lastWord(value) {
		if ( !options.multiple )
			return value;
		var words = trimWords(value);
		return words[words.length - 1];
	}
	
	// fills in the input box w/the first match (assumed to be the best match)
	// q: the term entered
	// sValue: the first matching result
	function autoFill(q, sValue){
		// autofill in the complete box w/the first match as long as the user hasn't entered in more data
		// if the last user key pressed was backspace, don't autofill
		if( options.autoFill && (lastWord($input.val()).toLowerCase() == q.toLowerCase()) && lastKeyPressCode != KEY.BACKSPACE ) {
			// fill in the value (keep the case the user has typed)
			$input.val($input.val() + sValue.substring(lastWord(previousValue).length));
			// select the portion of the value not typed by the user (so the next character will erase)
			$.Autocompleter.Selection(input, previousValue.length, previousValue.length + sValue.length);
		}
	};

	function hideResults() {
		clearTimeout(timeout);
		timeout = setTimeout(hideResultsNow, 200);
	};

	function hideResultsNow() {
		var wasVisible = select.visible();
		select.hide();
		clearTimeout(timeout);
		stopLoading();
		if (options.mustMatch) {
			// call search and run callback
			$input.search(
				function (result){
					// if no value found, clear the input box
					if( !result ) {
						if (options.multiple) {
							var words = trimWords($input.val()).slice(0, -1);
							$input.val( words.join(options.multipleSeparator) + (words.length ? options.multipleSeparator : "") );
						}
						else
							$input.val( "" );
					}
				}
			);
		}
		if (wasVisible)
			// position cursor at end of input field
			$.Autocompleter.Selection(input, input.value.length, input.value.length);
	};

	function receiveData(q, data) {
		if ( data && data.length && hasFocus ) {
			stopLoading();
			select.display(data, q);
			autoFill(q, data[0].value);
			select.show();
		} else {
			hideResultsNow();
		}
	};

	function request(term, success, failure) {
		if (!options.matchCase)
			term = term.toLowerCase();
		var data = cache.load(term);
		// recieve the cached data
		if (data && data.length) {
			success(term, data);
		// if an AJAX url has been supplied, try loading the data now
		} else if( (typeof options.url == "string") && (options.url.length > 0) ){
			
			var extraParams = {
				timestamp: +new Date()
			};
			$.each(options.extraParams, function(key, param) {
				extraParams[key] = typeof param == "function" ? param() : param;
			});
			
			$.ajax({
				// try to leverage ajaxQueue plugin to abort previous requests
				mode: "abort",
				// limit abortion to this input
				port: "autocomplete" + input.name,
				dataType: options.dataType,
				url: options.url,
				data: $.extend({
					q: lastWord(term),
					limit: options.max
				}, extraParams),
				success: function(data) {
					var parsed = options.parse && options.parse(data) || parse(data);
					cache.add(term, parsed);
					success(term, parsed);
				}
			});
		} else {
			// if we have a failure, we need to empty the list -- this prevents the the [TAB] key from selecting the last successful match
			select.emptyList();
			failure(term);
		}
	};
	
	function parse(data) {
		var parsed = [];
		var rows = data.split("\n");
		for (var i=0; i < rows.length; i++) {
			var row = $.trim(rows[i]);
			if (row) {
				row = row.split("|");
				parsed[parsed.length] = {
					data: row,
					value: row[0],
					result: options.formatResult && options.formatResult(row, row[0]) || row[0]
				};
			}
		}
		return parsed;
	};

	function stopLoading() {
		$input.removeClass(options.loadingClass);
	};

};

$.Autocompleter.defaults = {
	inputClass: "ac_input",
	resultsClass: "ac_results",
	loadingClass: "ac_loading",
	minChars: 1,
	delay: 400,
	matchCase: false,
	matchSubset: true,
	matchContains: false,
	cacheLength: 10,
	max: 100,
	mustMatch: false,
	extraParams: {},
	selectFirst: true,
	formatItem: function(row) { return row[0]; },
	formatMatch: null,
	autoFill: false,
	width: 0,
	multiple: false,
	multipleSeparator: ", ",
	highlight: function(value, term) {
		return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
	},
    scroll: true,
    scrollHeight: 180
};

$.Autocompleter.Cache = function(options) {

	var data = {};
	var length = 0;
	
	function matchSubset(s, sub) {
		if (!options.matchCase) 
			s = s.toLowerCase();
		var i = s.indexOf(sub);
		if (i == -1) return false;
		return i == 0 || options.matchContains;
	};
	
	function add(q, value) {
		if (length > options.cacheLength){
			flush();
		}
		if (!data[q]){ 
			length++;
		}
		data[q] = value;
	}
	
	function populate(){
		if( !options.data ) return false;
		// track the matches
		var stMatchSets = {},
			nullData = 0;

		// no url was specified, we need to adjust the cache length to make sure it fits the local data store
		if( !options.url ) options.cacheLength = 1;
		
		// track all options for minChars = 0
		stMatchSets[""] = [];
		
		// loop through the array and create a lookup structure
		for ( var i = 0, ol = options.data.length; i < ol; i++ ) {
			var rawValue = options.data[i];
			// if rawValue is a string, make an array otherwise just reference the array
			rawValue = (typeof rawValue == "string") ? [rawValue] : rawValue;
			
			var value = options.formatMatch(rawValue, i+1, options.data.length);
			if ( value === false )
				continue;
				
			var firstChar = value.charAt(0).toLowerCase();
			// if no lookup array for this character exists, look it up now
			if( !stMatchSets[firstChar] ) 
				stMatchSets[firstChar] = [];

			// if the match is a string
			var row = {
				value: value,
				data: rawValue,
				result: options.formatResult && options.formatResult(rawValue) || value
			};
			
			// push the current match into the set list
			stMatchSets[firstChar].push(row);

			// keep track of minChars zero items
			if ( nullData++ < options.max ) {
				stMatchSets[""].push(row);
			}
		};

		// add the data items to the cache
		$.each(stMatchSets, function(i, value) {
			// increase the cache size
			options.cacheLength++;
			// add to the cache
			add(i, value);
		});
	}
	
	// populate any existing data
	setTimeout(populate, 25);
	
	function flush(){
		data = {};
		length = 0;
	}
	
	return {
		flush: flush,
		add: add,
		populate: populate,
		load: function(q) {
			if (!options.cacheLength || !length)
				return null;
			/* 
			 * if dealing w/local data and matchContains than we must make sure
			 * to loop through all the data collections looking for matches
			 */
			if( !options.url && options.matchContains ){
				// track all matches
				var csub = [];
				// loop through all the data grids for matches
				for( var k in data ){
					// don't search through the stMatchSets[""] (minChars: 0) cache
					// this prevents duplicates
					if( k.length > 0 ){
						var c = data[k];
						$.each(c, function(i, x) {
							// if we've got a match, add it to the array
							if (matchSubset(x.value, q)) {
								csub.push(x);
							}
						});
					}
				}				
				return csub;
			} else 
			// if the exact item exists, use it
			if (data[q]){
				return data[q];
			} else
			if (options.matchSubset) {
				for (var i = q.length - 1; i >= options.minChars; i--) {
					var c = data[q.substr(0, i)];
					if (c) {
						var csub = [];
						$.each(c, function(i, x) {
							if (matchSubset(x.value, q)) {
								csub[csub.length] = x;
							}
						});
						return csub;
					}
				}
			}
			return null;
		}
	};
};

$.Autocompleter.Select = function (options, input, select, config) {
	var CLASSES = {
		ACTIVE: "ac_over"
	};
	
	var listItems,
		active = -1,
		data,
		term = "",
		needsInit = true,
		element,
		list;
	
	// Create results
	function init() {
		if (!needsInit)
			return;
		element = $("<div/>")
		.hide()
		.addClass(options.resultsClass)
		.css("position", "absolute")
		.appendTo(document.body);
	
		list = $("<ul/>").appendTo(element).mouseover( function(event) {
			if(target(event).nodeName && target(event).nodeName.toUpperCase() == 'LI') {
	            active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
			    $(target(event)).addClass(CLASSES.ACTIVE);            
	        }
		}).click(function(event) {
			$(target(event)).addClass(CLASSES.ACTIVE);
			select();
			// TODO provide option to avoid setting focus again after selection? useful for cleanup-on-focus
			input.focus();
			return false;
		}).mousedown(function() {
			config.mouseDownOnSelect = true;
		}).mouseup(function() {
			config.mouseDownOnSelect = false;
		});
		
		if( options.width > 0 )
			element.css("width", options.width);
			
		needsInit = false;
	} 
	
	function target(event) {
		var element = event.target;
		while(element && element.tagName != "LI")
			element = element.parentNode;
		// more fun with IE, sometimes event.target is empty, just ignore it then
		if(!element)
			return [];
		return element;
	}

	function moveSelect(step) {
		listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
		movePosition(step);
        var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
        if(options.scroll) {
            var offset = 0;
            listItems.slice(0, active).each(function() {
				offset += this.offsetHeight;
			});
            if((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
                list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight());
            } else if(offset < list.scrollTop()) {
                list.scrollTop(offset);
            }
        }
	};
	
	function movePosition(step) {
		active += step;
		if (active < 0) {
			active = listItems.size() - 1;
		} else if (active >= listItems.size()) {
			active = 0;
		}
	}
	
	function limitNumberOfItems(available) {
		return options.max && options.max < available
			? options.max
			: available;
	}
	
	function fillList() {
		list.empty();
		var max = limitNumberOfItems(data.length);
		for (var i=0; i < max; i++) {
			if (!data[i])
				continue;
			var formatted = options.formatItem(data[i].data, i+1, max, data[i].value, term);
			if ( formatted === false )
				continue;
			var li = $("<li/>").html( options.highlight(formatted, term) ).addClass(i%2 == 0 ? "ac_even" : "ac_odd").appendTo(list)[0];
			$.data(li, "ac_data", data[i]);
		}
		listItems = list.find("li");
		if ( options.selectFirst ) {
			listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
			active = 0;
		}
		// apply bgiframe if available
		if ( $.fn.bgiframe )
			list.bgiframe();
	}
	
	return {
		display: function(d, q) {
			init();
			data = d;
			term = q;
			fillList();
		},
		next: function() {
			moveSelect(1);
		},
		prev: function() {
			moveSelect(-1);
		},
		pageUp: function() {
			if (active != 0 && active - 8 < 0) {
				moveSelect( -active );
			} else {
				moveSelect(-8);
			}
		},
		pageDown: function() {
			if (active != listItems.size() - 1 && active + 8 > listItems.size()) {
				moveSelect( listItems.size() - 1 - active );
			} else {
				moveSelect(8);
			}
		},
		hide: function() {
			element && element.hide();
			listItems && listItems.removeClass(CLASSES.ACTIVE);
			active = -1;
		},
		visible : function() {
			return element && element.is(":visible");
		},
		current: function() {
			return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0]);
		},
		show: function() {
			var offset = $(input).offset();
			element.css({
				width: typeof options.width == "string" || options.width > 0 ? options.width : $(input).width(),
				top: offset.top + input.offsetHeight,
				left: offset.left
			}).show();
            if(options.scroll) {
                list.scrollTop(0);
                list.css({
					maxHeight: options.scrollHeight,
					overflow: 'auto'
				});
				
                if($.browser.msie && typeof document.body.style.maxHeight === "undefined") {
					var listHeight = 0;
					listItems.each(function() {
						listHeight += this.offsetHeight;
					});
					var scrollbarsVisible = listHeight > options.scrollHeight;
                    list.css('height', scrollbarsVisible ? options.scrollHeight : listHeight );
					if (!scrollbarsVisible) {
						// IE doesn't recalculate width when scrollbar disappears
						listItems.width( list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")) );
					}
                }
                
            }
		},
		selected: function() {
			var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
			return selected && selected.length && $.data(selected[0], "ac_data");
		},
		emptyList: function (){
			list && list.empty();
		},
		unbind: function() {
			element && element.remove();
		}
	};
};

$.Autocompleter.Selection = function(field, start, end) {
	if( field.createTextRange ){
		var selRange = field.createTextRange();
		selRange.collapse(true);
		selRange.moveStart("character", start);
		selRange.moveEnd("character", end);
		selRange.select();
	} else if( field.setSelectionRange ){
		field.setSelectionRange(start, end);
	} else {
		if( field.selectionStart ){
			field.selectionStart = start;
			field.selectionEnd = end;
		}
	}
	field.focus();
};

})(jQuery);




















/*
 * Thickbox 3.1 - One Box To Rule Them All.
 * By Cody Lindley (http://www.codylindley.com)
 * Copyright (c) 2007 cody lindley
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
*/
      
//var tb_pathToImage = "/images/loading.gif";
/*!!!!!!!!!!!!!!!!! edit below this line at your own risk !!!!!!!!!!!!!!!!!!!!!!!*/
//on page load call tb_init
jQuery(document).ready(function(){   
  tb_init('a.thickbox');//pass where to apply thickbox
//  imgLoader = new Image();// preload image
//  imgLoader.src = tb_pathToImage;
});
//add thickbox to href & area elements that have a class of .thickbox

function TB_init(){return tb_init('a.thickbox');}
function tb_init(domChunk){
  jQuery(domChunk).unbind("click.thickbox").bind('click.thickbox', function(){
  var t = this.title || this.name || null;
  var a = this.href || this.alt;
  var g = this.rel || false;
  tb_show(t,a,g);
  this.blur();
  return false;
  });
}
function TB_show(caption, url, imageGroup) {return tb_show(caption, url, imageGroup)}
function tb_show(caption, url, imageGroup) {//function called when the user clicks on a thickbox link
  try {
    if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
      jQuery("body","html").css({height: "100%", width: "100%"});
      jQuery("html").css("overflow","hidden");
      if (document.getElementById("TB_HideSelect") === null) {//iframe to hide select elements in ie6
        jQuery("body").append("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>");
        jQuery("#TB_overlay").click(tb_remove);
      }
    }else{//all others
      if(document.getElementById("TB_overlay") === null){
        jQuery("body").append("<div id='TB_overlay'></div><div id='TB_window'></div>");
        jQuery("#TB_overlay").click(tb_remove);
      }
    }
    
    if(tb_detectMacXFF()){
      jQuery("#TB_overlay").addClass("TB_overlayMacFFBGHack");//use png overlay so hide flash
    }else{
      jQuery("#TB_overlay").addClass("TB_overlayBG");//use background and opacity
    }
    
    if(caption===null){caption="";}
//    jQuery("body").append("<div id='TB_load'><img src='"+imgLoader.src+"' /></div>");//add loader to the page
//    jQuery('#TB_load').show();//show loader
    
    var baseURL;
     if(url.indexOf("?")!==-1){ //ff there is a query string involved
      baseURL = url.substr(0, url.indexOf("?"));
     }else{ 
         baseURL = url;
     }
     
     var urlString = /\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/;
     var urlType = baseURL.toLowerCase().match(urlString);
    if(urlType == '.jpg' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif' || urlType == '.bmp'){//code to show images
        
      TB_PrevCaption = "";
      TB_PrevURL = "";
      TB_PrevHTML = "";
      TB_NextCaption = "";
      TB_NextURL = "";
      TB_NextHTML = "";
      TB_imageCount = "";
      TB_FoundURL = false;
      if(imageGroup){
        TB_TempArray = jQuery("a[@rel="+imageGroup+"]").get();
        for (TB_Counter = 0; ((TB_Counter < TB_TempArray.length) && (TB_NextHTML === "")); TB_Counter++) {
          var urlTypeTemp = TB_TempArray[TB_Counter].href.toLowerCase().match(urlString);
            if (!(TB_TempArray[TB_Counter].href == url)) {            
              if (TB_FoundURL) {
                TB_NextCaption = TB_TempArray[TB_Counter].title;
                TB_NextURL = TB_TempArray[TB_Counter].href;
                TB_NextHTML = "<span id='TB_next'>&nbsp;&nbsp;<a href='#'>Next &gt;</a></span>";
              } else {
                TB_PrevCaption = TB_TempArray[TB_Counter].title;
                TB_PrevURL = TB_TempArray[TB_Counter].href;
                TB_PrevHTML = "<span id='TB_prev'>&nbsp;&nbsp;<a href='#'>&lt; Prev</a></span>";
              }
            } else {
              TB_FoundURL = true;
              TB_imageCount = "Image " + (TB_Counter + 1) +" of "+ (TB_TempArray.length);                      
            }
        }
      }
      imgPreloader = new Image();
      imgPreloader.onload = function(){    
      imgPreloader.onload = null;
        
      // Resizing large images - orginal by Christian Montoya edited by me.
      var pagesize = tb_getPageSize();
      var x = pagesize[0] - 150;
      var y = pagesize[1] - 150;
      var imageWidth = imgPreloader.width;
      var imageHeight = imgPreloader.height;
      if (imageWidth > x) {
        imageHeight = imageHeight * (x / imageWidth); 
        imageWidth = x; 
        if (imageHeight > y) { 
          imageWidth = imageWidth * (y / imageHeight); 
          imageHeight = y; 
        }
      } else if (imageHeight > y) { 
        imageWidth = imageWidth * (y / imageHeight); 
        imageHeight = y; 
        if (imageWidth > x) { 
          imageHeight = imageHeight * (x / imageWidth); 
          imageWidth = x;
        }
      }
      // End Resizing
      
      TB_WIDTH = imageWidth + 30;
      TB_HEIGHT = imageHeight + 60;
      jQuery("#TB_window").append("<a href='' id='TB_ImageOff' title='Close'><img id='TB_Image' src='"+url+"' width='"+imageWidth+"' height='"+imageHeight+"' alt='"+caption+"'/></a>" + "<div id='TB_caption'>"+caption+"<div id='TB_secondLine'>" + TB_imageCount + TB_PrevHTML + TB_NextHTML + "</div></div><div id='TB_closeWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a> or Esc Key</div>");     
      
      jQuery("#TB_closeWindowButton").click(tb_remove);
      
      if (!(TB_PrevHTML === "")) {
        function goPrev(){
          if(jQuery(document).unbind("click",goPrev)){jQuery(document).unbind("click",goPrev);}
          jQuery("#TB_window").remove();
          jQuery("body").append("<div id='TB_window'></div>");
          tb_show(TB_PrevCaption, TB_PrevURL, imageGroup);
          return false;  
        }
        jQuery("#TB_prev").click(goPrev);
      }
      
      if (!(TB_NextHTML === "")) {    
        function goNext(){
          jQuery("#TB_window").remove();
          jQuery("body").append("<div id='TB_window'></div>");
          tb_show(TB_NextCaption, TB_NextURL, imageGroup);        
          return false;  
        }
        jQuery("#TB_next").click(goNext);
        
      }
      document.onkeydown = function(e){   
        if (e == null) { // ie
          keycode = event.keyCode;
        } else { // mozilla
          keycode = e.which;
        }
        if(keycode == 27){ // close
          tb_remove();
        } else if(keycode == 190){ // display previous image
          if(!(TB_NextHTML == "")){
            document.onkeydown = "";
            goNext();
          }
        } else if(keycode == 188){ // display next image
          if(!(TB_PrevHTML == "")){
            document.onkeydown = "";
            goPrev();
          }
        }  
      };
      
      tb_position();
//      jQuery("#TB_load").remove();
      jQuery("#TB_ImageOff").click(tb_remove);
      jQuery("#TB_window").css({display:"block"}); //for safari using css instead of show
      };
      
      imgPreloader.src = url;
    }else{//code to show html
      
      var queryString = url.replace(/^[^\?]+\??/,'');
      var params = tb_parseQuery( queryString );
      TB_WIDTH = (params['width']*1) + 30 || 630; //defaults to 630 if no paramaters were added to URL
      TB_HEIGHT = (params['height']*1) + 40 || 440; //defaults to 440 if no paramaters were added to URL
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
//i made changes here
      TB_WIDTH = TB_WIDTH > jQuery(window).width() ? jQuery(window).window()- 20 : TB_WIDTH
      TB_HEIGHT = TB_HEIGHT > jQuery(window).height() ? jQuery(window).height() - 20 : TB_HEIGHT
      ajaxContentW = TB_WIDTH - 30;
      ajaxContentH = TB_HEIGHT - 45;
      
      if(url.indexOf('TB_iframe') != -1){// either iframe or ajax window    
          urlNoQuery = url.split('TB_');
          jQuery("#TB_iframeContent").remove();
          if(params['modal'] != "true"){//iframe no modal
            jQuery("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a> or Esc Key</div></div><iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;' > </iframe>");
          }else{//iframe modal
          jQuery("#TB_overlay").unbind();
            jQuery("#TB_window").append("<iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;'> </iframe>");
          }
      }else{// not an iframe, ajax
          if(jQuery("#TB_window").css("display") != "block"){
            if(params['modal'] != "true"){//ajax no modal
            jQuery("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'>close</a> or Esc Key</div></div><div id='TB_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px'></div>");
            }else{//ajax modal
            jQuery("#TB_overlay").unbind();
            jQuery("#TB_window").append("<div id='TB_ajaxContent' class='TB_modal' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px;'></div>");  
            }
          }else{//this means the window is already up, we are just loading new content via ajax
            jQuery("#TB_ajaxContent")[0].style.width = ajaxContentW +"px";
            jQuery("#TB_ajaxContent")[0].style.height = ajaxContentH +"px";
            jQuery("#TB_ajaxContent")[0].scrollTop = 0;
            jQuery("#TB_ajaxWindowTitle").html(caption);
          }
      }
          
      jQuery("#TB_closeWindowButton").click(tb_remove);
      
			try	{	tooltips();	}
			catch(e){};
        if(url.indexOf('TB_inline') != -1){  
          jQuery("#TB_ajaxContent").append(jQuery('#' + params['inlineId']).children());
          jQuery("#TB_window").unload(function () {
            jQuery('#' + params['inlineId']).append( jQuery("#TB_ajaxContent").children() ); // move elements back when you're finished
          });
          tb_position();
//          jQuery("#TB_load").remove();
          jQuery("#TB_window").css({display:"block"}); 
        TB_shown();
        }else if(url.indexOf('TB_iframe') != -1){
          tb_position();
          if(jQuery.browser.safari){//safari needs help because it will not fire iframe onload
//            jQuery("#TB_load").remove();
            jQuery("#TB_window").css({display:"block"});
          }
        }else{
          jQuery("#TB_ajaxContent").load(url += "&random=" + (new Date().getTime()),function(){//to do a post change this load method
            tb_position();
//            jQuery("#TB_load").remove();
            tb_init("#TB_ajaxContent a.thickbox");
            jQuery("#TB_window").css({display:"block"});
        TB_shown();
          });
        }  
      
    }
    if(!params['modal']){
      document.onkeyup = function(e){   
        if (e == null) { // ie
          keycode = event.keyCode;
        } else { // mozilla
          keycode = e.which;
        }
        if(keycode == 27){ // close
          tb_remove();
        }  
      };
    }
    
  } catch(e) {
    //nothing here
  }
}
//helper functions below
function tb_showIframe(){
//  jQuery("#TB_load").remove();
  jQuery("#TB_window").css({display:"block"});
}
  function TB_Removing(){}
  function TB_Removed(){}
  function TB_shown(){
    reinit_events();
  }
function TB_remove() {return tb_remove()}
function tb_remove() {
  
if (TB_Removing)
	TB_Removing();
   jQuery("#TB_imageOff").unbind("click");
  jQuery("#TB_closeWindowButton").unbind("click");
  jQuery("#TB_window").fadeOut("fast",function(){jQuery('#TB_window,#TB_overlay,#TB_HideSelect').trigger("unload").unbind().remove();});
//  jQuery("#TB_load").remove();
  if (typeof document.body.style.maxHeight == "undefined") {//if IE 6
    jQuery("body","html").css({height: "auto", width: "auto"});
    jQuery("html").css("overflow","");
  }
  document.onkeydown = "";
  document.onkeyup = "";
	if (typeof(TB_Removed) != undefined)
		TB_Removed();
  return false;
}
function tb_position() {
jQuery("#TB_window").css({marginLeft: '-' + parseInt((TB_WIDTH / 2),10) + 'px', width: TB_WIDTH + 'px'});
  if ( !(jQuery.browser.msie && jQuery.browser.version < 7)) { // take away IE6
    jQuery("#TB_window").css({marginTop: '-' + parseInt((TB_HEIGHT / 2),10) + 'px'});
  }
}
function tb_parseQuery ( query ) {
   var Params = {};
   if ( ! query ) {return Params;}// return empty object
   var Pairs = query.split(/[;&]/);
   for ( var i = 0; i < Pairs.length; i++ ) {
      var KeyVal = Pairs[i].split('=');
      if ( ! KeyVal || KeyVal.length != 2 ) {continue;}
      var key = unescape( KeyVal[0] );
      var val = unescape( KeyVal[1] );
      val = val.replace(/\+/g, ' ');
      Params[key] = val;
   }
   return Params;
}
function tb_getPageSize(){
  var de = document.documentElement;
  var w = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
  var h = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
  arrayPageSize = [w,h];
  return arrayPageSize;
}
function tb_detectMacXFF() {
  var userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox')!=-1) {
    return true;
  }
}


/*
 * Date prototype extensions. Doesn't depend on any
 * other code. Doens't overwrite existing methods.
 *
 * Adds dayNames, abbrDayNames, monthNames and abbrMonthNames static properties and isLeapYear,
 * isWeekend, isWeekDay, getDaysInMonth, getDayName, getMonthName, getDayOfYear, getWeekOfYear,
 * setDayOfYear, addYears, addMonths, addDays, addHours, addMinutes, addSeconds methods
 *
 * Copyright (c) 2006 Jörn Zaefferer and Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
 *
 * Additional methods and properties added by Kelvin Luck: firstDayOfWeek, dateFormat, zeroTime, asString, fromString -
 * I've added my name to these methods so you know who to blame if they are broken!
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * An Array of day names starting with Sunday.
 * 
 * @example dayNames[0]
 * @result 'Sunday'
 *
 * @name dayNames
 * @type Array
 * @cat Plugins/Methods/Date
 */
Date.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * An Array of abbreviated day names starting with Sun.
 * 
 * @example abbrDayNames[0]
 * @result 'Sun'
 *
 * @name abbrDayNames
 * @type Array
 * @cat Plugins/Methods/Date
 */
Date.abbrDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * An Array of month names starting with Janurary.
 * 
 * @example monthNames[0]
 * @result 'January'
 *
 * @name monthNames
 * @type Array
 * @cat Plugins/Methods/Date
 */
Date.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * An Array of abbreviated month names starting with Jan.
 * 
 * @example abbrMonthNames[0]
 * @result 'Jan'
 *
 * @name monthNames
 * @type Array
 * @cat Plugins/Methods/Date
 */
Date.abbrMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * The first day of the week for this locale.
 *
 * @name firstDayOfWeek
 * @type Number
 * @cat Plugins/Methods/Date
 * @author Kelvin Luck
 */
Date.firstDayOfWeek = 1;

/**
 * The format that string dates should be represented as (e.g. 'dd/mm/yyyy' for UK, 'mm/dd/yyyy' for US, 'yyyy-mm-dd' for Unicode etc).
 *
 * @name format
 * @type String
 * @cat Plugins/Methods/Date
 * @author Kelvin Luck
 */
Date.format = 'dd/mm/yyyy';
//Date.format = 'mm/dd/yyyy';
//Date.format = 'yyyy-mm-dd';
//Date.format = 'dd mmm yy';

/**
 * The first two numbers in the century to be used when decoding a two digit year. Since a two digit year is ambiguous (and date.setYear
 * only works with numbers < 99 and so doesn't allow you to set years after 2000) we need to use this to disambiguate the two digit year codes.
 *
 * @name format
 * @type String
 * @cat Plugins/Methods/Date
 * @author Kelvin Luck
 */
Date.fullYearStart = '20';

(function() {

	/**
	 * Adds a given method under the given name 
	 * to the Date prototype if it doesn't
	 * currently exist.
	 *
	 * @private
	 */
	function add(name, method) {
		if( !Date.prototype[name] ) {
			Date.prototype[name] = method;
		}
	};
	
	/**
	 * Checks if the year is a leap year.
	 *
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.isLeapYear();
	 * @result true
	 *
	 * @name isLeapYear
	 * @type Boolean
	 * @cat Plugins/Methods/Date
	 */
	add("isLeapYear", function() {
		var y = this.getFullYear();
		return (y%4==0 && y%100!=0) || y%400==0;
	});
	
	/**
	 * Checks if the day is a weekend day (Sat or Sun).
	 *
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.isWeekend();
	 * @result false
	 *
	 * @name isWeekend
	 * @type Boolean
	 * @cat Plugins/Methods/Date
	 */
	add("isWeekend", function() {
		return this.getDay()==0 || this.getDay()==6;
	});
	
	/**
	 * Check if the day is a day of the week (Mon-Fri)
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.isWeekDay();
	 * @result false
	 * 
	 * @name isWeekDay
	 * @type Boolean
	 * @cat Plugins/Methods/Date
	 */
	add("isWeekDay", function() {
		return !this.isWeekend();
	});
	
	/**
	 * Gets the number of days in the month.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getDaysInMonth();
	 * @result 31
	 * 
	 * @name getDaysInMonth
	 * @type Number
	 * @cat Plugins/Methods/Date
	 */
	add("getDaysInMonth", function() {
		return [31,(this.isLeapYear() ? 29:28),31,30,31,30,31,31,30,31,30,31][this.getMonth()];
	});
	
	/**
	 * Gets the name of the day.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getDayName();
	 * @result 'Saturday'
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getDayName(true);
	 * @result 'Sat'
	 * 
	 * @param abbreviated Boolean When set to true the name will be abbreviated.
	 * @name getDayName
	 * @type String
	 * @cat Plugins/Methods/Date
	 */
	add("getDayName", function(abbreviated) {
		return abbreviated ? Date.abbrDayNames[this.getDay()] : Date.dayNames[this.getDay()];
	});

	/**
	 * Gets the name of the month.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getMonthName();
	 * @result 'Janurary'
	 *
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getMonthName(true);
	 * @result 'Jan'
	 * 
	 * @param abbreviated Boolean When set to true the name will be abbreviated.
	 * @name getDayName
	 * @type String
	 * @cat Plugins/Methods/Date
	 */
	add("getMonthName", function(abbreviated) {
		return abbreviated ? Date.abbrMonthNames[this.getMonth()] : Date.monthNames[this.getMonth()];
	});

	/**
	 * Get the number of the day of the year.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getDayOfYear();
	 * @result 11
	 * 
	 * @name getDayOfYear
	 * @type Number
	 * @cat Plugins/Methods/Date
	 */
	add("getDayOfYear", function() {
		var tmpdtm = new Date("1/1/" + this.getFullYear());
		return Math.floor((this.getTime() - tmpdtm.getTime()) / 86400000);
	});
	
	/**
	 * Get the number of the week of the year.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getWeekOfYear();
	 * @result 2
	 * 
	 * @name getWeekOfYear
	 * @type Number
	 * @cat Plugins/Methods/Date
	 */
	add("getWeekOfYear", function() {
		return Math.ceil(this.getDayOfYear() / 7);
	});

	/**
	 * Set the day of the year.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.setDayOfYear(1);
	 * dtm.toString();
	 * @result 'Tue Jan 01 2008 00:00:00'
	 * 
	 * @name setDayOfYear
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("setDayOfYear", function(day) {
		this.setMonth(0);
		this.setDate(day);
		return this;
	});
	
	/**
	 * Add a number of years to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addYears(1);
	 * dtm.toString();
	 * @result 'Mon Jan 12 2009 00:00:00'
	 * 
	 * @name addYears
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addYears", function(num) {
		this.setFullYear(this.getFullYear() + num);
		return this;
	});
	
	/**
	 * Add a number of months to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addMonths(1);
	 * dtm.toString();
	 * @result 'Tue Feb 12 2008 00:00:00'
	 * 
	 * @name addMonths
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addMonths", function(num) {
		var tmpdtm = this.getDate();
		
		this.setMonth(this.getMonth() + num);
		
		if (tmpdtm > this.getDate())
			this.addDays(-this.getDate());
		
		return this;
	});
	
	/**
	 * Add a number of days to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addDays(1);
	 * dtm.toString();
	 * @result 'Sun Jan 13 2008 00:00:00'
	 * 
	 * @name addDays
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addDays", function(num) {
		this.setDate(this.getDate() + num);
		return this;
	});
	
	/**
	 * Add a number of hours to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addHours(24);
	 * dtm.toString();
	 * @result 'Sun Jan 13 2008 00:00:00'
	 * 
	 * @name addHours
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addHours", function(num) {
		this.setHours(this.getHours() + num);
		return this;
	});

	/**
	 * Add a number of minutes to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addMinutes(60);
	 * dtm.toString();
	 * @result 'Sat Jan 12 2008 01:00:00'
	 * 
	 * @name addMinutes
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addMinutes", function(num) {
		this.setMinutes(this.getMinutes() + num);
		return this;
	});
	
	/**
	 * Add a number of seconds to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addSeconds(60);
	 * dtm.toString();
	 * @result 'Sat Jan 12 2008 00:01:00'
	 * 
	 * @name addSeconds
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addSeconds", function(num) {
		this.setSeconds(this.getSeconds() + num);
		return this;
	});
	
	/**
	 * Sets the time component of this Date to zero for cleaner, easier comparison of dates where time is not relevant.
	 * 
	 * @example var dtm = new Date();
	 * dtm.zeroTime();
	 * dtm.toString();
	 * @result 'Sat Jan 12 2008 00:01:00'
	 * 
	 * @name zeroTime
	 * @type Date
	 * @cat Plugins/Methods/Date
	 * @author Kelvin Luck
	 */
	add("zeroTime", function() {
		this.setMilliseconds(0);
		this.setSeconds(0);
		this.setMinutes(0);
		this.setHours(0);
		return this;
	});
	
	/**
	 * Returns a string representation of the date object according to Date.format.
	 * (Date.toString may be used in other places so I purposefully didn't overwrite it)
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.asString();
	 * @result '12/01/2008' // (where Date.format == 'dd/mm/yyyy'
	 * 
	 * @name asString
	 * @type Date
	 * @cat Plugins/Methods/Date
	 * @author Kelvin Luck
	 */
	add("asString", function() {
		var r = Date.format;
		return r
			.split('yyyy').join(this.getFullYear())
			.split('yy').join((this.getFullYear() + '').substring(2))
			.split('mmm').join(this.getMonthName(true))
			.split('mm').join(_zeroPad(this.getMonth()+1))
			.split('dd').join(_zeroPad(this.getDate()));
	});
	
	/**
	 * Returns a new date object created from the passed String according to Date.format or false if the attempt to do this results in an invalid date object
	 * (We can't simple use Date.parse as it's not aware of locale and I chose not to overwrite it incase it's functionality is being relied on elsewhere)
	 *
	 * @example var dtm = Date.fromString("12/01/2008");
	 * dtm.toString();
	 * @result 'Sat Jan 12 2008 00:00:00' // (where Date.format == 'dd/mm/yyyy'
	 * 
	 * @name fromString
	 * @type Date
	 * @cat Plugins/Methods/Date
	 * @author Kelvin Luck
	 */
	Date.fromString = function(s)
	{
		var f = Date.format;
		var d = new Date('01/01/1977');
		var iY = f.indexOf('yyyy');
		if (iY > -1) {
			d.setFullYear(Number(s.substr(iY, 4)));
		} else {
			// TODO - this doesn't work very well - are there any rules for what is meant by a two digit year?
			d.setFullYear(Number(Date.fullYearStart + s.substr(f.indexOf('yy'), 2)));
		}
		var iM = f.indexOf('mmm');
		if (iM > -1) {
			var mStr = s.substr(iM, 3);
			for (var i=0; i<Date.abbrMonthNames.length; i++) {
				if (Date.abbrMonthNames[i] == mStr) break;
			}
			d.setMonth(i);
		} else {
			d.setMonth(Number(s.substr(f.indexOf('mm'), 2)) - 1);
		}
		d.setDate(Number(s.substr(f.indexOf('dd'), 2)));
		if (isNaN(d.getTime())) {
			return false;
		}
		return d;
	};
	
	// utility method
	var _zeroPad = function(num) {
		var s = '0'+num;
		return s.substring(s.length-2)
		//return ('0'+num).substring(-2); // doesn't work on IE :(
	};
	
})();

/**
 * Copyright (c) 2008 Kelvin Luck (http://www.kelvinluck.com/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * $Id: jquery.datePicker.js 21 2009-01-11 19:45:13Z kelvin.luck $
 **/

(function($){
    
	$.fn.extend({
/**
 * Render a calendar table into any matched elements.
 * 
 * @param Object s (optional) Customize your calendars.
 * @option Number month The month to render (NOTE that months are zero based). Default is today's month.
 * @option Number year The year to render. Default is today's year.
 * @option Function renderCallback A reference to a function that is called as each cell is rendered and which can add classes and event listeners to the created nodes. Default is no callback.
 * @option Number showHeader Whether or not to show the header row, possible values are: $.dpConst.SHOW_HEADER_NONE (no header), $.dpConst.SHOW_HEADER_SHORT (first letter of each day) and $.dpConst.SHOW_HEADER_LONG (full name of each day). Default is $.dpConst.SHOW_HEADER_SHORT.
 * @option String hoverClass The class to attach to each cell when you hover over it (to allow you to use hover effects in IE6 which doesn't support the :hover pseudo-class on elements other than links). Default is dp-hover. Pass false if you don't want a hover class.
 * @type jQuery
 * @name renderCalendar
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('#calendar-me').renderCalendar({month:0, year:2007});
 * @desc Renders a calendar displaying January 2007 into the element with an id of calendar-me.
 *
 * @example
 * var testCallback = function($td, thisDate, month, year)
 * {
 * if ($td.is('.current-month') && thisDate.getDay() == 4) {
 *		var d = thisDate.getDate();
 *		$td.bind(
 *			'click',
 *			function()
 *			{
 *				alert('You clicked on ' + d + '/' + (Number(month)+1) + '/' + year);
 *			}
 *		).addClass('thursday');
 *	} else if (thisDate.getDay() == 5) {
 *		$td.html('Friday the ' + $td.html() + 'th');
 *	}
 * }
 * $('#calendar-me').renderCalendar({month:0, year:2007, renderCallback:testCallback});
 * 
 * @desc Renders a calendar displaying January 2007 into the element with an id of calendar-me. Every Thursday in the current month has a class of "thursday" applied to it, is clickable and shows an alert when clicked. Every Friday on the calendar has the number inside replaced with text.
 **/
		renderCalendar  :   function(s)
		{
			var dc = function(a)
			{
				return document.createElement(a);
			};

			s = $.extend({}, $.fn.datePicker.defaults, s);
			
			if (s.showHeader != $.dpConst.SHOW_HEADER_NONE) {
				var headRow = $(dc('tr'));
				for (var i=Date.firstDayOfWeek; i<Date.firstDayOfWeek+7; i++) {
					var weekday = i%7;
					var day = Date.dayNames[weekday];
					headRow.append(
						jQuery(dc('th')).attr({'scope':'col', 'abbr':day, 'title':day, 'class':(weekday == 0 || weekday == 6 ? 'weekend' : 'weekday')}).html(s.showHeader == $.dpConst.SHOW_HEADER_SHORT ? day.substr(0, 1) : day)
					);
				}
			};
			
			var calendarTable = $(dc('table'))
									.attr(
										{
											'cellspacing':2,
											'className':'jCalendar'
										}
									)
									.append(
										(s.showHeader != $.dpConst.SHOW_HEADER_NONE ? 
											$(dc('thead'))
												.append(headRow)
											:
											dc('thead')
										)
									);
			var tbody = $(dc('tbody'));
			
			var today = (new Date()).zeroTime();
			
			var month = s.month == undefined ? today.getMonth() : s.month;
			var year = s.year || today.getFullYear();
			
			var currentDate = new Date(year, month, 1);
			
			
			var firstDayOffset = Date.firstDayOfWeek - currentDate.getDay() + 1;
			if (firstDayOffset > 1) firstDayOffset -= 7;
			var weeksToDraw = Math.ceil(( (-1*firstDayOffset+1) + currentDate.getDaysInMonth() ) /7);
			currentDate.addDays(firstDayOffset-1);
			
			var doHover = function()
			{
				if (s.hoverClass) {
					$(this).addClass(s.hoverClass);
				}
			};
			var unHover = function()
			{
				if (s.hoverClass) {
					$(this).removeClass(s.hoverClass);
				}
			};	
			
			var w = 0;
			while (w++<weeksToDraw) {
				var r = jQuery(dc('tr'));
				for (var i=0; i<7; i++) {
					var thisMonth = currentDate.getMonth() == month;
					var d = $(dc('td'))
								.text(currentDate.getDate() + '')
								.attr('className', (thisMonth ? 'current-month ' : 'other-month ') +
													(currentDate.isWeekend() ? 'weekend ' : 'weekday ') +
													(thisMonth && currentDate.getTime() == today.getTime() ? 'today ' : '')
								)
								.hover(doHover, unHover)
							;
					if (s.renderCallback) {
						s.renderCallback(d, currentDate, month, year);
					}
					r.append(d);
					currentDate.addDays(1);
				}
				tbody.append(r);
			}
			calendarTable.append(tbody);
			
			return this.each(
				function()
				{
					$(this).empty().append(calendarTable);
				}
			);
		},
/**
 * Create a datePicker associated with each of the matched elements.
 *
 * The matched element will receive a few custom events with the following signatures:
 *
 * dateSelected(event, date, $td, status)
 * Triggered when a date is selected. event is a reference to the event, date is the Date selected, $td is a jquery object wrapped around the TD that was clicked on and status is whether the date was selected (true) or deselected (false)
 * 
 * dpClosed(event, selected)
 * Triggered when the date picker is closed. event is a reference to the event and selected is an Array containing Date objects.
 *
 * dpMonthChanged(event, displayedMonth, displayedYear)
 * Triggered when the month of the popped up calendar is changed. event is a reference to the event, displayedMonth is the number of the month now displayed (zero based) and displayedYear is the year of the month.
 *
 * dpDisplayed(event, $datePickerDiv)
 * Triggered when the date picker is created. $datePickerDiv is the div containing the date picker. Use this event to add custom content/ listeners to the popped up date picker.
 *
 * @param Object s (optional) Customize your date pickers.
 * @option Number month The month to render when the date picker is opened (NOTE that months are zero based). Default is today's month.
 * @option Number year The year to render when the date picker is opened. Default is today's year.
 * @option String startDate The first date date can be selected.
 * @option String endDate The last date that can be selected.
 * @option Boolean inline Whether to create the datePicker as inline (e.g. always on the page) or as a model popup. Default is false (== modal popup)
 * @option Boolean createButton Whether to create a .dp-choose-date anchor directly after the matched element which when clicked will trigger the showing of the date picker. Default is true.
 * @option Boolean showYearNavigation Whether to display buttons which allow the user to navigate through the months a year at a time. Default is true.
 * @option Boolean closeOnSelect Whether to close the date picker when a date is selected. Default is true.
 * @option Boolean displayClose Whether to create a "Close" button within the date picker popup. Default is false.
 * @option Boolean selectMultiple Whether a user should be able to select multiple dates with this date picker. Default is false.
 * @option Boolean clickInput If the matched element is an input type="text" and this option is true then clicking on the input will cause the date picker to appear.
 * @option Boolean rememberViewedMonth Whether the datePicker should remember the last viewed month and open on it. If false then the date picker will always open with the month for the first selected date visible.
 * @option Number verticalPosition The vertical alignment of the popped up date picker to the matched element. One of $.dpConst.POS_TOP and $.dpConst.POS_BOTTOM. Default is $.dpConst.POS_TOP.
 * @option Number horizontalPosition The horizontal alignment of the popped up date picker to the matched element. One of $.dpConst.POS_LEFT and $.dpConst.POS_RIGHT.
 * @option Number verticalOffset The number of pixels offset from the defined verticalPosition of this date picker that it should pop up in. Default in 0.
 * @option Number horizontalOffset The number of pixels offset from the defined horizontalPosition of this date picker that it should pop up in. Default in 0.
 * @option (Function|Array) renderCallback A reference to a function (or an array of seperate functions) that is called as each cell is rendered and which can add classes and event listeners to the created nodes. Each callback function will receive four arguments; a jquery object wrapping the created TD, a Date object containing the date this TD represents, a number giving the currently rendered month and a number giving the currently rendered year. Default is no callback.
 * @option String hoverClass The class to attach to each cell when you hover over it (to allow you to use hover effects in IE6 which doesn't support the :hover pseudo-class on elements other than links). Default is dp-hover. Pass false if you don't want a hover class.
 * @type jQuery
 * @name datePicker
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('input.date-picker').datePicker();
 * @desc Creates a date picker button next to all matched input elements. When the button is clicked on the value of the selected date will be placed in the corresponding input (formatted according to Date.format).
 *
 * @example demo/index.html
 * @desc See the projects homepage for many more complex examples...
 **/
		datePicker : function(s)
		{			
			if (!$.event._dpCache) $.event._dpCache = [];
			
			// initialise the date picker controller with the relevant settings...
			s = $.extend({}, $.fn.datePicker.defaults, s);
			
			return this.each(
				function()
				{
					var $this = $(this);
					var alreadyExists = true;
					
					if (!this._dpId) {
						this._dpId = $.event.guid++;
						$.event._dpCache[this._dpId] = new DatePicker(this);
						alreadyExists = false;
					}
					
					if (s.inline) {
						s.createButton = false;
						s.displayClose = false;
						s.closeOnSelect = false;
						$this.empty();
					}
					
					var controller = $.event._dpCache[this._dpId];
					
					controller.init(s);
					
					if (!alreadyExists && s.createButton) {
						// create it!
						controller.button = $('<a href="#" class="dp-choose-date" title="' + $.dpText.TEXT_CHOOSE_DATE + '">' + $.dpText.TEXT_CHOOSE_DATE + '</a>')
								.bind(
									'click',
									function()
									{
										$this.dpDisplay(this);
										this.blur();
										return false;
									}
								);
						$this.after(controller.button);
					}
					
					if (!alreadyExists && $this.is(':text')) {
						$this
							.bind(
								'dateSelected',
								function(e, selectedDate, $td)
								{
									this.value = selectedDate.asString();
								}
							).bind(
								'change',
								function()
								{
									if (this.value != '') {
										var d = Date.fromString(this.value);
										if (d) {
											controller.setSelected(d, true, true);
										}
									}
								}
							);
						if (s.clickInput) {
							$this.bind(
								'click',
								function()
								{
									$this.dpDisplay();
								}
							);
						}
						var d = Date.fromString(this.value);
						if (this.value != '' && d) {
							controller.setSelected(d, true, true);
						}
					}
					
					$this.addClass('dp-applied');
					
				}
			)
		},
/**
 * Disables or enables this date picker
 *
 * @param Boolean s Whether to disable (true) or enable (false) this datePicker
 * @type jQuery
 * @name dpSetDisabled
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * $('.date-picker').dpSetDisabled(true);
 * @desc Prevents this date picker from displaying and adds a class of dp-disabled to it (and it's associated button if it has one) for styling purposes. If the matched element is an input field then it will also set the disabled attribute to stop people directly editing the field.
 **/
		dpSetDisabled : function(s)
		{
			return _w.call(this, 'setDisabled', s);
		},
/**
 * Updates the first selectable date for any date pickers on any matched elements.
 *
 * @param String d A string representing the first selectable date (formatted according to Date.format).
 * @type jQuery
 * @name dpSetStartDate
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * $('.date-picker').dpSetStartDate('01/01/2000');
 * @desc Creates a date picker associated with all elements with a class of "date-picker" then sets the first selectable date for each of these to the first day of the millenium.
 **/
		dpSetStartDate : function(d)
		{
			return _w.call(this, 'setStartDate', d);
		},
/**
 * Updates the last selectable date for any date pickers on any matched elements.
 *
 * @param String d A string representing the last selectable date (formatted according to Date.format).
 * @type jQuery
 * @name dpSetEndDate
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * $('.date-picker').dpSetEndDate('01/01/2010');
 * @desc Creates a date picker associated with all elements with a class of "date-picker" then sets the last selectable date for each of these to the first Janurary 2010.
 **/
		dpSetEndDate : function(d)
		{
			return _w.call(this, 'setEndDate', d);
		},
/**
 * Gets a list of Dates currently selected by this datePicker. This will be an empty array if no dates are currently selected or NULL if there is no datePicker associated with the matched element.
 *
 * @type Array
 * @name dpGetSelected
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * alert($('.date-picker').dpGetSelected());
 * @desc Will alert an empty array (as nothing is selected yet)
 **/
		dpGetSelected : function()
		{
			var c = _getController(this[0]);
			if (c) {
				return c.getSelected();
			}
			return null;
		},
/**
 * Selects or deselects a date on any matched element's date pickers. Deselcting is only useful on date pickers where selectMultiple==true. Selecting will only work if the passed date is within the startDate and endDate boundries for a given date picker.
 *
 * @param String d A string representing the date you want to select (formatted according to Date.format).
 * @param Boolean v Whether you want to select (true) or deselect (false) this date. Optional - default = true.
 * @param Boolean m Whether you want the date picker to open up on the month of this date when it is next opened. Optional - default = true.
 * @type jQuery
 * @name dpSetSelected
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * $('.date-picker').dpSetSelected('01/01/2010');
 * @desc Creates a date picker associated with all elements with a class of "date-picker" then sets the selected date on these date pickers to the first Janurary 2010. When the date picker is next opened it will display Janurary 2010.
 **/
		dpSetSelected : function(d, v, m)
		{
			if (v == undefined) v=true;
			if (m == undefined) m=true;
			return _w.call(this, 'setSelected', Date.fromString(d), v, m, true);
		},
/**
 * Sets the month that will be displayed when the date picker is next opened. If the passed month is before startDate then the month containing startDate will be displayed instead. If the passed month is after endDate then the month containing the endDate will be displayed instead.
 *
 * @param Number m The month you want the date picker to display. Optional - defaults to the currently displayed month.
 * @param Number y The year you want the date picker to display. Optional - defaults to the currently displayed year.
 * @type jQuery
 * @name dpSetDisplayedMonth
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * $('.date-picker').dpSetDisplayedMonth(10, 2008);
 * @desc Creates a date picker associated with all elements with a class of "date-picker" then sets the selected date on these date pickers to the first Janurary 2010. When the date picker is next opened it will display Janurary 2010.
 **/
		dpSetDisplayedMonth : function(m, y)
		{
			return _w.call(this, 'setDisplayedMonth', Number(m), Number(y), true);
		},
/**
 * Displays the date picker associated with the matched elements. Since only one date picker can be displayed at once then the date picker associated with the last matched element will be the one that is displayed.
 *
 * @param HTMLElement e An element that you want the date picker to pop up relative in position to. Optional - default behaviour is to pop up next to the element associated with this date picker.
 * @type jQuery
 * @name dpDisplay
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('#date-picker').datePicker();
 * $('#date-picker').dpDisplay();
 * @desc Creates a date picker associated with the element with an id of date-picker and then causes it to pop up.
 **/
		dpDisplay : function(e)
		{
			return _w.call(this, 'display', e);
		},
/**
 * Sets a function or array of functions that is called when each TD of the date picker popup is rendered to the page
 *
 * @param (Function|Array) a A function or an array of functions that are called when each td is rendered. Each function will receive four arguments; a jquery object wrapping the created TD, a Date object containing the date this TD represents, a number giving the currently rendered month and a number giving the currently rendered year.
 * @type jQuery
 * @name dpSetRenderCallback
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('#date-picker').datePicker();
 * $('#date-picker').dpSetRenderCallback(function($td, thisDate, month, year)
 * {
 * 	// do stuff as each td is rendered dependant on the date in the td and the displayed month and year
 * });
 * @desc Creates a date picker associated with the element with an id of date-picker and then creates a function which is called as each td is rendered when this date picker is displayed.
 **/
		dpSetRenderCallback : function(a)
		{
			return _w.call(this, 'setRenderCallback', a);
		},
/**
 * Sets the position that the datePicker will pop up (relative to it's associated element)
 *
 * @param Number v The vertical alignment of the created date picker to it's associated element. Possible values are $.dpConst.POS_TOP and $.dpConst.POS_BOTTOM
 * @param Number h The horizontal alignment of the created date picker to it's associated element. Possible values are $.dpConst.POS_LEFT and $.dpConst.POS_RIGHT
 * @type jQuery
 * @name dpSetPosition
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('#date-picker').datePicker();
 * $('#date-picker').dpSetPosition($.dpConst.POS_BOTTOM, $.dpConst.POS_RIGHT);
 * @desc Creates a date picker associated with the element with an id of date-picker and makes it so that when this date picker pops up it will be bottom and right aligned to the #date-picker element.
 **/
		dpSetPosition : function(v, h)
		{
			return _w.call(this, 'setPosition', v, h);
		},
/**
 * Sets the offset that the popped up date picker will have from it's default position relative to it's associated element (as set by dpSetPosition)
 *
 * @param Number v The vertical offset of the created date picker.
 * @param Number h The horizontal offset of the created date picker.
 * @type jQuery
 * @name dpSetOffset
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('#date-picker').datePicker();
 * $('#date-picker').dpSetOffset(-20, 200);
 * @desc Creates a date picker associated with the element with an id of date-picker and makes it so that when this date picker pops up it will be 20 pixels above and 200 pixels to the right of it's default position.
 **/
		dpSetOffset : function(v, h)
		{
			return _w.call(this, 'setOffset', v, h);
		},
/**
 * Closes the open date picker associated with this element.
 *
 * @type jQuery
 * @name dpClose
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-pick')
 *		.datePicker()
 *		.bind(
 *			'focus',
 *			function()
 *			{
 *				$(this).dpDisplay();
 *			}
 *		).bind(
 *			'blur',
 *			function()
 *			{
 *				$(this).dpClose();
 *			}
 *		);
 * @desc Creates a date picker and makes it appear when the relevant element is focused and disappear when it is blurred.
 **/
		dpClose : function()
		{
			return _w.call(this, '_closeCalendar', false, this[0]);
		},
		// private function called on unload to clean up any expandos etc and prevent memory links...
		_dpDestroy : function()
		{
			// TODO - implement this?
		}
	});
	
	// private internal function to cut down on the amount of code needed where we forward
	// dp* methods on the jQuery object on to the relevant DatePicker controllers...
	var _w = function(f, a1, a2, a3, a4)
	{
		return this.each(
			function()
			{
				var c = _getController(this);
				if (c) {
					c[f](a1, a2, a3, a4);
				}
			}
		);
	};
	
	function DatePicker(ele)
	{
		this.ele = ele;
		
		// initial values...
		this.displayedMonth		=	null;
		this.displayedYear		=	null;
		this.startDate			=	null;
		this.endDate			=	null;
		this.showYearNavigation	=	null;
		this.closeOnSelect		=	null;
		this.displayClose		=	null;
		this.rememberViewedMonth=	null;
		this.selectMultiple		=	null;
		this.verticalPosition	=	null;
		this.horizontalPosition	=	null;
		this.verticalOffset		=	null;
		this.horizontalOffset	=	null;
		this.button				=	null;
		this.renderCallback		=	[];
		this.selectedDates		=	{};
		this.inline				=	null;
		this.context			=	'#dp-popup';
	};
	$.extend(
		DatePicker.prototype,
		{	
			init : function(s)
			{
				this.setStartDate(s.startDate);
				this.setEndDate(s.endDate);
				this.setDisplayedMonth(Number(s.month), Number(s.year));
				this.setRenderCallback(s.renderCallback);
				this.showYearNavigation = s.showYearNavigation;
				this.closeOnSelect = s.closeOnSelect;
				this.displayClose = s.displayClose;
				this.rememberViewedMonth =	s.rememberViewedMonth;
				this.selectMultiple = s.selectMultiple;
				this.verticalPosition = s.verticalPosition;
				this.horizontalPosition = s.horizontalPosition;
				this.hoverClass = s.hoverClass;
				this.setOffset(s.verticalOffset, s.horizontalOffset);
				this.inline = s.inline;
				if (this.inline) {
					this.context = this.ele;
					this.display();
				}
			},
			setStartDate : function(d)
			{
				if (d) {
					this.startDate = Date.fromString(d);
				}
				if (!this.startDate) {
					this.startDate = (new Date()).zeroTime();
				}
				this.setDisplayedMonth(this.displayedMonth, this.displayedYear);
			},
			setEndDate : function(d)
			{
				if (d) {
					this.endDate = Date.fromString(d);
				}
				if (!this.endDate) {
					this.endDate = (new Date('12/31/2999')); // using the JS Date.parse function which expects mm/dd/yyyy
				}
				if (this.endDate.getTime() < this.startDate.getTime()) {
					this.endDate = this.startDate;
				}
				this.setDisplayedMonth(this.displayedMonth, this.displayedYear);
			},
			setPosition : function(v, h)
			{
				this.verticalPosition = v;
				this.horizontalPosition = h;
			},
			setOffset : function(v, h)
			{
				this.verticalOffset = parseInt(v) || 0;
				this.horizontalOffset = parseInt(h) || 0;
			},
			setDisabled : function(s)
			{
				$e = $(this.ele);
				$e[s ? 'addClass' : 'removeClass']('dp-disabled');
				if (this.button) {
					$but = $(this.button);
					$but[s ? 'addClass' : 'removeClass']('dp-disabled');
					$but.attr('title', s ? '' : $.dpText.TEXT_CHOOSE_DATE);
				}
				if ($e.is(':text')) {
					$e.attr('disabled', s ? 'disabled' : '');
				}
			},
			setDisplayedMonth : function(m, y, rerender)
			{
				if (this.startDate == undefined || this.endDate == undefined) {
					return;
				}
				var s = new Date(this.startDate.getTime());
				s.setDate(1);
				var e = new Date(this.endDate.getTime());
				e.setDate(1);
				
				var t;
				if ((!m && !y) || (isNaN(m) && isNaN(y))) {
					// no month or year passed - default to current month
					t = new Date().zeroTime();
					t.setDate(1);
				} else if (isNaN(m)) {
					// just year passed in - presume we want the displayedMonth
					t = new Date(y, this.displayedMonth, 1);
				} else if (isNaN(y)) {
					// just month passed in - presume we want the displayedYear
					t = new Date(this.displayedYear, m, 1);
				} else {
					// year and month passed in - that's the date we want!
					t = new Date(y, m, 1)
				}
				// check if the desired date is within the range of our defined startDate and endDate
				if (t.getTime() < s.getTime()) {
					t = s;
				} else if (t.getTime() > e.getTime()) {
					t = e;
				}
				var oldMonth = this.displayedMonth;
				var oldYear = this.displayedYear;
				this.displayedMonth = t.getMonth();
				this.displayedYear = t.getFullYear();

				if (rerender && (this.displayedMonth != oldMonth || this.displayedYear != oldYear))
				{
					this._rerenderCalendar();
					$(this.ele).trigger('dpMonthChanged', [this.displayedMonth, this.displayedYear]);
				}
			},
			setSelected : function(d, v, moveToMonth, dispatchEvents)
			{
				if (v == this.isSelected(d)) // this date is already un/selected
				{
					return;
				}
				if (this.selectMultiple == false) {
					this.selectedDates = {};
					$('td.selected', this.context).removeClass('selected');
				}
				if (moveToMonth && (this.displayedMonth != d.getMonth() || this.displayedYear != d.getFullYear())) {
					this.setDisplayedMonth(d.getMonth(), d.getFullYear(), true);
				}
				this.selectedDates[d.toString()] = v;
				
				var selectorString = 'td.';
				selectorString += d.getMonth() == this.displayedMonth ? 'current-month' : 'other-month';
				selectorString += ':contains("' + d.getDate() + '")';
				var $td;
				$(selectorString, this.ele).each(
					function()
					{
						if ($(this).text() == d.getDate())
						{
							$td = $(this);
							$td[v ? 'addClass' : 'removeClass']('selected');
						}
					}
				);
				
				if (dispatchEvents)
				{
					var s = this.isSelected(d);
					$e = $(this.ele);
					var dClone = Date.fromString(d.asString());
					$e.trigger('dateSelected', [dClone, $td, s]);
					$e.trigger('change');
				}
			},
			isSelected : function(d)
			{
				return this.selectedDates[d.toString()];
			},
			getSelected : function()
			{
				var r = [];
				for(s in this.selectedDates) {
					if (this.selectedDates[s] == true) {
						r.push(Date.parse(s));
					}
				}
				return r;
			},
			display : function(eleAlignTo)
			{
				if ($(this.ele).is('.dp-disabled')) return;
				
				eleAlignTo = eleAlignTo || this.ele;
				var c = this;
				var $ele = $(eleAlignTo);
				var eleOffset = $ele.offset();
				
				var $createIn;
				var attrs;
				var attrsCalendarHolder;
				var cssRules;
				
				if (c.inline) {
					$createIn = $(this.ele);
					attrs = {
						'id'		:	'calendar-' + this.ele._dpId,
						'className'	:	'dp-popup dp-popup-inline'
					};
					cssRules = {
					};
				} else {
					$createIn = $('body');
					attrs = {
						'id'		:	'dp-popup',
						'className'	:	'dp-popup'
					};
					cssRules = {
						'top'	:	eleOffset.top + c.verticalOffset,
						'left'	:	eleOffset.left + c.horizontalOffset
					};
					
					var _checkMouse = function(e)
					{
						var el = e.target;
						var cal = $('#dp-popup')[0];
						
						while (true){
							if (el == cal) {
								return true;
							} else if (el == document) {
								c._closeCalendar();
								return false;
							} else {
								el = $(el).parent()[0];
							}
						}
					};
					this._checkMouse = _checkMouse;
				
					this._closeCalendar(true);
				}
				
				if (!c.rememberViewedMonth)
				{
					var selectedDate = this.getSelected()[0];
					if (selectedDate) {
						selectedDate = new Date(selectedDate);
						this.setDisplayedMonth(selectedDate.getMonth(), selectedDate.getFullYear(), false);
					}
				}
				
				$createIn
					.append(
						$('<div></div>')
							.attr(attrs)
							.css(cssRules)
							.append(
								$('<h2></h2>'),
								$('<div class="dp-nav-prev"></div>')
									.append(
										$('<a class="dp-nav-prev-year" href="#" title="' + $.dpText.TEXT_PREV_YEAR + '">&lt;&lt;</a>')
											.bind(
												'click',
												function()
												{
													return c._displayNewMonth.call(c, this, 0, -1);
												}
											),
										$('<a class="dp-nav-prev-month" href="#" title="' + $.dpText.TEXT_PREV_MONTH + '">&lt;</a>')
											.bind(
												'click',
												function()
												{
													return c._displayNewMonth.call(c, this, -1, 0);
												}
											)
									),
								$('<div class="dp-nav-next"></div>')
									.append(
										$('<a class="dp-nav-next-year" href="#" title="' + $.dpText.TEXT_NEXT_YEAR + '">&gt;&gt;</a>')
											.bind(
												'click',
												function()
												{
													return c._displayNewMonth.call(c, this, 0, 1);
												}
											),
										$('<a class="dp-nav-next-month" href="#" title="' + $.dpText.TEXT_NEXT_MONTH + '">&gt;</a>')
											.bind(
												'click',
												function()
												{
													return c._displayNewMonth.call(c, this, 1, 0);
												}
											)
									),
								$('<div></div>')
									.attr('className', 'dp-calendar')
							)
							.bgIframe()
						);
					
				var $pop = this.inline ? $('.dp-popup', this.context) : $('#dp-popup');
				
				if (this.showYearNavigation == false) {
					$('.dp-nav-prev-year, .dp-nav-next-year', c.context).css('display', 'none');
				}
				if (this.displayClose) {
					$pop.append(
						$('<a href="#" id="dp-close">' + $.dpText.TEXT_CLOSE + '</a>')
							.bind(
								'click',
								function()
								{
									c._closeCalendar();
									return false;
								}
							)
					);
				}
				c._renderCalendar();
				
				$(this.ele).trigger('dpDisplayed', $pop);
				
				if (!c.inline) {
					if (this.verticalPosition == $.dpConst.POS_BOTTOM) {
						$pop.css('top', eleOffset.top + $ele.height() - $pop.height() + c.verticalOffset);
					}
					if (this.horizontalPosition == $.dpConst.POS_RIGHT) {
						$pop.css('left', eleOffset.left + $ele.width() - $pop.width() + c.horizontalOffset);
					}
					$(document).bind('mousedown', this._checkMouse);
				}
			},
			setRenderCallback : function(a)
			{
				if (a == null) return;
				if (a && typeof(a) == 'function') {
					a = [a];
				}
				this.renderCallback = this.renderCallback.concat(a);
			},
			cellRender : function ($td, thisDate, month, year) {
				var c = this.dpController;
				var d = new Date(thisDate.getTime());
				
				// add our click handlers to deal with it when the days are clicked...
				
				$td.bind(
					'click',
					function()
					{
						var $this = $(this);
						if (!$this.is('.disabled')) {
							c.setSelected(d, !$this.is('.selected') || !c.selectMultiple, false, true);
							if (c.closeOnSelect) {
								c._closeCalendar();
							}
						}
					}
				);
				
				if (c.isSelected(d)) {
					$td.addClass('selected');
				}
				
				// call any extra renderCallbacks that were passed in
				for (var i=0; i<c.renderCallback.length; i++) {
					c.renderCallback[i].apply(this, arguments);
				}
				
				
			},
			// ele is the clicked button - only proceed if it doesn't have the class disabled...
			// m and y are -1, 0 or 1 depending which direction we want to go in...
			_displayNewMonth : function(ele, m, y) 
			{
				if (!$(ele).is('.disabled')) {
					this.setDisplayedMonth(this.displayedMonth + m, this.displayedYear + y, true);
				}
				ele.blur();
				return false;
			},
			_rerenderCalendar : function()
			{
				this._clearCalendar();
				this._renderCalendar();
			},
			_renderCalendar : function()
			{
				// set the title...
				$('h2', this.context).html(Date.monthNames[this.displayedMonth] + ' ' + this.displayedYear);
				
				// render the calendar...
				$('.dp-calendar', this.context).renderCalendar(
					{
						month			: this.displayedMonth,
						year			: this.displayedYear,
						renderCallback	: this.cellRender,
						dpController	: this,
						hoverClass		: this.hoverClass
					}
				);
				
				// update the status of the control buttons and disable dates before startDate or after endDate...
				// TODO: When should the year buttons be disabled? When you can't go forward a whole year from where you are or is that annoying?
				if (this.displayedYear == this.startDate.getFullYear() && this.displayedMonth == this.startDate.getMonth()) {
					$('.dp-nav-prev-year', this.context).addClass('disabled');
					$('.dp-nav-prev-month', this.context).addClass('disabled');
					$('.dp-calendar td.other-month', this.context).each(
						function()
						{
							var $this = $(this);
							if (Number($this.text()) > 20) {
								$this.addClass('disabled');
							}
						}
					);
					var d = this.startDate.getDate();
					$('.dp-calendar td.current-month', this.context).each(
						function()
						{
							var $this = $(this);
							if (Number($this.text()) < d) {
								$this.addClass('disabled');
							}
						}
					);
				} else {
					$('.dp-nav-prev-year', this.context).removeClass('disabled');
					$('.dp-nav-prev-month', this.context).removeClass('disabled');
					var d = this.startDate.getDate();
					if (d > 20) {
						// check if the startDate is last month as we might need to add some disabled classes...
						var sd = new Date(this.startDate.getTime());
						sd.addMonths(1);
						if (this.displayedYear == sd.getFullYear() && this.displayedMonth == sd.getMonth()) {
							$('dp-calendar td.other-month', this.context).each(
								function()
								{
									var $this = $(this);
									if (Number($this.text()) < d) {
										$this.addClass('disabled');
									}
								}
							);
						}
					}
				}
				if (this.displayedYear == this.endDate.getFullYear() && this.displayedMonth == this.endDate.getMonth()) {
					$('.dp-nav-next-year', this.context).addClass('disabled');
					$('.dp-nav-next-month', this.context).addClass('disabled');
					$('.dp-calendar td.other-month', this.context).each(
						function()
						{
							var $this = $(this);
							if (Number($this.text()) < 14) {
								$this.addClass('disabled');
							}
						}
					);
					var d = this.endDate.getDate();
					$('.dp-calendar td.current-month', this.context).each(
						function()
						{
							var $this = $(this);
							if (Number($this.text()) > d) {
								$this.addClass('disabled');
							}
						}
					);
				} else {
					$('.dp-nav-next-year', this.context).removeClass('disabled');
					$('.dp-nav-next-month', this.context).removeClass('disabled');
					var d = this.endDate.getDate();
					if (d < 13) {
						// check if the endDate is next month as we might need to add some disabled classes...
						var ed = new Date(this.endDate.getTime());
						ed.addMonths(-1);
						if (this.displayedYear == ed.getFullYear() && this.displayedMonth == ed.getMonth()) {
							$('.dp-calendar td.other-month', this.context).each(
								function()
								{
									var $this = $(this);
									if (Number($this.text()) > d) {
										$this.addClass('disabled');
									}
								}
							);
						}
					}
				}
			},
			_closeCalendar : function(programatic, ele)
			{
				if (!ele || ele == this.ele)
				{
					$(document).unbind('mousedown', this._checkMouse);
					this._clearCalendar();
					$('#dp-popup a').unbind();
					$('#dp-popup').empty().remove();
					if (!programatic) {
						$(this.ele).trigger('dpClosed', [this.getSelected()]);
					}
				}
			},
			// empties the current dp-calendar div and makes sure that all events are unbound
			// and expandos removed to avoid memory leaks...
			_clearCalendar : function()
			{
				// TODO.
				$('.dp-calendar td', this.context).unbind();
				$('.dp-calendar', this.context).empty();
			}
		}
	);
	
	// static constants
	$.dpConst = {
		SHOW_HEADER_NONE	:	0,
		SHOW_HEADER_SHORT	:	1,
		SHOW_HEADER_LONG	:	2,
		POS_TOP				:	0,
		POS_BOTTOM			:	1,
		POS_LEFT			:	0,
		POS_RIGHT			:	1
	};
	// localisable text
	$.dpText = {
		TEXT_PREV_YEAR		:	'Previous year',
		TEXT_PREV_MONTH		:	'Previous month',
		TEXT_NEXT_YEAR		:	'Next year',
		TEXT_NEXT_MONTH		:	'Next month',
		TEXT_CLOSE			:	'Close',
		TEXT_CHOOSE_DATE	:	'Choose date'
	};
	// version
	$.dpVersion = '$Id: jquery.datePicker.js 21 2009-01-11 19:45:13Z kelvin.luck $';

	$.fn.datePicker.defaults = {
		month				: undefined,
		year				: undefined,
		showHeader			: $.dpConst.SHOW_HEADER_SHORT,
		startDate			: undefined,
		endDate				: undefined,
		inline				: false,
		renderCallback		: null,
		createButton		: true,
		showYearNavigation	: true,
		closeOnSelect		: true,
		displayClose		: false,
		selectMultiple		: false,
		clickInput			: false,
		rememberViewedMonth	: true,
		verticalPosition	: $.dpConst.POS_TOP,
		horizontalPosition	: $.dpConst.POS_LEFT,
		verticalOffset		: 0,
		horizontalOffset	: 0,
		hoverClass			: 'dp-hover'
	};

	function _getController(ele)
	{
		if (ele._dpId) return $.event._dpCache[ele._dpId];
		return false;
	};
	
	// make it so that no error is thrown if bgIframe plugin isn't included (allows you to use conditional
	// comments to only include bgIframe where it is needed in IE without breaking this plugin).
	if ($.fn.bgIframe == undefined) {
		$.fn.bgIframe = function() {return this; };
	};


	// clean-up
	$(window)
		.bind('unload', function() {
			var els = $.event._dpCache || [];
			for (var i in els) {
				$(els[i].ele)._dpDestroy();
			}
		});
		
	
})(jQuery);


jq = jQuery;
var SLIDE_SPEED = 500;










//tog
function tog(clicker, toggler, callback, speed){
  if (speed == undefined) {speed = SLIDE_SPEED;}
  if (callback) {jq(clicker).click(function(){jq(toggler).slideToggle(speed, callback); return false;});}
  else {jq(clicker).click(function(){jq(toggler).slideToggle(speed); return false;});}

}
function togger(j, callback, speed){
  if (speed == undefined) {speed = SLIDE_SPEED}
  if(callback) {jq(j).slideToggle(speed, callback); }
  else {jq(j).slideToggle(speed); }
}
//tog




jQuery.fn.checked = function(){
  return this.attr('checked');
}










//message
function async_message(m, d){message(m, d);}
function messages(m, d){message(m, d);}
function msg(m, d){message(m, d);}
function message(message, duration){
    if (duration == undefined){ duration = 1000;}
    if (jq.browser.msie) { jq("#message").css({position: 'absolute'}); }
    jq("#message").show().children('p').text(message);
    setTimeout('jq("#message").hide().css("width", "");',duration);
    return false;
}
//message


function debug(m){if (typeof console != 'undefined'){console.log(m);}}
function puts(m){debug(m);}


jQuery.fn.center = function(){
  return this.each(function(){
    var win = jq(window).width();
    var width = jQuery(this).width();
    jq(this).css({width: width +'px', left: (win/2 - width/2) + 'px'});
  })
}


jQuery.fn.check_width = function(){
  return this.each(function(){
    var win = jq(window).width();
    var width = jQuery(this).width();
    var height = jQuery(this).height();
    if (width/2 > height || width*2 >= win){ return; }
    jq(this).css({width: width*2 +'px'});
  })
}





function reinit_events(){
  $('input.chooseDate').datePicker({clickInput:true});
}


$(function(){
  $('.destinationSearch').autocomplete('/destinations/search', {
    minChars: 2,
    max: 10,
		scroll: false,
		results: 10,
    formatItem: function(item) {
  		obj_from_json = less_json_eval(item)
  		if (obj_from_json.destination.parent) {
  			parent = ", " + obj_from_json.destination.parent.destination.name
  		} else {
  			parent = ""
  		}
   		return obj_from_json.destination.name + parent + ", " + obj_from_json.destination.country.country;
   	}
   }).result(function(event, item) { 
	   $(this).attr("value", less_json_eval(item).destination.name); 
     location.href = "/destinations/" + less_json_eval(item).destination.id + "?xs4f=qf3r";
   })    
});




//startup
jq(function(){
	jQuery("#waiter").ajaxStart(function(){jq(this).show();}).ajaxStop(function(){jq(this).hide();}).ajaxError(function(){jq(this).hide();});
	reinit_events();
})
//startup

// Conor's Mad house of unobtrusiveness!!!

function toDoJS(){
	// Toggles the new To-Do form
	$('a#addNewToDo').click(function(e){
			e.preventDefault();
			var text = $(this).text();
			if (text == "Add") {
				$('div#newToDo').slideDown();
				$(this).text("Cancel");
			}else{
				$('div#newToDo').slideUp();
				$(this).text("Add");
			};
		});

	
	// Hides the new To-Do form on submission
	$('div#newToDo form').submit(function(){
		$('a#addNewToDo').text("Add");
		$(this).parent().slideUp();
	});
	
	// // Shows, and hides delete link for each list item
	// 	var beingShown = false;
	// 	var visible = false;
	// 	
	// 	$('ul#todos_list li').mouseover(
	// 		function(){
	// 			var popup = $(this).children('div').children('div.todo_heading').children('a');
	// 			
	// 			if(beingShown || visible) {
	// 				return;
	// 			}else{
	// 				beingShown = true;
	// 				
	// 				popup.animate({
	// 					opacity: 1
	// 				}, '', function(){
	// 					beingShown = false;
	// 					visible = true;
	// 				});
	// 			}
	// 			
	// 	}).mouseout(
	// 		function(){
	// 			var popup = $(this).children('div').children('div.todo_heading').children('a');
	// 			
	// 			popup.animate({
	// 				opacity: 0
	// 			}, '', function(){
	// 				visible = false;
	// 			});
	// 	});
};

$(document).ready(function() {
	
	var label = $('#destinationSearchForm label').text()
	$('#destinationSearchForm label').remove();
	$('input.destinationSearch').addClass("formDescription").attr('value', label);
	
	$('input.destinationSearch').focus(function(){
		$(this).removeClass("formDescription").attr('value', '');
	});
	
	$('a.forgotPasswordShow').click(function(e){
		e.preventDefault();
		$('div#loginForm').fadeOut('normal', function(){
			$('div#forgotPassword').fadeIn();
		});
		
	});
	
	
	

	
});







