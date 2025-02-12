import React, { Component } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component' //  To load more images as the user scrolls
import Image from './Image';

export class Images extends Component {
    // Store Images in State
    state = {
        images: [], // ✅ Ensure it's an array
        count: 30, 
        start: 1
    };

    // When the component mounts
    componentDidMount() {
        // Pull Count & Start from State
        const { count, start } = this.state;
        // Send GET Request
        axios.get(`/api/photos?count=${count}&start=${start}`)
              .then(res => {
                  // Log Response
                  console.log("Frontend API Response:", res.data.results);
                  // When response arrives, update the state
                  this.setState({ images: res.data.results || [] }); 
                  /* If res.data.results is empty or undefined, it sets images to an empty array ([]). */
              }) 
            .catch(error => console.error("Frontend API Error:", error)); // Log Errors
    }

    fetchImages = () => {
      const { count, start } = this.state;

      // Update `start` state before making the request
      this.setState({start: this.state.start + count}); /* This ensures that 
      the next request starts from the correct index. */

      axios.get(`/api/photos?count=${count}&start=${start}`)
            .then(res => {
                console.log("Frontend API Response :", res.data.results);
                this.setState(
                    { 
                      // Preserve previously loaded images and append new ones
                      images: this.state.images.concat(res.data.results)
                    } 
                );
            }) 
          .catch(error => console.error("Frontend API Error:", error)); 
    }

  render() {
    // Verify images is an array
    console.log("Images state:", this.state.images);
    // Render div
    return (
      <div className='images'>
        <InfiniteScroll
          // Load more images as the user scrolls
          dataLength={this.state.images.length}
          next={this.fetchImages}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
           { // Map through images and pass each image to Image component.
            Array.isArray(this.state.images) && this.state.images // Ensure images is an array
              .map(image => (
                <Image key={image.id} image={image} />
           ))} 
        </InfiniteScroll>
      </div>
    )
  }
}

export default Images