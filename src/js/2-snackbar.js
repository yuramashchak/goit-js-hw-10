import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let delay = 0;

const input_text = document.querySelector('.inputText')
const rejected = document.querySelector('[value="rejected"]');
const fulfilled = document.querySelector('[value="fulfilled"]');

const form = document.querySelector('.form');

const submitNewMessage = document.querySelector('.submitMessage')
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    createPromise(delay);
})
input_text.addEventListener('input', (e)=>{
    delay = Number(e.target.value)
})


function createPromise(delay) {
    const promise = new Promise((res, rej) => {
        setTimeout(()=>{
        if (rejected.checked) {
            rej(delay);
        } else {
            res(delay);
        }
        },delay)
        
    });

    promise
        .then(delay => {
            iziToast.success({
                title: "success",
                message: `✅ Fulfilled promise in ${delay}ms`,
            });
        })
        .catch(delay => {
            iziToast.error({
                title: "error",
                message: `❌ Rejected promise in ${delay}ms`,
            });
        });
}





