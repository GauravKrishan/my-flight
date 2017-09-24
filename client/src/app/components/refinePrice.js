import React from 'react';
import {currencyFormatter} from '../utilities';

//Price Refine Reusable component.
export default class RefinePrice extends React.Component {
    constructor(props){
        super(props);
        this.state={
            selectedPrice:this.props.price
         }
      }
    render(){
        let {minPrice,maxPrice,step} = this.props;
        return ( <div className='range-slider'>
                    <p><b>Max Price:</b> {currencyFormatter(this.state.selectedPrice)}</p>
                    <input type='range' min={minPrice} max={maxPrice} onChange={(event)=>this.onChange(event)} step={step} value={this.state.selectedPrice}/>
                    <div className='labels'>
                        <span>{minPrice}</span>
                        <span>{maxPrice}</span>
                    </div>
                </div>
        )
    }
    onChange(event){
        let value = event.target.value;
        this.setState({selectedPrice:value},()=>{
            this.props.updateMaxPrice(value);
        });
    }
}