// Though lot has changed, original version taken from http://www.kutil.org/2016/01/easy-data-scrapping-with-google-apps.html

function MAIN_SAVE_DATA() {
 var sheet = SpreadsheetApp.openById("1NO4ta5oHq1HNazlbvV4Q5gY8b6dV-N0b4iGhC-qgpo8").getSheetByName('Data');
 //add your Spreadsheet Id from URL or use below to copy the URL directly.
 //var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1NO4ta5oHq1HNazlbvV4Q5gY8b6dV-N0b4iGhC-qgpo8/edit#gid=0");
 sheet.appendRow([ Utilities.formatDate(new Date(), 'GMT+3', 'MM/dd/yyyy HH:mm:ss'), //put your preferred GMT and date format settings.
                 getData_Alexa(), //remove or duplicate any if needed
                 getData_Alexa_local(),
                 getData_admined_Facebook_page(),
                 "=SUM(SPLIT(\"" + getData_other_Facebook_page() + "\",\"QWERTYUIOPASDFGHJKLZXCVBNM:,\"))", //Sorry I used a long way to get this information. Facebook does not allow to directly get other page's likes counts, but it provides it on country basis. This formula sums them all :)
                 /*getData_Instagram()*/,//instagram ended support for public instagram.com/camiakademi/?__a=1 URL, so this method needs a solution :(
                 getData_Twitter(),
                 getData_YouTube(),
                 getData_GooglePlus(),
                 getData_OneSignal() ]);
}

function getData_Alexa() {
    var url = "http://data.alexa.com/data?cli=10&dat=snbamz&url=camiakademi.com"; //replace website's URL
    var fromText = 'TEXT="';
    var toText = '"';
   
    var content = UrlFetchApp.fetch(url).getContentText();
    var scraped = Parser
                    .data(content)
                    //.setLog() //if something does not work with Parser, uncomment these lines to log them. Then you can easily open the log with Ctrl+Enter
                    .from(fromText)
                    .to(toText)
                    .build();
    //Logger.log(scraped);
    return scraped;
}

function getData_Alexa_local() { //This should normally work for your website's country, but open below URL to see if it gets intended result with these fromText and toText values.
    var url = "http://data.alexa.com/data?cli=10&dat=snbamz&url=camiakademi.com"; //replace website's URL again
    var fromText = '" RANK="';
    var toText = '"';
   
    var content = UrlFetchApp.fetch(url).getContentText();
    var scraped = Parser
                    .data(content)
                    .from(fromText)
                    .to(toText)
                    .build();
    return scraped;
}

function getData_admined_Facebook_page() { //This function uses PERMANENT token which never expires. That thing is hard to get from facebook. Read from: https://stackoverflow.com/questions/17197970/facebook-permanent-page-access-token/28418469#28418469
    var token = "YOUR_TOKEN_HERE";//put your token here. Use a permanent one to make this function work forever.
    var datevalue = Utilities.formatDate(new Date(), 'GMT+3', 'yyyy-MM-dd');//put your preferred GMT but DON'T CHANGE date format.
    
    //put your page's name from URL directly below \||/ Keep in mind this function can only get from a page you're an admin of.
    var url = "https://graph.facebook.com/v2.8/camiakademi/insights/page_fans?access_token=" + token + "&since=" + datevalue;
    var fromText = '"value":';
    var toText = ',';
   
    var content = UrlFetchApp.fetch(url).getContentText();
    var scraped = Parser
                    .data(content)
                    .from(fromText)
                    .to(toText)
                    .build();
    return scraped;
}

