const T = require("./Twit.js");
const my_user_name = require("../config").userName;
const timeout = 1000 * 60 * 5; // timeout to send the message 5 min

const AutoDM = () => {
  const stream = T.stream("user");
  console.log("Start Sending Auto Direct Message 🚀🚀🚀");
  stream.on("follow", SendMessage);
  stream.on('direct_message',onDirectMessage);
};

const onDirectMessage = msg => {
	var dm = msg.direct_message.text;
	const screen_name = msg.direct_message.sender.screen_name;
	console.log("SN: "+msg.direct_message.sender.screen_name + "/ "+msg.direct_message.sender.id_str);
	
	console.log(msg.direct_message);
   
  const obj = {
  "event": {
    "type": "message_create",
    "message_create": {
      "target": { "recipient_id": msg.direct_message.sender.id_str }, 
	  "message_data": { 
	  	"text": "Restaurantes frias inc:",
		"ctas": [
          {
            "type": "web_url",
            "label": "Tacos Don Vic",
            "url": "http://dutchmonaco.com"
          },
          {
            "type": "web_url",
            "label": "Jochos El Vitor",
            "url": "http://dutchmonaco.com"
          },
          {
            "type": "web_url",
            "label": "Pozole frias",
            "url": "http://dutchmonaco.com"
          }
        ] 
		
		}
    }
  }
};
  
	if(dm=="menu"){ 
	  T.post("direct_messages/events/new", obj)
        .catch(err => {
          console.error("error", err.stack);
        })
        .then(result => {
          console.log("Message sent successfully To  ${screen_name}");
        });
	}
};

const SendMessage = user => {
  console.log("Hello!!");
  const { screen_name, name } = user.source;
   
  const obj = {
    screen_name,
    text: GenerateMessage(name)
  };
  // the follow stream track if I follow author person too.
  if (screen_name != my_user_name) {
    console.log(" 🎉🎉🎉🎉 New Follower  🎉🎉🎉🎉🎉 ");
      T.post("direct_messages/new", obj)
        .catch(err => {
			console.log(err);
          console.error("error", err.stack);
        })
        .then(result => {
          console.log("Message sent successfully To  ${screen_name}");
        });
  }
};
const GenerateMessage = name => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const d = new Date();
  const dayName = days[d.getDay()];
  return `Hi ${name} Thanks for .... \n Happy ${dayName} 😊😊 `; // your message
  // My message   return `Hi ${name} Thanks for being a part of my social media network. I'am the @PicsrushE founder,A new Online Image Editor completely with web technologies,I'm also a reactjs developer and medium blogger.\n Happy to discuss anytime 😊  \n Happy ${dayName} 😊😊 `;
};

module.exports = AutoDM;
