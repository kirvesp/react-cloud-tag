import React, { Component } from 'react';
import './tagelement.component.css';

class TagElement extends Component {
    constructor(props) {
        super(props);

        this.removeFn = props.removeFn;
    }

    render() {
        return (
            <div className="tag-cloud-element" contentEditable="false">
                {this.props.text}
                <button className="tag-cloud-element__close-btn"
                        onClick={this.removeFn}>&#10006;</button>
            </div>
        );
    }
}

export default TagElement;