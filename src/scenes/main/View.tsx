import { jsx } from '@/engine/Helpers'
import { Container, BitmapText } from 'pixi.js'
import { Playfield } from './Playfield'

export default (refs: any) => {

	const view = <Container>
		<BitmapText ref={el => refs.heading = el}
			x={1920 / 2}
			y={125}
			anchor={{ x: 0.5, y: 0.5 }}
			style={{ fontName: 'lightFont' }}
		/>
		<Playfield ref={el => refs.field = el}
			x={650}
			y={250}
		/>
	</Container>

	return view
}