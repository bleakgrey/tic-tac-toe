import { DisplayObject } from 'pixi.js'

// This namespace enables syntax highlighting for Typescript in VSCode
declare global {
	namespace JSX {
		type Element = DisplayObject;

		interface ElementClass {
			// render: any;
			//setProps: (props: any) => void
		}

		interface IntrinsicElements { }

		// interface ElementAttributesProperty {
		// 	props: any
		// }

		// interface ElementChildrenAttribute {
		// 	children: ElementClass[]
		// }
	}
}

export function jsx(
	tag: JSX.ElementClass | any,
	props: any,
	...children: any[]
): DisplayObject {
	// console.debug({ tag, props, children })

	// Construct node from class
	let node = new tag()

	// Apply props
	Object.assign(node, props)

	// Add children
	for (const child of children) {
		if (child && child.addChild) {
			node.addChild(child)
		}
		else {
			console.warn('Skipped non-Node JSX child')
		}
	}

	return node
}