function getData_other_Facebook_page() { //This function can get likes count from any page but separated by top some countries - which sometimes doesn't sum up to exact number. I could only find this one, sorry if it does not help you.
    var token = "YOUR_TOKEN_HERE";//put your token here. Use a permanent one to make this function work forever.
    var datevalue = Utilities.formatDate(new Date(), 'GMT+3', 'yyyy-MM-dd');//put your preferred GMT but DON'T CHANGE date format.
    
    //put your page's id directly below           \||/ Keep in mind this function can get from any page.
    var url = "https://graph.facebook.com/v2.8/924061487706464/insights/page_fans_country/lifetime?&access_token=" + token + "&since=" + datevalue;
    var fromText = '"value":';
    var toText = '},';
   
    var content = UrlFetchApp.fetch(url).getContentText();
    var scraped = Parser
                    .data(content)
                    .from(fromText)
                    .to(toText)
                    .build();
    scraped = scraped.replace(/"/g, '');//This removes some of the unwanted content - before using SPLIT function at sheets
    return scraped;
}

function getData_Instagram() {
    var url = "https://www.instagram.com/camiakademi/?__a=1";//put your instagram username here
    var response = UrlFetchApp.fetch(url).getContentText();
    return JSON.parse(response).user.followed_by.count;
}

function getData_Twitter() { //Create an app from https://apps.twitter.com/ then put its KEY and SECRET here.
    var CONSUMER_KEY = 'YOUR_APPS_CONSUMER_KEY';
    var CONSUMER_SECRET = 'YOUR_APPS_CONSUMER_SECRET';

    var tokenUrl = "https://api.twitter.com/oauth2/token";
    var tokenCredential = Utilities.base64EncodeWebSafe(CONSUMER_KEY + ":" + CONSUMER_SECRET);

    var tokenOptions = {
        headers : {
            Authorization: "Basic " + tokenCredential,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" 
        },
        method: "post",
        payload: "grant_type=client_credentials"
    };

    var responseToken = UrlFetchApp.fetch(tokenUrl, tokenOptions);
    var parsedToken = JSON.parse(responseToken);
    var token = parsedToken.access_token;

    var apiUrl = 'https://api.twitter.com/1.1/users/show.json?screen_name=camiakademi';
    var apiOptions = {
      headers : {
        Authorization: 'Bearer ' + token
      },
      "method" : "get"
    };

   var responseApi = UrlFetchApp.fetch(apiUrl, apiOptions);
   var result = "";

   if (responseApi.getResponseCode() == 200) {
       var tweets = JSON.parse(responseApi.getContentText());
       return tweets.followers_count;
   }
   Logger.log(result);
}

function getData_YouTube() {
    var url = "https://www.youtube.com/c/camiakademi";//put your YouTube Channel's URL here
    var fromText = 'subscribers">';
    var toText = '</span>';
   
    var content = UrlFetchApp.fetch(url).getContentText();
    var scraped = Parser
                    .data(content)
                    .from(fromText)
                    .to(toText)
                    .build();
    return scraped;
}

function getData_GooglePlus() {
    var googleapiskey = "YOUR_GOOGLE_API_KEY_HERE"; //get it by googling!
    var url = "https://www.googleapis.com/plus/v1/people/105772524499659718362?key=" + googleapiskey + "&fields=circledByCount";
    var fromText = ':';
    var toText = '}';
   
    var content = UrlFetchApp.fetch(url).getContentText();
    var scraped = Parser
                    .data(content)
                    .from(fromText)
                    .to(toText)
                    .build();
    return scraped;
}

function getData_OneSignal() { //get YOUR_OneSignal_App_ID and YOUR_REST_API_Key from side menu -> App Settings -> Keys&IDs
    var url = "https://onesignal.com/api/v1/apps/YOUR_OneSignal_App_ID";
    var headers = {
      'Authorization' : 'Basic YOUR_REST_API_Key'
    };
    var options = {
      "headers":headers
    };
    var fromText = 'messageable_players":';
    var toText = ',';
   
    var content = UrlFetchApp.fetch(url,options).getContentText();
    var scraped = Parser
                    .data(content)
                    .from(fromText)
                    .to(toText)
                    .build();
    return scraped;
}
