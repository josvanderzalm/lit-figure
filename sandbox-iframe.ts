import type { Options } from './src/types/index.ts';

const mutationObserver = new MutationObserver(sendHeightToParent);
const resizeObserver = new ResizeObserver(sendHeightToParent);
let figureWrapperElement: (HTMLElement & { options: Options }) | null = null;

// Listen for options passed via postMessage
window.addEventListener('message', (event) => {
    if (event.data?.type === 'options') {
        const options: Options = {
            ...event.data.data,
            sandbox: false,
        };

        addFigureWrapper(options);
    }
});

// On DOM ready or load, start ResizeObserver and observe wrapper
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initObservers();
} else {
    window.addEventListener('DOMContentLoaded', initObservers);
}

// Also send initial height when fully loaded
window.addEventListener('load', sendHeightToParent);

// Adds the <rivm-smdv-figure> component with passed options
function addFigureWrapper(options: Options) {
    // Set HTML lang attribute if provided
    if (options.lang) {
        document.documentElement.lang = options.lang;
    }

    // Set document title if provided
    if (options.title) {
        document.title = options.title;
    }

    figureWrapperElement = Object.assign(document.createElement('rivm-smdv-figure'), { options });
    document.body.appendChild(figureWrapperElement);
}

// Sends current document height to the parent window
function sendHeightToParent() {
    const height = document.documentElement.offsetHeight;

    console.log('Sending height to parent:', height);
    window.parent.postMessage({ type: 'iframe-height', value: height }, '*');
}

// Starts ResizeObserver and shadow DOM MutationObserver
function initObservers() {
    // ResizeObserver: triggers on layout changes in body
    resizeObserver.observe(document.body);

    // Observe wrapper after insertion
    observeFigureWrapper();
}

// Starts observing figure's shadow DOM for layout-affecting changes
function observeFigureWrapper() {
    if (figureWrapperElement?.shadowRoot) {
        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true,
        });
        sendHeightToParent();
    } else {
        setTimeout(observeFigureWrapper, 50);
    }
}
