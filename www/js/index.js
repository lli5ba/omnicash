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
        var appID = gzpxlYNEqosH2z2A8s7Dyk1mw7GPzkxpcVdY663F;
        var jsID = jPgyT1EMzPabkbcAdbcgrI9rPCeIvFpzRJ9yDZuF;
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
        initApp();
        //document.getElementById("infoButton").addEventListener("click", showInfo, false);
        document.getElementById("login").addEventListener("click", initApp, false);      
        var fbInfo;
        var fbLoginSuccess = function(userData)
        {
            alert("UserInfo: " + JSON.stringify(userData));
            fbInfo = JSON.stringify(userData);
            checkUserBank(fbInfo);
            //document.getElementById('lblFB').innerHTML = fbInfo;
        }

        function initApp()
        {
            try{
            //facebookConnectPlugin.login(["public_profile"],fbLoginSuccess,function(error){alert("Error: "+error)});
            }catch(e)
            {
                alert(e);
            }

            facebookConnectPlugin.getLoginStatus(function (response) {

                if (response.status !== 'connected') {
                    facebookConnectPlugin.login( ["public_profile"],
                    fbLoginSuccess,
                    function (response) { alert(JSON.stringify(response)) });
                } else {
                   fbInfo = JSON.stringify(response);
                   checkUserBank(fbInfo);
                }

            },function (response) { alert(JSON.stringify(response)) });
            //document.getElementById('lblFB').innerHTML = fbInfo;
        }
        function checkUserBank(userData)
        {
            window.location = "bankForm.html";
            alert(JSON.stringify(fbInfo));
        }
        function showInfo()
        {
            alert(fbInfo);
        }

    }

};