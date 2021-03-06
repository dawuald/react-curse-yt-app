import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';


const API_KEY = 'AIzaSyCI1tnYR8kG9A67JZh9q1FeQrF3y3DZuxA';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('monkey');
    }

    videoSearch(term) {
        YTSearch({
            key: API_KEY,
            term
        }, videos => {
            this.setState({
                videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        // _debounce - function can be called only once per 300ms
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    videos={this.state.videos}
                    onVideoSelect={selectedVideo => this.setState({ selectedVideo })} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));
