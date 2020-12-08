window.onload = function(){

    
    // get elements that are needed and save them into new variables
    // this step is not needed with jquery but can make it easier 
    let buttonGo = $("#go");
    let casesinmonth = $("#casesbymonth");
    let inputtedCountry = $("#input");
    let displayCountry = $("#country");
    let displayCases = $("#cases");
    let warning = $("#warningmessage");
    let informationbox = $("#information");

    // hide information div when the page loads since it is empty
    informationbox.css("display", "none");
    // hide cases by montth when the page laods because it is empty
    casesinmonth.css("display","none");

    // Add event listener to the Go-button
    buttonGo.click(function () {

        // Save the inputted string into a variable
        let wantedCountry = inputtedCountry.val() ;
        warning.html = "";
        inputtedCountry.val("");

        // now get the date of the user
        // year-month-date
        // to my knowledge jquery does not have a different method to do this
        let datum = new Date();
        let date = datum.getDate();
        // getMonth() starts from 0 so have to add 1
        let month = datum.getMonth() + 1;
        let year = datum.getFullYear();

        // Check if searchbar is empty
        if(wantedCountry === "" || wantedCountry === " "){
            $("#warningmessage").html("Invalid input, try typing a country");
            warning.slideDown();
            //$("#information").css("display", "none");

        // TODO - does the inputted country exist
        }else{
            warning.slideUp();
            // TODO - input validation, does the wanted country exists
            informationbox.slideDown();
            casesinmonth.slideDown();
            displayCountry.html(wantedCountry);
            //let xmlhttp = new XMLHttpRequest();

            var settings = {
                "url": "https://api.covid19api.com/total/country/" + wantedCountry.toLowerCase() + "/status/confirmed?from=2020-01-01T00:00:00Z&to="+ year + "-" + month + "-" + date + "T00:00:00Z",
                "method": "GET",
                "timeout": 0,
            };

            // Named parsedData because it is used so much I am too lazy to change every parsedData name
            $.ajax(settings).done(function (parsedData) { 
                console.log(parsedData);

                    // get the cases - number from the last array and display it to the right place
                    let caseAmount = parsedData[parsedData.length -1].Cases
                    displayCases.html("Cases:" + caseAmount);

                    // look for the information for every month
                    // saving the length of the table into variable - one day = one index
                    let tablelength = parsedData.length;

                    for ( let i = 0; i < tablelength; i++){
                        // date is a string in the array, and I want to use the month to get every months cases
                        // so I use substring() to get the indexes of 5 and 6

                        // january - takes the last index where month is still 01
                        if (parsedData[i].Date.substring(5 ,7) === "01"){

                            var jancases = parsedData[i].Cases ;
                            $("#casesinjan").html(jancases);
                        }
                        // february - reduce the amount of cases by the last months cases
                        if (parsedData[i].Date.substring(5 ,7) === "02"){

                            var febcases = parsedData[i].Cases ;
                            $("#casesinfeb").html(febcases - jancases);
                        }
                        // march - reduce the amount of cases by the last months cases
                        if (parsedData[i].Date.substring(5 ,7) === "03"){

                            var marchcases = parsedData[i].Cases;
                            $("#casesinmar").html(marchcases - febcases);
                        }
                        // april - reduce the amount of cases by the last months cases
                        if (parsedData[i].Date.substring(5 ,7) === "04"){

                            var aprilcases = parsedData[i].Cases;
                            $("#casesinapril").html(aprilcases - marchcases);
                        }
                        // may - reduce the amount of cases by the last months cases
                        if (parsedData[i].Date.substring(5 ,7) === "05"){

                            var maycases = parsedData[i].Cases;
                            $("#casesinmay").html(maycases - aprilcases);
                        }
                        // june - reduce the amount of cases by the last months cases
                        if (parsedData[i].Date.substring(5 ,7) === "06"){

                            var junecases = parsedData[i].Cases;
                            $("#casesinjun").html(junecases - maycases);
                        }
                        // july - reduce the amount of cases by the last months cases
                        if (parsedData[i].Date.substring(5 ,7) === "07"){

                            var julycases = parsedData[i].Cases;
                            $("#casesinjul").html(julycases - junecases);
                        }
                        // august - reduce the amount of cases by the last months cases
                        if (parsedData[i].Date.substring(5 ,7) === "08"){

                            var augustcases = parsedData[i].Cases;
                            $("#casesinaug").html(augustcases - julycases);
                        }
                        // september - reduce the amount of cases by the last months cases
                        if (parsedData[i].Date.substring(5 ,7) === "09"){

                            var septembercases = parsedData[i].Cases;
                            $("#casesinsep").html(septembercases - augustcases);
                        }
                        // october - reduce the amount of cases by the last months cases
                        if (parsedData[i].Date.substring(5 ,7) === "10"){

                            var octobercases = parsedData[i].Cases;
                            $("#casesinoct").html(octobercases - septembercases);
                        }
                        // november - reduce the amount of cases by the last months cases
                        if (parsedData[i].Date.substring(5 ,7) === "11"){

                            var novembercases = parsedData[i].Cases;
                            $("#casesinnov").html(novembercases - octobercases);
                        }
                        // december - reduce the amount of cases by the last months cases
                        if (parsedData[i].Date.substring(5 ,7) === "12"){

                            var decembercases = parsedData[i].Cases;
                            $("#casesindec").html(decembercases - novembercases);
                        }


                    }
            })
            // change to "block" to make visible
            informationbox.css("display", "block");
            casesinmonth.css("display","block");

        }
    });
}