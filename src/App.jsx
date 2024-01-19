import SearchBar from 'components/Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

    this.setState(prevState => {
      return {
        images: [...prevState.images, ...data.hits],
        total: data.total,
        loading: false,
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    let { request, page } = this.state;
    const changedRequest = prevState.request !== request;
    const changedPage = prevState.page < page;

    if (changedRequest) {
      return this.setState({ images: [], page: 1, loading: true }, () => {
        this.getImages(this.state.request, this.state.page);
      });
    } else if (changedPage) {
      this.getImages(this.state.request, this.state.page);
      this.setState({ loading: true });
    }
  }

  onSearchSubmit = request => {
    this.notify();
    this.setState({ request });
  };

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  notify = () => {
    toast.success('Thank You for checking my Homework!!!', {
      position: 'top-right',
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
        <ToastContainer />
      </div>
    );
  }
}
