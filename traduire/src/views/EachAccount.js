


const EachAccount = (props) => {
    console.log(props.currentUser)
    const handleEdit = (e) => {
        e.preventDefault()
        console.log("editing")
        const username = e.target.u.value
        const email = e.target.e.value
     
        let formData = {
            userId: props.currentUser['id'],
            username: username,
            email: email
        }
        const body = JSON.stringify(formData);
        fetch(`http://127.0.0.1:5000/update${props.currentUser['id']}`, {
            method: 'PUT',
            body: body,
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                props.setCurrentUser(data[1])
            })
        }

    return (
        <div className="container">
            <form onSubmit={handleEdit}>
                <h6 className='text-center'>Edit User: {props.u}</h6>
                <div className='form-group'>
                    <fieldset>
                        <label htmlFor='u'>Username</label>
                        <input type='text' className='form-control' name='u' defaultValue={props.u}/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor='e'>Email</label>
                        <input type='text' className='form-control' name='e' defaultValue={props.e}/>
                    </fieldset>
                    <input type='submit' className='btn btn-dark' value='Update User'/>
                </div>
            </form>
        </div>
    )
}

export default EachAccount;