import React, { Fragment } from 'react'
import { Item, Image } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'

import ErrorMessage from '../ErrorMessage'
import Loading from '../Loading'
import CustomHeader from '../CustomComponents/CustomHeader'

import { getNumeralYearEquivalent } from '../../helpers/studentHelper'
import { boyUrl, girlUrl, paragraph } from '../../constants/assetUrls'

const queryStudent = gql`
	query {
		loggedInStudent {
			id
			name
			gender
			course
			year
			email
			createdAt
		}
	}
`

const Account = props => (
	<Fragment>
		<CustomHeader title={'Account'} />
		<Query query={queryStudent}>
			{({ loading, error, data }) => {
				if (error) return <ErrorMessage message={error.message} />
				if (loading) return <Loading message={'fetching student account...'} />

				return (
					<Item.Group>
						<Item>
							<Item.Image
								src={data.loggedInStudent.gender === 'MALE' ? boyUrl : girlUrl}
								size={'small'}
							/>
							<Item.Content verticalAlign={'middle'}>
								<Item.Header as={'a'}>{data.loggedInStudent.name}</Item.Header>
								<Item.Meta>
									{data.loggedInStudent.course} -{' '}
									{getNumeralYearEquivalent(data.loggedInStudent.year)}
								</Item.Meta>
								<Item.Description>
									<Image src={paragraph} />
								</Item.Description>
								<Item.Extra>
									Joined {moment(data.loggedInStudent.createdAt).format('MM/DD/YY')}
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
