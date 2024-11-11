//Token.js
import { COLORS } from '../../utils/utils'

const Tokens = ( {data} ) => {
    const defaultSrc = (e) => {
        e.target.src = 'https://res.cloudinary.com/dl4murstw/image/upload/v1677729872/greybox_zkioqf.png'
    }
    return (
        <div className='tokenContainer'>
            {data.map((item, i) => {
                return(
                    <div className='tokenRow'>
                        <div><img onError={defaultSrc} className='tokenLogo' src={item.logo} alt={item.name} /></div>
                        <div className='alignLeft'>{item.name}</div>
                        <div> {(item.ratio*100).toFixed(2)}% </div>

                        {/* Labels */}
                        <span style={{
                            height: "11px",
                            width: "11px",
                            backgroundColor: COLORS[i],
                            borderRadius: "50%",
                            display: "inline-block",
                            margin: "5px"
                        }}></span>
                    </div>
                )
            })}
        </div>
    )
}

export default Tokens