import Cafe from './cafe-photo.jpeg';

export default function renderRestaurant() {
    const container = document.querySelector('#content');
    const restaurant = document.createElement('div');
    restaurant.classList.add('restaurant');

    const restaurantImg = new Image();
    restaurantImg.src = Cafe;
    restaurantImg.classList.add('restaurant__hero');
    restaurant.appendChild(restaurantImg);

    const restaurantContent = document.createElement('div');
    restaurantContent.classList.add('restaurant__content');

    const restaurantHeading = document.createElement('h2');
    restaurantHeading.classList.add('restaurant__content__heading');
    restaurantHeading.textContent = 'Restaurant Name';
    restaurantContent.appendChild(restaurantHeading);

    const restaurantCopy = document.createElement('p');
    restaurantCopy.classList.add('restaurant__content__copy');
    restaurantCopy.textContent = 'Details about the restaurant.';
    restaurantContent.appendChild(restaurantCopy);

    restaurant.appendChild(restaurantContent);

    container.appendChild(restaurant);
}