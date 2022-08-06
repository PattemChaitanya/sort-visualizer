import React, { Component } from 'react';

export default class Pile extends Component {
    render() {

        const {
            val,
            size,
            isChanging,
            finished,
        } = this.props;

        let extraClassName = '';
        if (isChanging) {
            extraClassName = '-changing';
        }
        if (finished) {
            extraClassName = '-finished';
        }
        let heights = { 'smallest': 20, 'small': 14, 'medium': 10, 'large': 8 };
        return (
            <>
                <div
                    className={'pile' + extraClassName}
                    style={{ height: `${val * heights[size]/2}px` }}

                >
                </div>

            </>

        );
    }

}