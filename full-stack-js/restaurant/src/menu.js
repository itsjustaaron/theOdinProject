export default function renderMenu() {
    const container = document.querySelector('#content');
    const restaurant = document.createElement('div');
    restaurant.classList.add('restaurant');

    // rest of menu

    container.appendChild(restaurant);
}