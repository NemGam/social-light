//@input Component.Text option1Txt
//@input Component.Text option2Txt
//@input Component.Text option3Txt

let options = []
let i = 0

function SetDialogOptions (option){
    if(options.length < 3)
    {
        options.push(option)
        updateComponent(i)
    }
    else
    {
        options[i] = option
        updateComponent(i)
    }

    i = (i + 1) % 3 

    /*
    let dialog1 = infoJSON.option1;
    let dialog2 = infoJSON.option2;
    let dialog3 = infoJSON.option3;
    
    script.option1Txt.text = dialog1 != null ? dialog1 : "Waiting for context..."; 
    script.option2Txt.text = dialog2 != null ? dialog2 : "Waiting for context..."; 
    script.option3Txt.text = dialog3 != null ? dialog3 : "Waiting for context..."; 
    */
}

function updateComponent(componentId)
{
    switch (componentId) {
        case 0:
            script.option1Txt.text = options[0] != null ? `💡${options[0]}` : "💡Waiting for context..."; 
            break;
        case 1:
            script.option2Txt.text = options[1] != null ? `💡${options[1]}` : "💡Waiting for context...";           
            break;
        case 2:
            script.option3Txt.text = options[2] != null ? `💡${options[2]}` : "💡Waiting for context..."; 
            break;
        
        default:
            break;
          
      }
}

script.api.SetDialogOptions = SetDialogOptions;
