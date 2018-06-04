import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Song from '../components/song';
import './App.css';
import EmptyPlayback from '../components/empty-playback';
import generateCreator from '../redux/actions/generate-creator';
import { loadPlaybackInfo } from '../redux/actions/spotify';

const setSearchResult = generateCreator('SET_SEARCH_RESULT');

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.addError = this.addError.bind(this);
    this.state = { errors: [] };
  }

  componentDidMount() {
    this.getPlaybackData();
  }

  componentWillUnmount() {
    if (this.creditsObservable) {
      this.creditsObservable.unsubscribe();
    }
  }

  getPlaybackData() {
    this.props.loadPlaybackInfo().then(({ body }) => {
      if (body && body.item) {
        this.getCredits(body.item.album.id);
      }
    }, this.addError).catch(this.addError);
  }

  getCredits(id) {
    this.creditsObservable = this.props.backend.getCredits(id)
      .subscribe((response) => {
        this.props.setSearchResult(response.id, response);
      }, this.addError);
  }

  addError({ message }) {
    this.setState({
      errors: [...this.state.errors, message],
    });
  }

  render() {
    const { errors } = this.state;
    const { playbackInfo } = this.props;
    return (
      <div>
        {errors.length > 0 &&
        <div className="errors-div">
          {errors.map((error, i) => <p key={`error-${i}`}>{error}</p>)}
          <p>Please reload the page to try again</p>
        </div>}
        {!playbackInfo && <EmptyPlayback />}
        {playbackInfo && playbackInfo.item && <Song
            trackId={playbackInfo.item.id} />}
      </div>
    );
  }
}

const mapStateToProps = ({
  searches, playbackInfo,
}) => ({
  searches, playbackInfo,
});

const mapDispatchToProps = dispatch => ({
  setSearchResult: (id, search) => dispatch(setSearchResult(id, search)),
  loadPlaybackInfo: () => dispatch(loadPlaybackInfo()),
});

App.propTypes = {
  backend: PropTypes.object.isRequired,
  loadPlaybackInfo: PropTypes.func.isRequired,
  playbackInfo: PropTypes.object,
  searches: PropTypes.object.isRequired,
  setSearchResult: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
