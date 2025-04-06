using System;
using UnityEngine;
using Newtonsoft.Json;
using UnityEngine.Networking;
using System.Collections;


[System.Serializable]
public struct JSONData
{
    public string emotion;
    public string topic;
    public string option;
}
public class JsonPasser : MonoBehaviour
{
    [SerializeField] private Transform speechOptions;
    [SerializeField] private Transform additionalIndicators;
    private OutputTextUpdater speechOptionsHandler;
    private IndicationsHandler additionalIndicatorsHandler;

    private string apiUrl;
    
    private void Start()
    {
        speechOptionsHandler = speechOptions.GetComponent<OutputTextUpdater>();
        additionalIndicatorsHandler = additionalIndicators.GetComponent<IndicationsHandler>();
        
        StartCoroutine(RequestJsonFromAPI());
    }

    public static JSONData ParseMyJson(string jsonString)
    {
        return JsonConvert.DeserializeObject<JSONData>(jsonString);
    }

    IEnumerator RequestJsonFromAPI()
    {
        UnityWebRequest request = UnityWebRequest.Get(apiUrl);
        request.SetRequestHeader("Content-Type", "application/json");

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
        {
            string jsonResponse = request.downloadHandler.text;
            UpdateOutputUI(jsonResponse);
        }
        else
        {
            Debug.LogError("API Error: " + request.error);
        }
    }
    
    public void UpdateOutputUI(string json)
    {
        // string json = "{\"emotion\":\"Happy\",\"topic\":\"Games\",\"option\":\"Play\"}";
        JSONData data = JsonPasser.ParseMyJson(json);

        speechOptionsHandler.AddNewOption(data.option);
        
        additionalIndicatorsHandler.SetEmotion(data.emotion);
        additionalIndicatorsHandler.SetTopic(data.topic);
    }

    
    // void Update()
    // {
    //     if (Input.GetKeyDown(KeyCode.B))
    //     {
    //         UpdateOutputUI("{\"emotion\":\"Happy\",\"topic\":\"Games\",\"option\":\"Play\"}");
    //     }else if (Input.GetKeyDown(KeyCode.N))
    //     {
    //         UpdateOutputUI("{\"emotion\":\"Sad\",\"topic\":\"hungry\",\"option\":\"heagsagesagfhdcbveatwrhdgxbcvs aearstgfscxzde\"}");
    //     }
    // }
}

