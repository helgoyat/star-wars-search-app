import React, { Component } from 'react';

class Item extends Component
{
    render()
    {
        const { data } = this.props;
        const counts = [];
        for (let item in data.counts)
        {
            counts.push(`${item}: ${data.counts[item]}`);
        }

        return (
            <div className="item">
                <div><b>Title:</b> {data.title}</div>
                <div><b>Director:</b> {data.director}</div>
                <div>{data.opening_crawl}</div>
                {
                    (data.counts !== undefined) &&
                    <div style={{ textAlign: 'right', marginTop: 18 }}>
                        {
                            counts.map((e, i) => (<font key={i} className="count">{e}</font>))
                        }
                    </div>
                }
            </div>
        )
    }
}

export default Item;