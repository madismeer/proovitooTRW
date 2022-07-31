import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { ReactComponent as Loader } from '../../Assets/loader.svg';
import "./articleView.css"

export default function ArticleView(props) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    let { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                const fetchID = id || '972d2b8a'
                const response = await fetch(
                    `https://midaiganes.irw.ee/api/list/${fetchID}`
                );
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    );
                }
                let actualData = await response.json();
                setData(actualData);
                setError(null);
            } catch (err) {
                setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        }
        getData()
    }, [])




    return (
        <div className='ArticleView'>

            {data ?
                (<>
                    <h1>{data.title}</h1>
                    <div className='article-intro' dangerouslySetInnerHTML={{ __html: data.intro }} />

                    <div className='ImageContainer'>
                        <img className='imageForArticle' src={data.image.small} alt={data.image.alt} />
                        <img className='imageForArticleOverlay' src={data.image.small} alt={data.image.alt} />
                        <div className='imageTitleContainer'>
                            <div className='imageTitle'>{data.image.title} </div>
                        </div>
                    </div>

                    <div className='article-body' dangerouslySetInnerHTML={{ __html: data.body }} />
                    <div className='keppTagsLeft'>

                        {data.tags.map((val, key) => {
                            return (
                                <div key={key} className='article-tags'> {val}</div>
                            )
                        })}

                    </div>
                </>
                ) : (<div style={{ zoom: `4` }}><Loader /></div>)
            }
        </div>
    )
}
