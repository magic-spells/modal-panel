# Modal Panel Web Component

A lightweight, customizable Web Component for creating accessible modals. Ideal for dialogs, alerts, or content panels with smooth animations and accessibility features.

## Features

- No dependencies
- Lightweight
- Follows accessibility best practices
- Smooth animations
- Uses aria attributes for accessibility

## Installation

```bash
npm install @magic-spells/modal-panel
```

```javascript
// Add to your JavaScript file
import '@magic-spells/modal-panel';
```

Or include directly in your HTML:

```html
<script src="https://unpkg.com/@magic-spells/modal-panel"></script>
```

## Usage

```html
<button
	id="show-modal-button"
	aria-controls="modal-panel"
	aria-expanded="false">
	Open Modal
</button>

<modal-panel id="modal-panel" aria-hidden="true">
	<modal-overlay></modal-overlay>

	<modal-content>
		<button aria-label="Close Modal" data-action="hide-modal">
			&times;
		</button>

		<div>
			<h2>Modal Title</h2>
			<p>
				This is a demonstration of the modal panel component. Add your
				content here.
			</p>
		</div>
	</modal-content>
</modal-panel>

<script>
	const button = document.getElementById('show-modal-button');
	const modal = document.getElementById('modal-panel');

	button.addEventListener('click', () => modal.show());
</script>
```

## How It Works

- The modal is initially hidden (aria-hidden="true").
- Clicking the button triggers the show() method, making the modal visible.
- Clicking the overlay or a close button (data-action="hide-modal") triggers the hide() method, closing the modal.
- Keyboard focus is automatically managed, moving to the first interactable element in the modal when it opens.

## Customization

### Styling

You can style the Modal Panel by overriding or extending the provided CSS:

```css
modal-panel {
	/* Customize your modal panel */
}

modal-overlay {
	background-color: rgba(0, 0, 0, 0.5);
}

[data-action='hide-modal'] {
	font-size: 24px;
	color: #333;
}
```

### JavaScript API

#### Methods

- `show()`: Opens the modal panel.
- `hide()`: Closes the modal panel.

## Browser Support

This component works in all modern browsers that support Web Components.

## License

MIT
