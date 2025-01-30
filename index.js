function run() {
    const show_list = document.getElementById('list');
    const add_text = document.getElementById('addtext');
    if (add_text.value == "") {
        alert("no information");
        return;
    }
    const ul_list = document.createElement('li');
    ul_list.textContent = add_text.value;
    ul_list.classList.add('fade-in');


    ul_list.onclick = function () {
        ul_list.classList.add('fade-out');
        ul_list.addEventListener('animationend', function () {
            show_list.removeChild(ul_list);
        });
    };

    show_list.appendChild(ul_list);
    add_text.value = '';
}

