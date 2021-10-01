export default function renderMenu() {
    const menu = [
        { name: 'Menu Option', description: 'A small description about the menu item', price: '$2.99' },
        { name: 'Menu Option', description: 'A small description about the menu item', price: '$2.99' },
        { name: 'Menu Option', description: 'A small description about the menu item', price: '$2.99' },
        { name: 'Menu Option', description: 'A small description about the menu item', price: '$2.99' },
    ];

    const container = document.querySelector('#content');
    const restaurant = document.createElement('div');
    restaurant.classList.add('restaurant');

    const menuTitle = document.createElement('h2');
    menuTitle.classList.add('restaurant__menu__heading');
    menuTitle.textContent = 'Restaurant Name';
    restaurant.appendChild(menuTitle);

    menu.forEach(item => {
        const { name, description, price } = item;
        const menuItem = document.createElement('div');
        menuItem.classList.add('restaurant__menu__item');
        menuItem.innerHTML = `
            <p class="restaurant__menu__item--primary">${name}<span class="restaurant__menu__item--price">${price}</span></p>
            <p class="restaurant__menu__item--secondary">${description}</p>
        `;
        restaurant.appendChild(menuItem);
    });

    return restaurant;
}