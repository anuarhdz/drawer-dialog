# `<drawer-dialog>` Web Component

The `<drawer-dialog>` is a custom element that provides a dialog with a drawer-like behavior. It leverages the native `<dialog>` element and adds custom styling and behavior for an enhanced user experience.

## Features

- Supports `open` attribute to control visibility.
- Easily customizable via CSS custom properties.
- Accessible with `aria-expanded` for associated buttons.
- Supports default slot for inserting content.

## Installation

To use `<drawer-dialog>` in your project, include the JavaScript file in your HTML:

```html
<script type="module" src="path/to/drawer-dialog.js"></script>
```

## Usage

### Basic example

```js
<drawer-dialog open>
  <p>This is a drawer dialog!</p>
</drawer-dialog>
```

### Controlled via Javascript

```js
<drawer-dialog id="myDrawer">
  <p>Content inside the drawer</p>
</drawer-dialog>
<button onclick="document.getElementById('myDrawer').show()">Open Drawer</button>
<button onclick="document.getElementById('myDrawer').hide()">Close Drawer</button>
```

### Styling with CSS Custom Properties

You can customize the appearance of the dialog using the following CSS custom properties:

```css
:root {
  --drawer-dialog-border: 1px solid #ccc;
  --drawer-dialog-border-radius: 8px;
  --drawer-dialog-padding: 1rem;
  --drawer-dialog-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  --drawer-dialog-backdrop-background: rgba(0, 0, 0, 0.5);
}
```

### CSS Custom Properties

The full list of css custom properties.

```css
--drawer-dialog-border
--drawer-dialog-border-radius
--drawer-dialog-margin
--drawer-dialog-padding
--drawer-dialog-block-size
--drawer-dialog-inline-size
--drawer-dialog-max-inline-size
--drawer-dialog-shadow
--drawer-dialog-backdrop-background
--drawer-dialog-transition-duration
--drawer-dialog-ease
--drawer-dialog-transform-hide
```

### API

#### Attributes

| Attribute | Type    | Description                           |
| --------- | ------- | ------------------------------------- |
| `open`    | Boolean | Indicates whether the dialog is open. |

#### Properties

| Property | Type    | Description                            |
| -------- | ------- | -------------------------------------- |
| `open`   | Boolean | Reflects the open state of the dialog. |

#### Methods

| Method   | Description        |
| -------- | ------------------ |
| `show()` | Opens the dialog.  |
| `hide()` | Closes the dialog. |

## Accessibility

- Ensure any button or control opening the dialog has the aria-expanded attribute updated dynamically using the component’s behavior.
- The <dialog> element provides built-in keyboard navigation and focus management.
