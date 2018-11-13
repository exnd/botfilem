'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/get-movie-details', function (req, res) {

    let movieToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.movie ? req.body.result.parameters.movie : 'The Godfather';
    let reqUrl = encodeURI('http://www.omdbapi.com/?apikey=8863ef22&t=' + movieToSearch);
    http.get(reqUrl, (responseFromAPI) => {

    	let body = "";
        let coba = "{
  "line": {
    "type": "flex",
    "altText": "Flex Message",
    "contents": {
      "type": "bubble",
      "hero": {
        "type": "image",
        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "action": {
          "type": "uri",
          "label": "Line",
          "uri": "https://linecorp.com/"
        }
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "test",
            "size": "xl",
            "align": "center",
            "weight": "bold"
          },
          {
            "type": "box",
            "layout": "baseline",
            "margin": "md",
            "contents": [
              {
                "type": "icon",
                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                "size": "sm"
              },
              {
                "type": "icon",
                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                "size": "sm"
              },
              {
                "type": "icon",
                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                "size": "sm"
              },
              {
                "type": "icon",
                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                "size": "sm"
              },
              {
                "type": "icon",
                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png",
                "size": "sm"
              },
              {
                "type": "text",
                "text": "4.0",
                "flex": 0,
                "margin": "md",
                "size": "sm",
                "color": "#999999"
              }
            ]
          },
          {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "margin": "lg",
            "contents": [
              {
                "type": "box",
                "layout": "baseline",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": "Place",
                    "flex": 1,
                    "size": "sm",
                    "color": "#AAAAAA"
                  },
                  {
                    "type": "text",
                    "text": "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
                    "flex": 5,
                    "size": "sm",
                    "color": "#666666",
                    "wrap": true
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": "Time",
                    "flex": 1,
                    "size": "sm",
                    "color": "#AAAAAA"
                  },
                  {
                    "type": "text",
                    "text": "10:00 - 23:00",
                    "flex": 5,
                    "size": "sm",
                    "color": "#666666",
                    "wrap": true
                  }
                ]
              }
            ]
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "flex": 0,
        "spacing": "sm",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "uri",
              "label": "CALL",
              "uri": "https://linecorp.com"
            },
            "height": "sm",
            "style": "link"
          },
          {
            "type": "button",
            "action": {
              "type": "uri",
              "label": "WEBSITE",
              "uri": "https://linecorp.com"
            },
            "height": "sm",
            "style": "link"
          },
          {
            "type": "spacer",
            "size": "sm"
          }
        ]
      }
    }
  }
}";
                  
    	responseFromAPI.on("data", data => {
    	    body += data;
    	});
        responseFromAPI.on('end', () => {
            let movie = JSON.parse(body);         
            
            let hasil = JSON.parse(coba);                        
                           
                           
            let dataToSend = movieToSearch === 'The Godfather' ? 'I don\'t have the required info on that. Here\'s some info on \'The Godfather\' instead.\n' : '';
            dataToSend += movie.Title + ' is an ' +movie.Genre + ' movie, released in ' + movie.Year + '. It was directed by ' + movie.Director;

            return res.json({
                //speech: dataToSend,
                //displayText: dataToSend,
                speech: coba,
                displayText: coba,
                source: 'get-movie-details'
            });

        });
    }, (error) => {
        return res.json({
            speech: 'Something went wrong!',
            displayText: 'Something went wrong!',
            source: 'get-movie-details'
        });
    });
});

server.listen((process.env.PORT || 8081), function () {
    console.log("Server is up and running...");
});
