import React from 'react';

export default function Item(props)
{
    const { data } = props;
    const counts = [];
    for (let item in data.counts)
    {
        counts.push(`${item}: ${data.counts[item]}`);
    }

    return (
        <div className="item">
            <div>{data.title}</div>
            <div>Directed by {data.director}</div>
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