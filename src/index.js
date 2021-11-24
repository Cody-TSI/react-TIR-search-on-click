import React from "react";
import ReactDOM from "react-dom";

class SearchBar extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;
    return (
      <form
        onSubmit={(e) => {
          this.props.handleClick(e);
        }}
      >
        <input
          type="text"
          placeholder="search...."
          value={filterText}
          onChange={(e) => this.props.onFilterTextChange(e)}
        />
        <input type="submit" value="Submit" />
        <br />
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => this.props.onInStockChange(e)}
        />
        <label>Only show products in stock</label>
      </form>
    );
  }
}

function ProductRow(props) {
  const product = props.product;
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductCategoryRow(props) {
  const category = props.category;
  return (
    <tr>
      <th>{category}</th>
    </tr>
  );
}

class ProductTable extends React.Component {
  render() {
    const rowsToRender = [];
    let lastCat = null;
    this.props.rows.forEach((product) => {
      if (this.props.inStockOnly && !product.stocked) {
        return;
      }
      if (lastCat !== product.category) {
        rowsToRender.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />
        );
        lastCat = product.category;
      }
      rowsToRender.push(<ProductRow product={product} key={product.name} />);
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rowsToRender}</tbody>
      </table>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      inStockOnly: false,
      rows: this.props.products,
    };

    this.setFilterTextChange = this.setFilterTextChange.bind(this);
    this.setInStockChange = this.setInStockChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  setFilterTextChange(event) {
    this.setState({
      filterText: event.target.value,
    });
  }
  setInStockChange(event) {
    this.setState({
      inStockOnly: event.target.checked,
    });
  }

  handleClick(event) {
    event.preventDefault();
    const filterText = this.state.filterText;
    const products = this.props.products;

    const rows = products.filter(
      (product) => product.name.indexOf(filterText) > -1
    );

    this.setState({
      rows: rows,
    });
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.setFilterTextChange}
          onInStockChange={this.setInStockChange}
          handleClick={this.handleClick}
        />
        <ProductTable
          inStockOnly={this.state.inStockOnly}
          rows={this.state.rows}
        />
      </div>
    );
  }
}

//========================================

const PRODUCTS = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football",
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball",
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball",
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch",
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5",
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} rows={[]} />,
  document.getElementById("root")
);
