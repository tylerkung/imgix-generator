import React, { Component } from "react";

class Imgix extends Component {
    constructor(props){
        super(props);

        this.state = {
            generatedImage: '',
            text: '',
            color: '',
            textColor: '&txtclr=000000'
        }

        this.updateImage = this.updateImage.bind(this);
        this.formatText = this.formatText.bind(this);
    }

    componentDidUpdate(oldProps){
        if(this.props.imageSettings.text !== oldProps.imageSettings.text || this.props.imageSettings.color !== oldProps.imageSettings.color || this.props.imageSettings.textColor !== oldProps.imageSettings.textColor ){
            this.updateImage(this.props.imageSettings);
        }
    }

    formatText = (text) => {
        return text.split(' ').join('%20');
    }

    updateImage({text, color}){
        if (this.props.imageSettings.text){
            this.setState({text: '&txt=' + this.formatText(this.props.imageSettings.text)});
        } if (this.props.imageSettings.color){
            this.setState({color: '&blend=' + this.props.imageSettings.color});
        }
        if (this.props.imageSettings.textColor){
            this.setState({textColor: '&txtclr=' + this.props.imageSettings.textColor});
        }
    }

    render() {

        const imgUrl = 'http://assets.imgix.net/examples/butterfly.jpg?bb&w=640&txtalign=center%2Cmiddle&txtsize=48&bm=normal&balph=50' + this.state.text + this.state.color + this.state.textColor ;

        return (
            <div>
                Imgix
                <img className='imgix-image' src={imgUrl} />
                <button onClick={() => console.log(this.props)}>Click</button>
            </div>
        );
    }
};

export default Imgix;
