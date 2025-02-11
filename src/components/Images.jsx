import React, { Component } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'

export class Images extends Component {
    // Store Images in State
    state = {
        images: [], 
        count: 30, 
        start: 1
            /* count = 30 (number of images to fetch)
              start = 1 (starting page) */
    };

    // When the component mounts
    componentDidMount() {
        // Pull Count & Start from State
        const { count, start } = this.state;
        // Send GET Request
        axios.get(`/api/photos?count=${count}&start=${start}`)
              .then(res => {
                  // Log Response
                  console.log("Frontend API Response:", res.data);
                  // When response arrives, update the state
                  this.setState({ images: res.data || [] });
              }) 
            .catch(error => console.error("Frontend API Error:", error)); // Log Errors
    }

  render() {
    // Log the state
    console.log(this.state);
    // Render div
    return (
      <div>Hello</div>
    )
  }
}

export default Images