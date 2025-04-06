using UnityEngine;
using TMPro;

public class OutputTextUpdater : MonoBehaviour
{
    [SerializeField] TMP_Text[] speechOptions;

    public void AddNewOption(string option)
    {
        for (int i = speechOptions.Length - 1; i > 0; i--)
        {
            speechOptions[i].text = speechOptions[i-1].text;
        }
        
        speechOptions[0].text = $"💡\ud83d\udca1 {option}";
    }
}
