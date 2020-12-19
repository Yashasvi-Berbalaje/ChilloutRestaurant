import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../scss/gallery.scss';
import '../scss/base.scss';
import barfi from '../../assets/barfi.jpg';
import GulabJamun from '../../assets/gulab-jamun.jpg';
import Jalfrezi from '../../assets/jalfrezi.jpg';
import Kheer from '../../assets/kheer.jpg';
import Khulfi from '../../assets/kulfi.jpg';
import Pakora from '../../assets/pakora.jpg';
import Lightbox from 'lightbox-react';
import 'lightbox-react/style.css'; // This only needs to be imported once in your app
 
const images = [
  barfi,
  Khulfi,
  Kheer,
  GulabJamun,
  Pakora,
  Jalfrezi
];


 
export default class Gallery extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }
 
  render() {
    const { photoIndex, isOpen } = this.state;
 
    return (
        <div className='gallery'>
        <div className='baseContainerGallery'>     
         <div className='GalleryContent text-center'>
                 <h1 className='galleryContentHeading'>Gallery</h1>
                 <div className='galleryContentParagraph d-flex justify-content-center'>
                     <div className='galleryContentText'>
                        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. 
                     </div>
                </div>
         </div>

         <div class="row ">
               {
                   images.map((image,index)=>(
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-xl-4  mb-4    gallery-img-container">
                    <img src={image} onClick={() => this.setState({ isOpen: true,photoIndex:index })} alt='barfi' className='gallery-img'></img>
                    </div>
                   ))
               }
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
      </div>
            </div>
        </div>
    );
  }
}