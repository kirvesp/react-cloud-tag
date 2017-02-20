import React, { Component } from 'react';
import KEYS from './helpers';
import TagElement from './tagelement.component';
import './tagcloud.component.css';

class TagCloud extends Component {
    constructor(props) {
        super(props);

        this.state = {tags: props.tags};
        this.onChange = props.onChange;
    }

    static isValidForPush(tags, tag) {
        if (tag.length === 0 || tags.indexOf(tag) !== -1) {
            return false;
        }

        return true;
    }

    static isValidForRemove(tags, tag) {
        if (tag.length !== 0 && tags.indexOf(tag) !== -1) {
            return true;
        }

        return false;
    }

    addTag(tag) {
        let tags = Array.from(this.state.tags);

        if (!TagCloud.isValidForPush(tags, tag)) {
            return;
        }

        tags.push(tag);

        this.updateTags(tags);
    }

    addTagsList(tagsList) {
        let tags = Array.from(this.state.tags);

        for (let i = 0; i < tagsList.length; i++) {
            let tag = tagsList[i];

            if (!this.isValidForPush(tags, tag)) {
                continue;
            }

            tags.push(tag);
        }

        this.updateTags(tags);
    }

    removeLastTag() {
        let tags = Array.from(this.state.tags);

        tags.pop();

        this.updateTags(tags);
    }

    removeTag(tag) {
        let tags = Array.from(this.state.tags);

        if (!TagCloud.isValidForRemove(tags, tag)) {
            return;
        }

        let index = tags.indexOf(tag);
        tags.splice(index, 1);

        this.updateTags(tags);
    }

    updateTags(tags) {
        this.setState({
            tags: tags
        });

        this.onChange(tags);
    }

    handleInputKeyUp(e) {
        let input = e.currentTarget;
        let tagText = input.textContent;

        if (e.keyCode === KEYS.ENTER) {
            this.addTag(tagText);
            input.textContent = '';
        } else if (tagText.length === 0 && e.keyCode === KEYS.BACKSPACE) {
            this.removeLastTag();
        }
    }

    handlePasteText(e) {
        let input = e.currentTarget;

        let clipboardData = e.clipboardData || window.clipboardData;
        let pastedData = clipboardData.getData('Text');

        let tagsList = pastedData.split("\n");

        this.addTagsList(tagsList);

        setTimeout(() => {input.textContent = '';}, 100);
    }

    static clickOnCloud(e) {
        let tagCloudNode = e.currentTarget;
        let input = tagCloudNode.getElementsByClassName('tag-cloud-input');

        if (input.length === 0) {
            console.error("something goes wrong with clicking on tag-cloud node");
        } else if (input[0] !== document.activeElement) {
            input[0].focus();
        }
    }

    render() {
        return (
            <div>
                <h4>Tag Cloud</h4>
                <div className="tag-cloud" onClick={(e) => TagCloud.clickOnCloud(e)}>
                    {this.state.tags.map((tag) =>
                        <TagElement key={tag}
                                    text={tag}
                                    removeFn={() => this.removeTag(tag)}/>
                    )}
                    <div className="tag-cloud-input"
                         contentEditable="true"
                         onKeyUp={(e) => this.handleInputKeyUp(e)}
                         onPaste={(e) => this.handlePasteText(e)}>
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
}

export default TagCloud;