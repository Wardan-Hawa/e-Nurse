import useEmblaCarousel from 'embla-carousel-react'
import './Hero.css'
import slide1 from '../../assets/medical/images/slider/2.jpg'
import slide2 from '../../assets/medical/images/slider/1.jpg'

const slides = [
    slide1,
    slide2
]

export const HomeCarousel = () => {
    const [emblaRef] = useEmblaCarousel()

    return (
        <div className='position-relative'>
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    {
                        slides.map((slide, i) => {
                            return <div key={i} className="embla__slide">
                                <img src={slide} alt="" />
                            </div>
                        })
                    }
                </div>
            </div>
            <div className='position-absolute w-100' style={{top:'50%', transform:'translateY(-50%)',color:''}}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <h1 className='mb-0'>WE CARE ABOUT YOUR HEALTH</h1>
                            <p>We believe that every individual is responsible for their own healthcare</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeCarousel