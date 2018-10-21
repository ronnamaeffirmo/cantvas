import React, { Fragment } from 'react'
import { Header, Divider, Item, Image } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'

import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'

import { boyUrl, girlUrl, paragraph } from '../../constants/assetUrls'

const queryTeacher = gql`
	query queryTeacher($id: ID!) {
		teacher(where: { id: $id }) {
			id
			email
			name
			gender
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
			{({ data: { userTeacher } }) => {
				if (!userTeacher) return <ErrorMessage message={'No such teacher found'} />

				return (
					<Query query={queryTeacher} variables={{ id: userTeacher }}>
						{({ loading, error, data }) => {
							if (error) return <ErrorMessage message={error.message} />
							if (loading) return <Loading message={'fetching teacher account...'} />

							return (
								<Item.Group>
									<Item>
										<Item.Image
											src={data.teacher.gender === 'MALE' ? boyUrl : girlUrl}
											size={'small'}
										/>
										<Item.Content verticalAlign={'middle'}>
											<Item.Header as={'a'}>{data.teacher.name}</Item.Header>
											<Item.Meta>{data.teacher.email}</Item.Meta>
											<Item.Description>
												<Image src={paragraph} />
											</Item.Description>
											<Item.Extra>
												Joined {moment(data.teacher.createdAt).format('MM/DD/YY')}
											</Item.Extra>
										</Item.Content>
									</Item>
								</Item.Group>
							)
						}}
					</Query>
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
