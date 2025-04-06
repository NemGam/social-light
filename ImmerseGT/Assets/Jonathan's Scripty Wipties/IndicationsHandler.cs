using UnityEngine;
using TMPro;

public class IndicationsHandler : MonoBehaviour
{
    [SerializeField] TMP_Text emotionsText;
    [SerializeField] TMP_Text topicText;

    public void SetEmotion(string emotion)
    {
        emotionsText.text = emotion;
    }


    public void SetTopic(string topic)
    {
        topicText.text = topic;
    }
}
