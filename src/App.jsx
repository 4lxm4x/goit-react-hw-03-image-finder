import SearchBar from 'components/Searchbar/Searchbar';
import './styles.css';
import { Component } from 'react';
import axios from 'axios';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import LoadButton from 'components/Button/Button';

const KEY = '40066874-c684fea7be1806c3f735d28e1';
axios.defaults.baseURL = 'https://pixabay.com/api';

export class App extends Component {
  state = { request: '', images: [], total: 0, page: 1 };

  getImages = async (request, page) => {
    const { data } = await axios.get(
      `?q=${request}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    const newImages = [...this.state.images, ...data.hits];
    console.log('🚀 ~ newImages:', newImages);

    this.setState({ images: newImages, total: data.total });
  };

  componentDidUpdate(prevProps, prevState) {
    const { request, page } = this.state;
    const changedRequest = prevState.request !== request;
    const changedPage = prevState.page !== page;
    if (changedRequest) {
      this.setState({ images: [] });
      this.getImages(request, 1);
    }
    if (changedPage && !changedRequest) {
      this.getImages(request, page);
    }
  }

  onSearchSubmit = request => {
    this.setState({ request });
  };

  loadMore = () => {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage });
  };

  render() {
    return (
      <div className="App">
        <SearchBar onSubmit={this.onSearchSubmit} />
        <ImageGallery images={this.state.images} />
        {this.state.request && <LoadButton onLoadMore={this.loadMore} />}
      </div>
    );
  }
}
