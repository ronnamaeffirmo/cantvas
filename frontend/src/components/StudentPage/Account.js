import React, { Fragment } from 'react'
import { Header, Divider, Item, Image } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'

import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'

import { getNumeralYearEquivalent } from '../../helpers/studentHelper'
import { boyUrl, girlUrl, paragraph } from '../../constants/assetUrls'

const queryStudent = gql`
	query queryStudent($id: ID!) {
		student(where: { id: $id }) {
			name
			gender
			course
			year
			email
			createdAt
		}
	}
`

const GET_USER = gql`
	{
		userTeacher @client
	}
`

const Account = props => (
	<Fragment>
		<div style={style.pageTitle}>
			<Header size={'huge'} style={style.header}>
				Account
			</Header>
			<Divider />
		</div>
		<Query query={GET_USER}>
			{({ data }) => {
				if (data.userStudent) {
					return (
						<Query query={queryStudent} variables={{ id: data.userStudent }}>
							{({ loading, error, data }) => {
								console.log(data)
								if (error) return <ErrorMessage message={error.message} />
								if (loading) return <Loading message={'fetching account...'} />
								return (
									<Item.Group>
										<Item>
											<Item.Image
												src={data.student.gender === 'MALE' ? boyUrl : girlUrl}
												size={'small'}
											/>
											<Item.Content verticalAlign={'middle'}>
												<Item.Header as={'a'}>{data.student.name}</Item.Header>
												<Item.Meta>
													{data.student.course} - {getNumeralYearEquivalent(data.student.year)}
												</Item.Meta>
												<Item.Description>
													<Image src={paragraph} />
												</Item.Description>
												<Item.Extra>
													Joined {moment(data.student.createdAt).format('MM/DD/YY')}
												</Item.Extra>
											</Item.Content>
										</Item>
									</Item.Group>
								)
							}}
						</Query>
					)
				}
				return <ErrorMessage message={'No user found'} />
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
