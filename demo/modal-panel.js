(function () {
	'use strict';

	class ModalPanel extends HTMLElement {
		constructor() {
			super();

			this.id = this.getAttribute('id');
			this.content = this.querySelector('modal-content');
			this.setAttribute('aria-hidden', 'true');

			this.prepend(document.createElement('modal-overlay'));

			this.bindUI();
		}

		bindUI() {
			document.addEventListener('click', (e) => {
				if (!e.target.closest(`[aria-controls="${this.id}"]`)) return;
				if (e.target.getAttribute('data-prevent-default') == 'true') {
					e.preventDefault();
				}
				this.show();
			});

			this.addEventListener('click', (e) => {
				if (!e.target.closest('[data-action="hide-modal"]')) return;
				this.hide();
			});
		}

		show() {
			this.setAttribute('aria-hidden', 'false');
			this.classList.remove('hide');
			document.body.classList.add('overflow-hidden');

			// Focus the first focusable element inside the modal-content
			const firstFocusable = this.querySelector(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			if (firstFocusable) {
				firstFocusable.focus();
			}
		}

		hide() {
			// Trigger hide animations
			this.classList.add('hide');
			document.body.classList.remove('overflow-hidden');
			setTimeout(() => {
				this.setAttribute('aria-hidden', 'true');
				this.classList.remove('hide');
			}, 400);
		}
	}

	class ModalOverlay extends HTMLElement {
		constructor() {
			super();
			// Make sure this is focusable
			this.setAttribute('tabindex', 0);
			this.modalPanel = this.closest('modal-panel');
			this.bindUI();
		}

		bindUI() {
			this.addEventListener('click', () => {
				this.modalPanel.hide();
			});
		}
	}

	class ModalContent extends HTMLElement {
		constructor() {
			super();
		}
	}

	customElements.define('modal-panel', ModalPanel);
	customElements.define('modal-overlay', ModalOverlay);
	customElements.define('modal-content', ModalContent);

})();
