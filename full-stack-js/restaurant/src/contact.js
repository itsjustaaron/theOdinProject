export default function renderContact() {
    const container = document.querySelector('#content');
    const restaurant = document.createElement('div');
    restaurant.classList.add('restaurant');

    const contactTitle = document.createElement('h2');
    contactTitle.classList.add('restaurant__contact__heading');
    contactTitle.textContent = '(Please Don\'t) Contact Us';
    restaurant.appendChild(contactTitle);

    const contactInfo = document.createElement('div');
    contactInfo.classList.add('restaurant__contact__info');
    // rest of contact info
    restaurant.appendChild(contactInfo);

    return restaurant;
}