import delay from "./delay";

const localState = JSON.parse(localStorage.getItem("state"));
const products = localState ? localState.productsReducer.products : [];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = product => {
  return replaceAll(product.product_name, " ", "-");
};

class ProductApi {
  static getAllProducts() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Object.assign([], products));
      }, delay);
    });
  }

  static saveProduct(product) {
    product = Object.assign({}, product); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minProductNameLength = 1;
        if (product.product_name.length < minProductNameLength) {
          reject(
            `Product name must be at least ${minProductNameLength} characters.`
          );
        }

        if (product.id) {
          const existingProductIndex = products.findIndex(
            a => a.id === product.id
          );
          products.splice(existingProductIndex, 1, product);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new products in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          product.id = generateId(product);
          products.push(product);
        }

        resolve(product);
      }, delay);
    });
  }

  static deleteProduct(productId) {
    return new Promise(resolve => {
      for (let i = 0; i < productId.length; i++) {
        const indexOfProductToDelete = products.findIndex(
          product => product.id === productId[i]
        );
        products.splice(indexOfProductToDelete, 1);
        resolve();
      }
    });
  }

  static getProduct(productId) {
    return new Promise(resolve => {
      setTimeout(() => {
        const existingProductIndex = products.findIndex(
          product => product.id === productId
        );

        const productFound = Object.assign({}, products[existingProductIndex]);

        resolve(productFound);
      }, delay);
    });
  }
}

export default ProductApi;
