function toggleEdit(id){
    const poke_input_el = document.getElementById(`pokemon_input_${id}`)
    const poke_edit_el = document.getElementById(`pokemon_edit_${id}`); 
    if(poke_edit_el.innerHTML.toLowerCase() == "save") {
        poke_input_el.setAttribute("readonly", "readonly");
        poke_edit_el.innerHTML = "Edit";
    } else {
        poke_input_el.removeAttribute("readonly");
        poke_input_el.focus();
        poke_edit_el.innerText = "Save";
    }
}
function deleteInput(id){
    const list_el = document.querySelector("#pokemons");
    const pokemon_child = document.getElementById(`pokemon_${id}`);
    list_el.removeChild(pokemon_child);
}