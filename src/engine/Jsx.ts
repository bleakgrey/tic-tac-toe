import { DisplayObject, Loader } from 'pixi.js'

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
	for (const prop in props) {
		const value = props[prop]
		switch (prop) {
			case "ref":
				props.ref(node)
				break;
			case "texture":
				node[prop] = Loader.shared.resources[value].texture
				break;
			default:
				node[prop] = value
				break;
		}
	}

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