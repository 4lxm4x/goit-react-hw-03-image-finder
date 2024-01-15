import '../../styles.css';
import { Component } from 'react';
import { ImSearch } from 'react-icons/im';

class SearchBar extends Component {
  state = {
    input: '',
  };

  onSubmit = e => {
    e.preventDefault();
    e.target.reset();

    return this.props.onSubmit(this.state.input);
  };

  onInput = e => {
    this.setState({ input: e.target.value });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmit}>
          <button type="submit" className="SearchForm-button">
            <ImSearch className="SearchForm-button-label" />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInput}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
