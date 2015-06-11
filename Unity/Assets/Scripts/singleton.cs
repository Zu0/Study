using UnityEngine;
using System.Collections;

public class singleton<TypeName> : MonoBehaviour where TypeName : MonoBehaviour
{
	private static TypeName instance = null;
	private static object _lock = new object();
	
	public static TypeName Instance
	{
		get
		{
			if (isQuitting)
			{
				Debug.LogWarning("Instance Already Destroy: ("+ typeof(TypeName) + ")");
				return null;
			}
			
			lock (_lock)
			{
				if (instance == null)
				{
					instance = (TypeName) FindObjectOfType(typeof(TypeName));
					
					if ( FindObjectsOfType(typeof(TypeName)).Length > 1 )
					{
						//singleton must has one instance.
						Debug.LogError("Singleton is not multiple-instance.");
						return instance;
					}
					
					if (instance == null)
					{
						GameObject singleton = new GameObject();
						instance = singleton.AddComponent<TypeName>();
						singleton.name = "(singleton)(" + typeof(TypeName).ToString() + ")";
						DontDestroyOnLoad(singleton);
						Debug.Log ("Create " + typeof(TypeName).ToString());
						
					}
					else
					{
						Debug.Log ("Already Created:" + typeof(TypeName));
					}
				}
				
				return instance;
			}
		}
	}
	
	private static bool isQuitting = false;
	public void OnDestroy(){
		isQuitting = true;
	}
}
