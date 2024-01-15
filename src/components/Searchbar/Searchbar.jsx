import '../../styles.css';
import { Component } from 'react';

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
      <header className="searchbar">
        <form className="form" onSubmit={this.onSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
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
