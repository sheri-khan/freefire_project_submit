document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    const submitButton = form.querySelector('button[type="button"]');

    submitButton.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const freeFireId = document.getElementById('free fire id').value;
        const email = document.getElementById('email').value;

        // Validate form fields
        if (!name || !freeFireId || !email) {
            alert('Please fill out all fields.');
            return;
        }

        const formData = {
            name: name,
            freeFireId: freeFireId,
            email: email
        };

        fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            alert('Form submitted successfully!');
            form.reset(); // Reset form fields after submission
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to submit the form.');
        });
    });
});
