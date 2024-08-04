import React from 'react';
import PropTypes from 'prop-types';
// Styles
import './Menu.css';
// Icons
import { FaMoon, FaSun } from 'react-icons/fa';

/*
 * TODO: Refactor Menu as a functional component
 *
 * Requirements:
 * - Create a custom hook to implement dark mode named useDarkMode
 * - Switch from setState to the useDarkMode hook
 * - Use function closures instead of this for callbacks and event handlers
 * - Menu logic and behavior should remain the same
 *
 */
class Menu extends React.Component {

  render() {

    const brandLogo = 'https://upload.wikimedia.org/wikipedia/commons/3/34/Computacenter_logo.svg'

    return (
      <div className="menu-container">
        <div className="logo">
          <img src={brandLogo} alt="AlterClass" />
        </div>
        <ul className="menu-nav">
          {this.props.items.map((item, i) => (
            <li
              key={item}
              onClick={() => this.props.onSelectItem(i)}
              className={this.props.selectedItem === i ? 'selected' : null}
            >
              <h2>{item}</h2>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  selectedItem: PropTypes.number,
  onSelectItem: PropTypes.func,
};

export default Menu;
