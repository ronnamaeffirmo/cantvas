import React, { Fragment } from 'react'
import { Item, Image } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'

import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'
import CustomHeader from '../CustomComponents/CustomHeader'

import { boyUrl, girlUrl, paragraph } from '../../constants/assetUrls'

const queryTeacher = gql`
	query {
		loggedInTeacher {
			id
			email
			name
			gender
			createdAt
		}
	}
`

const Account = props => (
	<Fragment>
		<CustomHeader title={'Account'} />
		<Query query={queryTeacher}>
			{({ loading, error, data }) => {
				if (error) return <ErrorMessage message={error.message} />
				if (loading) return <Loading message={'fetching teacher account...'} />

				return (
					<Item.Group>
						<Item>
							<Item.Image
								src={data.loggedInTeacher.gender === 'MALE' ? boyUrl : girlUrl}
								size={'small'}
							/>
							<Item.Content verticalAlign={'middle'}>
								<Item.Header as={'a'}>{data.loggedInTeacher.name}</Item.Header>
								<Item.Meta>{data.loggedInTeacher.email}</Item.Meta>
								<Item.Description>
									<Image src={paragraph} />
								</Item.Description>
								<Item.Extra>
									Joined {moment(data.loggedInTeacher.createdAt).format('MM/DD/YY')}
								</Item.Extra>
							</Item.Content>
						</Item>
					</Item.Group>
				)
			}}
		</Query>
	</Fragment>
)

export default Account
