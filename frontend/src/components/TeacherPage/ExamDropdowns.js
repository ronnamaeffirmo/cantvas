import React from 'react'
import { Dropdown, Grid } from 'semantic-ui-react'
import { getNumberOptions } from '../../helpers/selectHelper'

const ExamDropdowns = ({ disabled, client }) => (
	<Grid.Row>
		<Grid.Column>
			<Dropdown
				selection
				fluid
				disabled={disabled}
				placeholder={'Choose number of questions'}
				options={getNumberOptions(30)}
				onChange={(e, { value }) => client.writeData({ data: { questionNumber: value } })}
			/>
		</Grid.Column>
		<Grid.Column>
			<Dropdown
				selection
				fluid
				disabled={disabled}
				placeholder={'Choose number of choices per question'}
				options={getNumberOptions(6).filter(num => num.value > 1)}
				onChange={(e, { value }) => client.writeData({ data: { choiceNumber: value } })}
			/>
		</Grid.Column>
	</Grid.Row>
)

export default ExamDropdowns
