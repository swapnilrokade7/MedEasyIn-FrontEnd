import { BASE_API_URL } from '../common/constants';
import axios from 'axios';
import { authHeader } from './base.service';
import store from '../redux/store';

const currentUser = store.getState().user;


const API_URL = BASE_API_URL + '/cart';

class CartService {
    // saveCaerItem(product) {
    //   return axios.post(API_URL, product, { headers: authHeader() });
    // }
  
    // //upload product image
    // uploadProductImage(image, productId) {
    //   let formData = new FormData();
    //   formData.append('imageFile', image);
    //   console.log('in upload img ' + formData + ' ' + productId);
    //   return axios
    //     .post(`${API_URL}/${productId}/image`, formData, {
    //       headers: authImageHeader(),
    //     })
    //     .then((response) => response.data);
    // }
  
    // deleteProduct(product) {
    //   return axios.delete(API_URL + '/' + product.id, { headers: authHeader() });
    // }
  
    getMyCartItems(id) {
      return axios.get(API_URL+ `/${id}`,{ headers: authHeader() });
    }

    addToCart(item){
      return axios.post(BASE_API_URL+ "/cartitem", item ,{ headers: authHeader() });
    }

    decreaseItem(id){
      return axios.get(BASE_API_URL+ "/cartitem"+`/${id}`, { headers: authHeader() });
    }

    deleteItem(id){
      return axios.delete(BASE_API_URL+ "/cartitem"+`/${id}`, { headers: authHeader() });
    }

    getMyCart(id) {
      return axios.get(API_URL+ `/${id}`,{ headers: authHeader() });
    }
  
  
    // getAllCategories() {
    //   return axios.get(BASE_API_URL + '/category');
    // }
  
    // getProductsByCategory(id) {
    //   return axios.get(BASE_API_URL + `/products/category/${id}`);
    // }
  
    // getProductImage(id) {
    //   return axios.get(`http://localhost:8080/products/${id}/image`, {
    //     responseType: 'blob',
    //   }); //.then(res=>{setPic(URL.createObjectURL(res.data));//console.log(res.data)
    // }
  }
  
  export default new CartService();
  