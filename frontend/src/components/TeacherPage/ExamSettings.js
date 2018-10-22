import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { getNumberOptions } from '../../helpers/selectHelper'

const ExamSettings = ({ disabled, client }) => (
	<div>
		<Dropdown
			selection
			style={style.dropdown}
			disabled={disabled}
			placeholder={'Number of questions'}
			options={getNumberOptions(100)}
			onChange={(e, { value }) => client.writeData({ data: { questionNumber: value } })}
		/>
		<Dropdown
			selection
			disabled={disabled}
			placeholder={'Number of choices per question'}
			options={getNumberOptions(6).filter(num => num.value > 1)}
			onChange={(e, { value }) => client.writeData({ data: { choiceNumber: value } })}
		/>
	</div>
)

const style = {
	dropdown: {
		marginRight: '5px'
	}
}

export default ExamSettings
