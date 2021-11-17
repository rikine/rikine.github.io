const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",
});

function sendEmail() {
    let new_line_char = "%0D%0A";
    let subject = document.getElementById("title").value;
    let name = document.getElementById("from_user").value;
    let msg = document.getElementById("text").value.replaceAll("\n", new_line_char);
    let body = `Hello from ${name}!${new_line_char}${msg}`;

    if (!msg || !name || !body) {
        iziToast.show({
            title: 'Did you make a mistake?',
            message: 'Please, enter all the information. I can understand what you want to say only from your message.',
            color: "red",
            layout: "2"
        });
        return;
    }

    iziToast.show({
        title: 'In process...',
        message: 'Redirecting to your email client...',
        color: "yellow"
    });

    window.open(`mailto:nikitos3046@yandex.ru?subject=${subject}&body=${body}`);
    myModal.close();

    setTimeout(() => {
        iziToast.show({
            title: "Success!",
            message: "Message is in your email client!",
            color: "green"
        });
    }, 2000);
}

document.querySelector(".send_btn").onclick = sendEmail

iziToast.settings({
    closeOnEscape: true,
    closeOnClick: true,
    transitionIn: 'bounceInLeft',
    transitionOut: 'flipOutX'
});