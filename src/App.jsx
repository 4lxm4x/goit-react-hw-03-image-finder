import SearchBar from 'components/Searchbar/Searchbar';
import './styles.css';
import { Component } from 'react';
import axios from 'axios';

//import getImages from './service/api'; // импортирую функцию
import ImageGallery from 'components/ImageGallery/ImageGallery';

const KEY = '40066874-c684fea7be1806c3f735d28e1';
axios.defaults.baseURL = 'https://pixabay.com/api';

export class App extends Component {
  state = { request: '', images: [] };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.request !== this.state.request) {
      const getImages = async (request, page) => {
        const { data } = await axios.get(
          `?q=${request}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        return data.hits;
      };
      getImages(this.state.request, 1).then(images =>
        this.setState({ images })
      );

      console.log(this.state.images);
    }
  }

  onSearchSubmit = request => {
    this.setState({ request });
  };

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.onSearchSubmit} />
        {/* <ImageGallery images={this.state.images} /> */}
      </div>
    );
  }
}
