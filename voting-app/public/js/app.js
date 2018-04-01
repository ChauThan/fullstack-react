class Product extends React.Component {
  constructor(props){
    super(props);

    this.handleUpVote = this.handleUpVote.bind(this);
  }

  handleUpVote(){
    console.log(`handleUpVote ${this.props.id}`)
    //this.props.onVote(this.props.id);
  }

  render() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.productImageUrl} />
        </div>
        <div className="middle aligned content">
          <div>
            <a href="#" onClick={this.handleUpVote}>
              <i className="large caret up icon"></i>
            </a>
            {this.props.votes}
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
  handleProductUpVote(productId) {
    console.log('${productId} was upvoted')
  }

  render() {
    const products = Products.sort((a, b) => (
      b.votes - a.votes
    ));

    const productComponents = products.map(product => (
      <Product
        key={product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote}
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