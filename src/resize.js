let min;

const resizeInput = (el) => {
    el.style.width = 0;
    const width = el.scrollWidth > min ? el.scrollWidth + 4 : min;
    el.style.width = `${width}px`;
};

const handler = event => resizeInput(event.target);

export default {
    inserted: (el, binding, vNode) => {
        const { name } = vNode.context;

        if (binding.arg && `${parseInt(binding.arg, 10)}` !== binding.arg) {
            let warn = `[v-resize:] provided argument '${binding.arg}' must be a number`;
            warn += name ? `Found in component '${name}'` : '';
            console.warn(warn);
        }

        min = binding.arg ? parseInt(binding.arg, 10) : 10;

        resizeInput(el);
        el.addEventListener('input', handler);
    },
    unbind: el => el.removeEventListener('input', handler),
};
