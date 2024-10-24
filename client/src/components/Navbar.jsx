import React, { Component } from 'react';
import { MenuItem, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Auth from '../utils/auth';

const colors = ['black'];

class ExampleMenu extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleLogout = () => {
    Auth.logout();
    this.setState({ activeItem: 'home' });
  };

  render() {
    const { color } = this.props;
    const { activeItem } = this.state;

    return (
      <Menu color={color} inverted widths={5}>
        <MenuItem
          href='./home'
          name='Home'
          active={activeItem === 'Home'}
          onClick={this.handleItemClick}
        />
        <MenuItem
          href='./about'
          name='About Us'
          active={activeItem === 'About Us'}
          onClick={this.handleItemClick}
        />
        <MenuItem
          href='./contact'
          name='Contact Us'
          active={activeItem === 'Contact Us'}
          onClick={this.handleItemClick}
        />
        {Auth.loggedIn() ? (
          <>
            <MenuItem
              href='./profile'
              name='Profile'
              active={activeItem === 'Profile'}
              onClick={this.handleItemClick}
            />
            <MenuItem
              name='Logout'
              active={activeItem === 'Logout'}
              onClick={this.handleLogout}
            />
          </>
        ) : (
          <>
            <MenuItem
              href='./login'
              name='Login'
              active={activeItem === 'Login'}
              onClick={this.handleItemClick}
            />
            <MenuItem
              href='./signup'
              name='Signup'
              active={activeItem === 'Signup'}
              onClick={this.handleItemClick}
            />
          </>
        )}
      </Menu>
    );
  }
}

ExampleMenu.propTypes = {
  color: PropTypes.string.isRequired,
};

const Navbar = () => {
  const menus = colors.map((color) => <ExampleMenu color={color} key={color} />);
  return <div>{menus}</div>;
};

export default Navbar;