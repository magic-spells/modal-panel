import './modal-panel.css';
import FocusTrap from '@magic-spells/focus-trap';

/**
 * Custom element that creates an accessible modal panel with focus management
 * @extends HTMLElement
 */
class ModalPanel extends HTMLElement {
	/**
	 * Initializes the modal panel, sets up focus trap and overlay
	 */
	constructor() {
		super();
		const _ = this;
		_.id = _.getAttribute('id');
		_.setAttribute('aria-hidden', 'true');
		_.contentPanel = _.querySelector('modal-content');
		_.focusTrap = document.createElement('focus-trap');
		_.triggerEl = null;
		_.contentPanel.parentNode.insertBefore(
			_.focusTrap,
			_.contentPanel
		);
		_.focusTrap.appendChild(this.contentPanel);
		// add modal overlay
		_.prepend(document.createElement('modal-overlay'));
		_.#bindUI();
	}

	/**
	 * Binds click events for showing and hiding the modal
	 * @private
	 */
	#bindUI() {
		// click event for buttons or links with the aria-controls ID
		document.addEventListener('click', (e) => {
			if (!e.target.closest(`[aria-controls="${this.id}"]`)) return;
			if (e.target.getAttribute('data-prevent-default') == 'true') {
				e.preventDefault();
			}
			this.show();
		});
		// click event for hiding the modal panel
		this.addEventListener('click', (e) => {
			if (!e.target.closest('[data-action="hide-modal"]')) return;
			this.hide();
		});
	}

	/**
	 * Shows the modal and traps focus within it
	 * @param {HTMLElement} [triggerEl=null] - The element that triggered the modal
	 */
	show(triggerEl = null) {
		this.triggerEl = triggerEl;
		this.setAttribute('aria-hidden', 'false');
		document.body.classList.add('overflow-hidden');
		// Focus the first focusable element inside the modal-content
		const firstFocusable = this.querySelector(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);
		if (firstFocusable) {
			firstFocusable.focus();
		}
	}

	/**
	 * Hides the modal with animation
	 */
	hide() {
		// Trigger hide animations
		document.body.classList.remove('overflow-hidden');
		setTimeout(() => {
			this.setAttribute('aria-hidden', 'true');
		}, 400);
	}
}

/**
 * Custom element that creates a clickable overlay for the modal
 * @extends HTMLElement
 */
class ModalOverlay extends HTMLElement {
	/**
	 * Initializes the overlay and makes it focusable
	 */
	constructor() {
		super();
		// Make sure this is focusable
		this.setAttribute('tabindex', 0);
		this.modalPanel = this.closest('modal-panel');
		this.#bindUI();
	}

	/**
	 * Binds click event to hide the modal when overlay is clicked
	 * @private
	 */
	#bindUI() {
		this.addEventListener('click', () => {
			this.modalPanel.hide();
		});
	}
}

/**
 * Custom element that wraps the content of the modal
 * @extends HTMLElement
 */
class ModalContent extends HTMLElement {
	constructor() {
		super();
	}
}

customElements.define('modal-panel', ModalPanel);
customElements.define('modal-overlay', ModalOverlay);
customElements.define('modal-content', ModalContent);

export { ModalPanel, ModalOverlay, ModalContent };
export default ModalPanel;
