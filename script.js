function wyszukajKategorie() {
    const input = document.getElementById('search');
    const filter = input.value.toLowerCase();
    const categories = document.getElementById('categories');
    const category = categories.getElementsByClassName('category');

    for (let i = 0; i < category.length; i++) {
        const txtValue = category[i].textContent || category[i].innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            category[i].style.display = "";
        } else {
            category[i].style.display = "none";
        }
    }
}