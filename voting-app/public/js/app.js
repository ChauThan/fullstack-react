class  Product extends React.Component{
    render(){
        return (
            <div className="item">
                <div className="image">
                    <img src='images/products/no-image.svg'/>
                </div>
                <div className="middle aligned content">
                    <div className="description">
                        <a href="#">Fort Knight</a>
                        <p></p>
                    </div>
                    <div className="extra">
                        <span>Submitted by:</span>
                        <img src="images/avatars/avatar.svg" alt="" className="ui avatar image"/
                        ></div>
                </div>
            </div>
        )
    }
}

class ProductList extends React.Component{
    render(){
        return (
            <div className='ui unstackable items'>
                <Product />
            </div>
        )
    }
}

ReactDOM.render(
    <ProductList />,
    document.getElementById('content')
);