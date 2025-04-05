//@input Component.Text emotionEmoji
//@input Component.Text topicTxt

function SetInfoUI (infoJSON){
    let emotion = infoJSON.emotion;
    let topic = infoJSON.topic;
    
    script.emotionEmoji.text = emotion != null ? emotion : "🫥"; 
    script.topicTxt.text = topic != null ? topic : "No detected topic"; 
}
script.api.SetInfoUI = SetInfoUI;
