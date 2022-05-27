angular.module('myapp',[])
.controller('ctrldetails',function($scope,$http)
{
    $http.get('http://127.0.0.1:5700/getsleep')
    .success(function(response)
    {
        $scope.table=response;
        
    })
})

angular.module('mynotes',[])
.controller('ctrldetails',function($scope,$http)
{
    $http.get('http://127.0.0.1:5700/getnotes')
    .success(function(response)
    {
        $scope.table=response;
    })

    $scope.dropEntry=function(id)
    {
       
        $http.get('http://127.0.0.1:5700/dropEntry/'+ id)
        .success(function(response)
        {
            $http.get('http://127.0.0.1:5700/getnotes')
            .success(function(response)
             {
                     $scope.table=response;
                })
        })

   }

   $scope.viewEntry=function(id)
    {      

        $http.get('http://127.0.0.1:5700/viewEntry/'+id)
        .success(function(response)
        {
            $scope.tab=response;

            let popup=document.getElementById("popup");
            popup.classList.add("open-popup");
        })
    }

    $scope.closePopUp = function(){
        let popup=document.getElementById("popup");
		popup.classList.remove("open-popup");
	}
})

angular.module('myfood',[])
.controller('ctrldetails',function($scope,$http)
{
    $http.get('http://127.0.0.1:5700/getfoodwater')
    .success(function(response)
    {
        $scope.table=response;
    })
})

angular.module('myExpenses',[])
.controller('ctrldetails',function($scope,$http)
{
    $http.get('http://127.0.0.1:5700/getexpenses')
    .success(function(response)
    {
        $scope.table=response;
    })

    $scope.drop=function(date)
    {
        var t=date.split("T");
        
        //alert(newDate);
        $http.get('http://127.0.0.1:5700/drop/'+ t[0])
        .success(function(response)
        {
            $http.get('http://127.0.0.1:5700/getexpenses')
            .success(function(response)
             {
                     $scope.table=response;
                })
        })

   }

   $scope.viewExpenses=function(date)
    {
        var t=date.split("T");

        $http.get('http://127.0.0.1:5700/viewExpenses/'+t[0])
        .success(function(response)
        {
            $scope.tab=response;

            let popup=document.getElementById("popup");
            popup.classList.add("open-popup");


            // $http.get('http://127.0.0.1:5800/getjson')
            // .success(function(response)
            //  {
            //          $scope.table=response;
            //     })
        })
    }

    $scope.closePopUp = function(){
        let popup=document.getElementById("popup");
		popup.classList.remove("open-popup");
	}

})  


angular.module('myExercise',[])
.controller('ctrldetails',function($scope,$http)
{
    $http.get('http://127.0.0.1:5700/getexercise')
    .success(function(response)
    {
        $scope.table=response;
    })

    
})


