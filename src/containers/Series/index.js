import React, { Component } from 'react';
//import SeriesList from  '../../components/SeriesList';
import SeriesList from '../../SeriesList';

class Series extends Component {

    state = {
        series: [],
        seriesName: '',
        isfetching: false
      }
    
    //   componentDidMount(){

    //   }

      onSeriesInputChange = e => {
        this.setState({ seriesName: e.target.value, isfetching: true });
        fetch(`https://api.tvmaze.com/search/shows?q=${e.target.value}`)
        // fetch('https://dairyapp.herokuapp.com/api/v2/all_entries')
          .then(response => response.json())
          .then(json => this.setState({series: json, isfetching: false }));
      }

      render(){
          const { series, seriesName, isfetching } = this.state;
          return (
            <div>
                <div>
                    <input 
                        value={seriesName} 
                        type="text"
                        onChange={this.onSeriesInputChange} /> 
                </div>
                {
                    series.length === 0 && seriesName.trim() === ''
                    &&
                    <p>Please Enter series name into the input</p>
                }
                {
                    series.length === 0 && seriesName.trim() !== ''
                    &&
                    <p>No TV series have found with this name</p>
                }
                {
                    isfetching && <p>Loading......</p>
                }
                {
                    !isfetching && <SeriesList list = {this.state.series} />
                }
                
            </div>
          )
      }
    }

export default Series;