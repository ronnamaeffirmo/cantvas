import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'

import { getBackgroundColor, getFontColor } from '../../helpers/colorHelper'

const SidebarItems = ({ activeItemStudent, client }) => (
	<Fragment>
		{/* navigation routes */}
		<Menu.Item
			as={Link}
			to={'/student/dashboard'}
			active={activeItemStudent === 'dashboard'}
			style={style.menuItem('dashboard', activeItemStudent)}
			onClick={() => client.writeData({ data: { activeItemStudent: 'dashboard' } })}>
			<Icon name={'dashboard'} />
			Dashboard
		</Menu.Item>
		<Menu.Item
			as={Link}
			to={'/student/account'}
			active={activeItemStudent === 'account'}
			style={style.menuItem('account', activeItemStudent)}
			onClick={() => client.writeData({ data: { activeItemStudent: 'account' } })}>
			<Icon name={'user circle outline'} />
			Account
		</Menu.Item>
	</Fragment>
)

const style = {
	menuItem(name, activeItem) {
		return {
			color: getFontColor(name, activeItem),
			backgroundColor: getBackgroundColor(name, activeItem),
			fontWeight: 'lighter',
			borderRight: 0
		}
	}
}

export default SidebarItems
