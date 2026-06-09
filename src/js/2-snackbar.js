import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let delay = 0;

const form = document.querySelector('.form');
form.addEventListener('submit', (e)=>{
    e.preventDefault();

    delay = Number(e.target.elements.delay.value);
    const state = e.target.elements.state.value;

    createPromise(delay, state);
})



function createPromise(delay, state) {
    const promise = new Promise((res, rej) => {
        setTimeout(()=>{
        if (state === 'rejected') {
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





