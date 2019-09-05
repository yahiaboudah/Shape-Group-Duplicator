/* The duplicator script allows you to duplicate 
shape layer groups as many times as you like. */

var win = new Window("palette"); 
    win.text = "Duplicator"; 
    win.orientation = "column"; 
    win.alignChildren = ["center","top"]; 
    win.spacing = 10; 
    win.margins = 16; 

// LAYERGROUP
// ==========
var layerGroup = win.add("group", undefined, {name: "layerGroup"}); 
    layerGroup.orientation = "row"; 
    layerGroup.alignChildren = ["left","center"]; 
    layerGroup.spacing = 10; 
    layerGroup.margins = 0; 

var statictext1 = layerGroup.add("statictext", undefined, undefined, {name: "statictext1"}); 
    statictext1.text = "Layer"; 

var layerList_array = ["item1","item2","item3","item4","item5","item6","item7"]; 
var layerList = layerGroup.add("dropdownlist", undefined, undefined, {name: "layerList", items: layerList_array}); 
    layerList.selection = 0; 

// GROUPGROUP
// ==========
var groupGroup = win.add("group", undefined, {name: "groupGroup"}); 
    groupGroup.orientation = "row"; 
    groupGroup.alignChildren = ["left","center"]; 
    groupGroup.spacing = 10; 
    groupGroup.margins = 0; 

var statictext2 = groupGroup.add("statictext", undefined, undefined, {name: "statictext2"}); 
    statictext2.text = "Group"; 

var groupList_array = ["Item 1","-","Item 2"]; 
var groupList = groupGroup.add("dropdownlist", undefined, undefined, {name: "groupList", items: groupList_array}); 
    groupList.selection = 0; 

// WIN
// ===
var refreshButton = win.add("button", undefined, undefined, {name: "refreshButton"}); 
    refreshButton.text = "Refresh"; 

var duplicateButton = win.add("button", undefined, undefined, {name: "duplicateButton"}); 
    duplicateButton.text = "Duplicate"; 

win.center();
win.show();

groupGroup.enabled = true;

function enableGroupList(){
    if(layerList.selection.text == "item7"){
        groupGroup.enabled = true;
    }else{
        if(groupGroup.enabled){
            groupGroup.enabled = false;
        }
    }
}

function populateGroupList(){
    layer = app.project.activeItem.layers.byName(layerList.selection.text);
    if(layer == null){
        alert("Found no layer with name: "+layerList.selection.text);
        groupGroup.enabled = false;
        return;
    }
    groupGroup.enabled = true;
    groupList.removeAll();
    groupNames = getGroupNames(layer);
    for(var i=0;i<groupNames.length;i++){
        groupList.add("item",groupNames[i]);
    }
    groupList.selection = 0;
}

function duplicateGroup(layerName,propertyName){
    app.project.activeItem.layers.byName(layerName).property("Contents").property(propertyName).duplicate();
}

function getLayersNamesList(){
    var comp = app.project.activeItem;
    listOfNames = [];
    for(var i=1;i<comp.layers.length+1;i++){
        listOfNames[listOfNames.length] = comp.layer(i).name;
    }
    return listOfNames;
}

function getGroupNames(layer){
    listOfGroupNames = [];
    for(var i=1;i<layer.property("Contents").numProperties+1;i++){
      groupName = layer.property("Contents").property(i).name;
      listOfGroupNames[listOfGroupNames.length] = groupName;          
    }
    return listOfGroupNames;
}

layerList.onChange = populateGroupList;

duplicateButton.onClick = function(){
    duplicateGroup(layerList.selection.text,groupList.selection.text);
}

refreshButton.onClick = function(){
    compLayersNames = getLayersNamesList();
    layerList.removeAll();
    groupList.removeAll();
    for(var i=0;i<compLayersNames.length;i++){
        layerList.add("item",compLayersNames[i]);
    }
    layerList.selection = 0;
}
