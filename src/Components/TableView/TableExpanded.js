import React from 'react'
import { Link } from 'react-router-dom';
import "./tableExpanded.css"

export default function TableExpanded(props) {

  return (
    <div className="tableExpanded" >
      <img className='imageForTableExplanded' src={props.img} />
      <div>
        <p className='table-expanded-article-body' dangerouslySetInnerHTML={{ __html: props.body }} ></p>
        <Link className='loeRohkemButton' to={`/article/${props.link}`}>LOE ROHKEM</Link>
      </div>
    </div>
  )
}
