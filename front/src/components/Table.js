import React from 'react';

function Table(props){
    const getValue = (o,s) => {
        console.log(o,s)
        if(!o){
            return null
        }
        s = s.replace(/\[(\w+)\]/g, '.$1');
        s = s.replace(/^\./,'');
        var a = s.split('.');
        for(var i = 0, n = a.length; i <n; ++i){
            var k = a[i];
            if(k in o){
                o = o[k];
            }
            else{
                return;
            }
        }
        return o;
    }

    return(
        <div>
        <table>
         <thead>
         <tr>
         {
            props.headers.map(
                (header,index) => {
                    return( <th key = {index} scope="col">{header.title}</th>)}
                    )
                }
         </tr>
        </thead>
        <tbody>
        {
            props.data.map((item,index) => {
                return(
                    <tr key = {index}>
                        {
                            props.headers.map((header,index) => {
                                return (
                                    <td key = {index}>{
                                        header.render ?
                                        header.render(getValue(item, header.key)): getValue(item, header.key)
                                    }
                                    </td>
                                )
                            })
                        }
                    </tr>
                )
            })
        }
        </tbody>
        </table>
        </div>
    )
}

export default Table;
