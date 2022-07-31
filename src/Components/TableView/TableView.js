import React from 'react'
import { useState, useEffect, Fragment } from "react";
import TableExpanded from './TableExpanded';
import TableFooter from './TableFooter';
import { calculateRange, sliceData } from './TablePagination';
import { ReactComponent as Loader } from '../../Assets/loader.svg';
import { dateSort, getBirthday, sortData } from './sortingHelpers';
import "./tableView.css"


export default function TableView() {


    const [data, setData] = useState(null);
    const [defaultData, setDefaultData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null)
    const [selectedPage, setSelectedPage] = useState(1)
    const [selectedColumn, setSelectedColumn] = useState({
        firstname: "arrow left",
        surname: "arrow left",
        sex: "arrow left",
        date: "arrow left"
    })
    const [sortAssending, setSortAssending] = useState(
        {
            state: false,
            lastClickedCategory: undefined,
        })


    useEffect(() => {
        const getData = async () => {
            // console.log('2')
            try {
                // console.log('3')
                const response = await fetch(
                    `https://midaiganes.irw.ee/api/list?limit=500`
                );
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    );
                }
                // console.log('4')
                let actualData = await response.json();
                setDefaultData(JSON.parse(JSON.stringify(actualData)))
                setData(actualData);

                setError(null);
            } catch (err) {
                // console.log({ err })
                setError(err.message);
                setData(null);
            } finally {
                // console.log('5')
                setLoading(false);
            }
        }
        //console.log('1')
        getData()
    }, [])


    function onAddBtnClick(index) {
        selectedRow != index ? setSelectedRow(index) : setSelectedRow(null)
    };

    function changeColumnSortArrow(setSelectedColumn, columnName) {

        //set other categorys back to default
        if (selectedColumn.lastSelected != columnName && columnName != null) {
            setSelectedColumn(
                {
                    firstname: "arrow left",
                    surname: "arrow left",
                    sex: "arrow left",
                    date: "arrow left"
                }
            )
        }


        let result

        if (selectedColumn[columnName] === "arrow left") {
            result = "arrow down"
        } else if (selectedColumn[columnName] === "arrow down") {
            result = "arrow up"
        } else {
            result = "arrow left"
        }




        setSelectedColumn(prevState => ({
            ...prevState,
            [columnName]: result,
            lastSelected: columnName
        }))
    }



    return (
        <div className='tableView'>
            <h1>NIMEKIRI</h1>

            {data ?
                (<div className='tableContainer'>
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => {
                                    sortData(data.list, setSortAssending, sortAssending, "firstname", setData, defaultData);
                                    changeColumnSortArrow(setSelectedColumn, "firstname")
                                }}>Eesnimi
                                    <i className={selectedColumn.firstname} ></i>
                                </th>
                                <th onClick={() => {
                                    sortData(data.list, setSortAssending, sortAssending, "surname", setData, defaultData);
                                    changeColumnSortArrow(setSelectedColumn, "surname")
                                }}>Perekonnanimi
                                    <i className={selectedColumn.surname} ></i>
                                </th>

                                <th onClick={() => {
                                    sortData(data.list, setSortAssending, sortAssending, "sex", setData, defaultData);
                                    changeColumnSortArrow(setSelectedColumn, "sex")
                                }}>Sugu
                                    <i className={selectedColumn.sex} ></i>
                                </th>
                                <th onClick={() => {
                                    dateSort(data.list, setSortAssending, sortAssending, "date", setData, defaultData);
                                    changeColumnSortArrow(setSelectedColumn, "date")
                                }}>Sünnikuupäev
                                    <i className={selectedColumn.date} ></i>
                                </th>
                                <th>Telefon</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data &&
                                sliceData(data.list, selectedPage, 10).map((val, key) => {
                                    return (

                                        <Fragment key={key}>
                                            <tr style={{
                                                backgroundColor: selectedRow === key ? 'white' : undefined,
                                                color: selectedRow === key ? 'black' : undefined
                                            }} key={key} onClick={() => onAddBtnClick(key)} >
                                                <td>{val.firstname}</td>
                                                <td>{val.surname}</td>
                                                <td>{val.sex === "f" ? "Naine" : "Mees"}</td>
                                                <td>{getBirthday(val.personal_code)}</td>
                                                <td>{val.phone}</td>
                                            </tr>
                                            {selectedRow === key && (
                                                <tr>
                                                    <td className='articleContainerTD' colSpan={5}>
                                                        <div>
                                                            <TableExpanded
                                                                link={val.id}
                                                                img={val.image.small}
                                                                body={val.body}
                                                                closeOtherExpanded={selectedRow}
                                                            />
                                                        </div>

                                                    </td>
                                                </tr>
                                            )}
                                        </Fragment>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
                ) : (<div style={{ zoom: `4` }}><Loader /></div>)}




            {data &&
                <TableFooter
                    numberOfPages={calculateRange(data.list, 10)}
                    setSelectedPage={setSelectedPage}
                    selectedPage={selectedPage}
                    selectedRow={selectedRow}
                    setSelectedRow={setSelectedRow}
                />}

        </div>
    )
}





