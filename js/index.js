const navigation = document.querySelector('.navigation');
const burger = document.querySelector('.burger');
burger.onclick = () => onBurger();
const navigationItems = document.querySelectorAll('.navigation-list__item');


function onBurger() {
  navigation.classList.toggle('navigation_active');
  if (!navigation.classList.contains('navigation_active')) {
    navigation.classList.add('navigation_inactive');
  } else {
    navigation.classList.remove('navigation_inactive');
  }
  document.body.classList.toggle('body_overlay');
  burger.classList.toggle('burger_active');
}
navigationItems.forEach((el) => {
  el.onclick = () => {
    if (burger.classList.contains('burger_active')) {
      onBurger();
    }
  };
});
document.body.onclick = (e) => {
  if (!e.target.closest('.navigation, .burger, .logo') && document.body.classList.contains('body_overlay')) {
    onBurger();
  }
};
window.addEventListener('resize', () => {
  if (document.documentElement.clientWidth >= 1280 && burger.classList.contains('burger_active')) {
    onBurger();
  }
});