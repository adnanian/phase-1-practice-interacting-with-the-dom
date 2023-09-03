document.addEventListener('DOMContentLoaded', () => {
    // Initialize Needed Variables
    const counter = document.getElementById('counter');
    const LIKED_PREDICATE = 'has been liked ';

    // See the timer increment every second once the page has loaded.
    let counterInterval = setInterval(countUp, 1000);

    // Manually increment and decrement the counter using the plus and minus buttons
    document.getElementById('minus').addEventListener('click', countDown);
    document.getElementById('plus').addEventListener('click', countUp);

    /*
     * "Like" an individual number of the counter. I should see the count of the number 
     * of "likes" associated with that number displayed.
    */
    document.getElementById('heart').addEventListener('click', () => {
        let number = counter.textContent;
        let numberItem = document.getElementById(`like-${number}`);
        if (!!number) {
            let likeCounter = Number.parseInt(
                numberItem.textContent.slice(
                    numberItem.textContent.indexOf(LIKED_PREDICATE) + LIKED_PREDICATE.length,
                    numberItem.textContent.indexOf(' time')
                )
            );
            likeCounter++;
            numberItem.textContent = `${number} ${LIKED_PREDICATE}${likeCounter} time.`;
        } else {
            numberItem = document.createElement('li');
            numberItem.setAttribute('id', `like-${number}`);
            numberItem.textContent = `${number} ${LIKED_PREDICATE}1 time.`;
            document.querySelector('.likes').appendChild(numberItem);
        }
    });

    /*
     * - Pause the counter, which should:
     *   - pause the counter
     *   - disable all buttons except the pause button
     *   - switch the label on the button from "pause" to "resume"
     * - Click the "resume" button to restart the counter and re-enable the buttons.
    */
    document.getElementById('pause').addEventListener('click', (event) => {
        switch (event.target.textContent) {
            case ' pause ':
                clearInterval(counterInterval);
                document.getElementById('minus').ariaDisabled = true;
                document.getElementById('plus').ariaDisabled = true;
                document.getElementById('like').ariaDisabled = true;
                event.target.textContent = ' resume ';
                break;
            case ' resume ':
                document.getElementById('minus').ariaDisabled = false;
                document.getElementById('plus').ariaDisabled = false;
                document.getElementById('like').ariaDisabled = false;
                event.target.textContent = ' pause ';
                counterInterval = setInterval(countUp, 1000);
                break;
            default:
                break;
        }
    });

    // Leave comments on my gameplay, such as: "Wow, what a fun game this is."
    document.getElementById('comment-form').addEventListener('submit', (event) => {
        event.preventDefault();
        let comment = event.target.querySelector('#comment-input').value;
        let paragraphElement = document.createElement('p');
        paragraphElement.textContent = comment;
        document.getElementById('list').appendChild(paragraphElement);
        event.target.querySelector('#comment-input').value = "";
    });

    function countUp() {
        counter.textContent = Number.parseInt(counter.textContent) + 1;
    }

    function countDown() {
        counter.textContent = Number.parseInt(counter.textContent) - 1;
    }

});



