/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    SOME_CONSTANTS : false,  // some constant


    // Application Constructor
    initialize: function() {
        var appID = 'gzpxlYNEqosH2z2A8s7Dyk1mw7GPzkxpcVdY663F';
        var jsID = 'jPgyT1EMzPabkbcAdbcgrI9rPCeIvFpzRJ9yDZuF';
        Parse.initialize(appID, jsID);
        console.log("console log init");
        this.bindEvents();
        this.initFastClick();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    initFastClick : function() {
        window.addEventListener('load', function() {
            FastClick.attach(document.body);
        }, false);
    },
    // Phonegap is now ready...

    onDeviceReady: function() {
        console.log("device ready, start making you custom calls!");
        //alert("test");
        initApp();
        var AtmUser = Parse.Object.extend("AtmUser");
        document.getElementById("login").addEventListener("click", initApp, false); 
        document.getElementById("submitinfo").addEventListener("click",bankFormSubmit,false);     
        var fbInfo;
        var fbLoginSuccess = function(userData)
        {
            fbInfo = userData;
            checkUserBank();
            //document.getElementById('lblFB').innerHTML = fbInfo;
        }

        function initApp()
        {

            facebookConnectPlugin.getLoginStatus(function (response) {

                if (response.status !== 'connected') {
                    facebookConnectPlugin.login( ["public_profile"],
                    fbLoginSuccess,
                    function (response) { alert(JSON.stringify(response)) });
                } else {
                   fbInfo = response;
                   checkUserBank();
                }

            },function (response) { alert(JSON.stringify(response)) });
            //document.getElementById('lblFB').innerHTML = fbInfo;
        }
        function checkUserBank()
        {
            localStorage.setItem("userID",fbInfo.authResponse.userID);
            var userQuery = new Parse.Query(AtmUser);
            userQuery.equalTo("userID",fbInfo.authResponse.userID);
            userQuery.find({
                success: function(results){
                    if(results.length > 0)
                    {
                        var username = results[0].get("username");
                        document.getElementById("welcomeheader").innerHTML="Welcome "+username+"!";
                        $.mobile.changePage('#havecash-needcash','slide');
                        
                    }else{
                        $.mobile.changePage('#add-bank-account','slide');
                    }
                },
                error: function(error){
                    alert(error.message);
                }

            });
        }
        function bankFormSubmit()
        {
            createUser(document.getElementById("account-number").value,document.getElementById("routing-number").value,document.getElementById("username").value);
        }
        function createUser(account,routing,username)
        {
            alert(account+","+routing);
            var user = new AtmUser();
            user.set('userID',fbInfo.authResponse.userID);
            user.set('account',account);
            user.set('routing',routing);
            user.set('username',username);
            document.getElementById("welcomeheader").innerHTML="Welcome "+username+"!";

            user.save(null, {
                success: function(user){
                    alert("Successfully saved user!");
                },
                error: function(user, error){
                    alert(error.message);
                }
            });
        }

    }

};