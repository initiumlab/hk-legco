'use strict'

/**
 * @ngdoc function
 * @name frontendApp.controller:DivCtrl
 * @description
 * # DivCtrl
 * Controller of the frontendApp
 */
;(function () {
  var angular = window.angular
  var $ = window.$
  var _ = window._
  var Shepherd = window.Shepherd
  angular.module('frontendApp')
    .controller('DivCtrl', ['$rootScope', '$scope', '$http', 'LegcoApi', function ($rootScope, $scope, $http, LegcoApi) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ]

      // TODO: probably there is a better global position for this?
      $rootScope.$on('$locationChangeStart', function (event, next, current) {
        console.log('location changing to:' + next)
        $scope.tour.cancel()
      })

      // var generateGradient = function(beginColor, endColor, percentage){
      var generateGradient = function (percentage) {
        // Use the color scheme from Legco
        // http://www.legco.gov.hk/general/chinese/business/index.html
        // Begin: 9681AC
        // End: 2C0254
        // Initium color:
        // $main-color: #31AFBE
        var linearCombination = function (beginValue, endValue, percentage) {
          // values are passed in a 2 digit hex values
          beginValue = parseInt(beginValue, 16)
          endValue = parseInt(endValue, 16)
          var intensity = Math.floor(percentage * endValue + (1 - percentage) * beginValue)
          return (intensity + 0x100).toString(16).substr(-2).toUpperCase()
        }
        return '#'
        // // Legco purple
        // + linearCombination('ee', '2C', percentage)
        // + linearCombination('ee', '02', percentage)
        // + linearCombination('ee', '54', percentage)
        // // Initium blue original
        // + linearCombination('ee', '31', percentage)
        // + linearCombination('ee', 'AF', percentage)
        // + linearCombination('ee', 'BE', percentage)
        // //Pure Black
        // + linearCombination('ee', '00', percentage)
        // + linearCombination('ee', '00', percentage)
        // + linearCombination('ee', '00', percentage)
        // Initium blue darken 20%
        + linearCombination('ee', '1C', percentage)
        + linearCombination('ee', '64', percentage)
        + linearCombination('ee', '6D', percentage)
      // //   Initium + Legco
      // + linearCombination('31', '2C', percentage)
      // + linearCombination('AF', '02', percentage)
      // + linearCombination('BE', '54', percentage)
      }

      // generate Legends
      $scope.legends = _.map([0, 0.2, 0.4, 0.5, 0.6, 0.8, 1].reverse(), function (v) {
        return {
          value: v,
          // valuePercentage: (v * 100 + 100).toString(10).substr(-2) + '%',
          valuePercentage: (v * 100).toString(10) + '%',
          color: generateGradient(v)
        }
      })

      $scope.isLoadingTransDictMover = true
      $scope.isLoadingTransDictVoter = true
      $scope.isLoadingMVRelation = true

      // $scope.rangeMovers = _.range(1, 82)
      // $scope.rangeVoters = _.range(1, 70)

      LegcoApi.get('transdict-mover.json',
        function (data) {
          $scope.isLoadingTransDictMover = false
          $scope.transDictMover = data
          $scope.rangeMovers = _.range(1, Object.keys($scope.transDictMover).length + 1)
        },
        function (data) {
          console.log('loading failure')
        }
      )

      LegcoApi.get('transdict-voter.json',
        function (data) {
          $scope.isLoadingTransDictVoter = false
          $scope.transDictVoter = data
          $scope.rangeVoters = _.range(1, Object.keys($scope.transDictVoter).length + 1)
        },
        function (data) {
          console.log('loading failure')
        }
      )

      LegcoApi.get('mv-relation.json',
        function (data) {
          $scope.isLoadingMVRelation = false
          $scope.mvRelation = data
          for (var i = 0; i < $scope.mvRelation.length; i++) {
            for (var j = 0; j < $scope.mvRelation[i].length; j++) {
              var value = $scope.mvRelation[i][j]
              var valuePercentage = Math.round(value * 100)
              $scope.mvRelation[i][j] = {
                value: value,
                valuePercentage: valuePercentage,
                color: generateGradient(value)
              }
            }
          }
        },
        function (data) {
          console.log('loading failure')
        }
      )

      $scope.currentStep = 0

      var drawMatrix = function (data) {
        console.log(data)
        $scope.stories = _.map(data.feed.entry, function (v) {
          // Do not process. just use the gsx$ notation
          // console.log(v)
          return v
        })
        // console.log($scope.stories)

        var tour = new Shepherd.Tour({
          defaults: {
            classes: 'shepherd-theme-arrows',
            scrollTo: true
          }
        })

        // tour.addStep('Overview', {
        //  title: 'Title here',
        //  text: 'This is overview of the plot',
        //  attachTo: '#heatmap',
        //  buttons: [
        //    {
        //      text: 'Next',
        //      action: tour.next
        //    }
        //  ]
        // })

        var getStyleInfo = function (styleName) {
          var a = $('#style-info #' + styleName).css('font-size')
          // console.log(a)
          return parseInt(a.substr(0, a.length - 2), 10)
        }

        // refer to main.scss to sync parameters
        var cellSize = getStyleInfo('cell-size')
        var cellSpacing = getStyleInfo('cell-spacing')
        // var fontSize = getStyleInfo('font-size')
        var cellBlockSize = cellSize + cellSpacing
        var heatmapLeft = 16 * (cellBlockSize) // max 13 chars in names
        var heatmapTop = 10 * (cellBlockSize) // max 6 chars in names

        for (var i in $scope.stories) {
          var story = $scope.stories[i]
          // console.log(story)
          var frameID = 'frame' + i
          var frameClass = 'frame' + i
          var frame = $('<div></div>').attr('id', frameID).addClass('guide-frame')

          frame.appendTo('#legco')
          // frame.hide()
          var rectangles = JSON.parse(story['gsx$rectangles']['$t'])
          for (var j = 0; j < rectangles.length; j++) {
            var rPos = rectangles[j]
            // console.log(rPos)
            var r = $('<div></div>').addClass('rectangle').addClass(frameClass)
            r.css('top', heatmapTop + cellBlockSize * (rPos[0] - 1) - 1 + 'px')
            r.css('left', heatmapLeft + cellBlockSize * (rPos[1] - 1) - 1 + 'px')
            r.css('width', (rPos[3] - rPos[1] + 1) * cellBlockSize)
            r.css('height', (rPos[2] - rPos[0] + 1) * cellBlockSize)
            r.appendTo(frame)
          }

          var changeShepherdStep = function () {
            var nextFrameClass = '.frame' + $scope.currentStep
            $('.rectangle').hide()
            $(nextFrameClass).show()
          }

          $scope.nextFunc = function () {
            $scope.currentStep += 1
            changeShepherdStep()
            tour.next()
            $scope.$apply()
          }

          $scope.backFunc = function () {
            $scope.currentStep -= 1
            changeShepherdStep()
            tour.back()
            $scope.$apply()
          }

          var buttons = []
          if (i > 0) {
            buttons.push({
              text: '上條',
              action: $scope.backFunc
            })
          }
          if (i < $scope.stories.length - 1) {
            buttons.push({
              text: '下條',
              action: $scope.nextFunc
            })
          }
          // console.log(i)
          // console.log(buttons)
          // var buttons = [
          //  {
          //    text: '上條',
          //    action: $scope.backFunc
          //  },
          //  {
          //    text: '下條',
          //    action: $scope.nextFunc
          //  }
          // ]

          // var buttonsString = '<br /><a class="btn btn-primary" href="#" ng-click="backFunc()">下一條</a><a class="btn btn-primary" ng-click="nextFunc()">上一條</a>'

          tour.addStep('Step' + i, {
            title: story['gsx$title']['$t'],
            // text: story['gsx$text']['$t'] + buttonsString,
            text: story['gsx$text']['$t'],
            attachTo: '.' + frameClass,
            buttons: buttons
          })
        }

        $('.rectangle').hide()

        // Start tour

        $('.frame0').show()
        tour.start()

        $scope.tour = tour

      }

      LegcoApi.get('navigation-data.json',
        drawMatrix,
        function (data) {
          console.log('loading failure')
        }
      )

    }])
}())
