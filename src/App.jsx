import SearchBar from 'components/Searchbar/Searchbar';
import './styles.css';
import { Component } from 'react';
import axios from 'axios';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import LoadButton from 'components/Button/Button';
import { ColorRing } from 'react-loader-spinner';

const KEY = '40066874-c684fea7be1806c3f735d28e1';
axios.defaults.baseURL = 'https://pixabay.com/api';
const PER_PAGE = 12;

export class App extends Component {
  state = { request: '', images: [], total: 0, page: 1, loading: false };

  getImages = async (request, page) => {
    const { data } = await axios.get(
      `?q=${request}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
    );
    const newImages = [...this.state.images, ...data.hits];

    console.log('🚀 ~ newImages:', newImages);

    this.setState({ images: newImages, total: data.total, loading: false });
  };

  // componentDidMount() {
  //   this.setState({ request: '' });
  // }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.loading);
    const { request, page } = this.state;
    const changedRequest = prevState.request !== request;
    const changedPage = prevState.page !== page;
    if (changedRequest) {
      this.setState({ images: [], page: 1, loading: true });

      this.getImages(request, page);
    }
    if (changedPage && !changedRequest) {
      this.getImages(request, page);
      this.setState({ loading: true });
      console.log(this.state.loading);
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
    const { request, images, loading, total } = this.state;
    return (
      <div className="App">
        <SearchBar onSubmit={this.onSearchSubmit} />
        <ImageGallery images={images} />
        <ColorRing
          wrapperClass="color-ring-wrapper"
          visible={loading}
        ></ColorRing>
        {request && !loading && images.length !== total && (
          <LoadButton
            onLoadMore={this.loadMore}
            disabled={images.length === total}
          />
        )}
      </div>
    );
  }
}
