//@input SceneObject bottomOuts
//@input SceneObject topOuts

function JSONJobDistributer(requestedJSON) {
  let JsonObj = JSON.parse(requestedJSON);

  // prettier-ignore
  let topInfo = {
    "emotion": JsonObj.emotion,
    "topic": JsonObj.topic
    };

  // prettier-ignore
  let bottomOption = JsonObj.option

  return [topInfo, bottomOption];
}

function UpdateOutputUI() {
  // TODO: Request for an JSON
  let url = "";
  let dummyJSON =
    '{"emotion":"happy", "topic": null, "option":"kurwa"}';

  let array = JSONJobDistributer(dummyJSON);
    let topInfoJSON = array[0];
    let bottomOption = array[1];

    print('\n\n\n\n' . topInfoJSON);
  let bottomOutsComponent = script.bottomOuts.getComponent(
    "Component.ScriptComponent"
  );
  if (bottomOutsComponent) {
      bottomOutsComponent.api.SetDialogOptions(bottomOption);
  } else {
    print("⚠️ SetDialogOptions() not found or not exposed on bottomOuts");
    print(bottomOutsComponent);
  }

//   bottomOutsComponent.api.SetDialogOptions("text");
//   bottomOutsComponent.api.SetDialogOptions("Suka");

  let topOutsComponent = script.topOuts.getComponent(
    "Component.ScriptComponent"
  );
  if (topOutsComponent) {
    topOutsComponent.api.SetInfoUI(topInfoJSON);
  } else {
    print("⚠️ SetDialogOptions() not found or not exposed on topOuts");
    print(topOutsComponent);
  }
}

script.createEvent("OnStartEvent").bind(UpdateOutputUI);
