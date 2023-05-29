import { jsx } from '../../engine/Jsx'
import { Container, Texture, Sprite } from 'pixi.js'
import { Playfield } from './Playfield'

export default (refs: any) => {
	const view = <Container>
		<Playfield ref={el => refs.field = el} tint={0x000000}
			x={650 + 200}
			y={250}
		/>
	</Container>

	return view
}