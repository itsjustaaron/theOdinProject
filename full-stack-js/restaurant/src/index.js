import renderRestaurant from './restaurant';
import renderMenu from './menu';
import renderContact from './contact';
import anime from 'animejs';

const restaurant = document.querySelector('.restaurant-container');
const tabs = document.querySelectorAll('.restaurant__tabs li');

// load main restaurant tab on page load
restaurant.appendChild(renderRestaurant());

// wait helper function
const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

function handleTabChange(e) {
    e.stopPropagation();

    // time of animation in milliseconds
    const animationDuration = 1000;
    let targetTab;

    anime({
        targets: restaurant,
        translateY: 750,
        scale: 0,
        rotate: '1turn',
        duration: animationDuration,
        direction: 'alternate',
        loop: 1,
        easing: 'cubicBezier(.5, .05, .1, .3)'
    });

    wait(animationDuration).then(() => {
        restaurant.innerHTML = '';

        switch (e.target.dataset.tab) {
            case 'menu':
                targetTab = renderMenu;
                break;
            case 'contact':
                targetTab = renderContact;
                break;
            default:
                targetTab = renderRestaurant;
        }

        const newTab = targetTab();

        return restaurant.appendChild(newTab);
    });
}

tabs.forEach(tab => tab.addEventListener('click', handleTabChange));
