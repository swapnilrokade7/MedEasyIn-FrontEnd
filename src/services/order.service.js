import { BASE_API_URL } from '../common/constants';
import axios from 'axios';
import { authHeader, authImageHeader } from './base.service';
const API_URL = BASE_API_URL + '/order';


class OrderService {

  saveOrder(id,address) {
    return axios.post(API_URL+`/user/${id}`, address, { headers: authHeader() });
  }



}

export default new OrderService();