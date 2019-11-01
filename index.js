var itemDraging;

(() => {
	var list_itens = document.getElementsByClassName('item-drag');
	for (var i = list_itens.length - 1; i >= 0; i--) {
		list_itens[i].draggable = true;

		if (list_itens[i].id == undefined || list_itens[i].id == null || list_itens[i].id == "") { list_itens[i].id = "randonid_" + parseInt(Math.random() * 10 * 10 * 1000 * 999999) }

		list_itens[i].ondragstart = (event) => { placeholderRemove(event); itemDraging = event.target; };
		list_itens[i].ondrop = dropItem;
	}

	var list_itens_drop_hire = document.getElementsByClassName('drop-here');
	for (var i = list_itens_drop_hire.length - 1; i >= 0; i--) {
		var element = list_itens_drop_hire[i];

		// Define um id random.
		if (element.id !== undefined || element.id !== null || element.id !== "") { element.id = "randonid_" + parseInt(Math.random() * 10 * 10 * 1000 * 999999) }


		element.ondragenter = placeholderInsert;

		element.ondragover = placeholderInsert;

		element.ondrop = dropItem;

	}
})();


function dropItem() {
	itemDraging.classList.remove("placeholder-drag");
	itemDraging.style.opacity = 1;
}


function placeholderInsert(eventDrag) {
	eventDrag.preventDefault();

	if (eventDrag.target.parentNode.getElementsByClassName('placeholder-drag').length > 1) {
		return;
	}


	if (eventDrag.target.classList.contains("drop-here")) {

		placeholderRemove();

		itemDraging.classList.add("placeholder-drag");
		itemDraging.style.opacity = 0.5;

		eventDrag.target.appendChild(itemDraging);

	} else if (eventDrag.target.parentNode.classList.contains("drop-here")) {

		itemDraging.classList.add("placeholder-drag");
		itemDraging.style.opacity = 0.5;


		if (eventDrag.target.classList.contains("item-drag") && !eventDrag.target.classList.contains("placeholder-drag")) {

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
	var itens = document.getElementsByClassName('placeholder-drag');
	if (itens.length > 0) {
		for (var i = 0; i < itens.length; i++) {
			itens[i].parentNode.removeChild(itens[i]);
		}
	}
}