"use strict";angular.module("frontendApp",["ngAnimate","angulartics","angulartics.google.analytics","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngDialog","monospaced.qrcode","ui.bootstrap"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"views/quiz.html",controller:"QuizCtrl"}).when("/video",{templateUrl:"views/video.html",controller:"VideoCtrl"}).when("/matrix-meta",{templateUrl:"views/meta.html",controller:"DivCtrl"}).when("/home",{templateUrl:"views/home.html",controller:"HomeCtrl"}).when("/matrix",{templateUrl:"views/div.html",controller:"DivCtrl"}).when("/blog",{templateUrl:"views/20150812-hk-legco-analysis.html",controller:"BlogCtrl"}).when("/blog-hans",{templateUrl:"views/20150812-hk-legco-analysis-hans.html",controller:"BlogCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/play",{templateUrl:"views/play.html",controller:"PlayCtrl"}).when("/div",{templateUrl:"views/div.html",controller:"DivCtrl"}).when("/main",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/20150812-hk-legco-analysis",{templateUrl:"views/20150812-hk-legco-analysis.html",controller:"BlogCtrl"}).when("/20150812-hk-legco-analysis-hans",{templateUrl:"views/20150812-hk-legco-analysis-hans.html",controller:"BlogCtrl"}).otherwise({redirectTo:"/"});var c=$('meta[name="html5Mode"]').first().attr("content");c={"true":!0,"false":!1}[c],console.log("html5Mode: "+c),b.html5Mode(c)}]),angular.module("frontendApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("frontendApp").controller("AboutCtrl",["$scope","$location","$http",function(a,b,c){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],console.log(b.path());var d="api/hk-legco-pointers/hk-legco-pointers.json";c.get(d).success(function(b){console.log("Get projects success"),a.projects=b}).error(function(){console.log("Get projects error")})}]),angular.module("frontendApp").controller("DivCtrl",["$rootScope","$scope","$http",function(a,b,c){b.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.$on("$locationChangeStart",function(a,c,d){console.log("location changing to:"+c),b.tour.cancel()});var d=function(a){var b=function(a,b,c){a=parseInt(a,16),b=parseInt(b,16);var d=Math.floor(c*b+(1-c)*a);return(d+256).toString(16).substr(-2).toUpperCase()};return"#"+b("ee","1C",a)+b("ee","64",a)+b("ee","6D",a)};b.legends=_.map([0,.2,.4,.5,.6,.8,1].reverse(),function(a){return{value:a,valuePercentage:(100*a).toString(10)+"%",color:d(a)}}),b.isLoadingTransDictMover=!0,b.isLoadingTransDictVoter=!0,b.isLoadingMVRelation=!0,c.get("api/transdict-mover.json").success(function(a){b.isLoadingTransDictMover=!1,b.transDictMover=a,b.rangeMovers=_.range(1,Object.keys(b.transDictMover).length+1)}).error(function(a){console.log("loading failure")}),c.get("api/transdict-voter.json").success(function(a){b.isLoadingTransDictVoter=!1,b.transDictVoter=a,b.rangeVoters=_.range(1,Object.keys(b.transDictVoter).length+1)}).error(function(a){console.log("loading failure")}),c.get("api/mv-relation.json").success(function(a){b.isLoadingMVRelation=!1,b.mvRelation=a;for(var c=0;c<b.mvRelation.length;c++)for(var e=0;e<b.mvRelation[c].length;e++){var f=b.mvRelation[c][e],g=Math.round(100*f),h="black";.5>f&&(h="white"),b.mvRelation[c][e]={value:f,valuePercentage:g,color:d(f)}}}).error(function(a){console.log("loading failure")}),b.currentStep=0;var e="api/navigation-data.json";c.get(e).success(function(a){console.log(a),b.stories=_.map(a.feed.entry,function(a){return a});var c=new Shepherd.Tour({defaults:{classes:"shepherd-theme-arrows",scrollTo:!0}}),d=function(a){var b=$("#style-info #"+a).css("font-size");return parseInt(b.substr(0,b.length-2))},e=d("cell-size"),f=d("cell-spacing"),g=(d("font-size"),e+f),h=16*g,i=10*g;for(var j in b.stories){var k=b.stories[j],l="frame"+j,m="frame"+j,n=$("<div></div>").attr("id",l).addClass("guide-frame");n.appendTo("#legco");for(var o=JSON.parse(k.gsx$rectangles.$t),p=0;p<o.length;p++){var q=o[p],r=$("<div></div>").addClass("rectangle").addClass(m);r.css("top",i+g*(q[0]-1)-1+"px"),r.css("left",h+g*(q[1]-1)-1+"px"),r.css("width",(q[3]-q[1]+1)*g),r.css("height",(q[2]-q[0]+1)*g),r.appendTo(n)}var s=function(){var a=".frame"+b.currentStep;$(".rectangle").hide(),$(a).show()};b.nextFunc=function(){b.currentStep+=1;s(),c.next(),b.$apply()},b.backFunc=function(){b.currentStep-=1;s(),c.back(),b.$apply()};var t=[];j>0&&t.push({text:"上條",action:b.backFunc}),j<b.stories.length-1&&t.push({text:"下條",action:b.nextFunc}),c.addStep("Step"+j,{title:k.gsx$title.$t,text:k.gsx$text.$t,attachTo:"."+m,buttons:t})}$(".rectangle").hide(),$(".frame0").show(),c.start(),b.tour=c}).error(function(a){console.log("loading failure")})}]),angular.module("frontendApp").controller("PlayCtrl",["$scope","$http",function(a,b){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.myPromise1=b.get("https://spreadsheets.google.com/feeds/list/1s2CkDX0sMaZHzHjl_hbJs8DkyUAca08enU1te3aEPUU/od6/public/values?alt=json"),a.myPromise2=b.get("/api/mv-relation.json"),a.myPromise3=b.get("/api/transdict-mover.json"),a.myPromise4=b.get("/api/transdict-voter.json")}]),angular.module("frontendApp").controller("HeaderCtrl",["$scope","$location","LegcoConfig",function(a,b,c){a.isActive=function(a){return a===b.path()},a.showHeader=!0,a.getRealPath=c.getRealPath}]),angular.module("frontendApp").controller("HomeCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("frontendApp").controller("QuizCtrl",["$rootScope","$scope","$timeout","ngDialog","LegcoConfig",function(a,b,c,d,e){b.quizes=[{question:"你知道立法會中的提案獲得支持票總數最高是哪位議員嗎？",choices:["梁振英","梁家傑","梁家騮","梁國雄","梁美芬"],answerIndex:3,explanation:"梁國雄獲得了約2000張支持票，在70位議員中最高，但他自己提出了一千多個議案，所以大部分支持票都是自己給自己投的。"},{question:"本屆立法會曾有議員投票反對自己的議案，猜猜是哪一位？",choices:["葉劉淑儀","李慧琼","黃毓民","曾鈺成","劉皇發"],answerIndex:1,explanation:"李慧琼曾任財政預算案修正案的委員會主席，此委員會泛民居多，委員會內部通過的修正案李慧琼並不贊成，但是作為委員會主席她需要以主席身份向大會提交修正案。之後她又以民建聯成員身份對此提案投反對票。"},{question:"有一位建制派議員，提出的議案受泛民支持多於建制派支持，這又是哪一位？",choices:["陳婉嫻","譚耀宗","葛珮帆","王國興","潘兆平"],answerIndex:4,explanation:"潘兆平提出的多為民生議題，受許多泛民議員的歡迎。"}];for(var f=0;f<b.quizes.length;f++)b.quizes[f].answerFromUser=-1;b.quizFinished=!1,b.updateQuizStatus=function(){b.showAnswer=!1,c(function(){b.showAnswer=!0},200),c(function(){},300)},b.questionID=0,b.showQuizFinishedNotice=!1,b.nextQuiz=function(){console.log(b.questionID),$(".quiz").hide(),$("#quiz-block-"+b.questionID).show(),b.questionID+=1,b.questionID>3&&(b.showQuizFinishedNotice=!0)},c(function(){b.nextQuiz()},200),b.getRealPath=e.getRealPath}]),angular.module("frontendApp").controller("BlogCtrl",["$scope","$location",function(a,b){function c(a,b){var c="http://s.init.im:8081/remember/legcoweb/",d=new XMLHttpRequest,e={username:i.uuid,key:a,value:b,raw:"",datetime:Date.now()};d.open("POST",c,!0),d.setRequestHeader("Content-Type","application/json; charset=UTF-8");var f=JSON.stringify(e);d.send(f),console.log("tried to post "+f)}function d(a){return function(){var b=encodeURIComponent(i.description),d=encodeURIComponent(a),e=encodeURIComponent(i.title);window.open("https://www.facebook.com/dialog/feed?app_id=1485405728425484&link="+d+"&name="+e+"&description="+b+"&redirect_uri="+d),c("share","facebook")}}function e(a){return function(){var b=encodeURIComponent(a),d=(encodeURIComponent("分享："+i.title),encodeURIComponent(i.description));window.open("http://service.weibo.com/share/share.php?title="+d+"&url="+b),c("share","weibo")}}function f(a){return function(){var b=encodeURIComponent(a),d=(encodeURIComponent("Share: "+i.title),encodeURIComponent(i.description));window.open("https://twitter.com/intent/tweet?text="+d+b),c("share","twitter")}}function g(){var a=document.getElementById("divVideoQRCode");a.style.display="block",c("share","wechat")}function h(){var a=document.getElementById("divArticleQRCode");a.style.display="block",c("share","wechat")}a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.urlToThisPage=b.absUrl();var i={videoURL:"https://www.youtube.com/watch?v=PIgbvFyOnwA"};i.generalTitle=document.getElementById("generalTitle"),console.log(generalTitle.innerText),"廿一世紀立會網絡"===generalTitle.innerHTML?(i.lang="hant",i.title="廿一世紀立會網絡",i.description="端傳媒「一圖看懂香港立法會」，泛民制一目了然。有人不提案，也有人投自己反對票。漲知識啊",i.url="http://legco.initiumlab.com/20150812-hk-legco-analysis"):(i.lang="hans",i.title="廿一世纪立会网络",i.description="端传媒「一图看懂香港立法会」，泛民制一目了然。有人不提桉，也有人投自己反对票。涨知识啊",i.url="http://legco.initiumlab.com/20150812-hk-legco-analysis-hans"),i.setUUID=function(){if(localStorage.getItem("uuid"))this.uuid=localStorage.getItem("uuid");else{var a="http://s.init.im:8081/utility/uuid/",b="LocalDefault"+Math.random().toString();this.uuid=b,localStorage.setItem("uuid",b);var c=new XMLHttpRequest;c.open("GET",a,!0),c.onload=function(){if(console.log("UUID server responded"),c.status>=200&&c.status<400){var a=JSON.parse(c.responseText);a.success&&(b=a.data.uuid)}this.uuid=b,localStorage.setItem("uuid",b)}.bind(this),c.send()}},document.getElementById("shareVideoToFacebookAnchor").addEventListener("click",d(i.videoURL),!1),document.getElementById("shareVideoToWeiboAnchor").addEventListener("click",e(i.videoURL),!1),document.getElementById("shareVideoToTwitterAnchor").addEventListener("click",f(i.videoURL),!1),document.getElementById("shareVideoToWeChatAnchor").addEventListener("click",g,!1),document.getElementById("btnCloseWeChatVideoSharePopup").addEventListener("click",function(){document.getElementById("divVideoQRCode").style.display="none"},!1),document.getElementById("shareArticleToFacebookAnchor").addEventListener("click",d(a.urlToThisPage),!1),document.getElementById("shareArticleToWeiboAnchor").addEventListener("click",e(a.urlToThisPage),!1),document.getElementById("shareArticleToTwitterAnchor").addEventListener("click",f(a.urlToThisPage),!1),document.getElementById("shareArticleToWeChatAnchor").addEventListener("click",h,!1),document.getElementById("btnCloseWeChatArticleSharePopup").addEventListener("click",function(){document.getElementById("divArticleQRCode").style.display="none"},!1),i.setUUID(),c("render",i.lang+"-rendered");var j=document.getElementById("introVideo");j.addEventListener("click",function(){this.paused?this.play():this.pause(),c("video","clicked")},!1)}]),angular.module("frontendApp").controller("VideoCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("frontendApp").service("LegcoConfig",function(){return{getRealPath:function(a){var b=$('meta[name="pathScheme"]').first().attr("content"),c=$("base").first().attr("href"),d=c+b+a;return"//"===d&&(d="/"),d}}});