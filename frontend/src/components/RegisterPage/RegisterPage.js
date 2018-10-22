import React from 'react'
import { Route, Link } from 'react-router-dom'
import { Grid, Header, Image, Menu, Message } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import StudentRegisterForm from './StudentRegisterForm'
import TeacherRegisterForm from './TeacherRegisterForm'

import '../../styles/login.css'

const getActiveUserTab = gql`
	{
		activeUserTab @client
	}
`

const registerPage = ({ history }) => (
	<div className={'login-form'}>
		<Grid style={style.grid} textAlign={'center'} verticalAlign={'middle'}>
			<Grid.Column style={style.column}>
				<Header>
					<Image src={require('../../images/logo.png')} style={style.logo} />
					<Header style={style.headerText} size={'large'}>
						canvas
					</Header>
				</Header>

				{/* menu: student or teacher login */}
				<Query query={getActiveUserTab}>
					{({ data, client }) => (
						<Menu pointing secondary>
							<Menu.Item
								as={Link}
								to={'/register/student'}
								style={style.menuItem}
								name={'student'}
								active={data.activeUserTab === 'student'}
								onClick={() => client.writeData({ data: { activeUserTab: 'student' } })}
							/>
							<Menu.Item
								as={Link}
								to={'/register/teacher'}
								style={style.menuItem}
								name={'teacher'}
								active={data.activeUserTab === 'teacher'}
								onClick={() => client.writeData({ data: { activeUserTab: 'teacher' } })}
							/>
						</Menu>
					)}
				</Query>

				{/* the form will render here */}
				<Route
					path={'/register/student'}
					component={() => <StudentRegisterForm history={history} title={'student'} />}
				/>
				<Route
					path={'/register/teacher'}
					component={() => <TeacherRegisterForm history={history} title={'teacher'} />}
				/>

				<Message>
					Have an account? <a href={'/login/student'}>Login instead</a>
				</Message>
			</Grid.Column>
		</Grid>
	</div>
)

const style = {
	grid: {
		height: '100%'
	},
	column: {
		maxWidth: 450
	},
	logo: {
		width: '35px',
		marginBottom: '10px'
	},
	headerText: {
		marginLeft: '14px',
		display: 'inline'
	}
}

export default registerPage
