(() => {
    const App = {
        htmlElements: {
            output: document.querySelector('#output'),
            number: document.querySelector('#number'),
            sequenceBtn: document.querySelector('#sequenceBtn'),
        },
        templates: {
            createCard: (id, number) => {
                return `<div class="card" id="card-to-animate#${id}">${number}<div>`
            }
        },
        states: {
            animating: false,
        },
        init: () => {
            App.htmlElements.sequenceBtn.addEventListener('click', App.events.onSequenceBtnPressed);
            // console.log(App.methods.createFibonacciSequence(10))

        },
        events: {
            onSequenceBtnPressed: async (e) => {
                e.preventDefault();
                //empty/reset
                // if(App.states.animating) return;//we could stop this if it's already animating.
                if (App.states.animating) {
                    App.states.animating = false;
                    await App.methods.delay(50);//wait for the animation to finish on other instances
                }

                App.htmlElements.output.innerHTML = "";

                // check
                if (isNaN(App.htmlElements.number.value))
                    return alert("Not a valid number")
                iterations = Number(App.htmlElements.number.value);

                //create seq
                const sequence = App.methods.createFibonacciSequence(iterations);
                //add sequence to dom
                for (let i = 0; i < sequence.length; i++) {
                    App.htmlElements.output.innerHTML += App.templates.createCard(i, sequence[i]);
                }

                //add events to cards
                const cards = document.querySelectorAll('.card');
                for (let i = 0; i < cards.length; i++) {
                    cards[i].addEventListener('click', App.events.onCardClicked);
                }

                //animate sequence
                App.states.animating = true;
                for (let i = 0; i < sequence.length; i++) {
                    if (!App.states.animating)
                        return;

                    document.getElementById(`card-to-animate#${i}`).classList.add('card-animation');
                    await App.methods.delay(50);
                }

                //end
                console.log("Sequence: ", sequence, " finished")
            },
            onCardClicked: (e) => {
                //show alert to delete the card
                if (confirm("Delete card"))
                    //animate removal?
                    e.target.remove();
            }
        },
        methods: {
            delay: (ms) => {
                return new Promise(resolve => setTimeout(resolve, ms));
            },
            createFibonacciSequence: (iterations) => {
                //always start with 0 and 1
                let fibonacciArray = [0, 1]

                for (let i = 0; i < iterations - 2; i++) {
                    fibonacciArray.push(fibonacciArray[i] + fibonacciArray[i + 1])
                    console.log(fibonacciArray[i] + fibonacciArray[i + 1])
                }
                //return the amount requested of fibo nums
                return fibonacciArray.slice(0, iterations)
            }
        },
    }
    App.init();
})()