import React from 'react'
import { Route, Link } from 'react-router-dom'
import { Grid, Header, Image, Message, Menu } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import LoginForm from './LoginForm'
import '../../styles/login.css'

const getActiveUserTab = gql`
	{
		activeUserTab @client
	}
`

const LoginPage = () => (
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
								to={'/login/student'}
								style={style.menuItem}
								name={'student'}
								active={data.activeUserTab === 'student'}
								onClick={() => client.writeData({ data: { activeUserTab: 'student' } })}
							/>
							<Menu.Item
								as={Link}
								to={'/login/teacher'}
								style={style.menuItem}
								name={'teacher'}
								active={data.activeUserTab === 'teacher'}
								onClick={() => client.writeData({ data: { activeUserTab: 'teacher' } })}
							/>
						</Menu>
					)}
				</Query>

				{/* the form will render here */}
				<Route path={'/login/student'} component={() => <LoginForm title={'student'} />} />
				<Route path={'/login/teacher'} component={() => <LoginForm title={'teacher'} />} />

				<Message>
					Don't have an account? <a href="/register">Register here</a>
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

export default LoginPage
