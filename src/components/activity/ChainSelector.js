//ChainSelector.js
import { Button } from 'antd'

const ChainSelector = ( { chains, handleChainSelect } ) => {
   
    return(
        <div className='buttonsContainer'>
            {chains && chains.map(item => {
                return (
                    <Button type="primary" icon={<Logo url={item.logo_url}/>} size="large" onClick={() => handleChainSelect(item.chain_id)}>
                        {item.category_label}
                    </Button>
                )
            })}
        </div>
    )
}

export default ChainSelector

const Logo = ( {url} ) => {
    return (
        <>
            <img src={url} alt='chains' height="28px" width="28px"/>
        </>
    )
}