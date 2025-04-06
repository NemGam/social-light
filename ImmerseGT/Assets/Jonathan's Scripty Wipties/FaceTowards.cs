using UnityEngine;

public class FaceTowards : MonoBehaviour
{
    [SerializeField]private Transform target;
    [SerializeField] bool faceAway = false;
    // Update is called once per frame
    void Update()
    {
        Vector3 direction = target.forward;
        if (faceAway)
            direction = -direction;
        
        transform.rotation = Quaternion.LookRotation(direction);
    }
}
