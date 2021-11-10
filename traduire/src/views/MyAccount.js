import '../App.css';



const MyAccout = (props) => {
    console.log(props.currentUser)
    return (
        <div className="myAccountContainer">
            <div className="container myAccoutInnerContainer">
                <h1>Hello {props.currentUser['username']}</h1>
                
                <h2>UserName: {props.currentUser['username']}</h2>
                <h2>Email: {props.currentUser['email']}</h2>
                <h2>UserId: {props.currentUser['id']} </h2>
                <h3><button>Edit Account</button></h3>
                <h3><button>Delete Account</button></h3>
            </div>

        </div>

    )

}

export default MyAccout;