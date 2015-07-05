"use strict";angular.module("frontendApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngDialog","ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/quiz.html",controller:"QuizCtrl"}).when("/home",{templateUrl:"views/home.html",controller:"HomeCtrl"}).when("/matrix",{templateUrl:"views/div.html",controller:"DivCtrl"}).when("/blog",{templateUrl:"views/blog.html",controller:"BlogCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/play",{templateUrl:"views/play.html",controller:"PlayCtrl"}).when("/div",{templateUrl:"views/div.html",controller:"DivCtrl"}).when("/main",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("frontendApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("frontendApp").controller("AboutCtrl",["$scope","$location",function(a,b){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],console.log(b.path())}]),angular.module("frontendApp").controller("DivCtrl",["$rootScope","$scope","$http",function(a,b,c){b.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.$on("$locationChangeStart",function(a,c,d){console.log("location changing to:"+c),b.tour.cancel()});var d=function(a){var b=function(a,b,c){a=parseInt(a,16),b=parseInt(b,16);var d=Math.floor(c*b+(1-c)*a);return(d+256).toString(16).substr(-2).toUpperCase()};return"#"+b("ee","1C",a)+b("ee","64",a)+b("ee","6D",a)};b.legends=_.map([0,.2,.4,.5,.6,.8,1].reverse(),function(a){return{value:a,valuePercentage:(100*a).toString(10)+"%",color:d(a)}}),b.isLoadingTransDictMover=!0,b.isLoadingTransDictVoter=!0,b.isLoadingMVRelation=!0,c.get("/api/transdict-mover.json").success(function(a){b.isLoadingTransDictMover=!1,b.transDictMover=a,b.rangeMovers=_.range(1,Object.keys(b.transDictMover).length+1)}).error(function(a){console.log("loading failure")}),c.get("/api/transdict-voter.json").success(function(a){b.isLoadingTransDictVoter=!1,b.transDictVoter=a,b.rangeVoters=_.range(1,Object.keys(b.transDictVoter).length+1)}).error(function(a){console.log("loading failure")}),c.get("/api/mv-relation.json").success(function(a){b.isLoadingMVRelation=!1,b.mvRelation=a;for(var c=0;c<b.mvRelation.length;c++)for(var e=0;e<b.mvRelation[c].length;e++){var f=b.mvRelation[c][e],g=Math.round(100*f),h="black";.5>f&&(h="white"),b.mvRelation[c][e]={value:f,valuePercentage:g,color:d(f)}}}).error(function(a){console.log("loading failure")}),b.currentStep=0;var e="https://spreadsheets.google.com/feeds/list/1s2CkDX0sMaZHzHjl_hbJs8DkyUAca08enU1te3aEPUU/od6/public/values?alt=json";c.get(e).success(function(a){console.log(a),b.stories=_.map(a.feed.entry,function(a){return a});var c=new Shepherd.Tour({defaults:{classes:"shepherd-theme-arrows",scrollTo:!0}}),d=8,e=1,f=d+e,g=16*f,h=10*f;for(var i in b.stories){var j=b.stories[i],k="frame"+i,l="frame"+i,m=$("<div></div>").attr("id",k).addClass("guide-frame");m.appendTo("#legco");for(var n=JSON.parse(j.gsx$rectangles.$t),o=0;o<n.length;o++){var p=n[o],q=$("<div></div>").addClass("rectangle").addClass(l);q.css("top",h+f*(p[0]-1)-1+"px"),q.css("left",g+f*(p[1]-1)-1+"px"),q.css("width",(p[3]-p[1]+1)*f),q.css("height",(p[2]-p[0]+1)*f),q.appendTo(m)}var r=function(){var a=".frame"+b.currentStep;$(".rectangle").hide(),$(a).show()};b.nextFunc=function(){b.currentStep+=1;r(),c.next(),b.$apply()},b.backFunc=function(){b.currentStep-=1;r(),c.back(),b.$apply()};var s=[];i>0&&s.push({text:"上條",action:b.backFunc}),i<b.stories.length-1&&s.push({text:"下條",action:b.nextFunc}),c.addStep("Step"+i,{title:j.gsx$title.$t,text:j.gsx$text.$t,attachTo:"."+l,buttons:s})}$(".rectangle").hide(),$(".frame0").show(),c.start(),b.tour=c}).error(function(a){console.log("loading failure")})}]),angular.module("frontendApp").controller("PlayCtrl",["$scope","$http",function(a,b){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.myPromise1=b.get("https://spreadsheets.google.com/feeds/list/1s2CkDX0sMaZHzHjl_hbJs8DkyUAca08enU1te3aEPUU/od6/public/values?alt=json"),a.myPromise2=b.get("/api/mv-relation.json"),a.myPromise3=b.get("/api/transdict-mover.json"),a.myPromise4=b.get("/api/transdict-voter.json")}]),angular.module("frontendApp").controller("HeaderCtrl",["$scope","$location",function(a,b){a.isActive=function(a){return a===b.path()}}]),angular.module("frontendApp").controller("HomeCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("frontendApp").controller("QuizCtrl",["$rootScope","$scope","$timeout","ngDialog",function(a,b,c,d){b.quizes=[{question:"你知道立法會中的提案獲得支持票總數最高是哪位議員嗎？",choices:["梁振英","梁家傑","梁家騮","梁國雄","梁美芬"],answerIndex:3,explanation:"梁國雄獲得了約2000張支持票，在70位議員中最高，但他自己提出了一千多個議案，所以大部分支持票都是自己給自己投的。"},{question:"本屆立法會曾有議員投票反對自己的議案，猜猜是哪一位？",choices:["葉劉淑儀","李慧琼","黃毓民","曾鈺成","劉皇發"],answerIndex:1,explanation:"李慧琼曾任財政預算案修正案的委員會主席，此委員會泛民居多，委員會內部通過的修正案李慧琼並不贊成，但是作為委員會主席她需要以主席身份向大會提交修正案。之後她又以民建聯成員身份對此提案投反對票。"},{question:"有一位建制派議員，提出的議案受泛民支持多於建制派支持，這又是哪一位？",choices:["陳婉嫻","譚耀宗","葛珮帆","王國興","潘兆平"],answerIndex:4,explanation:"潘兆平提出的多為民生議題，受許多泛民議員的歡迎。"}];for(var e=0;e<b.quizes.length;e++)b.quizes[e].answerFromUser=-1;b.questionID=0,b.quizFinished=!1,b.updateQuizStatus=function(){c(function(){b.quizFinished=_.reduce(b.quizes,function(a,b){return a&&-1!=b.answerFromUser&&b.answerFromUser==b.answerIndex},!0),b.quizFinished&&d.open({template:"finishedDialog"})},300)}}]),angular.module("frontendApp").controller("BlogCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);