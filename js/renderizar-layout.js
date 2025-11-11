import { headerHTML } from './componentes/header.js';
import { footerHTML } from './componentes/footer.js';

document.addEventListener('DOMContentLoaded', () => {
    const headerContainer = document.getElementById('header');
    const footerContainer = document.getElementById('footer');

    if (headerContainer) headerContainer.innerHTML = headerHTML;
    if (footerContainer) footerContainer.innerHTML = footerHTML;
});
