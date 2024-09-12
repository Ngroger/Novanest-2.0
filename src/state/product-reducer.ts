import { Dispatch } from 'redux';
import axios from 'axios';

export type ProductType = {
  product_id: number;
  title: string;
  category: string;
  photo_preview_one: string;
  photo_preview_two: string;
  photo_preview_three: string;
  photo_preview_four: string;
  description: string;
  downloads: number;
  create_at: string;
  price: string;
  sale_percent: number
};

export type SetProductsActionType = {
  type: 'SET_PRODUCTS';
  products: ProductType[];
};

export type ProductActionType = SetProductsActionType;

export const ProductReducer = (
  state: ProductType[] = [],
  action: ProductActionType
) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      console.log("all products", action.products);
      return action.products;
    default:
      return state;
  }
};

export const setProductsAC = (
  products: ProductType[]
): SetProductsActionType => {
  return {
    type: 'SET_PRODUCTS',
    products,
  };
};

export const getProductsTC = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get('/api/products/products');
      console.log('getProducts response: ', response.data);
      const products = response.data.products.map((product: any) => {
        return mapProductFromApi(product);
      });
      dispatch(setProductsAC(products));
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };
};

export const mapProductFromApi = (apiProduct: any): ProductType => {
  let parsedDescription;

  try {
    parsedDescription = JSON.parse(apiProduct.description.replace(/'/g, '"'));
  } catch (error) {
    console.error('Error parsing description:', error);
    parsedDescription = apiProduct.description;
  }

  return {
    product_id: apiProduct.product_id,
    title: apiProduct.title,
    category: apiProduct.category,
    photo_preview_one: apiProduct.photo_preview_one,
    photo_preview_two: apiProduct.photo_preview_two,
    photo_preview_three: apiProduct.photo_preview_three,
    photo_preview_four: apiProduct.photo_preview_four,
    description: parsedDescription,
    downloads: apiProduct.downloads,
    create_at: new Date(apiProduct.create_at).toISOString(),
    price: apiProduct.price,
    sale_percent: apiProduct.sale_percent
  };
};