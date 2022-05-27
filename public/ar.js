angular.module('myapp',[])
.controller('ctrldetails',function($scope,$http)
{
    $http.get('http://127.0.0.1:5700/getjson')
    .success(function(response)
    {
        $scope.table=response;
        $http.get('http://127.0.0.1:5700/getsleep').success(function(response){
            $scope.tab=response;
            var i;
            $scope.sum=0;
            for(i=0;i<$scope.tab.length;i++)
            {
                $scope.sum+=$scope.tab[i].asleepTime;
                // alert($scope.sum)
            }
            $scope.test=$scope.sum/$scope.tab.length;
           
            if($scope.test>=8){
                $scope.avg="Good";
            }
            else if($scope.test<=4){
                $scope.avg="Bad";
            }
            else{
                $scope.avg="Fine";
            }
             //alert($scope.avg)
        })

        $http.get('http://127.0.0.1:5700/getfoodwater').success(function(response){
            $scope.tab2=response;
            var i;
            $scope.sum2=0;
            for(i=0;i<$scope.tab2.length;i++)
            {
                $scope.sum2+=$scope.tab2[i].water;
                //alert($scope.sum2)
            }
            $scope.test2=$scope.sum2/$scope.tab2.length;
            if($scope.test2>=8){
                $scope.avg2="Good";
            }
            else if($scope.test2<=4){
                $scope.avg2="Bad";
            }
            else{
                $scope.avg2="Fine";
            }
        })

        $http.get('http://127.0.0.1:5700/getexpenses').success(function(response){
            $scope.tab3=response;
            var i;
            $scope.sum3=0;
            for(i=0;i<$scope.tab3.length;i++)
            {
                $scope.sum3+=$scope.tab3[i].totalAmount;
                //alert($scope.sum3)
            }
            $scope.test3=$scope.sum3/$scope.tab3.length;
        })

        $http.get('http://127.0.0.1:5700/getexercise').success(function(response){
            $scope.tab4=response;
            var i;
            $scope.sum4=0;
            for(i=0;i<$scope.tab4.length;i++)
            {
                $scope.sum4+=$scope.tab4[i].timetaken;
                
            }
            $scope.test4=Math.floor($scope.sum4/$scope.tab4.length);

            if($scope.test4>=30){
                $scope.avg4="Good";
            }
            else if($scope.test4<=10){
                $scope.avg4="Bad";
            }
            else{
                $scope.avg4="Fine";
            }
           // alert(Math.floor($scope.test4))
        })
        
    })
    $scope.drop=function(id)
    {
        //var t=date.split("T");
        
        //alert(newDate);
        $http.get('http://127.0.0.1:5700/dropPlan/'+ id)
        .success(function(response)
        {
            $http.get('http://127.0.0.1:5700/getjson')
            .success(function(response)
             {
                     $scope.table=response;
                })
        })

   }
    $scope.update=function(id)
    {
        $http.get('http://127.0.0.1:5700/update/'+id)
        .success(function(response)
        {
            $http.get('http://127.0.0.1:5700/getjson')
            .success(function(response)
             {
                     $scope.table=response;
                })
        })
    }

    
 
    // $scope.reject=function(id)
    // {
    //     $http.get('http://127.0.0.1:5800/reject/'+id)
    //     .success(function(response)
    //     {
    //         $http.get('http://127.0.0.1:5800/getjson')
    //         .success(function(response)
    //          {
    //                  $scope.table=response;
    //             })
    //     })
    // }
})

