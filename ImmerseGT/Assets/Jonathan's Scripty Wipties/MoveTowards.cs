using Unity.VisualScripting;
using UnityEngine;

public class MoveTowards : MonoBehaviour
{
    [SerializeField] private Transform target;
    [SerializeField] private float speed;
    [SerializeField] private float minDistanceDiff;
    
    private bool isStationary = true;
    // Update is called once per frame
    void Update()
    {
        float distance = Vector3.Distance(transform.position, target.position);

        if (distance < minDistanceDiff && isStationary) return;
        
        float dynamicSpeed = speed * Mathf.Clamp(distance, 0.0f, 10f);
        transform.position = Vector3.MoveTowards(transform.position, target.position, dynamicSpeed * Time.deltaTime);
        isStationary = false;
        
        if (!isStationary && distance < 0.001f) isStationary = true;
    }
}
