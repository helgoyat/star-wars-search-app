import React, { Component } from 'react';

class Item extends Component
{
    render()
    {
        const { data } = this.props;
        return (
            <div className="item">
                <div><b>Title:</b> {data.title}</div>
                <div><b>Director:</b> {data.director}</div>
                <div>{data.opening_crawl}</div>
            </div>
        )
    }
}

export default Item;