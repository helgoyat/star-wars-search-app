import React from 'react';

export default function Item(props)
{
    const { title, director, opening_crawl, counts } = props.data;

    const display_counts = [];
    for (let item in counts)
    {
        display_counts.push(`${item}: ${counts[item]}`);
    }

    return (
        <div className="item">
            <div>{title}</div>
            <div>Directed by {director}</div>
            <div>{opening_crawl}</div>
            {
                (counts !== undefined) &&
                <div style={{ textAlign: 'right', marginTop: 18 }}>
                    <font className="relevance">Relevance: {props.data.relevance}</font>
                    {
                        display_counts.map((e, i) => (<font key={i} className="count">{e}</font>))
                    }
                </div>
            }
        </div>
    )
}