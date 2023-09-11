

import { useState } from 'react';


function TextExample(props) {
    const Title = props.data
    let [value, setValue] = useState(0)



    if (Title === 'Total Records') {
        fetch("http://localhost:8000/employee")
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                console.log(resp)
                setValue(resp.length)
            })
            .catch((err) => {
                console.log(err.message);
            });

    } else if (Title === 'Total Pages') {
        fetch("http://localhost:8000/employee")
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                return resp.length
            }).then((res) => {
                setValue(Math.ceil(res / 2))
            }

            )
            .catch((err) => {
                console.log(err.message);
            });
    } else {
        value = 2
        console.log(value)
    }


    return (
        <div class="card"  style={{width: 250}}>
            <div class="card-body">
                <h5 class="card-title">{Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{value}</h6>
            </div>
        </div>
    );
}

export default TextExample;