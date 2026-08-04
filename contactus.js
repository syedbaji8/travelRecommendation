
const contactForm = document.getElementById('contactForm')
const contactSubmitButton = document.getElementById('contactSubmitButton')

contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    try {
        if (name === '' || email === '' || message === '') {
            throw new Error('Please fill all fields')
        }
    } catch (error) {
        alert(error.message)
    }
})