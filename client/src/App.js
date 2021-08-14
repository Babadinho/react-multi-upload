import React, { useState } from 'react';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap';

function App() {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    //get multiple images & convert to base64 fro cloudinary
    if (e.target.files) {
      Array.from(e.target.files).forEach((file) => {
        URL.createObjectURL(file);
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          var base64data = reader.result;
          setImages((prevImages) => prevImages.concat(base64data));
          // console.log(base64data);
          Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
        };
      });
    }
    /// images a blob
    // if (e.target.files) {
    //   const fileArray = Array.from(e.target.files).forEach((file) =>
    //     URL.createObjectURL(file)
    //   );
    //   console.log(fileArray);
    //   setImages((prevImages) => prevImages.concat(fileArray));
    //   Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let productData = new FormData();
    for (let i = 0; i < images.length; i++) {
      images && productData.append('images', images[i]);
    }

    try {
      const res = axios.post(
        `${process.env.REACT_APP_API}/upload`,
        productData,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='row container-fluid'>
        <div className='col-md-8 mx-auto'>
          <div className='card'>
            <div className='card-body'>
              <form onSubmit={handleSubmit}>
                <div className='mx-auto col-md-8'>
                  <h6>Upload Images*</h6>
                  <div className='form-group mb-3 d-flex'>
                    <div>
                      <label
                        className='btn btn-secondary btn-large rounded-circle p-0'
                        style={{ fontSize: '30px' }}
                      >
                        <div>
                          <i class='fas fa-plus fa-1x p-4'></i>
                        </div>
                        <input
                          onChange={handleImageChange}
                          type='file'
                          name='images'
                          accept='image/*'
                          multiple
                          hidden
                        />
                      </label>
                    </div>
                    {images && images.length > 0 && (
                      <div>
                        {images.map((image, i) => {
                          return (
                            <img
                              key={i}
                              src={image}
                              alt='preview_image'
                              className='img img-fluid m-2'
                              style={{ height: '75px', width: '75px' }}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <div className='mt-2'>
                  <button className='btn form-control btn-primary rounded-0'>
                    Upload Images
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
