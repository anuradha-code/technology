import React, { PropTypes } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

const getCaret = direction => {
  if (direction === "asc") {
    return (
      <span>
        {" "}
        <i className="fa fa-sort-asc" aria-hidden="true" />
      </span>
    );
  }

  if (direction === "desc") {
    return (
      <span>
        {" "}
        <i className="fa fa-sort-desc" aria-hidden="true" />
      </span>
    );
  }

  return (
    <span>
      {" "}
      <i className="fa fa-sort" aria-hidden="true" />
    </span>
  );
};

class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.options = {
      sortIndicator: true,
      noDataText: "No data",
      afterDeleteRow: props.onAfterDeleteRow,
      sizePerPageList: [
        {
          text: "5",
          value: 5
        },
        {
          text: "10",
          value: 10
        },
        {
          text: "All",
          value: this.props.products.length
        }
      ], // you can change the dropdown list for size per page
      sizePerPage: 5 // which size per page you want to locate as default
    };

    this.selectRowProp = {
      mode: "checkbox",
      bgColor: "#c1f291",
      onSelect: props.handleRowSelect,
      clickToSelect: true
    };
  }

  render() {
    return (
      <BootstrapTable
        data={this.props.products}
        pagination={this.props.products.length > 0 ? true : false}
        selectRow={this.selectRowProp}
        deleteRow={true}
        options={this.options}
        bordered={false}
        striped
        hover
        condensed
      >
        <TableHeaderColumn dataField="id" isKey hidden>
          Id
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="product_name"
          dataSort={true}
          caretRender={getCaret}
          filter={{ type: "TextFilter", delay: 0 }}
          columnTitle
        >
          Product Name
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="product_description"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Product Description
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="is_active"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Is Active
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="price"
          dataSort={true}
          caretRender={getCaret}
          filter={{ type: "TextFilter", delay: 0 }}
          columnTitle
        >
          Price
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="offer_price"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Offer Price
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="offer_start_at"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Offer Start At
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="offer_end_at"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Offer End At
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired,
  onAfterDeleteRow: PropTypes.func.isRequired
};

export default ProductList;
