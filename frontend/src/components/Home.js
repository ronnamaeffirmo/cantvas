import React from 'react'
import { Menu, Image, Grid, Header } from 'semantic-ui-react'

const body = props => {
  //temporary
  return (
    <Menu pointing secondary style={{ width: '70%' }}>
      <Menu.Item>
        <Header size="huge">Dashboard</Header>
      </Menu.Item>
    </Menu>
  )
}
const home = props => {
  return (
    <Grid style={{ padding: 0, margin: 0 }}>
      <Grid.Column width={1} style={{ padding: 0, margin: 0 }}>
        <Menu
          pointing
          secondary
          vertical
          style={{ backgroundColor: '#2a474b', height: '100vh', width: '100%' }}
        >
          <Menu.Item>
            <Image src={require('../images/logo.png')} />
          </Menu.Item>
          <Menu.Item name="home" style={{ color: 'white' }} />
          <Menu.Item name="messages" style={{ color: 'white' }} />
          <Menu.Item name="friends" style={{ color: 'white' }} />
        </Menu>
      </Grid.Column>
      <Grid.Column
        width={15}
        style={{ padding: 0, margin: 0, paddingLeft: 20 }}
      >
        {body()}
      </Grid.Column>
    </Grid>
  )
}

export default home
