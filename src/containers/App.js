import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TrackDetails from '../components/track-details';
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
    this.props.onUnmount();
  }

  getPlaybackData() {
    this.props.loadPlaybackInfo().then(() => {}, this.addError).catch(this.addError);
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
        {playbackInfo && playbackInfo.item && <TrackDetails
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
  loadPlaybackInfo: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
  playbackInfo: PropTypes.object,
  searches: PropTypes.object.isRequired,
  setSearchResult: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
