

import {refreshDOM,hide,show,formCreateQuiz} from '../utils/domutils';

// displayQuiz
function displayQuiz() {
    let URL = "http://localhost:80/api/quize";
    axios.get(URL)
        .then((response) => {
            let quizes = response.data;
            refreshDOM(quizes);
        })
}
// function deleteQuiz
function toDeleteQuiz(e){
    console.log(container);
    e.preventDefault();
    if(e.target.dataset.delete ==="delete"){
        console.log("quiz deleted");
        let isConfirmed = confirm("Are you sure to delete this Quiz?");
        if(isConfirmed){
            let id = e.target.parentNode.parentNode.id;
            let URL = "/api/quize/" + id;
            axios.delete(URL)
            .then((response) =>{
                console.log("quiz deleted");
            })
        }
    }
    displayQuiz();
}


displayQuiz();
let container = document.getElementById('container');
container.addEventListener('click',toDeleteQuiz);
