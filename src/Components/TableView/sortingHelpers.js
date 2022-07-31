export function getBirthday(personal_code) {
    const lastNumbers = personal_code.toString()
    const firstNumberFromPersonalCode = String(personal_code)[0]
    const century = firstNumberFromPersonalCode > 4 ? 20 : 19

    return lastNumbers.substring(5, 7) + "." + lastNumbers.substring(3, 5) + "." + century + lastNumbers.substring(1, 3)
}



export function sortData(data, setSortAssending, sortAssending, whatDataToSort, setData,defaultData) {

    //whatDataToSort = for example firstname, lastname or sex
    


    // //if clicked category is different then before then sort assending
    if (whatDataToSort != sortAssending.lastClickedCategory) {
        sortAssending.state = false
    }
    

    if (sortAssending.state === false) {
        
        data.sort(function (a, b) {
            if (a[whatDataToSort].toLowerCase() < b[whatDataToSort].toLowerCase()) return -1;
            if (a[whatDataToSort].toLowerCase() > b[whatDataToSort].toLowerCase()) return 1;
            return 0;
        })
        setSortAssending(prevState => ({
            ...prevState,
            state: true,
            lastClickedCategory: whatDataToSort,
        }))


    }
    else if (sortAssending.state === true) {
        data.reverse()

        setSortAssending(prevState => ({
            ...prevState,
            state: "backToDefault",
            lastClickedCategory: whatDataToSort
        }))
    } else {
        //return to default data, im getting lost and this worked
        const result=JSON.parse(JSON.stringify(defaultData))
        setData(
           result
        )
        


        setSortAssending(prevState => ({
            ...prevState,
            state: false,
            lastClickedCategory: whatDataToSort,

        }))

    }


}


export function dateSort(data, setSortAssending, sortAssending, whatDataToSort, setData) {

    if (whatDataToSort != sortAssending.lastClickedCategory) {
        sortAssending.state = false
    }



    if (sortAssending.state === false) {
        //store default data
        sortAssending.defaultData = [...data]

        data.sort(function (a, b) {

            const aa = getBirthday(a.personal_code).split('.').reverse().join(),
                bb = getBirthday(b.personal_code).split('.').reverse().join();
            return aa < bb ? -1 : (aa > bb ? 1 : 0);
        });

        setSortAssending(prevState => ({
            ...prevState,
            state: true,
            lastClickedCategory: whatDataToSort
        }))

    } else if (sortAssending.state === true) {
        data.reverse()

        setSortAssending(prevState => ({
            ...prevState,
            state: "backToDefault",
            lastClickedCategory: whatDataToSort
        }))



    } else {
        //return to default data
        setData(prevState => ({
            ...prevState,
            list: sortAssending.defaultData
        }))

        setSortAssending(prevState => ({
            ...prevState,
            state: false,
            lastClickedCategory: whatDataToSort,

        }))
    }
}
