
var item = null;
var containerOneDetails=[];
var containerThreeDetails =[];
var totalDropItems = [{
	type:'container one',
	Data:[]
},
{type:'container 3',
Data:[]}]
var itemDetails = JSON.parse(itemList);
window.onload = function() {
 
 loadDefault();
};

function loadDefault(){
	var containerTwo = document.getElementById('containerTwo');
 var containerFour = document.getElementById('containerFour');
	 var generateDynamicHtml = "";
  for(var i = 0; i < itemDetails.length; i++) {
    generateDynamicHtml += '<li data-draggable="item" draggable="true" ondragstart="drag(event,'+itemDetails[i].id+')">'+itemDetails[i].itemName+'</li>';
  }
  containerTwo.innerHTML = generateDynamicHtml;
  containerFour.innerHTML = generateDynamicHtml;
}
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev, id) {
		var selectedItem = itemDetails.filter(item=>{
		return item.id === id;
	})[0];

   ev.dataTransfer.setData('selectedItem', JSON.stringify(selectedItem));
   ev.dataTransfer.setData('draggingElement', ev.target.parentElement.getAttribute('drop-contain'));
}

function drop(ev) {
   	if(ev.target.getAttribute('data-draggable') === 'target' 
   		&& ev.target.getAttribute('container-type') === ev.dataTransfer.getData('draggingElement'))
		{

			let selectedItem = JSON.parse(ev.dataTransfer.getData('selectedItem'));
			if(isItemExists(ev,selectedItem)){
			addItem(ev,selectedItem);
			var innerLi = document.createElement('li');
			innerLi.className = 'pd2'
			innerLi.innerHTML='<span>'+selectedItem.itemName+'</span>';
			ev.target.appendChild(innerLi);
			ev.preventDefault();
		}
		}
	
}	
function isItemExists(ev, selectedItem) {

let selectedContanier = [...containerOneDetails,...containerThreeDetails];
let itemsExists = (selectedContanier.filter(item=>{
	return item.id === selectedItem.id;
})).length === 0 ? true:false;
return itemsExists;
}
function addItem(ev,selectedItem){
		switch(ev.target.getAttribute('container-type')){
			case 'containerOne':{
				containerOneDetails = [...containerOneDetails,selectedItem];
				totalDropItems[0].Data = containerOneDetails;
				break;
			}
			case 'containerThree':
			containerThreeDetails = [...containerThreeDetails,selectedItem];
			totalDropItems[1].Data = containerThreeDetails;
			break;
		}
		let output = document.getElementById('output');
		output.innerHTML = JSON.stringify(totalDropItems);

}


