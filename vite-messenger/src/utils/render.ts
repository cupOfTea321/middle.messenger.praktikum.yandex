import Block from './Block';

function render(query: string, component: Block) {
    const root = document.querySelector(query) as HTMLElement;

    root.innerHTML = ''
    const authPage = new component({ });

    root.appendChild(authPage!.getContent());

    authPage.dispatchComponentDidMount();
    return root
}

export default render;
