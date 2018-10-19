import React, { Fragment } from 'react'
import { Header, Divider, Icon, Item, Image, Message } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'

import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'
import { getNumeralYearEquivalent } from '../../helpers/studentHelper'

const queryStudent = gql`
	{
		student(where: { id: "cjnfmsxgutka00b949i3dmrri" }) {
			name
			gender
			course
			year
			email
			createdAt
		}
	}
`

const boyUrl = 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
const girlUrl = 'https://react.semantic-ui.com/images/avatar/large/molly.png'
const paragraph = 'https://react.semantic-ui.com/images/wireframe/short-paragraph.png'

const Account = props => (
	<Fragment>
		<div style={style.pageTitle}>
			<Header size={'huge'} style={style.header}>
				Account
			</Header>
			<Divider />
		</div>
		<Query query={queryStudent}>
			{({ loading, error, data }) => {
				if (error) return <ErrorMessage message={error.message} />
				if (loading) return <Loading message="fetching account..." />

				return (
					<Item.Group>
						<Item>
							<Item.Image src={data.student.gender === 'MALE' ? boyUrl : girlUrl} size={'small'} />
							<Item.Content verticalAlign={'middle'}>
								<Item.Header as={'a'}>{data.student.name}</Item.Header>
								<Item.Meta>
									{data.student.course} - {getNumeralYearEquivalent(data.student.year)}
								</Item.Meta>
								<Item.Description>
									<Image src={paragraph} />
								</Item.Description>
								<Item.Extra>Joined {moment(data.student.createdAt).format('MM/DD/YY')}</Item.Extra>
							</Item.Content>
						</Item>
					</Item.Group>
				)
			}}
		</Query>
	</Fragment>
)

const style = {
	pageTitle: {
		marginBottom: '25px'
	},
	header: {
		fontWeight: 'normal'
	}
}

export default Account
