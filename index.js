var classNameItemDrag = 'item-drag';
var classNameDropHere = 'drop-here';
var classNameItemPlaceholder = 'placeholder-drag';

var itemDraging;
(() => {
	var list_itens = document.getElementsByClassName(classNameItemDrag);
	for (var i = list_itens.length - 1; i >= 0; i--) {
		list_itens[i].draggable = true;

		list_itens[i].ondragstart = (event) => { placeholderRemove(event); itemDraging = event.target; };
		list_itens[i].ondragend = () => { dropItem(); };
	}

	var list_itens_drop_hire = document.getElementsByClassName(classNameDropHere);
	for (var i = list_itens_drop_hire.length - 1; i >= 0; i--) {
		var element = list_itens_drop_hire[i];

		element.ondragenter = placeholderInsert;

		element.ondragover = placeholderInsert;
	}
})();

function dropItem() {
	itemDraging.classList.remove(classNameItemPlaceholder);
	itemDraging.style.opacity = 1;
}

function placeholderInsert(eventDrag) {
	eventDrag.preventDefault();

	if (eventDrag.target.parentNode.getElementsByClassName(classNameItemPlaceholder).length > 1) {
		return;
	}


	if (eventDrag.target.classList.contains(classNameDropHere)) {

		placeholderRemove();

		itemDraging.classList.add(classNameItemPlaceholder);
		itemDraging.style.opacity = 0.5;

		eventDrag.target.appendChild(itemDraging);

	} else if (eventDrag.target.parentNode.classList.contains(classNameDropHere)) {

		itemDraging.classList.add(classNameItemPlaceholder);
		itemDraging.style.opacity = 0.5;


		if (eventDrag.target.classList.contains(classNameItemDrag) && !eventDrag.target.classList.contains(classNameItemPlaceholder)) {

			placeholderRemove();

			if ((window.event.clientY - eventDrag.target.offsetTop) <= (eventDrag.target.clientHeight / 2)) {

				eventDrag.target.insertAdjacentElement("beforebegin", itemDraging);

			} else {

				eventDrag.target.insertAdjacentElement("afterend", itemDraging);

			}
		}
	}
}

// Remove o placeholder da tela!
function placeholderRemove() {
	var itens = document.getElementsByClassName(classNameItemPlaceholder);
	if (itens.length > 0) {
		for (var i = 0; i < itens.length; i++) {
			itens[i].parentNode.removeChild(itens[i]);
		}
	}
}
