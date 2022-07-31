import React from 'react'
import "./tableView.css"

export default function TableFooter(props) {


    return (
        <div className='tableFooter'>

            <h1 style={{
                color: props.selectedPage === 1 ? 'gray' : 'white',

            }}

                onClick={function () {
                    props.setSelectedRow(null);
                    arrowLeft(props);
                }}>←</h1>



            {props.numberOfPages.map((val, key) => {
                return (

                    <div style={{ backgroundColor: props.selectedPage - 1 == key ? 'rgba(255, 255, 255, 0.5)' : 'transparent' }} className='tableNumberCircle' key={key} onClick={function () {
                        props.setSelectedPage(val);
                        props.setSelectedRow(null);
                    }}>{val}
                    </div>
                )
            })}



            <h1 style={{
                color: props.selectedPage === props.numberOfPages.length ? 'gray' : 'white',
            }}

                onClick={function () {
                    props.setSelectedRow(null)
                    arrowRight(props)
                }}>→</h1>
        </div>
    )
}


function arrowLeft(props) {
    return props.selectedPage != 1 ? props.setSelectedPage(props.selectedPage - 1) : null
}
function arrowRight(props) {
    console.log(props.selectedPage, props.numberOfPages.length);
    return props.selectedPage === props.numberOfPages.length ? null : props.setSelectedPage(props.selectedPage + 1)
}


