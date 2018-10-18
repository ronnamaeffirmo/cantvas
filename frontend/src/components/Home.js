import React from 'react'
import { Menu, Image, Grid, Icon } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Dashboard from './Dashboard'

const GET_ACTIVE_ITEM = gql`
  {
    activeItem @client
  }
`

const getBody = props => {
  //temporary
  if (props.activeItem === 'dashboard') {
    return <Dashboard />
  }
}

const getBackgroundColor = (name, activeItem) => {
  if (name === activeItem) {
    return 'white'
  }
  return '#2a474b'
}

const getFontColor = (name, activeItem) => {
  if (name === activeItem) {
    return '#313a96'
  }
  return 'white'
}

const home = props => {
  return (
    <Query query={GET_ACTIVE_ITEM}>
      {({ data, client }) => {
        return (
          <Grid style={{ padding: 0, margin: 0 }}>
            <Grid.Column width={1} style={{ padding: 0, margin: 0 }}>
              <Menu
                pointing
                secondary
                vertical
                icon="labeled"
                style={{
                  backgroundColor: '#2a474b',
                  height: '100vh',
                  width: '100%',
                }}
              >
                <Menu.Item disabled>
                  <Image src={require('../images/logo.png')} />
                </Menu.Item>
                <Menu.Item
                  active={data.activeItem === 'dashboard'}
                  style={{
                    borderRight: 0,
                    color: getFontColor('dashboard', data.activeItem),
                    backgroundColor: getBackgroundColor(
                      'dashboard',
                      data.activeItem
                    ),
                  }}
                  onClick={() =>
                    client.writeData({ data: { activeItem: 'dashboard' } })
                  }
                >
                  <Icon name="dashboard" />
                  Dashboard
                </Menu.Item>
                <Menu.Item
                  active={data.activeItem === 'account'}
                  style={{
                    borderRight: 0,
                    color: getFontColor('account', data.activeItem),
                    backgroundColor: getBackgroundColor(
                      'account',
                      data.activeItem
                    ),
                  }}
                  onClick={() =>
                    client.writeData({ data: { activeItem: 'account' } })
                  }
                >
                  <Icon name="user circle outline" />
                  Account
                </Menu.Item>
              </Menu>
            </Grid.Column>
            <Grid.Column
              width={12}
              style={{ padding: 0, margin: 0, paddingLeft: 20 }}
            >
              {getBody(data)}
            </Grid.Column>
          </Grid>
        )
      }}
    </Query>
  )
}

export default home
