// define variables for all the necessary elements
let mode_btn = document.getElementById("mode_btn");
let text = document.getElementsByClassName("text");
let bg = document.getElementsByClassName("bg");
let save_btn = document.getElementById("save_btn");
let title = document.getElementById("title");
let content = document.getElementById("content");
let category = document.getElementById("category");
let date = document.getElementById("date");
let alert_empty = document.getElementById("alert");
let notes = document.getElementById("notes");
let search_btn = document.getElementById("search_btn");
let search_box = document.getElementById("search_box");

// define classnames needed for dark and light modes
const light_bg = 'bg-light';
const dark_bg = 'bg-dark';
const light_text = 'text-light';
const dark_text = 'text-dark';
const light_mode = document.createTextNode('Switch to Light Mode');
const dark_mode = document.createTextNode('Switch to Dark Mode');

// intialize to dark mode
for (const e of bg) {
    e.classList.add(dark_bg)
}
for (const e of text) {
    e.classList.add(light_text)
}
mode_btn.appendChild(light_mode)

// toggle between dark and light mode
mode_btn.addEventListener("click", () => {
    if (bg[0].classList.contains(dark_bg)) {
        for (const e of bg) {
            e.classList.remove(dark_bg)
            e.classList.add(light_bg)
        }
        for (const e of text) {
            e.classList.remove(light_text)
            e.classList.add(dark_text)
        }
        mode_btn.removeChild(light_mode)
        mode_btn.appendChild(dark_mode)
    }
    else {
        for (const e of bg) {
            e.classList.remove(light_bg)
            e.classList.add(dark_bg)
        }
        for (const e of text) {
            e.classList.remove(dark_text)
            e.classList.add(light_text)
        }
        mode_btn.removeChild(dark_mode)
        mode_btn.appendChild(light_mode)
    }
});

// save the notes upon clicking a save notes button
save_btn.addEventListener("click", () => {
    if (content.value.length === 0) {
        alert_empty.innerHTML = `<div class="alert alert-danger alert-dismissible" role="alert">
        Content field should not be empty <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
        setTimeout(() => alert_empty.innerHTML = ``, 3000)
    }
    else {
        if (title.value.length === 0) {
            title.value = "Set Title Here.."
        }
    }
})

search_btn.addEventListener("click", (e) => {
    e.preventDefault();
    let searched_value = search_box.value.toLowerCase();
    
    // start searching only user has entered some text to search
    if (searched_value != "") {
        let cards = document.getElementsByClassName("card"); // cards is an object
        // get the card element one by one
        // Array.from() creates a new array instance from an array-like object or iterable object
        Array.from(cards).forEach(function (element) {

            let h5 = element.getElementsByTagName("h5")[0];
            let p = element.getElementsByTagName("p")[0];
            let h5Text = h5.innerText.toLowerCase();
            let pText = p.innerText.toLowerCase();
            let h5Html = h5.innerHTML;
            let pHtml = p.innerHTML;    

            // display the note cards which contain the searched text either in their title or content
            if (h5Text.includes(searched_value) || pText.includes(searched_value)) {
                element.style.display = "block";
                let newText = new RegExp(searched_value, "gi");

                // temporarily highlight the text that matched with the searched value
                element.getElementsByTagName("h5")[0].innerHTML = h5Html.replace(newText, `<span style="color:red">${searched_value}</span>`)
                element.getElementsByTagName("p")[0].innerHTML = pHtml.replace(newText, `<span style="color:red">${searched_value}</span>`)
            }
            else {
                element.style.display = "none";
            }
        })
    }
    search_box.value='';
})
