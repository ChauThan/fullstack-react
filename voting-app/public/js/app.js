class Product extends React.Component {
    render() {
        return (
            <div className="item">
                <div className="image">
                    <img src={this.props.productImageUrl} />
                </div>
                <div className="middle aligned content">
                    <div>
                        <a href="#">
                            <i className="large caret up icon"></i>
                        </a>
                        {this.props.title}
                    </div>
                    <div className="description">
                        <a href={this.props.url}>
                            {this.props.title}
                        </a>
                        <p>
                            {this.props.description}
                        </p>
                    </div>
                    <div className="extra">
                        <span>Submitted by:</span>
                        <img src={this.props.submitterAvatarUrl} alt="" className="ui avatar image" /
                        ></div>
                </div>
            </div>
        )
    }
}

class ProductList extends React.Component {
    render() {
        const productComponents = Products.map(product => (
            <Product
                id={product.id}
                title={product.title}
                description={product.description}
                url={product.url}
                votes={product.votes}
                submitterAvatarUrl={product.submitterAvatarUrl}
                productImageUrl={product.productImageUrl}
            />
        ));

        return (
            <div className='ui unstackable items'>
                {productComponents}
            </div>
        )
    }
}

ReactDOM.render(
    <ProductList />,
    document.getElementById('content')
);