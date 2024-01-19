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
    console.log(`fetched ${page} page`);

    // const fetchedImages = [...this.state.images, ...data.hits];
    this.setState(prevState => {
      return {
        images: [...prevState.images, ...data.hits],
        total: data.total,
        loading: false,
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('updated');
    const { request, page } = this.state;
    const changedRequest = prevState.request !== request;
    const changedPage = prevState.page !== page;

    if (changedRequest) {
      console.log(
        '🚀 ~ App ~ componentDidUpdate ~ changedRequest:',
        this.state
      );

      return this.setState({ images: [], page: 1, loading: true }, () => {
        console.log('after setstate', this.state);
        this.getImages(request, page);
      });
    } else if (changedPage) {
      console.log('🚀 ~ App ~ componentDidUpdate ~ changedPage:', this.state);
      this.getImages(request, page);
      this.setState({ loading: true });
    }
  }

  onSearchSubmit = request => {
    this.setState({ request });
  };

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
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
