import SearchBar from 'components/Searchbar/Searchbar';
import './styles.css';
import { Component } from 'react';
import * as API from './service/api';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import LoadButton from 'components/Button/Button';
import { ColorRing } from 'react-loader-spinner';

export class App extends Component {
  state = {
    request: '',
    images: [],
    total: 0,
    page: 1,
    loading: false,
  };
  async getImages(request, page) {
    const { data } = await API.fetchImages(request, page);
    const fetchedImages = [...this.state.images, ...data.hits];
    this.setState({ images: fetchedImages, total: data.total, loading: false });
  }

  componentDidUpdate(prevProps, prevState) {
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
        <ColorRing wrapperClass="color-ring-wrapper" visible={loading} />
        {request && !loading && images.length !== total && (
          <LoadButton onLoadMore={this.loadMore} />
        )}
      </div>
    );
  }
}
